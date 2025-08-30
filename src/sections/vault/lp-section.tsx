import { useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Button, useTheme, Typography, useMediaQuery, Divider } from '@mui/material';

import type { TierItem } from './types';

import Benefits from './benefits-section';
import Milestone from './milestone-section';

interface LPSectionProps {
  images: Record<string, string>;
  lpcurrPoints: number;
  lpcurrBadge: string;
  onViewHistory: () => void;
  tier: TierItem[];
}

export default function LPSection({
  images,
  lpcurrPoints,
  lpcurrBadge,
  onViewHistory,
  tier,
}: LPSectionProps) {
  const [benefitsExpanded, setBenefitsExpanded] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '90%' },
        mt: { xs: '1.25rem', sm: '2rem' },
        mx: 'auto',
      }}
    >
      {!isMobile ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'radial-gradient(ellipse at 104.35% 264%, #008AFA 12.86%, #0032AA 100%)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            p: {
              sm: '1.25rem 2rem',
              md: '1.5rem 3rem',
              lg: '1.5rem 4.8rem',
            },
            gap: '1.5rem',
          }}
        >
          {/* Left side - Points and Badge */}
          <Box display="flex" gap="2rem" sx={{ flex: 1 }}>
            {/* Points Section */}
            <Box display="flex" gap="1rem" alignItems="center" sx={{ minWidth: 0 }}>
              <img src={images.lp} alt="lp" />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    ...TYPOGRAPHY.headline6,
                    color: 'white',
                    fontWeight: 800,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {lpcurrPoints} Points
                </Typography>
                <Box
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={onViewHistory}
                >
                  <Typography
                    sx={{
                      ...TYPOGRAPHY.body2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    View Points History
                  </Typography>
                  <Iconify icon="icon-park-outline:right" />
                </Box>
              </Box>
            </Box>

            {/* Badge Section */}
            <Box display="flex" gap="1rem" alignItems="center" sx={{ minWidth: 0 }}>
              <img src={images['bronze-badge']} alt="bronze-badge" />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    ...TYPOGRAPHY.headline6,
                    color: 'white',
                    fontWeight: 700,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                  }}
                >
                  {lpcurrBadge}
                </Typography>
                <Typography
                  sx={{
                    ...TYPOGRAPHY.body2,
                    color: 'primary.lighter',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Your Current Badge
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right side - Button */}
          <Box display="flex" alignItems="flex-start">
            <Button
              className="button-primary-outlined"
              variant="outlined"
              size="large"
              sx={{ backgroundColor: 'transparent' }}
              onClick={() => {}}
            >
              Know More
              <Iconify icon="icon-park-outline:right" />
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            background: 'radial-gradient(ellipse at 104.35% 264%, #008AFA 12.86%, #0032AA 100%)',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            p: '1.5rem 1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                ...TYPOGRAPHY.body2,
                color: 'white',
              }}
            >
              GBN Loyalty Programme
            </Typography>
            <Button
              className="button-primary-outlined"
              variant="outlined"
              size="small"
              sx={{ backgroundColor: 'transparent' }}
              onClick={() => {}}
            >
              Know More
              <Iconify icon="icon-park-outline:right" />
            </Button>
          </Box>
          <Box sx={{ display: 'flex', p: '1.5rem 2.5rem 0 2.5rem', gap: '4rem' }}>
            {/* Points Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={images.lp}
                alt="lp"
                style={{
                  width: '28px',
                  height: '28px',
                }}
              />
              <Typography
                sx={{
                  ...TYPOGRAPHY.body1,
                  color: 'white',
                  fontWeight: 500,
                }}
              >
                {lpcurrPoints} LP
              </Typography>
              <Box
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={onViewHistory}
              >
                <Typography
                  sx={{
                    ...TYPOGRAPHY.caption,
                    whiteSpace: 'nowrap',
                  }}
                >
                  View Points
                </Typography>
                <Iconify icon="icon-park-outline:right" width={14} />
              </Box>
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderRightWidth: '2px',
              }}
            />
            {/* Badge Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src={images['bronze-badge']}
                alt="bronze-badge"
                style={{
                  width: '28px',
                  height: '28px',
                }}
              />
              <Typography
                sx={{
                  ...TYPOGRAPHY.body1,
                  color: 'white',
                  fontWeight: 500,
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                {lpcurrBadge}
              </Typography>
              <Typography
                sx={{
                  ...TYPOGRAPHY.caption,
                  whiteSpace: 'nowrap',
                  color: 'primary.lighter',
                }}
              >
                Your Current Badge
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {/* Milestone Section */}
      <Milestone
        tier={tier}
        lpcurrPoints={lpcurrPoints}
        images={images}
        benefitsExpanded={benefitsExpanded}
        setBenefitsExpanded={setBenefitsExpanded}
      />

      {/* Benefits Section */}
      <Benefits
        benefitsExpanded={benefitsExpanded}
        lpcurrPoints={lpcurrPoints}
        tiers={tier}
        images={images}
      />
    </Box>
  );
}
