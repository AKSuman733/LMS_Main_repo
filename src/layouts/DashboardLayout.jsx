import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { LogOut, Sun, Moon, BookOpen, Settings, LayoutDashboard, Users, Award, Star, Menu, X } from 'lucide-react';

const DashboardLayout = ({ role }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const studentLinks = [
    { name: 'Dashboard', path: '/student/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Course Catalog', path: '/student/courses', icon: <BookOpen size={20} /> },
    { name: 'My Courses', path: '/student/enrolled', icon: <Award size={20} /> },
    { name: 'Settings', path: '/student/settings', icon: <Settings size={20} /> },
  ];

  const adminLinks = [
    { name: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Courses', path: '/admin/courses', icon: <BookOpen size={20} /> },
    { name: 'Student Progress', path: '/admin/students', icon: <Users size={20} /> },
    { name: 'Celebrity Heroes', path: '/admin/heroes', icon: <Star size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 overflow-hidden">
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fade-in" 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-brand-orange dark:text-brand-orange-light">Uptoskills AI Learning</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{role} Panel</p>
          </div>
          <button 
            className="md:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded btn-compact"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {links.map((link) => {
            const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-orange-500 text-white dark:bg-orange-600' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t dark:border-gray-700 space-y-4">
          <div className="flex items-center justify-between px-3">
            <span className="text-sm text-gray-600 dark:text-gray-300">Theme</span>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center z-10">
          <div className="flex items-center space-x-4">
            <button 
              className="md:hidden text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded btn-compact"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 hidden sm:block">
              Welcome, {user?.name || 'User'}
            </h2>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 sm:hidden">
            {role === 'admin' ? 'Admin' : 'Student'} Panel
          </h2>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-auto animate-fade-in" key={location.pathname}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
