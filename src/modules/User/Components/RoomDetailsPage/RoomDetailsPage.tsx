import React, { useEffect, useState } from 'react'
import bookingImg from "../../../../assets/bookingRoom.jpg";
import { ADMINBOOKING, ADMINROOMS, axiosInstance, PORTALBOOKING, PORTALROOMREVIEW, PORTALROOMS } from '../../../../constants/URLS';
import { Box, Button, Card, Divider, FormControl, Grid, Grid2, ImageListItem, Paper, Rating, Stack, styled, TextField, Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import KingBedOutlinedIcon from '@mui/icons-material/KingBedOutlined';
import WifiIcon from '@mui/icons-material/Wifi';
import LivingOutlinedIcon from '@mui/icons-material/LivingOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import KitchenIcon from '@mui/icons-material/Kitchen';
import DinnerDiningOutlinedIcon from '@mui/icons-material/DinnerDiningOutlined';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import TvIcon from '@mui/icons-material/Tv';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { Rate } from './Rate';
import { Comments } from './Comments';
interface rooms_IF {
  _id: number;
  roomNumber: String;
  price: number;
  capacity: String;
  discount: number;
  images: string[];
  facilities: string[];
}
export default function RoomDetailsPage() {
  const params =useParams();
  const [rooms, setRooms]=React.useState<rooms_IF[]>([]);
  
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  
  const [value, setValue] = React.useState<number | null>(0);
  const {register:registerDate, handleSubmit:handleSubmitDate, formState: { errors:errorDate },}=useForm();
  const {register:registerRate, handleSubmit:handleSubmitRate , formState: { errors:errorRate },}=useForm();
  const {register:registerComment, handleSubmit:handleSubmitComment , formState: { errors:errorComment },}=useForm();
  
  const [roomDetails, setRoomDetails]=useState<rooms_IF[]>([])

  const room_id=params.room_id;

  const handleStartDateChange = (newStartDate: Dayjs | null ) => {
    setStartDate(newStartDate);
    if (endDate && newStartDate && newStartDate > endDate) {
      setEndDate(null);  // Clear end date if it's earlier than start date
    }
  };

  const handleEndDateChange = (newEndDate: Dayjs | null) => {
    setEndDate(newEndDate);
  };


  const getRoomsList = async () => {
    try {
      const res = await axiosInstance.get(PORTALROOMS.getAllRoomsAll)
  
      console.log(res.data.data.rooms);
      // console.log(res?.data?.data?.rooms[0]._id);
      setRooms(res?.data?.data.rooms[2]);
     } catch (error) {
      console.log(error)
    }

  };

  const getRoomDetails=async()=>{
    try{
      const res=await axiosInstance.get(PORTALROOMS.getRoomDetails(room_id))
      console.log(res.data.data.room);
      setRoomDetails(res.data.data.room);
    }catch(error){
      console.log(error)
    }
  }


  
  const onSubmitDate=async()=>{
    try{
      await axiosInstance.post(PORTALBOOKING.createBooking)
    }catch(error){
      toast.error("Please put your dates properly")
    }
  }

  const onSubmitRate=async()=>{
    try{
      const res= await axiosInstance.post(PORTALROOMREVIEW.createReview);
      toast.success("successfully");
    }catch(error){
      console.log(error);
    }
  }
  
  const onSubmitComment=async()=>{
    try{
      const res= await axiosInstance.post(PORTALROOMREVIEW.createReview);
      toast.success("successfully");
    }catch(error){
      console.log(error);
    }
  }


  const Item = styled(Card)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.common.black,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));
  
    
    
  useEffect(()=>{
    getRoomsList();
    getRoomDetails()
  },[]);
  
  return (
    <Box sx={{  width: '100%', marginTop:5 }}>
      
      <Stack sx={{color:"rgb(1, 7, 120)", justifyContent:'center', alignItems:"center"}}>
        <Typography variant='h4'>Village Angga</Typography>
        <Typography color='success' variant='subtitle1'>Bogor, Indonesia</Typography>
      </Stack>

      <Stack direction={'row'} sx={{justifyContent:'center', alignItems:"center"}} spacing={1}>
        <img width={500} style={{borderRadius:10}} height={500} src={roomDetails.images} alt="" />
        <Stack direction={'column'} spacing={1}>
          <ImageList sx={{ width: 300, height: 500 }}  cols={1} rowHeight={164}>
            <ImageListItem sx={{borderRadius:10}}>
              
              <img
              style={{borderRadius:10}}
              src={bookingImg}
              alt="room"
              loading="lazy"
              />

            </ImageListItem>

            <ImageListItem sx={{borderRadius:10}}>
             
             <img
             style={{borderRadius:10}}
             src={bookingImg}
             alt="room"
             loading="lazy"/>

            </ImageListItem>
          </ImageList>
          
        </Stack>
      </Stack>

      <Stack sx={{justifyContent:'center', marginTop:5,
        alignItems:"center"}} direction={'row'}>
        <Box sx={{  width: '40%'}}>
          <Typography gutterBottom variant='subtitle1'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged.
          </Typography>
          <Typography gutterBottom variant='subtitle1'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged.
          </Typography>
          <Typography gutterBottom sx={{marginBottom:5}} variant='subtitle1'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, 
          but also the leap into electronic typesetting, remaining essentially unchanged.
          </Typography>
          
          <Grid container sx={{marginLeft:10}} spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 8 }}>
            <Grid item xs={2}>
              
              <KingBedOutlinedIcon fontSize='large'/>
              <Typography>5 bedrooms</Typography>
            </Grid>

            <Grid  item xs={2}>
              <LivingOutlinedIcon fontSize='large'/>
              
              <Typography>1 living room</Typography>
            </Grid>

            <Grid  item xs={2}>
            <BathtubOutlinedIcon fontSize='large'/>

              <Typography>3 bathroom</Typography>              
            </Grid>

            <Grid item xs={2}>
              <DinnerDiningOutlinedIcon fontSize='large'/>
              
              <Typography>1 dining room</Typography>
            </Grid>
            
            <Grid item xs={2}>
              <WifiIcon fontSize='large'/>
              
              <Typography>10 mpb/s</Typography>
            </Grid>
            <Grid item xs={2}>
              <AdUnitsIcon fontSize='large'/>
              
              <Typography>7 unit ready</Typography>
            </Grid>
            <Grid xs={2}>
              <KitchenIcon fontSize='large'/>
              
              <Typography>2 refigrator</Typography>
            </Grid>
            <Grid xs={2}>
              <TvIcon fontSize='large'/>
              
              <Typography>4 television</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box component={'form'}
          onSubmit={handleSubmitDate(onSubmitDate)}
          sx={{ border:2, borderRadius:2, 
          borderColor:"rgb(151, 151, 151)",  
          width: '40%', padding:5, marginBottom:30}}>

          <Typography variant='h5'>Start booking</Typography>
          <Typography variant='h3'>${(roomDetails?.price-roomDetails?.discount)} per night</Typography>
          <Typography color='error' variant='subtitle1'>Discount {Math.floor((roomDetails?.discount/roomDetails?.price)* 100)}%</Typography>
          
          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{marginTop:2}}
            label="Start Date"
            value={startDate}
            {...registerDate("startDate",{
              required:"please select your date"
            })}
            onChange={handleStartDateChange}
          />
          <Box>

            <DatePicker
              sx={{marginTop:2}}
              label="End Date"
              value={endDate}
              disabled={!startDate}
              {...registerDate("endDate",{
                required:"please select your date"
              })}
              onChange={handleEndDateChange}
              minDate={startDate}
            />
          </Box>
          </LocalizationProvider>
          <Typography sx={{marginTop:2}}>You wil pay $480 per 2 persons</Typography>
          <Button sx={{ marginTop:2, color:'white', paddingX:10,
                backgroundColor:'rgb(50, 82, 223)'}}>Continue Book</Button>
        </Box>
      </Stack>

          

      <Stack sx={{justifyContent:'center', 
        alignItems:"center", marginTop:10}} 
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        direction={'row'}
      >
        {/* <Rate onSubmitRate={onSubmitRate}/> */}

        <Box sx={{  width: '30%'}}
          component="form" 
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitRate(onSubmitRate)}
        >
          <Stack spacing={10} direction={'row'} sx={{marginBottom:5, justifyContent:'space-between'}}>
            
            <Typography  variant='h5'>
            
              Rate 
            </Typography>
            <FormControl {...registerRate("rate",{
              required:"please rate this room"
            })}
            error={!!errorRate.rate}
            >

              <Rating 
                value={value}
                
                onChange={(event, newValue) => {
                  setValue(newValue);
                    
                }}/>
            
            </FormControl>
          </Stack>
          
          <Typography variant='h5' sx={{marginBottom:2}}>
            Message
          </Typography>
          
          <TextField sx={{width:'90%'}} multiline
          rows={6} {...registerRate("review", {
            required:"Please put your review before submitting"
          })}
          error={!!errorRate.review}/>
          
          
          <Button sx={{marginTop:5, paddingX:10, color:'white', backgroundColor:'rgb(50, 82, 223)'}}>Rate</Button>
          
        
        </Box>

        {/* <Comments onSubmitComment={onSubmitComment}/> */}
        <Box
          component="form" 
          noValidate
          autoComplete="off"  
          sx={{  width: '30%', paddingLeft:5}}
          
          onSubmit={handleSubmitComment(onSubmitComment)}
          >
          <Stack {...registerComment(`${room_id}`,{
            required:"Please put your comment here"
          })}>
            <Typography variant='h5'>
              Add your comment
            </Typography>

            <TextField 
            sx={{width:'100%', marginTop:10}} 
            multiline rows={6}
            {...registerComment("comment",{
              required:"Please put your comment here"
            })}
            error={!!errorComment.comment}
            />
            <Box sx={{marginTop:5, textAlign:'right'}}>
              <Button sx={{ color:'white', paddingX:10,
                backgroundColor:'rgb(50, 82, 223)'}}>Send</Button>

            </Box>
          </Stack>
        </Box>
      </Stack>
      </Box>


  )
}

