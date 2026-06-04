import { motion } from "framer-motion";

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

        border border-white/10

        bg-[#0b1120]

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

        {icon}

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

      {/* BUTTON */}

      <button

        onClick={onClick}

        className="
          rounded-2xl

          bg-gradient-to-r

          from-orange-500
          to-pink-500

          px-6 py-3

          text-sm
          font-semibold

          text-white

          transition-all
          duration-300

          hover:scale-[1.03]
        "
      >

        + {buttonText}

      </button>

    </motion.div>
  );
}

export default EmptyState;