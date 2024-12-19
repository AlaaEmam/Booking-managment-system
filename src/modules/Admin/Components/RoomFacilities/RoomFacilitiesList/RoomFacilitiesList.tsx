import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, ImageList } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import './RoomFacilitiesList.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Menu, MenuItem, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import ViewIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
import View from '../../../../../assets/icons/View.svg';
import Delete from '../../../../../assets/icons/delete.svg';
import Edit from '../../../../../assets/icons/Edit.svg';
 
import { red } from '@mui/material/colors';
import DeleteConfirmation from '../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
// STYLE
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: 'var(--light-gray)',
    color: 'var(--secondary-color)',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function RoomFacilitiesList() {
  interface CreatedBy {
    _id: string;
    userName: string;
  }
  
  interface Facility {
    id: string; // Adjust this if necessary
    name: string;
    createdBy: CreatedBy; // Update to include the nested createdBy object
    createdAt: string;
    updatedAt: string; 
  }

  const [facilityList, setFacilityList] = useState<Facility[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  // Fetch Facilities on component mount
  useEffect(() => {
    const fetchFacilities = async () => {
      await getFacilityList(1, 5); // Fetch with default pagination
    };
    fetchFacilities();
  }, []);

  const getFacilityList = async (pageNo: number, pageSize: number, searchQuery: string = '') => {
    try {
      const response = await axios.get(`https://upskilling-egypt.com:3000/api/v0/admin/room-facilities`, {
        headers: { Authorization: localStorage.getItem("token") || '' },
        params: {
          pageSize: pageSize,
          pageNumber: pageNo,
          search: searchQuery,
        },
      });
  
      console.log("getFacilityList : ", response.data.data);
      setFacilityList(response.data.data.facilities); // Set facilityList to the facilities array
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fetch Facility.");
    }
  };

  // Handle delete 
  const deleteFacility = async () => {
    if (selectedId !== null) {
      try {
        await axios.delete(`https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${selectedId}`, {
          headers: { Authorization: localStorage.getItem("token") || '' },
        });
        getFacilityList(1, 5); // Refresh the list after deletion
        toast.success("Operation completed successfully!");
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
    handleCloseDelete();
  };


  //handel dropdown
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
  // Handle Modal Delete
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id: string) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  // Modal View
  const handleCloseView = () => setShowView(false);
  const handleShowView = (facility: Facility) => {
    setSelectedFacility(facility);
    setShowView(true);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '12vh',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          alignItems: 'center',
          padding: '0 2.25rem',
          mb: '1.5rem',
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Facilities Table Details
          </Typography>
          <Typography variant="body2">You can check all details</Typography>
        </Box>
        <Link to='/facility-form'>
          <Button
            sx={{ borderRadius: 2, px: 3, py: 1.3, backgroundColor: 'var(--primary-color)', color: 'var(--off-white)' }}
            startIcon={<AddIcon />}
          >
            Add New Facility
          </Button>
        </Link>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">Facility Name</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">Created By (Admin Name)</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">Created At</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">Updated At</StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(facilityList) && facilityList.map((facility) => (
              <StyledTableRow key={facility.id}>
                <StyledTableCell align="center">{facility.name}</StyledTableCell>
                <StyledTableCell align="center">{facility.createdBy.userName}</StyledTableCell>
                <StyledTableCell align="center">{new Date(facility.createdAt).toLocaleString()}</StyledTableCell>
                <StyledTableCell align="center">{new Date(facility.updatedAt).toLocaleString()}</StyledTableCell>
                <StyledTableCell align="center">
                  {/* dropdown */}
                <IconButton
                    aria-controls={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    className="text-success"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => { handleShowView(facility); handleClose(); }}>
                    <img src={View} alt="View" /> 
                    <Typography sx={{paddingInline: 1}}>View</Typography>

                    </MenuItem>
                    <MenuItem component={Link} to={`/${facility?.id}`} onClick={handleClose}>
                      {/* <EditIcon /> */}
                      <img src={Edit} alt="Edit" /> 
                      <Typography sx={{paddingInline: 1}}>Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => { handleShowDelete(facility.id); handleClose(); }}>
                      {/* <DeleteIcon /> */}
                        <img src={Delete} alt="Delete" /> 

                       <Typography sx={{paddingInline: 1}}>Delete</Typography>
                    </MenuItem>
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmation 
      deleteItem={'Facility'}
      handleCloseDelete={handleCloseDelete}
      showDelete={showDelete}
      deleteFunction={deleteFacility}
      /> 
      
    </>
  );
}
