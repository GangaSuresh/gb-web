import React, { useState } from 'react';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Tab, Tabs, Grid, Typography } from '@mui/material';

/* Data */
const MILESTONE_DATA = [
  { title: 'Signup Bonus', points: 100 },
  { title: '200+ article reads', points: 50 },
  { title: '200+ news videos watched', points: 50 },
  { title: '100+ shares', points: 50 },
  { title: '100+ opinion upvote', points: 20 },
  { title: 'Editorial Feature', points: 100 },
];



interface MilestoneRewardsProps {
  lpIcon: string | null;
  isMobile: boolean;
  isTab: boolean;
}

const MilestoneRewards: React.FC<MilestoneRewardsProps> = ({ lpIcon, isMobile, isTab }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: '60rem',
      }}
    >
      {/* Tabs header row */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="Milestones and Activity Tabs"
          sx={{
            width: '100%',
            minHeight: isMobile ? 48 : 56,
            p: 0,
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <Tab
            label={
              <Box
                sx={{
                  background:
                    tabValue === 0
                      ? 'linear-gradient(180deg, #E6B84D 0%, #F2D078 100%)'
                      : 'transparent',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: tabValue === 0 ? 'black' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: tabValue === 0 ? 700 : 600,
                  textDecoration: tabValue === 0 ? 'none' : 'underline',
                  width: '100%',
                  fontFamily: 'Lora',
                  fontSize: '1.25rem',
                  height: '100%',
                }}
              >
                Milestone Rewards
              </Box>
            }
            sx={{
              textTransform: 'none',
              minHeight: isMobile ? 48 : 56,
              margin: 0,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              flex: 1,
              fontSize: isMobile ? '0.875rem' : '1rem',
              borderBottom: '2px solid rgba(255,255,255,0.3)',
              '&.Mui-selected': {
                borderTop: '2px solid rgba(255,255,255,0.3)',
                borderLeft: '2px solid rgba(255,255,255,0.3)',
                borderRight: '2px solid rgba(255,255,255,0.3)',
                borderBottom: 'none',
                borderBottomRightRadius: '0px',
              },
            }}
          />
          <Tab
            label={
              <Box
                sx={{
                  background:
                    tabValue === 1
                      ? 'linear-gradient(180deg, #E6B84D 0%, #F2D078 100%)'
                      : 'transparent',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: tabValue === 1 ? 'black' : 'rgba(255, 255, 255, 0.7)',
                  fontWeight: tabValue === 1 ? 700 : 600,
                  textDecoration: tabValue === 1 ? 'none' : 'underline',
                  width: '100%',
                  fontFamily: 'Lora',
                  fontSize: '1.25rem',
                }}
              >
                Activity Streaks
              </Box>
            }
            sx={{
              textTransform: 'none',
              minHeight: isMobile ? 48 : 56,
              margin: 0,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              flex: 1,
              fontSize: isMobile ? '0.875rem' : '1rem',
              borderBottom: '2px solid rgba(255,255,255,0.3)',
              '&.Mui-selected': {
                borderTop: '2px solid rgba(255,255,255,0.3)',
                borderLeft: '2px solid rgba(255,255,255,0.3)',
                borderRight: '2px solid rgba(255,255,255,0.3)',
                borderBottom: 'none',
                borderBottomLeftRadius: '0',
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Content area - fixed width to prevent layout shift */}
      <Box
        sx={{
          minHeight: 300,
          width: '100%',
          borderRadius: '0 0 12px 12px',
          padding: isMobile ? '1.5rem' : '2rem',
          paddingTop: 0,
          border: '2px solid rgba(255,255,255,0.3)',
          borderTop: 'none',
        }}
      >
        {/* Milestone Rewards */}
        <Box sx={{ display: tabValue === 0 ? 'block' : 'none', pt: 2, width: '100%' }}>
          <Typography
            sx={{
              ...TYPOGRAPHY.body1,
            }}
          >
            Achieve special milestones and earn bonus LP for your dedication to the community.
          </Typography>

          <Grid container spacing={2} mt="0.5rem">
            {MILESTONE_DATA.map((item, idx) => (
              <Grid item xs={12} sm={6} key={item.title + idx}>
                <Box
                  sx={{
                    border: '1px solid #FDEFAF',
                    borderRadius: '20px',
                    padding: isMobile ? 1.5 : '0.5rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: isMobile ? 50 : 60,
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '1rem' : 0,
                    textAlign: isMobile ? 'center' : 'left',
                  }}
                >
                  <Typography
                    sx={{
                      ...TYPOGRAPHY.body1,
                      fontWeight: 600,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: 'primary.main',
                      borderRadius: '20px',
                      padding: isMobile ? '0.4rem 1.2rem' : '0.5rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.8rem',
                      fontWeight: 800,
                      fontSize: isMobile ? '0.75rem' : '1rem',
                      border: '1px solid #FED669',
                      minWidth: isMobile ? 50 : '100px',
                    }}
                  >
                    {item.points}
                    <img
                      src={lpIcon ?? undefined}
                      alt="lp-info-image"
                      style={{ height: '1rem', width: '1rem' }}
                    />
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Activity Streaks */}
        <Box sx={{ display: tabValue === 1 ? 'block' : 'none', pt: 2, width: '100%' }}>
          <Typography
            sx={{
              ...TYPOGRAPHY.body1,
            }}
          >
            Activity Streaks
          </Typography>
          <p>Coming soon</p>
        </Box>
      </Box>
    </Box>
  );
};

export default MilestoneRewards;
