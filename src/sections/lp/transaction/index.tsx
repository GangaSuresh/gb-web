import { useRouteData } from 'src/hooks/useRouteData';
import {
  Box,
  Alert,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import StreaksSection from './streaks-section';
import LpActivitiesSection from './lp-activities-section';
import TransactionHeader from './transaction-header-section';

interface TransactionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Transaction({ isMobile, isTablet }: TransactionProps) {
  const { data, isLoading, isError, error, refetch } = useRouteData('lp-transation');
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 72px)">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading LP data...</Typography>
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
          {error?.message || 'Failed to load LP data. Please try again.'}
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
          No LP data available
        </Typography>
        <Button variant="contained" onClick={() => refetch()}>
          Load Data
        </Button>
      </Box>
    );
  }

  const getLpImage = () => {
    try {
      return data.images.lp || null;
    } catch {
      return null;
    }
  };
  
  const LP_BALANCE = 234;
  const TOTAL_EARNED = 2345;
  const TOTAL_REDEEMED = 123;

  const handleRedeemLp = () => {
    // TODO: Implement redeem LP functionality
  };

  const handleBack = () => {
    // TODO: Implement back navigation
    window.history.back();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:'center', backgroundColor: 'backgroundColor.light' }}>
      <TransactionHeader
        isMobile={isMobile}
        isTablet={isTablet}
        lpImage={getLpImage()}
        lpBalance={LP_BALANCE}
        totalEarned={TOTAL_EARNED}
        totalRedeemed={TOTAL_REDEEMED}
        onRedeemLp={handleRedeemLp}
        onBack={handleBack}
      />
      <LpActivitiesSection
        isMobile={isMobile}
        isTablet={isTablet}
      />
                <StreaksSection isMobile={isMobile} isTablet={isTablet} />
    </Box>
  );
}
