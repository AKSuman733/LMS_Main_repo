import { Skeleton } from './Skeleton'

interface CardSkeletonProps {
  count?: number
}

export function CardSkeleton({ count = 3 }: CardSkeletonProps) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
        width: '100%',
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            background: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Image Placeholder */}
          <Skeleton height={180} borderRadius="0px" />
          
          {/* Card Body */}
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {/* Tag / Category */}
            <Skeleton width={80} height={12} borderRadius={4} />

            {/* Title */}
            <Skeleton width="90%" height={20} borderRadius={4} style={{ marginTop: '4px' }} />
            
            {/* Short Description */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
              <Skeleton width="100%" height={12} borderRadius={4} />
              <Skeleton width="75%" height={12} borderRadius={4} />
            </div>

            {/* Footer Divider */}
            <div style={{ borderTop: '1px solid #F1F5F9', marginTop: '16px', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
              {/* Instructor */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Skeleton width={28} height={28} borderRadius="9999px" />
                <Skeleton width={64} height={12} borderRadius={4} />
              </div>
              {/* Rating / Meta */}
              <Skeleton width={48} height={16} borderRadius={4} style={{ marginLeft: 'auto' }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
