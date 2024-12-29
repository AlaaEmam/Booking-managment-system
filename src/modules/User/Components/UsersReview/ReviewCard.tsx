import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, styled, Paper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Grid from '@mui/material/Grid';


interface ReviewCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  reviewText: string;
  reviewerName: string;
  reviewerRole: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  imageUrl,
  title,
  rating,
  reviewText,
  reviewerName,
  reviewerRole,
}) => {
  return (
    <Grid container sx={{  height: '100vh' ,marginTop: 4}} spacing={2}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia component="img" height={600} image={imageUrl} alt={title} sx={{ width: '100%', objectFit: 'contain' }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ 
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxWidth: 600, 
            height: 'auto' ,
            borderRadius: '15px', 
            position: 'absolute', 
            overflow: 'visible' , 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            transform: 'translate(-10%, 30%)',
            }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' ,color: 'var(--primary-color)' , marginBottom: 2 }}>
              {title}
            </Typography>
            <Box sx={{ color: 'yellow', display: 'inline', alignItems: 'center', marginBottom: 1 }}>
              <Typography sx={{ marginRight: 1  , fontSize: 24 , color: 'var(--star-color)'  }}>
                {'★'.repeat(rating)}
                {'☆'.repeat(5 - rating)}
              </Typography>
             
            </Box>
            <Typography sx={{fontSize: 32}} color="var(--secondary-color) ">
              {reviewText}
            </Typography>
            <Typography  color="var(--gray-color) " fontSize={12} >
                {reviewerName}, {reviewerRole}
              </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', padding: 1 }}>
          <Button
            sx={{color: 'var(--primary-color)'}}
            startIcon={
              <ArrowBack sx={{
                width: '57px',
                height: '57px',
                backgroundColor: 'transparent', 
                border: '5px solid var(--primary-color)', 
                borderRadius: '50%',
                boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
                padding: '4px', 
              }} />
            }
          >
          </Button>
          <Button 
          endIcon={
              <ArrowForward sx={{
            width: '57px',
            height: '57px',
            backgroundColor: 'transparent', 
            border: '5px solid var(--primary-color)', 
            borderRadius: '50%',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)',
            padding: '4px'
              }} />
            }
          >
              
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ReviewCard;

