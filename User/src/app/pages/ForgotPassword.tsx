import { useState } from 'react';
import { Link } from 'react-router';
import { Check } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(60);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F7F6F3]">
      <div className="w-full max-w-[480px] bg-white rounded-[20px] p-8 shadow-[0_2px_16px_rgba(45,27,105,0.06)]">
        {!submitted ? (
          <>
            <div className="mb-8">
              <h1 className="text-[32px] font-bold text-[#1A1A2E] mb-2">
                Reset your password
              </h1>
              <p className="text-[16px] text-[#6B6B80]">
                Enter your email address and we'll send you a link to reset your password
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                label="Email address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" fullWidth>
                Send reset link
              </Button>
            </form>

            <p className="mt-6 text-center text-[14px] text-[#6B6B80]">
              Remember your password?{' '}
              <Link to="/login" className="text-[#2D1B69] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#2D1B69] flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Check size={32} className="text-white" />
            </div>
            <h1 className="text-[32px] font-bold text-[#1A1A2E] mb-2">
              Check your inbox
            </h1>
            <p className="text-[16px] text-[#6B6B80] mb-6">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="text-[14px] text-[#6B6B80]">
              Didn't receive the email?{' '}
              {countdown > 0 ? (
                <span className="text-[#6B6B80]">
                  Resend in 0:{countdown.toString().padStart(2, '0')}
                </span>
              ) : (
                <button
                  onClick={() => {
                    setCountdown(60);
                    const timer = setInterval(() => {
                      setCountdown((prev) => {
                        if (prev <= 1) {
                          clearInterval(timer);
                          return 0;
                        }
                        return prev - 1;
                      });
                    }, 1000);
                  }}
                  className="text-[#2D1B69] font-medium hover:underline"
                >
                  Resend
                </button>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
