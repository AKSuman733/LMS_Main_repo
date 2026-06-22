import React, { useState, useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { 
  IconLayoutDashboard, 
  IconUsers, 
  IconBook, 
  IconClipboardList, 
  IconChartBar, 
  IconFileAnalytics, 
  IconSettings, 
  IconShieldLock, 
  IconMenu2, 
  IconX, 
  IconBell, 
  IconLogout,
  IconChevronRight
} from '@tabler/icons-react';

export function AdminLayout() {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Responsive States
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false); // Collapsed desktop sidebar (64px)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Monitor screen width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false); // Close mobile drawer on desktop resize
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adminName = authUser?.name || 'Admin';
  const adminEmail = authUser?.email || 'admin@learnify.com';
  const initial = adminName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getLinkClass = (isActive: boolean) => {
    const base = `flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-150 relative cursor-pointer select-none outline-none border-l-3`;
    
    if (isActive) {
      return `${base} bg-[#1A2540] text-[#FF6B2B] border-[#FF6B2B] font-semibold
        focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2`;
    }
    
    return `${base} border-transparent text-[#9CA3AF] hover:bg-[#1A2540]/30 hover:text-white hover:border-transparent
      focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2`;
  };

  // Nav configuration
  const navGroups = [
    {
      title: 'Manage',
      items: [
        { name: 'Overview', path: '/admin', icon: IconLayoutDashboard, end: true },
        { name: 'Users', path: '/admin/users', icon: IconUsers },
        { name: 'Courses', path: '/admin/courses', icon: IconBook },
        { name: 'Learning Paths', path: '/admin/paths', icon: IconClipboardList },
        { name: 'Certificates', path: '/admin/certificates', icon: IconFileAnalytics },
        { name: 'Enrollments', path: '/admin/enrollments', icon: IconClipboardList },
      ]
    },
    {
      title: 'Analyze',
      items: [
        { name: 'Analytics', path: '/admin/analytics', icon: IconChartBar },
        { name: 'Reports', path: '/admin/reports', icon: IconFileAnalytics },
      ]
    },
    {
      title: 'Configure',
      items: [
        { name: 'Settings', path: '/admin/settings', icon: IconSettings },
        { name: 'Roles', path: '/admin/roles', icon: IconShieldLock },
      ]
    }
  ];

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isMobile = windowWidth < 768;

  // Determine sidebar width based on collapses
  const sidebarWidthClass = isCollapsed ? 'w-[64px]' : 'w-[220px]';

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white flex flex-col font-sans relative pb-[56px] md:pb-0">
      
      {/* 1. TOP NAVBAR */}
      <nav className="h-[64px] bg-[#111827] px-4 md:px-6 flex items-center justify-between z-30 sticky top-0 border-b border-[#1A2540]">
        
        {/* Left Section: Hamburger (Tablet/Mobile) & Logo */}
        <div className="flex items-center gap-3">
          {!isDesktop && (
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer focus:outline-none text-white transition-colors border-none bg-transparent"
              aria-label="Toggle navigation menu"
            >
              {isSidebarOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
            </button>
          )}

          <Link to="/" className="flex items-center gap-0 focus:outline-none">
            <span className="text-[20px] font-bold text-white hover:opacity-90 transition-opacity">Learnify</span>
            <div className="w-[6px] h-[6px] rounded-full bg-[#FF6B2B] ml-[2px]"></div>
          </Link>
          
          {isDesktop && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="ml-4 px-2 py-1 text-[11px] font-bold text-white/50 hover:text-white bg-white/5 rounded hover:bg-white/10 transition-all cursor-pointer border-none"
            >
              {isCollapsed ? 'Expand ➔' : 'Collapse ➔'}
            </button>
          )}

          <span className="hidden sm:inline-block px-2 py-0.5 bg-[#FF6B2B]/20 text-[#FF6B2B] text-[10px] font-bold uppercase tracking-wider rounded border border-[#FF6B2B]/30">
            Admin Panel
          </span>
        </div>

        {/* Right Section: Bell Notification & User Dropdown */}
        <div className="flex items-center gap-4">
          
          {/* Notification Bell with Red Pulse */}
          <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 cursor-pointer focus:outline-none text-[#9CA3AF] hover:text-white border-none bg-transparent">
            <IconBell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#111827] animate-pulse"></span>
          </button>

          {/* User Avatar with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 cursor-pointer focus:outline-none border-none bg-transparent"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8C42] text-white font-bold text-[13px] flex items-center justify-center ring-2 ring-[#FF6B2B]/20 hover:ring-[#FF6B2B] transition-all">
                {initial}
              </div>
            </button>

            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-[#111827] rounded-xl shadow-xl border border-[#1A2540] py-2 z-50 animate-slide-down">
                  <div className="px-4 py-2 border-b border-[#1A2540]">
                    <div className="font-bold text-[14px] text-white truncate">{adminName}</div>
                    <div className="text-[11px] text-[#9CA3AF] truncate">{adminEmail}</div>
                    <div className="inline-block mt-1 px-2 py-0.5 bg-[#FF6B2B]/20 text-[#FF8C42] rounded text-[10px] font-bold uppercase tracking-wider border border-[#FF6B2B]/30">
                      Administrator
                    </div>
                  </div>
                  <Link
                    to="/admin"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#E5E7EB] hover:bg-[#1A2540] hover:text-white transition-colors"
                  >
                    <IconLayoutDashboard size={16} /> Admin Overview
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#E5E7EB] hover:bg-[#1A2540] hover:text-white transition-colors"
                  >
                    <IconSettings size={16} /> Panel Settings
                  </Link>
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-[13px] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors cursor-pointer border-none bg-transparent"
                  >
                    <IconLogout size={16} /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 2. OVERLAYS FOR OFF-CANVAS SIDEBAR */}
      {!isDesktop && isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            isMobile ? 'bg-black/60' : 'bg-black/40'
          }`}
        />
      )}

      {/* 3. SIDEBAR AND MAIN WRAPPER */}
      <div className="flex flex-1 relative min-h-0">
        
        {/* DESKTOP STICKY SIDEBAR */}
        {isDesktop && (
          <aside className={`flex flex-col ${sidebarWidthClass} bg-[#111827] h-[calc(100vh-64px)] z-20 sticky top-[64px] border-r border-[#1A2540] transition-all duration-[200ms] ease-out overflow-x-hidden`}>
            <div className="flex-1 overflow-y-auto py-5 scrollbar-thin">
              <nav className="space-y-6">
                {navGroups.map((group) => (
                  <div key={group.title}>
                    {!isCollapsed ? (
                      <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 px-4 select-none">
                        {group.title}
                      </div>
                    ) : (
                      <div className="h-4 border-b border-white/5 mb-2 mx-2"></div>
                    )}
                    <div className="space-y-0.5 px-2">
                      {group.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.end}
                          className={({ isActive }) => getLinkClass(isActive)}
                          title={isCollapsed ? item.name : undefined}
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon size={20} className={isActive ? 'text-[#FF6B2B]' : 'text-[#6B7280]'} />
                              {!isCollapsed && <span className="truncate">{item.name}</span>}
                              {isCollapsed && (
                                <div className="absolute left-[70px] hidden group-hover:block bg-[#111827] text-white text-[11px] font-medium px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none z-50 border border-[#1A2540]">
                                  {item.name}
                                </div>
                              )}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Bottom Admin Info */}
            <div className="p-4 border-t border-[#1A2540] space-y-3.5 bg-[#1A2540]/30">
              {!isCollapsed ? (
                <div className="flex items-center gap-3">
                  <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8C42] text-white font-bold text-[12px] flex items-center justify-center flex-shrink-0">
                    {initial}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-bold text-white truncate leading-tight">{adminName}</div>
                    <div className="text-[11px] text-[#9CA3AF] truncate mt-0.5">Super Admin</div>
                  </div>
                </div>
              ) : (
                <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8C42] text-white font-bold text-[12px] flex items-center justify-center mx-auto">
                  {initial}
                </div>
              )}
              
              {!isCollapsed && (
                <button
                  onClick={handleLogout}
                  className="w-full h-9 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-[#EF4444] transition-all text-[12px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none"
                >
                  <IconLogout size={16} /> Sign Out
                </button>
              )}
            </div>
          </aside>
        )}

        {/* OFF-CANVAS SIDEBAR DRAWER (Tablet & Mobile) */}
        {!isDesktop && (
          <aside
            className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col bg-[#111827] h-full shadow-2xl transition-transform duration-300 ease-out border-r border-[#1A2540] ${
              isMobile ? 'w-[280px]' : 'w-[220px]'
            } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Header with Close */}
            <div className="h-[64px] px-6 border-b border-[#1A2540] flex items-center justify-between bg-[#1A2540]/30">
              <div className="flex items-center gap-1">
                <span className="text-[18px] font-bold text-white">Learnify</span>
                <div className="w-1.5 h-1.5 bg-[#FF6B2B] rounded-full"></div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 cursor-pointer border-none bg-transparent"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Links scrollbar */}
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-6">
                {navGroups.map((group) => (
                  <div key={group.title}>
                    <div className="text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2 px-6">
                      {group.title}
                    </div>
                    <div className="space-y-1 px-4">
                      {group.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.end}
                          onClick={() => setIsSidebarOpen(false)}
                          className={({ isActive }) => getLinkClass(isActive)}
                          style={{ height: isMobile ? '52px' : '44px' }} // 52px Touch Targets on Mobile!
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon size={20} className={isActive ? 'text-[#FF6B2B]' : 'text-[#6B7280]'} />
                              <span className="truncate">{item.name}</span>
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Bottom info */}
            <div className="p-4 border-t border-[#1A2540] space-y-3 bg-[#1A2540]/30">
              <div className="flex items-center gap-3">
                <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8C42] text-white font-bold text-[12px] flex items-center justify-center">
                  {initial}
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">{adminName}</div>
                  <div className="text-[10px] text-[#9CA3AF]">Super Admin</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-[#EF4444] transition-all text-[12px] font-bold flex items-center justify-center gap-1.5 cursor-pointer border-none"
              >
                <IconLogout size={16} /> Sign Out
              </button>
            </div>
          </aside>
        )}

        {/* 4. MAIN CONTENT CONTAINER */}
        <main className={`flex-1 overflow-y-auto min-h-[calc(100vh-64px)] transition-all duration-200 bg-[#0A0F1E]
          ${isDesktop ? 'p-8' : isTablet ? 'p-6' : 'p-4'}`}>
          <Outlet />
        </main>
      </div>

      {/* 5. BOTTOM NAVIGATION BAR (Mobile Only) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-[56px] bg-[#111827] border-t border-[#1A2540] shadow-[0_-2px_10px_rgba(0,0,0,0.3)] z-30 flex items-center justify-around px-2">
          {[
            { name: 'Overview', path: '/admin', icon: IconLayoutDashboard, end: true },
            { name: 'Users', path: '/admin/users', icon: IconUsers },
            { name: 'Courses', path: '/admin/courses', icon: IconBook },
            { name: 'Analytics', path: '/admin/analytics', icon: IconChartBar },
            { name: 'Settings', path: '/admin/settings', icon: IconSettings },
          ].map((tab) => {
            const isActive = tab.end 
              ? location.pathname === tab.path 
              : location.pathname.startsWith(tab.path);
              
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className="flex flex-col items-center justify-center w-14 h-full relative"
              >
                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute top-1 w-1.5 h-1.5 bg-[#FF6B2B] rounded-full" />
                )}
                
                <tab.icon 
                  size={22} 
                  className={`mt-1.5 transition-colors ${isActive ? 'text-[#FF6B2B]' : 'text-[#6B7280]'}`} 
                />
                
                <span 
                  className={`text-[9px] font-semibold mt-0.5 transition-colors ${
                    isActive ? 'text-[#FF6B2B]' : 'text-[#9CA3AF]'
                  }`}
                >
                  {tab.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default AdminLayout;
