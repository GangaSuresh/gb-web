import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { SimpleLayout } from 'src/layouts/simple';

// ----------------------------------------------------------------------

export function UnauthorizedView() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Unauthorized Access
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          Sorry, you don’t have permission to access this page. Please contact your administrator if you believe this is a mistake.
        </Typography>
        {/* <Box
          component="img"
          src="/assets/illustrations/illustration-404.svg"
          sx={{
            width: 320,
            height: 'auto',
            my: { xs: 5, sm: 10 },
          }}
        /> */}

        <Button component={RouterLink} href="/question" size="large" variant="contained" color="inherit">
          Go to home
        </Button>
      </Container>
    </SimpleLayout>
  );
}