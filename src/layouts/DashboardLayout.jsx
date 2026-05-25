import {
  Outlet,
  NavLink,
  Link,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  User,
  ShieldCheck,
  BarChart3,
  Users,
  GraduationCap,
  LogOut,
  Bell,
  Search,
  Menu,
  Sparkles,
  BrainCircuit,
  ChevronRight,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  colors,
  shadows,
} from "../styles/designTokens";

function DashboardLayout() {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  /* ================= ROLE BASED LINKS ================= */

  const studentLinks = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      color: "text-[var(--color-secondary)]",
    },

    {
      name: "My Courses",
      path: "/dashboard/my-courses",
      icon: BookOpen,
      color: "text-pink-400",
    },

    {
      name: "Profile",
      path: "/dashboard/profile",
      icon: User,
      color: "text-yellow-400",
    },
  ];

  const adminLinks = [

    {
      name: "Dashboard",
      path: "/admin",
      icon: ShieldCheck,
      color: "text-green-400",
    },

    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
      color: "text-[var(--color-secondary)]",
    },

    {
      name: "Manage Users",
      path: "/admin/users",
      icon: Users,
      color: "text-pink-400",
    },

    {
      name: "Manage Courses",
      path: "/admin/courses",
      icon: GraduationCap,
      color: "text-yellow-400",
    },
  ];

  const links =
    role === "admin"
      ? adminLinks
      : studentLinks;

  /* ================= LOGOUT ================= */

  const handleLogout = () => {

    localStorage.removeItem("role");

    localStorage.removeItem(
      "isLoggedIn"
    );

    navigate("/login");
  };

  return (

    <div
      className="
        relative
        flex
        min-h-screen
        overflow-hidden

        bg-[var(--color-background)]

        text-white
      "
    >

      {/* ================= BACKGROUND ================= */}

      <div
        className="
          absolute
          left-[-80px]
          top-[-100px]

          h-[320px]
          w-[320px]

          rounded-full

          bg-[var(--color-secondary)]/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          bottom-[-100px]
          right-[-80px]

          h-[320px]
          w-[320px]

          rounded-full

          bg-[var(--color-primary)]/10

          blur-[120px]
        "
      />

      {/* ================= SIDEBAR ================= */}

      <aside
        className="
          relative z-10 hidden

          w-[240px]

          flex-col

          border-r border-[var(--color-border)]

          bg-[var(--color-surface)]/80

          p-5

          backdrop-blur-2xl

          lg:flex
        "
      >

        {/* ================= LOGO ================= */}

        <Link
          to="/"

          className="
            mb-8 flex
            items-center gap-3
          "
        >

          <div
            className="
              flex h-11 w-11
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-r

              from-[var(--color-primary)]
              to-[var(--color-secondary)]

              shadow-[var(--shadow-teal)]
            "
          >

            <BrainCircuit size={20} />

          </div>

          <div>

            <h1
              className="
                bg-gradient-to-r

                from-[var(--color-primary)]
                via-pink-500
                to-[var(--color-secondary)]

                bg-clip-text

                text-lg
                font-black

                text-transparent
              "
            >

              {
                role === "admin"

                  ? "UptoSkills Admin"

                  : "UptoSkills"
              }

            </h1>

            <p
              className="
                text-[11px]
                text-slate-500
              "
            >

              {
                role === "admin"

                  ? "Admin Control Panel"

                  : "AI Learning Platform"
              }

            </p>

          </div>

        </Link>

        {/* ================= BADGE ================= */}

        <div
          className="
            mb-6

            inline-flex
            items-center
            gap-2

            rounded-2xl

            border border-[var(--color-border)]

            bg-[var(--color-card)]

            px-3 py-2

            backdrop-blur-xl
          "
        >

          <Sparkles
            size={14}

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

            {
              role === "admin"

                ? "Platform Management"

                : "Smart AI Dashboard"
            }

          </span>

        </div>

        {/* ================= NAVIGATION ================= */}

        <nav
          className="
            flex flex-col
            gap-3
          "
        >

          {links.map((link) => {

            const Icon =
              link.icon;

            return (

              <NavLink
                key={link.name}

                to={link.path}

                className={({
                  isActive,
                }) => `
                  group

                  flex items-center
                  justify-between

                  rounded-2xl

                  border

                  px-4 py-3

                  transition-all
                  duration-300

                  ${
                    isActive

                      ? `
                        border-[var(--color-secondary)]/20
                        bg-[var(--color-secondary)]/10
                      `

                      : `
                        border-[var(--color-border)]
                        bg-[var(--color-card)]

                        hover:bg-white/10
                      `
                  }
                `}
              >

                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >

                  <Icon
                    size={18}
                    className={
                      link.color
                    }
                  />

                  <span
                    className="
                      text-sm
                      font-medium
                    "
                  >
                    {link.name}
                  </span>

                </div>

                <ChevronRight
                  size={15}

                  className="
                    text-slate-500
                    transition

                    group-hover:text-white
                  "
                />

              </NavLink>
            );
          })}

        </nav>

        {/* ================= PROFILE ================= */}

        <div className="mt-auto pt-8">

          <div
            className="
              mb-4

              flex items-center
              gap-3

              rounded-2xl

              border border-[var(--color-border)]

              bg-[var(--color-card)]

              p-3
            "
          >

            <img
              src="https://i.pravatar.cc/150"
              alt="profile"

              className="
                h-11 w-11
                rounded-xl
              "
            />

            <div>

              <h4
                className="
                  text-sm
                  font-semibold
                "
              >
                John Doe
              </h4>

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >

                {
                  role === "admin"

                    ? "Platform Admin"

                    : "AI Engineer"
                }

              </p>

            </div>

          </div>

          {/* ================= LOGOUT ================= */}

          <button
            onClick={handleLogout}

            className="
              flex w-full
              items-center
              justify-center
              gap-2

              rounded-2xl

              bg-gradient-to-r
              from-red-500
              to-pink-600

              py-3

              text-sm
              font-semibold

              text-white

              shadow-[var(--shadow-md)]

              transition-all
              duration-300

              hover:scale-[1.02]
            "
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <div
        className="
          relative z-10

          flex flex-1
          flex-col
        "
      >

        {/* ================= TOPBAR ================= */}

        <header
          className="
            sticky top-0
            z-20

            border-b border-[var(--color-border)]

            bg-[var(--color-surface)]/80

            px-5 py-3

            backdrop-blur-2xl

            lg:px-8
          "
        >

          <div
            className="
              flex items-center
              justify-between
              gap-4
            "
          >

            {/* ================= LEFT ================= */}

            <div
              className="
                flex items-center
                gap-4
              "
            >

              {/* MOBILE MENU */}

              <button
                className="
                  flex h-10 w-10
                  items-center
                  justify-center

                  rounded-xl

                  border border-[var(--color-border)]

                  bg-[var(--color-card)]

                  lg:hidden
                "
              >

                <Menu size={18} />

              </button>

              {/* SEARCH */}

              <div
                className="
                  hidden

                  min-w-[260px]

                  items-center
                  gap-3

                  rounded-xl

                  border border-[var(--color-border)]

                  bg-[var(--color-card)]

                  px-4 py-3

                  md:flex
                "
              >

                <Search
                  size={16}

                  className="
                    text-[var(--color-secondary)]
                  "
                />

                <input
                  type="text"

                  placeholder="Search AI courses..."

                  className="
                    w-full
                    bg-transparent

                    text-sm
                    text-white

                    placeholder:text-slate-500

                    outline-none
                  "
                />

              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div
              className="
                flex items-center
                gap-3
              "
            >

              {/* NOTIFICATION */}

              <button
                className="
                  relative

                  flex h-10 w-10
                  items-center
                  justify-center

                  rounded-xl

                  border border-[var(--color-border)]

                  bg-[var(--color-card)]

                  transition-all
                  duration-300

                  hover:bg-white/10
                "
              >

                <Bell size={18} />

                <span
                  className="
                    absolute
                    right-2 top-2

                    h-2 w-2
                    rounded-full

                    bg-pink-500
                  "
                />

              </button>

              {/* USER */}

              <motion.div
                whileHover={{
                  scale: 1.02,
                }}

                className="
                  flex items-center
                  gap-3

                  rounded-2xl

                  border border-[var(--color-border)]

                  bg-[var(--color-card)]

                  px-3 py-2
                "
              >

                <div className="hidden sm:block">

                  <h4
                    className="
                      text-sm
                      font-semibold
                    "
                  >
                    John Doe
                  </h4>

                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >

                    {
                      role === "admin"

                        ? "Platform Admin"

                        : "AI Engineer"
                    }

                  </p>

                </div>

                <img
                  src="https://i.pravatar.cc/150"
                  alt="profile"

                  className="
                    h-10 w-10
                    rounded-xl
                  "
                />

              </motion.div>

            </div>

          </div>

        </header>

        {/* ================= PAGE CONTENT ================= */}

        <main
          className="
            flex-1
            overflow-y-auto
          "
        >

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;