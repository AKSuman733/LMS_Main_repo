import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import "../styles/ConfirmationModal.css";

const ConfirmationModal = ({ isOpen, title, message, onConfirm, onCancel }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="confirmation-modal-overlay" onClick={onCancel}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="confirmation-modal-container"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="confirmation-modal-content">
                            <div className="confirmation-modal-icon-wrapper">
                                <AlertTriangle size={20} />
                            </div>
                            <div>
                                <h3 className="confirmation-modal-title">{title || "Are you sure?"}</h3>
                                <p className="confirmation-modal-message">{message}</p>
                            </div>
                        </div>

                        <div className="confirmation-modal-actions">
                            <button
                                onClick={onCancel}
                                className="confirmation-modal-btn-cancel"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="confirmation-modal-btn-confirm"
                            >
                                Confirm
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmationModal;
