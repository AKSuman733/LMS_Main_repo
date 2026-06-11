import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../store/AuthContext";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell } from "lucide-react";
import Logo from "./Logo/Logo";
import "../styles/Header.css";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);
    const [searchParams] = useSearchParams();

    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    useEffect(() => {
        setSearchQuery(searchParams.get("search") || "");
    }, [searchParams]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile-wrapper")) {
                setIsProfileOpen(false);
            }
            if (!event.target.closest(".notif-wrapper")) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
        setIsProfileOpen(false);
    };

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        if (!val.trim()) {
            navigate("/courses");
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate(`/courses`);
        }
    };

    return (
        <motion.header
            className="main-header"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="header-left">
                <Link to="/" className="logo-link-wrapper">
                    <Logo size="medium" />
                </Link>

                <nav className="nav-links">
                    {["Explore", "Dashboard", "Celebrities", "Resources", "About", "Contact"].map((item, index) => {
                        const path = item === "Dashboard"
                            ? "/dashboard"
                            : (item === "Explore" ? "/courses" : `/${item.toLowerCase()}`);
                        return (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (index + 1) }}
                            >
                                <Link
                                    to={path}
                                    className={`nav-link ${location.pathname === path ? "active" : ""}`}
                                >
                                    {item}
                                </Link>
                            </motion.div>
                        );
                    })}
                </nav>
            </div>

            <div className="header-actions">
                {location.pathname === "/courses" && (
                    <motion.form
                        className={`search-container ${isSearchExpanded || searchQuery ? "expanded" : ""}`}
                        onSubmit={handleSearchSubmit}
                        layout
                    >
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="search-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button
                            type="submit"
                            className="search-icon-btn"
                            onClick={(e) => {
                                if (!searchQuery) {
                                    e.preventDefault();
                                    setIsSearchExpanded(!isSearchExpanded);
                                }
                            }}
                        >
                            <Search size={20} strokeWidth={2.5} />
                        </button>
                    </motion.form>
                )}

                {user ? (
                    <div className="user-controls">
                        <div className="notif-wrapper">
                            <button className="action-icon" onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}>
                                <Bell size={22} strokeWidth={2} />
                                <span className="badge-dot"></span>
                            </button>
                            <AnimatePresence>
                                {isNotifOpen && (
                                    <motion.div
                                        className="notif-dropdown-modern"
                                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                    >
                                        <h4>Notifications</h4>
                                        <div className="notif-item-modern">
                                            <span>🚀</span>
                                            <p>Welcome to UptoSkills! Start your AI-Powered learning today.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="profile-wrapper">
                            <button
                                className="profile-btn-trigger"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsProfileOpen(!isProfileOpen);
                                    setIsNotifOpen(false);
                                }}
                            >
                                <div className="modern-profile-icon-wrapper student-header-avatar">
                                    {user.fullName?.charAt(0) || user.username?.charAt(0) || "U"}
                                </div>
                            </button>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        className="profile-dropdown-premium"
                                        initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 15 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                    >
                                        <div className="dropdown-user-info">
                                            <p className="u-name">{user.fullName || user.username}</p>
                                            <p className="u-email">{user.email}</p>
                                        </div>
                                        <div className="dropdown-divider-line"></div>
                                        <Link to="/dashboard" className="dropdown-link-item" onClick={() => setIsProfileOpen(false)}>
                                            <span className="icon">🎓</span> My Learning
                                        </Link>
                                        <Link to="/dashboard" className="dropdown-link-item" onClick={() => setIsProfileOpen(false)}>
                                            <span className="icon">📜</span> My Certificates
                                        </Link>
                                        <Link to="/resources" className="dropdown-link-item" onClick={() => setIsProfileOpen(false)}>
                                            <span className="icon">📚</span> Learning Resources
                                        </Link>
                                        <div className="dropdown-divider-line"></div>
                                        <Link to="/forgot-password" className="dropdown-link-item" onClick={() => setIsProfileOpen(false)}>
                                            <span className="icon">🔑</span> Change Password
                                        </Link>
                                        <button className="logout-action-btn" onClick={handleLogout}>
                                            <span className="icon">🚪</span> Log Out
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ) : (
                    <div className="auth-btns-header">
                        <Link to="/login" className="login-text-btn">Login</Link>
                        <Link to="/register" className="signup-btn-header">Join for Free</Link>
                    </div>
                )}
            </div>
        </motion.header>
    );
};

export default Header;