import HeroBanner from "../../components/Hero/HeroBanner";

import CourseGrid from "../../components/Course/CourseGrid";

import {
  Sparkles,
  Rocket,
  BrainCircuit,
  GraduationCap,
  Star,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ====================================================== */
/* STYLES */
/* ====================================================== */

const glass = `
  border border-white/10
  bg-white/[0.03]
  backdrop-blur-md
`;

const gradientText = `
  bg-gradient-to-r
  from-[var(--color-primary)]
  via-purple-500
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
      whileHover={{ y: -4 }}
      className={`
        ${glass}
        group relative overflow-hidden
        rounded-2xl
        p-5
        transition-all duration-300
      `}
    >
      <div
        className={`
          absolute right-0 top-0
          h-20 w-20 rounded-full
          blur-[60px]
          ${glow}
        `}
      />

      <div
        className={`
          mb-4 flex h-12 w-12 items-center justify-center
          rounded-xl bg-gradient-to-r ${gradient}
        `}
      >
        <Icon size={20} className="text-white" />
      </div>

      <h3 className="mb-2 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="text-sm leading-6 text-slate-400">
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
      whileHover={{ y: -4 }}
      className={`${glass} rounded-2xl p-5`}
    >
      <p className="mb-5 text-sm leading-6 text-slate-300">
        "{text}"
      </p>

      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <h4 className="text-sm font-semibold text-white">
            {name}
          </h4>

          <p className="text-xs text-[var(--color-secondary)]">
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
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden bg-[var(--color-background)]">
      <HeroBanner />

      <CourseGrid />

      <section className="relative overflow-hidden py-14 lg:py-16">
        <div className="absolute left-0 top-0 h-[180px] w-[180px] rounded-full bg-[var(--color-secondary)]/10 blur-[60px]" />

        <div className="absolute bottom-0 right-0 h-[180px] w-[180px] rounded-full bg-[var(--color-primary)]/10 blur-[60px]" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <div
              className={`${glass} mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5`}
            >
              <Sparkles
                size={12}
                className="text-[var(--color-secondary)]"
              />

              <span className="text-xs font-medium text-[var(--color-secondary)]">
                Why Students Choose LearnSphere
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
              Learn AI With{" "}
              <span className={gradientText}>
                Real-World Experience
              </span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400 md:text-base">
              Build production-ready AI projects,
              learn from experts, and become job-ready
              through immersive learning experiences.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <FeatureCard
              icon={Rocket}
              title="Real AI Projects"
              desc="Build practical AI applications used in startups, enterprise systems, and automation workflows."
              gradient="from-[var(--color-secondary)] to-blue-500"
              glow="bg-[var(--color-secondary)]/10"
            />

            <FeatureCard
              icon={BrainCircuit}
              title="AI Mentorship"
              desc="Learn directly from experienced AI engineers, industry mentors, and machine learning experts."
              gradient="from-purple-500 to-pink-500"
              glow="bg-purple-500/10"
            />

            <FeatureCard
              icon={GraduationCap}
              title="Career Growth"
              desc="Resume reviews, portfolio guidance, placement support, and interview preparation."
              gradient="from-pink-500 to-orange-500"
              glow="bg-pink-500/10"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#071120] py-14 lg:py-16">
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div className="mb-10 text-center">
            <div
              className={`${glass} mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5`}
            >
              <Star
                size={12}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="text-xs text-slate-300">
                Student Testimonials
              </span>
            </div>

            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Success Stories
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Thousands of learners transformed their careers.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <TestimonialCard
              image="https://i.pravatar.cc/100?img=12"
              name="Priya Sharma"
              role="AI Engineer"
              text="The projects and mentorship helped me become an AI engineer in under 6 months."
            />

            <TestimonialCard
              image="https://i.pravatar.cc/100?img=15"
              name="Rahul Verma"
              role="Data Scientist"
              text="Hands-on learning made AI concepts incredibly practical and exciting."
            />

            <TestimonialCard
              image="https://i.pravatar.cc/100?img=32"
              name="Sneha Kapoor"
              role="ML Engineer"
              text="One of the best AI learning platforms for beginners and professionals alike."
            />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 lg:py-20">
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-primary)]/10 blur-[80px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
          <div
            className={`${glass} mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5`}
          >
            <Sparkles
              size={12}
              className="text-[var(--color-secondary)]"
            />

            <span className="text-xs font-medium text-[var(--color-secondary)]">
              Start Your AI Journey
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            Build The Future{" "}
            <span className={gradientText}>
              With AI
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
            Join thousands of students mastering Artificial Intelligence,
            Machine Learning, Deep Learning, and Generative AI.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={() => navigate("/courses")}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-purple-500 px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore Courses

              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
