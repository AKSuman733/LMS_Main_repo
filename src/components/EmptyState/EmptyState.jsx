import "./EmptyState.css";

export default function EmptyState({
  title,
  message,
  buttonText
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        📚
      </div>

      <h2>{title}</h2>

      <p>{message}</p>

      <button>
        {buttonText}
      </button>

    </div>
  );
}