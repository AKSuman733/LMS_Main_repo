import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Home from '../Home';
import '../../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/auth/forgot-password', { email });
      setMessage(res.data.message);
      toast.success(res.data.message);
      setStep(2);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Failed to send OTP';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5001/api/auth/reset-password', { 
        email, 
        otp, 
        newPassword 
      });
      setMessage(res.data.message);
      toast.success(res.data.message);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.message || 'Reset failed';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
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
        <Link to="/login" className="back-btn" style={{ right: '40px', left: 'auto' }}>
          <ArrowLeft size={18} /> Back to Login
        </Link>
        <div className="auth-card card">
          <div className="auth-header">
            <h2>Reset Password</h2>
            <p>{step === 1 ? 'Enter your email to receive a reset OTP' : 'Enter the OTP and your new password'}</p>
          </div>

          {error && <div className="auth-error">{error}</div>}
          {message && <div className="auth-success">{message}</div>}

          {step === 1 ? (
            <form onSubmit={handleRequestOTP} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} />
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset OTP'} <ArrowRight size={18} />
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="auth-form">
              <div className="form-group">
                <label>OTP Code</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input 
                    type="text" 
                    placeholder="123456" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} />
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'} <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
