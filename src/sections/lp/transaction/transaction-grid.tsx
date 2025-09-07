import { useState } from 'react';
import { Iconify } from 'src/components/iconify';
import {
  Box,
  Card,
  Chip,
  Stack,
  Avatar,
  Divider,
  Pagination,
  Typography,
  CardContent,
} from '@mui/material';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';

export interface TransactionData {
  id: string;
  title: string;
  description: string;
  image: string;
  dateTime: string;
  type: 'credit' | 'debit';
  amount: number;
}

interface TransactionGridProps {
  transactions: TransactionData[];
  isMobile: boolean;
  isTablet: boolean;
}

type FilterType = 'all' | 'credit' | 'debit';

export default function TransactionGrid({
  transactions,
  isMobile,
  isTablet,
}: TransactionGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter transactions based on active filter
  const filteredTransactions = transactions.filter((transaction) => {
    if (activeFilter === 'all') return true;
    return transaction.type === activeFilter;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Count transactions by type
  const allCount = transactions.length;
  const earnedCount = transactions.filter((t) => t.type === 'credit').length;
  const redeemedCount = transactions.filter((t) => t.type === 'debit').length;

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const getTransactionIcon = (transaction: TransactionData) => {
    // You can customize this based on transaction type or title
    if (transaction.title.toLowerCase().includes('article')) {
      return 'material-symbols:article-rounded'; // Article icon for article reading
    }
    if (transaction.title.toLowerCase().includes('poll') || transaction.title.toLowerCase().includes('survey')) {
      return 'material-symbols:poll-rounded';
    }
    if (transaction.title.toLowerCase().includes('redeem')) {
      return 'material-symbols:redeem-rounded';
    }
    if (transaction.title.toLowerCase().includes('streak')) {
      return 'material-symbols:local-fire-department-rounded';
    }
    return 'material-symbols:star-rounded';
  };

  const formatAmount = (amount: number, type: 'credit' | 'debit') => {
    const sign = type === 'credit' ? '+' : '-';
    return `${sign}${Math.abs(amount)} LP`;
  };

  return (
    <Box
      sx={{
        width: isMobile ? '100%' : '90%',
        maxWidth: '1140px',
        mt: '1.5rem',
        p: isMobile ? 0 : 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      {/* Filter Chips */}
      <Box
        sx={{
          mb: isMobile ? '1.2rem' : '1rem',
          display: 'flex',
          gap: 1,
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          pl: isMobile ? 2 : 0,
        }}
      >
        <Chip
          label={`All Transactions (${allCount})`}
          onClick={() => handleFilterChange('all')}
          variant={activeFilter === 'all' ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: activeFilter === 'all' ? 'primary.main' : 'transparent',
            color: activeFilter === 'all' ? 'white' : 'text.primary',
            borderColor: activeFilter === 'all' ? 'primary.main' : ' #C8D4E5',
            '&:hover': {
              backgroundColor: activeFilter === 'all' ? 'primary.dark' : 'primary.light',
            },
          }}
        />
        <Chip
          label={`Earned (${earnedCount})`}
          onClick={() => handleFilterChange('credit')}
          variant={activeFilter === 'credit' ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: activeFilter === 'credit' ? 'primary.main' : 'transparent',
            color: activeFilter === 'credit' ? 'white' : 'text.primary',
            borderColor: activeFilter === 'credit' ? 'primary.main' : ' #C8D4E5',
            '&:hover': {
              backgroundColor: activeFilter === 'credit' ? 'primary.dark' : 'primary.light',
            },
          }}
        />
        <Chip
          label={`Redeemed (${redeemedCount})`}
          onClick={() => handleFilterChange('debit')}
          variant={activeFilter === 'debit' ? 'filled' : 'outlined'}
          sx={{
            backgroundColor: activeFilter === 'debit' ? 'primary.main' : 'transparent',
            color: activeFilter === 'debit' ? 'white' : 'text.primary',
            borderColor: activeFilter === 'debit' ? 'primary.main' : ' #C8D4E5',
            '&:hover': {
              backgroundColor: activeFilter === 'debit' ? 'primary.dark' : 'primary.light',
            },
          }}
        />
      </Box>

      {/* Transaction List */}
      <Card
        sx={{
          mb: 3,
          width: '100%',
          minHeight: isMobile ? '400px' : '475px',
          borderRadius: isMobile ? '0' : '8px',
         
        }}
      >
        <Box sx={{ p: isMobile ? '1.2rem 0.8rem' : '2rem',}}>
        {currentTransactions.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
              width: '100%',
              minHeight: isMobile ? '400px' : '475px',
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ ...(isMobile ? TYPOGRAPHY.headline5 : TYPOGRAPHY.headline5) }}
            >
              No transactions found
            </Typography>
          </Box>
        ) : (
          <Stack divider={<Divider color="#E0E6F1" />}>
            {currentTransactions.map((transaction, index) => (
              <Box
                key={transaction.id}
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {/* Transaction Icon */}
                <Avatar
                  sx={{
                    width: isMobile ? 36 : 50,
                    height: isMobile ? 36 : 50,
                    backgroundColor: 'primary.main',
                    color: 'white',
                  }}
                >
                  <Iconify icon={getTransactionIcon(transaction)} width={isMobile ? 24 : 32} />
                </Avatar>

                {/* Transaction Details */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      ...(isMobile ? TYPOGRAPHY.caption : TYPOGRAPHY.body1),
                      fontWeight: isMobile ? 500 : 700,
                    }}
                  >
                    {transaction.title}
                  </Typography>
                  <Typography
                    sx={{
                      ...(isMobile ? TYPOGRAPHY.body2 : TYPOGRAPHY.body1),
                      fontWeight: isMobile ? 600 : 400,
                      color: 'primary.lighter',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {transaction.description}
                  </Typography>
                </Box>

                {/* Amount and Date */}
                <Box sx={{ textAlign: 'right', minWidth: 'fit-content' }}>
                  {isMobile ? (
                    <>
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.caption,
                          fontWeight: 500,
                          color: 'text.secondary',
                        }}
                      >
                        {transaction.dateTime}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          ...TYPOGRAPHY.body2,
                          fontWeight: 800,
                          color: transaction.type === 'credit' ? 'success.main' : 'text.primary',
                          mb: 0.5,
                        }}
                      >
                        {formatAmount(transaction.amount, transaction.type)}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="body1"
                        sx={{
                          ...TYPOGRAPHY.headline6,
                          fontWeight: 700,
                          color: transaction.type === 'credit' ? 'success.main' : 'text.primary',
                          mb: 0.5,
                        }}
                      >
                        {formatAmount(transaction.amount, transaction.type)}
                      </Typography>
                      <Typography
                        sx={{
                          ...TYPOGRAPHY.body2,
                          color: 'text.secondary',
                        }}
                      >
                        {transaction.dateTime}
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        )}
        </Box>
          {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex',p:'1rem', justifyContent: 'center',width:'100%',borderTop:'1px solid #E0E6F1' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? 'small' : 'medium'}
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#666666',
                '&.Mui-selected': {
                  backgroundColor: '#E4EDFD',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: '#E4EDFD',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              },
              '& .MuiPaginationItem-icon': {
                color: '#222222',
              },
            }}
          />
        </Box>
      )}
      </Card>

    
    </Box>
  );
}
