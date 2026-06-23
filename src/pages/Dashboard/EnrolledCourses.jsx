import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Search, Filter, Clock, PlayCircle, BookOpen, 
  Sparkles, AlertCircle, ArrowUpDown, CheckCircle, RotateCcw
} from 'lucide-react';
import { 
  getLocalEnrollments, 
  getCourseStatusAndAction,
  changeEnrollmentHero,
  restartCourseLocal
} from '../../utils/mockData';
import HeroSelectionModal from '../../components/HeroSelectionModal';
import { useToast } from '../../hooks/useToast';

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'All';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [selectedCourseForHero, setSelectedCourseForHero] = useState(null);
  
  const { addToast } = useToast();

  useEffect(() => {
    setTimeout(() => {
      setCourses(getLocalEnrollments());
      setLoading(false);
    }, 400);
  }, []);

  const handleHeroChange = (course) => {
    setSelectedCourseForHero(course);
    setIsHeroModalOpen(true);
  };

  const handleHeroConfirm = (heroId) => {
    if (selectedCourseForHero) {
      const updatedCourse = changeEnrollmentHero(selectedCourseForHero.id, heroId);
      if (updatedCourse) {
        setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
        addToast({ type: 'success', message: 'Celebrity Hero updated successfully!' });
      }
    }
  };

  const handleRestart = (enrollmentId) => {
    const updatedCourse = restartCourseLocal(enrollmentId);
    if (updatedCourse) {
      setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
      addToast({ type: 'success', message: 'Course restarted successfully!' });
    }
  };

  // Memoized filtering and sorting
  const filteredAndSortedCourses = useMemo(() => {
    let result = [...courses];
    
    // Apply Tabs
    if (activeTab === 'Not Started') {
      result = result.filter(c => (c.progress_percentage || 0) === 0);
    } else if (activeTab === 'In Progress') {
      result = result.filter(c => (c.progress_percentage || 0) > 0 && !c.completed);
    } else if (activeTab === 'Completed') {
      result = result.filter(c => c.completed || c.progress_percentage === 100);
    } else if (activeTab === 'Certificates') {
      result = result.filter(c => c.certificate_code);
    }
    
    // Apply Search
    if (searchQuery.trim()) {
      const lowerQ = searchQuery.toLowerCase();
      result = result.filter(c => 
        (c.title?.toLowerCase() || '').includes(lowerQ) || 
        (c.instructor_style?.toLowerCase() || '').includes(lowerQ)
      );
    }
    
    // Apply Sort
    if (sortOption === 'recent') {
      result.sort((a, b) => new Date(b.enrolled_at || 0) - new Date(a.enrolled_at || 0));
    } else if (sortOption === 'progress_high') {
      result.sort((a, b) => (b.progress_percentage || 0) - (a.progress_percentage || 0));
    } else if (sortOption === 'progress_low') {
      result.sort((a, b) => (a.progress_percentage || 0) - (b.progress_percentage || 0));
    } else if (sortOption === 'az') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }

    return result;
  }, [courses, activeTab, searchQuery, sortOption]);

  const TABS = ['All', 'Not Started', 'In Progress', 'Completed', 'Certificates'];

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        <div className="grid gap-6">
          {[1,2,3].map(i => <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">My Learning</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your courses, track progress, and choose your Celebrity Heroes.</p>
        </div>
        <Link to="/student/courses" className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-brand-orange-dark transition shadow-sm text-sm font-semibold flex items-center justify-center gap-2">
          <BookOpen size={16} /> Browse New Courses
        </Link>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 space-y-4">
        
        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar space-x-2 pb-1 border-b border-gray-100 dark:border-gray-700">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-brand-orange text-brand-orange dark:text-brand-orange-light dark:border-brand-orange-light' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab} {tab === 'All' && `(${courses.length})`}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by course or hero name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-orange transition-shadow"
            />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none pl-10 pr-8 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-brand-orange transition-shadow cursor-pointer"
              >
                <option value="recent">Recently Enrolled</option>
                <option value="progress_high">Highest Progress</option>
                <option value="progress_low">Lowest Progress</option>
                <option value="az">Alphabetical (A-Z)</option>
              </select>
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      {filteredAndSortedCourses.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="bg-gray-50 dark:bg-gray-900 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 dark:border-gray-700">
            <Filter className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">We couldn't find any courses matching your current filters and search query.</p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveTab('All'); }}
            className="px-6 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAndSortedCourses.map(course => {
            const { statusBadge, badgeColor, actionLabel, actionLink, actionColor, actionVariant } = getCourseStatusAndAction(course);
            const timeLeft = Math.max(1, Math.floor((100 - (course.progress_percentage || 0)) / 10)); // Mock time left
            
            return (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition duration-300 group">
                
                {/* Course Image & Hero Info */}
                <div className="md:w-64 shrink-0 flex flex-col gap-3">
                  <div className="w-full h-36 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 relative">
                    {course.image ? (
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    ) : (
                      <BookOpen className="w-12 h-12 absolute inset-0 m-auto text-gray-400" />
                    )}
                    <div className={`absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm ${badgeColor}`}>
                      {statusBadge}
                    </div>
                  </div>
                  
                  {/* Hero Change UI */}
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 border border-indigo-100 dark:border-indigo-900/50">
                    <p className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 mb-1 flex items-center gap-1">
                      <Sparkles size={12}/> Current Hero
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{course.instructor_style}</p>
                    <button 
                      onClick={() => handleHeroChange(course)}
                      className="mt-2 w-full py-1.5 text-xs font-bold text-brand-orange dark:text-indigo-400 bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-800 rounded hover:bg-brand-orange hover:text-white dark:hover:bg-brand-orange dark:hover:text-white transition-colors"
                    >
                      Change Hero
                    </button>
                  </div>
                </div>

                {/* Course Details & Actions */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{course.description || "Learn and master this subject with your favorite celebrity hero."}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">
                      {course.progress_percentage > 0 && !course.completed && (
                        <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-2.5 py-1 rounded-full border border-orange-200 dark:border-orange-800/50">
                          <Clock size={14} /> ~{timeLeft} hrs left
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                        <BookOpen size={14} /> {course.level || 'Beginner'}
                      </div>
                      <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                        Last accessed: 2 days ago
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-end mb-1">
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-sm font-bold text-brand-orange dark:text-brand-orange-light">{course.progress_percentage || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${course.completed ? 'bg-green-500' : 'bg-brand-orange'}`} 
                          style={{ width: `${course.progress_percentage || 0}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Link 
                        to={actionLink}
                        className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 ${
                          actionVariant === 'outline' 
                            ? 'border ' + actionColor 
                            : actionColor
                        }`}
                      >
                        {course.completed ? <CheckCircle size={18} /> : <PlayCircle size={18} />}
                        {actionLabel}
                      </Link>
                      
                      {course.completed && (
                        <button
                          onClick={() => handleRestart(course.id)}
                          className="px-6 py-2.5 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 border bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          <RotateCcw size={18} />
                          Restart Course
                        </button>
                      )}
                      
                      {course.completed && !course.certificate_code && (
                        <span className="flex items-center gap-2 text-sm font-medium text-orange-600 dark:text-orange-400 px-4 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                          <AlertCircle size={18}/> Certificate Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
      )}

      {/* Hero Selection Modal Component */}
      <HeroSelectionModal
        isOpen={isHeroModalOpen}
        onClose={() => setIsHeroModalOpen(false)}
        currentHeroId={selectedCourseForHero?.instructor_style}
        onSelectHero={handleHeroConfirm}
      />
    </div>
  );
};

export default EnrolledCourses;
