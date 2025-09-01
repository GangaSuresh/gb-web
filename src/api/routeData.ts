// API for route data - images and static text only
export interface RouteDataResponse {
  images: Record<string, string>;
  staticText: Record<string, any>;
}

// Mock API function - replace with real API call
export const fetchRouteData = async (route: string): Promise<RouteDataResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simulate occasional errors
  if (Math.random() < 0.05) {
    throw new Error('API error occurred');
  }
  
  switch (route) {
    case 'vault':
      return {
        images: {
          'uj-coin': '/assets/icons/coin-icon.png',
          'lp': '/assets/icons/loyalty-icon.png',
          'bronze-badge': '/assets/icons/bronze-badge.png',
          'silver-badge': '/assets/icons/silver-badge.png',
          'gold-badge': '/assets/icons/gold-badge.png',
          'platinum-badge': '/assets/icons/platinum-badge.png',
          'benefits': '/assets/icons/benefits-icon.png'
        },
        staticText: {
          tier:[
            {
              title:'Bronze',
              range:'0-3000 Points',
              loyaltyPoints:'1 X',
              complimentaryPremiumContent:'2 Premium Articles Monthly',
              accessToExclusiveMerch:false,
              earlyAccessToEventRegistrations:false,
              invitationToExclusiveEvents:false,
              exclusiveWelcomeKit:false
            },
            {
              title:'Silver',
              range:'3001-7500 Points',
              loyaltyPoints:'1.5 X',
              complimentaryPremiumContent:'3 Premium Articles Monthly',
              accessToExclusiveMerch:true,
              earlyAccessToEventRegistrations:false,
              invitationToExclusiveEvents:false,
              exclusiveWelcomeKit:false
            },
            {
              title:'Gold',
              range:'7501-15000 Points',
              loyaltyPoints:'2 X',
              complimentaryPremiumContent:'4 Premium Articles Monthly',
              accessToExclusiveMerch:true,
              earlyAccessToEventRegistrations:true,
              invitationToExclusiveEvents:true,
              exclusiveWelcomeKit:false
            },
            {
              title:'Platinum',
              range:'15000+ Points',
              loyaltyPoints:'3 X',
              complimentaryPremiumContent:'5 Premium Articles Monthly',
              accessToExclusiveMerch:true,
              earlyAccessToEventRegistrations:true,
              invitationToExclusiveEvents:true,
              exclusiveWelcomeKit:true
            },
          ],
          faq: [
            {
              question:'What exactly are GBVox coins and why are they important for me as a user?',
              answer:'They’re digital rewards you earn for engaging with news, which you can use for games, rewards, and premium access.'
            },
            {
              question:'How can I get GBVoxs coins my daily activities on the platform?',
              answer:'TBD'
            },
            {
              question:'Is there a limit to how many GBVox coins I can earn in a day or month? Why do these limits exist?',
              answer:'TBD'
            },
            {
              question:'Once I get GBVox coins, what benefits or rewards can I actually use them for?',
              answer:'TBD'
            },
            {
              question:'Do GBVox coins last forever or do they expire after a certain period of time?',
              answer:'TBD'
            },
            {
              question:'Can I send my GBVox coins to someone else or exchange them for real money?',
              answer:'TBD'
            },
          ]
        }
      };
      
    case 'coin':
      return {
        images: {
          'uj-coin': '/assets/images/coin/coin-with-shadow.png',
        },
        staticText: {
          faq: [
            {
              question: 'How do I earn staking rewards?',
              answer: 'Stake your GBN coins in our staking pools to earn passive income and governance rights.'
            },
            {
              question: 'What is the minimum stake amount?',
              answer: 'The minimum stake amount is 100 GBN coins to start earning rewards.'
            },
            {
              question: 'How does governance voting work?',
              answer: 'Hold GBN tokens to participate in protocol decisions and earn additional rewards.'
            },
            {
              question: 'What are the staking rewards?',
              answer: 'Current APY ranges from 8-15% depending on lock period and pool size.'
            },
            {
              question: 'Can I unstake anytime?',
              answer: 'Yes, with a 7-day unbonding period for security.'
            }
          ]
        }
      };
      
    case 'lp':
      return {
        images: {
          'liquidity-pool': '/assets/images/lp/liquidity-pool.jpg',
          'yield-farming': '/assets/images/lp/yield-farming.jpg',
          'amm-chart': '/assets/images/lp/amm-chart.jpg',
          'pool-analytics': '/assets/images/lp/pool-analytics.jpg',
          'impermanent-loss': '/assets/images/lp/impermanent-loss.jpg'
        },
        staticText: {
          title: 'Liquidity Pool',
          description: 'Provide liquidity and earn rewards through automated market making',
          imagesTitle: 'Pool Gallery',
          featuresTitle: 'Pool Features',
          features: [
            'Automated market making',
            'Yield farming',
            'Impermanent loss protection',
            'Multi-token pools',
            'Real-time analytics'
          ],
          faq: [
            'What is impermanent loss? - Impermanent loss occurs when the price ratio of assets in a liquidity pool changes, potentially resulting in fewer tokens than initially deposited.',
            'How do I add liquidity? - To add liquidity, deposit equal values of both tokens in the pool and receive LP tokens representing your share.',
            'What are the rewards? - Earn trading fees and additional yield farming rewards by providing liquidity to our pools.',
            'What is the minimum liquidity? - Minimum liquidity requirement is $100 equivalent in either token.',
            'How do I calculate my returns? - Use our built-in calculator to estimate returns including fees and potential impermanent loss.'
          ]
        }
      };
      
    default:
      throw new Error(`Unknown route: ${route}`);
  }
};

// Real API implementation would look like this:
/*
export const fetchRouteData = async (route: string): Promise<RouteDataResponse> => {
  const response = await fetch(`/api/route-data/${route}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`, // If authentication is required
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};
*/
