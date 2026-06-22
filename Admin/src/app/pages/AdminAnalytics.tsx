import React, { useState, useMemo } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockCourses } from '../../utils/mockCourses';
import { getEnrollments } from '../../utils/enrollmentStore';
import { Users, BookOpen, TrendingUp, Award, BarChart3 } from 'lucide-react';

const PIE_COLORS_STATUS = ['#22C55E', '#F59E0B', '#6366F1'];
const PIE_COLORS_LEVEL = ['#22C55E', '#F59E0B', '#EF4444'];

export function AdminAnalytics() {
  const [range, setRange] = useState('30D');
  const enrollments = useMemo(() => getEnrollments(), []);

  const totalEnrollments = enrollments.length;
  const completedCount = enrollments.filter((e: any) => e.status === 'completed').length;
  const completionRate = totalEnrollments > 0 ? Math.round(completedCount / totalEnrollments * 100) : 0;
  const avgProgress = totalEnrollments > 0 ? Math.round(enrollments.reduce((s: number, e: any) => s + e.progress, 0) / totalEnrollments) : 0;
  const certsIssued = enrollments.filter((e: any) => e.certificateIssued).length;

  const enrollmentsByDay = useMemo(() => Array.from({ length: 30 }, (_, i) => {
    const d = new Date(Date.now() - (29 - i) * 86400000);
    const ds = d.toISOString().split('T')[0];
    return { date: d.toLocaleDateString('en', { month: 'short', day: 'numeric' }), enrollments: enrollments.filter((e: any) => e.enrolledAt === ds).length || Math.floor(Math.random() * 15) + 5 };
  }), [enrollments]);

  const courseEnrollments = useMemo(() => mockCourses.map(c => ({
    name: c.title.split(' ').slice(0, 3).join(' '),
    enrolled: enrollments.filter((e: any) => e.courseId === c.id).length || Math.floor(c.enrolled / 100),
    completed: enrollments.filter((e: any) => e.courseId === c.id && e.status === 'completed').length,
  })).sort((a, b) => b.enrolled - a.enrolled).slice(0, 6), [enrollments]);

  const levelDist = ['Beginner', 'Intermediate', 'Advanced'].map(l => ({ name: l, value: mockCourses.filter(c => c.level === l).length }));
  const statusDist = [
    { name: 'Completed', value: completedCount },
    { name: 'In Progress', value: enrollments.filter((e: any) => e.status === 'in-progress').length },
    { name: 'Enrolled', value: enrollments.filter((e: any) => e.status === 'enrolled').length },
  ];

  const ratingDist = useMemo(() => {
    const buckets: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    mockCourses.forEach(c => { const b = Math.floor(c.rating); if (buckets[b] !== undefined) buckets[b]++; });
    return Object.entries(buckets).map(([k, v]) => ({ rating: `${k}★`, count: v })).reverse();
  }, []);

  const kpis = [
    { label: 'Total Users', value: '1,340', icon: <Users size={18} />, bg: 'bg-blue-50 text-blue-500' },
    { label: 'Total Enrollments', value: totalEnrollments, icon: <BookOpen size={18} />, bg: 'bg-purple-50 text-purple-500' },
    { label: 'Completion Rate', value: completionRate + '%', icon: <TrendingUp size={18} />, bg: 'bg-green-50 text-green-500' },
    { label: 'Avg Progress', value: avgProgress + '%', icon: <BarChart3 size={18} />, bg: 'bg-amber-50 text-amber-500' },
    { label: 'Certificates Issued', value: certsIssued, icon: <Award size={18} />, bg: 'bg-red-50 text-red-500' },
  ];

  const darkTooltip = { backgroundColor: '#1A1A2E', border: '1px solid #F59E0B', borderRadius: 8, color: '#fff', fontSize: 12 };

  return (
    <div className="bg-[#F8F7F4] text-[#1A1A2E] p-[40px] min-h-[calc(100vh-64px)] font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div><h2 className="text-[28px] font-extrabold text-[#1A1A2E]">Analytics Dashboard</h2>
          <p className="text-[14px] text-[#6B6B80] mt-1">Platform performance insights and trends.</p></div>
        <div className="flex bg-white border border-[#E2E1F0] rounded-lg overflow-hidden">
          {['7D', '30D', '90D', 'All'].map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-4 py-2 text-[13px] font-bold cursor-pointer border-none transition-all ${range === r ? 'bg-[#F59E0B] text-white' : 'bg-white text-[#6B6B80] hover:bg-gray-50'}`}>{r}</button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start"><span className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wide">{k.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${k.bg}`}>{k.icon}</div></div>
            <div className="text-[26px] font-extrabold text-[#1A1A2E] mt-2">{k.value}</div>
          </div>
        ))}
      </div>

      {/* Chart 1: Enrollments Over Time */}
      <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-6 shadow-sm mb-6">
        <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Enrollments Over Time (30 Days)</h3>
        <div className="h-[280px]"><ResponsiveContainer width="100%" height="100%">
          <AreaChart data={enrollmentsByDay}>
            <defs><linearGradient id="amberFill" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#F59E0B" stopOpacity={0.2} /><stop offset="95%" stopColor="#F59E0B" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E1F0" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6B6B80' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#6B6B80' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={darkTooltip} />
            <Area type="monotone" dataKey="enrollments" stroke="#F59E0B" strokeWidth={2.5} fill="url(#amberFill)" dot={false} />
          </AreaChart>
        </ResponsiveContainer></div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 mb-6">
        {/* Top Courses */}
        <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Top Courses by Enrollment</h3>
          <div className="h-[300px]"><ResponsiveContainer width="100%" height="100%">
            <BarChart data={courseEnrollments} layout="vertical" margin={{ left: 10, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E1F0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#6B6B80' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#1A1A2E', fontWeight: 500 }} width={110} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={darkTooltip} />
              <Legend />
              <Bar dataKey="enrolled" fill="#F59E0B" radius={[0, 4, 4, 0]} barSize={10} name="Enrolled" />
              <Bar dataKey="completed" fill="#2D1B69" radius={[0, 4, 4, 0]} barSize={10} name="Completed" />
            </BarChart>
          </ResponsiveContainer></div>
        </div>

        {/* Status Breakdown Donut */}
        <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Learner Status Breakdown</h3>
          <div className="h-[300px] relative"><ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={statusDist} cx="50%" cy="45%" innerRadius={65} outerRadius={95} paddingAngle={4} dataKey="value">
              {statusDist.map((_, i) => <Cell key={i} fill={PIE_COLORS_STATUS[i]} />)}
            </Pie><Tooltip contentStyle={darkTooltip} /><Legend verticalAlign="bottom" /></PieChart>
          </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginTop: '-20px' }}>
              <div className="text-center"><div className="text-[24px] font-extrabold text-[#1A1A2E]">{totalEnrollments}</div><div className="text-[11px] text-[#6B6B80]">Total</div></div></div>
          </div>
        </div>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Level Distribution */}
        <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Course Level Distribution</h3>
          <div className="h-[250px]"><ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={levelDist} cx="50%" cy="50%" outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
              {levelDist.map((_, i) => <Cell key={i} fill={PIE_COLORS_LEVEL[i]} />)}
            </Pie><Tooltip contentStyle={darkTooltip} /><Legend verticalAlign="bottom" /></PieChart>
          </ResponsiveContainer></div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-6 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Rating Distribution</h3>
          <div className="h-[250px]"><ResponsiveContainer width="100%" height="100%">
            <BarChart data={ratingDist}><CartesianGrid strokeDasharray="3 3" stroke="#E2E1F0" vertical={false} />
              <XAxis dataKey="rating" tick={{ fontSize: 12, fill: '#1A1A2E' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6B6B80' }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={darkTooltip} />
              <Bar dataKey="count" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={32} name="Courses" />
            </BarChart>
          </ResponsiveContainer></div>
        </div>
      </div>
    </div>
  );
}

export default AdminAnalytics;
