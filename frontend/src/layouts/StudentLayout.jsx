import { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import StudentSidebar from '../components/Student/StudentSidebar';
import '../styles/AdminLayout.css'; // Reuse the premium layout styles

const StudentLayout = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
              navigate('/login');
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

  // Protection: Ensure only students can access
  if (!user || user.role !== 'student') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`admin-layout ${isCollapsed ? 'collapsed' : ''}`}>
      <StudentSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="admin-main-content">
        <header className="admin-top-header">
          <div className="header-actions">
            <button className="theme-toggle" title="Notifications">
              <Bell size={20} />
            </button>
            <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="admin-profile-badge">
              <div className="profile-icon">
                <User size={20} />
              </div>
              <div className="profile-info">
                <span className="admin-name">{user.name}</span>
                <span className="admin-role text-xs">Student Learner</span>
              </div>
              <button onClick={handleLogout} className="admin-logout-icon" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>
        <div className="admin-content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
