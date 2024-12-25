import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import {
  Alert,
  CardMedia,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import roomIcon from "../../../../../assets/roomIcon.png";
import IconButton from "@mui/material/IconButton";
import deleteconfirm from "../../../../../assets/deleteconfirm.png";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Room, Try } from "@mui/icons-material";
import { ADMINROOMS, axiosInstance } from "../../../../../constants/URLS";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { toast } from "react-toastify";
import CustomTablePagination from './../../Shared/Components/CustomTablePagination/CustomTablePagination';
import { useState } from "react";
import DeleteConfirmation from './../../Shared/Components/DeleteConfirmation/DeleteConfirmation';

// Styled 
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: 'var(--secondary-color)',
  ...(theme.palette.mode === 'dark' && { backgroundColor: "#1A2027" }),
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "60%", // 20px padding for extra-small screens
    sm: "60%", // 30px padding for small screens and up
    md: "50%", // 40px padding for medium screens and up
    lg: "40%", // 50px padding for large screens and up
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



export default function RoomsList() {

  interface rooms_IF {
    _id: number;
    roomNumber: String;
    price: String;
    capacity: String;
    discount: String;
    images: string[];
    facilities: string[];
    totalCount: number;
  }

  // const [openDelete, setOpenDelete] = React.useState(false);
  // const [roomID, setroomID] = React.useState("0");
  // const handleOpenDelete = (ID: string) => {
  //   setOpenDelete(true);
  //   setroomID(ID);
  // };
  // const handleCloseDelete = () => setOpenDelete(false);

  const [rooms, setRooms] = React.useState<rooms_IF[]>([]);
  const [roomView, setroomView] = React.useState<rooms_IF>();

  const getRoomsList = async () => {
    try {
      const res = await axiosInstance.get(ADMINROOMS.getAllRooms, {
        params: {
          size: rowsPerPage,
          page: page,
        },
      });
      console.log(res.data.data.rooms);
      setRooms(res.data.data.rooms);
      setTotalItems(res.data.data.totalCount);
      console.log("totalItems", totalItems);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Room List.");
    }
  };
  

  const navigate = useNavigate();

  const view = async (id: any) => {
    try {
      const res = await axiosInstance.get(ADMINROOMS.getRoomDetails(id))
      console.log(res.data.data.room);
      setroomView(res.data.data.room);
      handleOpen();
    } catch (error) {
      console.log(error);
    }
  };

  const [openM, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleCloseM = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  // Pagination states
  const rowsPerPageOptions = [5, 10, 25, 50, 100];
  const [page, setPage] = useState(0); // Change from 1 to 0
  const [rowsPerPage, setRowsPerPage] = useState(5); 
  const [totalItems, setTotalItems] = useState(0);
  // Handle pagination
  const handleChangePage = (newPage: number) => {
    setPage(newPage); // No change needed here
  };
  const handleChangeRowsPerPage = (newRowsPerPage: number) => {
    if (rowsPerPageOptions.includes(newRowsPerPage)) {
      setRowsPerPage(newRowsPerPage);
      setPage(1); // Reset to the first page
    }
  };
  
  
  // Handle Modal Delete
  const deleteRoom = async (id: string) => {
    try {
      const responsedelete = await axiosInstance.delete(ADMINROOMS.deleteRoom(id));
      // setOpenDelete(false);
      toast.success("Operation completed successfully!");
      getRoomsList();
      setShowDelete(false);

    } catch (error) {
      toast.error("error");
      toast.error("Failed to fetch Room List.");

    }
  };
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleShowDelete = (id: string) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  React.useEffect(() => {
    getRoomsList();
  }, [page, rowsPerPage]);

  return (
    <>


    <Grid container>
      <Grid size={{ md: 6, sm: 12 }}>
        <Item
          sx={{ textAlign: { md: "left", sm: "center" } }}
        >
          <Typography sx={{ fontWeight: "bold" }} variant="h5">
            Rooms Table Details
          </Typography>
          <Typography variant="body2" >
            You can check all details
          </Typography>
        </Item>
      </Grid>
      <Grid size={{ md: 6, sm: 12 }}>
        <Item sx={{ textAlign: { md: "right", sm: "center" } }}>
          <Link to="new-room">
            <Button
              sx={{ padding: "0.6rem 3rem", borderRadius: "0.5rem" }}
              variant="contained"
            startIcon={<AddIcon />}
            >
              Add New Room
            </Button>
          </Link>
        </Item>
      </Grid>
      <Grid size={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: "700" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center" >
                    room Number
                  </StyledTableCell>
                  <StyledTableCell align="center">images</StyledTableCell>
                  <StyledTableCell align="center">price</StyledTableCell>
                  <StyledTableCell align="center">capacity</StyledTableCell>
                  <StyledTableCell align="center">Discount</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rooms.map((room) => (
                  <StyledTableRow key={room._id} >
                    <StyledTableCell padding="none" align="center">
                      {room.roomNumber}
                    </StyledTableCell>
                    <StyledTableCell align="center" padding="none">
                      <CardMedia
                        component="img"
                        style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' , cursor: 'pointer' , padding: '5px' }}
                        image={room.images[0] ? room.images[0] : roomIcon}
                        alt=" Image"
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center" padding="none">
                      {room.price} LE
                    </StyledTableCell>
                    <StyledTableCell align="center"   padding="none">
                      {room.capacity}
                    </StyledTableCell>
                    <StyledTableCell align="center"   padding="none">
                      {room?.discount ? ` ${room?.discount} LE` : "_"}
                    </StyledTableCell>

                    <StyledTableCell align="center" padding="none">
                      <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                          <React.Fragment>
                            <Button
                              variant="text"
                              {...bindTrigger(popupState)}
                            >
                              <MoreVertIcon />
                            </Button>
                            <Menu {...bindMenu(popupState)}>
                              <MenuItem onClick={() => view(room._id)}>
                                <VisibilityOutlinedIcon
                                  sx={{
                                    color: "var(--dark-blue)",
                                    marginRight: "10px",
                                    display: "inline-block",
                                  }}
                                  fontSize="small"
                                />
                                View
                              </MenuItem>
                              <MenuItem
                                onClick={() => navigate(`${room._id}`)}
                              >
                                <DriveFileRenameOutlineOutlinedIcon
                                  sx={{
                                    color: "var(--dark-blue)",
                                    marginRight: "10px",
                                    display: "inline-block",
                                  }}
                                />
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleShowDelete(`${room._id}`)
                                }
                              >
                                <DeleteOutlineIcon
                                  sx={{
                                    color: "var(--dark-blue)",
                                    marginRight: "10px",
                                    display: "inline-block",
                                  }}
                                />
                                delete
                              </MenuItem>
                            </Menu>
                          </React.Fragment>
                        )}
                      </PopupState>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </Grid>
    </Grid>

    {/* delete model */}
    <DeleteConfirmation
        deleteItem={"Room"}
        handleCloseDelete={() => setShowDelete(false)}
        showDelete={showDelete}
        deleteFunction={() => selectedId && deleteRoom(selectedId)}
      />

    {/* view model */}
    <Modal
      open={openM}
      onClose={handleCloseM}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ textAlign: "center" }}
    >
      <Box sx={style}>
        <CardMedia
          component="img"
          style={{
            width: "150px",
            margin: "auto",
            borderRadius: "3px",
            marginBottom: "1rem",
          }}
          image={
            roomView?.images[0]
              ? roomView?.images[0]
              : "/src/assets/roomIcon.png"
          }
          alt=" Image"
        />
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Room Number: {roomView?.roomNumber}
        </Typography>
        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
          capacity : {roomView?.capacity}
        </Typography>
        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
          {roomView?.discount ? `discount ${roomView?.discount} LE` : ""}
        </Typography>
        <Typography id="modal-modal-description" variant="h6" sx={{ mt: 2 }}>
          price : {roomView?.price ? roomView?.price + "LE" : ""}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {roomView?.facilities.map((f: any) => (
            <Typography component="span" variant="h6" sx={{ mr: 2 }}>
              {f.name}
            </Typography>
          ))}
        </Typography>
      </Box>
    </Modal>

    {/* Pagination */}
    <CustomTablePagination
        count={totalItems}
        page={page} // This should be zero-based
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </>
  );
}
