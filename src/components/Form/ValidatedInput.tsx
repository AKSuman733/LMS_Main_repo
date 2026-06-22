import React, { useState } from 'react'
import { colors, spacing, radius, typography, shadows, transitions } from '../../designTokens'
import { Check, X, AlertTriangle } from 'lucide-react'

export interface ValidatedInputProps {
  name: string
  label: string
  type: string
  value: string
  error?: string
  touched?: boolean
  isValid?: boolean
  isInvalid?: boolean
  onChange: (name: string, value: string) => void
  onBlur?: (name: string) => void
  placeholder?: string
  required?: boolean
  hint?: string
  min?: number
  max?: number
  accept?: string
}

export default function ValidatedInput({
  name,
  label,
  type,
  value,
  error,
  touched,
  isValid = false,
  isInvalid = false,
  onChange,
  onBlur,
  placeholder,
  required = false,
  hint,
  min,
  max,
  accept,
}: ValidatedInputProps) {
  const [isFocused, setIsFocused] = useState(false)

  const isTextArea = type === 'textarea'

  // Input styles mapping to design tokens
  let borderColor = colors.border
  let boxShadow = 'none'
  let background = colors.white

  if (isFocused) {
    borderColor = colors.primary
    boxShadow = '0 0 0 3px rgba(255,107,53,0.12)'
  } else if (isValid) {
    borderColor = colors.success
    boxShadow = '0 0 0 3px rgba(34,197,94,0.1)'
  } else if (isInvalid) {
    borderColor = colors.error
    boxShadow = '0 0 0 3px rgba(239,68,68,0.1)'
    background = colors.errorLight
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(name, e.target.value)
  }

  const handleInputBlur = () => {
    setIsFocused(false)
    if (onBlur) {
      onBlur(name)
    }
  }

  return (
    <div style={{ position: 'relative', marginBottom: '16px', width: '100%' }}>
      {/* Keyframe stylesheet injection for slideDown and spring animations */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes springIn {
          0% {
            transform: scale(0) translateY(-50%);
          }
          70% {
            transform: scale(1.1) translateY(-50%);
          }
          100% {
            transform: scale(1) translateY(-50%);
          }
        }
        @keyframes springInTextarea {
          0% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>

      {/* LABEL ROW */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '6px',
        }}
      >
        {/* Left: Label Text + Red Asterisk */}
        <label
          htmlFor={name}
          style={{
            fontSize: '13px',
            fontWeight: typography.fontWeight.medium,
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            fontFamily: typography.fontFamily,
          }}
        >
          {label}
          {required && (
            <span style={{ color: colors.error, marginLeft: '2px' }}>*</span>
          )}
        </label>
        {/* Right: Hint Text */}
        {hint && (
          <span
            style={{
              fontSize: '11px',
              color: colors.textMuted,
              fontFamily: typography.fontFamily,
            }}
          >
            {hint}
          </span>
        )}
      </div>

      {/* INPUT WRAPPER */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '10px 44px 10px 12px',
              borderRadius: radius.md,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              border: `1px solid ${borderColor}`,
              boxShadow: boxShadow,
              backgroundColor: background,
              transition: transitions.fast,
              outline: 'none',
              resize: 'vertical',
            }}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={() => setIsFocused(true)}
            placeholder={placeholder}
            min={min}
            max={max}
            accept={accept}
            style={{
              width: '100%',
              height: '44px',
              padding: '10px 44px 10px 12px',
              borderRadius: radius.md,
              fontSize: typography.fontSize.base,
              fontFamily: typography.fontFamily,
              border: `1px solid ${borderColor}`,
              boxShadow: boxShadow,
              backgroundColor: background,
              transition: transitions.fast,
              outline: 'none',
            }}
          />
        )}

        {/* RIGHT ICON */}
        {isValid && (
          <div
            style={{
              position: 'absolute',
              right: '12px',
              top: isTextArea ? '16px' : '50%',
              transform: isTextArea ? 'none' : 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: colors.success,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              animation: isTextArea ? 'springInTextarea 0.2s ease forwards' : 'springIn 0.2s ease forwards',
            }}
          >
            <Check size={12} strokeWidth={3} />
          </div>
        )}

        {isInvalid && (
          <div
            style={{
              position: 'absolute',
              right: '12px',
              top: isTextArea ? '16px' : '50%',
              transform: isTextArea ? 'none' : 'translateY(-50%)',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: colors.error,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
              animation: isTextArea ? 'springInTextarea 0.2s ease forwards' : 'springIn 0.2s ease forwards',
            }}
          >
            <X size={12} strokeWidth={3} />
          </div>
        )}
      </div>

      {/* HELPER TEXT AND ERROR MESSAGES */}
      {type === 'number' && isFocused && min !== undefined && max !== undefined && (
        <div
          style={{
            fontSize: '11px',
            color: colors.textMuted,
            marginTop: '4px',
            fontFamily: typography.fontFamily,
          }}
        >
          Range: {min} &ndash; {max}
        </div>
      )}

      {type === 'file' && accept && (
        <div
          style={{
            fontSize: '11px',
            color: colors.textMuted,
            marginTop: '4px',
            fontFamily: typography.fontFamily,
          }}
        >
          Accepted: {accept} &bull; Max: 5MB
        </div>
      )}

      {isInvalid && error && (
        <div
          style={{
            color: colors.errorDark,
            fontSize: typography.fontSize.sm,
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontFamily: typography.fontFamily,
            animation: 'slideDown 0.15s ease forwards',
          }}
        >
          <AlertTriangle size={14} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
