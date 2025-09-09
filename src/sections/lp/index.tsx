import { useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { useAssetsData } from 'src/hooks/useAssetsData';
import AssetsLoader from 'src/components/assetsLoader';

import Info from './info';
import Transaction from './transaction';

export default function LP() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  // Fetch assets data
  const assetsData = useAssetsData();

  // Show assets loader if assets are still loading
  if (assetsData.isLoading) {
    return <AssetsLoader message="Loading loyalty program assets..." />;
  }

  const content = () => {
    switch (path) {
      case "info":
        return <Info isMobile={isMobile} isTablet={isTablet} />;
      case "transaction":
        return <Transaction isMobile={isMobile} isTablet={isTablet} />;
      default:
        return <Info isMobile={isMobile} isTablet={isTablet} />;
    }
  };

  return (
    <>
      {content()}
    </>
  );
}
