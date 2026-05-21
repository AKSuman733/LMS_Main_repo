import React from 'react'
import { colors, radius, typography } from '../../designTokens'
import { Check, Circle } from 'lucide-react'
import { usePasswordStrength } from '../../hooks/usePasswordStrength'

interface PasswordStrengthMeterProps {
  password: string
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, level, color, label, requirements } = usePasswordStrength(password)

  // Determine segment filled states
  // We have 4 segments. If score is 5, we fill all 4.
  // Active segments count = Math.min(score, 4) if score <= 4, and 4 if score is 5.
  // Actually, we can map:
  // score 0: 0 active
  // score 1: 1 active
  // score 2: 2 active
  // score 3: 3 active
  // score 4: 4 active
  // score 5: 4 active (with darker green color)
  const activeSegmentsCount = score >= 5 ? 4 : score

  return (
    <div style={{ marginTop: '8px', marginBottom: '16px', width: '100%' }}>
      <style>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>

      {/* Strength Bar (4 segments) */}
      <div style={{ display: 'flex', gap: '4px', width: '100%' }}>
        {[0, 1, 2, 3].map((index) => {
          const isActive = index < activeSegmentsCount
          let segmentColor = '#E2E8F0' // default gray

          if (isActive) {
            if (score === 1 || score === 2) {
              segmentColor = colors.error // red
            } else if (score === 3) {
              segmentColor = colors.warning // amber
            } else if (score === 4) {
              segmentColor = colors.success // green
            } else if (score === 5) {
              segmentColor = colors.successDark // darker green
            }
          }

          return (
            <div
              key={index}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: radius.sm,
                backgroundColor: segmentColor,
                transition: 'background-color 0.3s ease, opacity 0.3s ease',
              }}
            />
          )
        })}
      </div>

      {/* Strength Label */}
      {password && (
        <div
          style={{
            textAlign: 'right',
            marginTop: '4px',
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            color: color,
            fontFamily: typography.fontFamily,
          }}
        >
          {label}
        </div>
      )}

      {/* Checklist Requirements */}
      <div
        style={{
          marginTop: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {requirements.map((req, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: typography.fontFamily,
              color: req.met ? colors.successDark : colors.textMuted,
              transition: 'color 0.2s ease',
            }}
          >
            {req.met ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.success,
                  animation: 'scaleIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                }}
              >
                <Check size={14} strokeWidth={3} />
              </div>
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: colors.textDisabled,
                }}
              >
                <Circle size={14} strokeWidth={2} />
              </div>
            )}
            <span
              style={{
                fontWeight: req.met ? typography.fontWeight.medium : typography.fontWeight.regular,
              }}
            >
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
