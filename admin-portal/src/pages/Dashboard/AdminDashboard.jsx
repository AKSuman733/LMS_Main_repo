import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Users, BookOpen, GraduationCap, TrendingUp, Clock, Star, MessageSquare, BarChart } from "lucide-react";
import { motion } from "framer-motion";
import "../../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 0, totalEnrollments: 0, enrollmentsThisWeek: 0, completionRate: 0, pendingApprovals: 0, systemHealth: "Optimal", instructorStats: [] });
    const [recentUsers, setRecentUsers] = useState([]);

    const normalizeUrl = (url) => {
        if (!url) return "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168";
        if (url.startsWith("http")) return url;
        const cleanPath = url.startsWith("/") ? url.slice(1) : url;
        return `http://localhost:5000/${cleanPath}`;
    };
    const [popularCourses, setPopularCourses] = useState([]);
    const [recentReviews, setRecentReviews] = useState([]);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            try {
                const [statsRes, usersRes, coursesRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/admin/stats"),
                    axios.get("http://localhost:5000/api/admin/users"),
                    axios.get("http://localhost:5000/api/courses")
                ]);

                setStats(statsRes.data);
                setRecentUsers(usersRes.data.slice(0, 5));

                const sorted = [...coursesRes.data]
                    .sort((a, b) => (parseInt(b.enrollments) || 0) - (parseInt(a.enrollments) || 0))
                    .slice(0, 3);
                setPopularCourses(sorted);

                const revRes = await axios.get("http://localhost:5000/api/admin/reviews/recent");
                setRecentReviews(revRes.data);
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
            } finally {
                setLoadingData(false);
            }
        };
        fetchData();
    }, []);

    if (loadingData) return (
        <div className="premium-page-loader skeleton-pulse">
            <div className="spinner-ring"></div>
            <p className="loader-text">Loading... Platform Overview</p>
        </div>
    );

    const cards = [
        { title: "Total Active Users", value: stats.totalStudents, icon: Users, color: "var(--color-success)" },
        { title: "Total Courses", value: stats.totalCourses, icon: BookOpen, color: "var(--color-secondary)" },
        { title: "Enrollments This Week", value: `+${stats.enrollmentsThisWeek}`, icon: TrendingUp, color: "var(--color-primary)" },
        { title: "Course Completion Rate", value: `${stats.completionRate}%`, icon: GraduationCap, color: "var(--color-success)" },
        { title: "Pending Approvals", value: stats.pendingApprovals, icon: Clock, color: "var(--color-error)" },
        { title: "System Health", value: stats.systemHealth, icon: Star, color: stats.systemHealth === "Optimal" ? "var(--color-success)" : "var(--color-warning)" }
    ];

    return (
        <div className="admin-dashboard">
            <header className="dashboard-header">
                <div className="header-glass-bg"></div>
                <div className="header-content-v">
                    <h2>Platform Overview</h2>
                    <p>Track your platform's growth and engagement in real-time.</p>
                </div>
            </header>

            <div className="stats-grid">
                {cards.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={idx}
                            className="stat-card-premium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <div className="stat-icon-bg" style={{ background: `color-mix(in srgb, ${card.color} 20%, transparent)`, color: card.color }}>
                                <Icon size={24} />
                            </div>
                            <div className="stat-content">
                                <span className="stat-label">{card.title}</span>
                                <h3 className="stat-value">{card.value}</h3>
                            </div>
                            <div className="stat-chart-mini">
                                <div className="bar" style={{ height: '40%', background: card.color }}></div>
                                <div className="bar" style={{ height: '70%', background: card.color }}></div>
                                <div className="bar" style={{ height: '60%', background: card.color }}></div>
                                <div className="bar" style={{ height: '90%', background: card.color }}></div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="quick-actions-section">
                <Link to="/courses" state={{ openModal: true }} className="qa-btn qa-primary">
                    <BookOpen size={18} /> + New Course
                </Link>
                <Link to="/students" state={{ openModal: true }} className="qa-btn qa-primary">
                    <Users size={18} /> + New Student
                </Link>
                <Link to="/students" state={{ activeTab: "archived" }} className="qa-btn qa-secondary">
                    <Clock size={18} /> Approve Pending
                </Link>
                <Link to="/reports" className="qa-btn qa-secondary">
                    <BarChart size={18} /> View Reports
                </Link>
            </div>

            <div className="dashboard-data-grid">
                <div className="left-data-stack">
                    <section className="recent-activity">
                        <div className="section-header">
                            <h3><Users size={18} /> New Registrations</h3>
                        </div>
                        <div className="activity-list">
                            {recentUsers.map((u) => (
                                <div key={u.id} className="activity-item">
                                    <div className="user-initials admin-dashboard-user-initials">{u.full_name?.charAt(0)}</div>
                                    <div className="item-info">
                                        <p className="item-title">{u.full_name}</p>
                                        <p className="item-sub">{u.email}</p>
                                    </div>
                                    <span className={`item-status ${u.role === 'admin' ? 'admin' : 'student'}`}>
                                        {u.role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="recent-reviews-box">
                        <div className="section-header">
                            <h3><MessageSquare size={18} /> Recent Feedback</h3>
                        </div>
                        <div className="rev-list-mini">
                            {recentReviews.length === 0 ? <p className="empty-msg">No recent reviews found.</p> : recentReviews.map(r => (
                                <div key={r.id} className="rev-item-mini">
                                    <div className="rev-head">
                                        <strong>{r.user_name}</strong>
                                        <span><Star size={10} fill="#facc15" stroke="none" /> {r.rating}</span>
                                    </div>
                                    <p>"{r.comment?.substring(0, 60)}..."</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <section className="course-performance">
                    <div className="section-header">
                        <h3><TrendingUp size={18} /> Popular Courses</h3>
                    </div>
                    <div className="course-perf-list">
                        {popularCourses.length === 0 ? <p className="empty-msg">Add courses to see performance.</p> : popularCourses.map((c, i) => (
                            <div key={c.id} className="perf-item-premium">
                                <div className="perf-rank">#{i + 1}</div>
                                <div className="perf-info">
                                    <p>{c.title}</p>
                                </div>
                                <div className="perf-stats-v">
                                    <div className="p-stat">
                                        <Users size={12} /> {c.enrollments}
                                    </div>
                                    <div className="p-stat rating">
                                        <Star size={12} fill="var(--color-primary)" stroke="none" /> {c.rating}
                                    </div>
                                </div>
                                <div className="perf-progress-bar">
                                    <div className="fill" style={{ width: `${(c.rating / 5) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="platform-health admin-dashboard-trending-faculty-card">
                        <h4 className="admin-dashboard-trending-title"><Star size={16} color="var(--color-primary)" fill="var(--color-primary)" /> Trending Celebrity Faculty</h4>
                        <div className="trending-inst-list admin-dashboard-trending-list">
                            {(!stats.instructorStats || stats.instructorStats.length === 0) ? (
                                <p className="admin-dashboard-empty-stats">No instructor stats available.</p>
                            ) : stats.instructorStats.slice(0, 4).map((inst) => {
                                const total = stats.totalStudents || 1;
                                const pct = Math.round((parseInt(inst.student_count) || 0) / total * 100);
                                return (
                                    <div key={inst.id} className="admin-dashboard-inst-row">
                                        <img 
                                            src={normalizeUrl(inst.image)} 
                                            alt={inst.name} 
                                            className="admin-dashboard-inst-avatar"
                                            onError={(e) => e.target.src = "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=100"} 
                                        />
                                        <div className="flex-1">
                                            <div className="admin-dashboard-inst-info-row">
                                                <span className="admin-dashboard-inst-name">{inst.name}</span>
                                                <span className="admin-dashboard-inst-pct">{pct}% <span className="admin-dashboard-inst-count-label">({inst.student_count} learners)</span></span>
                                            </div>
                                            <div className="admin-dashboard-inst-progress-bg">
                                                <div className="admin-dashboard-inst-progress-fill" style={{ width: `${pct}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="platform-health admin-dashboard-performance-card">
                        <h4 className="admin-dashboard-performance-title">Platform Performance</h4>
                        <div className="admin-dashboard-performance-grid">
                            <div className="health-stat">
                                <span>Uptime</span>
                                <strong>99.9%</strong>
                            </div>
                            <div className="health-stat">
                                <span>Avg Load</span>
                                <strong>1.2s</strong>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
