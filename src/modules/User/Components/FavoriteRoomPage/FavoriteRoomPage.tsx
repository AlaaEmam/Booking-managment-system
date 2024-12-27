import React, { useState, useEffect } from 'react';
import { axiosInstance, FAVROOMS } from '../../../../constants/URLS';
import { Box, Card, Typography, Grid, CardMedia, IconButton, Pagination } from '@mui/material';
import { FaHeart } from 'react-icons/fa';

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
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const loadFavoriteRooms = async (page: number = 1) => {
    try {
      const response = await axiosInstance.get(FAVROOMS.getAddsFAVROOMS, { params: { page } });
      if (response.data?.data?.favoriteRooms) {
        setFavoriteRooms(response.data.data.favoriteRooms);
        setTotalPages(Math.ceil(response.data.data.totalCount / 10));
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching favorite rooms:', error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    loadFavoriteRooms(page);
  };

  const deleteDetailsFAVROOMS = async (roomId: string) => {
    try {
      const response = await axiosInstance.delete(FAVROOMS.deleteDetailsFAVROOMS(roomId), {
        data: { roomId },
      });
      if (response.data.success) {
        loadFavoriteRooms(currentPage);
      } else {
        console.error('Failed to delete the favorite room');
      }
    } catch (error) {
      console.error('Error deleting favorite room:', error);
    }
  };

  useEffect(() => {
    loadFavoriteRooms();
  }, []);

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
                  onClick={() => deleteDetailsFAVROOMS(room._id)}
                >
                  <FaHeart size={30} />
                </IconButton>
              </Card>
            ))}
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
};

export default FavoriteRoomPage;
