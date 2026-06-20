import { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { Sun, Moon, User, LogOut, Menu } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminSidebar from '../components/Admin/AdminSidebar';
import NotificationsDropdown from '../components/common/NotificationsDropdown';
import '../styles/AdminLayout.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const handleProfileUpdate = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
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
              background: 'var(--primary-gradient)',
              border: 'none',
              color: '#fff',
              fontSize: '0.75rem',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 6px rgba(255, 107, 53, 0.2)'
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

  // Protection: Ensure only approved admins can access
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`admin-layout ${isCollapsed ? 'collapsed' : ''}`}>
      <a href="#main-content" className="skip-to-main-content">Skip to Main Content</a>
      <div 
        className={`sidebar-overlay ${isMobileOpen ? 'active' : ''}`} 
        onClick={() => setIsMobileOpen(false)}
      ></div>
      <AdminSidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      <main id="main-content" className="admin-main-content">
        <header className="admin-top-header">
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Mobile Menu"
            aria-expanded={isMobileOpen}
          >
            <Menu size={24} aria-hidden="true" />
          </button>
          <div className="header-actions">
            <NotificationsDropdown />
            <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
            </button>
            <div className="admin-profile-badge">
              <div className="profile-icon" style={{ padding: user.profileImage ? '2px' : '' }}>
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <User size={20} />
                )}
              </div>
              <div className="profile-info">
                <span className="admin-name">{user.name}</span>
                <span className="admin-role">Administrator</span>
              </div>
              <button onClick={handleLogout} className="admin-logout-icon" title="Logout" aria-label="Logout">
                <LogOut size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </header>
        <div className="admin-content-wrapper anim-page-fade">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
