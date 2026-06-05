import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../components/Logo/Logo";
import "../../styles/Auth.css";

const ForgotPassword = () => {
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
                
                <h2 className="auth-title">Reset Admin Password</h2>
                <p className="auth-subtitle forgot-password-subtitle">
                    🔒 Password self-reset is disabled for security. Please contact your super administrator to request a password reset for your account.
                </p>

                <div className="auth-footer forgot-password-footer">
                    <Link to="/login" className="auth-btn forgot-password-btn-login">
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
