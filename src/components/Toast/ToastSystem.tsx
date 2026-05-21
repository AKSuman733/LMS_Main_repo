import React, { useState } from 'react'
import { colors, radius, typography, shadows } from '../../designTokens'
import { Check, X, AlertTriangle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastItem {
  id: number
  message: string
  type: ToastType
  duration: number
}

// Config details for different toast types
const toastConfigs = {
  success: {
    bg: '#F0FDF4',
    border: '#22C55E',
    text: '#16A34A',
    Icon: Check,
  },
  error: {
    bg: '#FEF2F2',
    border: '#EF4444',
    text: '#DC2626',
    Icon: X,
  },
  warning: {
    bg: '#FFFBEB',
    border: '#F59E0B',
    text: '#D97706',
    Icon: AlertTriangle,
  },
  info: {
    bg: '#EFF6FF',
    border: '#3B82F6',
    text: '#2563EB',
    Icon: Info,
  },
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = (message: string, type: ToastType = 'success', duration = 4000) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type, duration }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, showToast, dismissToast }
}

interface ToastSystemProps {
  toasts: ToastItem[]
  dismissToast: (id: number) => void
}

export default function ToastSystem({ toasts, dismissToast }: ToastSystemProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'none', // Allow clicking through parent container
      }}
    >
      {/* Keyframe animations for sliding and shrinking */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>

      {toasts.map((toast) => {
        const config = toastConfigs[toast.type] || toastConfigs.info
        const ToastIcon = config.Icon

        return (
          <div
            key={toast.id}
            style={{
              width: '320px',
              padding: '14px 16px',
              borderRadius: radius.md,
              backgroundColor: config.bg,
              borderLeft: `4px solid ${config.border}`,
              borderTop: 'none',
              borderRight: 'none',
              borderBottom: 'none',
              boxShadow: shadows.lg,
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden',
              pointerEvents: 'auto', // Enable pointer events for toast card
              animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              fontFamily: typography.fontFamily,
            }}
          >
            {/* Left Status Icon Wrapper */}
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: config.border,
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px',
              }}
            >
              <ToastIcon size={12} strokeWidth={3} />
            </div>

            {/* Message Text */}
            <div
              style={{
                fontSize: typography.fontSize.base,
                fontWeight: typography.fontWeight.medium,
                color: config.text,
                paddingRight: '16px',
                lineHeight: typography.lineHeight.normal,
              }}
            >
              {toast.message}
            </div>

            {/* Manual Dismiss Button */}
            <button
              onClick={() => dismissToast(toast.id)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                color: config.text,
                cursor: 'pointer',
                opacity: 0.6,
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s',
                outline: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
            >
              <X size={14} />
            </button>

            {/* Bottom Shrinking Progress Bar */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '3px',
                backgroundColor: config.border,
                animation: `shrink ${toast.duration}ms linear forwards`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
