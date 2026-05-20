import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Eye, EyeOff, User, Mail, Lock, GraduationCap, Presentation, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type Role = 'student' | 'instructor';

export function Register() {
  const [role, setRole] = useState<Role>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const getPasswordStrength = (pass: string): number => {
    if (!pass) return 0;
    let score = 1;
    if (pass.length >= 6) score = 2;
    if (pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) score = 3;
    if (pass.length >= 10 && /[^A-Za-z0-9]/.test(pass)) score = 4;
    return score;
  };

  const strength = getPasswordStrength(formData.password);
  const strengthColors = ['#EF4444', '#F97316', '#EAB308', '#2D1B69'];
  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong ✓'];

  const passwordsMatch = formData.confirmPassword === '' || formData.password === formData.confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch || !formData.agreeToTerms) return;

    setIsLoading(true);

    // Mock submission latency
    setTimeout(() => {
      const name = formData.fullName || 'User';
      const avatars = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
      ];
      const avatar = avatars[name.charCodeAt(0) % avatars.length];
      
      // Keep state locally
      setUser({ name, email: formData.email, avatar });
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Indigo Gradient */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#2D1B69] to-[#1A0F3C] p-12 flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-0">
          <span className="text-[20px] font-bold text-white">Learnify</span>
          <div className="w-[6px] h-[6px] rounded-full bg-[#BBFF00] ml-[2px]"></div>
        </div>

        {/* Center Quote */}
        <div className="max-w-md">
          <blockquote className="text-[26px] text-white italic font-light leading-[1.4] max-w-[320px] mb-8">
            "Start learning today. It's completely free."
          </blockquote>

          {/* Testimonial Card */}
          <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-[16px] p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=32&h=32&q=80"
                  alt="Learner"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=32&h=32&q=80"
                  alt="Learner"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=32&h=32&q=80"
                  alt="Learner"
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              </div>
              <span className="text-white font-bold text-[14px]">Join 1.3M+ learners</span>
            </div>
            
            <div className="flex gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#F59E0B] text-[14px]">★</span>
              ))}
            </div>
            
            <p className="text-white/80 text-[13px] leading-relaxed">
              "Learnify transformed my career. The courses are practical and the instructors are world-class."
            </p>
          </div>
        </div>

        {/* Bottom badges */}
        <div className="flex gap-3 flex-wrap">
          <div className="px-4 py-2 rounded-[8px] border border-white/40 text-white text-[12px] font-medium bg-white/5">
            120+ Free Courses
          </div>
          <div className="px-4 py-2 rounded-[8px] border border-white/40 text-white text-[12px] font-medium bg-white/5">
            Expert Instructors
          </div>
          <div className="px-4 py-2 rounded-[8px] border border-white/40 text-white text-[12px] font-medium bg-white/5">
            Get Certified Free
          </div>
        </div>
      </div>

      {/* Right Panel - Form or Success state */}
      <div className="flex-1 bg-white flex items-center justify-center p-6">
        {isSubmitted ? (
          /* SUCCESS STATE */
          <div className="w-full max-w-[420px] flex flex-col items-center text-center py-8">
            <div className="w-[80px] h-[80px] rounded-full bg-[#2D1B69] flex items-center justify-center text-white mb-6 animate-scale-in shadow-lg">
              <Check size={40} strokeWidth={3} className="text-[#BBFF00]" />
            </div>
            <h2 className="text-[28px] font-bold text-[#1A1A2E] mb-2 leading-tight">
              Account created!
            </h2>
            <p className="text-[15px] text-[#6B6B80] mb-8 max-w-[320px]">
              Check your email to verify your account.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full h-[48px] bg-[#2D1B69] text-[#BBFF00] font-semibold text-[15px] rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#3D2B89] active:scale-[0.98] transition-all cursor-pointer shadow-md"
            >
              Go to Dashboard <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* REGISTRATION FORM */
          <div className="w-full max-w-[420px] flex flex-col justify-center py-8">
            {/* Header */}
            <div className="mb-[28px]">
              <h1 className="text-[32px] font-bold text-[#1A1A2E] mb-2 leading-tight">
                Create your account
              </h1>
              <p className="text-[15px] text-[#6B6B80]">
                Free forever. No credit card required.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selector */}
              <div className="flex gap-[10px] w-full mb-5">
                {/* Student Card */}
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`flex-1 flex flex-col items-start p-4 rounded-[12px] border text-left transition-all cursor-pointer ${
                    role === 'student'
                      ? 'border-2 border-[#2D1B69] bg-[#EDE9FF] text-[#2D1B69]'
                      : 'border-[#E2E1F0] bg-white text-[#6B6B80] hover:bg-[#F7F6F3]'
                  }`}
                >
                  <GraduationCap 
                    size={24} 
                    className={`mb-2 transition-colors ${role === 'student' ? 'text-[#2D1B69]' : 'text-[#6B6B80]'}`} 
                  />
                  <span className={`text-[14px] font-bold block mb-0.5 ${role === 'student' ? 'text-[#2D1B69]' : 'text-[#1A1A2E]'}`}>
                    I'm a Student
                  </span>
                  <span className="text-[12px] text-[#6B6B80]">Learn new skills</span>
                </button>

                {/* Instructor Card */}
                <button
                  type="button"
                  onClick={() => setRole('instructor')}
                  className={`flex-1 flex flex-col items-start p-4 rounded-[12px] border text-left transition-all cursor-pointer ${
                    role === 'instructor'
                      ? 'border-2 border-[#2D1B69] bg-[#EDE9FF] text-[#2D1B69]'
                      : 'border-[#E2E1F0] bg-white text-[#6B6B80] hover:bg-[#F7F6F3]'
                  }`}
                >
                  <Presentation 
                    size={24} 
                    className={`mb-2 transition-colors ${role === 'instructor' ? 'text-[#2D1B69]' : 'text-[#6B6B80]'}`} 
                  />
                  <span className={`text-[14px] font-bold block mb-0.5 ${role === 'instructor' ? 'text-[#2D1B69]' : 'text-[#1A1A2E]'}`}>
                    I'm an Instructor
                  </span>
                  <span className="text-[12px] text-[#6B6B80]">Share knowledge</span>
                </button>
              </div>

              {/* Full Name field */}
              <div className="flex flex-col w-full">
                <label className="text-[13px] text-[#6B6B80] mb-2 font-medium">
                  Full name
                </label>
                <div className="relative flex items-center rounded-[10px] border border-[#E2E1F0] bg-white transition-all focus-within:border-[#2D1B69] focus-within:ring-3 focus-within:ring-[#2D1B69]/12">
                  <div className="absolute left-4 text-[#2D1B69]">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full h-[48px] pl-11 pr-4 bg-transparent outline-none text-[14px] text-[#1A1A2E] placeholder-[#6B6B80] font-medium"
                    required
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="flex flex-col w-full">
                <label className="text-[13px] text-[#6B6B80] mb-2 font-medium">
                  Email address
                </label>
                <div className="relative flex items-center rounded-[10px] border border-[#E2E1F0] bg-white transition-all focus-within:border-[#2D1B69] focus-within:ring-3 focus-within:ring-[#2D1B69]/12">
                  <div className="absolute left-4 text-[#2D1B69]">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-[48px] pl-11 pr-4 bg-transparent outline-none text-[14px] text-[#1A1A2E] placeholder-[#6B6B80] font-medium"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="flex flex-col w-full">
                <label className="text-[13px] text-[#6B6B80] mb-2 font-medium">
                  Password
                </label>
                <div className="relative flex items-center rounded-[10px] border border-[#E2E1F0] bg-white transition-all focus-within:border-[#2D1B69] focus-within:ring-3 focus-within:ring-[#2D1B69]/12">
                  <div className="absolute left-4 text-[#2D1B69]">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-[48px] pl-11 pr-12 bg-transparent outline-none text-[14px] text-[#1A1A2E] placeholder-[#6B6B80] font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-[#6B6B80] hover:text-[#2D1B69] transition-colors focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {formData.password && (
                  <div className="mt-2.5">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[11px] text-[#6B6B80] font-semibold uppercase tracking-wider">Security Strength</span>
                      <span className="text-[12px] font-bold" style={{ color: strengthColors[strength - 1] }}>
                        {strengthLabels[strength - 1]}
                      </span>
                    </div>
                    <div className="flex gap-[6px] h-[4px] w-full rounded-[8px] overflow-hidden bg-[#E2E1F0]">
                      {[1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-[8px] transition-all duration-300"
                          style={{
                            backgroundColor: index <= strength ? strengthColors[strength - 1] : 'transparent',
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="flex flex-col w-full">
                <label className="text-[13px] text-[#6B6B80] mb-2 font-medium">
                  Confirm Password
                </label>
                <div className={`relative flex items-center rounded-[10px] border bg-white transition-all focus-within:ring-3 ${
                  passwordsMatch
                    ? 'border-[#E2E1F0] focus-within:border-[#2D1B69] focus-within:ring-[#2D1B69]/12'
                    : 'border-[#EF4444] focus-within:border-[#EF4444] focus-within:ring-[#EF4444]/12'
                }`}>
                  <div className="absolute left-4 text-[#2D1B69]">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full h-[48px] pl-11 pr-12 bg-transparent outline-none text-[14px] text-[#1A1A2E] placeholder-[#6B6B80] font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 text-[#6B6B80] hover:text-[#2D1B69] transition-colors focus:outline-none cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {!passwordsMatch && (
                  <p className="mt-1.5 text-[12px] text-[#EF4444] font-semibold">
                    Passwords do not match
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <div className="relative flex items-center h-5">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                    className="w-4 h-4 rounded border-[#E2E1F0] text-[#2D1B69] focus:ring-[#2D1B69] focus:ring-offset-0 accent-[#2D1B69] cursor-pointer"
                    required
                  />
                </div>
                <label htmlFor="terms" className="text-[14px] text-[#6B6B80] leading-normal select-none">
                  I agree to the{' '}
                  <a href="#" className="text-[#2D1B69] font-semibold hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#2D1B69] font-semibold hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Create Account Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading || !passwordsMatch || !formData.agreeToTerms}
                  className="w-full h-[48px] bg-[#2D1B69] text-[#BBFF00] font-semibold text-[15px] rounded-[10px] border-0 flex items-center justify-center gap-2 hover:bg-[#3D2B89] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-85"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5 text-[#BBFF00]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Create account →'
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2E1F0]"></div>
                </div>
                <div className="relative px-4 bg-white text-[13px] text-[#6B6B80] font-medium">
                  or
                </div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="w-full h-[48px] flex items-center justify-center gap-3 bg-white border border-[#E2E1F0] rounded-[10px] text-[14px] text-[#1A1A2E] font-medium hover:bg-[#F7F6F3] transition-colors cursor-pointer"
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

            {/* Bottom Link */}
            <p className="mt-8 text-center text-[14px] text-[#6B6B80]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2D1B69] font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
