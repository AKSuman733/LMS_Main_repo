import { motion } from "framer-motion";

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

  if (!open) return null;

  return (

    <div
      className="
        fixed inset-0
        z-50

        flex items-center
        justify-center

        bg-black/40

        p-4
      "
    >

      <motion.div

        initial={{
          opacity: 0,
          scale: 0.9,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        className="
          w-full
          max-w-md

          rounded-3xl

          border border-white/10

          bg-[#0f172a]

          p-6

          shadow-2xl
        "
      >

        {/* TITLE */}

        <h2
          className="
            mb-3

            text-2xl
            font-black

            text-white
          "
        >

          {title}

        </h2>

        {/* MESSAGE */}

        <p
          className="
            mb-8

            text-sm
            leading-7

            text-slate-400
          "
        >

          {message}

        </p>

        {/* ACTIONS */}

        <div
          className="
            flex justify-end
            gap-3
          "
        >

          <button

            onClick={onCancel}

            className="
              rounded-xl

              border border-white/10

              px-5 py-3

              text-sm
              font-medium

              text-slate-300

              transition-all
              duration-300

              hover:bg-white/10
            "
          >

            {cancelText}

          </button>

          <button

            onClick={onConfirm}

            className="
              rounded-xl

              bg-red-500

              px-5 py-3

              text-sm
              font-semibold

              text-white

              transition-all
              duration-300

              hover:brightness-110
            "
          >

            {confirmText}

          </button>

        </div>

      </motion.div>

    </div>
  );
}

export default ConfirmModal;