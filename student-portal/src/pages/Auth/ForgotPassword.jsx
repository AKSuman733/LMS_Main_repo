import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../../components/Logo/Logo";
import axios from "axios";
import "../../styles/Auth.css";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [stage, setStage] = useState("email");
    const [loading, setLoading] = useState(false);

    const getPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;
        return strength;
    };

    const passStrength = getPasswordStrength(password);
    const passTouched = password.length > 0;

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isEmailTouched = email.length > 0;

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            toast.success("OTP has been sent to your email address!");
            setStage("otp");
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to generate OTP.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/auth/verify-otp", { email, otp: otpCode });
            toast.success("OTP verified successfully!");
            setStage("reset");
        } catch (err) {
            toast.error(err.response?.data?.error || "Invalid OTP code.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        if (passStrength < 2) {
            toast.error("Password is too weak. Please meet more requirements.");
            return;
        }
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/auth/reset-password", {
                email,
                otp: otpCode,
                password
            });
            toast.success("Password reset successfully! Please login.");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.error || "Failed to reset password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <motion.div 
                className="auth-box"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="auth-logo-center">
                    <Logo size="large" />
                </div>
                
                <AnimatePresence mode="wait">
                    {stage === "email" && (
                        <motion.div
                            key="email-stage"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                        >
                            <h2 className="auth-title">Reset Password</h2>
                            <p className="auth-subtitle">Enter your registered email. You'll receive an OTP to reset your password.</p>

                            <form onSubmit={handleSendOtp}>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your registered email"
                                        className={isEmailTouched ? (isValidEmail(email) ? "input-valid" : "input-invalid") : ""}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {isEmailTouched && !isValidEmail(email) && <span className="inline-error">Please enter a valid email format.</span>}
                                </div>

                                <button type="submit" className="auth-btn" disabled={loading}>
                                    {loading ? "Sending OTP..." : "Send OTP"}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {stage === "otp" && (
                        <motion.div
                            key="otp-stage"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                        >
                            <h2 className="auth-title">Enter Verification Code</h2>
                            <p className="auth-subtitle">Please enter the 6-digit OTP code sent to your email ID.</p>

                            <form onSubmit={handleVerifyOtp}>
                                <div className="form-group">
                                    <label>6-Digit OTP Code</label>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        placeholder="Enter OTP"
                                        value={otpCode}
                                        onChange={(e) => setOtpCode(e.target.value)}
                                        required
                                        className="forgot-password-otp-input"
                                    />
                                </div>

                                <button type="submit" className="auth-btn" disabled={loading}>
                                    {loading ? "Verifying..." : "Verify OTP"}
                                </button>
                            </form>
                        </motion.div>
                    )}

                    {stage === "reset" && (
                        <motion.div
                            key="reset-stage"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                        >
                            <h2 className="auth-title">Enter New Password</h2>
                            <p className="auth-subtitle">Configure your new account password below.</p>

                            <form onSubmit={handleResetPassword}>
                                <div className="form-group">
                                    <label>New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {passTouched && (
                                        <div className="password-meter-container forgot-password-password-meter">
                                            <div className="strength-bar-bg">
                                                <div className={`strength-bar-fill ${passStrength === 1 ? 'strength-weak' : passStrength === 2 ? 'strength-medium' : passStrength === 3 ? 'strength-strong' : ''}`}></div>
                                            </div>
                                            <ul className="password-requirements">
                                                <li className={password.length >= 8 ? 'req-met' : 'req-unmet'}>
                                                    {password.length >= 8 ? <Check size={12} /> : <X size={12} />} At least 8 characters
                                                </li>
                                                <li className={/\d/.test(password) ? 'req-met' : 'req-unmet'}>
                                                    {/\d/.test(password) ? <Check size={12} /> : <X size={12} />} Contains a number
                                                </li>
                                                <li className={/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'req-met' : 'req-unmet'}>
                                                    {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <Check size={12} /> : <X size={12} />} Contains a special character
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label>Confirm Password</label>
                                    <input
                                        type="password"
                                        placeholder="Re-enter to confirm"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                    {confirmPassword.length > 0 && password !== confirmPassword && <span className="inline-error">Passwords do not match.</span>}
                                </div>

                                <button type="submit" className="auth-btn" disabled={loading}>
                                    {loading ? "Updating..." : "Update Password"}
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="auth-footer">
                    <Link to="/login">Back to Login</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;