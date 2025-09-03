import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { useMemo, useState, useCallback } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';

import type { TierItem } from './types';

import Benefits from './benefits-section';
import Milestone from './milestone-section';

interface LPSectionProps {
  images: Record<string, string>;
  lpcurrPoints: number;
  lpcurrBadge: string;
  onViewHistory: () => void;
  onKnowMore: () => void;
  tier: TierItem[];
  isMobile: boolean;
  isTablet: boolean;
}

// Extracted reusable components for better maintainability
const PointsSection = ({ 
  points, 
  imageSrc, 
  onViewHistory, 
  isMobile 
}: { 
  points: number; 
  imageSrc: string; 
  onViewHistory: () => void; 
  isMobile: boolean; 
}) => (
  <Box display="flex" gap={isMobile ? 0 : "1rem"} alignItems="center" sx={{ minWidth: 0 }} flexDirection= {isMobile ? 'column' :'row'}   textAlign={isMobile ?'center' :'left'}>
    <img 
      src={imageSrc} 
      alt="lp" 
      style={isMobile ? { width: '28px', height: '28px' } : undefined}
    />
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          ...(isMobile ? TYPOGRAPHY.body1 : TYPOGRAPHY.headline6),
          color: 'white',
          fontWeight: isMobile ? 500 : 800,
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {isMobile ? `${points} LP` : `${points} Points`}
      </Typography>
      <Box
        sx={{
          cursor: 'pointer',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={onViewHistory}
      >
        <Typography
          sx={{
            ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.body2),
            whiteSpace: 'nowrap',
          }}
        >
          {isMobile ? 'View Points' : 'View Points History'}
        </Typography>
        <Iconify 
          icon="icon-park-outline:right" 
          width={isMobile ? 14 : undefined} 
        />
      </Box>
    </Box>
  </Box>
);

const BadgeSection = ({ 
  badge, 
  imageSrc, 
  isMobile 
}: { 
  badge: string; 
  imageSrc: string; 
  isMobile: boolean; 
}) => (
  <Box display="flex" gap={isMobile ? 0 : "1rem"} alignItems="center" sx={{ minWidth: 0 }} flexDirection= {isMobile ? 'column' :'row'}   textAlign={isMobile ?'center' :'left'}>
    <img 
      src={imageSrc} 
      alt="bronze-badge" 
      style={isMobile ? { width: '28px', height: '28px' } : undefined}
    />
    <Box sx={{ minWidth: 0 }}>
      <Typography
        sx={{
          ...(isMobile ? TYPOGRAPHY.body1 : TYPOGRAPHY.headline6),
          color: 'white',
          fontWeight: isMobile ? 500 : 700,
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
        }}
      >
        {badge}
      </Typography>
      <Typography
        sx={{
          ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.body2),
          color: 'primary.lighter',
          whiteSpace: isMobile ? 'nowrap' : undefined,
          wordBreak: !isMobile ? 'break-word' : undefined,
          overflowWrap: !isMobile ? 'break-word' : undefined,
        }}
      >
        Your Current Badge
      </Typography>
    </Box>
  </Box>
);

const KnowMoreButton = ({ isMobile, onKnowMore,isTablet }: { isMobile: boolean, onKnowMore: () => void,isTablet: boolean }) => (
  <Button
    className="button-primary-outlined"
    variant="outlined"
    size={isMobile ? "small" : isTablet ? "medium" : "large"}
    sx={{ backgroundColor: 'transparent' }}
    onClick={onKnowMore}
  >
    Know More
    <Iconify icon="icon-park-outline:right" />
  </Button>
);

export default function LPSection({
  images,
  lpcurrPoints,
  lpcurrBadge,
  onViewHistory,
  onKnowMore,
  tier,
  isMobile,
  isTablet
}: LPSectionProps) {
  const [benefitsExpanded, setBenefitsExpanded] = useState(true);

  // Memoize the gradient background to prevent unnecessary recalculations
  const gradientBackground = useMemo(() => 
    'radial-gradient(ellipse at 104.35% 264%, #008AFA 12.86%, #0032AA 100%)', 
    []
  );

  // Memoize the onViewHistory callback to prevent unnecessary re-renders
  const handleViewHistory = useCallback(() => {
    onViewHistory();
  }, [onViewHistory]);

  // Memoize the benefits expanded setter
  const handleBenefitsExpandedChange = useCallback((expanded: boolean) => {
    setBenefitsExpanded(expanded);
  }, []);

  // Common styles object to reduce duplication
  const commonStyles = useMemo(() => ({
    background: gradientBackground,
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  }), [gradientBackground]);

  return (
    <Box
      sx={{
        mt: { xs: '1.25rem', sm: '2rem' },
        width: '90%',
        maxWidth: '1140px',
        mx: 'auto',
      }}
    >
      {!isMobile ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...commonStyles,
            p: {
              sm: '1.25rem 2rem',
              md: '1.5rem 3rem',
              lg: '1.5rem 4.8rem',
            },
            gap: '1.5rem',
          }}
        >
          {/* Left side - Points and Badge */}
          <Box display="flex" gap="2rem" sx={{ flex: 1 }}>
            <PointsSection 
              points={lpcurrPoints} 
              imageSrc={images.lp} 
              onViewHistory={handleViewHistory} 
              isMobile={false} 
            />
            <BadgeSection 
              badge={lpcurrBadge} 
              imageSrc={images['bronze-badge']} 
              isMobile={false} 
            />
          </Box>

          {/* Right side - Button */}
          <Box display="flex" alignItems="flex-start">
            <KnowMoreButton isMobile={false} onKnowMore={onKnowMore} isTablet={isTablet}/>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ...commonStyles,
            p: '1.5rem 1rem',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              sx={{
                ...TYPOGRAPHY.body2,
                color: 'white',
              }}
            >
              GBN Loyalty Programme
            </Typography>
            <KnowMoreButton isMobile onKnowMore={onKnowMore} isTablet={isTablet}/>
          </Box>
          <Box sx={{ display: 'flex', p: '1.5rem 2.5rem 0 2.5rem', alignItems: 'center' }}>
            {/* Points Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
              }}
            >
              <PointsSection 
                points={lpcurrPoints} 
                imageSrc={images.lp} 
                onViewHistory={handleViewHistory} 
                isMobile
              />
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderRightWidth: '2px',
                alignSelf: 'stretch'
              }}
            />
            {/* Badge Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <BadgeSection 
                badge={lpcurrBadge} 
                imageSrc={images['bronze-badge']} 
                isMobile 
              />
            </Box>
          </Box>
        </Box>
      )}

      {/* Milestone Section */}
      <Milestone
        tier={tier}
        lpcurrPoints={lpcurrPoints}
        images={images}
        benefitsExpanded={benefitsExpanded}
        setBenefitsExpanded={handleBenefitsExpandedChange}
        isMobile={isMobile}
      />

      {/* Benefits Section */}
      <Benefits
        benefitsExpanded={benefitsExpanded}
        tiers={tier}
        images={images}
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </Box>
  );
} 
