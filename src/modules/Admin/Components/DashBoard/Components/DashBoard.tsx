import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import { axiosInstance, ADMINROOMS, ADMINROOMFACILITIES, ADMINADS, ADMINBOOKING } from "../../../../../constants/URLS";
import BookingChart from "./BookingChart";
import UsersChart from "./UsersChart";
import DashboardCrad from "./DashboardCrad";
import HomeIcon from "@mui/icons-material/Home"; // Icon for Rooms
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter"; // Icon for Facilities
import CampaignIcon from '@mui/icons-material/Campaign'; // Correct icon for Advertisement

export default function DashBoard() {
  interface RoomList {
    totalCount: number;
  }

  interface FacilitiesList {
    totalCount: number;
  }

  interface AdsList {
    totalCount: number;
  }

  const [getRoomslist, setRoomsList] = useState<RoomList>();
  const [getRoomFacilitieslist, setRoomFacilitiesList] = useState<FacilitiesList>();
  const [getAdslist, setAdsList] = useState<AdsList>();
  const [getBookinglist, setBookingList] = useState();
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const getRooms = async () => {
    let response = await axiosInstance.get(ADMINROOMS.getAllRooms);
    setRoomsList(response.data.data);
  };

  const getBooking = async () => {
    let response = await axiosInstance.get(ADMINBOOKING.getAllBooking);
    setBookingList(response.data.data);
  };

  const getFacilities = async () => {
    let response = await axiosInstance.get(ADMINROOMFACILITIES.getRoomFacilities);
    setRoomFacilitiesList(response.data.data);
  };

  const getAds = async () => {
    let response = await axiosInstance.get(ADMINADS.getAds);
    setAdsList(response.data.data);
  };

  const totalRoomCount = getRoomslist?.totalCount || 0;
  const totalFacilities = getRoomFacilitieslist?.totalCount || 0;
  const totalAds = getAdslist?.totalCount || 0;

  useEffect(() => {
    setIsLoading(true); // Set loading to true when data fetching starts
    Promise.all([getRooms(), getFacilities(), getAds(), getBooking()])
      .then(() => setIsLoading(false)) // Set loading to false once all data is fetched
      .catch(() => setIsLoading(false)); // Handle errors and stop loading
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "60vh", // Full viewport height
        display: "flex",
        justifyContent: "center",
        backgroundImage: `url("/NOt")`, // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black",
        textAlign: "left",
      }}
    >
      <Grid container sx={{ justifyContent: "center" }} spacing={3}>
        {/* Card for Rooms */}
        <Grid item xs={12} sm={4}>
          <DashboardCrad
            count={totalRoomCount}
            label="Rooms"
            iconColor="rgb(144, 191, 222)"
            Icon={HomeIcon} // Using HomeIcon
          />
        </Grid>

        {/* Card for Facilities */}
        <Grid item xs={12} sm={4}>
          <DashboardCrad
            count={totalFacilities}
            label="Facilities"
            iconColor="rgb(144, 191, 222)"
            Icon={FitnessCenterIcon} // Using FitnessCenterIcon
          />
        </Grid>

        {/* Card for Ads */}
        <Grid item xs={12} sm={4}>
          <DashboardCrad
            count={totalAds}
            label="Ads"
            iconColor="rgb(144, 191, 222)"
            Icon={CampaignIcon} // Using CampaignIcon
          />
        </Grid>

        {/* Chart */}
        <Grid item xs={12} sm={6}>
          <BookingChart />
        </Grid>

        {/* Users Chart */}
        <Grid item xs={12} sm={6}>
          <UsersChart />
        </Grid>
      </Grid>
    </Box>
  );
}
