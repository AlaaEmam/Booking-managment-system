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
  
  
  let [getRoomsTotalCount, setRoomsTotalCount]=useState(0);
  let [getRoomFacilitiesTotalCount, setRoomFacilitiesTotalCount]=useState(0);
  let [getAdsTotalCount, setAdsList]=useState(0);

  const [getBookinglist, setBookingList]=useState([]);
  

  let getRooms= async()=>{
    let response= await axiosInstance.get(ADMINROOMS.getAllRooms);
    let responsePortal= await axiosInstance.get(PORTALROOMS.getAllRooms);

    console.log(response.data.data);
    console.log(responsePortal.data.data)
    setRoomsTotalCount(response.data.data?.totalCount);
    
  }
  let getBooking=async()=>{
    let response=await axiosInstance.get(ADMINBOOKING.getAllBooking);
    console.log(response.data.data);

   
    
  }

  let getFacilities=async()=>{
    let response=await axiosInstance.get(ADMINROOMFACILITIES.getRoomFacilities);
    console.log(response.data.data);

    setRoomFacilitiesTotalCount(response.data.data?.totalCount);

  }

  let getAds=async()=>{
    let response=await axiosInstance.get(ADMINADDS.getAdds);
    console.log(response.data.data);

    setAdsList(response.data.data.totalCount);

  }


  const totalRoomCount=getRoomsTotalCount;
  const totalFacilities=getRoomFacilitiesTotalCount;
  const totalAds=getAdsTotalCount;
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
