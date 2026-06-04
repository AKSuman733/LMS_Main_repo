import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";

import {
  Play,
  Lock,
  Clock3,
  Globe,
  Award,
  Share2,
  BookOpen,
  Flame,
  Star,
  Users,
  Code2,
} from "lucide-react";

import { colors, shadows } from "../styles/designTokens";

export default function Java() {

  const navigate = useNavigate();

  const modules = [

    {
      title: "Java Fundamentals",
      lessons: [
        "Introduction to Java",
        "Variables & Data Types",
        "Operators",
        "Conditional Statements",
        "Loops",
      ],
    },

    {
      title: "Object Oriented Programming",
      lessons: [
        "Functions & Methods",
        "Arrays",
        "Strings",
        "Classes & Objects",
        "Constructors",
      ],
    },

    {
      title: "Advanced Java",
      lessons: [
        "Inheritance",
        "Polymorphism",
        "Abstraction",
        "Interfaces",
        "Exception Handling",
      ],
    },

    {
      title: "Projects & Practice",
      lessons: [
        "Collections Framework",
        "File Handling",
        "Mini Calculator Project",
        "Student Management System",
        "Final Java Project",
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

              {/* TOP TAG */}
              <div
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-5 text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${colors.secondary}15`,
                  color: colors.secondary,
                }}
              >

                <span>Java</span>

                <span>•</span>

                <span>Intermediate Java Course</span>

              </div>

              {/* TITLE */}
              <h1 className="text-5xl font-black leading-tight mb-5">

                Master Java
                <br />
                Programming ☕

              </h1>

              {/* DESCRIPTION */}
              <p
                className="text-base leading-8 mb-8"
                style={{
                  color: colors.textSecondary,
                }}
              >

                Learn Java programming,
                object-oriented programming,
                collections, exception handling
                and real-world projects.

              </p>

              {/* CARDS */}
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
                      Course Lessons
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

                    20 premium lessons included

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
                    #1
                  </h2>

                  <p
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Most enrolled Java course 🔥

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
                    18k
                  </h2>

                  <p
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Students enrolled worldwide 🌍

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
                      Projects
                    </span>

                  </div>

                  <h2 className="text-4xl font-black mb-2">
                    8+
                  </h2>

                  <p
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Real-world Java projects

                  </p>

                </div>

              </div>

              {/* COURSE STATS */}
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
                      6 Weeks
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
                      4.9 / 5
                    </div>

                  </div>

                </div>

              </div>

              {/* MODULES */}
              <section>

                <h2 className="text-2xl font-bold mb-6">

                  Course Lessons 🔒

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

                      <div className="px-6 py-5">

                        <h3 className="text-lg font-bold mb-5">

                          {module.title}

                        </h3>

                        <div className="space-y-3">

                          {module.lessons.map(
                            (lesson, idx) => (

                              <div
                                key={idx}
                                className="flex items-center justify-between p-4 rounded-xl"
                                style={{
                                  backgroundColor:
                                    "rgba(255,255,255,0.03)",
                                }}
                              >

                                <div className="flex items-center gap-3">

                                  <Lock
                                    className="w-4 h-4"
                                    style={{
                                      color:
                                        colors.primary,
                                    }}
                                  />

                                  <span className="text-sm">

                                    {lesson}

                                  </span>

                                </div>

                                <span
                                  className="text-xs"
                                  style={{
                                    color:
                                      colors.textSecondary,
                                  }}
                                >
                                  Locked
                                </span>

                              </div>

                            )
                          )}

                        </div>

                      </div>

                    </motion.div>

                  ))}

                </div>

              </section>

            </motion.div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            <div
              className="sticky top-24 overflow-hidden rounded-[2rem]"
              style={{
                backgroundColor: colors.surface,
              }}
            >

              {/* IMAGE */}
              <div className="relative">

                <img
                  src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                  alt="java"
                  className="w-full h-64 object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30">

                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
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

                <div className="flex items-center justify-between mb-6">

                  <div className="text-4xl font-black text-orange-400">
                    Free
                  </div>

                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
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
                    navigate("/java/lesson")
                  }
                  className="w-full py-3 rounded-2xl font-bold text-base hover:scale-[1.02] transition-all"
                  style={{
                    background:
                      "linear-gradient(135deg,#14b8a6,#06b6d4)",
                    color: "#fff",
                  }}
                >

                  Start Learning 🚀

                </button>

                <p
                  className="text-center text-xs mt-4"
                  style={{
                    color: colors.textSecondary,
                  }}
                >

                  Access premium Java lessons & projects

                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}