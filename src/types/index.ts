export interface AssetDataResponse {
    id: number;
    name: string;
    type: string;
    value: string;
  }

  export interface  FaqDataResponse {
    id: number;
    type: string;
    question: string;
    answer: string;
  }

  export interface AdditionalPerk {
    label: string;
    value: boolean;
  }

  export interface TierItem {
    tierId: number;
    name: string;
    label: string;
    startRange: number;
    endRange: number;
    multiplier: number;
    monthlyArticleLimit: number;
    additionalPerks: AdditionalPerk[];
    tierImageUrl: string;
  }
  