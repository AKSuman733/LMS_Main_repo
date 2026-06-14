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
      {/* <div className="modal-box"> */}
        {/* <div className="modal-header"> */}
          {/* <h2>{title}</h2> */}

          {/* <button onClick={onClose}>
            ✕
          </button>
        </div> */}

        <div className="modal-body">
          {children}
        </div>
      </div>
    // </div>
  );
}
