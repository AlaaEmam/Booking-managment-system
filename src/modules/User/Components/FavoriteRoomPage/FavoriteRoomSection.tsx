import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardMedia, Box, Typography, Container } from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import axios from "axios";
import img from "../../../../imges/room.jpg";
import { axiosInstance, FAVROOMS } from "../../../../constants/URLS";

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images: string[];
  createdBy: {
    _id: string;
    userName: string;
  };
}

const FavoriteRoomSection = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const callRooms = async () => {
      try {
        const response = await axiosInstance.get('https://upskilling-egypt.com:3000/api/v0/portal/rooms/available?page=1&size=10&startDate=2023-01-20&endDate=2023-01-30');
        if (response.data.success) {
          console.log("Rooms fetched successfully:", response.data.data.rooms);
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

  // التعامل مع الضغط على الصورة للتوجيه إلى صفحة your-favorite بدون roomId
  const handleImageClick = async (id: string) => {
    try {
      // إرسال الـ _id للعنوان المطلوب
      await axiosInstance.post(FAVROOMS.getAddDetailsFAVROOMS, {
        roomId: id
      });      // التوجيه إلى صفحة your-favorite
      navigate("/your-favorite");
    } catch (error) {
      console.error("Error sending favorite room:", error);
    }
  };

  return (
    <Container>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          textAlign: "left",
        }}
      >
        Available Rooms
      </Typography>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} md={4} key={room._id}>
            <Card
              sx={{
                position: "relative",
                height: 400,
                cursor: "pointer",
                "&:hover": {
                  "& .hover-icons": { opacity: 1, transform: "translateY(0)" },
                  "& .image": { filter: "brightness(0.8)" },
                },
              }}
            >
              <CardMedia
                className="image"
                component="img"
                alt={room.roomNumber || "Default Room"}
                image={room.images[0] || img}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  transition: "all 0.3s ease-in-out",
                }}
                onClick={() => handleImageClick(room._id)} // إرسال الـ ID عند الضغط على الصورة
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "0",
                  backgroundColor: "rgba(255, 20, 147, 0.8)",
                  color: "#fff",
                  padding: "5px 10px",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
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
                  fontSize: "12px",
                }}
              >
                {room.createdBy.userName}
              </Typography>
              <Box
                className="hover-icons"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  gap: "10px",
                  opacity: 0,
                  transition: "all 0.3s ease-in-out",
                }}
              >
                <Favorite sx={{ color: "white", fontSize: "30px" }} />
                <Visibility sx={{ color: "white", fontSize: "30px" }} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FavoriteRoomSection;
