import React, { useState, useEffect } from 'react'
import { colors, spacing, shadows, radius, typography, transitions, metricCardConfigs } from '../../designTokens'
import { Users, BookOpen, TrendingUp, CheckCircle, Clock, Activity, AlertTriangle, AlertCircle } from 'lucide-react'

// Icon map to dynamically render icons based on design tokens config
const iconMap = {
  Users,
  BookOpen,
  TrendingUp,
  CheckCircle,
  Clock,
  Activity,
}

export interface MetricCardProps {
  label: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  accentColor: string
  bgColor: string
  icon: string
  isPendingApprovals?: boolean
  isSystemHealth?: boolean
}

export function MetricCard({
  label,
  value,
  change,
  changeType,
  accentColor,
  bgColor,
  icon,
  isPendingApprovals = false,
  isSystemHealth = false,
}: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Determine Icon for System Health dynamic state
  let RenderIcon = iconMap[icon as keyof typeof iconMap] || Activity
  let iconColor = accentColor

  if (isSystemHealth) {
    const numValue = typeof value === 'string' ? parseFloat(value) : Number(value)
    if (!isNaN(numValue)) {
      if (numValue >= 99) {
        RenderIcon = CheckCircle
        iconColor = colors.success
      } else if (numValue < 90) {
        RenderIcon = AlertCircle
        iconColor = colors.error
      } else if (numValue < 95) {
        RenderIcon = AlertTriangle
        iconColor = colors.warning
      }
    }
  }

  // Value color formatting
  const isPendingNegative = isPendingApprovals && changeType === 'negative'
  const valueColor = isPendingNegative ? colors.error : colors.textPrimary

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: colors.white,
        borderRadius: radius.lg,
        padding: '16px 20px',
        boxShadow: isHovered ? shadows.cardHover : shadows.card,
        borderLeft: `4px solid ${accentColor}`,
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        background: `color-mix(in srgb, ${bgColor} 30%, white)`,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: transitions.normal,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
        overflow: 'hidden',
      }}
    >
      {/* Pulsing red dot for pending approvals */}
      {isPendingApprovals && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: colors.error,
            animation: 'pulse 2s infinite',
          }}
        />
      )}

      {/* TOP ROW */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Icon Circle */}
        <div
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: bgColor,
            color: iconColor,
            borderRadius: radius.md,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RenderIcon size={16} />
        </div>

        {/* Change Badge */}
        <div
          style={{
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.bold,
            padding: '4px 8px',
            borderRadius: radius.sm,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            backgroundColor:
              changeType === 'positive'
                ? colors.successLight
                : changeType === 'negative'
                ? colors.errorLight
                : colors.surfaceAlt,
            color:
              changeType === 'positive'
                ? colors.successDark
                : changeType === 'negative'
                ? colors.errorDark
                : colors.textSecondary,
          }}
        >
          {changeType === 'positive' && <span>↑</span>}
          {changeType === 'negative' && <span>↓</span>}
          <span>{change}</span>
        </div>
      </div>

      {/* MIDDLE */}
      <div style={{ marginTop: '12px' }}>
        <span
          style={{
            ...typography.styles.metricNumber,
            color: valueColor,
            fontFamily: typography.fontFamily,
          }}
        >
          {value}
        </span>
      </div>

      {/* BOTTOM */}
      <div style={{ marginTop: '4px' }}>
        <span
          style={{
            ...typography.styles.metricLabel,
            fontFamily: typography.fontFamily,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

const defaultMetrics = [
  {
    key: 'activeUsers',
    label: 'Total Active Users',
    value: 1284,
    change: '+12%',
    changeType: 'positive',
    ...metricCardConfigs.activeUsers,
  },
  {
    key: 'totalCourses',
    label: 'Total Courses',
    value: 48,
    change: '+3 this month',
    changeType: 'positive',
    ...metricCardConfigs.totalCourses,
  },
  {
    key: 'weekEnrollments',
    label: 'Enrollments This Week',
    value: 342,
    change: '+18% vs last week',
    changeType: 'positive',
    ...metricCardConfigs.weekEnrollments,
  },
  {
    key: 'completionRate',
    label: 'Course Completion Rate',
    value: '73%',
    change: '+5% this month',
    changeType: 'positive',
    ...metricCardConfigs.completionRate,
  },
  {
    key: 'pendingApprovals',
    label: 'Pending Approvals',
    value: 7,
    change: 'Needs attention',
    changeType: 'negative',
    ...metricCardConfigs.pendingApprovals,
  },
  {
    key: 'systemHealth',
    label: 'System Health',
    value: '99.9%',
    change: 'All systems normal',
    changeType: 'positive',
    ...metricCardConfigs.systemHealth,
  },
] as const

interface MetricCardsProps {
  metrics?: {
    key: string
    label: string
    value: string | number
    change: string
    changeType: 'positive' | 'negative' | 'neutral'
    accentColor: string
    bgColor: string
    icon: string
  }[]
}

export default function MetricCards({ metrics = defaultMetrics as any }: MetricCardsProps) {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const getGridTemplateColumns = () => {
    if (width < 640) return '1fr'
    if (width < 1024) return 'repeat(2, 1fr)'
    return 'repeat(3, 1fr)'
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Dynamic Keyframe style injection */}
      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
          }
        }
      `}</style>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: getGridTemplateColumns(),
          gap: '16px',
        }}
      >
        {metrics.map((metric, index) => (
          <div
            key={metric.key}
            style={{
              animation: 'fadeUp 0.3s ease forwards',
              animationDelay: `${index * 0.08}s`,
              opacity: 0, // start hidden so animation fade-in is smooth
            }}
          >
            <MetricCard
              label={metric.label}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              accentColor={metric.accentColor}
              bgColor={metric.bgColor}
              icon={metric.icon}
              isPendingApprovals={metric.key === 'pendingApprovals'}
              isSystemHealth={metric.key === 'systemHealth'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
