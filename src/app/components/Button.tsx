import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', children, fullWidth, className = '', ...props }: ButtonProps) {
  const baseStyles = 'h-[48px] px-6 rounded-[10px] text-[14px] font-medium transition-all duration-150 ease-out select-none outline-none flex items-center justify-center gap-2 active:scale-[0.97] active:duration-100';

  const variantStyles = {
    primary: 'bg-[#FF6B35] text-white hover:bg-[#E85520] active:bg-[#D04A1B] shadow-[0_2px_4px_rgba(255,107,53,0.3)]',
    secondary: 'bg-transparent text-[#00B5A5] border-2 border-[#00B5A5] hover:bg-[#E6F7F6] active:bg-[#DDF5F4] shadow-[0_2px_4px_rgba(0,181,165,0.3)]',
    ghost: 'bg-transparent text-[#4A5568] border border-[#E2E8F0] hover:bg-[#F1F5F9] active:bg-[#E2E8F0]',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
