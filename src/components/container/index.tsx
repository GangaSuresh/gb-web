import type { BoxProps } from '@mui/material/Box';
import { Box, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

export interface ContainerProps extends Omit<BoxProps, 'sx'> {
  /**
   * Whether to center the container horizontally
   * @default true
   */
  center?: boolean;
  /**
   * Container variant for different use cases
   * @default 'main'
   */
  variant?: 'main' | 'section' | 'narrow' | 'wide';
  /**
   * Custom max width override (overrides variant)
   */
  maxWidth?: string | number;
  /**
   * Custom width override (overrides variant)
   */
  width?: string | number;
  /**
   * Additional sx styles
   */
  sx?: BoxProps['sx'];
}

/**
 * A responsive container component with consistent width and max-width
 * 
 * Variants:
 * - main: 90% width, 1140px max-width (default)
 * - section: 90% width, 1140px max-width (same as main)
 * - narrow: 90% width, 800px max-width
 * - wide: 95% width, 1400px max-width
 * 
 * @example
 * ```tsx
 * <Container>
 *   <Typography>Your main content here</Typography>
 * </Container>
 * ```
 * 
 * @example
 * ```tsx
 * <Container variant="narrow">
 *   <Typography>Narrow content for forms</Typography>
 * </Container>
 * ```
 * 
 * @example
 * ```tsx
 * <Container maxWidth="800px" width="95%">
 *   <Typography>Custom sized content</Typography>
 * </Container>
 * ```
 */
export default function Container({
  children,
  center = true,
  variant = 'main',
  maxWidth,
  width,
  sx,
  ...other
}: ContainerProps) {
  const theme = useTheme();

  // Define variant configurations
  const variantConfig = {
    main: {
      width: '90%',
      maxWidth: '1140px',
    },
    section: {
      width: '90%',
      maxWidth: '1140px',
    },
    narrow: {
      width: '90%',
      maxWidth: '800px',
    },
    wide: {
      width: '95%',
      maxWidth: '1400px',
    },
  };

  // Use custom values if provided, otherwise use variant defaults
  const containerWidth = width || variantConfig[variant].width;
  const containerMaxWidth = maxWidth || variantConfig[variant].maxWidth;

  return (
    <Box
      sx={{
        width: containerWidth,
        maxWidth: containerMaxWidth,
        ...(center && {
          mx: 'auto',
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}
