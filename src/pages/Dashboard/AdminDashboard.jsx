import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, UserPlus, Award, DollarSign, ListTodo,
  TrendingUp, TrendingDown, Clock, CheckCircle, ChevronDown,
  Settings, Sun, Moon, LayoutGrid, LayoutList, Eye, EyeOff
} from 'lucide-react';
import { useTheme } from '../../store/ThemeContext';
import { 
  MOCK_METRICS, 
  MOCK_ACTIVITY_FEED, 
  MOCK_PENDING_TASKS,
  MOCK_TOP_COURSES,
  MOCK_TOP_HEROES,
  MOCK_STUDENT_GROWTH
} from '../../utils/mockData';
import { useToast } from '../../components/ToastProvider';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();
  
  // Pending tasks state for dismissing
  const [pendingTasks, setPendingTasks] = useState([]);
  
  // Quick controls state
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [compactLayout, setCompactLayout] = useState(false);
  const [heroVisibility, setHeroVisibility] = useState(true);

  // Load preferences from local storage if available
  useEffect(() => {
    const prefLayout = localStorage.getItem('admin_pref_layout');
    if (prefLayout) setCompactLayout(prefLayout === 'compact');
    
    const prefHero = localStorage.getItem('admin_pref_hero');
    if (prefHero) setHeroVisibility(prefHero !== 'hidden');
  }, []);

  const toggleLayout = () => {
    const newVal = !compactLayout;
    setCompactLayout(newVal);
    localStorage.setItem('admin_pref_layout', newVal ? 'compact' : 'comfortable');
  };

  const toggleHero = () => {
    const newVal = !heroVisibility;
    setHeroVisibility(newVal);
    localStorage.setItem('admin_pref_hero', newVal ? 'visible' : 'hidden');
  };

  useEffect(() => {
    setTimeout(() => {
      setMetrics(MOCK_METRICS);
      setPendingTasks(MOCK_PENDING_TASKS);
      setLoading(false);
    }, 400);
  }, []);

  const handleDismissTask = (taskId) => {
    setPendingTasks(prev => prev.filter(t => t.id !== taskId));
    addToast({ type: 'success', message: 'Task dismissed.' });
  };

  const handleReviewTask = (taskText) => {
    addToast({ type: 'info', message: `Reviewing: ${taskText}` });
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Total Students', value: metrics?.totalStudents, trend: metrics?.trends?.students, icon: <Users size={28} />, color: 'blue' },
    { title: 'Active Courses', value: metrics?.totalCourses, trend: '+2 this week', icon: <BookOpen size={28} />, color: 'purple' },
    { title: 'Celebrity Heroes', value: metrics?.activeHeroes, trend: 'Stable', icon: <Award size={28} />, color: 'pink' },
    { title: 'Enrollments', value: metrics?.totalEnrollments, trend: metrics?.trends?.enrollments, icon: <UserPlus size={28} />, color: 'indigo' },
    { title: 'Revenue (Demo)', value: `$${metrics?.revenue?.toLocaleString()}`, trend: metrics?.trends?.revenue, icon: <DollarSign size={28} />, color: 'green' },
    { title: 'Pending Tasks', value: pendingTasks.length, trend: '-2 since yesterday', icon: <ListTodo size={28} />, color: 'orange' },
  ];

  const getColorClasses = (colorName) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 border-blue-200 dark:border-blue-800',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400 border-purple-200 dark:border-purple-800',
      pink: 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-400 border-pink-200 dark:border-pink-800',
      indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400 border-green-200 dark:border-green-800',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    };
    return colors[colorName] || colors.blue;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Quick Controls */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Admin Overview</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Monitor platform metrics, manage tasks, and configure settings.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Mock Date Filter */}
          <div className="relative">
            <button 
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              {dateFilter} <ChevronDown size={16} />
            </button>
            
            {showDateDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl z-50 py-2">
                {['Last 7 Days', 'Last 30 Days', 'This Year', 'All Time'].map(opt => (
                  <button 
                    key={opt}
                    onClick={() => {
                      setDateFilter(opt);
                      setShowDateDropdown(false);
                      addToast({ type: 'success', message: `Filter applied: ${opt}` });
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowControls(!showControls)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm text-sm font-medium transition"
            >
              <Settings size={16} /> Controls
            </button>
            
            {showControls && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl z-50 p-4 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quick Toggles</h4>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    {theme === 'dark' ? <Moon size={16}/> : <Sun size={16}/>} Theme
                  </span>
                  <button onClick={toggleTheme} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    Toggle
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    {compactLayout ? <LayoutList size={16}/> : <LayoutGrid size={16}/>} Layout
                  </span>
                  <button onClick={toggleLayout} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    {compactLayout ? 'Compact' : 'Normal'}
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    {heroVisibility ? <Eye size={16}/> : <EyeOff size={16}/>} Hero UI
                  </span>
                  <button onClick={toggleHero} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                    {heroVisibility ? 'Visible' : 'Hidden'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 ${compactLayout ? 'p-4' : 'p-6'}`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{stat.value}</h3>
              </div>
              <div className={`p-3 rounded-lg border ${getColorClasses(stat.color)}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              {stat.trend.startsWith('+') ? (
                <TrendingUp size={16} className="text-green-500 mr-1" />
              ) : stat.trend.startsWith('-') ? (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              ) : (
                <span className="text-gray-400 mr-1">•</span>
              )}
              <span className={stat.trend.startsWith('+') ? 'text-green-600 dark:text-green-400 font-medium' : stat.trend.startsWith('-') ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500'}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CSS Chart: Student Growth */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Student Growth (YTD)</h3>
          <div className="flex-1 flex justify-between space-x-2 h-64 mt-auto relative">
             {/* Grid lines */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 dark:opacity-10 border-b border-gray-300 dark:border-gray-600">
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500"></div>
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500"></div>
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500"></div>
                <div className="w-full h-px bg-gray-400 dark:bg-gray-500"></div>
             </div>
            {MOCK_STUDENT_GROWTH.map((data, idx) => {
              const maxCount = Math.max(...MOCK_STUDENT_GROWTH.map(d => d.count));
              const height = `${(data.count / maxCount) * 100}%`;
              return (
                <div key={idx} className="flex flex-col items-center w-full h-full group z-10">
                  <div className="relative w-full flex justify-center h-full items-end pb-2">
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity whitespace-nowrap shadow-lg z-20">
                      {data.count} students
                    </div>
                    {/* Bar */}
                    <div 
                      className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 rounded-t-md group-hover:opacity-80 transition-opacity shadow-sm"
                      style={{ height }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase mt-2">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Heroes Leaderboard */}
        {heroVisibility && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Most Popular Heroes</h3>
            <div className="space-y-6">
              {MOCK_TOP_HEROES.map((hero, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="relative w-10 h-10 shrink-0 mr-4">
                    {hero.image ? (
                      <img src={hero.image} alt={hero.name} className="w-10 h-10 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-800" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 font-bold flex items-center justify-center border-2 border-indigo-200 dark:border-indigo-800">
                        {hero.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] font-bold flex items-center justify-center border border-white dark:border-gray-800 shadow-sm">
                      #{idx + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{hero.name}</span>
                      <span className="text-sm font-medium text-gray-500">{hero.count} chosen</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: `${(hero.count / MOCK_TOP_HEROES[0].count) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/admin/heroes')} className="mt-6 w-full py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition">
              Manage Heroes
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Actions / Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircle size={20} className="text-orange-500"/> Action Required
            </h3>
            <span className="bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full">
              {pendingTasks.length} Pending
            </span>
          </div>
          <div className="space-y-4">
            {pendingTasks.map(task => (
              <div key={task.id} className="p-4 border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      task.priority === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-xs text-gray-500">{task.status}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.text}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => handleDismissTask(task.id)}
                    className="text-xs px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Dismiss
                  </button>
                  <button 
                    onClick={() => handleReviewTask(task.text)}
                    className="text-xs px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
            {pendingTasks.length === 0 && (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
                <p>All caught up! No pending tasks.</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Clock size={20} className="text-blue-500" /> Recent Activity
          </h3>
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {MOCK_ACTIVITY_FEED.map((feed, idx) => (
              <div key={feed.id} className="relative flex gap-4">
                {/* Timeline connector */}
                {idx !== MOCK_ACTIVITY_FEED.length - 1 && (
                  <div className="absolute top-8 bottom-0 left-[19px] w-px bg-gray-200 dark:bg-gray-700 -z-10"></div>
                )}
                
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 border-white dark:border-gray-800 z-10 ${
                  feed.type === 'enrollment' ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' :
                  feed.type === 'hero' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400' :
                  feed.type === 'course' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' :
                  'bg-gray-100 text-gray-600 dark:bg-gray-700/40 dark:text-gray-300'
                }`}>
                  {feed.type === 'enrollment' ? <UserPlus size={18}/> :
                   feed.type === 'hero' ? <Award size={18}/> :
                   feed.type === 'course' ? <BookOpen size={18}/> :
                   <Settings size={18}/>}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{feed.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{feed.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Top Courses Progress bars */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Course Performance</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_TOP_COURSES.map(course => (
              <div key={course.id}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{course.title}</span>
                  <span className="text-sm text-gray-500 font-medium">{course.progress}% Completion</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
                <p className="text-xs text-gray-500">{course.students} total students enrolled</p>
              </div>
            ))}
         </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
