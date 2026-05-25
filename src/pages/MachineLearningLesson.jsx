import { useState } from "react";

import {
  Play,
  Pause,
  Volume2,
  Maximize,
  CheckCircle2,
  Trophy,
  Bot,
  Download,
  FileText,
  Lock,
  Clock3,
  Sparkles,
  MessageSquare,
  Brain,
  Star,
  Users,
  BarChart3,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { colors } from "../styles/designTokens";

export default function MachineLearningLesson() {

  // =========================================
  // LESSONS
  // =========================================

  const lessons = [

    {
      title: "Introduction to Machine Learning",
      duration: "18 mins",
      completed: true,
    },

    {
      title: "Python for Data Science",
      duration: "22 mins",
      completed: true,
    },

    {
      title: "NumPy & Pandas",
      duration: "20 mins",
      completed: true,
    },

    {
      title: "Data Visualization",
      duration: "16 mins",
      completed: true,
    },

    {
      title: "Data Cleaning",
      duration: "19 mins",
      completed: true,
    },

    {
      title: "Supervised Learning",
      duration: "24 mins",
      completed: true,
    },

    {
      title: "Linear Regression",
      duration: "21 mins",
      completed: true,
    },

    {
      title: "Logistic Regression",
      duration: "18 mins",
      completed: true,
    },

    {
      title: "Decision Trees",
      duration: "25 mins",
      completed: true,
    },

    {
      title: "Random Forest",
      duration: "22 mins",
      completed: true,
    },

    {
      title: "Support Vector Machines",
      duration: "26 mins",
      completed: true,
    },

    {
      title: "K-Means Clustering",
      duration: "20 mins",
      completed: true,
    },

    {
      title: "Neural Networks",
      duration: "28 mins",
      completed: true,
    },

    {
      title: "Deep Learning Basics",
      duration: "30 mins",
      completed: true,
    },

    {
      title: "TensorFlow Introduction",
      duration: "24 mins",
      completed: true,
    },

    {
      title: "Image Classification",
      duration: "27 mins",
      completed: true,
    },

    {
      title: "Natural Language Processing",
      duration: "32 mins",
      completed: true,
    },

    {
      title: "Model Deployment",
      duration: "18 mins",
      completed: false,
    },

    {
      title: "AI Ethics",
      duration: "14 mins",
      completed: false,
    },

    {
      title: "Final ML Project",
      duration: "35 mins",
      completed: false,
    },

  ];

  // =========================================
  // TEACHERS
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

  // =========================================
  // PROGRESS
  // =========================================

  const completedLessons =
    lessons.filter((lesson) => lesson.completed).length;

  const progress =
    (completedLessons / lessons.length) * 100;

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
          className="w-[280px] min-h-screen border-r p-4 overflow-y-auto"
          style={{
            backgroundColor: colors.surface,
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >

          <div className="mb-6">

            <h1
              className="text-3xl font-bold mb-2"
              style={{
                color: colors.secondary,
              }}
            >
              Machine Learning 🤖
            </h1>

            <p
              className="text-sm"
              style={{
                color: colors.textSecondary,
              }}
            >
              20 Lessons • AI Specialization
            </p>

          </div>

          {/* RESUME */}
          <div
            className="p-4 rounded-[24px] mb-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,181,165,0.12), rgba(255,119,67,0.12))",

              border:
                "1px solid rgba(255,255,255,0.06)",
            }}
          >

            <p
              className="text-xs mb-1"
              style={{
                color: colors.textSecondary,
              }}
            >
              Resume Learning
            </p>

            <h2 className="text-lg font-bold mb-1">
              Neural Networks
            </h2>

            <p
              className="text-xs"
              style={{
                color: colors.textSecondary,
              }}
            >
              Last watched 3 hours ago
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
          <div className="mb-6">

            <div className="flex items-center gap-3 mb-3">

              <span
                className="px-3 py-2 rounded-full text-xs font-bold"
                style={{
                  backgroundColor:
                    "rgba(0,181,165,0.12)",

                  color: colors.secondary,
                }}
              >
                AI SPECIALIZATION
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
              Learn supervised learning, deep learning,
              datasets, AI models and deployment
              systems with real-world projects.
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
                src={selectedTeacher.image}
                alt={selectedTeacher.name}
                className="w-full h-[500px] object-cover opacity-75"
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

              {/* AI BADGE */}
              <div
                className="absolute top-5 left-5 px-4 py-2 rounded-full"
                style={{
                  backgroundColor:
                    "rgba(0,0,0,0.45)",

                  backdropFilter: "blur(12px)",
                }}
              >

                <span
                  className="font-bold"
                  style={{
                    color: colors.secondary,
                  }}
                >
                  AI Teacher:
                </span>

                {" "}

                {selectedTeacher.name}

              </div>

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
                      width: "78%",
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
                      18:20 / 24:40
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

          {/* PROGRESS + AI */}
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
                  85%
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
                    width: "85%",
                    background:
                      `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})`,
                  }}
                ></div>

              </div>

              <p
                style={{
                  color: colors.textSecondary,
                }}
              >
                17 / 20 lessons completed
              </p>

            </div>

            {/* AI TEACHERS */}
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

          </div>

          {/* NOTES */}
          <div
            className="rounded-[30px] p-6 border mb-6"
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

                  Dataset

                </button>

              </div>

            </div>

            <p
              className="text-base leading-8"
              style={{
                color: colors.textSecondary,
              }}
            >
              This lesson covers machine learning
              fundamentals, datasets, feature
              engineering, prediction models and
              practical AI implementation.
            </p>

          </div>

          {/* ASSIGNMENT */}
          <div
            className="rounded-[30px] p-6 border"
            style={{
              backgroundColor: colors.surface,
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >

            <div className="flex items-center gap-3 mb-4">

              <Sparkles
                style={{
                  color: colors.primary,
                }}
              />

              <h2 className="text-2xl font-bold">
                Assignment
              </h2>

            </div>

            <h3 className="text-xl font-bold mb-3">
              Build an Image Classification Model
            </h3>

            <p
              className="text-base leading-8 mb-5"
              style={{
                color: colors.textSecondary,
              }}
            >
              Train a machine learning model using
              TensorFlow and classify image datasets.
            </p>

            <button
              className="px-6 py-4 rounded-2xl font-bold"
              style={{
                background:
                  `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,

                color: "#fff",
              }}
            >
              Upload Assignment
            </button>

          </div>

        </main>

      </div>

      {/* FLOATING CHAT */}
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