import toast from 'react-hot-toast';

export const confirmAction = (message, onConfirm, confirmText = 'Confirm', confirmColor = '#ef4444') => {
  toast((t) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px' }}>
      <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>
        {message}
      </p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
        <button
          onClick={() => toast.dismiss(t.id)}
          style={{
            padding: '6px 12px',
            borderRadius: '8px',
            background: 'var(--surface-color-light)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.target.style.background = 'var(--border-color)'}
          onMouseOut={(e) => e.target.style.background = 'var(--surface-color-light)'}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
          style={{
            padding: '6px 14px',
            borderRadius: '8px',
            background: confirmColor,
            border: 'none',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: `0 4px 6px ${confirmColor}40`
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  ), {
    duration: 10000,
    position: 'top-center',
    style: {
      background: 'var(--surface-color)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      padding: '16px',
      minWidth: '320px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      color: 'var(--text-primary)',
      backdropFilter: 'blur(10px)'
    }
  });
};
