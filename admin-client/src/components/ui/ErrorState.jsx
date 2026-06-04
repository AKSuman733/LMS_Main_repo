import {
  motion,
} from "framer-motion";

import {
  AlertTriangle,
  LifeBuoy,
  RotateCw,
} from "lucide-react";

function ErrorState({

  title =
    "Something went wrong",

  message =
    "We encountered an unexpected error.",

  onRetry,

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

        border border-red-500/15

        bg-[#140d12]/90

        px-6 py-16

        text-center

        shadow-[0_0_40px_rgba(239,68,68,0.08)]

        backdrop-blur-2xl

        sm:px-8
        sm:py-20
      "
    >

      {/* ====================================================== */}
      {/* BACKGROUND GLOW */}
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

          bg-red-500/10

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

          bg-orange-500/10

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
        {/* ICON */}
        {/* ====================================================== */}

        <motion.div

          animate={{
            rotate: [0, -6, 6, -6, 0],
          }}

          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatDelay: 2,
          }}

          className="
            mx-auto
            mb-6

            flex h-24 w-24
            items-center
            justify-center

            rounded-[28px]

            border border-red-500/20

            bg-gradient-to-br
            from-red-500/10
            via-orange-500/10
            to-pink-500/10

            text-red-400

            shadow-[0_0_35px_rgba(239,68,68,0.12)]

            backdrop-blur-xl
          "
        >

          <AlertTriangle
            size={42}
          />

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
        {/* ACTIONS */}
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

          className="
            flex flex-col
            items-center
            justify-center
            gap-3

            sm:flex-row
          "
        >

          {/* ====================================================== */}
          {/* RETRY */}
          {/* ====================================================== */}

          <button

            onClick={onRetry}

            className="
              btn-ui
              btn-glow-red

              inline-flex h-11
              items-center
              justify-center
              gap-2

              rounded-2xl

              bg-gradient-to-r
              from-red-500
              via-orange-500
              to-pink-500

              px-6

              text-sm
              font-semibold

              text-white
            "
          >

            <RotateCw
              size={16}
            />

            Retry

          </button>

          {/* ====================================================== */}
          {/* SUPPORT */}
          {/* ====================================================== */}

          <button
            className="
              btn-ui

              inline-flex h-11
              items-center
              justify-center
              gap-2

              rounded-2xl

              border border-white/10

              bg-white/[0.03]

              px-5

              text-sm
              font-medium

              text-slate-300

              transition-all
              duration-200

              hover:bg-white/[0.08]
              hover:text-white
            "
          >

            <LifeBuoy
              size={16}
            />

            Contact Support

          </button>

        </motion.div>

      </div>

    </motion.div>
  );
}

export default ErrorState;