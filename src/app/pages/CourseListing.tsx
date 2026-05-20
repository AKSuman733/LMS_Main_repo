import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { CourseCard } from '../components/CourseCard';
import { mockCourses } from '../../utils/mockCourses';
import { useDebounce } from '../../hooks/useDebounce';

export function CourseListing() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

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
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-[#F7F6F3] pt-[80px] pb-16 px-6">
        <div className="max-w-[1280px] mx-auto text-left">
          <h1 className="text-[56px] font-bold text-[#1A1A2E] leading-[1.1] tracking-tight">
            Learn without limits.
          </h1>
          <p className="text-[18px] text-[#6B6B80] mt-3 font-medium">
            Explore 120+ free courses taught by industry experts.
          </p>

          {/* Stats Row */}
          <div className="flex items-center gap-6 mt-6 text-[16px]">
            <span className="text-[#6B6B80]">
              <strong className="text-[#1A1A2E] font-bold">1.3M</strong> Learners
            </span>
            <div className="w-[1px] h-4 bg-[#E2E1F0]"></div>
            <span className="text-[#6B6B80]">
              <strong className="text-[#1A1A2E] font-bold">4.5★</strong> Avg Rating
            </span>
            <div className="w-[1px] h-4 bg-[#E2E1F0]"></div>
            <span className="text-[#6B6B80]">
              <strong className="text-[#1A1A2E] font-bold">120+</strong> Courses
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-[520px] mt-7">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2D1B69]" size={18} />
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-[52px] pl-12 pr-12 bg-white border border-[#E2E1F0] rounded-[28px] text-[15px] outline-none focus:border-[#2D1B69] focus:shadow-[0_0_0_4px_rgba(45,27,105,0.12)] transition-all placeholder:text-[#9CA3AF]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B6B80] hover:text-[#1A1A2E] cursor-pointer"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-8 mt-8 border-b border-[#E2E1F0] max-w-[1280px]">
            {[
              { id: 'all', label: 'All' },
              { id: 'courses', label: 'Courses' },
              { id: 'paths', label: 'Learning Paths' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`text-[15px] font-medium pb-3 relative transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-[#2D1B69]'
                    : 'text-[#6B6B80] hover:text-[#2D1B69]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#BBFF00] rounded-t-full transition-all duration-200"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="pt-10 pb-20 px-6 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-8">
            <h2 className="text-[16px] font-semibold text-[#6B6B80]">
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
              <Search size={48} className="text-[#E2E1F0] mb-4" />
              <h3 className="text-[20px] font-bold text-[#1A1A2E] mb-2">No courses found</h3>
              <p className="text-[#6B6B80] max-w-md mx-auto mb-6">
                We couldn't find any courses matching "{searchQuery}".
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                }}
                className="px-6 py-2.5 bg-[#2D1B69] text-[#BBFF00] rounded-[8px] font-semibold text-[14px] hover:bg-[#3D2B89] transition-colors cursor-pointer shadow-sm"
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
