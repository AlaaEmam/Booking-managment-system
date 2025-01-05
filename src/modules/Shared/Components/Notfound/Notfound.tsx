import React from 'react';
import Logo from '../../../../assets/Logo.svg';
import ErrorImage from '../../../../assets/NotFound.svg'; // Path to your 404 image
import { Link } from 'react-router-dom';
import { Box, Grid, Typography, Button } from '@mui/material';

const NotFound: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex'}}>
      <Grid container>
       
        <Grid xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', padding: 5}}>
          <Box sx={{marginBottom: 10}}>
          <img src={Logo} alt="Logo" />
          </Box>
          <Typography variant="h3" className="font-weight-bold" color="var(--primary-color)">Oops....</Typography>
          <Typography variant="h4" className="font-weight-light text-success">Page not found</Typography>
          <Typography className="font-weight-light">
            This Page doesn’t exist or was removed! We suggest you back to home.
          </Typography>
          <Link to="/dashboard">
            <Button variant="contained" size="large" sx={{ mt: 4, mb: 2 ,backgroundColor: 'var(--primary-color)' }}>
              <i className="fa-solid fa-arrow-right px-2"></i> Back To Home
            </Button>
          </Link>
        </Grid>

        <Grid item xs={12} md={6} sx={{ backgroundImage: `url(${ErrorImage})`, backgroundSize: 'cover', backgroundPosition: 'right', backgroundRepeat: 'no-repeat', height: '100vh' }} />
      </Grid>
    </Box>
  );
};

export default NotFound;