import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BookOpen, Award, Sparkles, PlayCircle, 
  CheckCircle, Zap, Flame, Clock, Trophy, BarChart2,
  Settings, Activity, Target, Star
} from 'lucide-react';
import { 
  getLocalEnrollments, 
  getLocalHeroes, 
  getLocalCourses,
  getCourseStatusAndAction,
  MOCK_STUDENT_METRICS,
  MOCK_ACHIEVEMENTS,
  MOCK_ACTIVITY_FEED,
  MOCK_TOP_HEROES
} from '../../utils/mockData';
import { useToast } from '../../hooks/useToast';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [newHero, setNewHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const enrollments = getLocalEnrollments();
      setEnrolledCourses(enrollments);
      
      const allCourses = getLocalCourses();
      const enrolledIds = new Set(enrollments.map(e => e.course_id));
      const recommendations = allCourses.filter(c => !enrolledIds.has(c.id)).slice(0, 3);
      setRecommendedCourses(recommendations);

      const heroes = getLocalHeroes();
      const activeHeroes = heroes.filter(h => h.status === 'Active');
      if (activeHeroes.length > 0) {
        setNewHero(activeHeroes[0]);
      }

      setLoading(false);
      setTimeout(() => setMounted(true), 100);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  const completedCount = enrolledCourses.filter(c => c.completed).length;
  // strictly 1% to 99%
  const inProgressCourses = enrolledCourses.filter(c => c.progress_percentage > 0 && c.progress_percentage < 100);
  const totalEnrolled = enrolledCourses.length;
  const certificatesCount = enrolledCourses.filter(c => c.certificate_code).length;

  const continueLearning = inProgressCourses.slice(0, 4);
  
  // Create mock upcoming lessons based on in-progress courses
  const upcomingLessons = inProgressCourses.map(c => ({
    id: c.id,
    courseTitle: c.title,
    lessonTitle: 'Next Lesson',
    duration: '15 mins',
    link: `/student/learn/${c.id}`
  })).slice(0, 3);

  const statCards = [
    { title: 'Enrolled', value: totalEnrolled, icon: <BookOpen size={20} />, color: 'blue' },
    { title: 'Completed', value: completedCount, icon: <CheckCircle size={20} />, color: 'green' },
    { title: 'In Progress', value: inProgressCourses.length, icon: <PlayCircle size={20} />, color: 'purple' },
    { title: 'Certificates', value: certificatesCount, icon: <Award size={20} />, color: 'yellow' },
  ];

  const getColorClasses = (colorName) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    };
    return colors[colorName] || colors.blue;
  };

  const getIconComponent = (name) => {
    switch (name) {
      case 'Zap': return <Zap size={18} />;
      case 'Flame': return <Flame size={18} />;
      case 'Star': return <Sparkles size={18} />;
      default: return <Trophy size={18} />;
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Hero Spotlight */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Welcome Back!</h2>
          <p className="text-gray-500 dark:text-gray-400">Ready to conquer your learning goals today?</p>
          
          {/* Quick Actions Row directly below header */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button onClick={() => navigate('/student/courses')} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
              <BookOpen size={16} /> Browse Catalog
            </button>
            <button onClick={() => navigate('/student/enrolled?tab=Certificates')} className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors shadow-sm">
              <Award size={16} /> My Certificates
            </button>
            <button onClick={() => navigate('/student/settings')} className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg transition-colors shadow-sm">
              <Settings size={16} /> Settings
            </button>
          </div>
        </div>
        
        {newHero && (
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-md p-1 xl:w-96 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between text-white h-full">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/50 shrink-0 shadow-inner">
                  {newHero.image ? (
                    <img src={newHero.image} alt={newHero.name} className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles className="w-6 h-6 m-3 text-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-0.5">
                    <span className="bg-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Spotlight</span>
                  </div>
                  <h3 className="text-sm font-bold line-clamp-1">{newHero.name}</h3>
                  <p className="text-xs text-white/80 mt-0.5">Current Instructor</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  addToast({ type: 'info', message: 'Navigating to select a new hero...' });
                  navigate('/student/enrolled');
                }}
                className="text-xs font-bold bg-white text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition shrink-0 ml-2 shadow-sm"
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex flex-row items-center gap-4 hover:shadow-md transition">
            <div className={`p-3 rounded-full ${getColorClasses(stat.color)}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Continue Learning Panel */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <PlayCircle size={20} className="text-blue-500" /> Continue Learning
              </h3>
              <Link to="/student/enrolled" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">See All</Link>
            </div>
            
            {continueLearning.length > 0 ? (
              <div className="space-y-4">
                {continueLearning.map(course => {
                  const { actionLabel, actionLink, actionColor } = getCourseStatusAndAction(course);
                  return (
                    <div key={course.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 bg-gray-50/50 dark:bg-gray-800/50 transition-colors">
                      <div className="w-16 h-16 rounded-lg bg-gray-200 dark:bg-gray-700 overflow-hidden shrink-0">
                        {course.image ? (
                          <img src={course.image} alt="course" className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="w-8 h-8 m-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 w-full">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{course.title}</h4>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${course.progress_percentage}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 w-8">{course.progress_percentage}%</span>
                        </div>
                      </div>
                      <Link 
                        to={actionLink}
                        className={`mt-2 sm:mt-0 px-5 py-2 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap text-center ${actionColor}`}
                      >
                        {actionLabel}
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">No courses in progress.</p>
                <button onClick={() => navigate('/student/courses')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">Start a new course</button>
              </div>
            )}
          </section>

          {/* Upcoming Lessons & Recent Activity Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Upcoming Lessons */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Target size={18} className="text-indigo-500" /> Upcoming Lessons
              </h3>
              {upcomingLessons.length > 0 ? (
                <div className="space-y-4">
                  {upcomingLessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                      <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{lesson.lessonTitle}</h4>
                        <p className="text-xs text-gray-500 line-clamp-1">{lesson.courseTitle}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                          <Clock size={12} /> {lesson.duration}
                        </span>
                        <Link to={lesson.link} className="p-1.5 bg-white dark:bg-gray-800 rounded-full text-blue-600 shadow-sm border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 transition">
                          <PlayCircle size={16} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
                  You are all caught up!
                </div>
              )}
            </section>

            {/* Recent Activity */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Activity size={18} className="text-green-500" /> Recent Activity
              </h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent hidden-scrollbar overflow-y-auto max-h-64 pr-2">
                {MOCK_ACTIVITY_FEED.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white dark:border-gray-800 bg-gray-100 dark:bg-gray-700 text-gray-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    </div>
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{activity.type}</span>
                        <span className="text-[10px] text-gray-400">{activity.time}</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300">{activity.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Recommended Courses (Moved to Left Column to fill space horizontally) */}
          {recommendedCourses.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                   <Sparkles size={18} className="text-pink-500" /> Recommended For You
                 </h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {recommendedCourses.map(course => (
                   <Link key={course.id} to={`/student/course/${course.id}`} className="flex flex-col gap-3 group bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-800 transition-colors">
                     <div className="w-full h-32 rounded-lg overflow-hidden shrink-0 relative">
                       {course.image ? (
                         <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                       ) : (
                         <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                           <BookOpen className="w-8 h-8 text-gray-400" />
                         </div>
                       )}
                     </div>
                     <div className="flex flex-col justify-center mt-1">
                       <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                       <p className="text-[10px] font-bold text-gray-500 uppercase mt-2">{course.category}</p>
                     </div>
                   </Link>
                 ))}
               </div>
            </section>
          )}

        </div>

        {/* Right Column (Sidebar Widgets) */}
        <div className="space-y-6">
          
          {/* Learning Streak Widget */}
          <section className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl shadow-sm border border-orange-100 dark:border-orange-900/50 p-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-2 text-orange-600 dark:text-orange-500 font-bold">
              <Flame size={20} />
              <span>Learning Streak</span>
            </div>
            <div className="relative w-28 h-28 flex items-center justify-center my-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-orange-200 dark:text-orange-900/50" />
                <circle 
                  cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" fill="transparent" 
                  strokeDasharray="301.6" 
                  strokeDashoffset={mounted ? (301.6 - (301.6 * Math.min(MOCK_STUDENT_METRICS.learningStreak / 30, 1))) : 301.6} 
                  className="text-orange-500 transition-all duration-1000 ease-out" 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{MOCK_STUDENT_METRICS.learningStreak}</span>
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Days</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">You're on a roll! Keep it up to reach a 30-day streak.</p>
          </section>

          {/* Learning Progress Analytics */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart2 size={18} className="text-blue-500" /> Weekly Analytics
              </h3>
            </div>
            <div className="flex gap-2 h-32 mb-4 mt-2">
              {['M','T','W','T','F','S','S'].map((day, idx) => {
                const targetHeights = [20, 45, 30, 80, 50, 90, 40]; // mock percentage heights
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 gap-1 group cursor-pointer relative h-full">
                    <div className="w-full flex-1 bg-gray-100 dark:bg-gray-700 rounded-t-md relative flex items-end overflow-hidden">
                       <div 
                         className="w-full bg-blue-500 rounded-t-md group-hover:bg-blue-400 transition-all duration-1000 ease-out"
                         style={{ height: mounted ? `${targetHeights[idx]}%` : '0%' }}
                       ></div>
                    </div>
                    {/* Tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-gray-700 text-white text-[10px] py-1 px-2 rounded transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
                      {targetHeights[idx] * 2} mins
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-blue-500 transition-colors shrink-0">{day}</span>
                  </div>
                )
              })}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Minutes</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">480</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">Completion</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">68%</p>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" /> Badges Earned
            </h3>
            <div className="flex flex-col gap-3">
              {MOCK_ACHIEVEMENTS.map(ach => (
                <div key={ach.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <div className={`p-2.5 rounded-full shrink-0 ${ach.color}`}>
                    {getIconComponent(ach.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{ach.title}</h4>
                    <p className="text-[10px] text-gray-500 leading-snug">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Trending Instructors */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
             <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
               <Star size={18} className="text-purple-500" /> Trending Instructors
             </h3>
             <div className="space-y-4">
               {MOCK_TOP_HEROES.slice(0, 3).map(hero => (
                 <div key={hero.id} className="flex items-center gap-3">
                   <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 dark:border-gray-700 shrink-0">
                     {hero.image ? (
                       <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                     )}
                   </div>
                   <div>
                     <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{hero.name}</h4>
                     <p className="text-[10px] text-gray-500">{hero.count} Students</p>
                   </div>
                 </div>
               ))}
             </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
