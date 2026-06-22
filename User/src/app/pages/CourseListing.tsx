import { useState, useMemo, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../../utils/mockCourses';
import { useDebounce } from '../../hooks/useDebounce';

export function CourseListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('all');
  
  // Read search query 'q' from searchParams, default to empty string
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Sync searchQuery when urlQuery changes (e.g. searching from navbar)
  useEffect(() => {
    setSearchQuery(urlQuery);
  }, [urlQuery]);

  // Sync debounced search to URL params
  useEffect(() => {
    if (debouncedSearchQuery) {
      setSearchParams({ q: debouncedSearchQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedSearchQuery, setSearchParams]);

  const displayedCourses = useMemo(() => {
    let result = mockCourses;

    // Filter by tab
    if (activeTab !== 'all') {
      result = result.filter(c => c.type === (activeTab === 'paths' ? 'learning-path' : 'course'));
    }

    // Filter by search
    if (debouncedSearchQuery) {
      const q = debouncedSearchQuery.toLowerCase();
      result = result.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q) ||
        c.topics.some(t => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activeTab, debouncedSearchQuery]);

  return (
    <div className="bg-[#0A0F1E] text-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#0D1B2A] pt-12 pb-16 px-6 border-b border-[#1A2540]">
        <div className="max-w-[1280px] mx-auto text-left">
          <h1 className="text-[40px] sm:text-[56px] font-black text-white leading-[1.1] tracking-tight">
            Learn without limits.
          </h1>
          <p className="text-[17px] text-[#9CA3AF] mt-3 font-medium">
            Explore our curated free courses taught by industry professionals.
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-6 mt-6 text-[15px]">
            <span className="text-[#9CA3AF]">
              <strong className="text-white font-bold">1.3M</strong> Learners
            </span>
            <div className="w-[1px] h-4 bg-[#1A2540]"></div>
            <span className="text-[#9CA3AF]">
              <strong className="text-[#00C97B] font-bold">4.8★</strong> Avg Rating
            </span>
            <div className="w-[1px] h-4 bg-[#1A2540]"></div>
            <span className="text-[#9CA3AF]">
              <strong className="text-[#FF6B2B] font-bold">120+</strong> Courses
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-[520px] mt-7">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={18} />
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[52px] pl-12 pr-12 bg-[#111827] border border-[#1A2540] rounded-full text-[15px] text-white outline-none focus:border-[#FF6B2B] focus:shadow-[0_0_0_4px_rgba(255,107,43,0.15)] transition-all placeholder:text-[#9CA3AF]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white cursor-pointer border-none bg-transparent"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-8 mt-8 border-b border-[#1A2540] max-w-[1280px]">
            {[
              { id: 'all', label: 'All' },
              { id: 'courses', label: 'Courses' },
              { id: 'paths', label: 'Learning Paths' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[15px] font-bold pb-3 relative transition-colors cursor-pointer border-none bg-transparent ${
                  activeTab === tab.id
                    ? 'text-[#FF6B2B]'
                    : 'text-[#9CA3AF] hover:text-white'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#FF6B2B] rounded-t-full transition-all duration-200"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="pt-10 pb-20 px-6 bg-[#0A0F1E]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <h2 className="text-[15px] font-semibold text-[#9CA3AF]">
              Showing {displayedCourses.length} {displayedCourses.length === 1 ? 'result' : 'results'}
            </h2>
          </div>

          {displayedCourses.length > 0 ? (
            <div 
              key={`${activeTab}-${searchQuery}`} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-[fadeIn_0.3s_ease-out]"
            >
              {displayedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center">
              <Search size={48} className="text-[#1A2540] mb-4" />
              <h3 className="text-[20px] font-bold text-white mb-2">No courses found</h3>
              <p className="text-[#9CA3AF] max-w-md mx-auto mb-6">
                We couldn't find any courses matching "{searchQuery}".
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-[#FF6B2B] text-white rounded-[8px] font-semibold text-[14px] hover:bg-[#E05315] transition-colors cursor-pointer shadow-sm border-none"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </section>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
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
