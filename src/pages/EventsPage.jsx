import { useState } from 'react';
import { MainLayout } from '../layouts';
import { Grid } from '@mui/material';
import { useMockData } from '../hooks';

const EventsPage = ({}) => (
  <MainLayout>
    <Grid container sx={{ flexGrow: 1 }}>
      <Grid item sm={6} xs={12} sx={{ p: 2 }}>
        sdf
      </Grid>
      <Grid item sm={6} xs={12} sx={{ p: 2 }}>
        sdf
      </Grid>
    </Grid>
  </MainLayout>
);

export default EventsPage;
