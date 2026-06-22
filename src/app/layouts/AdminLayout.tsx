import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export function AdminLayout() {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const adminName = authUser?.name || 'Admin';
  const adminEmail = authUser?.email || 'admin@learnify.com';
  const initial = adminName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClass = (isActive: boolean) => {
    return `flex items-center gap-3 px-4 py-2.5 text-[14px] font-medium transition-all relative ${isActive
      ? 'bg-[#F59E0B]/15 text-[#F59E0B] border-l-3 border-[#F59E0B] pl-[13px]'
      : 'text-white/70 hover:text-[#F59E0B] hover:bg-white/5'
      }`;
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="h-[64px] bg-[#1A1A2E] px-6 flex items-center justify-between z-30 sticky top-0 border-b border-white/10">
        {/* Left: Logo & Admin Pill */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-0 focus:outline-none">
            <span className="text-[20px] font-bold text-white hover:opacity-90 transition-opacity">Learnify</span>
            <div className="w-[6px] h-[6px] rounded-full bg-[#BBFF00] ml-[2px]"></div>
          </Link>
          <span className="px-2 py-0.5 bg-[#FCD34D] text-[#92400E] text-[11px] font-bold uppercase tracking-wider rounded-md">
            Admin Panel
          </span>
        </div>

        {/* Right: Notifications & Admin dropdown */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer focus:outline-none text-white">
            <span className="text-lg">🔔</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#1A1A2E]"></span>
          </button>

          {/* Admin Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#D97706] text-white font-bold text-[13px] flex items-center justify-center ring-2 ring-amber-500/20 hover:ring-amber-500 transition-all">
                {initial}
              </div>
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E2E1F0] py-2 z-50 animate-slide-down">
                  <div className="px-4 py-2 border-b border-[#E2E1F0]">
                    <div className="font-bold text-[14px] text-[#1A1A2E] truncate">{adminName}</div>
                    <div className="text-[11px] text-[#6B6B80] truncate">{adminEmail}</div>
                    <div className="inline-block mt-1 px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] rounded-md text-[10px] font-bold uppercase tracking-wider">
                      Administrator
                    </div>
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#1A1A2E] hover:bg-[#F7F6F3] transition-colors"
                  >
                    <span>📊</span> Admin Dashboard
                  </Link>
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
        {/* Left Sidebar */}
        <aside className="hidden md:flex flex-col w-[220px] bg-[#1A1A2E] h-[calc(100vh-64px)] z-20 sticky top-[64px] border-r border-white/5">
          {/* Sidebar Nav links */}
          <div className="flex-1 overflow-y-auto py-5 space-y-6">
            {/* Nav Groups */}
            <nav className="space-y-6">
              <div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-4">
                  Manage
                </div>
                <div className="space-y-0.5">
                  <NavLink to="/admin" end className={({ isActive }) => getLinkClass(isActive)}>
                    <span>📊</span> Overview
                  </NavLink>
                  <NavLink to="/admin/users" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>👥</span> Users
                  </NavLink>
                  <NavLink to="/admin/courses" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>📚</span> Courses
                  </NavLink>
                  <NavLink to="/admin/enrollments" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>📝</span> Enrollments
                  </NavLink>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-4">
                  Analyze
                </div>
                <div className="space-y-0.5">
                  <NavLink to="/admin/analytics" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>📈</span> Analytics
                  </NavLink>
                  <NavLink to="/admin/reports" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>📋</span> Reports
                  </NavLink>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 px-4">
                  Configure
                </div>
                <div className="space-y-0.5">
                  <NavLink to="/admin/settings" className={({ isActive }) => getLinkClass(isActive)}>
                    <span>⚙️</span> Settings
                  </NavLink>

                </div>
              </div>
            </nav>
          </div>

          {/* Bottom Area */}
          <div className="p-4 border-t border-white/10 space-y-3.5">
            {/* Admin User Card */}
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#FBBF24] to-[#D97706] text-white font-bold text-[12px] flex items-center justify-center flex-shrink-0">
                {initial}
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold text-white truncate leading-tight">{adminName}</div>
                <div className="text-[11px] text-white/40 truncate mt-0.5">Super Admin</div>
              </div>
            </div>


            {/* Sign Out Button */}
            <button
              onClick={handleLogout}
              className="w-full h-9 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all text-[12px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none"
            >
              🚪 Sign Out
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
