import { Box,  Modal,  Stack,  styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ADMINBOOKING, axiosInstance } from '../../../../constants/URLS'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ClearIcon from '@mui/icons-material/Clear';
interface BookingListProps{
  _id:string;
  room:object;
  endDate:string;
  startDate:string;
  totalPrice:number;
  roomNumber:string;
  userName:string;
}


export default function BookingList() {

  let [bookingList, setBookingList]=useState([]);
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  

  
  const getBookingList= async()=>{
    try{
      let response= await axiosInstance.get(ADMINBOOKING.getAllBooking);
      console.log(response.data.data.booking);
      setBookingList(response?.data?.data?.booking)
    }catch(error){
      console.log(error)
    }
  }

  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      fontSize:16
      
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
    
    <Box>
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
      <Box sx={{marginBottom:"5rem"}}>

        <Typography variant='h5'>Booking Table Details</Typography>
        <Typography variant='subtitle1'>You can check all details</Typography>
      </Box>

      {bookingList.length>0 ?
        <TableContainer>
          <Table>
            <TableHead >
              <TableRow sx={{"& th":{backgroundColor:"lightgray"}}}>
                <StyledTableCell>room number</StyledTableCell>
                <StyledTableCell>price</StyledTableCell>
                <StyledTableCell>start date</StyledTableCell>
                <StyledTableCell>end date</StyledTableCell>
                <StyledTableCell>User</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {bookingList?.map((booking:BookingListProps)=>
                <StyledTableRow key={booking._id}>
                  <StyledTableCell>{booking.room.roomNumber}</StyledTableCell>
                  <StyledTableCell>{booking?.totalPrice}</StyledTableCell>
                  <StyledTableCell>{booking?.startDate}</StyledTableCell>
                  <StyledTableCell>{booking?.endDate}</StyledTableCell>
                  <StyledTableCell>{booking?.user.userName}</StyledTableCell>
                  <StyledTableCell>
                    <VisibilityIcon onClick={() => handleShowView(booking)} sx={{color:"rgb(0, 132, 220)"}}/>
                  </StyledTableCell>
                </StyledTableRow>
              )}

            </TableBody>
          </Table>
        </TableContainer>
      :
      <TableContainer>
        <Table>
          <TableHead >
            <TableRow sx={{"& th":{backgroundColor:"lightgray"}}}>
              <StyledTableCell>room number</StyledTableCell>
              <StyledTableCell>price</StyledTableCell>
              <StyledTableCell>start date</StyledTableCell>
              <StyledTableCell>end date</StyledTableCell>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            <Typography sx={{textAlign:'center'}} variant='h1'>No Data</Typography>

          </TableBody>
        </Table>
      </TableContainer>}
    </Box>

    
  )
}
