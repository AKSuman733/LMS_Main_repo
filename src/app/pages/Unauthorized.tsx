import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, LogOut, ArrowLeft } from 'lucide-react';

export function Unauthorized() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleGoBack = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0EFF8] p-6">
      <div className="bg-white rounded-[24px] shadow-xl p-8 max-w-md w-full text-center border border-[#E2E1F0]">
        <div className="mx-auto w-[120px] h-[120px] rounded-full bg-[#FEF2F2] flex items-center justify-center mb-6">
          <Lock size={80} className="text-[#EF4444]" />
        </div>
        
        <h1 className="text-[28px] font-bold text-[#1A1A2E] mb-2">
          Access Denied
        </h1>
        
        <p className="text-[16px] text-[#6B6B80] mb-8">
          You don't have permission to view this page.
        </p>

        <div className="space-y-3">
          {user ? (
            <button
              onClick={handleGoBack}
              className="w-full h-[48px] bg-[#2D1B69] text-white font-semibold text-[15px] rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#3D2B89] active:scale-[0.98] transition-all cursor-pointer"
            >
              <ArrowLeft size={16} />
              {user.role === 'admin' ? 'Go to Admin Panel' : 'Go to Dashboard'}
            </button>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="w-full h-[48px] bg-[#2D1B69] text-white font-semibold text-[15px] rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#3D2B89] active:scale-[0.98] transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="w-full h-[48px] bg-white border border-[#FCA5A5] text-[#EF4444] font-semibold text-[15px] rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#FEF2F2] active:scale-[0.98] transition-all cursor-pointer"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
