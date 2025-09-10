import type { FaqDataResponse, AssetDataResponse } from 'src/types';

import { axiosGet } from 'src/axiosWrapper';
import { FAQS, ASSETS_CONFIG } from 'src/constants';

export const fetchAssetsConfig = async (): Promise<AssetDataResponse[]> => {
  const response = await axiosGet(ASSETS_CONFIG);
  if (response?.status === 200 && response.data?.data?.assetsConfigs) {
    return response.data.data.assetsConfigs as AssetDataResponse[];
  }
  return [];
};

export const fetchFaqs = async (): Promise<FaqDataResponse[]> => {
  const response = await axiosGet(FAQS);
  if (response?.status === 200 && response.data?.data?.faqs) {
    return response.data.data.faqs as FaqDataResponse[];
  }
  return [];
};
