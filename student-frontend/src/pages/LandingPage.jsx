import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Bell,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Heart,
  Laptop,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  Phone,
  Search,
  Settings,
  Sparkles,
  Star,
  Sun,
  Trophy,
  User,
  Users,
  X,
  Zap,
} from "lucide-react";

import uptoskillsLogo from "../assets/logo/UptoSkills.webp";
import mentor1 from "../assets/mentors/mentor1.jpg";
import mentor2 from "../assets/mentors/mentor2.jpg";
import mentor3 from "../assets/mentors/mentor3.jpg";

import { getCourses } from "../services/courseApi";
import {
  createCourseEnrollment,
  getEnrollmentsByStudentEmail,
} from "../services/courseEnrollmentApi";

const mentorStories = [
  {
    image: mentor1,
    name: "Discipline Mentor",
    role: "Sports Mentor",
    tag: "Focus",
    quote: "Build consistency, confidence and a winning mindset.",
    rating: "4.9 Rating",
  },
  {
    image: mentor2,
    name: "Innovation Mentor",
    role: "Business Mentor",
    tag: "Innovation",
    quote: "Learn future thinking, startup mindset and product ideas.",
    rating: "4.8 Rating",
  },
  {
    image: mentor3,
    name: "Leadership Mentor",
    role: "Captain Mentor",
    tag: "Leadership",
    quote: "Learn calm decision making, strategy and leadership.",
    rating: "5.0 Rating",
  },
];

const searchSuggestions = [
  "Web Development",
  "Python Basics",
  "Java Full Course",
  "AI & Machine Learning",
  "Data Science",
  "React JS",
  "Interview Preparation",
];

const fallbackCourses = [
  {
    id: 1,
    title: "Java Full Course",
    mentor: "Education Mentor",
    category: "Programming",
    level: "Beginner",
    price: "Free",
    duration: "20 Hours",
    rating: 4.8,
    icon: Code2,
    banner: "from-orange-500 via-red-500 to-pink-600",
    description:
      "Learn Java from basics to OOP, exception handling, file handling and interview-ready concepts.",
  },
  {
    id: 2,
    title: "Python Basics",
    mentor: "Innovation Mentor",
    category: "Programming",
    level: "Beginner",
    price: "₹499",
    duration: "18 Hours",
    rating: 4.7,
    icon: Laptop,
    banner: "from-cyan-400 via-blue-500 to-purple-600",
    description:
      "Start Python with syntax, loops, functions, data structures and mini projects.",
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    mentor: "Business Mentor",
    category: "AI/ML",
    level: "Advanced",
    price: "₹999",
    duration: "30 Hours",
    rating: 4.9,
    icon: Database,
    banner: "from-purple-500 via-fuchsia-500 to-orange-500",
    description:
      "Learn supervised learning, model evaluation, ML workflow and project implementation.",
  },
];

const stats = [
  ["20K+", "Learners", Users],
  ["50+", "Courses", BookOpen],
  ["500+", "Certificates", Award],
  ["100+", "Projects", Trophy],
];

const features = [
  {
    title: "Industry-Ready Courses",
    text: "Learn practical skills that help you build real projects and become job-ready.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Task Based Practice",
    text: "Complete topic-wise tasks, track progress and improve step by step.",
    icon: Zap,
  },
  {
    title: "Verified Certificates",
    text: "Earn certificates after completion and showcase them in your profile.",
    icon: BadgeCheck,
  },
];

const journeySteps = [
  {
    title: "Choose Course",
    text: "Select the course that matches your goal.",
  },
  {
    title: "Learn Topics",
    text: "Complete lessons, subtopics and practice tasks.",
  },
  {
    title: "Track Progress",
    text: "Your dashboard shows progress and certificate eligibility.",
  },
  {
    title: "Get Certified",
    text: "Complete the course and download your certificate.",
  },
];

const companyNames = [
  "TCS",
  "Infosys",
  "Wipro",
  "Accenture",
  "IBM",
  "Microsoft",
  "Google",
  "Amazon",
  "Deloitte",
  "Capgemini",
  "HCL",
  "Cognizant",
];

const testimonials = [
  {
    name: "Charv Raj",
    role: "BCA AIML Student",
    text: "UptoSkills helped me understand learning paths, tasks and certificates in one platform.",
  },
  {
    name: "Priya Sharma",
    role: "Web Development Learner",
    text: "The course cards, progress tracking and mentor guidance make learning very easy.",
  },
  {
    name: "Aman Verma",
    role: "Java Learner",
    text: "I liked the dashboard and certificate system. It feels like a complete LMS.",
  },
];

function MentorStorySlider({ isDark }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const current = mentorStories[active];

  const nextStory = () => {
    setActive((prev) => (prev + 1) % mentorStories.length);
    setProgress(0);
  };

  const prevStory = () => {
    setActive((prev) => (prev - 1 + mentorStories.length) % mentorStories.length);
    setProgress(0);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActive((old) => (old + 1) % mentorStories.length);
          return 0;
        }

        return prev + 1.4;
      });
    }, 70);

    return () => clearInterval(timer);
  }, [active]);

  return (
    <div className="relative mx-auto w-full max-w-xl animate-[float_5s_ease-in-out_infinite]">
      <div className="absolute -inset-5 rounded-[2.8rem] bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-orange-500/30 blur-2xl" />

      <div
        className={`relative overflow-hidden rounded-[2rem] border p-4 shadow-2xl backdrop-blur-xl ${
          isDark
            ? "border-cyan-400/30 bg-slate-900/80 shadow-cyan-500/20"
            : "border-slate-200 bg-white/80 shadow-slate-300/50"
        }`}
      >
        <div className="absolute left-7 right-7 top-7 z-20 h-1 overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full rounded-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <img
          src={current.image}
          alt={current.name}
          className="h-[440px] w-full rounded-[1.5rem] object-cover"
        />

        <div className="absolute inset-4 rounded-[1.5rem] bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

        <button
          onClick={prevStory}
          className="absolute left-7 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:scale-110 hover:bg-black/80"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextStory}
          className="absolute right-7 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-md transition hover:scale-110 hover:bg-black/80"
        >
          <ChevronRight />
        </button>

        <div className="absolute right-8 bottom-36 z-30 flex items-center gap-2 rounded-2xl bg-purple-500 px-5 py-3 font-bold text-white shadow-lg">
          <Star size={18} />
          {current.rating}
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-30 rounded-[1.5rem] border border-white/10 bg-black/65 p-5 backdrop-blur-xl">
          <span className="rounded-full bg-cyan-400/20 px-4 py-1 text-sm font-semibold text-cyan-300">
            {current.tag}
          </span>

          <h3 className="mt-3 text-2xl font-bold text-white">{current.name}</h3>
          <p className="mt-1 text-sm font-semibold text-slate-300">
            {current.role}
          </p>
          <p className="mt-2 text-sm text-slate-400">{current.quote}</p>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        {mentorStories.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActive(index);
              setProgress(0);
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              active === index ? "w-10 bg-cyan-400" : "w-3 bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function OrbitVisual() {
  return (
    <div className="relative mx-auto flex h-[560px] w-full max-w-[560px] items-center justify-center">
      <div className="absolute inset-10 rounded-full border border-white/15" />
      <div className="absolute inset-20 rounded-full border border-white/15" />
      <div className="absolute inset-32 rounded-full border border-white/15" />

      <div className="absolute h-[420px] w-[420px] animate-[spin_24s_linear_infinite] rounded-full">
        {[
          "Java",
          "AI",
          "DS",
          "ML",
          "Web",
          "React",
          "SQL",
          "CV",
        ].map((item, index) => {
          const angle = (index / 8) * 360;
          const radius = 205;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <div
              key={item}
              className="absolute left-1/2 top-1/2 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-sm font-black text-cyan-300 shadow-xl shadow-cyan-500/20 backdrop-blur-xl"
              style={{
                transform: `translate(${x - 32}px, ${y - 32}px) rotate(${-angle}deg)`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="relative z-10 rounded-full border border-white/10 bg-slate-950/80 px-12 py-10 text-center shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
        <h3 className="text-6xl font-black text-white">20K+</h3>
        <p className="mt-2 font-semibold text-cyan-300">Learners</p>
        <p className="mt-4 max-w-[220px] text-sm text-slate-400">
          Courses, mentors, certificates and career growth in one LMS.
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [wishlisted, setWishlisted] = useState([]);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const [backendCourses, setBackendCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courseLoading, setCourseLoading] = useState(false);
  const [courseMessage, setCourseMessage] = useState("");
  const [courseMessageType, setCourseMessageType] = useState("success");
  const [enrollingCourseId, setEnrollingCourseId] = useState("");

  const userData = JSON.parse(localStorage.getItem("studentUser") || "{}");

  const getCourseIcon = (category = "") => {
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("program")) return Code2;
    if (lowerCategory.includes("ai") || lowerCategory.includes("ml")) return Database;
    if (lowerCategory.includes("data")) return Database;

    return Laptop;
  };

  const getCourseBanner = (index) => {
    const banners = [
      "from-orange-500 via-red-500 to-pink-600",
      "from-cyan-400 via-blue-500 to-purple-600",
      "from-purple-500 via-fuchsia-500 to-orange-500",
      "from-emerald-400 via-cyan-500 to-blue-600",
    ];

    return banners[index % banners.length];
  };

  const normalizeBackendCourse = (course, index) => {
    return {
      id: course._id,
      _id: course._id,
      title: course.title || "Untitled Course",
      mentor: course.mentorName || course.mentor || "UptoSkills Mentor",
      category: course.category || "General",
      level: course.level || "Beginner",
      price: course.isFree ? "Free" : `₹${course.price || 0}`,
      duration: course.duration || "N/A",
      rating: course.rating || 4.8,
      icon: getCourseIcon(course.category),
      banner: getCourseBanner(index),
      description: course.description || "No description added.",
      videoUrl: course.videoUrl || "",
      certificateIncluded: course.certificateIncluded,
      raw: course,
    };
  };

  const fetchLandingCourses = async () => {
    try {
      setCourseLoading(true);

      const data = await getCourses();

      const formattedCourses = (data || []).map((course, index) =>
        normalizeBackendCourse(course, index)
      );

      setBackendCourses(formattedCourses);
    } catch (error) {
      console.log("Course fetch failed:", error.message);
      setBackendCourses([]);
    } finally {
      setCourseLoading(false);
    }
  };

  const fetchMyEnrollments = async () => {
    const latestUser = JSON.parse(localStorage.getItem("studentUser") || "{}");

    if (!latestUser.email) {
      setEnrollments([]);
      return;
    }

    try {
      const data = await getEnrollmentsByStudentEmail(latestUser.email);
      setEnrollments(data || []);
    } catch {
      setEnrollments([]);
    }
  };

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("studentToken")));

    fetchLandingCourses();
    fetchMyEnrollments();

    const enrollmentTimer = setInterval(() => {
      fetchMyEnrollments();
    }, 5000);

    const timer = setInterval(() => {
      setSuggestionIndex((prev) => (prev + 1) % searchSuggestions.length);
    }, 1800);

    return () => {
      clearInterval(timer);
      clearInterval(enrollmentTimer);
    };
  }, []);

  const displayCourses = backendCourses.length > 0 ? backendCourses : fallbackCourses;

  const filteredCourses = useMemo(() => {
    if (!searchText.trim()) return displayCourses;

    return displayCourses.filter((course) =>
      `${course.title} ${course.category} ${course.mentor}`
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );
  }, [searchText, displayCourses]);

  const handleSearch = (event) => {
    event.preventDefault();
    document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const isCourseEnrolled = (courseId) => {
    return enrollments.some((item) => String(item.courseId) === String(courseId));
  };

  const isPaidCourse = (course) => {
    if (!course) return false;

    const priceText = String(course.price || "").toLowerCase();

    if (priceText === "free" || priceText === "₹0" || priceText === "0") {
      return false;
    }

    const rawPrice = course.raw?.price ?? course.price ?? 0;
    const numericPrice = Number(String(rawPrice).replace(/[^\d.]/g, ""));

    return numericPrice > 0;
  };

  const handleEnroll = async (course) => {
    const latestUser = JSON.parse(localStorage.getItem("studentUser") || "{}");

    if (!localStorage.getItem("studentToken") || !latestUser.email) {
      navigate("/login", {
        state: {
          redirectAfterLogin: "/",
          selectedCourseId: course._id || course.id,
        },
      });
      return;
    }

    if (!course._id) {
      setCourseMessageType("error");
      setCourseMessage("This course is not connected with backend yet.");
      return;
    }

    if (isCourseEnrolled(course._id)) {
      setCourseMessageType("success");
      setCourseMessage(`You are already enrolled in ${course.title}.`);
      return;
    }

    if (isPaidCourse(course)) {
      navigate(`/payment/${course._id}`, {
        state: {
          course: {
            id: course._id,
            title: course.title,
            description: course.description,
            category: course.category,
            level: course.level,
            duration: course.duration,
            mentor: course.mentor,
            price: course.price,
            rating: course.rating,
            certificateIncluded: course.certificateIncluded,
          },
        },
      });
      return;
    }

    try {
      setCourseMessage("");
      setCourseMessageType("success");
      setEnrollingCourseId(course._id);

      await createCourseEnrollment({
        courseId: course._id,
        studentName: latestUser.name || "Student",
        email: latestUser.email,
        phone: latestUser.phone || "",
        paymentStatus: "Free",
        amountPaid: 0,
      });

      setCourseMessage(`${course.title} enrolled successfully.`);
      await fetchMyEnrollments();
    } catch (error) {
      setCourseMessageType("error");
      setCourseMessage(error.message || "Enrollment failed.");
    } finally {
      setEnrollingCourseId("");
    }
  };

  const toggleWishlist = (courseId) => {
    setWishlisted((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    setIsLoggedIn(false);
    setProfileMenuOpen(false);
    setEnrollments([]);
    navigate("/");
  };

  const pageBg = isDark ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-950";

  const navBg = isDark
    ? "bg-slate-950/65 border-white/10"
    : "bg-white/75 border-slate-200";

  const navText = isDark
    ? "text-slate-300 hover:text-cyan-300"
    : "text-slate-700 hover:text-blue-600";

  const cardBg = isDark
    ? "bg-slate-900/70 border-white/10"
    : "bg-white/80 border-slate-200 shadow-xl shadow-slate-300/30";

  const mutedText = isDark ? "text-slate-300" : "text-slate-600";

  const dropdownItemClass = isDark
    ? "text-slate-300 hover:bg-white/10 hover:text-cyan-300"
    : "text-slate-700 hover:bg-slate-100 hover:text-blue-600";

  return (
    <div className={`min-h-screen overflow-hidden ${pageBg}`}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-16px); }
          }

          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animated-gradient-text {
            background: linear-gradient(90deg, #22d3ee, #a78bfa, #fb923c, #22d3ee);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientMove 5s ease infinite;
          }

          @keyframes gradientMove {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}
      </style>

      <div className="fixed inset-0 -z-10">
        <div className="absolute left-20 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-20 top-40 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" />

        {isDark && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[length:34px_34px]" />
        )}
      </div>

      <nav className={`sticky top-0 z-50 border-b ${navBg} backdrop-blur-2xl`}>
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div
            className={`rounded-[1.6rem] border px-5 py-3 backdrop-blur-xl ${
              isDark
                ? "border-white/10 bg-white/5 shadow-2xl shadow-cyan-500/5"
                : "border-slate-200 bg-white/70 shadow-xl shadow-slate-300/30"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center">
                <img
                  src={uptoskillsLogo}
                  alt="UptoSkills Logo"
                  className="h-14 w-auto object-contain"
                />
              </Link>

              <div className="hidden items-center gap-7 lg:flex">
                <Link to="/" className={`${navText} transition`}>
                  Home
                </Link>

                <button
                  onClick={() =>
                    document
                      .getElementById("courses-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`${navText} transition`}
                >
                  Courses
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("placements-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`${navText} transition`}
                >
                  Placements
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("mentors-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`${navText} transition`}
                >
                  Mentors
                </button>

                <Link to="/contact" className={`${navText} transition`}>
                  Contact
                </Link>
              </div>

              <form
                onSubmit={handleSearch}
                className={`hidden min-w-[340px] items-center gap-3 rounded-full border px-4 py-2.5 xl:flex ${
                  isDark
                    ? "border-white/10 bg-slate-900/80"
                    : "border-slate-300 bg-slate-100/80"
                }`}
              >
                <Search size={18} className="text-cyan-500" />

                <input
                  value={searchText}
                  onChange={(event) => setSearchText(event.target.value)}
                  placeholder={`Search ${searchSuggestions[suggestionIndex]}...`}
                  className={`w-full bg-transparent text-sm outline-none ${
                    isDark
                      ? "text-white placeholder:text-slate-400"
                      : "text-slate-900 placeholder:text-slate-500"
                  }`}
                />
              </form>

              <div className="hidden items-center gap-3 md:flex">
                {isLoggedIn ? (
                  <>
                    <button
                      className={`rounded-full border p-3 transition ${
                        isDark
                          ? "border-white/10 bg-white/5 text-cyan-300 hover:bg-white/10"
                          : "border-slate-300 bg-white text-blue-600 hover:bg-slate-100"
                      }`}
                    >
                      <Bell size={18} />
                    </button>

                    <button
                      onClick={() => setIsDark((prev) => !prev)}
                      className={`rounded-full border p-3 transition ${
                        isDark
                          ? "border-white/10 bg-white/5 text-orange-300 hover:bg-white/10"
                          : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <div
                      className="relative"
                      onMouseEnter={() => setProfileMenuOpen(true)}
                      onMouseLeave={() => setProfileMenuOpen(false)}
                    >
                      <button
                        onClick={() => setProfileMenuOpen((prev) => !prev)}
                        className={`rounded-full border p-3 transition ${
                          isDark
                            ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                            : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                        }`}
                      >
                        <User size={18} />
                      </button>

                      {profileMenuOpen && (
                        <div
                          className={`absolute right-0 top-14 z-[999] w-72 overflow-hidden rounded-3xl border backdrop-blur-2xl ${
                            isDark
                              ? "border-white/10 bg-slate-950/95 shadow-2xl shadow-cyan-500/10"
                              : "border-slate-200 bg-white/95 shadow-2xl shadow-slate-300/40"
                          }`}
                        >
                          <div
                            className={`border-b p-5 ${
                              isDark ? "border-white/10" : "border-slate-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {userData.photoURL ? (
                                <img
                                  src={userData.photoURL}
                                  alt="Profile"
                                  className="h-12 w-12 rounded-full object-cover"
                                />
                              ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 font-black text-slate-950">
                                  {(userData.name || "Student")
                                    .split(" ")
                                    .map((word) => word[0])
                                    .join("")
                                    .slice(0, 2)}
                                </div>
                              )}

                              <div>
                                <h3 className="font-black">
                                  {userData.name || "Student"}
                                </h3>

                                <p
                                  className={`text-xs ${
                                    isDark ? "text-slate-400" : "text-slate-500"
                                  }`}
                                >
                                  {userData.email || "Student Account"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="p-3">
                            <button
                              onClick={() => {
                                setProfileMenuOpen(false);
                                navigate("/profile");
                              }}
                              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition ${dropdownItemClass}`}
                            >
                              <User size={18} />
                              View Profile
                            </button>

                            <button
                              onClick={() => {
                                setProfileMenuOpen(false);
                                navigate("/dashboard");
                              }}
                              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition ${dropdownItemClass}`}
                            >
                              <LayoutDashboard size={18} />
                              Dashboard
                            </button>

                            <button
                              onClick={() => {
                                setProfileMenuOpen(false);
                                navigate("/dashboard");
                              }}
                              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition ${dropdownItemClass}`}
                            >
                              <BadgeCheck size={18} />
                              My Certificates
                            </button>

                            <button
                              onClick={() => {
                                setProfileMenuOpen(false);
                                alert("Settings page will be added next.");
                              }}
                              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-bold transition ${dropdownItemClass}`}
                            >
                              <Settings size={18} />
                              Settings
                            </button>

                            <div
                              className={`my-2 h-px ${
                                isDark ? "bg-white/10" : "bg-slate-200"
                              }`}
                            />

                            <button
                              onClick={handleLogout}
                              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left font-black text-red-400 transition hover:bg-red-500/10"
                            >
                              <LogOut size={18} />
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsDark((prev) => !prev)}
                      className={`rounded-full border p-3 transition ${
                        isDark
                          ? "border-white/10 bg-white/5 text-orange-300 hover:bg-white/10"
                          : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>

                    <Link
                      to="/login"
                      className="rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105 hover:bg-cyan-300"
                    >
                      Login
                    </Link>
                  </>
                )}
              </div>

              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className={`rounded-full border p-3 lg:hidden ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white"
                    : "border-slate-300 bg-white text-slate-900"
                }`}
              >
                {mobileOpen ? <X /> : <Menu />}
              </button>
            </div>

            {mobileOpen && (
              <div
                className={`mt-4 space-y-3 border-t pt-4 lg:hidden ${
                  isDark ? "border-white/10" : "border-slate-200"
                }`}
              >
                <Link to="/" className={`block ${navText}`}>
                  Home
                </Link>

                <button
                  onClick={() =>
                    document
                      .getElementById("courses-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`block ${navText}`}
                >
                  Courses
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("placements-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className={`block ${navText}`}
                >
                  Placements
                </button>

                <Link to="/contact" className={`block ${navText}`}>
                  Contact
                </Link>

                {isLoggedIn ? (
                  <>
                    <Link to="/profile" className="block text-cyan-400">
                      Profile
                    </Link>

                    <button onClick={handleLogout} className="block text-red-400">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="block text-cyan-400">
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-orange-200/70 via-purple-500/40 to-slate-950 p-8 shadow-2xl shadow-purple-500/20 md:p-14">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] bg-[length:30px_30px] opacity-30" />
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-orange-300/40 blur-[120px]" />
          <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-purple-500/30 blur-[130px]" />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/40 px-5 py-3 text-white backdrop-blur-xl">
                <Sparkles size={18} />
                Build Skills That Get You Hired
              </div>

              <h1 className="mt-8 max-w-2xl text-5xl font-black leading-tight text-black md:text-7xl">
                Unlock Your
                <br />
                <span className="text-white">Career Growth</span>
                <br />
                With One Click.
              </h1>

              <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-slate-100">
                Learn from top mentors, complete practical tasks, earn verified
                certificates and prepare yourself for better placement
                opportunities.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("courses-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center gap-3 rounded-full bg-slate-950 px-8 py-4 font-black text-white shadow-xl transition hover:scale-105"
                >
                  Start Learning <ArrowRight />
                </button>

                <Link
                  to="/login"
                  className="rounded-full border border-white/30 bg-white/10 px-8 py-4 font-black text-white backdrop-blur-xl transition hover:bg-white hover:text-slate-950"
                >
                  Join Now
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.map(([value, label, Icon]) => (
                  <div
                    key={label}
                    className="rounded-3xl border border-white/10 bg-slate-950/50 p-5 text-white backdrop-blur-xl transition hover:-translate-y-2"
                  >
                    <Icon className="text-cyan-300" />
                    <h3 className="mt-3 text-3xl font-black">{value}</h3>
                    <p className="text-sm text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <OrbitVisual />
          </div>
        </div>
      </section>

      <section id="courses-section" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-semibold text-cyan-400">Top Rated Courses</p>

            <h2 className="mt-2 text-4xl font-black md:text-5xl">
              Start Learning Today
            </h2>

            <p className={`mt-4 max-w-2xl text-sm leading-6 ${mutedText}`}>
              Choose from skill-based courses created for practical learning,
              certificates and placement preparation.
            </p>
          </div>

          <Link
            to="/courses"
            className="rounded-full border border-cyan-400/40 px-6 py-3 font-bold text-cyan-400 transition hover:bg-cyan-400 hover:text-slate-950"
          >
            View All Courses
          </Link>
        </div>

        {courseMessage && (
          <div
            className={`mt-6 rounded-2xl border p-4 font-bold ${
              courseMessageType === "error"
                ? "border-red-400/30 bg-red-400/10 text-red-300"
                : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
            }`}
          >
            {courseMessage}
          </div>
        )}

        {courseLoading && (
          <div className="mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4 font-bold text-cyan-300">
            Loading latest courses...
          </div>
        )}

        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {filteredCourses.slice(0, 6).map((course) => {
            const Icon = course.icon;
            const isWishlisted = wishlisted.includes(course.id);
            const enrolled = isCourseEnrolled(course._id);
            const loadingThisCourse = enrollingCourseId === course._id;

            return (
              <div
                key={course.id}
                className={`group overflow-hidden rounded-[2rem] border transition duration-300 hover:-translate-y-3 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10 ${cardBg}`}
              >
                <div className={`relative h-44 bg-gradient-to-br ${course.banner} p-6`}>
                  <div className="absolute right-5 top-5 rounded-full bg-black/25 px-3 py-1 text-sm font-bold text-white backdrop-blur-md">
                    {course.price}
                  </div>

                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                    <Icon size={34} className="text-white" />
                  </div>

                  <div className="absolute bottom-5 left-6 right-6">
                    <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black">{course.title}</h3>

                      <p className="mt-1 text-sm font-semibold text-cyan-400">
                        Mentor: {course.mentor}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleWishlist(course.id)}
                      className={`rounded-full border p-3 transition ${
                        isWishlisted
                          ? "border-pink-400 bg-pink-400/10 text-pink-400"
                          : isDark
                          ? "border-white/10 bg-white/5 text-slate-300 hover:text-pink-400"
                          : "border-slate-300 bg-white text-slate-600 hover:text-pink-500"
                      }`}
                    >
                      <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <p className={`mt-4 min-h-[72px] text-sm leading-6 ${mutedText}`}>
                    {course.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold">
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-400">
                      {course.level}
                    </span>

                    <span className="rounded-full bg-purple-400/10 px-3 py-1 text-purple-400">
                      {course.duration}
                    </span>

                    <span className="rounded-full bg-orange-400/10 px-3 py-1 text-orange-400">
                      ⭐ {course.rating}
                    </span>
                  </div>

                  <div className="mt-7 flex gap-3">
                    <button
                      onClick={() => alert(`${course.title}\n\n${course.description}`)}
                      className={`flex-1 rounded-full border px-4 py-3 text-sm font-bold transition hover:border-cyan-400 hover:text-cyan-400 ${
                        isDark ? "border-slate-600" : "border-slate-300"
                      }`}
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleEnroll(course)}
                      disabled={enrolled || loadingThisCourse}
                      className={`flex-1 rounded-full px-4 py-3 text-sm font-black transition ${
                        enrolled
                          ? "cursor-not-allowed bg-emerald-400/20 text-emerald-300"
                          : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                      }`}
                    >
                      {loadingThisCourse
                        ? "Enrolling..."
                        : enrolled
                        ? "Already Enrolled"
                        : "Enroll Now"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="placements-section" className="py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className={`rounded-[2rem] border p-8 ${cardBg}`}>
            <div className="text-center">
              <p className="font-semibold text-cyan-400">Career Support</p>

              <h2 className="mt-2 text-4xl font-black">
                Get Placed In These Companies
              </h2>

              <p className={`mt-3 ${mutedText}`}>
                Build skills, complete projects and prepare yourself for better
                career opportunities.
              </p>
            </div>

            <div className="mt-8 overflow-hidden">
              <div className="flex w-max gap-5" style={{ animation: "marquee 24s linear infinite" }}>
                {[...companyNames, ...companyNames].map((company, index) => (
                  <div
                    key={`${company}-${index}`}
                    className="flex h-20 min-w-[190px] items-center justify-center rounded-2xl border border-white/10 bg-slate-950/60 px-8 text-xl font-black text-slate-200 shadow-xl"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`rounded-[2rem] border p-7 transition hover:-translate-y-2 ${cardBg}`}
              >
                <Icon className="text-cyan-400" size={34} />

                <h3 className="mt-5 text-2xl font-black">{feature.title}</h3>

                <p className={`mt-3 text-sm leading-6 ${mutedText}`}>
                  {feature.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-semibold text-cyan-400">Learning Journey</p>

            <h2 className="mt-2 text-4xl font-black md:text-5xl">
              From Learning To Certificate
            </h2>

            <p className={`mt-4 max-w-xl leading-7 ${mutedText}`}>
              UptoSkills helps students follow a complete journey from choosing
              a course to earning certificate and preparing for placement.
            </p>
          </div>

          <div className="grid gap-4">
            {journeySteps.map((step, index) => (
              <div
                key={step.title}
                className={`flex gap-5 rounded-[2rem] border p-5 ${cardBg}`}
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 text-xl font-black text-slate-950">
                  {index + 1}
                </div>

                <div>
                  <h3 className="text-xl font-black">{step.title}</h3>
                  <p className={`mt-2 text-sm leading-6 ${mutedText}`}>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="mentors-section" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="font-semibold text-cyan-400">Mentor Stories</p>

          <h2 className="mt-2 text-4xl font-black md:text-5xl">
            Learn With Inspiring Mentors
          </h2>

          <p className={`mt-5 max-w-xl leading-8 ${mutedText}`}>
            Our mentor style learning experience motivates students to stay
            consistent, practice regularly and build a better career path.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("courses-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-cyan-400 px-7 py-4 font-black text-slate-950 transition hover:scale-105"
            >
              Explore Courses
            </button>

            <Link
              to="/login"
              className={`rounded-full border px-7 py-4 font-black transition hover:border-cyan-400 hover:text-cyan-400 ${
                isDark ? "border-white/20" : "border-slate-300"
              }`}
            >
              Join UptoSkills
            </Link>
          </div>
        </div>

        <MentorStorySlider isDark={isDark} />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <p className="font-semibold text-cyan-400">Student Reviews</p>

          <h2 className="mt-2 text-4xl font-black md:text-5xl">
            What Learners Say
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className={`rounded-[2rem] border p-7 ${cardBg}`}>
              <div className="flex gap-1 text-orange-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} fill="currentColor" />
                ))}
              </div>

              <p className={`mt-5 text-sm leading-7 ${mutedText}`}>"{item.text}"</p>

              <div className="mt-6">
                <h3 className="font-black">{item.name}</h3>
                <p className="text-sm text-cyan-400">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-orange-500/20 p-10 text-center shadow-2xl shadow-cyan-500/10">
          <h2 className="text-4xl font-black md:text-5xl">
            Start Your Skill Journey Today
          </h2>

          <p className={`mx-auto mt-5 max-w-2xl leading-7 ${mutedText}`}>
            Join UptoSkills, enroll in top courses, complete tasks, earn
            certificates and build your future.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("courses-section")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-cyan-400 px-8 py-4 font-black text-slate-950 transition hover:scale-105"
            >
              Start Learning
            </button>

            <Link
              to="/login"
              className={`rounded-full border px-8 py-4 font-black transition hover:border-cyan-400 hover:text-cyan-400 ${
                isDark ? "border-white/20" : "border-slate-300"
              }`}
            >
              Login Now
            </Link>
          </div>
        </div>
      </section>

      <footer
        className={`mt-16 border-t px-6 py-12 backdrop-blur-xl ${
          isDark
            ? "border-white/10 bg-slate-950/70"
            : "border-slate-200 bg-white/70"
        }`}
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <img
              src={uptoskillsLogo}
              alt="UptoSkills Logo"
              className="h-16 w-auto object-contain"
            />

            <p className={`mt-4 text-sm leading-6 ${mutedText}`}>
              UptoSkills LMS helps students learn skills, complete tasks, track
              progress and grow career.
            </p>
          </div>

          <div>
            <h3 className="font-black">Quick Links</h3>

            <div className={`mt-4 space-y-3 text-sm ${mutedText}`}>
              <Link to="/" className="block hover:text-cyan-400">
                Home
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById("courses-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="block hover:text-cyan-400"
              >
                Courses
              </button>

              <Link to="/login" className="block hover:text-cyan-400">
                Login
              </Link>

              <Link to="/register" className="block hover:text-cyan-400">
                Register
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-black">Popular Courses</h3>

            <div className={`mt-4 space-y-3 text-sm ${mutedText}`}>
              <p>Java Full Course</p>
              <p>Python Basics</p>
              <p>AI & Machine Learning</p>
              <p>Web Development</p>
            </div>
          </div>

          <div>
            <h3 className="font-black">Contact Details</h3>

            <div className={`mt-4 space-y-4 text-sm ${mutedText}`}>
              <p className="flex items-center gap-3">
                <MapPin size={18} className="text-cyan-400" />
                Jaipur, Rajasthan, India
              </p>

              <p className="flex items-center gap-3">
                <Phone size={18} className="text-cyan-400" />
                +91 9887196182
              </p>

              <p className="flex items-center gap-3">
                <Mail size={18} className="text-cyan-400" />
                support@uptoskills.com
              </p>
            </div>
          </div>
        </div>

        <div
          className={`mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t pt-6 text-sm md:flex-row ${
            isDark ? "border-white/10 text-slate-500" : "border-slate-200 text-slate-500"
          }`}
        >
          <p>© 2026 UptoSkills LMS. All rights reserved.</p>
          <p>Privacy Policy • Terms & Conditions • Support</p>
        </div>
      </footer>

      <button className="fixed bottom-24 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500 text-white shadow-2xl shadow-purple-500/30 transition hover:scale-110">
        <MessageCircle />
      </button>

      <button
        onClick={() =>
          window.open(
            "https://wa.me/919887196182?text=Hello%20UptoSkills%2C%20I%20need%20help%20regarding%20LMS%20platform.",
            "_blank"
          )
        }
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition hover:scale-110"
      >
        <CheckCircle2 />
      </button>
    </div>
  );
}