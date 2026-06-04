import {
  motion,
} from "framer-motion";

import Skeleton from "./Skeleton";

function TableSkeleton() {

  return (

    <motion.div

      initial={{
        opacity: 0,
        y: 10,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.25,
      }}

      className="
        relative

        overflow-hidden

        rounded-[28px]

        border border-white/10

        bg-[#0b1120]/90

        p-4

        shadow-[0_0_40px_rgba(0,0,0,0.25)]

        backdrop-blur-2xl

        sm:p-5
      "
    >

      {/* ====================================================== */}
      {/* SHIMMER OVERLAY */}
      {/* ====================================================== */}

      <div
        className="
          pointer-events-none

          absolute inset-0

          overflow-hidden
        "
      >

        <motion.div

          animate={{
            x: ["-100%", "200%"],
          }}

          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}

          className="
            absolute
            inset-y-0

            w-[40%]

            bg-gradient-to-r
            from-transparent
            via-white/[0.06]
            to-transparent

            blur-xl
          "
        />

      </div>

      {/* ====================================================== */}
      {/* TOP */}
      {/* ====================================================== */}

      <div
        className="
          mb-6

          flex flex-col
          gap-3

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* TITLE */}

        <Skeleton
          className="
            h-11
            w-44

            rounded-2xl
          "
        />

        {/* SEARCH */}

        <Skeleton
          className="
            h-11
            w-full

            rounded-2xl

            sm:w-72
          "
        />

      </div>

      {/* ====================================================== */}
      {/* TABLE HEADER */}
      {/* ====================================================== */}

      <div
        className="
          mb-3

          hidden

          grid-cols-6
          gap-4

          px-2

          md:grid
        "
      >

        {[...Array(6)].map(
          (_, i) => (

            <Skeleton
              key={i}

              className="
                h-5
                w-full

                rounded-lg
              "
            />
          )
        )}

      </div>

      {/* ====================================================== */}
      {/* TABLE ROWS */}
      {/* ====================================================== */}

      <div
        className="
          space-y-3
        "
      >

        {[...Array(5)].map(
          (_, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                y: 8,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay:
                  index * 0.06,
              }}

              className="
                grid
                grid-cols-2
                gap-3

                rounded-2xl

                border border-white/5

                bg-white/[0.02]

                p-3

                md:grid-cols-6
                md:gap-4
              "
            >

              {[...Array(6)].map(
                (_, i) => (

                  <Skeleton
                    key={i}

                    className="
                      h-12
                      w-full

                      rounded-xl
                    "
                  />
                )
              )}

            </motion.div>
          )
        )}

      </div>

      {/* ====================================================== */}
      {/* PAGINATION */}
      {/* ====================================================== */}

      <div
        className="
          mt-6

          flex flex-col
          gap-3

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >

        <Skeleton
          className="
            h-5
            w-40

            rounded-lg
          "
        />

        <div
          className="
            flex items-center
            gap-2
          "
        >

          {[...Array(3)].map(
            (_, i) => (

              <Skeleton
                key={i}

                className="
                  h-11
                  w-20

                  rounded-2xl
                "
              />
            )
          )}

        </div>

      </div>

    </motion.div>
  );
}

export default TableSkeleton;