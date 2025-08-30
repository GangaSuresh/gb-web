import { Box, Typography } from "@mui/material";
import { TYPOGRAPHY } from "src/theme/styles/fonts";

interface ProgressTooltipProps {
    nextBadgeName: string;
    pointsNeeded: number;
    isMobile: boolean;
  }
  
  export function ProgressTooltip({ nextBadgeName, pointsNeeded,isMobile }: ProgressTooltipProps) {
    return (
      <Box sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        borderRadius: '100px',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontWeight: 'medium'
      }}>
        <Typography  sx={{  ...(TYPOGRAPHY.caption), color: 'inherit' }}>
          Just {pointsNeeded.toLocaleString()} points to {nextBadgeName}
        </Typography>
        <Typography  sx={{  ...(TYPOGRAPHY.caption), color: 'inherit',textDecoration:'underline' }}>
          Keep Earning
        </Typography>
      </Box>
    );
  }