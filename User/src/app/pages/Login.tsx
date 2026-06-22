import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, Mail, Lock, AlertCircle, X, GraduationCap, Shield, Check, Info } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'admin'>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulated network request
    setTimeout(() => {
      // Mock validation
      if (role === 'admin') {
        if (email === 'admin@learnify.com' && password === 'admin123') {
          login({ name: 'Admin', email, role: 'admin' });
          setIsLoading(false);
          window.location.href = 'http://localhost:5174/admin';
        } else {
          setError("These credentials don't match the selected role.");
          setIsLoading(false);
        }
      } else if (role === 'student') {
        if (email === 'admin@learnify.com' && password === 'admin123') {
          setError("These credentials don't match the selected role.");
          setIsLoading(false);
          return;
        }

        if (!email.includes('@')) {
          setError('Invalid email or password.');
          setIsLoading(false);
          return;
        }

        const name = email.split('@')[0] || 'Alex';
        const avatars = [
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
        ];
        const avatar = avatars[name.charCodeAt(0) % avatars.length];
        login({ name, email, role: 'student', avatar });
        setIsLoading(false);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials for selected role.');
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-[#0A0F1E] text-white">
      {/* Left Panel - 40% Width (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[40%] bg-[#130D35] p-12 flex-col justify-between border-r border-[#1E2D45]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0 focus:outline-none">
          <span className="text-[20px] font-bold text-white tracking-tight">Learnify</span>
          <div className="w-[6px] h-[6px] rounded-full bg-[#FF6B2B] ml-[2px]"></div>
        </Link>

        {/* Center Quote & Testimonial */}
        <div className="max-w-md">
          <blockquote className="text-[26px] text-white italic font-light leading-[1.4] max-w-[320px] mb-8">
            "Your next breakthrough starts with one course."
          </blockquote>

          {/* Social Proof Testimonial Card */}
          <div className="bg-[#1A2540] border border-[#1E2D45] rounded-[12px] p-5 shadow-lg">
            <div className="flex items-center gap-3 mb-3.5">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=32&h=32&q=80"
                  alt="Learner"
                  className="w-8 h-8 rounded-full border border-[#1E2D45] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&h=32&q=80"
                  alt="Learner"
                  className="w-8 h-8 rounded-full border border-[#1E2D45] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32&q=80"
                  alt="Learner"
                  className="w-8 h-8 rounded-full border border-[#1E2D45] object-cover"
                />
              </div>
              <span className="text-white font-bold text-[14px]">Join 1.3M+ learners</span>
            </div>
            
            <div className="flex gap-0.5 mb-2.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#FF8C42] text-[14px]">★</span>
              ))}
            </div>
            
            <p className="text-[#9CA3AF] text-[13px] leading-relaxed">
              "Learnify transformed my career. The courses are practical and the instructors are world-class."
            </p>
          </div>
        </div>

        {/* Bottom badges */}
        <div className="flex gap-2.5 flex-wrap">
          <div className="px-4 py-2 rounded-full border border-[#1E2D45] text-[#9CA3AF] text-[12px] font-medium bg-[#111827]">
            120+ Free Courses
          </div>
          <div className="px-4 py-2 rounded-full border border-[#1E2D45] text-[#9CA3AF] text-[12px] font-medium bg-[#111827]">
            Expert Instructors
          </div>
          <div className="px-4 py-2 rounded-full border border-[#1E2D45] text-[#9CA3AF] text-[12px] font-medium bg-[#111827]">
            Get Certified Free
          </div>
        </div>
      </div>

      {/* Right Panel - 60% Width */}
      <div className="flex-1 bg-[#0A0F1E] flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px] flex flex-col justify-center py-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-[32px] font-bold text-white mb-2 leading-tight">
              Welcome back
            </h1>
            <p className="text-[15px] text-[#9CA3AF]">
              Continue your learning journey.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Alert State */}
            {error && (
              <div className="flex items-center justify-between p-3.5 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-[8px] text-[#EF4444] text-[14px] animate-slide-down">
                <div className="flex items-center gap-2">
                  <AlertCircle size={18} className="flex-shrink-0" />
                  <span className="font-semibold">{error}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setError(null)}
                  className="text-[#EF4444] hover:opacity-75 transition-opacity cursor-pointer border-none bg-transparent"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Email field */}
            <div className="flex flex-col w-full">
              <label className="text-[13px] text-[#9CA3AF] mb-2 font-medium">
                Email address
              </label>
              <div className="relative flex items-center rounded-[8px] border border-[#1E2D45] bg-[#111827] transition-all focus-within:border-[#FF6B2B] focus-within:shadow-[0_0_10px_rgba(255,107,43,0.15)]">
                <div className="absolute left-4 text-[#9CA3AF]">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[48px] pl-11 pr-4 bg-transparent outline-none text-[14px] text-white placeholder-[#9CA3AF] font-medium"
                  required
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col w-full">
              <label className="text-[13px] text-[#9CA3AF] mb-2 font-medium">
                Password
              </label>
              <div className="relative flex items-center rounded-[8px] border border-[#1E2D45] bg-[#111827] transition-all focus-within:border-[#FF6B2B] focus-within:shadow-[0_0_10px_rgba(255,107,43,0.15)]">
                <div className="absolute left-4 text-[#9CA3AF]">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-[48px] pl-11 pr-12 bg-transparent outline-none text-[14px] text-white placeholder-[#9CA3AF] font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#9CA3AF] hover:text-white transition-colors focus:outline-none cursor-pointer border-none bg-transparent"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="text-right mt-2">
                <Link
                  to="/forgot-password"
                  className="text-[13px] text-[#FF6B2B] font-semibold hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Role Selector UI */}
            <div className="flex flex-col gap-2 pt-1">
              <label className="text-[13px] text-[#9CA3AF] font-medium">
                Select your role
              </label>
              <div className="flex gap-3">
                {/* Student Card */}
                <div
                  onClick={() => setRole('student')}
                  className={`flex-1 p-3 rounded-[8px] cursor-pointer flex items-center gap-3 transition-all duration-150 border ${
                    role === 'student'
                      ? 'border-[#FF6B2B] bg-[#FF6B2B]/10 text-white'
                      : 'border-[#1E2D45] bg-[#111827] text-[#9CA3AF] hover:border-[#9CA3AF]/40'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      role === 'student' ? 'bg-[#FF6B2B] text-white' : 'bg-[#1A2540] text-[#9CA3AF]'
                    }`}
                  >
                    <GraduationCap size={18} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="font-bold text-[13px] leading-tight">Student</div>
                    <div className="text-[11px] text-[#9CA3AF] truncate">Access courses</div>
                  </div>
                  {role === 'student' && (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#FF6B2B] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Admin Card */}
                <div
                  onClick={() => setRole('admin')}
                  className={`flex-1 p-3 rounded-[8px] cursor-pointer flex items-center gap-3 transition-all duration-150 border ${
                    role === 'admin'
                      ? 'border-[#FF6B2B] bg-[#FF6B2B]/10 text-white'
                      : 'border-[#1E2D45] bg-[#111827] text-[#9CA3AF] hover:border-[#9CA3AF]/40'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      role === 'admin' ? 'bg-[#FF6B2B] text-white' : 'bg-[#1A2540] text-[#9CA3AF]'
                    }`}
                  >
                    <Shield size={18} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="font-bold text-[13px] leading-tight">Admin</div>
                    <div className="text-[11px] text-[#9CA3AF] truncate">Manage panel</div>
                  </div>
                  {role === 'admin' && (
                    <div className="w-[18px] h-[18px] rounded-full bg-[#FF6B2B] flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Admin credentials hint */}
            {role === 'admin' && (
              <div className="flex items-center gap-2 bg-[#1A2540] border border-[#1E2D45] rounded-[8px] p-3 text-[11px] text-[#9CA3AF]">
                <Info size={14} className="text-[#4F8EF7] flex-shrink-0" />
                <span>Demo admin: <strong>admin@learnify.com</strong> / <strong>admin123</strong></span>
              </div>
            )}

            {/* Sign in Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[48px] bg-[#FF6B2B] text-white font-bold text-[15px] rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#FF8C42] active:scale-[0.97] transition-all cursor-pointer border-none shadow-md disabled:opacity-50"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#1E2D45]"></div>
              </div>
              <div className="relative px-4 bg-[#0A0F1E] text-[13px] text-[#9CA3AF] font-medium">
                or
              </div>
            </div>

            {/* Google Button */}
            <button
              type="button"
              className="w-full h-[48px] flex items-center justify-center gap-3 bg-transparent border border-[#1E2D45] hover:border-white rounded-[8px] text-[14px] text-white font-semibold hover:bg-[#111827] active:scale-[0.97] transition-all cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 20 20" className="flex-shrink-0">
                <path
                  d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z"
                  fill="#4285F4"
                />
                <path
                  d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z"
                  fill="#34A853"
                />
                <path
                  d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z"
                  fill="#FBBC05"
                />
                <path
                  d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>

          {/* Create Account link */}
          <p className="mt-6 text-center text-[14px] text-[#9CA3AF]">
            New here?{' '}
            <Link to="/register" className="text-[#FF6B2B] font-bold hover:underline">
              Create a free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
