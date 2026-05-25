import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import Sidebar from "../../components/Sidebar";
import { colors } from "../../styles/designTokens";

import {
  Plus,
  Edit2,
  Trash2,
  X,
  Clock3,
  Trophy,
  BookOpen,
  IndianRupee,
} from "lucide-react";

export default function ManageCourses() {

  // COURSES
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Full Stack Development",
      description:
        "Master frontend and backend development with real-world projects.",
      duration: "8 Weeks",
      lessonsCount: 24,
      price: 499,
      image:
        "https://i.ytimg.com/vi/BRYtQEJtXTs/hq720.jpg",
    },

    {
      id: 2,
      title: "Machine Learning",
      description:
        "Learn to build and deploy intelligent models using Python.",
      duration: "7 Weeks",
      lessonsCount: 20,
      price: 449,
      image:
        "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2024/07/what-is-machine-learning.jpg",
    },

    {
      id: 3,
      title: "UI/UX Design",
      description:
        "Create stunning user interfaces and user experiences.",
      duration: "5 Weeks",
      lessonsCount: 16,
      price: 0,
      image:
        "https://echopx.com/wp-content/uploads/2022/06/ui-ux-design.jpg",
    },

    {
      id: 4,
      title: "Python",
      description:
        "Learn Python programming from basics to advanced concepts.",
      duration: "6 Weeks",
      lessonsCount: 18,
      price: 349,
      image:
        "https://www.quytech.com/blog/wp-content/uploads/2020/06/python-web-development.jpg",
    },

    {
      id: 5,
      title: "Java",
      description:
        "Master Java programming and object-oriented development.",
      duration: "7 Weeks",
      lessonsCount: 20,
      price: 399,
      image:
        "https://www.mytaskpanel.com/wp-content/uploads/2023/04/consulting-blog-09.webp",
    },

    {
      id: 6,
      title: "Data Structures",
      description:
        "Learn arrays, linked lists, trees and algorithms.",
      duration: "6 Weeks",
      lessonsCount: 18,
      price: 0,
      image:
        "https://3ca51ebc.delivery.rocketcdn.me/wp-content/uploads/2020/09/Data-structures-and-algorithms-new.webp",
    },

    {
      id: 7,
      title: "Artificial Intelligence",
      description:
        "Understand neural networks and AI technologies.",
      duration: "8 Weeks",
      lessonsCount: 22,
      price: 499,
      image:
        "https://storage.ghost.io/c/6a/10/6a109410-b171-44e6-9589-5168e761531a/content/images/size/w2000/2024/07/The-Future-of-AI-and-Its-Impact-on-Humanity.webp",
    },

    {
      id: 8,
      title: "C Programming",
      description:
        "Build a strong programming foundation with C language.",
      duration: "5 Weeks",
      lessonsCount: 15,
      price: 0,
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200",
    },

    {
      id: 9,
      title: "C++ Programming",
      description:
        "Learn object-oriented programming using C++.",
      duration: "6 Weeks",
      lessonsCount: 18,
      price: 349,
      image:
        "https://www.shutterstock.com/image-illustration/c-code-on-dark-background-600nw-1896170293.jpg",
    },
  ]);

  // MODAL
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  // EDIT MODE
  const [editingCourseId, setEditingCourseId] =
    useState(null);

  // FORM
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    duration: "",
    lessonsCount: 0,
    price: "",
  });

  // ADD / UPDATE COURSE
  const handleAddCourse = (e) => {

    e.preventDefault();

    if (editingCourseId) {

      // UPDATE
      setCourses(
        courses.map((course) =>
          course.id === editingCourseId
            ? {
                ...course,
                ...newCourse,
                lessonsCount: Number(
                  newCourse.lessonsCount
                ),
                price: Number(newCourse.price),
              }
            : course
        )
      );

    } else {

      // ADD
      const course = {
        id: Date.now(),

        title: newCourse.title,

        description: newCourse.description,

        duration: newCourse.duration,

        lessonsCount: Number(
          newCourse.lessonsCount
        ),

        price: Number(newCourse.price),

        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200",
      };

      setCourses([course, ...courses]);
    }

    setIsModalOpen(false);

    setEditingCourseId(null);

    setNewCourse({
      title: "",
      description: "",
      duration: "",
      lessonsCount: 0,
      price: "",
    });
  };

  // DELETE
  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  // EDIT
  const editCourse = (course) => {

    setEditingCourseId(course.id);

    setNewCourse({
      title: course.title,
      description: course.description,
      duration: course.duration,
      lessonsCount: course.lessonsCount,
      price: course.price,
    });

    setIsModalOpen(true);
  };

  return (

    <div
      className="min-h-screen flex"
      style={{
        backgroundColor: colors.background,
        color: colors.textPrimary,
      }}
    >

      {/* SIDEBAR */}
      <Sidebar role="admin" />

      {/* MAIN */}
      <main className="flex-1 ml-64 p-8">

        {/* HEADER */}
        <header className="mb-8 flex items-center justify-between flex-wrap gap-4">

          <div>

            <h1 className="text-4xl font-bold mb-2">
              Manage Courses
            </h1>

            <p
              style={{
                color: colors.textSecondary,
              }}
            >
              Create, edit and manage platform courses.
            </p>

          </div>

          {/* BUTTON */}
          <button
            onClick={() => {

              setEditingCourseId(null);

              setNewCourse({
                title: "",
                description: "",
                duration: "",
                lessonsCount: 0,
                price: "",
              });

              setIsModalOpen(true);
            }}
            className="px-6 py-3 font-bold rounded-xl hover:scale-105 transition-all flex items-center gap-2"
            style={{
              backgroundColor: colors.primary,
              color: "#fff",
            }}
          >

            <Plus className="w-5 h-5" />

            Add Course

          </button>

        </header>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <AnimatePresence mode="popLayout">

            {courses.map((course) => (

              <motion.div
                key={course.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -5 }}
                className="overflow-hidden flex flex-col"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.secondary}30`,
                  borderRadius: "24px",
                }}
              >

                {/* IMAGE */}
                <div className="h-44 overflow-hidden relative">

                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                  />

                  {/* PRICE */}
                  <div
                    className="absolute top-3 right-3 px-3 py-1 rounded-lg font-bold text-sm flex items-center gap-1"
                    style={{
                      backgroundColor: colors.secondary,
                      color: "#fff",
                    }}
                  >

                    <IndianRupee className="w-3 h-3" />

                    {course.price}

                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-5 flex flex-col flex-1">

                  {/* TITLE */}
                  <h2 className="text-2xl font-bold mb-2 leading-tight">
                    {course.title}
                  </h2>

                  {/* DESCRIPTION */}
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{
                      color: colors.textSecondary,
                    }}
                  >
                    {course.description}
                  </p>

                  {/* DETAILS */}
                  <div className="space-y-3 mb-6">

                    <div
                      className="flex items-center gap-3 text-sm"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >

                      <BookOpen
                        className="w-4 h-4"
                        style={{
                          color: colors.secondary,
                        }}
                      />

                      <span>
                        {course.lessonsCount} Lessons
                      </span>

                    </div>

                    <div
                      className="flex items-center gap-3 text-sm"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >

                      <Clock3
                        className="w-4 h-4"
                        style={{
                          color: colors.secondary,
                        }}
                      />

                      <span>{course.duration}</span>

                    </div>

                    <div
                      className="flex items-center gap-3 text-sm"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >

                      <Trophy
                        className="w-4 h-4"
                        style={{
                          color: colors.secondary,
                        }}
                      />

                      <span>
                        Certificate Included
                      </span>

                    </div>

                  </div>

                  {/* BUTTONS */}
                  <div className="mt-auto flex gap-3">

                    {/* EDIT */}
                    <button
                      onClick={() =>
                        editCourse(course)
                      }
                      className="flex-1 py-3 font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all rounded-xl"
                      style={{
                        backgroundColor: colors.secondary,
                        color: "#fff",
                      }}
                    >

                      <Edit2 className="w-4 h-4" />

                      Edit

                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() =>
                        deleteCourse(course.id)
                      }
                      className="flex-1 py-3 font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-all rounded-xl"
                      style={{
                        backgroundColor: colors.error,
                        color: "#fff",
                      }}
                    >

                      <Trash2 className="w-4 h-4" />

                      Delete

                    </button>

                  </div>

                </div>

              </motion.div>

            ))}

          </AnimatePresence>

        </div>

        {/* MODAL */}
        <AnimatePresence>

          {isModalOpen && (

            <div className="fixed inset-0 z-50 flex items-center justify-center p-5">

              {/* OVERLAY */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              />

              {/* MODAL */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.9,
                  y: 20,
                }}
                className="relative w-full max-w-2xl p-8"
                style={{
                  backgroundColor: colors.surface,
                  border: `1px solid ${colors.secondary}30`,
                  borderRadius: "24px",
                }}
              >

                {/* TOP */}
                <div className="flex items-center justify-between mb-7">

                  <h2 className="text-3xl font-bold">

                    {editingCourseId
                      ? "Edit Course"
                      : "Add New Course"}

                  </h2>

                  <button
                    onClick={() =>
                      setIsModalOpen(false)
                    }
                    className="p-2 hover:bg-white/5 transition-all rounded-xl"
                  >

                    <X className="w-6 h-6" />

                  </button>

                </div>

                {/* FORM */}
                <form
                  onSubmit={handleAddCourse}
                  className="space-y-5"
                >

                  {/* TITLE */}
                  <div>

                    <label
                      className="block text-sm mb-2"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Course Title
                    </label>

                    <input
                      required
                      type="text"
                      value={newCourse.title}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter course title"
                      className="w-full px-5 py-3 outline-none rounded-xl"
                      style={{
                        backgroundColor:
                          colors.background,
                        border:
                          "1px solid rgba(255,255,255,0.08)",
                        color: colors.textPrimary,
                      }}
                    />

                  </div>

                  {/* DESCRIPTION */}
                  <div>

                    <label
                      className="block text-sm mb-2"
                      style={{
                        color: colors.textSecondary,
                      }}
                    >
                      Description
                    </label>

                    <textarea
                      required
                      rows={4}
                      value={newCourse.description}
                      onChange={(e) =>
                        setNewCourse({
                          ...newCourse,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter description"
                      className="w-full px-5 py-3 outline-none resize-none rounded-xl"
                      style={{
                        backgroundColor:
                          colors.background,
                        border:
                          "1px solid rgba(255,255,255,0.08)",
                        color: colors.textPrimary,
                      }}
                    />

                  </div>

                  {/* GRID */}
                  <div className="grid grid-cols-3 gap-4">

                    {/* DURATION */}
                    <div>

                      <label
                        className="block text-sm mb-2"
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        Duration
                      </label>

                      <input
                        required
                        type="text"
                        value={newCourse.duration}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            duration: e.target.value,
                          })
                        }
                        placeholder="6 Weeks"
                        className="w-full px-5 py-3 outline-none rounded-xl"
                        style={{
                          backgroundColor:
                            colors.background,
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                          color: colors.textPrimary,
                        }}
                      />

                    </div>

                    {/* LESSONS */}
                    <div>

                      <label
                        className="block text-sm mb-2"
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        Lessons
                      </label>

                      <input
                        required
                        type="number"
                        value={newCourse.lessonsCount}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            lessonsCount: e.target.value,
                          })
                        }
                        placeholder="20"
                        className="w-full px-5 py-3 outline-none rounded-xl"
                        style={{
                          backgroundColor:
                            colors.background,
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                          color: colors.textPrimary,
                        }}
                      />

                    </div>

                    {/* PRICE */}
                    <div>

                      <label
                        className="block text-sm mb-2"
                        style={{
                          color: colors.textSecondary,
                        }}
                      >
                        Price
                      </label>

                      <input
                        required
                        type="number"
                        value={newCourse.price}
                        onChange={(e) =>
                          setNewCourse({
                            ...newCourse,
                            price: e.target.value,
                          })
                        }
                        placeholder="499"
                        className="w-full px-5 py-3 outline-none rounded-xl"
                        style={{
                          backgroundColor:
                            colors.background,
                          border:
                            "1px solid rgba(255,255,255,0.08)",
                          color: colors.textPrimary,
                        }}
                      />

                    </div>

                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="w-full py-4 font-bold hover:scale-[1.02] transition-all rounded-xl"
                    style={{
                      backgroundColor: colors.primary,
                      color: "#fff",
                    }}
                  >

                    {editingCourseId
                      ? "Update Course"
                      : "Create Course"}

                  </button>

                </form>

              </motion.div>

            </div>

          )}

        </AnimatePresence>

      </main>

    </div>
  );
}