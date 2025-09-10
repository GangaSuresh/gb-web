import type { FaqDataResponse } from 'src/types';

import { useQuery } from '@tanstack/react-query';
import { fetchFaqs } from 'src/api/assetAndFaqData';

export const useFaqData = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['faqData'],
    queryFn: fetchFaqs
  });

  // Helper functions to check if data exists
  const hasFaqs = data && Array.isArray(data) && data.length > 0;


  // Helper to get all faqs by type
  const getFaqsByType = (type: string): FaqDataResponse[] => 
    data?.filter((asset: FaqDataResponse) => asset.type === type) || [];

  return {
    // Data
    data,
    // Loading states
    isLoading,
    isFetching,
    isError,
    error,
    // Data availability checks
    hasFaqs,
    // Helper functions
    getFaqsByType,
    // Actions
    refetch,
  };
};
