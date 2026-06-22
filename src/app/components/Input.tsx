import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-[13px] text-[#6B6B80] mb-2 font-medium">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`w-full h-[48px] px-4 bg-white border rounded-[10px] text-[16px] outline-none transition-all ${
              error
                ? 'border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
                : 'border-[#E2E1F0] focus:border-[#2D1B69] focus:shadow-[0_0_0_3px_rgba(45,27,105,0.1)]'
            } ${icon ? 'pr-12' : ''} ${className}`}
            {...props}
          />
          {icon && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#2D1B69]">
              {icon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-[13px] text-[#EF4444]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
