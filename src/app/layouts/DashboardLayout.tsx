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
        ? 'bg-[#2D1B69]/8 text-[#2D1B69] border-l-[3px] border-[#2D1B69] pl-[13px] rounded-l-none'
        : 'text-[#6B6B80] hover:text-[#2D1B69] hover:bg-[#F7F6F3]'
    }`;
  };

  return (
    <div className="min-h-screen bg-[#F0EFF8] flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="h-[64px] bg-white border-b border-[#E2E1F0] px-6 flex items-center justify-between z-30 sticky top-0">
        {/* Left: Learnify Logo */}
        <div className="flex items-center gap-0">
          <Link to="/" className="flex items-center gap-0 focus:outline-none">
            <span className="text-[20px] font-bold text-[#2D1B69] hover:opacity-90 transition-opacity">Learnify</span>
            <div className="w-[6px] h-[6px] rounded-full bg-[#BBFF00] ml-[2px]"></div>
          </Link>
        </div>

        {/* Right: Notifications & User Menu */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F7F6F3] cursor-pointer focus:outline-none">
            <span className="text-[#6B6B80] text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <img
                src={user.avatar}
                alt={user.fullName}
                className="w-8 h-8 rounded-full ring-2 ring-[#2D1B69]/20 hover:ring-[#2D1B69] transition-all object-cover"
              />
            </button>

            {showDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E2E1F0] py-2 z-50 animate-slide-down">
                  <div className="px-4 py-2 border-b border-[#E2E1F0]">
                    <div className="font-bold text-[14px] text-[#1A1A2E] truncate">{user.fullName}</div>
                    <div className="text-[11px] text-[#6B6B80] truncate">{user.email}</div>
                    <div className="inline-block mt-1 px-2 py-0.5 bg-[#EDE9FF] text-[#2D1B69] rounded-md text-[10px] font-bold uppercase tracking-wider">
                      Student
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#1A1A2E] hover:bg-[#F7F6F3] transition-colors"
                  >
                    <span>🏠</span> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-[13px] text-[#2D1B69] hover:bg-[#EDE9FF] transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <span>👤</span> Sign in
                  </button>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent"
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
        <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-[#E2E1F0] h-[calc(100vh-64px)] z-20 sticky top-[64px]">
          {/* Scrollable Nav Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* User Card */}
            <div className="border-b border-[#E2E1F0] pb-5">
              <div className="flex items-center gap-3 mb-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-[52px] h-[52px] rounded-full object-cover border-2 border-[#2D1B69]"
                  />
                ) : (
                  <div className="w-[52px] h-[52px] rounded-full bg-gradient-to-br from-[#2D1B69] to-[#1A0F3C] text-white text-[20px] font-bold flex items-center justify-center">
                    {user.initial}
                  </div>
                )}
              </div>
              <div className="text-[15px] font-bold text-[#1A1A2E] leading-tight truncate">{user.fullName}</div>
              <div className="text-[12px] text-[#6B6B80] mb-3 truncate">{user.email}</div>
              <div className="inline-block px-3 py-1 bg-[#BBFF00] text-[#1A1A2E] rounded-full text-[11px] font-extrabold tracking-wide uppercase">
                {user.badge}
              </div>
            </div>

            {/* Groups */}
            <nav className="space-y-6">
              <div>
                <div className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wider mb-2 px-3">
                  Learn
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
                <div className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wider mb-2 px-3">
                  Achievements
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
                <div className="text-[11px] font-bold text-[#6B6B80] uppercase tracking-wider mb-2 px-3">
                  Account
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
          <div className="p-5 border-t border-[#E2E1F0]">
            {/* Progress widget */}
            <div className="bg-[#F7F6F3] border border-[#E2E1F0] rounded-xl p-3.5 mb-3 flex items-center gap-3">
              <div className="relative w-11 h-11 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-[#E2E1F0]"
                    strokeWidth="3.5"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-[#2D1B69]"
                    strokeDasharray="60, 100"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#2D1B69]">
                  60%
                </div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-[#6B6B80] uppercase tracking-wide">
                  Weekly Goal
                </div>
                <div className="text-[12px] text-[#1A1A2E] font-medium leading-tight mt-0.5">
                  3/5 lessons this week
                </div>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl text-[#2D1B69] font-semibold text-[14px] hover:bg-[#EDE9FF] transition-colors cursor-pointer border border-[#2D1B69]/30 bg-transparent mb-2"
            >
              <span>👤</span> Sign In
            </button>

            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-xl text-red-500 font-semibold text-[14px] hover:bg-red-50 transition-colors cursor-pointer border border-[#FCA5A5]/30 bg-transparent"
            >
              <span>🚪</span> Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 md:p-10 overflow-y-auto min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
