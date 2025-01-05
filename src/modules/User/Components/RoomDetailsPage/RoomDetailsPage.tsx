import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Box, Typography, Grid, TextField, Paper, Rating, Container, Stack, CardMedia, Breadcrumbs } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCouch, faBath, faUtensils, faWifi, faSnowflake, faFaucet, faTv } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { axiosInstance, PORTALBOOKING, PORTALROOMS } from '../../../../constants/URLS';
import { toast } from 'react-toastify';
import defaultImage from '../../../../assets/no-image.jpg';


const RoomDetailsPage = () => {
  const { room_id } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState<any>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRoomDetails = async () => {
      setIsLoading(true);
      try {
        if (room_id) {
          const res = await axiosInstance.get(`${PORTALROOMS.getRoomDetails(room_id)}`);
          if (res.data && res.data.data) {
            setRoom(res.data.data.room);
          } else {
            setError("Room not found");
          }
        }
      } catch (error) {
        console.error("Error fetching room details: ", error);
        setError("Failed to fetch room details");
      } finally {
        setIsLoading(false);
      }
    };

    getRoomDetails();
  }, [room_id]);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setStartDate(event.target.value);
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => setEndDate(event.target.value);

  const isLoggedIn = () => {
    return localStorage.getItem('token') !== null; // Adjust based on your authentication method
  };

  const handleContinueBooking = async () => {
    if (!isLoggedIn()) {
      toast.error("You are not Login ,Please login first to continues your booking steps.");
      return;
    }
    
    if (!room) {
      toast.error("Room data is not available.");
      return;
    }

    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      toast.error("End date must be after start date.");
      return;
    }

    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    const totalPrice = differenceInDays * room.price; // حساب السعر بناءً على سعر الغرفة

    try {
      const res = await axiosInstance.post(PORTALBOOKING.createBooking, {
        startDate: startDate,
        endDate: endDate,
        room: room._id, // استخدام _id الصحيح للغرفة
        totalPrice: totalPrice, // السعر الإجمالي
      });
      toast.info("Booking created");
      navigate(`/Booking/${res.data.data.booking._id}`);
    } catch (error) {
      console.error("Error creating booking: ", error);
      toast.error("Failed to create booking");
    }
  };


  
  const handleSubmitRating = async () => {
    if (!isLoggedIn()) {
      toast.error("Please log in first.");
      return;
    }

    // Add logic for submitting rating here
    toast.info("Rating submitted!");
  };

  const handleSubmitComment = async () => {
    if (!isLoggedIn()) {
      toast.error("Please log in first.");
      return;
    }

    // Add logic for submitting comment here
    toast.info("Comment submitted!");
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
   <>
    <Container maxWidth="lg">
      <Grid  justifyContent="center" spacing={2} sx={{ my: "4rem" }}>
        <Grid item xs={12} sx={{ marginRight: "4rem"}}>
              <div role="presentation">
                <Breadcrumbs
                  aria-label="breadcrumb"
                  sx={{
                    "& .MuiBreadcrumbs-separator": { color: "var(--txt-gray)" },
                    "& a": {
                      textDecoration: "none",
                      color: "var(--txt-gray)",
                      "&:hover": { textDecoration: "underline", color: "secondary.dark" },
                    },
                  }}
                >
                  <Link color="inherit" to="/">
                    Home
                  </Link>
                  <Link color="var(--primary-color)" to="#" aria-current="page" >
                    Room Details
                  </Link>
                </Breadcrumbs>
              </div>
              <Typography sx={{ color: "var(--primary-color)", fontSize: "32px", fontWeight: 'bolder' , textAlign: 'center'}} gutterBottom>
              {room?.roomNumber}                
              </Typography>
          </Grid>
          <Grid item xs={12} key={room_id}>
            <CardMedia 
            component="img" 
            height="300" 
            
            image={room?.images[0] || defaultImage} 
            sx={{ borderRadius: "5px" }} />

          </Grid>

      </Grid>
    </Container>

    <Container>
    {/* Bottom Section: Ratings, Comments, and Form */}
    <Grid container spacing={6}>
  
        {/* left Column: FontAwesome Icons and Paragraph */}
      <Grid container item xs={12} md={8} sx={{padding: 10}}>
            <Typography sx={{lineHeight: 1.7 , color: "var(--txt-gray)", fontSize: "16x" }}>
            Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.            
            </Typography>
            <Typography sx={{ lineHeight: 1.7 , color: "var(--txt-gray)" ,fontSize: "16x" }}>
            Such trends saw the demise of the soul-infused techno that typified the original Detroit sound. Robert Hood has noted that he and Daniel Bell both realized something was missing from techno in the post-rave era.            
            </Typography>
            <Typography sx={{lineHeight: 1.7 ,  color: "var(--txt-gray)", marginBottom: "1rem", fontSize: "16x" }}>
            Design is a plan or specification for the construction of an object or system or for the implementation of an activity or process, or the result of that plan or specification in the form of a prototype, product or process. The national agency for design: enabling Singapore to use design for economic growth and to make lives better.            
            </Typography>
            <Grid>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 , color: "var(--primary-color)" }}>
                Room Facilities:
            </Typography>
            {room?.facilities && room.facilities.length > 0 ? (
                <Box
                    sx={{
                        textAlign: 'left',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
                        gap: 1, // Space between items
                    }}
                >
                    {room.facilities.map((facility: { name: string }, index: React.Key) => (
                        <Typography key={index} variant="h6" color='var(--gray-color)' sx={{ mb: 0.5 }}>
                            <span style={{ marginRight: 4, color: 'black' }}>•</span> 
                            {facility.name} {/* تأكد من أن هذا هو الشكل الصحيح للوصول إلى اسم المرفق */}
                        </Typography>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1" color='var(--gray-color)' sx={{ mb: 0.5 }}>
                    No facilities available for this room.
                </Typography>
            )}
        </Grid>
      </Grid>
      {/* Right Column: Form */}
      <Grid item xs={12} sm={4} 
      sx={{ 
        maxHeight: "500px",  
        border: "1px solid var(--light-gray)", 
        padding: "2rem" , 
        borderRadius: 3 ,
        }}>
        <Typography mb={2} sx={{fontSize: 20 , color: "var(--primary-color)" , fontWeight: 700}}>
                Start Booking
          </Typography>

          <Typography style={{ display: "flex", alignItems: "center", fontSize: "36px" }} mb={1}>
              <span style={{ color: "var(--green-btn)", marginRight: "1rem" ,fontWeight: "bold"  }}>${room?.price}</span>
              <span style={{ color: "var(--txt-gray)" , fontWeight: "lighter" }}> Per Night</span>
          </Typography>
            
          <Typography mb={5} sx={{ color: "var(--red)" , fontSize: 16 }}>
            Discount {room?.discount} % Off
          </Typography>
            
          <TextField
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            fullWidth
            variant="outlined"
            type="date"
            sx={{ marginBottom: "1.5rem", backgroundColor: "#FFF" }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            fullWidth
            variant="outlined"
            type="date"
            sx={{ marginBottom: "0.5rem", backgroundColor: "#FFF" }}
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            fullWidth
            sx={{
              width: "100%",
              py: "0.7rem",
              margin: "3rem 0",
              backgroundColor: "var(--primary-color)",
              borderRadius: 1,
              textTransform: "none",
              fontFamily: "Poppins",
              boxShadow: "0px 8px 15px 0px rgba(50, 82, 223, 0.30)",
            }}             
             onClick={handleContinueBooking}
          >
            Continue Booking
          </Button>
      </Grid>
  
    </Grid>

    {/* Bottom Section: Ratings and Comments */}
    <Box 
    sx={{ 
      border: "1px solid var(--light-gray)", 
      padding: "3rem" , 
      borderRadius: 3 ,
      }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} sx={{ borderRight: "1px solid var(--light-gray)" , paddingRight: "1rem"}}>
              <Box sx={{display: 'flex' , justifyContent: "space-between"}}>
            <Typography sx={{ marginBottom: "0.5rem" ,fontSize: "18px" ,color: "var(--primary-color)" ,fontWeight: "bold" }}>
              Rate
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  setRating(newValue);
                }
              }}
            />
              </Box>
            <TextField
              label="Message"
              multiline
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              fullWidth
              sx={{ marginTop: "1rem" }}
            />
            <Button 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: "1rem" }}
            onClick={handleSubmitRating} // Call submit rating function

            >
              Submit Rating
            </Button>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography sx={{ marginBottom: "0.5rem" ,fontSize: "18px" ,color: "var(--primary-color)",fontWeight: "bold"  }}>
          Add Your Comment
          </Typography>
            <TextField
              label="Your Comment"
              multiline
              rows={4}
              fullWidth
              sx={{ marginTop: "1rem" }}
            />
            <Button 
            variant="contained" 
            color="primary" 
            sx={{ marginTop: "1rem" }}
            onClick={handleSubmitComment} // Call submit comment function
              >
              Submit Comment
            </Button>
        </Grid>
      </Grid>
    </Box>
    </Container>
    </>
  );
};

export default RoomDetailsPage;