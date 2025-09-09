import { axiosGet } from 'src/axiosWrapper';
import { ASSETS_CONFIG } from 'src/constants';

export interface AssetDataResponse {
  id: number;
  name: string;
  type: string;
  value: string;
}

export const fetchAssetsConfig = async (): Promise<AssetDataResponse[]> => {
  const response = await axiosGet(ASSETS_CONFIG);
  if (response?.status === 200 && response.data?.data?.assetsConfigs) {
    return response.data.data.assetsConfigs as AssetDataResponse[];
  }
  return [];
};
