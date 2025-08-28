import { Box, Typography } from "@mui/material";

interface ProgressTooltipProps {
    nextBadgeName: string;
    pointsNeeded: number;
  }
  
  export function ProgressTooltip({ nextBadgeName, pointsNeeded }: ProgressTooltipProps) {
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
        <Typography variant="body2" sx={{ fontWeight: 'inherit', color: 'inherit' }}>
          Just {pointsNeeded.toLocaleString()} points to {nextBadgeName}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 'inherit', color: 'inherit',textDecoration:'underline' }}>
          Keep Earning
        </Typography>
      </Box>
    );
  }