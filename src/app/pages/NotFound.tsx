import React from 'react';
import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0EFF8] p-6">
      <div className="bg-white rounded-[24px] shadow-xl p-8 max-w-md w-full text-center border border-[#E2E1F0]">
        <h1 className="text-[72px] font-extrabold text-[#2D1B69] mb-2 leading-none">404</h1>
        <h2 className="text-[24px] font-bold text-[#1A1A2E] mb-4">Page Not Found</h2>
        <p className="text-[15px] text-[#6B6B80] mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full h-[48px] bg-[#2D1B69] text-[#BBFF00] font-semibold text-[15px] rounded-[10px] flex items-center justify-center gap-2 hover:bg-[#3D2B89] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Home size={18} />
          Go to Home
        </button>
      </div>
    </div>
  );
}
