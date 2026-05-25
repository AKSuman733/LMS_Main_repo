import { motion } from "motion/react";
import Navbar from "../components/Navbar";
import heroImage from "../assets/hero-image.png";

import { colors, shadows } from "../styles/designTokens";

import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Code2,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function LandingPage() {

  const features = [
    {
      icon: Code2,
      title: "Project-Based Learning",
      desc: "Build real-world applications while learning modern technologies.",
    },

    {
      icon: BookOpen,
      title: "Structured Roadmaps",
      desc: "Clear learning paths for beginners and advanced learners.",
    },

    {
      icon: GraduationCap,
      title: "Verified Certificates",
      desc: "Earn certificates after completing practical projects.",
    },

    {
      icon: Briefcase,
      title: "Career Focused",
      desc: "Prepare for internships and placement opportunities.",
    },
  ];

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      <Navbar />

      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 -z-30 overflow-hidden">

        <div
          className="absolute top-[-120px] left-[-100px] w-[420px] h-[420px] blur-[140px] rounded-full"
          style={{
            backgroundColor: `${colors.secondary}25`,
          }}
        />

        <div
          className="absolute bottom-[-150px] right-[-100px] w-[420px] h-[420px] blur-[140px] rounded-full"
          style={{
            backgroundColor: `${colors.primary}25`,
          }}
        />

      </div>

      {/* GRID */}
      <div className="fixed inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:55px_55px]" />

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-20">

        {/* HERO SECTION */}
        <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[85vh]">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            {/* BADGE */}
            <div
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-xl mb-7 border"
              style={{
                borderColor: `${colors.secondary}30`,
                backgroundColor: `${colors.secondary}15`,
              }}
            >

              <Sparkles
                className="w-4 h-4"
                style={{
                  color: colors.secondary,
                }}
              />

              <span
                className="text-xs font-bold tracking-[0.18em] uppercase"
                style={{
                  color: colors.secondary,
                }}
              >
                Transform Your Skill Set
              </span>

            </div>

            {/* HEADING */}
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05]">

              <span
                className="bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${colors.primary}, #ff4da6, ${colors.secondary})`,
                }}
              >
                Let's Make
              </span>

              <br />

              <span
                style={{
                  color: colors.secondary,
                }}
              >
                Freshers
              </span>

              <br />

              <span
                style={{
                  color: colors.info,
                }}
              >
                Employable!
              </span>

            </h1>

            {/* DESCRIPTION */}
            <p
              className="text-lg leading-relaxed mt-8 max-w-xl"
              style={{
                color: colors.textSecondary,
              }}
            >

              Connecting students, developers, and future innovators
              through AI-powered learning, real-world projects,
              internships, and career-focused education.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/register"
                className="px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all flex items-center gap-3"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.textPrimary,
                  boxShadow: "0 0 35px rgba(255,107,53,0.35)",
                }}
              >

                Start Learning

                <ArrowRight className="w-5 h-5" />

              </Link>

              <Link
                to="/courses"
                className="px-8 py-4 rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all text-lg font-semibold border"
                style={{
                  borderColor: `${colors.secondary}30`,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: colors.textPrimary,
                }}
              >

                Browse Courses

              </Link>

            </div>

            {/* STATS */}
            <div className="flex gap-10 flex-wrap mt-12">

              <div>
                <h3
                  className="text-3xl font-black"
                  style={{
                    color: colors.secondary,
                  }}
                >
                  15K+
                </h3>

                <p
                  className="text-sm mt-1"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Active Students
                </p>
              </div>

              <div>
                <h3
                  className="text-3xl font-black"
                  style={{
                    color: colors.primary,
                  }}
                >
                  120+
                </h3>

                <p
                  className="text-sm mt-1"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Real Projects
                </p>
              </div>

              <div>
                <h3
                  className="text-3xl font-black"
                  style={{
                    color: "#c084fc",
                  }}
                >
                  24+
                </h3>

                <p
                  className="text-sm mt-1"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Career Tracks
                </p>
              </div>

            </div>

          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >

            {/* MAIN IMAGE CARD */}
            <div
              className="relative rounded-[2.5rem] overflow-hidden border backdrop-blur-2xl"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.04)",
                boxShadow: shadows.lg,
              }}
            >

              <img
                src={heroImage}
                alt="Hero"
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    `linear-gradient(to top, ${colors.background}, transparent, transparent)`,
                }}
              />

            </div>

          </motion.div>

        </section>

        {/* FEATURES */}
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-[2rem] border backdrop-blur-xl p-6 hover:-translate-y-2 transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  boxShadow: shadows.md,
                }}
              >

                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: `${colors.secondary}15`,
                  }}
                >

                  <Icon
                    className="w-7 h-7"
                    style={{
                      color: colors.secondary,
                    }}
                  />

                </div>

                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>

                <p
                  className="leading-relaxed text-sm"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  {feature.desc}
                </p>

              </motion.div>
            );
          })}

        </section>

      </main>

    </div>
  );
}