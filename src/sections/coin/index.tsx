import FAQ from 'src/components/faq';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { useRouteData } from 'src/hooks/useRouteData';
import {
  Box,
  Alert,
  Button,
  useTheme,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import {
  COIN_SUBTITLE,
  COIN_DESCRIPTION,
  COIN_EARN_METHODS,
  COIN_INFO_IMAGE,
  COIN_NAME,
} from './constants';
export default function CoinView() {
  const { data, isLoading, isError, error, refetch, hasImages, hasFaq } = useRouteData('coin');

  const coinData = {
    images: data?.images || {},
    staticText: data?.staticText || {},
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        textAlign:'center',
      }}
    >
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
      <img src={getCoinImage() || ''} alt={COIN_NAME} 
      style={{ width: isMobile ? '84px' : 'auto', height: isMobile ? '84px' : 'auto',marginTop:isMobile ? '2rem' : '3.5rem' }} />

      {/* FAQ Section */}
      {hasFaq && <FAQ faqs={getFaqData()} />}
    </Box>
  );
}
