/**
 * Centralized Design Tokens for UptoSkills Platform
 * 
 * Usage: Import these tokens across the application to ensure consistency
 * in colors, spacing, typography, and shadows.
 */

export const designTokens = {
  colors: {
    // Brand Colors
    primary: '#FF6B35', // UptoSkills Orange
    secondary: '#00B5A5', // UptoSkills Teal
    
    // Status Colors
    status: {
      success: '#10B981', // Green
      warning: '#F59E0B', // Amber
      error: '#EF4444',   // Red
      info: '#3B82F6',    // Blue
    },
    
    // Neutrals
    background: '#121212', // Dark background
    surface: '#1E1E1E',    // Component surface
    surfaceLight: '#2C2C2C',
    textPrimary: '#FFFFFF',
    textSecondary: '#A0A0A0',
    border: 'rgba(255, 255, 255, 0.1)',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    
    headings: {
      fontSize: '24px',
      fontWeight: 500,
      lineHeight: '1.2',
    },
    
    body: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '1.5',
    },
    
    small: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '1.4',
    }
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    glowPrimary: '0 0 15px rgba(255, 107, 53, 0.4)',
    glowSecondary: '0 0 15px rgba(0, 181, 165, 0.4)',
  },
  
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  }
};
