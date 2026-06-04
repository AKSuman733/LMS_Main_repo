import { useState } from "react";

import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Download,
  Lock,
  Clock3,
  MessageSquare,
  BrainCircuit,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { colors } from "../styles/designTokens";

export default function ArtificialIntelligenceLesson() {

  const lessons = [

    {
      title: "Introduction to AI",
      duration: "18 mins",
      completed: false,
    },

    {
      title: "History of Artificial Intelligence",
      duration: "20 mins",
      completed: false,
    },

    {
      title: "Types of AI",
      duration: "16 mins",
      completed: false,
    },

    {
      title: "AI Applications",
      duration: "22 mins",
      completed: false,
    },

    {
      title: "Future of AI",
      duration: "19 mins",
      completed: false,
    },

    {
      title: "Supervised Learning",
      duration: "24 mins",
      completed: false,
    },

    {
      title: "Unsupervised Learning",
      duration: "18 mins",
      completed: false,
    },

    {
      title: "Regression Models",
      duration: "17 mins",
      completed: false,
    },

    {
      title: "Classification Models",
      duration: "25 mins",
      completed: false,
    },

    {
      title: "Model Evaluation",
      duration: "28 mins",
      completed: false,
    },

    {
      title: "Neural Networks",
      duration: "21 mins",
      completed: false,
    },

    {
      title: "CNN Basics",
      duration: "23 mins",
      completed: false,
    },

    {
      title: "RNN Basics",
      duration: "30 mins",
      completed: false,
    },

    {
      title: "Transformers",
      duration: "26 mins",
      completed: false,
    },

    {
      title: "AI Image Recognition",
      duration: "20 mins",
      completed: false,
    },

    {
      title: "Chatbots",
      duration: "32 mins",
      completed: false,
    },

    {
      title: "Generative AI",
      duration: "24 mins",
      completed: false,
    },

    {
      title: "AI Ethics",
      duration: "35 mins",
      completed: false,
    },

    {
      title: "OpenAI APIs",
      duration: "27 mins",
      completed: false,
    },

    {
      title: "Final AI Project",
      duration: "40 mins",
      completed: false,
    },

  ];

  const mentors = [

    {
      image:
        "https://www.hindustantimes.com/ht-img/img/2024/02/15/original/Deepika_Padukone_Hilton_1707982914236.jpg",
    },

    {
      image:
        "https://artistbookingcompany.com/wp-content/uploads/2024/03/ranveer-singh-680x680.jpg",
    },

    {
      image:
        "https://media.themoviedb.org/t/p/w235_and_h235_face/qAPdGKUIUEzLibdgVCey7oKvvME.jpg",
    },

    {
      image:
        "https://a10.gaanacdn.com/gn_img/artists/NOXWVgbkqL/NOXWVmz3kq/size_m_1737701179.jpg",
    },

    {
      image:
        "https://i.pinimg.com/236x/5f/ea/fb/5feafb1359161923142adf03f123141b.jpg",
    },

  ];

  const [selectedMentor, setSelectedMentor] =
    useState(mentors[0]);

  const [activeLesson, setActiveLesson] =
    useState(0);

  const [isPlaying, setIsPlaying] =
    useState(false);

  return (

    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      <Navbar />

      <div className="flex">

        {/* SIDEBAR */}
        <aside
          className="w-[290px] min-h-screen border-r p-4 overflow-y-auto"
          style={{
            backgroundColor: colors.surface,
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >

          <div className="mb-6">

            <h1
              className="text-3xl font-bold mb-2"
              style={{
                color: "#38bdf8",
              }}
            >
              AI 🤖
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              20 Lessons • AI Masterclass
            </p>

          </div>

          {/* LESSONS */}
          <div className="space-y-3">

            {lessons.map((lesson, index) => (

              <div
                key={index}
                onClick={() =>
                  setActiveLesson(index)
                }
                className="p-4 rounded-[22px] cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor:
                    activeLesson === index
                      ? "#38bdf8"
                      : "#111827",

                  color:
                    activeLesson === index
                      ? "#000"
                      : colors.textPrimary,

                  border:
                    activeLesson === index
                      ? "1px solid #38bdf8"
                      : "1px solid rgba(255,255,255,0.05)",
                }}
              >

                <div className="flex justify-between items-start gap-3">

                  <div>

                    <h3 className="font-bold text-base mb-1">
                      Lesson {index + 1}
                    </h3>

                    <p className="text-sm leading-6">
                      {lesson.title}
                    </p>

                    <div className="flex items-center gap-2 mt-2 text-xs">

                      <Clock3 className="w-3 h-3" />

                      <span>
                        {lesson.duration}
                      </span>

                    </div>

                  </div>

                  <Lock className="w-4 h-4" />

                </div>

              </div>

            ))}

          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">

          {/* HEADER */}
          <div className="mb-6">

            <div className="flex items-center gap-3 mb-3">

              <span
                className="px-3 py-2 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    "rgba(56,189,248,0.15)",

                  color: "#38bdf8",
                }}
              >
                ARTIFICIAL INTELLIGENCE
              </span>

              <span
                className="px-3 py-2 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.06)",
                }}
              >
                MACHINE LEARNING
              </span>

            </div>

            <h1 className="text-5xl font-bold leading-tight mb-4">

              {lessons[activeLesson].title}

            </h1>

            <p
              className="text-lg leading-8 max-w-4xl"
              style={{
                color: colors.textSecondary,
              }}
            >
              Learn modern Artificial Intelligence,
              neural networks, machine learning,
              generative AI and practical AI
              development with real-world projects.
            </p>

          </div>

          {/* VIDEO */}
          <div
            className="rounded-[32px] overflow-hidden border mb-6"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >

            <div className="relative">

              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600"
                alt="AI"
                className="w-full h-[500px] object-cover opacity-70"
              />

              <div className="absolute inset-0 bg-black/40"></div>

              {/* PLAY BUTTON */}
              <button
                onClick={() =>
                  setIsPlaying(!isPlaying)
                }
                className="absolute inset-0 flex items-center justify-center"
              >

                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center hover:scale-110 transition-all"
                  style={{
                    backgroundColor:
                      "rgba(0,0,0,0.45)",

                    backdropFilter: "blur(14px)",
                  }}
                >

                  {isPlaying ? (

                    <Pause className="w-10 h-10 text-white" />

                  ) : (

                    <Play
                      className="w-10 h-10 ml-1 text-white"
                      fill="white"
                    />

                  )}

                </div>

              </button>

              {/* CONTROLS */}
              <div
                className="absolute bottom-0 left-0 right-0 p-5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
                }}
              >

                <div
                  className="w-full h-2 rounded-full overflow-hidden mb-4"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.12)",
                  }}
                >

                  <div
                    className="h-full rounded-full"
                    style={{
                      width: "0%",
                      background:
                        "linear-gradient(90deg,#38bdf8,#6366f1)",
                    }}
                  ></div>

                </div>

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <button
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor:
                          "rgba(255,255,255,0.12)",
                      }}
                    >

                      {isPlaying ? (
                        <Pause />
                      ) : (
                        <Play fill="white" />
                      )}

                    </button>

                    <button
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor:
                          "rgba(255,255,255,0.12)",
                      }}
                    >

                      <Volume2 />

                    </button>

                  </div>

                  <div className="flex items-center gap-5">

                    <span className="text-sm text-gray-300">
                      00:00 / 24:40
                    </span>

                    <button
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor:
                          "rgba(255,255,255,0.12)",
                      }}
                    >

                      <Maximize />

                    </button>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* PROGRESS + MENTORS */}
          <div className="grid md:grid-cols-2 gap-5 mb-6">

            {/* PROGRESS */}
            <div
              className="rounded-[30px] p-6 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >

              <h2 className="text-2xl font-bold mb-5">
                Progress 🚀
              </h2>

              <div className="flex justify-between mb-3">

                <span
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Completed
                </span>

                <span className="font-bold">
                  0%
                </span>

              </div>

              <div
                className="w-full h-3 rounded-full overflow-hidden mb-4"
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.08)",
                }}
              >

                <div
                  className="h-full rounded-full"
                  style={{
                    width: "0%",
                    background:
                      "linear-gradient(90deg,#38bdf8,#6366f1)",
                  }}
                ></div>

              </div>

              <p
                style={{
                  color: colors.textSecondary,
                }}
              >
                0 / 20 lessons completed
              </p>

            </div>

            {/* AI TUTORS */}
            <div
              className="rounded-[30px] p-6 border"
              style={{
                backgroundColor: colors.surface,
                borderColor: "rgba(255,255,255,0.06)",
              }}
            >

              <h2
                className="text-2xl font-bold mb-5"
                style={{
                  color: "#38bdf8",
                }}
              >
                AI Tutors 🤖
              </h2>

              <div className="flex items-center justify-between gap-2">

                {mentors.map((mentor, index) => (

                  <div
                    key={index}
                    onClick={() =>
                      setSelectedMentor(mentor)
                    }
                    className="cursor-pointer"
                  >

                    <img
                      src={mentor.image}
                      alt="mentor"
                      className={`
                        w-20 h-20 rounded-2xl object-cover border-2
                        ${
                          selectedMentor.image ===
                          mentor.image
                            ? "border-sky-400"
                            : "border-transparent"
                        }
                      `}
                    />

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* NOTES */}
          <div
            className="rounded-[30px] p-6 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >

            <div className="flex justify-between items-center mb-5">

              <h2 className="text-2xl font-bold">
                Lesson Notes 📘
              </h2>

              <div className="flex gap-3">

                <button
                  className="px-4 py-3 rounded-2xl font-bold flex items-center gap-2"
                  style={{
                    backgroundColor: "#38bdf8",
                    color: "#000",
                  }}
                >

                  <Download className="w-4 h-4" />

                  PDF

                </button>

                <button
                  className="px-4 py-3 rounded-2xl font-bold flex items-center gap-2"
                  style={{
                    backgroundColor:
                      "rgba(255,255,255,0.06)",
                  }}
                >

                  <BrainCircuit className="w-4 h-4" />

                  AI Labs

                </button>

              </div>

            </div>

            <p
              className="text-base leading-8"
              style={{
                color: colors.textSecondary,
              }}
            >
              Learn machine learning, neural
              networks, deep learning, transformers,
              AI ethics and real-world generative AI
              applications using modern AI workflows.
            </p>

          </div>

        </main>

      </div>

      {/* CHAT BUTTON */}
      <div
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all"
        style={{
          background:
            "linear-gradient(135deg,#38bdf8,#6366f1)",
        }}
      >

        <MessageSquare className="w-6 h-6 text-white" />

      </div>

    </div>

  );
}