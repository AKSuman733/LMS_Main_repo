import React, { useState } from 'react'
import { colors, spacing, radius, typography, shadows, transitions } from '../../designTokens'
import ValidatedInput from './ValidatedInput'
import PasswordStrengthMeter from './PasswordStrengthMeter'
import ToastSystem, { useToast } from '../Toast/ToastSystem'
import { useFormValidation } from '../../hooks/useFormValidation'
import { BookOpen } from 'lucide-react'

// Validation rules configuration
const validationRules = {
  courseTitle: {
    required: true,
    minLength: 5,
    maxLength: 100,
  },
  instructorEmail: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  duration: {
    required: true,
    min: 1,
    max: 200,
  },
  password: {
    required: true,
    minLength: 8,
  },
  thumbnail: {
    required: true,
  },
  description: {
    required: true,
    minLength: 20,
  },
}

export default function CourseForm() {
  const { toasts, showToast, dismissToast } = useToast()
  
  // A key to force-recreate input elements (especially file inputs) on reset
  const [formKey, setFormKey] = useState(0)

  const {
    values,
    setValues,
    errors,
    touched,
    setTouched,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateAll,
    isFieldValid,
    isFieldInvalid,
  } = useFormValidation(validationRules)

  const [isSubmitHovered, setIsSubmitHovered] = useState(false)
  const [isSubmitActive, setIsSubmitActive] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateAll()) {
      showToast('Please correct the errors in the form.', 'error')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 1500))
      
      showToast('Course created successfully! 🎉', 'success')
      
      // Reset form fields
      setValues({
        courseTitle: '',
        instructorEmail: '',
        duration: '',
        password: '',
        thumbnail: '',
        description: '',
      })
      setErrors({})
      setTouched({})
      setFormKey((prev) => prev + 1) // Clear file inputs natively
    } catch (err) {
      showToast('Failed to create course. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      style={{
        maxWidth: '560px',
        margin: '0 auto',
        backgroundColor: colors.white,
        borderRadius: radius.xl,
        boxShadow: shadows.lg,
        padding: '32px',
        fontFamily: typography.fontFamily,
        border: `1px solid ${colors.borderLight}`,
      }}
    >
      {/* Toast Overlay */}
      <ToastSystem toasts={toasts} dismissToast={dismissToast} />

      {/* Form Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: radius.md,
            backgroundColor: colors.primaryLight,
            color: colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BookOpen size={20} />
        </div>
        <div>
          <h2
            style={{
              fontSize: typography.fontSize.xxl,
              fontWeight: typography.fontWeight.bold,
              color: colors.textPrimary,
              margin: 0,
            }}
          >
            Create New Course
          </h2>
          <p
            style={{
              fontSize: typography.fontSize.sm,
              color: colors.textMuted,
              margin: '4px 0 0 0',
            }}
          >
            Provide the details below to publish a new learning course.
          </p>
        </div>
      </div>

      {/* The Form */}
      <form onSubmit={handleSubmit} key={formKey} noValidate>
        {/* Course Title */}
        <ValidatedInput
          name="courseTitle"
          label="Course Title"
          type="text"
          placeholder="e.g., Introduction to Machine Learning"
          required
          value={values.courseTitle || ''}
          error={errors.courseTitle}
          touched={touched.courseTitle}
          isValid={isFieldValid('courseTitle') as boolean}
          isInvalid={isFieldInvalid('courseTitle') as boolean}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Instructor Email */}
        <ValidatedInput
          name="instructorEmail"
          label="Instructor Email"
          type="email"
          placeholder="instructor@uptoskills.com"
          required
          value={values.instructorEmail || ''}
          error={errors.instructorEmail}
          touched={touched.instructorEmail}
          isValid={isFieldValid('instructorEmail') as boolean}
          isInvalid={isFieldInvalid('instructorEmail') as boolean}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Duration in Hours */}
        <ValidatedInput
          name="duration"
          label="Duration (Hours)"
          type="number"
          placeholder="e.g., 20"
          required
          min={1}
          max={200}
          value={values.duration || ''}
          error={errors.duration}
          touched={touched.duration}
          isValid={isFieldValid('duration') as boolean}
          isInvalid={isFieldInvalid('duration') as boolean}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Password */}
        <ValidatedInput
          name="password"
          label="Security Token (Password)"
          type="password"
          placeholder="Create course security key"
          required
          value={values.password || ''}
          error={errors.password}
          touched={touched.password}
          isValid={isFieldValid('password') as boolean}
          isInvalid={isFieldInvalid('password') as boolean}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Password Strength Indicator */}
        {values.password && (
          <div style={{ marginTop: '-8px', marginBottom: '16px' }}>
            <PasswordStrengthMeter password={values.password} />
          </div>
        )}

        {/* Thumbnail Upload */}
        <ValidatedInput
          name="thumbnail"
          label="Course Thumbnail"
          type="file"
          accept="image/*"
          required
          value={values.thumbnail || ''}
          error={errors.thumbnail}
          touched={touched.thumbnail}
          isValid={isFieldValid('thumbnail') as boolean}
          isInvalid={isFieldInvalid('thumbnail') as boolean}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Description */}
        <ValidatedInput
          name="description"
          label="Course Description"
          type="textarea"
          placeholder="Provide a detailed description of the course curriculum and objectives (minimum 20 characters)..."
          required
          value={values.description || ''}
          error={errors.description}
          touched={touched.description}
          isValid={isFieldValid('description') as boolean}
          isInvalid={isFieldInvalid('description') as boolean}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          onMouseEnter={() => setIsSubmitHovered(true)}
          onMouseLeave={() => setIsSubmitHovered(false) || setIsSubmitActive(false)}
          onMouseDown={() => setIsSubmitActive(true)}
          onMouseUp={() => setIsSubmitActive(false)}
          style={{
            height: '45px',
            width: '100%',
            borderRadius: radius.md,
            backgroundColor: isSubmitting
              ? colors.primaryDark
              : isSubmitHovered
              ? colors.primaryDark
              : colors.primary,
            color: colors.white,
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.base,
            border: 'none',
            outline: 'none',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow: isSubmitting ? 'none' : shadows.button,
            transform: isSubmitActive ? 'scale(0.98)' : 'scale(1)',
            transition: transitions.normal,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '24px',
          }}
        >
          {isSubmitting ? (
            <>
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTopColor: colors.white,
                  animation: 'spin 0.6s linear infinite',
                }}
              />
              <span>Creating course...</span>
            </>
          ) : (
            <span>Create Course</span>
          )}
        </button>
      </form>
    </div>
  )
}
