import React from 'react';
import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { camelToTitle } from 'src/utils/camel-to-title';
import { Box, Grid, Collapse, Typography } from '@mui/material';

import type { TierItem } from './types';

interface BenefitsProps {
  benefitsExpanded: boolean;
  lpcurrPoints: number;
  tiers: TierItem[];
  images: Record<string, string>;
}

export default function BenefitsComponent({
  benefitsExpanded,
  lpcurrPoints,
  tiers,
  images,
}: BenefitsProps) {
  // Extract all benefit keys except title and range
  const benefitKeys = Object.keys(tiers[0]).filter(
    (key) => key !== 'title' && key !== 'range'
  ) as Array<keyof Omit<TierItem, 'title' | 'range'>>;

  // Calculate dynamic grid sizes based on tier count
  const benefitsColumnSize = 3; // Fixed size for benefits column
  const tierColumnSize = (12 - benefitsColumnSize) / tiers.length; // Dynamic size for tier columns

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
        <Typography sx={{ ...TYPOGRAPHY.body2, fontWeight: 600, textAlign: 'center' }}>
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
        }}
      >
        {/* header section */}
        <Grid container spacing={0}>
          <Grid item xs={12} md={benefitsColumnSize} sx={{ backgroundColor: 'primary.dark' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
                p: '1.875rem 1.875rem 0 1.875rem',
              }}
            >
              <img src={images.benefits} alt="benefits" />
              <Typography sx={{ ...TYPOGRAPHY.body1, fontWeight: 600 }}>Benefits</Typography>
            </Box>
          </Grid>
          {tiers.map((tier, index) => (
            <Grid 
              item 
              xs={6} 
              md={tierColumnSize} 
              key={`tier-header-${index}`} 
              sx={{ backgroundColor: 'primary.main' }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  p: '1.875rem 1.875rem 0 1.875rem',
                }}
              >
                <img
                  src={images[`${tier.title.toLowerCase()}-badge`]}
                  alt={`${tier.title}-badge`}
                  style={{ marginBottom: '0.1rem' }}
                />
                <Typography sx={{ ...TYPOGRAPHY.body1, fontWeight: 500 }}>{tier.title}</Typography>
                <Typography sx={{ ...TYPOGRAPHY.body2 }}>{tier.range}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* main section */}
        {benefitKeys.map((benefitKey, index) => (
          <Grid container spacing={0} key={`benefit-row-${index}`}>
            <Grid item xs={12} md={benefitsColumnSize} sx={{backgroundColor: 'primary.dark'}}>
              <Box sx={{ p: '1.2rem'}}>
                <Typography sx={{ ...TYPOGRAPHY.body2 }}>{camelToTitle(benefitKey)}</Typography>
              </Box>
            </Grid>
            {tiers.map((tier, tierIndex) => (
              <Grid 
                item 
                xs={6} 
                md={tierColumnSize} 
                key={`benefit-cell-${index}-${tierIndex}`} 
                sx={{backgroundColor: 'primary.main'}}
              >
                <Box sx={{ p: '1.2rem'}}>
                  {formatBenefitValue(tier[benefitKey])}
                </Box>
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Collapse>
  );
}
