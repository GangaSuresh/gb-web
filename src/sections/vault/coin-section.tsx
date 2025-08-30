import { Iconify } from 'src/components/iconify';
import { TYPOGRAPHY } from 'src/theme/styles/fonts';
import { Box, Button, Typography } from '@mui/material';

interface CoinSectionProps {
  coinImage: string | null;
  coinCount: number;
  coinName: string;
  onTopUp: () => void;
  onKnowMore: () => void;
  onViewHistory: () => void;
}

export default function CoinSection({
  coinImage,
  coinCount,
  coinName,
  onTopUp,
  onKnowMore,
  onViewHistory,
}: CoinSectionProps) {
  return (
    <Box
      display="flex"
      sx={{
        width: '90%',
        mt: '2rem',
        p: '1.5rem 4.8rem',
        justifyContent: 'space-between',
        borderRadius: '16px',
        background: 'radial-gradient(ellipse at 0% 264%, #D70000 12.86%, #004BE3 100%)',
      }}
    >
      <Box display="flex" gap="1rem">
        {coinImage && <img src={coinImage} alt={coinName} />}
        <Box>
          <Typography sx={{ ...TYPOGRAPHY.headline6, color: 'info.main' }}>
            <b>{coinCount}</b> {coinName}
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
            <Typography sx={{ ...TYPOGRAPHY.body2 }}>View Points History</Typography>
            <Iconify icon="icon-park-outline:right" />
          </Box>
        </Box>
      </Box>
      <Box display="flex" gap="1rem">
        <Button className="button-yellow" variant="outlined" size="large" onClick={onTopUp}>
          <Iconify icon="material-symbols:add-rounded" />
          Add Coins
        </Button>
        <Button
          className="button-primary-outlined"
          variant="outlined"
          size="large"
          onClick={onKnowMore}
          sx={{backgroundColor:'transparent'}}
        >
          Know More
          <Iconify icon="icon-park-outline:right" />
        </Button>
      </Box>
    </Box>
  );
}
