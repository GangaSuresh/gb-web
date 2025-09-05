import { useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

import Info from './info';
import Transaction from './transaction';

export default function LP() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
