import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, Menu, LogOut, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const handleProfileUpdate = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
    };
    window.addEventListener('profileUpdated', handleProfileUpdate);
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate);
  }, []);

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

  const isHomePage = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="UptoSkills Logo" style={{ height: '40px', objectFit: 'contain' }} />
        </Link>

        {(!user || user.role !== 'admin') && (
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/courses" className="nav-link">Explore</Link>
            <Link to="/celebrities" className="nav-link">Celebrities</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </div>
        )}

        <div className="nav-actions" style={user?.role === 'admin' ? { marginLeft: 'auto' } : {}}>
          <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
          </button>
          
          {user ? (
            <div className="desktop-only-auth">
              {user.role !== 'admin' && <Link to="/dashboard" className="nav-link">Dashboard</Link>}
              <div className="user-profile">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-color)' }} />
                ) : (
                  <User size={20} />
                )}
                <span className="user-name">{user.name}</span>
                <button onClick={handleLogout} className="logout-btn" aria-label="Logout">
                  <LogOut size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : (
            <div className="nav-auth-buttons desktop-only-auth">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-nav-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-content"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div id="mobile-menu-content" className="mobile-menu-content">
            {(!user || user.role !== 'admin') && (
              <div className="mobile-nav-links">
                <Link to="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/courses" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Explore</Link>
                <Link to="/celebrities" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Celebrities</Link>
                <Link to="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
                <Link to="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </div>
            )}
            
            {user ? (
              <div className="mobile-user-actions">
                {user.role !== 'admin' && <Link to="/dashboard" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>}
                <div className="user-profile mobile-profile">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--primary-color)' }} />
                  ) : (
                    <User size={20} />
                  )}
                  <span className="user-name">{user.name}</span>
                  <button onClick={handleLogout} className="logout-btn">
                    <LogOut size={18} aria-hidden="true" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="mobile-nav-auth-buttons">
                <Link to="/login" className="btn btn-outline" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
