import { Box, Button, Typography, Container } from '@mui/material';
import { SimpleLayout } from 'src/layouts/simple';
import { CONFIG } from 'src/config-global';
import ConstructionIcon from '@mui/icons-material/Construction';

export function MaintenanceView() {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: 8,
          }}
        >
          <ConstructionIcon sx={{ fontSize: 80, color: 'warning.main', mb: 3 }} />
          
          <Typography variant="h3" sx={{ mb: 2 }}>
            System Maintenance
          </Typography>

          <Typography sx={{ color: 'text.secondary', mb: 4, maxWidth: 600 }}>
            {CONFIG.appName} is currently undergoing scheduled maintenance to improve your experience. 
            We will be back shortly. Thank you for your patience.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Box>
      </Container>
    </SimpleLayout>
  );
}

export default MaintenanceView; 