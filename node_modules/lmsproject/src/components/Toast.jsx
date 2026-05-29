import React, { useEffect } from 'react';

function Toast({ type = 'success', message, duration, onClose }) {
  useEffect(() => {
    const timeout = duration ?? (type === 'success' ? 3000 : type === 'error' ? 5000 : 4000);
    const timer = setTimeout(() => onClose && onClose(), timeout);
    return () => clearTimeout(timer);
  }, [duration, onClose, type]);

  const style =
    type === 'success'
      ? 'bg-green-600'
      : type === 'error'
      ? 'bg-red-600'
      : type === 'warning'
      ? 'bg-amber-500'
      : 'bg-slate-700';

  const label = type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Warning';

  return (
    <div className={`fixed right-6 top-6 z-50 w-full max-w-sm rounded-2xl p-4 text-white shadow-2xl ${style}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">{label}</div>
          <p className="mt-2 text-sm leading-6">{message}</p>
        </div>
        <button onClick={onClose} className="rounded-full bg-white/10 px-2 py-1 text-sm text-white hover:bg-white/20">
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;
