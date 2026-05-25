import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Globe, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Home from '../Home';
import '../../styles/Auth.css';
import '../../styles/Home.css';

const Login = () => {
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
    // Check for success message from registration
    if (location.state?.message) {
      toast.success(location.state.message);
      setMessage(location.state.message);
    }

    // Check for token and user in URL (from Google callback)
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userStr = params.get('user');
    const urlError = params.get('error');

    if (token && userStr) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', userStr);
      navigate('/dashboard');
    }

    if (urlError) {
      setError(urlError);
    }
  }, [location, navigate]);

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
      setTimer(300); // 5 minutes
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Failed to send OTP';
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
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      // Redirect based on role
      if (response.data.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
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
    <div className="auth-container">
      <div className="auth-background-wrapper">
        <Home />
      </div>
      <div className="auth-page">
        <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 20 }}>
          <Link to="/">
            <img src="/logo.png" alt="UptoSkills Logo" style={{ height: '40px', objectFit: 'contain' }} />
          </Link>
        </div>
        <Link to="/" className="back-btn" style={{ right: '40px', left: 'auto' }}>
          <ArrowLeft size={18} /> Back to Home
        </Link>
      <div className="auth-card card">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>{showOTP ? 'Enter the OTP sent to your email' : 'Login to continue your learning journey'}</p>
        </div>

        {error && <div className="auth-error" style={{background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.875rem'}}>{error}</div>}
        {message && <div className="auth-success" style={{color: '#059669', background: '#ecfdf5', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem'}}>{message}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address <span className="required-asterisk">*</span></label>
            <div className="input-with-icon">
              <Mail size={18} />
              <input 
                type="email" 
                className={emailValid === true ? 'input-success' : emailValid === false ? 'input-error' : ''}
                placeholder="name@company.com" 
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
            <div className="form-group">
              <div className="label-row">
                <label>Password <span className="required-asterisk">*</span></label>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
              <div className="input-with-icon password-field">
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
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <div className="label-row">
                <label>One-Time Password (OTP)</label>
                <span style={{fontSize: '0.8rem', color: timer > 0 ? '#4A90E2' : '#dc2626'}}>
                  {timer > 0 ? `Expires in ${formatTime(timer)}` : 'OTP Expired'}
                </span>
              </div>
              <div className="input-with-icon">
                <Lock size={18} />
                <input 
                  type="text" 
                  placeholder="123456" 
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required 
                />
              </div>
              {timer === 0 && (
                <button type="button" onClick={handleSendOTP} style={{background: 'none', border: 'none', color: '#4A90E2', cursor: 'pointer', fontSize: '0.8rem', marginTop: '0.5rem', padding: 0}}>
                  Resend OTP
                </button>
              )}
            </div>
          )}

          <button type="submit" className="btn btn-primary w-full" disabled={loading || (showOTP && timer === 0)}>
            {loading ? (
              <><Loader2 className="spinner" size={18} /> Loading...</>
            ) : (
              <>{showOTP ? 'Verify OTP' : 'Sign In'} <ArrowRight size={18} /></>
            )}
          </button>

          {!showOTP && (
            <button type="button" className="btn btn-outline w-full" onClick={handleSendOTP} disabled={loading} style={{marginTop: '1rem'}}>
              Sign In with OTP
            </button>
          )}

          {showOTP && (
            <button type="button" className="btn btn-outline w-full" onClick={() => setShowOTP(false)} style={{marginTop: '1rem'}}>
              Use Password Instead
            </button>
          )}
        </form>

        <div className="auth-divider">
          <span>Or continue with</span>
        </div>

        <div className="social-auth">
          <button className="btn btn-outline w-full">
            <Globe size={18} /> GitHub
          </button>
          <button className="btn btn-outline w-full" onClick={handleGoogleLogin}>
            <img src="https://www.svgrepo.com/show/355037/google.svg" width="18" alt="Google" /> Google
          </button>
        </div>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Create one for free</Link>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
