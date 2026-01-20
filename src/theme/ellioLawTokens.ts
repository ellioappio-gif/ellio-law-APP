/**
 * ellio Design System v1.0
 * Canonical source of truth for the Ellio Law app
 * 
 * Philosophy: calm, reassuring, steady, intelligent
 * Derived from: elephant logo geometry, blue-indigo gradient
 */

export const ellioLawTokens = {
  // COLORS (Blue-indigo from logo)
  color: {
    // Core brand
    brandPrimary: '#5B6EF5',      // logo blue
    brandSecondary: '#7AA7FF',    // light blue highlight
    brandIndigo: '#4B5FD0',       // deeper indigo
    brand: '#5B6EF5',             // alias for compatibility
    brandLight: '#7AA7FF',        // alias for compatibility
    brandDark: '#4B5FD0',         // alias for compatibility

    // Backgrounds
    background: {
      primary: '#F8FAFF',         // app background (soft blue)
      secondary: '#FFFFFF',       // cards
    },
    surface: '#FFFFFF',           // card surfaces
    surfaceMuted: '#F1F4FA',      // secondary surfaces

    // Text
    text: {
      primary: '#1F2937',         // near-black, calm
      secondary: '#6B7280',       // muted gray
      tertiary: '#9CA3AF',        // helper text
      inverse: '#FFFFFF',         // on dark backgrounds
    },

    // Borders & dividers
    border: '#E5E9F2',
    divider: '#EEF2F8',

    // Semantic states (subtle, never loud)
    success: '#4CAF93',
    warning: '#F5B971',
    error: '#E06C6C',
    info: '#7AA7FF',
    completion: '#4CAF93',
    deadline: '#E06C6C',

    // Overlays
    overlay: 'rgba(31, 41, 55, 0.4)',
  },

  // SPACING (8-point grid)
  spacing: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // RADIUS (rounded, soft, human)
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 999,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 999,
  },

  // TYPOGRAPHY
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    base: 16,
    lg: 18,
    xl: 22,
    '2xl': 28,
    '3xl': 36,
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    base: 16,
    lg: 18,
    xl: 22,
    '2xl': 28,
    '3xl': 36,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  fontWeights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },

  // SHADOWS (subtle elevation)
  shadow: {
    card: {
      shadowColor: '#1F2937',
      shadowOpacity: 0.06,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
  },

  // MOTION (soft, predictable)
  motion: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
} as const;

export default ellioLawTokens;
