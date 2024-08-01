import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { ArrowLeft as ArrowLeftIcon } from '@mui/icons-material';

const NotFound = ({}) => (
  <Box
    component="main"
    sx={{
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100%',
    }}
  >
    <Stack spacing={3} sx={{ alignItems: 'center', maxWidth: 'md' }}>
      <Box>
        <Box
          component="img"
          alt="Under development"
          src="/static/images/errors/error-404.png"
          sx={{
            display: 'inline-block',
            height: 'auto',
            maxWidth: '100%',
            width: '200px',
          }}
        />
      </Box>
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        404: The page you are looking for isn&apos;t here
      </Typography>
      <Typography
        color="orimary.hoverfore"
        variant="body1"
        sx={{ textAlign: 'center' }}
      >
        You either tried some shady route or you came here by mistake. Whichever
        it is, try using the navigation
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        startIcon={<ArrowLeftIcon fontSize="var(--icon-fontSize-md)" />}
        variant="contained"
        color="secondary"
        sx={{
          '&:hover': {
            color: 'primary.hoverfore',
          },
        }}
      >
        Go back to home
      </Button>
    </Stack>
  </Box>
);

export default NotFound;
