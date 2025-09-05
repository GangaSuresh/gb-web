import React, { useState } from "react";
import { TYPOGRAPHY } from "src/theme/styles/fonts";
import {
  Box,
  Tab,
  Tabs,
  Grid,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";

/* Data */
const MILESTONE_DATA = [
  { title: "Signup Bonus", points: 100 },
  { title: "200+ article reads", points: 50 },
  { title: "200+ news videos watched", points: 50 },
  { title: "100+ shares", points: 50 },
  { title: "100+ opinion upvote", points: 20 },
  { title: "Editorial Feature", points: 100 },
];

const STREAK_DATA = [
  "Visit GBN daily to build your streak and earn increasing LP bonuses!",
];

/* A11y helpers from MUI Tabs docs */
function a11yProps(index: number) {
  return {
    id: `rewards-tab-${index}`,
    "aria-controls": `rewards-tabpanel-${index}`,
  };
}

/* TabPanel */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`rewards-tabpanel-${index}`}
    aria-labelledby={`rewards-tab-${index}`}
    style={{ width: "100%" }}
  >
    {value === index && <Box sx={{ pt: 2, width: "100%" }}>{children}</Box>}
  </div>
);

interface MilestoneRewardsProps {
  lpIcon: string|null;
}

const MilestoneRewards: React.FC<MilestoneRewardsProps> = ({ lpIcon }) => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTabChange = (_e: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: '60rem',
      }}
    >
      {/* Tabs header row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="Milestones and Activity Tabs"
          sx={{
            width: "100%",
            minHeight: 56,
            p:0,
            "& .MuiTabs-indicator": {
              display: "none",
            },
            [theme.breakpoints.down("sm")]: {
              minHeight: 48,
            },
          }}
        >
          <Tab
            label={
              <Box
                sx={{
                  background: tabValue === 0 ? "linear-gradient(180deg, #E6B84D 0%, #F2D078 100%)" : "transparent",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: tabValue === 0 ? "black" : "rgba(255, 255, 255, 0.7)",
                  fontWeight: tabValue === 0 ? 700 : 600,
                  textDecoration: tabValue === 0 ? "none" : "underline",
                  width: "100%",
                  fontFamily:'Lora',
                  fontSize:'1.25rem',
                  height:'100%',
                }}
              >
                Milestone Rewards
              </Box>
            }
            {...a11yProps(0)}
            sx={{
              textTransform: "none",
              minHeight: 56,
              margin: 0,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              flex: 1,
              fontSize: "1rem",
              borderBottom: "2px solid rgba(255,255,255,0.3)",
              [theme.breakpoints.down("sm")]: {
                minHeight: 48,
                fontSize: "0.875rem",
                margin: 0,
              },
              "&.Mui-selected": {
                borderTop: "2px solid rgba(255,255,255,0.3)",
                borderLeft: "2px solid rgba(255,255,255,0.3)",
                borderRight: "2px solid rgba(255,255,255,0.3)",
                borderBottom: "none",
                borderBottomRightRadius:'0px',
              },
            }}
          />
          <Tab
            label={
              <Box
                sx={{
                  background: tabValue === 1 ? "linear-gradient(180deg, #E6B84D 0%, #F2D078 100%)" : "transparent",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  color: tabValue === 1 ? "black" : "rgba(255, 255, 255, 0.7)",
                  fontWeight: tabValue === 1 ? 700 : 600,
                  textDecoration: tabValue === 1 ? "none" : "underline",
                  width: "100%",
                  fontFamily:'Lora',
                  fontSize:'1.25rem',
                }}
              >
                Activity Streaks
              </Box>
            }
            {...a11yProps(1)}
            sx={{
              textTransform: "none",
              minHeight: 56,
              margin: 0,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              flex: 1,
              fontSize: "1rem",
              borderBottom: "2px solid rgba(255,255,255,0.3)",
              [theme.breakpoints.down("sm")]: {
                minHeight: 48,
                fontSize: "0.875rem",
                margin: 0,
              },
              "&.Mui-selected": {
                borderTop: "2px solid rgba(255,255,255,0.3)",
                borderLeft: "2px solid rgba(255,255,255,0.3)",
                borderRight: "2px solid rgba(255,255,255,0.3)",
                borderBottom: "none",
                borderBottomLeftRadius:'0',
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Content area - fixed width to prevent layout shift */}
      <Box sx={{ 
        minHeight: 300, 
        width: "100%",
        borderRadius: "0 0 12px 12px",
        padding: theme.spacing(2),
        paddingTop: 0,
        border: "2px solid rgba(255,255,255,0.3)",
        borderTop: "none",
        [theme.breakpoints.down("sm")]: {
          minHeight: 300,
          padding: theme.spacing(1.5),
          paddingTop: 0,
        }
      }}>
          {/* Milestone Rewards */}
          <TabPanel value={tabValue} index={0}>
            <Typography
              sx={{ 
                ...TYPOGRAPHY.body1,
              }}
            >
              Achieve special milestones and earn bonus LP for your dedication to the community.
            </Typography>

            <Grid container spacing={2} mt='0.5rem'>
              {MILESTONE_DATA.map((item, idx) => (
                <Grid item xs={12} sm={6} key={item.title + idx}>
                  <Box
                    sx={{
                      border: "1px solid #FDEFAF",
                      borderRadius: '20px',
                      padding: '0.5rem 1rem',
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      minHeight: 60,
                      [theme.breakpoints.down("sm")]: {
                        padding: 1.5,
                        minHeight: 50,
                        flexDirection: "column",
                        gap: theme.spacing(1),
                        textAlign: "center",
                      },
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
                        backgroundColor: "primary.main",
                        borderRadius: "20px",
                        padding: '0.5rem 1.5rem',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: '0.8rem',
                        fontWeight: 800,
                        fontSize: "1rem",
                        border: "1px solid #FED669",
                        minWidth: '100px',
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "0.75rem",
                          padding: theme.spacing(0.4, 1.2),
                          minWidth: 50,
                        },
                      }}
                    >
                      {item.points}
                      <img src={lpIcon ?? undefined} alt="lp-info-image" style={{ height:'1rem',width:'1rem' }} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Activity Streaks */}
          <TabPanel value={tabValue} index={1}>
          <Typography
              sx={{ 
                ...TYPOGRAPHY.body1,
              }}
            >
              Activity Streaks
            </Typography>
          <p>Coming soon</p>
          </TabPanel>
        </Box>
    </Box>
  );
};

export default MilestoneRewards;