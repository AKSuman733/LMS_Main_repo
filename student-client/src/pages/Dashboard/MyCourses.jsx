import {
  PlayCircle,
  ArrowRight,
  Trash2,
  BookOpen,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

import allMentors from "../../data/allMentors";

/* ====================================================== */
/* ================= STYLES ============================= */
/* ====================================================== */

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

/* ====================================================== */
/* ================= COMPONENT ========================== */
/* ====================================================== */

function MyCourses() {

  const [myCourses, setMyCourses] =
    useState([]);

  /* ====================================================== */
  /* FIX ARRAY / OBJECT */
  /* ====================================================== */

  const mentorsArray =
    Array.isArray(allMentors)

      ? allMentors

      : Object.keys(allMentors).map(
          (key) => ({

            id: Number(key),

            ...allMentors[key],
          })
        );

  /* ====================================================== */
  /* LOAD ENROLLED COURSES */
  /* ====================================================== */

  useEffect(() => {

    const enrolled =
      JSON.parse(
        localStorage.getItem(
          "enrolledCourses"
        )
      ) || [];

    const filteredCourses =
      mentorsArray.filter(
        (course) =>
          enrolled.includes(
            course.id
          )
      );

    setMyCourses(
      filteredCourses
    );

  }, []);

  /* ====================================================== */
  /* REMOVE COURSE */
  /* ====================================================== */

  const removeCourse = (
    courseId
  ) => {

    const enrolled =
      JSON.parse(
        localStorage.getItem(
          "enrolledCourses"
        )
      ) || [];

    const updatedEnrolled =
      enrolled.filter(
        (id) =>
          id !== courseId
      );

    localStorage.setItem(
      "enrolledCourses",

      JSON.stringify(
        updatedEnrolled
      )
    );

    setMyCourses((prev) =>

      prev.filter(
        (course) =>
          course.id !==
          courseId
      )
    );
  };

  /* ====================================================== */
  /* CALCULATE OVERALL PROGRESS */
  /* ====================================================== */

  const overallProgress =
    myCourses.length > 0

      ? Math.round(

          myCourses.reduce(
            (
              acc,
              course
            ) => {

              const progress =
                JSON.parse(
                  localStorage.getItem(
                    `course-progress-${course.id}`
                  )
                ) || [];

              const modules =
                course.modules ||
                [];

              const percentage =
                modules.length >
                0

                  ? (
                      progress.length /
                      modules.length
                    ) * 100

                  : 0;

              return (
                acc +
                percentage
              );
            },

            0
          ) /
            myCourses.length
        )

      : 0;

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

  return (

    <div
      className="
        relative

        min-h-screen

        overflow-hidden

        bg-[var(--color-background)]

        px-5 pb-16 pt-24

        text-white

        lg:px-8
      "
    >

      {/* ====================================================== */}
      {/* GLOWS */}
      {/* ====================================================== */}

      <div
        className="
          absolute
          -left-24
          top-0

          h-[260px]
          w-[260px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -right-24
          bottom-0

          h-[260px]
          w-[260px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[120px]
        "
      />

      {/* ====================================================== */}

      <div
        className="
          relative z-10

          mx-auto

          max-w-7xl
        "
      >

        {/* ====================================================== */}
        {/* HERO */}
        {/* ====================================================== */}

        <div className="mb-10">

          {/* BADGE */}

          <div
            className={`
              ${glass}

              mb-4

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
              Personalized AI Learning
            </span>

          </div>

          {/* TOP */}

          <div
            className="
              flex flex-col
              gap-5

              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            {/* LEFT */}

            <div>

              <h1
                className="
                  text-4xl
                  font-black
                  leading-tight

                  md:text-5xl
                "
              >

                <span className="text-white">
                  My
                </span>{" "}

                <span
                  className={
                    gradientText
                  }
                >
                  Courses
                </span>

              </h1>

              <p
                className="
                  mt-4

                  max-w-3xl

                  text-sm
                  leading-8

                  text-slate-400

                  md:text-base
                "
              >

                Track your AI learning
                journey, continue
                immersive sessions,
                and master futuristic
                skills from legendary
                mentors.

              </p>

            </div>

            {/* RIGHT STATS */}

            <div
              className="
                grid gap-4

                sm:grid-cols-2
              "
            >

              {/* PROGRESS */}

              <div
                className={`
                  ${glass}

                  rounded-3xl

                  p-5
                `}
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex h-12 w-12
                      items-center
                      justify-center

                      rounded-2xl

                      bg-gradient-to-r

                      from-[var(--color-primary)]
                      to-pink-500
                    "
                  >

                    <BarChart3
                      size={20}
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-xs

                        text-slate-400
                      "
                    >
                      Overall Progress
                    </p>

                    <h2
                      className="
                        text-3xl
                        font-black
                      "
                    >
                      {
                        overallProgress
                      }
                      %
                    </h2>

                  </div>

                </div>

              </div>

              {/* COURSES */}

              <div
                className={`
                  ${glass}

                  rounded-3xl

                  p-5
                `}
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <div
                    className="
                      flex h-12 w-12
                      items-center
                      justify-center

                      rounded-2xl

                      bg-[var(--color-secondary)]/10
                    "
                  >

                    <BookOpen
                      size={20}

                      className="
                        text-[var(--color-secondary)]
                      "
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-xs

                        text-slate-400
                      "
                    >
                      Enrolled Courses
                    </p>

                    <h2
                      className="
                        text-3xl
                        font-black
                      "
                    >
                      {
                        myCourses.length
                      }
                    </h2>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ====================================================== */}
        {/* EMPTY STATE */}
        {/* ====================================================== */}

        {myCourses.length ===
          0 && (

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            className={`
              ${glass}

              flex flex-col
              items-center
              justify-center

              rounded-[32px]

              p-10

              text-center

              md:p-16
            `}
          >

            {/* ICON */}

            <div
              className="
                mb-6

                flex h-24 w-24
                items-center
                justify-center

                rounded-full

                bg-gradient-to-r

                from-[var(--color-primary)]/20
                to-[var(--color-secondary)]/20
              "
            >

              <BookOpen
                size={40}

                className="
                  text-[var(--color-secondary)]
                "
              />

            </div>

            {/* TITLE */}

            <h2
              className="
                text-3xl
                font-black

                text-white
              "
            >

              No Courses Yet

            </h2>

            {/* TEXT */}

            <p
              className="
                mt-4

                max-w-xl

                text-sm
                leading-8

                text-slate-400

                md:text-base
              "
            >

              Your futuristic learning
              vault is empty.
              Start exploring immersive
              AI celebrity mentor courses.

            </p>

            {/* BUTTON */}

            <Link
              to="/courses"

              className="mt-6"
            >

              <button
                className="
                  flex items-center
                  gap-2

                  rounded-2xl

                  bg-gradient-to-r

                  from-[var(--color-primary)]
                  to-pink-500

                  px-6 py-3

                  text-sm
                  font-semibold

                  text-white

                  shadow-[var(--shadow-orange)]

                  transition-all
                  duration-300

                  hover:scale-[1.03]
                "
              >

                Explore Courses

                <ArrowRight
                  size={16}
                />

              </button>

            </Link>

          </motion.div>
        )}

        {/* ====================================================== */}
        {/* COURSE GRID */}
        {/* ====================================================== */}

        {myCourses.length >
          0 && (

          <div
            className="
              grid gap-5

              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {myCourses.map(
              (
                course,
                index
              ) => {

                const completed =
                  JSON.parse(
                    localStorage.getItem(
                      `course-progress-${course.id}`
                    )
                  ) || [];

                const modules =
                  course.modules ||
                  [];

                const progress =
                  modules.length >
                  0

                    ? Math.round(
                        (
                          completed.length /
                          modules.length
                        ) * 100
                      )

                    : 0;

                return (

                  <motion.div
                    key={course.id}

                    initial={{
                      opacity: 0,
                      y: 30,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    transition={{
                      delay:
                        index *
                        0.08,
                    }}

                    whileHover={{
                      y: -5,
                    }}

                    className={`
                      ${glass}

                      overflow-hidden

                      rounded-[28px]

                      transition-all
                      duration-300
                    `}
                  >

                    {/* IMAGE */}

                    <div className="relative">

                      <img
                        src={
                          course.image
                        }

                        alt={
                          course.title
                        }

                        className="
                          h-[220px]
                          w-full

                          object-cover
                        "
                      />

                      {/* OVERLAY */}

                      <div
                        className="
                          absolute inset-0

                          bg-gradient-to-t

                          from-[var(--color-background)]
                          via-transparent
                          to-transparent
                        "
                      />

                      {/* CATEGORY */}

                      <div
                        className="
                          absolute
                          left-4 top-4

                          rounded-full

                          bg-black/40

                          px-3 py-1.5

                          text-[11px]
                          font-medium

                          text-white

                          backdrop-blur-xl
                        "
                      >

                        {
                          course.category
                        }

                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="p-5">

                      {/* MENTOR */}

                      <div
                        className="
                          mb-4

                          flex items-center
                          gap-3
                        "
                      >

                        <img
                          src={
                            course.mentorImage ||
                            course.image
                          }

                          alt={
                            course.mentor
                          }

                          className="
                            h-11 w-11

                            rounded-full

                            object-cover
                          "
                        />

                        <div>

                          <h3
                            className="
                              text-sm
                              font-bold

                              text-white
                            "
                          >

                            {
                              course.mentor
                            }

                          </h3>

                          <p
                            className="
                              text-xs

                              text-slate-400
                            "
                          >

                            {course.role ||
                              "AI Mentor"}

                          </p>

                        </div>

                      </div>

                      {/* TITLE */}

                      <h2
                        className="
                          mb-4

                          text-xl
                          font-black
                          leading-tight

                          text-white
                        "
                      >

                        {course.title ||
                          course.course}

                      </h2>

                      {/* PROGRESS */}

                      <div className="mb-5">

                        <div
                          className="
                            mb-2

                            flex items-center
                            justify-between
                          "
                        >

                          <span
                            className="
                              text-xs

                              text-slate-400
                            "
                          >
                            Progress
                          </span>

                          <span
                            className="
                              text-xs
                              font-bold

                              text-[var(--color-secondary)]
                            "
                          >

                            {progress}%

                          </span>

                        </div>

                        <div
                          className="
                            h-2.5

                            overflow-hidden

                            rounded-full

                            bg-white/10
                          "
                        >

                          <div
                            className="
                              h-full

                              rounded-full

                              bg-gradient-to-r

                              from-[var(--color-primary)]
                              to-[var(--color-secondary)]
                            "

                            style={{
                              width:
                                `${progress}%`,
                            }}
                          />

                        </div>

                      </div>

                      {/* STATUS */}

                      <div
                        className="
                          mb-5

                          flex items-center
                          gap-2

                          rounded-xl

                          border border-green-500/20

                          bg-green-500/10

                          px-3 py-2
                        "
                      >

                        <CheckCircle2
                          size={15}

                          className="
                            text-green-400
                          "
                        />

                        <span
                          className="
                            text-xs

                            text-green-300
                          "
                        >

                          Active Learning

                        </span>

                      </div>

                      {/* BUTTONS */}

                      <div
                        className="
                          flex gap-3
                        "
                      >

                        {/* CONTINUE */}

                        <Link
                          to={`/courses/${course.id}`}

                          className="flex-1"
                        >

                          <button
                            className="
                              flex w-full
                              items-center
                              justify-center
                              gap-2

                              rounded-xl

                              bg-gradient-to-r

                              from-[var(--color-primary)]
                              to-pink-500

                              px-4 py-3

                              text-sm
                              font-medium

                              text-white

                              shadow-[var(--shadow-orange)]

                              transition-all
                              duration-300

                              hover:scale-[1.02]
                            "
                          >

                            <PlayCircle
                              size={16}
                            />

                            Continue

                          </button>

                        </Link>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            removeCourse(
                              course.id
                            )
                          }

                          className="
                            flex items-center
                            justify-center

                            rounded-xl

                            border border-red-500/20

                            bg-red-500/10

                            px-4

                            text-red-400

                            transition-all
                            duration-300

                            hover:bg-red-500/20
                          "
                        >

                          <Trash2
                            size={18}
                          />

                        </button>

                      </div>

                    </div>

                  </motion.div>
                );
              }
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyCourses;