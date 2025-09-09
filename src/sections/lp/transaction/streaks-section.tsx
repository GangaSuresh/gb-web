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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        {[
          { day: 1, completed: true, lp: 10 },
          { day: 3, completed: true, lp: 20 },
          { day: 5, completed: true, lp: 30 },
          { day: 7, completed: false, lp: 50 },
          { day: 15, completed: false, lp: 100 },
          { day: 30, completed: false, lp: 200 },
        ].map((streak, index) => (
          <Box key={streak.day} sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: streak.completed ? '#4CAF50' : '#E0E0E0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              {streak.completed && (
                <Iconify icon="material-symbols:check-rounded" width={20} color="white" />
              )}
              <Typography
                sx={{
                  ...TYPOGRAPHY.caption,
                  fontWeight: 600,
                  color: streak.completed ? 'white' : '#666666',
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                }}
              >
                Day {streak.day}
              </Typography>
              <Typography
                sx={{
                  ...TYPOGRAPHY.caption,
                  fontWeight: 600,
                  color: streak.completed ? '#4CAF50' : '#666666',
                  position: 'absolute',
                  bottom: '-35px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                }}
              >
                +{streak.lp} LP
              </Typography>
            </Box>
            {index < 5 && (
              <Box
                sx={{
                  width: '20px',
                  height: '2px',
                  backgroundColor: streak.completed ? '#4CAF50' : '#E0E0E0',
                  mx: 0.5,
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Card>
  );
}
