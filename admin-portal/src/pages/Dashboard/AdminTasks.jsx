import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Edit2, Search, X, CheckCircle, Clock, AlertCircle } from "lucide-react";
import "../../styles/AdminStudents.css";
import "../../styles/AdminTasks.css";
import ConfirmationModal from "../../components/ConfirmationModal";

const AdminTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        assigned_to: "",
        due_date: "",
        status: "pending"
    });

    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    const loadInitialData = async () => {
        setLoadingData(true);
        setErrorData(false);
        try {
            await Promise.all([fetchTasks(), fetchUsers()]);
        } catch (err) {
            console.error("Error loading task data:", err);
            setErrorData(true);
        } finally {
            setLoadingData(false);
        }
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/tasks");
            setTasks(res.data);
        } catch (err) {
            console.error("Error fetching tasks:", err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/admin/users");
            setUsers(res.data.filter(u => u.role !== 'admin'));
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    const handleOpenModal = (task = null) => {
        if (task) {
            setCurrentTask(task);
            setFormData({
                title: task.title,
                description: task.description || "",
                assigned_to: task.assigned_to || "",
                due_date: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : "",
                status: task.status || "pending"
            });
        } else {
            setCurrentTask(null);
            setFormData({
                title: "",
                description: "",
                assigned_to: "",
                due_date: "",
                status: "pending"
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentTask(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { ...formData };
            if (!payload.assigned_to) payload.assigned_to = null;

            if (currentTask) {
                await axios.put(`http://localhost:5000/api/admin/tasks/${currentTask.id}`, payload);
                toast.success("Task updated successfully!");
            } else {
                await axios.post("http://localhost:5000/api/admin/tasks", payload);
                toast.success("Task created successfully!");
            }
            fetchTasks();
            closeModal();
        } catch (err) {
            console.error("Error saving task:", err);
            toast.error("Error saving task.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        setTaskToDelete(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        setIsConfirmOpen(false);
        if (!taskToDelete) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/tasks/${taskToDelete}`);
            toast.success("Task deleted successfully!");
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
            toast.error("Error deleting task.");
        } finally {
            setTaskToDelete(null);
        }
    };

    const getStatusBadge = (status, task) => {
        const isLate = task.due_date && task.submitted_at && new Date(task.submitted_at) > new Date(task.due_date);
        switch (status) {
            case 'completed': 
                return (
                    <div className="admin-tasks-status-col">
                        <span 
                            className="status-badge active admin-tasks-status-badge-flex" 
                            style={{ 
                                background: isLate ? 'rgba(239, 68, 68, 0.1)' : '', 
                                color: isLate ? '#ef4444' : '' 
                            }}
                        >
                            <CheckCircle size={12} /> {isLate ? "Completed (Late)" : "Completed"}
                        </span>
                        {task.submitted_at && (
                            <span 
                                className="admin-tasks-submission-time"
                                style={{ color: isLate ? '#ef4444' : 'var(--color-success)' }}
                            >
                                Sub: {new Date(task.submitted_at).toLocaleString([], {dateStyle: 'short', timeStyle: 'short'})}
                            </span>
                        )}
                    </div>
                );
            case 'in_progress': 
                return (
                    <span className="status-badge admin-tasks-status-badge-progress">
                        <Clock size={12} /> In Progress
                    </span>
                );
            default: 
                return (
                    <span className="status-badge admin-tasks-status-badge-pending">
                        <AlertCircle size={12} /> Pending
                    </span>
                );
        }
    };

    const getProcessedTasks = () => {
        let result = tasks.filter(t =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (t.assigned_to_name && t.assigned_to_name.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (statusFilter !== "all") {
            result = result.filter(t => t.status === statusFilter);
        }

        result.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            }
            if (sortBy === "oldest") {
                return new Date(a.created_at || 0) - new Date(b.created_at || 0);
            }
            if (sortBy === "due_soon") {
                if (!a.due_date) return 1;
                if (!b.due_date) return -1;
                return new Date(a.due_date) - new Date(b.due_date);
            }
            if (sortBy === "due_late") {
                if (!a.due_date) return 1;
                if (!b.due_date) return -1;
                return new Date(b.due_date) - new Date(a.due_date);
            }
            return 0;
        });

        return result;
    };

    const filteredTasks = getProcessedTasks();

    return (
        <div className="admin-students-page">
            <header className="page-header">
                <div className="header-text">
                    <h2>Student Task Assignment</h2>
                    <p>Assign, track, and manage student responsibilities and deadlines.</p>
                </div>
                <button
                    className="admin-tasks-btn-create"
                    onClick={() => handleOpenModal()}
                >
                    <Plus size={18} /> Create Task
                </button>
            </header>

            <div className="table-actions-bar">
                <div className="table-search">
                    <Search size={18} color="#64748b" />
                    <input
                        type="text"
                        placeholder="Search tasks by title or student..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="table-filters-sort-group">
                    <div className="filter-select-wrapper">
                        <select 
                            value={statusFilter} 
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="table-filter-dropdown"
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="sort-select-wrapper">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="table-sort-dropdown"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="due_soon">Due Date (Soon)</option>
                            <option value="due_late">Due Date (Late)</option>
                        </select>
                    </div>
                </div>
            </div>

            {errorData ? (
                <div className="premium-error-state">
                    <div className="error-icon-box">⚠️</div>
                    <h3>Unable to Load Tasks</h3>
                    <p>We encountered an error while connecting to the task management service. Please try again.</p>
                    <div className="error-actions">
                        <button className="error-retry-btn" onClick={loadInitialData}>Retry</button>
                        <a href="mailto:support@uptoskills.com" className="error-support-link">Contact Support</a>
                    </div>
                </div>
            ) : tasks.length === 0 && !loadingData ? (
                <div className="premium-empty-state">
                    <div className="empty-icon">📝</div>
                    <h3>No Tasks Assigned</h3>
                    <p>Need to assign responsibilities? Give responsibilities to students by creating a new student task.</p>
                    <button className="empty-action-btn" onClick={() => handleOpenModal()}>
                        + Create Task
                    </button>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-data-table">
                        <thead>
                            <tr>
                                <th>Task Details</th>
                                <th>Assignee</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingData ? (
                                Array.from({ length: 5 }).map((_, index) => (
                                    <tr key={`task-skel-${index}`} className="skeleton-row">
                                        <td>
                                            <div className="admin-tasks-skel-cell">
                                                <div className="skeleton-bar skeleton-pulse admin-tasks-skel-title" style={{ width: '60%' }} />
                                                <div className="skeleton-bar skeleton-pulse" style={{ width: '85%', height: '12px' }} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="admin-tasks-skel-assignee-row">
                                                <div className="skeleton-checkbox skeleton-pulse admin-tasks-skel-avatar" />
                                                <div className="skeleton-bar skeleton-pulse admin-tasks-skel-height-14" style={{ width: '60px' }} />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="skeleton-bar skeleton-pulse admin-tasks-skel-height-14" style={{ width: '70px' }} />
                                        </td>
                                        <td>
                                            <div className="skeleton-bar skeleton-pulse admin-tasks-skel-status" style={{ width: '80px' }} />
                                        </td>
                                        <td>
                                            <div className="admin-tasks-skel-actions">
                                                <div className="skeleton-checkbox skeleton-pulse admin-tasks-skel-action-btn" />
                                                <div className="skeleton-checkbox skeleton-pulse admin-tasks-skel-action-btn" />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : filteredTasks.length === 0 ? (
                                <tr><td colSpan="5" className="admin-tasks-empty-row">No tasks found. Create one to get started.</td></tr>
                            ) : filteredTasks.map(task => (
                                <tr key={task.id}>
                                    <td>
                                        <div className="admin-tasks-details-cell">
                                            <p className="admin-tasks-item-title">{task.title}</p>
                                            <p className="admin-tasks-item-desc">{task.description || "No description provided."}</p>
                                            {task.submission_link && (
                                                <div className="admin-tasks-item-submission">
                                                    <span className="admin-tasks-item-submission-label">Submission: </span>
                                                    <a href={task.submission_link} target="_blank" rel="noreferrer" className="admin-tasks-item-submission-link">View Link</a>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        {task.assigned_to_name ? (
                                            <div className="table-user-info">
                                                <div className="user-avatar-small">{task.assigned_to_name.charAt(0)}</div>
                                                <div>
                                                    <span className="admin-tasks-assignee-name">{task.assigned_to_name}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="admin-tasks-unassigned">Unassigned</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className="admin-tasks-due-date">
                                            {task.due_date ? new Date(task.due_date).toLocaleDateString() : "No deadline"}
                                        </span>
                                    </td>
                                    <td>{getStatusBadge(task.status, task)}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="action-btn" onClick={() => handleOpenModal(task)} title="Edit Task">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="action-btn suspend" onClick={() => handleDelete(task.id)} title="Delete Task">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="admin-tasks-modal-overlay" onClick={closeModal}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="admin-tasks-modal-card"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="admin-tasks-modal-header">
                                <h3 className="admin-tasks-modal-title">{currentTask ? "Edit Task" : "Create New Task"}</h3>
                                <button className="close-modal-btn" onClick={closeModal}><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="admin-tasks-modal-form">
                                <div>
                                    <label className="admin-tasks-modal-label">Task Title</label>
                                    <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="admin-tasks-modal-input" placeholder="e.g. Develop new UI components" />
                                </div>

                                <div>
                                    <label className="admin-tasks-modal-label">Description</label>
                                    <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="admin-tasks-modal-textarea" placeholder="Provide task details and expectations..." />
                                </div>

                                <div className="admin-tasks-modal-grid-row">
                                    <div>
                                        <label className="admin-tasks-modal-label">Assign To</label>
                                        <select value={formData.assigned_to} onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })} className="admin-tasks-modal-input">
                                            <option value="" className="admin-tasks-modal-option">Unassigned</option>
                                            {users.map(u => (
                                                <option key={u.id} value={u.id} className="admin-tasks-modal-option">{u.full_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="admin-tasks-modal-label">Due Date</label>
                                        <input type="date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} className="admin-tasks-modal-input" />
                                    </div>
                                </div>

                                <div>
                                    <label className="admin-tasks-modal-label">Status</label>
                                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="admin-tasks-modal-input">
                                        <option value="pending" className="admin-tasks-modal-option">Pending</option>
                                        <option value="in_progress" className="admin-tasks-modal-option">In Progress</option>
                                        <option value="completed" className="admin-tasks-modal-option">Completed</option>
                                    </select>
                                </div>

                                <div className="admin-tasks-modal-submit-container">
                                    <button type="submit" disabled={loading} className="admin-tasks-modal-btn-submit">{loading ? "Saving..." : "Save Task"}</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <ConfirmationModal
                isOpen={isConfirmOpen}
                title="Delete Task"
                message="Are you sure you want to delete this task?"
                onConfirm={confirmDelete}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
};

export default AdminTasks;
