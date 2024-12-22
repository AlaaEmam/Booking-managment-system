
import { Box, Paper,  styled, Table,  TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import  { useEffect, useState } from 'react'
import View from "../../../../assets/icons/View.svg";
import { ADMINUSERS, axiosInstance } from '../../../../constants/URLS';
import axios from 'axios';
import UserProfileModal from './UserProfileModal';
import NoUserImage from '../../../../assets/images/no-user-image.png';

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
  }

  const [userList, setUserList] = useState<UserListProps[]>([]); 
  const imageBaseURL = 'https://upskilling-egypt.com:3000/'; // Set the base URL

const getUserList = async () => {
  try {
    let response = await axios.get(`https://upskilling-egypt.com:3000/api/v0/admin/users?page=1&size=10`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    console.log(response.data.data.users);
    setUserList(response?.data?.data?.users);
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
  useEffect(()=>{
    getUserList();
  },[]) 
  
  return (
  <>
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
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>User Table Details</Typography>
            <Typography variant="body2">You can check all details</Typography>
          </Box>
        </Box>


      {userList && userList.length > 0 ? (
        <TableContainer component={Paper} sx={{ maxHeight: 700, overflow: 'auto' }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">User Name</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">email</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">phoneNumber</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">country</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">role </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">createdAt</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user: UserListProps) => (
                <StyledTableRow key={user._id}>
                  <StyledTableCell align="center">
                    {user.profileImage ? (
                    <img 
                    src={`${imageBaseURL}/${user.profileImage}`}
                      alt={user.userName} 
                      style={{ width: '56px', height: '56px'}} 
                    />
                  ) : ( 
                  <img src={NoUserImage} alt="Placeholder" style={{ width: '56px', height: '56px' }} />
                  )}
                  </StyledTableCell>
                  <StyledTableCell align="center">{user.userName}</StyledTableCell>
                  <StyledTableCell align="center">{user.email}</StyledTableCell>
                  <StyledTableCell align="center">{user.phoneNumber}</StyledTableCell>
                  <StyledTableCell align="center">{user.country}</StyledTableCell>
                  <StyledTableCell align="center">{user.role}</StyledTableCell>
                  <StyledTableCell align="center">{user.createdAt}</StyledTableCell>
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

<UserProfileModal open={openModal} user={selectedUser} onClose={handleCloseModal} />

  </>
    
  )
}
