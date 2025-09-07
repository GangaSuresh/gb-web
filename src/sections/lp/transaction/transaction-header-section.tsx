import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Grid2, Button, Typography, IconButton } from '@mui/material';

import { BADGE_STAR } from '../constants';

interface TransactionHeaderProps {
  isMobile: boolean;
  isTablet: boolean;
  lpImage: string | null;
  lpBalance: number;
  totalEarned: number;
  totalRedeemed: number;
  onRedeemLp: () => void;
  onBack: () => void;
}

export default function TransactionHeader({
  isMobile,
  isTablet,
  lpImage,
  lpBalance,
  totalEarned,
  totalRedeemed,
  onRedeemLp,
  onBack,
}: TransactionHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        background: 'radial-gradient(ellipse at 104.35% 264%, #008AFA 12.86%, #0032AA 100%)',
        position: 'relative',
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={onBack}
        sx={{
          position: 'absolute',
          left: isMobile ? '1rem' : '2rem',
          top: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      >
        <Iconify icon="material-symbols:arrow-back-rounded" width={24} />
      </IconButton>

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
          LP History
        </Typography>

        {/* Cards Section */}
        <Box sx={{ width: '100%', mt: isMobile ? '1.875rem' : '2.5rem' }}>
          <Grid2 container spacing={2}>
            {/* Available Balance Card */}
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box
                sx={{
                  background: ' #0000004D',
                  border: '1px solid #FFFFFF80',
                  borderRadius: '12px',
                  height: '100%',
                }}
              >
                {isMobile ? (
                  <p>mobile</p>
                ) : (
                  <Box sx={{ p: '1.5rem', display: 'flex',gap:'1rem',alignItems:'center' }}>
                    <img
                    src={lpImage || ''}
                    alt="coin"
                    style={{ width: '48px', height: '48px' }}
                  />
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.body1,
                          color: 'white',
                          opacity: 0.7,
                        }}
                      >
                        Available Balance
                      </Typography>
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.headline4,
                          fontWeight:  500,
                          color: 'white',
                        }}
                      >
                        {lpBalance} LP
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid2>

            {/* LP Earned Card */}
            <Grid2 size={{ xs: 6, md: 3.5 }}>
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  height: '100%',
                  p: isMobile ? '1rem 0.75rem' : '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon="material-symbols:shield-rounded" width={24} color="white" />
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                  <Typography
                    sx={{
                      ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.body1),
                      color: 'white',
                      opacity: 0.8,
                    }}
                  >
                    LP Earned
                  </Typography>
                  <Typography
                    sx={{
                      ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline4),
                      fontWeight: isMobile ? 600 : 500,
                      color: 'white',
                    }}
                  >
                    {totalEarned} LP
                  </Typography>
                </Box>
              </Box>
            </Grid2>

            {/* Badge Progress Card */}
            <Grid2 size={{ xs: 6, md: 3.5 }}>
              <Box
                sx={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  height: '100%',
                  p: isMobile ? '1rem 0.75rem' : '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                <Box
                  sx={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#1976d2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon="material-symbols:shield-rounded" width={24} color="white" />
                </Box>
                <Box sx={{ textAlign: 'left', flex: 1 }}>
                  <Typography
                    sx={{
                      ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.caption),
                      color: 'white',
                      opacity: 0.8,
                    }}
                  >
                    Good going, almost there!
                  </Typography>
                  <Typography
                    sx={{
                      ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.caption),
                      fontWeight: isMobile ? 500 : 400,
                      color: 'white',
                      mb: 1,
                    }}
                  >
                    Earn 123 LP and level up your badge
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Keep Earning
                  </Button>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
}
