import { useQuery } from '@tanstack/react-query';
import { fetchRouteData, RouteDataResponse } from 'src/api/routeData';

export const useRouteData = (route: 'vault' | 'coin' | 'lp' | 'coin-transation' | 'lp-transation') => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['routeData', route],
    queryFn: () => fetchRouteData(route),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  // Helper functions to check if data exists
  const hasImages = data?.images && Object.keys(data.images).length > 0;
  const hasStaticText = data?.staticText && Object.keys(data.staticText).length > 0;
  
  // Additional checks for specific data types
  const hasFaq = hasStaticText && 
    Array.isArray(data?.staticText?.faq) && 
    data.staticText.faq.length > 0;
  
  const hasTier = hasStaticText && 
    Array.isArray(data?.staticText?.tier) && 
    data.staticText.tier.length > 0;

  return {
    // Data
    data,
    // Loading states
    isLoading,
    isFetching,
    isError,
    error,
    // Data availability checks
    hasImages,
    hasStaticText,
    hasFaq,
    hasTier,
    // Actions
    refetch,
  };
};
