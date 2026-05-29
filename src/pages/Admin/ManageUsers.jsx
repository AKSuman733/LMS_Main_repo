/* ===================================================== */
/* IMPORTS */
/* ===================================================== */

import {
  Users,
  UserPlus,
  Shield,
  Activity,
  GraduationCap,
  Crown,
  Sparkles,
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

/* ===================================================== */
/* DEFAULT USERS */
/* ===================================================== */

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

/* ===================================================== */
/* STYLES */
/* ===================================================== */

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
/* MAIN COMPONENT */
/* ===================================================== */

function ManageUsers() {

  /* ===================================================== */
  /* STATES */
  /* ===================================================== */

  const [users, setUsers] =
    useState([]);

  const [pageLoading, setPageLoading] =
    useState(true);

  const [pageError, setPageError] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState(null);

  const [errors, setErrors] =
    useState({});

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [formData, setFormData] =
    useState({

      name: "",

      email: "",

      role: "Student",

      status: "Active",

      enrolled: 0,
    });  /* ===================================================== */
  /* LOAD USERS */
  /* ===================================================== */

  useEffect(() => {

    setTimeout(() => {

      try {

        const savedUsers =
          localStorage.getItem(
            "manageUsers"
          );

        if (savedUsers) {

          setUsers(
            JSON.parse(savedUsers)
          );

        } else {

          setUsers(defaultUsers);
        }

        setPageLoading(false);

      } catch (error) {

        console.error(error);

        setPageError(true);

        setPageLoading(false);
      }

    }, 1200);

  }, []);

  /* ===================================================== */
  /* SAVE USERS */
  /* ===================================================== */

  useEffect(() => {

    if (users.length > 0) {

      localStorage.setItem(

        "manageUsers",

        JSON.stringify(users)
      );
    }

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
  /* DELETE USER */
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
        "User deleted successfully",
        "warning"
      );
    };  /* ===================================================== */
  /* EDIT USER */
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
  /* UPDATE USER */
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
  /* STATS */
  /* ===================================================== */

  const stats = [

    {
      title: "Total Users",

      value: users.length,

      icon: Users,

      bg:
        "bg-cyan-500/10",

      text:
        "text-cyan-400",

      border:
        "border-cyan-500",

      lightBg:
        "bg-cyan-500/5",
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

  /* ===================================================== */
  /* TABLE COLUMNS */
  /* ===================================================== */

  const columns = [

    {
      key: "name",
      label: "User",
    },

    {
      key: "email",
      label: "Email",
    },

    {
      key: "role",
      label: "Role",
    },

    {
      key: "enrolled",
      label: "Courses",
    },

    {
      key: "status",
      label: "Status",
    },

    {
      key: "actions",
      label: "Actions",
    },
  ];  /* ===================================================== */
  /* TABLE DATA */
  /* ===================================================== */

  const tableData =
    users.map((user) => ({

      ...user,

      name: (

        <div
          className="
            flex items-center
            gap-3
          "
        >

          {/* AVATAR */}

          <div
            className="
              flex h-11 w-11
              items-center
              justify-center

              rounded-xl

              bg-gradient-to-r

              from-cyan-500
              to-pink-500

              text-sm
              font-bold

              text-white
            "
          >

            {user.name
              ?.charAt(0)
              ?.toUpperCase()}

          </div>

          {/* INFO */}

          <div>

            <p
              className="
                text-sm
                font-semibold

                text-white
              "
            >

              {user.name}

            </p>

            <p
              className="
                text-xs

                text-slate-400
              "
            >

              Platform User

            </p>

          </div>

        </div>
      ),

      role: (

        <span
          className={`
            inline-flex
            items-center
            gap-2

            rounded-full

            px-3 py-1.5

            text-xs
            font-medium

            ${
              user.role === "Admin"

                ? `
                  border border-purple-500/20
                  bg-purple-500/10
                  text-purple-400
                `

                : user.role ===
                  "Instructor"

                ? `
                  border border-pink-500/20
                  bg-pink-500/10
                  text-pink-400
                `

                : `
                  border border-cyan-500/20
                  bg-cyan-500/10
                  text-cyan-400
                `
            }
          `}
        >

          {user.role ===
          "Admin" ? (

            <Crown size={14} />

          ) : (

            <Shield size={14} />
          )}

          {user.role}

        </span>
      ),

      enrolled: (

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

          {user.enrolled} Courses

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
              handleEditUser(user)
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

              setSelectedUser(user);

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
    }));

  /* ===================================================== */
  /* COMPONENT */
  /* ===================================================== */

  return (

    <div
      className="
        min-h-screen

        bg-[var(--color-background)]

        p-6
      "
    >

      {/* ===================================================== */}
      {/* TOAST */}
      {/* ===================================================== */}

      {toast && (

        <Toast

          message={toast.message}

          type={toast.type}
        />
      )}

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <div
        className="
          mb-8

          flex flex-col
          gap-5

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        <div>

          <div
            className={`
              ${glass}

              mb-4

              inline-flex
              items-center
              gap-2

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

              User Management

            </span>

          </div>

          <h1
            className="
              text-4xl
              font-black

              text-white
            "
          >

            Manage Users

          </h1>

          <p
            className="
              mt-3

              max-w-2xl

              text-sm
              leading-7

              text-slate-400
            "
          >

            Add, edit, manage,
            and monitor platform users.

          </p>

        </div>

        {/* ADD USER */}

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

          <UserPlus
            size={18}
          />

          Add User

        </button>

      </div>

      {/* ===================================================== */}
      {/* STATS */}
      {/* ===================================================== */}

      <div
        className="
          mb-8

          grid gap-5

          md:grid-cols-2
          xl:grid-cols-3
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

      {/* ===================================================== */}
      {/* DATATABLE */}
      {/* ===================================================== */}

      {pageLoading ? (

        <TableSkeleton />

      ) : pageError ? (

        <ErrorState

          title="Unable to Load Users"

          message="We encountered an error while loading users."

          onRetry={() =>
            window.location.reload()
          }
        />

      ) : users.length === 0 ? (

        <EmptyState

          icon="👥"

          title="No Users Yet"

          message="Start building your platform by adding your first user."

          buttonText="Add User"

          onClick={() =>
            setShowModal(true)
          }
        />

      ) : (

        <DataTable

  columns={columns}

  data={tableData}
  rawData={users}

  onDeleteSelected={(selectedIds) => {

    const updatedUsers =
      users.filter(

        (user) =>

          !selectedIds.includes(
            user.id
          )
      );

    setUsers(
      updatedUsers
    );

    showToast(
      "Selected users deleted",
      "warning"
    );
  }}

  onArchiveSelected={(selectedIds) => {

    const updatedUsers =
      users.map((user) =>

        selectedIds.includes(
          user.id
        )

          ? {
              ...user,
              status:
                "Archived",
            }

          : user
      );

    setUsers(
      updatedUsers
    );

    showToast(
      "Users archived successfully"
    );
  }}
/>
      )}      {/* ===================================================== */}
      {/* USER MODAL */}
      {/* ===================================================== */}

      {showModal && (

        <div
          className="
            fixed inset-0
            z-50

            flex items-center
            justify-center

            bg-black/60

            p-4
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
              max-w-2xl

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
                    font-black

                    text-white
                  "
                >

                  {editingUser

                    ? "Edit User"

                    : "Add New User"}

                </h2>

                <p
                  className="
                    mt-2

                    text-sm

                    text-slate-400
                  "
                >

                  Manage user details
                  and permissions.

                </p>

              </div>

              {/* CLOSE */}

              <button

                onClick={
                  resetForm
                }

                className="
                  rounded-xl

                  p-2

                  text-slate-400

                  transition-all
                  duration-300

                  hover:bg-white/10
                  hover:text-white
                "
              >

                <X
                  size={18}
                />

              </button>

            </div>

            {/* FORM */}

            <div
              className="
                grid gap-5

                md:grid-cols-2
              "
            >

              {/* NAME */}

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

                  Full Name

                </label>

                <input
                  type="text"

                  value={
                    formData.name
                  }

                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      name:
                        e.target
                          .value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.name

                        ? "border-red-500"

                        : "border-white/10"
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

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >

                  Email Address

                </label>

                <input
                  type="email"

                  value={
                    formData.email
                  }

                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      email:
                        e.target
                          .value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.email

                        ? "border-red-500"

                        : "border-white/10"
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

                  User Role

                </label>

                <select

                  value={
                    formData.role
                  }

                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      role:
                        e.target
                          .value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    border-white/10
                  `}
                >

                  <option value="Student">
                    Student
                  </option>

                  <option value="Instructor">
                    Instructor
                  </option>

                  <option value="Admin">
                    Admin
                  </option>

                </select>

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

                  value={
                    formData.status
                  }

                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      status:
                        e.target
                          .value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    border-white/10
                  `}
                >

                  <option value="Active">
                    Active
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

              {/* ENROLLED */}

              <div
                className="
                  md:col-span-2
                "
              >

                <label
                  className="
                    mb-2
                    block

                    text-sm
                    font-medium

                    text-slate-300
                  "
                >

                  Enrolled Courses

                </label>

                <input
                  type="number"

                  min="0"

                  value={
                    formData.enrolled
                  }

                  onChange={(e) =>
                    setFormData({

                      ...formData,

                      enrolled:
                        e.target
                          .value,
                    })
                  }

                  className={`
                    ${inputStyle}

                    ${
                      errors.enrolled

                        ? "border-red-500"

                        : "border-white/10"
                    }
                  `}
                />

              </div>

            </div>

            {/* ACTIONS */}

            <div
              className="
                mt-8

                flex flex-col
                gap-3

                sm:flex-row
                sm:justify-end
              "
            >

              <button

                onClick={
                  resetForm
                }

                className="
                  rounded-xl

                  border border-white/10

                  px-5 py-3

                  text-sm
                  font-medium

                  text-slate-300

                  transition-all
                  duration-300

                  hover:bg-white/10
                "
              >

                Cancel

              </button>

              {/* SAVE */}

              <button

                disabled={loading}

                onClick={

                  editingUser

                    ? handleUpdateUser

                    : handleAddUser
                }

                className="
                  flex items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-gradient-to-r

                  from-orange-500
                  via-pink-500
                  to-cyan-500

                  px-6 py-3

                  text-sm
                  font-semibold

                  text-white

                  transition-all
                  duration-300

                  hover:scale-[1.02]
                "
              >

                {loading ? (

                  <>
                    <Loader2
                      size={16}

                      className="
                        animate-spin
                      "
                    />

                    Processing...
                  </>

                ) : (

                  <>
                    {editingUser

                      ? "Update User"

                      : "Create User"}
                  </>
                )}

              </button>

            </div>

          </motion.div>

        </div>
      )}

      {/* ===================================================== */}
      {/* DELETE MODAL */}
      {/* ===================================================== */}

      <ConfirmModal

        open={deleteModal}

        title="Delete User"

        message="
          Are you sure you want
          to delete this user?
        "

        confirmText="Delete"

        onCancel={() =>
          setDeleteModal(false)
        }

        onConfirm={() => {

          handleDeleteUser(
            selectedUser.id
          );

          setDeleteModal(false);
        }}
      />

    </div>
  );
}

export default ManageUsers;
