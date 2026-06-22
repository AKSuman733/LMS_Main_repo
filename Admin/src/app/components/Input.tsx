import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';
import { IconCheck, IconX } from '@tabler/icons-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  valid?: boolean;
  icon?: ReactNode; // Left-aligned input prefix icon
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, valid, icon, className = '', disabled, ...props }, ref) => {
    
    // Determine the border, bg, and shadow classes based on status
    let statusClasses = 'border-[#1A2540] bg-[#111827] text-white focus:border-[#FF6B2B] focus:shadow-[0_0_0_3px_rgba(255,107,43,0.15)]';
    
    if (disabled) {
      statusClasses = 'border-[#1A2540]/60 bg-[#0A0F1E] text-[#4B5563] cursor-not-allowed';
    } else if (error) {
      statusClasses = 'border-[#EF4444] bg-[#EF4444]/10 text-white focus:border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]';
    } else if (valid) {
      statusClasses = 'border-[#00C97B] bg-[#00C97B]/10 text-white focus:border-[#00C97B] focus:shadow-[0_0_0_3px_rgba(0,201,123,0.15)]';
    }

    return (
      <div className="w-full text-left font-sans">
        {label && (
          <label className="block text-[13px] text-[#E5E7EB] mb-2 font-medium">
            {label}
            {props.required && <span className="text-[#EF4444] ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {/* Left Icon (Prefix Icon e.g. Form Field Icons inside input left) */}
          {icon && (
            <div className="absolute left-3.5 text-[#9CA3AF] flex items-center justify-center pointer-events-none">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            disabled={disabled}
            className={`w-full h-[44px] rounded-lg border text-[14px] outline-none transition-all duration-[150ms] placeholder-[#9CA3AF]
              ${icon ? 'pl-[38px]' : 'pl-4'} 
              ${(error || valid) ? 'pr-10' : 'pr-4'}
              ${!disabled ? 'hover:border-[#2E3A59] hover:bg-[#151D30]' : ''} 
              ${statusClasses} ${className}`}
            {...props}
          />
          
          {/* Right Status Icon */}
          {!disabled && (error || valid) && (
            <div className="absolute right-3.5 flex items-center justify-center pointer-events-none">
              {error ? (
                <IconX size={18} className="text-[#EF4444]" />
              ) : (
                <IconCheck size={18} className="text-[#22C55E]" />
              )}
            </div>
          )}
        </div>
        
        {/* Error message below the field */}
        {error && !disabled && (
          <p className="mt-1.5 text-[12px] text-[#EF4444] font-medium leading-normal">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
