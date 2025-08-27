import { Box, Grid2, Typography } from '@mui/material';
import { TYPOGRAPHY, TYPOGRAPHY_UTILS } from 'src/theme/styles/fonts';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function HomeView() {
  const theme = useTheme();
  const benefits=[
    {
      title:'Unlock Rewards',
      description:'Premium access & gifts'
    },
    {
      title:'Rise in Ranks',
      description:'From Commoner to Royal Advisor'
    },
    {
      title:'Instant Recognition',
      description:'Points appear instantly when you act'
    },
    {
      title:'Shape the News',
      description:'Your engagement impacts the realm'
    },
  ]
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.backgroundColor.main,
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height:'calc(100vh - 72px)'
      }}
    >
      <Box sx={{ mt: '2rem', textAlign: 'center' }}>
        <Typography sx={TYPOGRAPHY.headline3}>Welcome to</Typography>
        <Typography sx={TYPOGRAPHY.headline1}>GBN Loyalty Program</Typography>
        <Typography sx={TYPOGRAPHY.headline6}>
          Earn rewards for every noble act of news engagement
        </Typography>
      </Box>

      <Box sx={{ mt: '2rem' }}>
        <img
          src="/assets/logo/coin.png"
          alt="GBN Logo"
          style={{ height: 'auto', maxHeight: '500px' }}
        />
      </Box>

      <Box sx={{ mt: '2rem', textAlign: 'center' }}>
        <Typography sx={TYPOGRAPHY.headline5}>What are Loyalty Points?</Typography>
        <Typography sx={TYPOGRAPHY.body1}>
          Loyalty Points are your realm’s currency — given for reading, sharing, or
          <br />
          contributing to the court of news
        </Typography>
      </Box>

      <Box sx={{ mt: '2rem', textAlign: 'center' }}>
        <Typography sx={TYPOGRAPHY.headline5}>Benefits of loyalty points</Typography>
        <Grid2 container spacing={2} sx={{mt:'2rem'}}>
        {
          benefits.map((benefit,index)=>(
            <Grid2 key={index} size={3} sx={{background:'white',color:'black',borderRadius:'10px',p:'1rem'}}>
              <Box
                sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'warning.main',
                  margin: '0 auto 1rem auto',
                }}
              />
              <Typography sx={TYPOGRAPHY.body3}>{benefit.title}</Typography>
              <Typography sx={TYPOGRAPHY.caption}>{benefit.description}</Typography>
            </Grid2>
          ))
        }

        </Grid2>

      </Box>
    </Box>
  );
}
