import { useLocation } from 'react-router-dom';
import { useFaqData } from 'src/hooks/useFaqData';
import AssetsLoader from 'src/components/assetsLoader';
import { useTheme, useMediaQuery } from '@mui/material';
import { useAssetsData } from 'src/hooks/useAssetsData';

import Info from './info';
import Transaction from './transaction';

export default function Coin() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Fetch assets data
  const assetsData = useAssetsData();
  const faqData = useFaqData();

  const getFaqData = () => {
    try {
      return faqData.hasFaqs? faqData.getFaqsByType('ujc') : [];
    } catch {
      return [];
    }
  };

  // Show assets loader if assets are still loading
  if (assetsData.isLoading || faqData.isLoading) {
    return <AssetsLoader message="Loading coin assets..." />;
  }

  const content = () => {
    switch (path) {
      case "info":
        return <Info isMobile={isMobile} isTablet={isTablet} faqData={getFaqData()} />;
      case "transaction":
        return <Transaction isMobile={isMobile} isTablet={isTablet} />;
      default:
        return <Info isMobile={isMobile} isTablet={isTablet} faqData={getFaqData()} />;
    }
  };

  return (
    <>
      {content()}
    </>
  );
}
