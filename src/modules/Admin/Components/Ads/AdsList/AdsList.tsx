import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, Typography, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField
} from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon, Close as CloseIcon } from '@mui/icons-material'; // استيراد CloseIcon
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
  },
  [`&.${TableCell.body}`]: {
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

interface Facility {
  id: number;
  name: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

const facilities: Facility[] = [
  { id: 1, name: 'Gym', createdBy: 'Admin 1', createdAt: '2024-12-01', updatedAt: '2024-12-15' },
  { id: 2, name: 'Pool', createdBy: 'Admin 2', createdAt: '2024-12-05', updatedAt: '2024-12-16' },
  { id: 3, name: 'Spa', createdBy: 'Admin 3', createdAt: '2024-12-07', updatedAt: '2024-12-17' },
];

export default function AdsList() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [openEdit, setOpenEdit] = useState(false); // Dialog state

  // State for form values
  const [formData, setFormData] = useState({
    roomName: '',
    discount: '',
    active: '',
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, facility: Facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFacility(null);
  };

  const handleEditClick = () => {
    if (selectedFacility) {
      setFormData({
        roomName: selectedFacility.name,
        discount: '0', // Add appropriate value
        active: 'Yes',
      });
      setOpenEdit(true); // Open the dialog
    }
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenEdit(false);
  };

  return (
    <>
      {/* Header */}
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
            ADS Table Details
          </Typography>
          <Typography variant="body2">You can check all details</Typography>
        </Box>
        <Button
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.3,
            backgroundColor: 'var(--primary-color)',
            color: 'var(--off-white)',
          }}
          startIcon={<AddIcon />}
        >
          Add New Ads
        </Button>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Room Name</StyledTableCell>
              <StyledTableCell align="center">Price</StyledTableCell>
              <StyledTableCell align="center">Discount</StyledTableCell>
              <StyledTableCell align="center">Capacity</StyledTableCell>
              <StyledTableCell align="center">Active</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facilities.map((facility) => (
              <StyledTableRow key={facility.id}>
                <StyledTableCell align="center">{facility.name}</StyledTableCell>
                <StyledTableCell align="center">{facility.createdBy}</StyledTableCell>
                <StyledTableCell align="center">{facility.createdAt}</StyledTableCell>
                <StyledTableCell align="center">{facility.updatedAt}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton onClick={(event) => handleMenuClick(event, facility)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedFacility?.id === facility.id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>View</MenuItem>
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                  </Menu>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleDialogClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Ads
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleDialogClose}
            sx={{ position: 'absolute', top: '8px', right: '8px' }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Room Name"
            type="text"
            fullWidth
            value={formData.roomName}
            onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Discount"
            type="number"
            fullWidth
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Active"
            type="text"
            fullWidth
            value={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
