
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { useTheme } from '../store/ThemeContext';
import { LogOut, Sun, Moon, BookOpen, Settings, LayoutDashboard, Users, Award } from 'lucide-react';

const DashboardLayout = ({ role }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

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
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const links = role === 'admin' ? adminLinks : studentLinks;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="p-6 border-b dark:border-gray-700">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Uptoskills AI Learning</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{role} Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}
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
      <div className="flex-1 overflow-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Welcome, {user?.name || 'User'}
          </h2>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
