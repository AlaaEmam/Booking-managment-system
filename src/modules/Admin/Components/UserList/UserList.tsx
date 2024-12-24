
import { Box, Pagination, Paper,  styled, Table,  TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import  { useEffect, useState } from 'react'
import View from "../../../../assets/icons/View.svg";
import { ADMINUSERS, axiosInstance } from '../../../../constants/URLS';
import axios from 'axios';
import UserProfileModal from './UserProfileModal';
import NoUserImage from '../../../../assets/defaultavatar.jpg';
import CustomTablePagination from '../Shared/Components/CustomTablePagination/CustomTablePagination';
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

  const [page, setPage] = useState(1); // Start from page 1
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
  const [totalItems, setTotalItems] = useState(0); 

  const getUserList = async () => {
    try {
      let response = await axios.get(`https://upskilling-egypt.com:3000/api/v0/admin/users`, {
        params: {
          size: rowsPerPage, // Set the number of rows per page
          page: page, // Set the current page number
        },
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      console.log(response.data.data.users);
      setUserList(response?.data?.data?.users);
      setTotalItems(response.data.data.totalCount  || 0); // Ensure this is a number
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



  //Handel pagination
  const rowsPerPageOptions = [5, 10, 25, 50, 100];

  const handleChangePage = (newPage: number) => {
    setPage(newPage); // Update the current page
  };

  // const handleChangeRowsPerPage = (newRowsPerPage: number) => {
  //   setRowsPerPage(newRowsPerPage);
  //   setPage(1); // Reset to the first page
  // };
  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    if (rowsPerPageOptions.includes(newRowsPerPage)) {
      setRowsPerPage(newRowsPerPage); // Update the state with the new rows per page
      setPage(1); // Reset to the first page
    }
  };

  useEffect(() => {
    getUserList();
  }, [page, rowsPerPage])

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
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 500 , overflow: 'auto'  }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">User Profile</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">User Name</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">User Email</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Phone Number</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Country</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Role </StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Created At</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: 700 }} align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userList.map((user: UserListProps) => (
                <StyledTableRow key={user._id}>

                 <StyledTableCell align="center" sx={{padding: 0}}>
                    {user.profileImage ? (
                      <img
                        src={user.profileImage.startsWith('http') ? user.profileImage : `${imageBaseURL}${user.profileImage}`}
                        alt={user.userName}
                        style={{ width: '56px', height: '56px', borderRadius: '50%' , marginBlock: 10, boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' , border: '1px solid rgba(10, 10, 10, 0.26)'}}
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
                  <StyledTableCell align="center">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</StyledTableCell>
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
        </TableContainer>
      )}

<UserProfileModal open={openModal} user={selectedUser} onClose={handleCloseModal} />

  <CustomTablePagination
    count={Math.ceil(totalItems / rowsPerPage) || 0} 
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
    rowsPerPageOptions={rowsPerPageOptions} // Pass the available options
    />

  </>

  )
}
