import {
  motion,
} from "framer-motion";

function EmptyState({

  icon = "📭",

  title = "No Data Found",

  message =
    "There is nothing here yet.",

  buttonText = "Create",

  onClick,

}) {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 18,
        scale: 0.98,
      }}

      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}

      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}

      className="
        relative

        overflow-hidden

        rounded-[32px]

        border border-white/10

        bg-[#0b1120]/90

        px-6 py-16

        text-center

        shadow-[0_0_40px_rgba(0,0,0,0.25)]

        backdrop-blur-2xl

        sm:px-8
        sm:py-20
      "
    >

      {/* ====================================================== */}
      {/* BACKGROUND GLOWS */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none

          absolute
          left-[-80px]
          top-[-80px]

          h-[180px]
          w-[180px]

          rounded-full

          bg-cyan-500/10

          blur-[90px]
        "
      />

      <div
        className="
          pointer-events-none

          absolute
          bottom-[-80px]
          right-[-80px]

          h-[180px]
          w-[180px]

          rounded-full

          bg-pink-500/10

          blur-[90px]
        "
      />

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div
        className="
          relative
          z-10
        "
      >

        {/* ====================================================== */}
        {/* ICON CONTAINER */}
        {/* ====================================================== */}

        <motion.div

          animate={{
            y: [0, -8, 0],
          }}

          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
            mx-auto
            mb-6

            flex h-24 w-24
            items-center
            justify-center

            rounded-[28px]

            border border-white/10

            bg-gradient-to-br
            from-orange-500/10
            via-pink-500/10
            to-cyan-500/10

            text-5xl

            shadow-[0_0_35px_rgba(255,107,53,0.08)]

            backdrop-blur-xl
          "
        >

          {icon}

        </motion.div>

        {/* ====================================================== */}
        {/* TITLE */}
        {/* ====================================================== */}

        <motion.h2

          initial={{
            opacity: 0,
            y: 8,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.08,
          }}

          className="
            mb-3

            text-2xl
            font-black

            tracking-tight

            text-white

            sm:text-3xl
          "
        >

          {title}

        </motion.h2>

        {/* ====================================================== */}
        {/* MESSAGE */}
        {/* ====================================================== */}

        <motion.p

          initial={{
            opacity: 0,
            y: 8,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.12,
          }}

          className="
            mx-auto
            mb-8

            max-w-lg

            text-sm
            leading-7

            text-slate-400

            sm:text-[15px]
          "
        >

          {message}

        </motion.p>

        {/* ====================================================== */}
        {/* BUTTON */}
        {/* ====================================================== */}

        <motion.div

          initial={{
            opacity: 0,
            y: 8,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.16,
          }}
        >

          <button

            onClick={onClick}

            className="
              btn-ui
              btn-glow-orange

              inline-flex h-11
              items-center
              justify-center
              gap-2

              rounded-2xl

              bg-gradient-to-r
              from-orange-500
              via-pink-500
              to-cyan-500

              px-6

              text-sm
              font-semibold

              text-white
            "
          >

            <span
              className="
                text-lg
              "
            >
              +
            </span>

            {buttonText}

          </button>

        </motion.div>

      </div>

    </motion.div>
  );
}

export default EmptyState;