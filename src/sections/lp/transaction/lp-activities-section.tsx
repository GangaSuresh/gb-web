import { useState } from 'react';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Card, Chip, Grid2, Typography, LinearProgress } from '@mui/material';

import { activities, GOLDEN_BADGE } from '../constants';

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
        <Grid2 container spacing={2}>
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
                  <Box sx={{display:'flex',justifyContent:'space-between'}}>
                    <Box sx={{display:'flex',flexDirection:'column'}}>
                      {/* LP Amount */}
                      <Typography
                        sx={{
                          ...(isMobile ? TYPOGRAPHY.body1 : TYPOGRAPHY.headline6),
                          fontWeight: 700,
                          color: 'primary.main',
                        }}
                      >
                        {activity.lpAmount} LP
                      </Typography>

                      {/* Description */}
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.caption,
                          color: 'info.dark',
                        }}
                      >
                        {activity.description}
                      </Typography>
                    </Box>
                    <img
                      src={GOLDEN_BADGE}
                      alt="badge-image"
                      style={{
                        width: isMobile ? '30px' : '32px',
                        height: isMobile ? '30px' : '32px',
                      }}
                    />
                  </Box>

                  {/* Activity Content */}
                  <Box sx={{ flex: 1, mt: 1 }}>
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
                              ...TYPOGRAPHY.body2,
                              fontWeight: 700,
                              color: ' #1F1F1F'
                            }}
                          >
                            {activity.title}
                          </Typography>
                          <Typography
                            sx={{
                              ...TYPOGRAPHY.body2,
                              fontWeight: 700,
                              color: 'primary.main'
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
                            backgroundColor: '#D9E9F3',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: '#22AB00',
                              borderRadius: 3,
                            },
                            mb: 1,
                          }}
                        />
                        <Box sx={{mt:'1rem',backgroundColor:' #EDF4FE',p:'0.75rem 0.625rem',borderRadius:'8px'}}>
                        <Typography
                          sx={{
                            ...TYPOGRAPHY.caption,
                            color: 'black'
                          }}
                        >
                         🏆 {activity.callToAction}
                        </Typography>


                        </Box>
                        
                      </>
                    )}

                    {activity.isCompleted && (
                      <Box
                        sx={{
                          backgroundColor: '#EDF4FE',
                          borderRadius: '8px',
                          p: 1,
                          textAlign: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            ...TYPOGRAPHY.caption,
                            color: 'black',
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
      )}
    </Box>
  );
}
