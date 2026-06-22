import { BookOpen, Zap, Code, Cpu, Flame, Cloud, BarChart3, Layers, Lock, Star } from 'lucide-react';

interface Badge {
  name: string;
  desc: string;
  icon: React.ReactNode;
  gradient: string;
  date: string;
  stars: number;
  rarity: string;
}

interface LockedBadge {
  name: string;
  requirement: string;
}

export function Badges() {
  const earnedBadges: Badge[] = [
    {
      name: 'First Step',
      desc: 'Enrolled in your first course',
      icon: <BookOpen size={30} />,
      gradient: 'from-[#00C97B] to-[#00B36C]',
      date: 'Earned Jan 2024',
      stars: 1,
      rarity: 'Common'
    },
    {
      name: 'Speed Learner',
      desc: 'Completed a course in under 2 days',
      icon: <Zap size={30} />,
      gradient: 'from-[#FF6B2B] to-[#FF8C42]',
      date: 'Earned Feb 2024',
      stars: 2,
      rarity: 'Uncommon'
    },
    {
      name: 'Python Pro',
      desc: 'Completed Python for Data Science',
      icon: <Code size={30} />,
      gradient: 'from-[#4F8EF7] to-[#2563EB]',
      date: 'Earned May 2024',
      stars: 2,
      rarity: 'Uncommon'
    },
    {
      name: 'AI Pioneer',
      desc: 'Completed 3 AI courses',
      icon: <Cpu size={30} />,
      gradient: 'from-[#7C3AED] to-[#5B21B6]',
      date: 'Earned Jul 2024',
      stars: 3,
      rarity: 'Rare'
    },
    {
      name: 'Streak Master',
      desc: 'Maintained a 7-day learning streak',
      icon: <Flame size={30} />,
      gradient: 'from-[#EF4444] to-[#B91C1C]',
      date: 'Earned Aug 2024',
      stars: 3,
      rarity: 'Rare'
    },
    {
      name: 'Cloud Walker',
      desc: 'Completed Cloud Computing',
      icon: <Cloud size={30} />,
      gradient: 'from-[#0891B2] to-[#0E7490]',
      date: 'Earned Oct 2024',
      stars: 2,
      rarity: 'Uncommon'
    },
    {
      name: 'Data Wizard',
      desc: 'Completed Data Science path',
      icon: <BarChart3 size={30} />,
      gradient: 'from-[#4F46E5] to-[#3730A3]',
      date: 'Earned Nov 2024',
      stars: 4,
      rarity: 'Epic'
    },
    {
      name: 'RAG Expert',
      desc: 'Mastered RAG projects',
      icon: <Layers size={30} />,
      gradient: 'from-[#DB2777] to-[#9D174D]',
      date: 'Earned Dec 2024',
      stars: 4,
      rarity: 'Epic'
    }
  ];

  const lockedBadges: LockedBadge[] = [
    { name: 'Super Scholar', requirement: 'Complete 10 courses' },
    { name: 'Night Owl', requirement: 'Complete lessons after midnight' },
    { name: 'Perfect Score', requirement: 'Get 100% on 3 assessments' },
    { name: 'B2B Pioneer', requirement: 'Create an enterprise team profile' }
  ];

  return (
    <div className="max-w-[1280px] mx-auto font-sans text-white">
      {/* Header */}
      <div className="border-b border-[#1E2D45] pb-6 mb-8">
        <h1 className="text-[28px] font-bold text-white leading-none mb-2">My Badges</h1>
        <p className="text-[14px] text-[#9CA3AF] font-medium mb-5">
          8 of 24 badges earned. Complete courses to unlock more!
        </p>

        {/* Progress row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full h-[8px] bg-[#1A2540] border border-[#1E2D45] rounded-full overflow-hidden">
            <div className="h-full bg-[#00C97B] rounded-full transition-all duration-300 w-[33%]" />
          </div>
          <span className="text-[13px] text-[#00E88A] font-bold sm:w-[90px] text-right leading-none select-none">
            33% Complete
          </span>
        </div>
      </div>

      {/* Earned Badges */}
      <div>
        <h2 className="text-[18px] font-bold text-white mb-6 flex items-center gap-2 select-none">
          <span>🏅</span> Earned Badges (8)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {earnedBadges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-[#111827] border border-[#1E2D45] rounded-[16px] p-6 flex flex-col items-center text-center shadow-sm hover:border-[#FF6B2B]/40 hover:shadow-[0_4px_20px_rgba(255,107,43,0.08)] transition-all duration-300 group active:scale-[0.97]"
            >
              {/* Icon Container */}
              <div className={`w-[72px] h-[72px] rounded-full bg-gradient-to-br ${badge.gradient} text-white flex items-center justify-center shadow-md select-none transform group-hover:scale-105 transition-transform`}>
                {badge.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="text-[14px] font-bold text-white mt-4 mb-1">
                {badge.name}
              </h3>
              <p className="text-[12px] text-[#9CA3AF] leading-relaxed line-clamp-2 min-h-[36px]">
                {badge.desc}
              </p>

              {/* Earned Date */}
              <span className="text-[11px] text-[#9CA3AF] font-bold mt-2.5">
                {badge.date}
              </span>

              {/* Star Rating & Rarity */}
              <div className="mt-3 flex flex-col items-center gap-0.5 select-none">
                <div className="flex gap-0.5 text-[#FF8C42]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={11} 
                      fill={i < badge.stars ? 'currentColor' : 'none'} 
                      className={i < badge.stars ? 'text-[#FF8C42]' : 'text-[#1E2D45]'}
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#FF6B2B] mt-0.5">
                  {badge.rarity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Section */}
      <div className="mt-12 border-t border-[#1E2D45] pt-10">
        <h2 className="text-[18px] font-bold text-[#9CA3AF] mb-6 flex items-center gap-2 select-none">
          <span>🔒</span> Locked Badges (16)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {lockedBadges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-[#111827]/50 border border-[#1E2D45] rounded-[16px] p-6 flex flex-col items-center text-center shadow-sm relative group select-none cursor-help overflow-hidden"
            >
              {/* Hover Tooltip */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[90%] bg-[#1A2540] border border-[#1E2D45] text-white text-[11px] font-semibold px-2 py-2 rounded-[8px] shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 transition-all duration-200 pointer-events-none text-center z-20 scale-95 group-hover:scale-100 group-focus-within:scale-100 group-active:scale-100">
                Complete {badge.requirement} to unlock this badge
              </div>

              {/* Icon Container */}
              <div className="w-[72px] h-[72px] rounded-full bg-[#1A2540] text-[#9CA3AF] flex items-center justify-center border border-[#1E2D45] shadow-inner">
                <Lock size={26} className="text-[#FF6B2B]" />
              </div>

              {/* Title & Desc */}
              <h3 className="text-[14px] font-bold text-[#9CA3AF] mt-4 mb-1">
                {badge.name}
              </h3>
              <p className="text-[12px] text-[#9CA3AF]/60 leading-relaxed line-clamp-2 min-h-[36px]">
                Hover to reveal the unlock requirement
              </p>

              {/* Earned Date Placeholder */}
              <span className="text-[11px] text-[#9CA3AF]/60 font-medium mt-2.5">
                Locked
              </span>

              {/* Star Rating Placeholder */}
              <div className="mt-3 flex gap-0.5 text-[#1E2D45]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill="none" className="text-[#1E2D45]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Badges;
