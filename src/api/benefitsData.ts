import type { TierItem } from 'src/types';

import { TIER_DATA } from 'src/constants';
import { axiosGet } from 'src/axiosWrapper';

export const fetchTierBenefits= async (): Promise<TierItem[]> => {
  const response = await axiosGet(TIER_DATA);
  
  if (response?.status === 200 && response.data?.data?.vaultData?.tier?.allTiers) {
    return response.data.data.vaultData.tier.allTiers as TierItem[];
  }
  return [];
};

