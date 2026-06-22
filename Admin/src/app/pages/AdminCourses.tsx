import React, { useState, useEffect } from 'react';
import { mockCourses } from '../../utils/mockCourses';
import { CourseFormModal, DeleteConfirmModal } from '../components/CourseFormModal';
import { Search, Plus, Download, Users, BookOpen, Star, Edit, Eye, Trash2, ArrowLeft, ArrowRight, X, ArrowUpDown } from 'lucide-react';
import { EmptyState } from '../../components/States/EmptyState';

interface Mentor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

const defaultMentors: Mentor[] = [
  {
    id: 'm-1',
    name: 'Virat Kohli',
    role: 'Elite Athletic Mentor & Leadership Coach',
    avatar: '/virat.png',
    bio: 'Virat Kohli is one of the greatest cricketers of all time. As a mentor, he brings world-class expertise in mental toughness, peak performance leadership, and high-performance team building.'
  },
  {
    id: 'm-2',
    name: 'Sachin Tendulkar',
    role: 'Master Performance Mentor',
    avatar: '/sachin.jpg',
    bio: 'Sachin Tendulkar, the "God of Cricket," is a global sporting icon. He teaches focus, long-term discipline, dealing with pressure, and mastering core fundamentals under high-stress conditions.'
  },
  {
    id: 'm-3',
    name: 'Arijit Singh',
    role: 'Creative Expression & Focus Mentor',
    avatar: '/arijit.png',
    bio: 'Arijit Singh is one of India\'s most celebrated playback singers. He mentors students on creative execution, consistency, vocal and performance control, and workflow focusing strategies.'
  },
  {
    id: 'm-4',
    name: 'Shah Rukh Khan',
    role: 'Cinema & Charisma Mentor',
    avatar: '/shahrukh.jpg',
    bio: 'Shah Rukh Khan, the "King of Bollywood," is a global film superstar. He mentors students on charisma, screen presence, public speaking, storytelling, and building a world-class personal brand.'
  },
  {
    id: 'm-5',
    name: 'Salman Khan',
    role: 'Fitness & Screen Presence Mentor',
    avatar: '/salman.jpg',
    bio: 'Salman Khan is an iconic actor and philanthropist. He provides coaching on physical fitness, screen authority, action execution, confidence, and mass-market audience engagement.'
  },
  {
    id: 'm-6',
    name: 'Amitabh Bachchan',
    role: 'Legendary Voice & Character Mentor',
    avatar: '/amitabh.jpg',
    bio: 'Amitabh Bachchan is a legendary film superstar with a career spanning five decades. He mentors on voice modulation, character acting, professional discipline, longevity, and deep focus.'
  },
  {
    id: 'm-7',
    name: 'Deepika Padukone',
    role: 'Global Brand & Acting Mentor',
    avatar: '/deepika.jpg',
    bio: 'Deepika Padukone is a global icon and critically acclaimed actor. She coaches on cinematic versatility, dealing with global media, emotional depth in performance, and mental well-being.'
  },
  {
    id: 'm-8',
    name: 'Ranbir Kapoor',
    role: 'Method Acting & Screenplay Expert',
    avatar: '/ranbir.jpg',
    bio: 'Ranbir Kapoor is one of modern Hindi cinema\'s most versatile actors. He teaches character immersion, method acting, working with directors, and emotional authenticity on screen.'
  }
];

export function AdminCourses() {
  const [courses, setCourses] = useState<any[]>(mockCourses);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ type: 'all', level: 'all', status: 'all' });
  const [selected, setSelected] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

  // Sorting state
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Handle header sort triggers
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [mentorsList, setMentorsList] = useState<Mentor[]>(() => {
    const saved = localStorage.getItem('learnify_mentors');
    if (saved) {
      try {
        const parsed: Mentor[] = JSON.parse(saved);
        return parsed.map(p => {
          const def = defaultMentors.find(d => d.id === p.id);
          return def ? { ...p, avatar: def.avatar } : p;
        });
      } catch (e) {
        return defaultMentors;
      }
    }
    return defaultMentors;
  });
  const [newMentorForm, setNewMentorForm] = useState({
    name: '',
    role: '',
    bio: '',
    avatarType: 'preset-virat',
    customAvatarUrl: ''
  });

  useEffect(() => {
    localStorage.setItem('learnify_mentors', JSON.stringify(mentorsList));
  }, [mentorsList]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'danger' } | null>(null);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message: string, type: 'success' | 'danger' = 'success') => {
    setToast({ message, type });
  };

  // Filter logic
  const filtered = courses
    .filter((c) => {
      const term = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(term) ||
        c.instructor.toLowerCase().includes(term)
      );
    })
    .filter((c) => filters.type === 'all' || c.type === filters.type)
    .filter((c) => filters.level === 'all' || c.level === filters.level)
    .filter((c) => filters.status === 'all' || c.status === filters.status);

  // Sort logic
  let sortedFiltered = [...filtered];
  if (sortField) {
    sortedFiltered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else {
        return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      }
    });
  }

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setSelected([]);
  }, [search, filters]);

  // Pagination calculation
  const totalItems = sortedFiltered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = sortedFiltered.slice(startIndex, startIndex + itemsPerPage);

  // Stats calculation
  const totalCoursesCount = courses.length;
  const publishedCount = courses.filter((c) => c.status === 'published').length;
  const draftCount = courses.filter((c) => c.status === 'draft').length;
  const totalEnrollments = courses.reduce((sum, c) => sum + (c.enrolled || 0), 0);

  // Selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = paginatedCourses.map((c) => c.id);
      setSelected(allIds);
    } else {
      setSelected([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelected((prev) => [...prev, id]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== id));
    }
  };


  // Toggle single status
  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: nextStatus } : c))
    );
    showToast(`Course status updated to ${nextStatus} ✓`, 'success');
  };

  // Save handler (Add / Edit)
  const handleSaveCourse = (formData: any) => {
    if (editingCourse) {
      // Edit mode
      setCourses((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? { ...c, ...formData } : c))
      );
      showToast('Course updated ✓', 'success');
    } else {
      // Add mode
      const newCourse = {
        ...formData,
        id: 'course-' + Date.now(),
        enrolled: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setCourses((prev) => [newCourse, ...prev]);
      showToast('Course added successfully ✓', 'success');
    }
    setShowModal(false);
    setEditingCourse(null);
  };

  // Delete handler trigger
  const handleDeleteTrigger = (id: string) => {
    setDeletingId(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deletingId) {
      setCourses((prev) => prev.filter((c) => c.id !== deletingId));
      setSelected((prev) => prev.filter((id) => id !== deletingId));
      showToast('Course deleted', 'danger');
      setDeletingId(null);
      setDeleteModalOpen(false);
    }
  };

  // Bulk actions handlers
  const handleBulkPublish = () => {
    setCourses((prev) =>
      prev.map((c) => (selected.includes(c.id) ? { ...c, status: 'published' } : c))
    );
    showToast(`Published ${selected.length} selected courses ✓`);
    setSelected([]);
  };

  const handleBulkDraft = () => {
    setCourses((prev) =>
      prev.map((c) => (selected.includes(c.id) ? { ...c, status: 'draft' } : c))
    );
    showToast(`Unpublished ${selected.length} selected courses ✓`);
    setSelected([]);
  };

  const handleBulkDelete = () => {
    setCourses((prev) => prev.filter((c) => !selected.includes(c.id)));
    showToast(`Deleted ${selected.length} selected courses`, 'danger');
    setSelected([]);
  };

  const handleExportCSV = () => {
    // Generate CSV content
    const headers = ['ID', 'Title', 'Type', 'Instructor', 'Level', 'Enrolled', 'Rating', 'Status', 'Created At'];
    const rows = filtered.map((c) => [
      c.id,
      `"${c.title.replace(/"/g, '""')}"`,
      c.type,
      c.instructor,
      c.level,
      c.enrolled,
      c.rating,
      c.status,
      c.createdAt,
    ]);
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    // Create download element
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `learnify_courses_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV file exported successfully ✓');
  };

  const isFiltersActive =
    filters.type !== 'all' || filters.level !== 'all' || filters.status !== 'all';

  const clearFilters = () => {
    setFilters({ type: 'all', level: 'all', status: 'all' });
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-[#00C97B]/10 text-[#00E88A] border border-[#00C97B]/20';
      case 'Intermediate':
        return 'bg-[#FF8C42]/10 text-[#FF8C42] border border-[#FF8C42]/20';
      case 'Advanced':
        return 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20';
      default:
        return 'bg-[#1A2540] text-[#9CA3AF] border border-[#1E2D45]';
    }
  };

  const deletingCourseObject = courses.find((c) => c.id === deletingId);

  return (
    <div className="bg-[#0A0F1E] text-white p-[40px] min-h-[calc(100vh-64px)] font-sans relative overflow-x-hidden">
      {/* Toast Alert Banner */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center justify-between gap-3 text-[14px] font-bold border ${
            toast.type === 'danger'
              ? 'bg-[#111827] border-[#EF4444] text-[#EF4444]'
              : 'bg-[#111827] border-[#00C97B] text-[#00E88A]'
          }`}
          style={{
            animation: 'fadeInSlide 0.2s ease-out forwards',
          }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeInSlide {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}} />
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="text-current opacity-70 hover:opacity-100 focus:outline-none cursor-pointer border-none bg-transparent font-bold ml-2"
          >
            ×
          </button>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-white tracking-tight leading-tight">
            Courses Management
          </h2>
          <p className="text-[14px] text-[#9CA3AF] mt-1">
            Manage, publish, and track all platform courses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="h-11 px-5 border border-[#1E2D45] hover:border-white bg-[#111827] text-white text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-[#1A2540]"
          >
            <Download size={16} className="text-[#FF8C42]" />
            Export CSV
          </button>
          <button
            onClick={() => setIsMentorModalOpen(true)}
            className="h-11 px-5 bg-[#1E2D45] hover:bg-[#2A3B5C] border border-[#2D3F5E] text-white text-[14px] font-bold rounded-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-[0.97]"
          >
            <Users size={18} className="text-[#00C97B]" />
            Manage Mentors
          </button>
          <button
            onClick={() => {
              setEditingCourse(null);
              setShowModal(true);
            }}
            className="h-11 px-5 bg-[#FF6B2B] hover:bg-[#FF8C42] text-white text-[14px] font-bold rounded-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm active:scale-[0.97] border-none"
          >
            <Plus size={18} />
            Add Course
          </button>
        </div>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Courses */}
        <div className="bg-[#111827] rounded-[12px] border border-[#1E2D45] border-t-[3px] border-t-[#FF6B2B] p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between">
          <div>
            <div className="text-[13px] font-bold text-[#9CA3AF] uppercase tracking-wide">
              Total Courses
            </div>
            <div className="text-[28px] font-extrabold text-white mt-2">{totalCoursesCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#4F8EF7]/10 text-[#4F8EF7] flex items-center justify-center">
            <BookOpen size={18} />
          </div>
        </div>

        {/* Published */}
        <div className="bg-[#111827] rounded-[12px] border border-[#1E2D45] border-t-[3px] border-t-[#00C97B] p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between">
          <div>
            <div className="text-[13px] font-bold text-[#9CA3AF] uppercase tracking-wide">
              Published
            </div>
            <div className="text-[28px] font-extrabold text-[#00E88A] mt-2">{publishedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#00C97B]/10 text-[#00E88A] flex items-center justify-center">
            <span>✓</span>
          </div>
        </div>

        {/* Drafts */}
        <div className="bg-[#111827] rounded-[12px] border border-[#1E2D45] border-t-[3px] border-t-[#FF8C42] p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between">
          <div>
            <div className="text-[13px] font-bold text-[#9CA3AF] uppercase tracking-wide">
              Drafts
            </div>
            <div className="text-[28px] font-extrabold text-[#FF8C42] mt-2">{draftCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#1A2540] text-[#9CA3AF] flex items-center justify-center">
            <span>📝</span>
          </div>
        </div>

        {/* Total Enrollments */}
        <div className="bg-[#111827] rounded-[12px] border border-[#1E2D45] border-t-[3px] border-t-[#FF6B2B] p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between">
          <div>
            <div className="text-[13px] font-bold text-[#9CA3AF] uppercase tracking-wide">
              Total Enrollments
            </div>
            <div className="text-[28px] font-extrabold text-white mt-2">
              {totalEnrollments.toLocaleString()}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-[#FF6B2B]/10 text-[#FF6B2B] flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="bg-[#111827] border border-[#1E2D45] rounded-[14px] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-3 w-full lg:w-auto">
          {/* Search (44px target) */}
          <div className="relative w-full sm:w-[240px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#9CA3AF] pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full h-11 pl-10 pr-4 bg-[#1A2540] border border-[#1E2D45] text-white text-[13px] font-medium rounded-lg outline-none focus:border-[#FF6B2B] transition-colors"
            />
          </div>

          {/* Type dropdown (44px target) */}
          <select
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
            className="w-full sm:w-auto h-11 px-3 bg-[#1A2540] border border-[#1E2D45] text-white text-[13px] font-semibold rounded-lg outline-none cursor-pointer focus:border-[#FF6B2B]"
          >
            <option value="all">All Types</option>
            <option value="course">Courses only</option>
            <option value="learning-path">Learning Paths only</option>
          </select>

          {/* Level dropdown (44px target) */}
          <select
            value={filters.level}
            onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value }))}
            className="w-full sm:w-auto h-11 px-3 bg-[#1A2540] border border-[#1E2D45] text-white text-[13px] font-semibold rounded-lg outline-none cursor-pointer focus:border-[#FF6B2B]"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Status dropdown (44px target) */}
          <select
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            className="w-full sm:w-auto h-11 px-3 bg-[#1A2540] border border-[#1E2D45] text-white text-[13px] font-semibold rounded-lg outline-none cursor-pointer focus:border-[#FF6B2B]"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Clear filters link */}
        {isFiltersActive && (
          <button
            onClick={clearFilters}
            className="text-[13px] font-bold text-[#FF6B2B] hover:text-[#FF8C42] hover:underline cursor-pointer border-none bg-transparent outline-none flex items-center gap-1.5 self-start lg:self-auto font-sans"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      {/* BULK ACTIONS BAR */}
      {selected.length > 0 && (
        <div className="bg-gradient-to-r from-[#FF6B2B] to-[#FF8C42] text-white px-6 py-3.5 rounded-[12px] shadow-lg flex items-center justify-between gap-4 mb-6 transition-all animate-fade-in-down">
          <div className="font-extrabold text-[14px]">
            {selected.length} {selected.length === 1 ? 'course' : 'courses'} selected
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkPublish}
              className="h-8 px-3.5 bg-white text-[#0A0F1E] hover:bg-white/90 text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
            >
              Publish Selected
            </button>
            <button
              onClick={handleBulkDraft}
              className="h-8 px-3.5 bg-white/20 text-white hover:bg-white/30 text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
            >
              Unpublish Selected
            </button>
            <button
              onClick={handleBulkDelete}
              className="h-8 px-3.5 bg-[#EF4444] text-white hover:bg-[#B91C1C] text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelected([])}
              className="text-white hover:opacity-75 transition-opacity focus:outline-none ml-2 cursor-pointer font-bold text-[18px]"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Helper highlighter */}
      {(() => {
        const highlightText = (text: string, searchQuery: string) => {
          if (!searchQuery) return text;
          const parts = text.split(new RegExp(`(${searchQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
          return (
            <>
              {parts.map((part, i) =>
                part.toLowerCase() === searchQuery.toLowerCase() ? (
                  <mark key={i} style={{ backgroundColor: 'rgba(255, 107, 43, 0.25)', color: '#FF6B2B', borderRadius: '2px', padding: '0 2px', fontWeight: 'bold' }}>
                    {part}
                  </mark>
                ) : (
                  part
                )
              )}
            </>
          );
        };

        const getLevelBadgeClass = (level: string) => {
          switch (level) {
            case 'Beginner':
              return 'bg-[#00C97B]/10 text-[#00E88A] border border-[#00C97B]/20';
            case 'Intermediate':
              return 'bg-[#FF8C42]/10 text-[#FF8C42] border border-[#FF8C42]/20';
            case 'Advanced':
              return 'bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20';
            default:
              return 'bg-[#1A2540] text-[#9CA3AF] border border-[#1E2D45]';
          }
        };

        return paginatedCourses.length === 0 ? (
          <div className="p-8 bg-[#111827] border border-[#1E2D45] rounded-[12px]">
            <EmptyState
              icon="🔍"
              title="No Courses Found"
              message="No courses match your active search terms or selected filters."
              actionLabel="Clear All Filters"
              onAction={clearFilters}
            />
          </div>
        ) : (
          <div className="bg-[#111827] border border-[#1E2D45] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-[#1A2540]/30 border-b border-[#1E2D45] text-[12px] text-[#9CA3AF] font-bold uppercase tracking-wider h-[46px]">
                    <th className="px-5 w-[46px]">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={
                            paginatedCourses.length > 0 &&
                            paginatedCourses.every((c) => selected.includes(c.id))
                          }
                          onChange={handleSelectAll}
                          className="w-4 h-4 rounded border-[#1E2D45] bg-[#1A2540] accent-[#FF6B2B] cursor-pointer"
                        />
                      </label>
                    </th>
                    <th onClick={() => handleSort('title')} className="px-5 py-3.5 w-[380px] cursor-pointer hover:text-white transition-colors">
                      <div className="flex items-center gap-1.5 select-none">
                        Course
                        <ArrowUpDown size={14} className="text-[#6B7280]" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('instructor')} className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors">
                      <div className="flex items-center gap-1.5 select-none">
                        Instructor
                        <ArrowUpDown size={14} className="text-[#6B7280]" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('level')} className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors">
                      <div className="flex items-center gap-1.5 select-none">
                        Level
                        <ArrowUpDown size={14} className="text-[#6B7280]" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('enrolled')} className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors">
                      <div className="flex items-center gap-1.5 select-none">
                        Enrolled
                        <ArrowUpDown size={14} className="text-[#6B7280]" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('rating')} className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors">
                      <div className="flex items-center gap-1.5 select-none">
                        Rating
                        <ArrowUpDown size={14} className="text-[#6B7280]" />
                      </div>
                    </th>
                    <th onClick={() => handleSort('status')} className="px-5 py-3.5 cursor-pointer hover:text-white transition-colors">
                      <div className="flex items-center gap-1.5 select-none">
                        Status
                        <ArrowUpDown size={14} className="text-[#6B7280]" />
                      </div>
                    </th>
                    <th className="px-5 py-3.5 text-right pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2D45] text-[14px]">
                  {paginatedCourses.map((course) => (
                    <tr
                      key={course.id}
                      className={`hover:bg-[#1A2540]/20 transition-colors h-[72px] ${
                        selected.includes(course.id) ? 'bg-[#FF6B2B]/5' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="px-5">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selected.includes(course.id)}
                            onChange={(e) => handleSelectRow(course.id, e.target.checked)}
                            className="w-4 h-4 rounded border-[#1E2D45] bg-[#1A2540] accent-[#FF6B2B] cursor-pointer"
                          />
                        </label>
                      </td>

                      {/* Course */}
                      <td className="px-5 py-3 flex items-center gap-3">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-[56px] h-[36px] rounded-md object-cover border border-[#1E2D45]"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate max-w-[280px]" title={course.title}>
                            {highlightText(course.title, search)}
                          </div>
                          <span
                            className={`inline-block text-[10px] font-bold uppercase rounded px-1.5 py-0.5 mt-1 ${
                              course.type === 'learning-path'
                                ? 'bg-[#00C97B]/10 text-[#00E88A] border border-[#00C97B]/20'
                                : 'bg-[#4F8EF7]/10 text-[#4F8EF7] border border-[#4F8EF7]/20'
                            }`}
                          >
                            {course.type === 'learning-path' ? 'Learning Path' : 'Course'}
                          </span>
                        </div>
                      </td>

                      {/* Instructor */}
                      <td className="px-5 py-3 text-[#9CA3AF] font-medium">
                        {highlightText(course.instructor, search)}
                      </td>

                      {/* Level */}
                      <td className="px-5 py-3">
                        <span
                          className={`inline-block text-[10px] font-bold uppercase rounded-full px-2.5 py-0.5 ${getLevelBadgeClass(
                            course.level
                          )}`}
                        >
                          {course.level}
                        </span>
                      </td>

                      {/* Enrolled */}
                      <td className="px-5 py-3 text-white font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Users size={14} className="text-[#9CA3AF]" />
                          {course.enrolled?.toLocaleString()}
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-5 py-3 font-semibold text-white">
                        <div className="flex items-center gap-1">
                          <Star size={14} fill="#FF8C42" stroke="#FF8C42" />
                          <span>{course.rating || 'N/A'}</span>
                        </div>
                      </td>

                      {/* Status Switch */}
                      <td className="px-5 py-3">
                        <button
                          onClick={() => handleToggleStatus(course.id, course.status)}
                          className={`relative w-10 h-[22px] rounded-full transition-colors focus:outline-none cursor-pointer border-none ${
                            course.status === 'published' ? 'bg-[#FF6B2B]' : 'bg-[#1A2540]'
                          }`}
                        >
                          <div
                            className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${
                              course.status === 'published' ? 'translate-x-[20px]' : 'translate-x-[2px]'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3 text-right pr-6">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setEditingCourse(course);
                              setShowModal(true);
                            }}
                            className="w-8 h-8 rounded-md bg-transparent hover:bg-[#1A2540] text-[#9CA3AF] hover:text-[#FF6B2B] flex items-center justify-center transition-all cursor-pointer border-none focus:outline-none active:scale-[0.97]"
                            title="Edit Course"
                            aria-label="Edit Course"
                          >
                            <Edit size={15} />
                          </button>

                          <button
                            onClick={() => window.open('/courses/' + course.id, '_blank')}
                            className="w-8 h-8 rounded-md bg-transparent hover:bg-[#1A2540] text-[#9CA3AF] hover:text-[#4F8EF7] flex items-center justify-center transition-all cursor-pointer border-none focus:outline-none active:scale-[0.97]"
                            title="View Course"
                            aria-label="View Course"
                          >
                            <Eye size={15} />
                          </button>

                          <button
                            onClick={() => handleDeleteTrigger(course.id)}
                            className="w-8 h-8 rounded-md bg-transparent hover:bg-[#1A2540] text-[#9CA3AF] hover:text-[#EF4444] flex items-center justify-center transition-all cursor-pointer border-none focus:outline-none active:scale-[0.97]"
                            title="Delete Course"
                            aria-label="Delete Course"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* PAGINATION PANEL */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-[#1A2540]/20 border-t border-[#1E2D45] flex items-center justify-between flex-wrap gap-4 text-[13px] text-[#9CA3AF]">
                <div>
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of{' '}
                  {totalItems} courses
                </div>
                <div className="flex items-center gap-3">
                  {/* Prev */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    className="w-8 h-8 rounded-lg bg-[#111827] border border-[#1E2D45] text-white hover:bg-[#1A2540] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer focus:outline-none"
                  >
                    <ArrowLeft size={14} />
                  </button>

                  {/* Page numbers */}
                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg font-bold transition-colors cursor-pointer border-none focus:outline-none ${
                          currentPage === page
                            ? 'bg-[#FF6B2B] text-white shadow-sm'
                            : 'bg-transparent text-[#9CA3AF] hover:bg-[#1A2540] hover:text-white'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    className="w-8 h-8 rounded-lg bg-[#111827] border border-[#1E2D45] text-white hover:bg-[#1A2540] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer focus:outline-none"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* Slide-over form modal container */}
      {showModal && (
        <CourseFormModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setEditingCourse(null);
          }}
          onSave={handleSaveCourse}
          course={editingCourse}
        />
      )}

      {/* Centered delete modal container */}
      {deleteModalOpen && (
        <DeleteConfirmModal
          isOpen={deleteModalOpen}
          onClose={() => {
            setDeleteModalOpen(false);
            setDeletingId(null);
          }}
          onConfirm={handleConfirmDelete}
          courseTitle={deletingCourseObject?.title || ''}
        />
      )}

      {/* 🪟 ADMIN MENTORS MANAGEMENT MODAL */}
      {isMentorModalOpen && (
        <div 
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMentorModalOpen(false)}
        >
          <div 
            className="bg-[#111827] border border-[#1E2D45] rounded-[20px] w-full max-w-[950px] p-6 relative shadow-[0_10px_32px_rgba(0,0,0,0.5)] text-left max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              type="button"
              className="absolute top-4 right-4 text-[#9CA3AF] hover:text-white p-1.5 rounded-full hover:bg-[#1A2540] transition-colors border-none bg-transparent cursor-pointer"
              onClick={() => setIsMentorModalOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="mb-6">
              <h3 className="text-[22px] font-extrabold text-white mb-1 tracking-tight">Platform Mentors Directory</h3>
              <p className="text-[13.5px] text-[#9CA3AF]">Create, view, and manage celebrity and custom mentors across courses.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left side: Mentors List */}
              <div className="flex flex-col min-h-0">
                <h4 className="text-[14px] font-bold text-[#FF8C42] mb-4 uppercase tracking-wider">Active Mentors Directory</h4>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {mentorsList.map((mentor) => {
                    const isDefault = defaultMentors.some(dm => dm.id === mentor.id);
                    return (
                      <div 
                        key={mentor.id}
                        className="flex items-start gap-3.5 p-3.5 rounded-[12px] bg-[#1A2540]/30 border border-[#1E2D45] hover:border-[#FF6B2B]/30 transition-all"
                      >
                        <img 
                          src={mentor.avatar} 
                          alt={mentor.name} 
                          className="w-12 h-12 rounded-full object-cover border border-[#1E2D45] flex-shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${mentor.name}`;
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="text-[14px] font-bold text-white truncate">{mentor.name}</h5>
                            {!isDefault && (
                              <button
                                type="button"
                                onClick={() => {
                                  setMentorsList(prev => prev.filter(m => m.id !== mentor.id));
                                  showToast(`Mentor "${mentor.name}" deleted successfully.`, 'danger');
                                }}
                                className="text-[#EF4444] hover:text-[#B91C1C] bg-transparent border-none cursor-pointer p-1 rounded hover:bg-[#EF4444]/10 transition-colors"
                                title="Delete Mentor"
                                aria-label="Delete Mentor"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                          <span className="text-[12px] text-[#FF8C42] font-semibold block mt-0.5">{mentor.role}</span>
                          <p className="text-[12px] text-[#9CA3AF] mt-1.5 leading-relaxed overflow-hidden text-ellipsis whitespace-normal" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{mentor.bio}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right side: Create Mentor Form */}
              <div className="bg-[#1A2540]/20 border border-[#1E2D45] rounded-xl p-5">
                <h4 className="text-[14px] font-bold text-[#FF8C42] mb-4 uppercase tracking-wider">Create New Mentor</h4>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    
                    // Resolve avatar
                    let avatarUrl = '';
                    if (newMentorForm.avatarType === 'preset-virat') {
                      avatarUrl = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=150&fit=crop&q=80';
                    } else if (newMentorForm.avatarType === 'preset-sachin') {
                      avatarUrl = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&q=80';
                    } else if (newMentorForm.avatarType === 'preset-arijit') {
                      avatarUrl = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&q=80';
                    } else if (newMentorForm.avatarType === 'preset-srk') {
                      avatarUrl = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80';
                    } else if (newMentorForm.avatarType === 'preset-salman') {
                      avatarUrl = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&q=80';
                    } else if (newMentorForm.avatarType === 'preset-amitabh') {
                      avatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80';
                    } else if (newMentorForm.avatarType === 'preset-deepika') {
                      avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&q=80';
                    } else if (newMentorForm.avatarType === 'preset-ranbir') {
                      avatarUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80';
                    } else {
                      avatarUrl = newMentorForm.customAvatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${newMentorForm.name}`;
                    }

                    const newId = `m-${Date.now()}`;
                    const newMentor: Mentor = {
                      id: newId,
                      name: newMentorForm.name,
                      role: newMentorForm.role,
                      avatar: avatarUrl,
                      bio: newMentorForm.bio
                    };

                    setMentorsList(prev => [...prev, newMentor]);
                    setNewMentorForm({
                      name: '',
                      role: '',
                      bio: '',
                      avatarType: 'preset-virat',
                      customAvatarUrl: ''
                    });
                    showToast(`Mentor "${newMentor.name}" created successfully! 🚀`, 'success');
                  }}
                  className="space-y-4 text-left"
                >
                  <div>
                    <label className="block text-[11px] font-bold text-[#9CA3AF] mb-1.5 uppercase tracking-wide">Mentor Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Shah Rukh Khan"
                      value={newMentorForm.name}
                      onChange={(e) => setNewMentorForm({ ...newMentorForm, name: e.target.value })}
                      className="w-full bg-[#1A2540] border border-[#1E2D45] rounded-[10px] px-4 py-2 text-white text-[13.5px] outline-none focus:border-[#FF6B2B] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#9CA3AF] mb-1.5 uppercase tracking-wide">Professional Role</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Cinema & Brand Coach"
                      value={newMentorForm.role}
                      onChange={(e) => setNewMentorForm({ ...newMentorForm, role: e.target.value })}
                      className="w-full bg-[#1A2540] border border-[#1E2D45] rounded-[10px] px-4 py-2 text-white text-[13.5px] outline-none focus:border-[#FF6B2B] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#9CA3AF] mb-1.5 uppercase tracking-wide">Biography</label>
                    <textarea 
                      required
                      placeholder="Introduce the mentor's domain expertise..."
                      value={newMentorForm.bio}
                      onChange={(e) => setNewMentorForm({ ...newMentorForm, bio: e.target.value })}
                      className="w-full bg-[#1A2540] border border-[#1E2D45] rounded-[10px] px-4 py-2 text-white text-[13.5px] outline-none focus:border-[#FF6B2B] transition-all h-[76px] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#9CA3AF] mb-1.5 uppercase tracking-wide">Photo Avatar Source</label>
                    <select 
                      value={newMentorForm.avatarType}
                      onChange={(e) => setNewMentorForm({ ...newMentorForm, avatarType: e.target.value })}
                      className="w-full bg-[#1A2540] border border-[#1E2D45] text-white text-[13.5px] outline-none focus:border-[#FF6B2B] transition-all mb-2"
                      style={{ height: '38px', borderRadius: '10px', padding: '0 10px' }}
                    >
                      <option value="preset-virat">Virat Kohli Photo 🏏</option>
                      <option value="preset-sachin">Sachin Tendulkar Photo 🏏</option>
                      <option value="preset-arijit">Arijit Singh Photo 🎵</option>
                      <option value="preset-srk">Shah Rukh Khan Photo 🎬</option>
                      <option value="preset-salman">Salman Khan Photo 💪</option>
                      <option value="preset-amitabh">Amitabh Bachchan Photo 🎙️</option>
                      <option value="preset-deepika">Deepika Padukone Photo 👠</option>
                      <option value="preset-ranbir">Ranbir Kapoor Photo 🎬</option>
                      <option value="custom">Custom Photo URL 🌐</option>
                    </select>

                    {newMentorForm.avatarType === 'custom' && (
                      <input 
                        type="url" 
                        placeholder="Paste image URL (e.g. https://...)"
                        value={newMentorForm.customAvatarUrl}
                        onChange={(e) => setNewMentorForm({ ...newMentorForm, customAvatarUrl: e.target.value })}
                        className="w-full bg-[#1A2540] border border-[#1E2D45] rounded-[10px] px-4 py-2 text-white text-[13.5px] outline-none focus:border-[#FF6B2B] transition-all"
                      />
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setIsMentorModalOpen(false)}
                      className="px-4 py-2 border border-[#1E2D45] bg-transparent text-[#9CA3AF] hover:text-white hover:bg-[#1A2540] rounded-[10px] font-bold text-[13px] cursor-pointer"
                    >
                      Close
                    </button>
                    <button 
                      type="submit" 
                      className="px-5 py-2 bg-[#FF6B2B] hover:bg-[#FF8C42] text-white rounded-[10px] font-bold text-[13px] cursor-pointer border-none shadow-sm"
                    >
                      Create Mentor
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCourses;
