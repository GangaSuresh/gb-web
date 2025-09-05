import FAQ from 'src/components/faq';
import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { useRouteData } from 'src/hooks/useRouteData';
import {
  Box,
  Alert,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import {
  COIN_NAME,
  GOLDEN_BADGE,
  COIN_SUBTITLE,
  COIN_INFO_IMAGE,
  COIN_DESCRIPTION,
  COIN_EARN_METHODS,
  COIN_INFO_IMAGE_MOBILE,
} from '../constants';

interface InfoProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Info({ isMobile, isTablet }: InfoProps) {
  const { data, isLoading, isError, error, refetch, hasFaq } = useRouteData('coin');
  const navigate = useNavigate();
  const coinData = {
    images: data?.images || {},
    staticText: data?.staticText || {},
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 72px)">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading coin data...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 72px)"
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error?.message || 'Failed to load coin data. Please try again.'}
        </Alert>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 72px)"
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          No coin data available
        </Typography>
        <Button variant="contained" onClick={() => refetch()}>
          Load Data
        </Button>
      </Box>
    );
  }

  const getFaqData = () => {
    try {
      return hasFaq && Array.isArray(coinData.staticText.faq) ? coinData.staticText.faq : [];
    } catch {
      return [];
    }
  };

  const getCoinImage = () => {
    try {
      return coinData.images['uj-coin'] || null;
    } catch {
      return null;
    }
  };

  return (
    <Box
      sx={{
        background: 'radial-gradient(ellipse at 0% 264%, #D70000 12.86%, #004BE3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
      }}
    >
      <Box sx={{ textAlign: 'center',width: '90%',maxWidth: '1140px' }}>
        {/* Header Section */}
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.75rem' },
            fontFamily: 'Lora',
            color: 'info.light',
            mt: isMobile ? '1rem' : '2.5rem',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {COIN_NAME}
        </Typography>
        <Typography
          sx={{
            ...(isMobile ? TYPOGRAPHY.body2 : TYPOGRAPHY.headline6),
          }}
        >
          {COIN_SUBTITLE}
        </Typography>
        <img
          src={getCoinImage() || ''}
          alt={COIN_NAME}
          style={{
            width: isMobile ? '84px' : 'auto',
            height: isMobile ? '84px' : 'auto',
            marginTop: isMobile ? '2rem' : '3.5rem',
          }}
        />
        {/* Main Section */}
        <Typography
          sx={{
            ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline2),
            fontWeight: 600,
            mt: isMobile ? '2rem' : '3.5rem',
          }}
        >
          What are UJ Coins & their Benefits?
        </Typography>
        {isMobile ? (
          <img src={COIN_INFO_IMAGE_MOBILE} alt="coin-info-image" style={{ marginTop: '1rem' }} />
        ) : (
          <>
            <Typography sx={{ ...TYPOGRAPHY.headline6 }}>{COIN_DESCRIPTION}</Typography>
            <img src={COIN_INFO_IMAGE} alt="coin-info-image" style={{ marginTop: '3rem' }} />
          </>
        )}
        <Typography
          sx={{
            ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline4),
            mt: isMobile ? '2.5rem' : '5rem',
          }}
        >
          How to Get UJ Coins?
        </Typography>
        <Typography sx={{ ...(isMobile ? TYPOGRAPHY.body1 : TYPOGRAPHY.headline6) }}>
          You can collect UJ Coins in two simple ways
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          flexDirection: isMobile ? 'column' : 'row',
          p: '1rem',
        }}
      >
        {COIN_EARN_METHODS.map((method, index) => (
          <Box
            key={index}
            sx={{
              border: '1px solid',
              borderColor: 'info.lighter',
              borderRadius: '20px',
              p: '1rem',
            }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'flex-start' }}
            >
              <img src={GOLDEN_BADGE} alt="badge-image" />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Typography sx={{ ...(isMobile ? TYPOGRAPHY.body1 : TYPOGRAPHY.headline6) }}>
                  {method.title}
                </Typography>
                <Typography sx={{...TYPOGRAPHY.body2  }}>
                  {method.description}
                </Typography>
                <Button className="button-basic-yellow" onClick={() => navigate(method.buttonLink)}>{method.buttonText}</Button>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* FAQ Section */}
      {hasFaq && <FAQ faqs={getFaqData()} />}
    </Box>
  );
}
