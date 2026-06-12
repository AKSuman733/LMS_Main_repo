/**
 * Form Validation Utilities
 * Real-time validation with feedback, error messages, and constraints
 */

export const validationRules = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address",
    name: "email",
  },

  password: {
    minLength: 8,
    message: "Password must be at least 8 characters",
    requirements: {
      minLength: { pattern: /.{8,}/, label: "At least 8 characters" },
      uppercase: { pattern: /[A-Z]/, label: "One uppercase letter" },
      lowercase: { pattern: /[a-z]/, label: "One lowercase letter" },
      number: { pattern: /\d/, label: "One number" },
      special: { pattern: /[!@#$%^&*]/, label: "One special character (!@#$%^&*)" },
    },
    name: "password",
  },

  required: {
    pattern: /\S/,
    message: "This field is required",
  },

  username: {
    pattern: /^[a-zA-Z0-9_-]{3,20}$/,
    message: "Username must be 3-20 characters (letters, numbers, _, -)",
  },

  phone: {
    pattern: /^[0-9+\-() ]{10,}$/,
    message: "Please enter a valid phone number",
  },

  url: {
    pattern: /^https?:\/\/.+\..+/,
    message: "Please enter a valid URL starting with http:// or https://",
  },

  number: {
    pattern: /^[0-9]+$/,
    message: "Please enter a valid number",
  },

  zipcode: {
    pattern: /^[0-9]{5,6}$/,
    message: "Please enter a valid zip code",
  },
};

/**
 * Validate email field
 */
export const validateEmail = (email) => {
  if (!email) return { valid: false, message: "Email is required" };
  if (!validationRules.email.pattern.test(email)) {
    return { valid: false, message: validationRules.email.message };
  }
  return { valid: true, message: "" };
};

/**
 * Validate password field with strength meter
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      valid: false,
      message: "Password is required",
      strength: "none",
      strengthPercent: 0,
      requirements: Object.entries(validationRules.password.requirements).map(
        ([key, rule]) => ({
          met: false,
          label: rule.label,
        })
      ),
    };
  }

  const requirements = validationRules.password.requirements;
  const met = Object.entries(requirements).map(([key, rule]) => ({
    met: rule.pattern.test(password),
    label: rule.label,
  }));

  const metCount = met.filter((r) => r.met).length;
  const strengthMap = {
    0: { strength: "none", percent: 0 },
    1: { strength: "very-weak", percent: 20 },
    2: { strength: "weak", percent: 40 },
    3: { strength: "medium", percent: 60 },
    4: { strength: "strong", percent: 80 },
    5: { strength: "very-strong", percent: 100 },
  };

  const { strength, percent } = strengthMap[metCount] || strengthMap[0];

  return {
    valid: metCount >= 4, // At least 4 requirements met
    message:
      metCount >= 4 ? "" : "Password does not meet all requirements",
    strength,
    strengthPercent: percent,
    requirements: met,
  };
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = "This field") => {
  if (!value || (typeof value === "string" && value.trim() === "")) {
    return { valid: false, message: `${fieldName} is required` };
  }
  return { valid: true, message: "" };
};

/**
 * Validate username
 */
export const validateUsername = (username) => {
  if (!username) return { valid: false, message: "Username is required" };
  if (!validationRules.username.pattern.test(username)) {
    return { valid: false, message: validationRules.username.message };
  }
  return { valid: true, message: "" };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone) => {
  if (!phone) return { valid: false, message: "Phone number is required" };
  if (!validationRules.phone.pattern.test(phone)) {
    return { valid: false, message: validationRules.phone.message };
  }
  return { valid: true, message: "" };
};

/**
 * Validate URL
 */
export const validateUrl = (url) => {
  if (!url) return { valid: false, message: "URL is required" };
  if (!validationRules.url.pattern.test(url)) {
    return { valid: false, message: validationRules.url.message };
  }
  return { valid: true, message: "" };
};

/**
 * Validate number field with optional min/max
 */
export const validateNumber = (value, fieldName = "Number", min, max) => {
  if (value === "" || value === null || value === undefined) {
    return { valid: false, message: `${fieldName} is required` };
  }

  const num = Number(value);
  if (isNaN(num)) {
    return { valid: false, message: `${fieldName} must be a valid number` };
  }

  if (min !== undefined && num < min) {
    return {
      valid: false,
      message: `${fieldName} must be at least ${min}`,
    };
  }

  if (max !== undefined && num > max) {
    return {
      valid: false,
      message: `${fieldName} cannot exceed ${max}`,
    };
  }

  return { valid: true, message: "" };
};

/**
 * Validate file upload with size and type constraints
 */
export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ["image/jpeg", "image/png", "application/pdf"],
    fieldName = "File",
  } = options;

  if (!file) {
    return { valid: false, message: `${fieldName} is required` };
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      message: `${fieldName} must be smaller than ${maxSizeMB}MB`,
    };
  }

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    const types = allowedTypes
      .map((t) => t.split("/")[1].toUpperCase())
      .join(", ");
    return {
      valid: false,
      message: `${fieldName} must be one of: ${types}`,
    };
  }

  return { valid: true, message: "" };
};

/**
 * Validate zip code
 */
export const validateZipcode = (zipcode) => {
  if (!zipcode) return { valid: false, message: "Zip code is required" };
  if (!validationRules.zipcode.pattern.test(zipcode)) {
    return { valid: false, message: validationRules.zipcode.message };
  }
  return { valid: true, message: "" };
};

/**
 * Format bytes to readable size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};
