import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BookOpen, 
  Clock, 
  Award, 
  ChevronRight, 
  TrendingUp, 
  Target, 
  PlayCircle,
  Trophy,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
  Cell
} from 'recharts';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    inProgress: 0,
    learningTime: '0h',
    certificates: 0
  });

<<<<<<< HEAD
  const [learningData, setLearningData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [knowledgePoints, setKnowledgePoints] = useState(0);

  const COLORS = ['#FF6B35', '#00B5A5', '#3b82f6', '#10b981', '#f59e0b', '#06b6d4'];
=======
  const generateEmptyWeek = () => {
    const mockHours = [2.5, 3.8, 1.5, 4.2, 3.0, 5.5, 4.0]; // Mock data for hours learned
    return [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        date: d,
        name: d.toLocaleDateString('en-US', { weekday: 'short' }),
        hours: mockHours[i],
        enrollments: 0
      };
    });
  };

  const [learningData, setLearningData] = useState(generateEmptyWeek());

  const skillData = [
    { name: 'Java', value: 40 },
    { name: 'Python', value: 30 },
    { name: 'AI', value: 20 },
    { name: 'Web', value: 10 },
  ];

  const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981'];
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/courses/my-enrollments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEnrolledCourses(res.data);
      
      const inProgress = res.data.filter(c => c.progress < 100).length;
      const certificates = res.data.filter(c => c.progress === 100).length;
<<<<<<< HEAD
      
      const statsRes = await axios.get('http://localhost:5001/api/courses/my-stats', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStats({
        inProgress,
        learningTime: statsRes.data.hoursLearned ? `${statsRes.data.hoursLearned}h` : '0h', 
        certificates
      });

      setSkillData(statsRes.data.skillData || []);
      setLearningData(statsRes.data.learningData || []);
      setKnowledgePoints(statsRes.data.knowledgePoints || 0);

=======
      setStats({
        inProgress,
        learningTime: `${res.data.length * 5}h`, 
        certificates
      });

      const last7Days = generateEmptyWeek();

      res.data.forEach(enrollment => {
        if (enrollment.enrolled_at) {
          const enrolledDate = new Date(enrollment.enrolled_at);
          const dayMatch = last7Days.find(d => 
            d.date.getDate() === enrolledDate.getDate() && 
            d.date.getMonth() === enrolledDate.getMonth() &&
            d.date.getFullYear() === enrolledDate.getFullYear()
          );
          if (dayMatch) {
            dayMatch.enrollments++;
          }
        }
      });
      setLearningData(last7Days);
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
    } catch (err) {
      console.error('Error fetching dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
<<<<<<< HEAD
    { title: 'Courses in Progress', value: stats.inProgress, icon: BookOpen, color: '#FF6B35', trend: 'Active' },
    { title: 'Hours Learned', value: stats.learningTime, icon: Clock, color: '#3b82f6', trend: '+2.4h today' },
    { title: 'Certificates', value: stats.certificates, icon: Trophy, color: '#f59e0b', trend: 'Verified' },
    { title: 'Knowledge Points', value: knowledgePoints.toLocaleString(), icon: Target, color: '#10b981', trend: 'Top 5%' },
=======
    { title: 'Courses in Progress', value: stats.inProgress, icon: BookOpen, color: '#8b5cf6', trend: 'Active' },
    { title: 'Hours Learned', value: stats.learningTime, icon: Clock, color: '#3b82f6', trend: '+2.4h today' },
    { title: 'Certificates', value: stats.certificates, icon: Trophy, color: '#f59e0b', trend: 'Verified' },
    { title: 'Knowledge Points', value: '1,250', icon: Target, color: '#10b981', trend: 'Top 5%' },
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
  ];

  return (
    <div className="student-dashboard">
      <div className="admin-header-row mb-10">
        <div>
<<<<<<< HEAD
          <h1 className="text-3xl font-bold mb-2 text-primary">Welcome back, {user?.name}! 👋</h1>
          <p className="text-secondary">You've reached 85% of your weekly learning goal. Keep pushing!</p>
=======
          <h1 className="text-3xl font-bold mb-2 text-white">Welcome back, {user?.name}! 👋</h1>
          <p className="text-gray-500">You've reached 85% of your weekly learning goal. Keep pushing!</p>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        </div>
      </div>

      {/* 4 Visual KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        {statCards.map((card, i) => (
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
              <card.icon size={18} color={card.color} />
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-charts-grid mb-10">
        <div className="chart-container-large card glass p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary-color" />
            Learning Activity (Weekly)
          </h2>
          <div style={{ width: '100%', height: '350px' }}>
            <ResponsiveContainer width="100%" height="100%">
<<<<<<< HEAD
              <AreaChart data={learningData.length ? learningData : []}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#FF6B35" stopOpacity={0}/>
=======
              <AreaChart data={learningData.length ? learningData : generateEmptyWeek()}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                <Tooltip 
                  cursor={{stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, fill: 'transparent'}}
                  contentStyle={{background: 'var(--surface-color, #1f2937)', border: '1px solid var(--border-color, rgba(255,255,255,0.1))', borderRadius: '12px', color: 'var(--text-primary, #fff)'}}
                  itemStyle={{color: 'var(--text-secondary, #9ca3af)'}}
                />
                <Area 
                  type="monotone"
                  dataKey="hours" 
<<<<<<< HEAD
                  stroke="#FF6B35" 
=======
                  stroke="#8b5cf6" 
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorHours)"
                  name="Hours Learned"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="chart-container-small card glass p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award size={20} className="text-primary-color" />
            Skill Distribution
          </h2>
          <div style={{ width: '100%', height: '250px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)'}}
                  itemStyle={{color: 'var(--text-secondary)'}}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-center-label">
              <Trophy size={24} className="text-primary-color" />
            </div>
          </div>
<<<<<<< HEAD
            <div className="flex flex-col gap-4 mt-6">
            {skillData.length > 0 ? skillData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{background: COLORS[index % COLORS.length]}}></div>
                  <span className="text-xs font-medium text-secondary">{entry.name}</span>
                </div>
                <span className="text-xs font-bold text-primary">{entry.value}%</span>
              </div>
            )) : (
              <p className="text-secondary text-sm text-center py-4">No skills recorded yet. Enroll in courses to build your profile.</p>
            )}
=======
          <div className="flex flex-col gap-4 mt-6">
            {skillData.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{background: COLORS[index]}}></div>
                  <span className="text-xs font-medium text-gray-400">{entry.name}</span>
                </div>
                <span className="text-xs font-bold text-white">{entry.value}%</span>
              </div>
            ))}
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
          </div>
        </div>
      </div>

      <section className="dashboard-section mt-10">
        <div className="flex justify-between items-center mb-6">
<<<<<<< HEAD
          <h2 className="text-2xl font-bold text-primary">Continue Learning</h2>
          <Link to="/student/explore" className="text-primary-color text-sm font-bold hover:underline">View All Courses</Link>
=======
          <h2 className="text-2xl font-bold text-white">Continue Learning</h2>
          <Link to="/courses" className="text-primary-color text-sm font-bold hover:underline">View All Courses</Link>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="loading p-10 text-center col-span-2">
              <Loader2 className="animate-spin inline mr-2 text-primary-color" /> 
<<<<<<< HEAD
              <span className="text-secondary">Preparing your personalized content...</span>
=======
              <span className="text-gray-500">Preparing your personalized content...</span>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            </div>
          ) : enrolledCourses.length > 0 ? (
            enrolledCourses.map(course => (
              <div key={course.id} className="card glass p-6 flex flex-col gap-4 group">
                <div className="flex justify-between items-start">
                  <div>
<<<<<<< HEAD
                    <h3 className="text-lg font-bold text-primary mb-1">{course.title}</h3>
                    <p className="text-xs text-secondary">{course.level} • {course.category}</p>
=======
                    <h3 className="text-lg font-bold text-white mb-1">{course.title}</h3>
                    <p className="text-xs text-gray-500">{course.level} • {course.category}</p>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  </div>
                  <div className="p-2 rounded-lg bg-primary-color/10 text-primary-color group-hover:bg-primary-color group-hover:text-white transition-all">
                    <PlayCircle size={24} />
                  </div>
                </div>
                <div className="mt-2">
<<<<<<< HEAD
                  <div className="flex justify-between text-xs text-secondary mb-2">
=======
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                    <span>Progress</span>
                    <span>{course.progress}% Complete</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-gradient rounded-full transition-all duration-1000" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
<<<<<<< HEAD
                <Link to={`/student/course/${course.id}`} className="btn btn-primary-small mt-2 py-3 text-sm font-bold">
=======
                <Link to={`/course/${course.id}`} className="btn btn-primary-small mt-2 py-3 text-sm font-bold">
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
                  {course.progress === 100 ? 'Review Course' : 'Resume Lessons'}
                </Link>
              </div>
            ))
          ) : (
            <div className="empty-state card glass p-12 text-center col-span-2">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
<<<<<<< HEAD
                <BookOpen size={32} className="text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Start Your Learning Journey</h3>
              <p className="text-secondary mb-8 max-w-md mx-auto">Explore our extensive library of world-class technical courses and build your future today.</p>
              <Link to="/student/explore" className="btn btn-primary px-10 py-4 font-bold">Browse All Courses</Link>
=======
                <BookOpen size={32} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Start Your Learning Journey</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Explore our extensive library of world-class technical courses and build your future today.</p>
              <Link to="/courses" className="btn btn-primary px-10 py-4 font-bold">Browse All Courses</Link>
>>>>>>> 9e1de81cd6878b26aed245c1ff99ddd4ff053383
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
