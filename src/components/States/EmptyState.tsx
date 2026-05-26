import React from 'react'
import { colors, spacing, radius, shadows, transitions } from '../../designTokens'

interface EmptyStateProps {
  icon: string
  title: string
  message: string
  actionLabel?: string
  onAction?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  size?: 'sm' | 'md' | 'lg'
}

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
  size = 'md'
}: EmptyStateProps) {
  const sizes = {
    sm: { iconSize: 48, iconFont: 22, titleSize: 16, msgSize: 13, padding: 32 },
    md: { iconSize: 72, iconFont: 32, titleSize: 20, msgSize: 14, padding: 60 },
    lg: { iconSize: 96, iconFont: 44, titleSize: 24, msgSize: 16, padding: 80 },
  }
  const s = sizes[size]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${s.padding}px`,
        textAlign: 'center',
        background: colors.white,
        borderRadius: radius.lg,
        border: `1px solid ${colors.border}`,
        boxShadow: shadows.sm,
        maxWidth: '600px',
        margin: '0 auto',
        animation: 'emptyStateFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <style>{`
        @keyframes emptyStateFadeIn { 
          from { opacity: 0; transform: translateY(16px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
      `}</style>

      {/* Icon container */}
      <div
        style={{
          width: `${s.iconSize}px`,
          height: `${s.iconSize}px`,
          borderRadius: radius.full,
          background: colors.primaryLight,
          color: colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${s.iconFont}px`,
          marginBottom: spacing.md,
          boxShadow: 'inset 0 2px 4px rgba(255,107,53,0.05)',
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: `${s.titleSize}px`,
          fontWeight: 700,
          color: colors.textPrimary,
          margin: `0 0 ${spacing.sm} 0`,
        }}
      >
        {title}
      </h3>

      {/* Message */}
      <p
        style={{
          fontSize: `${s.msgSize}px`,
          color: colors.textSecondary,
          margin: `0 0 ${spacing.lg} 0`,
          maxWidth: '400px',
          lineHeight: 1.5,
        }}
      >
        {message}
      </p>

      {/* Action Buttons */}
      {(actionLabel || secondaryLabel) && (
        <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              style={{
                height: '40px',
                padding: `0 ${spacing.md}`,
                borderRadius: radius.md,
                border: 'none',
                background: colors.primary,
                color: colors.white,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: shadows.button,
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.primaryDark
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.primary
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {actionLabel}
            </button>
          )}
          {secondaryLabel && onSecondary && (
            <button
              onClick={onSecondary}
              style={{
                height: '40px',
                padding: `0 ${spacing.md}`,
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                background: colors.white,
                color: colors.textSecondary,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = colors.background
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = colors.white
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
