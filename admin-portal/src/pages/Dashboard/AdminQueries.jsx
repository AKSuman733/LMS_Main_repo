import { useState, useEffect } from "react";
import axios from "axios";
import { MessageSquare, Send, Edit3, Trash2, CheckCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import "../../styles/AdminQueries.css";

const AdminQueries = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    const [replyingQuery, setReplyingQuery] = useState(null);
    const [replyText, setReplyText] = useState("");

    const [deleteQueryId, setDeleteQueryId] = useState(null);

    useEffect(() => {
        fetchQueries();
    }, []);

    const fetchQueries = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/admin/queries");
            setQueries(res.data);
        } catch (err) {
            console.error("Error fetching queries:", err);
            toast.error("Failed to load student queries.");
        } finally {
            setLoading(false);
        }
    };

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        try {
            const res = await axios.put(`http://localhost:5000/api/admin/queries/${replyingQuery.id}/reply`, {
                reply: replyText
            });
            setQueries(queries.map(q => q.id === replyingQuery.id ? { ...q, reply: replyText, replied_at: res.data.replied_at } : q));
            setReplyingQuery(null);
            setReplyText("");
            toast.success("Reply submitted successfully!");
        } catch (err) {
            console.error("Error replying to query:", err);
            toast.error("Failed to submit reply.");
        }
    };

    const handleDeleteQuery = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/queries/${id}`);
            setQueries(queries.filter(q => q.id !== id));
            setDeleteQueryId(null);
            toast.success("Query deleted successfully!");
        } catch (err) {
            console.error("Error deleting query:", err);
            toast.error("Failed to delete query.");
        }
    };

    const filteredQueries = queries.filter(q => {
        if (activeFilter === "pending") return !q.reply;
        if (activeFilter === "replied") return !!q.reply;
        return true;
    });

    if (loading) return (
        <div className="premium-page-loader skeleton-pulse">
            <div className="spinner-ring"></div>
            <p className="loader-text">Loading... Fetching queries and feedback</p>
        </div>
    );

    return (
        <div className="admin-queries-page admin-queries-wrapper">
            <header className="admin-queries-header">
                <div>
                    <h2 className="admin-queries-title">Student Queries</h2>
                    <p className="admin-queries-subtitle">Manage, reply, and resolve queries submitted by students.</p>
                </div>

                <div className="admin-queries-filters-container">
                    {["all", "pending", "replied"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className="admin-queries-filter-btn"
                            style={{
                                background: activeFilter === filter ? 'var(--color-primary)' : 'transparent',
                                color: activeFilter === filter ? 'white' : '#94a3b8'
                            }}
                        >
                            {filter.toUpperCase()}
                        </button>
                    ))}
                </div>
            </header>

            {filteredQueries.length === 0 ? (
                <div className="premium-empty-state admin-queries-empty-state">
                    <div className="empty-icon">💬</div>
                    <h3>No Queries Found</h3>
                    <p>There are no queries matching your active filters.</p>
                </div>
            ) : (
                <div className="admin-queries-list">
                    {filteredQueries.map((query) => (
                        <motion.div
                            key={query.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="admin-queries-card"
                        >
                            <div className="admin-queries-card-header">
                                <div>
                                    <div className="admin-queries-sender-info">
                                        <span className="admin-queries-sender-name">{query.name}</span>
                                        <span className="admin-queries-bullet">•</span>
                                        <span className="admin-queries-sender-email">{query.email}</span>
                                        {query.student_name && (
                                            <>
                                                <span className="admin-queries-bullet">•</span>
                                                <span className="admin-queries-verified-badge">VERIFIED STUDENT</span>
                                            </>
                                        )}
                                    </div>
                                    <h4 className="admin-queries-card-title">{query.subject}</h4>
                                    <p className="admin-queries-card-message">{query.message}</p>
                                </div>

                                <span 
                                    className="admin-queries-status-tag"
                                    style={{
                                        background: query.reply ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                        color: query.reply ? 'var(--color-success)' : '#f59e0b',
                                    }}
                                >
                                    {query.reply ? <CheckCircle size={12} /> : <Clock size={12} />}
                                    {query.reply ? "RESOLVED" : "PENDING REPLY"}
                                </span>
                            </div>

                            {query.reply && (
                                <div className="admin-queries-reply-block">
                                    <span className="admin-queries-reply-label">Your Response</span>
                                    <p className="admin-queries-reply-text">{query.reply}</p>
                                    {query.replied_at && <span className="admin-queries-reply-time">Replied at: {new Date(query.replied_at).toLocaleString()}</span>}
                                </div>
                            )}

                            <div className="admin-queries-card-footer">
                                <span>Submitted: {new Date(query.created_at).toLocaleString()}</span>
                                <div className="admin-queries-actions-row">
                                    <button
                                        onClick={() => {
                                            setReplyingQuery(query);
                                            setReplyText(query.reply || "");
                                        }}
                                        className="admin-queries-btn-reply"
                                    >
                                        <Send size={14} /> {query.reply ? "Edit Reply" : "Reply"}
                                    </button>
                                    <button
                                        onClick={() => setDeleteQueryId(query.id)}
                                        className="admin-queries-btn-delete"
                                    >
                                        <Trash2 size={14} /> Delete
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <AnimatePresence>
                {replyingQuery && (
                    <div className="admin-queries-modal-overlay" onClick={() => setReplyingQuery(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="admin-queries-modal-card"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="admin-queries-modal-header">
                                <MessageSquare color="var(--color-primary)" size={22} />
                                <h3 className="admin-queries-modal-title">Reply to Query</h3>
                            </div>
                            <div className="admin-queries-modal-highlight">
                                <p className="admin-queries-modal-highlight-label">Submitted message:</p>
                                <p className="admin-queries-modal-highlight-text">"{replyingQuery.message}"</p>
                            </div>
                            <form onSubmit={handleSendReply} className="admin-queries-modal-form">
                                <div className="admin-queries-modal-form-group">
                                    <label className="admin-queries-modal-label">Write Response</label>
                                    <textarea
                                        required
                                        rows="5"
                                        placeholder="Type your message to the student..."
                                        value={replyText}
                                        onChange={e => setReplyText(e.target.value)}
                                        className="admin-queries-modal-textarea"
                                    ></textarea>
                                </div>
                                <div className="admin-queries-modal-actions">
                                    <button type="submit" className="admin-queries-modal-btn-submit">Submit Reply</button>
                                    <button type="button" onClick={() => setReplyingQuery(null)} className="admin-queries-modal-btn-cancel">Cancel</button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {deleteQueryId && (
                    <div className="admin-queries-modal-overlay" onClick={() => setDeleteQueryId(null)}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="admin-queries-modal-card-delete"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="admin-queries-warning-emoji">⚠️</div>
                            <h3 className="admin-queries-warning-title">Are you sure?</h3>
                            <p className="admin-queries-warning-desc">
                                Do you really want to delete this query? This action cannot be undone.
                            </p>
                            <div className="admin-queries-warning-actions">
                                <button
                                    onClick={() => handleDeleteQuery(deleteQueryId)}
                                    className="admin-queries-modal-btn-delete"
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setDeleteQueryId(null)}
                                    className="admin-queries-modal-btn-cancel"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminQueries;
