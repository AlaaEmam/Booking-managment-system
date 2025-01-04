import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Box, Typography, Grid, TextField, Paper, Rating } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCouch, faBath, faUtensils, faWifi, faSnowflake, faFaucet, faTv } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosInstance, PORTALBOOKING, PORTALROOMS } from '../../../../constants/URLS';
import { toast } from 'react-toastify';

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

  const handleContinueBooking = async () => {
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
    <Box sx={{ padding: "3rem", backgroundColor: "#F5F5F5" }}>
      {/* Top Section: Room Name and Image */}
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
        <Typography variant="h3" sx={{ fontWeight: "bold", color: "#0288D1", fontSize: "2.5rem" }}>
          {room?.roomNumber}
        </Typography>
        <img
          src={room?.images[0] || "https://via.placeholder.com/400 "}  // Replace with default image if room image is unavailable
          alt="Room"
          style={{ width: "50%", height: "auto", marginTop: "1rem", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
        />
      </Box>

      {/* Bottom Section: Ratings, Comments, and Form */}
      <Grid container spacing={4} sx={{ marginTop: "2rem" }}>
        {/* Left Column: Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "10px", backgroundColor: "#FFFFFF", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#0288D1", marginBottom: "1rem" }}>
              Room Booking Form
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
              sx={{ marginBottom: "1.5rem", backgroundColor: "#FFF" }}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: "1rem", backgroundColor: "#0288D1", padding: "0.8rem", borderRadius: "8px" }}
              onClick={handleContinueBooking}
            >
              Continue Booking
            </Button>
          </Paper>
        </Grid>

        {/* Right Column: FontAwesome Icons and Paragraph */}
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: "2rem", backgroundColor: "#FFFFFF", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
            <Typography variant="body1" sx={{ color: "#757575", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
              Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.
            </Typography>

            {/* FontAwesome Icons with Names */}
            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between" }}>
              <Box sx={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faBed} size="lg" color="#0288D1" />
                <Typography variant="body2" sx={{ color: "#0288D1", marginTop: "0.5rem" }}>5 Bedroom</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faCouch} size="lg" color="#0288D1" />
                <Typography variant="body2" sx={{ color: "#0288D1", marginTop: "0.5rem" }}>1 Living Room</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faBath} size="lg" color="#0288D1" />
                <Typography variant="body2" sx={{ color: "#0288D1", marginTop: "0.5rem" }}>3 Bathroom</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faUtensils} size="lg" color="#0288D1" />
                <Typography variant="body2" sx={{ color: "#0288D1", marginTop: "0.5rem" }}>1 Dining Room</Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "space-between", marginTop: "1rem" }}>
              <Box sx={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faWifi} size="lg" color="#0288 D1" />
                <Typography variant="body2" sx={{ color: "#0288D1", marginTop: "0.5rem" }}>10 Mbps</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faSnowflake} size="lg" color="#0288D1" />
                <Typography variant="body2" sx={{ color: "#0288D1", marginTop: "0.5rem" }}>7 Unit Ready</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faFaucet} size="lg" color="#0288D1" />
                <Typography variant="body2" sx={{ color: "#0288D1", marginTop: "0.5rem" }}>2 Refrigerator</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <FontAwesomeIcon icon={faTv} size="lg" color="#0288D1" />
                <Typography variant="body2" sx={{ color: "#0288D1", marginTop: "0.5rem" }}>4 Television</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom Section: Ratings and Comments */}
      <Box sx={{ marginTop: "2rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "250px", // تحديد الحد الأدنى للارتفاع
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: "0.5rem" }}>
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
              <TextField
                label="Message"
                multiline
                rows={4}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                fullWidth
                sx={{ marginTop: "1rem" }}
              />
              <Button variant="contained" color="primary" sx={{ marginTop: "1rem" }}>
                Submit Rating
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "250px", // تحديد الحد الأدنى للارتفاع
              }}
            >
              <Typography variant="h6">Add Your Comment</Typography>
              <TextField
                label="Your Comment"
                multiline
                rows={4}
                fullWidth
                sx={{ marginTop: "1rem" }}
              />
              <Button variant="contained" color="primary" sx={{ marginTop: "1rem" }}>
                Submit Comment
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RoomDetailsPage;