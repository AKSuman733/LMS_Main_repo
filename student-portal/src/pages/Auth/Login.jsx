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
                login(userObj);
                toast.success(`Welcome, ${userObj.fullName || "Student"}!`);
                window.location.href = "/courses";
            } catch (err) {
                toast.error("Failed to parse OAuth user profile.");
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
            login(res.data.user);
            toast.success(`Welcome, ${res.data.user.fullName || "Student"}!`);
            navigate("/courses");
        } catch (err) {
            toast.error(err.response?.data?.error || "Invalid credentials!");
            setLoading(false);
        }
    };

    const handleOAuthLogin = (provider) => {
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
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Continue your journey with world-class celebrity mentors</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            placeholder="Enter your email" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            placeholder="Enter your password" 
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
                        ) : "Log In"}
                    </motion.button>
                </form>

                <div className="oauth-divider">Or login with</div>

                <div className="oauth-grid">
                    <button 
                        type="button" 
                        className="oauth-btn-premium"
                        onClick={() => handleOAuthLogin("Google")}
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
                        onClick={() => handleOAuthLogin("GitHub")}
                    >
                        <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                        GitHub
                    </button>
                </div>

                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;