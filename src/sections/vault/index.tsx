import FAQ from 'src/components/faq';
import { varAlpha } from 'src/theme/styles';
import { useNavigate } from 'react-router-dom';
import { useRouteData } from 'src/hooks/useRouteData';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Box, Alert, Button, useTheme, Typography, useMediaQuery } from '@mui/material';

import LPSection from './lp-section';
import CoinSection from './coin-section';

export default function VaultView() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data, isLoading, isError, error, refetch, hasImages, hasStaticText, hasFaq, hasTier } =
    useRouteData('vault');

  // Data extraction with fallbacks to prevent crashes
  const vaultData = {
    images: data?.images || {},
    staticText: data?.staticText || {},
  };

  // Safe image extraction - return null if no image
  const getCoinImage = () => {
    try {
      return vaultData.images['uj-coin'] || null;
    } catch {
      return null;
    }
  };

  // Safe tier data extraction
  const getTierData = () => {
    try {
      return hasTier ? vaultData.staticText.tier : [];
    } catch {
      return [];
    }
  };

  // Safe FAQ data extraction
  const getFaqData = () => {
    try {
      return hasFaq ? vaultData.staticText.faq : [];
    } catch {
      return [];
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flex="1 1 auto"
        gap={2}
        minHeight="60vh"
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Loading vault data...
        </Typography>
        <LinearProgress
          sx={{
            width: 1,
            maxWidth: 320,
            bgcolor: varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
            [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
          }}
        />
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
        minHeight="60vh"
        gap={2}
      >
        <Alert severity="error" sx={{ mb: 2, maxWidth: 600 }}>
          {error?.message || 'Failed to load vault data. Please try again.'}
        </Alert>
        <Button variant="contained" onClick={() => refetch()} sx={{ minWidth: 120 }}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data || !hasImages || !hasStaticText) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        gap={2}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {!data ? 'No vault data available' : 'Incomplete vault data'}
        </Typography>
        <Button variant="contained" onClick={() => refetch()} sx={{ minWidth: 120 }}>
          Load Data
        </Button>
      </Box>
    );
  }

  // Handler functions for coin section
  const handleTopUp = () => {
    navigate('/coin/add');
  };

  const handleKnowMore = () => {
    navigate('/coin/info');
  };

  const handleUJViewHistory = () => {
    navigate('/coin/history');
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
        backgroundColor:theme.palette?.backgroundColor?.main || theme.palette?.background?.default || '#f5f5f5',
      }}
    >
      <Typography
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontFamily: 'Sinerva, serif',
          background:
            'radial-gradient(78.38% 362.85% at 104.35% 264%, #D70000 12.86%, #004BE3 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mt: isMobile ? '0.5rem' : '2.5rem',
          fontWeight: 400,
          textAlign: 'center',
        }}
      >
        GBN Vault
      </Typography>

      {/* Coin Section */}
        <CoinSection
          coinImage={getCoinImage()}
          coinCount={0}
          coinName="UJ Coins"
          onTopUp={handleTopUp}
          onKnowMore={handleKnowMore}
          onViewHistory={handleUJViewHistory}
          isMobile={isMobile}
        />

        {/* LP Section - Only render if tier data exists */}
        {hasTier && (
          <LPSection
            images={vaultData.images}
            lpcurrPoints={500}
            lpcurrBadge="Bronze"
            onViewHistory={handleLPViewHistory}
            tier={getTierData()}
            isMobile={isMobile}
          />
        )}
        {/* FAQ Section - Only render if FAQ data exists */}
        {hasFaq && <FAQ faqs={getFaqData()} />}

    </Box>
  );
}
