function Footer() {

  return (

    <footer
      className="
        border-t border-[var(--color-border)]

        bg-[var(--color-surface)]

        text-[var(--color-text-secondary)]

        py-8
      "
    >

      {/* ================= MAIN FOOTER ================= */}

      <div
        className="
          mx-auto

          grid
          max-w-7xl

          grid-cols-2
          gap-6

          px-5

          md:grid-cols-4
        "
      >

        {/* ================= BRAND ================= */}

        <div className="col-span-2 md:col-span-1">

          <h2
            className="
              mb-3

              bg-gradient-to-r
              from-orange-400
              to-pink-500

              bg-clip-text

              text-lg
              font-bold

              text-transparent
            "
          >
            UptoSkills
          </h2>

          <p
            className="
              max-w-[220px]

              text-xs
              leading-6

              text-slate-400
            "
          >

            Empowering future AI engineers
            with immersive AI-powered learning
            experiences.

          </p>

        </div>

        {/* ================= COMPANY ================= */}

        <div>

          <h3
            className="
              mb-3

              text-sm
              font-semibold

              text-white
            "
          >
            Company
          </h3>

          <ul className="space-y-2 text-xs">

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              About
            </li>

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              Careers
            </li>

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              Blog
            </li>

          </ul>

        </div>

        {/* ================= COURSES ================= */}

        <div>

          <h3
            className="
              mb-3

              text-sm
              font-semibold

              text-white
            "
          >
            Courses
          </h3>

          <ul className="space-y-2 text-xs">

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              Artificial Intelligence
            </li>

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              Cybersecurity
            </li>

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              Web Development
            </li>

          </ul>

        </div>

        {/* ================= SUPPORT ================= */}

        <div>

          <h3
            className="
              mb-3

              text-sm
              font-semibold

              text-white
            "
          >
            Support
          </h3>

          <ul className="space-y-2 text-xs">

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              Help Center
            </li>

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              Contact
            </li>

            <li
              className="
                cursor-pointer

                transition-all duration-300

                hover:text-[var(--color-secondary)]
                hover:translate-x-1
              "
            >
              Privacy Policy
            </li>

          </ul>

        </div>

      </div>

      {/* ================= BOTTOM ================= */}

      <div
        className="
          mt-6

          border-t border-[var(--color-border)]

          pt-4

          text-center

          text-[11px]

          text-slate-500
        "
      >

        © 2026 LearnSphere.
        All rights reserved.

      </div>

    </footer>
  );
}

export default Footer;