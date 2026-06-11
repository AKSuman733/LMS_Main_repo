import { useState, useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Github, Loader2 } from "lucide-react";
import Logo from "../../components/Logo/Logo";
import toast from "react-hot-toast";
import axios from "axios";
import "../../styles/Auth.css";

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isEmailTouched = email.length > 0;

    const getPasswordStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;
        return strength;
    };

    const passStrength = getPasswordStrength(password);
    const passTouched = password.length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        if (passStrength < 2) {
            toast.error("Password is too weak. Please meet more requirements.");
            return;
        }

        setIsLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username: email,
                email,
                password,
                role: "student",
                fullName
            });
            login({ id: res.data.userId, email, fullName, role: "student", approved: true });
            toast.success("Account created successfully!");
            navigate("/dashboard");
        } catch (err) {
            toast.error(err.response?.data?.error || "Registration failed! Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuthSignup = (provider) => {
        const providerLower = provider.toLowerCase();
        window.location.href = `http://localhost:5000/api/auth/${providerLower}?portal=student`;
    };

    return (
        <div className="auth-container">
            <motion.div
                className="auth-box"
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="auth-logo-center">
                    <Logo size="large" />
                </div>
                <h2 className="auth-title">Join UptoSkills AI</h2>
                <p className="auth-subtitle">Build professional skills with celebrity masterclasses</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name <span className="required-asterisk">*</span></label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email Address <span className="required-asterisk">*</span></label>
                        <input
                            type="email"
                            className={isEmailTouched ? (isValidEmail(email) ? "input-valid" : "input-invalid") : ""}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="john@example.com"
                        />
                        {isEmailTouched && !isValidEmail(email) && <span className="inline-error">Please enter a valid email format.</span>}
                    </div>
                    <div className="form-group">
                        <label>Password <span className="required-asterisk">*</span></label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                        {passTouched && (
                            <div className="password-meter-container">
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
                        <label>Confirm Password <span className="required-asterisk">*</span></label>
                        <input
                            type="password"
                            className={confirmPassword.length > 0 && password !== confirmPassword ? "input-invalid" : ""}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                        {confirmPassword.length > 0 && password !== confirmPassword && <span className="inline-error">Passwords do not match.</span>}
                    </div>

                    <button type="submit" className="auth-btn" disabled={isLoading}>
                        {isLoading ? <><Loader2 className="spinner-inline animate-spin" size={16} /> Creating Account...</> : "Create Account"}
                    </button>
                </form>

                <div className="oauth-divider">Or register with</div>

                <div className="oauth-grid">
                    <button 
                        type="button" 
                        className="oauth-btn-premium"
                        onClick={() => handleOAuthSignup("Google")}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                        </svg>
                        Google
                    </button>
                    <button 
                        type="button" 
                        className="oauth-btn-premium"
                        onClick={() => handleOAuthSignup("GitHub")}
                    >
                        <Github size={18} />
                        GitHub
                    </button>
                </div>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;