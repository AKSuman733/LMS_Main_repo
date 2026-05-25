import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  LayoutDashboard,
  BookOpen,
  User,
  LogOut,
  Compass,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Search
} from 'lucide-react';

const StudentSidebar = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px' }}>
        <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
          Are you sure you want to log out?
        </p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'var(--surface-color-light)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
              border: 'none',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(139, 92, 246, 0.2)'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    ), {
      duration: 8000,
      position: 'top-center',
      style: {
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '16px',
        minWidth: '300px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        color: 'var(--text-primary)'
      }
    });
  };

  return (
    <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button
        className="collapse-toggle"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="sidebar-header">
        {isCollapsed ? (
          <h2 className="text-primary-color">U</h2>
        ) : (
          <img src="/logo.png" alt="UptoSkills Logo" style={{ height: '32px', objectFit: 'contain', margin: '0 auto' }} />
        )}
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          title="My Dashboard"
          className={`sidebar-link ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <LayoutDashboard size={20} />
          {!isCollapsed && <span>My Dashboard</span>}
        </Link>

        <Link
          to="/student/explore"
          title="Explore Courses"
          className={`sidebar-link ${isActive('/student/explore') ? 'active' : ''}`}
        >
          <Compass size={20} />
          {!isCollapsed && <span>Explore Courses</span>}
        </Link>

        <Link
          to="/my-learning"
          title="My Learning"
          className={`sidebar-link ${isActive('/my-learning') ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          {!isCollapsed && <span>My Learning</span>}
        </Link>

        <Link
          to="/certificates"
          title="Certificates"
          className={`sidebar-link ${isActive('/certificates') ? 'active' : ''}`}
        >
          <Trophy size={20} />
          {!isCollapsed && <span>Certificates</span>}
        </Link>

        <Link
          to="/student/profile"
          title="Profile"
          className={`sidebar-link ${isActive('/student/profile') ? 'active' : ''}`}
        >
          <User size={20} />
          {!isCollapsed && <span>My Profile</span>}
        </Link>
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed ? (
          <div className="admin-info px-4 mb-4">
            <p className="text-sm font-semibold text-white">{user?.name}</p>
            <p className="text-xs text-gray-500">Student Learner</p>
          </div>
        ) : (
          <div className="mb-4"></div>
        )}
        <button
          onClick={handleLogout}
          title="Logout"
          className="sidebar-link w-full border-none bg-transparent cursor-pointer"
          style={isCollapsed ? { padding: '12px 0', justifyContent: 'center' } : {}}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
