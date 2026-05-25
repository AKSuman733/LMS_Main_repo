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
  BrainCircuit,
} from "lucide-react";

import { colors, shadows } from "../styles/designTokens";

export default function MachineLearning() {

  const navigate = useNavigate();

  const modules = [
    {
      title: "ML Foundations",
      lessons: [
        "Introduction to Machine Learning",
        "Types of Machine Learning",
        "Python for ML",
        "Data Preprocessing",
        "Feature Engineering",
      ],
    },

    {
      title: "Supervised Learning",
      lessons: [
        "Linear Regression",
        "Logistic Regression",
        "Decision Trees",
        "Random Forest",
        "Support Vector Machines",
      ],
    },

    {
      title: "Deep Learning",
      lessons: [
        "Neural Networks",
        "TensorFlow Basics",
        "CNN Introduction",
        "Model Training",
        "Transfer Learning",
      ],
    },

    {
      title: "Projects & Deployment",
      lessons: [
        "AI Chatbot",
        "Recommendation System",
        "Model Deployment",
        "Final ML Project",
        "Production Scaling",
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

                <span>Artificial Intelligence</span>

                <span>•</span>

                <span>Self Paced</span>

              </div>

              {/* TITLE */}
              <h1 className="text-5xl font-black leading-tight mb-5">

                Machine Learning
                <br />
                Engineering 🤖

              </h1>

              {/* DESCRIPTION */}
              <p
                className="text-base leading-8 mb-8"
                style={{
                  color: colors.textSecondary,
                }}
              >

                Master Machine Learning, Neural Networks,
                Deep Learning and AI systems using Python,
                TensorFlow and real-world industry projects.

                Learn how modern intelligent systems are
                built using supervised learning, deep learning,
                data preprocessing and deployment workflows.

              </p>

              {/* FEATURE STATS */}
              <div className="grid md:grid-cols-2 gap-5 mb-10">

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
                      85%
                    </span>

                  </div>

                  {/* PROGRESS BAR */}
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
                    className="text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >

                    Completed 17 out of 20 lessons ✅

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

                    Premium AI learning lessons included

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
                      Learning Streak
                    </span>

                  </div>

                  <h2 className="text-4xl font-black mb-2">
                    26
                  </h2>

                  <p
                    className="text-sm"
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
                    5.2k
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

              </div>

              {/* STATS */}
              <div
                className="flex flex-wrap gap-8 py-6 border-y mb-10"
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
                      className="text-xs uppercase font-bold mb-1"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Duration
                    </div>

                    <div className="font-bold">
                      16 Weeks
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

                {/* RATING */}
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

                  Course Modules 📚

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

                                    18 mins • AI Lesson

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
                  src="https://www.naukri.com/campus/career-guidance/wp-content/uploads/2024/07/what-is-machine-learning.jpg"
                  alt="Machine Learning"
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
                    ₹449
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
                    navigate("/machinelearning/lesson")
                  }
                  className="w-full py-3 rounded-2xl font-bold text-base hover:scale-[1.02] transition-all duration-300"
                  style={{
                    background:
                      `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
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

                    <BrainCircuit
                      className="w-4 h-4"
                      style={{
                        color: colors.info,
                      }}
                    />

                    <span>
                      AI & Deep Learning Focus
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