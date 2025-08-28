import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Tooltip, Typography, IconButton, LinearProgress, Button } from '@mui/material';

import type { TierItem } from './types';

interface MilestoneProps {
  tier: TierItem[];
  images: Record<string, string>;
  lpcurrPoints: number;
  benefitsExpanded: boolean;
  setBenefitsExpanded: (expanded: boolean) => void;
}

export default function MilestoneComponent({ 
  tier,
  images,
  lpcurrPoints, 
  benefitsExpanded, 
  setBenefitsExpanded 
}: MilestoneProps) {
  // Extract milestone thresholds from tier data
  const extractPointsFromRange = (range: string): { min: number; max: number | null } => {
    const match = range.match(/(\d+)(?:-(\d+))?/);
    if (!match) return { min: 0, max: null };
    
    const min = parseInt(match[1], 10);
    const max = match[2] ? parseInt(match[2], 10) : null;
    return { min, max };
  };

  // Create milestones from tier data
  const milestones = tier.map((tierItem, index) => {
    const { min } = extractPointsFromRange(tierItem.range);
    const position = (index / (tier.length - 1)) * 100; // Evenly distributed
    
    return {
      name: tierItem.title,
      points: min,
      position,
      tierData: tierItem
    };
  });

  // Get all threshold points for calculations
  const thresholdPoints = milestones.map(m => m.points).sort((a, b) => a - b);

  // Calculate progress and next badge info
  const getNextBadgeInfo = () => {
    for (let i = 0; i < thresholdPoints.length; i+=1) {
      if (lpcurrPoints < thresholdPoints[i]) {
        const nextMilestone = milestones.find(m => m.points === thresholdPoints[i]);
        return { 
          name: nextMilestone?.name || "Next", 
          needed: thresholdPoints[i] - lpcurrPoints 
        };
      }
    }
    return { name: "Max", needed: 0 };
  };

  const calculateProgress = () => {
    // Find current position between milestones
    let currentIndex = 0;
    for (let i = thresholdPoints.length - 1; i >= 0; i-=1) {
      if (lpcurrPoints >= thresholdPoints[i]) {
        currentIndex = i;
        break;
      }
    }

    // If at max level
    if (currentIndex === thresholdPoints.length - 1) {
      return 100;
    }

    // Calculate progress between current and next milestone
    const currentThreshold = thresholdPoints[currentIndex];
    const nextThreshold = thresholdPoints[currentIndex + 1];
    const progressInSegment = (lpcurrPoints - currentThreshold) / (nextThreshold - currentThreshold);
    
    // Each segment represents equal visual space
    const segmentSize = 100 / (thresholdPoints.length - 1);
    return (currentIndex * segmentSize) + (progressInSegment * segmentSize);
  };

  const nextBadge = getNextBadgeInfo();
  const progressValue = calculateProgress();

  const isReached = (points: number) => lpcurrPoints >= points;

  const getTooltipText = (milestone: typeof milestones[0]) => {
    if (isReached(milestone.points)) {
      return `${milestone.name} achieved!`;
    }
    const pointsNeeded = milestone.points - lpcurrPoints;
    return `${pointsNeeded.toLocaleString()} points needed for ${milestone.name}`;
  };

  return (
    <Box sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      background:'white',
      borderBottomLeftRadius: !benefitsExpanded ? '16px' : undefined,
      borderBottomRightRadius: !benefitsExpanded ? '16px' : undefined,
    }}>
      {/* Milestone Tiers with Progress */}
      <Box sx={{ mt: '11rem', width: '70%' }}>
        {/* Badge Icons, Titles and Ranges positioned above milestone stops */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          mb: 2,
          position: 'relative',
        }}>
          {milestones.map((milestone) => (
            <Box 
              key={milestone.name} 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                position: 'absolute',
                left: `${milestone.position}%`,
                transform: 'translateX(-50%)',
                minWidth: '80px'
              }}
            >
              <img 
                src={images[`${milestone.name.toLowerCase()}-badge`]} 
                alt={`${milestone.name}-badge`}
                style={{ marginBottom: '0.1rem' }}
              />
              <Typography  
                sx={{ 
                  ...TYPOGRAPHY.headline6,
                  fontWeight: 600,
                  color: 'primary.main'
                }}
              >
                {milestone.name}
              </Typography>
              <Typography 
                sx={{ 
                  ...TYPOGRAPHY.body2,
                  color: 'info.light'
                }}
              >
                {milestone.tierData.range}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Progress Section with Milestone Stops */}
        <Box sx={{ position: 'relative',m:'1.5rem 0'}}>
          {/* Progress Bar */}
          <LinearProgress 
            variant="determinate" 
            value={progressValue} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: 'backgroundColor.lighter',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'primary.main',
                borderRadius: 4
              }
            }} 
          />
          {/* Milestone Stops */}
          {milestones.map((milestone) => (
              <Box
                key={milestone.name}
                sx={{
                  position: 'absolute',
                  left: `${milestone.position}%`,
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  backgroundColor: isReached(milestone.points) ? 'success.main' : 'backgroundColor.lighter',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isReached(milestone.points) ? (
                  <Iconify 
                    icon="mdi:check" 
                    sx={{ 
                      color: 'white', 
                      fontSize: 14,
                      fontWeight: 'bold'
                    }} 
                  />
                ) : (
                  <Box
                    sx={{
                      backgroundColor: 'backgroundColor.lighter'
                    }}
                  />
                )}
              </Box>
          ))}
        </Box>
      </Box>

      {/* Progress Information */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            color: 'primary.main'
          }}
        >
          {nextBadge.name !== "Max" ? 
            `Earn ${nextBadge.needed.toLocaleString()} more for The ${nextBadge.name} Badge` :
            "Congratulations! You've reached the highest tier!"
          }
        </Typography>
      </Box>

      {/* Information and Toggle Section */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: 'backgroundColor.lighter', 
        borderBottomLeftRadius: !benefitsExpanded ? '16px' : undefined,
        borderBottomRightRadius: !benefitsExpanded ? '16px' : undefined,
        p: '0.5rem 4.8rem',
        width: '100%'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Iconify icon="mdi:information-outline" sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2">
            {nextBadge.name !== "Max" ? 
              `Almost there! Earn your next badge "The ${nextBadge.name}" and get 1.5× LP on all activities.` :
              "You've unlocked all benefits! Keep earning to maintain your status."
            }
          </Typography>
        </Box>
        <Button 
        variant='outlined'
          onClick={() => setBenefitsExpanded(!benefitsExpanded)}
          aria-label={benefitsExpanded ? 'Hide benefits' : 'Show benefits'}
          sx={{ }}
        >
          <Typography variant="body2" sx={{ mr: 0.5 }}>
            {benefitsExpanded ? 'Hide All Benefits' : 'See All Benefits'}
          </Typography>
          <Iconify icon={benefitsExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} />
        </Button>
      </Box>
    </Box>
  );
}