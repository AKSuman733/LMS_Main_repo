interface PageSkeletonProps {
  message?: string
}

export function PageSkeleton({ message = 'Loading...' }: PageSkeletonProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        width: '100%',
        padding: '40px',
        boxSizing: 'border-box',
      }}
    >
      <style>{`
        @keyframes spin { 
          to { transform: rotate(360deg); } 
        }
      `}</style>
      <div
        style={{
          width: '44px',
          height: '44px',
          border: '3px solid #E2E8F0',
          borderTop: '3px solid #FF6B35',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '16px',
        }}
      />
      <div
        style={{
          fontSize: '14px',
          fontWeight: 500,
          color: '#718096',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          letterSpacing: '0.01em',
        }}
      >
        {message}
      </div>
    </div>
  )
}
