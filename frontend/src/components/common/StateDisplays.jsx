import React from 'react';
import './StateDisplays.css';

export const EmptyState = ({ icon, title, message, actionText, onAction }) => {
  return (
    <div className="state-display empty-state">
      <div className="state-icon">{icon}</div>
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
      {actionText && onAction && (
        <button className="state-action-btn primary" onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export const ErrorState = ({ icon, title, message, onRetry, supportLink }) => {
  return (
    <div className="state-display error-state">
      <div className="state-icon error">{icon}</div>
      <h3 className="state-title">{title}</h3>
      <p className="state-message">{message}</p>
      <div className="state-actions">
        {onRetry && (
          <button className="state-action-btn primary" onClick={onRetry}>
            Retry
          </button>
        )}
        {supportLink && (
          <a href={supportLink} className="state-action-link">
            Contact Support
          </a>
        )}
      </div>
    </div>
  );
};
