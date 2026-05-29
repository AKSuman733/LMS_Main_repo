function Footer() {
  return (
    <footer className="border-t border-white/10 px-8 py-12">
      <div className="max-w-7xl mx-auto">

        {/* Top Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo + Description */}
          <div>
            <h1 className="text-2xl font-bold">
              LMS<span className="text-orange-400">Project</span>
            </h1>

            <p className="text-gray-400 mt-3">
              Learn modern skills and build your future with premium courses.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-gray-400">

            <a
              href="#"
              className="hover:text-white transition"
            >
              Home
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Courses
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              About
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Contact
            </a>

          </div>
        </div>

        {/* Bottom Footer */}
          <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 LMS Project. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;