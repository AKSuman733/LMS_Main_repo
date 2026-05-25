import { Link } from "react-router-dom";

import {
  Users,
  Clock3,
  ArrowRight,
  Star,
  Sparkles,
} from "lucide-react";

import {
  colors,
  shadows,
  radius,
  transitions,
} from "../../styles/designTokens";

const glassBadge = `
  flex items-center gap-2

  rounded-full

  border border-[var(--color-border)]

  bg-black/40

  backdrop-blur-xl
`;

const metaItem =
  "flex items-center gap-2 text-slate-400";

const buttonStyle = `
  flex items-center gap-2

  rounded-xl

  bg-gradient-to-r
  from-orange-500
  to-pink-500

  px-5 py-3

  text-sm font-semibold text-white

  shadow-[0_0_25px_rgba(255,107,53,0.35)]

  transition-all duration-300

  hover:scale-[1.03]
`;

function CourseCard({ course }) {

  return (

    <div
      className="
        group relative

        flex h-full flex-col

        overflow-hidden

        rounded-2xl

        border border-[var(--color-border)]

        bg-[var(--color-card)]

        backdrop-blur-xl

        transition-all duration-500

        hover:-translate-y-2
        hover:shadow-[0_0_40px_rgba(59,130,246,0.18)]
      "
    >

      {/* ================= IMAGE ================= */}

      <div
        className="
          relative

          h-[260px]

          overflow-hidden

          bg-slate-900
        "
      >

        <img
          src={course.image}
          alt={course.title}

          className="
            h-full
            w-full

            object-cover
            object-top

            transition-transform
            duration-500

            group-hover:scale-105
          "
        />

        {/* ================= OVERLAY ================= */}

        <div
          className="
            absolute inset-0

            bg-gradient-to-t

            from-[#050816]
            via-[#050816]/20
            to-transparent
          "
        />

        {/* ================= CATEGORY ================= */}

        <div
          className={`
            ${glassBadge}

            absolute left-4 top-4

            z-10

            px-3 py-2
          `}
        >

          <Sparkles
            size={14}
            className="
              text-[var(--color-secondary)]
            "
          />

          <span
            className="
              text-xs font-medium
              text-white
            "
          >
            {course.category}
          </span>

        </div>

        {/* ================= RATING ================= */}

        <div
          className={`
            ${glassBadge}

            absolute right-4 top-4

            z-10

            px-3 py-2
          `}
        >

          <Star
            size={13}
            className="
              fill-yellow-400
              text-yellow-400
            "
          />

          <span
            className="
              text-xs font-medium
              text-white
            "
          >
            4.9
          </span>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div
        className="
          flex flex-1 flex-col

          p-6
        "
      >

        {/* ================= TITLE ================= */}

        <h3
          className="
            mb-4

            min-h-[64px]

            text-xl font-bold

            leading-snug

            text-white

            transition

            group-hover:text-[var(--color-secondary)]
          "
        >

          {course.title}

        </h3>

        {/* ================= MENTOR ================= */}

        <div
          className="
            mb-5 flex items-center gap-3
          "
        >

          <img
            src={
              course.mentorImage ||
              course.image
            }

            alt={course.mentor}

            className="
              h-11 w-11

              rounded-full

              border-2
              border-cyan-400/40

              object-cover

              shadow-[0_0_20px_rgba(34,211,238,0.25)]
            "
          />

          <div>

            <h4
              className="
                text-sm font-semibold
                text-white
              "
            >
              {course.mentor}
            </h4>

            <p
              className="
                text-xs
                text-slate-400
              "
            >
              {course.role}
            </p>

          </div>

        </div>

        {/* ================= META ================= */}

        <div
          className="
            mb-5 flex flex-wrap gap-4
          "
        >

          <div className={metaItem}>

            <Users size={16} />

            <span className="text-sm">
              {course.students}
            </span>

          </div>

          <div className={metaItem}>

            <Clock3 size={16} />

            <span className="text-sm">
              {course.duration}
            </span>

          </div>

        </div>

        {/* ================= LEVEL ================= */}

        <div
          className="
            mb-6 inline-flex

            w-fit

            rounded-full

            border border-cyan-500/20

            bg-cyan-500/10

            px-3 py-1.5

            text-xs font-medium

            text-cyan-400
          "
        >

          {course.level}

        </div>

        {/* ================= BOTTOM ================= */}

        <div
          className="
            mt-auto

            flex items-center
            justify-between

            gap-4

            pt-6
          "
        >

          {/* ================= PRICE ================= */}

          <div>

            <p
              className="
                mb-1 text-xs
                text-slate-500
              "
            >
              Course Fee
            </p>

            <h4
              className="
                bg-gradient-to-r
                from-cyan-400
                to-blue-500

                bg-clip-text

                text-2xl font-extrabold

                text-transparent
              "
            >

              {course.price}

            </h4>

          </div>

          {/* ================= BUTTON ================= */}

          <Link
            to={`/courses/${course.id}`}
            className={buttonStyle}
          >

            Enroll

            <ArrowRight size={16} />

          </Link>

        </div>

      </div>

      {/* ================= HOVER GLOW ================= */}

      <div
        className="
          pointer-events-none

          absolute inset-0

          opacity-0

          transition-opacity duration-500

          group-hover:opacity-100
        "
      >

        <div
          className="
            absolute -right-10 -top-10

            h-36 w-36

            rounded-full

            bg-blue-500/20

            blur-[70px]
          "
        />

      </div>

    </div>
  );
}

export default CourseCard;