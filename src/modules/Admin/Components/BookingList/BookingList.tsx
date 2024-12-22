import { Box,  Modal,  Paper,  Stack,  styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ADMINBOOKING, axiosInstance } from '../../../../constants/URLS'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import View from "../../../../assets/icons/View.svg";

// STYLE
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--light-gray)",
    color: "var(--secondary-color)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookingList() {

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
    user: User;
  }
  
  // interface BookingListProps{
  //   _id:string;
  //   room:object;
  //   endDate:string;
  //   startDate:string;
  //   totalPrice:number;
  //   roomNumber:string;
  //   userName:string;
  // }
  
  
  const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [bookingList, setBookingList] = React.useState([]); // Added missing state for bookingList

const getBookingList = async () => {
  try {
    let response = await axiosInstance.get(ADMINBOOKING.getAllBooking);
    console.log(response.data.data.booking);
    setBookingList(response?.data?.data?.booking);
  } catch (error) {
    console.log(error);
  }
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

  //Modal View
  const [showView, setShowView] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const handleCloseView = () => setShowView(false);
  const handleShowView = (booking: any) => {
    setSelectedBooking(booking);
    setShowView(true);
  };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  useEffect(()=>{
    getBookingList();
  },[]) 
  
  return (
  <>
    <Modal
        open={showView}
        onClose={handleCloseView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Box sx={{ ...style, width: 500 }}>
            <Stack alignItems="center" justifyContent={'space-between'} direction="row" gap={2}>

              <Typography color='success' id="modal-modal-title" variant="h5" component="h2">
                {selectedBooking?.user.userName}'s booking
              </Typography>
              <ClearIcon color='warning' onClick={handleCloseView}/>
            </Stack>
            
            <Stack alignItems="center" direction="row" gap={2}>

              <Typography color='primary' variant="h5" component="h2">
                Room Number:
              </Typography>
              <Typography color='info' variant="h6">
                {selectedBooking?.room.roomNumber}
              </Typography>
              
            </Stack>
            
            <Stack alignItems="center" direction="row" gap={2}>

              <Typography color='primary' variant="h5" component="h2">
                Total Price:
              </Typography>
              <Typography color='info' variant="h6">
                {selectedBooking?.totalPrice}
              </Typography>
            </Stack>

            <Stack alignItems="center" direction="row" gap={2}>

              <Typography color='primary'  variant="h5" component="h2">
                Start Date:
              </Typography>
              <Typography color='info' variant="h6">
                {selectedBooking?.startDate}
              </Typography>
            </Stack>

            <Stack alignItems="center" direction="row" gap={2}>

              <Typography color='primary' variant="h5" component="h2">
                End Date:
              </Typography>
              <Typography color='info' variant="h6">
                {selectedBooking?.endDate}
              </Typography>
            </Stack>
        </Box>
    </Modal>

      <Box
        sx={{
          width: "100%",
          height: "12vh",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          alignItems: "center",
          padding: "2rem 2.25rem",
          mb: "1.5rem",
        }}
      >        
      <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>Booking Table Details</Typography>
          <Typography variant="body2">You can check all details</Typography>
        </Box>
      </Box>

      {bookingList.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 700, overflow: 'auto' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Room Number</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Price</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Start Date</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">End Date</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">User </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingList.map((booking: BookingListProps) => (
                <StyledTableRow key={booking._id}>
                  <StyledTableCell align="center">{booking.room.roomNumber}</StyledTableCell>
                  <StyledTableCell align="center">{booking.totalPrice}</StyledTableCell>
                  <StyledTableCell align="center">{booking.startDate}</StyledTableCell>
                  <StyledTableCell align="center">{booking.endDate}</StyledTableCell>
                  <StyledTableCell align="center">{booking.user.userName}</StyledTableCell>
                  <StyledTableCell align="center" onClick={() => handleShowView(booking)} sx={{ cursor: "pointer" }}>
                    <img src={View} alt="View" />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ "& th": { backgroundColor: "lightgray" } }}>
                <StyledTableCell>Room Number</StyledTableCell>
                <StyledTableCell>Price</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={6} sx={{ textAlign: 'center' }}>
                  <Typography variant='h6'>No Data</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
  </>
    
  )
}
