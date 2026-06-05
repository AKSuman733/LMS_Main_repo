import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Star, User, Trash2 } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";
import "../../styles/AdminReviews.css";

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);

    const fetchAllReviews = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/admin/reviews");
            setReviews(res.data);
        } catch (err) {
            console.error("Error fetching all reviews:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const handleDelete = (id) => {
        setReviewToDelete(id);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        setIsConfirmOpen(false);
        if (!reviewToDelete) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/reviews/${reviewToDelete}`);
            setReviews(reviews.filter(r => r.id !== reviewToDelete));
            toast.success("Review deleted successfully!");
        } catch (err) {
            toast.error("Error deleting review");
        } finally {
            setReviewToDelete(null);
        }
    };

    return (
        <div className="admin-reviews-page">
            <header className="page-header">
                <div className="header-text">
                    <h2>Student Feedback</h2>
                    <p>Monitor and manage all course reviews across the platform.</p>
                </div>
            </header>

            <div className="reviews-management-grid admin-reviews-grid">
                {loading ? (
                    <div className="admin-reviews-loading">Aggregating feedback data...</div>
                ) : reviews.length === 0 ? (
                    <div className="empty-state-v">No reviews posted yet.</div>
                ) : reviews.map((rev) => (
                    <motion.div
                        key={rev.id}
                        className="admin-review-card-premium admin-review-card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="admin-review-avatar-container">
                            <User size={24} />
                        </div>

                        <div className="rev-main-info">
                            <div className="admin-review-header-info">
                                <h4 className="admin-review-user-name">{rev.user_name}</h4>
                                <span className="admin-review-course-title">on {rev.course_title}</span>
                            </div>
                            <div className="admin-review-stars-row">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill={i < rev.rating ? "#facc15" : "transparent"} stroke={i < rev.rating ? "#facc15" : "#475569"} />
                                ))}
                            </div>
                            <p className="admin-review-comment">"{rev.comment}"</p>
                        </div>

                        <div className="rev-actions">
                            <button 
                                onClick={() => handleDelete(rev.id)}
                                className="admin-review-btn-delete"
                                title="Delete Review"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
            <ConfirmationModal
                isOpen={isConfirmOpen}
                title="Delete Review"
                message="Are you sure you want to permanently delete this review? This action cannot be undone."
                onConfirm={confirmDelete}
                onCancel={() => setIsConfirmOpen(false)}
            />
        </div>
    );
};

export default AdminReviews;
