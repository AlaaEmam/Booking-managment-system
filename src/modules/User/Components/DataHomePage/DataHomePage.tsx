import React, { useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import defaultImage from '../../../../assets/no-image.jpg';
import { axiosInstance, FAVROOMS, PORTALADS, PORTALROOMS } from './../../../../constants/URLS';
import RoomsCard from './RoomsCard';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';


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
  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [rooms, setRooms] = React.useState<Room[]>([]);
  const [ads , setAds] = React.useState<Ads[]>([]);

  const getRooms = async () => {
    try {
      const response = await axiosInstance.get(PORTALROOMS.getAllRoomsAll);
      console.log(response.data.data.rooms);
      setRooms(response.data.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const getAds = async () => {
    try {
        const response = await axiosInstance.get(PORTALADS.getAds);
        console.log(response.data.data.ads);
        setAds(response.data.data.ads);
    } catch (error) {
      console.log(error);
    }
};



const handleImageClick = async (id: string) => {
  try {
    await axiosInstance.post(FAVROOMS.getAddDetailsFAVROOMS, {
      roomId: id,
    });
    navigate("/your-favorite");
  } catch (error) {
    console.error("Error sending favorite room:", error);
  }
};
const navigate = useNavigate();

const handleViewClick = (id: string) => {
  navigate(`/room-details/${id}`);
};

  useEffect(() => {
    getRooms();
    getAds();
  }, []);

  return (
  <>
      {/* ADS */}
      <Container sx={{ height: 'auto', marginBlock: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography sx={{ fontSize: '24px', color: 'var(--primary-color)', fontWeight: 'bolder' , display: 'block'}} align="left" gutterBottom>
          Popular Choice
        </Typography>
          <div>
          <Slider {...settings}>
          {ads.filter(ad => ad.isActive).length > 0 ? (
            ads.filter(ad => ad.isActive).map((ad) => (
                <Grid key={ad._id}>
                    <RoomsCard
                        _id={ad.room?._id || 'default-id'}
                        title={ad.room?.roomNumber || 'No Room Number'}
                        location='Bogor, Indonesia'
                        imageUrl={ad.room?.images[0] || defaultImage}
                        price={ad.room?.price ?? 0}
                        discount={ad.room?.discount ? `${ad.room.discount} Discount` : undefined}
                        onView={handleViewClick}
                        onFavorite={handleImageClick}
                    />
                </Grid>
            ))
        ) : (
            <Typography>No active ads available.</Typography>
        )}
          </Slider>
          </div>
      </Container>

    <Container  sx={{ paddingBlock: 1 ,overflow:'hidden', height:'auto' ,marginTop: 5 ,display: 'flex', flexDirection: 'column', justifyContent: 'center'}} >      
      <Typography sx={{fontSize: '24px' , color: 'var(--primary-color)' , fontWeight: 'bolder'}} align="left" gutterBottom>
      Hotels with large living room      
      </Typography>
      <div >
      <Slider {...settings}>
        {rooms.map((room) => (
          <Grid item key={room._id}>
          <RoomsCard
              _id={room?._id || 'default-id'}
              title={room?.roomNumber || 'No Room Number'}
              location='Bogor, Indonesia'
              imageUrl={room?.images[0] || defaultImage}
              price={room?.price ?? 0}
              discount={room?.discount ? `${room.discount} Discount` : undefined}
              onView={handleViewClick}
              onFavorite={handleImageClick}
          />
          </Grid>
        ))}
        </Slider>
      </div>
    </Container>

  </>

)
}
