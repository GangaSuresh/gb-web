import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Button, Typography } from '@mui/material';

interface LPSectionProps {
  images: Record<string, string>;
  lpcurrPoints: number;
  lpcurrBadge: string;
  onViewHistory: () => void;
}

export default function LPSection({
  images,
  lpcurrPoints,
  lpcurrBadge,
  onViewHistory,
}: LPSectionProps) {
  return (
    <Box
      sx={{
        width: '90%',
        mt: '2rem',
        border: 'solid',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          background: 'radial-gradient(ellipse at 104.35% 264%, #008AFA 12.86%, #0032AA 100%)',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          p: '1.5rem',
        }}
      >
        <Box display="flex" gap="1rem" sx={{border:'solid'}}>
          <Box display="flex" gap="1rem" width='100%'  sx={{border:'solid'}}>
            <img src={images.lp} alt="lp" />
            <Box>
              <Typography sx={{ ...TYPOGRAPHY.headline6, color: 'white', fontWeight: 800 }}>
                {lpcurrPoints} Points
              </Typography>
              <Box
                sx={{
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0rem',
                }}
                onClick={onViewHistory}
              >
                <Typography
                  sx={{
                    ...TYPOGRAPHY.body2,
                    textDecoration: 'underline',
                  }}
                >
                  View Points History
                </Typography>
                <Iconify icon="icon-park-outline:right" />
              </Box>
            </Box>
          </Box>
          <Box display="flex" gap="1rem" width='100%'>
            <img src={images['bronze-badge']} alt="lp" />
            <Box>
              <Typography sx={{ ...TYPOGRAPHY.body2, color: 'primary.lighter' }}>
                Current Badge
              </Typography>
              <Typography
                sx={{
                  ...TYPOGRAPHY.headline6,
                  color: 'white',
                  fontWeight: 700,
                }}
              >
                {lpcurrBadge}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap="1rem">
          <Button
            className="button-primary-outlined"
            variant="outlined"
            size="large"
            onClick={() => {}}
          >
            Know More
            <Iconify icon="icon-park-outline:right" />
          </Button>
        </Box>
      </Box>
      <p>remaining</p>
    </Box>
  );
}
