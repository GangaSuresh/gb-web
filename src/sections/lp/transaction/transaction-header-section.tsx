import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Grid2, Button, Typography, IconButton } from '@mui/material';

import { SHIELD } from '../constants';

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
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomLeftRadius: (isMobile||isTablet)?'12px':'0px',
        borderBottomRightRadius: (isMobile||isTablet)?'12px':'0px',
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
          p: isMobile ? '2rem' : '3rem',
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
            <Grid2 size={{ xs: 12, sm: 12, md: 3 }}>
              <Box
                sx={{
                  background: ' #0000004D',
                  border: '1px solid #FFFFFF80',
                  borderRadius: '12px',
                  height: '100%',
                }}
              >
                {isMobile || isTablet ? (
                  <Box sx={{ p: '1rem', display: 'flex', alignItems: 'center', height: '100%' }}>
                    {/* Available Balance Section */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        flex: 1,
                        pr: '0.75rem',
                      }}
                    >
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.caption,
                          color: 'white',
                          opacity: 0.7,
                        }}
                      >
                        Available Balance
                      </Typography>
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.headline5,
                          fontWeight: 600,
                          color: 'white',
                        }}
                      >
                        {lpBalance} LP
                      </Typography>
                    </Box>

                    {/* Vertical Divider */}
                    <Box
                      sx={{
                        width: '1px',
                        height: '100%',
                        mx: '0.75rem',
                        backgroundColor: 'white',
                        opacity: 0.2,
                      }}
                    />

                    {/* Lifetime Earned Section */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        flex: 1,
                        pl: '0.75rem',
                      }}
                    >
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.caption,
                          color: 'white',
                          opacity: 0.7,
                        }}
                      >
                        Lifetime Earned
                      </Typography>
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.headline5,
                          fontWeight: 600,
                          color: 'white',
                        }}
                      >
                        {totalEarned} LP
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ p: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <img src={lpImage || ''} alt="coin" style={{ width: '48px', height: '48px' }} />
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
                          fontWeight: 500,
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
            <Grid2 size={{ md: 9 }}>
              {!(isMobile || isTablet) && (
                <Box
                  sx={{
                    background: ' #0000004D',
                    border: '1px solid #FFFFFF80',
                    borderRadius: '12px',
                    height: '100%',
                  }}
                >
                  <Box
                    sx={{
                      pl: '2rem',
                      pr: '5rem',
                      py: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    {/* LP Earned Display */}
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.body1,
                          color: 'white',
                          opacity: 0.7,
                        }}
                      >
                        LP Earned
                      </Typography>
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.headline4,
                          fontWeight: 600,
                          color: 'white',
                        }}
                      >
                        {totalEarned} LP
                      </Typography>
                    </Box>

                    {/* Separator */}
                    <Box
                      sx={{
                        width: '1px',
                        height: '100%',
                        mx: '1.5rem',
                        backgroundColor: 'white',
                        opacity: 0.2,
                      }}
                    />

                    {/* Badge Icon */}
                    <Box
                      sx={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: 'primary.light',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: '1rem',
                      }}
                    >
                      <img src={SHIELD} alt="badge" style={{ height: '36px', width: '26px' }} />
                    </Box>

                    {/* Progress Message */}
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.body1,
                          fontWeight: 600,
                          color: ' #F5FBFF',
                        }}
                      >
                        Good going, almost there!
                        <br />
                        Earn 123 LP and level up your badge
                      </Typography>
                    </Box>

                    {/* Keep Earning Button */}
                    <Button
                      className="button-primary-outlined"
                      variant="outlined"
                      onClick={onRedeemLp}
                      sx={{ background: 'none' }}
                    >
                      Keep Earning
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid2>
          </Grid2>
        </Box>
      </Box>

      {(isMobile || isTablet) && (
        <Box
          sx={{
            borderTop: 'solid 1px #FFFFFF80',
            width: '100%',
            background: ' #0000004D',
            display: 'flex',
            p: '0.6875rem',
            borderBottomLeftRadius:'12px',
            borderBottomRightRadius:'12px',
          }}
        >
          <Box
            sx={{
              width: '28px',
              height: '28px',
              backgroundColor: 'primary.light',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: '1rem',
            }}
          >
            <img src={SHIELD} alt="badge" style={{ height: '21px', width: '16px' }} />
          </Box>

          {/* Progress Message */}
          <Box sx={{ flex: 1, textAlign: 'left' }}>
            <Typography
              sx={{
                ...TYPOGRAPHY.caption,
                fontWeight: 600,
                color: ' white',
              }}
            >
              Almost there! Earn 123 LP and
              <br /> level up your badge
            </Typography>
          </Box>

          {/* Keep Earning Button */}
          <Button
            className="button-primary-outlined"
            variant="outlined"
            size="small"
            onClick={onRedeemLp}
            sx={{ background: 'none' }}
          >
            Keep Earning
          </Button>
        </Box>
      )}
    </Box>
  );
}
