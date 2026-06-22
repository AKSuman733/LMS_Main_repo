import { Link } from 'react-router';
import { Home, BookOpen, Award, BadgeCheck, User, Settings, Flame, TrendingUp, Clock, Target } from 'lucide-react';
import { MobileBottomNav } from '../components/MobileBottomNav';
import { useAuth } from '../../contexts/AuthContext';

export function Dashboard() {
  const { user: authUser } = useAuth();
  const user = {
    name: authUser?.name.split(' ')[0] || 'Alex',
    fullName: authUser?.name || 'Alex Johnson',
    avatar: authUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    badge: 'Pro Learner',
    streak: 12,
  };

  const stats = [
    { icon: BookOpen, label: 'Courses Enrolled', value: '8', trend: '+2 this month', trendUp: true },
    { icon: Clock, label: 'Hours Learned', value: '127', trend: '+12% this week', trendUp: true },
    { icon: Award, label: 'Certificates', value: '5', trend: '+1 this month', trendUp: true },
    { icon: Target, label: 'Avg. Score', value: '94%', trend: '+3% this week', trendUp: true },
  ];

  const inProgressCourses = [
    {
      id: '1',
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Sarah Chen',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200',
      progress: 65,
    },
    {
      id: '2',
      title: 'Full-Stack Web Development',
      instructor: 'James Rodriguez',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200',
      progress: 42,
    },
  ];

  const certificates = [
    { id: '1', title: 'Python for Data Science', date: 'Dec 2024' },
    { id: '2', title: 'AWS Cloud Practitioner', date: 'Nov 2024' },
  ];

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: BookOpen, label: 'My Courses', href: '/dashboard/courses', active: false },
    { icon: Award, label: 'Certificates', href: '/dashboard/certificates', active: false },
    { icon: BadgeCheck, label: 'Badges', href: '/dashboard/badges', active: false },
    { icon: User, label: 'Profile', href: '/dashboard/profile', active: false },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings', active: false },
  ];

  return (
    <div className="min-h-screen bg-[#F0EFF8]">
      {/* Top Navbar */}
      <nav className="h-[68px] bg-white/80 backdrop-blur-[12px] border-b border-[#E2E1F0] px-6 flex items-center justify-between">
        <div className="flex items-center gap-0">
          <Link to="/">
            <span className="text-[20px] font-bold text-[#2D1B69]">Learnify</span>
          </Link>
          <div className="w-[6px] h-[6px] rounded-full bg-[#BBFF00] ml-[2px]"></div>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F6F3]">
            <span className="text-[#6B6B80]">🔔</span>
          </button>
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-8 h-8 rounded-full ring-2 ring-[#2D1B69]"
          />
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar - Hidden on mobile */}
        <aside className="hidden md:block w-[260px] bg-white border-r border-[#E2E1F0] min-h-[calc(100vh-68px)] p-6">
          {/* User Card */}
          <div className="mb-6">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-[52px] h-[52px] rounded-full ring-2 ring-[#2D1B69] mb-3"
            />
            <div className="text-[16px] font-bold text-[#1A1A2E] mb-1">{user.fullName}</div>
            <div className="inline-block px-3 py-1 bg-[#BBFF00] text-[#1A1A2E] rounded-full text-[12px] font-medium">
              {user.badge}
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            <div className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wide mb-2 px-3">
              Learn
            </div>
            {navItems.slice(0, 2).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-[8px] transition-colors relative ${
                  item.active
                    ? 'bg-[#2D1B69]/8 text-[#2D1B69]'
                    : 'text-[#6B6B80] hover:bg-[#F7F6F3]'
                }`}
              >
                {item.active && <div className="absolute left-0 w-[3px] h-full bg-[#2D1B69] rounded-r"></div>}
                <item.icon size={18} />
                <span className="text-[14px] font-medium">{item.label}</span>
              </Link>
            ))}

            <div className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wide mb-2 px-3 mt-6">
              Achievements
            </div>
            {navItems.slice(2, 4).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-[#6B6B80] hover:bg-[#F7F6F3] transition-colors"
              >
                <item.icon size={18} />
                <span className="text-[14px] font-medium">{item.label}</span>
              </Link>
            ))}

            <div className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wide mb-2 px-3 mt-6">
              Account
            </div>
            {navItems.slice(4).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-[8px] text-[#6B6B80] hover:bg-[#F7F6F3] transition-colors"
              >
                <item.icon size={18} />
                <span className="text-[14px] font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          {/* Greeting Banner */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-[28px] font-bold text-[#1A1A2E] mb-1">
                Good morning, {user.name}.
              </h1>
              <p className="text-[16px] text-[#6B6B80]">You have 2 courses in progress.</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-[12px] border border-[#E2E1F0]">
              <Flame size={18} className="text-[#F59E0B]" />
              <span className="text-[13px] font-bold text-[#1A1A2E]">{user.streak} day streak</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-[16px] border border-[#E2E1F0] p-5 shadow-[0_2px_16px_rgba(45,27,105,0.06)]"
              >
                <div className="w-10 h-10 rounded-full bg-[#2D1B69]/10 flex items-center justify-center mb-3">
                  <stat.icon size={20} className="text-[#2D1B69]" />
                </div>
                <div className="text-[32px] font-bold text-[#1A1A2E] mb-1">{stat.value}</div>
                <div className="text-[13px] text-[#6B6B80] mb-2">{stat.label}</div>
                <div className={`text-[12px] flex items-center gap-1 ${stat.trendUp ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  <TrendingUp size={12} />
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>

          {/* Continue Learning */}
          <div className="mb-8">
            <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-4">Continue learning</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {inProgressCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="flex-shrink-0 w-[320px] bg-white rounded-[16px] border border-[#E2E1F0] p-4 hover:border-[#2D1B69] transition-all"
                >
                  <div className="flex gap-3 mb-3">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-[90px] h-[64px] rounded-[10px] object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-[14px] font-bold text-[#1A1A2E] mb-1 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-[12px] text-[#6B6B80]">{course.instructor}</p>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="h-1 bg-[#E2E1F0] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#BBFF00] rounded-full relative"
                        style={{ width: `${course.progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2D1B69]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] text-[#6B6B80]">{course.progress}% complete</span>
                    <span className="text-[13px] font-medium text-[#2D1B69] hover:underline">Resume →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div>
            <h2 className="text-[20px] font-bold text-[#1A1A2E] mb-4">Recent Certificates</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex-shrink-0 w-[320px] bg-gradient-to-br from-[#EDE9FF] to-[#F7F6F3] rounded-[16px] border border-[#E2E1F0] p-6 relative"
                >
                  <div className="absolute top-6 right-6 text-[40px] text-[#2D1B69] opacity-20">
                    🏆
                  </div>
                  <div className="text-[16px] font-bold text-[#2D1B69] mb-2">{cert.title}</div>
                  <div className="text-[13px] text-[#6B6B80] mb-4">Completed {cert.date}</div>
                  <div className="flex gap-2">
                    <button className="text-[13px] text-[#2D1B69] hover:underline">Download</button>
                    <span className="text-[#6B6B80]">•</span>
                    <button className="text-[13px] text-[#2D1B69] hover:underline">Share</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
}
