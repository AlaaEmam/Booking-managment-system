import { Box,  Modal,  Paper,  Stack,  styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ADMINBOOKING, axiosInstance } from '../../../../constants/URLS'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
import View from "../../../../assets/icons/View.svg";
import BookingModal from './BookingModal';
import { Button } from '@mui/material';
import CustomTablePagination from '../Shared/Components/CustomTablePagination/CustomTablePagination';
import { Grid } from '@mui/material';

// Styled 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: 'var(--secondary-color)',
  ...(theme.palette.mode === 'dark' && { backgroundColor: "#1A2027" }),
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--light-gray)",
    color: "var(--secondary-color)",
    fontSize: 16,
    fontWeight: "bold",
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
    user: {
      userName: string;
    };
  }
  
  interface BookingListProps {
    _id: string;
    room: Room;
    totalPrice: number;
    startDate: string;
    endDate: string;
    user: {
      userName: string;
    };
  }

  
  
const [bookingList, setBookingList] = React.useState([]); // Added missing state for bookingList

const getBookingList = async () => {
  try {
    let response = await axiosInstance.get(ADMINBOOKING.getAllBooking, {
      params: {
        size: rowsPerPage,
        page: page,
      },
    });
    setBookingList(response.data.data.booking);
    setTotalItems(response.data.data.totalCount); // Set total count for pagination
  } catch (error) {
    console.log(error);
  }
};

  //Modal View
  const [showView, setShowView] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const handleCloseView = () => setShowView(false);
  const handleShowView = (booking: any) => {
    setSelectedBooking(booking);
    setShowView(true);
  };
 
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

   // Pagination states
   const rowsPerPageOptions = [5, 10, 25, 50, 100];
   const [page, setPage] = useState(1);
   const [rowsPerPage, setRowsPerPage] = useState(5);
   const [totalItems, setTotalItems] = useState(0);
 
   // Handle pagination
   const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    if (rowsPerPageOptions.includes(newRowsPerPage)) {
      setRowsPerPage(newRowsPerPage);
      setPage(1); // Reset to the first page
    }
  };

  useEffect(()=>{
    getBookingList();
  },[page, rowsPerPage]) 
  

  return (
  <>

  <Grid container>
      <Grid  xs={12} md={12}>
        <Item sx={{ textAlign: { md: "left", sm: "center" } }}>
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            User Table Details
          </Typography>
          <Typography variant="body2">
            You can check all details
          </Typography>
        </Item>
      </Grid>

      <Grid xs={12} md={12}>
      {bookingList.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }}  className="table-container">
          <Table sx={{ minWidth: 700 }} className="table" aria-label="customized table">
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
                  <StyledTableCell align="center">{booking.room?.roomNumber}</StyledTableCell>
                  <StyledTableCell align="center">{booking.totalPrice}</StyledTableCell>
                  <StyledTableCell align="center">
                      {new Date(booking.startDate).toLocaleString()}
                    </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(booking.endDate).toLocaleString()}
                    </StyledTableCell>
                  <StyledTableCell align="center">{booking.user.userName}</StyledTableCell>
            
                  <StyledTableCell align="center"sx={{ cursor: "pointer" }} onClick={handleOpen}>
                  <img src={View} alt="View" />
                  {/* <BookingModal open={openModal} onClose={handleClose} booking={booking}  /> */}
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

      </Grid>
  </Grid>

      {/* Pagination */}
      <CustomTablePagination
        count={Math.ceil(totalItems / rowsPerPage) || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />

        {/* <Modal
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
    </Modal> */}

  </>
    
  )
}
