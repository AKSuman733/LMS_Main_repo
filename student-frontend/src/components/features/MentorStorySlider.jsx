import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star, Gift } from "lucide-react";

import mentor1 from "../../assets/mentors/mentor1.jpg";
import mentor2 from "../../assets/mentors/mentor2.jpg";
import mentor3 from "../../assets/mentors/mentor3.jpg";

const stories = [
  {
    id: 1,
    image: mentor1,
    title: "Discipline Mentor",
    subtitle: "Learn focus, consistency and winning mindset",
    badge: "Sports Mentor",
    rating: "4.9 Rating",
  },
  {
    id: 2,
    image: mentor2,
    title: "Innovation Mentor",
    subtitle: "Build startup thinking and future-ready skills",
    badge: "CEO Mentor",
    rating: "4.8 Rating",
  },
  {
    id: 3,
    image: mentor3,
    title: "Leadership Mentor",
    subtitle: "Learn calm decision making and leadership",
    badge: "Captain Mentor",
    rating: "5.0 Rating",
  },
];

export default function MentorStorySlider() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  const nextStory = () => {
    setActive((prev) => (prev + 1) % stories.length);
    setProgress(0);
  };

  const prevStory = () => {
    setActive((prev) => (prev - 1 + stories.length) % stories.length);
    setProgress(0);
  };

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextStory();
          return 0;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(progressTimer);
  }, [active]);

  const current = stories[active];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-slate-900/80 p-4 shadow-2xl shadow-cyan-500/10">
        <div className="absolute left-6 right-6 top-6 z-20 h-1 overflow-hidden rounded-full bg-white/30">
          <div
            className="h-full rounded-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <img
          src={current.image}
          alt={current.title}
          className="h-[420px] w-full rounded-[1.5rem] object-cover"
        />

        <button
          onClick={prevStory}
          className="absolute left-7 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextStory}
          className="absolute right-7 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition hover:bg-black/70"
        >
          <ChevronRight />
        </button>

        <div className="absolute right-8 top-16 z-30 flex items-center gap-2 rounded-2xl bg-orange-400 px-5 py-3 font-bold text-white shadow-lg">
          <Gift size={18} />
          Use SKILL25
        </div>

        <div className="absolute right-8 bottom-36 z-30 flex items-center gap-2 rounded-2xl bg-purple-500 px-5 py-3 font-bold text-white shadow-lg">
          <Star size={18} />
          {current.rating}
        </div>

        <div className="absolute bottom-8 left-8 right-8 z-30 rounded-[1.5rem] bg-black/60 p-5 backdrop-blur-xl">
          <span className="rounded-full bg-cyan-400/20 px-4 py-1 text-sm font-semibold text-cyan-300">
            {current.badge}
          </span>
          <h3 className="mt-3 text-2xl font-bold text-white">{current.title}</h3>
          <p className="mt-1 text-sm text-slate-300">{current.subtitle}</p>
        </div>
      </div>

      <div className="mt-5 flex justify-center gap-3">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => {
              setActive(index);
              setProgress(0);
            }}
            className={`h-3 w-3 rounded-full transition ${
              active === index ? "w-8 bg-cyan-400" : "bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}