import React, { useState, useEffect } from 'react';
import { getEnrollments } from '../../utils/enrollmentStore';
import { mockCourses } from '../../utils/mockCourses';
import { FileText, BarChart3, Users, Award, TrendingUp, Shield, Download, Trash2, Plus, Calendar, Clock } from 'lucide-react';

const generateCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(row => Object.values(row).map(v => `"${v}"`).join(',')).join('\n');
  const csv = headers + '\n' + rows;
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename + '.csv'; a.click();
  URL.revokeObjectURL(url);
};

const recentReports = [
  { name: 'Enrollment Report - May 2026', type: 'Enrollment', by: 'Admin', date: 'May 18, 2026', size: '245 KB' },
  { name: 'Course Performance Q1', type: 'Performance', by: 'Admin', date: 'May 15, 2026', size: '180 KB' },
  { name: 'User Activity - Weekly', type: 'Activity', by: 'System', date: 'May 12, 2026', size: '320 KB' },
  { name: 'Certificate Report - April', type: 'Certificates', by: 'Admin', date: 'May 10, 2026', size: '95 KB' },
  { name: 'Revenue Summary Q1', type: 'Revenue', by: 'Admin', date: 'May 8, 2026', size: '150 KB' },
  { name: 'Audit Log - May Week 1', type: 'Audit', by: 'System', date: 'May 5, 2026', size: '410 KB' },
  { name: 'Enrollment Report - April', type: 'Enrollment', by: 'Admin', date: 'Apr 30, 2026', size: '230 KB' },
  { name: 'User Activity - Monthly', type: 'Activity', by: 'System', date: 'Apr 28, 2026', size: '520 KB' },
  { name: 'Course Performance - March', type: 'Performance', by: 'Admin', date: 'Apr 20, 2026', size: '190 KB' },
  { name: 'Certificate Report - March', type: 'Certificates', by: 'Admin', date: 'Apr 15, 2026', size: '88 KB' },
];

export function AdminReports() {
  const [toast, setToast] = useState<string | null>(null);
  const [schedules, setSchedules] = useState([
    { id: 's1', name: 'Weekly Enrollment Summary', schedule: 'Every Monday, 9:00 AM', enabled: true },
    { id: 's2', name: 'Monthly Performance Report', schedule: '1st of every month', enabled: false },
  ]);

  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); } }, [toast]);

  const handleGenerate = (type: string) => {
    const enrollments = getEnrollments();
    if (type === 'enrollment') {
      generateCSV(enrollments.map((e: any) => ({ Student: e.studentName, Email: e.studentEmail, Course: e.courseTitle, Progress: e.progress + '%', Status: e.status, EnrolledAt: e.enrolledAt })), 'enrollment_report');
      setToast('Enrollment report generated ✓');
    } else if (type === 'performance') {
      const data = mockCourses.map(c => ({ Course: c.title, Enrolled: c.enrolled, Rating: c.rating, Level: c.level, Status: c.status, Lessons: c.lessons }));
      generateCSV(data, 'course_performance');
      setToast('Course performance report generated ✓');
    } else {
      setToast('Report generated ✓');
    }
  };

  const reportCards = [
    { icon: <FileText size={20} />, title: 'Enrollment Report', desc: 'All student enrollments with progress and status', type: 'enrollment', last: 'May 18, 2026' },
    { icon: <BarChart3 size={20} />, title: 'Course Performance', desc: 'Course ratings, enrollments, completion rates', type: 'performance', last: 'May 15, 2026' },
    { icon: <Users size={20} />, title: 'User Activity', desc: 'Student login frequency and learning hours', type: 'activity', last: 'May 12, 2026' },
    { icon: <Award size={20} />, title: 'Certificates Issued', desc: 'All issued certificates with dates and courses', type: 'certificates', last: 'May 10, 2026' },
    { icon: <TrendingUp size={20} />, title: 'Revenue Report', desc: 'Platform growth metrics and projections', type: 'revenue', last: 'May 8, 2026' },
    { icon: <Shield size={20} />, title: 'Audit Log', desc: 'Admin actions, logins, and system events', type: 'audit', last: 'May 5, 2026' },
  ];

  return (
    <div className="bg-[#F8F7F4] text-[#1A1A2E] p-[40px] min-h-[calc(100vh-64px)] font-sans relative">
      {toast && <div className="fixed top-6 right-6 bg-[#F59E0B] text-[#1A1A2E] font-bold text-[13px] px-5 py-3 rounded-xl shadow-2xl z-50 border border-amber-400">{toast}</div>}

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[28px] font-extrabold text-[#1A1A2E]">Reports</h2>
        <p className="text-[14px] text-[#6B6B80] mt-1">Generate, schedule, and download platform reports.</p>
      </div>

      {/* Generate Reports */}
      <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-4">Generate Reports</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {reportCards.map((r, i) => (
          <div key={i} className="bg-white rounded-[12px] border border-[#E2E1F0] p-5 shadow-sm hover:shadow-md transition-all">
            <div className="w-11 h-11 rounded-full bg-[#F59E0B] text-white flex items-center justify-center mb-4">{r.icon}</div>
            <h4 className="text-[15px] font-bold text-[#1A1A2E] mb-1">{r.title}</h4>
            <p className="text-[13px] text-[#6B6B80] mb-4 line-clamp-2">{r.desc}</p>
            <button onClick={() => handleGenerate(r.type)} className="w-full h-10 bg-[#F59E0B] hover:bg-[#D97706] text-white font-bold text-[13px] rounded-lg cursor-pointer border-none transition-all">Generate</button>
            <p className="text-[11px] text-[#6B6B80] mt-2.5 flex items-center gap-1"><Clock size={11} />Last: {r.last}</p>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <h3 className="text-[18px] font-bold text-[#1A1A2E] mb-4">Recent Reports</h3>
      <div className="bg-white rounded-[12px] border border-[#E2E1F0] shadow-sm overflow-hidden mb-12">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead><tr className="bg-[#F8F7F4] border-b border-[#E2E1F0] text-[12px] text-[#6B6B80] font-bold uppercase tracking-wider h-[44px]">
              <th className="px-5 py-3">Report Name</th><th className="px-5 py-3">Type</th><th className="px-5 py-3">Generated By</th><th className="px-5 py-3">Date</th><th className="px-5 py-3">Size</th><th className="px-5 py-3 text-right pr-6">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-[#E2E1F0] text-[14px]">
              {recentReports.map((r, i) => (
                <tr key={i} className="hover:bg-[#F8F7F4]/50 transition-colors h-[52px]">
                  <td className="px-5 py-3 font-semibold text-[#1A1A2E]">{r.name}</td>
                  <td className="px-5 py-3"><span className="text-[11px] font-bold uppercase bg-indigo-50 text-indigo-600 border border-indigo-200 px-2 py-0.5 rounded">{r.type}</span></td>
                  <td className="px-5 py-3 text-[#6B6B80]">{r.by}</td>
                  <td className="px-5 py-3 text-[#6B6B80] text-[13px]">{r.date}</td>
                  <td className="px-5 py-3 text-[#6B6B80] text-[13px]">{r.size}</td>
                  <td className="px-5 py-3 text-right pr-6">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="w-8 h-8 rounded-md hover:bg-gray-100 text-[#F59E0B] flex items-center justify-center cursor-pointer border-none bg-transparent"><Download size={15} /></button>
                      <button className="w-8 h-8 rounded-md hover:bg-gray-100 text-red-400 hover:text-red-500 flex items-center justify-center cursor-pointer border-none bg-transparent"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[18px] font-bold text-[#1A1A2E]">Scheduled Reports</h3>
        <button className="h-9 px-4 border border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-white font-bold text-[13px] rounded-lg cursor-pointer bg-transparent transition-all flex items-center gap-1.5"><Plus size={15} />Add Schedule</button>
      </div>
      <div className="space-y-3">
        {schedules.map(s => (
          <div key={s.id} className="bg-white rounded-[12px] border border-[#E2E1F0] p-5 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#F59E0B] flex items-center justify-center"><Calendar size={18} /></div>
              <div><div className="font-bold text-[#1A1A2E] text-[14px]">{s.name}</div><div className="text-[12px] text-[#6B6B80] mt-0.5">{s.schedule}</div></div>
            </div>
            <button onClick={() => setSchedules(prev => prev.map(x => x.id === s.id ? { ...x, enabled: !x.enabled } : x))} className={`relative w-10 h-[22px] rounded-full transition-colors cursor-pointer focus:outline-none ${s.enabled ? 'bg-[#F59E0B]' : 'bg-gray-300'}`}>
              <div className={`absolute top-[2px] w-[18px] h-[18px] bg-white rounded-full transition-transform ${s.enabled ? 'translate-x-[20px]' : 'translate-x-[2px]'}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminReports;
