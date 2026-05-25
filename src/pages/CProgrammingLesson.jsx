import { useState } from "react";

import Navbar from "../components/Navbar";

import {
  Play,
  Pause,
  Volume2,
  Maximize,
  Download,
  Lock,
  Clock3,
  MessageSquare,
  Code2,
} from "lucide-react";

import { colors } from "../styles/designTokens";

export default function CProgrammingLesson() {

  const lessons = [

    {
      title: "Introduction to C",
      duration: "12 mins",
    },

    {
      title: "Variables & Data Types",
      duration: "15 mins",
    },

    {
      title: "Operators",
      duration: "14 mins",
    },

    {
      title: "Conditional Statements",
      duration: "16 mins",
    },

    {
      title: "Loops",
      duration: "18 mins",
    },

    {
      title: "Functions",
      duration: "20 mins",
    },

    {
      title: "Arrays",
      duration: "17 mins",
    },

    {
      title: "Strings",
      duration: "16 mins",
    },

    {
      title: "Pointers",
      duration: "22 mins",
    },

    {
      title: "Structures",
      duration: "19 mins",
    },

    {
      title: "Dynamic Memory Allocation",
      duration: "24 mins",
    },

    {
      title: "File Handling",
      duration: "20 mins",
    },

    {
      title: "Recursion",
      duration: "18 mins",
    },

    {
      title: "Header Files",
      duration: "16 mins",
    },

    {
      title: "Preprocessors",
      duration: "21 mins",
    },

    {
      title: "Mini Calculator Project",
      duration: "25 mins",
    },

    {
      title: "Bank Management System",
      duration: "28 mins",
    },

    {
      title: "Student Record System",
      duration: "32 mins",
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
                color: "#14b8a6",
              }}
            >
              C Programming 💻
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              18 Lessons • Beginner Course
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
                      ? "#14b8a6"
                      : "#111827",

                  color:
                    activeLesson === index
                      ? "#000"
                      : colors.textPrimary,

                  border:
                    activeLesson === index
                      ? "1px solid #14b8a6"
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

                  <Lock className="w-5 h-5 text-orange-400" />

                </div>

              </div>

            ))}

          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">

          {/* TITLE */}
          <div className="mb-6">

            <div className="flex items-center gap-3 mb-3">

              <span
                className="px-3 py-2 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    "rgba(20,184,166,0.15)",

                  color: "#14b8a6",
                }}
              >
                C PROGRAMMING
              </span>

              <span
                className="px-3 py-2 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.06)",
                }}
              >
                BEGINNER
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
              Learn C programming basics,
              pointers, memory management,
              file handling and coding projects.
            </p>

          </div>

          {/* VIDEO */}
          <div
            className="rounded-[32px] overflow-hidden border mb-6 relative"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >

            <img
              src={selectedMentor.image}
              alt="mentor"
              className="w-full h-[500px] object-cover opacity-70"
            />

            <div className="absolute inset-0 bg-black/45"></div>

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
                      "linear-gradient(90deg,#14b8a6,#06b6d4)",
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
                    00:00 / 00:00
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
                      "linear-gradient(90deg,#14b8a6,#06b6d4)",
                  }}
                ></div>

              </div>

              <p
                style={{
                  color: colors.textSecondary,
                }}
              >
                0 / 18 lessons completed
              </p>

            </div>

            {/* MENTORS */}
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
                  color: "#14b8a6",
                }}
              >
                C Mentors 💻
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
                            ? "border-teal-400"
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
                    backgroundColor: "#14b8a6",
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

                  <Code2 className="w-4 h-4" />

                  Source Code

                </button>

              </div>

            </div>

            <p
              className="text-base leading-8"
              style={{
                color: colors.textSecondary,
              }}
            >
              Learn C syntax, pointers,
              arrays, loops, functions,
              structures and real-world
              coding concepts.
            </p>

          </div>

        </main>

      </div>

      {/* CHAT BUTTON */}
      <div
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all"
        style={{
          background:
            "linear-gradient(135deg,#14b8a6,#06b6d4)",
        }}
      >

        <MessageSquare className="w-6 h-6 text-white" />

      </div>

    </div>

  );
}