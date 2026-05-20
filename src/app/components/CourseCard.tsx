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

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-[999] bg-[#F59E0B] text-[#1A1A2E] font-bold text-[13px] px-5 py-3 rounded-xl shadow-2xl border border-amber-400 animate-bounce-in">
          ✓ {toast}
        </div>
      )}

      <Link to={`/courses/${id}`} className="block group">
        <div className="bg-white rounded-[16px] border border-[#E2E1F0] overflow-hidden hover:border-[#2D1B69] hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-1 rounded-tl-[16px] z-10"
              style={{ backgroundColor: isPath ? '#BBFF00' : '#2D1B69' }}
            />
            <div className="aspect-video bg-gradient-to-br from-[#F7F6F3] to-[#E2E1F0] relative overflow-hidden">
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
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm z-10">
                <div className="w-2 h-2 rounded-full bg-[#BBFF00]" />
                <span className="text-[12px] font-bold text-[#2D1B69]">New</span>
              </div>
            )}

            <div className="flex gap-2 mb-3">
              <div className={`inline-block px-3 py-1 rounded-full text-[12px] font-medium ${isPath ? 'bg-[#BBFF00]/20 text-[#1A1A2E]' : 'bg-[#2D1B69]/10 text-[#2D1B69]'}`}>
                {isPath ? 'Learning Path' : 'Course'}
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-[12px] font-medium bg-[#F7F6F3] text-[#6B6B80]">
                {level}
              </div>
            </div>

            <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-2 line-clamp-2 group-hover:text-[#2D1B69] transition-colors leading-tight">
              {title}
            </h3>

            <div className="flex items-center gap-2 mb-4 text-[13px] text-[#6B6B80]">
              <span className="font-medium">{instructor}</span>
              <span>•</span>
              <span>{durationLabel}</span>
              <span>•</span>
              <span>{lessons} lessons</span>
            </div>

            <div className="mt-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star size={16} fill="#F59E0B" stroke="#F59E0B" />
                  <span className="text-[14px] font-bold text-[#1A1A2E]">{rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-[#6B6B80]" />
                  <span className="text-[13px] text-[#6B6B80]">{formatEnrolled(enrolled)}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E1F0]">
                {isEnrolled ? (
                  <div className="flex items-center gap-1.5 text-green-600">
                    <CheckCircle size={16} />
                    <span className="text-[14px] font-bold">Enrolled</span>
                  </div>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="flex items-center text-[#2D1B69] bg-transparent border-none p-0 cursor-pointer w-full text-left"
                  >
                    <span className="text-[14px] font-bold group-hover:underline">Enroll free</span>
                    <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
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
