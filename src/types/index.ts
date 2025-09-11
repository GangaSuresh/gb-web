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

  export interface TierItem {
    title: string;
    range: string;
    loyaltyPoints: string;
    complimentaryPremiumContent: string;
    accessToExclusiveMerch: boolean;
    earlyAccessToEventRegistrations: boolean;
    invitationToExclusiveEvents: boolean;
    exclusiveWelcomeKit: boolean;
  }
  