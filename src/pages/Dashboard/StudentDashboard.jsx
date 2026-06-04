import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Award, Sparkles, ChevronRight, PlayCircle, 
  CheckCircle, Zap, Flame, Clock, Trophy, BarChart2
} from 'lucide-react';
import { 
  getLocalEnrollments, 
  getLocalHeroes, 
  getLocalCourses,
  getCourseStatusAndAction,
  MOCK_STUDENT_METRICS,
  MOCK_ACHIEVEMENTS
} from '../../utils/mockData';
import { useToast } from '../../components/ToastProvider';

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [newHero, setNewHero] = useState(null);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      const enrollments = getLocalEnrollments();
      setEnrolledCourses(enrollments);
      
      const allCourses = getLocalCourses();
      const enrolledIds = new Set(enrollments.map(e => e.course_id));
      const recommendations = allCourses.filter(c => !enrolledIds.has(c.id)).slice(0, 2);
      setRecommendedCourses(recommendations);

      const heroes = getLocalHeroes();
      const activeHeroes = heroes.filter(h => h.status === 'Active');
      if (activeHeroes.length > 0) {
        setNewHero(activeHeroes[0]);
      }

      setLoading(false);
    }, 400);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  const completedCount = enrolledCourses.filter(c => c.completed).length;
  const inProgressCount = enrolledCourses.filter(c => c.progress_percentage > 0 && !c.completed).length;
  const totalEnrolled = enrolledCourses.length;
  const certificatesCount = enrolledCourses.filter(c => c.certificate_code).length;

  const continueLearning = enrolledCourses.filter(c => c.progress_percentage > 0 && !c.completed).slice(0, 2);
  const recentEnrollments = [...enrolledCourses].sort((a, b) => new Date(b.enrolled_at || 0) - new Date(a.enrolled_at || 0)).slice(0, 3);

  const statCards = [
    { title: 'Enrolled', value: totalEnrolled, icon: <BookOpen size={20} />, color: 'blue' },
    { title: 'Completed', value: completedCount, icon: <CheckCircle size={20} />, color: 'green' },
    { title: 'In Progress', value: inProgressCount, icon: <PlayCircle size={20} />, color: 'purple' },
    { title: 'Certificates', value: certificatesCount, icon: <Award size={20} />, color: 'yellow' },
    { title: 'Day Streak', value: MOCK_STUDENT_METRICS.learningStreak, icon: <Flame size={20} />, color: 'orange' },
    { title: 'Hours', value: MOCK_STUDENT_METRICS.learningHours, icon: <Clock size={20} />, color: 'indigo' },
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
    return colors[colorName];
  };

  const getIconComponent = (name) => {
    switch (name) {
      case 'Zap': return <Zap size={20} />;
      case 'Flame': return <Flame size={20} />;
      case 'Star': return <Sparkles size={20} />;
      default: return <Trophy size={20} />;
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header & New Hero Banner */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Welcome Back!</h2>
          <p className="text-gray-500 dark:text-gray-400">You're on a {MOCK_STUDENT_METRICS.learningStreak}-day learning streak. Keep it up!</p>
        </div>
        
        {newHero && (
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-md p-1 lg:w-96 shrink-0">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between text-white h-full">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/50 shrink-0">
                  {newHero.image ? (
                    <img src={newHero.image} alt={newHero.name} className="w-full h-full object-cover" />
                  ) : (
                    <Sparkles className="w-6 h-6 m-3 text-white" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-0.5">
                    <span className="bg-white/20 text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">New</span>
                  </div>
                  <h3 className="text-sm font-bold line-clamp-1">{newHero.name}</h3>
                </div>
              </div>
              <Link 
                to="/student/enrolled" 
                onClick={() => addToast({ type: 'info', message: 'Select a course to change its hero!' })}
                className="text-xs font-semibold bg-white text-indigo-600 px-3 py-1.5 rounded hover:bg-indigo-50 transition shrink-0 ml-2"
              >
                Use Hero
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition">
            <div className={`p-3 rounded-full mb-3 ${getColorClasses(stat.color)}`}>
              {stat.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Continue Learning & Recent Enrollments */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Continue Learning */}
          {continueLearning.length > 0 && (
            <section>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <PlayCircle size={22} className="text-blue-500" /> Continue Learning
                </h3>
              </div>
              <div className="space-y-4">
                {continueLearning.map(course => {
                  const { actionLabel, actionLink, actionColor } = getCourseStatusAndAction(course);
                  return (
                    <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 group">
                      <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0">
                        {course.image ? (
                          <img src={course.image} alt="course" className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="w-8 h-8 m-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 w-full">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{course.title}</h4>
                        <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                          Instructor: {course.instructor_style}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: `${course.progress_percentage}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{course.progress_percentage}%</span>
                        </div>
                      </div>
                      <Link 
                        to={actionLink}
                        className={`mt-4 md:mt-0 px-6 py-2.5 rounded-lg text-sm font-semibold transition whitespace-nowrap w-full md:w-auto text-center ${actionColor}`}
                      >
                        {actionLabel}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Recent Enrollments (BUG FIXED: Correct Status Logic) */}
          <section>
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen size={22} className="text-indigo-500" /> Recent Enrollments
              </h3>
              <Link to="/student/enrolled" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">View All</Link>
            </div>
            
            {recentEnrollments.length > 0 ? (
              <div className="grid gap-4">
                {recentEnrollments.map(course => {
                  const { statusBadge, badgeColor, actionLabel, actionLink, actionColor, actionVariant } = getCourseStatusAndAction(course);
                  return (
                    <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-200 dark:hover:border-indigo-800 transition">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${badgeColor}`}>
                            {statusBadge}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{course.title}</h4>
                      </div>
                      
                      <Link 
                        to={actionLink}
                        className={`px-5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap w-full sm:w-auto text-center ${
                          actionVariant === 'outline' 
                            ? 'border ' + actionColor 
                            : actionColor
                        }`}
                      >
                        {actionLabel}
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No enrollments yet</h4>
                <Link to="/student/courses" className="text-indigo-600 hover:underline text-sm font-medium">Browse Catalog</Link>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Achievements & Recommendations */}
        <div className="space-y-8">
          
          {/* Activity / Analytics Chart */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart2 size={18} className="text-gray-400 dark:text-gray-500" /> Weekly Learning Hours
            </h3>
            <div className="flex justify-between h-40 gap-2 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 dark:opacity-10 border-b border-gray-300 dark:border-gray-600">
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500"></div>
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500"></div>
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500"></div>
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500"></div>
              </div>
              {/* Bars */}
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, idx) => {
                const hours = [2, 3, 1, 4, 2, 5, 3][idx];
                const height = (hours / 5) * 100;
                return (
                  <div key={idx} className="flex flex-col items-center flex-1 h-full group z-10">
                    <div className="w-full flex justify-center h-full items-end pb-2 relative">
                      {/* Tooltip */}
                      <div className="opacity-0 group-hover:opacity-100 absolute -top-10 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap shadow-lg">
                        {hours} hrs
                      </div>
                      <div 
                        className="w-full max-w-[32px] bg-blue-500 dark:bg-blue-600 rounded-t-md group-hover:bg-blue-400 dark:group-hover:bg-blue-500 transition-colors shadow-sm"
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-2">{day}</span>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Recent Achievements */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Trophy size={18} className="text-yellow-500" /> Recent Achievements
            </h3>
            <div className="space-y-4">
              {MOCK_ACHIEVEMENTS.map(ach => (
                <div key={ach.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${ach.color}`}>
                    {getIconComponent(ach.icon)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">{ach.title}</h4>
                    <p className="text-xs text-gray-500 leading-snug mt-0.5">{ach.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended Courses */}
          {recommendedCourses.length > 0 && (
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
               <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                 <Sparkles size={18} className="text-pink-500" /> Recommended For You
               </h3>
               <div className="space-y-4">
                 {recommendedCourses.map(course => (
                   <Link key={course.id} to={`/student/course/${course.id}`} className="block group">
                     <div className="relative h-24 rounded-lg overflow-hidden mb-2">
                       {course.image ? (
                         <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                       ) : (
                         <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>
                       )}
                       <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                       <div className="absolute bottom-2 left-2 right-2">
                         <span className="text-[10px] font-bold text-white bg-blue-600 px-1.5 py-0.5 rounded">{course.category}</span>
                       </div>
                     </div>
                     <h4 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">{course.title}</h4>
                     <p className="text-xs text-gray-500">{course.level}</p>
                   </Link>
                 ))}
               </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
