import { useQuery } from '@tanstack/react-query';
import { fetchTierBenefits } from 'src/api/benefitsData';
import { processTierData } from 'src/utils/tierImageMapping';


export const useBenefitsData = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['benefitsData'],
    queryFn: fetchTierBenefits,
  });

  // Helper functions to check if data exists
  const hasTiers = data && Array.isArray(data) && data.length > 0;

  return {
    // Data
    tiers: processTierData(data || []), // todo remove
    // Loading states
    isLoading,
    isFetching,
    isError,
    error,
    // Data availability checks
    hasTiers,
    // Actions
    refetch,
  };
};
