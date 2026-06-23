import React from 'react';

const variants = {
  primary: 'bg-[var(--color-brand-orange)] text-white hover:bg-[var(--color-brand-orange-dark)]',
  secondary: 'bg-[var(--color-brand-teal)] text-white hover:bg-[var(--color-brand-teal-dark)]',
  outline: 'border-2 border-[var(--color-brand-orange)] text-[var(--color-brand-orange)] hover:bg-[var(--color-brand-orange)] hover:text-white',
  ghost: 'text-gray-600 hover:bg-gray-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm min-h-[36px]',
  md: 'px-4 py-2 min-h-[44px]',
  lg: 'px-6 py-3 text-lg min-h-[48px]',
  icon: 'p-2 min-h-[44px] min-w-[44px] flex items-center justify-center'
};

export const Button = React.forwardRef(({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  children,
  ...props
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-[var(--radius-md)] transition-colors focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
