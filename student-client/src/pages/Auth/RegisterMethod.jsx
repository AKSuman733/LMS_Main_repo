import {
  Link,
} from "react-router-dom";

import {
  motion,
} from "framer-motion";

import {
  GraduationCap,
  ShieldCheck,
  BookOpen,
  X,
} from "lucide-react";

function RegisterMethod() {

  const roles = [

    {
      title:
        "Student",

      description:
        "Access courses, learning paths and AI powered education.",

      path:
        "/register/student",

      icon:
        GraduationCap,

      gradient:
        "from-cyan-500 to-blue-500",
    },

    {
      title:
        "Admin",

      description:
        "Manage platform analytics, users and system operations.",

      path:
        "/register/admin",

      icon:
        ShieldCheck,

      gradient:
        "from-pink-500 to-orange-500",
    },

    {
      title:
        "Instructor",

      description:
        "Create courses, manage students and track progress.",

      path:
        "/register/instructor",

      icon:
        BookOpen,

      gradient:
        "from-violet-500 to-fuchsia-500",
    },
  ];

  return (

    <div
      className="
        relative
        flex min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#050816]
        px-4
      "
    >

      {/* GLOW */}

      <div
        className="
          absolute
          left-[-100px]
          top-[-100px]

          h-[250px]
          w-[250px]

          rounded-full

          bg-cyan-500/10

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          bottom-[-100px]
          right-[-100px]

          h-[250px]
          w-[250px]

          rounded-full

          bg-pink-500/10

          blur-[120px]
        "
      />

      {/* CARD */}

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.95,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        transition={{
          duration: 0.3,
        }}

        className="
          relative

          w-full
          max-w-[560px]

          overflow-hidden

          rounded-[32px]

          border border-white/10

          bg-[#0B1120]/90

          p-7

          backdrop-blur-2xl
        "
      >

        {/* CLOSE */}

        <Link
          to="/"

          className="
            absolute
            right-5
            top-5

            text-slate-400

            transition-all
            duration-300

            hover:text-white
          "
        >

          <X size={22} />

        </Link>

        {/* TITLE */}

        <div className="text-center">

          <h1
            className="
              text-5xl
              font-black
              text-white
            "
          >

            Register

          </h1>

          <h2
            className="
              mt-3

              bg-gradient-to-r
              from-orange-400
              to-pink-500

              bg-clip-text

              text-3xl
              font-bold

              text-transparent
            "
          >

            Choose Your Account

          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[420px]

              text-base
              leading-7
              text-slate-400
            "
          >

            Select your role to access
            role-specific features
            and benefits.

          </p>

        </div>

        {/* ROLE CARDS */}

        <div
          className="
            mt-10

            space-y-5
          "
        >

          {roles.map((role) => {

            const Icon =
              role.icon;

            return (

              <Link
                key={role.title}

                to={role.path}

                className="
                  group
                  block
                "
              >

                <motion.div

                  whileHover={{
                    scale: 1.02,
                  }}

                  whileTap={{
                    scale: 0.98,
                  }}

                  className="
                    flex
                    items-center
                    gap-5

                    rounded-[26px]

                    border border-white/20

                    bg-white/[0.03]

                    p-5

                    transition-all
                    duration-300

                    hover:border-cyan-400/50
                    hover:bg-white/[0.05]
                  "
                >

                  {/* ICON */}

                  <div
                    className={`
                      flex
                      h-20
                      w-20

                      items-center
                      justify-center

                      rounded-full

                      bg-gradient-to-r

                      ${role.gradient}
                    `}
                  >

                    <Icon
                      size={34}
                      className="
                        text-white
                      "
                    />

                  </div>

                  {/* TEXT */}

                  <div>

                    <h3
                      className="
                        text-3xl
                        font-bold
                        text-white
                      "
                    >

                      {role.title}

                    </h3>

                    <p
                      className="
                        mt-2

                        max-w-[320px]

                        text-lg
                        leading-7
                        text-slate-400
                      "
                    >

                      {role.description}

                    </p>

                  </div>

                </motion.div>

              </Link>
            );
          })}

        </div>

      </motion.div>

    </div>
  );
}

export default RegisterMethod
;