import React from 'react';
import { Box, Typography, Grid, Collapse } from '@mui/material';
import { camelToTitle } from 'src/utils/camel-to-title';
import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';

interface Tier {
  title: string;
  range: string;
  loyaltyPoints: string;
  complimentaryPremiumContent: string;
  accessToExclusiveMerch: boolean;
  earlyAccessToEventRegistrations: boolean;
  invitationToExclusiveEvents: boolean;
  exclusiveWelcomeKit: boolean;
}

interface BenefitsProps {
  benefitsExpanded: boolean;
  lpcurrPoints: number;
  tiers: Tier[];
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
  ) as Array<keyof Omit<Tier, 'title' | 'range'>>;

  // Format benefit values for display
  const formatBenefitValue = (value: any): React.ReactNode => {
    if (typeof value === 'boolean') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Iconify icon={value ? "mdi:check" : "mdi:close"} />
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
          backgroundColor: 'primary.main',
          color: 'white',
          p: '1.5rem',
          borderBottomLeftRadius: '16px',
          borderBottomRightRadius: '16px',
        }}
      >
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={3} backgroundColor= 'primary.dark'>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}
            >
              <img src={images.benefits} alt="benefits" style={{ marginBottom: '0.1rem' }} />
              <Typography sx={{ ...TYPOGRAPHY.body1, fontWeight: 800 }}>Benefits</Typography>
            </Box>
          </Grid>
          {tiers.map((tier, index) => (
            <Grid item xs={2} key={`tier-header-${index}`}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <img
                  src={images[`${tier.title.toLowerCase()}-badge`]}
                  alt={`${tier.title}-badge`}
                  style={{ marginBottom: '0.1rem' }}
                />
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {tier.title} ({tier.range})
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {benefitKeys.map((benefitKey, index) => (
          <Grid
            container
            spacing={2}
            key={`benefit-row-${index}`}
            sx={{
              py: 1,
              alignItems: 'center',
            }}
          >
            <Grid item xs={3} backgroundColor= 'primary.dark'>
              <Typography sx={{ ...TYPOGRAPHY.body2, fontWeight: 600 }}>
                {camelToTitle(benefitKey)}
              </Typography>
            </Grid>
            {tiers.map((tier, tierIndex) => (
              <Grid item xs={2} key={`benefit-cell-${index}-${tierIndex}`}>
                {formatBenefitValue(tier[benefitKey])}
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Collapse>
  );
}
