import React, { useState, useEffect } from 'react';
import { axiosInstance, FAVROOMS } from '../../../../constants/URLS';
import { Box, Card, Typography, Grid, CardMedia, IconButton } from '@mui/material';
import { FaHeart } from 'react-icons/fa'; // استخدام ايقونة القلب من FontAwesome

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: string[];
  createdBy: string;
  images: string[];
}

const FavoriteRoomPage = () => {
  const [favoriteRooms, setFavoriteRooms] = useState<any[]>([]);

  // Load favorite rooms when the component mounts
  const loadFavoriteRooms = async () => {
    try {
      const response = await axiosInstance.get(FAVROOMS.getAddsFAVROOMS);
      console.log('Favorite Rooms Response:', response); // Display response in console
      if (response.data?.data?.favoriteRooms) {
        setFavoriteRooms(response.data.data.favoriteRooms);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching favorite rooms:', error);
    }
  };

  useEffect(() => {
    loadFavoriteRooms();
  }, []);

  const deleteDetailsFAVROOMS = async (roomId: string) => {
    console.log(roomId);
    try {
      const response = await axiosInstance.delete(FAVROOMS.deleteDetailsFAVROOMS(roomId), {
        data: { "roomId": roomId },
      });
      console.log('Delete Response:', response); // Log the response after deletion

      if (response.data.success) {
        // After successful deletion, reload the favorite rooms
        loadFavoriteRooms();
      } else {
        console.error('Failed to delete the favorite room');
      }
    } catch (error) {
      console.error('Error deleting favorite room:', error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: 2 }}
      >
        Your Favorites
      </Typography>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ textAlign: 'center', color: 'gray' }}
      >
        Your Rooms
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {favoriteRooms.map((favoriteRoom) => (
          <Grid item xs={12} sm={6} md={4} key={favoriteRoom._id}>
            {favoriteRoom.rooms.map((room: Room) => (
              <Card
                key={room._id}
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={room.images[0] || '/default-image.jpg'}
                  alt={room.roomNumber}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      padding: 2,
                    },
                  }}
                />

                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    padding: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {room.roomNumber}
                  </Typography>
                  <Typography variant="body2">{`Price: $${room.price}`}</Typography>
                </Box>

                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 10,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 0, 0, 0.7)',
                    },
                  }}
                  onClick={() => deleteDetailsFAVROOMS(room._id)} // When heart icon is clicked
                >
                  <FaHeart size={30} />
                </IconButton>
              </Card>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoriteRoomPage;
