import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Circle, ArrowLeft, Trophy, Play, UserCog } from 'lucide-react';
import { getLocalEnrollments, getLocalCourses, markLessonCompleteLocal, getLocalHeroes, changeEnrollmentHero, restartCourseLocal } from '../../utils/mockData';
import HeroSelectionModal from '../../components/HeroSelectionModal';

const CourseLearning = () => {
  const { enrollmentId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [activeHero, setActiveHero] = useState(null);

  useEffect(() => {
    loadCourseData();
  }, [enrollmentId, navigate]);

  const loadCourseData = () => {
    setTimeout(() => {
      const enrollments = getLocalEnrollments();
      const currentEnrollment = enrollments.find(e => e.id === parseInt(enrollmentId));
      
      if (!currentEnrollment) {
        navigate('/student/enrolled');
        return;
      }
      
      setEnrollment(currentEnrollment);

      const foundCourse = getLocalCourses().find(c => c.id === currentEnrollment.course_id);
      if (!foundCourse) {
        navigate('/student/enrolled');
        return;
      }

      setCourse(foundCourse);
      setLessons(foundCourse.lessons);
      
      if (foundCourse.lessons.length > 0 && !activeLesson) {
        setActiveLesson(foundCourse.lessons[0]);
      }

      // Load active hero
      const heroes = getLocalHeroes();
      let hero = null;
      if (currentEnrollment.activeHeroId) {
        hero = heroes.find(h => h.id === currentEnrollment.activeHeroId);
      } else {
        // Fallback for old enrollments
        hero = heroes.find(h => h.name === currentEnrollment.instructor_style);
      }
      setActiveHero(hero || heroes[0]);
      
      setLoading(false);
    }, 300);
  };

  const markComplete = () => {
    if (!activeLesson) return;
    
    const updatedEnrollment = markLessonCompleteLocal(enrollmentId, activeLesson.id, course.id);
    if (updatedEnrollment) {
      setEnrollment(updatedEnrollment);
    }
    
    // Move to next lesson automatically if available
    const currentIndex = lessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < lessons.length - 1) {
      setActiveLesson(lessons[currentIndex + 1]);
    }
  };

  const handleHeroChange = (newHeroId) => {
    const updated = changeEnrollmentHero(enrollmentId, newHeroId);
    if (updated) {
      setEnrollment(updated);
      const heroes = getLocalHeroes();
      setActiveHero(heroes.find(h => h.id === newHeroId));
    }
  };

  const handleRestart = () => {
    const updated = restartCourseLocal(enrollmentId);
    if (updated) {
      setEnrollment(updated);
      if (lessons.length > 0) {
        setActiveLesson(lessons[0]);
      }
    }
  };

  if (loading) return <div>Loading course content...</div>;

  const currentPercentage = enrollment?.progress_percentage || 0;
  const isCompleted = enrollment?.completed;

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar with lessons */}
      <div className="w-full md:w-80 bg-white dark:bg-gray-800 rounded-xl shadow flex flex-col overflow-hidden shrink-0">
        <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <button onClick={() => navigate('/student/enrolled')} className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
            <ArrowLeft size={16} className="mr-1" /> Back to My Courses
          </button>
          <h2 className="font-bold text-gray-900 dark:text-white line-clamp-1">{course.title}</h2>
          
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">Progress</span>
              <span className="font-medium">{currentPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${currentPercentage}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 p-2">
          {lessons.map((lesson, idx) => {
            const isCompletedList = enrollment.completed_lessons?.includes(lesson.id);
            const isActive = activeLesson?.id === lesson.id;
            
            return (
              <button
                key={lesson.id}
                onClick={() => setActiveLesson(lesson)}
                className={`w-full text-left p-3 rounded-lg mb-1 flex items-start space-x-3 transition-colors ${
                  isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompletedList ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <Circle size={18} className="text-gray-300 dark:text-gray-600" />
                  )}
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Lesson {idx + 1}</div>
                  <div className={`text-sm font-medium ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {lesson.title}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden flex flex-col">
        {isCompleted && (
          <div className="bg-green-100 dark:bg-green-900/30 p-4 border-b border-green-200 dark:border-green-800 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="flex items-center text-green-800 dark:text-green-300 font-medium text-center sm:text-left">
              <Trophy size={20} className="mr-2 shrink-0" /> You have completed this course!
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={handleRestart}
                className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 text-sm rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition whitespace-nowrap"
              >
                Restart Course
              </button>
              <button
                onClick={() => navigate(`/student/certificate/${enrollmentId}`)}
                className="flex-1 sm:flex-none px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition whitespace-nowrap"
              >
                View Certificate
              </button>
            </div>
          </div>
        )}
        
        {activeLesson ? (
          <div className="p-8 overflow-y-auto flex-1 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{activeLesson.title}</h1>
              
              {activeHero && (
                <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-full border border-gray-100 dark:border-gray-600 shadow-sm w-fit group">
                  <div className="relative">
                    {activeHero.image ? (
                      <img src={activeHero.image} alt="Instructor" className="w-10 h-10 rounded-full object-cover border border-white" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">N/A</div>
                    )}
                  </div>
                  <div className="text-sm pr-2">
                    <p className="text-gray-500 dark:text-gray-400 text-xs">Instructor</p>
                    <p className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-1 max-w-[150px]">{activeHero.name}</p>
                  </div>
                  <button 
                    onClick={() => setIsHeroModalOpen(true)}
                    className="ml-2 p-1.5 bg-white dark:bg-gray-800 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600 border dark:border-gray-600 shadow-sm transition-colors"
                    title="Change Hero"
                  >
                    <UserCog size={16} />
                  </button>
                </div>
              )}
            </div>
            
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 flex-1 border-b dark:border-gray-700 pb-8 mb-8">
              {/* Video Player Mock */}
              <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-black rounded-xl mb-8 flex flex-col items-center justify-center relative group cursor-pointer overflow-hidden shadow-2xl border border-gray-800">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10"></div>
                
                {activeHero && activeHero.image && (
                  <img src={activeHero.image} alt="Video Background" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay filter blur-sm" />
                )}

                <div className="w-20 h-20 bg-blue-600/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(37,99,235,0.5)] z-20">
                  <Play size={40} className="text-white ml-2" fill="currentColor" />
                </div>
                <p className="text-white mt-4 font-medium tracking-wide z-20 text-sm bg-black/50 px-4 py-1 rounded-full">
                  Click to play lesson
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/50">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Lesson Overview</h3>
                <p className="whitespace-pre-wrap leading-relaxed text-gray-700 dark:text-gray-300">{activeLesson.content}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <button 
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition font-medium"
                disabled={lessons.findIndex(l => l.id === activeLesson.id) === 0}
                onClick={() => {
                  const idx = lessons.findIndex(l => l.id === activeLesson.id);
                  if (idx > 0) setActiveLesson(lessons[idx - 1]);
                }}
              >
                Previous Lesson
              </button>
              
              <button 
                onClick={markComplete}
                disabled={enrollment.completed_lessons?.includes(activeLesson.id)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 disabled:shadow-none disabled:opacity-80 disabled:bg-green-600 disabled:cursor-not-allowed flex items-center space-x-2 font-medium"
              >
                {enrollment.completed_lessons?.includes(activeLesson.id) ? (
                  <>
                    <CheckCircle size={20} />
                    <span>Completed</span>
                  </>
                ) : (
                  <span>Mark as Complete</span>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">Select a lesson to begin.</div>
        )}
      </div>

      <HeroSelectionModal
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        currentHeroId={activeHero?.id}
        onSelectHero={handleHeroChange}
      />
    </div>
  );
};

export default CourseLearning;
