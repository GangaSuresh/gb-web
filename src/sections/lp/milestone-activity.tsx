import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';

// Define data as constants
const MILESTONE_DATA = [
  { title: "Signup Bonus", points: 100 },
  { title: "200+ article reads", points: 200 },
  { title: "", points: 50 },
  { title: "200+ news videos watched", points: 50 },
  { title: "100+ shares", points: 50 },
  { title: "100+ opinion upvote", points: 20 },
  { title: "Editorial Feature", points: 100 }
];

const STREAK_DATA = [
  "Visit GBN daily to build your streak and earn increasing LP bonuses!"
];

// TabPanel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`milestone-tabpanel-${index}`}
      aria-labelledby={`milestone-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Main component
const MilestoneRewards: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
<>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered={!isMobile}
          variant={isMobile ? "fullWidth" : "standard"}
          sx={{ 
            '& .MuiTab-root': { 
              fontSize: '0.9rem',
              fontWeight: 'bold',
              minHeight: '48px'
            } 
          }}
        >
          <Tab label="Milestone Rewards" />
          <Tab label="Activity Streaks" />
        </Tabs>
      </Box>

      {/* Milestone Rewards Tab */}
      <TabPanel value={tabValue} index={0}>
        <List sx={{ pt: 0 }}>
          {MILESTONE_DATA.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1.5,
                px: 0
              }}>
                <ListItemText 
                  primary={item.title} 
                  primaryTypographyProps={{ 
                    fontSize: '1rem',
                    color: item.title ? 'text.primary' : 'text.secondary'
                  }}
                />
                <Chip 
                  label={`${item.points} LP`} 
                  size="small" 
                  sx={{ 
                    backgroundColor: '#f0f0f0',
                    fontWeight: 'bold',
                    minWidth: '60px'
                  }} 
                />
              </ListItem>
              {index < MILESTONE_DATA.length - 1 && (
                <Divider />
              )}
            </React.Fragment>
          ))}
        </List>
      </TabPanel>

      {/* Activity Streaks Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
          Activity Streaks
        </Typography>
        <Box sx={{ pl: 2 }}>
          {STREAK_DATA.map((text, index) => (
            <Typography key={index} variant="body1" paragraph sx={{ fontSize: '1rem' }}>
              {text}
            </Typography>
          ))}
        </Box>
        
        <Box sx={{ 
          backgroundColor: '#f5f5f5', 
          p: 2, 
          borderRadius: 1,
          mt: 2,
          border: '1px solid #e0e0e0'
        }}>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            Note: The image didn&apos;t provide specific streak rewards, but you would typically see rewards like:
          </Typography>
          <List sx={{ py: 0 }}>
            <ListItem sx={{ py: 0.5, px: 0 }}>
              <ListItemText primary="3-day streak: 50 LP" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItem>
            <ListItem sx={{ py: 0.5, px: 0 }}>
              <ListItemText primary="7-day streak: 100 LP" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItem>
            <ListItem sx={{ py: 0.5, px: 0 }}>
              <ListItemText primary="30-day streak: 500 LP" primaryTypographyProps={{ fontSize: '0.9rem' }} />
            </ListItem>
          </List>
        </Box>
      </TabPanel>
    </>
  );
};

export default MilestoneRewards;