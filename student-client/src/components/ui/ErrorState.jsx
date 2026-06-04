import { motion } from "framer-motion";

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
        y: 20,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      className="
        flex flex-col
        items-center
        justify-center

        rounded-3xl

        border border-red-500/20

        bg-red-500/5

        px-8 py-20

        text-center
      "
    >

      {/* ICON */}

      <div
        className="
          mb-5

          text-6xl
        "
      >

        ⚠️

      </div>

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

          max-w-md

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
          flex items-center
          gap-4
        "
      >

        <button

          onClick={onRetry}

          className="
            rounded-2xl

            bg-red-500

            px-6 py-3

            text-sm
            font-semibold

            text-white

            transition-all
            duration-300

            hover:scale-[1.03]
          "
        >

          Retry

        </button>

        <button
          className="
            text-sm
            font-medium

            text-slate-400

            underline
          "
        >

          Contact Support

        </button>

      </div>

    </motion.div>
  );
}

export default ErrorState;