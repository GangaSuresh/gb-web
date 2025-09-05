import { useRouteData } from 'src/hooks/useRouteData';
import {
  Box,
  Alert,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import TransactionHeader from './transaction-header-section';

interface TransactionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Transaction({ isMobile, isTablet }: TransactionProps) {
  const { data, isLoading, isError, error, refetch } = useRouteData('coin');
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

  const getCoinImage = () => {
    try {
      return data.images['uj-coin'] || null;
    } catch {
      return null;
    }
  };
  
  const COIN_BALANCE = 7;
  const TOTAL_ADDED = 30;
  const TOTAL_SPENT = 23;

  const handleAddCoins = () => {
    // TODO: Implement add coins functionality
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'backgroundColor.light' }}>
      <TransactionHeader
        isMobile={isMobile}
        isTablet={isTablet}
        coinImage={getCoinImage()}
        coinBalance={COIN_BALANCE}
        totalAdded={TOTAL_ADDED}
        totalSpent={TOTAL_SPENT}
        onAddCoins={handleAddCoins}
      />
    </Box>
    
  );
}
