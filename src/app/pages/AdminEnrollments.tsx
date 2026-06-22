import React, { useState, useEffect } from 'react';
import { getEnrollments } from '../../utils/enrollmentStore';
import { mockCourses } from '../../utils/mockCourses';
import { Search, Download, RefreshCw, Users, TrendingUp, Award, BarChart3, Eye, Mail, Trash2, ArrowLeft, ArrowRight, X, ClipboardList, ArrowUpDown, CheckSquare } from 'lucide-react';
import { EmptyState } from '../../components/States/EmptyState';

export function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState<any[]>(getEnrollments());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const itemsPerPage = 15;

  // Sorting state
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Selection state
  const [selectedEnrollments, setSelectedEnrollments] = useState<string[]>([]);

  // Live refresh every 5s
  useEffect(() => {
    const interval = setInterval(() => setEnrollments(getEnrollments()), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { 
    if (toast) { 
      const t = setTimeout(() => setToast(null), 3000); 
      return () => clearTimeout(t); 
    } 
  }, [toast]);

  useEffect(() => { 
    setCurrentPage(1); 
    setSelectedEnrollments([]);
  }, [search, statusFilter, courseFilter, dateRange]);

  // Stats
  const totalCount = enrollments.length;
  const activeCount = enrollments.filter(e => e.status === 'in-progress').length;
  const completedCount = enrollments.filter(e => e.status === 'completed').length;
  const avgRate = totalCount > 0 ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / totalCount) : 0;

  // Filter
  let filtered = enrollments
    .filter(e => e.studentName.toLowerCase().includes(search.toLowerCase()) || e.courseTitle.toLowerCase().includes(search.toLowerCase()))
    .filter(e => statusFilter === 'all' || e.status === statusFilter)
    .filter(e => courseFilter === 'all' || e.courseId === courseFilter);

  if (dateRange !== 'all') {
    const days = dateRange === '7' ? 7 : dateRange === '30' ? 30 : 90;
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    filtered = filtered.filter(e => e.enrolledAt >= cutoff);
  }

  // Sort Logic
  if (sortField) {
    filtered = [...filtered].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'enrolledAt' || sortField === 'lastActive') {
        aVal = new Date(a[sortField]).getTime();
        bVal = new Date(b[sortField]).getTime();
      }

      if (typeof aVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      } else {
        return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      }
    });
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEnrollments(paginated.map(p => p.id));
    } else {
      setSelectedEnrollments([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedEnrollments(prev => [...prev, id]);
    } else {
      setSelectedEnrollments(prev => prev.filter(item => item !== id));
    }
  };

  const handleBulkIssueCert = () => {
    const updated = enrollments.map(e => selectedEnrollments.includes(e.id) && e.status === 'completed' ? { ...e, certificateIssued: true } : e);
    setEnrollments(updated);
    localStorage.setItem('enrollments', JSON.stringify(updated));
    setToast(`Issued certificates for eligible selected students ✓`);
    setSelectedEnrollments([]);
  };

  const handleBulkRemove = () => {
    const updated = enrollments.filter(e => !selectedEnrollments.includes(e.id));
    setEnrollments(updated);
    localStorage.setItem('enrollments', JSON.stringify(updated));
    setToast(`Removed ${selectedEnrollments.length} enrollments successfully ✓`);
    setSelectedEnrollments([]);
  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIdx, startIdx + itemsPerPage);

  const formatDate = (d: string) => { try { return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); } catch { return d; } };
  const relativeTime = (d: string) => {
    const diff = Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return `${diff} days ago`;
  };

  const handleIssueCert = (id: string) => {
    const updated = enrollments.map(e => e.id === id ? { ...e, certificateIssued: true } : e);
    setEnrollments(updated);
    localStorage.setItem('enrollments', JSON.stringify(updated));
    setToast('Certificate issued ✓');
  };

  const handleDelete = (id: string) => {
    const updated = enrollments.filter(e => e.id !== id);
    setEnrollments(updated);
    localStorage.setItem('enrollments', JSON.stringify(updated));
    setDeleteConfirm(null);
    setToast('Enrollment removed');
  };

  const handleExport = () => {
    const headers = ['Student', 'Email', 'Course', 'Progress', 'Status', 'Enrolled Date', 'Last Active', 'Certificate'];
    const rows = filtered.map(e => [e.studentName, e.studentEmail, e.courseTitle, e.progress + '%', e.status, e.enrolledAt, e.lastActive, e.certificateIssued ? 'Yes' : 'No']);
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'enrollments.csv'; a.click();
    setToast('CSV exported ✓');
  };

  const statusBadge = (s: string) => {
    if (s === 'completed') return 'bg-green-50 text-green-700 border border-green-200';
    if (s === 'in-progress') return 'bg-amber-50 text-amber-700 border border-amber-200';
    return 'bg-blue-50 text-blue-700 border border-blue-200';
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setCourseFilter('all');
    setDateRange('all');
    setSortField(null);
  };

  // Search Highlighter
  const highlightText = (text: string, searchQuery: string) => {
    if (!searchQuery) return text;
    const parts = text.split(new RegExp(`(${searchQuery.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === searchQuery.toLowerCase() ? (
            <mark key={i} style={{ backgroundColor: 'rgba(245, 158, 11, 0.25)', color: '#D97706', borderRadius: '2px', padding: '0 2px', fontWeight: 'bold' }}>
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="bg-[#F8F7F4] text-[#1A1A2E] p-[40px] min-h-[calc(100vh-64px)] font-sans relative overflow-x-hidden">
      {/* Toast Notification Banner */}
      {toast && (
        <div
          className="fixed top-6 right-6 bg-[#F59E0B] text-[#1A1A2E] font-bold text-[13px] px-5 py-3.5 rounded-xl shadow-2xl z-50 flex items-center justify-between gap-3 border border-amber-400"
          style={{ animation: 'fadeInSlide 0.2s ease-out forwards' }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes fadeInSlide {
              from { transform: translateY(-20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}} />
          <span>{toast}</span>
          <button onClick={() => setToast(null)} className="text-current opacity-70 hover:opacity-100 font-bold ml-2 bg-transparent border-none cursor-pointer">×</button>
        </div>
      )}

      {/* Delete confirm modal dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-2xl p-6 w-[380px] shadow-2xl border border-[#E2E1F0] text-center z-50 text-[#1A1A2E]">
            <Trash2 size={32} className="mx-auto text-red-500 mb-3" />
            <h3 className="text-[18px] font-bold mb-2">Remove Enrollment?</h3>
            <p className="text-[13px] text-[#6B6B80] mb-5">This action will permanently delete this enrollment record.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 h-11 border border-[#E2E1F0] rounded-lg font-semibold text-[13px] cursor-pointer bg-white hover:bg-gray-50 text-[#1A1A2E]">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 h-11 bg-red-500 text-white rounded-lg font-bold text-[13px] cursor-pointer hover:bg-red-600 border-none">Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* Header section with touch friendly buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1A1A2E] tracking-tight">Enrollments Management</h2>
          <p className="text-[14px] text-[#6B6B80] mt-1">Track all student course enrollments in real time.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-1.5 mr-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[12px] font-bold text-green-600">Live Syncing</span>
          </div>
          <button onClick={() => setEnrollments(getEnrollments())} className="w-11 h-11 border border-[#E2E1F0] rounded-lg flex items-center justify-center bg-white hover:bg-gray-50 cursor-pointer text-[#6B6B80] focus:outline-none">
            <RefreshCw size={16} />
          </button>
          <button onClick={handleExport} className="h-11 px-5 border border-[#E2E1F0] bg-white text-[#1A1A2E] text-[13px] font-semibold rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 w-full sm:w-auto">
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Enrollments', value: totalCount, icon: <Users size={18} />, iconBg: 'bg-blue-50 text-blue-500' },
          { label: 'Active (In Progress)', value: activeCount, icon: <TrendingUp size={18} />, iconBg: 'bg-amber-50 text-amber-500' },
          { label: 'Completed', value: completedCount, icon: <Award size={18} />, iconBg: 'bg-green-50 text-green-500' },
          { label: 'Avg Completion Rate', value: avgRate + '%', icon: <BarChart3 size={18} />, iconBg: 'bg-purple-50 text-purple-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm hover:shadow-md transition-all flex items-center justify-between">
            <div><div className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">{s.label}</div><div className="text-[28px] font-extrabold text-[#1A1A2E] mt-2">{s.value}</div></div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.iconBg}`}>{s.icon}</div>
          </div>
        ))}
      </div>

      {/* Interactive Toolbar */}
      <div className="bg-white border border-[#E2E1F0] rounded-[14px] p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-3 w-full xl:w-auto">
          {/* Search bar (44px target) */}
          <div className="relative w-full sm:w-[280px]">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B6B80] pointer-events-none">
              <Search size={16} />
            </span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or course..." className="w-full h-11 pl-10 pr-4 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] rounded-lg outline-none focus:border-[#F59E0B]" />
          </div>

          {/* Status dropdown (44px target) */}
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full sm:w-auto h-11 px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg cursor-pointer focus:border-[#F59E0B]">
            <option value="all">All Status</option>
            <option value="enrolled">Enrolled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          {/* Course filter dropdown (44px target) */}
          <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)} className="w-full sm:w-auto h-11 px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg cursor-pointer focus:border-[#F59E0B] sm:max-w-[200px]">
            <option value="all">All Courses</option>
            {mockCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>

          {/* Date range filter dropdown (44px target) */}
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="w-full sm:w-auto h-11 px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg cursor-pointer focus:border-[#F59E0B]">
            <option value="all">All Time</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
        <div className="flex items-center justify-between gap-3 self-end xl:self-auto w-full xl:w-auto">
          {/* Active indicator */}
          {(search || statusFilter !== 'all' || courseFilter !== 'all' || dateRange !== 'all' || sortField) && (
            <button
              onClick={clearFilters}
              className="text-[#F59E0B] hover:text-[#D97706] hover:underline cursor-pointer border-none bg-transparent outline-none flex items-center gap-1.5 font-sans font-bold text-[13px]"
            >
              <X size={14} />
              Clear filters
            </button>
          )}
          <div className="bg-[#F59E0B]/20 text-[#D97706] text-[12px] font-extrabold px-3 py-2 rounded-lg border border-[#F59E0B]/30">{filtered.length} enrollments match</div>
        </div>
      </div>

      {/* BULK ACTIONS BAR */}
      {selectedEnrollments.length > 0 && (
        <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white px-6 py-3.5 rounded-[12px] shadow-lg flex items-center justify-between gap-4 mb-6 transition-all duration-200">
          <div className="font-extrabold text-[14px]">
            {selectedEnrollments.length} {selectedEnrollments.length === 1 ? 'enrollment' : 'enrollments'} selected
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkIssueCert}
              className="h-8 px-3.5 bg-white text-[#1A1A2E] hover:bg-white/90 text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none flex items-center gap-1.5"
            >
              <CheckSquare size={14} className="text-[#00C97B]" />
              Issue Certificates
            </button>
            <button
              onClick={handleBulkRemove}
              className="h-8 px-3.5 bg-[#EF4444] text-white hover:bg-[#DC2626] text-[12px] font-bold rounded-md transition-colors cursor-pointer border-none focus:outline-none"
            >
              Remove Selected
            </button>
            <button
              onClick={() => setSelectedEnrollments([])}
              className="text-white hover:opacity-75 transition-opacity focus:outline-none ml-2 cursor-pointer font-bold text-[18px]"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Table Content or Empty State component */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No Enrollments Found"
          message="No student enrollments matched your active query. Try clearing the search query or active filter settings."
          actionLabel="Clear All Filters"
          onAction={clearFilters}
        />
      ) : (
        <div className="bg-white border border-[#E2E1F0] rounded-[12px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead className="bg-[#F8F7F4] border-b border-[#E2E1F0]">
                <tr className="text-[12px] text-[#6B6B80] font-bold uppercase tracking-wider h-[46px]">
                  <th className="px-5 py-3 w-[48px]">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={paginated.length > 0 && paginated.every(p => selectedEnrollments.includes(p.id))}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-[#E2E1F0] bg-white accent-[#F59E0B] cursor-pointer"
                      />
                    </label>
                  </th>
                  <th onClick={() => handleSort('studentName')} className="px-5 py-3 cursor-pointer hover:text-[#1A1A2E] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Student
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('courseTitle')} className="px-5 py-3 cursor-pointer hover:text-[#1A1A2E] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Course
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('progress')} className="px-5 py-3 cursor-pointer hover:text-[#1A1A2E] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Progress
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th className="px-5 py-3 text-[#6B6B80]">Status</th>
                  <th onClick={() => handleSort('enrolledAt')} className="px-5 py-3 cursor-pointer hover:text-[#1A1A2E] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Enrolled
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th onClick={() => handleSort('lastActive')} className="px-5 py-3 cursor-pointer hover:text-[#1A1A2E] transition-colors">
                    <div className="flex items-center gap-1.5 select-none">
                      Last Active
                      <ArrowUpDown size={14} className="text-[#6B6B80]" />
                    </div>
                  </th>
                  <th className="px-5 py-3 text-[#6B6B80]">Certificate</th>
                  <th className="px-5 py-3 text-right pr-6 text-[#6B6B80]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E1F0] text-[14px]">
                {paginated.map(e => (
                  <tr
                    key={e.id}
                    className={`hover:bg-[#F8F7F4]/40 transition-colors h-[72px] ${
                      selectedEnrollments.includes(e.id) ? 'bg-[#F59E0B]/5' : ''
                    }`}
                  >
                    {/* Checkbox cell */}
                    <td className="px-5 py-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedEnrollments.includes(e.id)}
                          onChange={(el) => handleSelectRow(e.id, el.target.checked)}
                          className="w-4 h-4 rounded border-[#E2E1F0] bg-white accent-[#F59E0B] cursor-pointer"
                        />
                      </label>
                    </td>
                    {/* Student */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#D97706] text-white font-bold text-[12px] flex items-center justify-center flex-shrink-0">
                          {e.studentAvatar}
                        </div>
                        <div>
                          <div className="font-bold text-[#1A1A2E] text-[13.5px]">
                            {highlightText(e.studentName, search)}
                          </div>
                          <div className="text-[11px] text-[#6B6B80]">
                            {highlightText(e.studentEmail, search)}
                          </div>
                        </div>
                      </div>
                    </td>
                    {/* Course */}
                    <td className="px-5 py-3">
                      <div className="max-w-[200px]">
                        <div className="font-semibold text-[#1A1A2E] text-[13.5px] truncate" title={e.courseTitle}>
                          {highlightText(e.courseTitle, search)}
                        </div>
                        <span className={`inline-block text-[9px] font-bold uppercase rounded px-1.5 py-0.5 mt-1 ${
                          e.courseType === 'learning-path' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                        }`}>
                          {e.courseType === 'learning-path' ? 'Learning Path' : 'Course'}
                        </span>
                      </div>
                    </td>
                    {/* Progress */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-[100px] h-[6px] bg-[#E2E1F0] rounded-full overflow-hidden flex-shrink-0">
                          <div className={`h-full rounded-full ${e.status === 'completed' ? 'bg-[#22C55E]' : 'bg-[#F59E0B]'}`} style={{ width: `${e.progress}%` }} />
                        </div>
                        <span className="text-[12px] font-bold text-[#1A1A2E] w-[36px]">{e.progress}%</span>
                      </div>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3">
                      <span className={`inline-block text-[10px] font-bold uppercase rounded px-2 py-1 ${statusBadge(e.status)}`}>
                        {e.status.replace('-', ' ')}
                      </span>
                    </td>
                    {/* Date */}
                    <td className="px-5 py-3 text-[13px] text-[#6B6B80] font-medium">{formatDate(e.enrolledAt)}</td>
                    {/* Last Active */}
                    <td className="px-5 py-3 text-[13px] text-[#6B6B80] font-medium">{relativeTime(e.lastActive)}</td>
                    {/* Certificate */}
                    <td className="px-5 py-3">
                      {e.certificateIssued ? (
                        <span className="flex items-center gap-1 text-green-600 text-[12px] font-bold">
                          <Award size={14} className="text-[#F59E0B]" />
                          Issued
                        </span>
                      ) : e.status === 'completed' ? (
                        <button onClick={() => handleIssueCert(e.id)} className="h-9 px-3 rounded-lg text-[12px] font-bold text-[#F59E0B] hover:text-[#D97706] hover:bg-[#F8F7F4] cursor-pointer bg-transparent border-none flex items-center justify-center active:scale-[0.95] transition-all">Issue Cert</button>
                      ) : (
                        <span className="text-[#6B6B80]">—</span>
                      )}
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3 text-right pr-6">
                      <div className="flex items-center justify-end gap-1.5">
                        <a href={`mailto:${e.studentEmail}`} className="w-9 h-9 rounded-md hover:bg-[#F8F7F4] text-[#6B6B80] hover:text-[#2D1B69] flex items-center justify-center transition-all" title="Email Student">
                          <Mail size={15} />
                        </a>
                        <button onClick={() => setDeleteConfirm(e.id)} className="w-9 h-9 rounded-md hover:bg-[#F8F7F4] text-[#6B6B80] hover:text-red-500 flex items-center justify-center transition-all cursor-pointer border-none bg-transparent active:scale-[0.95]" title="Remove Enrollment">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination bar */}
          {totalPages > 1 && (
            <div className="px-6 py-4 bg-[#F8F7F4]/40 border-t border-[#E2E1F0] flex items-center justify-between text-[13px] text-[#6B6B80] flex-wrap gap-4">
              <div>Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filtered.length)} of {filtered.length} enrollments</div>
              <div className="flex items-center gap-2">
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-10 h-10 rounded-lg bg-white border border-[#E2E1F0] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-[#1A1A2E] hover:bg-gray-50"><ArrowLeft size={14} /></button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), currentPage + 2).map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)} className={`w-10 h-10 rounded-lg font-bold cursor-pointer border-none focus:outline-none ${currentPage === p ? 'bg-[#F59E0B] text-white shadow-sm' : 'text-[#6B6B80] hover:bg-gray-100 bg-transparent'}`}>{p}</button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-10 h-10 rounded-lg bg-white border border-[#E2E1F0] flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none cursor-pointer text-[#1A1A2E] hover:bg-gray-50"><ArrowRight size={14} /></button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminEnrollments;
