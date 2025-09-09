import type { AssetDataResponse } from 'src/api/assetData';

import { useQuery } from '@tanstack/react-query';
import { fetchAssetsConfig } from 'src/api/assetData';

export const useAssetsData = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['assetsData'],
    queryFn: fetchAssetsConfig,
    staleTime: 10 * 60 * 1000, // 10 minutes - assets config doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes garbage collection time (replaces cacheTime)
    retry: 2,
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });

  // Helper functions to check if data exists
  const hasAssets = data && Array.isArray(data) && data.length > 0;
  
  // Helper to get asset by type
  const getAssetByName = (name: string): AssetDataResponse | undefined => 
    data?.find((asset: AssetDataResponse) => asset.name === name);

  // Helper to get all assets by type
  const getAssetsByType = (type: string): AssetDataResponse[] => 
    data?.filter((asset: AssetDataResponse) => asset.type === type) || [];

  return {
    // Data
    data,
    // Loading states
    isLoading,
    isFetching,
    isError,
    error,
    // Data availability checks
    hasAssets,
    // Helper functions
    getAssetByName,
    getAssetsByType,
    // Actions
    refetch,
  };
};
