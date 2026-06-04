import {
  Outlet,
  NavLink,
} from "react-router-dom";

import {
  ShieldCheck,
  BarChart3,
  Users,
  GraduationCap,
  LogOut,
  Bell,
  Search,
  ArrowLeft,
  Menu,
  Sparkles,
  BrainCircuit,
  ChevronRight,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  useState,
  useEffect,
} from "react";

function AdminLayout() {

  /* ====================================================== */
  /* STATES */
  /* ====================================================== */

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [isMobile, setIsMobile] =
    useState(false);

  /* ====================================================== */
  /* RESPONSIVE */
  /* ====================================================== */

  useEffect(() => {

    const handleResize = () => {

      setIsMobile(
        window.innerWidth < 1024
      );

      if (
        window.innerWidth >= 1024
      ) {

        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>

      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  /* ====================================================== */
  /* ADMIN LINKS */
  /* ====================================================== */

  const adminLinks = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: ShieldCheck,
      color: "text-green-400",
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
      color: "text-cyan-400",
    },

    {
      name: "Manage Users",
      path: "/users",
      icon: Users,
      color: "text-pink-400",
    },

    {
      name: "Manage Courses",
      path: "/courses",
      icon: GraduationCap,
      color: "text-yellow-400",
    },
  ];

  /* ====================================================== */
  /* LOGOUT */
  /* ====================================================== */

  const handleLogout = () => {

    /* REMOVE ADMIN SESSION */

    localStorage.removeItem(
      "role"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "userEmail"
    );

    localStorage.removeItem(
      "currentUser"
    );

    sessionStorage.clear();

    /* HARD REDIRECT */

    window.location.href =
      "/login";
  };

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

  return (

    <div
      className="
        relative
        flex
        min-h-screen
        overflow-hidden
        bg-[#050816]
        text-white
      "
    >

      {/* ====================================================== */}
      {/* BACKGROUND GLOWS */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-120px]
          top-[-120px]
          h-[340px]
          w-[340px]
          rounded-full
          bg-cyan-500/10
          blur-[120px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[-120px]
          right-[-120px]
          h-[340px]
          w-[340px]
          rounded-full
          bg-orange-500/10
          blur-[120px]
        "
      />

      {/* ====================================================== */}
      {/* MOBILE OVERLAY */}
      {/* ====================================================== */}

      <AnimatePresence>

        {sidebarOpen && isMobile && (

          <motion.div

            initial={{
              opacity: 0,
            }}

            animate={{
              opacity: 1,
            }}

            exit={{
              opacity: 0,
            }}

            transition={{
              duration: 0.2,
            }}

            onClick={() =>
              setSidebarOpen(false)
            }

            className="
              fixed inset-0
              z-40
              bg-black/70
              backdrop-blur-sm
              lg:hidden
            "
          />
        )}

      </AnimatePresence>

      {/* ====================================================== */}
      {/* SIDEBAR */}
      {/* ====================================================== */}

      <motion.aside

        initial={false}

        animate={{

          x:

            isMobile

              ? sidebarOpen
                ? 0
                : -320

              : 0,
        }}

        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}

        className={`
          fixed left-0 top-0
          z-50

          flex h-screen
          flex-col

          ${
            sidebarCollapsed &&
            !isMobile

              ? "w-[92px]"

              : "w-[280px]"
          }

          border-r border-white/10

          bg-[#081120]/95

          p-4

          backdrop-blur-2xl

          transition-all
          duration-300
          ease-out
        `}
      >

        {/* ====================================================== */}
        {/* MOBILE CLOSE */}
        {/* ====================================================== */}

        {isMobile && (

          <button

            onClick={() =>
              setSidebarOpen(false)
            }

            className="
              absolute
              right-4
              top-4

              flex h-10 w-10
              items-center
              justify-center

              rounded-xl

              border border-white/10

              bg-white/5

              lg:hidden
            "
          >

            <X size={18} />

          </button>
        )}

        {/* ====================================================== */}
        {/* HOME + MENU */}
        {/* ====================================================== */}

        <div
          className="
            mb-4
            flex items-center
            justify-between
          "
        >

          <a
            href="http://localhost:5174/"

            className={`
              inline-flex
              items-center
              gap-2

              rounded-xl

              border border-white/10

              bg-white/[0.04]

              px-3 py-2

              text-sm
              font-medium

              text-slate-300

              backdrop-blur-xl

              transition-all
              duration-300

              hover:border-cyan-400/30
              hover:bg-cyan-500/10
              hover:text-cyan-300

              active:scale-[0.98]
            `}
          >

            <ArrowLeft size={15} />

            {!(
              sidebarCollapsed &&
              !isMobile
            ) && (
              <>Home</>
            )}

          </a>

          {!isMobile && (

            <button

              onClick={() =>

                setSidebarCollapsed(
                  !sidebarCollapsed
                )
              }

              className="
                flex h-10 w-10
                items-center
                justify-center

                rounded-xl

                border border-white/10

                bg-white/[0.04]

                transition-all
                duration-200

                hover:bg-white/[0.08]

                active:scale-[0.98]
              "
            >

              <Menu size={18} />

            </button>
          )}

        </div>

        {/* ====================================================== */}
        {/* LOGO */}
        {/* ====================================================== */}

        <a
          href="/dashboard"

          className={`
            mb-8
            flex items-center

            ${
              sidebarCollapsed &&
              !isMobile

                ? "justify-center"

                : "gap-3"
            }
          `}
        >

          <div
            className="
              flex h-11 w-11
              items-center
              justify-center

              rounded-2xl

              bg-gradient-to-r
              from-orange-500
              via-pink-500
              to-cyan-500
            "
          >

            <BrainCircuit size={20} />

          </div>

          {!(
            sidebarCollapsed &&
            !isMobile
          ) && (

            <div>

              <h1
                className="
                  bg-gradient-to-r
                  from-orange-400
                  via-pink-500
                  to-cyan-400

                  bg-clip-text

                  text-lg
                  font-black

                  text-transparent
                "
              >

                UptoSkills Admin

              </h1>

              <p
                className="
                  text-[11px]
                  text-slate-500
                "
              >

                Admin Control Panel

              </p>

            </div>
          )}

        </a>

        {/* ====================================================== */}
        {/* BADGE */}
        {/* ====================================================== */}

        {!(
          sidebarCollapsed &&
          !isMobile
        ) && (

          <div
            className="
              mb-6

              inline-flex
              items-center
              gap-2

              rounded-2xl

              border border-white/10

              bg-white/5

              px-3 py-2
            "
          >

            <Sparkles
              size={14}
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

              Platform Management

            </span>

          </div>
        )}

        {/* ====================================================== */}
        {/* NAVIGATION */}
        {/* ====================================================== */}

        <nav
          className="
            flex flex-col
            gap-3
          "
        >

          {adminLinks.map((link) => {

            const Icon =
              link.icon;

            return (

              <NavLink

                key={link.name}

                to={link.path}

                onClick={() =>
                  setSidebarOpen(false)
                }

                className={({ isActive }) => `
                  group

                  relative

                  flex items-center
                  justify-between

                  overflow-hidden

                  rounded-2xl

                  border

                  px-4 py-3.5

                  transition-all
                  duration-200

                  ${
                    isActive

                      ? `
                        border-orange-500/30

                        bg-gradient-to-r
                        from-orange-500/20
                        to-cyan-500/10
                      `

                      : `
                        border-white/10

                        bg-white/[0.03]

                        hover:bg-white/[0.06]
                      `
                  }
                `}
              >

                <div
                  className="
                    flex items-center gap-3
                  "
                >

                  <div
                    className={`
                      flex h-10 w-10
                      items-center
                      justify-center

                      rounded-xl

                      ${link.color}

                      bg-white/[0.04]
                    `}
                  >

                    <Icon size={18} />

                  </div>

                  {!(
                    sidebarCollapsed &&
                    !isMobile
                  ) && (

                    <div>

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-white
                        "
                      >

                        {link.name}

                      </p>

                      <p
                        className="
                          text-[11px]
                          text-slate-500
                        "
                      >

                        Access module

                      </p>

                    </div>
                  )}

                </div>

                {!(
                  sidebarCollapsed &&
                  !isMobile
                ) && (

                  <ChevronRight
                    size={16}
                    className="
                      text-slate-500
                    "
                  />
                )}

              </NavLink>
            );
          })}

        </nav>

        {/* ====================================================== */}
        {/* SPACER */}
        {/* ====================================================== */}

        <div className="flex-1" />

        {/* ====================================================== */}
        {/* LOGOUT */}
        {/* ====================================================== */}

        <button

          onClick={handleLogout}

          className="
            flex items-center
            justify-center
            gap-2

            rounded-2xl

            bg-gradient-to-r
            from-pink-500
            to-red-500

            py-3

            text-sm
            font-semibold
            text-white

            transition-all
            duration-300

            hover:scale-[1.01]
          "
        >

          <LogOut size={18} />

          Logout

        </button>

      </motion.aside>

      {/* ====================================================== */}
      {/* MAIN CONTENT */}
      {/* ====================================================== */}

      <div
        className={`
          flex flex-1
          flex-col

          min-w-0

          ${
            !isMobile

              ? sidebarCollapsed

                ? "lg:ml-[92px]"

                : "lg:ml-[280px]"

              : ""
          }
        `}
      >

        {/* ====================================================== */}
        {/* TOPBAR */}
        {/* ====================================================== */}

        <header
          className="
            sticky top-0
            z-30

            flex items-center
            justify-between

            border-b border-white/10

            bg-[#050816]/80

            px-4 py-4

            backdrop-blur-2xl
          "
        >

          <div
            className="
              flex items-center
              gap-3
            "
          >

            {isMobile && (

              <button

                onClick={() =>
                  setSidebarOpen(
                    !sidebarOpen
                  )
                }

                className="
                  flex h-11 w-11
                  items-center
                  justify-center

                  rounded-2xl

                  border border-white/10

                  bg-white/[0.04]
                "
              >

                <Menu size={20} />

              </button>
            )}

            <div>

              <h2
                className="
                  text-xl
                  font-black
                  text-white
                "
              >

                Admin Dashboard

              </h2>

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >

                Welcome back to your workspace

              </p>

            </div>

          </div>

          <div
            className="
              flex items-center
              gap-3
            "
          >

            <div
              className="
                relative hidden md:block
              "
            >

              <Search
                size={16}

                className="
                  absolute
                  left-4 top-1/2
                  -translate-y-1/2
                  text-slate-500
                "
              />

              <input
                type="text"
                placeholder="Search..."

                className="
                  h-11
                  w-[220px]

                  rounded-2xl

                  border border-white/10

                  bg-white/[0.04]

                  pl-11 pr-4

                  text-sm
                  text-white

                  outline-none
                "
              />

            </div>

            <button
              className="
                relative

                flex h-11 w-11
                items-center
                justify-center

                rounded-2xl

                border border-white/10

                bg-white/[0.04]
              "
            >

              <Bell size={18} />

              <span
                className="
                  absolute
                  right-3 top-3

                  h-2.5
                  w-2.5

                  rounded-full

                  bg-orange-500
                "
              />

            </button>

          </div>

        </header>

        {/* ====================================================== */}
        {/* PAGE CONTENT */}
        {/* ====================================================== */}

        <motion.main

          initial={{
            opacity: 0,
            y: 12,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.25,
          }}

          className="
            flex-1
            overflow-x-hidden
            px-4 py-4
          "
        >

          <div
            className="
              mx-auto
              w-full
              max-w-[1400px]
            "
          >

            <Outlet />

          </div>

        </motion.main>

      </div>

    </div>
  );
}

export default AdminLayout;