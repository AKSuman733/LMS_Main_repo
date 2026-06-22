import { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router';
import { Briefcase, Clock, Award, BookOpen, Star, BarChart, ArrowRight } from 'lucide-react';

interface Path {
  id: string;
  courseId: string;
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
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

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
      courseId: 'course-5',
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
      gradient: 'from-[#581C87] to-[#7C3AED]', // purple
      icon: <Briefcase className="w-10 h-10 text-white" />
    },
    {
      id: 'path-2',
      courseId: 'course-6',
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
      gradient: 'from-[#1E3A8A] to-[#4F8EF7]', // blue
      icon: <BarChart className="w-10 h-10 text-white" />
    },
    {
      id: 'path-3',
      courseId: 'course-7',
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
      gradient: 'from-[#2D1B69] to-[#7C3AED]', // purple
      icon: <Award className="w-10 h-10 text-white" />
    },
    {
      id: 'path-4',
      courseId: 'course-8',
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
      gradient: 'from-[#055030] to-[#00C97B]', // green
      icon: <BookOpen className="w-10 h-10 text-white" />
    },
    {
      id: 'path-5',
      courseId: 'course-15',
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
      gradient: 'from-[#6B1D5F] to-[#7C3AED]', // purple
      icon: <Briefcase className="w-10 h-10 text-white" />
    },
    {
      id: 'path-6',
      courseId: 'course-16',
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
      gradient: 'from-[#0A2E5C] to-[#4F8EF7]', // blue
      icon: <Star className="w-10 h-10 text-white" />
    },
    {
      id: 'path-7',
      courseId: 'course-13',
      category: 'Web Dev',
      title: 'Full-Stack Web Development',
      description: 'Master HTML, CSS, JavaScript, React, Node.js, and database systems to build and deploy robust web applications.',
      coursesCount: 5,
      hours: 32,
      lessons: 40,
      level: 'Beginner',
      rating: 4.7,
      enrolled: '15.6k',
      instructors: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#055030] to-[#00C97B]', // green
      icon: <Briefcase className="w-10 h-10 text-white" />
    },
    {
      id: 'path-9',
      courseId: 'course-13',
      category: 'Web Dev',
      title: 'React Framework Masterclass',
      description: 'Deep dive into React 19, server components, and performance optimization techniques for modern frontends.',
      coursesCount: 5,
      hours: 22,
      lessons: 28,
      level: 'Intermediate',
      rating: 4.8,
      enrolled: '12.2k',
      instructors: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#055030] to-[#00C97B]', // green
      icon: <BookOpen className="w-10 h-10 text-white" />
    },
    {
      id: 'path-10',
      courseId: 'course-13',
      category: 'Web Dev',
      title: 'Backend Engineering Path',
      description: 'Master Node.js, Express, SQL/NoSQL databases, and system design for highly scalable APIs.',
      coursesCount: 6,
      hours: 28,
      lessons: 36,
      level: 'Advanced',
      rating: 4.9,
      enrolled: '8.5k',
      instructors: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#055030] to-[#00C97B]', // green
      icon: <Award className="w-10 h-10 text-white" />
    },
    {
      id: 'path-8',
      courseId: 'course-14',
      category: 'Analytics',
      title: 'Business Analytics & Data Insights',
      description: 'Learn data analysis, business intelligence, visualization tools like Tableau, SQL, and predictive analytics.',
      coursesCount: 4,
      hours: 24,
      lessons: 30,
      level: 'Beginner',
      rating: 4.5,
      enrolled: '11.2k',
      instructors: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#055030] to-[#00C97B]', // green
      icon: <BarChart className="w-10 h-10 text-white" />
    },
    {
      id: 'path-11',
      courseId: 'course-14',
      category: 'Analytics',
      title: 'Advanced Data Visualization',
      description: 'Master Tableau, PowerBI, and custom data storytelling techniques for complex corporate data dashboards.',
      coursesCount: 4,
      hours: 18,
      lessons: 24,
      level: 'Intermediate',
      rating: 4.7,
      enrolled: '9.1k',
      instructors: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#055030] to-[#00C97B]', // green
      icon: <Award className="w-10 h-10 text-white" />
    },
    {
      id: 'path-12',
      courseId: 'course-14',
      category: 'Analytics',
      title: 'Financial Analytics & Modeling',
      description: 'Learn financial modeling, forecasting, risk analysis, and corporate valuation using data models.',
      coursesCount: 5,
      hours: 26,
      lessons: 32,
      level: 'Advanced',
      rating: 4.6,
      enrolled: '7.8k',
      instructors: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80'
      ],
      gradient: 'from-[#055030] to-[#00C97B]', // green
      icon: <BookOpen className="w-10 h-10 text-white" />
    }
  ];

  const filteredPaths = useMemo(() => {
    if (activeCategory === 'All') return paths;
    return paths.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="bg-[#0A0F1E] min-h-screen text-white">
      {/* Hero Section */}
      <section className={`pt-[80px] pb-16 px-6 text-center ${isDashboard ? 'hidden' : 'block bg-[#0A0F1E]'}`}>
        <div className="max-w-[1280px] mx-auto">
          <span className="inline-block bg-[#FF6B2B]/20 text-[#FF6B2B] text-[11px] font-bold tracking-widest px-3 py-1 rounded-[6px] uppercase mb-4 border border-[#FF6B2B]/30">
            Learning Paths
          </span>
          <h1 className="text-[52px] font-bold text-white leading-[1.1] mb-4">
            Your roadmap to mastery.
          </h1>
          <p className="text-[18px] text-[#9CA3AF] max-w-[560px] mx-auto mb-8 leading-relaxed">
            Curated multi-course journeys designed to take you from beginner to job-ready.
          </p>

          {/* Stat Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center gap-2 bg-[#111827] border border-[#1E2D45] px-4 py-2.5 rounded-[10px] shadow-sm">
              <Briefcase size={16} className="text-[#FF6B2B]" />
              <span className="text-[14px] font-bold text-white">12 Career Paths</span>
            </div>
            <div className="flex items-center gap-2 bg-[#111827] border border-[#1E2D45] px-4 py-2.5 rounded-[10px] shadow-sm">
              <Clock size={16} className="text-[#FF6B2B]" />
              <span className="text-[14px] font-bold text-white">300+ Hours Content</span>
            </div>
            <div className="flex items-center gap-2 bg-[#111827] border border-[#1E2D45] px-4 py-2.5 rounded-[10px] shadow-sm">
              <Award size={16} className="text-[#FF6B2B]" />
              <span className="text-[14px] font-bold text-white">Expert Curated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Top Header Element */}
      {isDashboard && (
        <div className="flex justify-between items-center border-b border-[#1E2D45] pb-5 mb-8">
          <div>
            <div className="inline-flex h-[24px] px-3.5 border border-[#4F8EF7] text-[#4F8EF7] font-bold text-[10px] rounded-full items-center uppercase tracking-wider mb-2">
              Learning Paths
            </div>
            <h1 className="text-[28px] font-bold text-white leading-none">Learning Paths</h1>
            <p className="text-[14px] text-[#9CA3AF] mt-1.5">
              Explore step-by-step career programs curated by field experts.
            </p>
          </div>
        </div>
      )}

      {/* Career Filter Row */}
      <div className="px-6 pb-2">
        <div className="max-w-[1280px] mx-auto flex justify-center overflow-x-auto py-1 hide-scrollbar">
          <div className="flex gap-2.5">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`h-[36px] px-5 rounded-full text-[13px] font-bold border transition-all cursor-pointer whitespace-nowrap flex items-center justify-center ${
                    isActive
                      ? 'bg-[#FF6B2B] border-[#FF6B2B] text-white shadow-sm'
                      : 'bg-transparent border-[#1E2D45] text-[#9CA3AF] hover:text-white hover:border-[#FF6B2B]'
                  }`}
                >
                  {category === 'All' ? 'All Paths' : category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Paths Grid */}
      <section className="py-12 px-6 bg-[#0A0F1E]">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPaths.map((path) => (
              <div 
                key={path.id} 
                className="group flex flex-col bg-[#111827] rounded-[12px] border border-[#1E2D45] overflow-hidden hover:border-[#FF6B2B] transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,107,43,0.15)]"
              >
                {/* Top Banner */}
                <div className={`h-[120px] bg-gradient-to-r ${path.gradient} relative p-5 flex items-center justify-center`}>
                  {path.icon}
                  <span className="absolute top-4 right-4 bg-[#111827] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[10px] border border-[#1E2D45]">
                    {path.coursesCount} Courses
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Career tag */}
                    <span className="inline-block bg-[#FF6B2B]/10 text-[#FF6B2B] text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3 border border-[#FF6B2B]/20">
                      {path.category}
                    </span>

                    {/* Path Title */}
                    <h3 className="text-[18px] font-bold text-white mb-2 leading-snug group-hover:text-[#FF6B2B] transition-colors">
                      {path.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[14px] text-[#9CA3AF] mb-4 leading-relaxed line-clamp-2">
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
                            className="w-7 h-7 rounded-full border border-[#111827] object-cover"
                          />
                        ))}
                      </div>
                      <span className="text-[13px] text-[#9CA3AF] font-medium">
                        by {path.coursesCount - 2} instructors
                      </span>
                    </div>
                  </div>

                  <div>
                    {/* Progress Row */}
                    <div className="flex items-center justify-between text-[13px] text-[#9CA3AF] bg-[#1A2540] p-2.5 rounded-[8px] mb-4 border border-[#1E2D45]">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-[#9CA3AF]" />
                        <span>{path.hours} Hours</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={14} className="text-[#9CA3AF]" />
                        <span>{path.lessons} Lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BarChart size={14} className="text-[#9CA3AF]" />
                        <span className="font-semibold text-white">{path.level}</span>
                      </div>
                    </div>

                    <div className="border-t border-[#1E2D45] my-3"></div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star size={16} className="fill-[#FF8C42] text-[#FF8C42]" />
                        <span className="text-[14px] font-bold text-white">{path.rating}</span>
                        <span className="text-[13px] text-[#9CA3AF]">({path.enrolled})</span>
                      </div>
                      <Link 
                        to={isDashboard ? `/course/${path.courseId}/learn` : `/course/${path.courseId}`}
                        className="flex items-center gap-1 text-[13px] font-bold text-[#FF6B2B] border border-[#FF6B2B] px-3.5 py-1.5 rounded-lg hover:bg-[#FF6B2B] hover:text-white transition-all active:scale-[0.97]"
                      >
                        Start Path <ArrowRight size={14} />
                      </Link>
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

export default PathsPage;

