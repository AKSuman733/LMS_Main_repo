import React, { createContext, useContext, useState, useCallback } from 'react'
import { colors, spacing, radius, shadows, zIndex } from '../../designTokens'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: number
  type: ToastType
  title: string
  message?: string
  duration: number
}

interface ToastContextValue {
  showToast: (title: string, type?: ToastType, message?: string, duration?: number) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((title: string, type: ToastType = 'success', message = '', duration?: number) => {
    const durations = { success: 3000, error: 5000, warning: 4000, info: 3000 }
    const id = Date.now()
    const resolvedDuration = duration || durations[type]
    
    setToasts(prev => [...prev, { id, type, title, message, duration: resolvedDuration }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, resolvedDuration)
  }, [])

  const showSuccess = useCallback((title: string, message?: string) => showToast(title, 'success', message), [showToast])
  const showError = useCallback((title: string, message?: string) => showToast(title, 'error', message), [showToast])
  const showWarning = useCallback((title: string, message?: string) => showToast(title, 'warning', message), [showToast])
  const showInfo = useCallback((title, message?) => showToast(title, 'info', message), [showToast])

  const dismiss = (id: number) => setToasts(prev => prev.filter(t => t.id !== id))

  const toastConfig = {
    success: {
      bg: colors.successLight,
      border: colors.success,
      iconBg: colors.success,
      icon: '✓',
      textColor: colors.successDark,
      title: colors.successDark
    },
    error: {
      bg: colors.errorLight,
      border: colors.error,
      iconBg: colors.error,
      icon: '✕',
      textColor: colors.errorDark,
      title: colors.errorDark
    },
    warning: {
      bg: colors.warningLight,
      border: colors.warning,
      iconBg: colors.warning,
      icon: '⚠',
      textColor: colors.warningDark,
      title: colors.warningDark
    },
    info: {
      bg: colors.infoLight,
      border: colors.info,
      iconBg: colors.info,
      icon: 'ℹ',
      textColor: colors.infoDark,
      title: colors.infoDark
    },
  }

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
      {children}
      {/* Toast Container */}
      <div
        style={{
          position: 'fixed',
          top: spacing.md,
          right: spacing.md,
          zIndex: zIndex.toast,
          display: 'flex',
          flexDirection: 'column',
          gap: spacing.sm,
          pointerEvents: 'none',
        }}
      >
        {/* Toast Keyframe animations injected dynamically */}
        <style>{`
          @keyframes toastSlideIn {
            from {
              transform: translateX(120%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes toastProgressBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}</style>

        {toasts.map((toast) => {
          const cfg = toastConfig[toast.type]
          return (
            <div
              key={toast.id}
              style={{
                width: '340px',
                padding: `${spacing.sm} ${spacing.md}`,
                backgroundColor: cfg.bg,
                border: `1px solid ${cfg.border}`,
                borderLeft: `4px solid ${cfg.border}`,
                borderRadius: radius.md,
                boxShadow: shadows.md,
                display: 'flex',
                alignItems: 'flex-start',
                gap: spacing.sm,
                position: 'relative',
                overflow: 'hidden',
                animation: 'toastSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                pointerEvents: 'auto',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: radius.full,
                  backgroundColor: cfg.iconBg,
                  color: colors.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                {cfg.icon}
              </div>

              {/* Content */}
              <div style={{ flex: 1, paddingRight: spacing.sm }}>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: cfg.title,
                    lineHeight: 1.3,
                  }}
                >
                  {toast.title}
                </div>
                {toast.message && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: cfg.textColor,
                      marginTop: '2px',
                      lineHeight: 1.4,
                    }}
                  >
                    {toast.message}
                  </div>
                )}
              </div>

              {/* Dismiss button */}
              <button
                onClick={() => dismiss(toast.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '18px',
                  color: cfg.textColor,
                  padding: 0,
                  lineHeight: 1,
                  opacity: 0.7,
                  transition: 'opacity 0.2s',
                  marginTop: '-2px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.7')}
              >
                ×
              </button>

              {/* Progress bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '3px',
                  backgroundColor: cfg.border,
                  animation: `toastProgressBar ${toast.duration}ms linear forwards`,
                }}
              />
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
