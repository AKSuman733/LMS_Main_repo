export type StrengthLevel = 'empty' | 'weak' | 'medium' | 'strong' | 'very-strong'

export interface PasswordStrength {
  level: StrengthLevel
  score: number     // 0-5
  color: string
  label: string
  requirements: { label: string; met: boolean }[]
}

export function usePasswordStrength(password: string): PasswordStrength {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Contains special character (!@#$%)', met: /[!@#$%^&*]/.test(password) },
  ]
  
  // If the password is empty, score is 0. Otherwise, count how many requirements are met.
  const score = password ? requirements.filter(r => r.met).length : 0
  
  const levels: Record<number, { level: StrengthLevel; color: string; label: string }> = {
    0: { level: 'empty', color: '#E2E8F0', label: '' },
    1: { level: 'weak', color: '#EF4444', label: 'Weak' },
    2: { level: 'weak', color: '#EF4444', label: 'Weak' },
    3: { level: 'medium', color: '#F59E0B', label: 'Medium' },
    4: { level: 'strong', color: '#22C55E', label: 'Strong' },
    5: { level: 'very-strong', color: '#16A34A', label: 'Very Strong' },
  }
  
  return { ...levels[score], score, requirements }
}
