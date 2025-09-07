import { useRouteData } from 'src/hooks/useRouteData';
import {
  Box,
  Alert,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

import TransactionHeader from './transaction-header-section';
import TransactionGrid, { type TransactionData } from './transaction-grid';

interface TransactionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Transaction({ isMobile, isTablet }: TransactionProps) {
  const { data, isLoading, isError, error, refetch } = useRouteData('coin-transation');
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

  // Mock transaction data
  const mockTransactions: TransactionData[] = [
    {
      id: '1',
      title: 'Article Unlocked',
      description: 'Article name will display here with a navigation link to read unlocked article',
      image: '/assets/icons/flag-icon.png',
      dateTime: '12 Aug 2025, 11:23 am',
      type: 'debit',
      amount: 10,
    },
    {
      id: '2',
      title: 'Opinio Games',
      description: 'Opinion question will display here with a navigation link to view opinion',
      image: '/assets/icons/flag-icon.png',
      dateTime: '12 Aug 2025, 11:23 am',
      type: 'debit',
      amount: 10,
    },
    {
      id: '3',
      title: 'Membership',
      description: 'Purchased Basic plan',
      image: '/assets/icons/star-badge.png',
      dateTime: '12 Aug 2025, 11:23 am',
      type: 'debit',
      amount: 10,
    },
    {
      id: '4',
      title: 'Coin Purchased',
      description: 'Transaction id',
      image: '/assets/icons/shopping-cart.png',
      dateTime: '12 Aug 2025, 11:23 am',
      type: 'credit',
      amount: 10,
    },
    {
      id: '5',
      title: 'Article Unlocked',
      description: 'Breaking news article about global economics',
      image: '/assets/icons/flag-icon.png',
      dateTime: '11 Aug 2025, 3:45 pm',
      type: 'debit',
      amount: 15,
    },
    {
      id: '6',
      title: 'Premium Content',
      description: 'Access to exclusive research reports',
      image: '/assets/icons/star-badge.png',
      dateTime: '11 Aug 2025, 2:30 pm',
      type: 'debit',
      amount: 25,
    },
    {
      id: '7',
      title: 'Coin Purchased',
      description: 'Transaction id: TXN789456',
      image: '/assets/icons/shopping-cart.png',
      dateTime: '10 Aug 2025, 9:15 am',
      type: 'credit',
      amount: 50,
    },
    {
      id: '8',
      title: 'Opinio Games',
      description: 'Weekly opinion poll participation',
      image: '/assets/icons/flag-icon.png',
      dateTime: '10 Aug 2025, 8:00 am',
      type: 'debit',
      amount: 5,
    },
    {
      id: '9',
      title: 'Membership',
      description: 'Upgraded to Premium plan',
      image: '/assets/icons/star-badge.png',
      dateTime: '09 Aug 2025, 4:20 pm',
      type: 'debit',
      amount: 30,
    },
    {
      id: '10',
      title: 'Coin Purchased',
      description: 'Transaction id: TXN123789',
      image: '/assets/icons/shopping-cart.png',
      dateTime: '09 Aug 2025, 1:10 pm',
      type: 'credit',
      amount: 100,
    },
    {
      id: '11',
      title: 'Article Unlocked',
      description: 'In-depth analysis of market trends',
      image: '/assets/icons/flag-icon.png',
      dateTime: '08 Aug 2025, 6:30 pm',
      type: 'debit',
      amount: 12,
    },
    {
      id: '12',
      title: 'Opinio Games',
      description: 'Daily opinion question',
      image: '/assets/icons/flag-icon.png',
      dateTime: '08 Aug 2025, 5:45 pm',
      type: 'debit',
      amount: 8,
    },
  ];

  const handleAddCoins = () => {
    // TODO: Implement add coins functionality
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:'center', backgroundColor: 'backgroundColor.light' }}>
      <TransactionHeader
        isMobile={isMobile}
        isTablet={isTablet}
        coinImage={getCoinImage()}
        coinBalance={COIN_BALANCE}
        totalAdded={TOTAL_ADDED}
        totalSpent={TOTAL_SPENT}
        onAddCoins={handleAddCoins}
      />
      <TransactionGrid
        transactions={mockTransactions}
        isMobile={isMobile}
        isTablet={isTablet}
      />
    </Box>
  );
}
