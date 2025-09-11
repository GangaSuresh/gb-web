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
        tierId: 1,
        name: 'tier_1',
        label: 'Bronze',
        startRange: 0,
        endRange: 999,
        multiplier: 1,
        monthlyArticleLimit: 2,
        additionalPerks: [
          {
            label: 'Loyalty Points Multiplier',
            value: true
          },
          {
            label: 'Access to exclusive merch',
            value: false
          },
          {
            label: 'Early access to event registrations',
            value: false
          },
          {
            label: 'Invitations to exclusive events',
            value: false
          },
          {
            label: 'Chance to meet your favourite anchor',
            value: false
          },
          {
            label: 'Exclusive welcome kit',
            value: false
          }
        ],
        tierImageUrl: '/assets/icons/bronze-badge.png'
      },
      {
        tierId: 2,
        name: 'tier_2',
        label: 'Silver',
        startRange: 1000,
        endRange: 2499,
        multiplier: 1.5,
        monthlyArticleLimit: 3,
        additionalPerks: [
          {
            label: 'Loyalty Points Multiplier',
            value: true
          },
          {
            label: 'Access to exclusive merch',
            value: true
          },
          {
            label: 'Early access to event registrations',
            value: false
          },
          {
            label: 'Invitations to exclusive events',
            value: false
          },
          {
            label: 'Chance to meet your favourite anchor',
            value: false
          },
          {
            label: 'Exclusive welcome kit',
            value: false
          }
        ],
        tierImageUrl: '/assets/icons/silver-badge.png'
      },
      {
        tierId: 3,
        name: 'tier_3',
        label: 'Gold',
        startRange: 2500,
        endRange: 4999,
        multiplier: 2,
        monthlyArticleLimit: 4,
        additionalPerks: [
          {
            label: 'Loyalty Points Multiplier',
            value: true
          },
          {
            label: 'Access to exclusive merch',
            value: true
          },
          {
            label: 'Early access to event registrations',
            value: true
          },
          {
            label: 'Invitations to exclusive events',
            value: true
          },
          {
            label: 'Chance to meet your favourite anchor',
            value: false
          },
          {
            label: 'Exclusive welcome kit',
            value: false
          }
        ],
        tierImageUrl: '/assets/icons/gold-badge.png'
      },
      {
        tierId: 4,
        name: 'tier_4',
        label: 'Platinum',
        startRange: 5000,
        endRange: 999999,
        multiplier: 3,
        monthlyArticleLimit: 5,
        additionalPerks: [
          {
            label: 'Loyalty Points Multiplier',
            value: true
          },
          {
            label: 'Access to exclusive merch',
            value: true
          },
          {
            label: 'Early access to event registrations',
            value: true
          },
          {
            label: 'Invitations to exclusive events',
            value: true
          },
          {
            label: 'Chance to meet your favourite anchor',
            value: true
          },
          {
            label: 'Exclusive welcome kit',
            value: true
          }
        ],
        tierImageUrl: '/assets/icons/platinum-badge.png'
      }
    ],
    images: {
      benefits: '/assets/icons/benefits-icon.png',
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
