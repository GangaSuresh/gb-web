import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Grid,
  useTheme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { Iconify } from "../../components/iconify";

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

const MilestoneRewards: React.FC = () => {
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
          // borderRadius: "12px 12px 0 0",
          // border: "2px solid rgba(255,255,255,0.3)",
          // borderBottom: "none",
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
            "& .MuiTabs-flexContainer": {
              // gap: theme.spacing(0),
            },
            "& .MuiTabs-indicator": {
              display: "none",
            },
            [theme.breakpoints.down("sm")]: {
              minHeight: 48,
            },
          }}
        >
          <Tab
            label="Milestone Rewards"
            {...a11yProps(0)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              minHeight: 56,
              margin: 0,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              color: "rgba(255, 255, 255, 0.7)",
              textDecoration: "underline",
              flex: 1,
              fontSize: "1rem",
              borderBottom: "2px solid rgba(255,255,255,0.3)",
              [theme.breakpoints.down("sm")]: {
                minHeight: 48,
                fontSize: "0.875rem",
                margin: 0,
              },
              borderBottomRightRadius:'12px',
              "&.Mui-selected": {
                // background: "linear-gradient(180deg, #E6B84D 0%, #F2D078 100%)",
                color: "black",
                fontWeight: 700,
                borderTop: "2px solid rgba(255,255,255,0.3)",
                borderLeft: "2px solid rgba(255,255,255,0.3)",
                borderRight: "2px solid rgba(255,255,255,0.3)",
                borderBottom: "none",
                borderBottomRightRadius:'0px',
                textDecoration:'none'
              },
            }}
          />
          <Tab
            label="Activity Streaks"
            {...a11yProps(1)}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              minHeight: 56,
              margin: 0,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              color: "rgba(255, 255, 255, 0.7)",
              textDecoration: "underline",
              flex: 1,
              fontSize: "1rem",
              borderBottom: "2px solid rgba(255,255,255,0.3)",
              borderBottomLeftRadius:'12px',
              [theme.breakpoints.down("sm")]: {
                minHeight: 48,
                fontSize: "0.875rem",
                margin: 0,
              },
              "&.Mui-selected": {
                // background: "linear-gradient(180deg, #E6B84D 0%, #F2D078 100%)",
                color: "black",
                fontWeight: 700,
                borderTop: "2px solid rgba(255,255,255,0.3)",
                borderLeft: "2px solid rgba(255,255,255,0.3)",
                borderRight: "2px solid rgba(255,255,255,0.3)",
                borderBottom: "none",
                borderBottomLeftRadius:'0',
                textDecoration:'none'
              },
            }}
          />
        </Tabs>
      </Box>

      {/* Content area - fixed width to prevent layout shift */}
      <Box sx={{ 
        minHeight: 400, 
        width: "100%",
        borderRadius: "0 0 12px 12px",
        padding: theme.spacing(2),
        paddingTop: 0,
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopLeftRadius:tabValue === 1 ? '12px' : '0',
        borderTopRightRadius:tabValue === 0 ? '12px' : '0',
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
              variant="body1"
              sx={{ 
                color: "white", 
                mb: 3, 
                fontSize: "1rem",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.875rem",
                  mb: 2,
                }
              }}
            >
              Achieve special milestones and earn bonus LP for your dedication to the community.
            </Typography>

            <Grid container spacing={2}>
              {MILESTONE_DATA.map((item, idx) => (
                <Grid item xs={12} sm={6} key={item.title + idx}>
                  <Box
                    sx={{
                      // backgroundColor: "#3A60E0",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      borderRadius: 8,
                      padding: theme.spacing(2),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      minHeight: 60,
                      [theme.breakpoints.down("sm")]: {
                        padding: theme.spacing(1.5),
                        minHeight: 50,
                        flexDirection: "column",
                        gap: theme.spacing(1),
                        textAlign: "center",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "white",
                        fontWeight: 500,
                        flex: 1,
                        fontSize: "0.95rem",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "0.875rem",
                          textAlign: "center",
                        }
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        padding: theme.spacing(0.5, 1.5),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: theme.spacing(0.5),
                        color: "#2142C2",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        border: "1px solid #2142C2",
                        minWidth: 60,
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "0.75rem",
                          padding: theme.spacing(0.4, 1.2),
                          minWidth: 50,
                        },
                      }}
                    >
                      {item.points}
                      <Iconify 
                        icon="eva:star-fill" 
                        width={isMobile ? 14 : 16} 
                        sx={{ color: "#9E9E9E" }} 
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          {/* Activity Streaks */}
          <TabPanel value={tabValue} index={1}>
            <Typography
              variant="body1"
              sx={{ 
                color: "white", 
                mb: 3, 
                fontSize: "1rem",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "0.875rem",
                  mb: 2,
                }
              }}
            >
              Activity Streaks
            </Typography>
            <Box
              sx={{
                // backgroundColor: theme.palette.background.paper,
                borderRadius: 10,
                border: "1px solid #e0e0e0",
                padding: theme.spacing(2),
                [theme.breakpoints.down("sm")]: {
                  padding: theme.spacing(1.5),
                  borderRadius: 8,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{ 
                  fontWeight: "bold", 
                  fontSize: "1.1rem", 
                  mb: 1,
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "1rem",
                  }
                }}
              >
                Activity Streaks
              </Typography>
              {STREAK_DATA.map((t, i) => (
                <Typography 
                  key={i} 
                  variant="body1" 
                  sx={{ 
                    mb: 1,
                    [theme.breakpoints.down("sm")]: {
                      fontSize: "0.875rem",
                    }
                  }}
                >
                  {t}
                </Typography>
              ))}
            </Box>
          </TabPanel>
        </Box>
    </Box>
  );
};

export default MilestoneRewards;