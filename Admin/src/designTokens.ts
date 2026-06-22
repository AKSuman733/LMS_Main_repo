// ============================================
// UPTOSKILLS DESIGN TOKENS
// Single source of truth for all design values
// ============================================

// --- COLORS ---
export const colors = {
  // Brand
  primary: '#FF6B35',        // UptoSkills Orange - CTAs, buttons, highlights
  primaryLight: '#FFF0EB',   // Orange tint - backgrounds, hover states
  primaryDark: '#E85520',    // Darker orange - pressed states

  secondary: '#00B5A5',      // UptoSkills Teal - secondary actions, accents
  secondaryLight: '#E6F7F6', // Teal tint - backgrounds
  secondaryDark: '#008F82',  // Darker teal - pressed states

  // Neutral
  white: '#FFFFFF',
  background: '#0A0F1E',     // Page background
  surface: '#111827',        // Card background
  surfaceAlt: '#1A2540',    // Alternate surface
  border: '#1A2540',         // Default borders
  borderLight: '#2E3A59',    // Subtle borders

  // Text
  textPrimary: '#FFFFFF',    // Main headings
  textSecondary: '#E5E7EB',  // Body text
  textMuted: '#9CA3AF',      // Labels, captions
  textDisabled: '#4B5563',   // Disabled state

  // Status
  success: '#00B5A5',
  successLight: 'rgba(0, 181, 165, 0.1)',
  successDark: '#008F82',

  // Warning/Error/Info
  warning: '#F59E0B',
  warningLight: 'rgba(245, 158, 11, 0.1)',
  warningDark: '#D97706',

  error: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.1)',
  errorDark: '#DC2626',

  info: '#3B82F6',
  infoLight: 'rgba(59, 130, 246, 0.1)',
  infoDark: '#2563EB',

  // Metric card accent borders
  accentGreen: '#22C55E',
  accentTeal: '#00B5A5',
  accentOrange: '#FF6B35',
  accentRed: '#EF4444',
  accentAmber: '#F59E0B',
  accentBlue: '#3B82F6',
} as const

// --- SPACING SCALE ---
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
  xxxl: '64px',
} as const

// --- BORDER RADIUS ---
export const radius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const

// --- TYPOGRAPHY ---
export const typography = {
  // Font family
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",

  // Font sizes
  fontSize: {
    xs: '11px',
    sm: '12px',
    base: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '32px',
  },

  // Font weights
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },

  // Predefined text styles
  styles: {
    heading: { fontSize: '24px', fontWeight: 500, lineHeight: 1.2, color: '#FFFFFF' },
    subheading: { fontSize: '18px', fontWeight: 600, lineHeight: 1.3, color: '#FFFFFF' },
    body: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5, color: '#E5E7EB' },
    small: { fontSize: '12px', fontWeight: 400, lineHeight: 1.5, color: '#9CA3AF' },
    label: { fontSize: '11px', fontWeight: 500, lineHeight: 1.4, color: '#9CA3AF' },
    caption: { fontSize: '11px', fontWeight: 400, lineHeight: 1.4, color: '#9CA3AF' },
    metricNumber: { fontSize: '28px', fontWeight: 700, lineHeight: 1.1, color: '#FFFFFF' },
    metricLabel: { fontSize: '11px', fontWeight: 500, lineHeight: 1.3, color: '#9CA3AF' },
  },
} as const

// --- SHADOWS ---
export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0,0,0,0.3)',
  sm: '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)',
  md: '0 4px 6px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
  lg: '0 10px 15px rgba(0,0,0,0.5), 0 4px 6px rgba(0,0,0,0.4)',
  xl: '0 20px 25px rgba(0,0,0,0.5), 0 10px 10px rgba(0,0,0,0.3)',
  card: '0 2px 8px rgba(0,0,0,0.4)',
  cardHover: '0 8px 24px rgba(0,0,0,0.5)',
  button: '0 2px 4px rgba(255,107,53,0.3)',
  buttonTeal: '0 2px 4px rgba(0,181,165,0.3)',
} as const

// --- TRANSITIONS ---
export const transitions = {
  fast: 'all 0.15s ease',
  normal: 'all 0.2s ease',
  slow: 'all 0.3s ease',
} as const

// --- BREAKPOINTS ---
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const

// --- Z-INDEX ---
export const zIndex = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const

// --- BUTTON VARIANTS ---
export const buttonVariants = {
  primary: {
    background: '#FF6B35',
    color: '#FFFFFF',
    border: 'none',
    hoverBackground: '#E85520',
    shadow: '0 2px 4px rgba(255,107,53,0.3)',
  },
  secondary: {
    background: 'transparent',
    color: '#00B5A5',
    border: '2px solid #00B5A5',
    hoverBackground: '#E6F7F6',
    shadow: '0 2px 4px rgba(0,181,165,0.3)',
  },
  ghost: {
    background: 'transparent',
    color: '#9CA3AF',
    border: '1px solid #1E2D45',
    hoverBackground: '#1A2540',
    shadow: 'none',
  },
  danger: {
    background: '#EF4444',
    color: '#FFFFFF',
    border: 'none',
    hoverBackground: '#DC2626',
    shadow: '0 2px 4px rgba(239,68,68,0.3)',
  },
} as const

// --- METRIC CARD CONFIGS ---
export const metricCardConfigs = {
  activeUsers:    { accentColor: '#22C55E', bgColor: '#F0FDF4', icon: 'Users' },
  totalCourses:   { accentColor: '#00B5A5', bgColor: '#E6F7F6', icon: 'BookOpen' },
  weekEnrollments:{ accentColor: '#FF6B35', bgColor: '#FFF0EB', icon: 'TrendingUp' },
  completionRate: { accentColor: '#22C55E', bgColor: '#F0FDF4', icon: 'CheckCircle' },
  pendingApprovals:{ accentColor: '#EF4444', bgColor: '#FEF2F2', icon: 'Clock' },
  systemHealth:   { accentColor: '#22C55E', bgColor: '#F0FDF4', icon: 'Activity' },
} as const

// Default export for convenience
const tokens = { colors, spacing, radius, typography, shadows, transitions, breakpoints, zIndex, buttonVariants, metricCardConfigs }
export default tokens
