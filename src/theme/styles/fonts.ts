/**
 * Typography Style Specification
 * 
 * This file contains font families, sizes, weights, and typography variants
 * that can be used consistently across all components in the project.
 */

// ----------------------------------------------------------------------
// FONT FAMILIES
// ----------------------------------------------------------------------

export const FONTS = {
  primary: '"Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  secondary: '"Sinerva", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: '"Roboto Mono", "SF Mono", Monaco, "Cascadia Code", monospace',
} as const;

// ----------------------------------------------------------------------
// FONT WEIGHTS
// ----------------------------------------------------------------------

export const FONT_WEIGHTS = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

// ----------------------------------------------------------------------
// TYPOGRAPHY VARIANTS
// ----------------------------------------------------------------------

export const TYPOGRAPHY = {
  // Headlines
  headline1: {
    fontFamily: FONTS.primary,
    fontSize: '3.75rem',    // 60px
    fontWeight: FONT_WEIGHTS.regular,
  },
  
  headline2: {
    fontFamily: FONTS.primary,
    fontSize: '2.5rem',       // 40px
    fontWeight: FONT_WEIGHTS.bold,
  },
  
  headline3: {
    fontFamily: FONTS.primary,
    fontSize: '2.25rem',    // 36px
    fontWeight: FONT_WEIGHTS.regular,
  },
  
  headline4: {
    fontFamily: FONTS.primary,
    fontSize: '1.875rem',   // 30px
    fontWeight: FONT_WEIGHTS.regular
  },
  
  headline5: {
    fontFamily: FONTS.primary,
    fontSize: '1.5rem',     // 24px
    fontWeight: FONT_WEIGHTS.regular,
  },
  
  headline6: {
    fontFamily: FONTS.primary,
    fontSize: '1.25rem',    // 20px
    fontWeight: FONT_WEIGHTS.regular
  },
  
  // Body Text
  body1: {
    fontFamily: FONTS.primary,
    fontSize: '1rem',       // 16px
    fontWeight: FONT_WEIGHTS.regular
  },
  
  body2: {
    fontFamily: FONTS.primary,
    fontSize: '0.875rem',   // 14px
    fontWeight: FONT_WEIGHTS.regular
  },

  body3: {
    fontFamily: FONTS.primary,
    fontSize: '1rem',       // 16px
    fontWeight: FONT_WEIGHTS.bold
  },

  body4: {
    fontFamily: FONTS.primary,
    fontSize: '0.625rem',       // 10px
    fontWeight: FONT_WEIGHTS.regular
  },
  
  
  // Captions and Small Text
  caption: {
    fontFamily: FONTS.primary,
    fontSize: '0.75rem',    // 12px
    fontWeight: FONT_WEIGHTS.regular
  },
  
  overline: {
    fontFamily: FONTS.primary,
    fontSize: '0.75rem',    // 12px
    fontWeight: FONT_WEIGHTS.medium,
    textTransform: 'uppercase',
  },
  
  // Button Text
  button: {
    fontFamily: FONTS.primary,
    fontSize: '0.875rem',   // 14px
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: 1.5,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
} as const;

// ----------------------------------------------------------------------
// RESPONSIVE TYPOGRAPHY
// ----------------------------------------------------------------------

export const RESPONSIVE_TYPOGRAPHY = {
  headline1: {
    xs: '2.5rem',   // 40px
    sm: '3rem',     // 48px
    md: '3.5rem',   // 56px
    lg: '3.75rem',  // 60px
  },
  
  headline2: {
    xs: '2rem',     // 32px
    sm: '2.5rem',   // 40px
    md: '2.75rem',  // 44px
    lg: '3rem',     // 48px
  },
  
  headline3: {
    xs: '1.75rem',  // 28px
    sm: '2rem',     // 32px
    md: '2.125rem', // 34px
    lg: '2.25rem',  // 36px
  },
  
  headline4: {
    xs: '1.5rem',   // 24px
    sm: '1.75rem',  // 28px
    md: '1.8125rem', // 29px
    lg: '1.875rem', // 30px
  },
  
  headline5: {
    xs: '1.25rem',  // 20px
    sm: '1.375rem', // 22px
    md: '1.4375rem', // 23px
    lg: '1.5rem',   // 24px
  },
  
  headline6: {
    xs: '1.125rem', // 18px
    sm: '1.1875rem', // 19px
    md: '1.21875rem', // 19.5px
    lg: '1.25rem',  // 20px
  },
} as const;

// ----------------------------------------------------------------------
// UTILITY FUNCTIONS
// ----------------------------------------------------------------------

export const TYPOGRAPHY_UTILS = {
  // Get typography variant
  get: (variant: keyof typeof TYPOGRAPHY) => TYPOGRAPHY[variant],
  
  // Get responsive font size
  getResponsive: (variant: keyof typeof RESPONSIVE_TYPOGRAPHY, breakpoint: keyof typeof RESPONSIVE_TYPOGRAPHY.headline1) => 
    RESPONSIVE_TYPOGRAPHY[variant][breakpoint],
  
  // Create responsive typography object for sx prop
  responsive: (variant: keyof typeof RESPONSIVE_TYPOGRAPHY) => ({
    fontSize: {
      xs: RESPONSIVE_TYPOGRAPHY[variant].xs,
      sm: RESPONSIVE_TYPOGRAPHY[variant].sm,
      md: RESPONSIVE_TYPOGRAPHY[variant].md,
      lg: RESPONSIVE_TYPOGRAPHY[variant].lg,
    },
  }),
} as const;

// ----------------------------------------------------------------------
// EXPORT ALL
// ----------------------------------------------------------------------

export const STYLE_SPEC = {
  fonts: FONTS,
  fontWeights: FONT_WEIGHTS,
  typography: TYPOGRAPHY,
  responsiveTypography: RESPONSIVE_TYPOGRAPHY,
  utils: TYPOGRAPHY_UTILS,
} as const;

export default STYLE_SPEC;
