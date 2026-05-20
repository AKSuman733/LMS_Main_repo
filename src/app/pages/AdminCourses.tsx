import React, { useState, useEffect } from 'react';
import { mockCourses } from '../../utils/mockCourses';
import { CourseFormModal, DeleteConfirmModal } from '../components/CourseFormModal';
import { Search, Plus, Download, Users, BookOpen, Star, Edit, Eye, Trash2, ArrowLeft, ArrowRight, X } from 'lucide-react';

export function AdminCourses() {
  const [courses, setCourses] = useState<any[]>(mockCourses);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ type: 'all', level: 'all', status: 'all' });
  const [selected, setSelected] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);

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

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filters]);

  // Pagination calculation
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filtered.slice(startIndex, startIndex + itemsPerPage);

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
        return 'bg-green-50 text-green-700 border border-green-200';
      case 'Intermediate':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'Advanced':
        return 'bg-red-50 text-red-700 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  const deletingCourseObject = courses.find((c) => c.id === deletingId);

  return (
    <div className="bg-[#F8F7F4] text-[#1A1A2E] p-[40px] min-h-[calc(100vh-64px)] font-sans relative overflow-x-hidden">
      {/* Toast Alert Banner */}
      {toast && (
        <div
          className={`fixed top-6 right-6 px-5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center justify-between gap-3 text-[14px] font-bold border ${
            toast.type === 'danger'
              ? 'bg-[#EF4444] border-red-500 text-white'
              : 'bg-[#F59E0B] border-amber-500 text-[#1A1A2E]'
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
            className="text-current opacity-70 hover:opacity-100 focus:outline-none cursor-pointer border-none bg-transparent font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1A1A2E] tracking-tight leading-tight">
            Courses Management
          </h2>
          <p className="text-[14px] text-[#6B6B80] mt-1">
            Manage, publish, and track all platform courses.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="h-11 px-5 border border-[#E2E1F0] hover:border-[#6B6B80] bg-white text-[#1A1A2E] text-[14px] font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-[#F8F7F4]"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button
            onClick={() => {
              setEditingCourse(null);
              setShowModal(true);
            }}
            className="h-11 px-5 bg-[#F59E0B] hover:bg-[#D97706] text-white text-[14px] font-extrabold rounded-[10px] flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
          >
            <Plus size={18} />
            Add Course
          </button>
        </div>
      </div>

      {/* STATS ROW (4 cards, white bg, amber border) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Courses */}
        <div className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between">
          <div>
            <div className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
              Total Courses
            </div>
            <div className="text-[28px] font-extrabold text-[#1A1A2E] mt-2">{totalCoursesCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
            <BookOpen size={18} />
          </div>
        </div>

        {/* Published */}
        <div className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between">
          <div>
            <div className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
              Published
            </div>
            <div className="text-[28px] font-extrabold text-green-600 mt-2">{publishedCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-green-50 text-green-500 flex items-center justify-center">
            <span>✓</span>
          </div>
        </div>

        {/* Drafts */}
        <div className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between">
          <div>
            <div className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
              Drafts
            </div>
            <div className="text-[28px] font-extrabold text-[#6B6B80] mt-2">{draftCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gray-50 text-gray-500 flex items-center justify-center">
            <span>📝</span>
          </div>
        </div>

        {/* Total Enrollments */}
        <div className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between">
          <div>
            <div className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">
              Total Enrollments
            </div>
            <div className="text-[28px] font-extrabold text-[#1A1A2E] mt-2">
              {totalEnrollments.toLocaleString()}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white border border-[#E2E1F0] rounded-[14px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-full md:w-[240px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B6B80] pointer-events-none">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full h-[40px] pl-10 pr-4 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-medium rounded-lg outline-none focus:border-[#F59E0B] transition-colors"
            />
          </div>

          {/* Type dropdown */}
          <select
            value={filters.type}
            onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
            className="h-[40px] px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg outline-none cursor-pointer focus:border-[#F59E0B]"
          >
            <option value="all">All Types</option>
            <option value="course">Courses only</option>
            <option value="learning-path">Learning Paths only</option>
          </select>

          {/* Level dropdown */}
          <select
            value={filters.level}
            onChange={(e) => setFilters((prev) => ({ ...prev, level: e.target.value }))}
            className="h-[40px] px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg outline-none cursor-pointer focus:border-[#F59E0B]"
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Status dropdown */}
          <select
            value={filters.status}
            onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
            className="h-[40px] px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg outline-none cursor-pointer focus:border-[#F59E0B]"
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
            className="text-[13px] font-bold text-[#F59E0B] hover:text-[#D97706] hover:underline cursor-pointer border-none bg-transparent outline-none flex items-center gap-1.5 self-start md:self-auto font-sans"
          >
            <X size={14} />
            Clear filters
          </button>
        )}
      </div>

      {/* BULK ACTIONS BAR (When checked) */}
      {selected.length > 0 && (
        <div className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] text-white px-6 py-3.5 rounded-[12px] shadow-lg flex items-center justify-between gap-4 mb-6 transition-all animate-fade-in-down">
          <div className="font-extrabold text-[14px]">
            {selected.length} {selected.length === 1 ? 'course' : 'courses'} selected
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkPublish}
              className="h-8 px-3.5 bg-white text-[#1A1A2E] hover:bg-white/90 text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
            >
              Publish Selected
            </button>
            <button
              onClick={handleBulkDraft}
              className="h-8 px-3.5 bg-white/20 text-[#1A1A2E] hover:bg-white/30 text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
            >
              Unpublish Selected
            </button>
            <button
              onClick={handleBulkDelete}
              className="h-8 px-3.5 bg-[#EF4444] text-white hover:bg-[#DC2626] text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
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

      {/* COURSES TABLE */}
      <div className="bg-white border border-[#E2E1F0] rounded-[12px] shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#F8F7F4] border-b border-[#E2E1F0] text-[12px] text-[#6B6B80] font-bold uppercase tracking-wider h-[46px]">
                <th className="px-5 w-[46px]">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={
                        paginatedCourses.length > 0 &&
                        paginatedCourses.every((c) => selected.includes(c.id))
                      }
                      onChange={handleSelectAll}
                      className="w-4 h-4 rounded border-[#E2E1F0] bg-white accent-[#F59E0B] cursor-pointer"
                    />
                  </label>
                </th>
                <th className="px-5 py-3.5 w-[380px]">Course</th>
                <th className="px-5 py-3.5">Instructor</th>
                <th className="px-5 py-3.5">Level</th>
                <th className="px-5 py-3.5">Enrolled</th>
                <th className="px-5 py-3.5">Rating</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E1F0] text-[14px]">
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course) => (
                  <tr
                    key={course.id}
                    className={`hover:bg-[#F8F7F4]/40 transition-colors h-[72px] ${
                      selected.includes(course.id) ? 'bg-[#F59E0B]/5' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-5">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selected.includes(course.id)}
                          onChange={(e) => handleSelectRow(course.id, e.target.checked)}
                          className="w-4 h-4 rounded border-[#E2E1F0] bg-white accent-[#F59E0B] cursor-pointer"
                        />
                      </label>
                    </td>

                    {/* Course */}
                    <td className="px-5 py-3 flex items-center gap-3">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-[56px] h-[36px] rounded-md object-cover border border-[#E2E1F0]"
                      />
                      <div className="min-w-0">
                        <div className="font-bold text-[#1A1A2E] truncate max-w-[280px]" title={course.title}>
                          {course.title}
                        </div>
                        <span
                          className={`inline-block text-[10px] font-extrabold uppercase rounded px-1.5 py-0.5 mt-1 ${
                            course.type === 'learning-path'
                              ? 'bg-emerald-50 text-[#059669] border border-emerald-200'
                              : 'bg-indigo-50 text-[#8B5CF6] border border-indigo-200'
                          }`}
                        >
                          {course.type === 'learning-path' ? 'Learning Path' : 'Course'}
                        </span>
                      </div>
                    </td>

                    {/* Instructor */}
                    <td className="px-5 py-3 text-[#6B6B80] font-medium">
                      {course.instructor}
                    </td>

                    {/* Level */}
                    <td className="px-5 py-3">
                      <span
                        className={`inline-block text-[10px] font-extrabold uppercase rounded-full px-2.5 py-0.5 ${getLevelBadgeClass(
                          course.level
                        )}`}
                      >
                        {course.level}
                      </span>
                    </td>

                    {/* Enrolled */}
                    <td className="px-5 py-3 text-[#1A1A2E] font-semibold">
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-[#6B6B80]" />
                        {course.enrolled?.toLocaleString()}
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="px-5 py-3 font-semibold text-[#1A1A2E]">
                      <div className="flex items-center gap-1">
                        <Star size={14} fill="#F59E0B" stroke="#F59E0B" />
                        <span>{course.rating || 'N/A'}</span>
                      </div>
                    </td>

                    {/* Status Switch */}
                    <td className="px-5 py-3">
                      <button
                        onClick={() => handleToggleStatus(course.id, course.status)}
                        className={`relative w-10 h-[22px] rounded-full transition-colors focus:outline-none cursor-pointer ${
                          course.status === 'published' ? 'bg-[#F59E0B]' : 'bg-[#4B5563]'
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
                        {/* Edit Button */}
                        <button
                          onClick={() => {
                            setEditingCourse(course);
                            setShowModal(true);
                          }}
                          className="w-8 h-8 rounded-md bg-transparent hover:bg-[#F8F7F4] text-[#6B6B80] hover:text-[#F59E0B] flex items-center justify-center transition-all cursor-pointer border-none focus:outline-none"
                          title="Edit Course"
                        >
                          <Edit size={15} />
                        </button>

                        {/* View Button */}
                        <button
                          onClick={() => window.open('/courses/' + course.id, '_blank')}
                          className="w-8 h-8 rounded-md bg-transparent hover:bg-[#F8F7F4] text-[#6B6B80] hover:text-[#8B5CF6] flex items-center justify-center transition-all cursor-pointer border-none focus:outline-none"
                          title="View Course"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDeleteTrigger(course.id)}
                          className="w-8 h-8 rounded-md bg-transparent hover:bg-[#F8F7F4] text-[#6B6B80] hover:text-[#EF4444] flex items-center justify-center transition-all cursor-pointer border-none focus:outline-none"
                          title="Delete Course"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-[#6B6B80] font-medium">
                    No courses matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL */}
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-[#F8F7F4]/40 border-t border-[#E2E1F0] flex items-center justify-between flex-wrap gap-4 text-[13px] text-[#6B6B80]">
            <div>
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalItems)} of{' '}
              {totalItems} courses
            </div>
            <div className="flex items-center gap-3">
              {/* Prev */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E1F0] text-[#1A1A2E] hover:bg-[#F8F7F4] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer focus:outline-none"
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
                        ? 'bg-[#F59E0B] text-white shadow-sm'
                        : 'bg-transparent text-[#6B6B80] hover:bg-[#F8F7F4] hover:text-[#1A1A2E]'
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
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E1F0] text-[#1A1A2E] hover:bg-[#F8F7F4] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer focus:outline-none"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

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
    </div>
  );
}

export default AdminCourses;
