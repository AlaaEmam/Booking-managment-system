
import { Box, Button, Paper,  styled, Table,  TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import  { useEffect, useState } from 'react'
import View from "../../../../assets/icons/View.svg";
import { ADMINUSERS, axiosInstance } from '../../../../constants/URLS';
import axios from 'axios';
import UserProfileModal from './UserProfileModal';
import NoUserImage from '../../../../assets/defaultavatar.jpg';
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



export default function UserList() {

  interface UserListProps {
    _id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    country: string;
    role: string;
    createdAt: string;
    profileImage: string;
    totalCount: number;
  }

  const [userList, setUserList] = useState<UserListProps[]>([]);
  const imageBaseURL = 'https://upskilling-egypt.com:3000/'; // Set the base URL

const getUserList = async () => {
  try {
    let response = await axiosInstance.get(ADMINUSERS.getAllUsers, {
      params: {
        size: rowsPerPage,
        page: page,
      },
   
    });
    console.log(response.data.data.users);
    setUserList(response?.data?.data?.users);
    setTotalItems(response.data.data.totalCount || 0);

  } catch (error) {
    console.log(error);
  }
};



  //Modal View
  const [showView, setShowView] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleCloseView = () => setShowView(false);
  const handleShowView = (user: any) => {
    setSelectedUser(user);
    setShowView(true);
  };

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleOpenModal = (user: UserListProps) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
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
    getUserList();
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
   
    {/* Table */}
    <Grid  xs={12} md={12}>
   {userList && userList.length > 0 ? (
    <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }}  className="table-container">
      <Table sx={{ minWidth: 700 }} className="table" aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontWeight: 700 }} align="center">Profile Picture</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700 }} align="center">User  Name</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700 }} align="center">Email</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700 }} align="center">Phone Number</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700 }} align="center">Country</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700 }} align="center">Role</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700 }} align="center">Created At</StyledTableCell>
            <StyledTableCell sx={{ fontWeight: 700 }} align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user: UserListProps) => (
            <StyledTableRow key={user._id}>
              <StyledTableCell align="center" padding="none">
                {user.profileImage ? (
                  <img
                    src={user.profileImage.startsWith('http') ? user.profileImage : `${imageBaseURL}${user.profileImage}`}
                    alt={user.userName}
                    style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' , cursor: 'pointer' , padding: '5px' }}
                  />
                ) : (
                  <img src={NoUserImage} alt="Placeholder" style={{ width: '56px', height: '56px', borderRadius: '50%' }} />
                )}
              </StyledTableCell>
              <StyledTableCell align="center">{user.userName}</StyledTableCell>
              <StyledTableCell align="center">{user.email}</StyledTableCell>
              <StyledTableCell align="center">{user.phoneNumber}</StyledTableCell>
              <StyledTableCell align="center">{user.country}</StyledTableCell>
              <StyledTableCell align="center">{user.role}</StyledTableCell>
              <StyledTableCell align="center">{new Date(user.createdAt).toLocaleString()}</StyledTableCell>
              <StyledTableCell align="center" onClick={() => handleOpenModal(user)}>
                <img src={View} alt="View" />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          ) : (
            <TableContainer>
              {/* <Table>
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
              </Table> */}
            </TableContainer>
          )}

   </Grid>

</Grid>
<UserProfileModal open={openModal} user={selectedUser} onClose={handleCloseModal} />

   {/* Pagination */}
   <CustomTablePagination
        count={Math.ceil(totalItems / rowsPerPage) || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
  </>

  )
};
