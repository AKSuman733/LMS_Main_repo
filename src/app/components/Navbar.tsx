import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { Menu, X, ChevronDown, User as UserIcon, BookOpen, LogOut, LayoutDashboard, Award, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Explore', href: '/courses' },
    { name: 'Paths', href: '/paths' },
    { name: 'Community', href: '/community' },
    { name: 'For Teams', href: '/teams' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSignOut = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-[68px] bg-white/80 backdrop-blur-[12px] border-b border-[#E2E1F0] z-50">
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-0">
            <span className="text-[20px] font-bold text-[#2D1B69]">Learnify</span>
            <div className="w-[6px] h-[6px] rounded-full bg-[#BBFF00] ml-[2px]"></div>
          </Link>

          {/* Desktop Navigation - Hidden for Admin */}
          <div className="hidden md:flex items-center gap-8">
            {user?.role !== 'admin' && navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => (isActive ? 'nav-active' : 'nav-inactive')}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Desktop Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user && location.pathname !== '/' ? (
              <div className="relative flex items-center gap-4" ref={dropdownRef}>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-[14px] font-bold text-[#D97706] hover:text-[#B45309] transition-colors"
                  >
                    Admin Panel
                  </Link>
                )}
                
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-[6px] py-[4px] pr-[10px] pl-[6px] rounded-[20px] hover:bg-[#EDE9FF] transition-all duration-200 cursor-pointer focus:outline-none border-none bg-transparent"
                >
                  {user.role === 'admin' ? (
                    <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-tr from-[#FBBF24] to-[#D97706] flex items-center justify-center text-white text-[15px] font-bold shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-tr from-[#2D1B69] to-[#4A2FA0] flex items-center justify-center text-[#BBFF00] text-[15px] font-bold shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <ChevronDown size={16} className="text-[#6B6B80]" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[260px] bg-white border border-[#E2E1F0] rounded-[14px] shadow-[0_8px_32px_rgba(45,27,105,0.12)] flex flex-col z-50 animate-slide-down">
                    {/* SECTION 1 — USER PROFILE HEADER */}
                    {user.role === 'admin' ? (
                      <div className="bg-[#FEF3C7] rounded-t-[14px] p-4 flex items-center gap-3 border-b border-[#E2E1F0]">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FBBF24] to-[#D97706] flex items-center justify-center text-white text-[20px] font-bold shadow-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-bold text-[#92400E] truncate mb-0.5">{user.name}</p>
                          <p className="text-[13px] text-[#92400E]/70 truncate mb-2">{user.email}</p>
                          <span className="inline-block bg-[#F59E0B] text-white text-[10px] font-bold uppercase rounded-[4px] px-2 py-0.5 tracking-wide">
                            Admin
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#F5F3FF] rounded-t-[14px] p-4 flex items-center gap-3 border-b border-[#E2E1F0]">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#2D1B69] to-[#4A2FA0] flex items-center justify-center text-[#BBFF00] text-[20px] font-bold shadow-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-bold text-[#1A1A2E] truncate mb-0.5">{user.name}</p>
                          <p className="text-[13px] text-[#6B6B80] truncate mb-2">{user.email}</p>
                          <span className="inline-block bg-[#BBFF00] text-[#1A1A2E] text-[10px] font-bold uppercase rounded-[4px] px-2 py-0.5 tracking-wide">
                            Pro Learner
                          </span>
                        </div>
                      </div>
                    )}

                    {/* SECTION 2 — NAVIGATION LINKS */}
                    <div className="py-1">
                      {user.role === 'admin' ? (
                        <Link 
                          to="/admin" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-[10px] h-[44px] w-full text-left text-[14px] text-[#1A1A2E] hover:bg-[#FEF3C7] hover:text-[#92400E] transition-colors"
                        >
                          <LayoutDashboard size={18} className="text-[#6B6B80] transition-colors" />
                          Admin Dashboard
                        </Link>
                      ) : (
                        <>
                          <Link 
                            to="/dashboard" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-[10px] h-[44px] w-full text-left text-[14px] text-[#1A1A2E] hover:bg-[#F5F3FF] hover:text-[#2D1B69] transition-colors"
                          >
                            <LayoutDashboard size={18} className="text-[#6B6B80] transition-colors" />
                            Dashboard
                          </Link>
                          <Link 
                            to="/dashboard/courses" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-[10px] h-[44px] w-full text-left text-[14px] text-[#1A1A2E] hover:bg-[#F5F3FF] hover:text-[#2D1B69] transition-colors"
                          >
                            <BookOpen size={18} className="text-[#6B6B80] transition-colors" />
                            My Courses
                          </Link>
                          <Link 
                            to="/dashboard/certificates" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-[10px] h-[44px] w-full text-left text-[14px] text-[#1A1A2E] hover:bg-[#F5F3FF] hover:text-[#2D1B69] transition-colors"
                          >
                            <Award size={18} className="text-[#6B6B80] transition-colors" />
                            Certificates
                          </Link>
                          <Link 
                            to="/dashboard/settings" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-[10px] h-[44px] w-full text-left text-[14px] text-[#1A1A2E] hover:bg-[#F5F3FF] hover:text-[#2D1B69] transition-colors"
                          >
                            <Settings size={18} className="text-[#6B6B80] transition-colors" />
                            Settings
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="border-t border-[#E2E1F0]"></div>

                    {/* SECTION 3 — DANGER ZONE */}
                    <div className="pt-1 pb-2 flex flex-col gap-1">
                      <button 
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="flex items-center gap-3 px-4 py-[10px] h-[44px] w-full text-left text-[14px] text-[#2D1B69] hover:bg-[#EDE9FF] transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <UserIcon size={18} className="text-[#2D1B69]" />
                        Sign in
                      </button>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-[10px] h-[44px] w-full text-left text-[14px] text-[#EF4444] hover:bg-[#FEF2F2] transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <LogOut size={18} className="text-[#EF4444]" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-[12px]">
                <Link
                  to="/login"
                  onClick={() => { if (user) logout(); }}
                  className="text-[14px] font-medium text-[#2D1B69] hover:underline hover:text-[#1A0F3C] bg-transparent border-0"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => { if (user) logout(); }}
                  className="h-[40px] px-[20px] bg-[#2D1B69] text-[#BBFF00] font-semibold text-[14px] rounded-[10px] border-0 flex items-center justify-center hover:bg-[#3D2B89] hover:scale-[1.02] transition-all duration-200"
                >
                  Get started free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Actions Header */}
          <div className="flex md:hidden items-center gap-2">
            {user && location.pathname !== '/' && (
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-[6px] py-[4px] pr-[10px] pl-[6px] rounded-[20px] hover:bg-[#EDE9FF] transition-all duration-200 cursor-pointer focus:outline-none border-none bg-transparent"
              >
                {user.role === 'admin' ? (
                  <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-tr from-[#FBBF24] to-[#D97706] flex items-center justify-center text-white text-[15px] font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-tr from-[#2D1B69] to-[#4A2FA0] flex items-center justify-center text-[#BBFF00] text-[15px] font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#2D1B69] p-2 cursor-pointer focus:outline-none border-none bg-transparent"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden pt-[68px]">
          <div className="flex flex-col h-[calc(100vh-68px)] p-6">
            <div className="flex-1 flex flex-col gap-6">
              {user?.role !== 'admin' && navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-[24px] font-bold ${isActive ? 'text-[#2D1B69]' : 'text-[#6B6B80]'}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 pt-6 border-t border-[#E2E1F0]">
              {user && location.pathname !== '/' ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    {user.role === 'admin' ? (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FBBF24] to-[#D97706] flex items-center justify-center text-white font-bold text-[16px] shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2D1B69] to-[#4A2FA0] flex items-center justify-center text-[#BBFF00] font-bold text-[16px] shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-[15px] font-bold text-[#1A1A2E]">{user.name}</p>
                      <p className="text-[13px] text-[#6B6B80]">{user.email}</p>
                    </div>
                  </div>
                  {user.role === 'admin' ? (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-[16px] font-medium text-[#1A1A2E]"
                    >
                      <LayoutDashboard size={20} className="text-[#6B6B80]" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-[16px] font-medium text-[#1A1A2E]"
                    >
                      <LayoutDashboard size={20} className="text-[#6B6B80]" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="flex items-center gap-3 py-2 text-[16px] font-medium text-[#2D1B69] text-left cursor-pointer border-none bg-transparent"
                  >
                    <UserIcon size={20} className="text-[#2D1B69]" />
                    Sign in
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 py-2 text-[16px] font-medium text-[#EF4444] text-left cursor-pointer border-none bg-transparent"
                  >
                    <LogOut size={20} className="text-[#EF4444]" />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => {
                      if (user) logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-center text-[15px] font-bold text-[#2D1B69] py-3 bg-transparent hover:text-[#1A0F3C] hover:underline"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => {
                      if (user) logout();
                      setMobileMenuOpen(false);
                    }}
                    className="h-[48px] px-6 bg-[#2D1B69] text-[#BBFF00] rounded-[10px] text-[15px] font-bold flex items-center justify-center hover:bg-[#3D2B89] active:scale-[0.98] transition-all"
                  >
                    Get started free
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Profile Bottom Sheet */}
      {profileDropdownOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setProfileDropdownOpen(false)}
          ></div>
          
          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E1F0] rounded-t-[20px] shadow-[0_-8px_32px_rgba(45,27,105,0.15)] flex flex-col z-50 animate-slide-up max-h-[85vh] overflow-y-auto">
            {/* Grabber Handle */}
            <div className="w-12 h-1 bg-[#E2E1F0] rounded-full mx-auto my-3 flex-shrink-0"></div>

            {/* SECTION 1 — USER PROFILE HEADER */}
            {user?.role === 'admin' ? (
              <div className="bg-[#FEF3C7] p-4 flex items-center gap-4 border-b border-[#E2E1F0]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FBBF24] to-[#D97706] flex items-center justify-center text-white text-[20px] font-bold shadow-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] font-bold text-[#92400E] truncate mb-0.5">{user?.name}</p>
                  <p className="text-[13px] text-[#92400E]/70 truncate mb-2">{user?.email}</p>
                  <span className="inline-block bg-[#F59E0B] text-white text-[10px] font-bold uppercase rounded-[4px] px-2 py-0.5 tracking-wide">
                    Admin
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-[#F5F3FF] p-4 flex items-center gap-4 border-b border-[#E2E1F0]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#2D1B69] to-[#4A2FA0] flex items-center justify-center text-[#BBFF00] text-[20px] font-bold shadow-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[16px] font-bold text-[#1A1A2E] truncate mb-0.5">{user?.name}</p>
                  <p className="text-[13px] text-[#6B6B80] truncate mb-2">{user?.email}</p>
                  <span className="inline-block bg-[#BBFF00] text-[#1A1A2E] text-[10px] font-bold uppercase rounded-[4px] px-2 py-0.5 tracking-wide">
                    Pro Learner
                  </span>
                </div>
              </div>
            )}

            {/* SECTION 2 — NAVIGATION LINKS */}
            <div className="py-2">
              {user?.role === 'admin' ? (
                <Link 
                  to="/admin" 
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-4 px-6 h-[52px] w-full text-left text-[15px] text-[#1A1A2E] hover:bg-[#FEF3C7] hover:text-[#92400E] active:bg-[#FEF3C7] transition-colors"
                >
                  <LayoutDashboard size={20} className="text-[#6B6B80]" />
                  Admin Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-4 px-6 h-[52px] w-full text-left text-[15px] text-[#1A1A2E] hover:bg-[#F5F3FF] hover:text-[#2D1B69] active:bg-[#F5F3FF] transition-colors"
                  >
                    <LayoutDashboard size={20} className="text-[#6B6B80]" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/courses" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-4 px-6 h-[52px] w-full text-left text-[15px] text-[#1A1A2E] hover:bg-[#F5F3FF] hover:text-[#2D1B69] active:bg-[#F5F3FF] transition-colors"
                  >
                    <BookOpen size={20} className="text-[#6B6B80]" />
                    My Courses
                  </Link>
                  <Link 
                    to="/dashboard/certificates" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-4 px-6 h-[52px] w-full text-left text-[15px] text-[#1A1A2E] hover:bg-[#F5F3FF] hover:text-[#2D1B69] active:bg-[#F5F3FF] transition-colors"
                  >
                    <Award size={20} className="text-[#6B6B80]" />
                    Certificates
                  </Link>
                  <Link 
                    to="/settings" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-4 px-6 h-[52px] w-full text-left text-[15px] text-[#1A1A2E] hover:bg-[#F5F3FF] hover:text-[#2D1B69] active:bg-[#F5F3FF] transition-colors"
                  >
                    <Settings size={20} className="text-[#6B6B80]" />
                    Settings
                  </Link>
                </>
              )}
            </div>

            <div className="border-t border-[#E2E1F0]"></div>

            {/* SECTION 3 — DANGER ZONE */}
            <div className="pt-2 pb-6 flex flex-col gap-1">
              <button 
                onClick={() => {
                  logout();
                  setProfileDropdownOpen(false);
                  navigate('/login');
                }}
                className="flex items-center gap-4 px-6 h-[52px] w-full text-left text-[15px] text-[#2D1B69] hover:bg-[#EDE9FF] active:bg-[#EDE9FF] transition-colors cursor-pointer border-none bg-transparent"
              >
                <UserIcon size={20} className="text-[#2D1B69]" />
                Sign in
              </button>
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-4 px-6 h-[52px] w-full text-left text-[15px] text-[#EF4444] hover:bg-[#FEF2F2] active:bg-[#FEF2F2] transition-colors cursor-pointer border-none bg-transparent"
              >
                <LogOut size={20} className="text-[#EF4444]" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
