import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  fullWidth?: boolean;
}

export function Button({ variant = 'primary', children, fullWidth, className = '', ...props }: ButtonProps) {
  const baseStyles = 'h-[48px] px-6 rounded-[10px] text-[14px] font-medium transition-all flex items-center justify-center gap-2';

  const variantStyles = {
    primary: 'bg-[#2D1B69] text-[#BBFF00] hover:bg-[#3D2879]',
    secondary: 'bg-white text-[#2D1B69] border border-[#2D1B69] hover:bg-[#F7F6F3]',
    ghost: 'bg-transparent text-[#2D1B69] hover:underline',
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
