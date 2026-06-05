import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EnhancedTable, { highlightText } from "../../components/EnhancedTable";
import ConfirmationModal from "../../components/ConfirmationModal";
import "../../styles/AdminStudents.css";
import "../../styles/EnhancedTable.css";
import "../../styles/AdminEnrollments.css";

const AdminEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [activeTab, setActiveTab] = useState("active");
    const [editingEnrollment, setEditingEnrollment] = useState(null);
    const [enrollmentForm, setEnrollmentForm] = useState({ progress: 0, completed: false });

    const [archivedIds, setArchivedIds] = useState(() => {
        const saved = localStorage.getItem("archived_enrollments");
        return saved ? JSON.parse(saved) : [];
    });

    const [viewingEnrollment, setViewingEnrollment] = useState(null);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: "", message: "", onConfirm: () => {} });

    useEffect(() => {
        fetchEnrollments();
    }, []);

    const fetchEnrollments = async () => {
        setLoadingData(true);
        setErrorData(false);
        try {
            const res = await axios.get("http://localhost:5000/api/admin/enrollments");
            setEnrollments(res.data);
            const archivedList = res.data.filter(e => e.archived).map(e => e.id);
            setArchivedIds(archivedList);
            localStorage.setItem("archived_enrollments", JSON.stringify(archivedList));
        } catch (err) {
            console.error("Error fetching enrollments:", err);
            setErrorData(true);
        } finally {
            setLoadingData(false);
        }
    };

    const triggerConfirm = (title, message, callback) => {
        setConfirmConfig({
            isOpen: true,
            title,
            message,
            onConfirm: () => {
                callback();
                setConfirmConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleDelete = (id) => {
        triggerConfirm(
            "Remove Enrollment",
            "Are you sure you want to remove this enrollment?",
            async () => {
                try {
                    await axios.delete(`http://localhost:5000/api/admin/enrollments/${id}`);
                    setEnrollments(enrollments.filter(e => e.id !== id));
                    toast.success("Enrollment removed successfully!");
                } catch (err) {
                    toast.error("Failed to delete enrollment.");
                }
            }
        );
    };

    const handleArchiveEnrollment = async (id, name) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/enrollments/${id}/archive`);
            setEnrollments(enrollments.map(e => e.id === id ? { ...e, archived: true } : e));
            const updated = [...archivedIds.filter(x => x !== id), id];
            setArchivedIds(updated);
            localStorage.setItem("archived_enrollments", JSON.stringify(updated));
            toast.success(`Enrollment for "${name}" archived successfully (restricted course access).`);
        } catch (err) {
            toast.error("Failed to archive enrollment.");
        }
    };

    const handleUnarchiveEnrollment = async (id, name) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/enrollments/${id}/unarchive`);
            setEnrollments(enrollments.map(e => e.id === id ? { ...e, archived: false } : e));
            const updated = archivedIds.filter(archId => archId !== id);
            setArchivedIds(updated);
            localStorage.setItem("archived_enrollments", JSON.stringify(updated));
            toast.success(`Enrollment for "${name}" unarchived successfully (restored course access).`);
        } catch (err) {
            toast.error("Failed to unarchive enrollment.");
        }
    };

    const visibleEnrollments = enrollments.filter(e => 
        activeTab === "active" ? !archivedIds.includes(e.id) : archivedIds.includes(e.id)
    );

    const columns = [
        {
            key: "user_name",
            label: "Student",
            sortable: true,
            searchable: true,
            renderCell: (row, search) => (
                <div className="table-user-info admin-enrollments-table-user-info">
                    <div className="user-avatar-small admin-enrollments-user-avatar-small">
                        {row.user_name?.charAt(0)}
                    </div>
                    <div>
                        <p className="admin-enrollments-user-name">{highlightText(row.user_name, search)}</p>
                        <p className="admin-enrollments-user-email">{highlightText(row.user_email, search)}</p>
                    </div>
                </div>
            )
        },
        {
            key: "course_title",
            label: "Course",
            sortable: true,
            searchable: true,
            filterable: true,
            renderCell: (row, search) => (
                <span className="admin-enrollments-text-muted">{highlightText(row.course_title, search)}</span>
            )
        },
        {
            key: "enrolled_at",
            label: "Enrolled Date",
            sortable: true,
            renderCell: (row) => (
                <span className="admin-enrollments-text-muted">{new Date(row.enrolled_at).toLocaleDateString()}</span>
            )
        },
        {
            key: "progress",
            label: "Progress",
            sortable: true,
            renderCell: (row) => (
                <div className="progress-mini-wrapper admin-enrollments-progress-mini-wrapper">
                    <div className="progress-mini-bg admin-enrollments-progress-mini-bg">
                        <div className="progress-mini-fill admin-enrollments-progress-mini-fill-static" style={{ width: `${row.progress}%` }}></div>
                    </div>
                    <span className="admin-enrollments-progress-mini-text">{row.progress}%</span>
                </div>
            )
        },
        {
            key: "completed",
            label: "Status",
            sortable: true,
            filterable: true,
            renderCell: (row) => (
                <span className={`status-badge ${row.completed ? 'active' : ''} admin-enrollments-badge-inline`}>
                    {row.completed ? 'Completed' : 'In Progress'}
                </span>
            )
        }
    ];

    const handleRowAction = (action, row) => {
        if (action === "view") {
            setViewingEnrollment(row);
        } else if (action === "edit") {
            setEditingEnrollment(row);
            setEnrollmentForm({ progress: row.progress || 0, completed: !!row.completed });
        } else if (action === "delete") {
            handleDelete(row.id);
        } else if (action === "archive") {
            handleArchiveEnrollment(row.id, row.user_name);
        } else if (action === "unarchive") {
            handleUnarchiveEnrollment(row.id, row.user_name);
        }
    };

    const handleBulkAction = async (action, selectedIds) => {
        if (action === "delete") {
            triggerConfirm(
                "Remove Selected Enrollments",
                `Are you sure you want to remove the ${selectedIds.length} selected student enrollments?`,
                async () => {
                    try {
                        await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:5000/api/admin/enrollments/${id}`)));
                        setEnrollments(enrollments.filter(e => !selectedIds.includes(e.id)));
                        toast.success(`Successfully removed ${selectedIds.length} student enrollments.`);
                    } catch (err) {
                        toast.error("Failed to delete some enrollments.");
                    }
                }
            );
        } else if (action === "archive") {
            try {
                await Promise.all(selectedIds.map(id => axios.put(`http://localhost:5000/api/admin/enrollments/${id}/archive`)));
                setEnrollments(enrollments.map(e => selectedIds.includes(e.id) ? { ...e, archived: true } : e));
                const updated = [...new Set([...archivedIds, ...selectedIds])];
                setArchivedIds(updated);
                localStorage.setItem("archived_enrollments", JSON.stringify(updated));
                toast.success(`Successfully archived ${selectedIds.length} student enrollments.`);
            } catch (err) {
                toast.error("Failed to bulk archive enrollments.");
            }
        } else if (action === "unarchive") {
            try {
                await Promise.all(selectedIds.map(id => axios.put(`http://localhost:5000/api/admin/enrollments/${id}/unarchive`)));
                setEnrollments(enrollments.map(e => selectedIds.includes(e.id) ? { ...e, archived: false } : e));
                const updated = archivedIds.filter(id => !selectedIds.includes(id));
                setArchivedIds(updated);
                localStorage.setItem("archived_enrollments", JSON.stringify(updated));
                toast.success(`Successfully unarchived ${selectedIds.length} enrollments.`);
            } catch (err) {
                toast.error("Failed to bulk unarchive enrollments.");
            }
        }
    };

    return (
        <div className="admin-enrollments-page">
            <header className="page-header">
                <div className="header-text">
                    <h2>Enrollment Management</h2>
                    <p>Track and manage student course admissions.</p>
                </div>
            </header>

            <div className="table-tabs-container admin-enrollments-tabs-container">
                <button 
                    onClick={() => setActiveTab("active")}
                    className="admin-enrollments-tab-btn-static"
                    style={{
                        color: activeTab === "active" ? "white" : "#94a3b8"
                    }}
                >
                    Active ({enrollments.filter(e => !archivedIds.includes(e.id)).length})
                    {activeTab === "active" && (
                        <motion.div
                            layoutId="activeTabPill_enrollments"
                            className="admin-enrollments-tab-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab("archived")}
                    className="admin-enrollments-tab-btn-static"
                    style={{
                        color: activeTab === "archived" ? "white" : "#94a3b8"
                    }}
                >
                    Archived ({enrollments.filter(e => archivedIds.includes(e.id)).length})
                    {activeTab === "archived" && (
                        <motion.div
                            layoutId="activeTabPill_enrollments"
                            className="admin-enrollments-tab-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </button>
            </div>

            {errorData ? (
                <div className="premium-error-state">
                    <div className="error-icon-box">⚠️</div>
                    <h3>Unable to Load Enrollments</h3>
                    <p>We encountered an error while connecting to the enrollment service. Please try again.</p>
                    <div className="error-actions">
                        <button className="error-retry-btn" onClick={fetchEnrollments}>Retry</button>
                        <a href="mailto:support@uptoskills.com" className="error-support-link">Contact Support</a>
                    </div>
                </div>
            ) : enrollments.length === 0 && !loadingData ? (
                <div className="premium-empty-state">
                    <div className="empty-icon">🎓</div>
                    <h3>No Enrollments Yet</h3>
                    <p>No students have registered for classes yet. Enrollments will populate automatically upon student registrations.</p>
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                        <EnhancedTable
                            data={visibleEnrollments}
                            columns={columns}
                            searchPlaceholder="Search by student or course..."
                            onRowAction={handleRowAction}
                            onBulkAction={handleBulkAction}
                            defaultSortKey="user_name"
                            defaultSortDir="asc"
                            isArchivedMode={activeTab === "archived"}
                            loading={loadingData}
                        />
                    </motion.div>
                </AnimatePresence>
            )}

            <AnimatePresence>
                {viewingEnrollment && (
                    <motion.div
                        key="enrollment-details-modal"
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setViewingEnrollment(null)}
                    >
                        <motion.div
                            className="modal-content admin-enrollments-modal-content-lg"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="admin-enrollments-modal-header">
                                <h3 className="admin-enrollments-modal-title">Enrollment Details</h3>
                                <button 
                                    className="close-modal-btn" 
                                    onClick={() => setViewingEnrollment(null)}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="admin-enrollments-modal-body-flex">
                                <div className="admin-enrollments-student-card">
                                    <div className="admin-enrollments-student-avatar">
                                        {viewingEnrollment?.user_name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="admin-enrollments-student-name">{viewingEnrollment?.user_name}</h4>
                                        <p className="admin-enrollments-student-email">{viewingEnrollment?.user_email}</p>
                                    </div>
                                </div>

                                <hr className="admin-enrollments-modal-hr" />

                                <div className="form-group">
                                    <label>Enrolled Course</label>
                                    <p className="admin-enrollments-course-title">{viewingEnrollment?.course_title}</p>
                                </div>

                                <div className="form-group">
                                    <label>Enrollment Date</label>
                                    <p className="admin-enrollments-admission-date">
                                        {viewingEnrollment?.enrolled_at ? new Date(viewingEnrollment.enrolled_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            hour: "2-digit"
                                        }) : ""}
                                    </p>
                                </div>

                                <div className="form-group">
                                    <label>Progress</label>
                                    <div className="admin-enrollments-progress-bar-container">
                                        <div className="admin-enrollments-progress-bar-bg">
                                            <div className="admin-enrollments-progress-bar-fill-static" style={{ width: `${viewingEnrollment?.progress}%` }}></div>
                                        </div>
                                        <span className="admin-enrollments-progress-bar-text">
                                            {viewingEnrollment?.progress}%
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Status</label>
                                    <p className="admin-enrollments-margin-zero">
                                        <span className={`status-badge ${viewingEnrollment?.completed ? 'active' : ''}`}>
                                            {viewingEnrollment?.completed ? 'Completed' : 'In Progress'}
                                        </span>
                                    </p>
                                </div>
                            </div>


                        </motion.div>
                    </motion.div>
                )}

                {editingEnrollment && (
                    <motion.div
                        key="enrollment-edit-modal"
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setEditingEnrollment(null)}
                    >
                        <motion.div
                            className="modal-content admin-enrollments-modal-content-sm"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="admin-enrollments-modal-header">
                                <h3 className="admin-enrollments-modal-title">Edit Enrollment Progress</h3>
                                <button 
                                    className="close-modal-btn" 
                                    onClick={() => setEditingEnrollment(null)}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    const res = await axios.put(`http://localhost:5000/api/admin/enrollments/${editingEnrollment.id}`, {
                                        progress: enrollmentForm.progress,
                                        completed: enrollmentForm.completed
                                    });
                                    setEnrollments(enrollments.map(item => item.id === editingEnrollment.id ? { 
                                        ...item, 
                                        progress: res.data.progress, 
                                        completed: res.data.completed 
                                    } : item));
                                    setEditingEnrollment(null);
                                    toast.success("Progress updated successfully!");
                                } catch (err) {
                                    toast.error("Failed to update progress.");
                                }
                            }}>
                                <div className="admin-enrollments-modal-body-flex">
                                    <div>
                                        <label className="admin-enrollments-label-small">Student</label>
                                        <p className="admin-enrollments-student-name-bold">{editingEnrollment.user_name}</p>
                                        <p className="admin-enrollments-student-email-muted">{editingEnrollment.user_email}</p>
                                    </div>
                                    <div>
                                        <label className="admin-enrollments-label-small">Course</label>
                                        <p className="admin-enrollments-course-title-semi">{editingEnrollment.course_title}</p>
                                    </div>

                                    <div className="form-group">
                                        <label>Progress (%)</label>
                                        <div className="admin-enrollments-input-range-container">
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={enrollmentForm.progress}
                                                onChange={e => {
                                                    const val = parseInt(e.target.value, 10);
                                                    setEnrollmentForm({ 
                                                        progress: val, 
                                                        completed: val === 100 ? true : enrollmentForm.completed 
                                                    });
                                                }}
                                                className="admin-enrollments-input-range"
                                            />
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                value={enrollmentForm.progress}
                                                onChange={e => {
                                                    const val = Math.min(100, Math.max(0, parseInt(e.target.value, 10) || 0));
                                                    setEnrollmentForm({ 
                                                        progress: val, 
                                                        completed: val === 100 ? true : enrollmentForm.completed 
                                                    });
                                                }}
                                                className="admin-enrollments-input-number"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group admin-enrollments-checkbox-container">
                                        <label className="table-custom-checkbox admin-enrollments-checkbox-label">
                                            <input
                                                type="checkbox"
                                                checked={enrollmentForm.completed}
                                                onChange={e => setEnrollmentForm({ 
                                                    ...enrollmentForm, 
                                                    completed: e.target.checked,
                                                    progress: e.target.checked ? 100 : (enrollmentForm.progress === 100 ? 99 : enrollmentForm.progress)
                                                })}
                                            />
                                            <span className="checkmark admin-enrollments-checkbox-checkmark"></span>
                                        </label>
                                        <span className="admin-enrollments-checkbox-text">Mark Course as Completed</span>
                                    </div>
                                </div>

                                <div className="modal-actions admin-enrollments-actions-margin">
                                    <button type="submit" className="add-btn admin-enrollments-width-full">Save Changes</button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <ConfirmationModal
                isOpen={confirmConfig.isOpen}
                title={confirmConfig.title}
                message={confirmConfig.message}
                onConfirm={confirmConfig.onConfirm}
                onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    );
};

export default AdminEnrollments;
