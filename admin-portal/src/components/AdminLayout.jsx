import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "./Logo/Logo";
import { AuthContext } from "../store/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/AdminLayout.css";

import {
    LayoutDashboard,
    Users,
    BookOpen,
    GraduationCap,
    LogOut,
    Bell,
    X,
    ChevronDown,
    BarChart2,
    MessageSquare,
    Settings,
    UserCircle,
    ClipboardList,
    Award
} from "lucide-react";

const Icons = {
    LayoutDashboard: (props) => <LayoutDashboard size={20} {...props} />,
    Users: (props) => <Users size={20} {...props} />,
    BookOpen: (props) => <BookOpen size={20} {...props} />,
    GraduationCap: (props) => <GraduationCap size={20} {...props} />,
    LogOut: (props) => <LogOut size={20} {...props} />,
    Bell: (props) => <Bell size={20} {...props} />,
    X: ({ size = 20, ...props }) => <X size={size} {...props} />,
    ChevronDown: ({ size = 20, className = "", ...props }) => <ChevronDown size={size} className={className} {...props} />,
    BarChart: (props) => <BarChart2 size={20} {...props} />,
    MessageSquare: (props) => <MessageSquare size={20} {...props} />,
    Settings: (props) => <Settings size={20} {...props} />,
    UserCircle: (props) => <UserCircle size={20} {...props} />,
    ClipboardList: (props) => <ClipboardList size={20} {...props} />,
    Award: (props) => <Award size={20} {...props} />
};

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".profile-rel")) {
                setIsProfileOpen(false);
            }
            if (!event.target.closest(".notif-rel")) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const menuItems = [
        { name: "Overview", path: "/", icon: Icons.LayoutDashboard },
        { name: "Students", path: "/students", icon: Icons.Users },
        { name: "Tasks", path: "/tasks", icon: Icons.ClipboardList },
        { name: "Queries", path: "/queries", icon: Icons.MessageSquare },
        { name: "Courses", path: "/courses", icon: Icons.BookOpen },
        { name: "Instructors", path: "/instructors", icon: Icons.Award },
        { name: "Enrollments", path: "/enrollments", icon: Icons.GraduationCap },
        { name: "Reports", path: "/reports", icon: Icons.BarChart },
        { name: "Reviews", path: "/reviews", icon: Icons.MessageSquare },
        { name: "Profile", path: "/profile", icon: Icons.UserCircle },
        { name: "Settings", path: "/settings", icon: Icons.Settings },
    ];

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="admin-layout-root">
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}
            <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="sidebar-brand">
                    <Logo size="small" />
                    <span className="admin-badge-text">Admin Panel</span>
                    <button className="sidebar-close-btn" onClick={() => setIsSidebarOpen(false)}>
                        <Icons.X size={20} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
                            >
                                <Icon />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <button className="sidebar-logout" onClick={handleLogout}>
                        <Icons.LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="admin-main-content">
                <header className="admin-top-bar">
                    <div className="top-bar-left">
                        <button className="mobile-hamburger-btn" onClick={() => setIsSidebarOpen(true)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>
                        <h2 className="page-title">
                            {menuItems.find(m => m.path === location.pathname)?.name || "Dashboard"}
                        </h2>
                    </div>
                    <div className="top-bar-actions">
                        <div className="notif-rel">
                            <button className="notif-btn" onClick={() => setIsNotifOpen(!isNotifOpen)}>
                                <Icons.Bell />
                                <span className="btn-badge"></span>
                            </button>
                            <AnimatePresence>
                                {isNotifOpen && (
                                    <motion.div
                                        className="admin-notif-dropdown"
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                    >
                                        <div className="notif-head">
                                            <h4>System Notifications</h4>
                                            <button onClick={() => setIsNotifOpen(false)}><Icons.X size={14} /></button>
                                        </div>
                                        <div className="notif-body">
                                            <div className="notif-entry">
                                                <span>🚀</span>
                                                <p>New course 'Introduction to AI' added by System.</p>
                                            </div>
                                            <div className="notif-entry">
                                                <span>👥</span>
                                                <p>3 new student registrations in the last hour.</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="profile-rel">
                            <div className="admin-profile-pill" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                                <div className="admin-avatar">{user?.fullName?.charAt(0) || "A"}</div>
                                <div className="admin-p-info">
                                    <span>{user?.fullName || "Admin"}</span>
                                    <Icons.ChevronDown className={isProfileOpen ? 'rotate' : ''} />
                                </div>
                            </div>
                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        className="admin-profile-dropdown"
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 15, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: "easeOut" }}
                                    >
                                        <div className="dropdown-user-header">
                                            <p className="p-name">{user?.fullName}</p>
                                            <p className="p-email">{user?.email}</p>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link to="/profile" className="admin-layout-link-unstyled" onClick={() => setIsProfileOpen(false)}>
                                            <button className="p-action">My Profile</button>
                                        </Link>
                                        <Link to="/forgot-password" className="admin-layout-link-unstyled" onClick={() => setIsProfileOpen(false)}>
                                            <button className="p-action">Change Password</button>
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button className="p-action logout" onClick={handleLogout}>
                                            <Icons.LogOut />
                                            <span>Logout</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                <motion.div
                    className="admin-page-container"
                    key={location.pathname}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default AdminLayout;
