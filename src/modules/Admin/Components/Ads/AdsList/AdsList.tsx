import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Box, Typography, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Select, MenuItem as SelectMenuItem, FormControl, InputLabel, FormHelperText
} from '@mui/material';
import { Add as AddIcon, MoreVert as MoreVertIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

// تعريف التوكين
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWExNGIxYTI4M2I1NmY1NjgyMTMyNGYiLCJyb2xlIjoiYWRtaW4iLCJ2ZXJpZmllZCI6ZmFsc2UsImlhdCI6MTczNDc4OTIxOSwiZXhwIjoxNzM1OTk4ODE5fQ.9_0Tmcv50I7q7456hyy-h_oF3lT4BNsPUPgaC_vKatw';

// إعداد axios instance مع التوكين
const axiosInstance = axios.create({
  baseURL: 'https://upskilling-egypt.com:3000',
  headers: { Authorization: `Bearer ${token}` },
});

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

// API Routes
export const ADMINADDS = {
  getAdds: `/api/v0/admin/ads`,
  getAddDetails: (id: string) => `/api/v0/admin/ads/${id}`,
  deleteAdd: (id: string) => `/api/v0/admin/ads/${id}`,
  updateAdd: (id: string) => `/api/v0/admin/ads/${id}`,
};

const AdList = () => {
  const [ads, setAds] = useState([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAd, setSelectedAd] = useState<null | any>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);

  // State for form values
  const [formData, setFormData] = useState({
    roomName: '',
    price: '',
    discount: '',
    capacity: '',
    active: '',
  });

  useEffect(() => {
    // جلب بيانات الإعلانات من الـ API
    axiosInstance.get(ADMINADDS.getAdds)
      .then((response) => {
        if (response.data.success) {
          setAds(response.data.data.ads);
        }
      })
      .catch((error) => {
        console.error('Error fetching ads:', error);
      });
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, ad: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedAd(ad);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAd(null);
  };

  const handleEditClick = () => {
    if (selectedAd) {
      setFormData({
        roomName: selectedAd.room.roomNumber,
        price: selectedAd.room.price,
        discount: selectedAd.room.discount,
        capacity: selectedAd.room.capacity,
        active: selectedAd.isActive ? 'Active' : 'Not Active',
      });
      setOpenEdit(true);
    }
    handleMenuClose();
  };

  const handleViewClick = () => {
    if (selectedAd) {
      setFormData({
        roomName: selectedAd.room.roomNumber,
        price: selectedAd.room.price,
        discount: selectedAd.room.discount,
        capacity: selectedAd.room.capacity,
        active: selectedAd.isActive ? 'Active' : 'Not Active',
      });
      setOpenView(true);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setOpenDelete(true);
    handleMenuClose();
  };

  const handleDialogClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
    setOpenView(false);
  };

  // دالة لتحديث الإعلان عبر الـ API
  const handleSaveClick = () => {
    if (selectedAd) {
      // إرسال التحديث إلى الـ API باستخدام axios
      axiosInstance
        .put(ADMINADDS.updateAdd(selectedAd._id), {
          roomNumber: formData.roomName,
          price: formData.price,
          discount: formData.discount,
          capacity: formData.capacity,
          isActive: formData.active === 'Active',
        })
        .then((response) => {
          if (response.data.success) {
            // تحديث القائمة بالبيانات الجديدة
            setAds(ads.map((ad) => (ad._id === selectedAd._id ? response.data.data : ad)));
            setOpenEdit(false);
          }
        })
        .catch((error) => {
          console.error('Error updating ad:', error);
        });
    }
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
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ads.map((ad) => (
              <StyledTableRow key={ad._id}>
                <StyledTableCell align="center">{ad.room.roomNumber}</StyledTableCell>
                <StyledTableCell align="center">{ad.room.price}</StyledTableCell>
                <StyledTableCell align="center">{ad.room.discount}</StyledTableCell>
                <StyledTableCell align="center">{ad.room.capacity}</StyledTableCell>
                <StyledTableCell align="center">{ad.isActive ? 'Active' : 'Inactive'}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton onClick={(event) => handleMenuClick(event, ad)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl) && selectedAd?._id === ad._id}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleViewClick}>View</MenuItem>
                    <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                    <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
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
          Edit Ads
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
            InputProps={{ readOnly: true }} // جعل الاسم ثابت
          />
     
          <TextField
            margin="dense"
            label="Discount"
            type="number"
            fullWidth
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
          />
         
          <FormControl fullWidth margin="dense">
            <InputLabel>Active</InputLabel>
            <Select
              value={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.value })}
              label="Active"
            >
              <SelectMenuItem value="Active">Active</SelectMenuItem>
              <SelectMenuItem value="Not Active">Not Active</SelectMenuItem>
            </Select>
            <FormHelperText>Select Active Status</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSaveClick} color="primary">
            Save
          </Button>
          <Button variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={openView} onClose={handleDialogClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          View Ads
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
            InputProps={{ readOnly: true }}
          />
      
          <TextField
            margin="dense"
            label="Discount"
            type="number"
            fullWidth
            value={formData.discount}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            label="Capacity"
            type="number"
            fullWidth
            value={formData.capacity}
            InputProps={{ readOnly: true }}
          />
          <TextField
            margin="dense"
            label="Active"
            type="text"
            fullWidth
            value={formData.active}
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={handleDialogClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Delete Ads
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
          <Typography>Are you sure you want to delete this ad?</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose} color="error">
            Delete
          </Button>
          <Button variant="outlined" onClick={handleDialogClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdList;
