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
import Grid from "@mui/material/Grid2";
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
import { ADMINROOMFACILITIES, axiosInstance } from "../../../../../constants/URLS";
// STYLE

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
    _id: string;
    name: string;
    createdBy: {
      _id: string;
      userName: string;
    };
    createdAt: string;
    updatedAt: string;
  
  }
  const [facilityList, setFacilityList] = useState<Facility[]>([]);
  const [showView, setShowView] = useState<boolean>(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

 
  const getFacilityList = async () => {
    try {
      const response = await axiosInstance.get(
        ADMINROOMFACILITIES.getRoomFacilities,
        {
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
  const deleteFacility = async (id: string) => {
    console.log("Deleting facility with ID:", id); // تسجيل الـ ID المرسل

    if (!id) {
      toast.error("Facility ID is not provided.");
      return; // لا تتابع العملية إذا لم يكن الـ ID موجودًا
    }
    try {
      const responsedelete = await axiosInstance.delete(ADMINROOMFACILITIES.deleteRoomFacilities(id));
      console.log("Response:", responsedelete); // تسجيل الاستجابة من الـ API

      toast.success("Facility deleted successfully!");
      getFacilityList();  // لتحديث قائمة المرافق بعد الحذف
      setShowDelete(false); // إغلاق نافذة الحذف
    } catch (error) {
      toast.error("Failed to delete facility.");
      console.error(error);
    }
  };
  

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

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  
  const handleShowDelete = (id: string) => {
    if (id) {
      setSelectedId(id);  // تعيين الـ ID المختار
      setShowDelete(true);  // فتح نافذة الحذف
    } else {
      console.error("Facility ID is missing.");
    }
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

      <Grid container>
        <Grid size={{ md: 6, sm: 12 }}>
          <Item
          sx={{ textAlign: { md: "left", sm: "center" } }}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Facilities Table Details
            </Typography>
            <Typography variant="body2" >
              You can check all details
            </Typography>
          </Item>
        </Grid>
        <Grid size={{ md: 6, sm: 12 }}>
          <Item sx={{ textAlign: { md: "right", sm: "center" } }}>
              <Button
                onClick={() => handleOpenDialog()}
                sx={{ padding: "0.6rem 3rem", borderRadius: "0.5rem" }}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add New Facility
              </Button>
          </Item>
        </Grid>
      
        <Grid size={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 , overflow: 'auto' ,paddingTop: 10 }} aria-label="customized table">
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
                  <StyledTableRow key={facility._id}>
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
                            handleShowDelete(`${facility._id}`);
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
        </Grid>
    </Grid>

      <DeleteConfirmation
        deleteItem={"Facility"}
        handleCloseDelete={() => setShowDelete(false)}
        showDelete={showDelete}
        deleteFunction={() => {
          if (selectedId) {
            deleteFacility(selectedId);
          } else {
            console.error("No facility ID to delete.");
          }
        }}
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
