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
      gradient: 'from-[#10B981] to-[#059669]',
      date: 'Earned Jan 2024',
      stars: 1,
      rarity: 'Common'
    },
    {
      name: 'Speed Learner',
      desc: 'Completed a course in under 2 days',
      icon: <Zap size={30} />,
      gradient: 'from-[#F59E0B] to-[#D97706]',
      date: 'Earned Feb 2024',
      stars: 2,
      rarity: 'Uncommon'
    },
    {
      name: 'Python Pro',
      desc: 'Completed Python for Data Science',
      icon: <Code size={30} />,
      gradient: 'from-[#3B82F6] to-[#2563EB]',
      date: 'Earned May 2024',
      stars: 2,
      rarity: 'Uncommon'
    },
    {
      name: 'AI Pioneer',
      desc: 'Completed 3 AI courses',
      icon: <Cpu size={30} />,
      gradient: 'from-[#8B5CF6] to-[#7C3AED]',
      date: 'Earned Jul 2024',
      stars: 3,
      rarity: 'Rare'
    },
    {
      name: 'Streak Master',
      desc: 'Maintained a 7-day learning streak',
      icon: <Flame size={30} />,
      gradient: 'from-[#EF4444] to-[#DC2626]',
      date: 'Earned Aug 2024',
      stars: 3,
      rarity: 'Rare'
    },
    {
      name: 'Cloud Walker',
      desc: 'Completed Cloud Computing',
      icon: <Cloud size={30} />,
      gradient: 'from-[#06B6D4] to-[#0891B2]',
      date: 'Earned Oct 2024',
      stars: 2,
      rarity: 'Uncommon'
    },
    {
      name: 'Data Wizard',
      desc: 'Completed Data Science path',
      icon: <BarChart3 size={30} />,
      gradient: 'from-[#6366F1] to-[#4F46E5]',
      date: 'Earned Nov 2024',
      stars: 4,
      rarity: 'Epic'
    },
    {
      name: 'RAG Expert',
      desc: 'Mastered RAG projects',
      icon: <Layers size={30} />,
      gradient: 'from-[#EC4899] to-[#DB2777]',
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
    <div className="max-w-[1280px] mx-auto bg-white rounded-[16px] border border-[#E2E1F0] p-6 md:p-10 shadow-[0_4px_24px_rgba(45,27,105,0.02)]">
      {/* Header */}
      <div className="border-b border-[#E2E1F0] pb-6 mb-8">
        <h1 className="text-[28px] font-bold text-[#1A1A2E] leading-none mb-2">My Badges</h1>
        <p className="text-[14px] text-[#6B6B80] font-medium mb-5">
          8 of 24 badges earned. Complete courses to unlock more!
        </p>

        {/* Progress row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full h-[8px] bg-[#E2E1F0] rounded-full overflow-hidden">
            <div className="h-full bg-[#2D1B69] rounded-full transition-all duration-300 w-[33%]" />
          </div>
          <span className="text-[13px] text-[#2D1B69] font-bold sm:w-[90px] text-right leading-none select-none">
            33% Complete
          </span>
        </div>
      </div>

      {/* Earned Badges */}
      <div>
        <h2 className="text-[18px] font-bold text-[#1A1A2E] mb-6 flex items-center gap-2 select-none">
          <span>🏅</span> Earned Badges (8)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {earnedBadges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#E2E1F0] rounded-[16px] p-6 flex flex-col items-center text-center shadow-sm hover:border-[#2D1B69] hover:shadow-[0_8px_24px_rgba(45,27,105,0.06)] transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className={`w-[72px] h-[72px] rounded-full bg-gradient-to-br ${badge.gradient} text-white flex items-center justify-center shadow-md select-none transform group-hover:scale-105 transition-transform`}>
                {badge.icon}
              </div>

              {/* Title & Desc */}
              <h3 className="text-[14px] font-bold text-[#1A1A2E] mt-4 mb-1">
                {badge.name}
              </h3>
              <p className="text-[12px] text-[#6B6B80] leading-relaxed line-clamp-2 min-h-[36px]">
                {badge.desc}
              </p>

              {/* Earned Date */}
              <span className="text-[11px] text-[#6B6B80] font-bold mt-2.5">
                {badge.date}
              </span>

              {/* Star Rating & Rarity */}
              <div className="mt-3 flex flex-col items-center gap-0.5 select-none">
                <div className="flex gap-0.5 text-[#F59E0B]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={11} 
                      fill={i < badge.stars ? 'currentColor' : 'none'} 
                      className={i < badge.stars ? 'text-[#F59E0B]' : 'text-slate-300'}
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#2D1B69] mt-0.5">
                  {badge.rarity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Locked Section */}
      <div className="mt-12 border-t border-[#E2E1F0] pt-10">
        <h2 className="text-[18px] font-bold text-[#6B6B80] mb-6 flex items-center gap-2 select-none">
          <span>🔒</span> Locked Badges (16)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {lockedBadges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-[#F7F6F3] border border-[#E2E1F0] rounded-[16px] p-6 flex flex-col items-center text-center shadow-sm relative group select-none cursor-help overflow-hidden"
            >
              {/* Hover Tooltip */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[90%] bg-[#1A1A2E] text-white text-[11px] font-bold px-2 py-2 rounded-[8px] shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 transition-all duration-200 pointer-events-none text-center z-20 scale-95 group-hover:scale-100 group-focus-within:scale-100 group-active:scale-100">
                Complete {badge.requirement} to unlock this badge
              </div>

              {/* Icon Container */}
              <div className="w-[72px] h-[72px] rounded-full bg-slate-200 text-[#6B6B80] flex items-center justify-center border border-slate-300 shadow-inner">
                <Lock size={26} />
              </div>

              {/* Title & Desc */}
              <h3 className="text-[14px] font-bold text-[#6B6B80] mt-4 mb-1">
                {badge.name}
              </h3>
              <p className="text-[12px] text-slate-400 leading-relaxed line-clamp-2 min-h-[36px]">
                Hover to reveal the unlock requirement
              </p>

              {/* Earned Date Placeholder */}
              <span className="text-[11px] text-slate-400 font-medium mt-2.5">
                Locked
              </span>

              {/* Star Rating Placeholder */}
              <div className="mt-3 flex gap-0.5 text-slate-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={11} fill="none" className="text-slate-200" />
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
