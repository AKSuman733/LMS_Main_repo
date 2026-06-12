/**
 * Design Tokens
 * Centralized design system for consistent branding and styling across the application
 * Update these values once to reflect changes everywhere
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const colors = {
  // Brand Colors
  primary: {
    base: "#FF6B35", // UptoSkills Orange
    light: "#FFE5D9",
    dark: "#CC5629",
    50: "#FFF8F4",
    100: "#FFE5D9",
    200: "#FFC9B3",
    300: "#FFAD8C",
    400: "#FF8F66",
    500: "#FF6B35",
    600: "#E55A24",
    700: "#CC4A1A",
    800: "#993611",
    900: "#662308",
  },

  secondary: {
    base: "#00B5A5", // UptoSkills Teal
    light: "#D4F7F5",
    dark: "#008B7E",
    50: "#F0FFFE",
    100: "#D4F7F5",
    200: "#A9EFEB",
    300: "#7EE7E1",
    400: "#53DFD7",
    500: "#00B5A5",
    600: "#009B8F",
    700: "#008179",
    800: "#006763",
    900: "#004D4D",
  },

  // Status Colors
  success: {
    base: "#10B981",
    light: "#D1FAE5",
    dark: "#047857",
  },

  warning: {
    base: "#F59E0B",
    light: "#FEF3C7",
    dark: "#D97706",
  },

  error: {
    base: "#EF4444",
    light: "#FEE2E2",
    dark: "#DC2626",
  },

  info: {
    base: "#3B82F6",
    light: "#DBEAFE",
    dark: "#1D4ED8",
  },

  // Neutral Colors
  neutral: {
    white: "#FFFFFF",
    black: "#000000",
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#030712",
  },

  // Dark Theme
  dark: {
    bg: "#0F172A", // Slate-950
    surface: "#1E293B", // Slate-900
    border: "rgba(255, 255, 255, 0.1)",
    text: "#F1F5F9", // Slate-100
    textMuted: "#94A3B8", // Slate-400
  },
};

// ============================================================================
// SPACING SCALE
// ============================================================================

export const spacing = {
  xs: "4px", // 0.25rem
  sm: "8px", // 0.5rem
  md: "16px", // 1rem
  lg: "24px", // 1.5rem
  xl: "32px", // 2rem
  "2xl": "40px", // 2.5rem
  "3xl": "48px", // 3rem
  "4xl": "64px", // 4rem
};

// Tailwind-compatible spacing values
export const spacingMap = {
  xs: 1, // 4px (1 * 4)
  sm: 2, // 8px (2 * 4)
  md: 4, // 16px (4 * 4)
  lg: 6, // 24px (6 * 4)
  xl: 8, // 32px (8 * 4)
  "2xl": 10, // 40px (10 * 4)
  "3xl": 12, // 48px (12 * 4)
  "4xl": 16, // 64px (16 * 4)
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Headings
  heading: {
    xlarge: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: "-0.02em",
    },
    large: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    medium: {
      fontSize: "20px",
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: "-0.005em",
    },
    small: {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: 1.4,
    },
  },

  // Body Text
  body: {
    large: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    base: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.6,
    },
    small: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },

  // Labels & Captions
  label: {
    large: {
      fontSize: "13px",
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    },
    base: {
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: 1.5,
    },
    small: {
      fontSize: "11px",
      fontWeight: 500,
      lineHeight: 1.4,
    },
  },

  // Metric Numbers
  metric: {
    xlarge: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: 1,
    },
    large: {
      fontSize: "24px",
      fontWeight: 700,
      lineHeight: 1,
    },
    base: {
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: 1,
    },
  },
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: "none",
  xs: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  sm: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",

  // Colored shadows for brand
  primaryGlow: `0 0 30px rgba(255, 107, 53, 0.3)`, // Orange glow
  secondaryGlow: `0 0 30px rgba(0, 181, 165, 0.3)`, // Teal glow
  successGlow: `0 0 20px rgba(16, 185, 129, 0.2)`, // Green glow
  errorGlow: `0 0 20px rgba(239, 68, 68, 0.2)`, // Red glow
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: "0",
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "20px",
  "3xl": "24px",
  full: "9999px",
};

// ============================================================================
// TRANSITIONS
// ============================================================================

export const transitions = {
  fast: {
    duration: "150ms",
    timing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  base: {
    duration: "200ms",
    timing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  slow: {
    duration: "300ms",
    timing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  slower: {
    duration: "500ms",
    timing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

// ============================================================================
// COMPONENT SIZES
// ============================================================================

export const componentSizes = {
  // Button sizes
  button: {
    xs: {
      padding: "6px 12px",
      fontSize: "12px",
      height: "32px",
    },
    sm: {
      padding: "8px 16px",
      fontSize: "13px",
      height: "36px",
    },
    md: {
      padding: "10px 20px",
      fontSize: "14px",
      height: "40px",
    },
    lg: {
      padding: "12px 24px",
      fontSize: "15px",
      height: "44px",
    },
    xl: {
      padding: "14px 32px",
      fontSize: "16px",
      height: "48px",
    },
  },

  // Input sizes
  input: {
    sm: {
      padding: "8px 12px",
      fontSize: "13px",
      height: "36px",
    },
    md: {
      padding: "10px 14px",
      fontSize: "14px",
      height: "40px",
    },
    lg: {
      padding: "12px 16px",
      fontSize: "15px",
      height: "44px",
    },
  },

  // Card sizes
  card: {
    xs: {
      padding: "12px 16px",
    },
    sm: {
      padding: "16px 20px",
    },
    md: {
      padding: "20px 24px",
    },
    lg: {
      padding: "24px 32px",
    },
  },
};

// ============================================================================
// METRIC CARD CONFIG
// ============================================================================

export const metricCardConfig = {
  borderAccent: "3px", // Left border width
  backgroundColor: {
    success: colors.success.light,
    warning: colors.warning.light,
    error: colors.error.light,
    info: colors.info.light,
    primary: colors.primary.light,
    secondary: colors.secondary.light,
  },
  borderColor: {
    success: colors.success.base,
    warning: colors.warning.base,
    error: colors.error.base,
    info: colors.info.base,
    primary: colors.primary.base,
    secondary: colors.secondary.base,
  },
  numberSize: "18px",
  numberWeight: 700,
  labelSize: "11px",
  labelWeight: 600,
};

// ============================================================================
// Z-INDEX SCALE
// ============================================================================

export const zIndex = {
  hide: -1,
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// ============================================================================
// BREAKPOINTS
// ============================================================================

export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

export default {
  colors,
  spacing,
  spacingMap,
  typography,
  shadows,
  borderRadius,
  transitions,
  componentSizes,
  metricCardConfig,
  zIndex,
  breakpoints,
};
