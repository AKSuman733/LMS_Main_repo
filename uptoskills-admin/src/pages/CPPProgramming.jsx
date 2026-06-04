import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import Navbar from "../components/Navbar";

import {
  Play,
  Lock,
  Clock3,
  Globe,
  Award,
  Share2,
  BookOpen,
  Trophy,
  Flame,
  Star,
  Users,
  Code2,
  X,
  CreditCard,
} from "lucide-react";

import { colors, shadows } from "../styles/designTokens";

export default function CPPProgramming() {

  const navigate = useNavigate();

  const [showPayment, setShowPayment] =
    useState(false);

  const modules = [

    {
      title: "C++ Basics",
      lessons: [
        "Introduction to C++",
        "Variables & Data Types",
        "Operators",
        "Conditional Statements",
        "Loops",
      ],
    },

    {
      title: "Functions & Arrays",
      lessons: [
        "Functions",
        "Arrays",
        "Strings",
        "Pointers",
        "Recursion",
      ],
    },

    {
      title: "Object Oriented Programming",
      lessons: [
        "Classes & Objects",
        "Constructors",
        "Inheritance",
        "Polymorphism",
        "Encapsulation",
      ],
    },

    {
      title: "Advanced C++",
      lessons: [
        "STL Basics",
        "Vectors & Maps",
        "File Handling",
        "Competitive Coding",
        "Final Project",
      ],
    },

  ];

  return (

    <div
      className="min-h-screen"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      <Navbar />

      <main className="max-w-7xl mx-auto pt-24 px-6 pb-16">

        <div className="grid lg:grid-cols-3 gap-7">

          {/* LEFT */}
          <div className="lg:col-span-2">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >

              {/* TAG */}
              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-5 text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${colors.secondary}15`,
                  color: colors.secondary,
                }}
              >

                <span>C++ Programming</span>

                <span>•</span>

                <span>Intermediate Course</span>

              </div>

              {/* TITLE */}
              <h1 className="text-5xl font-black leading-tight mb-5">

                Master Modern
                <br />
                C++ Programming 💻

              </h1>

              {/* DESCRIPTION */}
              <p
                className="text-base leading-8 mb-8"
                style={{
                  color: colors.textSecondary,
                }}
              >

                Learn modern C++ development,
                object oriented programming,
                STL, problem solving and
                competitive coding with
                real-world projects.

              </p>

              {/* FEATURE CARDS */}
              <div className="grid md:grid-cols-2 gap-5 mb-10">

                {/* MODULES */}
                <div
                  className="p-5 rounded-[1.7rem]"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.primary}40`,
                    boxShadow: shadows.md,
                  }}
                >

                  <div className="flex items-center gap-3 mb-4">

                    <BookOpen
                      className="w-5 h-5"
                      style={{
                        color: colors.primary,
                      }}
                    />

                    <span className="text-lg font-bold">
                      Course Modules
                    </span>

                  </div>

                  <h2 className="text-4xl font-black mb-2">
                    20
                  </h2>

                  <p
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Coding lessons included

                  </p>

                </div>

                {/* TRENDING */}
                <div
                  className="p-5 rounded-[1.7rem]"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid orange`,
                    boxShadow: shadows.md,
                  }}
                >

                  <div className="flex items-center gap-3 mb-4">

                    <Flame className="w-5 h-5 text-orange-400" />

                    <span className="text-lg font-bold">
                      Trending Course
                    </span>

                  </div>

                  <h2 className="text-4xl font-black mb-2">
                    #2
                  </h2>

                  <p
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Popular among developers 🔥

                  </p>

                </div>

                {/* STUDENTS */}
                <div
                  className="p-5 rounded-[1.7rem]"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.success}40`,
                    boxShadow: shadows.md,
                  }}
                >

                  <div className="flex items-center gap-3 mb-4">

                    <Users
                      className="w-5 h-5"
                      style={{
                        color: colors.success,
                      }}
                    />

                    <span className="text-lg font-bold">
                      Students
                    </span>

                  </div>

                  <h2 className="text-4xl font-black mb-2">
                    4.7k
                  </h2>

                  <p
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Developers enrolled 🌍

                  </p>

                </div>

                {/* PROJECTS */}
                <div
                  className="p-5 rounded-[1.7rem]"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.secondary}40`,
                    boxShadow: shadows.md,
                  }}
                >

                  <div className="flex items-center gap-3 mb-4">

                    <Code2
                      className="w-5 h-5"
                      style={{
                        color: colors.secondary,
                      }}
                    />

                    <span className="text-lg font-bold">
                      Coding Projects
                    </span>

                  </div>

                  <h2 className="text-4xl font-black mb-2">
                    15+
                  </h2>

                  <p
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Hands-on C++ projects

                  </p>

                </div>

              </div>

              {/* STATS */}
              <div
                className="flex flex-wrap gap-8 py-6 border-y mb-10"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >

                <div className="flex items-center gap-3">

                  <Clock3
                    className="w-5 h-5"
                    style={{
                      color: colors.primary,
                    }}
                  />

                  <div>

                    <div
                      className="text-xs uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Duration
                    </div>

                    <div className="font-bold">
                      10 Weeks
                    </div>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Globe
                    className="w-5 h-5"
                    style={{
                      color: colors.secondary,
                    }}
                  />

                  <div>

                    <div
                      className="text-xs uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Language
                    </div>

                    <div className="font-bold">
                      English
                    </div>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Award
                    className="w-5 h-5"
                    style={{
                      color: colors.info,
                    }}
                  />

                  <div>

                    <div
                      className="text-xs uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Certificate
                    </div>

                    <div className="font-bold">
                      Included
                    </div>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <Star className="w-5 h-5 text-yellow-400" />

                  <div>

                    <div
                      className="text-xs uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Rating
                    </div>

                    <div className="font-bold">
                      4.8 / 5
                    </div>

                  </div>

                </div>

              </div>

              {/* MODULES */}
              <section>

                <h2 className="text-2xl font-bold mb-6">

                  Course Modules 🔒

                </h2>

                <div className="space-y-5">

                  {modules.map((module, index) => (

                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className="overflow-hidden rounded-[1.5rem]"
                      style={{
                        backgroundColor: colors.surface,
                        border:
                          "1px solid rgba(255,255,255,0.06)",

                        boxShadow: shadows.md,
                      }}
                    >

                      <div
                        className="px-6 py-4 border-b"
                        style={{
                          borderColor:
                            "rgba(255,255,255,0.05)",
                        }}
                      >

                        <h3 className="text-lg font-bold">

                          {module.title}

                        </h3>

                      </div>

                      <div className="p-3">

                        {module.lessons.map(
                          (lesson, lessonIndex) => (

                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between p-4 rounded-xl transition-all opacity-80 hover:bg-white/[0.03]"
                            >

                              <div className="flex items-center gap-4">

                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{
                                    backgroundColor:
                                      `${colors.secondary}15`,
                                  }}
                                >

                                  <Play
                                    className="w-3 h-3 fill-current"
                                    style={{
                                      color:
                                        colors.secondary,
                                    }}
                                  />

                                </div>

                                <div>

                                  <div className="font-semibold text-sm">

                                    {lesson}

                                  </div>

                                  <div
                                    className="text-xs"
                                    style={{
                                      color:
                                        colors.textSecondary,
                                    }}
                                  >

                                    15 mins • Locked Lesson

                                  </div>

                                </div>

                              </div>

                              <Lock
                                className="w-4 h-4"
                                style={{
                                  color: colors.textSecondary,
                                }}
                              />

                            </div>

                          )
                        )}

                      </div>

                    </motion.div>

                  ))}

                </div>

              </section>

            </motion.div>

          </div>

          {/* RIGHT */}
          <div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 overflow-hidden rounded-[2rem]"
              style={{
                backgroundColor: colors.surface,
                border:
                  "1px solid rgba(255,255,255,0.06)",

                boxShadow: shadows.lg,
              }}
            >

              {/* IMAGE */}
              <div className="relative">

                <img
                  src="https://www.shutterstock.com/image-illustration/c-code-on-dark-background-600nw-1896170293.jpg"
                  alt="C++"
                  className="w-full h-64 object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30">

                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md cursor-pointer"
                    style={{
                      backgroundColor:
                        "rgba(255,255,255,0.2)",
                    }}
                  >

                    <Play className="w-6 h-6 fill-white text-white" />

                  </div>

                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                {/* PRICE */}
                <div className="flex items-center justify-between mb-6">

                  <div className="text-4xl font-black">
                    ₹349
                  </div>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
                    style={{
                      backgroundColor:
                        "rgba(255,255,255,0.05)",
                    }}
                  >

                    <Share2 className="w-4 h-4" />

                  </div>

                </div>

                {/* BUTTON */}
                <button
                  onClick={() =>
                    setShowPayment(true)
                  }
                  className="w-full py-3 rounded-2xl font-bold text-base hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    color: "#fff",
                  }}
                >

                  Enroll Now 🔒

                </button>

                <p
                  className="text-center text-xs mt-4"
                  style={{
                    color: colors.textSecondary,
                  }}
                >

                  Unlock all C++ lessons & projects

                </p>

                <div
                  className="mt-6 pt-6 border-t space-y-4"
                  style={{
                    borderColor:
                      "rgba(255,255,255,0.06)",
                  }}
                >

                  <div className="flex items-center gap-3 text-sm">

                    <BookOpen
                      className="w-4 h-4"
                      style={{
                        color: colors.secondary,
                      }}
                    />

                    <span>
                      20 Premium Lessons
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-sm">

                    <Trophy
                      className="w-4 h-4"
                      style={{
                        color: colors.primary,
                      }}
                    />

                    <span>
                      Industry Certificate
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-sm">

                    <Code2
                      className="w-4 h-4"
                      style={{
                        color: colors.info,
                      }}
                    />

                    <span>
                      Competitive Coding
                    </span>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </main>

      {/* PAYMENT MODAL */}
      {showPayment && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          <div
            className="w-[420px] p-7 rounded-[2rem]"
            style={{
              backgroundColor: colors.surface,
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            {/* TOP */}
            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-black">
                Payment 💳
              </h2>

              <button
                onClick={() =>
                  setShowPayment(false)
                }
              >

                <X />

              </button>

            </div>

            {/* CARD */}
            <div
              className="p-5 rounded-2xl mb-5"
              style={{
                background:
                  "linear-gradient(135deg,#06b6d4,#3b82f6)",
              }}
            >

              <div className="flex justify-between items-center mb-10">

                <CreditCard className="w-8 h-8 text-white" />

                <span className="text-white font-bold">
                  VISA
                </span>

              </div>

              <div className="text-white text-xl tracking-widest mb-5">

                **** **** **** 2048

              </div>

              <div className="flex justify-between text-sm text-white">

                <span>UPTOSKILLS USER</span>

                <span>12/29</span>

              </div>

            </div>

            {/* PRICE */}
            <div className="flex justify-between mb-6">

              <span
                style={{
                  color: colors.textSecondary,
                }}
              >
                Total Amount
              </span>

              <span className="text-2xl font-black">
                ₹349
              </span>

            </div>

            {/* PAY BUTTON */}
            <button
              onClick={() => {

                alert(
                  "Payment Successful ✅"
                );

                navigate(
                  "/cpp-programming/lesson"
                );

              }}
              className="w-full py-4 rounded-2xl font-bold text-lg"
              style={{
                background:
                  "linear-gradient(135deg,#06b6d4,#3b82f6)",
                color: "#fff",
              }}
            >

              Pay Now 🚀

            </button>

          </div>

        </div>

      )}

    </div>

  );
}