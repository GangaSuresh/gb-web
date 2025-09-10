import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Card, Typography, LinearProgress } from '@mui/material';

import { FIRE_ICON } from '../constants';

interface StreaksSectionProps {
  isMobile?: boolean;
  isTablet?: boolean;
}

export default function StreaksSection({ isMobile, isTablet }: StreaksSectionProps) {
  // Mock data for streak milestones
  const streakMilestones = [
    { day: 'Day 1', points: 10, completed: true },
    { day: 'Day 3', points: 15, completed: true },
    { day: 'Day 7', points: 30, completed: true },
    { day: 'Day 15', points: 45, completed: false },
    { day: 'Day 30', points: 60, completed: false },
  ];

  // Calculate progress percentage (assuming Day 7 is completed)
  const progressValue = 60; // 3 out of 5 milestones completed

  return (
    <Card
      sx={{
        width: isMobile ? '95%' : '90%',
        maxWidth: '1140px',
        mt: isMobile ? '0.6rem ' : '1.2rem',
        p: isMobile ? '1rem' : '1.5rem',
        mb: '5rem',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'row',
        gap: '5rem',
      }}
    >
      {/* Header with fire icon */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: isMobile ? '50px' : '65px',
            height: isMobile ? '50px' : '65px',
            background: '#FF662C1A',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
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
      <Box sx={{width:'70%'}}>
        {/* Day Labels Above Progress Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          {streakMilestones.map((milestone, index) => (
            <Typography
              key={`day-${index}`}
              sx={{
                ...TYPOGRAPHY.caption,
                fontWeight: 600,
                color: 'info.dark',
                textAlign: 'center',
                minWidth: isMobile ? '50px' : '60px',
              }}
            >
              {milestone.day}
            </Typography>
          ))}
        </Box>

        {/* Progress Bar */}
        <Box sx={{ position: 'relative', width: '100%' }}>
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'backgroundColor.dark',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'success.main',
                borderRadius: 4,
              },
            }}
          />

          {/* Milestone Markers */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              position: 'absolute',
              top: '-5px',
              width: '100%',
            }}
          >
            {streakMilestones.map((milestone, index) => (
              <Box
                key={index}
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: milestone.completed ? 'success.main' : 'backgroundColor.lighter',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: milestone.completed ? 'none' : '2px solid',
                  borderColor: 'backgroundColor.lighter',
                }}
              >
                {milestone.completed && (
                  <Iconify
                    icon="mdi:check"
                    sx={{
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Points Labels Below Progress Bar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
          }}
        >
          {streakMilestones.map((milestone, index) => (
            <Typography
              key={`points-${index}`}
              sx={{
                ...TYPOGRAPHY.body2,
                fontWeight: 700,
                color: milestone.completed ? 'primary.main' : 'text.secondary',
                textAlign: 'center',
                minWidth: isMobile ? '50px' : '60px',
              }}
            >
              +{milestone.points} LP
            </Typography>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
