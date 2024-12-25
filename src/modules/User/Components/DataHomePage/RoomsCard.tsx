import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from '@mui/material';

interface RoomsCardProps {
  title: string;
  imageUrl: string;
  location: string;
  price: number;
  discount?: string; 
}

const RoomsCard: React.FC<RoomsCardProps> = ({ title, location, imageUrl, price, discount }) => {
  return (
    <Card sx={{ maxWidth: 250, fontFamily: 'Poppins', position: 'relative', borderRadius: '15px' }}>
      {discount && discount !== '0 Discount' ? ( // Check if discount is not null or '0'
        <Chip label={`%${discount} `} sx={{
          position: 'absolute',
          width: '180px',
          height: '40px',
          fontSize: '16px',
          fontWeight: 500,
          borderRadius: '0px 0px 0px 15px',
          right: 0,
          zIndex: 1,
          backgroundColor: 'var(--popular-color)',
          color: 'var(--background-color)'
        }} />
      ) : null}

      <CardMedia component="img" height="200" image={imageUrl} alt={title} />
      <CardContent>
        <Typography fontSize={20} sx={{ fontWeight: 500 }} color='var(--primary-color)' component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="var(--gray-color)">
          {location}
        </Typography>
        <Typography variant="body2" color="var(--gray-color)">
          ${price}  {/* Adding dollar sign for better readability */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RoomsCard;