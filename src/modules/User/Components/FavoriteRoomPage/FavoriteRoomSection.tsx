import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate
import { Grid, Card, CardMedia, Box, Typography, Container ,IconButton} from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import axios from "axios";
import img from "../../../../imges/room.jpg";
import { FaEye } from 'react-icons/fa';
import { Link } from '@mui/material';

interface Ad {
  _id: string;
  isActive: boolean;
  room: {
    _id: string;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    images: string[];
  };
  createdBy: {
    _id: string;
    userName: string;
  };
}

const FavoriteRoomSection = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const navigate = useNavigate(); // تعريف useNavigate

  useEffect(() => {
    const callAds = async () => {
      try {
        const response = await axios.get('https://upskilling-egypt.com:3000/api/v0/portal/ads');
        if (response.data.success) {
          setAds(response.data.data.ads);
        }
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    callAds();
  }, []);

  const handleCardClick = (adId: string) => {
    navigate(`/your-favorite?adId=${adId}`); // توجيه إلى صفحة المفضلة مع تمرير ID الإعلان
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
        Most Popular Ads
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {ads.length > 0 && (
            <Card
              sx={{
                position: "relative",
                height: 516,
                cursor: "pointer", // إضافة شكل اليد عند التحويم
                "&:hover": {
                  "& .hover-icons": { opacity: 1, transform: "translateY(0)" },
                  "& .image": { filter: "brightness(0.8)" },
                },
              }}
              onClick={() => handleCardClick(ads[0]._id)} // عند الضغط على الكارد
            >
              <CardMedia
                className="image"
                component="img"
                alt={ads[0].room.roomNumber || "Default Room"}
                image={ads[0].room.images[0] || img}
                sx={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  transition: "all 0.3s ease-in-out",
                }}
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
                ${ads[0].room.price} per night
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
                {ads[0].createdBy.userName}
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
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {ads.slice(1, 5).map((ad) => (
              <Grid item xs={6} key={ad._id}>
                <Card
                  sx={{
                    position: "relative",
                    height: 245,
                    cursor: "pointer",
                    "&:hover": {
                      "& .hover-icons": { opacity: 1, transform: "translateY(0)" },
                      "& .image": { filter: "brightness(0.8)" },
                    },
                  }}
                  onClick={() => handleCardClick(ad._id)} // عند الضغط على الكارد
                >
                  <CardMedia
                    className="image"
                    component="img"
                    alt={ad.room.roomNumber || "Default Room"}
                    image={ad.room.images[0] || img}
                    sx={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "all 0.3s ease-in-out",
                    }}
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
                    ${ad.room.price} per night
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
                    {ad.createdBy.userName}
                  </Typography>
                 
              {/*  Icon Button */}
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
                  <FaEye 
                  style={{ 
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
                onClick={
                  () => { handleCardClick(ads[0]._id); }}
                /></Link>
                </IconButton>
              </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FavoriteRoomSection;
