import type { TierItem } from 'src/types';

import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Button, Typography, LinearProgress } from '@mui/material';

import { ProgressTooltip } from './progress-tooltip';

interface MilestoneProps {
  tier: TierItem[];
  images: Record<string, string>;
  lpcurrPoints: number;
  benefitsExpanded: boolean;
  setBenefitsExpanded: (expanded: boolean) => void;
  isMobile: boolean;
}

export default function MilestoneComponent({
  tier,
  images,
  lpcurrPoints,
  benefitsExpanded,
  setBenefitsExpanded,
  isMobile,
}: MilestoneProps) {
  // Early return if no tier data
  if (!tier || tier.length === 0) {
    return null;
  }

  // Create milestones from tier data
  const milestones = tier.map((tierItem, index) => {
    const position = (index / (tier.length - 1)) * 100; // Evenly distributed

    return {
      name: tierItem.label,
      points: tierItem.startRange,
      position,
      tierData: tierItem,
    };
  });

  // Get all threshold points for calculations
  const thresholdPoints = milestones.map((m) => m.points).sort((a, b) => a - b);

  // Calculate progress and next badge info
  const getNextBadgeInfo = () => {
    for (let i = 0; i < thresholdPoints.length; i += 1) {
      if (lpcurrPoints < thresholdPoints[i]) {
        const nextMilestone = milestones.find((m) => m.points === thresholdPoints[i]);
        return {
          name: nextMilestone?.name || 'Next',
          needed: thresholdPoints[i] - lpcurrPoints,
        };
      }
    }
    return { name: 'Max', needed: 0 };
  };

  const calculateProgress = () => {
    // Find current position between milestones
    let currentIndex = 0;
    for (let i = thresholdPoints.length - 1; i >= 0; i -= 1) {
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
    const progressInSegment =
      (lpcurrPoints - currentThreshold) / (nextThreshold - currentThreshold);

    // Each segment represents equal visual space
    const segmentSize = 100 / (thresholdPoints.length - 1);
    return currentIndex * segmentSize + progressInSegment * segmentSize;
  };

  const nextBadge = getNextBadgeInfo();
  const progressValue = calculateProgress();

  const isReached = (points: number) => lpcurrPoints >= points;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'white',
        borderBottomLeftRadius: !benefitsExpanded ? '16px' : undefined,
        borderBottomRightRadius: !benefitsExpanded ? '16px' : undefined,
      }}
    >
      {/* Milestone Tiers with Progress */}
      <Box sx={{ mt: isMobile ? '8rem' : '11rem', width: '70%' }}>
        {/* Badge Icons, Titles and Ranges positioned above milestone stops */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: 2,
            position: 'relative',
          }}
        >
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
                minWidth: '80px',
              }}
            >
              <img
                src={milestone.tierData.tierImageUrl}
                alt={`${milestone.name}-badge`}
                style={{ width: isMobile ? '30px' : 'auto', height: isMobile ? '40px' : 'auto' }}
              />
              <Typography
                sx={{
                  ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.headline6),
                  fontWeight: 600,
                  color: 'primary.main',
                }}
              >
                {milestone.name}
              </Typography>
              <Typography
                sx={{
                  ...(isMobile ? TYPOGRAPHY.body4 : TYPOGRAPHY.body2),
                  color: 'info.dark',
                  whiteSpace: 'nowrap',
                }}
              >
                {milestone.tierData.endRange === 999999 
                  ? `${milestone.tierData.startRange}+ Points`
                  : `${milestone.tierData.startRange}-${milestone.tierData.endRange} Points`
                }
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Progress Section with Milestone Stops */}
        <Box sx={{ position: 'relative', m: '1.5rem 0' }}>
          {/* Progress Bar */}
          <LinearProgress
            variant="determinate"
            value={progressValue}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'backgroundColor.light',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'primary.main',
                borderRadius: 4,
              },
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
                backgroundColor: isReached(milestone.points)
                  ? 'success.main'
                  : 'backgroundColor.light',
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
                    fontWeight: 'bold',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    backgroundColor: 'backgroundColor.light',
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          position: 'relative',
          mb: 3,
          mt: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ProgressTooltip nextBadgeName={nextBadge.name} pointsNeeded={nextBadge.needed} isMobile={isMobile}/>
      </Box>

      {/* Information and Toggle Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'backgroundColor.light',
          borderBottomLeftRadius: !benefitsExpanded ? '16px' : undefined,
          borderBottomRightRadius: !benefitsExpanded ? '16px' : undefined,
          flexDirection:isMobile ? 'column' : 'row',
          gap:'0.5rem',
          p: '0.5rem 4.8rem',
          width: '100%',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1,flexDirection:isMobile ? 'column' : 'row' }}>
          <Iconify icon="mdi:information-outline" sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2" sx={{textAlign:isMobile ? 'center' : 'left'}}>
            {nextBadge.name !== 'Max'
              ? `Almost there! Earn your next badge "The ${nextBadge.name}" and get 1.5× LP on all activities.`
              : "You've unlocked all benefits! Keep earning to maintain your status."}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          onClick={() => setBenefitsExpanded(!benefitsExpanded)}
          aria-label={benefitsExpanded ? 'Hide benefits' : 'Show benefits'}
          sx={{}}
        >
          <Typography variant="body2" sx={{ mr: 0.5 }}>
            {benefitsExpanded ? 'Hide All Benefits' : 'See All Benefits'}
          </Typography>
          <Iconify icon={benefitsExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'} />
        </Button>
      </Box>
    </Box>
  );
}
