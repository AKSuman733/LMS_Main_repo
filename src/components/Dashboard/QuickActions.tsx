import React, { useState, useEffect } from 'react'
import { colors, spacing, shadows, radius, typography, transitions, buttonVariants } from '../../designTokens'
import { Plus, UserPlus, CheckSquare, BarChart2 } from 'lucide-react'
import { useNavigate } from 'react-router'

const actions = [
  {
    id: 'new-course',
    label: '+ New Course',
    description: 'Create a new learning course',
    icon: Plus,
    variant: 'primary' as const,
    route: '/admin/courses/new',
  },
  {
    id: 'new-intern',
    label: '+ New Intern',
    description: 'Add a new intern profile',
    icon: UserPlus,
    variant: 'primary' as const,
    route: '/admin/interns/new',
  },
  {
    id: 'approve-pending',
    label: 'Approve Pending',
    description: 'Review 7 pending approvals',
    icon: CheckSquare,
    variant: 'secondary' as const,
    route: '/admin/approvals',
    badge: 7,
  },
  {
    id: 'view-reports',
    label: 'View Reports',
    description: 'Analytics and performance data',
    icon: BarChart2,
    variant: 'secondary' as const,
    route: '/admin/reports',
  },
]

export default function QuickActions() {
  const navigate = useNavigate()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleAction = async (action: typeof actions[number]) => {
    if (loadingId) return
    setLoadingId(action.id)
    await new Promise((r) => setTimeout(r, 600)) // simulate loading
    navigate(action.route)
    setLoadingId(null)
  }

  const isMobile = width < 640

  return (
    <div
      style={{
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: '20px',
        boxShadow: shadows.card,
        width: '100%',
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Title Row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h3
          style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            color: colors.textMuted,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            margin: 0,
            fontFamily: typography.fontFamily,
          }}
        >
          Quick Actions
        </h3>
        <span
          onClick={() => navigate('/admin/actions')}
          style={{
            fontSize: typography.fontSize.sm,
            color: colors.secondary,
            cursor: 'pointer',
            fontWeight: typography.fontWeight.medium,
            fontFamily: typography.fontFamily,
            transition: transitions.fast,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.secondaryDark)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.secondary)}
        >
          View All &rarr;
        </span>
      </div>

      {/* Buttons Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '12px',
        }}
      >
        {actions.map((action) => {
          const isPrimary = action.variant === 'primary'
          const isLoading = loadingId === action.id
          const isHovered = hoveredId === action.id
          const isActive = activeId === action.id
          const IconComponent = action.icon

          // Compute button styling based on state
          let bg = isPrimary ? colors.primary : 'transparent'
          let color = isPrimary ? colors.white : colors.secondary
          let border = isPrimary ? 'none' : `2px solid ${colors.secondary}`
          let shadow = isPrimary ? shadows.button : 'none'
          let transform = 'translateY(0) scale(1)'

          if (isHovered) {
            bg = isPrimary ? colors.primaryDark : colors.secondaryLight
            color = isPrimary ? colors.white : colors.secondary
            shadow = isPrimary
              ? '0 6px 16px rgba(255,107,53,0.4)'
              : '0 4px 12px rgba(0,181,165,0.25)'
            transform = 'translateY(-1px)'
          }

          if (isActive) {
            transform = 'scale(0.98)'
            shadow = isPrimary ? shadows.button : 'none'
          }

          if (isLoading) {
            bg = isPrimary ? colors.primaryDark : colors.secondaryLight
            color = isPrimary ? colors.white : colors.secondary
            shadow = 'none'
            transform = 'none'
          }

          return (
            <button
              key={action.id}
              onClick={() => handleAction(action)}
              onMouseEnter={() => setLoadingId((current) => (current ? current : null)) || setHoveredId(action.id)}
              onMouseLeave={() => setHoveredId(null) || setActiveId(null)}
              onMouseDown={() => setActiveId(action.id)}
              onMouseUp={() => setActiveId(null)}
              disabled={loadingId !== null}
              style={{
                minHeight: '45px',
                padding: '10px 20px',
                borderRadius: '10px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                cursor: loadingId !== null ? 'not-allowed' : 'pointer',
                transition: transitions.normal,
                backgroundColor: bg,
                color: color,
                border: border,
                boxShadow: shadow,
                transform: transform,
                outline: 'none',
                textAlign: 'left',
              }}
            >
              {/* Left & Center Inner Content */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Icon Wrapper Circle */}
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: radius.full,
                    backgroundColor: isPrimary ? 'rgba(255,255,255,0.2)' : 'rgba(0,181,165,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isLoading ? (
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        border: '2px solid transparent',
                        borderTopColor: 'currentColor',
                        animation: 'spin 0.6s linear infinite',
                      }}
                    />
                  ) : (
                    <IconComponent size={18} style={{ color: 'currentColor' }} />
                  )}
                </div>

                {/* Text Layout */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span
                    style={{
                      fontSize: typography.fontSize.base,
                      fontWeight: typography.fontWeight.bold,
                      lineHeight: typography.lineHeight.tight,
                      fontFamily: typography.fontFamily,
                    }}
                  >
                    {isLoading ? 'Loading...' : action.label}
                  </span>
                  <span
                    style={{
                      fontSize: typography.fontSize.xs,
                      opacity: 0.75,
                      lineHeight: typography.lineHeight.tight,
                      fontFamily: typography.fontFamily,
                      marginTop: '2px',
                    }}
                  >
                    {action.description}
                  </span>
                </div>
              </div>

              {/* Right Side: Red Badge */}
              {!isLoading && action.badge !== undefined && (
                <div
                  style={{
                    backgroundColor: colors.error,
                    color: colors.white,
                    fontSize: '10px',
                    fontWeight: typography.fontWeight.bold,
                    padding: '0 6px',
                    minWidth: '20px',
                    height: '20px',
                    borderRadius: radius.full,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: typography.fontFamily,
                    flexShrink: 0,
                  }}
                >
                  {action.badge}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
