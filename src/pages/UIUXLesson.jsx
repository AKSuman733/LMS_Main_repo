import { useState } from "react";

import {
  Play,
  Pause,
  Volume2,
  Maximize,
  CheckCircle2,
  Lock,
  Clock3,
  Download,
  FileText,
  MessageSquare,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { colors } from "../styles/designTokens";

export default function UIUXLesson() {

  // =========================================
  // LESSONS
  // =========================================

  const lessons = [

    {
      title: "Introduction to UI/UX",
      duration: "12 mins",
      completed: false,
    },

    {
      title: "Design Thinking",
      duration: "18 mins",
      completed: false,
    },

    {
      title: "Wireframing Basics",
      duration: "15 mins",
      completed: false,
    },

    {
      title: "Color Theory",
      duration: "20 mins",
      completed: false,
    },

    {
      title: "Typography",
      duration: "16 mins",
      completed: false,
    },

    {
      title: "Figma Essentials",
      duration: "24 mins",
      completed: false,
    },

    {
      title: "Mobile UI Design",
      duration: "22 mins",
      completed: false,
    },

    {
      title: "Web Design Principles",
      duration: "19 mins",
      completed: false,
    },

    {
      title: "User Research",
      duration: "17 mins",
      completed: false,
    },

    {
      title: "Prototyping",
      duration: "26 mins",
      completed: false,
    },

    {
      title: "UI Components",
      duration: "21 mins",
      completed: false,
    },

    {
      title: "Dark Mode Design",
      duration: "18 mins",
      completed: false,
    },

    {
      title: "Dashboard Design",
      duration: "28 mins",
      completed: false,
    },

    {
      title: "Design Systems",
      duration: "25 mins",
      completed: false,
    },

    {
      title: "Portfolio Project",
      duration: "32 mins",
      completed: false,
    },

  ];

  // =========================================
  // AI TEACHERS
  // =========================================

  const teachers = [

    {
      name: "Deepika Padukone",
      image:
        "https://www.hindustantimes.com/ht-img/img/2024/02/15/original/Deepika_Padukone_Hilton_1707982914236.jpg",
    },

    {
      name: "Ranveer Singh",
      image:
        "https://artistbookingcompany.com/wp-content/uploads/2024/03/ranveer-singh-680x680.jpg",
    },

    {
      name: "Sai Pallavi",
      image:
        "https://media.themoviedb.org/t/p/w235_and_h235_face/qAPdGKUIUEzLibdgVCey7oKvvME.jpg",
    },

    {
      name: "Vijay",
      image:
        "https://a10.gaanacdn.com/gn_img/artists/NOXWVgbkqL/NOXWVmz3kq/size_m_1737701179.jpg",
    },

    {
      name: "Surya",
      image:
        "https://i.pinimg.com/236x/5f/ea/fb/5feafb1359161923142adf03f123141b.jpg",
    },

  ];

  // =========================================
  // STATES
  // =========================================

  const [selectedTeacher, setSelectedTeacher] =
    useState(teachers[0]);

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
          className="w-[260px] min-h-screen border-r p-4 overflow-y-auto"
          style={{
            backgroundColor: colors.surface,
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >

          <div className="mb-6">

            <h1
              className="text-3xl font-bold mb-2"
              style={{
                color: colors.secondary,
              }}
            >
              UI/UX 🎨
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              15 Lessons • Design Course
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
                      ? colors.secondary
                      : "#111827",

                  color:
                    activeLesson === index
                      ? "#000"
                      : colors.textPrimary,

                  border:
                    activeLesson === index
                      ? `1px solid ${colors.secondary}`
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

                  {lesson.completed ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}

                </div>

              </div>

            ))}

          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6">

          {/* HEADER */}
          <div className="mb-5">

            <div className="flex items-center gap-3 mb-3">

              <span
                className="px-3 py-2 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    "rgba(0,181,165,0.12)",

                  color: colors.secondary,
                }}
              >
                UI / UX
              </span>

              <span
                className="px-3 py-2 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    "rgba(255,255,255,0.06)",
                }}
              >
                DESIGN COURSE
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
              Learn professional UI/UX design,
              user research, prototyping,
              wireframing and modern product
              design workflows using Figma.
            </p>

          </div>

          {/* VIDEO */}
          <div
            className="rounded-[30px] overflow-hidden border mb-5"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >

            <div className="relative">

              <img
                src="https://echopx.com/wp-content/uploads/2022/06/ui-ux-design.jpg"
                alt="UI UX"
                className="w-full h-[430px] object-cover opacity-70"
              />

              <div className="absolute inset-0 bg-black/40"></div>

              {/* PLAY */}
              <button
                onClick={() =>
                  setIsPlaying(!isPlaying)
                }
                className="absolute inset-0 flex items-center justify-center"
              >

                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor:
                      "rgba(0,0,0,0.45)",

                    backdropFilter: "blur(12px)",
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
                      width: "20%",
                      background:
                        `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})`,
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
                      04:20 / 21:40
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

          {/* AI TEACHERS */}
          <div
            className="rounded-[30px] p-6 border mb-5"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >

            <h2
              className="text-2xl font-bold mb-5"
              style={{
                color: colors.secondary,
              }}
            >
              AI Teachers 🤖
            </h2>

            <div className="flex items-center justify-between gap-2">

              {teachers.map((teacher, index) => (

                <div
                  key={index}
                  onClick={() =>
                    setSelectedTeacher(teacher)
                  }
                  className="cursor-pointer"
                >

                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className={`
                      w-20 h-20 rounded-2xl object-cover border-2
                      ${
                        selectedTeacher.name ===
                        teacher.name
                          ? "border-cyan-400"
                          : "border-transparent"
                      }
                    `}
                  />

                </div>

              ))}

            </div>

          </div>

          {/* NOTES */}
          <div
            className="rounded-[30px] p-6 border mb-5"
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
                    backgroundColor:
                      colors.secondary,

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

                  <FileText className="w-4 h-4" />

                  Figma File

                </button>

              </div>

            </div>

            <p
              className="text-base leading-8"
              style={{
                color: colors.textSecondary,
              }}
            >
              This lesson covers UI principles,
              user experience strategies,
              typography, spacing systems,
              wireframing and modern interface
              design workflows.
            </p>

          </div>

        </main>

      </div>

      {/* CHAT */}
      <div
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all"
        style={{
          background:
            `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
        }}
      >

        <MessageSquare className="w-6 h-6 text-white" />

      </div>

    </div>

  );
}