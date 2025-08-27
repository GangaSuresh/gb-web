import { Box } from '@mui/material';

import { RouterLink } from '../../routes/components/router-link';

export const Logo = ({ href = '/' }: { href?: string }) => (
  <Box
    component={RouterLink}
    href={href}
  >
    <img 
      src="/assets/logo/logo.png" 
      alt="GBN Logo" 
      style={{ height: 'auto', maxHeight: '50px' }}
    />
  </Box>
);