import { Grid } from '@mui/material';
import MainHeader from './MainHeader';

const MainLayout = ({ children }) => (
  <Grid container>
    <Grid item xs={12}>
      <MainHeader></MainHeader>
    </Grid>
    <Grid item xs={12} sx={{ pt: 9 }}>
      {children}
    </Grid>
  </Grid>
);

export default MainLayout;
