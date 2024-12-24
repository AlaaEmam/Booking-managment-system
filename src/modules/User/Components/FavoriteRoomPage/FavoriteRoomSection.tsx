import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, Box, Typography, Container } from "@mui/material";
import { Favorite, Visibility } from "@mui/icons-material";
import { ADMINADDS, axiosInstance } from "../../../../constants/URLS";
import img from "../../../../imges/room.jpg";
import axios from "axios";

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

  return (
    <Container>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          textAlign: "left", // محاذاة النص لليسار
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
                "&:hover": {
                  "& .hover-icons": { opacity: 1, transform: "translateY(0)" },
                  "& .image": { filter: "brightness(0.8)" },
                },
              }}
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

        {/* الصور الصغيرة */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {ads.slice(1, 5).map((ad) => (
              <Grid item xs={6} key={ad._id}>
                <Card
                  sx={{
                    position: "relative",
                    height: 245,
                    "&:hover": {
                      "& .hover-icons": { opacity: 1, transform: "translateY(0)" },
                      "& .image": { filter: "brightness(0.8)" },
                    },
                  }}
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
        </Grid>
      </Grid>
    </Container>
  );
};

export default FavoriteRoomSection;
