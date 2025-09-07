import { useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Card, Chip, Typography, LinearProgress, Grid2 } from '@mui/material';

import { activities } from '../constants';

interface LpActivitiesSectionProps {
  isMobile: boolean;
  isTablet: boolean;
}

type FilterType = 'week' | 'month' | 'year' | 'redeemed';

export default function LpActivitiesSection({ isMobile, isTablet }: LpActivitiesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('week');

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const getProgressPercentage = (current: number, total: number) => (current / total) * 100;

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : '90%',
        maxWidth: '1140px',
        mt: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {/* Navigation Tabs */}
      <Box
        sx={{
          mb: isMobile ? '1.2rem' : '1rem',
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          pl: isMobile ? 2 : 0,
          width: '100%',
        }}
      >
        <Chip
          label="Earned this week"
          onClick={() => handleFilterChange('week')}
          variant={activeFilter === 'week' ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: activeFilter === 'week' ? 'primary.main' : 'white',
            color: activeFilter === 'week' ? 'white' : 'black',
            borderColor: activeFilter === 'week' ? 'primary.main' : '#C8D4E5',
            '&:hover': {
              backgroundColor: activeFilter === 'week' ? '#1565c0' : '#f5f5f5',
            },
          }}
        />
        <Chip
          label="Earned this month"
          onClick={() => handleFilterChange('month')}
          variant={activeFilter === 'month' ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: activeFilter === 'month' ? 'primary.main' : 'white',
            color: activeFilter === 'month' ? 'white' : 'black',
            borderColor: activeFilter === 'month' ? 'primary.main' : '#C8D4E5',
            '&:hover': {
              backgroundColor: activeFilter === 'month' ? '#1565c0' : '#f5f5f5',
            },
          }}
        />
        <Chip
          label="Earned this year"
          onClick={() => handleFilterChange('year')}
          variant={activeFilter === 'year' ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: activeFilter === 'year' ? 'primary.main' : 'white',
            color: activeFilter === 'year' ? 'white' : 'black',
            borderColor: activeFilter === 'year' ? 'primary.main' : '#C8D4E5',
            '&:hover': {
              backgroundColor: activeFilter === 'year' ? '#1565c0' : '#f5f5f5',
            },
          }}
        />
        <Chip
          label="LP Redeemed"
          onClick={() => handleFilterChange('redeemed')}
          variant={activeFilter === 'redeemed' ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: activeFilter === 'redeemed' ? 'primary.main' : 'white',
            color: activeFilter === 'redeemed' ? 'white' : 'black',
            borderColor: activeFilter === 'redeemed' ? 'primary.main' : '#C8D4E5',
            '&:hover': {
              backgroundColor: activeFilter === 'redeemed' ? '#1565c0' : '#f5f5f5',
            },
          }}
        />
      </Box>

      {/* Activities Grid */}

      {activities.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: 'white',
            color: '#999999',
            minHeight: isMobile ? '150px' : '100px',
            width: '100%',
          }}
        >
          <Typography>No Transaction found</Typography>
        </Box>
      ) : (
        <>
          <Grid2 container spacing={2} sx={{ border:'solid' }}>
            {activities.map((activity) => (
              <Grid2 key={activity.id} size={{ xs: 6, sm: 4, md: 3 }}>
                <Card
                  sx={{
                    p: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderRadius: '12px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  {/* LP Amount */}
                  <Typography
                    sx={{
                      ...TYPOGRAPHY.headline6,
                      fontWeight: 700,
                      color: '#333333',
                      mb: 0.5,
                    }}
                  >
                    {activity.lpAmount} LP
                  </Typography>

                  {/* Description */}
                  <Typography
                    sx={{
                      ...TYPOGRAPHY.caption,
                      color: '#666666',
                      mb: 1,
                    }}
                  >
                    {activity.description}
                  </Typography>

                  {/* Badge Icon */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      width: '24px',
                      height: '24px',
                      backgroundColor: '#ff9800',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Iconify icon="material-symbols:star-rounded" width={16} color="white" />
                  </Box>

                  {/* Activity Content */}
                  <Box sx={{ flex: 1, mt: 1 }}>
                    <Typography
                      sx={{
                        ...TYPOGRAPHY.body2,
                        fontWeight: 600,
                        color: '#333333',
                        mb: 1,
                      }}
                    >
                      {activity.title}
                    </Typography>

                    {activity.progress && (
                      <>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography
                            sx={{
                              ...TYPOGRAPHY.caption,
                              color: '#666666',
                            }}
                          >
                            {activity.title}
                          </Typography>
                          <Typography
                            sx={{
                              ...TYPOGRAPHY.caption,
                              fontWeight: 600,
                              color: '#333333',
                            }}
                          >
                            {activity.progress.current}/{activity.progress.total}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={getProgressPercentage(
                            activity.progress.current,
                            activity.progress.total
                          )}
                          sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: '#E0E0E0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#4CAF50',
                              borderRadius: 3,
                            },
                            mb: 1,
                          }}
                        />
                        <Typography
                          sx={{
                            ...TYPOGRAPHY.caption,
                            color: '#f44336',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: '#f44336',
                            }}
                          />
                          {activity.callToAction}
                        </Typography>
                      </>
                    )}

                    {activity.isCompleted && (
                      <Box
                        sx={{
                          backgroundColor: '#E3F2FD',
                          borderRadius: '8px',
                          p: 1,
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            ...TYPOGRAPHY.caption,
                            fontWeight: 600,
                            color: '#1976d2',
                          }}
                        >
                          {activity.completedText}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grid2>
            ))}
          </Grid2>
          {/* Streak Reward Section */}
          <Card
            sx={{
              width: '100%',
              mt: 3,
              p: 2,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Box
                sx={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#ff9800',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Iconify
                  icon="material-symbols:local-fire-department-rounded"
                  width={20}
                  color="white"
                />
              </Box>
              <Typography
                sx={{
                  ...TYPOGRAPHY.body1,
                  fontWeight: 600,
                  color: '#333333',
                }}
              >
                Streak Reward 60 LP
              </Typography>
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
        </>
      )}
    </Box>
  );
}
