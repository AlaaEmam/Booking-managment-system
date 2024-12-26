import React, { useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import defaultImage from '../../../../assets/no-image.jpg';
import { axiosInstance, PORTALADS, PORTALROOMS } from './../../../../constants/URLS';
import RoomsCard from './RoomsCard';


interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  discount?: string;
  images: string[];
  Ads: Ads;
}

interface Ads {
  _id: string;
  isActive: boolean;
  room?: Room; 
}
export default function DataHomePage() {
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [ads , setAds] = React.useState<Ads[]>([]);

  const getRooms = async () => {
    try {
      const response = await axiosInstance.get(PORTALROOMS.getAllRoomsAll,{
        params: {
          size: 10 ,
          page: 1,
        },
      });
      console.log(response.data.data.rooms);
      setRooms(response.data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const getAds = async () => {
    try {
      const response = await axiosInstance.get(PORTALADS.getAds,{
        params: {
          size: 4,
          page: 1,
        },
      });
      console.log(response.data.data.ads);
      setAds(response.data.data.ads);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRooms();
    getAds();
  }, []);

  return (
  <>
      {/* ADS */}
      <Container sx={{ height: 'auto', marginBlock: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography sx={{ fontSize: '24px', color: 'var(--primary-color)', fontWeight: 'bolder' }} align="left" gutterBottom>
          Popular Choice
        </Typography>
        <Grid container spacing={4} justifyContent="left">
          {ads.filter(ad => ad.isActive).map((ad) => ( 
            <Grid item key={ad._id}>
              <RoomsCard
                _id={ad.room?._id || 'default-id'}
                title={ad.room?.roomNumber || 'No Room Number'} 
                location='Bogor, Indonesia'
                imageUrl={ad.room?.images[0] || defaultImage} 
                price={ad.room?.price ?? 0} 
                discount={ad.room?.discount ? `${ad.room.discount} Discount` : undefined} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>

    <Container  sx={{ paddingBlock: 1 ,overflow:'hidden', height:'auto' ,marginTop: 5 ,display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >      
      <Typography sx={{fontSize: '24px' , color: 'var(--primary-color)' , fontWeight: 'bolder'}} align="left" gutterBottom>
      Hotels with large living room      
      </Typography>
      <Grid container spacing={4} justifyContent="left" >
        {rooms.map((room) => (
          <Grid item key={room._id}>
            <RoomsCard
            _id={room._id}
            title={room.roomNumber}
            location="Bogor, Indonesia"
            imageUrl={room.images[0]} 
            price={room.price}
            discount={`${room.discount} Discount`} 
          />
          </Grid>
        ))}
      </Grid>
    </Container>
  </>

)
}
