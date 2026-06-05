import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Users,
  BookOpen,
  LayoutDashboard,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Target,
  Award,
  Video
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const InstructorDashboard = () => {
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    totalHours: 0,
    activeEnrollments: 0
  });

  const enrollmentData = [
    { name: 'Mon', count: 4 },
    { name: 'Tue', count: 7 },
    { name: 'Wed', count: 5 },
    { name: 'Thu', count: 12 },
    { name: 'Fri', count: 9 },
    { name: 'Sat', count: 15 },
    { name: 'Sun', count: 11 },
  ];

  useEffect(() => {
    // In a real app, we would fetch instructor specific stats here
    // For now, setting some meaningful default stats
    setStats({
      courses: 3,
      students: 1450,
      totalHours: 24,
      activeEnrollments: 85
    });
  }, []);

  const statCards = [
    { title: 'Your Courses', value: stats.courses, icon: BookOpen, color: '#8b5cf6', trend: '+1 this month' },
    { title: 'Total Students', value: stats.students.toLocaleString(), icon: Users, color: '#10b981', trend: '+12% increase' },
    { title: 'Teaching Hours', value: stats.totalHours, icon: Video, color: '#3b82f6', trend: 'Lifetime' },
    { title: 'Recent Enrollments', value: stats.activeEnrollments, icon: TrendingUp, color: '#f59e0b', trend: 'Last 7 days' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header-row">
        <div>
          <h1 className="text-3xl font-bold mb-2">Instructor Dashboard</h1>
          <p className="text-gray-500">Manage your courses and track your impact as an educator</p>
        </div>
        <button className="btn btn-primary" style={{ height: 'fit-content' }}>
          <BookOpen size={18} /> View My Courses
        </button>
      </div>

      {/* Horizontal Stats Cards */}
      <div className="stats-grid-horizontal mb-10">
        {statCards.map((stat, i) => (
          <div key={i} className="stat-card-new card glass group">
            <div className="stat-icon-new" style={{ background: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info-new">
              <span className="stat-label-new">{stat.title}</span>
              <div className="stat-value-container">
                <span className="stat-value-new">{stat.value}</span>
                <span className="stat-trend-new">{stat.trend}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-charts-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        <div className="chart-container-large card glass">
          <div className="chart-title-row">
            <TrendingUp size={20} className="text-primary-color" />
            <h2>Student Enrollment Trends</h2>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)'}}
                  itemStyle={{color: 'var(--text-secondary)'}}
                />
                <Area type="monotone" dataKey="count" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorEnroll)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-container-small card glass">
          <div className="chart-title-row">
            <Award size={20} className="text-primary-color" />
            <h2>Achievements</h2>
          </div>
          <div className="achievements-list mt-4 flex flex-col gap-4">
            <div className="achievement-item flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                <Users size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">1K Students Club</h4>
                <p className="text-xs text-gray-500">Reached 1000+ total students</p>
              </div>
            </div>
            <div className="achievement-item flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                <BookOpen size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">Content Creator</h4>
                <p className="text-xs text-gray-500">Published 3 comprehensive courses</p>
              </div>
            </div>
            <div className="achievement-item flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5 opacity-50">
              <div className="w-10 h-10 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-500">
                <Award size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold">Top Rated</h4>
                <p className="text-xs text-gray-500">Maintain 4.8+ average rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
