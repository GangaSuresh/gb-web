import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import {
  Box,
  Grid2,
  Button,
  Typography,
} from '@mui/material';

import { BADGE_STAR } from '../constants';

interface TransactionHeaderProps {
  isMobile: boolean;
  isTablet: boolean;
  coinImage: string | null;
  coinBalance: number;
  totalAdded: number;
  totalSpent: number;
  onAddCoins: () => void;
}

export default function TransactionHeader({
  isMobile,
  isTablet,
  coinImage,
  coinBalance,
  totalAdded,
  totalSpent,
  onAddCoins,
}: TransactionHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width:'100%',
        background: 'radial-gradient(ellipse at 0% 264%, #D70000 12.86%, #004BE3 100%)',
      }}
    >
      <Box
        sx={{
          width: '90%',
          maxWidth: '1140px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          p: isMobile ? '2rem 0' : '3rem 0',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ ...(isMobile ? TYPOGRAPHY.headline5 : TYPOGRAPHY.headline4) }}>
          UJ Coins History
        </Typography>

        {/* Cards Section */}
        <Box sx={{ width: '100%', mt: isMobile ? '1.875rem' : '2.5rem' }}>
          <Grid2 container spacing={2}>
            {/* Available Balance Card */}
            <Grid2 size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  background: '#0000004D',
                  border: '1px solid #FFFFFF80',
                  borderRadius: '12px',
                  height: '100%',
                  p: isMobile ? '1rem 0.75rem' : '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                  <img
                    src={coinImage || ''}
                    alt="coin"
                    style={{ width: '48px', height: '48px' }}
                  />
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography
                      sx={{
                        ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.body1),
                        color: 'white',
                        opacity: 0.7,
                      }}
                    >
                      Available Balance
                    </Typography>
                    <Typography
                      sx={{
                        ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline4),
                        fontWeight: isMobile ? 600 : 500,
                        color: 'white',
                      }}
                    >
                      {coinBalance} Coins
                    </Typography>
                  </Box>
                </Box>
                <Button
                  className="button-yellow"
                  variant="outlined"
                  size={isMobile ? 'medium' : isTablet ? 'medium' : 'large'}
                  onClick={onAddCoins}
                  sx={{ ml: 2 }}
                >
                  <Iconify icon="material-symbols:add-rounded" />
                  Add Coins
                </Button>
              </Box>
            </Grid2>

            {/* Total Added Card */}
            <Grid2 size={{ xs: 6, md: 3.5 }}>
              <Box
                sx={{
                  background: '#FFFFFF',
                  border: '1px solid  #FFFFFFE5',
                  borderRadius: '12px',
                  height: '100%',
                  p: isMobile ? '1rem 0.75rem' : '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <img
                  src={BADGE_STAR}
                  alt="coin"
                  style={{ width: '38.4px', height: '47px' }}
                />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{
                    ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.body1),
                    color: ' #1F1F1F',
                  }}>
                    Total Added
                  </Typography>
                  <Typography sx={{
                    ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline4),
                    fontWeight: isMobile ? 600 : 500,
                    color: ' #1F1F1F',
                  }}>
                    {totalAdded} Coins
                  </Typography>
                </Box>
              </Box>
            </Grid2>

            {/* Total Spent Card */}
            <Grid2 size={{ xs: 6, md: 3.5 }}>
              <Box
                sx={{
                  background: '#FFFFFF',
                  border: '1px solid  #FFFFFFE5',
                  borderRadius: '12px',
                  height: '100%',
                  p: isMobile ? '1rem 0.75rem' : '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <img
                  src={BADGE_STAR}
                  alt="coin"
                  style={{ width: '38.4px', height: '47px' }}
                />
                <Box sx={{ textAlign: 'left' }}>
                  <Typography sx={{
                    ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.body1),
                    color: ' #1F1F1F',
                  }}>
                    Total Spent
                  </Typography>
                  <Typography sx={{
                    ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline4),
                    fontWeight: isMobile ? 600 : 500,
                    color: ' #1F1F1F',
                  }}>
                    {totalSpent} Coins
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
}
