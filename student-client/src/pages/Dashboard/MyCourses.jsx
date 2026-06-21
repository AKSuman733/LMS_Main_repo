import {
  PlayCircle,
  ArrowRight,
  Trash2,
  BookOpen,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import allMentors from "../../data/allMentors";

/* ── shared tokens ── */
const card =
  "rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl";

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium tracking-wide text-slate-400";

/* ── CourseCard ── */
function CourseCard({ course, progress, onRemove }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`${card} group overflow-hidden transition-all duration-300 hover:border-white/10`}
    >
      {/* image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={course.image}
          alt={course.title ?? course.course}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/20 to-transparent" />
        {course.category && (
          <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
            {course.category}
          </span>
        )}
      </div>

      {/* body */}
      <div className="p-5">
        {/* mentor row */}
        <div className="mb-3 flex items-center gap-2.5">
          <img
            src={course.mentorImage ?? course.image}
            alt={course.mentor}
            className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
          />
          <div>
            <p className="text-xs font-semibold text-white">{course.mentor}</p>
            <p className="text-[10px] text-slate-500">{course.role ?? "Mentor"}</p>
          </div>
        </div>

        {/* title */}
        <h2 className="mb-4 line-clamp-2 text-base font-semibold leading-snug text-white">
          {course.title ?? course.course}
        </h2>

        {/* progress */}
        <div className="mb-4">
          <div className="mb-1.5 flex justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span className="text-slate-300">{progress}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* active badge */}
        <div className="mb-4 flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Active
        </div>

        {/* actions */}
        <div className="flex gap-2">
          <Link to={`/courses/${course.id}`} className="flex-1">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
              <PlayCircle size={14} />
              Continue
            </button>
          </Link>
          <button
            onClick={() => onRemove(course.id)}
            className="flex items-center justify-center rounded-xl border border-white/10 px-3 text-slate-500 transition-all hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            title="Remove course"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── MyCourses ── */
function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);

  const mentorsArray = Array.isArray(allMentors)
    ? allMentors
    : Object.keys(allMentors).map((k) => ({ id: Number(k), ...allMentors[k] }));

  useEffect(() => {
    const enrolled =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setMyCourses(mentorsArray.filter((c) => enrolled.includes(c.id)));
  }, []);

  const removeCourse = (courseId) => {
    const enrolled =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    localStorage.setItem(
      "enrolledCourses",
      JSON.stringify(enrolled.filter((id) => id !== courseId))
    );
    setMyCourses((prev) => prev.filter((c) => c.id !== courseId));
  };

  const getProgress = (course) => {
    const done =
      JSON.parse(localStorage.getItem(`course-progress-${course.id}`)) || [];
    const mods = course.modules ?? [];
    return mods.length ? Math.round((done.length / mods.length) * 100) : 0;
  };

  const overallProgress =
    myCourses.length > 0
      ? Math.round(
          myCourses.reduce((a, c) => a + getProgress(c), 0) / myCourses.length
        )
      : 0;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080c14] px-5 pb-20 pt-24 text-white lg:px-8">
      {/* glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* header */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className={pill}>
              <Sparkles size={10} className="text-violet-400" />
              Your Library
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              My Courses
            </h1>
            <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
              Track your progress, resume sessions, and stay on top of your goals.
            </p>
          </div>

          {/* stat chips */}
          <div className="flex flex-wrap gap-3 lg:mt-2 lg:flex-col">
            <div className={`${card} flex items-center gap-3 rounded-xl px-4 py-3`}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10">
                <BookOpen size={16} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                  Enrolled
                </p>
                <p className="text-xl font-bold">{myCourses.length}</p>
              </div>
            </div>
            <div className={`${card} flex items-center gap-3 rounded-xl px-4 py-3`}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10">
                <TrendingUp size={16} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                  Avg. Progress
                </p>
                <p className="text-xl font-bold">{overallProgress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* empty state */}
        {myCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${card} flex flex-col items-center py-24 text-center`}
          >
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.05]">
              <BookOpen size={32} className="text-slate-600" />
            </div>
            <h2 className="text-xl font-semibold text-white">
              Your library is empty
            </h2>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              Enroll in a course to start building your skills.
            </p>
            <Link to="/courses">
              <button className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
                Explore Courses
                <ArrowRight size={14} className="ml-2 inline-block" />
              </button>
            </Link>
          </motion.div>
        )}

        {/* grid */}
        {myCourses.length > 0 && (
          <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence>
              {myCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  progress={getProgress(course)}
                  onRemove={removeCourse}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </div>
  );
}

export default MyCourses;
