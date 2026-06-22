import React from 'react'
import { colors, spacing, radius, shadows, transitions } from '../../designTokens'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  error?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  onRetry,
  error
}: ErrorStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
        textAlign: 'center',
        background: colors.white,
        borderRadius: radius.lg,
        border: `1px solid ${colors.border}`,
        boxShadow: shadows.md,
        maxWidth: '540px',
        margin: '0 auto',
        animation: 'errorStateFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <style>{`
        @keyframes errorStateFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Error icon circle */}
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: radius.full,
          background: colors.errorLight,
          color: colors.error,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
          marginBottom: spacing.md,
          boxShadow: 'inset 0 2px 4px rgba(239,68,68,0.05)',
        }}
      >
        ⚠️
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '18px',
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
          fontSize: '14px',
          color: colors.textSecondary,
          margin: `0 0 ${spacing.lg} 0`,
          lineHeight: 1.5,
          maxWidth: '380px',
        }}
      >
        {message}
      </p>

      {/* Technical error display (Dev mode only) */}
      {error && process.env.NODE_ENV === 'development' && (
        <div
          style={{
            width: '100%',
            background: colors.background,
            border: `1px solid ${colors.border}`,
            borderRadius: radius.md,
            padding: spacing.md,
            marginBottom: spacing.lg,
            textAlign: 'left',
            maxHeight: '150px',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: colors.error,
              textTransform: 'uppercase',
              marginBottom: spacing.xs,
              letterSpacing: '0.05em',
            }}
          >
            Developer Error Log:
          </div>
          <pre
            style={{
              margin: 0,
              fontSize: '12px',
              color: colors.textSecondary,
              fontFamily: 'monospace',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              lineHeight: 1.4,
            }}
          >
            {error}
          </pre>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: spacing.sm, flexWrap: 'wrap', justifyContent: 'center' }}>
        {onRetry && (
          <button
            onClick={onRetry}
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
            🔄 Try Again
          </button>
        )}
        
        <button
          onClick={() => window.open('mailto:support@uptoskills.com')}
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
          Contact Support
        </button>
      </div>
    </div>
  )
}
