import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export function DashboardLayout() {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const user = {
    fullName: authUser?.name || 'Alex Johnson',
    email: authUser?.email || 'alex@learnify.com',
    avatar: authUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    initial: (authUser?.name || 'A').charAt(0).toUpperCase(),
    badge: 'Pro Learner',
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClass = (isActive: boolean) => {
    return `flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all relative ${
      isActive
        ? 'bg-[#1A2540] text-[#FF6B2B] border-l-[3px] border-[#FF6B2B] pl-[13px] rounded-l-none font-semibold'
        : 'text-[#9CA3AF] hover:text-white hover:bg-[#1A2540]/30'
    }`;
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="h-[64px] bg-[#111827] border-b border-[#1A2540] px-6 flex items-center justify-between z-30 sticky top-0">
        {/* Left: Learnify Logo */}
        <div className="flex items-center gap-0">
          <Link to="/" className="flex items-center gap-0 focus:outline-none">
            <span className="text-[20px] font-bold text-white hover:opacity-90 transition-opacity">Learnify</span>
            <div className="w-[6px] h-[6px] rounded-full bg-[#FF6B2B] ml-[2px]"></div>
          </Link>
        </div>

        {/* Right: Notifications & User Menu */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1A2540] text-[#9CA3AF] hover:text-white cursor-pointer focus:outline-none border-none bg-transparent">
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF6B2B] rounded-full border border-[#111827]"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none border-none bg-transparent"
            >
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-8 h-8 rounded-full ring-2 ring-[#FF6B2B]/20 hover:ring-[#FF6B2B] transition-all object-cover"
              />
            </button>

            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-[#111827] rounded-xl shadow-xl border border-[#1A2540] py-2 z-50 animate-slide-down">
                  <div className="px-4 py-2 border-b border-[#1A2540]">
                    <div className="font-bold text-[14px] text-white truncate">{user.fullName}</div>
                    <div className="text-[11px] text-[#9CA3AF] truncate">{user.email}</div>
                    <div className="inline-block mt-1 px-2 py-0.5 bg-[#00C97B]/20 text-[#00E88A] rounded-md text-[10px] font-bold uppercase tracking-wider border border-[#00C97B]/30">
                      Student
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#E5E7EB] hover:bg-[#1A2540] hover:text-white transition-colors"
                  >
                    <span>🏠</span> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-[13px] text-[#FF6B2B] hover:bg-[#FF6B2B]/10 transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <span>👤</span> Sign in
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-[13px] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <span>🚪</span> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Body container */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-[240px] bg-[#0D1117] border-r border-[#1A2540] h-[calc(100vh-64px)] z-20 sticky top-[64px]">
          {/* Scrollable Nav Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* User Card */}
            <div className="border-b border-[#1A2540] pb-5">
              <div className="flex items-center gap-3 mb-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-[52px] h-[52px] rounded-full object-cover border-2 border-[#FF6B2B]"
                  />
                ) : (
                  <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8C42] text-white text-[20px] font-bold flex items-center justify-center">
                    {user.initial}
                  </div>
                )}
              </div>
              <div className="text-[15px] font-bold text-white leading-tight truncate">{user.fullName}</div>
              <div className="text-[12px] text-[#9CA3AF] mb-3 truncate">{user.email}</div>
              <div className="inline-block px-3 py-1 bg-[#00C97B]/20 text-[#00E88A] border border-[#00C97B]/30 rounded-full text-[11px] font-extrabold tracking-wide uppercase">
                {user.badge}
              </div>
            </div>

            {/* Groups */}
            <nav className="space-y-6">
              <div>
                <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 px-3">
                  LEARN
                </div>
                <div className="space-y-1">
                  <NavLink to="/dashboard" end className={({ isActive }) => getLinkClass(isActive)}>
                    <span>🏠</span> Dashboard
                  </NavLink>
                  <NavLink to="/dashboard/courses" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>📚</span> My Courses
                  </NavLink>
                  <NavLink to="/dashboard/paths" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>🗺️</span> Learning Paths
                  </NavLink>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 px-3">
                  ACHIEVEMENTS
                </div>
                <div className="space-y-1">
                  <NavLink to="/dashboard/certificates" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>🏆</span> Certificates
                  </NavLink>
                  <NavLink to="/dashboard/badges" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>🥇</span> Badges
                  </NavLink>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 px-3">
                  ACCOUNT
                </div>
                <div className="space-y-1">
                  <NavLink to="/dashboard/profile" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>👤</span> Profile
                  </NavLink>
                  <NavLink to="/dashboard/settings" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>⚙️</span> Settings
                  </NavLink>
                </div>
              </div>
            </nav>
          </div>

          {/* Fixed Bottom Area */}
          <div className="p-5 border-t border-[#1A2540]">
            {/* Progress widget */}
            <div className="bg-[#1A2540] border border-[#1A2540] rounded-xl p-3.5 mb-3 flex items-center gap-3">
              <div className="relative w-11 h-11 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#111827]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#00C97B]"
                    strokeDasharray="60, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                  60%
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wide">
                  Weekly Goal
                </div>
                <div className="text-[12px] text-[#E5E7EB] font-medium leading-tight mt-0.5">
                  3/5 lessons
                </div>
              </div>
            </div>

            {/* Conditionally Render Sign In / Sign Out */}
            {authUser ? (
              <button
                onClick={handleLogout}
                className="w-full py-2 flex items-center gap-2 text-[#EF4444] font-semibold text-[14px] hover:text-[#F87171] transition-colors cursor-pointer border-none bg-transparent px-3 focus:outline-none"
              >
                <span>🚪</span> Sign Out
              </button>
            ) : (
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="w-full py-2 flex items-center gap-2 text-[#FF6B2B] font-semibold text-[14px] hover:text-[#FF8C42] transition-colors cursor-pointer border-none bg-transparent px-3 focus:outline-none"
              >
                <span>👤</span> Sign In
              </button>
            )}
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8 md:p-10 overflow-y-auto min-h-[calc(100vh-64px)] bg-[#0A0F1E]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
