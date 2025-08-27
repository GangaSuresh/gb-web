import { Box, Button, Typography } from '@mui/material';

const PageUnderConstruction = () => (
  <>
    <Typography variant="h4" flexGrow={1}>
      Coming soon
    </Typography>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" sx={{ mb: 3 }}>
        🚧 Page Under Construction 🚧
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        We are working hard to bring you something awesome. Stay tuned!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Go to Home
      </Button>
    </Box>
  </>
);

export default PageUnderConstruction;