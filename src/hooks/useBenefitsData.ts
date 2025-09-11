import type { TierItem } from 'src/types';

import { useQuery } from '@tanstack/react-query';

interface BenefitsDataResponse {
  tiers: TierItem[];
  images: Record<string, string>;
}

// Mock API function - replace with real API call
const fetchBenefitsData = async (): Promise<BenefitsDataResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock data - replace with actual API call
  return {
    tiers: [
      {
        title: 'Bronze',
        range: '0-3000 Points',
        loyaltyPoints: '1 X',
        complimentaryPremiumContent: '2 Premium Articles Monthly',
        accessToExclusiveMerch: false,
        earlyAccessToEventRegistrations: false,
        invitationToExclusiveEvents: false,
        exclusiveWelcomeKit: false,
      },
      {
        title: 'Silver',
        range: '3001-7500 Points',
        loyaltyPoints: '1.5 X',
        complimentaryPremiumContent: '3 Premium Articles Monthly',
        accessToExclusiveMerch: true,
        earlyAccessToEventRegistrations: false,
        invitationToExclusiveEvents: false,
        exclusiveWelcomeKit: false,
      },
      {
        title: 'Gold',
        range: '7501-15000 Points',
        loyaltyPoints: '2 X',
        complimentaryPremiumContent: '4 Premium Articles Monthly',
        accessToExclusiveMerch: true,
        earlyAccessToEventRegistrations: true,
        invitationToExclusiveEvents: true,
        exclusiveWelcomeKit: false,
      },
      {
        title: 'Platinum',
        range: '15000+ Points',
        loyaltyPoints: '3 X',
        complimentaryPremiumContent: '5 Premium Articles Monthly',
        accessToExclusiveMerch: true,
        earlyAccessToEventRegistrations: true,
        invitationToExclusiveEvents: true,
        exclusiveWelcomeKit: true,
      },
    ],
    images: {
      benefits: '/assets/icons/benefits-icon.png',
      'bronze-badge': '/assets/icons/bronze-badge.png',
      'silver-badge': '/assets/icons/silver-badge.png',
      'gold-badge': '/assets/icons/gold-badge.png',
      'platinum-badge': '/assets/icons/platinum-badge.png',
    },
  };
};

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
    queryFn: fetchBenefitsData,
    staleTime: 10 * 60 * 1000, // 10 minutes - benefits data doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes garbage collection time
    retry: 2,
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  // Helper functions to check if data exists
  const hasTiers = data?.tiers && Array.isArray(data.tiers) && data.tiers.length > 0;
  const hasImages = data?.images && Object.keys(data.images).length > 0;

  return {
    // Data
    tiers: data?.tiers || [],
    images: data?.images || {},
    // Loading states
    isLoading,
    isFetching,
    isError,
    error,
    // Data availability checks
    hasTiers,
    hasImages,
    // Actions
    refetch,
  };
};
