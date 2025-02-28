// Centralized theme constants for the Dev Log App
export const theme = {
  // Colors
  colors: {
    // Primary UI colors
    primary: '#252525',
    secondary: '#1e1e1e',
    accent: '#808080',      // Changed to mid-gray
    accentHover: '#a0a0a0', // Changed to light gray
    
    // Text colors
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    textMuted: '#999999',
    
    // Border colors
    borderLight: '#484848',  // Updated to be lighter than backgrounds
    borderDark: '#2a2a2a',   // Updated to be lighter than darkest background
    
    // Status colors (now grayscale)
    statusLow: '#4a5568',    // Kept as is (dark gray)
    statusMedium: '#777777', // Changed to mid-gray
    statusHigh: '#999999',   // Changed to light gray
    statusCritical: '#bbbbbb', // Changed to very light gray
    
    // UI element colors
    navBackground: '#383737',
    cardBackground: '#252525',
    inputBackground: '#1e1e1e',
    buttonPrimary: '#718096', // Kept as is (grayish)
    buttonSecondary: '#4a5568', // Kept as is (darker gray)
    buttonDanger: '#2d3748',  // Kept as is (very dark gray)
    buttonCancel: '#a0aec0',  // Kept as is (light gray)
    iconButtonEdit: '#4a5568',
    iconButtonDelete: '#2d3748',
    iconButtonSave: '#718096',
    iconButtonCancel: '#a0aec0'
  },
  
  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    xxl: '2rem'
  },
  
  // Borders
  borders: {
    radius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '0.625rem'
    }
  },
  
  // Typography
  typography: {
    fontSizes: {
      sm: '0.875rem',
      md: '1rem',
      lg: '1.2rem',
      xl: '1.5rem'
    }
  },
  
  // Breakpoints
  breakpoints: {
    mobile: '768px'
  },
  
  // Transitions
  transitions: {
    default: 'all 0.3s ease'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.05)',
    lg: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }
};

export default theme;
