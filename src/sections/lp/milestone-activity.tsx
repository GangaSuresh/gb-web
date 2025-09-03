import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Grid,
  Paper,
  styled,
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

/* Styled Tabs to resemble the screenshot */
const CardTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 56,
  "& .MuiTabs-flexContainer": {
    gap: theme.spacing(0),
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  minHeight: 56,
  padding: theme.spacing(1.25, 2),
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  color: "rgba(255, 255, 255, 0.7)",
  textDecoration: "underline",
  backgroundColor: "transparent",
  minWidth: 160,
  "&.Mui-selected": {
    background:
      "linear-gradient(180deg, rgba(255,234,167,1) 0%, rgba(247,208,92,1) 100%)",
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    textDecoration: "none",
    fontWeight: 700,
  },
}));

/* Wrapper that looks like the blue panel in the image */
const PanelPaper = styled(Paper)(({ theme }) => ({
  background:
    "linear-gradient(180deg, rgba(13,87,196,1) 0%, rgba(9,65,152,1) 100%)",
  borderRadius: 12,
  padding: theme.spacing(2),
  boxShadow: theme.shadows[3],
  border: "1px solid rgba(255,255,255,0.15)",
}));

/* Inner card with subtle outline */
const CardBody = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 10,
  border: "1px solid #e0e0e0",
  padding: theme.spacing(2),
}));

/* Individual milestone item card */
const MilestoneCard = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: 8,
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: 60,
}));

/* Circular LP badge */
const LPBadge = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  borderRadius: "50%",
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  fontWeight: 700,
  fontSize: "0.75rem",
  border: "1px solid rgba(255, 255, 255, 0.3)",
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
  >
    {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
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
    <PanelPaper>
      {/* Tabs header row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: { xs: 0.5, sm: 1 },
        }}
      >
        <CardTabs
          value={tabValue}
          onChange={handleTabChange}
          variant={isMobile ? "fullWidth" : "standard"}
          aria-label="Milestones and Activity Tabs"
        >
          {/* Both tabs use the same styled component */}
          <StyledTab label="Milestone Rewards" {...a11yProps(0)} />
          <StyledTab label="Activity Streaks" {...a11yProps(1)} />
        </CardTabs>
      </Box>

      {/* Content area - fixed width to prevent layout shift */}
      <Box sx={{ mt: 2, minHeight: 400 }}>
        {/* Milestone Rewards */}
        <TabPanel value={tabValue} index={0}>
          <Typography
            variant="body1"
            sx={{ color: "rgba(255, 255, 255, 0.9)", mb: 3 }}
          >
            Achieve special milestones and earn bonus LP for dedication to the
            community.
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
                    }}
                  >
                    {item.title}
                  </Typography>
                  <LPBadge>
                    {item.points}
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
            sx={{ color: "rgba(255, 255, 255, 0.9)", mb: 3 }}
          >
            Activity Streaks
          </Typography>
          <CardBody>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", fontSize: "1.1rem", mb: 1 }}
            >
              Activity Streaks
            </Typography>
            {STREAK_DATA.map((t, i) => (
              <Typography key={i} variant="body1" sx={{ mb: 1 }}>
                {t}
              </Typography>
            ))}
          </CardBody>
        </TabPanel>
      </Box>
    </PanelPaper>
  );
};

export default MilestoneRewards;