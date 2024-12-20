import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, ImageList, Dialog, DialogTitle, DialogContent } from '@mui/material';
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
import View from '../../../../../assets/icons/View.svg';
import Delete from '../../../../../assets/icons/delete.svg';
import Edit from '../../../../../assets/icons/Edit.svg';
import { red } from '@mui/material/colors';
import DeleteConfirmation from '../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import  CloseIcon  from '@mui/icons-material/Close';
import  TextField  from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import FacilityDialog from '../FacilityDialog/FacilityDialog';
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
   interface Facility {
    id: string;
    name: string;
    createdBy: {
      _id: string;
      userName: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  const [facilityList, setFacilityList] = useState<Facility[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showView, setShowView] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  // Fetch Facilities on component mount
  // useEffect(() => {
  //   const fetchFacilities = async () => {
  //     await getFacilityList(1, 5); // Fetch with default pagination
  //   };
  //   fetchFacilities();
  // }, []);
  useEffect(() => {
    getFacilityList(1, 5);
  }, []);

  const getFacilityList = async (pageNo: number, pageSize: number, searchQuery: string = '') => {
    try {
      const response = await axios.get(`https://upskilling-egypt.com:3000/api/v0/admin/room-facilities`, {
        headers: { Authorization: localStorage.getItem("token") || '' },
        params: { pageSize, pageNumber: pageNo, search: searchQuery },
      });
      setFacilityList(response.data.data.facilities);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Facility.");
    }
  };

  // Handle delete 
  const deleteFacility = async () => {
    if (selectedId) {
      try {
        await axios.delete(`https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${selectedId}`, {
          headers: { Authorization: localStorage.getItem("token") || '' },
        });
        getFacilityList(1, 5);
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


// Open dialog for adding/editing
const handleOpenDialog = (facility?: Facility) => {
  setSelectedFacility(facility || null); // Ensure facility is set correctly
  setShowDialog(true);
};
// Handle saving the facility
const handleSave = async (data: Facility) => {
  try {
    // Debugging statement
    console.log("Selected Facility:", selectedFacility);
    
    if (selectedFacility && selectedFacility.id) {
      // Update existing Facility
      await axios.put(`https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${selectedFacility.id}`, data, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Facility updated successfully!");
    } else {
      // Create new Facility
      await axios.post(`https://upskilling-egypt.com:3000/api/v0/admin/room-facilities`, data, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      toast.success("Facility created successfully!");
    }
    handleCloseDialog();
    await getFacilityList(1, 5);
  } catch (error) {
    console.error("Error saving facility:", error);
    toast.error("An error occurred. Please try again.");
  }
};   

// Close dialog
const handleCloseDialog = () => {
  setShowDialog(false);
  setSelectedFacility(null); // Reset the selected facility
};

// Example usage of handleOpenDialog when editing a facility
const handleShowEdit = (facility: Facility) => {
  handleOpenDialog(facility); // Ensure you're passing the entire facility object
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
        <Button
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2, px: 3, py: 1.3, backgroundColor: 'var(--primary-color)', color: 'var(--off-white)' }}
          startIcon={<AddIcon />}
        >
            Add New Facility
          </Button>
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
                {/* Actions */}
                <StyledTableCell align="center">
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
                      <Typography sx={{ paddingInline: 1 }}>View</Typography>
                    </MenuItem>

                    <MenuItem onClick={() => { handleShowEdit(facility); handleClose(); }}>
                      <img src={Edit} alt="Edit" /> 
                      <Typography sx={{ paddingInline: 1 }}>Edit</Typography>
                    </MenuItem>
                    
                    <MenuItem onClick={() => { handleShowDelete(facility.id); handleClose(); }}>
                      <img src={Delete} alt="Delete" /> 
                      <Typography sx={{ paddingInline: 1 }}>Delete</Typography>
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

    <FacilityDialog
      open={showDialog}
      onClose={handleCloseDialog}
      onSave={handleSave}
      facility={selectedFacility}
    />
    </>
  );
}
