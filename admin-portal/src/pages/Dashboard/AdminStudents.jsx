import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Search, Mail, UserMinus, CheckCircle, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import EnhancedTable, { highlightText } from "../../components/EnhancedTable";
import ConfirmationModal from "../../components/ConfirmationModal";
import "../../styles/AdminStudents.css";
import "../../styles/EnhancedTable.css";

const Icons = {
    Search: ({ size = 18, ...props }) => <Search size={size} {...props} />,
    Mail: ({ size = 16, ...props }) => <Mail size={size} {...props} />,
    UserMinus: ({ size = 16, ...props }) => <UserMinus size={size} {...props} />,
    CheckCircle: ({ size = 16, ...props }) => <CheckCircle size={size} {...props} />,
    UserPlus: ({ size = 18, ...props }) => <UserPlus size={size} {...props} />
};

const AdminStudents = () => {
    const location = useLocation();
    const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: "", message: "", onConfirm: () => {} });
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ full_name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);
    const [activeTab, setActiveTab] = useState("active");

    const [archivedIds, setArchivedIds] = useState(() => {
        const saved = localStorage.getItem("archived_students");
        return saved ? JSON.parse(saved) : [];
    });

    const [viewingStudent, setViewingStudent] = useState(null);
    const [studentEnrollments, setStudentEnrollments] = useState([]);
    const [loadingEnrollments, setLoadingEnrollments] = useState(false);

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isEmailTouched = formData.email.length > 0;

    const getPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;
        return strength;
    };

    const passStrength = getPasswordStrength(formData.password);
    const passTouched = formData.password.length > 0;

    useEffect(() => {
        fetchStudents();
        if (location.state?.activeTab) {
            setActiveTab(location.state.activeTab);
            window.history.replaceState({}, document.title);
        }
        if (location.state?.openModal) {
            setEditingStudent(null);
            setFormData({ full_name: '', email: '', password: '' });
            setIsModalOpen(true);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    useEffect(() => {
        if (viewingStudent) {
            setLoadingEnrollments(true);
            axios.get("http://localhost:5000/api/admin/enrollments")
                .then(res => {
                    const filtered = res.data.filter(e => e.user_id === viewingStudent.id || e.user_email === viewingStudent.email);
                    setStudentEnrollments(filtered);
                })
                .catch(err => {
                    console.error("Error fetching student enrollments:", err);
                    setStudentEnrollments([]);
                })
                .finally(() => setLoadingEnrollments(false));
        }
    }, [viewingStudent]);

    const fetchStudents = async () => {
        setLoadingData(true);
        setErrorData(false);
        try {
            const res = await axios.get("http://localhost:5000/api/admin/users");
            const studentsList = res.data.filter(u => u.role === 'student');
            setStudents(studentsList);
            const nonApprovedIds = studentsList.filter(s => !s.approved).map(s => s.id);
            setArchivedIds(nonApprovedIds);
            localStorage.setItem("archived_students", JSON.stringify(nonApprovedIds));
        } catch (err) {
            console.error("Error fetching students:", err);
            setErrorData(true);
            toast.error("Failed to load students list.");
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

    const handleSuspend = (id, name) => {
        triggerConfirm(
            "Delete Student Account",
            `Are you sure you want to delete ${name}'s account? This will permanently remove them from the system.`,
            async () => {
                try {
                    await axios.delete(`http://localhost:5000/api/admin/users/${id}`);
                    setStudents(students.filter(s => s.id !== id));
                    toast.success(`${name}'s account has been deleted.`);
                } catch (err) {
                    toast.error("Error suspending user");
                }
            }
        );
    };

    const handleApprove = (id, name) => {
        triggerConfirm(
            "Approve Student Account",
            `Approve ${name}'s account so they can access the platform?`,
            async () => {
                try {
                    await axios.put(`http://localhost:5000/api/admin/users/${id}/approve`);
                    setStudents(students.map(s => s.id === id ? { ...s, approved: true } : s));
                    toast.success(`${name}'s account has been approved!`);
                } catch (err) {
                    toast.error("Error approving user");
                }
            }
        );
    };

    const handleSuspendStudent = (id, name) => {
        triggerConfirm(
            "Suspend Student Account",
            `Are you sure you want to suspend ${name}'s account? This will restrict their platform access.`,
            async () => {
                try {
                    await axios.put(`http://localhost:5000/api/admin/users/${id}/suspend`);
                    setStudents(students.map(s => s.id === id ? { ...s, approved: false } : s));
                    toast.success(`${name}'s account has been suspended.`);
                } catch (err) {
                    toast.error("Error suspending student");
                }
            }
        );
    };

    const handleCreateStudent = async (e) => {
        e.preventDefault();

        if (!isValidEmail(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!editingStudent && passStrength < 2) {
            toast.error("Password is too weak. Please meet more requirements.");
            return;
        }

        setIsLoading(true);

        try {
            if (editingStudent) {
                const res = await axios.put(`http://localhost:5000/api/admin/users/${editingStudent.id}`, {
                    full_name: formData.full_name,
                    email: formData.email
                });
                setStudents(students.map(s => s.id === editingStudent.id ? { ...s, full_name: res.data.full_name, email: res.data.email } : s));
                setIsModalOpen(false);
                setEditingStudent(null);
                setFormData({ full_name: '', email: '', password: '' });
                toast.success("Student account updated successfully!");
            } else {
                const res = await axios.post("http://localhost:5000/api/admin/users", formData);
                setStudents([res.data, ...students]);
                setIsModalOpen(false);
                setFormData({ full_name: '', email: '', password: '' });
                toast.success("Student account created successfully!");
            }
        } catch (err) {
            toast.error(err.response?.data?.error || `Error ${editingStudent ? "updating" : "creating"} student`);
        } finally {
            setIsLoading(false);
        }
    };

    const visibleStudents = students.filter(s => 
        activeTab === "active" ? !archivedIds.includes(s.id) : archivedIds.includes(s.id)
    );

    const handleArchive = async (id, name) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${id}/suspend`);
            setStudents(students.map(s => s.id === id ? { ...s, approved: false } : s));
            const updated = [...archivedIds.filter(x => x !== id), id];
            setArchivedIds(updated);
            localStorage.setItem("archived_students", JSON.stringify(updated));
            toast.success(`Student "${name}" archived successfully (restricted access).`);
        } catch (err) {
            toast.error("Failed to suspend student on archive.");
        }
    };

    const handleUnarchive = async (id, name) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${id}/approve`);
            setStudents(students.map(s => s.id === id ? { ...s, approved: true } : s));
            const updated = archivedIds.filter(archId => archId !== id);
            setArchivedIds(updated);
            localStorage.setItem("archived_students", JSON.stringify(updated));
            toast.success(`Student "${name}" unarchived successfully (restored access).`);
        } catch (err) {
            toast.error("Failed to approve student on unarchive.");
        }
    };

    const columns = [
        {
            key: "full_name",
            label: "Student",
            sortable: true,
            searchable: true,
            renderCell: (row, search) => (
                <div className="table-user-info admin-students-table-user-info-color">
                    <div className="user-avatar-small admin-students-avatar-small">
                        {row.full_name?.charAt(0)}
                    </div>
                    <span>{highlightText(row.full_name, search)}</span>
                </div>
            )
        },
        {
            key: "email",
            label: "Email",
            sortable: true,
            searchable: true,
            renderCell: (row, search) => (
                <span className="admin-students-table-email">{highlightText(row.email, search)}</span>
            )
        },
        {
            key: "approved",
            label: "Status",
            sortable: true,
            filterable: true,
            renderCell: (row) => (
                row.approved ? (
                    <span className="status-badge active admin-students-status-badge-active">Active</span>
                ) : (
                    <span className="status-badge admin-students-status-badge-pending">Pending Approval</span>
                )
            )
        },
        {
            key: "role",
            label: "Role",
            sortable: true,
            renderCell: () => (
                <span className="role-tag student admin-students-role-tag">Student</span>
            )
        }
    ];

    const handleRowAction = (action, row) => {
        if (action === "view") {
            setViewingStudent(row);
        } else if (action === "edit") {
            setEditingStudent(row);
            setFormData({ full_name: row.full_name, email: row.email, password: "" });
            setIsModalOpen(true);
        } else if (action === "delete") {
            handleSuspend(row.id, row.full_name);
        } else if (action === "archive") {
            handleArchive(row.id, row.full_name);
        } else if (action === "unarchive") {
            handleUnarchive(row.id, row.full_name);
        } else if (action === "approve") {
            handleApprove(row.id, row.full_name);
        } else if (action === "suspend") {
            handleSuspendStudent(row.id, row.full_name);
        }
    };

    const handleBulkAction = async (action, selectedIds) => {
        if (action === "delete") {
            triggerConfirm(
                "Delete Student Accounts",
                `Are you sure you want to delete the ${selectedIds.length} selected student accounts?`,
                async () => {
                    try {
                        await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:5000/api/admin/users/${id}`)));
                        setStudents(students.filter(s => !selectedIds.includes(s.id)));
                        toast.success(`Successfully deleted ${selectedIds.length} students.`);
                    } catch (err) {
                        toast.error("Failed to delete some students.");
                    }
                }
            );
        } else if (action === "archive") {
            try {
                await Promise.all(selectedIds.map(id => axios.put(`http://localhost:5000/api/admin/users/${id}/suspend`)));
                setStudents(students.map(s => selectedIds.includes(s.id) ? { ...s, approved: false } : s));
                const updated = [...new Set([...archivedIds, ...selectedIds])];
                setArchivedIds(updated);
                localStorage.setItem("archived_students", JSON.stringify(updated));
                toast.success(`Successfully archived ${selectedIds.length} students (restricted access).`);
            } catch (err) {
                toast.error("Failed to bulk archive students.");
            }
        } else if (action === "unarchive") {
            try {
                await Promise.all(selectedIds.map(id => axios.put(`http://localhost:5000/api/admin/users/${id}/approve`)));
                setStudents(students.map(s => selectedIds.includes(s.id) ? { ...s, approved: true } : s));
                const updated = archivedIds.filter(id => !selectedIds.includes(id));
                setArchivedIds(updated);
                localStorage.setItem("archived_students", JSON.stringify(updated));
                toast.success(`Successfully unarchived ${selectedIds.length} students (restored access).`);
            } catch (err) {
                toast.error("Failed to bulk unarchive students.");
            }
        }
    };

    return (
        <div className="admin-students-page">
            <header className="page-header">
                <div className="header-text">
                    <h2>Student Management</h2>
                    <p>Monitor student activity and account status.</p>
                </div>
                <button className="add-btn" onClick={() => {
                    setEditingStudent(null);
                    setFormData({ full_name: '', email: '', password: '' });
                    setIsModalOpen(true);
                }}>
                    <Icons.UserPlus /> Add New Student
                </button>
            </header>

            <div className="table-tabs-container admin-students-tabs-container">
                <button 
                    onClick={() => setActiveTab("active")}
                    className="admin-students-tab-btn"
                    style={{
                        color: activeTab === "active" ? "white" : "#94a3b8",
                    }}
                >
                    Active ({students.filter(s => !archivedIds.includes(s.id)).length})
                    {activeTab === "active" && (
                        <motion.div
                            layoutId="activeTabPill_students"
                            className="admin-students-active-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab("archived")}
                    className="admin-students-tab-btn"
                    style={{
                        color: activeTab === "archived" ? "white" : "#94a3b8",
                    }}
                >
                    Archived ({students.filter(s => archivedIds.includes(s.id)).length})
                    {activeTab === "archived" && (
                        <motion.div
                            layoutId="activeTabPill_students"
                            className="admin-students-active-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </button>
            </div>

            {errorData ? (
                <div className="premium-error-state">
                    <div className="error-icon-box">⚠️</div>
                    <h3>Unable to Load Students</h3>
                    <p>We encountered an error while connecting to the student service. Please try again.</p>
                    <div className="error-actions">
                        <button className="error-retry-btn" onClick={fetchStudents}>Retry</button>
                        <a href="mailto:support@uptoskills.com" className="error-support-link">Contact Support</a>
                    </div>
                </div>
            ) : students.length === 0 && !loadingData ? (
                <div className="premium-empty-state">
                    <div className="empty-icon">👥</div>
                    <h3>No Students Registered Yet</h3>
                    <p>Ready to welcome your first learner? Access key platform functions by creating a student account.</p>
                    <button className="empty-action-btn" onClick={() => { setEditingStudent(null); setFormData({ full_name: '', email: '', password: '' }); setIsModalOpen(true); }}>
                        + Add Student
                    </button>
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
                            data={visibleStudents}
                            columns={columns}
                            searchPlaceholder="Search students by name or email..."
                            onRowAction={handleRowAction}
                            onBulkAction={handleBulkAction}
                            defaultSortKey="full_name"
                            defaultSortDir="asc"
                            isArchivedMode={activeTab === "archived"}
                            loading={loadingData}
                        />
                    </motion.div>
                </AnimatePresence>
            )}

            <AnimatePresence>
                {viewingStudent && (
                    <motion.div
                        key="student-details-modal"
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setViewingStudent(null)}
                    >
                        <motion.div
                            className="modal-content admin-students-details-modal"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="admin-students-modal-header">
                                <h3 className="admin-students-modal-title">Student Profile Details</h3>
                                <button 
                                    className="close-modal-btn" 
                                    onClick={() => setViewingStudent(null)}
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="admin-students-modal-body">
                                <div className="admin-students-modal-profile-header">
                                    <div className="admin-students-modal-avatar">
                                        {viewingStudent?.full_name?.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="admin-students-modal-profile-name">{viewingStudent?.full_name}</h4>
                                        <span className={`status-badge ${viewingStudent?.approved ? 'active' : ''}`}>
                                            {viewingStudent?.approved ? 'Active' : 'Pending Approval'}
                                        </span>
                                    </div>
                                </div>

                                <hr className="admin-students-modal-divider" />

                                <div className="form-group">
                                    <label>Email Address</label>
                                    <p className="admin-students-modal-text">{viewingStudent?.email}</p>
                                </div>

                                <div className="form-group">
                                    <label>Platform Role</label>
                                    <p className="admin-students-modal-text">
                                        <span className="role-tag student">Student</span>
                                    </p>
                                </div>

                                <div className="form-group">
                                    <label>Course Enrollments ({studentEnrollments.length})</label>
                                    {loadingEnrollments ? (
                                        <p className="admin-students-modal-subtext">Loading courses...</p>
                                    ) : studentEnrollments.length === 0 ? (
                                        <p className="admin-students-modal-no-courses">Not enrolled in any courses yet.</p>
                                    ) : (
                                        <div className="admin-students-modal-courses-list">
                                            {studentEnrollments.map(enroll => (
                                                <div 
                                                    key={enroll.id} 
                                                    className="admin-students-modal-course-item"
                                                >
                                                    <span className="admin-students-modal-course-title">
                                                        {enroll.course_title}
                                                    </span>
                                                    <span className="admin-students-modal-course-progress">
                                                        {enroll.progress}%
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {viewingStudent && !viewingStudent.approved && (
                                <div className="modal-actions admin-students-modal-actions-margin">
                                    <button 
                                        type="button" 
                                        className="add-btn admin-students-modal-btn-approve" 
                                        onClick={() => {
                                            handleApprove(viewingStudent.id, viewingStudent.full_name);
                                            setViewingStudent(null);
                                        }}
                                    >
                                        Approve Student
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}

                {isModalOpen && (
                    <motion.div
                        key="student-edit-modal"
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => { setIsModalOpen(false); setEditingStudent(null); }}
                    >
                        <motion.div
                            className="modal-content"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="admin-students-modal-header">
                                <h3 className="admin-students-modal-title">{editingStudent ? "Edit Student Details" : "Add New Student"}</h3>
                                <button type="button" className="close-modal-btn" onClick={() => { setIsModalOpen(false); setEditingStudent(null); }}><X size={20} /></button>
                            </div>
                            <form onSubmit={handleCreateStudent}>
                                <div className="form-group">
                                    <label>Full Name <span className="required-asterisk">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.full_name}
                                        onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email Address <span className="required-asterisk">*</span></label>
                                    <input
                                        type="email"
                                        className={isEmailTouched ? (isValidEmail(formData.email) ? "input-valid" : "input-invalid") : ""}
                                        required
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {isEmailTouched && !isValidEmail(formData.email) && <span className="inline-error">Please enter a valid email format.</span>}
                                </div>
                                {!editingStudent && (
                                    <div className="form-group">
                                        <label>Temporary Password <span className="required-asterisk">*</span></label>
                                        <input
                                            type="password"
                                            required
                                            value={formData.password}
                                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        {passTouched && (
                                            <div className="password-meter-container">
                                                <div className="strength-bar-bg">
                                                    <div className={`strength-bar-fill ${passStrength === 1 ? 'strength-weak' : passStrength === 2 ? 'strength-medium' : passStrength === 3 ? 'strength-strong' : ''}`}></div>
                                                </div>
                                                <ul className="password-requirements">
                                                    <li className={formData.password.length >= 8 ? 'req-met' : 'req-unmet'}>
                                                        {formData.password.length >= 8 ? <Check size={12} /> : <X size={12} />} At least 8 characters
                                                    </li>
                                                    <li className={/\d/.test(formData.password) ? 'req-met' : 'req-unmet'}>
                                                        {/\d/.test(formData.password) ? <Check size={12} /> : <X size={12} />} Contains a number
                                                    </li>
                                                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'req-met' : 'req-unmet'}>
                                                        {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? <Check size={12} /> : <X size={12} />} Contains a special char
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="modal-actions">
                                    <button type="submit" className="add-btn admin-students-modal-btn-submit" disabled={isLoading}>
                                        {isLoading ? <><span className="spinner-inline"></span> Processing...</> : (editingStudent ? "Save Changes" : "Create Student")}
                                    </button>
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

export default AdminStudents;
