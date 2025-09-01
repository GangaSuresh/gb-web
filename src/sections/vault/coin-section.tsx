import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Button, Typography } from '@mui/material';

interface CoinSectionProps {
  coinImage: string | null;
  coinCount: number;
  coinName: string;
  onTopUp: () => void;
  onKnowMore: () => void;
  onViewHistory: () => void;
  isMobile: boolean;
}

export default function CoinSection({
  coinImage,
  coinCount,
  coinName,
  onTopUp,
  onKnowMore,
  onViewHistory,
  isMobile
}: CoinSectionProps) {


  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      sx={{
        mt: { xs: '1.5rem', sm: '2rem' },
        p: {
          xs: '1rem',
          sm: '1.5rem 2rem',
          md: '1.5rem 4.8rem'
        },
        justifyContent: 'space-between',
        borderRadius: '16px',
        background: 'radial-gradient(ellipse at 0% 264%, #D70000 12.86%, #004BE3 100%)',
        gap: { xs: '1rem', sm: '0' }
      }}
    >
      <Box 
        display="flex" 
        gap="1rem"
        alignItems='flex-start'
        justifyContent='flex-start'
      >
        {coinImage && (
          <img 
            src={coinImage} 
            alt={coinName}
            style={{
              width: isMobile ? '48px' : 'auto',
              height: isMobile ? '48px' : 'auto'
            }}
          />
        )}
        <Box >
          <Typography 
            sx={{ 
              ...TYPOGRAPHY.headline6, 
              color: 'info.main',
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            <b>{coinCount}</b> {coinName}
          </Typography>
          <Box
            sx={{
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '0rem',
            }}
            onClick={onViewHistory}
          >
            <Typography sx={{ ...TYPOGRAPHY.body2 }}>View Points History</Typography>
            <Iconify icon="icon-park-outline:right" />
          </Box>
        </Box>
      </Box>
      <Box 
        display="flex" 
        gap="1rem"
        flexDirection="row"
      >
        <Button 
          className="button-yellow" 
          variant="outlined" 
          size={isMobile ? 'medium' : 'large'} 
          onClick={onTopUp}
          sx={{ flex: isMobile ? 1 : 'auto' }}
        >
          <Iconify icon="material-symbols:add-rounded" />
          Add Coins
        </Button>
        <Button
          className="button-primary-outlined"
          variant="outlined"
          size={isMobile ? 'medium' : 'large'}
          onClick={onKnowMore}
          sx={{backgroundColor:'transparent', flex: isMobile ? 1 : 'auto' }}
        >
          Know More
          <Iconify icon="icon-park-outline:right" />
        </Button>
      </Box>
    </Box>
  );
}
