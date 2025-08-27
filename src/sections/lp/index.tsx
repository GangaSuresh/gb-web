import { Box, Typography, Grid, Card, CardContent, CircularProgress, Alert, Button } from "@mui/material";
import { TYPOGRAPHY } from "src/theme/styles/fonts";
import { useRouteData } from "src/hooks/useRouteData";

export default function LpView() {
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    hasImages, 
    hasStaticText, 
    hasFeatures, 
    hasFaq 
  } = useRouteData('lp');

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="calc(100vh - 72px)">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading LP data...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="calc(100vh - 72px)">
        <Alert severity="error" sx={{ mb: 2 }}>
          {error?.message || 'Failed to load LP data. Please try again.'}
        </Alert>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="calc(100vh - 72px)">
        <Typography variant="h6" sx={{ mb: 2 }}>No LP data available</Typography>
        <Button variant="contained" onClick={() => refetch()}>
          Load Data
        </Button>
      </Box>
    );
  }

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
      {/* Header Section */}
      {data.staticText?.title && (
        <Typography sx={{ ...TYPOGRAPHY.headline2, color: 'primary.main', mb: 2 }}>
          {data.staticText.title}
        </Typography>
      )}
      
      {data.staticText?.description && (
        <Typography sx={{ ...TYPOGRAPHY.body1, textAlign: 'center', mb: 4, maxWidth: 600 }}>
          {data.staticText.description}
        </Typography>
      )}

      {/* Images Section */}
      {hasImages && (
        <Box sx={{ width: '100%', mb: 4 }}>
          <Typography sx={{ ...TYPOGRAPHY.headline5, mb: 2 }}>
            {data.staticText?.imagesTitle || 'Pool Gallery'}
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(data.images).map(([key, imageUrl]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card>
                  <img 
                    src={imageUrl} 
                    alt={key.replace(/-/g, ' ')}
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      objectFit: 'cover', 
                      borderRadius: '8px 8px 0 0' 
                    }}
                    onError={(e) => {
                      // Fallback for broken images
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <CardContent>
                    <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                      {key.replace(/-/g, ' ')}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* FAQ Section */}
      {hasFaq && (
        <Box sx={{ width: '100%', mb: 4 }}>
          <Typography sx={{ ...TYPOGRAPHY.headline5, mb: 2 }}>
            Frequently Asked Questions
          </Typography>
          <Grid container spacing={2}>
            {Array.isArray(data.staticText.faq) && data.staticText.faq.map((faqItem: string, index: number) => {
              const [question, answer] = faqItem.split(' - ');
              return (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {question}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {answer}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Features Section */}
      {hasFeatures && (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Typography sx={{ ...TYPOGRAPHY.headline5, mb: 2, textAlign: 'center' }}>
            {data.staticText.featuresTitle || 'Pool Features'}
          </Typography>
          <Grid container spacing={2}>
            {Array.isArray(data.staticText.features) && data.staticText.features.map((feature: string, index: number) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="body1">{feature}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
