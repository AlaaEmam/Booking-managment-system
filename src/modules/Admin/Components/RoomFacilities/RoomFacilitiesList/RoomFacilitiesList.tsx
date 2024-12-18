import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import './RoomFacilitiesList.css';

export default function RoomFacilitiesList() {
  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          height: '12vh',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          alignItems: 'center',
          padding: '0 2.25rem',
          mb: '1.5rem',
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Facilities Table Details
          </Typography>
          <Typography variant="body2">You can check all details</Typography>
        </Box>
        <Link to='/facility-form'>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 3, py: 2 }}
            startIcon={<AddIcon />}
          >
            Add New Facility
          </Button>
        </Link>
      </Box>
    </Container>
  );
}