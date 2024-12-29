
import React from 'react';
import { Box, Typography, Grid, Paper, Divider, Modal, Button } from '@mui/material';
import { styled } from '@mui/system';


interface BookingListProps {
    _id: string;
    room: {
      roomNumber: string;
    };
    endDate: string;
    startDate: string;
    totalPrice: number;
    userName: string;
  }

const Wrapper = styled(Paper)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  color: 'black',
  padding: theme.spacing(3),
  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
}));

const Cover = styled(Box)({
  height: 200,
  color: 'black',
  backgroundImage: "url('https://images.unsplash.com/photo-1505577058444-a3dab90d4253?ixlib=rb-0.3.5&s=fed02ccbe457c9b8fc1f2cf76f30d755&w=600&h=400&q=80&fit=crop')",
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: '4px 4px 0 0',
});


const BookingModal: React.FC<{ open: boolean; onClose: () => void; booking: BookingListProps | null }> = ({ open, onClose, booking }) => {
 
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };

    return (
    <Modal open={open} onClose={onClose} sx={{color: 'black'}}>
      <Box sx={{padding: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Wrapper>
          <Cover />
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
            Booking Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1"  sx={{color: 'black'}} color="textSecondary">Guest</Typography>
              {/* <Typography variant="body1"  sx={{color: 'black'}} fontWeight={600}>{booking?.user.userName}</Typography> */}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{color: 'black'}} color="textSecondary">Room Number</Typography>
              <Typography variant="body1" sx={{color: 'black'}} fontWeight={600}>{booking?.room.roomNumber}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={6} textAlign="center">
              <Typography variant="caption"  sx={{color: 'black' , textTransform: 'uppercase'}} color="textSecondary">Check-in</Typography>
              <Typography variant="body1" sx={{ color: 'black' }} fontWeight={600}>{booking?.startDate ? formatDate(booking.startDate) : 'N/A'}</Typography>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <Typography variant="caption"sx={{color: 'black' , textTransform: 'uppercase' }}  color="textSecondary">Check-out</Typography>
              <Typography variant="body1" sx={{ color: 'black' }} fontWeight={600}>{booking?.endDate ? formatDate(booking.endDate) : 'N/A'}</Typography>
               </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h6" sx={{color: 'black'}}  fontWeight={600} color="textPrimary">Total</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography variant="h6"  fontWeight={600} color="#68d391">${booking?.totalPrice.toFixed(2)}</Typography>
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