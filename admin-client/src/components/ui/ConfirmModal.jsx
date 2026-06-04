import {
  AlertTriangle,
  X,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

function ConfirmModal({

  open,

  title = "Are you sure?",

  message =
    "This action cannot be undone.",

  confirmText = "Confirm",

  cancelText = "Cancel",

  onConfirm,

  onCancel,

}) {

  return (

    <AnimatePresence>

      {open && (

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

          className="
            fixed inset-0
            z-[2000]

            flex items-center
            justify-center

            bg-black/60

            p-4

            backdrop-blur-sm
          "
        >

          {/* ====================================================== */}
          {/* MODAL */}
          {/* ====================================================== */}

          <motion.div

            initial={{
              opacity: 0,
              scale: 0.94,
              y: 12,
            }}

            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}

            exit={{
              opacity: 0,
              scale: 0.94,
              y: 12,
            }}

            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}

            className="
              relative

              w-full
              max-w-md

              overflow-hidden

              rounded-[30px]

              border border-white/10

              bg-[#0f172a]/95

              p-6

              shadow-[0_0_60px_rgba(0,0,0,0.45)]

              backdrop-blur-2xl
            "
          >

            {/* ====================================================== */}
            {/* TOP GLOW */}
            {/* ====================================================== */}

            <div
              className="
                absolute
                inset-x-0
                top-0

                h-[3px]

                bg-gradient-to-r
                from-red-500
                via-orange-500
                to-pink-500
              "
            />

            {/* ====================================================== */}
            {/* CLOSE BUTTON */}
            {/* ====================================================== */}

            <button

              onClick={onCancel}

              className="
                btn-ui

                absolute
                right-4
                top-4

                flex h-9 w-9
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

              <X size={16} />

            </button>

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
                mb-5

                flex h-16 w-16
                items-center
                justify-center

                rounded-2xl

                border border-red-500/20

                bg-red-500/10

                text-red-400

                shadow-[0_0_25px_rgba(239,68,68,0.15)]
              "
            >

              <AlertTriangle size={28} />

            </motion.div>

            {/* ====================================================== */}
            {/* TITLE */}
            {/* ====================================================== */}

            <h2
              className="
                text-2xl
                font-black

                text-white
              "
            >

              {title}

            </h2>

            {/* ====================================================== */}
            {/* MESSAGE */}
            {/* ====================================================== */}

            <p
              className="
                mt-3

                text-sm
                leading-7

                text-slate-400
              "
            >

              {message}

            </p>

            {/* ====================================================== */}
            {/* ACTIONS */}
            {/* ====================================================== */}

            <div
              className="
                mt-8

                flex flex-col-reverse
                gap-3

                sm:flex-row
                sm:justify-end
              "
            >

              {/* CANCEL */}

              <button

                onClick={onCancel}

                className="
                  btn-ui

                  flex h-11
                  items-center
                  justify-center

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
                "
              >

                {cancelText}

              </button>

              {/* CONFIRM */}

              <button

                onClick={onConfirm}

                className="
                  btn-ui
                  btn-glow-red

                  flex h-11
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-r
                  from-red-500
                  to-pink-500

                  px-5

                  text-sm
                  font-semibold

                  text-white
                "
              >

                {confirmText}

              </button>

            </div>

          </motion.div>

        </motion.div>
      )}

    </AnimatePresence>
  );
}

export default ConfirmModal;