import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash, Edit2, Search, ExternalLink, X, BookOpen, Layout, Video, User, Star, List, Info, FileText } from "lucide-react";
import EnhancedTable, { highlightText } from "../../components/EnhancedTable";
import ConfirmationModal from "../../components/ConfirmationModal";
import "../../styles/AdminCourses.css";
import "../../styles/EnhancedTable.css";


const AdminCourses = () => {
    const [courses, setCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [errorData, setErrorData] = useState(false);
    const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: "", message: "", onConfirm: () => {} });
    const [formData, setFormData] = useState({
        title: "", topic: "Artificial Intelligence", level: "Beginner",
        image: "", about: "", description: "",
        instructor_name: "", instructor_bio: "", instructor_image: "",
        outcomes: "", requirements: "",
        curriculum: []
    });

    const [archivedIds, setArchivedIds] = useState(() => {
        const saved = localStorage.getItem("archived_courses");
        return saved ? JSON.parse(saved) : [];
    });

    const [viewingCourse, setViewingCourse] = useState(null);
    const [activeTab, setActiveTab] = useState("active");

    const topics = [
        "Artificial Intelligence", "Data Science", "Web Development",
        "Creative Design", "Engineering", "Business & Growth", "Cloud Computing"
    ];

    const location = useLocation();

    useEffect(() => {
        fetchCourses();
        if (location.state?.openModal) {
            handleOpenModal();
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const fetchCourses = async () => {
        setLoadingData(true);
        setErrorData(false);
        try {
            const res = await axios.get("http://localhost:5000/api/courses?includeArchived=true");
            setCourses(res.data);
            const archivedList = res.data.filter(c => c.archived).map(c => c.id);
            setArchivedIds(archivedList);
            localStorage.setItem("archived_courses", JSON.stringify(archivedList));
        } catch (err) {
            console.error("Error fetching courses:", err);
            setErrorData(true);
        } finally {
            setLoadingData(false);
        }
    };

    const normalizeUrl = (url) => {
        if (!url) return "https://images.unsplash.com/photo-1673515334386-2b24073bb22f";
        if (url.startsWith("http")) return url;
        const cleanPath = url.startsWith("/") ? url.slice(1) : url;
        return `http://localhost:5000/${cleanPath}`;
    };

    const handleOpenModal = (course = null) => {
        if (course) {
            setCurrentCourse(course);
            setFormData({
                ...course,
                outcomes: Array.isArray(course.outcomes) ? course.outcomes.join(", ") : (course.outcomes || ""),
                requirements: Array.isArray(course.requirements) ? course.requirements.join(", ") : (course.requirements || ""),
                curriculum: course.curriculum ? (typeof course.curriculum === 'string' ? JSON.parse(course.curriculum) : course.curriculum) : []
            });
        } else {
            setCurrentCourse(null);
            setFormData({
                title: "", topic: "Artificial Intelligence", level: "Beginner",
                image: "", about: "", description: "",
                instructor_name: "", instructor_bio: "", instructor_image: "",
                outcomes: "", requirements: "",
                curriculum: []
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentCourse(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("topic", formData.topic);
            data.append("level", formData.level);
            data.append("about", formData.about);
            data.append("description", formData.description);
            data.append("instructor_name", formData.instructor_name);
            data.append("instructor_bio", formData.instructor_bio);
            
            if (formData.image instanceof File) {
                data.append("image", formData.image);
            } else {
                data.append("image", formData.image || "");
            }

            if (formData.instructor_image instanceof File) {
                data.append("instructor_image", formData.instructor_image);
            } else {
                data.append("instructor_image", formData.instructor_image || "");
            }

            data.append("outcomes", JSON.stringify(formData.outcomes.split(",").map(s => s.trim()).filter(s => s)));
            data.append("requirements", JSON.stringify(formData.requirements.split(",").map(s => s.trim()).filter(s => s)));
            data.append("curriculum", JSON.stringify(formData.curriculum));

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            if (currentCourse) {
                await axios.put(`http://localhost:5000/api/courses/${currentCourse.id}`, data, config);
            } else {
                await axios.post("http://localhost:5000/api/courses", data, config);
            }
            fetchCourses();
            closeModal();
            toast.success(`Course ${currentCourse ? "updated" : "added"} successfully!`);
        } catch (err) {
            console.error("Error saving course:", err);
            toast.error("Error saving course data.");
        } finally {
            setLoading(false);
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
            "Delete Course",
            "Are you sure you want to delete this course?",
            async () => {
                try {
                    await axios.delete(`http://localhost:5000/api/courses/${id}`);
                    fetchCourses();
                    toast.success("Course deleted successfully!");
                } catch (err) {
                    console.error("Error deleting course:", err);
                    toast.error("Failed to delete course.");
                }
            }
        );
    };

    const handleArchiveCourse = async (id, title) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/courses/${id}/archive`);
            setCourses(courses.map(c => c.id === id ? { ...c, archived: true } : c));
            const updated = [...archivedIds.filter(x => x !== id), id];
            setArchivedIds(updated);
            localStorage.setItem("archived_courses", JSON.stringify(updated));
            toast.success(`Course "${title}" archived successfully.`);
        } catch (err) {
            toast.error("Failed to archive course.");
        }
    };

    const handleUnarchiveCourse = async (id, title) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/courses/${id}/unarchive`);
            setCourses(courses.map(c => c.id === id ? { ...c, archived: false } : c));
            const updated = archivedIds.filter(archId => archId !== id);
            setArchivedIds(updated);
            localStorage.setItem("archived_courses", JSON.stringify(updated));
            toast.success(`Course "${title}" unarchived successfully.`);
        } catch (err) {
            toast.error("Failed to unarchive course.");
        }
    };

    const visibleCourses = courses.filter(c => 
        activeTab === "active" ? !archivedIds.includes(c.id) : archivedIds.includes(c.id)
    );

    const columns = [
        {
            key: "title",
            label: "Course Info",
            sortable: true,
            searchable: true,
            renderCell: (row, search) => (
                <div className="table-course-info admin-table-course-info">
                    <div className="course-thumb-container">
                        <img src={normalizeUrl(row.image)} alt={row.title} onError={(e) => e.target.src = "https://images.unsplash.com/photo-1673515334386-2b24073bb22f?w=100"} />
                    </div>
                    <div className="t-info">
                        <p className="t-title admin-course-t-title">{highlightText(row.title, search)}</p>
                        <p className="t-sub admin-course-t-sub">{row.level} Level</p>
                    </div>
                </div>
            )
        },
        {
            key: "topic",
            label: "Topic",
            sortable: true,
            filterable: true,
            renderCell: (row) => (
                <span className="topic-badge">{row.topic}</span>
            )
        },
        {
            key: "rating",
            label: "Ratings",
            sortable: true,
            renderCell: (row) => (
                <div className="rating-pill admin-course-rating-pill">
                    <Star size={12} fill="var(--color-primary)" stroke="none" /> {row.rating || "0.0"} ({row.rating_count || 0})
                </div>
            )
        },
        {
            key: "enrollments",
            label: "Learners",
            sortable: true,
            renderCell: (row) => (
                <span className="enrollment-count admin-course-enrollment-count">{row.enrollments || 0}</span>
            )
        }
    ];

    const handleRowAction = (action, row) => {
        if (action === "view") {
            setViewingCourse(row);
        } else if (action === "edit") {
            handleOpenModal(row);
        } else if (action === "delete") {
            handleDelete(row.id);
        } else if (action === "archive") {
            handleArchiveCourse(row.id, row.title);
        } else if (action === "unarchive") {
            handleUnarchiveCourse(row.id, row.title);
        }
    };

    const handleBulkAction = async (action, selectedIds) => {
        if (action === "delete") {
            triggerConfirm(
                "Delete Selected Courses",
                `Are you sure you want to delete the ${selectedIds.length} selected courses?`,
                async () => {
                    try {
                        await Promise.all(selectedIds.map(id => axios.delete(`http://localhost:5000/api/courses/${id}`)));
                        fetchCourses();
                        toast.success(`Successfully deleted ${selectedIds.length} courses.`);
                    } catch (err) {
                        toast.error("Failed to delete some courses.");
                    }
                }
            );
        } else if (action === "archive") {
            try {
                await Promise.all(selectedIds.map(id => axios.put(`http://localhost:5000/api/admin/courses/${id}/archive`)));
                setCourses(courses.map(c => selectedIds.includes(c.id) ? { ...c, archived: true } : c));
                const updated = [...new Set([...archivedIds, ...selectedIds])];
                setArchivedIds(updated);
                localStorage.setItem("archived_courses", JSON.stringify(updated));
                toast.success(`Successfully archived ${selectedIds.length} courses.`);
            } catch (err) {
                toast.error("Failed to bulk archive courses.");
            }
        } else if (action === "unarchive") {
            try {
                await Promise.all(selectedIds.map(id => axios.put(`http://localhost:5000/api/admin/courses/${id}/unarchive`)));
                setCourses(courses.map(c => selectedIds.includes(c.id) ? { ...c, archived: false } : c));
                const updated = archivedIds.filter(id => !selectedIds.includes(id));
                setArchivedIds(updated);
                localStorage.setItem("archived_courses", JSON.stringify(updated));
                toast.success(`Successfully unarchived ${selectedIds.length} courses.`);
            } catch (err) {
                toast.error("Failed to bulk unarchive courses.");
            }
        }
    };

    return (
        <div className="admin-courses-page">
            <header className="page-header">
                <div className="header-text">
                    <h2>Course Management</h2>
                    <p>Comprehensive management of all learning courses.</p>
                </div>
                <button className="add-course-btn" onClick={() => handleOpenModal()}>
                    <Plus size={20} /> Add Course
                </button>
            </header>

            <div className="table-tabs-container admin-table-tabs-container">
                <button 
                    onClick={() => setActiveTab("active")}
                    className={`admin-table-tab-btn ${activeTab === "active" ? 'active' : 'inactive'}`}
                >
                    Active ({courses.filter(c => !archivedIds.includes(c.id)).length})
                    {activeTab === "active" && (
                        <motion.div
                            layoutId="activeTabPill_courses"
                            className="admin-table-tab-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </button>
                <button 
                    onClick={() => setActiveTab("archived")}
                    className={`admin-table-tab-btn ${activeTab === "archived" ? 'active' : 'inactive'}`}
                >
                    Archived ({courses.filter(c => archivedIds.includes(c.id)).length})
                    {activeTab === "archived" && (
                        <motion.div
                            layoutId="activeTabPill_courses"
                            className="admin-table-tab-pill"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                    )}
                </button>
            </div>

            {errorData ? (
                <div className="premium-error-state">
                    <div className="error-icon-box">⚠️</div>
                    <h3>Unable to Load Courses</h3>
                    <p>We encountered an error while connecting to the curriculum service. Please try again.</p>
                    <div className="error-actions">
                        <button className="error-retry-btn" onClick={fetchCourses}>Retry</button>
                        <a href="mailto:support@uptoskills.com" className="error-support-link">Contact Support</a>
                    </div>
                </div>
            ) : courses.length === 0 && !loadingData ? (
                <div className="premium-empty-state">
                    <div className="empty-icon">📚</div>
                    <h3>No Courses Found</h3>
                    <p>Ready to launch your first course? Create an AI-powered course to populate the catalog.</p>
                    <button className="empty-action-btn" onClick={handleOpenModal}>
                        + Create Course
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
                            data={visibleCourses}
                            columns={columns}
                            searchPlaceholder="Search courses by title or topic..."
                            onRowAction={handleRowAction}
                            onBulkAction={handleBulkAction}
                            defaultSortKey="title"
                            defaultSortDir="asc"
                            isArchivedMode={activeTab === "archived"}
                            loading={loadingData}
                        />
                    </motion.div>
                </AnimatePresence>
            )}


            <AnimatePresence>
                {isModalOpen && (
                    <motion.div key="course-edit-modal" className="admin-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal}>
                        <motion.div className="admin-modal-card-scrollable" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header-sticky">
                                <h2>{currentCourse ? "Edit Course" : "Add New Course"}</h2>
                                <button className="close-modal-btn" onClick={closeModal}><X size={20} /></button>
                            </div>

                            <form onSubmit={handleSubmit} className="admin-modal-form-grid">
                                <div className="modal-section">
                                    <div className="modal-section-title"><Info size={18} /> Core Specifications</div>
                                    <div className="form-grid-2">
                                        <div className="form-group">
                                            <label>Course Title <span className="required-asterisk">*</span></label>
                                            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required placeholder="e.g. Generative AI Architecture" />
                                        </div>
                                        <div className="form-group">
                                            <label>Industry Category <span className="required-asterisk">*</span></label>
                                            <select value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}>
                                                {topics.map(t => <option key={t} value={t}>{t}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-grid-2 mt-20">
                                        <div className="form-group">
                                            <label>Difficulty Level <span className="required-asterisk">*</span></label>
                                            <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })}>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="Advanced">Advanced</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <div className="modal-section-title"><Layout size={18} /> Asset Management</div>
                                    <div className="form-group">
                                        <label>About</label>
                                        <textarea rows="2" value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} placeholder="Short description of the course..." />
                                    </div>
                                    <div className="form-group mt-20">
                                        <label>Full Description <span className="required-asterisk">*</span></label>
                                        <textarea rows="4" value={formData.description} required onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Detailed description of the course..." />
                                    </div>
                                    <div className="form-group mt-20">
                                        <label>Cover Image</label>
                                        <div className="path-picker-wrapper">
                                            <input type="file" accept="image/png, image/jpeg, image/webp" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} />
                                        </div>
                                        <span className="inline-error admin-inline-error-info">Max 5MB (JPG, PNG, WebP)</span>
                                        {currentCourse && typeof formData.image === 'string' && <span className="admin-current-img-label">Current: {formData.image}</span>}
                                    </div>
                                </div>



                                <div className="modal-section">
                                    <div className="modal-section-title"><List size={18} /> Educational Framework</div>
                                    <div className="form-group">
                                        <label>Key Outcomes (Comma Separated)</label>
                                        <textarea rows="2" value={formData.outcomes} onChange={(e) => setFormData({ ...formData, outcomes: e.target.value })} placeholder="Expertise in LLMs, Neural Networks, Cloud Ops..." />
                                    </div>
                                    <div className="form-group mt-20">
                                        <label>Prerequisites (Comma Separated)</label>
                                        <textarea rows="2" value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} placeholder="Python Basics, Linear Algebra..." />
                                    </div>
                                </div>

                                

                                <div className="modal-section">
                                    <div className="modal-section-title"><Video size={18} /> Curriculum Architecture</div>
                                    <div className="curriculum-editor">
                                        {formData.curriculum.map((item, idx) => (
                                            <div key={idx} className="curriculum-edit-row">
                                                <input type="text" placeholder="Video Title" required value={item.title} onChange={(e) => {
                                                    const newCurr = [...formData.curriculum];
                                                    newCurr[idx].title = e.target.value;
                                                    setFormData({ ...formData, curriculum: newCurr });
                                                }} />
                                                <input type="text" placeholder="Video Link / Path" required value={item.link || ""} onChange={(e) => {
                                                    const newCurr = [...formData.curriculum];
                                                    newCurr[idx].link = e.target.value;
                                                    setFormData({ ...formData, curriculum: newCurr });
                                                }} />
                                                <input type="text" placeholder="Duration (MM:SS)" required pattern="^([0-9]{1,2}:)?[0-5][0-9]:[0-5][0-9]$" title="Format: MM:SS or HH:MM:SS" value={item.duration} onChange={(e) => {
                                                    const newCurr = [...formData.curriculum];
                                                    newCurr[idx].duration = e.target.value;
                                                    setFormData({ ...formData, curriculum: newCurr });
                                                }} />
                                                <button type="button" className="row-delete" onClick={() => {
                                                    const newCurr = formData.curriculum.filter((_, i) => i !== idx);
                                                    setFormData({ ...formData, curriculum: newCurr });
                                                }}><Trash size={16} /></button>
                                            </div>
                                        ))}
                                        <button type="button" className="add-video-row-btn" onClick={() => setFormData({ ...formData, curriculum: [...formData.curriculum, { title: "", duration: "", link: "", type: "Video" }] })}>
                                            <Plus size={18} /> Add Course Module
                                        </button>
                                    </div>
                                </div>

                                <div className="modal-footer-sticky">
                                    <button type="submit" className="modal-submit-btn w-100" disabled={loading}>
                                        {loading ? <><span className="spinner-inline"></span> Processing...</> : (currentCourse ? "Update Course" : "Add Course")}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
                {viewingCourse && (
                    <motion.div
                        key="course-details-modal"
                        className="admin-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setViewingCourse(null)}
                    >
                        <motion.div
                            className="admin-modal-card-scrollable admin-view-modal-card"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="modal-header-sticky admin-details-modal-header">
                                <h2 className="admin-details-modal-title">Course Details</h2>
                                <button className="close-modal-btn" onClick={() => setViewingCourse(null)}><X size={20} /></button>
                            </div>

                            <div className="admin-details-modal-body">
                                <div className="admin-details-row">
                                    <div className="admin-details-thumb-container">
                                        <img src={normalizeUrl(viewingCourse?.image)} alt={viewingCourse?.title} className="admin-details-thumb-img" />
                                    </div>
                                    <div className="admin-details-info-wrap">
                                        <h3 className="admin-details-info-title">{viewingCourse?.title}</h3>
                                        <div className="admin-details-badges-wrap">
                                            <span className="topic-badge">{viewingCourse?.topic}</span>
                                            <span className="admin-details-level-badge">
                                                {viewingCourse?.level} Level
                                            </span>
                                            <span className="admin-details-rating-badge">
                                                ★ {viewingCourse?.rating || "0.0"} ({viewingCourse?.rating_count || 0})
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>About</label>
                                    <p className="admin-details-text-p">{viewingCourse?.about || "No summary hook provided."}</p>
                                </div>

                                <div className="form-group">
                                    <label>Full Description</label>
                                    <p className="admin-details-text-p desc">{viewingCourse?.description}</p>
                                </div>

                                <div className="admin-details-two-col">
                                    <div className="form-group">
                                        <label>What You'll Learn</label>
                                         {viewingCourse?.outcomes ? (
                                             <ul className="admin-details-list">
                                                 {(typeof viewingCourse?.outcomes === 'string' ? JSON.parse(viewingCourse.outcomes) : viewingCourse?.outcomes || []).map((o, i) => <li key={i} className="admin-details-list-item">{o}</li>)}
                                             </ul>
                                         ) : <p className="admin-details-none-text">None listed</p>}
                                    </div>
                                    <div className="form-group">
                                        <label>Prerequisites</label>
                                         {viewingCourse?.requirements ? (
                                             <ul className="admin-details-list">
                                                 {(typeof viewingCourse?.requirements === 'string' ? JSON.parse(viewingCourse.requirements) : viewingCourse?.requirements || []).map((r, i) => <li key={i} className="admin-details-list-item">{r}</li>)}
                                             </ul>
                                         ) : <p className="admin-details-none-text">None listed</p>}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Curriculum modules ({(viewingCourse?.curriculum ? (typeof viewingCourse?.curriculum === 'string' ? JSON.parse(viewingCourse.curriculum) : viewingCourse?.curriculum || []).length : 0)})</label>
                                    <div className="admin-details-curriculum-list">
                                        {(viewingCourse?.curriculum ? (typeof viewingCourse?.curriculum === 'string' ? JSON.parse(viewingCourse.curriculum) : viewingCourse?.curriculum) : []).map((mod, idx) => (
                                            <div key={idx} className="admin-details-curriculum-item">
                                                <span className="admin-details-curriculum-item-title">🎥 {mod.title}</span>
                                                <span className="admin-details-curriculum-item-duration">⏱️ {mod.duration}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="modal-header-sticky admin-details-modal-footer">
                                <button type="button" className="modal-submit-btn w-100" onClick={() => {
                                    const courseToEdit = viewingCourse;
                                    setViewingCourse(null);
                                    setTimeout(() => {
                                        handleOpenModal(courseToEdit);
                                    }, 250);
                                }}>Edit Course</button>
                            </div>
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

export default AdminCourses;
