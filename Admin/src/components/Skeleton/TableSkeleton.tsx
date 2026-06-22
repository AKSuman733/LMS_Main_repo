import { Skeleton } from './Skeleton'

interface TableSkeletonProps {
  columns?: number   // how many columns
  rows?: number     // default 5
  hasCheckbox?: boolean
  hasActions?: boolean
}

export function TableSkeleton({ columns = 5, rows = 5, hasCheckbox = true, hasActions = true }: TableSkeletonProps) {
  return (
    <div style={{ width: '100%', overflowX: 'auto', background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ background: '#F8F9FA', borderBottom: '1px solid #E2E8F0' }}>
          <tr>
            {hasCheckbox && (
              <th style={{ padding: '16px', width: '48px' }}>
                <Skeleton width={18} height={18} borderRadius={4} />
              </th>
            )}
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} style={{ padding: '16px' }}>
                <Skeleton width={i === 0 ? 120 : 80} height={16} borderRadius={4} />
              </th>
            ))}
            {hasActions && (
              <th style={{ padding: '16px', width: '80px', textAlign: 'right' }}>
                <Skeleton width={40} height={16} borderRadius={4} style={{ marginLeft: 'auto' }} />
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: rowIndex === rows - 1 ? 'none' : '1px solid #F1F5F9' }}>
              {hasCheckbox && (
                <td style={{ padding: '16px' }}>
                  <Skeleton width={18} height={18} borderRadius={4} />
                </td>
              )}
              {/* First column: avatar + text */}
              <td style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Skeleton width={32} height={32} borderRadius="9999px" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <Skeleton width={120} height={14} borderRadius={4} />
                    <Skeleton width={80} height={10} borderRadius={4} />
                  </div>
                </div>
              </td>
              {/* Other columns */}
              {Array.from({ length: columns - 1 }).map((_, i) => (
                <td key={i} style={{ padding: '16px' }}>
                  <Skeleton width={i === 0 ? 100 : 70} height={14} borderRadius={4} />
                </td>
              ))}
              {/* Actions */}
              {hasActions && (
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Skeleton width={24} height={24} borderRadius="9999px" />
                    <Skeleton width={24} height={24} borderRadius="9999px" />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
