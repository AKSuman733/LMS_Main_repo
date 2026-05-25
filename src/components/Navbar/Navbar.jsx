import { useEffect, useRef, useState } from "react";

import { Link } from "react-router-dom";

import {
  Search,
  Menu,
  LogIn,
  Sparkles,
  X,
} from "lucide-react";

import allMentors from "../../data/allMentors";

import {
  colors,
  shadows,
  radius,
  transitions,
} from "../../styles/designTokens";

const navLink = `
  text-slate-300

  hover:text-[var(--color-secondary)]

  transition-all duration-300

  font-medium text-sm
`;

function Navbar() {

  const [search, setSearch] =
    useState("");

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const searchRef = useRef(null);

  /* ============================================= */
  /* CLOSE SEARCH ON OUTSIDE CLICK */
  /* ============================================= */

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {

        setSearch("");
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  /* ============================================= */
  /* FILTER */
  /* ============================================= */

  const filteredMentors =

    Object.values(allMentors).filter(
      (mentor) =>

        mentor.mentor
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <header
      className="
        fixed left-0 top-0 z-50

        w-full

        border-b border-[var(--color-border)]

        bg-[var(--color-background)]/80

        backdrop-blur-2xl
      "
    >

      {/* ============================================= */}
      {/* GLOW */}
      {/* ============================================= */}

      <div
        className="
          absolute left-1/4 top-0

          h-24 w-24

          rounded-full

          bg-cyan-500/10

          blur-[70px]
        "
      />

      {/* ============================================= */}
      {/* NAVBAR */}
      {/* ============================================= */}

      <nav
        className="
          relative z-10

          mx-auto

          flex max-w-7xl

          items-center
          justify-between

          gap-6

          px-6 py-3
        "
      >

        {/* ============================================= */}
        {/* LEFT */}
        {/* ============================================= */}

        <div className="flex items-center gap-5">

          {/* MOBILE MENU */}

          <button
            onClick={() =>
              setMobileMenu(!mobileMenu)
            }

            className="
              rounded-xl

              border border-[var(--color-border)]

              bg-[var(--color-card)]

              p-2

              text-white

              transition-all duration-300

              hover:bg-white/10

              lg:hidden
            "
          >

            {mobileMenu ? (

              <X size={20} />

            ) : (

              <Menu size={20} />
            )}

          </button>

          {/* ============================================= */}
          {/* LOGO */}
          {/* ============================================= */}

          <Link
            to="/"

            className="
              tracking-tight
            "
          >

            <div className="flex flex-col">

              <h1
                className="
                  bg-gradient-to-r

                  from-[var(--color-primary)]
                  via-pink-500
                  to-[var(--color-secondary)]

                  bg-clip-text

                  text-3xl
                  font-black

                  text-transparent
                "
              >
                UpToSkills
              </h1>

              <span
                className="
                  text-[10px]

                  tracking-wide

                  text-[var(--color-secondary)]
                "
              >
                Let's Make Freshers Employable!
              </span>

            </div>

          </Link>

        </div>

        {/* ============================================= */}
        {/* SEARCH */}
        {/* ============================================= */}

        <div
          ref={searchRef}

          className="
            relative hidden

            flex-1

            lg:block
          "
        >

          {/* SEARCH BAR */}

          <div
            className="
              flex items-center gap-3

              rounded-2xl

              border border-[var(--color-border)]

              bg-[var(--color-card)]

              px-5 py-3

              backdrop-blur-xl

              transition-all duration-300

              focus-within:border-[var(--color-secondary)]/30

              focus-within:shadow-[var(--shadow-teal)]
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

              value={search}

              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }

              placeholder="
                Search mentors, AI skills, courses...
              "

              className="
                w-full

                bg-transparent

                text-sm text-white

                outline-none

                placeholder:text-slate-500
              "
            />

            {
              search && (

                <button
                  onClick={() =>
                    setSearch("")
                  }

                  className="
                    text-slate-400

                    hover:text-white
                  "
                >

                  <X size={16} />

                </button>
              )
            }

          </div>

          {/* ============================================= */}
          {/* SEARCH RESULTS */}
          {/* ============================================= */}

          {
            search && (

              <div
                className="
                  absolute left-0 top-16

                  max-h-[450px]
                  w-full

                  overflow-y-auto

                  rounded-3xl

                  border border-[var(--color-border)]

                  bg-[var(--color-surface)]/95

                  p-3

                  backdrop-blur-2xl

                  shadow-2xl
                "
              >

                {
                  filteredMentors.length > 0 ? (

                    filteredMentors.map(
                      (mentor) => (

                        <Link
                          key={mentor.id}

                          to={`/courses/${mentor.id}`}

                          onClick={() =>
                            setSearch("")
                          }

                          className="
                            mb-2 block

                            rounded-2xl

                            border border-transparent

                            bg-[var(--color-card)]

                            p-4

                            transition-all duration-300

                            hover:border-[var(--color-secondary)]/20

                            hover:bg-white/10

                            hover:scale-[1.01]
                          "
                        >

                          <div
                            className="
                              flex items-center gap-4
                            "
                          >

                            {/* IMAGE */}

                            <img
                              src={mentor.image}

                              alt={mentor.mentor}

                              className="
                                h-14 w-14

                                rounded-2xl

                                border border-[var(--color-secondary)]/20

                                object-cover
                              "
                            />

                            {/* CONTENT */}

                            <div className="flex-1">

                              <h3
                                className="
                                  text-sm font-semibold
                                  text-white
                                "
                              >
                                {mentor.mentor}
                              </h3>

                              <p
                                className="
                                  mt-1 text-xs
                                  text-slate-400
                                "
                              >
                                {mentor.course}
                              </p>

                              <span
                                className="
                                  mt-2 inline-flex

                                  rounded-full

                                  bg-[var(--color-secondary)]/10

                                  px-3 py-1

                                  text-[11px]
                                  font-medium

                                  text-[var(--color-secondary)]
                                "
                              >

                                {mentor.category}

                              </span>

                            </div>

                            <Sparkles
                              size={18}

                              className="
                                text-[var(--color-secondary)]
                              "
                            />

                          </div>

                        </Link>
                      )
                    )

                  ) : (

                    <div
                      className="
                        rounded-2xl

                        bg-[var(--color-card)]

                        p-6

                        text-center
                      "
                    >

                      <p
                        className="
                          text-sm text-slate-400
                        "
                      >
                        No mentors found
                      </p>

                    </div>
                  )
                }

              </div>
            )
          }

        </div>

        {/* ============================================= */}
        {/* RIGHT MENU */}
        {/* ============================================= */}

        <div
          className="
            hidden items-center gap-6

            md:flex
          "
        >

          <Link
            to="/courses"

            className={navLink}
          >
            Mentors
          </Link>

          <Link
            to="/dashboard"

            className={navLink}
          >
            Dashboard
          </Link>

          {/* LOGIN BUTTON */}

          <Link
            to="/login"

            className="
              flex items-center gap-2

              rounded-xl

              bg-gradient-to-r

              from-[var(--color-primary)]
              to-pink-500

              px-5 py-3

              text-sm font-semibold
              text-white

              shadow-[var(--shadow-orange)]

              transition-all duration-300

              hover:scale-[1.03]
            "
          >

            <LogIn size={16} />

            Login

          </Link>

        </div>

      </nav>

      {/* ============================================= */}
      {/* MOBILE MENU */}
      {/* ============================================= */}

      {
        mobileMenu && (

          <div
            className="
              border-t border-[var(--color-border)]

              bg-[var(--color-background)]

              px-6 py-5

              md:hidden
            "
          >

            <div
              className="
                flex flex-col gap-5
              "
            >

              <Link
                to="/courses"

                className={navLink}
              >
                Mentors
              </Link>

              <Link
                to="/dashboard"

                className={navLink}
              >
                Dashboard
              </Link>

              <Link
                to="/login"

                className="
                  flex items-center
                  justify-center
                  gap-2

                  rounded-xl

                  bg-gradient-to-r

                  from-[var(--color-primary)]
                  to-pink-500

                  px-5 py-3

                  text-sm font-semibold
                  text-white
                "
              >

                <LogIn size={16} />

                Login

              </Link>

            </div>

          </div>
        )
      }

    </header>
  );
}

export default Navbar;