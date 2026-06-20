import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../../components/Logo/Logo";
import axios from "axios";
import toast from "react-hot-toast";
import "../../styles/Auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const oauthSuccess = searchParams.get("oauth_success");
        const oauthError = searchParams.get("oauth_error");
        const userParam = searchParams.get("user");

        if (oauthSuccess === "true" && userParam) {
            try {
                const userObj = JSON.parse(decodeURIComponent(userParam));
                
                if (userObj.role !== "admin") {
                    toast.error("Access denied. Admin portal only!");
                    setSearchParams({});
                    return;
                }
                
                login(userObj);
                toast.success(`Welcome, Admin ${userObj.fullName || "User"}!`);
                window.location.href = "/";
            } catch (err) {
                toast.error("Failed to parse OAuth admin profile.");
            }
        } else if (oauthError) {
            toast.error(`Authentication failed: ${decodeURIComponent(oauthError)}`);
            setSearchParams({});
        }
    }, [searchParams, login, navigate, setSearchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            
            if (res.data.user.role !== "admin") {
                toast.error("Access denied. Admin portal only!");
                setLoading(false);
                return;
            }

            login(res.data.user);
            toast.success(`Welcome, Admin ${res.data.user.fullName || "User"}!`);
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.error || "Invalid credentials!");
            setLoading(false);
        }
    };

    const handleOAuthLogin = (provider) => {
        const providerLower = provider.toLowerCase();
        window.location.href = `http://localhost:5000/api/auth/${providerLower}?portal=admin`;
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
                <h2 className="auth-title">Admin Console</h2>
                <p className="auth-subtitle">Configure UptoSkills platform courses, instructors, and many more...</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="admin-login-email">Email Address</label>
                        <input 
                            type="email" 
                            id="admin-login-email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder="Enter admin email" 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="admin-login-password">Password</label>
                        <input 
                            type="password" 
                            id="admin-login-password"
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Enter password" 
                        />
                    </div>
                    <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
                    
                    <motion.button 
                        type="submit" 
                        className="auth-btn"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.01 }}
                        whileTap={{ scale: loading ? 1 : 0.99 }}
                    >
                        {loading ? (
                            <span className="auth-spinner-container">
                                <svg className="spinner-inline" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="auth-spinner-svg-circle"></circle>
                                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="auth-spinner-svg-path"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : "Log In as Admin"}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
