import { Box, Typography, Grid, Chip, Collapse } from '@mui/material';

interface BenefitsProps {
  benefitsExpanded: boolean;
  lpcurrPoints: number;
}

export default function BenefitsComponent({ benefitsExpanded, lpcurrPoints }: BenefitsProps) {
  // Benefits data structure
  const benefitsData = [
    {
      name: "Loyalty Points",
      bronze: "1 X",
      silver: "1.5 X",
      gold: "2 X",
      platinum: "3 X"
    },
    {
      name: "Complimentary Premium Content",
      bronze: "2 Premium Articles Monthly",
      silver: "3 Premium Articles Monthly",
      gold: "4 Premium Articles Monthly",
      platinum: "5 Premium Articles Monthly"
    },
    {
      name: "Access To Exclusive Merch.",
      bronze: "X",
      silver: "✔",
      gold: "✔",
      platinum: "✔"
    },
    {
      name: "Early Access To Event Registrations",
      bronze: "X",
      silver: "X",
      gold: "✔",
      platinum: "✔"
    },
    {
      name: "Invitations To Exclusive Events.",
      bronze: "X",
      silver: "X",
      gold: "✔",
      platinum: "✔"
    },
    {
      name: "Exclusive Welcome Kit.",
      bronze: "X",
      silver: "X",
      gold: "X",
      platinum: "✔"
    }
  ];

  return (
    <Collapse in={benefitsExpanded}>
      <Box sx={{
        backgroundColor: 'primary.main',
        color: 'white',
        p: '1.5rem',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Benefits
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={3}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Benefits
            </Typography>
          </Grid>
          <Grid item xs={2.25}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Bronze (0 - 999 LP)
            </Typography>
          </Grid>
          <Grid item xs={2.25}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Silver (1000 - 2499 LP)
            </Typography>
          </Grid>
          <Grid item xs={2.25}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Gold (2500 - 4999 LP)
            </Typography>
          </Grid>
          <Grid item xs={2.25}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Platinum (5000+ LP)
            </Typography>
          </Grid>
        </Grid>

        {benefitsData.map((benefit, index) => (
          <Grid 
            container 
            spacing={2} 
            key={index}
            sx={{ 
              py: 1, 
              borderBottom: index < benefitsData.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
              alignItems: 'center'
            }}
          >
            <Grid item xs={3}>
              <Typography variant="body2">
                {benefit.name}
              </Typography>
            </Grid>
            <Grid item xs={2.25}>
              <Chip 
                label={benefit.bronze} 
                size="small" 
                color={benefit.bronze === 'X' ? 'default' : 'primary'}
                variant={benefit.bronze === 'X' ? 'outlined' : 'filled'}
                sx={{ color: benefit.bronze === 'X' ? 'inherit' : 'white' }}
              />
            </Grid>
            <Grid item xs={2.25}>
              <Chip 
                label={benefit.silver} 
                size="small" 
                color={benefit.silver === 'X' ? 'default' : 'primary'}
                variant={benefit.silver === 'X' ? 'outlined' : 'filled'}
                sx={{ color: benefit.silver === 'X' ? 'inherit' : 'white' }}
              />
            </Grid>
            <Grid item xs={2.25}>
              <Chip 
                label={benefit.gold} 
                size="small" 
                color={benefit.gold === 'X' ? 'default' : 'primary'}
                variant={benefit.gold === 'X' ? 'outlined' : 'filled'}
                sx={{ color: benefit.gold === 'X' ? 'inherit' : 'white' }}
              />
            </Grid>
            <Grid item xs={2.25}>
              <Chip 
                label={benefit.platinum} 
                size="small" 
                color={benefit.platinum === 'X' ? 'default' : 'primary'}
                variant={benefit.platinum === 'X' ? 'outlined' : 'filled'}
                sx={{ color: benefit.platinum === 'X' ? 'inherit' : 'white' }}
              />
            </Grid>
          </Grid>
        ))}
      </Box>
    </Collapse>
  );
}