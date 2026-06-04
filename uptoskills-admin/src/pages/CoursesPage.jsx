import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { colors, shadows } from "../styles/designTokens";

export default function CoursesPage() {

  const [search, setSearch] = useState("");

  const courses = [
    {
      title: "Full Stack Development",
      image:
        "https://i.ytimg.com/vi/BRYtQEJtXTs/hq720.jpg",
      path: "/course/fullstack",
      lessons: "15 Lessons",
      duration: "30 Hours",
      level: "Beginner to Advanced",
      price: "₹499",
    },

    {
      title: "Machine Learning",
      image:
        "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2024/07/what-is-machine-learning.jpg",
      path: "/machinelearning",
      lessons: "21 Lessons",
      duration: "43 Hours",
      level: "Intermediate",
      price: "₹449",
    },

    {
      title: "UI/UX Design",
      image:
        "https://echopx.com/wp-content/uploads/2022/06/ui-ux-design.jpg",
      path: "/uiux",
      lessons: "20 Lessons",
      duration: "35 Hours",
      level: "Beginner",
      price: "₹399",
    },

    {
      title: "Python",
      image:
        "https://www.quytech.com/blog/wp-content/uploads/2020/06/python-web-development.jpg",
      path: "/python",
      lessons: "7 Lessons",
      duration: "7 Hours",
      level: "Beginner to Advanced",
      price: "FREE",
    },

    {
      title: "Java",
      image:
        "https://www.mytaskpanel.com/wp-content/uploads/2023/04/consulting-blog-09.webp",
      path: "/java",
      lessons: "20 Lessons",
      duration: "40 Hours",
      level: "Intermediate",
      price: "FREE",
    },

    {
      title: "Data Structures",
      image:
        "https://3ca51ebc.delivery.rocketcdn.me/wp-content/uploads/2020/09/Data-structures-and-algorithms-new.webp",
      path: "/dsa",
      lessons: "30 Lessons",
      duration: "50 Hours",
      level: "Advanced",
      price: "₹299",
    },

    {
      title: "Artificial Intelligence",
      image:
        "https://storage.ghost.io/c/6a/10/6a109410-b171-44e6-9589-5168e761531a/content/images/size/w2000/2024/07/The-Future-of-AI-and-Its-Impact-on-Humanity.webp",
      path: "/ai",
      lessons: "24 Lessons",
      duration: "45 Hours",
      level: "Advanced",
      price: "₹499",
    },

    {
      title: "C Programming",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200",
      path: "/c-programming",
      lessons: "18 Lessons",
      duration: "28 Hours",
      level: "Beginner",
      price: "FREE",
    },

    {
      title: "C++ Programming",
      image:
        "https://www.shutterstock.com/image-illustration/c-code-on-dark-background-600nw-1896170293.jpg",
      path: "/cpp-programming",
      lessons: "22 Lessons",
      duration: "35 Hours",
      level: "Intermediate",
      price: "₹349",
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen px-10 py-10"
        style={{
          backgroundColor: colors.background,
          color: colors.textPrimary,
        }}
      >

        {/* TOP SECTION */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-6">

          <div>

            <h1
              className="text-4xl font-bold mb-2"
              style={{
                color: colors.textPrimary,
              }}
            >
              Explore Courses
            </h1>

            <p
              className="text-lg"
              style={{
                color: colors.textSecondary,
              }}
            >
              Learn modern technologies with industry-ready courses
            </p>

          </div>

          {/* SEARCH BAR */}
          <div className="relative">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2"
              size={18}
              style={{
                color: colors.textSecondary,
              }}
            />

            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                pl-12
                pr-5
                py-4
                outline-none
                w-[340px]
                text-base
                rounded-2xl
                border
                transition-all
              "
              style={{
                backgroundColor: colors.surface,
                borderColor: `${colors.secondary}30`,
                color: colors.textPrimary,
              }}
            />

          </div>

        </div>

        {/* COURSES GRID */}
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-8">

          {filteredCourses.map((course, index) => (

            <div
              key={index}
              className="
                group
                overflow-hidden
                rounded-[2rem]
                border
                transition-all
                duration-500
                cursor-pointer
                hover:-translate-y-2
              "
              style={{
                backgroundColor: colors.surface,
                borderColor: `${colors.secondary}20`,
                boxShadow: shadows.md,
              }}
            >

              {/* IMAGE */}
              <div className="overflow-hidden relative">

                <img
                  src={course.image}
                  alt={course.title}
                  className="
                    w-full
                    h-52
                    object-cover
                    group-hover:scale-110
                    transition
                    duration-700
                  "
                />

                {/* PRICE */}
                <div
                  className="absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor:
                      course.price === "FREE"
                        ? colors.success
                        : colors.primary,
                    color: "#fff",
                  }}
                >
                  {course.price}
                </div>

              </div>

              {/* CONTENT */}
              <div className="p-6">

                {/* TITLE */}
                <h2
                  className="text-2xl font-semibold mb-3"
                  style={{
                    color: colors.textPrimary,
                  }}
                >
                  {course.title}
                </h2>

                {/* DESCRIPTION */}
                <p
                  className="text-sm leading-7 mb-5"
                  style={{
                    color: colors.textSecondary,
                  }}
                >
                  Learn practical concepts, projects and real-world skills.
                </p>

                {/* DETAILS */}
                <div className="space-y-3 mb-6">

                  <div
                    className="flex items-center justify-between text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    <span>📚 Lessons</span>
                    <span>{course.lessons}</span>
                  </div>

                  <div
                    className="flex items-center justify-between text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    <span>⏱ Duration</span>
                    <span>{course.duration}</span>
                  </div>

                  <div
                    className="flex items-center justify-between text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    <span>🎯 Level</span>
                    <span>{course.level}</span>
                  </div>

                  <div
                    className="flex items-center justify-between text-sm"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    <span>⭐ Certificate</span>
                    <span>Included</span>
                  </div>

                </div>

                {/* BUTTON */}
                <Link to={course.path}>

                  <button
                    className="
                      w-full
                      font-semibold
                      py-3
                      rounded-2xl
                      transition-all
                      duration-300
                      hover:scale-[1.02]
                    "
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.background,
                    }}
                  >
                    Start Learning
                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </>
  );
}