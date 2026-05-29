import Skeleton from "./Skeleton";

function TableSkeleton() {

  return (

    <div
      className="
        rounded-2xl

        border border-white/10

        bg-[#0b1120]

        p-5
      "
    >

      {/* TOP */}

      <div
        className="
          mb-6

          flex items-center
          justify-between
        "
      >

        <Skeleton
          className="
            h-10 w-52
          "
        />

        <Skeleton
          className="
            h-10 w-72
          "
        />

      </div>

      {/* TABLE */}

      <div className="space-y-3">

        {[...Array(5)].map(
          (_, index) => (

            <div
              key={index}

              className="
                grid grid-cols-6
                gap-4
              "
            >

              {[...Array(6)].map(
                (_, i) => (

                  <Skeleton
                    key={i}

                    className="
                      h-14
                      w-full
                    "
                  />
                )
              )}

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default TableSkeleton;