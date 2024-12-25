import React, { useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import imageUrl from '../../../../assets/1.png';
import { axiosInstance, PORTALROOMS } from './../../../../constants/URLS';
import RoomsCard from './RoomsCard';


interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  discount?: string;
  images: string[];
}
export default function DataHomePage() {
  const [rooms, setRooms] = React.useState<Room[]>([]);

  const getRooms = async () => {
    try {
      const response = await axiosInstance.get(PORTALROOMS.getAllRooms,{
        params: {
          size: 4 ,
          page: 1,
        },
      });
      console.log(response.data.data.rooms);
      setRooms(response.data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  return (
  <>
    <Container  sx={{height:'330px' ,marginBlock: '20px' ,display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
      <Typography sx={{fontSize: '24px' , color: 'var(--primary-color)' , fontWeight: 'bolder'}} align="left" gutterBottom>
        Houses with Beautiful Backyard
      </Typography>
      <Grid container spacing={2} justifyContent="left" >
        {rooms.map((room) => (
          <Grid item key={room._id}>
            <RoomsCard
              title={room.roomNumber}
              location='Bogor, Indonesia' 
              imageUrl={room.images[0]} 
              price={room.price} 
              discount={`${room.discount} Discount`}
            />
          </Grid>
        ))}
      </Grid>
    </Container>

    <Container  sx={{height:'330px' ,marginBlock: '20px' ,marginTop: 10 ,display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>      
      <Typography sx={{fontSize: '24px' , color: 'var(--primary-color)' , fontWeight: 'bolder'}} align="left" gutterBottom>
      Hotels with large living room      
      </Typography>
      <Grid container spacing={2} justifyContent="left" >
        {rooms.map((room) => (
          <Grid item key={room._id}>
            <RoomsCard
              title={room.roomNumber}
              location='Bogor, Indonesia' // Assuming the location is Kigali
              imageUrl={room.images[0]} // Assuming the first image is the main one
              price={room.price} // Example condition for popularity
              discount={`${room.discount} Discount`} // Example condition for popularity
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  </>

)
}
