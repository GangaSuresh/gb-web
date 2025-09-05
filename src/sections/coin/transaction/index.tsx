import { Box, Typography } from "@mui/material";
import { TYPOGRAPHY } from "src/theme/styles/fonts";

interface TransactionProps {
  isMobile: boolean;
  isTablet: boolean;
}

export default function Transaction({ isMobile, isTablet }: TransactionProps) {
    return (
        <Box sx={{ 
          display:'flex',
          justifyContent:'center',
          background: 'radial-gradient(ellipse at 0% 264%, #D70000 12.86%, #004BE3 100%)',
        }}>
          <Box sx={{
            width:'90%',
            maxWidth:'1140px',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            color:'white',
            p: isMobile?'2rem':'3rem',
            textAlign:'center',
            border:'solid'
            }}>
          <Typography
          sx={{...(isMobile?TYPOGRAPHY.headline5:TYPOGRAPHY.headline4)}}
          >UJ Coins History</Typography>

          </Box>
          
        </Box>
    );
}