import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { Menu, X, ChevronDown, User as UserIcon, BookOpen, LogOut, LayoutDashboard, Award, Settings, Search, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from './Button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/courses?q=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  const handleSignOut = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-[64px] bg-[#0A0F1E] border-b border-[#1A2540] z-50">
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center justify-between gap-4">
          
          {/* Left: Logo & Nav Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-0">
              <span className="text-[20px] font-bold text-white tracking-tight">Learnify</span>
              <div className="w-[6px] h-[6px] rounded-full bg-[#FF6B2B] ml-[2px]"></div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {user?.role !== 'admin' && navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    `text-[14px] font-medium transition-colors ${
                      isActive ? 'text-[#FF6B2B] font-semibold' : 'text-[#9CA3AF] hover:text-white'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Center: Rounded Pill Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-[280px] lg:max-w-[340px] w-full">
            <Search className="absolute left-3.5 text-[#9CA3AF]" size={16} />
            <input
              type="text"
              placeholder="Search courses, topics..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full h-[36px] pl-9 pr-4 bg-[#111827] border border-[#1A2540] rounded-full text-[13px] text-white outline-none focus:border-[#FF6B2B] placeholder-[#9CA3AF] transition-all"
            />
          </form>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Notification Bell */}
            <button className="relative w-8 h-8 flex items-center justify-center rounded-full text-[#9CA3AF] hover:text-white hover:bg-[#111827] cursor-pointer focus:outline-none border-none bg-transparent">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#FF6B2B] rounded-full border border-[#0A0F1E]"></span>
            </button>

            {/* User Dropdown */}
            {user ? (
              <div className="relative flex items-center" ref={dropdownRef}>
                <button 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-[6px] py-[4px] pr-[10px] pl-[6px] rounded-full hover:bg-[#111827] transition-all duration-200 cursor-pointer focus:outline-none border-none bg-transparent"
                >
                  <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-tr from-[#FF6B2B] to-[#FF8C42] flex items-center justify-center text-white text-[13px] font-bold shadow-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className="text-[#9CA3AF]" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[260px] bg-[#111827] border border-[#1A2540] rounded-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col z-50 animate-slide-down">
                    <div className="bg-[#1A2540] rounded-t-[14px] p-4 flex items-center gap-3 border-b border-[#1A2540]">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF6B2B] to-[#FF8C42] flex items-center justify-center text-white text-[16px] font-bold shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-bold text-white truncate mb-0.5">{user.name}</p>
                        <p className="text-[12px] text-[#9CA3AF] truncate mb-2">{user.email}</p>
                        <span className="inline-block bg-[#00C97B]/20 text-[#00C97B] text-[9px] font-bold uppercase rounded-[4px] px-2 py-0.5 tracking-wide border border-[#00C97B]/30">
                          {user.role === 'admin' ? 'Admin' : 'Pro Learner'}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      {user.role === 'admin' ? (
                        <Link 
                          to="/admin" 
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-[10px] h-[40px] w-full text-left text-[13px] text-[#E5E7EB] hover:bg-[#1A2540] hover:text-white transition-colors"
                        >
                          <LayoutDashboard size={16} className="text-[#9CA3AF]" />
                          Admin Dashboard
                        </Link>
                      ) : (
                        <>
                          <Link 
                            to="/dashboard" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-[10px] h-[40px] w-full text-left text-[13px] text-[#E5E7EB] hover:bg-[#1A2540] hover:text-white transition-colors"
                          >
                            <LayoutDashboard size={16} className="text-[#9CA3AF]" />
                            Dashboard
                          </Link>
                          <Link 
                            to="/dashboard/courses" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-[10px] h-[40px] w-full text-left text-[13px] text-[#E5E7EB] hover:bg-[#1A2540] hover:text-white transition-colors"
                          >
                            <BookOpen size={16} className="text-[#9CA3AF]" />
                            My Courses
                          </Link>
                          <Link 
                            to="/dashboard/certificates" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-[10px] h-[40px] w-full text-left text-[13px] text-[#E5E7EB] hover:bg-[#1A2540] hover:text-white transition-colors"
                          >
                            <Award size={16} className="text-[#9CA3AF]" />
                            Certificates
                          </Link>
                          <Link 
                            to="/dashboard/settings" 
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-[10px] h-[40px] w-full text-left text-[13px] text-[#E5E7EB] hover:bg-[#1A2540] hover:text-white transition-colors"
                          >
                            <Settings size={16} className="text-[#9CA3AF]" />
                            Settings
                          </Link>
                        </>
                      )}
                    </div>

                    <div className="border-t border-[#1A2540]"></div>
                    <div className="py-1">
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-[10px] h-[40px] w-full text-left text-[13px] text-[#EF4444] hover:bg-[#EF4444]/10 transition-colors cursor-pointer border-none bg-transparent"
                      >
                        <LogOut size={16} className="text-[#EF4444]" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[14px] font-medium text-[#9CA3AF] hover:text-white transition-colors bg-transparent border-0"
              >
                Sign in
              </Link>
            )}

            {/* Enterprise CTA button */}
            <Link to="/teams">
              <Button variant="primary" className="h-[36px] text-[13px] px-4 rounded-full font-semibold">
                For Enterprise
              </Button>
            </Link>
          </div>

          {/* Mobile Actions Header */}
          <div className="flex md:hidden items-center gap-3">
            {user && (
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center cursor-pointer focus:outline-none border-none bg-transparent"
              >
                <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-tr from-[#FF6B2B] to-[#FF8C42] flex items-center justify-center text-white text-[13px] font-bold shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 cursor-pointer focus:outline-none border-none bg-transparent"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0A0F1E] z-40 md:hidden pt-[64px] border-b border-[#1A2540]">
          <div className="flex flex-col h-[calc(100vh-64px)] p-6 justify-between">
            <div className="flex flex-col gap-6">
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" size={16} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full h-[40px] pl-10 pr-4 bg-[#111827] border border-[#1A2540] rounded-full text-[14px] text-white outline-none focus:border-[#FF6B2B] placeholder-[#9CA3AF]"
                />
              </form>

              {user?.role !== 'admin' && navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `text-[20px] font-bold ${isActive ? 'text-[#FF6B2B]' : 'text-[#9CA3AF]'}`}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            
            <div className="flex flex-col gap-3 pt-6 border-t border-[#1A2540]">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF6B2B] to-[#FF8C42] flex items-center justify-center text-white font-bold text-[15px] shadow-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-white leading-tight">{user.name}</p>
                      <p className="text-[12px] text-[#9CA3AF]">{user.email}</p>
                    </div>
                  </div>
                  {user.role === 'admin' ? (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-[15px] font-medium text-white hover:text-[#FF6B2B]"
                    >
                      <LayoutDashboard size={18} className="text-[#9CA3AF]" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-2 text-[15px] font-medium text-white hover:text-[#FF6B2B]"
                    >
                      <LayoutDashboard size={18} className="text-[#9CA3AF]" />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 py-2 text-[15px] font-medium text-[#EF4444] text-left cursor-pointer border-none bg-transparent"
                  >
                    <LogOut size={18} className="text-[#EF4444]" />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center text-[15px] font-bold text-[#9CA3AF] hover:text-white py-2"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/teams"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    <Button variant="primary" className="w-full rounded-full">
                      For Enterprise
                    </Button>
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
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
            onClick={() => setProfileDropdownOpen(false)}
          ></div>
          
          <div className="fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-[#1A2540] rounded-t-[20px] shadow-[0_-8px_32px_rgba(0,0,0,0.5)] flex flex-col z-50 animate-slide-up max-h-[85vh] overflow-y-auto">
            <div className="w-12 h-1 bg-[#1A2540] rounded-full mx-auto my-3 flex-shrink-0"></div>

            <div className="bg-[#1A2540] p-4 flex items-center gap-4 border-b border-[#1A2540]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF6B2B] to-[#FF8C42] flex items-center justify-center text-white text-[18px] font-bold shadow-sm">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-bold text-white truncate mb-0.5">{user?.name}</p>
                <p className="text-[12px] text-[#9CA3AF] truncate mb-2">{user?.email}</p>
                <span className="inline-block bg-[#00C97B]/20 text-[#00C97B] text-[9px] font-bold uppercase rounded-[4px] px-2 py-0.5 tracking-wide border border-[#00C97B]/30">
                  {user?.role === 'admin' ? 'Admin' : 'Pro Learner'}
                </span>
              </div>
            </div>

            <div className="py-2">
              {user?.role === 'admin' ? (
                <Link 
                  to="/admin" 
                  onClick={() => setProfileDropdownOpen(false)}
                  className="flex items-center gap-4 px-6 h-[48px] w-full text-left text-[14px] text-[#E5E7EB] hover:bg-[#1A2540] active:bg-[#1A2540] hover:text-white transition-colors"
                >
                  <LayoutDashboard size={18} className="text-[#9CA3AF]" />
                  Admin Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/dashboard" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-4 px-6 h-[48px] w-full text-left text-[14px] text-[#E5E7EB] hover:bg-[#1A2540] active:bg-[#1A2540] hover:text-white transition-colors"
                  >
                    <LayoutDashboard size={18} className="text-[#9CA3AF]" />
                    Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/courses" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-4 px-6 h-[48px] w-full text-left text-[14px] text-[#E5E7EB] hover:bg-[#1A2540] active:bg-[#1A2540] hover:text-white transition-colors"
                  >
                    <BookOpen size={18} className="text-[#9CA3AF]" />
                    My Courses
                  </Link>
                  <Link 
                    to="/dashboard/certificates" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-4 px-6 h-[48px] w-full text-left text-[14px] text-[#E5E7EB] hover:bg-[#1A2540] active:bg-[#1A2540] hover:text-white transition-colors"
                  >
                    <Award size={18} className="text-[#9CA3AF]" />
                    Certificates
                  </Link>
                  <Link 
                    to="/dashboard/settings" 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-4 px-6 h-[48px] w-full text-left text-[14px] text-[#E5E7EB] hover:bg-[#1A2540] active:bg-[#1A2540] hover:text-white transition-colors"
                  >
                    <Settings size={18} className="text-[#9CA3AF]" />
                    Settings
                  </Link>
                </>
              )}
            </div>

            <div className="border-t border-[#1A2540]"></div>
            <div className="pt-2 pb-6 flex flex-col">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-4 px-6 h-[48px] w-full text-left text-[14px] text-[#EF4444] hover:bg-[#EF4444]/10 active:bg-[#EF4444]/10 transition-colors cursor-pointer border-none bg-transparent"
              >
                <LogOut size={18} className="text-[#EF4444]" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
