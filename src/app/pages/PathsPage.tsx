import { useState, useMemo } from 'react';
import { Briefcase, Clock, Award, BookOpen, Star, BarChart, ArrowRight } from 'lucide-react';

interface Path {
  id: string;
  category: string;
  title: string;
  description: string;
  coursesCount: number;
  hours: number;
  lessons: number;
  level: string;
  rating: number;
  enrolled: string;
  instructors: string[];
  gradient: string;
  icon: React.ReactNode;
}

export function PathsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'AI & ML',
    'Data Science',
    'Web Dev',
    'Cloud',
    'Prompt Engineering',
    'Analytics'
  ];

  const paths: Path[] = [
    {
      id: 'path-1',
      category: 'AI & ML',
      title: 'AI Engineering Mastery',
      description: 'Master deep learning, neural networks, and LLM application development from foundational concepts to production.',
      coursesCount: 8,
      hours: 48,
      lessons: 64,
      level: 'Advanced',
      rating: 4.8,
      enrolled: '12.4k',
      instructors: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#2D1B69] to-[#7C3AED]',
      icon: <Briefcase className="w-10 h-10 text-white" />
    },
    {
      id: 'path-2',
      category: 'Data Science',
      title: 'Data Science Fundamentals',
      description: 'Learn SQL, Python programming, statistics, and machine learning workflows to query, analyze, and model complex datasets.',
      coursesCount: 6,
      hours: 36,
      lessons: 45,
      level: 'Beginner',
      rating: 4.6,
      enrolled: '24.1k',
      instructors: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#1E3A8A] to-[#3B82F6]',
      icon: <BarChart className="w-10 h-10 text-white" />
    },
    {
      id: 'path-3',
      category: 'AI & ML',
      title: 'Generative AI Developer',
      description: 'Build state-of-the-art AI apps using LangChain, vector databases, RAG architectures, and custom cognitive agents.',
      coursesCount: 5,
      hours: 30,
      lessons: 38,
      level: 'Intermediate',
      rating: 4.9,
      enrolled: '18.9k',
      instructors: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#065F46] to-[#10B981]',
      icon: <Award className="w-10 h-10 text-white" />
    },
    {
      id: 'path-4',
      category: 'Prompt Engineering',
      title: 'Prompt Engineering Specialization',
      description: 'Master advanced prompting structures, dynamic prompt templates, context injection, and cognitive playground techniques.',
      coursesCount: 4,
      hours: 20,
      lessons: 26,
      level: 'Beginner',
      rating: 4.7,
      enrolled: '31.2k',
      instructors: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#7C2D12] to-[#F97316]',
      icon: <BookOpen className="w-10 h-10 text-white" />
    },
    {
      id: 'path-5',
      category: 'AI & ML',
      title: 'ML Engineer Path',
      description: 'Deploy, monitor, scale, and orchestrate ML models using modern MLOps pipelines and serverless server instances.',
      coursesCount: 7,
      hours: 42,
      lessons: 52,
      level: 'Advanced',
      rating: 4.8,
      enrolled: '9.6k',
      instructors: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#581C87] to-[#C084FC]',
      icon: <Briefcase className="w-10 h-10 text-white" />
    },
    {
      id: 'path-6',
      category: 'Cloud',
      title: 'Cloud Architect Path',
      description: 'Design highly available, scalable, fault-tolerant, and secure systems in multi-cloud enterprise environments.',
      coursesCount: 6,
      hours: 38,
      lessons: 48,
      level: 'Intermediate',
      rating: 4.7,
      enrolled: '14.5k',
      instructors: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#1E1B4B] to-[#4F46E5]',
      icon: <Star className="w-10 h-10 text-white" />
    }
  ];

  const filteredPaths = useMemo(() => {
    if (activeCategory === 'All') return paths;
    return paths.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-white pt-[80px] pb-16 px-6 text-center">
        <div className="max-w-[1280px] mx-auto">
          <span className="inline-block bg-[#EDE9FF] text-[#2D1B69] text-[12px] font-bold tracking-widest px-3 py-1 rounded-[6px] uppercase mb-4">
            Learning Paths
          </span>
          <h1 className="text-[52px] font-bold text-[#1A1A2E] leading-[1.1] mb-4">
            Your roadmap to mastery.
          </h1>
          <p className="text-[18px] text-[#6B6B80] max-w-[560px] mx-auto mb-8 leading-relaxed">
            Curated multi-course journeys designed to take you from beginner to job-ready.
          </p>

          {/* Stat Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-white border border-[#E2E1F0] px-4 py-2.5 rounded-[10px] shadow-sm">
              <Briefcase size={16} className="text-[#2D1B69]" />
              <span className="text-[14px] font-bold text-[#1A1A2E]">12 Career Paths</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#E2E1F0] px-4 py-2.5 rounded-[10px] shadow-sm">
              <Clock size={16} className="text-[#2D1B69]" />
              <span className="text-[14px] font-bold text-[#1A1A2E]">300+ Hours Content</span>
            </div>
            <div className="flex items-center gap-2 bg-white border border-[#E2E1F0] px-4 py-2.5 rounded-[10px] shadow-sm">
              <Award size={16} className="text-[#2D1B69]" />
              <span className="text-[14px] font-bold text-[#1A1A2E]">Expert Curated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Career Filter Row */}
      <div className="px-6 pb-2">
        <div className="max-w-[1280px] mx-auto flex justify-center overflow-x-auto py-1 hide-scrollbar">
          <div className="flex gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`h-[36px] px-5 rounded-full text-[14px] font-semibold border transition-all cursor-pointer whitespace-nowrap flex items-center justify-center ${
                  activeCategory === category
                    ? 'bg-[#2D1B69] border-[#2D1B69] text-[#BBFF00] shadow-sm'
                    : 'bg-white border-[#E2E1F0] text-[#6B6B80] hover:bg-[#F7F6F3] hover:text-[#1A1A2E]'
                }`}
              >
                {category === 'All' ? 'All Paths' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Paths Grid */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPaths.map((path) => (
              <div 
                key={path.id} 
                className="group flex flex-col bg-white rounded-[16px] border border-[#E2E1F0] overflow-hidden hover:border-[#2D1B69] hover:shadow-[0_8px_24px_rgba(45,27,105,0.08)] transition-all duration-300 cursor-pointer"
              >
                {/* Top Banner */}
                <div className={`h-[120px] bg-gradient-to-r ${path.gradient} relative p-5 flex items-center justify-center`}>
                  {path.icon}
                  <span className="absolute top-4 right-4 bg-white text-[#2D1B69] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[10px] shadow-sm">
                    {path.coursesCount} Courses
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Career tag */}
                    <span className="inline-block bg-[#EDE9FF] text-[#2D1B69] text-[11px] font-bold px-2 py-0.5 rounded-[4px] mb-3">
                      {path.category}
                    </span>

                    {/* Path Title */}
                    <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2 leading-snug group-hover:text-[#2D1B69] transition-colors">
                      {path.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] text-[#6B6B80] mb-4 leading-relaxed line-clamp-2">
                      {path.description}
                    </p>

                    {/* Instructors */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex -space-x-1.5">
                        {path.instructors.map((avatar, idx) => (
                          <img
                            key={idx}
                            src={avatar}
                            alt="Instructor"
                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>
                      <span className="text-[13px] text-[#6B6B80] font-medium">
                        by {path.coursesCount - 2} instructors
                      </span>
                    </div>
                  </div>

                  <div>
                    {/* Progress Row */}
                    <div className="flex items-center justify-between text-[13px] text-[#6B6B80] bg-[#F7F6F3] p-2.5 rounded-[8px] mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-[#6B6B80]" />
                        <span>{path.hours} Hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} className="text-[#6B6B80]" />
                        <span>{path.lessons} Lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart size={14} className="text-[#6B6B80]" />
                        <span className="font-semibold text-[#1A1A2E]">{path.level}</span>
                      </div>
                    </div>

                    <div className="border-t border-[#E2E1F0] my-3"></div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-[#F59E0B] text-[#F59E0B]" />
                        <span className="text-[14px] font-bold text-[#1A1A2E]">{path.rating}</span>
                        <span className="text-[13px] text-[#6B6B80]">({path.enrolled})</span>
                      </div>
                      <span className="flex items-center gap-1 text-[14px] font-bold text-[#2D1B69] hover:underline">
                        Start Path <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
