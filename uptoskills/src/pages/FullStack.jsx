import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";

import {
  Play,
  CheckCircle2,
  Clock3,
  Globe,
  Award,
  Share2,
  BookOpen,
  Trophy,
  Flame,
  BarChart3,
  Star,
  Users,
} from "lucide-react";

import { colors, shadows } from "../styles/designTokens";

export default function FullStack() {

  const navigate = useNavigate();

  const modules = [
    {
      title: "Frontend Fundamentals",
      lessons: [
        "Introduction to Web Development",
        "HTML Basics",
        "CSS Fundamentals",
        "Responsive Design",
      ],
    },

    {
      title: "JavaScript & React",
      lessons: [
        "JavaScript Basics",
        "DOM Manipulation",
        "React Fundamentals",
        "React Hooks",
      ],
    },

    {
      title: "Backend Development",
      lessons: [
        "Node.js Basics",
        "Express.js",
        "MongoDB Database",
        "Authentication System",
      ],
    },

    {
      title: "Deployment & Projects",
      lessons: [
        "REST APIs",
        "JWT Authentication",
        "Deploying Applications",
        "Full Stack Final Project",
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

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="max-w-7xl mx-auto pt-24 px-5 pb-14">

        <div className="grid lg:grid-cols-3 gap-7">

          {/* LEFT SIDE */}
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

                <span>Web Development</span>

                <span>•</span>

                <span>Self Paced</span>

              </div>

              {/* TITLE */}
              <h1 className="text-5xl font-black leading-tight mb-5">

                Full Stack
                <br />
                Development 💻

              </h1>

              {/* DESCRIPTION */}
              <p
                className="text-base leading-8 mb-8"
                style={{
                  color: colors.textSecondary,
                }}
              >

                Master frontend and backend development using
                React, Node.js, Express and MongoDB with
                real-world projects and deployment workflows.

                Learn how modern scalable applications are
                built from scratch with industry-level
                architecture and best practices.

              </p>

              {/* FEATURE STATS */}
              <div className="grid md:grid-cols-2 gap-4 mb-9">

                {/* PROGRESS */}
                <div
                  className="p-5 rounded-[1.7rem]"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.secondary}40`,
                    boxShadow: shadows.md,
                  }}
                >

                  <div className="flex items-center justify-between mb-4">

                    <div className="flex items-center gap-3">

                      <BarChart3
                        className="w-5 h-5"
                        style={{
                          color: colors.secondary,
                        }}
                      />

                      <span className="text-lg font-bold">
                        Progress
                      </span>

                    </div>

                    <span className="text-3xl font-black">
                      100%
                    </span>

                  </div>

                  {/* PROGRESS BAR */}
                  <div
                    className="w-full h-3 rounded-full overflow-hidden mb-4"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                    }}
                  >

                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "100%",
                        background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})`,
                      }}
                    ></div>

                  </div>

                  <p
                    className="text-xs"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Completed 15 out of 15 lessons ✅

                  </p>

                </div>

                {/* MODULES */}
                <div
                  className="p-5 rounded-[1.7rem]"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.primary}40`,
                    boxShadow: shadows.md,
                  }}
                >

                  <div className="flex items-center gap-3 mb-3">

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
                    15
                  </h2>

                  <p
                    className="text-xs"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Premium learning lessons included

                  </p>

                </div>

                {/* STREAK */}
                <div
                  className="p-5 rounded-[1.7rem]"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid orange`,
                    boxShadow: shadows.md,
                  }}
                >

                  <div className="flex items-center gap-3 mb-3">

                    <Flame className="w-5 h-5 text-orange-400" />

                    <span className="text-lg font-bold">
                      Learning Streak
                    </span>

                  </div>

                  <h2 className="text-4xl font-black mb-2">
                    18
                  </h2>

                  <p
                    className="text-xs"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Days active continuously 🔥

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

                  <div className="flex items-center gap-3 mb-3">

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
                    4.8k
                  </h2>

                  <p
                    className="text-xs"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Students enrolled worldwide 🌍

                  </p>

                </div>

              </div>

              {/* STATS */}
              <div
                className="flex flex-wrap gap-7 py-6 border-y mb-9"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >

                {/* DURATION */}
                <div className="flex items-center gap-3">

                  <Clock3
                    className="w-5 h-5"
                    style={{
                      color: colors.primary,
                    }}
                  />

                  <div>

                    <div
                      className="text-[10px] uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Duration
                    </div>

                    <div className="font-bold text-base">
                      12 Weeks
                    </div>

                  </div>

                </div>

                {/* LANGUAGE */}
                <div className="flex items-center gap-3">

                  <Globe
                    className="w-5 h-5"
                    style={{
                      color: colors.secondary,
                    }}
                  />

                  <div>

                    <div
                      className="text-[10px] uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Language
                    </div>

                    <div className="font-bold text-base">
                      English
                    </div>

                  </div>

                </div>

                {/* CERTIFICATE */}
                <div className="flex items-center gap-3">

                  <Award
                    className="w-5 h-5"
                    style={{
                      color: colors.info,
                    }}
                  />

                  <div>

                    <div
                      className="text-[10px] uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Certificate
                    </div>

                    <div className="font-bold text-base">
                      Included
                    </div>

                  </div>

                </div>

                {/* RATING */}
                <div className="flex items-center gap-3">

                  <Star className="w-5 h-5 text-yellow-400" />

                  <div>

                    <div
                      className="text-[10px] uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Rating
                    </div>

                    <div className="font-bold text-base">
                      4.9 / 5
                    </div>

                  </div>

                </div>

              </div>

              {/* MODULES */}
              <section>

                <h2 className="text-2xl font-bold mb-6">

                  Course Modules 📚

                </h2>

                <div className="space-y-4">

                  {modules.map((module, index) => (

                    <motion.div
                      key={index}
                      whileHover={{ y: -2 }}
                      className="overflow-hidden rounded-[1.7rem]"
                      style={{
                        backgroundColor: colors.surface,
                        border:
                          "1px solid rgba(255,255,255,0.06)",

                        boxShadow: shadows.md,
                      }}
                    >

                      {/* MODULE TITLE */}
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

                      {/* LESSONS */}
                      <div className="p-3">

                        {module.lessons.map(
                          (lesson, lessonIndex) => (

                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between p-4 rounded-xl transition-all hover:bg-white/[0.03]"
                            >

                              {/* LEFT */}
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

                                    15 mins • Video Lesson

                                  </div>

                                </div>

                              </div>

                              {/* RIGHT */}
                              <CheckCircle2
                                className="w-5 h-5"
                                style={{
                                  color: colors.success,
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

          {/* RIGHT SIDEBAR */}
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
                  src="https://i.ytimg.com/vi/BRYtQEJtXTs/hq720.jpg"
                  alt="Full Stack"
                  className="w-full h-60 object-cover"
                />

                {/* PLAY */}
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
                    ₹499
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
                    navigate("/lesson/fullstack/1")
                  }
                  className="w-full py-3 rounded-xl font-bold text-base hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                    color: "#fff",
                  }}
                >

                  Continue Learning 🚀

                </button>

                {/* SMALL TEXT */}
                <p
                  className="text-center text-xs mt-4"
                  style={{
                    color: colors.textSecondary,
                  }}
                >

                  Lifetime Access • Certificate Included

                </p>

                {/* EXTRA */}
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
                      15 Premium Lessons
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
                      Industry Certificate Included
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-sm">

                    <Award
                      className="w-4 h-4"
                      style={{
                        color: colors.info,
                      }}
                    />

                    <span>
                      Beginner to Advanced
                    </span>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </main>

    </div>

  );
}