/**
 * Maps tier names to their corresponding image URLs
 */
export const getTierImageUrl = (tierName: string): string => {
  const tierImageMap: Record<string, string> = {
    'Bronze': '/assets/icons/bronze-badge.png',
    'Silver': '/assets/icons/silver-badge.png',
    'Gold': '/assets/icons/gold-badge.png',
    'Platinum': '/assets/icons/platinum-badge.png',
  };

  // Return mapped URL or fallback to a default image
  return tierImageMap[tierName] || '/assets/icons/bronze-badge.png';
};

/**
 * Processes tier data to ensure tierImageUrl is populated
 */
export const processTierData = (tiers: any[]): any[] => 
  tiers.map(tier => ({
    ...tier,
    tierImageUrl:  getTierImageUrl(tier.label || tier.name)
  }));
