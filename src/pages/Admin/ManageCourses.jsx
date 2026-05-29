/* ====================================================== */
/* IMPORTS */
/* ====================================================== */

import {
  Plus,
  Users,
  IndianRupee,
  Sparkles,
  BookOpen,
  X,
  Loader2,
  Pencil,
  Trash2,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import allMentorsData from "../../data/allMentors";

import DataTable from
"../../components/ui/DataTable";

import TableSkeleton from
"../../components/ui/TableSkeleton";

import EmptyState from
"../../components/ui/EmptyState";

import ErrorState from
"../../components/ui/ErrorState";

import Toast from
"../../components/ui/Toast";

import ConfirmModal from
"../../components/ui/ConfirmModal";

/* ====================================================== */
/* STYLES */
/* ====================================================== */

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

/* ====================================================== */
/* MAIN COMPONENT */
/* ====================================================== */

function ManageCourses() {

  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [courses, setCourses] =
    useState([]);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [pageError, setPageError] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editingCourse, setEditingCourse] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState(null);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedCourse, setSelectedCourse] =
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
  /* LOAD COURSES */
  /* ====================================================== */

  useEffect(() => {

    setTimeout(() => {

      try {

        const savedCourses =
          localStorage.getItem(
            "manageCourses"
          );

        if (savedCourses) {

          setCourses(
            JSON.parse(savedCourses)
          );

        } else {

          setCourses(
            allMentorsData
          );
        }

        setPageLoading(false);

      } catch (error) {

        console.error(error);

        setPageError(true);

        setPageLoading(false);
      }

    }, 1200);

  }, []);

  /* ====================================================== */
  /* SAVE COURSES */
  /* ====================================================== */

  useEffect(() => {

    if (courses.length > 0) {

      localStorage.setItem(

        "manageCourses",

        JSON.stringify(courses)
      );
    }

  }, [courses]);

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
  };  /* ====================================================== */
  /* VALIDATION */
  /* ====================================================== */

  const validate = () => {

    let newErrors = {};

    /* MENTOR */

    if (!formData.mentor.trim()) {

      newErrors.mentor =
        "Mentor name is required";
    }

    /* COURSE */

    if (!formData.course.trim()) {

      newErrors.course =
        "Course name is required";
    }

    /* CATEGORY */

    if (!formData.category.trim()) {

      newErrors.category =
        "Category is required";
    }

    /* PRICE */

    if (!formData.price.trim()) {

      newErrors.price =
        "Price is required";

    } else {

      const cleanPrice =
        formData.price.trim();

      const validPrice =
        /^₹?\d+$/.test(
          cleanPrice
        );

      if (!validPrice) {

        newErrors.price =
          "Only numbers allowed";

      } else {

        const number =
          parseInt(
            cleanPrice.replace(
              "₹",
              ""
            )
          );

        if (number < 499) {

          newErrors.price =
            "Minimum ₹499";
        }
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  /* ====================================================== */
  /* RESET FORM */
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
            formData.price.startsWith("₹")

              ? formData.price

              : `₹${formData.price}`,

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
  /* EDIT COURSE */
  /* ====================================================== */

  const handleEdit =
    (course) => {

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
  /* UPDATE COURSE */
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
                    formData.price.startsWith("₹")

                      ? formData.price

                      : `₹${formData.price}`,

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
  /* DELETE COURSE */
  /* ====================================================== */

  const handleDelete =
    (id) => {

      const updated =
        courses.filter(
          (course) =>
            course.id !== id
        );

      setCourses(updated);

      showToast(
        "Course deleted successfully",
        "warning"
      );
    };  /* ====================================================== */
  /* OVERVIEW CARDS */
  /* ====================================================== */

  const overviewCards = [

    {
      title: "Total Courses",

      value: courses.length,

      icon: BookOpen,

      border:
        "border-cyan-500",

      iconBg:
        "bg-cyan-500/10",

      iconColor:
        "text-cyan-400",

      lightBg:
        "bg-cyan-500/5",
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

  /* ====================================================== */
  /* TABLE COLUMNS */
  /* ====================================================== */

  const columns = [

    {
      key: "mentor",
      label: "Mentor",
    },

    {
      key: "course",
      label: "Course",
    },

    {
      key: "category",
      label: "Category",
    },

    {
      key: "price",
      label: "Price",
    },

    {
      key: "students",
      label: "Students",
    },

    {
      key: "status",
      label: "Status",
    },

    {
      key: "actions",
      label: "Actions",
    },
  ];

  /* ====================================================== */
  /* TABLE DATA */
  /* ====================================================== */

  const tableData =
    courses.map((course) => ({

      ...course,

      mentor: (

        <div
          className="
            flex items-center
            gap-3
          "
        >

          {/* IMAGE */}

          <img
            src={course.image}

            alt={course.mentor}

            className="
              h-11 w-11

              rounded-xl

              object-cover

              ring-2
              ring-white/10
            "
          />

          {/* INFO */}

          <div>

            <p
              className="
                text-sm
                font-semibold

                text-white
              "
            >

              {course.mentor}

            </p>

            <p
              className="
                text-xs

                text-slate-400
              "
            >

              Celebrity Mentor

            </p>

          </div>

        </div>
      ),

      course: (

        <div>

          <p
            className="
              text-sm
              font-semibold

              text-white
            "
          >

            {course.course}

          </p>

        </div>
      ),

      category: (

        <span
          className="
            rounded-full

            border border-cyan-500/20

            bg-cyan-500/10

            px-3 py-1.5

            text-xs
            font-medium

            text-cyan-400
          "
        >

          {course.category}

        </span>
      ),

      price: (

        <span
          className="
            font-semibold

            text-green-400
          "
        >

          {course.price}

        </span>
      ),

      students: (

        <span
          className="
            rounded-full

            border border-orange-500/20

            bg-orange-500/10

            px-3 py-1.5

            text-xs
            font-semibold

            text-orange-400
          "
        >

          {course.students}
          {" "}Students

        </span>
      ),

      status: (

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
      ),

      actions: (

        <div
          className="
            flex items-center
            gap-2
          "
        >

          {/* EDIT */}

          <button

            onClick={() =>
              handleEdit(course)
            }

            className="
              rounded-xl

              border border-cyan-500/20

              bg-cyan-500/10

              p-2

              text-cyan-400

              transition-all
              duration-300

              hover:scale-[1.05]
            "
          >

            <Pencil size={16} />

          </button>

          {/* DELETE */}

          <button

            onClick={() => {

              setSelectedCourse(
                course
              );

              setDeleteModal(true);
            }}

            className="
              rounded-xl

              border border-red-500/20

              bg-red-500/10

              p-2

              text-red-400

              transition-all
              duration-300

              hover:scale-[1.05]
            "
          >

            <Trash2 size={16} />

          </button>

        </div>
      ),
    }));  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

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

        <Toast

          message={toast.message}

          type={toast.type}
        />
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
                text-cyan-400
              "
            />

            <span
              className="
                text-sm
                font-medium

                text-cyan-400
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

                from-cyan-400
                via-pink-500
                to-orange-500

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

            Add, edit, organize,
            and monitor all celebrity
            mentor courses from your
            admin dashboard.

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

            rounded-2xl

            bg-gradient-to-r

            from-orange-500
            via-pink-500
            to-cyan-500

            px-6 py-3.5

            text-sm
            font-semibold

            text-white

            transition-all
            duration-300

            hover:scale-[1.02]
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

          grid gap-5

          md:grid-cols-2
          xl:grid-cols-3
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
      {/* DATATABLE */}
      {/* ====================================================== */}

      {pageLoading ? (

        <TableSkeleton />

      ) : pageError ? (

        <ErrorState

          title="Unable to Load Courses"

          message="
            Something went wrong while
            loading courses.
          "

          onRetry={() =>
            window.location.reload()
          }
        />

      ) : courses.length === 0 ? (

        <EmptyState

          icon="📚"

          title="No Courses Yet"

          message="
            Create your first celebrity
            mentor course to get started.
          "

          buttonText="Create Course"

          onClick={() =>
            setShowModal(true)
          }
        />

      ) : (

        <DataTable

  columns={columns}

  data={tableData}

  rawData={courses}

  onDeleteSelected={(selectedIds) => {

    const updatedCourses =
      courses.filter(

        (course) =>

          !selectedIds.includes(
            course.id
          )
      );

    setCourses(
      updatedCourses
    );

    showToast(
      "Selected courses deleted",
      "warning"
    );
  }}

  onArchiveSelected={(selectedIds) => {

    const updatedCourses =
      courses.map((course) =>

        selectedIds.includes(
          course.id
        )

          ? {
              ...course,
              status:
                "Archived",
            }

          : course
      );

    setCourses(
      updatedCourses
    );

    showToast(
      "Courses archived successfully"
    );
  }}
/>
      )}      {/* ====================================================== */}
      {/* COURSE MODAL */}
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

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.9,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

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

              <div>

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

                <p
                  className="
                    mt-2

                    text-sm

                    text-slate-400
                  "
                >

                  Manage course details
                  and mentor information.

                </p>

              </div>

              {/* CLOSE */}

              <button

                onClick={resetForm}

                className="
                  rounded-xl

                  p-2

                  transition-all
                  duration-300

                  hover:bg-white/10
                "
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

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >

                  Mentor Name

                </label>

                <input
                  type="text"

                  placeholder="Enter mentor name"

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

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >

                  Course Name

                </label>

                <input
                  type="text"

                  placeholder="Enter course name"

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

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >

                  Category

                </label>

                <input
                  type="text"

                  placeholder="AI / Design / Marketing"

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

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >

                  Course Price

                </label>

                <input
                  type="text"

                  placeholder="₹799"

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

                {errors.price && (

                  <p
                    className="
                      mt-2

                      text-xs

                      text-red-400
                    "
                  >

                    {errors.price}

                  </p>
                )}

              </div>

              {/* STATUS */}

              <div>

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >

                  Status

                </label>

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

              </div>

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

                  from-orange-500
                  via-pink-500
                  to-cyan-500

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

          </motion.div>

        </div>
      )}

      {/* ====================================================== */}
      {/* DELETE MODAL */}
      {/* ====================================================== */}

      <ConfirmModal

        open={deleteModal}

        title="Delete Course"

        message="
          Are you sure you want
          to delete this course?
        "

        confirmText="Delete"

        onCancel={() =>
          setDeleteModal(false)
        }

        onConfirm={() => {

          handleDelete(
            selectedCourse.id
          );

          setDeleteModal(false);
        }}
      />

    </div>
  );
}

export default ManageCourses;
