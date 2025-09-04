import React from 'react';
import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { camelToTitle } from 'src/utils/camel-to-title';
import { Box, Collapse, Typography } from '@mui/material';

import type { TierItem } from './types';

interface BenefitsProps {
  benefitsExpanded: boolean;
  tiers: TierItem[];
  images: Record<string, string>;
  isMobile:boolean;
  isTablet:boolean;
  addBorderRadiusOnTop?:boolean;
}

export default function BenefitsComponent({
  benefitsExpanded,
  isMobile,
  tiers,
  images,
  isTablet,
  addBorderRadiusOnTop=false
}: BenefitsProps) {
  // Extract all benefit keys except title and range
  const benefitKeys = Object.keys(tiers[0]).filter(
    (key) => key !== 'title' && key !== 'range'
  ) as Array<keyof Omit<TierItem, 'title' | 'range'>>;

  // Note: Grid-based sizing removed in favor of flexbox layout for better responsiveness

  // Format benefit values for display
  const formatBenefitValue = (value: any): React.ReactNode => {
    if (typeof value === 'boolean') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',height:'100%' }}>
          <Iconify icon={value ? 'mdi:check' : 'mdi:close'} />
        </Box>
      );
    }
    return (
        <Typography sx={{ ...((isMobile || isTablet) ? TYPOGRAPHY.caption:TYPOGRAPHY.body2), fontWeight: 600, textAlign: 'center' }}>
          {value}
        </Typography>
    );
  };

  return (
    <Collapse in={benefitsExpanded}>
      <Box
        sx={{
          color: 'white',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
          borderRadius: addBorderRadiusOnTop ? '16px' : undefined,
          overflow: 'hidden',
        }}
      >
        {/* Responsive container with horizontal scroll */}
        <Box
          sx={{
            display: 'flex',
            minWidth: 0, // Allow flex item to shrink below content size
            ...((isMobile || isTablet) && {
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '3px',
              },
            }),
          }}
        >
          {/* Sticky Benefits Column */}
          <Box
            sx={{
              maxWidth: (isMobile || isTablet) ? '150px' : 'auto',
              flexShrink: 0,
              position: (isMobile || isTablet) ? 'sticky' : 'static',
              left: 0,
              zIndex: 1,
              backgroundColor: 'primary.dark',
            }}
          >
            {/* Benefits Header */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                p: '1.875rem 1.875rem 0 1.875rem',
                height:(isMobile || isTablet)?'8rem':'10rem',
              }}
            >
              <img src={images.benefits} alt="benefits" />
              <Typography sx={{ ...((isMobile || isTablet) ? TYPOGRAPHY.caption:TYPOGRAPHY.body1), fontWeight: 600 }}>Benefits</Typography>
            </Box>

            {/* Benefits Rows */}
            {benefitKeys.map((benefitKey, index) => (
              <Box
                key={`benefit-row-${index}`}
                sx={{
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ p: '1.2rem', width: '100%' }}>
                  <Typography sx={{ ...((isMobile || isTablet) ? TYPOGRAPHY.caption:TYPOGRAPHY.body2) }}>{camelToTitle(benefitKey)}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Scrollable Tier Columns */}
          <Box
            sx={{
              display: 'flex',
              maxWidth: (isMobile || isTablet) ? `${tiers.length * 150}px` : 'auto',
              flex: 1,
            }}
          >
            {tiers.map((tier, tierIndex) => (
              <Box
                key={`tier-column-${tierIndex}`}
                sx={{
                  maxWidth: (isMobile || isTablet) ? '150px' : 'auto',
                  flex: (isMobile || isTablet) ? 'none' : 1,
                  backgroundColor: 'primary.main',
                }}
              >
                {/* Tier Header */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    p: '1.875rem 1.875rem 0 1.875rem',
                    height:(isMobile || isTablet)?'8rem':'10rem',
                    textAlign: 'center',
                  }}
                >
                  <img
                    src={images[`${tier.title.toLowerCase()}-badge`]}
                    alt={`${tier.title}-badge`}
                    style={{  width: (isMobile || isTablet) ? '30px' : 'auto', height: (isMobile || isTablet) ? '40px' : 'auto'  }}
                  />
                  <Typography sx={{ ...((isMobile || isTablet) ? TYPOGRAPHY.caption : TYPOGRAPHY.body1), fontWeight: 500 }}>{tier.title}</Typography>
                  <Typography sx={{ ...((isMobile || isTablet) ? TYPOGRAPHY.caption : TYPOGRAPHY.body2) }}>{tier.range}</Typography>
                </Box>

                {/* Tier Benefit Rows */}
                {benefitKeys.map((benefitKey, benefitIndex) => (
                  <Box
                    key={`tier-benefit-${tierIndex}-${benefitIndex}`}
                    sx={{
                      height: '80px',
                      display: 'flex',
                      alignItems: 'center',
                    
                    }}
                  >
                    <Box sx={{ p: '1.2rem', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {formatBenefitValue(tier[benefitKey])}
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Collapse>
  );
}
