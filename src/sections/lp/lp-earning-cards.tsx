import React from 'react';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Grid,
  useTheme,
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
  lpicon: string;
}

const LPEarningMethods: React.FC<LPEarningMethodsProps> = ({ earnMethods, isMobile,lpicon }) => {


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true
  };

  // Mobile view - Slider
  // if (isMobile) {
    // return (
    //   <Box sx={{ position: 'relative', px: 2, py: 3 }}>
    //     {/* Navigation Arrows */}
    //     <IconButton
    //       onClick={previous}
    //       sx={{
    //         position: 'absolute',
    //         left: 0,
    //         top: '50%',
    //         transform: 'translateY(-50%)',
    //         zIndex: 2,
    //         bgcolor: 'background.paper',
    //         boxShadow: 1,
    //         '&:hover': { bgcolor: 'grey.100' }
    //       }}
    //     >
    //       <ChevronLeft />
    //     </IconButton>
        
    //     <IconButton
    //       onClick={next}
    //       sx={{
    //         position: 'absolute',
    //         right: 0,
    //         top: '50%',
    //         transform: 'translateY(-50%)',
    //         zIndex: 2,
    //         bgcolor: 'background.paper',
    //         boxShadow: 1,
    //         '&:hover': { bgcolor: 'grey.100' }
    //       }}
    //     >
    //       <ChevronRight />
    //     </IconButton>

    //     {/* Slider */}
    //     <Slider ref={sliderRef} {...sliderSettings}>
    //       {earnMethods.map((method, index) => (
    //         <Box key={index} sx={{ px: 1, pb: 2 }}>
    //           <Card 
    //             sx={{ 
    //               height: '100%',
    //               boxShadow: 3,
    //               borderRadius: 2,
    //               background: 'linear-gradient(145deg, #f5f5f5, #e0e0e0)'
    //             }}
    //           >
    //             <CardContent sx={{ p: 3, textAlign: 'center' }}>
    //               <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
    //                 {method.title}
    //               </Typography>
                  
    //               <Chip 
    //                 label={method.value} 
    //                 color="primary" 
    //                 sx={{ 
    //                   fontSize: '1.2rem',
    //                   fontWeight: 'bold',
    //                   height: 40,
    //                   width: 60,
    //                   mb: 2
    //                 }} 
    //               />
                  
    //               <Typography variant="body2" color="text.secondary" paragraph>
    //                 {method.description}
    //               </Typography>
                  
    //               <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
    //                 {method.maxPerDay}
    //               </Typography>
    //             </CardContent>
    //           </Card>
    //         </Box>
    //       ))}
    //     </Slider>
    //   </Box>
    // );
  // }

  // Desktop view - Grid
  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {earnMethods.map((method, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                p:'1rem 1.25rem',
                borderRadius: '16px',
                border:'0.5px solid #B6C9D9'
              }}
            >
                 <img src={GOLDEN_BADGE} alt="badge-image" />
                <Typography sx={{...TYPOGRAPHY.body1}}>
                  {method.title}
                </Typography>
                
                <Chip 
                  label={method.value} 
                  color="primary" 
                  sx={{ 
                    ...TYPOGRAPHY.headline6,
                    fontWeight: 800,
                    mt:'0.8rem',
                    mb:'1.25rem'

                  }} 
                />
                
                <Typography sx={{...TYPOGRAPHY.caption, color: 'info.dark'}}>
                  {method.description}<br/>({method.maxPerDay})
                </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LPEarningMethods;