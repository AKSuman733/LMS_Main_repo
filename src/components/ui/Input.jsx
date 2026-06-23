import { forwardRef, useId } from 'react';

export const Input = forwardRef(({
  label,
  error,
  className = '',
  id: externalId,
  ...props
}, ref) => {
  const internalId = useId();
  const id = externalId || internalId;
  const errorId = `${id}-error`;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`block w-full rounded-[var(--radius-md)] border-gray-300 shadow-sm focus:border-[var(--color-brand-orange)] focus:ring-[var(--color-brand-orange)] sm:text-sm px-3 py-2 border min-h-[44px] ${error ? 'border-red-500' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
