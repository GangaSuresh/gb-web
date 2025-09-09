import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Card, Typography } from '@mui/material';

import { FIRE_ICON } from '../constants';

interface StreaksSectionProps {
  isMobile?: boolean;
  isTablet?: boolean;
}

export default function StreaksSection({ isMobile, isTablet }: StreaksSectionProps) {
  return (
    <Card
      sx={{
        width: isMobile ? '95%' : '90%',
        maxWidth: '1140px',
        mt: isMobile ? '0.6rem ' : '1.2rem',
        p: isMobile ? '0.8rem 1rem' : '1.5rem',
        mb: '5rem',
        borderRadius: '8px',
        display:'flex',
        gap:'4rem'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
        <Box
          sx={{
            width: '65px',
            height: '65px',
            background: '#FF662C1A',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize:'1.5rem'
          }}
        >
          <img src={FIRE_ICON} alt="fire icon" />
        </Box>
        <Box>
          <Typography
            sx={{
              ...TYPOGRAPHY.body1,
              color: 'primary.dark',
            }}
          >
            Streak Reward
          </Typography>
          <Typography
            sx={{
              ...TYPOGRAPHY.headline6,
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            60 LP
          </Typography>
        </Box>
      </Box>

      {/* Streak Progress */}
 
    </Card>
  );
}
