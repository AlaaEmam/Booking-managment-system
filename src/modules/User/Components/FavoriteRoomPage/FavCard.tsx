// FavCard.tsx
import React from 'react';
import { Card, CardMedia, Box, Typography, IconButton } from '@mui/material';
import { Favorite, Visibility } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Noimage from '../../../../assets/no-image.jpg';

interface FavCardProps {
  room: {
    _id: string;
    roomNumber: string;
    price: number;
    images: string[];
  };
  onFavorite: (id: string) => void;
  onView: (id: string) => void;
  isLarge?: boolean; // Optional prop to distinguish between large and small cards
}

const FavCard: React.FC<FavCardProps> = ({ room, onFavorite, onView, isLarge }) => {
  return (
    <Card
      sx={{
        fontFamily: 'Poppins',
        position: 'relative',
        borderRadius: '17px',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <CardMedia
        component="img"
        alt={room.roomNumber || "Default Room"}
        image={room.images[0] || Noimage}
        sx={{
          height: isLarge ? "100%" : 250,
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: "rgba(255, 20, 147, 0.8)",
          color: "#fff",
          padding: "5px 10px",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        ${room.price} per night
      </Box>
      <Typography
        sx={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "2px 5px",
          borderRadius: "3px",
          fontSize: "16px",
          zIndex: 999,
        }}
      >
        {room.roomNumber}
      </Typography>
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          display: 'flex',
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
        <IconButton sx={{ width: '40px', height: '40px' }} onClick={() => onView(room._id)}>
         <Visibility
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
        />        
        </IconButton>
        <IconButton sx={{ width: '40px', height: '40px' }} onClick={() => onFavorite(room._id)}>
           {/* if you login */}
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
            />        
      </IconButton>
      </Box>
    </Card>
  );
};

export default FavCard;