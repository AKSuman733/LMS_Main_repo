import React, { useEffect } from 'react';
import './Modal.css';

/**
 * Base Modal Component
 */
export const BaseModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className = '' 
}) => {
  useEffect(() => {
    // Prevent background scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal-content ${className}`}>
        {(title || onClose) && (
          <div className="modal-header">
            {title && <h3>{title}</h3>}
            {onClose && (
              <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
                &times;
              </button>
            )}
          </div>
        )}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

/**
 * Confirmation Modal
 * "Are you sure?" with Cancel/Confirm buttons
 */
export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDanger = false
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title}>
      <p>{message}</p>
      <div className="modal-footer">
        <button className="btn btn-outline" onClick={onClose}>
          {cancelText}
        </button>
        <button 
          className={`btn ${isDanger ? 'btn-danger' : 'btn-primary'}`} 
          onClick={() => {
            onConfirm();
            onClose();
          }}
          style={isDanger ? { backgroundColor: 'var(--error-color)', color: 'white' } : {}}
        >
          {confirmText}
        </button>
      </div>
    </BaseModal>
  );
};

/**
 * Alert Modal
 * Warning icon + critical message + [Acknowledge] button
 */
export const AlertModal = ({
  isOpen,
  onClose,
  title = 'Alert',
  message,
  buttonText = 'Acknowledge',
  icon = '⚠️'
}) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="modal-icon warning">{icon}</div>
      <h3 style={{ textAlign: 'center', marginBottom: '12px' }}>{title}</h3>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>{message}</p>
      <div className="modal-footer alert-footer">
        <button className="btn btn-primary" onClick={onClose} style={{ width: '100%' }}>
          {buttonText}
        </button>
      </div>
    </BaseModal>
  );
};

/**
 * Form Modal
 * Inline form for quick tasks (e.g., invite new user, add tag)
 */
export const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel'
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} className="form-modal">
      <form onSubmit={handleSubmit}>
        {children}
        <div className="modal-footer" style={{ marginTop: '20px' }}>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            {cancelText}
          </button>
          <button type="submit" className="btn btn-primary">
            {submitText}
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default {
  BaseModal,
  ConfirmationModal,
  AlertModal,
  FormModal
};
