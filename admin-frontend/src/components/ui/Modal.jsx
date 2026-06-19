import { AlertTriangle, X } from "lucide-react";
import { colors } from "../../constants/designTokens";

export function Modal({ open, title, children, onClose, footer }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close modal"
      />

      <div className="relative z-10 w-full max-w-2xl rounded-lg border border-white/10 bg-slate-950 p-4 text-white shadow-2xl">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div>{children}</div>

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}

export function ConfirmModal({
  open,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      footer={
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-lg border border-white/10 px-4 py-2 font-semibold text-slate-300"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg px-4 py-2 font-semibold text-white"
            style={{ backgroundColor: colors.error.base }}
          >
            {confirmLabel}
          </button>
        </div>
      }
    >
      <div className="flex gap-3 rounded-lg bg-red-500/10 p-4 text-red-100">
        <AlertTriangle className="shrink-0 text-red-300" size={22} />
        <p>{message}</p>
      </div>
    </Modal>
  );
}
