import { useState, useEffect } from 'react';
import { Star, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { addEnrollment, getEnrollments } from '../../utils/enrollmentStore';
import { useAuth } from '../../contexts/AuthContext';

interface CourseCardProps {
  id: string;
  title: string;
  type: string;
  instructor: string;
  level: string;
  topics: string[];
  tools: string[];
  duration: string;
  durationLabel: string;
  lessons: number;
  enrolled: number;
  rating: number;
  isNew: boolean;
  thumbnail: string;
  description: string;
}

export function CourseCard({
  id, title, type, instructor, level, durationLabel, lessons, enrolled, rating, isNew, thumbnail,
}: CourseCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [toast, setToast] = useState('');

  // Check enrollment status on load
  useEffect(() => {
    if (user) {
      const enrollments = getEnrollments();
      const found = enrollments.some((e: any) => e.studentId === user.id && e.courseId === id);
      setIsEnrolled(found);
    }
  }, [user, id]);

  const formatEnrolled = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const isPath = type === 'learning-path';

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { navigate('/login'); return; }
    const course = { id, title, type, instructor };
    const success = addEnrollment(user, course);
    if (success) {
      setIsEnrolled(true);
      setToast(`Successfully enrolled in ${title}!`);
      setTimeout(() => setToast(''), 3000);
    }
  };

  // Theme helper classes
  const accentColor = isPath ? '#00C97B' : '#FF6B2B';
  const hoverBorderClass = isPath 
    ? 'hover:border-[#00C97B] hover:shadow-[0_0_15px_rgba(0,201,123,0.2)]' 
    : 'hover:border-[#FF6B2B] hover:shadow-[0_0_15px_rgba(255,107,43,0.2)]';

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-[999] bg-[#FF6B2B] text-white font-bold text-[13px] px-5 py-3 rounded-xl shadow-2xl border border-[#FF8C42] animate-bounce-in">
          ✓ {toast}
        </div>
      )}

      <Link to={`/courses/${id}`} className="block group">
        <div className={`bg-[#1A2540] rounded-[16px] border border-[#111827] overflow-hidden transition-all duration-200 cursor-pointer h-full flex flex-col ${hoverBorderClass}`}>
          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-tl-[16px] z-10"
              style={{ backgroundColor: accentColor }}
            />
            <div className="aspect-video bg-[#111827] relative overflow-hidden">
              <img
                src={thumbnail}
                alt={title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
            </div>
          </div>

          <div className="p-4 relative flex flex-col flex-grow">
            {isNew && (
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#111827]/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm z-10 border border-white/5">
                <div className="w-2 h-2 rounded-full bg-[#00C97B]" />
                <span className="text-[11px] font-bold text-white">New</span>
              </div>
            )}

            <div className="flex gap-2 mb-3">
              <div className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold ${isPath ? 'bg-[#00C97B]/20 text-[#00E88A]' : 'bg-[#FF6B2B]/20 text-[#FF8C42]'}`}>
                {isPath ? 'Learning Path' : 'Course'}
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-[12px] font-medium bg-[#111827] text-[#9CA3AF]">
                {level}
              </div>
            </div>

            <h3 className={`text-[16px] font-bold text-white mb-2 line-clamp-2 transition-colors leading-tight ${isPath ? 'group-hover:text-[#00C97B]' : 'group-hover:text-[#FF6B2B]'}`}>
              {title}
            </h3>

            <div className="flex items-center gap-2 mb-4 text-[13px] text-[#9CA3AF]">
              <span className="font-medium">{instructor}</span>
              <span>•</span>
              <span>{durationLabel}</span>
              <span>•</span>
              <span>{lessons} lessons</span>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} fill="#FF8C42" stroke="#FF8C42" />
                  <span className="text-[14px] font-bold text-white">{rating}</span>
                </div>
                <div className="flex items-center gap-1 text-[#9CA3AF]">
                  <Users size={14} />
                  <span className="text-[13px]">{formatEnrolled(enrolled)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#111827]">
                {isEnrolled ? (
                  <div className="flex items-center gap-1.5 text-[#00C97B]">
                    <CheckCircle size={16} />
                    <span className="text-[14px] font-bold">Enrolled</span>
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="flex items-center text-[#FF6B2B] bg-transparent border-none p-0 cursor-pointer w-full text-left font-bold hover:text-[#FF8C42]"
                  >
                    <span className="text-[14px] group-hover:underline">Enroll free</span>
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" style={{ color: accentColor }} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
