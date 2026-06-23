import { useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from './ui/Button';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  type = 'default', // 'default', 'confirm', 'alert'
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Trap focus
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const handleTabKey = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement?.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement?.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div 
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg mx-auto flex flex-col max-h-[90vh] overflow-hidden animate-scale-in"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b dark:border-gray-700 shrink-0">
          <div className="flex items-center space-x-2">
            {type === 'alert' && <AlertTriangle className="w-6 h-6 text-amber-500" />}
            <h3 id="modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto text-gray-700 dark:text-gray-300">
          {children}
        </div>

        {/* Footer */}
        {(type === 'confirm' || type === 'alert') && (
          <div className="p-5 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end space-x-3 shrink-0">
            {type === 'confirm' && (
              <Button
                onClick={onClose}
                variant="outline"
              >
                {cancelText}
              </Button>
            )}
            <Button
              onClick={() => {
                if (onConfirm) onConfirm();
                else onClose();
              }}
              variant={isDestructive ? 'destructive' : 'primary'}
            >
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
