import { useState } from "react";
import { Check, X, Eye, EyeOff, AlertCircle } from "lucide-react";
import { colors } from "../../constants/designTokens";
import {
  validateEmail,
  validatePassword,
  validateRequired,
  validateFile,
  validateNumber,
  formatFileSize,
} from "../../utils/formValidation";

/**
 * FormField Component
 * Provides real-time validation feedback with:
 * - Email validation with checkmarks/errors
 * - Password strength meter with requirements
 * - Required field indicators (red asterisk)
 * - Number fields with min/max constraints
 * - File uploads with size/type constraints
 * - Green checkmarks for valid fields
 * - Red borders + error messages for invalid fields
 */

export default function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  minValue,
  maxValue,
  fileOptions = {
    maxSize: 5 * 1024 * 1024,
    allowedTypes: ["image/jpeg", "image/png", "application/pdf"],
  },
  className = "",
}) {
  const [touched, setTouched] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [passwordRequirements, setPasswordRequirements] = useState(null);
  const [fileName, setFileName] = useState("");

  // Real-time validation handler
  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange?.(e);

    // Skip validation if not touched
    if (!touched) return;

    validateField(newValue, type);
  };

  // Validate field based on type
  const validateField = (val, fieldType) => {
    let validation = { valid: true, message: "" };

    if (required && !val) {
      validation = { valid: false, message: `${label} is required` };
    } else {
      switch (fieldType) {
        case "email":
          validation = validateEmail(val);
          break;

        case "password":
          const pwValidation = validatePassword(val);
          validation = {
            valid: pwValidation.valid,
            message: pwValidation.message,
          };
          setPasswordStrength(pwValidation.strength);
          setPasswordRequirements(pwValidation.requirements);
          break;

        case "number":
          validation = validateNumber(val, label, minValue, maxValue);
          break;

        case "file":
          // File validation happens on file change
          break;

        default:
          if (required && !val) {
            validation = { valid: false, message: `${label} is required` };
          }
      }
    }

    setErrors(validation.message);
    setIsValid(validation.valid);
  };

  const handleBlur = () => {
    setTouched(true);
    validateField(value, type);
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateFile(file, fileOptions);
    setErrors(validation.message);
    setIsValid(validation.valid);
    setFileName(file.name);

    onChange?.({
      target: {
        name,
        value: validation.valid ? file : null,
        type: "file",
      },
    });
  };

  // Determine border color based on validation state
  const getBorderColor = () => {
    if (!touched) return "border-gray-300";
    if (isValid === true) return "border-emerald-500";
    if (isValid === false) return "border-red-500";
    return "border-gray-300";
  };

  const getBackgroundColor = () => {
    if (!touched) return "bg-white";
    if (isValid === true) return "bg-emerald-50";
    if (isValid === false) return "bg-red-50";
    return "bg-white";
  };

  // Render password strength meter
  const renderPasswordStrength = () => {
    if (type !== "password" || !touched || !passwordStrength) return null;

    const strengthConfig = {
      "very-weak": { color: colors.error.base, label: "Very Weak", percent: 20 },
      weak: { color: "#F59E0B", label: "Weak", percent: 40 },
      medium: { color: "#F59E0B", label: "Medium", percent: 60 },
      strong: { color: colors.success.base, label: "Strong", percent: 80 },
      "very-strong": { color: colors.success.base, label: "Very Strong", percent: 100 },
      none: { color: "#ccc", label: "No Password", percent: 0 },
    };

    const config = strengthConfig[passwordStrength] || strengthConfig.none;

    return (
      <div className="mt-3 space-y-2">
        {/* Strength meter */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Password Strength:</span>
            <span style={{ color: config.color }} className="font-semibold">
              {config.label}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              style={{
                width: `${config.percent}%`,
                backgroundColor: config.color,
              }}
              className="h-full transition-all duration-300"
            />
          </div>
        </div>

        {/* Requirements list */}
        {passwordRequirements && (
          <div className="space-y-1 mt-2">
            <p className="text-xs font-semibold text-gray-700">Requirements:</p>
            <div className="space-y-1">
              {passwordRequirements.map((req, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  {req.met ? (
                    <Check
                      size={14}
                      style={{ color: colors.success.base }}
                      className="flex-shrink-0"
                    />
                  ) : (
                    <X
                      size={14}
                      className="flex-shrink-0"
                      style={{ color: colors.error.base }}
                    />
                  )}
                  <span
                    style={{
                      color: req.met ? colors.success.base : colors.error.base,
                    }}
                  >
                    {req.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render file upload
  if (type === "file") {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="ml-1" style={{ color: colors.error.base }}>*</span>}
          </span>

          {/* File size and format info */}
          <div className="mt-1 text-xs text-gray-500 space-y-1">
            <p>
              Max size:{" "}
              {formatFileSize(fileOptions.maxSize || 5 * 1024 * 1024)}
            </p>
            <p>
              Formats:{" "}
              {(fileOptions.allowedTypes || [])
                .map((t) => t.split("/")[1].toUpperCase())
                .join(", ")}
            </p>
          </div>

          {/* File input */}
          <div className="relative mt-2">
            <input
              type="file"
              name={name}
              onChange={handleFileChange}
              onBlur={handleBlur}
              disabled={disabled}
              className="hidden"
              id={name}
              accept={(fileOptions.allowedTypes || []).join(",")}
            />

            <label
              htmlFor={name}
              style={{
                borderColor: getBorderColor(),
                backgroundColor: getBackgroundColor(),
              }}
              className={`
                block p-4 border-2 border-dashed rounded-lg cursor-pointer
                transition-all duration-200 text-center
                hover:border-gray-400
              `}
            >
              <div className="text-gray-600">
                <p className="font-semibold">Click to upload file</p>
                <p className="text-xs mt-1">or drag and drop</p>
              </div>
            </label>

            {/* File name display */}
            {fileName && (
              <div className="mt-2 text-sm font-semibold text-gray-700">
                Selected: {fileName}
              </div>
            )}
          </div>
        </label>

        {/* Validation feedback */}
        {touched && (
          <>
            {isValid === true && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-semibold">
                <Check size={16} />
                File is valid
              </div>
            )}
            {isValid === false && errors && (
              <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">
                <AlertCircle size={16} />
                {errors}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Render password field with show/hide toggle
  if (type === "password") {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="ml-1" style={{ color: colors.error.base }}>*</span>}
          </span>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              style={{
                borderColor: getBorderColor(),
                backgroundColor: getBackgroundColor(),
              }}
              className={`
                w-full px-4 py-2 border-2 rounded-lg font-mono text-sm
                transition-all duration-200 focus:outline-none
              `}
            />

            {/* Show/Hide password toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={disabled}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {/* Valid checkmark */}
            {touched && isValid === true && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2">
                <Check size={20} style={{ color: colors.success.base }} />
              </div>
            )}
          </div>
        </label>

        {/* Password strength meter and requirements */}
        {renderPasswordStrength()}

        {/* Error message */}
        {touched && isValid === false && errors && (
          <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">
            <AlertCircle size={16} />
            {errors}
          </div>
        )}
      </div>
    );
  }

  // Render email field
  if (type === "email") {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="ml-1" style={{ color: colors.error.base }}>*</span>}
          </span>

          <div className="relative mt-2">
            <input
              type="email"
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              style={{
                borderColor: getBorderColor(),
                backgroundColor: getBackgroundColor(),
              }}
              className={`
                w-full px-4 py-2 border-2 rounded-lg text-sm
                transition-all duration-200 focus:outline-none
              `}
            />

            {/* Valid checkmark */}
            {touched && isValid === true && (
              <Check
                size={20}
                style={{ color: colors.success.base }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </label>

        {/* Validation feedback */}
        {touched && (
          <>
            {isValid === false && errors && (
              <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">
                <AlertCircle size={16} />
                {errors}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Render number field
  if (type === "number") {
    return (
      <div className={`space-y-2 ${className}`}>
        <label className="block">
          <span className="text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="ml-1" style={{ color: colors.error.base }}>*</span>}
          </span>

          {/* Min/Max constraints info */}
          {(minValue !== undefined || maxValue !== undefined) && (
            <div className="mt-1 text-xs text-gray-500">
              {minValue !== undefined && <span>Min: {minValue} </span>}
              {maxValue !== undefined && <span>Max: {maxValue}</span>}
            </div>
          )}

          <div className="relative mt-2">
            <input
              type="number"
              name={name}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              disabled={disabled}
              min={minValue}
              max={maxValue}
              style={{
                borderColor: getBorderColor(),
                backgroundColor: getBackgroundColor(),
              }}
              className={`
                w-full px-4 py-2 border-2 rounded-lg text-sm
                transition-all duration-200 focus:outline-none
              `}
            />

            {/* Valid checkmark */}
            {touched && isValid === true && (
              <Check
                size={20}
                style={{ color: colors.success.base }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              />
            )}
          </div>
        </label>

        {/* Validation feedback */}
        {touched && (
          <>
            {isValid === false && errors && (
              <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">
                <AlertCircle size={16} />
                {errors}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // Render default text field
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block">
        <span className="text-sm font-semibold text-gray-700">
          {label}
          {required && <span className="ml-1" style={{ color: colors.error.base }}>*</span>}
        </span>

        <div className="relative mt-2">
          <input
            type={type}
            name={name}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            style={{
              borderColor: getBorderColor(),
              backgroundColor: getBackgroundColor(),
            }}
            className={`
              w-full px-4 py-2 border-2 rounded-lg text-sm
              transition-all duration-200 focus:outline-none
            `}
          />

          {/* Valid checkmark */}
          {touched && isValid === true && (
            <Check
              size={20}
              style={{ color: colors.success.base }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            />
          )}
        </div>
      </label>

      {/* Validation feedback */}
      {touched && (
        <>
          {isValid === false && errors && (
            <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">
              <AlertCircle size={16} />
              {errors}
            </div>
          )}
        </>
      )}
    </div>
  );
}
