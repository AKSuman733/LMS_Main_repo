import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Star, User, Trash2, Search } from "lucide-react";
import ConfirmationModal from "../../components/ConfirmationModal";
import "../../styles/AdminReviews.css";

const AdminReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [ratingFilter, setRatingFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

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

    const getProcessedReviews = () => {
        let result = reviews.filter(r => {
            const matchesSearch = 
                r.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.course_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                r.comment.toLowerCase().includes(searchQuery.toLowerCase());
            
            if (!matchesSearch) return false;

            if (ratingFilter !== "all" && r.rating !== parseInt(ratingFilter)) {
                return false;
            }

            return true;
        });

        result.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.created_at || 0) - new Date(a.created_at || 0);
            }
            if (sortBy === "oldest") {
                return new Date(a.created_at || 0) - new Date(b.created_at || 0);
            }
            if (sortBy === "rating_high") {
                return b.rating - a.rating;
            }
            if (sortBy === "rating_low") {
                return a.rating - b.rating;
            }
            return 0;
        });

        return result;
    };

    const filteredReviews = getProcessedReviews();

    return (
        <div className="admin-reviews-page">
            <header className="page-header">
                <div className="header-text">
                    <h2>Student Feedback</h2>
                    <p>Monitor and manage all course reviews across the platform.</p>
                </div>
            </header>

            <div className="table-actions-bar">
                <div className="table-search">
                    <Search size={18} color="#64748b" />
                    <input
                        type="text"
                        placeholder="Search by student, course, comment..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label="Search reviews"
                    />
                </div>
                <div className="table-filters-sort-group">
                    <div className="filter-select-wrapper">
                        <select 
                            value={ratingFilter} 
                            onChange={(e) => setRatingFilter(e.target.value)}
                            className="table-filter-dropdown"
                        >
                            <option value="all">All Ratings</option>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                        </select>
                    </div>
                    <div className="filter-select-wrapper">
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                            className="table-filter-dropdown"
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="rating_high">Highest Rating</option>
                            <option value="rating_low">Lowest Rating</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="reviews-management-grid admin-reviews-grid">
                {loading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <div key={`review-skel-${index}`} className="admin-review-card-premium admin-review-card skeleton-pulse admin-reviews-skeleton-card">
                            <div className="admin-review-avatar-container skeleton-avatar"></div>
                            <div className="rev-main-info admin-reviews-skeleton-card-info">
                                <div className="skeleton-bar skeleton-pulse admin-reviews-skeleton-bar-40"></div>
                                <div className="skeleton-bar skeleton-pulse admin-reviews-skeleton-bar-70"></div>
                                <div className="skeleton-bar skeleton-pulse admin-reviews-skeleton-bar-90"></div>
                            </div>
                        </div>
                    ))
                ) : filteredReviews.length === 0 ? (
                    <div className="empty-state-v">No reviews found matching the filters.</div>
                ) : filteredReviews.map((rev) => (
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
                            {rev.created_at && (
                                <span className="admin-review-date">
                                    Posted on: {new Date(rev.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                            )}
                        </div>

                        <div className="rev-actions">
                            <button 
                                onClick={() => handleDelete(rev.id)}
                                className="admin-review-btn-delete"
                                title="Delete Review"
                                aria-label={`Delete review by ${rev.user_name}`}
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
