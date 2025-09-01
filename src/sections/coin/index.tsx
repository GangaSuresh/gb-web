import FAQ from 'src/components/faq';
import { TYPOGRAPHY } from "src/theme/styles/fonts";
import { useRouteData } from "src/hooks/useRouteData";
import { Box, Typography, Grid, Card, CardContent, CircularProgress, Alert, Button, useMediaQuery, useTheme } from "@mui/material";

export default function CoinView() {
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    hasImages, 
    hasFaq,
  } = useRouteData('coin');

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
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="calc(100vh - 72px)">
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
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="calc(100vh - 72px)">
        <Typography variant="h6" sx={{ mb: 2 }}>No coin data available</Typography>
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

  return (
    <Box
      sx={{
        background: 'radial-gradient(ellipse at 0% 264%, #D70000 12.86%, #004BE3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* Header Section */}
      <Typography
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          fontFamily: 'Sinerva, serif',
          background:
            'yellow',
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
      

      {/* FAQ Section */}
      {hasFaq && <FAQ faqs={getFaqData()} />}

    </Box>
  );
}
