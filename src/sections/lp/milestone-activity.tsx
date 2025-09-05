import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Grid,
  styled,
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

/* Styled Tabs to match the image design */
const CardTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 56,
  background: "red",
  "& .MuiTabs-flexContainer": {
   // gap: theme.spacing(0),
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: 48,
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  minHeight: 56,
  margin: theme.spacing(0.5),
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  color: "rgba(255, 255, 255, 0.7)",
  textDecoration: "underline",
  flex: 1,
  fontSize: "1rem",
  [theme.breakpoints.down("sm")]: {
    minHeight: 48,
    fontSize: "0.875rem",
    margin: theme.spacing(0.25),
  },
  "&.Mui-selected": {
    background:
      "linear-gradient(180deg, #E6B84D 0%, #F2D078 100%)",
    color: "#1A1A1A",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textDecoration: "none",
    fontWeight: 700,
    borderTop: "2px solid rgba(255,255,255,0.3)",
    borderLeft: "2px solid rgba(255,255,255,0.3)",
    borderRight: "2px solid rgba(255,255,255,0.3)",
  },
}));



/* Content wrapper with padding */
const ContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  width: "100%",
  maxWidth: 800,
  margin: "0 auto",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
  },
}));

/* Inner card with subtle outline */
const CardBody = styled(Box)(({ theme }) => ({
  //backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
  border: "1px solid #e0e0e0",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1.5),
    borderRadius: 8,
  },
}));

/* Individual milestone item card */
const MilestoneCard = styled(Box)(({ theme }) => ({
  //backgroundColor: "#3A60E0",
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
}));

/* Oval LP badge with star icon */
const LPBadge = styled(Box)(({ theme }) => ({
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
}));

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
    <ContentWrapper>
      {/* Tabs header row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          border: "2px solid rgba(255,255,255,0.3)",
          borderBottom: "none",
        }}
      >
        <CardTabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          aria-label="Milestones and Activity Tabs"
          sx={{ width: "100%" }}
        >
          {/* Both tabs use the same styled component */}
          <StyledTab label="Milestone Rewards" {...a11yProps(0)} />
          <StyledTab label="Activity Streaks" {...a11yProps(1)} />
        </CardTabs>
      </Box>

      {/* Content area - fixed width to prevent layout shift */}
      <Box sx={{ 
        minHeight: 400, 
        width: "100%",
        borderRadius: "0 0 12px 12px",
        padding: theme.spacing(2),
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTop: "none",
        [theme.breakpoints.down("sm")]: {
          minHeight: 300,
          padding: theme.spacing(1.5),
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
                  <MilestoneCard>
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
                    <LPBadge>
                      {item.points}
                      <Iconify 
                        icon="eva:star-fill" 
                        width={isMobile ? 14 : 16} 
                        sx={{ color: "#9E9E9E" }} 
                      />
                    </LPBadge>
                  </MilestoneCard>
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
            <CardBody>
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
            </CardBody>
          </TabPanel>
        </Box>
    </ContentWrapper>
  );
};

export default MilestoneRewards;