import React, { useRef, useState } from 'react';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Box,
  Card,
  Chip,
  useTheme,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { GOLDEN_BADGE } from './constants';

interface EarnMethod {
  title: string;
  description: string;
  value: string;
  maxPerDay: string;
}

interface LPEarningMethodsProps {
  earnMethods: EarnMethod[];
  isMobile: boolean;
  lpicon: string|null;
}

const LPEarningMethods: React.FC<LPEarningMethodsProps> = ({ earnMethods, isMobile, lpicon }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsPerSlide =  1;
  const totalSlides = earnMethods.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && totalSlides > 1) {
      nextSlide();
    }
    if (isRightSwipe && totalSlides > 1) {
      prevSlide();
    }
  };

  // Mobile view - Sliding Grid with Dots
  if (isMobile) {
    return (
      <Box sx={{ position: 'relative', px: 2, py: 3 }}>
        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <IconButton
              onClick={prevSlide}
              sx={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'grey.100' },
                width: 40,
                height: 40
              }}
            >
              <ChevronLeft />
            </IconButton>
            
            <IconButton
              onClick={nextSlide}
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': { bgcolor: 'grey.100' },
                width: 40,
                height: 40
              }}
            >
              <ChevronRight />
            </IconButton>
          </>
        )}

        {/* Sliding Container */}
        <Box
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          sx={{
            overflow: 'hidden',
            position: 'relative',
            mx: totalSlides > 1 ? 5 : 0,
            touchAction: 'pan-y'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.3s ease-in-out',
              transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
              width: `${totalSlides * 100}%`
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <Box
                key={slideIndex}
                sx={{
                    height: '236px',
                    width: '180px',
                  display: 'flex',
                  gap: 2,
                  px: 1
                }}
              >
                {earnMethods.slice(slideIndex * cardsPerSlide, (slideIndex + 1) * cardsPerSlide)
                  .map((method, cardIndex) => (
                    <Card
                      key={slideIndex * cardsPerSlide + cardIndex}
                      sx={{
                        flex: 1,
                        width: 0,
                        height: '280px',
                        borderRadius: '16px',
                        border: '0.5px solid #B6C9D9',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 2
                      }}
                    >
                      <img 
                        src={GOLDEN_BADGE} 
                        alt="badge-image" 
                        style={{ width: '48px', height: '48px', marginBottom: '8px' }}
                      />
                      <Typography sx={{ ...TYPOGRAPHY.body1, mt: '0.5rem', mb: '0.8rem' }}>
                        {method.title}
                      </Typography>
                      
                      <Chip 
                        label={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {method.value}
                            <img 
                              src={lpicon || ''} 
                              alt="lp-icon" 
                              style={{ width: '16px', height: '16px' }} 
                            />
                          </Box>
                        }
                        color="primary" 
                        sx={{ 
                          ...TYPOGRAPHY.body3,
                          fontWeight: 600,
                          mb: '1rem'
                        }} 
                      />
                      
                      <Typography sx={{ ...TYPOGRAPHY.caption, color: 'info.dark' }}>
                        {method.description}<br/>({method.maxPerDay})
                      </Typography>
                    </Card>
                  ))}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Dots Indicator */}
        {totalSlides > 1 && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 1,
              mt: 3
            }}
          >
            {Array.from({ length: totalSlides }).map((_, index) => (
              <Box
                key={index}
                onClick={() => goToSlide(index)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: currentSlide === index ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: currentSlide === index ? 'primary.dark' : 'grey.400'
                  }
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    );
  }


  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '1.5rem',
        maxWidth: '1000px',
        justifyContent: 'center'
      }}>
        {earnMethods.map((method, index) => (
          <Card 
            key={index}
            sx={{ 
              height: '236px',
              width: '180px',
              p:'1rem 0.8rem',
              borderRadius: '16px',
              border:'0.5px solid #B6C9D9',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
               <img src={GOLDEN_BADGE} alt="badge-image" />
              <Typography sx={{...TYPOGRAPHY.body1,mt:'0.5rem'}}>
                {method.title}
              </Typography>
              
              <Chip 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {method.value}
                    <img src={lpicon || ''} alt="lp-icon" style={{ width: '16px', height: '16px' }} />
                  </Box>
                }
                color="primary" 
                sx={{ 
                  ...TYPOGRAPHY.body3,
                  fontWeight: 600,
                  mt:'0.8rem',
                  mb:'1.25rem'

                }} 
              />
              
              
              <Typography sx={{...TYPOGRAPHY.caption, color: 'info.dark'}}>
                {method.description}<br/>({method.maxPerDay})
              </Typography>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default LPEarningMethods;