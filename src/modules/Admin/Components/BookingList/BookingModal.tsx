import React from 'react';
import { Box, Typography, Grid, Paper, Divider, Modal, Button } from '@mui/material';
import { styled } from '@mui/system';

interface Room {
  roomNumber: string;
}

interface User {
  userName: string;
}

interface BookingListProps {
  _id: string;
  room: Room;
  totalPrice: number;
  startDate: string;
  endDate: string;
  status: string;
  user: User;
}

const Wrapper = styled(Paper)(({ theme }) => ({
  maxWidth: 400, // زيادة الحد الأقصى للعرض
  width: '100%', // جعل العرض 100%  
  margin: 'auto',
  color: 'black',
  padding: theme.spacing(3),
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
}));

const BookingModal: React.FC<{ open: boolean; onClose: () => void; booking: BookingListProps | null }> = ({ open, onClose, booking }) => {
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Modal open={open} onClose={onClose} sx={{ color: 'black' }}>
      <Box sx={{ padding: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Wrapper>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
            Booking Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: 'black' }} color="textSecondary">Guest</Typography>
              <Typography variant="body1" sx={{ color: 'black' }} fontWeight={700}>{booking?.user.userName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ color: 'black' }} color="textSecondary">Room Number</Typography>
              <Typography variant="body1" sx={{ color: 'black' }} fontWeight={700}>{booking?.room.roomNumber}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={6} textAlign="center">
              <Typography variant="caption" sx={{ color: 'black', textTransform: 'uppercase' }} color="textSecondary">Check-in</Typography>
              <Typography variant="body1" sx={{ color: 'black' }} fontWeight={700}>{booking?.startDate ? formatDate(booking.startDate) : 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <Typography variant="caption" sx={{ color: 'black', textTransform: 'uppercase' }} color="textSecondary">Check-out</Typography>
              <Typography variant="body1" sx={{ color: 'black' }} fontWeight={700}>{booking?.endDate ? formatDate(booking.endDate) : 'N/A'}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{ color: 'black' }} fontWeight={700} color="textPrimary">Total</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="h6" fontWeight={700} color="#68d391">${booking?.totalPrice.toFixed(2)}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Wrapper>
      </Box>
    </Modal>
  );
};

export default BookingModal;