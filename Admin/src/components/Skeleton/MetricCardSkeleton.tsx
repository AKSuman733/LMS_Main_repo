import { Skeleton } from './Skeleton'

export function MetricCardSkeleton() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '16px',
        width: '100%',
      }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '20px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {/* Top Row: label + icon placeholder */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Skeleton width={100} height={12} borderRadius={4} />
            <Skeleton width={32} height={32} borderRadius="9999px" />
          </div>

          {/* Large Number */}
          <Skeleton width={80} height={28} borderRadius={6} style={{ marginTop: '4px' }} />

          {/* Footer Subtext / Trend */}
          <Skeleton width={120} height={10} borderRadius={4} style={{ marginTop: '4px' }} />
        </div>
      ))}
    </div>
  )
}
