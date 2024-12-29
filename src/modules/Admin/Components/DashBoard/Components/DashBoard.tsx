import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import {
  ADMINADDS,
  ADMINBOOKING,
  ADMINROOMFACILITIES,
  ADMINROOMS,
  axiosInstance,
  PORTALROOMS,
} from "../../../../../constants/URLS";
import { useEffect, useState } from "react";
import BedIcon from "@mui/icons-material/Bed";
import Chart from "../../Chart/Components/Chart";
import UsersChart from "../../UsersChart/component/UsersChart";
import shadows from "@mui/material/styles/shadows";

export default function DashBoard() {
  interface RoomList {
    totalCount: number;
    // other properties
  }

  interface FacilitiesList {
    totalCount: number;
    // other properties
  }

  interface AdsList {
    totalCount: number;
    // other properties
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "rgb(26, 27, 30)",
    ...theme.typography.body2,
    textAlign: "start",
    padding: theme.spacing(2),
    color: theme.palette.common.white,
  }));

  let [getRoomslist, setRoomsList] = useState<RoomList>();
  let [getRoomFacilitieslist, setRoomFacilitiesList] =
    useState<FacilitiesList>();
  let [getAdslist, setAdsList] = useState<AdsList>();

  const [getBookinglist, setBookingList] = useState();

  let getRooms = async () => {
    let response = await axiosInstance.get(ADMINROOMS.getAllRooms);
    let responsePortal = await axiosInstance.get(PORTALROOMS.getAllRooms);

    console.log(response.data.data);
    console.log(responsePortal.data.data);
    setRoomsList(response.data.data);
  };
  let getBooking = async () => {
    let response = await axiosInstance.get(ADMINBOOKING.getAllBooking);
    console.log(response.data.data);

    setBookingList(response.data.data);
  };

  let getFacilities = async () => {
    let response = await axiosInstance.get(
      ADMINROOMFACILITIES.getRoomFacilities
    );
    console.log(response.data.data);

    setRoomFacilitiesList(response.data.data);
  };

  let getAds = async () => {
    let response = await axiosInstance.get(ADMINADDS.getAdds);
    console.log(response.data.data);

    setAdsList(response.data.data);
  };

  const totalRoomCount = getRoomslist?.totalCount || 0;
  const totalFacilities = getRoomFacilitieslist?.totalCount || 0;
  const totalAds = getAdslist?.totalCount || 0;

  useEffect(() => {
    getRooms();
    getFacilities();
    getAds();
    getBooking();
  }, []);
  return (
    <>
      <Box
        sx={{
          height: "60vh", // Full viewport height
          display: "flex",
          justifyContent: "center",
          backgroundImage: `url("/NOt")`, // Replace with your image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "black",
          textAlign: "center",
        }}
      >
        <Grid container sx={{ justifyContent:"center"}} spacing={3}>
          <Grid item xs={4}>
            <Item sx={{padding:"3rem 2rem" ,display: "flex", justifyContent: "space-between",margin:"3rem 0",borderRadius:"15px" }}>
              <Typography variant="h4" >
                {totalRoomCount}
                <Typography>Rooms</Typography>
              </Typography>
              <BedIcon sx={{ color: "rgb(144, 191, 222)", fontSize: 40 }} />
            </Item>
          </Grid>
          <Grid item xs={4}>
          <Item sx={{padding:"3rem 2rem" ,display: "flex", justifyContent: "space-between",margin:"3rem 0",borderRadius:"15px" }}>
          <Typography variant="h4">
                {totalFacilities}
                <Typography>Facilities</Typography>
              </Typography>
              <BedIcon sx={{ color: "rgb(144, 191, 222)", fontSize: 40 }} />
            </Item>
          </Grid>
          <Grid item xs={4}>
          <Item sx={{padding:"3rem 2rem" ,display: "flex", justifyContent: "space-between",margin:"3rem 0",borderRadius:"15px" }}>
          <Typography variant="h4" >
                {totalAds}
                <Typography>Ads</Typography>
              </Typography>
              <BedIcon sx={{ color: "rgb(144, 191, 222)", fontSize: 40 }} />
            </Item>
          </Grid>
          <Grid item xs={6}>
          <Item sx={{ backgroundColor:"transparent" ,boxShadow:"none"}}>              <Chart />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ backgroundColor:"transparent" ,boxShadow:"none"}}>
              <UsersChart />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
