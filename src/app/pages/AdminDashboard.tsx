import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { ArrowUpRight, Award, BookOpen, Users, TrendingUp, ShieldCheck } from 'lucide-react';

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
    <div className="flex flex-col min-h-screen bg-[#F8F7F4] font-sans pb-12">
      {/* Banner Strip */}
      <div className="bg-gradient-to-r from-[#2D1B69] to-[#1A0F3C] h-[80px] w-full px-[40px] flex items-center justify-between shadow-lg">
        <h2 className="text-[28px] font-bold text-white leading-tight">
          Good morning, Admin.
        </h2>
        <div className="text-right text-white/70 text-[12px] font-medium">
          <div>{today}</div>
          <div className="text-white/40 text-[11px] mt-0.5">Last sync: 2 min ago</div>
        </div>
      </div>

      <div className="px-[40px] mt-8 space-y-8">
        {/* KPI Row (4 cards, white bg, 12px radius, amber top border 3px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">Total Users</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                <Users size={16} />
              </div>
            </div>
            <div className="text-[28px] font-extrabold text-[#1A1A2E] mt-3">1,340</div>
            <div className="flex items-center gap-1 text-[12px] text-green-600 font-bold mt-2">
              <span>▲</span>
              <span>+12% this week</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">Active Courses</span>
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-500">
                <BookOpen size={16} />
              </div>
            </div>
            <div className="text-[28px] font-extrabold text-[#1A1A2E] mt-3">24</div>
            <div className="flex items-center gap-1 text-[12px] text-green-600 font-bold mt-2">
              <span>▲</span>
              <span>+2 this month</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">Total Enrollments</span>
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500">
                <TrendingUp size={16} />
              </div>
            </div>
            <div className="text-[28px] font-extrabold text-[#1A1A2E] mt-3">8,420</div>
            <div className="flex items-center gap-1 text-[12px] text-green-600 font-bold mt-2">
              <span>▲</span>
              <span>+340 this week</span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-[12px] border border-[#E2E1F0] border-t-[3px] border-t-[#F59E0B] p-5 shadow-sm transition-all hover:shadow-md">
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-bold text-[#6B6B80] uppercase tracking-wide">Completion Rate</span>
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
                <ShieldCheck size={16} />
              </div>
            </div>
            <div className="text-[28px] font-extrabold text-[#1A1A2E] mt-3">78%</div>
            <div className="flex items-center gap-1 text-[12px] text-green-600 font-bold mt-2">
              <span>▲</span>
              <span>+3% this month</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">
          {/* Left: Line chart "Enrollments over time" — indigo line, amber area fill 20% opacity */}
          <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Enrollments over time (30 days)</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <defs>
                    <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F0F7" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6B6B80' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#6B6B80' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1A1A2E', borderRadius: 8, border: 'none', color: '#fff', fontSize: 12 }} />
                  <Area type="monotone" dataKey="enrollments" stroke="#2D1B69" strokeWidth={3} fillOpacity={1} fill="url(#amberGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Horizontal Bar Chart of Top 5 courses */}
          <div className="bg-white rounded-[16px] border border-[#E2E1F0] p-6 shadow-sm">
            <h3 className="text-[16px] font-bold text-[#1A1A2E] mb-5">Top 5 Courses</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCourses} layout="vertical" margin={{ left: 10, right: 10, top: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F0F7" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#6B6B80' }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 10, fill: '#1A1A2E', fontWeight: 500 }} width={120} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1A1A2E', borderRadius: 8, border: 'none', color: '#fff', fontSize: 12 }} />
                  <Bar dataKey="count" fill="#F59E0B" radius={[0, 4, 4, 0]} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-[16px] border border-[#E2E1F0] shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-[#E2E1F0]">
            <h3 className="text-[16px] font-bold text-[#1A1A2E]">Recent Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8F7F4] border-b border-[#E2E1F0] text-[12px] text-[#6B6B80] font-bold uppercase tracking-wider">
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Course</th>
                  <th className="px-6 py-3">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E1F0] text-[14px]">
                {recentActivity.map((activity) => (
                  <tr key={activity.id} className="hover:bg-[#F8F7F4]/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#1A1A2E]">{activity.user}</td>
                    <td className="px-6 py-4 text-[#6B6B80]">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        activity.action === 'Completed' 
                          ? 'bg-green-50 text-green-600 border border-green-200' 
                          : 'bg-blue-50 text-blue-600 border border-blue-200'
                      }`}>
                        {activity.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#1A1A2E]">{activity.course}</td>
                    <td className="px-6 py-4 text-[#6B6B80] text-[13px]">{activity.time}</td>
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
