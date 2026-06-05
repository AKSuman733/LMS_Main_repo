import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Globe, Eye, EyeOff, ArrowLeft, GraduationCap, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import '../../styles/Auth.css';
import studentSideImg from '../../assets/roles/student.png';

const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [timer, setTimer] = useState(0);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (val.length > 0) {
      setEmailValid(validateEmail(val));
    } else {
      setEmailValid(null);
    }
  };

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
      setMessage(location.state.message);
    }
    // Read ?error= query param set by Axios interceptor on session expiry
    const urlError = searchParams.get('error');
    if (urlError) {
      setError(urlError);
      toast.error(urlError);
    }
  }, [location]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5001/api/auth/google';
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (emailValid === false || !email) {
      setError('Please enter a valid email first');
      toast.error('Please enter a valid email first');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5001/api/auth/send-otp', { email });
      setMessage(response.data.message);
      toast.success(response.data.message);
      setShowOTP(true);
      setTimer(300);
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to send OTP';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailValid === false) {
      toast.error('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      let response;
      if (showOTP) {
        response = await axios.post('http://localhost:5001/api/auth/verify-otp', { email, otp });
      } else {
        response = await axios.post('http://localhost:5001/api/auth/login', { email, password });
      }

      if (response.data.user.role !== 'student') {
        const errorMsg = 'Access denied. This login is for students only.';
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      // err.response?.data?.error covers Axios HTTP errors
      // err.message covers manually thrown errors (e.g. role mismatch)
      const errMsg = err.response?.data?.error || err.message || 'Login failed';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="split-login-container">
      <div className="login-image-side student-theme">
        <img src={studentSideImg} alt="Student Portal" className="side-img" />
        <div className="side-overlay">
          <div className="side-content">
            <GraduationCap size={48} className="side-icon" />
            <h1>Student Hub</h1>
            <p>Access your personalized learning dashboard, tracks your courses, and achieve your certification goals.</p>
          </div>
        </div>
      </div>

      <div className="login-form-side">
        <div className="form-container-premium">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <Link to="/">
              <img src="/logo.png" alt="UptoSkills Logo" style={{ height: '36px', objectFit: 'contain' }} />
            </Link>
            <Link to="/" className="back-btn-simple" style={{ marginBottom: 0 }}>
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>

          <div className="login-header-premium">
            <h2>Welcome Back!</h2>
            <p>{showOTP ? 'Check your email for the code' : 'Enter your details to start learning'}</p>
          </div>

          {error && <div className="auth-error-premium">{error}</div>}
          {message && <div className="auth-success-premium">{message}</div>}

          <form onSubmit={handleSubmit} className="auth-form-premium">
            <div className="form-group-premium">
              <label>Email Address <span className="required-asterisk">*</span></label>
              <div className="input-premium-wrapper">
                <Mail size={18} />
                <input 
                  type="email" 
                  className={emailValid === true ? 'input-success' : emailValid === false ? 'input-error' : ''}
                  placeholder="you@example.com" 
                  value={email}
                  onChange={handleEmailChange}
                  required 
                  disabled={showOTP}
                />
                {emailValid === true && <CheckCircle2 className="validation-icon success" size={18} />}
                {emailValid === false && <XCircle className="validation-icon error" size={18} />}
              </div>
              {emailValid === false && <span className="field-error-text">Please enter a valid email</span>}
            </div>

            {!showOTP ? (
              <div className="form-group-premium">
                <div className="label-row-premium">
                  <label>Password <span className="required-asterisk">*</span></label>
                  <Link to="/forgot-password">Forgot password?</Link>
                </div>
                <div className="input-premium-wrapper password-field">
                  <Lock size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button 
                    type="button" 
                    className="password-toggle-premium"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="form-group-premium">
                <div className="label-row-premium">
                  <label>One-Time Password</label>
                  <span className={timer > 0 ? 'timer-active' : 'timer-expired'}>
                    {timer > 0 ? `Expires in ${formatTime(timer)}` : 'Expired'}
                  </span>
                </div>
                <div className="input-premium-wrapper">
                  <Lock size={18} />
                  <input 
                    type="text" 
                    placeholder="6-digit code" 
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required 
                  />
                </div>
                {timer === 0 && (
                  <button type="button" onClick={handleSendOTP} className="resend-link">
                    Resend code
                  </button>
                )}
              </div>
            )}

            <button type="submit" className="submit-btn-premium student-btn" disabled={loading || (showOTP && timer === 0)}>
              {loading ? (
                <><Loader2 className="spinner" size={18} /> Loading...</>
              ) : (
                <>{showOTP ? 'Verify & Continue' : 'Sign In'} <ArrowRight size={18} /></>
              )}
            </button>

            {!showOTP && (
              <button type="button" className="secondary-btn-premium" onClick={handleSendOTP} disabled={loading}>
                Sign In with OTP
              </button>
            )}
          </form>

          <div className="auth-divider-premium">
            <span>Or continue with</span>
          </div>

          <div className="social-auth-premium">
            <button className="social-btn-premium">
              <img src="https://www.svgrepo.com/show/355037/google.svg" width="18" alt="Google" /> Google
            </button>
            <button className="social-btn-premium">
              <Globe size={18} /> GitHub
            </button>
          </div>

          <p className="auth-footer-premium">
            New to UptoSkills? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .split-login-container {
          display: flex;
          min-height: 100vh;
          background: var(--bg-color);
        }

        .login-image-side {
          flex: 1.2;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .side-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: scaleIn 20s infinite alternate;
        }

        .side-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(236, 72, 153, 0.3));
          display: flex;
          align-items: center;
          padding: 80px;
        }

        .student-theme .side-overlay {
          background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(99, 102, 241, 0.3));
        }

        .side-content {
          max-width: 500px;
          color: white;
          animation: fadeInLeft 0.8s ease-out;
        }

        .side-icon {
          color: #ec4899;
          margin-bottom: 24px;
        }

        .student-theme .side-icon {
          color: #6366f1;
        }

        .side-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        .side-content p {
          font-size: 1.2rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .login-form-side {
          flex: 0.8;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-color);
          padding: 40px;
          position: relative;
        }

        .form-container-premium {
          width: 100%;
          max-width: 380px;
        }

        .back-btn-simple {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          margin-bottom: 40px;
          transition: color 0.3s;
        }

        .back-btn-simple:hover {
          color: var(--primary-color);
        }

        .login-header-premium {
          margin-bottom: 30px;
        }

        .login-header-premium h2 {
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .login-header-premium p {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .auth-error-premium {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 0.95rem;
          border-left: 4px solid #ef4444;
        }

        .auth-success-premium {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 24px;
          font-size: 0.95rem;
          border-left: 4px solid #10b981;
        }

        .auth-form-premium {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group-premium {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-group-premium label {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9rem;
        }

        .input-premium-wrapper {
          position: relative;
        }

        .input-premium-wrapper svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
        }

        .input-premium-wrapper input {
          width: 100%;
          padding: 12px 16px 12px 44px;
          background: var(--surface-color-light);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          color: var(--text-primary);
          font-size: 0.95rem;
          transition: all 0.3s;
        }

        .input-premium-wrapper input::placeholder {
          color: var(--text-secondary);
        }

        .input-premium-wrapper input:focus {
          border-color: var(--primary-color);
          background: var(--surface-color);
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        }

        .input-premium-wrapper input.input-error { border-color: #ef4444; }
        .input-premium-wrapper input.input-success { border-color: #10b981; }
        .validation-icon { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); z-index: 5; }
        .validation-icon.error { color: #ef4444; }
        .validation-icon.success { color: #10b981; }
        .input-premium-wrapper.password-field input { padding-right: 48px; }
        .input-premium-wrapper.password-field .validation-icon { right: 40px; }
        .field-error-text { color: #ef4444; font-size: 0.8rem; margin-top: 4px; }
        .required-asterisk { color: #ef4444; margin-left: 4px; }
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .password-toggle-premium {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }

        .label-row-premium {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .label-row-premium a {
          font-size: 0.85rem;
          color: var(--primary-color);
        }

        .submit-btn-premium {
          background: var(--primary-gradient);
          color: white;
          padding: 12px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
          margin-top: 5px;
          box-shadow: 0 8px 16px rgba(139, 92, 246, 0.2);
        }

        .submit-btn-premium:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(139, 92, 246, 0.4);
        }

        .secondary-btn-premium {
          background: transparent;
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 10px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .secondary-btn-premium:hover {
          background: var(--surface-color-light);
        }

        .auth-divider-premium {
          margin: 20px 0;
          display: flex;
          align-items: center;
          color: var(--text-secondary);
          font-size: 0.8rem;
        }

        .auth-divider-premium::before, .auth-divider-premium::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--border-color);
        }

        .auth-divider-premium span {
          padding: 0 15px;
        }

        .social-auth-premium {
          display: flex;
          gap: 16px;
        }

        .social-btn-premium {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          background: var(--surface-color-light);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          color: var(--text-primary);
          font-weight: 600;
          transition: all 0.3s;
        }

        .social-btn-premium:hover {
          background: var(--border-color);
        }

        .auth-footer-premium {
          text-align: center;
          margin-top: 30px;
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .auth-footer-premium a {
          color: var(--primary-color);
          font-weight: 700;
        }

        .timer-active { color: var(--primary-color); font-size: 0.85rem; }
        .timer-expired { color: #ef4444; font-size: 0.85rem; }
        .resend-link { background: none; border: none; color: var(--primary-color); cursor: pointer; font-size: 0.85rem; padding: 0; text-align: left; }

        @keyframes scaleIn {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @media (max-width: 1024px) {
          .login-image-side { display: none; }
          .login-form-side { flex: 1; }
        }
      `}</style>
    </div>
  );
};

export default StudentLogin;
