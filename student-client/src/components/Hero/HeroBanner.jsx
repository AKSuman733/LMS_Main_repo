import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Search, Brain, TrendingUp, Star, Users, BookOpen, Zap, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLessonStore from "../../store/useLessonStore";

/* ====================================================== */
/* DATA */
/* ====================================================== */

const heroCelebrities = [
  { name: "Elon Musk",        image: "/images/elon-ai.png",  course: "Artificial Intelligence", tag: "Tech & Innovation" },
  { name: "Deepika Padukone", image: "/images/deep-ai.png",  course: "UI/UX Design",            tag: "Creative Arts"     },
  { name: "Zendaya",          image: "/images/zen-ai.png",   course: "Programming",             tag: "Technology"        },
  { name: "Virat Kohli",      image: "/images/virat-ai.png", course: "Data Science",            tag: "Analytics"         },
  { name: "RDJ",              image: "/images/rdj-ai.png",   course: "Web Development",         tag: "Engineering"       },
];

const celebrities = [
  "Elon Musk",
  "Taylor Swift",
  "Cristiano Ronaldo",
  "Tony Stark",
  "Virat Kohli",
  "Deepika Padukone",
];

const stats = [
  { value: "50K+", label: "Active learners", icon: Users    },
  { value: "200+", label: "AI lessons",      icon: BookOpen },
  { value: "4.9",  label: "Average rating",  icon: Star     },
];

const featurePills = [
  "Personalised AI curriculum",
  "Learn at your own pace",
  "Certificate on completion",
];

const recentLearners = [
  { initials: "AK", color: "#6366f1" },
  { initials: "SR", color: "#8b5cf6" },
  { initials: "PM", color: "#a78bfa" },
  { initials: "RJ", color: "#7c3aed" },
];

const courseCards = [
  { icon: Zap,      label: "AI & ML",        lessons: 24, color: "#6366f1" },
  { icon: Brain,    label: "Data Science",   lessons: 18, color: "#8b5cf6" },
  { icon: BookOpen, label: "Web Dev",        lessons: 32, color: "#a78bfa" },
];

const celebrityRoutes = {
  "Elon Musk":         1,
  "Taylor Swift":      1,
  "Tony Stark":        1,
  "Cristiano Ronaldo": 2,
  "Virat Kohli":       2,
  "Zendaya":           2,
};

/* ====================================================== */
/* COMPONENT */
/* ====================================================== */

function HeroBanner() {
  const [inputTopic,        setInputTopic]        = useState("");
  const [selectedCelebrity, setSelectedCelebrity] = useState("");
  const [activeCelebrity,   setActiveCelebrity]   = useState(0);

  const { setTopic, setCelebrity } = useLessonStore();
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(
      () => setActiveCelebrity((p) => (p + 1) % heroCelebrities.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  const generateLesson = () => {
    if (!inputTopic.trim())   { alert("Please enter a topic");      return; }
    if (!selectedCelebrity)   { alert("Please choose a celebrity"); return; }
    setTopic(inputTopic);
    setCelebrity(selectedCelebrity);
    navigate(`/watch-course/${celebrityRoutes[selectedCelebrity] || 1}`);
  };

  const current = heroCelebrities[activeCelebrity];

  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[#080c18] pt-20">

      {/* ── Background ───────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -right-20 -top-20 h-[700px] w-[700px] rounded-full bg-indigo-600/10 blur-[160px]" />
        <div className="absolute -bottom-20 -left-20 h-[500px] w-[500px] rounded-full bg-violet-600/8  blur-[140px]" />
        <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-600/6 blur-[100px]" />
      </div>

      {/* ── Main grid ────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid max-w-7xl items-start gap-8 px-5 pb-16 pt-10 lg:grid-cols-[1fr_420px] lg:items-center lg:px-8">

        {/* ══ LEFT ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="flex flex-col"
        >
          {/* Badge */}
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-3.5 py-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-indigo-400" />
            </span>
            <span className="text-[11px] font-medium tracking-wide text-indigo-300">AI Celebrity Learning — Now Live</span>
          </div>

          {/* Headline */}
          <h1 className="mb-3 text-[42px] font-semibold leading-[1.12] tracking-[-1.5px] text-white lg:text-[54px]">
            Learn from your
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              favorite celebrities
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-5 max-w-[480px] text-[14px] leading-[1.75] text-white/45">
            Generate personalized AI-powered lessons taught in the voice and style of celebrities
            you actually admire. Pick a topic, pick a mentor, start learning.
          </p>

          {/* Feature pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            {featurePills.map((f) => (
              <div key={f} className="flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-3 py-1">
                <CheckCircle size={10} className="text-emerald-400" />
                <span className="text-[11px] text-white/50">{f}</span>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="mb-4 max-w-[480px]">
            <div className="flex items-center rounded-xl border border-white/10 bg-white/5 p-1.5 pl-4 shadow-[0_0_0_1px_rgba(99,102,241,0.08)] backdrop-blur-sm transition-all focus-within:border-indigo-500/40 focus-within:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]">
              <Search className="mr-3 h-4 w-4 shrink-0 text-white/25" />
              <input
                value={inputTopic}
                onChange={(e) => setInputTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && generateLesson()}
                placeholder="What do you want to learn today?"
                className="flex-1 bg-transparent py-2.5 text-[13px] text-white outline-none placeholder:text-white/22"
              />
              <button
                onClick={generateLesson}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-[12.5px] font-medium text-white transition-all duration-200 hover:bg-indigo-500 active:scale-95"
              >
                Generate
                <Zap size={12} />
              </button>
            </div>
          </div>

          {/* Celebrity chips */}
          <p className="mb-2.5 text-[11px] uppercase tracking-widest text-white/25">Choose your mentor</p>
          <div className="mb-7 flex flex-wrap gap-2">
            {celebrities.map((name) => (
              <button
                key={name}
                onClick={() => setSelectedCelebrity(name)}
                className={`rounded-full border px-4 py-1.5 text-[12px] font-medium transition-all duration-200 ${
                  selectedCelebrity === name
                    ? "border-indigo-400/50 bg-indigo-500/20 text-indigo-200 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
                    : "border-white/10 bg-white/[0.03] text-white/45 hover:border-white/20 hover:bg-white/6 hover:text-white/70"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* CTAs */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <button
              onClick={generateLesson}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[13px] font-semibold text-[#080c18] shadow-[0_4px_24px_rgba(255,255,255,0.12)] transition-all duration-200 hover:bg-white/92 hover:shadow-[0_4px_28px_rgba(255,255,255,0.18)] active:scale-95"
            >
              Explore AI Lessons
              <ArrowRight size={15} />
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-transparent px-5 py-3 text-[13px] text-white/50 transition-all duration-200 hover:border-white/18 hover:text-white/70">
              <Play size={13} />
              Watch demo
            </button>
          </div>

          {/* Stats + social proof */}
          <div className="flex flex-wrap items-center gap-6">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/5">
                      <Icon size={14} className="text-indigo-300" />
                    </div>
                    <div>
                      <div className="text-[17px] font-semibold leading-none tracking-tight text-white">{s.value}</div>
                      <div className="mt-0.5 text-[10px] text-white/30">{s.label}</div>
                    </div>
                  </div>
                  {i < stats.length - 1 && <div className="h-7 w-px bg-white/8" />}
                </div>
              );
            })}

            {/* Learner avatars */}
            <div className="flex items-center gap-2 border-l border-white/8 pl-6">
              <div className="flex -space-x-2">
                {recentLearners.map((l) => (
                  <div
                    key={l.initials}
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#080c18] text-[9px] font-semibold text-white"
                    style={{ background: l.color }}
                  >
                    {l.initials}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-white/35">+2.4k joined this week</span>
            </div>
          </div>
        </motion.div>

        {/* ══ RIGHT ═════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative flex flex-col gap-3"
        >
          {/* ── Celebrity card ── */}
          <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0e1428]">

            {/* Top meta bar */}
            <div className="flex items-center justify-between border-b border-white/6 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] text-white/40">Live AI Session</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-2.5 py-1">
                <Brain size={10} className="text-indigo-300" />
                <span className="text-[10px] text-indigo-300">{current.tag}</span>
              </div>
            </div>

            {/* Image area */}
            <div className="relative flex h-[300px] items-end justify-center overflow-hidden bg-gradient-to-b from-[#111827] to-[#0e1428]">
              {/* Glow under image */}
              <div className="absolute bottom-0 h-32 w-48 rounded-full bg-indigo-600/20 blur-3xl" />

              <AnimatePresence mode="wait">
                <motion.img
                  key={current.name}
                  src={current.image}
                  alt={current.name}
                  initial={{ opacity: 0, scale: 1.04, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -8 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 h-[280px] object-contain drop-shadow-[0_8px_40px_rgba(99,102,241,0.35)]"
                />
              </AnimatePresence>
            </div>

            {/* Name + course row */}
            <div className="flex items-center justify-between border-t border-white/6 px-4 py-3.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[14px] font-semibold text-white">{current.name}</div>
                  <div className="text-[11px] text-white/35">{current.course}</div>
                </motion.div>
              </AnimatePresence>

              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {heroCelebrities.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCelebrity(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeCelebrity
                        ? "h-1.5 w-5 bg-indigo-400"
                        : "h-1.5 w-1.5 bg-white/15 hover:bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Progress card ── */}
          <div className="rounded-xl border border-white/8 bg-[#0e1428] px-4 py-3.5">
            <div className="mb-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp size={13} className="text-emerald-400" />
                <span className="text-[12px] font-medium text-white">Your progress</span>
              </div>
              <span className="text-[11px] text-white/35">Lesson 3 of 12</span>
            </div>
            <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "25%" }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              />
            </div>
            <div className="text-[10px] text-white/28">25% complete · 9 lessons remaining</div>
          </div>

          {/* ── Course mini cards ── */}
          <div className="grid grid-cols-3 gap-2.5">
            {courseCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="flex flex-col gap-2 rounded-xl border border-white/8 bg-[#0e1428] px-3 py-3 transition-all duration-200 hover:border-indigo-500/25 hover:bg-indigo-500/5"
                >
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: `${card.color}22` }}
                  >
                    <Icon size={14} style={{ color: card.color }} />
                  </div>
                  <div className="text-[12px] font-medium text-white/80">{card.label}</div>
                  <div className="text-[10px] text-white/30">{card.lessons} lessons</div>
                </div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default HeroBanner;
