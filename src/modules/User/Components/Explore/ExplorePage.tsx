import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import {
  Box,
  CardMedia,
  CircularProgress,
  Container,
  Pagination,
  Typography,
} from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance, PORTALROOMS, baseURL } from "../../../../constants/URLS";
import defaultImage from '../../../../assets/no-image.jpg';

const Item = styled(Paper)(({ theme }) => ({
  boxShadow: "none",
  backgroundColor: "transparent",
  fontFamily: "Poppins",
}));

interface roomsIF {
  _id: string;
  price: number;
  roomNumber: string;
  images: string[];
}

export default function ExplorePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState<roomsIF[]>([]);
  const [totalResult, setTotalResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const params = useParams();
  const isFoundCapacity: any = params.capacity;
  const itemsPerPage = 9;

  const getAllRooms = async (page: string, size: string) => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get(`${baseURL}${PORTALROOMS.getAllRooms(page, size)}`);
      console.log("All rooms data:", res.data.data.rooms); // لعرض الداتا في الكونسول
      setRooms(res.data.data.rooms);
      setTotalResult(res.data.data.totalCount);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const fillterRoom = async (page: string, size: string) => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${baseURL}${PORTALROOMS.filterRoom(
          localStorage.getItem("startDate") || Date(),
          localStorage.getItem("endDate") || Date(),
          isFoundCapacity,
          page,
          size
        )}`
      );
      console.log("Filtered rooms data:", res.data); // لعرض الداتا في الكونسول
      setRooms(res.data.data.rooms);
      setTotalResult(res.data.data.totalCount);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFoundCapacity) {
      fillterRoom("1", `${itemsPerPage}`);
    } else {
      getAllRooms("1", `${itemsPerPage}`);
    }
  }, []);

  const totalPages = Math.ceil(totalResult / itemsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    getAllRooms(`${page}`, `${itemsPerPage}`);
  };

  const filterHandlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    fillterRoom(`${page}`, `${itemsPerPage}`);
  };

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress size="3rem" />
        </Box>
      ) : (
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid sx={{ textAlign: "center", margin: "4rem 0" }} size={{ md: 12 }}>
              <Item sx={{ position: "relative" }}>
                <Typography sx={{ mt: "3rem", color: "var(--primary-color)", fontSize: "32px", fontWeight: 'bolder' }} gutterBottom>
                  Explore ALL Rooms
                </Typography>

                <div role="presentation">
                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                      "& .MuiBreadcrumbs-separator": { color: "var(--txt-gray)" },
                      "& a": {
                        textDecoration: "none",
                        color: "var(--txt-gray)",
                        "&:hover": { textDecoration: "underline", color: "secondary.dark" },
                      },
                    }}
                  >
                    <Link color="inherit" to="/">
                      home
                    </Link>
                    <Link color="text.primary" to="#" aria-current="page">
                      explore
                    </Link>
                  </Breadcrumbs>
                </div>
              </Item>
            </Grid>

            {rooms.map((room) => (
              <Grid key={room._id} size={{ md: 4, sm: 6, xs: 12 }}>
                <Link
                  to={`/room-details/${room._id}`} // تم تعديل الباث ليشمل الـ room_id
                  onClick={() => console.log(`Room ID: ${room._id}`)} // لإظهار الـ room_id عند الضغط
                >
                  <Item sx={{ position: "relative", mb: "1rem" }}>
                    <CardMedia
                      sx={{
                        height: 250,
                        borderRadius: "15px",
                        border: "0.5px solid rgba(140, 140, 140, 0.14)",
                        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      }}
                      image={room.images[0] || defaultImage}
                      component="img"
                      title="Room Image"
                    />
                    <Box
                      sx={{
                        borderRadius: "0 15px 0 15px",
                        bgcolor: "#FF498B",
                        display: "inline-block",
                        color: "#fff",
                        padding: "0.5rem 2rem",
                        position: "absolute",
                        right: "0",
                        top: "0",
                      }}
                    >
                      ${room?.price} per night
                    </Box>
                    <Box
                      sx={{
                        fontSize: "1.4rem",
                        color: "#fff",
                        padding: "0.5rem 2rem",
                        position: "absolute",
                        left: "0",
                        bottom: "15px",
                      }}
                    >
                      {room.roomNumber}
                    </Box>
                  </Item>
                </Link>
              </Grid>
            ))}

            <Grid size={{ md: 12 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                size="large"
                onChange={isFoundCapacity ? filterHandlePageChange : handlePageChange}
                variant="outlined"
                shape="rounded"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 8,
                  textAlign: "center",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
