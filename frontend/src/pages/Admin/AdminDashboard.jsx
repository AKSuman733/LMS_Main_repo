import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Users,
  ShieldCheck,
  BookOpen,
  LayoutDashboard,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Target,
  PlusCircle,
  UserPlus,
  CheckCircle,
  BarChart2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    admins: 0,
    instructors: 0,
    enrollments: 0,
    courses: 0
  });

  const chartData = stats.dailyMetrics || [
    { name: 'Mon', enrollments: 0 },
    { name: 'Tue', enrollments: 0 },
    { name: 'Wed', enrollments: 0 },
    { name: 'Thu', enrollments: 0 },
    { name: 'Fri', enrollments: 0 },
    { name: 'Sat', enrollments: 0 },
    { name: 'Sun', enrollments: 0 },
  ];

  const pieData = stats.categories && stats.categories.length > 0 ? stats.categories : [
    { name: 'No Data', value: 1 }
  ];

  const COLORS = ['#8b5cf6', '#10b981', '#3b82f6', '#ec4899', '#f59e0b', '#ef4444', '#06b6d4'];

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5001/api/auth/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching admin stats', err);
    }
  };

  const kpiCards = [
    { title: 'Total Active Users', value: stats.users || 0, color: '#10b981' }, // green
    { title: 'Total Courses', value: stats.courses || 0, color: '#14b8a6' }, // teal
    { title: 'Enrollments This Week', value: stats.recentEnrollments || 0, color: '#f97316' }, // orange
    { title: 'Course Completion Rate %', value: `${stats.completionRate || 0}%`, color: '#10b981', icon: 'check' },
    { title: 'Pending Approvals', value: stats.pendingApprovals || 0, color: '#ef4444' }, // red
    { title: 'System Health', value: stats.systemHealth || 'Optimal', color: '#10b981', icon: 'check' },
  ];

  const userDistributionData = [
    { name: 'Students', value: stats.users || 0 },
    { name: 'Admins', value: stats.admins || 0 },
  ];

  const USER_COLORS = ['#8b5cf6', '#ec4899'];

  return (
    <div className="admin-dashboard">
      <div className="admin-header-row">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
          <p className="text-gray-500">Welcome to UptoSkills administrative control center</p>
        </div>
      </div>

      {/* 6 Visual KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {kpiCards.map((card, i) => (
          <div key={i} style={{
            borderLeft: `4px solid ${card.color}`,
            backgroundColor: `${card.color}15`,
            padding: '16px 20px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <span style={{ 
              fontSize: '11px', 
              color: 'var(--text-secondary, #9ca3af)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px',
              marginBottom: '6px'
            }}>
              {card.title}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                color: 'var(--text-primary, #fff)' 
              }}>
                {card.value}
              </span>
              {card.icon === 'check' && (
                <ShieldCheck size={18} color={card.color} />
              )}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .quick-actions-grid {
            grid-template-columns: 1fr;
          }
        }
        .qa-btn {
          height: 45px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
        }
        .qa-btn:active {
          transform: scale(0.98);
        }
        .qa-btn-primary {
          background-color: #FF6B35;
          color: #fff;
          border: none;
        }
        .qa-btn-primary:hover {
          background-color: #e65c2b;
          box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
        }
        .qa-btn-secondary {
          background-color: transparent;
          color: #00B5A5;
          border: 2px solid #00B5A5;
        }
        .qa-btn-secondary:hover {
          background-color: rgba(0, 181, 165, 0.1);
          box-shadow: 0 4px 12px rgba(0, 181, 165, 0.2);
        }
      `}</style>

      {/* Quick Action Buttons */}
      <div className="quick-actions-grid">
        <button className="qa-btn qa-btn-primary" onClick={() => navigate('/admin/courses')}>
          <PlusCircle size={18} /> New Course
        </button>
        <button className="qa-btn qa-btn-primary" onClick={() => navigate('/admin/users')}>
          <UserPlus size={18} /> New Intern
        </button>
        <button className="qa-btn qa-btn-secondary" onClick={() => navigate('/admin/approvals')}>
          <CheckCircle size={18} /> Approve Pending
        </button>
        <button className="qa-btn qa-btn-secondary" onClick={() => navigate('/admin/dashboard')}>
          <BarChart2 size={18} /> View Reports
        </button>
      </div>

      <div className="dashboard-charts-grid">
        <div className="chart-container-large card glass">
          <div className="chart-title-row">
            <TrendingUp size={20} className="text-primary-color" />
            <h2>Daily Enrollment Metrics</h2>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'var(--surface-color-light)'}}
                  contentStyle={{background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)'}}
                  itemStyle={{color: 'var(--text-secondary)'}}
                />
                <Bar 
                  dataKey="enrollments" 
                  fill="#8b5cf6" 
                  radius={[6, 6, 0, 0]} 
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-container-small card glass">
          <div className="chart-title-row">
            <Target size={20} className="text-primary-color" />
            <h2>Course Categories</h2>
          </div>
          <div className="chart-wrapper h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                  itemStyle={{color: '#fff'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-center-label">
              <BookOpen size={24} className="text-primary-color" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{background: COLORS[index]}}></div>
                  <span className="text-xs font-medium text-gray-400">{entry.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container-small card glass">
          <div className="chart-title-row">
            <Users size={20} className="text-primary-color" />
            <h2>User Roles</h2>
          </div>
          <div className="chart-wrapper h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={80}
                  dataKey="value"
                  stroke="none"
                >
                  {userDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={USER_COLORS[index % USER_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{background: '#1c1c1e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                  itemStyle={{color: '#fff'}}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {userDistributionData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{background: USER_COLORS[index]}}></div>
                  <span className="text-xs font-medium text-gray-400">{entry.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
