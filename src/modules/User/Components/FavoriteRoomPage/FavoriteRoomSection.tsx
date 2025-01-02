// FavoriteRoomSection.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Container } from "@mui/material";
import { axiosInstance, FAVROOMS, PORTALROOMS } from "../../../../constants/URLS";
import FavCard from './FavCard';

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  images: string[];
}

const FavoriteRoomSection = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callRooms = async () => {
      try {
        const response = await axiosInstance.get(PORTALROOMS.getAllRooms("1", "5"));
        if (response.data.success) {
          setRooms(response.data.data.rooms);
        } else {
          console.error("Failed to fetch rooms:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    callRooms();
  }, []);

  const handleImageClick = async (id: string) => {
    try {
      await axiosInstance.post(FAVROOMS.getAddDetailsFAVROOMS, {
        roomId: id,
      });
      navigate("/your-favorite");
    } catch (error) {
      console.error("Error sending favorite room:", error);
    }
  };

  const handleViewClick = (id: string) => {
    navigate("/room-details");
  };

  return (
    <Container sx={{ marginBottom: 5 }}>
        <Typography sx={{ fontSize: '24px', color: 'var(--primary-color)', fontWeight: 'bolder' ,marginBottom: 2 }} align="left" gutterBottom>
        Most Popular Ads
        </Typography>


      <Grid container spacing={3}>
        {/* First section with one large image */}
        <Grid item xs={12} md={4}>
          {rooms.length > 0 && (
            <FavCard
              room={rooms[0]}
              onFavorite={handleImageClick}
              onView={handleViewClick}
              isLarge={true} // Indicate this is a large card
            />
          )}
        </Grid>

        {/* Second section with four smaller images */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {rooms.slice(1, 5).map((room) => (
              <Grid item xs={12} sm={8} md={6} key={room._id}>
                <FavCard
                  room={room}
                  onFavorite={handleImageClick}
                  onView={handleViewClick}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FavoriteRoomSection;