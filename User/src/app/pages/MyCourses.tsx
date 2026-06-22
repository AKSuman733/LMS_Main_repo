import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { User, Award, BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getEnrollments } from '../../utils/enrollmentStore';
import { mockCourses } from '../../utils/mockCourses';

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
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (user) {
      const enrollments = getEnrollments().filter((e: any) => e.studentId === user.id);
      const mapped = enrollments.map((enr: any) => {
        const course = mockCourses.find(c => c.id === enr.courseId);
        if (!course) return null;
        const totalLessons = course.lessons || 10;
        const lessonsDone = Math.round((enr.progress / 100) * totalLessons);
        return {
          id: course.id,
          title: course.title,
          instructor: course.instructor,
          thumbnail: course.thumbnail,
          progress: enr.progress,
          lessonsDone,
          totalLessons,
          tags: course.topics.slice(0, 2),
          status: enr.progress === 100 ? 'Completed' : 'In Progress',
        } as Course;
      }).filter(Boolean) as Course[];
      setCourses(mapped);
    }
  }, [user]);

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
    <div className="max-w-[1280px] mx-auto font-sans text-white">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-[#1E2D45] pb-6">
        <div>
          <h1 className="text-[28px] font-bold text-white leading-none mb-2">My Courses</h1>
          <p className="text-[14px] text-[#9CA3AF] font-medium">
            Track your learning progress across all enrolled courses.
          </p>
        </div>
        <Link 
          to="/courses" 
          className="text-[#FF6B2B] text-[14px] font-semibold hover:text-[#FF8C42] transition-colors select-none sm:text-right"
        >
          Browse more courses
        </Link>
      </div>

      {/* Tab Filter Row */}
      <div className="flex gap-2.5 mt-8 border-b border-[#1E2D45] pb-4">
        {(['All', 'In Progress', 'Completed'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-[36px] px-4 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer border-none ${
                isActive
                  ? 'bg-[#FF6B2B] text-white shadow-sm hover:bg-[#FF8C42] active:scale-[0.97]'
                  : 'bg-[#111827] border border-[#1E2D45] text-[#9CA3AF] hover:text-white hover:bg-[#1A2540] active:scale-[0.97]'
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
              className="bg-[#111827] border border-[#1E2D45] rounded-[12px] p-5 flex flex-col md:flex-row items-stretch gap-5 hover:border-[#FF6B2B]/40 hover:shadow-[0_4px_20px_rgba(255,107,43,0.08)] transition-all duration-200"
            >
              {/* Left Thumbnail */}
              <div className="w-full md:w-[120px] h-[80px] flex-shrink-0 rounded-[8px] overflow-hidden border border-[#1E2D45]">
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
                    <h3 className="text-[16px] font-bold text-white leading-snug">
                      {course.title}
                    </h3>
                    <div className="flex gap-1.5">
                      {course.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#FF6B2B]/10 text-[#FF8C42] border border-[#FF6B2B]/20 text-[10px] font-bold px-2 py-0.5 rounded-[4px] uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[13px] text-[#9CA3AF] font-medium">
                    <User size={13} className="text-[#FF8C42]" />
                    <span>{course.instructor}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="h-[6px] bg-[#1A2540] rounded-full relative overflow-hidden w-full">
                    <div
                      className="h-full bg-[#00C97B] rounded-full relative transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                  </div>
                  <div className="text-[12px] text-[#9CA3AF] mt-1.5 font-medium">
                    {course.progress}% complete • {course.lessonsDone} of {course.totalLessons} lessons done
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-full md:w-[130px] flex md:flex-col items-end justify-between md:justify-center gap-3 border-t md:border-t-0 border-[#1E2D45] pt-4 md:pt-0">
                <span
                  className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase rounded-full select-none ${
                    course.status === 'In Progress'
                      ? 'bg-[#FF6B2B]/10 text-[#FF8C42] border border-[#FF6B2B]/20'
                      : 'bg-[#00C97B]/10 text-[#00E88A] border border-[#00C97B]/20'
                  }`}
                >
                  {course.status}
                </span>

                {course.status === 'In Progress' ? (
                  <Link
                    to={`/course/${course.id}/learn`}
                    className="text-[13px] font-bold text-[#FF6B2B] hover:text-[#FF8C42] cursor-pointer hover:underline transition-colors active:scale-[0.97]"
                  >
                    Resume →
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/course/${course.id}/learn`}
                      className="text-[13px] font-bold text-[#9CA3AF] hover:text-white cursor-pointer hover:underline transition-colors"
                    >
                      Review
                    </Link>
                    <Link 
                      to="/dashboard/certificates"
                      className="text-[#FF6B2B] hover:text-[#FF8C42] transition-colors cursor-pointer relative group active:scale-[0.97]" 
                      title="View Certificate"
                    >
                      <Award size={18} />
                      <span className="absolute bottom-full right-1/2 transform translate-x-1/2 bg-[#1A2540] border border-[#1E2D45] text-white text-[10px] px-1.5 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-1 select-none whitespace-nowrap z-20">
                        View Certificate
                      </span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-[#111827] border border-[#1E2D45] rounded-[16px] p-8">
            <div className="w-[80px] h-[80px] bg-[#FF6B2B]/10 text-[#FF6B2B] rounded-full flex items-center justify-center mb-5 mx-auto shadow-sm">
              <BookOpen size={36} />
            </div>
            <h3 className="text-[18px] font-bold text-white mb-1">
              No courses here yet.
            </h3>
            <p className="text-[14px] text-[#9CA3AF] max-w-[340px] mx-auto mb-6 font-medium">
              Browse our free courses and start learning today.
            </p>
            <Link
              to="/courses"
              className="inline-flex h-[40px] px-5 bg-[#FF6B2B] hover:bg-[#FF8C42] text-white font-semibold text-[14px] rounded-[8px] items-center transition-all duration-200 shadow-sm select-none cursor-pointer active:scale-[0.97]"
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
