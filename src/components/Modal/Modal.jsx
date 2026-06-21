import "./Modal.css";

export default function Modal({
  isOpen,
  onClose,
  title,
  children
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
        <div className="modal-body">
          {children}
        </div>
      </div>
  );
}
