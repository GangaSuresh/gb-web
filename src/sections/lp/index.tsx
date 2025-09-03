import FAQ from 'src/components/faq';
import { useNavigate } from 'react-router-dom';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { useRouteData } from 'src/hooks/useRouteData';
import {
  Box,
  Alert,
  Button,
  useTheme,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';

import LPEarningMethods from './lp-earning-cards';
import {
  LP_NAME,
  LP_SUBTITLE,
  LP_INFO_IMAGE,
  LP_DESCRIPTION,
  LP_INFO_IMAGE_MOBILE,
} from './constants';
import BenefitsComponent from '../vault/benefits-section';
import MilestoneRewards from './milestone-activity';

export default function LPView() {
  const { data, isLoading, isError, error, refetch, hasFaq } = useRouteData('lp');
  const lpData = {
    images: data?.images || {},
    staticText: data?.staticText || {},
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 72px)">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading coin data...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 72px)"
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error?.message || 'Failed to load coin data. Please try again.'}
        </Alert>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="calc(100vh - 72px)"
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          No LP data available
        </Typography>
        <Button variant="contained" onClick={() => refetch()}>
          Load Data
        </Button>
      </Box>
    );
  }

  const getFaqData = () => {
    try {
      return hasFaq && Array.isArray(lpData.staticText.faq) ? lpData.staticText.faq : [];
    } catch {
      return [];
    }
  };

  const getLPImage = () => {
    try {
      return lpData.images['lp-shadow'] || null;
    } catch {
      return null;
    }
  };
  const getLPIcon = () => {
    try {
      return lpData.images.lp || null;
    } catch {
      return null;
    }
  };

  const getEarnMethodsData = () => {
    try {
      return hasFaq && Array.isArray(lpData.staticText.earnMethods)
        ? lpData.staticText.earnMethods
        : [];
    } catch {
      return [];
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at 104.35% 264%, #008AFA 12.86%, #0032AA 100%)',
          color: 'white',
          pb: isMobile ? '2rem' : '4rem',
        }}
      >
        {/* Header Section */}
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.75rem' },
            fontFamily: 'Lora',
            color: 'info.light',
            mt: isMobile ? '1rem' : '2.5rem',
            fontWeight: 700,
            textAlign: 'center',
          }}
        >
          {LP_NAME}
        </Typography>
        <Typography
          sx={{
            ...(isMobile ? TYPOGRAPHY.body1 : TYPOGRAPHY.headline5),
          }}
        >
          {LP_SUBTITLE}
        </Typography>
        <img
          src={getLPImage() || ''}
          alt={LP_NAME}
          style={{
            width: isMobile ? '84px' : 'auto',
            height: isMobile ? '84px' : 'auto',
            marginTop: isMobile ? '2rem' : '3.5rem',
          }}
        />
        {/* Main Section */}
        <Typography
          sx={{
            ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline2),
            fontFamily: 'Lora',
            fontWeight: isMobile ? 600 : 400,
            mt: isMobile ? '2rem' : '3.5rem',
          }}
        >
          What are Loyalty Points & their Benefits?
        </Typography>
        <Typography sx={{ ...(isMobile ? TYPOGRAPHY.body1 : TYPOGRAPHY.headline6) }}>
          {LP_DESCRIPTION}
        </Typography>
        {isMobile ? (
          <img src={LP_INFO_IMAGE_MOBILE} alt="lp-info-image" style={{ marginTop: '1rem' }} />
        ) : (
          <img src={LP_INFO_IMAGE} alt="lp-info-image" style={{ marginTop: '3rem' }} />
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline4),
            mt: isMobile ? '1rem' : '2rem',
            color: 'primary.main',
            fontFamily: 'Lora',
            fontWeight: isMobile ? 600 : 500,
          }}
        >
          How to Earn Loyalty Points?
        </Typography>
        <Typography sx={{ ...(isMobile ? TYPOGRAPHY.body2 : TYPOGRAPHY.headline6) }}>
          Engage with the GBN community through
          <br />
          various activities to earn loyalty points
        </Typography>
        <LPEarningMethods
          earnMethods={getEarnMethodsData()}
          isMobile={isMobile}
          lpicon={getLPIcon()}
        />
      </Box>

      <Box
        sx={{
          width: '100%',
          background: 'radial-gradient(ellipse at 104.35% 264%, #008AFA 12.86%, #0032AA 100%)',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
          pt:'5rem'
        }}
      >
        <MilestoneRewards/>
        <Typography
          sx={{ ...(isMobile ? TYPOGRAPHY.headline6 : TYPOGRAPHY.headline4), fontFamily: 'Lora',mt:'2rem' }}
        >
          Your LP Unlock Exclusive Perks
        </Typography>
        <Typography
          sx={{ ...(isMobile ? TYPOGRAPHY.body2 : TYPOGRAPHY.body1), fontFamily: 'Lora' }}
        >
          As you accumulate Loyalty Points, you&apos;ll climb through loyalty tiers, each offering
          increasingly valuable perks and exclusive access within the GBN community.
        </Typography>
        <Box sx={{ width: { xs: '95%', sm: '100%', md: '1140px' }, mb: '1rem',mt:isMobile?'1rem':'3rem' }}>
          <BenefitsComponent
            tiers={lpData.staticText.tier}
            images={lpData.images}
            benefitsExpanded
            isMobile={isMobile}
          />
        </Box>

        {/* FAQ Section */}
        {hasFaq && <FAQ faqs={getFaqData()} />}
      </Box>
    </Box>
  );
}
