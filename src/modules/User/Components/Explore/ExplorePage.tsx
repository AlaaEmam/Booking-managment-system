import React, { useState } from "react";
import { useEffect } from "react";
import {
  axiosInstance,
  baseURL,
  PORTALROOMS,
} from "../../../../constants/URLS";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Box, CardMedia, Container, Pagination, Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: "#fff",
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: "center",
  // color: theme.palette.text.secondary,
  //   ...theme.applyStyles("dark", {
  //    backgroundColor: "#1A2027",
  //  }),
  boxShadow: "none",
}));

interface roomsIF {
  _id: string;
  price: number;
  roomNumber: string;
  images: string[];
}

export default function ExplorePage() {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const params = useParams();
  const isFoundCapacity: any = params.capacity;
  //const [roomView, setroomView] = React.useState<rooms_IF>();

  const [rooms, setRooms] = useState<roomsIF[]>([
    {
      _id: "0;",
      price: 0,
      roomNumber: "1",
      images: [],
    },
  ]);
const [totalResult, settotalResult] = useState(0)
  //Pagination

  const productsPerPage = 5; // Number of products per page
  const getAllRooms = async (page:string,size:string) => {
      try {
        const res = await axios.get(
          `${baseURL}${PORTALROOMS.getAllRooms(`${page}`, `${size}`)}`
        );
        console.log(res.data.data.rooms);
        setRooms(res.data.data.rooms);
        settotalResult(res?.data.data.totalCount);

      } catch (error: any) {
        toast.error(error.message);
      }
    };

  useEffect(() => {

    const fillterRoom = async () => {
      try {
        const res = await axios.get(
          `${baseURL}${PORTALROOMS.filterRoom(
            localStorage.getItem("startDate") || Date(),
            localStorage.getItem("endDate") || Date(),
            isFoundCapacity
          )}`
        );
        console.log("filter", res.data.data.rooms);
        setRooms(res.data.data.rooms);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    if (isFoundCapacity) {
      fillterRoom();
    } else {
      getAllRooms("1",`${itemsPerPage}`);
    }
  }, []);

//pagination

const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 12;

const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
  setCurrentPage(page);
  getAllRooms(`${page}`,`${itemsPerPage}`)
};

const totalPages = Math.ceil(totalResult / itemsPerPage);
const paginatedRooms = rooms.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            sx={{ textAlign: "center", margin: "4rem 0" }}
            size={{ md: 12 }}
          >
            <Item sx={{ position: "relative" }}>
              <Typography variant="h3" sx={{ m: 2 }} gutterBottom>
                Explore ALL Rooms
              </Typography>

              <div role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" color="inherit" href="/">
                    MUI
                  </Link>
                  <Link
                    underline="hover"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                  >
                    Core
                  </Link>
                  <Link
                    underline="hover"
                    color="text.primary"
                    href="/material-ui/react-breadcrumbs/"
                    aria-current="page"
                  >
                    Breadcrumbs
                  </Link>
                </Breadcrumbs>
              </div>
            </Item>
          </Grid>
          {rooms.map((room) => (
            <Grid key={room._id} size={{ md: 4, sm: 6, xs: 16 }}>
              <Item sx={{ position: "relative" }}>
                <CardMedia
                  sx={{ height: 250, borderRadius: "15px" }}
                  image={room.images[0]}
                  component="img"
                  title="green iguana"
                />
                <Box
                  sx={{
                    borderRadius: "  0 15px 0 15px",
                    bgcolor: "#FF498B",
                    display: "inline-block",
                    color: "#fff",
                    padding: "0.5rem 2rem",
                    position: "absolute",
                    right: "0",
                    top: "0",
                  }}
                >
                  $ {room?.price} per night
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
            </Grid>
          ))}
        </Grid>
      </Container>
<Box sx={{display:"flex",justifyContent:"center"}}>

</Box>
<Pagination
        count={totalPages}
        page={currentPage}
        size="large"
        onChange={handlePageChange}
        sx={{display:"flex",justifyContent:"center", marginTop:8,textAlign:"center" }}
      />
    </>
  );
}
