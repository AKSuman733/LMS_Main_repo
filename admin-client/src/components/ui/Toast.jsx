import {
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function Toast({

  message,

  type = "success",

}) {

  /* ====================================================== */
  /* ICONS */
  /* ====================================================== */

  const icons = {

    success:
      <CheckCircle2 size={18} />,

    error:
      <AlertTriangle size={18} />,

    warning:
      <Info size={18} />,
  };

  /* ====================================================== */
  /* STYLES */
  /* ====================================================== */

  const styles = {

    success:
      `
        border-green-500/20

        bg-green-500/10

        text-green-400

        shadow-[0_0_30px_rgba(34,197,94,0.15)]
      `,

    error:
      `
        border-red-500/20

        bg-red-500/10

        text-red-400

        shadow-[0_0_30px_rgba(239,68,68,0.15)]
      `,

    warning:
      `
        border-yellow-500/20

        bg-yellow-500/10

        text-yellow-400

        shadow-[0_0_30px_rgba(245,158,11,0.15)]
      `,
  };

  /* ====================================================== */
  /* COMPONENT */
  /* ====================================================== */

  return (

    <AnimatePresence>

      <motion.div

        initial={{
          opacity: 0,
          x: 60,
          scale: 0.96,
        }}

        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}

        exit={{
          opacity: 0,
          x: 60,
          scale: 0.96,
        }}

        transition={{
          duration: 0.22,
          ease: "easeOut",
        }}

        className={`
          fixed
          right-3
          top-3

          z-[3000]

          w-[calc(100vw-24px)]
          max-w-sm

          overflow-hidden

          rounded-2xl

          border

          backdrop-blur-2xl

          ${styles[type]}
        `}
      >

        {/* ====================================================== */}
        {/* GLOW BAR */}
        {/* ====================================================== */}

        <div
          className={`
            absolute
            inset-y-0
            left-0

            w-1.5

            ${
              type === "success"

                ? "bg-green-400"

                : type === "error"

                ? "bg-red-400"

                : "bg-yellow-400"
            }
          `}
        />

        {/* ====================================================== */}
        {/* CONTENT */}
        {/* ====================================================== */}

        <div
          className="
            flex items-start
            gap-3

            px-5 py-4
          "
        >

          {/* ====================================================== */}
          {/* ICON */}
          {/* ====================================================== */}

          <motion.div

            initial={{
              scale: 0.8,
              opacity: 0,
            }}

            animate={{
              scale: 1,
              opacity: 1,
            }}

            transition={{
              delay: 0.05,
              duration: 0.2,
            }}

            className="
              mt-0.5

              shrink-0
            "
          >

            {icons[type]}

          </motion.div>

          {/* ====================================================== */}
          {/* TEXT */}
          {/* ====================================================== */}

          <div
            className="
              flex-1
            "
          >

            <p
              className="
                text-sm
                font-semibold

                text-white
              "
            >

              {
                type === "success"

                  ? "Success"

                  : type === "error"

                  ? "Error"

                  : "Notice"
              }

            </p>

            <p
              className="
                mt-1

                text-sm
                leading-6

                text-slate-300
              "
            >

              {message}

            </p>

          </div>

          {/* ====================================================== */}
          {/* CLOSE ICON */}
          {/* ====================================================== */}

          <button
            className="
              btn-ui

              flex h-8 w-8
              items-center
              justify-center

              rounded-xl

              bg-white/[0.04]

              text-slate-500

              transition-all
              duration-200

              hover:bg-white/[0.08]
              hover:text-white

              active:scale-[0.96]
            "
          >

            <X size={14} />

          </button>

        </div>

        {/* ====================================================== */}
        {/* PROGRESS BAR */}
        {/* ====================================================== */}

        <motion.div

          initial={{
            width: "100%",
          }}

          animate={{
            width: "0%",
          }}

          transition={{
            duration: 3,
            ease: "linear",
          }}

          className={`
            h-[2px]

            ${
              type === "success"

                ? "bg-green-400"

                : type === "error"

                ? "bg-red-400"

                : "bg-yellow-400"
            }
          `}
        />

      </motion.div>

    </AnimatePresence>
  );
}

export default Toast;