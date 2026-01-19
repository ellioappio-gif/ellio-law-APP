/**
 * ellio-law Design Tokens
 * 
 * Semantic extension of ellio core tokens for legal navigation context.
 * Inherits all base tokens, adds domain-specific aliases.
 * 
 * Legal context requirements:
 * - Calm, never alarming
 * - Neutral, never authoritative
 * - Educational, never directive
 * - Trustworthy, never overconfident
 */

import {
  EllioPrimaryColors,
  EllioNeutralColors,
  EllioSemanticColors,
  EllioFonts,
  EllioFontSizes,
  EllioFontWeights,
  EllioLineHeights,
  EllioSpacing,
  EllioBorderRadius,
  EllioShadows,
  EllioAnimation,
  EllioEasing,
  EllioOpacity,
} from './ellioTokens';

// ============================================================================
// LEGAL-SPECIFIC COLOR SEMANTICS
// ============================================================================

/**
 * Legal UI colors
 * Mapped from ellio core for legal context
 */
export const EllioLawColors = {
  // Brand
  brand: EllioPrimaryColors.primary700,
  brandLight: EllioPrimaryColors.primary300,
  brandDark: EllioPrimaryColors.primary900,
  brandSubtle: EllioPrimaryColors.primary50,
  
  // Surfaces
  background: EllioNeutralColors.neutral100,
  surface: EllioNeutralColors.white,
  surfaceElevated: EllioNeutralColors.neutral50,
  overlay: EllioNeutralColors.neutral900,
  
  // Text
  textPrimary: EllioNeutralColors.neutral900,
  textSecondary: EllioNeutralColors.neutral600,
  textTertiary: EllioNeutralColors.neutral300,
  textInverse: EllioNeutralColors.white,
  textBrand: EllioPrimaryColors.primary700,
  
  // Borders & Dividers
  border: EllioNeutralColors.neutral200,
  borderSubtle: EllioNeutralColors.neutral100,
  borderFocus: EllioPrimaryColors.primary700,
  divider: EllioNeutralColors.neutral200,
  
  // Interactive states
  interactiveDefault: EllioPrimaryColors.primary700,
  interactiveHover: EllioPrimaryColors.primary600,
  interactivePressed: EllioPrimaryColors.primary800,
  interactiveDisabled: EllioNeutralColors.neutral300,
  
  // Legal semantic colors
  // Information — neutral guidance
  information: EllioSemanticColors.info700,
  informationBackground: EllioSemanticColors.info100,
  informationText: EllioSemanticColors.info900,
  
  // Completion — understanding achieved (blue, not green)
  completion: EllioSemanticColors.success700,
  completionBackground: EllioSemanticColors.success100,
  completionText: EllioSemanticColors.success900,
  
  // Important — needs attention but not urgent
  important: EllioSemanticColors.caution900,
  importantBackground: EllioSemanticColors.caution100,
  importantText: EllioSemanticColors.caution900,
  
  // Deadline — legal deadline (use sparingly, with explanation)
  deadline: EllioSemanticColors.critical700,
  deadlineBackground: EllioSemanticColors.critical100,
  deadlineText: EllioSemanticColors.critical900,
} as const;

// ============================================================================
// LEGAL-SPECIFIC TYPOGRAPHY
// ============================================================================

/**
 * Typography scale for legal content
 * Optimized for readability and calm understanding
 */
export const EllioLawTypography = {
  // Headings
  heading1: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.xxl,
    fontWeight: EllioFontWeights.bold,
    lineHeight: EllioLineHeights.tight,
    color: EllioLawColors.textPrimary,
  },
  heading2: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.xl,
    fontWeight: EllioFontWeights.semibold,
    lineHeight: EllioLineHeights.tight,
    color: EllioLawColors.textPrimary,
  },
  heading3: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.lg,
    fontWeight: EllioFontWeights.semibold,
    lineHeight: EllioLineHeights.normal,
    color: EllioLawColors.textPrimary,
  },
  heading4: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.md,
    fontWeight: EllioFontWeights.medium,
    lineHeight: EllioLineHeights.normal,
    color: EllioLawColors.textPrimary,
  },
  
  // Body text
  bodyLarge: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.md,
    fontWeight: EllioFontWeights.normal,
    lineHeight: EllioLineHeights.relaxed,
    color: EllioLawColors.textPrimary,
  },
  body: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.base,
    fontWeight: EllioFontWeights.normal,
    lineHeight: EllioLineHeights.relaxed,
    color: EllioLawColors.textPrimary,
  },
  bodySmall: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.sm,
    fontWeight: EllioFontWeights.normal,
    lineHeight: EllioLineHeights.normal,
    color: EllioLawColors.textSecondary,
  },
  
  // Specialized
  caption: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.xs,
    fontWeight: EllioFontWeights.normal,
    lineHeight: EllioLineHeights.normal,
    color: EllioLawColors.textTertiary,
  },
  label: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.sm,
    fontWeight: EllioFontWeights.medium,
    lineHeight: EllioLineHeights.normal,
    color: EllioLawColors.textSecondary,
  },
  button: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.base,
    fontWeight: EllioFontWeights.semibold,
    lineHeight: EllioLineHeights.tight,
    color: EllioLawColors.textInverse,
  },
  
  // Legal-specific: definitions, explanations
  legalDefinition: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.base,
    fontWeight: EllioFontWeights.normal,
    lineHeight: EllioLineHeights.relaxed,
    color: EllioLawColors.textPrimary,
  },
  legalDisclaimer: {
    fontFamily: EllioFonts.primary,
    fontSize: EllioFontSizes.xs,
    fontWeight: EllioFontWeights.normal,
    lineHeight: EllioLineHeights.relaxed,
    color: EllioLawColors.textTertiary,
  },
} as const;

// ============================================================================
// SPACING (inherited, no changes needed)
// ============================================================================

export { EllioSpacing };

// ============================================================================
// LAYOUT
// ============================================================================

export const EllioLawLayout = {
  containerMaxWidth: 1200,
  contentMaxWidth: 768,
  screenPaddingHorizontal: EllioSpacing.md,
  screenPaddingVertical: EllioSpacing.lg,
  cardPadding: EllioSpacing.md,
  sectionSpacing: EllioSpacing.xl,
} as const;

// ============================================================================
// COMPONENT TOKENS
// ============================================================================

export const EllioLawComponents = {
  // Cards
  card: {
    backgroundColor: EllioLawColors.surface,
    borderRadius: EllioBorderRadius.lg,
    padding: EllioSpacing.md,
    shadow: EllioShadows.sm,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  cardElevated: {
    backgroundColor: EllioLawColors.surface,
    borderRadius: EllioBorderRadius.lg,
    padding: EllioSpacing.md,
    shadow: EllioShadows.md,
    borderWidth: 0,
    borderColor: 'transparent',
  },
  cardOutlined: {
    backgroundColor: EllioLawColors.surface,
    borderRadius: EllioBorderRadius.lg,
    padding: EllioSpacing.md,
    shadow: EllioShadows.none,
    borderWidth: 1,
    borderColor: EllioLawColors.border,
  },
  
  // Buttons
  buttonPrimary: {
    backgroundColor: EllioLawColors.interactiveDefault,
    borderRadius: EllioBorderRadius.md,
    paddingVertical: EllioSpacing.sm,
    paddingHorizontal: EllioSpacing.lg,
    minHeight: 48,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderRadius: EllioBorderRadius.md,
    paddingVertical: EllioSpacing.sm,
    paddingHorizontal: EllioSpacing.lg,
    borderWidth: 1,
    borderColor: EllioLawColors.border,
    minHeight: 48,
  },
  buttonText: {
    backgroundColor: 'transparent',
    borderRadius: EllioBorderRadius.md,
    paddingVertical: EllioSpacing.sm,
    paddingHorizontal: EllioSpacing.md,
    minHeight: 48,
  },
  
  // Input fields
  input: {
    backgroundColor: EllioLawColors.surface,
    borderRadius: EllioBorderRadius.md,
    paddingVertical: EllioSpacing.sm,
    paddingHorizontal: EllioSpacing.md,
    borderWidth: 1,
    borderColor: EllioLawColors.border,
    minHeight: 48,
    fontSize: EllioFontSizes.base,
  },
  
  // Tooltips & explanations
  tooltip: {
    backgroundColor: EllioNeutralColors.neutral900,
    borderRadius: EllioBorderRadius.md,
    padding: EllioSpacing.sm,
    maxWidth: 280,
    shadow: EllioShadows.lg,
  },
  explanation: {
    backgroundColor: EllioLawColors.informationBackground,
    borderRadius: EllioBorderRadius.lg,
    padding: EllioSpacing.md,
    borderLeftWidth: 4,
    borderLeftColor: EllioLawColors.information,
  },
  
  // Legal-specific: case status indicators
  statusIndicator: {
    borderRadius: EllioBorderRadius.full,
    paddingVertical: EllioSpacing.xxs,
    paddingHorizontal: EllioSpacing.sm,
    fontSize: EllioFontSizes.xs,
    fontWeight: EllioFontWeights.medium,
  },
} as const;

// ============================================================================
// ACCESSIBILITY
// ============================================================================

export const EllioLawAccessibility = {
  minTouchTarget: 48,
  focusRingWidth: 2,
  focusRingColor: EllioLawColors.borderFocus,
  focusRingOffset: 2,
  
  // WCAG contrast requirements
  contrastMinimum: 4.5,    // AA for normal text
  contrastEnhanced: 7,     // AAA for normal text
  contrastLarge: 3,        // AA for large text
} as const;

// ============================================================================
// ANIMATION (inherited)
// ============================================================================

export { EllioAnimation, EllioEasing, EllioOpacity };

// ============================================================================
// RE-EXPORTS
// ============================================================================

export {
  EllioBorderRadius,
  EllioShadows,
  EllioFonts,
  EllioFontSizes,
  EllioFontWeights,
  EllioLineHeights,
};

// ============================================================================
// COMBINED TOKENS EXPORT
// ============================================================================

export const ellioLawTokens = {
  color: {
    // Brand
    brand: EllioLawColors.brand,
    brandLight: EllioLawColors.brandLight,
    brandDark: EllioLawColors.brandDark,
    brandSubtle: EllioLawColors.brandSubtle,
    
    // Backgrounds with nested structure
    background: {
      primary: EllioLawColors.background,
      secondary: EllioLawColors.surface,
      elevated: EllioLawColors.surfaceElevated,
    },
    
    // Text with nested structure
    text: {
      primary: EllioLawColors.textPrimary,
      secondary: EllioLawColors.textSecondary,
      tertiary: EllioLawColors.textTertiary,
      inverse: EllioLawColors.textInverse,
      brand: EllioLawColors.textBrand,
    },
    
    // Borders
    border: EllioLawColors.border,
    borderSubtle: EllioLawColors.borderSubtle,
    borderFocus: EllioLawColors.borderFocus,
    divider: EllioLawColors.divider,
    
    // Interactive
    interactiveDefault: EllioLawColors.interactiveDefault,
    interactiveHover: EllioLawColors.interactiveHover,
    interactivePressed: EllioLawColors.interactivePressed,
    interactiveDisabled: EllioLawColors.interactiveDisabled,
    
    // Semantic
    information: EllioLawColors.information,
    informationBackground: EllioLawColors.informationBackground,
    informationText: EllioLawColors.informationText,
    completion: EllioLawColors.completion,
    completionBackground: EllioLawColors.completionBackground,
    completionText: EllioLawColors.completionText,
    important: EllioLawColors.important,
    importantBackground: EllioLawColors.importantBackground,
    importantText: EllioLawColors.importantText,
    deadline: EllioLawColors.deadline,
    deadlineBackground: EllioLawColors.deadlineBackground,
    deadlineText: EllioLawColors.deadlineText,
    
    // Aliases for common usage patterns
    disclaimerBackground: EllioLawColors.importantBackground,
    educationalHighlight: EllioLawColors.information,
    caseActive: EllioLawColors.brand,
    caseSettled: EllioLawColors.completion,
    caseDismissed: EllioLawColors.textTertiary,
    courtNeutral: EllioLawColors.informationBackground,
    deadlineUrgent: EllioLawColors.deadline,
  },
  typography: EllioLawTypography,
  spacing: EllioSpacing,
  radius: EllioBorderRadius,
  shadow: EllioShadows,
  layout: EllioLawLayout,
  components: EllioLawComponents,
  accessibility: EllioLawAccessibility,
  animation: EllioAnimation,
  easing: EllioEasing,
  opacity: EllioOpacity,
  fonts: EllioFonts,
  fontSizes: EllioFontSizes,
  fontWeights: EllioFontWeights,
  lineHeights: EllioLineHeights,
} as const;
