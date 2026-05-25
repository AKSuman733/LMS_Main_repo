import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
  Trophy,
  Flame,
  Star,
  Users,
  Palette,
} from "lucide-react";

import { colors, shadows } from "../styles/designTokens";

export default function UIUX() {

  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);

  const modules = [

    {
      title: "UI Design Basics",
      lessons: [
        "Introduction to UI Design",
        "Color Theory",
        "Typography",
        "Design Systems",
        "Wireframing",
      ],
    },

    {
      title: "UX Fundamentals",
      lessons: [
        "User Research",
        "User Personas",
        "User Journey",
        "Information Architecture",
        "Usability Testing",
      ],
    },

    {
      title: "Figma & Prototyping",
      lessons: [
        "Figma Basics",
        "Auto Layout",
        "Interactive Prototypes",
        "Responsive Design",
        "Design Handoff",
      ],
    },

    {
      title: "Projects & Portfolio",
      lessons: [
        "Mobile App Design",
        "Website Redesign",
        "Case Study Creation",
        "Portfolio Building",
        "Final UI/UX Project",
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
      <main className="max-w-7xl mx-auto pt-24 px-6 pb-16">

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

                <span>UI / UX Design</span>

                <span>•</span>

                <span>Premium Course</span>

              </div>

              {/* TITLE */}
              <h1 className="text-5xl font-black leading-tight mb-5">

                UI/UX Design
                <br />
                Masterclass 🎨

              </h1>

              {/* DESCRIPTION */}
              <p
                className="text-base leading-8 mb-8"
                style={{
                  color: colors.textSecondary,
                }}
              >

                Master UI/UX Design, Figma workflows,
                wireframing, prototyping and modern
                product design systems with real-world
                projects and portfolio building.

                Learn how professional interfaces are
                designed using user-centered design
                principles and modern design tools.

              </p>

              {/* FEATURE STATS */}
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

                    Premium design lessons included

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

                    Most enrolled design course 🔥

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
                    3.8k
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

                {/* TOOLS */}
                <div
                  className="p-5 rounded-[1.7rem]"
                  style={{
                    backgroundColor: colors.surface,
                    border: `1px solid ${colors.secondary}40`,
                    boxShadow: shadows.md,
                  }}
                >

                  <div className="flex items-center gap-3 mb-4">

                    <Palette
                      className="w-5 h-5"
                      style={{
                        color: colors.secondary,
                      }}
                    />

                    <span className="text-lg font-bold">
                      Design Tools
                    </span>

                  </div>

                  <h2 className="text-4xl font-black mb-2">
                    Figma
                  </h2>

                  <p
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Industry-standard design workflow

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
                              className="flex items-center justify-between p-4 rounded-xl transition-all opacity-80 hover:bg-white/[0.03]"
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

                                    15 mins • Locked Lesson

                                  </div>

                                </div>

                              </div>

                              {/* RIGHT */}
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
                  src="https://echopx.com/wp-content/uploads/2022/06/ui-ux-design.jpg"
                  alt="UI UX"
                  className="w-full h-64 object-cover"
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
                    ₹399
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
                  onClick={() => setShowPayment(true)}
                  className="w-full py-3 rounded-2xl font-bold text-base hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #f59e0b, #f97316)",
                    color: "#fff",
                  }}
                >

                  Enroll Now 🔒

                </button>

                {/* SMALL TEXT */}
                <p
                  className="text-center text-xs mt-4"
                  style={{
                    color: colors.textSecondary,
                  }}
                >

                  Unlock all lessons & premium resources

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
                      Industry Certificate Included
                    </span>

                  </div>

                  <div className="flex items-center gap-3 text-sm">

                    <Palette
                      className="w-4 h-4"
                      style={{
                        color: colors.info,
                      }}
                    />

                    <span>
                      UI/UX & Figma Workflow
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

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4">

          <div
            className="w-full max-w-md rounded-[2rem] p-7"
            style={{
              backgroundColor: "#071028",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <h2 className="text-3xl font-black mb-2">
              Complete Payment 💳
            </h2>

            <p className="text-white/60 mb-6">
              Unlock all UI/UX premium lessons,
              projects and certificates.
            </p>

            {/* PRICE */}
            <div className="flex items-center justify-between mb-6">

              <span className="text-white/60">
                Course Price
              </span>

              <span className="text-4xl font-black text-orange-400">
                ₹399
              </span>

            </div>

            {/* INPUTS */}

            <div className="space-y-4 mb-6">

              <input
                type="text"
                placeholder="Card Holder Name"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
              />

              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
              />

              <div className="grid grid-cols-2 gap-4">

                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
                />

                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none"
                />

              </div>

            </div>

            {/* BUTTONS */}

            <div className="flex gap-3">

              <button
                onClick={() => setShowPayment(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={() => navigate("/uiux/lesson")}
                className="flex-1 py-3 rounded-xl font-bold hover:scale-[1.02] transition-all"
                style={{
                  background:
                    "linear-gradient(135deg,#06b6d4,#f97316)",
                  color: "#fff",
                }}
              >
                Pay Now 🚀
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}