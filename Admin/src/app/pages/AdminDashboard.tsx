import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { ArrowUpRight, Award, BookOpen, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import MetricCards from '../../components/Dashboard/MetricCards';
import QuickActions from '../../components/Dashboard/QuickActions';

const enrollmentData = [
  { name: 'May 1', enrollments: 200 },
  { name: 'May 5', enrollments: 320 },
  { name: 'May 10', enrollments: 450 },
  { name: 'May 15', enrollments: 380 },
  { name: 'May 20', enrollments: 590 },
  { name: 'May 25', enrollments: 710 },
  { name: 'May 30', enrollments: 840 },
];

const topCourses = [
  { name: 'Machine Learning Fundamentals', count: 1240 },
  { name: 'Full-Stack Web Development', count: 980 },
  { name: 'AWS Cloud Practitioner', count: 850 },
  { name: 'Data Sci with Python', count: 720 },
  { name: 'Cybersecurity Essentials', count: 640 },
].reverse(); // reverse so horizontal bar chart renders descending

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Enrolled in', course: 'Machine Learning Fundamentals', time: '5 mins ago' },
  { id: 2, user: 'Sarah Connor', action: 'Completed', course: 'AWS Cloud Practitioner', time: '12 mins ago' },
  { id: 3, user: 'Bruce Wayne', action: 'Enrolled in', course: 'Cybersecurity Essentials', time: '22 mins ago' },
  { id: 4, user: 'Clark Kent', action: 'Enrolled in', course: 'Full-Stack Web Development', time: '45 mins ago' },
  { id: 5, user: 'Barry Allen', action: 'Completed', course: 'Python Basics', time: '1 hour ago' },
  { id: 6, user: 'Diana Prince', action: 'Completed', course: 'Machine Learning Fundamentals', time: '2 hours ago' },
  { id: 7, user: 'Hal Jordan', action: 'Enrolled in', course: 'AWS Cloud Practitioner', time: '3 hours ago' },
  { id: 8, user: 'Arthur Curry', action: 'Enrolled in', course: 'Cybersecurity Essentials', time: '4 hours ago' },
  { id: 9, user: 'Victor Stone', action: 'Completed', course: 'Full-Stack Web Development', time: '5 hours ago' },
  { id: 10, user: 'Oliver Queen', action: 'Enrolled in', course: 'Python Basics', time: '6 hours ago' },
];

export function AdminDashboard() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#0A0F1E] font-sans pb-12 text-white">
      {/* Banner Strip */}
      <div className="bg-gradient-to-r from-[#111827] to-[#1A2540] h-[80px] w-full px-[40px] flex items-center justify-between border-b border-[#1E2D45] shadow-sm">
        <h2 className="text-[28px] font-bold text-white leading-tight">
          Good morning, Admin.
        </h2>
        <div className="text-right text-[#9CA3AF] text-[12px] font-medium">
          <div>{today}</div>
          <div className="text-[#9CA3AF]/60 text-[11px] mt-0.5">Last sync: 2 min ago</div>
        </div>
      </div>

      <div className="px-[40px] mt-8 space-y-8">
        {/* KPI Metric Cards Row */}
        <MetricCards />

        {/* Quick Actions Row */}
        <QuickActions />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">
          {/* Left: Line chart "Enrollments over time" */}
          <div className="bg-[#111827] rounded-[16px] border border-[#1E2D45] p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-white mb-5">Enrollments over time (30 days)</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6B2B" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#FF6B2B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#111827', borderRadius: 8, border: '1px solid #1E2D45', color: '#fff', fontSize: 12 }} />
                  <Area type="monotone" dataKey="enrollments" stroke="#FF6B2B" strokeWidth={3} fillOpacity={1} fill="url(#orangeGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Horizontal Bar Chart of Top 5 courses */}
          <div className="bg-[#111827] rounded-[16px] border border-[#1E2D45] p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-white mb-5">Top 5 Courses</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCourses} layout="vertical" margin={{ left: 10, right: 10, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#FFFFFF', fontWeight: 500 }} width={120} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#111827', borderRadius: 8, border: '1px solid #1E2D45', color: '#fff', fontSize: 12 }} />
                  <Bar dataKey="count" fill="#FF8C42" radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-[#111827] rounded-[16px] border border-[#1E2D45] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#1E2D45]">
            <h3 className="text-[16px] font-bold text-white">Recent Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1A2540]/30 border-b border-[#1E2D45] text-[12px] text-[#9CA3AF] font-bold uppercase tracking-wider">
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Course</th>
                  <th className="px-6 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E2D45] text-[14px]">
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-[#1A2540]/20 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{activity.user}</td>
                    <td className="px-6 py-4 text-[#9CA3AF]">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        activity.action === 'Completed' 
                          ? 'bg-[#00C97B]/10 text-[#00E88A] border border-[#00C97B]/20' 
                          : 'bg-[#4F8EF7]/10 text-[#4F8EF7] border border-[#4F8EF7]/20'
                      }`}>
                        {activity.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{activity.course}</td>
                    <td className="px-6 py-4 text-[#9CA3AF] text-[13px]">{activity.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
