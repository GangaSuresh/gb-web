export const LP_NAME = 'Loyalty Points';
export const LP_SUBTITLE = 'LP (Loyalty Points) are earned through platform engagement and can be redeemed for rewards';
export const LP_DESCRIPTION = 'LP are our loyalty currency, earned through reading articles, participating in polls, and other platform activities';
export const LP_INFO_IMAGE = '/assets/images/lp/lp-benefits.png';
export const LP_INFO_IMAGE_MOBILE = '/assets/images/lp/lp-benefits-mobile.png';
export const GOLDEN_BADGE = '/assets/icons/golden-badge.png';
export const SHIELD = '/assets/icons/silver-badge.png';
export const FIRE_ICON = '/assets/icons/fire.png';
export const LP_EARN_METHODS = [
  {
    title: 'Read Articles',
    description: 'Earn LP by reading articles and engaging with content',
    buttonText: 'Start Reading',
    buttonLink: '/lp/earn'
  },
  {
    title: 'Participate in Polls',
    description: 'Join polls and surveys to earn additional LP',
    buttonText: 'Take Polls',
    buttonLink: '/lp/polls'
  }
];

interface ActivityData {
  id: string;
  title: string;
  description: string;
  lpAmount: number;
  progress?: {
    current: number;
    total: number;
  };
  callToAction?: string;
  isCompleted?: boolean;
  completedText?: string;
}

export const activities: ActivityData[] =
 [
  {
    id: '1',
    title: 'Articles Read',
    description: 'Earned from article read',
    lpAmount: 600,
    progress: { current: 120, total: 200 },
    callToAction: 'Read 80 more and grab 450 LP (includes 50 bonus)',
  },
  {
    id: '2',
    title: 'Articles Liked',
    description: 'Earned from article read',
    lpAmount: 600,
    progress: { current: 120, total: 200 },
    callToAction: 'Read 80 more and grab 450 LP (includes 50 bonus)',
  },
  {
    id: '3',
    title: 'Articles Shared',
    description: 'Earned from article read',
    lpAmount: 600,
    progress: { current: 120, total: 200 },
    callToAction: 'Read 80 more and grab 450 LP (includes 50 bonus)',
  },
  {
    id: '4',
    title: 'Articles Left comments',
    description: 'Earned from article read',
    lpAmount: 600,
    progress: { current: 120, total: 200 },
    callToAction: 'Read 80 more and grab 450 LP (includes 50 bonus)',
  },
  {
    id: '5',
    title: 'Poll/Surveys',
    description: 'Earned from Poll/Surveys',
    lpAmount: 600,
    isCompleted: true,
    completedText: '12 Surveys Done',
  },
  {
    id: '6',
    title: 'Poll/Surveys',
    description: 'Earned from Poll/Surveys',
    lpAmount: 600,
    isCompleted: true,
    completedText: '12 Surveys Done',
  },
  {
    id: '7',
    title: 'Poll/Surveys',
    description: 'Earned from Poll/Surveys',
    lpAmount: 600,
    isCompleted: true,
    completedText: '12 Surveys Done',
  },
  {
    id: '8',
    title: 'Poll/Surveys',
    description: 'Earned from Poll/Surveys',
    lpAmount: 600,
    isCompleted: true,
    completedText: '12 Surveys Done',
  },
];
