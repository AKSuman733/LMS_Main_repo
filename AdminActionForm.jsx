import React, { useMemo, useState } from 'react';
import { CheckCircle2, Loader2, AlertTriangle } from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fileTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const getPasswordStrength = (password) => {
  if (!password) return { label: 'Empty', color: 'text-slate-400', ratio: 0 };
  const strong = /(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{10,}/.test(password);
  const medium = /(?=.*[A-Za-z])(?=.*\d).{7,}/.test(password);
  if (strong) return { label: 'Strong', color: 'text-emerald-600', ratio: 1 };
  if (medium) return { label: 'Medium', color: 'text-amber-600', ratio: 0.66 };
  return { label: 'Weak', color: 'text-red-600', ratio: 0.33 };
};

export default function AdminActionForm({ action, onClose }) {
  const [formState, setFormState] = useState({
    title: '',
    email: '',
    password: '',
    capacity: '',
    file: null,
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const actionLabel = action === 'intern' ? 'Intern' : 'Course';

  const validateField = (field, value) => {
    switch (field) {
      case 'title':
        if (!value.trim()) return `${actionLabel} name is required.`;
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required.';
        if (!emailRegex.test(value)) return 'Enter a valid email address.';
        return '';
      case 'password':
        if (!value) return 'Password is required.';
        if (value.length < 7) return 'Password should be at least 7 characters.';
        return '';
      case 'capacity':
        if (!value) return 'Capacity is required.';
        if (Number(value) < 1) return 'Minimum is 1.';
        if (Number(value) > 500) return 'Maximum is 500.';
        return '';
      case 'file':
        if (!value) return 'Course image is required.';
        if (!fileTypes.includes(value.type)) return 'Use JPG or PNG format only.';
        if (value.size > 2 * 1024 * 1024) return 'File must be smaller than 2MB.';
        return '';
      default:
        return '';
    }
  };

  const validate = (field, value) => {
    const fieldError = validateField(field, value);
    setErrors((current) => ({
      ...current,
      [field]: fieldError || undefined,
    }));
  };

  const handleChange = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
    if (touched[field] || field === 'file') {
      validate(field, value);
    }
  };

  const handleBlur = (field) => {
    setTouched((current) => ({ ...current, [field]: true }));
    validate(field, formState[field]);
  };

  const hasValid = (field) => touched[field] && !errors[field] && formState[field];
  const passwordStrength = useMemo(() => getPasswordStrength(formState.password), [formState.password]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const candidate = { ...formState };
    const fieldErrors = {};

    Object.keys(candidate).forEach((key) => {
      const error = validateField(key, candidate[key]);
      if (error) fieldErrors[key] = error;
    });

    setErrors(fieldErrors);
    setTouched({ title: true, email: true, password: true, capacity: true, file: true });

    if (Object.keys(fieldErrors).length > 0) {
      setToast({ type: 'error', text: 'Please fix the errors before submitting.' });
      return;
    }

    setIsSubmitting(true);
    setToast(null);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setToast({ type: 'success', text: `${actionLabel} created successfully!` });
    }, 1200);
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Quick action</p>
          <h3 className="text-2xl font-semibold text-slate-900">Create {actionLabel}</h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-500 hover:text-slate-900 transition"
        >
          Close
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="flex items-center gap-1">
              {actionLabel} Title <span className="text-red-500">*</span>
            </span>
            <div className={`rounded-2xl border px-4 py-3 transition ${errors.title ? 'border-red-300 bg-red-50' : hasValid('title') ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
              <input
                type="text"
                value={formState.title}
                onChange={(e) => handleChange('title', e.target.value)}
                onBlur={() => handleBlur('title')}
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                placeholder={`Enter ${actionLabel.toLowerCase()} name`}
              />
            </div>
            {hasValid('title') && <p className="flex items-center gap-2 text-emerald-600 text-xs"><CheckCircle2 className="w-4 h-4" /> Looks good</p>}
            {errors.title && <p className="text-red-600 text-xs">{errors.title}</p>}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="flex items-center gap-1">
              Contact Email <span className="text-red-500">*</span>
            </span>
            <div className={`rounded-2xl border px-4 py-3 transition ${errors.email ? 'border-red-300 bg-red-50' : hasValid('email') ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                placeholder="admin@example.com"
              />
            </div>
            {hasValid('email') && <p className="flex items-center gap-2 text-emerald-600 text-xs"><CheckCircle2 className="w-4 h-4" /> Valid email</p>}
            {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="space-y-2 text-sm text-slate-700">
            <span className="flex items-center gap-1">
              Password <span className="text-red-500">*</span>
            </span>
            <div className={`rounded-2xl border px-4 py-3 transition ${errors.password ? 'border-red-300 bg-red-50' : hasValid('password') ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
              <input
                type="password"
                value={formState.password}
                onChange={(e) => handleChange('password', e.target.value)}
                onBlur={() => handleBlur('password')}
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                placeholder="Enter a secure password"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Password strength: <span className={passwordStrength.color}>{passwordStrength.label}</span></span>
              <span>{Math.round(passwordStrength.ratio * 100)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className={`h-full rounded-full ${passwordStrength.label === 'Strong' ? 'bg-emerald-500' : passwordStrength.label === 'Medium' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${passwordStrength.ratio * 100}%` }} />
            </div>
            <ul className="mt-2 space-y-1 text-[11px] text-slate-500">
              <li>Minimum 7 characters</li>
              <li>Use letters and numbers</li>
              <li>Include a symbol for strong security</li>
            </ul>
            {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
          </label>

          <label className="space-y-2 text-sm text-slate-700">
            <span className="flex items-center gap-1">
              Max Participants <span className="text-red-500">*</span>
            </span>
            <div className={`rounded-2xl border px-4 py-3 transition ${errors.capacity ? 'border-red-300 bg-red-50' : hasValid('capacity') ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
              <input
                type="number"
                value={formState.capacity}
                min={1}
                max={500}
                onChange={(e) => handleChange('capacity', e.target.value)}
                onBlur={() => handleBlur('capacity')}
                className="w-full bg-transparent outline-none text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. 40"
              />
            </div>
            {hasValid('capacity') && <p className="flex items-center gap-2 text-emerald-600 text-xs"><CheckCircle2 className="w-4 h-4" /> Capacity valid</p>}
            {errors.capacity && <p className="text-red-600 text-xs">{errors.capacity}</p>}
          </label>
        </div>

        <label className="space-y-2 text-sm text-slate-700 block">
          <span className="flex items-center gap-1">
            {actionLabel} Cover Image <span className="text-red-500">*</span>
          </span>
          <div className={`rounded-2xl border px-4 py-4 transition ${errors.file ? 'border-red-300 bg-red-50' : formState.file ? 'border-emerald-300 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                handleChange('file', file);
                handleBlur('file');
              }}
              className="w-full text-sm text-slate-700"
            />
          </div>
          {formState.file && !errors.file && <p className="flex items-center gap-2 text-emerald-600 text-xs"><CheckCircle2 className="w-4 h-4" /> {formState.file.name} accepted</p>}
          {errors.file && <p className="text-red-600 text-xs">{errors.file}</p>}
          <p className="text-[11px] text-slate-500">PNG or JPG up to 2MB</p>
        </label>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center rounded-2xl bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ff5f1f] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading...</>
            ) : (
              `Save ${actionLabel}`
            )}
          </button>
          <p className="text-xs text-slate-500 max-w-xl">
            All required fields are validated in real time so errors are resolved before submission.
          </p>
        </div>
      </form>

      {toast && (
        <div className={`mt-6 rounded-2xl px-4 py-3 text-sm ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
          <div className="flex items-center gap-2">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600" />
            )}
            <span>{toast.text}</span>
          </div>
        </div>
      )}
    </div>
  );
}
