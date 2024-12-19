import { Box,  Modal,  styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ADMINBOOKING, axiosInstance } from '../../../../constants/URLS'
import { AlignHorizontalRight, BorderAllRounded, Padding } from '@mui/icons-material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { grey } from '@mui/material/colors';
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
      setBookingList(response?.data?.data.booking)
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
    
    <div>
      <Modal
        open={showView}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        { selectedBooking &&(

          
          <Box sx={{...style, width: 400 }}>
            <ClearIcon color='warning' onClick={handleCloseView}/>
            <Typography color='primary' variant='h5'>{selectedBooking?.user.userName}'s booking room </Typography>
            <Typography variant='subtitle1'>
              <span style={{color:"rgb(52, 39, 234)"}}>Room Number:</span> {selectedBooking?.room?.roomNumber}</Typography>
            <Typography variant='subtitle1'>
              <span style={{color:"rgb(52, 39, 234)"}}>Total Price:</span> {selectedBooking?.totalPrice}</Typography>
            <Typography variant='subtitle1'>
              <span style={{color:"rgb(52, 39, 234)"}}>Start Date:</span> {selectedBooking?.startDate}</Typography>
            <Typography variant='subtitle1'>
              <span style={{color:"rgb(52, 39, 234)"}}>End Date:</span> {selectedBooking?.endDate}</Typography>
            
          </Box>
          )
        }
      </Modal>
      <Box sx={{marginBottom:"5rem"}}>

        <Typography variant='h5'>Booking Table Details</Typography>
        <Typography variant='subtitle1'>You can check all details</Typography>
      </Box>

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
    </div>

    
  )
}
