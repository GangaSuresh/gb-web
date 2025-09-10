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

  // Calculate total earned points
  const totalEarnedPoints = streakMilestones
    .filter((milestone) => milestone.completed)
    .reduce((total, milestone) => total + milestone.points, 0);

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
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '1rem' : '5rem',
      }}
    >
      {isMobile ? (
        // Mobile Layout
        <>
          {/* Header with fire icon on right */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  ...TYPOGRAPHY.caption,
                  color: 'primary.dark',
                }}
              >
                Streak Reward
              </Typography>
              <Typography
                sx={{
                  ...TYPOGRAPHY.body1,
                  fontWeight: 700,
                  color: 'primary.main',
                }}
              >
                60 LP
              </Typography>
            </Box>
            <Box
              sx={{
                width: '40px',
                height: '40px',
                background: '#FF662C1A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={FIRE_ICON} alt="fire icon" style={{ width: '20px', height: '20px' }} />
            </Box>
          </Box>

          {/* Divider */}
          <Box
            sx={{
              width: '100%',
              height: '1px',
              backgroundColor: 'divider',
            }}
          />

          {/* Vertical Progress Bar Layout */}
          <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
            {/* Days on left */}
            <Box
              sx={{
                minWidth: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                py: 1,
              }}
            >
              {streakMilestones.map((milestone, index) => (
                <Typography
                  key={`day-${index}`}
                  sx={{
                    ...TYPOGRAPHY.caption,
                    color: 'info.dark',
                  }}
                >
                  {milestone.day}
                </Typography>
              ))}
            </Box>

            {/* Vertical Progress Bar */}
            <Box
              sx={{
                position: 'relative',
                width: '8px',
                height: '200px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: '100%',
                  borderRadius: 4,
                  backgroundColor: 'backgroundColor.dark',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${progressValue}%`,
                    backgroundColor: 'success.main',
                    borderRadius: 4,
                    transition: 'height 0.3s ease',
                  }}
                />
              </Box>

              {/* Milestone Markers */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'absolute',
                  top: 0,
                  left: '-5px',
                  height: '100%',
                  width: '1rem',
                }}
              >
                {streakMilestones.map((milestone, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      backgroundColor: milestone.completed
                        ? 'success.main'
                        : 'backgroundColor.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: milestone.completed ? 'none' : '2px solid',
                      borderColor: 'backgroundColor.light',
                    }}
                  >
                    {milestone.completed && (
                      <Iconify
                        icon="mdi:check"
                        sx={{
                          color: 'white',
                        }}
                        width="1rem"
                      />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Points and Messages on right */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {streakMilestones.map((milestone, index) => (
                <Box
                  key={`points-${index}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mt: '-0.5rem',
                  }}
                >
                  <Typography
                    sx={{
                      ...TYPOGRAPHY.body2,
                      fontWeight: 700,
                      color: milestone.completed ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    +{milestone.points} LP
                  </Typography>

                  {milestone.completed && (
                    <Box
                      sx={{
                        backgroundColor: 'backgroundColor.lighter',
                        px: '0.7rem',
                        py: '0.4rem',
                        borderRadius: '8px',
                      }}
                    >
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.caption,
                          color: 'text.secondary',
                          fontSize: '0.75rem',
                        }}
                      >
                        🎉 You have earned {milestone.points} points
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </>
      ) : (
        // Desktop Layout
        <>
          {/* Header with fire icon */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,width:isTablet?'50%': '20%'}}>
            <Box
              sx={{
                width: '65px',
                height: '65px',
                background: '#FF662C1A',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={FIRE_ICON} alt="fire icon" style={{width: isTablet?'30px':'35px', height: isTablet?'30px':'35px'}}/>
            </Box>
            <Box>
              <Typography
                sx={{
                  ...TYPOGRAPHY.body2,
                  color: 'primary.dark',
                }}
              >
                Streak Reward
              </Typography>
              <Typography
                sx={{
                  ...TYPOGRAPHY.body1,
                  fontWeight: 700,
                  color: 'primary.main',
                }}
              >
                60 LP
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: isTablet?'80%': '70%' }}>
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
                    minWidth: '60px',
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
                      backgroundColor: milestone.completed
                        ? 'success.main'
                        : 'backgroundColor.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: milestone.completed ? 'none' : '2px solid',
                      borderColor: 'backgroundColor.light',
                    }}
                  >
                    {milestone.completed && (
                      <Iconify
                        icon="mdi:check"
                        sx={{
                          color: 'white',
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
                    minWidth: '60px',
                  }}
                >
                  +{milestone.points} LP
                </Typography>
              ))}
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
}
