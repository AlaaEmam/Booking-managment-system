import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  ImageList,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import "./RoomFacilitiesList.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import View from "../../../../../assets/icons/View.svg";
import Delete from "../../../../../assets/icons/delete.svg";
import Edit from "../../../../../assets/icons/Edit.svg";
import { red } from "@mui/material/colors";
import DeleteConfirmation from "../../Shared/Components/DeleteConfirmation/DeleteConfirmation";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import FacilityDialog from "../FacilityDialog/FacilityDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTablePagination from "../../Shared/Components/CustomTablePagination/CustomTablePagination";
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

export default function RoomFacilitiesList() {
  interface Facility {
    totalCount: number;
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

 
  const getFacilityList = async () => {
    try {
      const response = await axios.get(
        `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities`,
        {
          headers: { Authorization: localStorage.getItem("token") || "" },
          params: {
            size: rowsPerPage,
            page: page,
          },
        }
      );
      console.log(response.data.data);
      
      setTotalItems(response.data.data.totalCount);
      setFacilityList(response.data.data.facilities || []);

    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch Facility.");
    }
  };

  // Handle delete
  const deleteFacility = async () => {
    if (!selectedId) return;

    try {
      const responsedelete = await axios.delete(
        `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${selectedId}`,
        {
          headers: { Authorization: localStorage.getItem("token") || "" },
        }
      );
      toast.success("Operation completed successfully!");
      getFacilityList();
      setShowDelete(false);
    } catch (error) {
      toast.error("Failed to delete facility.");
      console.error(error);
    }
  };

  // Modal View
  // const handleCloseView = () => setShowView(false);
  // const handleShowView = (facility: Facility) => {
  //   setSelectedFacility(facility);
  //   setShowView(true);
  // };

  // Handle saving the facility
  const handleSave = async (data: Facility) => {
    try {
      if (selectedFacility) {
        // Update existing facility
        await axios.put(
          `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities/${selectedFacility}`,
          data,
          {
            headers: { Authorization: localStorage.getItem("token") || "" },
          }
        );
        toast.success("Facility updated successfully!");
      } else {
        // Create new facility
        await axios.post(
          `https://upskilling-egypt.com:3000/api/v0/admin/room-facilities`,
          data,
          {
            headers: { Authorization: localStorage.getItem("token") || "" },
          }
        );
        toast.success("Facility created successfully!");
      }
      handleCloseDialog();
      getFacilityList();
      
      // Optionally refresh the facility list here
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Check for specific status code or message
        if (error.response.status === 400) {
          // Display the error message from the response
          const errorMessage =
            error.response.data.message ||
            "An error occurred. Please try again.";
          toast.error(errorMessage);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Error saving facility:", error);
    }
  };
  // Open dialog for adding/editing
  const handleOpenDialog = (facility?: Facility) => {
    setSelectedFacility(facility || null); // Ensure facility is set correctly
    setShowDialog(true);
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
  //handel dropdown
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    facility: Facility
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFacility(null);
  };

  // Handle Modal Delete

  const handleShowDelete = (id: string) => {
    setSelectedId(id);
    setShowDelete(true);
  };
  // Dropdown Menu
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    facility: Facility
  ) => {
    setAnchorEl(event.currentTarget); // تم التعديل هنا - تعيين العنصر المفتوح
    setSelectedFacility(facility);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFacility(null);
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

  useEffect(() => {
    getFacilityList();
  }, [page, rowsPerPage]);
  
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
          padding: "0 2.25rem",
          mb: "1.5rem",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Facilities Table Details
          </Typography>
          <Typography variant="body2">You can check all details</Typography>
        </Box>
        <Button
          onClick={() => handleOpenDialog()}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1.3,
            backgroundColor: "var(--primary-color)",
            color: "var(--off-white)",
          }}
          startIcon={<AddIcon />}
        >
          Add New Facility
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">
                Facility Name
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">
                Created By (Admin Name)
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">
                Created At
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">
                Updated At
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: 700 }} align="center">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(facilityList) &&
              facilityList.map((facility) => (
                <StyledTableRow key={facility.id}>
                  <StyledTableCell align="center">
                    {facility.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {facility.createdBy.userName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(facility.createdAt).toLocaleString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(facility.updatedAt).toLocaleString()}
                  </StyledTableCell>
                  {/* Actions */}
                  <StyledTableCell align="center">
                    <IconButton
                      aria-controls={anchorEl ? "simple-menu" : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleMenuClick(e, facility)}
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
                      {/* <MenuItem onClick={() => { handleShowView(facility); handleClose(); }}>
                      <img src={View} alt="View" /> 
                      <Typography sx={{ paddingInline: 1 }}>View</Typography>
                    </MenuItem> */}

                      <MenuItem
                        onClick={() => {
                          handleOpenDialog(facility);
                          handleMenuClose();
                        }}
                      >
                        <EditIcon fontSize="small" />
                        <Typography sx={{ paddingInline: 1 }}>Edit</Typography>
                      </MenuItem>

                      <MenuItem
                        onClick={() => {
                          handleShowDelete(facility.id);
                          handleMenuClose();
                        }}
                      >
                        <img src={Delete} alt="Delete" />
                        <Typography sx={{ paddingInline: 1 }}>
                          Delete
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmation
        deleteItem={"Facility"}
        handleCloseDelete={() => setShowDelete(false)}
        showDelete={showDelete}
        deleteFunction={deleteFacility}
      />

      <FacilityDialog
        open={showDialog}
        onClose={handleCloseDialog}
        onSave={handleSave}
        facility={selectedFacility}
      />

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
  );
}
