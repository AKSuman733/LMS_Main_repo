import HeroBanner from "../../components/Hero/HeroBanner";

import CourseGrid from "../../components/Course/CourseGrid";

import {
  Sparkles,
  Rocket,
  BrainCircuit,
  GraduationCap,
  PlayCircle,
  Star,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

import {
  useNavigate,
} from "react-router-dom";

/* ====================================================== */
/* STYLES */
/* ====================================================== */

const glass =
  `
    border border-[var(--color-border)]

    bg-[var(--color-card)]

    backdrop-blur-xl
  `;

const gradientText =
  `
    bg-gradient-to-r

    from-[var(--color-primary)]
    via-pink-500
    to-[var(--color-secondary)]

    bg-clip-text

    text-transparent
  `;

/* ====================================================== */
/* FEATURE CARD */
/* ====================================================== */

function FeatureCard({
  icon: Icon,
  title,
  desc,
  gradient,
  glow,
}) {

  return (

    <motion.div
      whileHover={{
        y: -5,
      }}

      className={`
        ${glass}

        group

        relative overflow-hidden

        rounded-[30px]

        p-6

        transition-all
        duration-500
      `}
    >

      {/* GLOW */}

      <div
        className={`
          absolute
          right-0 top-0

          h-24 w-24

          rounded-full

          blur-3xl

          ${glow}
        `}
      />

      {/* ICON */}

      <div
        className={`
          mb-5

          flex h-14 w-14
          items-center
          justify-center

          rounded-2xl

          bg-gradient-to-r

          ${gradient}
        `}
      >

        <Icon
          size={24}

          className="
            text-white
          "
        />

      </div>

      {/* TITLE */}

      <h3
        className="
          mb-3

          text-xl
          font-black

          text-white
        "
      >

        {title}

      </h3>

      {/* DESC */}

      <p
        className="
          text-sm
          leading-8

          text-slate-400
        "
      >

        {desc}

      </p>

    </motion.div>
  );
}

/* ====================================================== */
/* TESTIMONIAL CARD */
/* ====================================================== */

function TestimonialCard({
  image,
  name,
  role,
  text,
}) {

  return (

    <motion.div
      whileHover={{
        y: -5,
      }}

      className={`
        ${glass}

        rounded-[28px]

        p-6
      `}
    >

      {/* TEXT */}

      <p
        className="
          mb-6

          text-sm
          leading-8

          text-slate-300
        "
      >

        "{text}"

      </p>

      {/* USER */}

      <div
        className="
          flex items-center
          gap-4
        "
      >

        <img
          src={image}

          alt={name}

          className="
            h-12 w-12

            rounded-full

            object-cover
          "
        />

        <div>

          <h4
            className="
              font-bold

              text-white
            "
          >

            {name}

          </h4>

          <p
            className="
              text-xs

              text-[var(--color-secondary)]
            "
          >

            {role}

          </p>

        </div>

      </div>

    </motion.div>
  );
}

/* ====================================================== */
/* MAIN */
/* ====================================================== */

function HomePage() {

  const navigate =
    useNavigate();

  return (

    <div
      className="
        overflow-hidden

        bg-[var(--color-background)]
      "
    >

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <HeroBanner />

      {/* ====================================================== */}
      {/* COURSE GRID */}
      {/* ====================================================== */}

      <CourseGrid />

      {/* ====================================================== */}
      {/* WHY CHOOSE US */}
      {/* ====================================================== */}

      <section
        className="
          relative

          overflow-hidden

          py-20
        "
      >

        {/* GLOWS */}

        <div
          className="
            absolute
            left-0 top-0

            h-[280px]
            w-[280px]

            rounded-full

            bg-[var(--color-secondary)]/10

            blur-[120px]
          "
        />

        <div
          className="
            absolute
            bottom-0 right-0

            h-[280px]
            w-[280px]

            rounded-full

            bg-[var(--color-primary)]/10

            blur-[120px]
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative z-10

            mx-auto

            max-w-7xl

            px-5

            lg:px-8
          "
        >

          {/* ====================================================== */}
          {/* HEADING */}
          {/* ====================================================== */}

          <div
            className="
              mx-auto

              mb-12

              max-w-3xl

              text-center
            "
          >

            {/* BADGE */}

            <div
              className={`
                ${glass}

                mb-5

                inline-flex
                items-center
                gap-2

                rounded-full

                px-4 py-2
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
                  text-xs
                  font-medium

                  text-[var(--color-secondary)]
                "
              >
                Why Students Choose LearnSphere
              </span>

            </div>

            {/* TITLE */}

            <h2
              className="
                text-4xl
                font-black
                leading-tight

                text-white

                md:text-5xl
              "
            >

              Learn AI With{" "}

              <span
                className={
                  gradientText
                }
              >
                Real-World Experience
              </span>

            </h2>

            {/* DESC */}

            <p
              className="
                mt-5

                text-sm
                leading-8

                text-slate-400

                md:text-base
              "
            >

              Build production-ready AI projects,
              learn from experts, and become
              job-ready through immersive
              learning experiences.

            </p>

          </div>

          {/* ====================================================== */}
          {/* FEATURE GRID */}
          {/* ====================================================== */}

          <div
            className="
              grid gap-5

              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            <FeatureCard
              icon={Rocket}

              title="Real AI Projects"

              desc="
                Build practical AI applications
                used in startups, enterprise systems,
                and futuristic automation workflows.
              "

              gradient="
                from-[var(--color-secondary)]
                to-blue-500
              "

              glow="
                bg-[var(--color-secondary)]/10
              "
            />

            <FeatureCard
              icon={BrainCircuit}

              title="AI Mentorship"

              desc="
                Learn directly from experienced
                AI engineers, industry mentors,
                and machine learning experts.
              "

              gradient="
                from-purple-500
                to-pink-500
              "

              glow="
                bg-purple-500/10
              "
            />

            <FeatureCard
              icon={GraduationCap}

              title="Career Growth"

              desc="
                Resume reviews, portfolio guidance,
                placement support, and interview
                preparation for AI careers.
              "

              gradient="
                from-pink-500
                to-orange-500
              "

              glow="
                bg-pink-500/10
              "
            />

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* TESTIMONIALS */}
      {/* ====================================================== */}

      <section
        className="
          relative

          bg-[#071120]

          py-20
        "
      >

        <div
          className="
            mx-auto

            max-w-7xl

            px-5

            lg:px-8
          "
        >

          {/* ====================================================== */}
          {/* HEADING */}
          {/* ====================================================== */}

          <div
            className="
              mb-12

              text-center
            "
          >

            {/* BADGE */}

            <div
              className={`
                ${glass}

                mb-5

                inline-flex
                items-center
                gap-2

                rounded-full

                px-4 py-2
              `}
            >

              <Star
                size={14}

                className="
                  fill-yellow-400

                  text-yellow-400
                "
              />

              <span
                className="
                  text-xs

                  text-slate-300
                "
              >
                Student Testimonials
              </span>

            </div>

            {/* TITLE */}

            <h2
              className="
                text-4xl
                font-black

                text-white

                md:text-5xl
              "
            >

              Success Stories

            </h2>

            {/* DESC */}

            <p
              className="
                mt-4

                text-sm

                text-slate-400
              "
            >

              Thousands of learners transformed their careers.

            </p>

          </div>

          {/* GRID */}

          <div
            className="
              grid gap-5

              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            <TestimonialCard
              image="https://i.pravatar.cc/100?img=12"
              name="Priya Sharma"
              role="AI Engineer"
              text="
                The projects and mentorship
                helped me become an AI engineer
                in under 6 months.
              "
            />

            <TestimonialCard
              image="https://i.pravatar.cc/100?img=15"
              name="Rahul Verma"
              role="Data Scientist"
              text="
                Hands-on learning made AI concepts
                incredibly practical and exciting.
              "
            />

            <TestimonialCard
              image="https://i.pravatar.cc/100?img=32"
              name="Sneha Kapoor"
              role="ML Engineer"
              text="
                One of the best AI learning platforms
                for beginners and professionals alike.
              "
            />

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* CTA */}
      {/* ====================================================== */}

      <section
        className="
          relative

          overflow-hidden

          py-24
        "
      >

        {/* GLOW */}

        <div
          className="
            absolute
            left-1/2 top-1/2

            h-[380px]
            w-[380px]

            -translate-x-1/2
            -translate-y-1/2

            rounded-full

            bg-[var(--color-primary)]/10

            blur-[150px]
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative z-10

            mx-auto

            max-w-5xl

            px-5

            text-center
          "
        >

          {/* BADGE */}

          <div
            className={`
              ${glass}

              mb-6

              inline-flex
              items-center
              gap-2

              rounded-full

              px-5 py-2
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
                text-xs
                font-medium

                text-[var(--color-secondary)]
              "
            >

              Start Your AI Journey

            </span>

          </div>

          {/* TITLE */}

          <h2
            className="
              text-5xl
              font-black
              leading-tight

              text-white

              md:text-6xl
            "
          >

            Build The Future{" "}

            <span
              className={
                gradientText
              }
            >
              With AI
            </span>

          </h2>

          {/* DESC */}

          <p
            className="
              mx-auto mt-6

              max-w-3xl

              text-sm
              leading-8

              text-slate-400

              md:text-lg
            "
          >

            Join thousands of students mastering
            Artificial Intelligence, Machine Learning,
            Deep Learning, and Generative AI through
            immersive learning experiences.

          </p>

          {/* BUTTONS */}

          <div
            className="
              mt-8

              flex flex-wrap
              items-center
              justify-center
              gap-4
            "
          >

            {/* EXPLORE COURSES */}

            <button

              onClick={() =>
                navigate("/courses")
              }

              className="
                flex items-center
                gap-2

                rounded-2xl

                bg-gradient-to-r

                from-[var(--color-primary)]
                to-pink-500

                px-7 py-4

                text-sm
                font-semibold

                text-white

                shadow-[var(--shadow-orange)]

                transition-all
                duration-300

                hover:scale-[1.03]
              "
            >

              Explore Courses

              <ArrowRight
                size={18}
              />

            </button>

           

          </div>

        </div>

      </section>

    </div>
  );
}

export default HomePage;