import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Typography, IconButton, Menu, MenuItem, Button
} from '@mui/material';
import Grid from "@mui/material/Grid";
import { Add as AddIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { ADMINADS, axiosInstance } from './../../../../../constants/URLS';
import AdDialog from './../AdDialog/AdDialog';
import { toast } from 'react-toastify';
import DeleteConfirmation from './../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import CustomTablePagination from './../../Shared/Components/CustomTablePagination/CustomTablePagination';
import { tableCellClasses } from '@mui/material/TableCell';
import DeleteIcon from "../../../../../assets/icons/delete.svg";
import EditIcon from "../../../../../assets/icons/Edit.svg";

// Styled components
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

// Main component
export default function RoomAdListsList() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  
  const rowsPerPageOptions = [5, 10, 25, 50, 100];

  interface Room {
    roomNumber: string;
    price: number;
    discount: number;
    capacity: number;
  }
  
  interface Ad {
    _id: string;
    room: Room;
    isActive: boolean;
    roomName: string;
    totalCount: number;
  }

  const getAdsList = async () => {
    try {
      const response = await axiosInstance.get(ADMINADS.getAds, {
        params: { size: rowsPerPage, page },
      });
      setTotalItems(response.data.data.totalCount);
      setAds(response.data.data.ads || []);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSave = async (data: Ad) => {
    try {
      if (selectedAd) {
        await axiosInstance.put(ADMINADS.updateAd(selectedAd._id), data);
        toast.success("Ad updated successfully!");
      } else {
        await axiosInstance.post(ADMINADS.getAds, data);
        toast.success("Ad created successfully!");
      }
      handleCloseDialog();
      getAdsList();
    } catch (error) {
      handleError(error);
    }
  };

  const deleteAds = async (id: string) => {
    if (!id) {
      toast.error("Ad ID is not provided.");
      return;
    }
    try {
      await axiosInstance.delete(ADMINADS.deleteAd(id));
      toast.success("Ad deleted successfully!");
      getAdsList();
      setShowDelete(false);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    if (axios.isAxiosError(error) && error.response) {
      toast.error(error.response.data.message || "An error occurred. Please try again.");
    } else {
      toast.error("An unexpected error occurred.");
    }
  };

  const handleOpenDialog = (ad?: Ad) => {
    setSelectedAd(ad || null);
    setOpenEdit(true);
  };

  const handleCloseDialog = () => {
    setOpenEdit(false);
    setSelectedAd(null);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, ad: Ad) => {
    setAnchorEl(event.currentTarget);
    setSelectedAd(ad);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedAd(null);
  };

  const handleShowDelete = (id: string) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  useEffect(() => {
    getAdsList();
  }, [page, rowsPerPage]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Item sx={{ textAlign: { md: "left", sm: "center" } }}>
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
              Ads Table Details
            </Typography>
            <Typography variant="body2">
              You can check all details
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item sx={{ textAlign: { md: "right", sm: "center" } }}>
            <Button
              onClick={() => handleOpenDialog()}
              sx={{ padding: "0.6rem 3rem", borderRadius: "0.5rem" }}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add New Ad
            </Button>
          </Item>
        </Grid>

        {/* Table */}
        <Grid item xs={12}>
          {ads.length > 0 ? (
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
                          <MenuItem onClick={() => handleOpenDialog(ad)}>
                            <img src={EditIcon} alt="Edit" />
                            <Typography sx={{ paddingInline: 1 }}>Edit</Typography>
                          </MenuItem>
                          <MenuItem onClick={() => handleShowDelete(ad._id)}>
                            <img src={DeleteIcon} alt="Delete" />
                            <Typography sx={{ paddingInline: 1 }}>Delete</Typography>
                          </MenuItem>
                        </Menu>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>No Ads found.</Typography>
          )}
        </Grid>

        {/* Edit Dialog */}
        <AdDialog
          open={openEdit}
          onClose={handleCloseDialog}
          onSave={handleSave}
          formData={selectedAd ? { 
            _id: selectedAd._id,
            roomName: selectedAd.roomName, 
            room: {
              roomNumber: selectedAd.room.roomNumber,
              price: selectedAd.room.price,
              discount: selectedAd.room.discount,
              capacity: selectedAd.room.capacity,
            },
            isActive: selectedAd.isActive !== undefined ? selectedAd.isActive : false
          } : { 
            _id: '',
            room: {
              roomNumber: '', 
              price: 0, 
              discount: 0, 
              capacity: 0
            }, 
            roomName: '', 
            isActive: false 
          }}
          isEditMode={!!selectedAd}
        />

        {/* Delete Confirmation */}
        <DeleteConfirmation
          deleteItem={"Ad"}
          handleCloseDelete={() => setShowDelete(false)}
          showDelete={showDelete}
          deleteFunction={() => selectedId && deleteAds(selectedId)}
        />

        {/* Pagination */}
        <CustomTablePagination
          count={Math.ceil(totalItems / rowsPerPage) || 0}
          page={page}
          onPageChange={setPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Grid>
    </>
  );
}

  {/* Edit Dialog */}
      {/* <Dialog open={openEdit} onClose={handleDialogClose}>
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
      </Dialog> */}

      {/* Delete Dialog */}
      // <Dialog open={openDelete} onClose={handleDialogClose}>
      //   <DialogTitle>Delete Ads</DialogTitle>
      //   <DialogContent>
      //     <Typography variant="body1">Are you sure you want to delete this ad?</Typography>
      //   </DialogContent>
      //   <DialogActions>
      //     <Button variant="contained" color="secondary" onClick={handleDialogClose}>
      //       Cancel
      //     </Button>
      //     <Button variant="outlined" color="error" onClick={handleDialogClose}>
      //       Delete
      //     </Button>
      //   </DialogActions>
      // </Dialog>

      {/* View Dialog */}
      {/* <Dialog open={openView} onClose={handleDialogClose}>
        <DialogTitle>View Ad</DialogTitle>
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
            label="Price"
            type="number"
            fullWidth
            value={formData.price}
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
            label="Status"
            type="text"
            fullWidth
            value={formData.active}
            InputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog> */}