
import { Button } from './Button';
import { Inbox } from 'lucide-react';

export const EmptyState = ({ title, description, actionText, onAction, icon: Icon = Inbox }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-[var(--radius-md)] border border-dashed border-gray-300">
      <div className="p-4 bg-gray-50 rounded-full mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionText}
        </Button>
      )}
    </div>
  );
};
