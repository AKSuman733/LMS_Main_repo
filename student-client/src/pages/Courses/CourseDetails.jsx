import {
  Clock3,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  BrainCircuit,
  Award,
  Sparkles,
  BookOpen,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useState,
  useEffect,
} from "react";

/* ================= DATA ================= */

import allMentors from "../../data/allMentors";

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

function CourseDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [isEnrolled, setIsEnrolled] =
    useState(false);

  const [playing, setPlaying] =
    useState(false);

  const [
    completedModules,
    setCompletedModules,
  ] = useState([]);

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
  /* FIND COURSE */
  /* ====================================================== */

  const course =
    mentorsArray.find(
      (mentor) =>
        mentor.id === Number(id)
    ) || mentorsArray[0];

  /* ====================================================== */
  /* MODULES */
  /* ====================================================== */

  const modules =
    course.modules || [

      {
        id: 1,

        title: "Introduction",

        duration: "12 mins",
      },

      {
        id: 2,

        title: "Core Concepts",

        duration: "25 mins",
      },

      {
        id: 3,

        title: "Advanced Session",

        duration: "32 mins",
      },

      {
        id: 4,

        title:
          "Real World Projects",

        duration: "40 mins",
      },
    ];

  /* ====================================================== */
  /* LOAD PROGRESS */
  /* ====================================================== */

  useEffect(() => {

    const savedProgress =
      JSON.parse(
        localStorage.getItem(
          `course-progress-${id}`
        )
      ) || [];

    setCompletedModules(
      savedProgress
    );

  }, [id]);

  /* ====================================================== */
  /* SAVE PROGRESS */
  /* ====================================================== */

  useEffect(() => {

    localStorage.setItem(
      `course-progress-${id}`,

      JSON.stringify(
        completedModules
      )
    );

  }, [completedModules, id]);

  /* ====================================================== */
  /* ENROLLMENT */
  /* ====================================================== */

  useEffect(() => {

    const enrolled =
      JSON.parse(
        localStorage.getItem(
          "enrolledCourses"
        )
      ) || [];

    setIsEnrolled(
      enrolled.includes(course.id)
    );

  }, [course.id]);

  /* ====================================================== */
  /* TOGGLE MODULE */
  /* ====================================================== */

  const toggleModule = (
    moduleId
  ) => {

    if (
      completedModules.includes(
        moduleId
      )
    ) {

      setCompletedModules(
        completedModules.filter(
          (item) =>
            item !== moduleId
        )
      );

    } else {

      setCompletedModules([
        ...completedModules,
        moduleId,
      ]);
    }
  };

  /* ====================================================== */
  /* ENROLL */
  /* ====================================================== */

  const handleEnroll = () => {

    const enrolled =
      JSON.parse(
        localStorage.getItem(
          "enrolledCourses"
        )
      ) || [];

    if (
      !enrolled.includes(
        course.id
      )
    ) {

      const updated = [

        ...enrolled,

        course.id,
      ];

      localStorage.setItem(
        "enrolledCourses",

        JSON.stringify(updated)
      );

      setIsEnrolled(true);
    }
  };

  /* ====================================================== */
  /* REMOVE */
  /* ====================================================== */

  const handleRemove = () => {

    const enrolled =
      JSON.parse(
        localStorage.getItem(
          "enrolledCourses"
        )
      ) || [];

    const updated =
      enrolled.filter(
        (courseId) =>
          courseId !== course.id
      );

    localStorage.setItem(
      "enrolledCourses",

      JSON.stringify(updated)
    );

    setIsEnrolled(false);

    navigate(
      "/dashboard/my-courses"
    );
  };

  /* ====================================================== */
  /* START SESSION */
  /* ====================================================== */

  const startSession = () => {

    localStorage.setItem(
      "selectedCelebrity",
      course.mentor
    );

    localStorage.setItem(
      "selectedTopic",

      course.title ||
        course.course
    );

    navigate(
      `/watch-course/${course.id}`
    );
  };

  /* ====================================================== */
  /* PROGRESS */
  /* ====================================================== */

  const progress =
    modules.length > 0

      ? (
          completedModules.length /
          modules.length
        ) * 100

      : 0;

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

  return (

    <div
      className="
        min-h-screen

        bg-[var(--color-background)]

        px-5 pb-16 pt-24

        text-white
      "
    >

      {/* ================= GLOWS ================= */}

      <div
        className="
          absolute
          left-0
          top-20

          h-[220px]
          w-[220px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[100px]
        "
      />

      <div
        className="
          absolute
          right-0
          top-[40%]

          h-[220px]
          w-[220px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[100px]
        "
      />

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

        <div
          className="
            grid gap-10

            lg:grid-cols-2
          "
        >

          {/* ====================================================== */}
          {/* LEFT */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}
          >

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
                "
              >
                {course.category}
              </span>

            </div>

            {/* TITLE */}

            <h1
              className="
                mb-4

                text-4xl
                font-black
                leading-tight

                lg:text-5xl
              "
            >

              {course.title ||
                course.course}

            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mb-6

                max-w-2xl

                text-sm
                leading-8

                text-slate-400
              "
            >

              {course.description}

            </p>

            {/* MENTOR */}

            <div
              className={`
                ${glass}

                mb-6

                flex items-center
                gap-4

                rounded-2xl

                p-4
              `}
            >

              <img
                src={
                  course.mentorImage ||
                  course.image
                }

                alt={course.mentor}

                className="
                  h-14 w-14

                  rounded-full

                  object-cover
                "
              />

              <div>

                <h3
                  className="
                    text-base
                    font-bold
                  "
                >
                  {course.mentor}
                </h3>

                <p
                  className="
                    text-sm

                    text-slate-400
                  "
                >

                  {course.role ||
                    "AI Mentor"}

                </p>

              </div>

            </div>

            {/* PROGRESS */}

            <div className="mb-6">

              <div
                className="
                  mb-2

                  flex items-center
                  justify-between
                "
              >

                <span
                  className="
                    text-sm
                    font-medium
                  "
                >
                  Course Progress
                </span>

                <span
                  className="
                    text-sm

                    text-[var(--color-secondary)]
                  "
                >
                  {Math.round(
                    progress
                  )}
                  %
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

                <motion.div
                  initial={{
                    width: 0,
                  }}

                  animate={{
                    width: `${progress}%`,
                  }}

                  transition={{
                    duration: 0.6,
                  }}

                  className="
                    h-full

                    rounded-full

                    bg-gradient-to-r

                    from-[var(--color-primary)]
                    to-[var(--color-secondary)]
                  "
                />

              </div>

            </div>

            {/* BUTTONS */}

            <div
              className="
                flex flex-wrap
                gap-3
              "
            >

              {!isEnrolled ? (

                <button
                  onClick={
                    handleEnroll
                  }

                  className="
                    flex items-center
                    gap-2

                    rounded-xl

                    bg-gradient-to-r

                    from-green-500
                    to-emerald-600

                    px-5 py-3

                    text-sm
                    font-semibold

                    transition-all
                    duration-300

                    hover:scale-[1.02]
                  "
                >

                  Enroll Now

                  <ArrowRight
                    size={16}
                  />

                </button>

              ) : (

                <>

                  {/* START */}

                  <button
                    onClick={
                      startSession
                    }

                    className="
                      flex items-center
                      gap-2

                      rounded-xl

                      bg-gradient-to-r

                      from-[var(--color-primary)]
                      to-pink-500

                      px-5 py-3

                      text-sm
                      font-semibold

                      shadow-[var(--shadow-orange)]

                      transition-all
                      duration-300

                      hover:scale-[1.02]
                    "
                  >

                    Start Session

                    <ArrowRight
                      size={16}
                    />

                  </button>

                  {/* REMOVE */}

                  <button
                    onClick={
                      handleRemove
                    }

                    className="
                      flex items-center
                      gap-2

                      rounded-xl

                      border border-red-500/20

                      bg-red-500/10

                      px-5 py-3

                      text-sm
                      font-medium

                      text-red-400

                      transition-all
                      duration-300

                      hover:bg-red-500/20
                    "
                  >

                    <Trash2
                      size={16}
                    />

                    Remove

                  </button>

                </>

              )}

              {/* TRAILER */}

              <button
                onClick={() =>
                  setPlaying(true)
                }

                className={`
                  ${glass}

                  flex items-center
                  gap-2

                  rounded-xl

                  px-5 py-3

                  text-sm
                  font-medium

                  transition-all
                  duration-300

                  hover:bg-white/10
                `}
              >

                <PlayCircle
                  size={16}
                />

                Watch Trailer

              </button>

            </div>

          </motion.div>

          {/* ====================================================== */}
          {/* RIGHT */}
          {/* ====================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}
          >

            <div
              className={`
                ${glass}

                overflow-hidden

                rounded-3xl
              `}
            >

              {!playing ? (

                <div
                  className="
                    relative
                  "
                >

                  <img
                    src={course.image}

                    alt={course.title}

                    className="
                      h-[420px]
                      w-full

                      object-contain

                      bg-black
                    "
                  />

                  <button
                    onClick={() =>
                      setPlaying(true)
                    }

                    className="
                      absolute inset-0

                      flex items-center
                      justify-center

                      bg-black/30
                    "
                  >

                    <PlayCircle
                      size={70}

                      className="
                        text-white

                        transition-all
                        duration-300

                        hover:scale-110
                      "
                    />

                  </button>

                </div>

              ) : (

                <iframe
                  className="
                    h-[420px]
                    w-full
                  "

                  src={`${
                    course.trailer ||

                    "https://www.youtube.com/embed/dQw4w9WgXcQ"
                  }?autoplay=1`}

                  title={course.title}

                  allow="autoplay"

                  allowFullScreen
                />

              )}

            </div>

          </motion.div>

        </div>

        {/* ====================================================== */}
        {/* INFO CARDS */}
        {/* ====================================================== */}

        <div
          className="
            mt-12

            grid gap-4

            md:grid-cols-3
          "
        >

          {/* CARD */}

          <div
            className={`
              ${glass}

              rounded-2xl

              p-5
            `}
          >

            <Clock3
              size={20}

              className="
                mb-3

                text-[var(--color-secondary)]
              "
            />

            <h3
              className="
                mb-2

                text-lg
                font-bold
              "
            >

              {course.duration ||
                "12 Weeks"}

            </h3>

            <p
              className="
                text-sm

                text-slate-400
              "
            >
              Structured roadmap for mastering skills.
            </p>

          </div>

          {/* CARD */}

          <div
            className={`
              ${glass}

              rounded-2xl

              p-5
            `}
          >

            <BrainCircuit
              size={20}

              className="
                mb-3

                text-pink-400
              "
            />

            <h3
              className="
                mb-2

                text-lg
                font-bold
              "
            >
              AI Sessions
            </h3>

            <p
              className="
                text-sm

                text-slate-400
              "
            >
              Interactive celebrity mentor experiences.
            </p>

          </div>

          {/* CARD */}

          <div
            className={`
              ${glass}

              rounded-2xl

              p-5
            `}
          >

            <Award
              size={20}

              className="
                mb-3

                text-yellow-400
              "
            />

            <h3
              className="
                mb-2

                text-lg
                font-bold
              "
            >
              Certification
            </h3>

            <p
              className="
                text-sm

                text-slate-400
              "
            >
              Earn completion certificates after finishing.
            </p>

          </div>

        </div>

        {/* ====================================================== */}
        {/* MODULES */}
        {/* ====================================================== */}

        <div className="mt-12">

          {/* HEADER */}

          <div
            className="
              mb-5

              flex items-center
              gap-3
            "
          >

            <BookOpen
              size={20}

              className="
                text-[var(--color-secondary)]
              "
            />

            <h2
              className="
                text-2xl
                font-bold
              "
            >

              Course Modules

            </h2>

          </div>

          {/* MODULES */}

          <div className="space-y-3">

            {modules.map(
              (module) => {

                const completed =
                  completedModules.includes(
                    module.id
                  );

                return (

                  <motion.div
                    whileHover={{
                      y: -2,
                    }}

                    key={module.id}

                    className={`
                      ${glass}

                      flex items-center
                      justify-between

                      rounded-2xl

                      p-4
                    `}
                  >

                    <div
                      className="
                        flex items-center
                        gap-4
                      "
                    >

                      <button
                        onClick={() =>
                          toggleModule(
                            module.id
                          )
                        }
                      >

                        <CheckCircle2
                          size={22}

                          className={
                            completed

                              ? "text-green-400"

                              : "text-slate-500"
                          }
                        />

                      </button>

                      <div>

                        <h3
                          className="
                            text-sm
                            font-semibold
                          "
                        >

                          {module.title}

                        </h3>

                        <p
                          className="
                            mt-1

                            text-xs

                            text-slate-400
                          "
                        >

                          {module.duration}

                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        rounded-full

                        bg-[var(--color-secondary)]/10

                        px-3 py-1

                        text-xs

                        text-[var(--color-secondary)]
                      "
                    >

                      Module {module.id}

                    </div>

                  </motion.div>
                );
              }
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default CourseDetails;