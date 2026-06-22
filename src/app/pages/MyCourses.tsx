import { useState } from 'react';
import { Link } from 'react-router';
import { User, Award, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  lessonsDone: number;
  totalLessons: number;
  tags: string[];
  status: 'In Progress' | 'Completed';
}

export function MyCourses() {
  const [activeTab, setActiveTab] = useState<'All' | 'In Progress' | 'Completed'>('All');

  const [courses] = useState<Course[]>([
    {
      id: 'course-1',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200',
      progress: 65,
      lessonsDone: 12,
      totalLessons: 18,
      tags: ['AI', 'ML'],
      status: 'In Progress',
    },
    {
      id: 'course-2',
      title: 'Full-Stack Web Development',
      instructor: 'James Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200',
      progress: 42,
      lessonsDone: 19,
      totalLessons: 45,
      tags: ['React', 'Node.js'],
      status: 'In Progress',
    },
    {
      id: 'course-3',
      title: 'Python for Data Science',
      instructor: 'Dr. Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
      progress: 100,
      lessonsDone: 24,
      totalLessons: 24,
      tags: ['Python', 'Data Science'],
      status: 'Completed',
    },
    {
      id: 'course-4',
      title: 'RAG Projects',
      instructor: 'Alex Rivera',
      thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200',
      progress: 100,
      lessonsDone: 15,
      totalLessons: 15,
      tags: ['AI', 'Vector DB'],
      status: 'Completed',
    },
    {
      id: 'course-5',
      title: 'Generative AI Basics',
      instructor: 'Elena Rostova',
      thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=200',
      progress: 100,
      lessonsDone: 10,
      totalLessons: 10,
      tags: ['AI', 'Intro'],
      status: 'Completed',
    },
    {
      id: 'course-6',
      title: 'LLMOps Advanced',
      instructor: 'Marcus Brody',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=200',
      progress: 100,
      lessonsDone: 18,
      totalLessons: 18,
      tags: ['LLMOps', 'Infrastructure'],
      status: 'Completed',
    },
    {
      id: 'course-7',
      title: 'Deep Learning',
      instructor: 'Dr. Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=200',
      progress: 100,
      lessonsDone: 30,
      totalLessons: 30,
      tags: ['Deep Learning', 'Neural Net'],
      status: 'Completed',
    },
    {
      id: 'course-8',
      title: 'Cloud Computing',
      instructor: 'Devon Patel',
      thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=200',
      progress: 100,
      lessonsDone: 20,
      totalLessons: 20,
      tags: ['AWS', 'Cloud'],
      status: 'Completed',
    },
  ]);

  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'In Progress') return c.status === 'In Progress';
    if (activeTab === 'Completed') return c.status === 'Completed';
    return true;
  });

  const countTab = (tab: 'All' | 'In Progress' | 'Completed') => {
    if (tab === 'In Progress') return courses.filter((c) => c.status === 'In Progress').length;
    if (tab === 'Completed') return courses.filter((c) => c.status === 'Completed').length;
    return courses.length;
  };

  return (
    <div className="max-w-[1280px] mx-auto bg-white rounded-[16px] border border-[#E2E1F0] p-6 md:p-10 shadow-[0_4px_24px_rgba(45,27,105,0.02)]">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#E2E1F0] pb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#1A1A2E] leading-none mb-2">My Courses</h1>
          <p className="text-[14px] text-[#6B6B80] font-medium">
            Track your learning progress across all enrolled courses.
          </p>
        </div>
        <Link 
          to="/courses" 
          className="text-[#2D1B69] text-[14px] font-bold hover:underline select-none sm:text-right"
        >
          Browse more courses
        </Link>
      </div>

      {/* Tab Filter Row */}
      <div className="flex gap-2.5 mt-8 border-b border-[#E2E1F0]/60 pb-4">
        {(['All', 'In Progress', 'Completed'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-[36px] px-4 rounded-full text-[13px] font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#2D1B69] text-white shadow-sm'
                  : 'bg-white border border-[#E2E1F0] text-[#6B6B80] hover:bg-[#F7F6F3]'
              }`}
            >
              {tab} ({countTab(tab)})
            </button>
          );
        })}
      </div>

      {/* Course List */}
      <div className="mt-8 space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-[#E2E1F0] rounded-[12px] p-5 flex flex-col md:flex-row items-stretch gap-5 hover:border-[#2D1B69] hover:shadow-[0_4px_16px_rgba(45,27,105,0.04)] transition-all duration-200"
            >
              {/* Left Thumbnail */}
              <div className="w-full md:w-[120px] h-[80px] flex-shrink-0 rounded-[8px] overflow-hidden border">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <h3 className="text-[16px] font-bold text-[#1A1A2E] leading-snug">
                      {course.title}
                    </h3>
                    <div className="flex gap-1.5">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#EDE9FF] text-[#2D1B69] text-[10px] font-extrabold px-1.5 py-0.5 rounded-[4px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[13px] text-[#6B6B80] font-medium">
                    <User size={13} />
                    <span>{course.instructor}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="h-[6px] bg-[#E2E1F0] rounded-full relative overflow-hidden w-full">
                    <div
                      className="h-full bg-[#BBFF00] rounded-full relative transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2D1B69]"></div>
                    </div>
                  </div>
                  <div className="text-[12px] text-[#6B6B80] mt-1.5 font-medium">
                    {course.progress}% complete • {course.lessonsDone} of {course.totalLessons} lessons done
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-[120px] flex md:flex-col items-end justify-between md:justify-center gap-3 border-t md:border-t-0 border-[#E2E1F0] pt-4 md:pt-0">
                <span
                  className={`inline-block px-2.5 py-1 text-[11px] font-extrabold uppercase rounded-full select-none ${
                    course.status === 'In Progress'
                      ? 'bg-[#FEF3C7] text-[#92400E]'
                      : 'bg-[#D1FAE5] text-[#065F46]'
                  }`}
                >
                  {course.status}
                </span>

                {course.status === 'In Progress' ? (
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-[13px] font-bold text-[#2D1B69] hover:underline cursor-pointer"
                  >
                    Resume →
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <button className="text-[13px] font-bold text-[#6B6B80] hover:underline cursor-pointer">
                      Review
                    </button>
                    <button 
                      className="text-[#2D1B69] hover:opacity-80 cursor-pointer relative group" 
                      title="View Certificate"
                    >
                      <Award size={18} />
                      <span className="absolute bottom-full right-1/2 transform translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-1 select-none whitespace-nowrap">
                        View Certificate
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-[80px] h-[80px] bg-[#EDE9FF] text-[#2D1B69] rounded-full flex items-center justify-center mb-5 mx-auto shadow-sm">
              <BookOpen size={36} />
            </div>
            <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-1">
              No courses here yet.
            </h3>
            <p className="text-[14px] text-[#6B6B80] max-w-[340px] mx-auto mb-6 font-medium">
              Browse our free courses and start learning today.
            </p>
            <Link
              to="/courses"
              className="inline-flex h-[40px] px-5 bg-[#2D1B69] text-white hover:bg-[#3D2B89] font-bold text-[14px] rounded-[8px] items-center transition-colors shadow-sm select-none cursor-pointer"
            >
              Explore Courses →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
export default MyCourses;
