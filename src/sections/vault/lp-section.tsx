import { useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Button, Typography } from '@mui/material';

import Benefits from './benefits-section';
import Milestone from './milestone-section';

interface LPSectionProps {
  images: Record<string, string>;
  lpcurrPoints: number;
  lpcurrBadge: string;
  onViewHistory: () => void;
  tier: Record<string, string>[];
}

export default function LPSection({
  images,
  lpcurrPoints,
  lpcurrBadge,
  onViewHistory,
  tier
}: LPSectionProps) {
  const [benefitsExpanded, setBenefitsExpanded] = useState(true);
  return (
    <Box
      sx={{
        width: '90%',
        mt: '2rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          background: 'radial-gradient(ellipse at 104.35% 264%, #008AFA 12.86%, #0032AA 100%)',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          p: '1.5rem',
        }}
      >
        {/* Left side - Points and Badge on same row */}
        <Box 
          display="flex" 
          gap="2rem"
          sx={{ flex: 1 }}
        >
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
                  overflowWrap: 'break-word'
                }}
              >
                {lpcurrPoints} Points
              </Typography>
              <Box
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={onViewHistory}
              >
                <Typography
                  sx={{
                    ...TYPOGRAPHY.body2,
                    textDecoration: 'underline',
                    whiteSpace: 'nowrap'
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
                  ...TYPOGRAPHY.body2, 
                  color: 'primary.lighter',
                  whiteSpace: 'nowrap'
                }}
              >
                Current Badge
              </Typography>
              <Typography
                sx={{
                  ...TYPOGRAPHY.headline6,
                  color: 'white',
                  fontWeight: 700,
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word'
                }}
              >
                {lpcurrBadge}
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
            onClick={() => {}}
          >
            Know More
            <Iconify icon="icon-park-outline:right" />
          </Button>
        </Box>
      </Box>
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
