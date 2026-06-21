import {
  BookOpen,
  Trophy,
  BrainCircuit,
  ArrowRight,
  PlayCircle,
  Sparkles,
  Flame,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import allMentors from "../../data/allMentors";

/* ── shared tokens ── */
const card =
  "rounded-2xl border border-white/[0.06] bg-white/[0.04] backdrop-blur-xl";

const pill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[11px] font-medium tracking-wide text-slate-400";

/* ── StatCard ── */
function StatCard({ item }) {
  const Icon = item.icon;
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`${card} flex flex-col gap-4 p-5 transition-colors duration-300 hover:border-white/10`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg}`}
      >
        <Icon size={18} className={item.color} />
      </div>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
          {item.title}
        </p>
        <h3 className="mt-1 text-3xl font-bold tabular-nums text-white">
          {item.value}
        </h3>
        {item.delta && (
          <span className="mt-1 flex items-center gap-1 text-[11px] text-emerald-400">
            <TrendingUp size={10} /> {item.delta}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ── CourseCard ── */
function CourseCard({ course }) {
  const pct = course.progress ?? 0;
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`${card} group overflow-hidden transition-all duration-300 hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]`}
    >
      {/* image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/30 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-semibold text-white backdrop-blur-md">
          {pct}% done
        </div>
      </div>

      {/* content */}
      <div className="p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-indigo-400">
          {course.mentor}
        </p>
        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-white">
          {course.title}
        </h3>

        {/* progress bar */}
        <div className="mt-4">
          <div className="mb-1.5 flex justify-between text-[11px] text-slate-500">
            <span>Progress</span>
            <span className="text-slate-300">{pct}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* cta */}
        <Link to={`/courses/${course.id}`}>
          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10">
            <PlayCircle size={14} className="text-indigo-400" />
            Continue
            <ArrowRight size={14} className="ml-auto text-slate-500" />
          </button>
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Dashboard ── */
function StudentDashboard() {
  const [recentCourses, setRecentCourses] = useState([]);
  const [stats, setStats] = useState([]);
  const [userName, setUserName] = useState("Student");

  useEffect(() => {
    const stored = localStorage.getItem("studentName");
    if (stored) setUserName(stored);

    const mentorsArray = Array.isArray(allMentors)
      ? allMentors
      : Object.keys(allMentors).map((k) => ({ id: Number(k), ...allMentors[k] }));

    const enrolled =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    const enrolled_courses = mentorsArray.filter((c) =>
      enrolled.includes(c.id)
    );

    const withProgress = enrolled_courses.map((c) => {
      const done =
        JSON.parse(localStorage.getItem(`course-progress-${c.id}`)) || [];
      const mods = c.modules || [];
      return {
        ...c,
        progress: mods.length ? Math.round((done.length / mods.length) * 100) : 0,
      };
    });

    setRecentCourses(withProgress.slice(0, 6));

    const completedCourses = withProgress.filter((c) => c.progress === 100);
    const overallScore =
      withProgress.length
        ? Math.round(
            withProgress.reduce((a, c) => a + c.progress, 0) /
              withProgress.length
          )
        : 0;

    setStats([
      {
        icon: BookOpen,
        title: "Enrolled",
        value: enrolled_courses.length,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        delta: "+2 this month",
      },
      {
        icon: PlayCircle,
        title: "In Progress",
        value: withProgress.filter((c) => c.progress > 0 && c.progress < 100).length,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
      },
      {
        icon: Trophy,
        title: "Completed",
        value: completedCourses.length,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
      },
      {
        icon: BrainCircuit,
        title: "Skill Score",
        value: `${overallScore}%`,
        color: "text-violet-400",
        bg: "bg-violet-500/10",
        delta: "↑ 4pts",
      },
    ]);
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080c14] px-5 pb-20 pt-24 lg:px-8">
      {/* subtle background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* ── header ── */}
        <div className="mb-10 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <span className={pill}>
              <Sparkles size={10} className="text-indigo-400" />
              AI Learning Dashboard
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              {greeting},<br />
              <span className="text-slate-300">{userName}</span>
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-7 text-slate-500">
              Pick up where you left off. Your mentors are waiting.
            </p>
          </div>

          {/* streak chip */}
          <div className={`${card} flex items-center gap-4 self-start rounded-2xl p-4 xl:mt-2`}>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-rose-500">
              <Flame size={20} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-widest text-slate-500">
                Learning Streak
              </p>
              <p className="mt-0.5 text-2xl font-bold text-white">24 Days 🔥</p>
            </div>
          </div>
        </div>

        {/* ── stats ── */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.title} item={s} />
          ))}
        </div>

        {/* ── courses ── */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Continue Learning
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Resume your courses below
              </p>
            </div>
            <Link
              to="/courses"
              className="flex items-center gap-1 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {recentCourses.length === 0 ? (
            <div className={`${card} flex flex-col items-center py-20 text-center`}>
              <BookOpen size={40} className="mb-4 text-slate-600" />
              <h2 className="text-xl font-semibold text-white">
                No enrolled courses yet
              </h2>
              <p className="mt-2 max-w-sm text-sm text-slate-500">
                Browse our catalog and enroll in your first course to get started.
              </p>
              <Link to="/courses">
                <button className="mt-6 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500">
                  Explore Courses
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recentCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default StudentDashboard;
