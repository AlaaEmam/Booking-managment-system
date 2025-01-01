import { Box, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Alert, Pagination, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { ADMINBOOKING, axiosInstance, PORTALBOOKING } from '../../../../constants/URLS';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'rgba(226, 229, 235, 1)',
    color: 'rgba(30, 38, 62, 1)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: '#333',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  '&:nth-of-type(even)': {
    backgroundColor: 'rgba(248, 249, 251, 1)',
  },
}));

interface Booking {
  _id: string;
  roomNumber: string;
  userName: string;
  startDate: number;
  endDate: number;
  totalPrice: number;
}

export default function BookingPage() {
  const [booking, setBooking] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const getBookingList = async (currentPage: number) => {
    try {
      const response = await axiosInstance.get(PORTALBOOKING.getAllMyBooking, { params: { page: currentPage, size: pageSize } });
      setBooking(response.data.data.booking);
      setTotalPages(Math.ceil(response.data.data.totalCount / pageSize));
    } catch (error) {
      setError('Failed to load booking data.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBookingList(currentPage);
  }, [currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <Stack sx={{ width: '100%', padding: 2 }}>
      <Typography variant="h4">Booking Details</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Room Number</StyledTableCell>
              <StyledTableCell>User Name</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Total Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={5}><Skeleton variant="text" width="100%" /></StyledTableCell>
              </StyledTableRow>
            ) : (
              booking && booking.length > 0 ? (
                booking.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell>{row.roomNumber}</StyledTableCell>
                    <StyledTableCell>{row.userName}</StyledTableCell>
                    <StyledTableCell>{new Date(row.startDate).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell>{new Date(row.endDate).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell>${row.totalPrice}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={5}>No bookings available</StyledTableCell>
                </StyledTableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
    </Stack>
  );
}
