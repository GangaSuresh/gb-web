/* eslint-disable react/prop-types */
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import React, { useMemo, useState, useCallback } from 'react';
import { Box, Tab, Grid, Tabs, Typography } from '@mui/material';

/* Data */
const MILESTONE_DATA = [
  { title: 'Signup Bonus', points: 100 },
  { title: '200+ article reads', points: 50 },
  { title: '200+ news videos watched', points: 50 },
  { title: '100+ shares', points: 50 },
  { title: '100+ opinion upvote', points: 20 },
  { title: 'Editorial Feature', points: 100 },
] as const;

/* Constants */
const GRADIENT_BACKGROUND = 'linear-gradient(180deg, #E6B84D 0%, #F2D078 100%)';
const BORDER_COLOR = 'rgba(255,255,255,0.3)';
const TEXT_COLOR_ACTIVE = 'black';
const TEXT_COLOR_INACTIVE = 'rgba(255, 255, 255, 0.7)';
const BORDER_RADIUS = '8px';
const CONTENT_BORDER_RADIUS = '12px';



interface MilestoneRewardsProps {
  lpIcon: string | null;
  isMobile: boolean;
  isTab: boolean;
}

/* Helper functions */
const getTabLabelStyles = (isActive: boolean,isMobile:boolean) => ({
  background: isActive ? GRADIENT_BACKGROUND : 'transparent',
  borderRadius: BORDER_RADIUS,
  padding: isMobile?'0.5rem':'1.25rem',
  color: isActive ? TEXT_COLOR_ACTIVE : TEXT_COLOR_INACTIVE,
  fontWeight: isActive ? 700 : 600,
  textDecoration: isActive ? 'none' : 'underline',
  width: '100%',
  fontFamily: 'Lora',
  fontSize: isMobile ?'1rem':'1.25rem',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const getTabStyles = (isMobile: boolean) => ({
  textTransform: 'none' as const,
  minHeight: isMobile ? 48 : 56,
  margin: 0,
  borderTopLeftRadius: CONTENT_BORDER_RADIUS,
  borderTopRightRadius: CONTENT_BORDER_RADIUS,
  flex: 1,
  borderBottom: `2px solid ${BORDER_COLOR}`,
  '&.Mui-selected': {
    borderTop: `2px solid ${BORDER_COLOR}`,
    borderLeft: `2px solid ${BORDER_COLOR}`,
    borderRight: `2px solid ${BORDER_COLOR}`,
    borderBottom: 'none',
  },
});

/* Memoized Milestone Item Component */
interface MilestoneItemProps {
  title: string;
  points: number;
  lpIcon: string | null;
  isMobile: boolean;
}

const MilestoneItem = React.memo<MilestoneItemProps>(({ title,points, lpIcon, isMobile }) => (
  <Grid item xs={12} sm={6}>
    <Box
      sx={{
        border: '1px solid #FDEFAF',
        borderRadius: '8px',
        padding: isMobile ? 1.5 : '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: isMobile ? 50 : 60,
        flexDirection: 'row',
        gap: isMobile ? '1rem' : 0,
        textAlign: 'left',
      }}
    >
      <Typography
        sx={{
          ...(isMobile?TYPOGRAPHY.body2:TYPOGRAPHY.body1),
          fontWeight: 600,
        }}
      >
        {title}
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
        {points}
        {lpIcon && (
          <img
            src={lpIcon}
            alt="LP points icon"
            style={{ height: '1rem', width: '1rem' }}
          />
        )}
      </Box>
    </Box>
  </Grid>
));

MilestoneItem.displayName = 'MilestoneItem';

const MilestoneRewards: React.FC<MilestoneRewardsProps> = ({ lpIcon, isMobile, isTab }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback((_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  }, []);

  const tabStyles = useMemo(() => getTabStyles(isMobile), [isMobile]);

  const tabsConfig = useMemo(() => [
    {
      label: 'Milestone Rewards',
      value: 0,
      'aria-label': 'View milestone rewards and achievements',
    },
    {
      label: 'Activity Streaks',
      value: 1,
      'aria-label': 'View activity streaks and progress',
    },
  ], []);

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
          {tabsConfig.map((tab) => (
            <Tab
              key={tab.value}
              label={
                <Box sx={getTabLabelStyles(tabValue === tab.value,isMobile)}>
                  {tab.label}
                </Box>
              }
              sx={{
                ...tabStyles,
                '&.Mui-selected': {
                  ...tabStyles['&.Mui-selected']
                },
              }}
              aria-label={tab['aria-label']}
            />
          ))}
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
              ...(isMobile?TYPOGRAPHY.body2:TYPOGRAPHY.body1)
            }}
          >
            Achieve special milestones and earn bonus LP for your dedication to the community.
          </Typography>

          <Grid container spacing={2} mt="0.5rem">
            {MILESTONE_DATA.map((item) => (
              <MilestoneItem
                key={item.title}
                title={item.title}
                points={item.points}
                lpIcon={lpIcon}
                isMobile={isMobile}
              />
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

export default React.memo(MilestoneRewards);
