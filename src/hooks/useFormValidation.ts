import { useState, useCallback } from 'react'

type FieldRule = {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  min?: number
  max?: number
  custom?: (value: string) => string | null
}

type ValidationRules = Record<string, FieldRule>

export function useFormValidation(rules: ValidationRules) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = useCallback((name: string, value: string): string => {
    const rule = rules[name]
    if (!rule) return ''
    if (rule.required && !value.trim()) return `${name} is required`
    if (rule.minLength && value.length < rule.minLength) return `Minimum ${rule.minLength} characters required`
    if (rule.maxLength && value.length > rule.maxLength) return `Maximum ${rule.maxLength} characters allowed`
    if (rule.pattern && !rule.pattern.test(value)) {
      if (name === 'email' || name === 'instructorEmail') return 'Please enter a valid email address'
      return `${name} format is invalid`
    }
    if (rule.min !== undefined && Number(value) < rule.min) return `Minimum value is ${rule.min}`
    if (rule.max !== undefined && Number(value) > rule.max) return `Maximum value is ${rule.max}`
    if (rule.custom) { const err = rule.custom(value); if (err) return err }
    return ''
  }, [rules])

  const handleChange = useCallback((name: string, value: string) => {
    setValues(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const error = validate(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }, [touched, validate])

  const handleBlur = useCallback((name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validate(name, values[name] || '')
    setErrors(prev => ({ ...prev, [name]: error }))
  }, [values, validate])

  const validateAll = useCallback((): boolean => {
    const newErrors: Record<string, string> = {}
    const newTouched: Record<string, boolean> = {}
    let isValid = true
    Object.keys(rules).forEach(name => {
      newTouched[name] = true
      const error = validate(name, values[name] || '')
      newErrors[name] = error
      if (error) isValid = false
    })
    setErrors(newErrors)
    setTouched(newTouched)
    return isValid
  }, [rules, values, validate])

  const isFieldValid = (name: string) => touched[name] && !errors[name] && values[name]
  const isFieldInvalid = (name: string) => touched[name] && !!errors[name]

  return { values, setValues, errors, touched, setTouched, setErrors, isSubmitting, setIsSubmitting, handleChange, handleBlur, validateAll, isFieldValid, isFieldInvalid }
}
