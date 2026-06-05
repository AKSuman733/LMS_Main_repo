import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Award,
  BookOpen,
  Bot,
  HelpCircle,
  Home,
  Loader2,
  LogIn,
  MessageCircle,
  Minimize2,
  Send,
  Sparkles,
  User,
  Wallet,
  X,
} from "lucide-react";

import { getCourses } from "../../services/courseApi";
import { getEnrollmentsByStudentEmail } from "../../services/courseEnrollmentApi";

const defaultBotMessage = {
  sender: "bot",
  text: "Hi 👋 I am UptoBuddy AI. Ask me about courses, enrollment, payment, certificates, dashboard, or your learning progress.",
};

const quickBoxes = [
  {
    title: "Courses",
    desc: "View available courses",
    question: "What courses are available?",
    icon: BookOpen,
  },
  {
    title: "My Courses",
    desc: "Check enrolled courses",
    question: "Show my courses",
    icon: User,
  },
  {
    title: "My Spends",
    desc: "View total payment",
    question: "How much have I spent?",
    icon: Wallet,
  },
  {
    title: "Certificate",
    desc: "Certificate eligibility",
    question: "How do I get certificate?",
    icon: Award,
  },
];

export default function ChatBot() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [messages, setMessages] = useState([defaultBotMessage]);

  const user = useMemo(() => {
    return JSON.parse(localStorage.getItem("studentUser") || "{}");
  }, [open]);

  const isLoggedIn = Boolean(localStorage.getItem("studentToken") && user?.email);

  const totalSpent = useMemo(() => {
    return enrollments.reduce((total, item) => {
      const amount =
        Number(item.amountPaid) ||
        Number(item.spent) ||
        Number(String(item.price || "").replace(/[^\d.]/g, "")) ||
        0;

      return total + amount;
    }, 0);
  }, [enrollments]);

  const completedCourses = useMemo(() => {
    return enrollments.filter((item) => Number(item.progress || 0) >= 100);
  }, [enrollments]);

  const activeCourses = useMemo(() => {
    return enrollments.filter((item) => Number(item.progress || 0) < 100);
  }, [enrollments]);

  const fetchChatData = async () => {
    try {
      const courseData = await getCourses();
      setCourses(courseData || []);
    } catch {
      setCourses([]);
    }

    try {
      const latestUser = JSON.parse(localStorage.getItem("studentUser") || "{}");

      if (!latestUser.email) {
        setEnrollments([]);
        return;
      }

      const enrollmentData = await getEnrollmentsByStudentEmail(latestUser.email);
      setEnrollments(enrollmentData || []);
    } catch {
      setEnrollments([]);
    }
  };

  useEffect(() => {
    if (open) {
      fetchChatData();
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing, open]);

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { sender: "user", text }]);
  };

  const addBotMessage = (text, actions = []) => {
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text, actions }]);
      setTyping(false);
    }, 450);
  };

  const formatCourseList = () => {
    if (!courses.length) {
      return "I could not find courses right now. Please open the Courses page or refresh once.";
    }

    return `Available courses:\n\n${courses
      .slice(0, 6)
      .map((course, index) => {
        const price = course.isFree ? "Free" : `₹${course.price || 0}`;
        return `${index + 1}. ${course.title} — ${price} — ${
          course.duration || "N/A"
        }`;
      })
      .join("\n")}`;
  };

  const formatMyCourses = () => {
    if (!isLoggedIn) {
      return {
        text: "Please login first, then I can show your enrolled courses.",
        actions: [{ label: "Login", type: "route", path: "/login", icon: LogIn }],
      };
    }

    if (!enrollments.length) {
      return {
        text: "You are not enrolled in any course yet. Explore courses and click Enroll Now.",
        actions: [
          { label: "Browse Courses", type: "route", path: "/courses", icon: BookOpen },
        ],
      };
    }

    return {
      text: `Your enrolled courses:\n\n${enrollments
        .slice(0, 8)
        .map((item, index) => {
          const title =
            item.courseTitle || item.title || item.course?.title || "Course";
          const progress = Number(item.progress || 0);

          return `${index + 1}. ${title} — ${progress}% completed`;
        })
        .join("\n")}`,
      actions: [
        { label: "Open Dashboard", type: "route", path: "/dashboard", icon: Home },
      ],
    };
  };

  const getSmartAnswer = (question) => {
    const q = question.toLowerCase();

    if (
      q.includes("course") &&
      (q.includes("available") ||
        q.includes("list") ||
        q.includes("show") ||
        q.includes("top"))
    ) {
      return {
        text: formatCourseList(),
        actions: [
          { label: "View All Courses", type: "route", path: "/courses", icon: BookOpen },
        ],
      };
    }

    if (
      q.includes("my course") ||
      q.includes("enrolled") ||
      q.includes("my learning") ||
      q.includes("progress")
    ) {
      return formatMyCourses();
    }

    if (
      q.includes("spend") ||
      q.includes("spent") ||
      q.includes("payment") ||
      q.includes("fees") ||
      q.includes("paid") ||
      q.includes("money")
    ) {
      if (!isLoggedIn) {
        return {
          text: "Please login first, then I can show your spending and payment details.",
          actions: [{ label: "Login", type: "route", path: "/login", icon: LogIn }],
        };
      }

      const paidCount = enrollments.filter(
        (item) => Number(item.amountPaid || 0) > 0
      ).length;

      const freeCount = enrollments.filter(
        (item) => Number(item.amountPaid || 0) === 0
      ).length;

      return {
        text: `Your total course spending is ₹${totalSpent}.\n\nPaid courses: ${paidCount}\nFree courses: ${freeCount}`,
        actions: [
          { label: "Go Dashboard", type: "route", path: "/dashboard", icon: Home },
        ],
      };
    }

    if (
      q.includes("certificate") ||
      q.includes("certificates") ||
      q.includes("download certificate")
    ) {
      if (!isLoggedIn) {
        return {
          text: "Please login first. After login, you can check certificates in your dashboard.",
          actions: [{ label: "Login", type: "route", path: "/login", icon: LogIn }],
        };
      }

      return {
        text: `Certificate rule:\n\nComplete a course 100% to become certificate eligible.\n\nCompleted courses: ${completedCourses.length}\nActive courses: ${activeCourses.length}`,
        actions: [
          { label: "My Dashboard", type: "route", path: "/dashboard", icon: Award },
        ],
      };
    }

    if (
      q.includes("enroll") ||
      q.includes("admission") ||
      q.includes("join course")
    ) {
      return {
        text: "To enroll:\n\n1. Open Courses page\n2. Select a course\n3. Click Enroll Now\n4. If course is free, it enrolls directly\n5. If course is paid, payment page opens first",
        actions: [
          { label: "Browse Courses", type: "route", path: "/courses", icon: BookOpen },
        ],
      };
    }

    if (
      q.includes("dashboard") ||
      q.includes("profile") ||
      q.includes("account")
    ) {
      if (!isLoggedIn) {
        return {
          text: "Please login first to access your dashboard, courses, progress and certificates.",
          actions: [{ label: "Login", type: "route", path: "/login", icon: LogIn }],
        };
      }

      return {
        text: "Your dashboard contains enrolled courses, progress, certificates, stats and profile details.",
        actions: [
          { label: "Open Dashboard", type: "route", path: "/dashboard", icon: Home },
        ],
      };
    }

    if (
      q.includes("contact") ||
      q.includes("support") ||
      q.includes("help") ||
      q.includes("phone") ||
      q.includes("whatsapp")
    ) {
      return {
        text: "You can contact UptoSkills support for course, payment, certificate and dashboard issues.\n\nPhone/WhatsApp: +91 9887196182\nEmail: support@uptoskills.com",
        actions: [
          { label: "Contact Page", type: "route", path: "/contact", icon: HelpCircle },
          { label: "WhatsApp", type: "whatsapp", icon: MessageCircle },
        ],
      };
    }

    if (
      q.includes("login") ||
      q.includes("sign in") ||
      q.includes("register") ||
      q.includes("signup")
    ) {
      return {
        text: "You can login or create an account to enroll in courses and track progress.",
        actions: [
          { label: "Login", type: "route", path: "/login", icon: LogIn },
          { label: "Register", type: "route", path: "/register", icon: User },
        ],
      };
    }

    if (
      q.includes("hello") ||
      q.includes("hi") ||
      q.includes("hey") ||
      q.includes("namaste")
    ) {
      return {
        text: `Hello ${user.name || "student"} 👋\nHow can I help you today? You can ask about courses, fees, certificates, dashboard or enrollment.`,
        actions: [
          { label: "Courses", type: "route", path: "/courses", icon: BookOpen },
          { label: "My Courses", type: "question", value: "Show my courses", icon: User },
        ],
      };
    }

    return {
      text: "I can help you with courses, enrollment, payment, certificates, dashboard, profile and support. Try asking: “Show my courses” or “How much have I spent?”",
      actions: [
        { label: "Courses", type: "route", path: "/courses", icon: BookOpen },
        { label: "Support", type: "route", path: "/contact", icon: HelpCircle },
      ],
    };
  };

  const handleSend = (customText = "") => {
    const finalText = customText || input.trim();

    if (!finalText) return;

    addUserMessage(finalText);
    setInput("");

    const answer = getSmartAnswer(finalText);
    addBotMessage(answer.text, answer.actions || []);
  };

  const handleAction = (action) => {
    if (action.type === "route") {
      setOpen(false);
      navigate(action.path);
      return;
    }

    if (action.type === "whatsapp") {
      window.open(
        "https://wa.me/919887196182?text=Hello%20UptoSkills%2C%20I%20need%20help%20regarding%20LMS%20platform.",
        "_blank"
      );
      return;
    }

    if (action.type === "question") {
      handleSend(action.value);
    }
  };

  const clearChat = () => {
    setMessages([defaultBotMessage]);
  };

  return (
    <>
      <style>
        {`
          @keyframes chatPop {
            0% {
              opacity: 0;
              transform: translateY(8px) scale(0.98);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes botFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          .upto-chatbot-box {
            width: min(420px, calc(100vw - 24px));
            height: min(640px, calc(100dvh - 24px));
            right: 12px;
            bottom: 12px;
          }

          .upto-chatbot-box.minimized {
            width: min(360px, calc(100vw - 24px));
            height: 86px;
          }

          @media (max-width: 640px) {
            .upto-chatbot-box {
              width: 100vw;
              height: 100dvh;
              right: 0;
              bottom: 0;
              border-radius: 0;
            }

            .upto-chatbot-box.minimized {
              width: calc(100vw - 24px);
              height: 82px;
              right: 12px;
              bottom: 12px;
              border-radius: 24px;
            }
          }

          @media (max-height: 720px) {
            .upto-chatbot-box {
              height: calc(100dvh - 20px);
              bottom: 10px;
            }
          }
        `}
      </style>

      {!open && (
        <button
          onClick={() => {
            setOpen(true);
            setMinimized(false);
          }}
          className="fixed bottom-5 right-5 z-[9999] group"
        >
          <div className="absolute -inset-3 rounded-full bg-[#ff5a5f]/60 blur-xl transition group-hover:bg-[#ff6f73]" />

          <div className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[#ff5a5f] text-white shadow-2xl shadow-red-500/30 transition group-hover:scale-110">
            <Bot size={28} />
          </div>

          <div className="absolute -right-2 -top-2 rounded-full bg-white px-2 py-1 text-[10px] font-black text-[#ff5a5f]">
            AI
          </div>
        </button>
      )}

      {open && (
        <div
          className={`upto-chatbot-box fixed z-[9999] flex overflow-hidden border border-[#ffb8bb]/30 bg-white text-slate-900 shadow-[0_20px_80px_rgba(255,90,95,0.28)] transition-all duration-300 ${
            minimized ? "minimized rounded-[28px]" : "rounded-[32px] flex-col"
          }`}
        >
          <div className="relative shrink-0 overflow-hidden bg-[#ff5a5f] px-5 py-4 text-white">
            <div className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-white/10" />
            <div className="absolute right-16 top-8 text-3xl text-white/35">✦</div>
            <div className="absolute left-28 bottom-3 text-xl text-white/25">✦</div>

            <div className="relative flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#ff5a5f] shadow-xl">
                  <Bot size={26} />
                  <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400" />
                </div>

                <div>
                  <h3 className="text-lg font-black leading-tight">UptoBuddy AI</h3>
                  <p className="text-xs font-semibold text-white/85">
                    Smart LMS Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMinimized((prev) => !prev)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white transition hover:bg-white/25"
                  title="Minimize"
                >
                  <Minimize2 size={18} />
                </button>

                <button
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white shadow-sm transition hover:bg-white/25"
                  title="Close"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>

          {!minimized && (
            <>
              <div className="shrink-0 bg-[#ff5a5f] px-5 pb-4 text-white">
                <div className="grid grid-cols-3 gap-3">
                  <MiniStat icon={BookOpen} label="Courses" value={courses.length || "0"} />
                  <MiniStat icon={User} label="Mine" value={enrollments.length || "0"} />
                  <MiniStat icon={Wallet} label="Spent" value={`₹${totalSpent}`} />
                </div>
              </div>

              <div className="shrink-0 grid grid-cols-2 gap-2 bg-white px-4 py-3">
                {quickBoxes.map((box) => {
                  const Icon = box.icon;

                  return (
                    <button
                      key={box.title}
                      onClick={() => handleSend(box.question)}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-left shadow-sm transition hover:-translate-y-1 hover:border-[#ff5a5f] hover:bg-red-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-[#ff5a5f]/10 p-2 text-[#ff5a5f]">
                          <Icon size={19} />
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-slate-900">
                            {box.title}
                          </h4>
                          <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
                            {box.desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto bg-white px-5 py-4 scroll-smooth">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <ChatBubble
                      key={`${message.sender}-${index}`}
                      message={message}
                      onAction={handleAction}
                    />
                  ))}

                  {typing && (
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff5a5f] text-white">
                        <Bot size={18} />
                      </div>

                      <div className="animate-[chatPop_0.25s_ease-out] rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-2">
                          <Loader2 className="animate-spin" size={16} />
                          typing...
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={bottomRef} />
                </div>
              </div>

              <div className="shrink-0 border-t border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <button
                    onClick={clearChat}
                    className="text-xs font-bold text-slate-400 transition hover:text-[#ff5a5f]"
                  >
                    Clear chat
                  </button>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-500">
                    <Sparkles size={13} />
                    Online
                  </span>
                </div>

                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-[#ff5a5f]"
                >
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask about courses, fees, certificates..."
                    className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />

                  <button
                    type="submit"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff5a5f] text-white transition hover:scale-105"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/15 p-3 text-center backdrop-blur-xl">
      <Icon className="mx-auto text-white" size={20} />
      <p className="mt-2 text-sm font-black">{value}</p>
      <p className="text-[11px] text-white/80">{label}</p>
    </div>
  );
}

function ChatBubble({ message, onAction }) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[86%] ${isUser ? "text-right" : "text-left"}`}>
        <div
          className={`animate-[chatPop_0.25s_ease-out] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-6 ${
            isUser ? "bg-[#ff5a5f] text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          {message.text}
        </div>

        {!isUser && message.actions?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.actions.map((action) => {
              const Icon = action.icon || Sparkles;

              return (
                <button
                  key={action.label}
                  onClick={() => onAction(action)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#ff5a5f]/10 px-3 py-2 text-xs font-bold text-[#ff5a5f] transition hover:bg-[#ff5a5f] hover:text-white"
                >
                  <Icon size={14} />
                  {action.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}