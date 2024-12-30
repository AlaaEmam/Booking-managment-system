import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from '@mui/material';
import { Visibility, Favorite } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RoomsCardProps {
  _id: string;
  title: string;
  imageUrl: string;
  location: string;
  price: number;
  discount?: string; 
}

const RoomsCard: React.FC<RoomsCardProps> = ({_id, title, location, imageUrl, price, discount }) => {

  const navigate = useNavigate();

  return (
    <Card
    sx={{
      minWidth: 260,
      maxWidth: 260,
      height: '300px',
      fontFamily: 'Poppins',
      position: 'relative',
      borderRadius: '15px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: '0.3s',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      },
    }}
  >
    {/* Discount Chip */}
    {discount && discount !== '0 Discount' && (
      <Chip
        label={`%${discount}`}
        sx={{
          position: 'absolute',
          width: '180px',
          height: '40px',
          fontSize: '16px',
          fontWeight: 500,
          borderRadius: '0px 0px 0px 15px',
          right: 0,
          zIndex: 1,
          backgroundColor: 'var(--popular-color)',
          color: 'var(--background-color)',
        }}
      />
    )}

    {/* Card Image */}
    <CardMedia
      component="img"
      height="200"
      image={imageUrl}
      alt={title}
      sx={{ objectFit: 'cover' }}
    />
    
    {/* Card Content */}
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography fontSize={20} sx={{ fontWeight: 500 }} color='var(--primary-color)' component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="var(--gray-color)">
        {location}
      </Typography>
      <Typography variant="body2" color="var(--gray-color)">
        ${price}
      </Typography>
    </CardContent>

    {/* Eye Icon Button */}
    <Box
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0', 
        display: 'flex',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--light-blue)',
        cursor: 'pointer',
        opacity: 0,
        '&:hover': {
          opacity: 1,
        },
      }}
    >
      <IconButton sx={{ width: '40px', height: '40px' }}>
       <Link>
         <FavoriteIcon
         sx={{ 
          color: 'white', 
          fontSize: 20, 
        }} 
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--star-color)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'white';
          e.currentTarget.style.transform = 'scale(1)';
        }} 
        onClick={() => navigate("room-details")}
        />
       </Link>
      </IconButton>

      <IconButton sx={{ width: '40px', height: '40px' }}>
      <Link>
      <Favorite 
       style={{ 
        color: 'white', 
        fontSize: 20, 
      }} 
      onMouseEnter={(e) => {
        e.currentTarget.style.color = 'var(--pink)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'white';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onClick={() => navigate("your-favorite")}
      /></Link>
      </IconButton>
    </Box>
  </Card>
);
};

export default RoomsCard;

