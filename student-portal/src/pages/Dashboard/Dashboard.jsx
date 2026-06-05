import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import "../../styles/Dashboard.css";    

import {
    Book,
    Award,
    User,
    Settings,
    Bell,
    ClipboardList,
    LogOut,
    Edit,
    Check,
    Star,
    MessageSquare,
    Trash2
} from "lucide-react";

const Icons = {
    Book: (props) => <Book size={20} {...props} />,
    Award: (props) => <Award size={20} {...props} />,
    User: (props) => <User size={20} {...props} />,
    Settings: (props) => <Settings size={20} {...props} />,
    Bell: (props) => <Bell size={20} {...props} />,
    ClipboardList: (props) => <ClipboardList size={20} {...props} />,
    LogOut: (props) => <LogOut size={20} {...props} />,
    Edit: (props) => <Edit size={16} {...props} />,
    Check: (props) => <Check size={16} {...props} />,
    Star: (props) => <Star size={20} {...props} />,
    ChatBubble: (props) => <MessageSquare size={20} {...props} />,
    Trash: (props) => <Trash2 size={18} {...props} />
};

const Dashboard = () => {
    const { user, login, logout, instructors, selectedInstructor, changeInstructor } = useContext(AuthContext);
    const navigate = useNavigate();
    const [enrollments, setEnrollments] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("learning");
    const [editingTaskId, setEditingTaskId] = useState(null);

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({ fullName: "", email: "" });
    const [savingProfile, setSavingProfile] = useState(false);

    const [settings, setSettings] = useState({
        marketingEmails: true,
        securityAlerts: true,
        weeklyDigest: false,
        emailNotif: true,
        publicProfile: false,
        reduceMotion: localStorage.getItem("reduceMotion") === "true"
    });

    const [editingQuery, setEditingQuery] = useState(null);
    const [editSubject, setEditSubject] = useState("");
    const [editMessage, setEditMessage] = useState("");
    const [confirmDeleteQueryId, setConfirmDeleteQueryId] = useState(null);

    const handleEditQuery = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/queries/${editingQuery.id}`, {
                subject: editSubject,
                message: editMessage
            });
            setQueries(queries.map(q => q.id === editingQuery.id ? { ...q, subject: editSubject, message: editMessage } : q));
            setEditingQuery(null);
            toast.success("Query updated successfully!");
        } catch (err) {
            console.error("Error editing query:", err);
            toast.error("Failed to update query.");
        }
    };

    const handleDeleteQuery = async (queryId) => {
        try {
            await axios.delete(`http://localhost:5000/api/queries/${queryId}`);
            setQueries(queries.filter(q => q.id !== queryId));
            setConfirmDeleteQueryId(null);
            toast.success("Query deleted successfully!");
        } catch (err) {
            console.error("Error deleting query:", err);
            toast.error("Failed to delete query.");
        }
    };

    useEffect(() => {
        if (user) {
            fetchDashboardData();
            setProfileData({ fullName: user.fullName || "", email: user.email || "" });
        }
    }, [user]);

    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [enrollsRes, tasksRes, queriesRes] = await Promise.all([
                axios.get(`http://localhost:5000/api/enrollments/${user.id}`),
                axios.get(`http://localhost:5000/api/tasks/user/${user.id}`),
                axios.get(`http://localhost:5000/api/queries/user/${user.id}`)
            ]);
            setEnrollments(enrollsRes.data);
            setTasks(tasksRes.data);
            setQueries(queriesRes.data);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setError("We encountered an error while syncing your learning profile data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleTaskAction = async (taskId, newStatus, submissionLink = null) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, {
                status: newStatus,
                submission_link: submissionLink
            });
            setTasks(tasks.map(t => t.id === taskId ? { 
                ...t, 
                status: newStatus, 
                submission_link: submissionLink || t.submission_link,
                submitted_at: newStatus === 'completed' ? new Date().toISOString() : t.submitted_at
            } : t));
            setEditingTaskId(null);
            toast.success("Task updated successfully!");
        } catch (err) {
            console.error("Error updating task status:", err);
            toast.error("Failed to update task.");
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        try {
            await axios.put("http://localhost:5000/api/auth/profile", {
                id: user.id,
                fullName: profileData.fullName,
                email: profileData.email
            });
            login({ ...user, fullName: profileData.fullName, email: profileData.email });
            setIsEditingProfile(false);
            toast.success("Profile updated successfully!");
        } catch (err) {
            toast.error("Error updating profile.");
        } finally {
            setSavingProfile(false);
        }
    };

    const normalizeUrl = (url) => {
        if (!url) return "";
        if (url.startsWith("http")) return url;
        const cleanPath = url.startsWith("/") ? url.slice(1) : url;
        return `http://localhost:5000/${cleanPath}`;
    };

    if (!user) return <div className="error-screen"><h2>Please log in to access your dashboard.</h2></div>;
    if (loading) return (
        <div className="premium-page-loader skeleton-pulse">
            <div className="spinner-ring"></div>
            <p className="loader-text">Loading... Syncing your learning progress</p>
        </div>
    );

    if (error) return (
        <div className="premium-error-state dashboard-premium-error-state">
            <div className="error-icon-box">⚠️</div>
            <h3>Unable to Load Dashboard</h3>
            <p>{error}</p>
            <div className="error-actions">
                <button className="error-retry-btn" onClick={fetchDashboardData}>Retry</button>
                <a href="mailto:support@uptoskills.com" className="error-support-link">Contact Support</a>
            </div>
        </div>
    );

    const completedCourses = enrollments.filter(e => e.completed);
    const inProgressCourses = enrollments.filter(e => !e.completed);

    const calculateActualHours = () => {
        return enrollments.reduce((acc, curr) => {
            const curriculum = Array.isArray(curr.curriculum) ? curr.curriculum : [];
            let totalSeconds = 0;

            if (curriculum.length === 0) {
                const dur = (curr.duration || "0").toLowerCase();
                if (dur.includes('hr')) totalSeconds = (parseFloat(dur) || 0) * 3600;
                else if (dur.includes('min')) totalSeconds = (parseFloat(dur) || 0) * 60;
                else totalSeconds = (parseFloat(dur) || 0) * 3600;
            } else {
                curriculum.forEach(item => {
                    const dur = (item.duration || "0").toString();
                    if (dur.includes(':')) {
                        const parts = dur.split(':').map(Number);
                        if (parts.length === 3) totalSeconds += (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
                        else if (parts.length === 2) totalSeconds += (parts[0] || 0) * 60 + (parts[1] || 0);
                    } else {
                        const numeric = parseInt(dur);
                        if (!isNaN(numeric)) totalSeconds += numeric * 60;
                    }
                });
            }

            const totalHours = totalSeconds / 3600;
            const progressFraction = (curr.progress || 0) / 100;
            return acc + (totalHours * progressFraction);
        }, 0).toFixed(1);
    };

    const calculateLessonsCompleted = () => {
        return enrollments.reduce((acc, curr) => {
            const curriculum = curr.curriculum || [];
            const completedCount = Math.floor((curr.progress / 100) * curriculum.length);
            return acc + completedCount;
        }, 0);
    };

    const actualHoursLearned = calculateActualHours();
    const lessonCompletionCount = calculateLessonsCompleted();
    const WEEKLY_GOAL_TARGET = 10;
    const weeklyGoalPercent = Math.min(100, Math.round((lessonCompletionCount / WEEKLY_GOAL_TARGET) * 100));

    const menuItems = [
        { id: "learning", name: "My Learning", icon: <Icons.Book /> },
        { id: "instructor", name: "View Celebrities", icon: <Icons.Star /> },
        { id: "tasks", name: "Tasks", icon: <Icons.ClipboardList /> },
        { id: "certificates", name: "Certificates", icon: <Icons.Award /> },
        { id: "queries", name: "Queries", icon: <Icons.ChatBubble /> },
        { id: "profile", name: "Profile", icon: <Icons.User /> },
        { id: "notifications", name: "Updates", icon: <Icons.Bell /> },
        { id: "settings", name: "Settings", icon: <Icons.Settings /> },
    ];

    return (
        <div className="student-dashboard-root">
            <aside className="student-sidebar">
                <div className="student-sidebar-header">
                    <div className="student-avatar-big">{user.fullName?.charAt(0)}</div>
                    <div className="student-meta">
                        <h4>{user.fullName}</h4>
                        <span>Student</span>
                    </div>
                </div>

                <div className={`instructor-sidebar-badge ${selectedInstructor ? 'has-instructor' : 'no-instructor'}`}>
                    {selectedInstructor ? (
                        <>
                            <img 
                                src={normalizeUrl(selectedInstructor.image)} 
                                alt={selectedInstructor.name} 
                                className="dashboard-instructor-badge-img"
                                onError={(e) => e.target.src = "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=32"}
                            />
                            <div className="dashboard-instructor-badge-meta">
                                <span className="dashboard-instructor-badge-label">Taught By</span>
                                <span className="dashboard-instructor-badge-name">{selectedInstructor.name}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="dashboard-instructor-badge-placeholder">
                                🎓
                            </div>
                            <div className="dashboard-instructor-badge-meta">
                                <span className="dashboard-instructor-badge-label-empty">Taught By</span>
                                <span className="dashboard-instructor-badge-name-empty">No Celebrity Selected</span>
                            </div>
                        </>
                    )}
                </div>

                <nav className="student-nav">
                    {menuItems.map(item => (
                        <button
                            key={item.id}
                            className={`student-nav-btn ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </button>
                    ))}
                </nav>

                <div className="student-sidebar-footer">
                    <button className="student-logout-btn" onClick={() => { logout(); navigate("/login"); }}>
                        <Icons.LogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="student-main-content">
                <header className="student-header">
                    <h2>{menuItems.find(m => m.id === activeTab)?.name}</h2>
                </header>

                <div className="student-tab-viewport">
                    <AnimatePresence mode="wait">
                        {activeTab === 'learning' && (
                            <motion.div
                                key="learning"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="tab-pane"
                            >
                                <div className="stats-strip">
                                    <div className="strip-card">
                                        <p>Time Spent</p>
                                        <h3>{actualHoursLearned}h</h3>
                                        <span>Course hours completed</span>
                                    </div>
                                    <div className="strip-card">
                                        <p>Weekly Goal ({WEEKLY_GOAL_TARGET} Lessons)</p>
                                        <h3>{weeklyGoalPercent}%</h3>
                                        <div className="mini-progress"><div style={{ width: `${weeklyGoalPercent}%` }}></div></div>
                                        <span className="goal-status-hint">{lessonCompletionCount}/{WEEKLY_GOAL_TARGET} lessons done this week</span>
                                    </div>
                                    <div className="strip-card">
                                        <p>XP Earned</p>
                                        <h3>{lessonCompletionCount * 50}</h3>
                                        <span>Based on completion</span>
                                    </div>
                                </div>

                                <h3 className="pane-subtitle">Continue Where You Left Off</h3>
                                 <div className={`dash-course-grid ${inProgressCourses.length === 0 ? 'empty' : ''}`}>
                                     {inProgressCourses.length === 0 ? (
                                         <div className="premium-empty-state dashboard-margin">
                                             <div className="empty-icon">📖</div>
                                             <h3>No Active Courses</h3>
                                             <p>Ready to start something new? Enroll in an AI-powered course and build elite professional skills.</p>
                                             <Link to="/courses" className="empty-action-btn dashboard-empty-action-btn">Explore Courses</Link>
                                         </div>
                                     ) : (
                                        inProgressCourses.map(e => (
                                            <div key={e.id} className="dash-course-card">
                                                <img src={normalizeUrl(e.course_image)} alt={e.course_title} />
                                                <div className="d-card-content">
                                                    <h4>{e.course_title}</h4>
                                                    <div className="d-card-progress">
                                                        <div className="d-bar"><div style={{ width: `${e.progress}%` }}></div></div>
                                                        <span>{e.progress}%</span>
                                                    </div>
                                                    <Link to={`/course/${e.course_id}/player`} className="dash-resume-btn">Resume</Link>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'tasks' && (
                            <motion.div
                                key="tasks"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="tab-pane"
                            >
                                <div className="certificates-wall tasks-wall">
                                    {tasks.length === 0 ? (
                                        <div className="pane-empty">
                                            <Icons.ClipboardList />
                                            <p>You have no assigned tasks right now.</p>
                                        </div>
                                    ) : (
                                        tasks.map(task => (
                                            <div key={task.id} className="dashboard-task-card">
                                                <div className="dashboard-task-card-header">
                                                    <div>
                                                        <h4 className="dashboard-task-title">{task.title}</h4>
                                                        <p className="dashboard-task-desc">{task.description}</p>
                                                    </div>
                                                    {(() => {
                                                        const isLate = task.due_date && task.submitted_at && new Date(task.submitted_at) > new Date(task.due_date);
                                                        return (
                                                            <span className={`dashboard-task-status ${task.status === 'completed' ? `completed ${isLate ? 'late' : ''}` : task.status === 'in_progress' ? 'in-progress' : 'pending'}`}>
                                                                {task.status === 'completed' && isLate ? 'COMPLETED (LATE)' : task.status.replace('_', ' ').toUpperCase()}
                                                            </span>
                                                        );
                                                    })()}
                                                </div>

                                                <div className="dashboard-task-card-meta">
                                                    {task.due_date && <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>}
                                                    <span>Assigned: {new Date(task.created_at).toLocaleDateString()}</span>
                                                    {task.submitted_at && (
                                                        <span className={`dashboard-task-submitted-meta ${task.due_date && new Date(task.submitted_at) > new Date(task.due_date) ? 'late' : ''}`}>
                                                            Submitted: {new Date(task.submitted_at).toLocaleString()} {(task.due_date && new Date(task.submitted_at) > new Date(task.due_date)) && '(LATE)'}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="dashboard-task-card-actions">
                                                    {task.status === 'pending' && (
                                                        <button
                                                            onClick={() => handleTaskAction(task.id, 'in_progress')}
                                                            className="dashboard-btn-start-task"
                                                        >
                                                            Start Task
                                                        </button>
                                                    )}

                                                    {task.status === 'in_progress' && (
                                                        <form onSubmit={(e) => {
                                                            e.preventDefault();
                                                            const link = e.target.elements.link.value;
                                                            if (link) handleTaskAction(task.id, 'completed', link);
                                                        }} className="dashboard-task-submit-form">
                                                            <input
                                                                type="text"
                                                                name="link"
                                                                required
                                                                placeholder="Enter link to Google Doc, GitHub, Zip file, etc..."
                                                                className="dashboard-task-input"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="dashboard-btn-submit-task"
                                                            >
                                                                Submit Task
                                                            </button>
                                                        </form>
                                                    )}

                                                    {task.status === 'completed' && task.submission_link && editingTaskId !== task.id && (
                                                        <div>
                                                            <div className="dashboard-task-submission-row">
                                                                <div>
                                                                    <p className="dashboard-task-submission-label">Your Submission:</p>
                                                                    <a href={task.submission_link} target="_blank" rel="noreferrer" className="dashboard-task-submission-link">
                                                                        {task.submission_link}
                                                                    </a>
                                                                </div>
                                                                <button
                                                                    onClick={() => setEditingTaskId(task.id)}
                                                                    className="dashboard-btn-edit-submission"
                                                                >
                                                                    ✏️ Edit Link
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {task.status === 'completed' && editingTaskId === task.id && (
                                                        <form onSubmit={(e) => {
                                                            e.preventDefault();
                                                            const link = e.target.elements.link.value;
                                                            if (link) handleTaskAction(task.id, 'completed', link);
                                                        }} className="dashboard-task-edit-form">
                                                            <p className="dashboard-task-submission-label">Edit Your Submission:</p>
                                                            <div className="dashboard-task-edit-row">
                                                                <input
                                                                    type="text"
                                                                    name="link"
                                                                    required
                                                                    defaultValue={task.submission_link}
                                                                    placeholder="Enter link to Google Doc, GitHub, Zip file, etc..."
                                                                    className="dashboard-task-input"
                                                                />
                                                                <button
                                                                    type="submit"
                                                                    className="dashboard-btn-submit-task"
                                                                >
                                                                    Save
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setEditingTaskId(null)}
                                                                    className="dashboard-btn-cancel-task"
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </form>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'certificates' && (
                            <motion.div
                                key="certificates"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="tab-pane"
                            >
                                <div className="certificates-wall">
                                    {completedCourses.length === 0 ? (
                                        <div className="premium-empty-state dashboard-margin">
                                            <div className="empty-icon">🏅</div>
                                            <h3>No Certificates Earned Yet</h3>
                                            <p>Complete courses to unlock official certificates!</p>
                                        </div>
                                    ) : (
                                        completedCourses.map(e => (
                                            <div key={e.id} className="dash-cert-card">
                                                <div className="cert-badge-icon">🏅</div>
                                                <div className="cert-meta">
                                                    <h4>{e.course_title}</h4>
                                                    <p>Issued on {new Date(e.enrolled_at).toLocaleDateString()}</p>
                                                </div>
                                                <a href={`/certificate/${e.id}`} target="_blank" rel="noreferrer" className="cert-dl-btn">View & Download</a>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="tab-pane"
                            >
                                <div className="profile-edit-pane">
                                    <div className="pane-header-actions">
                                        <h4>Personal Information</h4>
                                        {!isEditingProfile ? (
                                            <button className="edit-profile-trigger" onClick={() => setIsEditingProfile(true)}>
                                                <Icons.Edit /> Edit Profile
                                            </button>
                                        ) : (
                                            <button className="save-profile-btn" onClick={handleProfileUpdate} disabled={savingProfile}>
                                                <Icons.Check /> {savingProfile ? "Saving..." : "Save Changes"}
                                            </button>
                                        )}
                                    </div>

                                    <form onSubmit={handleProfileUpdate}>
                                        <div className="p-field">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                value={profileData.fullName}
                                                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                                readOnly={!isEditingProfile}
                                                className={isEditingProfile ? "editing" : ""}
                                            />
                                        </div>
                                        <div className="p-field">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                readOnly={!isEditingProfile}
                                                className={isEditingProfile ? "editing" : ""}
                                            />
                                        </div>
                                    </form>

                                    {user?.provider && (
                                        <div className="dashboard-provider-badge">
                                            {user.provider === "google" ? (
                                                <>
                                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                                    </svg>
                                                    <span className="dashboard-provider-text">Signed in via Google</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="dashboard-provider-svg-github">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                                    </svg>
                                                    <span className="dashboard-provider-text">Signed in via GitHub</span>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    <div className="profile-security-premium">
                                        <div className="dashboard-security-row">
                                            <div className="dashboard-security-text-col">
                                                <h4 className="dashboard-security-title">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                                    Account Security
                                                </h4>
                                                <p className="dashboard-security-subtitle">Update your password regularly to keep your account safe.</p>
                                            </div>
                                            <Link to="/forgot-password">
                                                <button className="dashboard-security-btn">
                                                    Change Password <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'notifications' && (
                            <motion.div
                                key="notifications"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="tab-pane"
                            >
                                <div className="notif-list-dash">
                                    <div className="notif-item-dash">
                                        <div className="n-dot"></div>
                                        <div className="n-text">
                                            <p>You have successfully enrolled in "Introduction to Artificial Intelligence".</p>
                                            <span>2 hours ago</span>
                                        </div>
                                    </div>
                                    <div className="notif-item-dash">
                                        <div className="n-dot"></div>
                                        <div className="n-text">
                                            <p>Welcome to UptoSkills AI Learn! Explore our new AI-powered courses.</p>
                                            <span>1 day ago</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="tab-pane"
                            >
                                <div className="settings-pane">
                                    <div className="setting-row">
                                        <div>
                                            <h4>Reduce Motion & Animations</h4>
                                            <p>Disable page transitions, dropdown scaling, and structural animations.</p>
                                        </div>
                                        <button
                                            className={`toggle-btn-p ${settings.reduceMotion ? 'on' : 'off'}`}
                                            onClick={() => {
                                                const nextVal = !settings.reduceMotion;
                                                localStorage.setItem("reduceMotion", String(nextVal));
                                                if (nextVal) {
                                                    document.body.classList.add("reduce-motion");
                                                } else {
                                                    document.body.classList.remove("reduce-motion");
                                                }
                                                setSettings({ ...settings, reduceMotion: nextVal });
                                            }}
                                        >
                                            <div className="toggle-slider"></div>
                                            <span>{settings.reduceMotion ? 'ON' : 'OFF'}</span>
                                        </button>
                                    </div>
                                    <div className="setting-row">
                                        <div>
                                            <h4>Email Notifications</h4>
                                            <p>Receive updates about new courses and achievements.</p>
                                        </div>
                                        <button
                                            className={`toggle-btn-p ${settings.emailNotif ? 'on' : 'off'}`}
                                            onClick={() => setSettings({ ...settings, emailNotif: !settings.emailNotif })}
                                        >
                                            <div className="toggle-slider"></div>
                                            <span>{settings.emailNotif ? 'ON' : 'OFF'}</span>
                                        </button>
                                    </div>
                                    <div className="setting-row">
                                        <div>
                                            <h4>Public Profile</h4>
                                            <p>Allow others to see your certificates and achievements.</p>
                                        </div>
                                        <button
                                            className={`toggle-btn-p ${settings.publicProfile ? 'on' : 'off'}`}
                                            onClick={() => setSettings({ ...settings, publicProfile: !settings.publicProfile })}
                                        >
                                            <div className="toggle-slider"></div>
                                            <span>{settings.publicProfile ? 'ON' : 'OFF'}</span>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'queries' && (
                            <motion.div
                                key="queries"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="tab-pane"
                            >
                                <div className="queries-pane dashboard-queries">
                                    <div className="dashboard-queries-header">
                                        <h3 className="dashboard-queries-title">My Submitted Queries</h3>
                                        <Link to="/contact" className="dashboard-queries-submit-btn">
                                            + Submit New Query
                                        </Link>
                                    </div>

                                    {queries.length === 0 ? (
                                        <div className="premium-empty-state dashboard-margin">
                                            <div className="empty-icon">💬</div>
                                            <h3>No Queries Yet</h3>
                                            <p>Need support or have a general question? Contact us directly and track the replies right here.</p>
                                            <Link to="/contact" className="empty-action-btn">Ask a Question</Link>
                                        </div>
                                    ) : (
                                        queries.map(query => (
                                            <div key={query.id} className="dashboard-query-card">
                                                <div className="dashboard-query-card-header">
                                                    <div>
                                                        <span className="dashboard-query-subject-label">Subject</span>
                                                        <h4 className="dashboard-query-subject-val">{query.subject}</h4>
                                                        <p className="dashboard-query-message">{query.message}</p>
                                                    </div>
                                                    <div className="dashboard-query-actions-col">
                                                        <span className={`dashboard-query-status ${query.reply ? 'replied' : 'pending'}`}>
                                                            {query.reply ? 'REPLIED' : 'PENDING'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {query.reply && (
                                                    <div className="dashboard-query-response">
                                                        <span className="dashboard-query-response-label">Admin Response</span>
                                                        <p className="dashboard-query-response-text">{query.reply}</p>
                                                        {query.replied_at && <span className="dashboard-query-response-time">Replied at: {new Date(query.replied_at).toLocaleString()}</span>}
                                                    </div>
                                                )}

                                                <div className="dashboard-query-footer">
                                                    <span>Submitted on: {new Date(query.created_at).toLocaleString()}</span>
                                                    <div className="dashboard-query-footer-actions">
                                                        <button
                                                            onClick={() => {
                                                                setEditingQuery(query);
                                                                setEditSubject(query.subject);
                                                                setEditMessage(query.message);
                                                            }}
                                                            className="dashboard-query-btn-edit"
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setConfirmDeleteQueryId(query.id)}
                                                            className="dashboard-query-btn-delete"
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}

                                    {editingQuery && (
                                        <div className="dashboard-modal-backdrop" onClick={() => setEditingQuery(null)}>
                                            <div className="dashboard-modal-content" onClick={e => e.stopPropagation()}>
                                                <h3 className="dashboard-modal-title">Edit Query</h3>
                                                <form onSubmit={handleEditQuery} className="dashboard-modal-form">
                                                    <div className="form-group-modern dashboard-group">
                                                        <label className="dashboard-modal-label">Subject</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={editSubject}
                                                            onChange={e => setEditSubject(e.target.value)}
                                                            className="dashboard-modal-input"
                                                        />
                                                    </div>
                                                    <div className="form-group-modern dashboard-group">
                                                        <label className="dashboard-modal-label">Message</label>
                                                        <textarea
                                                            required
                                                            rows="5"
                                                            value={editMessage}
                                                            onChange={e => setEditMessage(e.target.value)}
                                                            className="dashboard-modal-textarea"
                                                        ></textarea>
                                                    </div>
                                                    <div className="dashboard-modal-actions">
                                                        <button type="submit" className="btn-primary-large dashboard-btn-modal-submit">Save Changes</button>
                                                        <button type="button" onClick={() => setEditingQuery(null)} className="dashboard-btn-modal-cancel">Cancel</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    )}

                                    {confirmDeleteQueryId && (
                                        <div className="dashboard-modal-backdrop" onClick={() => setConfirmDeleteQueryId(null)}>
                                            <div className="dashboard-modal-content confirm-delete" onClick={e => e.stopPropagation()}>
                                                <div className="dashboard-confirm-delete-icon">⚠️</div>
                                                <h3 className="dashboard-confirm-delete-title">Are you sure?</h3>
                                                <p className="dashboard-confirm-delete-desc">
                                                    Do you really want to delete this query? This action cannot be undone.
                                                </p>
                                                <div className="dashboard-confirm-delete-actions">
                                                    <button
                                                        onClick={() => handleDeleteQuery(confirmDeleteQueryId)}
                                                        className="dashboard-btn-delete-confirm"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setConfirmDeleteQueryId(null)}
                                                        className="dashboard-btn-modal-cancel"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'instructor' && (
                            <motion.div
                                key="instructor"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="tab-pane"
                            >
                                <div className="celebrity-picker-header">
                                    <h3 className="dashboard-celebrity-picker-title">Meet Our Celebrity Instructors</h3>
                                    <p className="dashboard-celebrity-picker-desc">Explore our roster of pop sensations and industry icons. Select your preferred mentor for any course directly inside the Course Player!</p>
                                </div>

                                <div className="celebrity-grid">
                                    {instructors.map((inst) => {
                                        return (
                                            <motion.div
                                                key={inst.id}
                                                whileHover={{ y: -6, scale: 1.02 }}
                                                className="dashboard-celebrity-card unselected"
                                            >
                                                <div className="dashboard-celebrity-card-img-wrapper">
                                                    <img
                                                        src={normalizeUrl(inst.image)}
                                                        alt={inst.name}
                                                        className="dashboard-celebrity-card-img unselected"
                                                        onError={(e) => e.target.src = "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168?w=100"}
                                                    />
                                                </div>
                                                <h4 className="dashboard-celebrity-card-name">{inst.name}</h4>
                                                <p className="dashboard-celebrity-card-bio">{inst.bio}</p>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;