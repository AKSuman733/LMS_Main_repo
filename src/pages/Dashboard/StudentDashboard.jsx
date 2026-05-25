import {
  BookOpen,
  Trophy,
  BrainCircuit,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Flame,
  BarChart3,
} from "lucide-react";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

/* ====================================================== */
/* IMPORT COURSES */
/* ====================================================== */

import allMentors from "../../data/allMentors";

/* ====================================================== */
/* STYLES */
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
/* STAT CARD */
/* ====================================================== */

function StatCard({ item }) {

  const Icon = item.icon;

  return (

    <motion.div
      whileHover={{
        y: -4,
      }}

      className={`
        ${glass}

        rounded-[28px]

        p-5

        transition-all
        duration-300

        hover:border-cyan-400/20
      `}
    >

      {/* TOP */}

      <div
        className="
          mb-4

          flex items-center
          justify-between
        "
      >

        {/* ICON */}

        <div
          className={`
            flex h-12 w-12
            items-center
            justify-center

            rounded-2xl

            ${item.bg}
          `}
        >

          <Icon
            size={20}

            className={
              item.color
            }
          />

        </div>

        {/* MINI BAR */}

        <BarChart3
          size={18}

          className="
            text-slate-600
          "
        />

      </div>

      {/* VALUE */}

      <h3
        className="
          text-3xl
          font-black

          text-white
        "
      >

        {item.value}

      </h3>

      {/* TITLE */}

      <p
        className="
          mt-1

          text-xs

          text-slate-400
        "
      >

        {item.title}

      </p>

    </motion.div>
  );
}

/* ====================================================== */
/* COURSE CARD */
/* ====================================================== */

function CourseCard({ course }) {

  return (

    <motion.div
      whileHover={{
        y: -5,
      }}

      className={`
        ${glass}

        group

        overflow-hidden

        rounded-[24px]

        border border-white/10

        bg-[#0b1120]

        transition-all
        duration-500

        hover:border-cyan-400/20

        hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]
      `}
    >

      {/* ====================================================== */}
      {/* IMAGE */}
      {/* ====================================================== */}

      <div
        className="
          relative

          h-[220px]

          overflow-hidden
        "
      >

        {/* IMAGE */}

        <img
          src={course.image}

          alt={course.title}

          className="
            h-full
            w-full

            object-cover

            object-top

            transition-transform
            duration-700

            group-hover:scale-105
          "
        />

        {/* LIGHT OVERLAY */}

        <div
          className="
            absolute inset-0

            bg-gradient-to-t

            from-[#050816]/90
            via-[#050816]/20
            to-transparent
          "
        />

        {/* PROGRESS */}

        <div
          className="
            absolute
            left-4 top-4

            rounded-full

            bg-black/40

            px-3 py-1

            text-[10px]
            font-semibold

            text-white

            backdrop-blur-lg
          "
        >

          {course.progress}% Completed

        </div>

      </div>

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div className="p-5">

        {/* MENTOR */}

        <p
          className="
            text-xs
            font-semibold

            tracking-wide

            text-cyan-400
          "
        >

          {course.mentor}

        </p>

        {/* TITLE */}

        <h3
          className="
            mt-2

            line-clamp-2

            text-xl
            font-black
            leading-snug

            text-white
          "
        >

          {course.title}

        </h3>

        {/* PROGRESS */}

        <div className="mt-5">

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

                text-cyan-400
              "
            >

              {course.progress}%

            </span>

          </div>

          {/* BAR */}

          <div
            className="
              h-2

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

                from-orange-500
                via-pink-500
                to-cyan-400
              "

              style={{
                width:
                  `${course.progress}%`,
              }}
            />

          </div>

        </div>

        {/* BUTTON */}

        <Link
          to={`/courses/${course.id}`}
        >

          <button
            className="
              mt-5

              flex w-full
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-gradient-to-r

              from-orange-500
              via-pink-500
              to-cyan-500

              px-4 py-3

              text-sm
              font-semibold

              text-white

              transition-all
              duration-300

              hover:scale-[1.02]
            "
          >

            <PlayCircle
              size={16}
            />

            Continue Learning

            <ArrowRight
              size={16}
            />

          </button>

        </Link>

      </div>

    </motion.div>
  );
}

/* ====================================================== */
/* MAIN COMPONENT */
/* ====================================================== */

function StudentDashboard() {

  const [recentCourses, setRecentCourses] =
    useState([]);

  const [stats, setStats] =
    useState([]);

  const [userName, setUserName] =
    useState("Student");

  /* ====================================================== */
  /* LOAD DATA */
  /* ====================================================== */

  useEffect(() => {

    /* ====================================================== */
    /* USER */
    /* ====================================================== */

    const currentUser =
      JSON.parse(
        localStorage.getItem(
          "currentUser"
        )
      );

    if (
      currentUser?.name
    ) {

      setUserName(
        currentUser.name
      );
    }

    /* ====================================================== */
    /* ENROLLED */
    /* ====================================================== */

    const enrolledCourses =
      JSON.parse(
        localStorage.getItem(
          "enrolledCourses"
        )
      ) || [];

    /* ====================================================== */
    /* FIX ARRAY */
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
    /* FILTER */
    /* ====================================================== */

    const enrolledMentors =
      mentorsArray.filter(
        (course) =>

          enrolledCourses.includes(
            course.id
          )
      );

    /* ====================================================== */
    /* BUILD DATA */
    /* ====================================================== */

    const coursesData =
      enrolledMentors.map(
        (course) => {

          const completedModules =
            JSON.parse(
              localStorage.getItem(
                `course-progress-${course.id}`
              )
            ) || [];

          const modules =
            course.modules ||
            [];

          const progress =
            modules.length > 0

              ? Math.round(
                  (
                    completedModules.length /
                    modules.length
                  ) * 100
                )

              : 0;

          return {

            id: course.id,

            title:
              course.title ||
              course.course,

            mentor:
              course.mentor,

            image:
              course.image ||
              course.mentorImage,

            progress,
          };
        }
      );

    setRecentCourses(
      coursesData
    );

    /* ====================================================== */
    /* COMPLETED */
    /* ====================================================== */

    const completedCourses =
      coursesData.filter(
        (course) =>
          course.progress ===
          100
      );

    /* ====================================================== */
    /* SCORE */
    /* ====================================================== */

    const overallScore =
      coursesData.length > 0

        ? Math.round(
            coursesData.reduce(
              (
                acc,
                course
              ) =>

                acc +
                course.progress,

              0
            ) /
              coursesData.length
          )

        : 0;

    /* ====================================================== */
    /* STATS */
    /* ====================================================== */

    setStats([
      {
        icon: BookOpen,

        title:
          "Enrolled Courses",

        value:
          enrolledMentors.length.toString(),

        color:
          "text-cyan-400",

        bg:
          "bg-cyan-500/10",
      },

      {
        icon: CheckCircle2,

        title:
          "Completed",

        value:
          completedCourses.length.toString(),

        color:
          "text-green-400",

        bg:
          "bg-green-500/10",
      },

      {
        icon: Trophy,

        title:
          "Certificates",

        value:
          completedCourses.length.toString(),

        color:
          "text-yellow-400",

        bg:
          "bg-yellow-500/10",
      },

      {
        icon: BrainCircuit,

        title:
          "Skill Score",

        value:
          `${overallScore}%`,

        color:
          "text-pink-400",

        bg:
          "bg-pink-500/10",
      },
    ]);

  }, []);

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

        lg:px-8
      "
    >

      {/* GLOWS */}

      <div
        className="
          absolute
          -left-24
          top-0

          h-[260px]
          w-[260px]

          rounded-full

          bg-cyan-500/10

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

          bg-pink-500/10

          blur-[120px]
        "
      />

      {/* MAIN */}

      <div
        className="
          relative z-10

          mx-auto

          max-w-7xl
        "
      >

        {/* HERO */}

        <div
          className="
            mb-10

            flex flex-col
            gap-5

            xl:flex-row
            xl:items-center
            xl:justify-between
          "
        >

          {/* LEFT */}

          <div>

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
                AI Learning Dashboard
              </span>

            </div>

            {/* TITLE */}

            <h1
              className="
                text-4xl
                font-black
                leading-tight

                md:text-5xl
              "
            >

              <span className="text-white">
                Welcome Back,
              </span>

              <br />

              <span
                className={
                  gradientText
                }
              >
                {userName} 👋
              </span>

            </h1>

            {/* DESC */}

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

              Continue learning from
              legendary mentors,
              innovators, creators,
              athletes, and AI pioneers.

            </p>

          </div>

          {/* STREAK */}

          <div
            className={`
              ${glass}

              rounded-[28px]

              p-5
            `}
          >

            <div
              className="
                flex items-center
                gap-4
              "
            >

              <div
                className="
                  flex h-14 w-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-r

                  from-orange-500
                  to-pink-500
                "
              >

                <Flame
                  size={24}
                />

              </div>

              <div>

                <p
                  className="
                    text-xs

                    text-slate-400
                  "
                >
                  Learning Streak
                </p>

                <h3
                  className="
                    text-3xl
                    font-black

                    text-white
                  "
                >
                  24 Days
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div
          className="
            mb-10

            grid gap-4

            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {stats.map(
            (item) => (

              <StatCard
                key={item.title}

                item={item}
              />
            )
          )}

        </div>

        {/* COURSES */}

        <div>

          {/* HEADER */}

          <div className="mb-6">

            <h2
              className="
                text-3xl
                font-black

                text-white
              "
            >

              Continue Learning

            </h2>

            <p
              className="
                mt-2

                text-sm

                text-slate-400
              "
            >

              Resume your futuristic AI learning journey.

            </p>

          </div>

          {/* EMPTY */}

          {recentCourses.length ===
          0 ? (

            <div
              className={`
                ${glass}

                rounded-[32px]

                p-12

                text-center
              `}
            >

              <BookOpen
                size={52}

                className="
                  mx-auto mb-5

                  text-cyan-400
                "
              />

              <h2
                className="
                  text-3xl
                  font-black

                  text-white
                "
              >

                No Enrolled Courses

              </h2>

              <p
                className="
                  mx-auto mt-4

                  max-w-xl

                  text-sm
                  leading-8

                  text-slate-400
                "
              >

                Enroll in courses to begin
                your legendary AI learning journey 🚀

              </p>

              <Link to="/courses">

                <button
                  className="
                    mt-6

                    rounded-2xl

                    bg-gradient-to-r

                    from-orange-500
                    to-pink-500

                    px-6 py-3

                    text-sm
                    font-semibold

                    text-white
                  "
                >

                  Explore Courses

                </button>

              </Link>

            </div>

          ) : (

            <div
              className="
                grid gap-5

                md:grid-cols-2
                xl:grid-cols-3
              "
            >

              {recentCourses.map(
                (course) => (

                  <CourseCard
                    key={course.id}

                    course={course}
                  />
                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;