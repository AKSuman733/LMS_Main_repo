import { useState } from "react";

import CourseCard from "./CourseCard";

import {
  Sparkles,
  ArrowRight,
  SlidersHorizontal,
} from "lucide-react";

import allMentors from "../../data/allMentors";

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

const CourseGrid = () => {

  /* ====================================================== */
  /* FILTER STATES */
  /* ====================================================== */

  const [selectedSort, setSelectedSort] =
    useState("All");

  const [selectedLevel, setSelectedLevel] =
    useState("All");

  const [selectedTopic, setSelectedTopic] =
    useState("All");

  /* ====================================================== */
  /* FILTER OPTIONS */
  /* ====================================================== */

  const sortOptions = [
    "All",
    "Trending",
    "Popular",
  ];

  const levelOptions = [
    "All",
    "Beginner",
    "Intermediate",
    "Advanced",
  ];

  const topicOptions = [
    "All",
    "Web Development",
    "Programming",
    "Artificial Intelligence",
    "Cybersecurity",
    "Data Science",
    "UI/UX Design",
  ];

  /* ====================================================== */
  /* HELPERS */
  /* ====================================================== */

  const getLevel = (
    mentor
  ) => {

    return (

      mentor.level ||

      (
        mentor.id % 3 === 0

          ? "Beginner"

          : mentor.id % 3 === 1

          ? "Intermediate"

          : "Advanced"
      )
    );
  };

  const getPrice = (
    level
  ) => {

    if (
      level === "Beginner"
    ) {

      const beginnerPrices = [

        "₹299",
        "₹399",
        "₹499",
        "₹599",
      ];

      return beginnerPrices[
        Math.floor(
          Math.random() *
          beginnerPrices.length
        )
      ];
    }

    if (
      level === "Intermediate"
    ) {

      const intermediatePrices = [

        "₹699",
        "₹799",
        "₹999",
        "₹1199",
      ];

      return intermediatePrices[
        Math.floor(
          Math.random() *
          intermediatePrices.length
        )
      ];
    }

    const advancedPrices = [

      "₹1499",
      "₹1799",
      "₹1999",
      "₹2499",
    ];

    return advancedPrices[
      Math.floor(
        Math.random() *
        advancedPrices.length
      )
    ];
  };

  /* ====================================================== */
  /* COURSES */
  /* ====================================================== */

  const courses = Object.values(
    allMentors
  ).map((mentor) => {

    const level =
      getLevel(mentor);

    return {

      id: mentor.id,

      mentor:
        mentor.mentor,

      role:
        mentor.role,

      title:
        mentor.title ||
        mentor.course,

      category:
        mentor.category,

      students:
        mentor.students ||
        "10K+",

      duration:
        mentor.duration ||
        "8 Weeks",

      level,

      price:

        mentor.price ||

        getPrice(level),

      image:
        mentor.image,

      mentorImage:

        mentor.mentorImage ||

        mentor.image,
    };
  });

  /* ====================================================== */
  /* FILTER LOGIC */
  /* ====================================================== */

  let filteredCourses =
    courses.filter(
      (course) => {

        const topicMatch =

          selectedTopic ===
            "All" ||

          course.category ===
            selectedTopic;

        const levelMatch =

          selectedLevel ===
            "All" ||

          course.level ===
            selectedLevel;

        return (
          topicMatch &&
          levelMatch
        );
      }
    );

  /* ====================================================== */
  /* SORT LOGIC */
  /* ====================================================== */

  if (
    selectedSort ===
    "Popular"
  ) {

    filteredCourses = [
      ...filteredCourses,
    ].sort(
      (a, b) =>

        parseInt(
          b.students.replace(
            /\D/g,
            ""
          )
        ) -

        parseInt(
          a.students.replace(
            /\D/g,
            ""
          )
        )
    );
  }

  if (
    selectedSort ===
    "Trending"
  ) {

    filteredCourses = [
      ...filteredCourses,
    ].reverse();
  }

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

  return (

    <section
      className="
        relative overflow-hidden

        bg-[var(--color-surface)]

        px-6 py-20
      "
    >

      {/* ====================================================== */}
      {/* BACKGROUND GLOW */}
      {/* ====================================================== */}

      <div
        className="
          absolute left-0 top-0

          h-72 w-72

          rounded-full

          bg-cyan-500/20

          blur-3xl
        "
      />

      <div
        className="
          absolute bottom-0 right-0

          h-72 w-72

          rounded-full

          bg-purple-500/20

          blur-3xl
        "
      />

      {/* ====================================================== */}
      {/* MAIN */}
      {/* ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* ====================================================== */}
        {/* HEADER */}
        {/* ====================================================== */}

        <div
          className="
            mb-14 flex flex-col

            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          {/* LEFT */}

          <div>

            <div
              className="
                mb-5 inline-flex items-center gap-2

                rounded-full

                border border-[var(--color-border)]

                bg-[var(--color-card)]

                px-4 py-2

                text-sm

                text-[var(--color-secondary)]

                backdrop-blur-md
              "
            >

              <Sparkles size={16} />

              World-Class Mentors

            </div>

            <h2
              className="
                text-4xl font-extrabold

                leading-tight

                text-white

                md:text-5xl
              "
            >

              Learn From

              <span
                className="
                  bg-gradient-to-r
                  from-cyan-400
                  to-blue-500

                  bg-clip-text
                  text-transparent
                "
              >
                {" "}Legends
              </span>

            </h2>

            <p
              className="
                mt-4 max-w-2xl
                text-gray-400
              "
            >

              Unlock elite knowledge from innovators,
              athletes, creators, scientists, and leaders.

            </p>

          </div>

          {/* BUTTON */}

          <button
            className="
              group mt-8 flex items-center gap-2

              rounded-xl

              border border-[var(--color-border)]

              bg-[var(--color-card)]

              px-6 py-3

              text-white

              transition-all duration-300

              hover:bg-[var(--color-secondary)]

              hover:text-black

              md:mt-0
            "
          >

            Explore All

            <ArrowRight
              size={18}

              className="
                transition-transform

                group-hover:translate-x-1
              "
            />

          </button>

        </div>

        {/* ====================================================== */}
        {/* MAIN GRID */}
        {/* ====================================================== */}

        <div
          className="
            grid gap-8

            lg:grid-cols-[260px_1fr]
          "
        >

          {/* ====================================================== */}
          {/* SIDEBAR */}
          {/* ====================================================== */}

          <div
            className="
              h-fit

              rounded-3xl

              border border-[var(--color-border)]

              bg-[var(--color-card)]

              p-6

              backdrop-blur-xl

              lg:sticky lg:top-24
            "
          >

            {/* HEADER */}

            <div
              className="
                mb-8 flex items-center
                justify-between
              "
            >

              <div className="flex items-center gap-3">

                <SlidersHorizontal
                  size={18}

                  className="
                    text-[var(--color-secondary)]
                  "
                />

                <h3
                  className="
                    text-2xl font-bold
                    text-white
                  "
                >

                  Filters

                </h3>

              </div>

              <button
                onClick={() => {

                  setSelectedSort(
                    "All"
                  );

                  setSelectedLevel(
                    "All"
                  );

                  setSelectedTopic(
                    "All"
                  );
                }}

                className="
                  text-sm

                  text-[var(--color-secondary)]

                  hover:opacity-80
                "
              >

                Clear All

              </button>

            </div>

            {/* SORT */}

            <div className="mb-8">

              <h4
                className="
                  mb-4 text-lg
                  font-semibold text-white
                "
              >

                Sort By

              </h4>

              <div className="space-y-3">

                {sortOptions.map(
                  (option) => (

                    <label
                      key={option}

                      className="
                        flex cursor-pointer
                        items-center gap-3
                      "
                    >

                      <input
                        type="radio"

                        name="sort"

                        checked={
                          selectedSort ===
                          option
                        }

                        onChange={() =>
                          setSelectedSort(
                            option
                          )
                        }

                        className="
                          h-4 w-4

                          accent-[var(--color-secondary)]
                        "
                      />

                      <span className="text-slate-300">
                        {option}
                      </span>

                    </label>
                  )
                )}

              </div>

            </div>

            {/* LEVEL */}

            <div className="mb-8">

              <h4
                className="
                  mb-4 text-lg
                  font-semibold text-white
                "
              >

                Level

              </h4>

              <div className="space-y-3">

                {levelOptions.map(
                  (option) => (

                    <label
                      key={option}

                      className="
                        flex cursor-pointer
                        items-center gap-3
                      "
                    >

                      <input
                        type="radio"

                        name="level"

                        checked={
                          selectedLevel ===
                          option
                        }

                        onChange={() =>
                          setSelectedLevel(
                            option
                          )
                        }

                        className="
                          h-4 w-4

                          accent-[var(--color-secondary)]
                        "
                      />

                      <span className="text-slate-300">
                        {option}
                      </span>

                    </label>
                  )
                )}

              </div>

            </div>

            {/* TOPICS */}

            <div>

              <h4
                className="
                  mb-4 text-lg
                  font-semibold text-white
                "
              >

                Topics

              </h4>

              <div className="space-y-3">

                {topicOptions.map(
                  (option) => (

                    <label
                      key={option}

                      className="
                        flex cursor-pointer
                        items-center gap-3
                      "
                    >

                      <input
                        type="radio"

                        name="topic"

                        checked={
                          selectedTopic ===
                          option
                        }

                        onChange={() =>
                          setSelectedTopic(
                            option
                          )
                        }

                        className="
                          h-4 w-4

                          accent-[var(--color-secondary)]
                        "
                      />

                      <span className="text-slate-300">
                        {option}
                      </span>

                    </label>
                  )
                )}

              </div>

            </div>

          </div>

          {/* ====================================================== */}
          {/* COURSES */}
          {/* ====================================================== */}

          <div>

            <div
              className="
                mb-6 flex items-center
                justify-between
              "
            >

              <p className="text-slate-400">

                Showing

                <span
                  className="
                    mx-2 font-semibold
                    text-white
                  "
                >

                  {filteredCourses.length}

                </span>

                courses

              </p>

            </div>

            {/* GRID */}

            <div
              className="
                grid gap-8

                sm:grid-cols-2

                lg:grid-cols-2

                xl:grid-cols-3
              "
            >

              {filteredCourses.map(
                (course) => (

                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                )
              )}

            </div>

            {/* EMPTY */}

            {
              filteredCourses.length === 0 && (

                <div
                  className="
                    mt-10 flex flex-col

                    items-center
                    justify-center

                    rounded-3xl

                    border border-[var(--color-border)]

                    bg-[var(--color-card)]

                    py-20

                    text-center
                  "
                >

                  <h3
                    className="
                      mb-3 text-3xl
                      font-bold text-white
                    "
                  >

                    No Courses Found

                  </h3>

                  <p className="text-slate-400">

                    Try another filter category.

                  </p>

                </div>
              )
            }

          </div>

        </div>

      </div>

    </section>
  );
};

export default CourseGrid;