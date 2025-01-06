import React, { useEffect } from 'react';
import { Grid, Container, Typography } from '@mui/material';
import defaultImage from '../../../../assets/no-image.jpg';
import { axiosInstance, FAVROOMS, PORTALADS, PORTALROOMS } from './../../../../constants/URLS';
import RoomsCard from './RoomsCard';
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


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
    centerMode: true, // Enable center mode to allow spacing
     responsive: [
    //   {
    //     breakpoint: 900, // Medium screens
    //     settings: {
    //       slidesToShow: 3,
    //       slidesToScroll: 1,
    //       centerMode: true,
    //       centerPadding: '62.5rem',

    //     },
    //   },
      {
        breakpoint: 600, // Small screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10%', // Adjust padding for small screens
        },
      },
      {
        breakpoint: 490, // Small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '10%', // Adjust padding for small screens
        },
      },
    ],
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




const navigate = useNavigate();

const isLoggedIn = () => {
  return localStorage.getItem('token') !== null; // Adjust based on your authentication method
};

const handleImageClick = async (id: string) => {
  if (!isLoggedIn()) {
    toast.error("You are not logged in. Please login first to continue your Add Favorite room step.");
    return;
  }

  try {
    const res = await axios.post(
      `https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms`,
      {
        roomId: id,
      },
      {
        headers: { Authorization: localStorage.getItem('token') },
      }
    );

    navigate("/your-favorite");
    toast.success("Great choice! The room has been added to your favorites ")
  } catch (error) {
    console.error("Error sending favorite room:", error);
  }
};

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
      <Container sx={{ height: 'auto', marginBlock: '0.625rem', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Typography sx={{ fontSize: '1.5rem', color: 'var(--primary-color)', fontWeight: 'bolder' , display: 'block'}} align="left" gutterBottom>
          Popular Choice
        </Typography>
          <div>
          <Slider {...settings}>
          {ads.filter(ad => ad.isActive).length > 0 ? (
            ads.filter(ad => ad.isActive).map((ad) => (
                <Grid key={ad._id} sx={{ padding: 1, margin: '0 0.625rem' }}>
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
      <Typography sx={{fontSize: '1.5rem' , color: 'var(--primary-color)' , fontWeight: 'bolder'}} align="left" gutterBottom>
      Hotels with large living room      
      </Typography>
      <div >
      <Slider {...settings}>
        {rooms.map((room) => (
          <Grid item key={room._id} sx={{ padding: 1, margin: '0 0.625rem' }}>
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
