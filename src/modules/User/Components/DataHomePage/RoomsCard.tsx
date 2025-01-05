import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { Visibility, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { axiosInstance, FAVROOMS } from '../../../../constants/URLS';

interface RoomsCardProps {
  _id: string;
  title: string;
  imageUrl: string;
  location: string;
  price: number;
  discount?: string;
  onFavorite: (id: string) => void;
  onView: (id: string) => void;
}

const RoomsCard: React.FC<RoomsCardProps> = ({ onFavorite, onView, _id, title, location, imageUrl, price, discount }) => {
  const navigate = useNavigate();

  // Handle adding to favorites
  const handleFavoriteClick = async (id: string) => {
    try {
      await axiosInstance.post(FAVROOMS.getAddDetailsFAVROOMS, { roomId: id });
      console.log("Room added to favorites successfully!");
    } catch (error) {
      console.error("Error adding room to favorites:", error);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 260,
        height: "18.75rem",
        fontFamily: "Poppins",
        position: "relative",
        borderRadius: "0.9375rem",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 0.25rem 1.25rem rgba(0, 0, 0, 0.2)",
        },
        // Responsive width and height adjustments
        '@media (max-width: 900px)': {
          maxWidth: '300px', // Decrease the card size for medium screens
        },
        '@media (max-width: 600px)': {
          maxWidth: '300px', // Further decrease for small screens
        },
        '@media (max-width: 490px)': {
          maxWidth: '300px', // Full width on extra small screens
        },
      }}
    >
      {/* Discount Chip */}
      {discount && discount !== "0 Discount" && (
        <Chip
          label={`%${discount}`}
          sx={{
            position: "absolute",
            width: "11.25rem",
            height: "2.5rem",
            fontSize: "1rem",
            fontWeight: 500,
            borderRadius: "0rem 0rem 0rem 0.9375rem",
            right: 0,
            zIndex: 1,
            backgroundColor: "var(--popular-color)",
            color: "var(--background-color)",
          }}
        />
      )}

      {/* Card Image */}
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{ objectFit: "cover" }}
      />

      {/* Card Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          fontSize={{ xs: 16, sm: 18, md: 20 }} // Adjust font size based on screen size
          sx={{ fontWeight: 500 }}
          color="var(--primary-color)"
          component="div"
        >
          {title}
        </Typography>
        <Typography variant="body2" color="var(--gray-color)">
          {location}
        </Typography>
        <Typography variant="body2" color="var(--gray-color)">
          ${price}
        </Typography>
      </CardContent>

      {/* Icons for View and Favorite */}
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
        {/* View Button */}
        <IconButton
          sx={{
            width: "2.5rem",
            height: "2.5rem",
            '@media (max-width: 600px)': { // Adjust button size for small screens
              width: '2rem',
              height: '2rem',
            },
          }}
          onClick={() => onView(_id)}
        >
          <Visibility
            sx={{
              color: 'white',
              fontSize: 20,
              transition: 'color 0.3s',
              '&:hover': {
                color: 'var(--star-color)',
                transform: 'scale(1.2)',
              },
            }}
          />
        </IconButton>

        {/* Favorite Button */}
        <IconButton
          sx={{
            width: "2.5rem",
            height: "2.5rem",
            '@media (max-width: 600px)': { // Adjust button size for small screens
              width: '2rem',
              height: '2rem',
            },
          }}
          onClick={() => { onFavorite(_id); }}
        >
          <Favorite
            sx={{
              color: 'white',
              fontSize: 20,
              transition: 'color 0.3s',
              '&:hover': {
                color: 'var(--pink)',
                transform: 'scale(1.2)',
              },
            }}
          />
        </IconButton>
      </Box>
    </Card>
  );
};

export default RoomsCard;
