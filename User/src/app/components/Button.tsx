import { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconLoader2 } from '@tabler/icons-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'icon' | 'success';
  children?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  fullWidth,
  loading = false,
  leftIcon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  
  // Base structural classes
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 ease-out select-none outline-none';
  
  // Variant styles representing specifications
  const variantStyles = {
    primary: `h-[44px] px-5 rounded-lg border-none text-white bg-[#FF6B2B] shadow-[0_2px_4px_rgba(255,107,43,0.25)] cursor-pointer
      hover:bg-[#E05315] hover:shadow-[0_6px_16px_rgba(255,107,43,0.35)]
      focus-visible:bg-[#E05315] focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2
      active:scale-[0.97] active:duration-100`,
      
    secondary: `h-[44px] px-5 rounded-lg border-2 border-white/40 text-white bg-transparent cursor-pointer
      hover:bg-[#FF6B2B] hover:border-[#FF6B2B] hover:shadow-[0_4px_12px_rgba(255,107,43,0.2)]
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2
      active:scale-[0.97] active:duration-100`,
      
    ghost: `h-[44px] px-5 rounded-lg border border-white/10 text-gray-300 bg-transparent cursor-pointer
      hover:bg-white/5 hover:text-white
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2
      active:scale-[0.97] active:duration-100`,
      
    danger: `h-[44px] px-5 rounded-lg border-2 border-[#EF4444] text-[#EF4444] bg-transparent cursor-pointer
      hover:bg-[#EF4444]/10
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2
      active:scale-[0.97] active:duration-100`,
      
    success: `h-[44px] px-5 rounded-lg border-none text-[#0A0F1E] bg-[#00C97B] font-bold cursor-pointer
      hover:bg-[#00E88A] hover:shadow-[0_4px_12px_rgba(0,201,123,0.2)]
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00C97B] focus-visible:ring-offset-2
      active:scale-[0.97] active:duration-100`,
      
    icon: `w-9 h-9 rounded-full border-none bg-white/5 text-gray-300 cursor-pointer
      hover:bg-[#FF6B2B]/20 hover:text-[#FF6B2B]
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2B] focus-visible:ring-offset-2
      active:scale-[0.95] active:duration-100`
  };

  // State modifiers
  const disabledStyles = variant === 'secondary' 
    ? 'border-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed opacity-60 pointer-events-none shadow-none bg-transparent'
    : variant === 'icon'
    ? 'bg-[#E2E8F0]/50 text-[#A0AEC0] cursor-not-allowed opacity-50 pointer-events-none'
    : 'bg-[#E2E8F0] text-[#A0AEC0] cursor-not-allowed opacity-60 pointer-events-none shadow-none';

  const loadingStyles = variant === 'primary' 
    ? 'bg-[#FF6B35]/80 pointer-events-none cursor-not-allowed shadow-none opacity-80'
    : 'pointer-events-none cursor-not-allowed opacity-80';

  const widthClass = fullWidth ? 'w-full' : '';

  // Determine current classes
  let computedClasses = `${baseStyles} ${variantStyles[variant]} ${widthClass}`;
  
  if (disabled || loading) {
    // Remove hover/active rules by resetting active classes, append custom state modifier
    computedClasses = `${baseStyles} ${widthClass} ${disabled ? disabledStyles : loadingStyles}`;
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${computedClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <IconLoader2 size={variant === 'icon' ? 18 : 16} className="animate-spinner" />
          {variant !== 'icon' && <span>Loading...</span>}
        </>
      ) : (
        <>
          {leftIcon && !loading && leftIcon}
          {children}
        </>
      )}
    </button>
  );
}
