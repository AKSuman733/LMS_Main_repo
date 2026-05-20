import React, { useState, useEffect } from 'react';
import { getEnrollments } from '../../utils/enrollmentStore';
import { mockCourses } from '../../utils/mockCourses';
import { Search, Download, RefreshCw, Users, TrendingUp, Award, BarChart3, Eye, Mail, Trash2, ArrowLeft, ArrowRight, X, ClipboardList } from 'lucide-react';

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

  // Live refresh every 5s
  useEffect(() => {
    const interval = setInterval(() => setEnrollments(getEnrollments()), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);
  useEffect(() => { setCurrentPage(1); }, [search, statusFilter, courseFilter, dateRange]);

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

  return (
    <div className="bg-[#F8F7F4] text-[#1A1A2E] p-[40px] min-h-[calc(100vh-64px)] font-sans relative">
      {toast && <div className="fixed top-6 right-6 bg-[#F59E0B] text-[#1A1A2E] font-bold text-[13px] px-5 py-3 rounded-xl shadow-2xl z-50 border border-amber-400">{toast}</div>}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center"><div className="fixed inset-0 bg-black/50" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-2xl p-6 w-[380px] shadow-2xl border border-[#E2E1F0] text-center z-50">
            <Trash2 size={32} className="mx-auto text-red-500 mb-3" />
            <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-2">Remove Enrollment?</h3>
            <p className="text-[13px] text-[#6B6B80] mb-5">This will permanently remove this enrollment record.</p>
            <div className="flex gap-3"><button onClick={() => setDeleteConfirm(null)} className="flex-1 h-10 border border-[#E2E1F0] rounded-lg font-semibold text-[13px] cursor-pointer bg-white hover:bg-gray-50">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 h-10 bg-red-500 text-white rounded-lg font-bold text-[13px] cursor-pointer hover:bg-red-600">Remove</button></div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-[28px] font-extrabold text-[#1A1A2E]">Enrollments Management</h2>
          <p className="text-[14px] text-[#6B6B80] mt-1">Track all student course enrollments in real time.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-[12px] font-bold text-green-600">Live</span></div>
          <button onClick={() => setEnrollments(getEnrollments())} className="w-10 h-10 border border-[#E2E1F0] rounded-lg flex items-center justify-center bg-white hover:bg-gray-50 cursor-pointer text-[#6B6B80]"><RefreshCw size={16} /></button>
          <button onClick={handleExport} className="h-10 px-5 border border-[#E2E1F0] bg-white text-[#1A1A2E] text-[13px] font-semibold rounded-lg flex items-center gap-2 cursor-pointer hover:bg-gray-50"><Download size={15} />Export CSV</button>
        </div>
      </div>

      {/* Stats */}
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

      {/* Toolbar */}
      <div className="bg-white border border-[#E2E1F0] rounded-[14px] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full md:w-[280px]"><span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-[#6B6B80] pointer-events-none"><Search size={16} /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by student or course..." className="w-full h-10 pl-10 pr-4 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] rounded-lg outline-none focus:border-[#F59E0B]" /></div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-10 px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg cursor-pointer focus:border-[#F59E0B]">
            <option value="all">All Status</option><option value="enrolled">Enrolled</option><option value="in-progress">In Progress</option><option value="completed">Completed</option></select>
          <select value={courseFilter} onChange={e => setCourseFilter(e.target.value)} className="h-10 px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg cursor-pointer focus:border-[#F59E0B] max-w-[200px]">
            <option value="all">All Courses</option>{mockCourses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}</select>
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="h-10 px-3 bg-white border border-[#E2E1F0] text-[#1A1A2E] text-[13px] font-semibold rounded-lg cursor-pointer focus:border-[#F59E0B]">
            <option value="all">All Time</option><option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select>
        </div>
        <div className="bg-[#F59E0B] text-[#1A1A2E] text-[12px] font-extrabold px-3 py-1.5 rounded-lg">{filtered.length} enrollments</div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2E1F0] rounded-[12px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead><tr className="bg-[#F8F7F4] border-b border-[#E2E1F0] text-[12px] text-[#6B6B80] font-bold uppercase tracking-wider h-[46px]">
              <th className="px-5 py-3">Student</th><th className="px-5 py-3">Course</th><th className="px-5 py-3">Progress</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Enrolled</th><th className="px-5 py-3">Last Active</th><th className="px-5 py-3">Certificate</th><th className="px-5 py-3 text-right pr-6">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#E2E1F0] text-[14px]">
              {paginated.length > 0 ? paginated.map(e => (
                <tr key={e.id} className="hover:bg-[#F8F7F4]/50 transition-colors h-[64px]">
                  {/* Student */}
                  <td className="px-5 py-3"><div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#D97706] text-white font-bold text-[12px] flex items-center justify-center flex-shrink-0">{e.studentAvatar}</div>
                    <div><div className="font-bold text-[#1A1A2E] text-[13px]">{e.studentName}</div><div className="text-[11px] text-[#6B6B80]">{e.studentEmail}</div></div>
                  </div></td>
                  {/* Course */}
                  <td className="px-5 py-3"><div className="max-w-[200px]"><div className="font-semibold text-[#1A1A2E] text-[13px] truncate">{e.courseTitle}</div>
                    <span className={`inline-block text-[10px] font-extrabold uppercase rounded px-1.5 py-0.5 mt-0.5 ${e.courseType === 'learning-path' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'}`}>{e.courseType === 'learning-path' ? 'Path' : 'Course'}</span></div></td>
                  {/* Progress */}
                  <td className="px-5 py-3"><div className="flex items-center gap-2"><div className="w-[100px] h-[6px] bg-[#E2E1F0] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${e.status === 'completed' ? 'bg-green-500' : 'bg-[#F59E0B]'}`} style={{ width: `${e.progress}%` }} /></div>
                    <span className="text-[12px] font-bold text-[#1A1A2E] w-[36px]">{e.progress}%</span></div></td>
                  {/* Status */}
                  <td className="px-5 py-3"><span className={`inline-block text-[10px] font-extrabold uppercase rounded px-2 py-1 ${statusBadge(e.status)}`}>{e.status.replace('-', ' ')}</span></td>
                  {/* Date */}
                  <td className="px-5 py-3 text-[13px] text-[#6B6B80]">{formatDate(e.enrolledAt)}</td>
                  {/* Last Active */}
                  <td className="px-5 py-3 text-[13px] text-[#6B6B80]">{relativeTime(e.lastActive)}</td>
                  {/* Certificate */}
                  <td className="px-5 py-3">{e.certificateIssued ? (
                    <span className="flex items-center gap-1 text-green-600 text-[12px] font-bold"><Award size={14} className="text-[#F59E0B]" />Issued</span>
                  ) : e.status === 'completed' ? (
                    <button onClick={() => handleIssueCert(e.id)} className="text-[12px] font-bold text-[#F59E0B] hover:underline cursor-pointer bg-transparent border-none">Issue Cert</button>
                  ) : <span className="text-[#6B6B80]">—</span>}</td>
                  {/* Actions */}
                  <td className="px-5 py-3 text-right pr-6"><div className="flex items-center justify-end gap-1.5">
                    <a href={`mailto:${e.studentEmail}`} className="w-8 h-8 rounded-md hover:bg-[#F8F7F4] text-[#6B6B80] hover:text-blue-500 flex items-center justify-center transition-all" title="Email"><Mail size={15} /></a>
                    <button onClick={() => setDeleteConfirm(e.id)} className="w-8 h-8 rounded-md hover:bg-[#F8F7F4] text-[#6B6B80] hover:text-red-500 flex items-center justify-center transition-all cursor-pointer border-none bg-transparent" title="Remove"><Trash2 size={15} /></button>
                  </div></td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4"><ClipboardList size={28} className="text-indigo-400" /></div>
                  <p className="font-bold text-[#1A1A2E] text-[16px]">No enrollments found</p>
                  <p className="text-[13px] text-[#6B6B80] mt-1">Try adjusting your filters</p>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-6 py-4 bg-[#F8F7F4]/40 border-t border-[#E2E1F0] flex items-center justify-between text-[13px] text-[#6B6B80]">
            <div>Showing {startIdx + 1}-{Math.min(startIdx + itemsPerPage, filtered.length)} of {filtered.length}</div>
            <div className="flex items-center gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="w-8 h-8 rounded-lg bg-white border border-[#E2E1F0] flex items-center justify-center disabled:opacity-30 cursor-pointer"><ArrowLeft size={14} /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, currentPage - 3), currentPage + 2).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-lg font-bold cursor-pointer border-none ${currentPage === p ? 'bg-[#F59E0B] text-white' : 'text-[#6B6B80] hover:bg-gray-100'}`}>{p}</button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="w-8 h-8 rounded-lg bg-white border border-[#E2E1F0] flex items-center justify-center disabled:opacity-30 cursor-pointer"><ArrowRight size={14} /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminEnrollments;
