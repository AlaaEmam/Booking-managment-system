import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import { Visibility, Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { axiosInstance, FAVROOMS } from "../../../../constants/URLS";

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

const RoomsCard: React.FC<RoomsCardProps> = ({onFavorite ,onView,_id, title, location, imageUrl, price, discount }) => {

  const navigate = useNavigate();

  // Handle adding to favorites
  const handleFavoriteClick = async (id: string) => {
    try {
      await axiosInstance.post(FAVROOMS.getAddDetailsFAVROOMS, {
        roomId: id,
      });
      console.log("Room added to favorites successfully!");
    } catch (error) {
      console.error("Error adding room to favorites:", error);
    }
  };

  return (
<>
<Card
      sx={{
        minWidth: 260,
        maxWidth: 260,
        height: "300px",
        fontFamily: "Poppins",
        position: "relative",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* Discount Chip */}
      {discount && discount !== "0 Discount" && (
        <Chip
          label={`%${discount}`}
          sx={{
            position: "absolute",
            width: "180px",
            height: "40px",
            fontSize: "16px",
            fontWeight: 500,
            borderRadius: "0px 0px 0px 15px",
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
          fontSize={20}
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
          minWidth: 260,
          maxWidth: 260,
          height: '310px',
          fontFamily: 'Poppins',
          position: 'relative',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          transition: '0.3s',
          margin: '10px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {/* View Button */}
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={() => navigate(`/room-details/${_id}`)}
        >
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

        <IconButton sx={{ width: '40px', height: '40px' }} onClick={() => onFavorite(_id)}>
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

        {/* Favorite Button */}
        <IconButton
          sx={{ width: "40px", height: "40px" }}
          onClick={() => handleFavoriteClick(_id)}
        >
          <Favorite
            sx={{
              color: "white",
              fontSize: 20,
            }}
          />
        </IconButton>
      </Box>
    </Card>
</>
  );
};

export default RoomsCard;
