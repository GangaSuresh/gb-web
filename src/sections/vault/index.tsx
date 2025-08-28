import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { useRouteData } from 'src/hooks/useRouteData';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
  Chip,
  useTheme,
} from '@mui/material';

import CoinSection from './coin-section';
import LPSection from './lp-section';
import FAQ from './faq-section';

export default function VaultView() {
  const theme = useTheme();
  const { data, isLoading, isError, error, refetch, hasImages, hasStaticText } =
    useRouteData('vault');

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 72px)">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading vault data...</Typography>
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
          {error?.message || 'Failed to load vault data. Please try again.'}
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
          No vault data available
        </Typography>
        <Button variant="contained" onClick={() => refetch()}>
          Load Data
        </Button>
      </Box>
    );
  }
  const hasFaq = hasStaticText && data.staticText.faq.length > 0;
  const hasTier = hasStaticText && data.staticText.tier.length > 0;

  // Handler functions for coin section
  const handleTopUp = () => {
    // Handle top up coins logic
    console.log('Top up coins clicked');
  };

  const handleKnowMore = () => {
    // Handle know more logic
    console.log('Know more clicked');
  };

  const handleViewHistory = () => {
    // Handle view history logic
    console.log('View history clicked');
  };

  // Handler function for LP section
  const handleLPViewHistory = () => {
    // Handle LP view history logic
    console.log('LP view history clicked');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        backgroundColor: theme.palette.backgroundColor.main,
      }}
    >
      <Typography
        sx={{
          fontSize: '3rem',
          fontFamily: 'Sinerva',
          background: 'radial-gradient(78.38% 362.85% at 104.35% 264%, #D70000 12.86%, #004BE3 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mt: '2.5rem',
          fontWeight: 400,
        }}
      >
        GBN Vault
      </Typography>

      {/* Coin Section */}
      <CoinSection
        coinImage={data.images['uj-coin']}
        coinCount={0}
        coinName="UJ Coins"
        onTopUp={handleTopUp}
        onKnowMore={handleKnowMore}
        onViewHistory={handleViewHistory}
      />

      {/* LP Section */}
      <LPSection
        images={data.images}
        lpcurrPoints={500}
        lpcurrBadge="Bronze"
        onViewHistory={handleLPViewHistory}
        tier={data.staticText.tier}
      />

      <FAQ faqs={data.staticText.faq} />
    </Box>
  );
}
