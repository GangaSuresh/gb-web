import { Box, LinearProgress, Typography } from '@mui/material';
import { varAlpha } from 'src/theme/styles';
import { linearProgressClasses } from '@mui/material/LinearProgress';

interface AssetsLoaderProps {
  message?: string;
}

export default function AssetsLoader({ message = 'Loading assets...' }: AssetsLoaderProps) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex="1 1 auto"
      gap={2}
      minHeight="60vh"
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {message}
      </Typography>
      <LinearProgress
        sx={{
          width: 1,
          maxWidth: 320,
          bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
          [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
        }}
      />
    </Box>
  );
}
