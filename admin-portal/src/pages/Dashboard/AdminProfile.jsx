import { useState, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, Shield, CheckCircle, ArrowRight } from "lucide-react";
import "../../styles/AdminProfile.css";

const AdminProfile = () => {
    const { user, login } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || ""
    });
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!isEditing) return;

        setLoading(true);
        try {
            await axios.put("http://localhost:5000/api/auth/profile", {
                id: user.id,
                fullName: formData.fullName,
                email: formData.email
            });
            login({ ...user, fullName: formData.fullName, email: formData.email });
            setIsEditing(false);
            toast.success("Admin profile updated successfully!");
        } catch (err) {
            toast.error("Error updating profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-profile-page admin-profile-container">
            <header className="page-header">
                <div className="header-text">
                    <h2>Admin Account</h2>
                    <p>Manage your administrative identity and security preferences.</p>
                </div>
            </header>

            <motion.div
                className="profile-card-premium admin-profile-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="admin-profile-header-info">
                    <div className="admin-profile-avatar">
                        {user?.fullName?.charAt(0)}
                    </div>
                    <div>
                        <h3 className="admin-profile-name">{user?.fullName}</h3>
                        <div className="admin-profile-badge-row">
                            <span className="admin-profile-badge">ADMINISTRATOR</span>
                            <span className="admin-profile-verified"><CheckCircle size={14} /> Verified</span>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleUpdate} className="admin-profile-form">
                    <div className="form-group-admin">
                        <label className="admin-profile-form-label">Full Name</label>
                        <div className="admin-profile-input-wrapper">
                            <User 
                                className="admin-profile-input-icon" 
                                style={{ color: isEditing ? 'var(--color-primary)' : '#64748b' }} 
                                size={20} 
                            />
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                readOnly={!isEditing}
                                className="admin-profile-input"
                                style={{
                                    background: isEditing ? 'rgba(15,23,42,0.8)' : 'rgba(255,255,255,0.02)',
                                    border: isEditing ? '2px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.05)',
                                }}
                                placeholder="Enter your full name"
                            />
                        </div>
                    </div>

                    <div className="form-group-admin">
                        <label className="admin-profile-form-label">Email Address</label>
                        <div className="admin-profile-input-wrapper">
                            <Mail 
                                className="admin-profile-input-icon" 
                                style={{ color: isEditing ? 'var(--color-primary)' : '#64748b' }} 
                                size={20} 
                            />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                readOnly={!isEditing}
                                className="admin-profile-input"
                                style={{
                                    background: isEditing ? 'rgba(15,23,42,0.8)' : 'rgba(255,255,255,0.02)',
                                    border: isEditing ? '2px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.05)',
                                }}
                                placeholder="name@uptoskills.com"
                            />
                        </div>
                    </div>

                    <div className="admin-profile-btn-row">
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsEditing(true);
                                }}
                                className="admin-profile-btn-edit"
                            >
                                Edit Account
                            </button>
                        ) : (
                            <>
                                <button type="submit" disabled={loading} className="admin-profile-btn-apply">{loading ? "Saving Changes..." : "Apply Updates"}</button>
                                <button type="button" onClick={() => setIsEditing(false)} className="admin-profile-btn-discard">Discard</button>
                            </>
                        )}
                    </div>
                </form>

                <div className="admin-profile-security-card">
                    <div className="admin-profile-security-flex">
                        <div className="admin-profile-security-text">
                            <h4 className="admin-profile-security-title">
                                <Shield size={24} color="var(--color-primary)" /> Advanced Security
                            </h4>
                            <p className="admin-profile-security-desc">
                                Manage your administrative authentication credentials and protect your account with a unique security key.
                            </p>
                        </div>
                        <Link to="/forgot-password" className="admin-profile-security-link">
                            <button className="admin-profile-security-btn">
                                Update Security Key <ArrowRight size={18} />
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminProfile;
