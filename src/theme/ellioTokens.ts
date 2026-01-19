/**
 * ellio Design System — Core Tokens
 * 
 * Canonical design foundation for all ellio products.
 * Never override these values directly.
 * Extend via semantic aliases in product-specific token files.
 * 
 * Philosophy:
 * - Calm over urgency
 * - Clarity over density
 * - Trust over authority
 * - One step at a time
 */

// ============================================================================
// COLOR SYSTEM
// ============================================================================

/**
 * Primary palette — Purple gradient family
 * Represents trust, calm, and stability
 */
export const EllioPrimaryColors = {
  primary900: '#4C3D99',    // Deepest purple
  primary800: '#5B4DB3',
  primary700: '#6C5CE7',    // Core brand purple
  primary600: '#7D6DF0',
  primary500: '#8E7EF3',
  primary400: '#9F8FF6',
  primary300: '#A29BFE',    // Light purple accent
  primary200: '#B8B2FF',
  primary100: '#D1CDFF',
  primary50: '#E8E6FF',
} as const;

/**
 * Neutral palette — Gray scale for text and surfaces
 * Designed for readability and calm hierarchy
 */
export const EllioNeutralColors = {
  neutral900: '#2D3436',    // Primary text
  neutral800: '#3D4547',
  neutral700: '#4D5558',
  neutral600: '#636E72',    // Secondary text
  neutral500: '#7D8488',
  neutral400: '#95A5A6',
  neutral300: '#B2BEC3',    // Tertiary text, icons
  neutral200: '#DFE6E9',    // Borders, dividers
  neutral100: '#F8F9FA',    // Background surfaces
  neutral50: '#FCFCFD',     // Canvas
  white: '#FFFFFF',
} as const;

/**
 * Semantic colors — Contextual meaning
 * Used sparingly and with intention
 */
export const EllioSemanticColors = {
  // Information — neutral blue, not alarm
  info900: '#0984E3',
  info700: '#74B9FF',
  info500: '#A4CAFE',
  info100: '#E3F2FD',
  
  // Success — completion and understanding (blue, not green)
  success900: '#0984E3',
  success700: '#74B9FF',
  success500: '#A4CAFE',
  success100: '#E3F2FD',
  
  // Caution — important but not urgent
  caution900: '#FDCB6E',
  caution700: '#FFEAA7',
  caution500: '#FFF4D6',
  caution100: '#FFFBF0',
  
  // Critical — only when legally unavoidable
  critical900: '#D63031',
  critical700: '#FF7675',
  critical500: '#FFB8B8',
  critical100: '#FFE5E5',
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

/**
 * Font families
 * System fonts for performance and native feel
 */
export const EllioFonts = {
  primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
} as const;

/**
 * Font sizes — Scale designed for readability
 * Never go below 14px for body copy
 */
export const EllioFontSizes = {
  xs: 12,      // Legal disclaimers, footnotes only
  sm: 14,      // Minimum for body copy
  base: 16,    // Default body text
  md: 18,      // Emphasized body, small headings
  lg: 20,      // Section headings
  xl: 24,      // Screen titles
  xxl: 28,     // Hero text
  xxxl: 32,    // Marketing/onboarding only
} as const;

/**
 * Font weights
 * Use sparingly — structure over weight
 */
export const EllioFontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

/**
 * Line heights — Optimized for calm reading
 */
export const EllioLineHeights = {
  tight: 1.25,    // Headings only
  normal: 1.5,    // Body text
  relaxed: 1.75,  // Long-form, legal copy
} as const;

// ============================================================================
// SPACING SYSTEM
// ============================================================================

/**
 * Spacing scale — 4px base unit
 * Consistent rhythm reduces cognitive load
 */
export const EllioSpacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  xxxxl: 96,
} as const;

// ============================================================================
// BORDER RADIUS
// ============================================================================

/**
 * Border radius — Gentle, approachable
 */
export const EllioBorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

// ============================================================================
// SHADOWS & ELEVATION
// ============================================================================

/**
 * Shadow system — Subtle depth
 */
export const EllioShadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

// ============================================================================
// ANIMATION & TIMING
// ============================================================================

/**
 * Animation durations — Calm, never jarring
 */
export const EllioAnimation = {
  instant: 0,
  fast: 150,
  base: 250,
  slow: 350,
  slower: 500,
} as const;

/**
 * Easing curves
 */
export const EllioEasing = {
  linear: 'cubic-bezier(0, 0, 1, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// ============================================================================
// OPACITY
// ============================================================================

export const EllioOpacity = {
  disabled: 0.38,
  hover: 0.04,
  focus: 0.12,
  pressed: 0.16,
  overlay: 0.6,
} as const;
