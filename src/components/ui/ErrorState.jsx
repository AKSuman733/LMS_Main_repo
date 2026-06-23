
import { Button } from './Button';
import { AlertCircle } from 'lucide-react';

export const ErrorState = ({ title = 'Something went wrong', message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-[var(--radius-md)] border border-red-100">
      <div className="p-4 bg-red-50 rounded-full mb-4">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary">
          Retry
        </Button>
      )}
    </div>
  );
};
