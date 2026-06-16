import React, { useEffect, useRef } from 'react';

function Modal({ open, title, children, onClose, onConfirm, confirmLabel = 'Confirm', cancelLabel = 'Cancel', type = 'confirm', showCancel = true }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    modalRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-lg rounded-2xl bg-white text-slate-900 shadow-2xl overflow-hidden focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 id="modal-title" className="text-xl font-semibold">{title}</h2>
        </div>

        <div id="modal-description" className="px-6 py-5">{children}</div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          {showCancel && (
            <button type="button" onClick={onClose} className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              {cancelLabel}
            </button>
          )}
          {type !== 'alert' && (
            <button type="button" onClick={onConfirm} className="rounded-2xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500">
              {confirmLabel}
            </button>
          )}
          {type === 'alert' && (
            <button type="button" onClick={onClose} className="rounded-2xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-500">
              Acknowledge
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
