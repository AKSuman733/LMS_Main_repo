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
  background: '#F8F9FA',     // Page background
  surface: '#FFFFFF',        // Card background
  surfaceAlt: '#F1F3F5',    // Alternate surface
  border: '#E2E8F0',         // Default borders
  borderLight: '#F1F5F9',    // Subtle borders

  // Text
  textPrimary: '#1A202C',    // Main headings
  textSecondary: '#4A5568',  // Body text
  textMuted: '#718096',      // Labels, captions
  textDisabled: '#A0AEC0',   // Disabled state

  // Status
  success: '#22C55E',
  successLight: '#F0FDF4',
  successDark: '#16A34A',

  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  warningDark: '#D97706',

  error: '#EF4444',
  errorLight: '#FEF2F2',
  errorDark: '#DC2626',

  info: '#3B82F6',
  infoLight: '#EFF6FF',
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
    heading: { fontSize: '24px', fontWeight: 500, lineHeight: 1.2, color: '#1A202C' },
    subheading: { fontSize: '18px', fontWeight: 600, lineHeight: 1.3, color: '#1A202C' },
    body: { fontSize: '14px', fontWeight: 400, lineHeight: 1.5, color: '#4A5568' },
    small: { fontSize: '12px', fontWeight: 400, lineHeight: 1.5, color: '#718096' },
    label: { fontSize: '11px', fontWeight: 500, lineHeight: 1.4, color: '#718096' },
    caption: { fontSize: '11px', fontWeight: 400, lineHeight: 1.4, color: '#A0AEC0' },
    metricNumber: { fontSize: '28px', fontWeight: 700, lineHeight: 1.1, color: '#1A202C' },
    metricLabel: { fontSize: '11px', fontWeight: 500, lineHeight: 1.3, color: '#718096' },
  },
} as const

// --- SHADOWS ---
export const shadows = {
  none: 'none',
  xs: '0 1px 2px rgba(0,0,0,0.05)',
  sm: '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
  md: '0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)',
  lg: '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
  xl: '0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)',
  card: '0 2px 8px rgba(0,0,0,0.08)',
  cardHover: '0 8px 24px rgba(0,0,0,0.12)',
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
    color: '#4A5568',
    border: '1px solid #E2E8F0',
    hoverBackground: '#F1F5F9',
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
