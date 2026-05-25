import {
  Users,
  Search,
  UserPlus,
  Mail,
  Shield,
  Trash2,
  Pencil,
  Activity,
  GraduationCap,
  Crown,
  Sparkles,
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

const defaultUsers = [
  {
    id: 1,
    name: "Shalini Verma",
    email: "shalini@gmail.com",
    role: "Admin",
    status: "Active",
    enrolled: 12,
  },

  {
    id: 2,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    role: "Student",
    status: "Active",
    enrolled: 5,
  },

  {
    id: 3,
    name: "Priya Nair",
    email: "priya@gmail.com",
    role: "Instructor",
    status: "Pending",
    enrolled: 18,
  },

  {
    id: 4,
    name: "Arjun Mehta",
    email: "arjun@gmail.com",
    role: "Student",
    status: "Active",
    enrolled: 7,
  },
];

const glass =
  `
    rounded-2xl

    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const actionButton =
  `
    flex h-10 w-10
    items-center justify-center

    rounded-xl

    transition-all
    duration-300

    hover:scale-[1.04]
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

/* ===================================================== */
/* STAT CARD */
/* ===================================================== */

function StatCard({ item }) {

  const Icon = item.icon;

  return (

    <motion.div
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
            ${item.bg}

            flex h-11 w-11
            items-center
            justify-center

            rounded-xl
          `}
        >

          <Icon
            size={18}

            className={item.text}
          />

        </div>

      </div>

    </motion.div>
  );
}

/* ===================================================== */
/* MANAGE USERS */
/* ===================================================== */

function ManageUsers() {

  /* USERS */

  const [users, setUsers] =
    useState([]);

  /* SEARCH */

  const [search, setSearch] =
    useState("");

  /* MODAL */

  const [showModal, setShowModal] =
    useState(false);

  /* EDIT */

  const [editingUser, setEditingUser] =
    useState(null);

  /* LOADING */

  const [loading, setLoading] =
    useState(false);

  /* TOAST */

  const [toast, setToast] =
    useState(null);

  /* ERRORS */

  const [errors, setErrors] =
    useState({});

  /* FORM */

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      role: "Student",

      status: "Active",

      enrolled: 0,
    });

  /* ===================================================== */
  /* LOAD */
  /* ===================================================== */

  useEffect(() => {

    const savedUsers =
      JSON.parse(
        localStorage.getItem(
          "manageUsers"
        )
      ) || defaultUsers;

    setUsers(savedUsers);

  }, []);

  /* ===================================================== */
  /* SAVE */
  /* ===================================================== */

  useEffect(() => {

    localStorage.setItem(
      "manageUsers",

      JSON.stringify(users)
    );

  }, [users]);

  /* ===================================================== */
  /* TOAST */
  /* ===================================================== */

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

  /* ===================================================== */
  /* VALIDATION */
  /* ===================================================== */

  const validate = () => {

    let newErrors = {};

    if (!formData.name.trim()) {

      newErrors.name =
        "Full name is required";
    }

    if (!formData.email.trim()) {

      newErrors.email =
        "Email is required";

    } else if (
      !/\S+@\S+\.\S+/.test(
        formData.email
      )
    ) {

      newErrors.email =
        "Invalid email address";
    }

    if (
      Number(formData.enrolled) < 0
    ) {

      newErrors.enrolled =
        "Minimum 0 courses";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  /* ===================================================== */
  /* RESET */
  /* ===================================================== */

  const resetForm = () => {

    setEditingUser(null);

    setShowModal(false);

    setErrors({});

    setFormData({

      name: "",

      email: "",

      role: "Student",

      status: "Active",

      enrolled: 0,
    });
  };

  /* ===================================================== */
  /* ADD USER */
  /* ===================================================== */

  const handleAddUser =
    async () => {

      if (!validate()) {

        showToast(
          "Please fill all fields",
          "error"
        );

        return;
      }

      setLoading(true);

      setTimeout(() => {

        const newUser = {

          id: Date.now(),

          name:
            formData.name,

          email:
            formData.email,

          role:
            formData.role,

          status:
            formData.status,

          enrolled:
            Number(
              formData.enrolled
            ),
        };

        setUsers([
          ...users,
          newUser,
        ]);

        setLoading(false);

        showToast(
          "User added successfully!"
        );

        resetForm();

      }, 1200);
    };

  /* ===================================================== */
  /* DELETE */
  /* ===================================================== */

  const handleDeleteUser =
    (id) => {

      const updated =
        users.filter(
          (user) =>
            user.id !== id
        );

      setUsers(updated);

      showToast(
        "User deleted"
      );
    };

  /* ===================================================== */
  /* EDIT */
  /* ===================================================== */

  const handleEditUser =
    (user) => {

      setEditingUser(user);

      setFormData({

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

        status:
          user.status,

        enrolled:
          user.enrolled,
      });

      setShowModal(true);
    };

  /* ===================================================== */
  /* UPDATE */
  /* ===================================================== */

  const handleUpdateUser =
    async () => {

      if (!validate()) {

        showToast(
          "Please fill all fields",
          "error"
        );

        return;
      }

      setLoading(true);

      setTimeout(() => {

        const updatedUsers =
          users.map((user) =>

            user.id ===
            editingUser.id

              ? {

                  ...user,

                  name:
                    formData.name,

                  email:
                    formData.email,

                  role:
                    formData.role,

                  status:
                    formData.status,

                  enrolled:
                    Number(
                      formData.enrolled
                    ),
                }

              : user
          );

        setUsers(updatedUsers);

        setLoading(false);

        showToast(
          "User updated successfully!"
        );

        resetForm();

      }, 1200);
    };

  /* ===================================================== */
  /* FILTER */
  /* ===================================================== */

  const filteredUsers =
    users.filter((user) =>

      `${user.name} ${user.email}`
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  /* ===================================================== */
  /* STATS */
  /* ===================================================== */

  const stats = [

    {
      title: "Total Users",

      value: users.length,

      icon: Users,

      bg:
        "bg-[var(--color-secondary)]/10",

      text:
        "text-[var(--color-secondary)]",

      border:
        "border-[var(--color-secondary)]",

      lightBg:
        "bg-[var(--color-secondary)]/5",
    },

    {
      title: "Instructors",

      value:
        users.filter(
          (user) =>
            user.role ===
            "Instructor"
        ).length,

      icon: GraduationCap,

      bg:
        "bg-pink-500/10",

      text:
        "text-pink-400",

      border:
        "border-pink-500",

      lightBg:
        "bg-pink-500/5",
    },

    {
      title: "Active Users",

      value:
        users.filter(
          (user) =>
            user.status ===
            "Active"
        ).length,

      icon: Activity,

      bg:
        "bg-green-500/10",

      text:
        "text-green-400",

      border:
        "border-green-500",

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

      {/* ===================================================== */}
      {/* TOAST */}
      {/* ===================================================== */}

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

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

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

        <div>

          {/* BADGE */}

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
              User Administration
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
              Users
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p
            className="
              max-w-2xl

              text-sm
              leading-7

              text-slate-400
            "
          >

            Control platform learners,
            instructors, and admins
            from your AI dashboard.

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

          <UserPlus size={18} />

          Add User

        </button>

      </div>

      {/* ===================================================== */}
      {/* STATS */}
      {/* ===================================================== */}

      <div
        className="
          mb-8

          grid gap-4

          md:grid-cols-3
        "
      >

        {stats.map((item) => (

          <StatCard
            key={item.title}
            item={item}
          />
        ))}

      </div>

      {/* ===================================================== */}
      {/* TABLE */}
      {/* ===================================================== */}

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
              User Directory
            </h3>

            <p
              className="
                text-sm

                text-slate-400
              "
            >
              Manage all users
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

              placeholder="Search users..."

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
                  "User",
                  "Email",
                  "Role",
                  "Courses",
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

              {filteredUsers.map(
                (user) => {

                  const isAdmin =
                    user.role ===
                    "Admin";

                  const isInstructor =
                    user.role ===
                    "Instructor";

                  return (

                    <tr
                      key={user.id}

                      className="
                        border-b border-white/5

                        transition-all
                        duration-300

                        hover:bg-[var(--color-card)]
                      "
                    >

                      {/* USER */}

                      <td className="p-4">

                        <div
                          className="
                            flex items-center
                            gap-3
                          "
                        >

                          <div
                            className="
                              flex h-10 w-10
                              items-center
                              justify-center

                              rounded-xl

                              bg-gradient-to-r

                              from-[var(--color-primary)]
                              to-pink-500

                              text-sm
                              font-bold

                              text-white
                            "
                          >

                            {user.name.charAt(
                              0
                            )}

                          </div>

                          <div>

                            <h4
                              className="
                                text-sm
                                font-semibold

                                text-white
                              "
                            >
                              {user.name}
                            </h4>

                            <p
                              className="
                                text-xs

                                text-slate-500
                              "
                            >
                              User ID #
                              {user.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* EMAIL */}

                      <td className="p-4">

                        <div
                          className="
                            flex items-center
                            gap-2

                            text-sm

                            text-slate-300
                          "
                        >

                          <Mail size={16} />

                          {user.email}

                        </div>

                      </td>

                      {/* ROLE */}

                      <td className="p-4">

                        <div
                          className={`
                            inline-flex
                            items-center
                            gap-2

                            rounded-full

                            px-3 py-1.5

                            text-xs
                            font-medium

                            ${
                              isAdmin

                                ? `
                                  border border-purple-500/20
                                  bg-purple-500/10
                                  text-purple-400
                                `

                                : isInstructor

                                ? `
                                  border border-pink-500/20
                                  bg-pink-500/10
                                  text-pink-400
                                `

                                : `
                                  border border-blue-500/20
                                  bg-blue-500/10
                                  text-[var(--color-secondary)]
                                `
                            }
                          `}
                        >

                          {isAdmin ? (

                            <Crown
                              size={14}
                            />

                          ) : (

                            <Shield
                              size={14}
                            />
                          )}

                          {user.role}

                        </div>

                      </td>

                      {/* COURSES */}

                      <td
                        className="
                          p-4

                          text-sm
                          font-medium

                          text-[var(--color-secondary)]
                        "
                      >

                        {user.enrolled}

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
                              user.status ===
                              "Active"

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

                          {user.status}

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
                              handleEditUser(
                                user
                              )
                            }

                            className={`
                              ${actionButton}

                              border border-blue-500/20

                              bg-blue-500/10
                            `}
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
                              handleDeleteUser(
                                user.id
                              )
                            }

                            className={`
                              ${actionButton}

                              border border-red-500/20

                              bg-red-500/10
                            `}
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
                  );
                }
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ===================================================== */}
      {/* MODAL */}
      {/* ===================================================== */}

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

                {editingUser

                  ? "Edit User"

                  : "Add User"}

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

              {/* NAME */}

              <div>

                <input
                  type="text"

                  placeholder="Full Name *"

                  value={formData.name}

                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      name:
                        e.target.value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.name

                        ? "border-red-500"

                        : formData.name

                        ? "border-green-500"

                        : "border-[var(--color-border)]"
                    }
                  `}
                />

                {errors.name && (

                  <p
                    className="
                      mt-2

                      text-xs

                      text-red-400
                    "
                  >
                    {errors.name}
                  </p>
                )}

              </div>

              {/* EMAIL */}

              <div>

                <input
                  type="email"

                  placeholder="Email *"

                  value={formData.email}

                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      email:
                        e.target.value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.email

                        ? "border-red-500"

                        : formData.email &&
                          !errors.email

                        ? "border-green-500"

                        : "border-[var(--color-border)]"
                    }
                  `}
                />

                {errors.email && (

                  <p
                    className="
                      mt-2

                      text-xs

                      text-red-400
                    "
                  >
                    {errors.email}
                  </p>
                )}

              </div>

              {/* ROLE */}

              <select
                value={formData.role}

                onChange={(e) =>
                  setFormData({
                    ...formData,

                    role:
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
                  Student
                </option>

                <option>
                  Instructor
                </option>

                <option>
                  Admin
                </option>

              </select>

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
                  Active
                </option>

                <option>
                  Pending
                </option>

              </select>

              {/* ENROLLED */}

              <div>

                <input
                  type="number"

                  placeholder="Enrolled Courses"

                  value={
                    formData.enrolled
                  }

                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      enrolled:
                        e.target.value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.enrolled

                        ? "border-red-500"

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
                  Minimum 0 courses
                </p>

                {errors.enrolled && (

                  <p
                    className="
                      mt-1

                      text-xs

                      text-red-400
                    "
                  >
                    {errors.enrolled}
                  </p>
                )}

              </div>

              {/* BUTTON */}

              <button
                onClick={
                  editingUser

                    ? handleUpdateUser

                    : handleAddUser
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
                    <UserPlus
                      size={18}
                    />

                    {editingUser

                      ? "Update User"

                      : "Add User"}
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

export default ManageUsers;