import { Outlet, Link } from "react-router-dom";

import {
  Sparkles,
  BrainCircuit,
  GraduationCap,
  Trophy,
  PlayCircle,
  ArrowLeft,
} from "lucide-react";

import { motion } from "framer-motion";

function AuthLayout() {

  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--color-background)]
        text-white
      "
    >

      {/* ====================================================== */}
      {/* FLOATING BACK BUTTON */}
      {/* ====================================================== */}

      <Link
        to="/"

        className="
          fixed
          left-5
          top-5
          z-50

          inline-flex
          items-center
          gap-2

          rounded-xl

          border border-[var(--color-border)]

          bg-black/40

          px-3 py-2

          text-xs
          font-medium

          text-slate-300

          backdrop-blur-xl

          transition-all
          duration-300

          hover:scale-105
          hover:bg-white/10
        "
      >

        <ArrowLeft
          size={14}
        />

        Home

      </Link>

      {/* ====================================================== */}
      {/* BACKGROUND GLOWS */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          left-[-60px]
          top-[-80px]

          h-[220px]
          w-[220px]

          rounded-full

          bg-cyan-500/10

          blur-[90px]
        "
      />

      <div
        className="
          absolute
          bottom-[-80px]
          right-[-60px]

          h-[220px]
          w-[220px]

          rounded-full

          bg-pink-500/10

          blur-[90px]
        "
      />

      {/* ====================================================== */}
      {/* MAIN GRID */}
      {/* ====================================================== */}

      <div
        className="
          relative z-10

          grid

          min-h-screen

          lg:grid-cols-[1fr_0.95fr]
        "
      >

        {/* ====================================================== */}
        {/* LEFT SIDE */}
        {/* ====================================================== */}

        <div
          className="
            hidden

            flex-col
            justify-between

            border-r border-[var(--color-border)]

            px-10 py-8

            lg:flex
          "
        >

          {/* ====================================================== */}
          {/* TOP CONTENT */}
          {/* ====================================================== */}

          <div>

            {/* ====================================================== */}
            {/* LOGO */}
            {/* ====================================================== */}

            <Link
              to="/"

              className="
                mb-8

                inline-flex
                items-center
                gap-3
              "
            >

              {/* LOGO ICON */}

              <div
                className="
                  flex

                  h-10 w-10

                  items-center
                  justify-center

                  rounded-xl

                  bg-gradient-to-r

                  from-[var(--color-primary)]
                  to-pink-500

                  shadow-[var(--shadow-orange)]
                "
              >

                <BrainCircuit
                  size={18}
                />

              </div>

              {/* LOGO TEXT */}

              <div>

                <div className="flex flex-col">

                  <h1
                    className="
                      bg-gradient-to-r

                      from-[var(--color-primary)]
                      via-pink-500
                      to-cyan-400

                      bg-clip-text

                      text-xl
                      font-black

                      tracking-tight

                      text-transparent
                    "
                  >

                    UpToSkills

                  </h1>

                  <span
                    className="
                      text-[9px]

                      tracking-wide

                      text-cyan-400
                    "
                  >

                    Let's Make Freshers Employable!

                  </span>

                </div>

                <p
                  className="
                    mt-1

                    text-[10px]

                    text-slate-400
                  "
                >

                  AI Learning Platform

                </p>

              </div>

            </Link>

            {/* ====================================================== */}
            {/* BADGE */}
            {/* ====================================================== */}

            <div
              className="
                mb-6

                inline-flex
                items-center
                gap-2

                rounded-full

                border border-[var(--color-border)]

                bg-[var(--color-card)]

                px-3 py-1.5

                backdrop-blur-xl
              "
            >

              <Sparkles
                size={13}

                className="
                  text-cyan-400
                "
              />

              <span
                className="
                  text-xs
                  font-medium

                  text-cyan-400
                "
              >

                Future-Ready AI Learning

              </span>

            </div>

            {/* ====================================================== */}
            {/* HEADING */}
            {/* ====================================================== */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.7,
              }}

              className="
                mb-4

                text-3xl
                font-black

                leading-tight

                xl:text-4xl
              "
            >

              Learn AI Skills

              <br />

              <span
                className="
                  bg-gradient-to-r

                  from-cyan-400
                  via-blue-500
                  to-purple-500

                  bg-clip-text

                  text-transparent
                "
              >

                That Actually Matter

              </span>

            </motion.h1>

            {/* ====================================================== */}
            {/* SUBTITLE */}
            {/* ====================================================== */}

            <p
              className="
                mb-6

                max-w-[500px]

                text-sm
                leading-6

                text-slate-400
              "
            >

              Join thousands of learners mastering
              Artificial Intelligence, Machine Learning,
              and Generative AI through immersive
              learning experiences.

            </p>

            {/* ====================================================== */}
            {/* FEATURES */}
            {/* ====================================================== */}

            <div className="space-y-3">

              {[
                {
                  icon: "🚀",

                  title: "Industry Projects",

                  text:
                    "Build production-grade AI applications.",
                },

                {
                  icon: "📚",

                  title: "Structured Learning",

                  text:
                    "Master AI from basics to deployment.",
                },

                {
                  icon: "🎓",

                  title: "Career Support",

                  text:
                    "Mentorship and interview preparation.",
                },
              ].map((item, index) => (

                <motion.div
                  key={index}

                  whileHover={{
                    x: 4,
                  }}

                  className="
                    flex
                    items-start
                    gap-3

                    rounded-xl

                    border border-[var(--color-border)]

                    bg-[var(--color-card)]

                    p-3

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    hover:bg-white/10
                  "
                >

                  <div className="text-lg">
                    {item.icon}
                  </div>

                  <div>

                    <h3
                      className="
                        mb-1

                        text-sm
                        font-bold
                      "
                    >

                      {item.title}

                    </h3>

                    <p
                      className="
                        text-xs
                        leading-5

                        text-slate-400
                      "
                    >

                      {item.text}

                    </p>

                  </div>

                </motion.div>
              ))}

            </div>

          </div>

          {/* ====================================================== */}
          {/* STATS */}
          {/* ====================================================== */}

          <div
            className="
              mt-6

              grid
              grid-cols-3

              gap-3
            "
          >

            {[
              {
                icon: (
                  <GraduationCap
                    size={18}
                    className="text-cyan-400"
                  />
                ),

                value: "50K+",

                label: "Students",
              },

              {
                icon: (
                  <PlayCircle
                    size={18}
                    className="text-pink-400"
                  />
                ),

                value: "120+",

                label: "Courses",
              },

              {
                icon: (
                  <Trophy
                    size={18}
                    className="text-yellow-400"
                  />
                ),

                value: "95%",

                label: "Success",
              },
            ].map((item, index) => (

              <div
                key={index}

                className="
                  rounded-xl

                  border border-[var(--color-border)]

                  bg-[var(--color-card)]

                  p-3

                  text-center
                "
              >

                <div
                  className="
                    mb-2

                    flex justify-center
                  "
                >

                  {item.icon}

                </div>

                <h3
                  className="
                    mb-1

                    text-lg
                    font-black
                  "
                >

                  {item.value}

                </h3>

                <p
                  className="
                    text-[10px]

                    text-slate-500
                  "
                >

                  {item.label}

                </p>

              </div>
            ))}

          </div>

        </div>

        {/* ====================================================== */}
        {/* RIGHT SIDE */}
        {/* ====================================================== */}

        <div
          className="
            relative

            flex
            items-center
            justify-center

            px-5 py-6

            lg:px-10
          "
        >

          {/* GLOW */}

          <div
            className="
              absolute

              h-[180px]
              w-[180px]

              rounded-full

              bg-cyan-500/10

              blur-[80px]
            "
          />

          {/* FORM CONTAINER */}

          <div
            className="
              relative z-10

              flex
              w-full

              max-w-[430px]

              items-center
              justify-center
            "
          >

            <Outlet />

          </div>

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;