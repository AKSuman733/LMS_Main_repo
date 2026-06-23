import { useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { ToastContext } from '../contexts/ToastContext';

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(({ type, message, duration }) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    let defaultDuration = 3000;
    if (type === 'error') defaultDuration = 5000;
    if (type === 'warning') defaultDuration = 4000;

    setToasts((prev) => [...prev, { id, type, message, duration: duration || defaultDuration }]);

    setTimeout(() => {
      removeToast(id);
    }, duration || defaultDuration);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none" aria-live="assertive">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-4 rounded-lg shadow-lg border w-80 transform transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 animate-slide-in-right
              ${toast.type === 'success' ? 'border-green-500' : ''}
              ${toast.type === 'error' ? 'border-red-500' : ''}
              ${toast.type === 'warning' ? 'border-amber-500' : ''}
              ${toast.type === 'info' ? 'border-brand-orange' : ''}
            `}
            role="alert"
          >
            <div className="flex-shrink-0 mt-0.5 mr-3">
              {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
              {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-brand-orange" />}
            </div>
            <div className="flex-1 text-sm font-medium text-gray-900 dark:text-gray-100">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
