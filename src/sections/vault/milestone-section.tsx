import { Iconify } from 'src/components/iconify';
import { Box, Typography, LinearProgress, IconButton } from '@mui/material';

interface TierItem {
  title: string;
  range: string;
}

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
  // Calculate progress and next badge info
  const getNextBadgeInfo = () => {
    if (lpcurrPoints < 3000) return { name: "Silver", needed: 3000 - lpcurrPoints };
    if (lpcurrPoints < 7500) return { name: "Gold", needed: 7500 - lpcurrPoints };
    if (lpcurrPoints < 15000) return { name: "Platinum", needed: 15000 - lpcurrPoints };
    return { name: "Max", needed: 0 };
  };

  const calculateProgress = () => {
    if (lpcurrPoints < 3000) return (lpcurrPoints / 3000) * 100;
    if (lpcurrPoints < 7500) return ((lpcurrPoints - 3000) / (7500 - 3000)) * 100;
    if (lpcurrPoints < 15000) return ((lpcurrPoints - 7500) / (15000 - 7500)) * 100;
    return 100;
  };

  const nextBadge = getNextBadgeInfo();
  const progressValue = calculateProgress();

  return (
    <Box sx={{
      border: '1px solid #BABABA',
      p: '1.5rem',
      borderTop: 'none',
      backgroundColor: 'white',
    }}>
      {/* Milestone Tiers */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 3,
        flexWrap: 'wrap',
        gap: 2
      }}>
        {tier.map((item: TierItem) => (
          <Box key={item.title} sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            minWidth: '120px'
          }}>
            <img src={images[`${item.title.toLowerCase()}-badge`]} alt={`${item.title}-badge`} />
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              {item.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center',
                color: 'text.secondary'
              }}
            >
              {item.range}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Progress Section */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold', 
            mb: 2,
            color: 'primary.main'
          }}
        >
          Earn {nextBadge.needed.toLocaleString()} more for The {nextBadge.name} Badge
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={progressValue} 
              sx={{ 
                height: 10, 
                borderRadius: 5,
                backgroundColor: '#E0E0E0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#0032AA',
                  borderRadius: 5
                }
              }} 
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {`${Math.round(progressValue)}%`}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Information and Toggle Section */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5', 
        p: 2, 
        borderRadius: 1,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          <Iconify icon="mdi:information-outline" sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="body2">
            Almost there! Earn your next badge "The {nextBadge.name}" and get 1.5× LP on all activities.
          </Typography>
        </Box>
        
        <IconButton 
          onClick={() => setBenefitsExpanded(!benefitsExpanded)}
          aria-label={benefitsExpanded ? 'Hide benefits' : 'Show benefits'}
          sx={{ ml: 1 }}
        >
          <Typography variant="body2" sx={{ mr: 0.5 }}>
            {benefitsExpanded ? 'Hide All Benefits' : 'Show All Benefits'}
          </Typography>
          <Iconify icon={benefitsExpanded ? "mdi:chevron-up" : "mdi:chevron-down"} />
        </IconButton>
      </Box>
    </Box>
  );
}