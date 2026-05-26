import React, { useState, useEffect } from 'react'
import { colors, spacing, radius, shadows, transitions, zIndex } from '../../designTokens'

// --- TYPE DEFINITIONS ---
export interface FormField {
  name: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
}

// --- MODAL BACKDROP ---
export function ModalBackdrop({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.4)',
        backdropFilter: 'blur(3px)',
        zIndex: zIndex.modal,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
      }}
    >
      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalBoxIn {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div style={{ animation: 'backdropIn 0.2s ease', position: 'fixed', inset: 0, background: 'transparent', zIndex: -1 }} />
      {children}
    </div>
  )
}

// --- MODAL BOX ---
export function ModalBox({ children, width = 480 }: { children: React.ReactNode; width?: number }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: `${width}px`,
        background: colors.surface,
        borderRadius: radius.lg,
        boxShadow: shadows.xl,
        overflow: 'hidden',
        animation: 'modalBoxIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}

// 1. CONFIRMATION MODAL
interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmLabel?: string
  confirmVariant?: 'danger' | 'warning' | 'primary'
  itemName?: string
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  confirmVariant = 'danger',
  itemName
}: ConfirmModalProps) {
  if (!isOpen) return null
  const isDanger = confirmVariant === 'danger'

  return (
    <ModalBackdrop onClose={onClose}>
      <ModalBox width={400}>
        <div style={{ padding: spacing.lg, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Icon Wrapper */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: radius.full,
              background: isDanger ? colors.errorLight : colors.warningLight,
              color: isDanger ? colors.error : colors.warning,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: spacing.md,
            }}
          >
            {isDanger ? '🗑️' : '⚠️'}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: colors.textPrimary,
              margin: `0 0 ${spacing.xs} 0`,
            }}
          >
            {title}
          </h3>

          {/* Message */}
          <p
            style={{
              fontSize: '14px',
              color: colors.textSecondary,
              margin: `0 0 ${spacing.sm} 0`,
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>

          {/* Item Name Highlight */}
          {itemName && (
            <div
              style={{
                background: colors.background,
                padding: `${spacing.xs} ${spacing.sm}`,
                borderRadius: radius.md,
                fontSize: '13px',
                fontWeight: 600,
                color: colors.textPrimary,
                border: `1px dashed ${colors.border}`,
                marginBottom: spacing.md,
                wordBreak: 'break-all',
              }}
            >
              "{itemName}"
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: spacing.sm, width: '100%', marginTop: spacing.md }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                height: 44,
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                background: colors.white,
                color: colors.textSecondary,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.background)}
              onMouseLeave={(e) => (e.currentTarget.style.background = colors.white)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              style={{
                flex: 1,
                height: 44,
                borderRadius: radius.md,
                border: 'none',
                background: isDanger ? colors.error : colors.primary,
                color: colors.white,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: isDanger ? '0 2px 8px rgba(239,68,68,0.3)' : '0 2px 8px rgba(255,107,53,0.3)',
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = isDanger ? colors.errorDark : colors.primaryDark
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isDanger ? colors.error : colors.primary
              }}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </ModalBox>
    </ModalBackdrop>
  )
}

// 2. ALERT MODAL
interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  type?: 'warning' | 'error' | 'info'
}

export function AlertModal({ isOpen, onClose, title, message, type = 'warning' }: AlertModalProps) {
  if (!isOpen) return null

  const cfg = {
    warning: { icon: '⚠️', bg: colors.warningLight, color: colors.warning },
    error: { icon: '🚨', bg: colors.errorLight, color: colors.error },
    info: { icon: 'ℹ️', bg: colors.infoLight, color: colors.info },
  }[type]

  return (
    <ModalBackdrop onClose={onClose}>
      <ModalBox width={400}>
        <div style={{ padding: spacing.lg, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Icon */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: radius.full,
              background: cfg.bg,
              color: cfg.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: spacing.md,
            }}
          >
            {cfg.icon}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: colors.textPrimary,
              margin: `0 0 ${spacing.xs} 0`,
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
            }}
          >
            {message}
          </p>

          {/* Button */}
          <button
            onClick={onClose}
            style={{
              width: '100%',
              height: 44,
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
            onMouseEnter={(e) => (e.currentTarget.style.background = colors.primaryDark)}
            onMouseLeave={(e) => (e.currentTarget.style.background = colors.primary)}
          >
            Acknowledge
          </button>
        </div>
      </ModalBox>
    </ModalBackdrop>
  )
}

// 3. FORM MODAL (e.g. Invite User, Add Tag)
interface FormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: Record<string, string>) => void
  title: string
  fields: FormField[]
  submitLabel?: string
}

export function FormModal({ isOpen, onClose, onSubmit, title, fields, submitLabel = 'Submit' }: FormModalProps) {
  const [values, setValues] = useState<Record<string, string>>({})

  // Clear fields when modal is toggled
  useEffect(() => {
    if (!isOpen) {
      setValues({})
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(values)
    setValues({})
    onClose()
  }

  return (
    <ModalBackdrop onClose={onClose}>
      <ModalBox width={460}>
        <form onSubmit={handleFormSubmit} style={{ margin: 0 }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'between',
              padding: spacing.md,
              paddingLeft: spacing.lg,
              paddingRight: spacing.lg,
              borderBottom: `1px solid ${colors.borderLight}`,
            }}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: colors.textPrimary,
                margin: 0,
                flex: 1,
              }}
            >
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: colors.textMuted,
                cursor: 'pointer',
                lineHeight: 1,
                padding: 0,
              }}
            >
              &times;
            </button>
          </div>

          {/* Form Fields */}
          <div style={{ padding: spacing.lg, display: 'flex', flexDirection: 'column', gap: spacing.md }}>
            {fields.map((field) => (
              <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: spacing.xs }}>
                <label
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: colors.textSecondary,
                  }}
                >
                  {field.label}
                  {field.required && <span style={{ color: colors.error, marginLeft: '2px' }}>*</span>}
                </label>
                <input
                  type={field.type || 'text'}
                  placeholder={field.placeholder || ''}
                  required={field.required}
                  value={values[field.name] || ''}
                  onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                  style={{
                    width: '100%',
                    height: 40,
                    padding: '0 12px',
                    borderRadius: radius.md,
                    border: `1px solid ${colors.border}`,
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: transitions.fast,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.primary
                    e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.primaryLight}`
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.border
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div
            style={{
              display: 'flex',
              gap: spacing.sm,
              padding: spacing.md,
              paddingLeft: spacing.lg,
              paddingRight: spacing.lg,
              borderTop: `1px solid ${colors.borderLight}`,
              background: colors.background,
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                height: 40,
                borderRadius: radius.md,
                border: `1px solid ${colors.border}`,
                background: colors.white,
                color: colors.textSecondary,
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: transitions.fast,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.background)}
              onMouseLeave={(e) => (e.currentTarget.style.background = colors.white)}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                height: 40,
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
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.primaryDark)}
              onMouseLeave={(e) => (e.currentTarget.style.background = colors.primary)}
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </ModalBox>
    </ModalBackdrop>
  )
}
