import { Box, Typography, Grid, Card, CardContent, CircularProgress, Alert, Button } from "@mui/material";
import { TYPOGRAPHY } from "src/theme/styles/fonts";

export default function VaultView() {


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 'calc(100vh - 72px)',
        p: 3,
      }}
    >
      <Typography sx={{...TYPOGRAPHY.headline2, color: 'primary.main',mt:'1rem'}}>GBN Vault</Typography>
    </Box>
  );
}