import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography, Button, Grid, Paper, TextField } from "@mui/material";
import { axiosInstance, PORTALROOMS } from "../../../../constants/URLS";

export default function RoomDetailsPage() {
  const { room_id } = useParams();
  const [room, setRoom] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

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

  useEffect(() => {
    if (room_id) {
      getRoomDetails();
    }
  }, [room_id]);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleContinueBooking = () => {
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Room ID:", room.id);
    console.log("Room Name:", room.roomNumber);
    console.log("Room Price:", room.price);
    console.log("Room Details:", room);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <CircularProgress size="3rem" sx={{ color: "#6D4C41" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
        <Typography variant="h5" color="error" sx={{ color: "#D32F2F" }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (!room) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "2rem" }}>
        <Typography variant="h5" sx={{ color: "#1976D2" }}>
          No room details found
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: "2rem", borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
          <Typography variant="h6" sx={{ marginBottom: "1rem", color: "#388E3C" }}>Room Booking Form</Typography>
          
          <form>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#1E88E5",
                marginBottom: "1rem",
              }}
            >
              {room.roomNumber}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#388E3C",
                marginBottom: "1rem",
              }}
            >
              {`Price: $${room.price} per night`}
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Start Date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ marginBottom: "1rem", backgroundColor: "#fff" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ marginBottom: "1rem", backgroundColor: "#fff" }}
                />
              </Grid>
            </Grid>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ marginTop: 2, backgroundColor: "#0288D1" }}
              onClick={handleContinueBooking}
            >
              Continue Book 
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ padding: "2rem", textAlign: "center", borderRadius: "8px", backgroundColor: "#f5f5f5" }}>
          <Typography variant="h6" sx={{ color: "#0288D1" }}>Room Image</Typography>
          <img
            src={room.images[0]}
            alt="Room"
            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
