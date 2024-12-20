import { Box, Grid, Paper, styled, Typography } from "@mui/material";
import { ADMINADDS, ADMINBOOKING, ADMINROOMFACILITIES, ADMINROOMS, axiosInstance, PORTALROOMS } from "../../../../../constants/URLS";
import { useEffect, useState } from "react";
import BedIcon from '@mui/icons-material/Bed';
export default function DashBoard() {
  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'rgb(26, 27, 30)',
    ...theme.typography.body2,
    textAlign:"start",
    padding: theme.spacing(2),
    color: theme.palette.common.white,
    
  }));
  
  
  let [getRoomslist, setRoomsList]=useState([]);
  let [getRoomFacilitieslist, setRoomFacilitiesList]=useState([]);
  let [getAdslist, setAdsList]=useState([]);

  const [getBookinglist, setBookingList]=useState([]);
  

  let getRooms= async()=>{
    let response= await axiosInstance.get(ADMINROOMS.getAllRooms);
    let responsePortal= await axiosInstance.get(PORTALROOMS.getAllRooms);

    console.log(response.data.data);
    console.log(responsePortal.data.data)
    setRoomsList(response.data.data);
    
  }
  let getBooking=async()=>{
    let response=await axiosInstance.get(ADMINBOOKING.getAllBooking);
    console.log(response.data.data);

    setBookingList(response.data.data);
    
  }

  let getFacilities=async()=>{
    let response=await axiosInstance.get(ADMINROOMFACILITIES.getRoomFacilities);
    console.log(response.data.data);

    setRoomFacilitiesList(response.data.data);

  }

  let getAds=async()=>{
    let response=await axiosInstance.get(ADMINADDS.getAdds);
    console.log(response.data.data);

    setAdsList(response.data.data);

  }


  const totalRoomCount=getRoomslist?.totalCount;
  const totalFacilities=getRoomFacilitieslist?.totalCount;
  const totalAds=getAdslist?.totalCount;
  useEffect(()=>{
    getRooms();
    getFacilities();
    getAds();
  },[])
  return (
    <Box
      sx={{
        height: "50vh", // Full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("/NOt")`, // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black",
        textAlign: "center",
      }}
    >
      <Grid container sx={{justifyContent:"center"}} spacing={10} >
        <Grid item xs={3} >
          <Item sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography variant="h4">
              {totalRoomCount }
              <Typography>
                Rooms
              </Typography>
            </Typography>
            <BedIcon sx={{color:'rgb(144, 191, 222)', fontSize:40}}/>
          </Item>

        </Grid>
        <Grid item xs={3}>
          <Item sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography variant="h4">
              { totalFacilities }
              <Typography>
                Facilities
              </Typography>
            </Typography>
            <BedIcon sx={{color:'rgb(144, 191, 222)', fontSize:40}}/>
          </Item>

        </Grid>
        <Grid item xs={3}>
          <Item sx={{display:"flex", justifyContent:"space-between"}}>
            <Typography variant="h4">
              { totalAds }
              <Typography>
                Ads
              </Typography>
            </Typography>
            <BedIcon sx={{color:'rgb(144, 191, 222)', fontSize:40}}/>
          </Item>

        </Grid>
      </Grid>
      
      
    </Box>
  );
}
