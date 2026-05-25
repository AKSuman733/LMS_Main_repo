import { useState } from "react";

import CourseGrid from "../../components/Course/CourseGrid";

import {
  Sparkles,
  Users,
  Brain,
  Trophy,
  Search,
  Wand2,
  ArrowRight,
} from "lucide-react";

import celebrities from "../../data/allMentors";

import { motion } from "framer-motion";

/* ================= STYLES ================= */

const glass =
  `
    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const gradientText =
  `
    bg-gradient-to-r

    from-[var(--color-primary)]
    via-pink-500
    to-[var(--color-secondary)]

    bg-clip-text

    text-transparent
  `;

function Courses() {

  const [topic, setTopic] =
    useState("");

  return (

    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[var(--color-background)]

        pt-24
      "
    >

      {/* ====================================================== */}
      {/* BACKGROUND GLOWS */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          -left-24
          top-0

          h-[280px]
          w-[280px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -right-24
          top-40

          h-[280px]
          w-[280px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-1/3

          h-[240px]
          w-[240px]

          rounded-full

          bg-purple-500/10

          blur-[120px]
        "
      />

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <div
        className="
          relative z-10

          px-5

          lg:px-8
        "
      >

        <div
          className="
            mx-auto

            max-w-7xl
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.5,
            }}

            className={`
              ${glass}

              overflow-hidden

              rounded-[32px]

              px-6 py-10

              md:px-10
              md:py-12
            `}
          >

            {/* ====================================================== */}
            {/* BADGE */}
            {/* ====================================================== */}

            <div
              className={`
                ${glass}

                mb-5

                inline-flex
                items-center
                gap-2

                rounded-full

                px-4 py-2
              `}
            >

              <Sparkles
                size={14}

                className="
                  text-[var(--color-secondary)]
                "
              />

              <span
                className="
                  text-xs
                  font-medium

                  text-[var(--color-secondary)]
                "
              >
                AI Celebrity Mentors
              </span>

            </div>

            {/* ====================================================== */}
            {/* TITLE */}
            {/* ====================================================== */}

            <h1
              className="
                mb-5

                text-4xl
                font-black
                leading-tight

                md:text-5xl
                lg:text-6xl
              "
            >

              <span className="text-white">
                Learn Anything From
              </span>

              <br />

              <span
                className={
                  gradientText
                }
              >
                AI Celebrity Teachers
              </span>

            </h1>

            {/* ====================================================== */}
            {/* DESCRIPTION */}
            {/* ====================================================== */}

            <p
              className="
                max-w-3xl

                text-sm
                leading-8

                text-slate-400

                md:text-base
              "
            >

              Experience futuristic
              AI-powered lessons taught
              by innovators, athletes,
              entrepreneurs, creators,
              and iconic minds.

            </p>

            {/* ====================================================== */}
            {/* SEARCH */}
            {/* ====================================================== */}

            <div className="mt-8">

              <div
                className={`
                  ${glass}

                  flex flex-col
                  gap-3

                  rounded-3xl

                  p-3

                  md:flex-row
                  md:items-center
                `}
              >

                {/* INPUT */}

                <div
                  className="
                    flex flex-1
                    items-center
                    gap-3

                    rounded-2xl

                    bg-black/10

                    px-4 py-3
                  "
                >

                  <Search
                    size={18}

                    className="
                      text-[var(--color-secondary)]
                    "
                  />

                  <input
                    value={topic}

                    onChange={(e) =>
                      setTopic(
                        e.target.value
                      )
                    }

                    placeholder="What do you want to learn today?"

                    className="
                      w-full

                      bg-transparent

                      text-sm
                      text-white

                      outline-none

                      placeholder:text-slate-500
                    "
                  />

                </div>

                {/* BUTTON */}

                <button
                  className="
                    flex items-center
                    justify-center
                    gap-2

                    rounded-2xl

                    bg-gradient-to-r

                    from-[var(--color-primary)]
                    to-pink-500

                    px-5 py-3

                    text-sm
                    font-semibold

                    text-white

                    shadow-[var(--shadow-orange)]

                    transition-all
                    duration-300

                    hover:scale-[1.02]
                  "
                >

                  <Wand2
                    size={16}
                  />

                  Generate Lesson

                  <ArrowRight
                    size={16}
                  />

                </button>

              </div>

              {/* ====================================================== */}
              {/* QUICK TOPICS */}
              {/* ====================================================== */}

              <div
                className="
                  mt-4

                  flex flex-wrap
                  gap-2
                "
              >

                {[
                  "Artificial Intelligence",

                  "Quantum Physics",

                  "Public Speaking",

                  "Programming",

                  "Cybersecurity",

                  "Leadership",
                ].map((item) => (

                  <button
                    key={item}

                    onClick={() =>
                      setTopic(item)
                    }

                    className={`
                      ${glass}

                      rounded-full

                      px-4 py-2

                      text-xs

                      text-slate-300

                      transition-all
                      duration-300

                      hover:bg-white/10
                    `}
                  >

                    {item}

                  </button>
                ))}

              </div>

            </div>

            {/* ====================================================== */}
            {/* STATS */}
            {/* ====================================================== */}

            <div
              className="
                mt-8

                grid gap-4

                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              {/* CARD */}

              <motion.div
                whileHover={{
                  y: -3,
                }}

                className={`
                  ${glass}

                  rounded-2xl

                  p-5
                `}
              >

                <Users
                  size={20}

                  className="
                    mb-3

                    text-[var(--color-secondary)]
                  "
                />

                <h3
                  className="
                    text-3xl
                    font-black
                  "
                >

                  {celebrities.length}+

                </h3>

                <p
                  className="
                    mt-1

                    text-sm

                    text-slate-400
                  "
                >

                  AI Celebrity Teachers

                </p>

              </motion.div>

              {/* CARD */}

              <motion.div
                whileHover={{
                  y: -3,
                }}

                className={`
                  ${glass}

                  rounded-2xl

                  p-5
                `}
              >

                <Brain
                  size={20}

                  className="
                    mb-3

                    text-pink-400
                  "
                />

                <h3
                  className="
                    text-3xl
                    font-black
                  "
                >
                  500+
                </h3>

                <p
                  className="
                    mt-1

                    text-sm

                    text-slate-400
                  "
                >
                  AI Generated Lessons
                </p>

              </motion.div>

              {/* CARD */}

              <motion.div
                whileHover={{
                  y: -3,
                }}

                className={`
                  ${glass}

                  rounded-2xl

                  p-5
                `}
              >

                <Trophy
                  size={20}

                  className="
                    mb-3

                    text-yellow-400
                  "
                />

                <h3
                  className="
                    text-3xl
                    font-black
                  "
                >
                  98%
                </h3>

                <p
                  className="
                    mt-1

                    text-sm

                    text-slate-400
                  "
                >
                  Course Completion
                </p>

              </motion.div>

              {/* CARD */}

              <motion.div
                whileHover={{
                  y: -3,
                }}

                className={`
                  ${glass}

                  rounded-2xl

                  p-5
                `}
              >

                <Sparkles
                  size={20}

                  className="
                    mb-3

                    text-purple-400
                  "
                />

                <h3
                  className="
                    text-3xl
                    font-black
                  "
                >
                  AI
                </h3>

                <p
                  className="
                    mt-1

                    text-sm

                    text-slate-400
                  "
                >
                  Personalized Experiences
                </p>

              </motion.div>

            </div>

          </motion.div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* SECTION TITLE */}
      {/* ====================================================== */}

      <div
        className="
          relative z-10

          mt-14

          px-5

          lg:px-8
        "
      >

        <div
          className="
            mx-auto

            max-w-7xl
          "
        >

          <div
            className="
              mb-8

              flex flex-col
              gap-4

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            <div>

              <h2
                className="
                  text-3xl
                  font-black

                  text-white
                "
              >

                Explore AI Celebrities

              </h2>

              <p
                className="
                  mt-2

                  text-sm
                  leading-7

                  text-slate-400
                "
              >

                Choose your favorite
                mentor and begin
                immersive AI-powered
                learning sessions.

              </p>

            </div>

            {/* MENTOR COUNT */}

            <div
              className={`
                ${glass}

                hidden

                rounded-2xl

                px-5 py-3

                lg:block
              `}
            >

              <span
                className="
                  text-sm

                  text-[var(--color-secondary)]
                "
              >

                {celebrities.length} mentors available

              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* COURSE GRID */}
      {/* ====================================================== */}

      <div
        className="
          relative z-10

          pb-20
        "
      >

        <CourseGrid />

      </div>

    </div>
  );
}

export default Courses;