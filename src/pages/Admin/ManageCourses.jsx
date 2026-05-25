import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Users,
  IndianRupee,
  Sparkles,
  BookOpen,
  X,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import allMentorsData from "../../data/allMentors";

const glass =
  `
    rounded-2xl

    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const inputStyle =
  `
    w-full

    rounded-xl

    border

    bg-[var(--color-card)]

    px-4 py-3

    text-sm
    text-white

    outline-none

    transition-all
    duration-300

    placeholder:text-slate-500
  `;

const tableHead =
  `
    p-4

    text-left

    text-xs
    font-medium

    uppercase
    tracking-wider

    text-slate-400
  `;

function ManageCourses() {

  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [courses, setCourses] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState(null);

  const [errors, setErrors] =
    useState({});

  const [formData, setFormData] =
    useState({

      mentor: "",

      course: "",

      category: "",

      price: "",

      status: "Published",
    });

  /* ====================================================== */
  /* LOAD */
  /* ====================================================== */

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "manageCourses"
        )
      ) || allMentorsData;

    setCourses(saved);

  }, []);

  /* ====================================================== */
  /* SAVE */
  /* ====================================================== */

  useEffect(() => {

    localStorage.setItem(
      "manageCourses",

      JSON.stringify(courses)
    );

  }, [courses]);

  /* ====================================================== */
  /* VALIDATION */
  /* ====================================================== */

  const validate = () => {

    let newErrors = {};

    if (!formData.mentor.trim()) {

      newErrors.mentor =
        "Mentor name is required";
    }

    if (!formData.course.trim()) {

      newErrors.course =
        "Course name is required";
    }

    if (!formData.category.trim()) {

      newErrors.category =
        "Category is required";
    }

    if (!formData.price.trim()) {

      newErrors.price =
        "Price is required";

    } else {

      const number =
        parseInt(
          formData.price.replace(
            /\D/g,
            ""
          )
        );

      if (number < 499) {

        newErrors.price =
          "Minimum ₹499";
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  /* ====================================================== */
  /* RESET */
  /* ====================================================== */

  const resetForm = () => {

    setFormData({

      mentor: "",

      course: "",

      category: "",

      price: "",

      status: "Published",
    });

    setEditingCourse(null);

    setErrors({});

    setShowModal(false);
  };

  /* ====================================================== */
  /* TOAST */
  /* ====================================================== */

  const showToast = (
    message,
    type = "success"
  ) => {

    setToast({
      message,
      type,
    });

    setTimeout(() => {

      setToast(null);

    }, 3000);
  };

  /* ====================================================== */
  /* ADD COURSE */
  /* ====================================================== */

  const handleAddCourse =
    async () => {

      if (!validate()) {

        showToast(
          "Please fill all required fields",
          "error"
        );

        return;
      }

      setLoading(true);

      setTimeout(() => {

        const newCourse = {

          id: Date.now(),

          mentor:
            formData.mentor,

          course:
            formData.course,

          category:
            formData.category,

          price:
            formData.price,

          status:
            formData.status,

          students: "0",

          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        };

        setCourses([
          ...courses,
          newCourse,
        ]);

        setLoading(false);

        showToast(
          "Course created successfully!"
        );

        resetForm();

      }, 1200);
    };

  /* ====================================================== */
  /* UPDATE */
  /* ====================================================== */

  const handleUpdateCourse =
    async () => {

      if (!validate()) {

        showToast(
          "Please fill all required fields",
          "error"
        );

        return;
      }

      setLoading(true);

      setTimeout(() => {

        const updated =
          courses.map((course) =>

            course.id ===
            editingCourse.id

              ? {

                  ...course,

                  mentor:
                    formData.mentor,

                  course:
                    formData.course,

                  category:
                    formData.category,

                  price:
                    formData.price,

                  status:
                    formData.status,
                }

              : course
          );

        setCourses(updated);

        setLoading(false);

        showToast(
          "Course updated successfully!"
        );

        resetForm();

      }, 1200);
    };

  /* ====================================================== */
  /* DELETE */
  /* ====================================================== */

  const handleDelete = (id) => {

    const updated =
      courses.filter(
        (course) =>
          course.id !== id
      );

    setCourses(updated);

    showToast(
      "Course deleted"
    );
  };

  /* ====================================================== */
  /* EDIT */
  /* ====================================================== */

  const handleEdit = (course) => {

    setEditingCourse(course);

    setFormData({

      mentor:
        course.mentor,

      course:
        course.course,

      category:
        course.category,

      price:
        course.price,

      status:
        course.status,
    });

    setShowModal(true);
  };

  /* ====================================================== */
  /* SEARCH */
  /* ====================================================== */

  const filteredCourses =
    courses.filter((course) =>

      `${course.mentor} ${course.course}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* ====================================================== */
  /* OVERVIEW */
  /* ====================================================== */

  const overviewCards = [

    {
      title: "Total Courses",

      value: courses.length,

      icon: BookOpen,

      border:
        "border-[var(--color-secondary)]",

      iconBg:
        "bg-[var(--color-secondary)]/10",

      iconColor:
        "text-[var(--color-secondary)]",

      lightBg:
        "bg-[var(--color-secondary)]/5",
    },

    {
      title: "Students",

      value: "52K+",

      icon: Users,

      border:
        "border-pink-500",

      iconBg:
        "bg-pink-500/10",

      iconColor:
        "text-pink-400",

      lightBg:
        "bg-pink-500/5",
    },

    {
      title: "Revenue",

      value: "₹24L",

      icon: IndianRupee,

      border:
        "border-green-500",

      iconBg:
        "bg-green-500/10",

      iconColor:
        "text-green-400",

      lightBg:
        "bg-green-500/5",
    },
  ];

  return (

    <div
      className="
        min-h-screen

        bg-[var(--color-background)]

        px-5 py-6

        lg:px-8
      "
    >

      {/* ====================================================== */}
      {/* TOAST */}
      {/* ====================================================== */}

      {toast && (

        <div
          className={`
            fixed right-6 top-6 z-50

            flex items-center gap-3

            rounded-xl

            px-5 py-3

            text-sm font-medium text-white

            shadow-lg

            ${
              toast.type === "success"

                ? "bg-green-500"

                : "bg-red-500"
            }
          `}
        >

          {toast.type ===
          "success" ? (

            <CheckCircle2
              size={18}
            />

          ) : (

            <AlertTriangle
              size={18}
            />
          )}

          {toast.message}

        </div>
      )}

      {/* ====================================================== */}
      {/* HEADER */}
      {/* ====================================================== */}

      <div
        className="
          mb-8

          flex flex-col
          justify-between

          gap-5

          xl:flex-row
          xl:items-center
        "
      >

        {/* LEFT */}

        <div>

          <div
            className="
              mb-4

              inline-flex
              items-center
              gap-2

              rounded-full

              border border-[var(--color-border)]

              bg-[var(--color-card)]

              px-4 py-2
            "
          >

            <Sparkles
              size={15}

              className="
                text-[var(--color-secondary)]
              "
            />

            <span
              className="
                text-sm
                font-medium

                text-[var(--color-secondary)]
              "
            >
              UpToSkills Course Control
            </span>

          </div>

          {/* TITLE */}

          <h1
            className="
              mb-3

              text-4xl
              font-black

              tracking-tight

              md:text-5xl
            "
          >

            <span className="text-white">
              Manage
            </span>

            <span
              className="
                bg-gradient-to-r

                from-[var(--color-primary)]
                via-pink-500
                to-[var(--color-secondary)]

                bg-clip-text

                text-transparent
              "
            >
              {" "}
              Courses
            </span>

          </h1>

          <p
            className="
              max-w-2xl

              text-sm
              leading-7

              text-slate-400
            "
          >

            Add, edit, and organize
            celebrity mentor courses
            from your AI admin dashboard.

          </p>

        </div>

        {/* BUTTON */}

        <button
          onClick={() =>
            setShowModal(true)
          }

          className="
            flex items-center
            gap-2

            rounded-xl

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

            active:scale-[0.98]
          "
        >

          <Plus size={18} />

          Add Course

        </button>

      </div>

      {/* ====================================================== */}
      {/* OVERVIEW */}
      {/* ====================================================== */}

      <div
        className="
          mb-8

          grid gap-4

          md:grid-cols-3
        "
      >

        {overviewCards.map(
          (item) => {

            const Icon =
              item.icon;

            return (

              <motion.div
                key={item.title}

                whileHover={{
                  y: -4,
                }}

                className={`
                  ${glass}

                  ${item.border}

                  ${item.lightBg}

                  border-l-4

                  p-5
                `}
              >

                <div
                  className="
                    flex items-start
                    justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        mb-2

                        text-xs

                        text-slate-400
                      "
                    >
                      {item.title}
                    </p>

                    <h2
                      className="
                        text-2xl
                        font-black

                        text-white
                      "
                    >
                      {item.value}
                    </h2>

                  </div>

                  <div
                    className={`
                      ${item.iconBg}

                      flex h-11 w-11
                      items-center
                      justify-center

                      rounded-xl
                    `}
                  >

                    <Icon
                      size={18}

                      className={
                        item.iconColor
                      }
                    />

                  </div>

                </div>

              </motion.div>
            );
          }
        )}

      </div>

      {/* ====================================================== */}
      {/* TABLE */}
      {/* ====================================================== */}

      <div
        className={`
          ${glass}

          overflow-hidden
        `}
      >

        {/* TOP */}

        <div
          className="
            flex flex-col
            justify-between

            gap-5

            border-b border-[var(--color-border)]

            p-5

            lg:flex-row
            lg:items-center
          "
        >

          <div>

            <h3
              className="
                mb-1

                text-2xl
                font-bold

                text-white
              "
            >
              Course Library
            </h3>

            <p
              className="
                text-sm

                text-slate-400
              "
            >
              Manage mentor programs
            </p>

          </div>

          {/* SEARCH */}

          <div
            className="
              flex items-center
              gap-3

              rounded-xl

              border border-[var(--color-border)]

              bg-[var(--color-card)]

              px-4 py-3

              lg:w-[340px]
            "
          >

            <Search
              size={18}

              className="
                text-slate-400
              "
            />

            <input
              type="text"

              placeholder="Search courses..."

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

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

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                className="
                  border-b border-[var(--color-border)]
                "
              >

                {[
                  "Mentor",
                  "Course",
                  "Category",
                  "Price",
                  "Status",
                  "Actions",
                ].map((head) => (

                  <th
                    key={head}

                    className={
                      tableHead
                    }
                  >
                    {head}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {filteredCourses.map(
                (course) => (

                  <tr
                    key={course.id}

                    className="
                      border-b border-white/5

                      transition-all
                      duration-300

                      hover:bg-[var(--color-card)]
                    "
                  >

                    <td
                      className="
                        p-4

                        text-sm
                        font-semibold

                        text-white
                      "
                    >
                      {course.mentor}
                    </td>

                    <td
                      className="
                        p-4

                        text-sm

                        text-slate-300
                      "
                    >
                      {course.course}
                    </td>

                    <td
                      className="
                        p-4

                        text-sm

                        text-[var(--color-secondary)]
                      "
                    >
                      {course.category}
                    </td>

                    <td
                      className="
                        p-4

                        text-sm

                        text-green-400
                      "
                    >
                      {course.price}
                    </td>

                    {/* STATUS */}

                    <td className="p-4">

                      <span
                        className={`
                          rounded-full

                          px-3 py-1.5

                          text-xs
                          font-medium

                          ${
                            course.status ===
                            "Published"

                              ? `
                                border border-green-500/20
                                bg-green-500/10
                                text-green-400
                              `

                              : `
                                border border-yellow-500/20
                                bg-yellow-500/10
                                text-yellow-400
                              `
                          }
                        `}
                      >

                        {course.status}

                      </span>

                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">

                      <div
                        className="
                          flex items-center
                          gap-3
                        "
                      >

                        {/* EDIT */}

                        <button
                          onClick={() =>
                            handleEdit(
                              course
                            )
                          }

                          className="
                            flex h-10 w-10
                            items-center
                            justify-center

                            rounded-xl

                            border border-blue-500/20

                            bg-blue-500/10

                            transition-all
                            duration-300

                            hover:scale-[1.04]
                          "
                        >

                          <Pencil
                            size={16}

                            className="
                              text-blue-400
                            "
                          />

                        </button>

                        {/* DELETE */}

                        <button
                          onClick={() =>
                            handleDelete(
                              course.id
                            )
                          }

                          className="
                            flex h-10 w-10
                            items-center
                            justify-center

                            rounded-xl

                            border border-red-500/20

                            bg-red-500/10

                            transition-all
                            duration-300

                            hover:scale-[1.04]
                          "
                        >

                          <Trash2
                            size={16}

                            className="
                              text-red-400
                            "
                          />

                        </button>

                      </div>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ====================================================== */}
      {/* MODAL */}
      {/* ====================================================== */}

      {showModal && (

        <div
          className="
            fixed inset-0 z-50

            flex items-center
            justify-center

            bg-black/70

            p-4

            backdrop-blur-sm
          "
        >

          <div
            className={`
              ${glass}

              w-full
              max-w-lg

              p-6
            `}
          >

            {/* HEADER */}

            <div
              className="
                mb-6

                flex items-center
                justify-between
              "
            >

              <h2
                className="
                  text-2xl
                  font-bold

                  text-white
                "
              >

                {editingCourse

                  ? "Edit Course"

                  : "Add Course"}

              </h2>

              <button
                onClick={resetForm}
              >

                <X
                  className="
                    text-slate-400
                  "
                />

              </button>

            </div>

            {/* FORM */}

            <div className="space-y-4">

              {/* MENTOR */}

              <div>

                <input
                  type="text"

                  placeholder="Mentor Name *"

                  value={formData.mentor}

                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      mentor:
                        e.target.value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.mentor

                        ? "border-red-500"

                        : formData.mentor

                        ? "border-green-500"

                        : "border-[var(--color-border)]"
                    }
                  `}
                />

                {errors.mentor && (

                  <p
                    className="
                      mt-2

                      text-xs

                      text-red-400
                    "
                  >
                    {errors.mentor}
                  </p>
                )}

              </div>

              {/* COURSE */}

              <div>

                <input
                  type="text"

                  placeholder="Course Name *"

                  value={formData.course}

                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      course:
                        e.target.value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.course

                        ? "border-red-500"

                        : formData.course

                        ? "border-green-500"

                        : "border-[var(--color-border)]"
                    }
                  `}
                />

                {errors.course && (

                  <p
                    className="
                      mt-2

                      text-xs

                      text-red-400
                    "
                  >
                    {errors.course}
                  </p>
                )}

              </div>

              {/* CATEGORY */}

              <div>

                <input
                  type="text"

                  placeholder="Category *"

                  value={formData.category}

                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      category:
                        e.target.value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.category

                        ? "border-red-500"

                        : formData.category

                        ? "border-green-500"

                        : "border-[var(--color-border)]"
                    }
                  `}
                />

                {errors.category && (

                  <p
                    className="
                      mt-2

                      text-xs

                      text-red-400
                    "
                  >
                    {errors.category}
                  </p>
                )}

              </div>

              {/* PRICE */}

              <div>

                <input
                  type="text"

                  placeholder="Price *"

                  value={formData.price}

                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      price:
                        e.target.value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.price

                        ? "border-red-500"

                        : formData.price

                        ? "border-green-500"

                        : "border-[var(--color-border)]"
                    }
                  `}
                />

                <p
                  className="
                    mt-2

                    text-xs

                    text-slate-500
                  "
                >
                  Minimum ₹499
                </p>

                {errors.price && (

                  <p
                    className="
                      mt-1

                      text-xs

                      text-red-400
                    "
                  >
                    {errors.price}
                  </p>
                )}

              </div>

              {/* STATUS */}

              <select
                value={formData.status}

                onChange={(e) =>
                  setFormData({
                    ...formData,

                    status:
                      e.target.value,
                  })
                }

                className={`
                  ${inputStyle}

                  border-[var(--color-border)]

                  bg-[#111827]
                `}
              >

                <option>
                  Published
                </option>

                <option>
                  Draft
                </option>

              </select>

              {/* BUTTON */}

              <button
                onClick={
                  editingCourse

                    ? handleUpdateCourse

                    : handleAddCourse
                }

                disabled={loading}

                className="
                  mt-2

                  flex w-full
                  items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-gradient-to-r

                  from-[var(--color-primary)]
                  to-pink-500

                  py-3

                  text-sm
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:brightness-110

                  active:scale-[0.98]
                "
              >

                {loading ? (

                  <>
                    <Loader2
                      size={18}

                      className="
                        animate-spin
                      "
                    />

                    Processing...
                  </>

                ) : (

                  <>
                    <Plus size={18} />

                    {editingCourse

                      ? "Update Course"

                      : "Add Course"}
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ManageCourses;