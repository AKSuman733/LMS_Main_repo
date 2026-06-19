// Centralized design tokens for UptoSkills admin frontend
export const colors = {
  primary: {
    main: '#FF6B35'
  },
  secondary: {
    main: '#00B5A5'
  },
  status: {
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#0D6EFD'
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  },
  background: {
    page: '#FFFFFF',
    surface: '#FFFDF9',
    muted: '#F7F6F5'
  },
  text: {
    primary: '#1F2937',
    secondary: '#374151',
    muted: '#6B7280',
    inverse: '#FFFFFF'
  },
  border: {
    default: '#E6E6E6',
    focus: '#C7F0E8'
  }
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px'
};

export const typography = {
  heading: {
    size: '24px',
    weight: 500
  },
  body: {
    size: '14px',
    weight: 400
  },
  small: {
    size: '12px',
    weight: 400
  },
  metric: {
    size: '18px',
    weight: 700
  },
  label: {
    size: '11px',
    weight: 500
  }
};

export const shadows = {
  small: '0 1px 2px rgba(16,24,40,0.05)',
  medium: '0 4px 8px rgba(16,24,40,0.08)',
  large: '0 10px 30px rgba(16,24,40,0.12)'
};

export const designTokens = {
  colors,
  spacing,
  typography,
  shadows
};

export default designTokens;
