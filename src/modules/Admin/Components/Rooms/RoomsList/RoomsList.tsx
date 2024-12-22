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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
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
  p: 4,
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

interface rooms_IF {
  _id: number;
  roomNumber: String;
  price: String;
  capacity: String;
  discount: String;
  images: string[];
  facilities: string[];
}

export default function RoomsList() {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [roomID, setroomID] = React.useState("0");
  const handleOpenDelete = (ID: string) => {
    setOpenDelete(true);
    setroomID(ID);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const [rooms, setRooms] = React.useState<rooms_IF[]>([]);
  const [roomView, setroomView] = React.useState<rooms_IF>();

  const getRoomsList = async () => {
   try {
    const res = await axiosInstance.get(ADMINROOMS.getAllRooms)


    setRooms(res.data.data.rooms);
   } catch (error) {
console.log(error)
   }
  };
  const deleteRoom = async (id: string) => {
    try {
      const res = await axiosInstance.delete(ADMINROOMS.deleteRoom(id));
      console.log(res);
      setOpenDelete(false);
      toast.success("room deleted ");
      getRoomsList();
    } catch (error) {
      toast.error("error");
    }
  };

  const navigate = useNavigate();

  const view = async (id: any) => {
    try {

      const res = await    axiosInstance.get(ADMINROOMS.getRoomDetails(id))
      // const res = await axios.get(
      //   `https://upskilling-egypt.com:3000/api/v0/admin/rooms/${id}`,
      //   { headers: { Authorization: localStorage.getItem("token") } }
      // );
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

  React.useEffect(() => {
    getRoomsList();
  }, []);

  return (
    <>
      {/* delete model */}

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ margin: 0 }}
      >
        <Box sx={style}>
          <DialogTitle
            style={{
              textAlign: "center",
              fontWeight: "bolder",
              marginTop: "10px",
            }}
            id="delete-confirmation-dialog-title"
          >
            Delete This
            {/* ///{deleteItem} */}
          </DialogTitle>
          <DialogContent>
            <CardMedia
              component="img"
              style={{
                width: "150px",
                margin: "auto",
                borderRadius: "3px",
                //  marginBottom: "1rem",
              }}
              image={deleteconfirm}
              alt=" deleteconfirm"
            />

            <DialogContentText
              id="delete-confirmation-dialog-description"
              className="mt-4"
            >
              Are you sure you want to delete this
              {/* {deleteItem} */}? If you are sure, just click on delete.
            </DialogContentText>
            <Box sx={{ mt: "1rem", textAlign: "right" }}>
              <Button
                onClick={handleCloseDelete}
                sx={{ marginInline: "1rem" }}
                variant="outlined"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteRoom(roomID)} // Call API delete
              >
                Delete this
                {/* {deleteItem} */}
              </Button>
            </Box>
          </DialogContent>
        </Box>
      </Modal>
      {/* //viewmodel */}
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
      <Grid container>
        <Grid size={{ md: 6, sm: 12 }}>
          <Item
            sx={{ boxShadow: "none", textAlign: { md: "left", sm: "center" } }}
          >
            <Typography color={"var(--dark-gray)"} id="modal-modal-title" variant="h4" component="h6">
              Rooms Table Details
            </Typography>
            <Typography id="modal-modal-title" component="span" color={"var(--dark-gray)"} >
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
              >
                Add New Room
              </Button>
            </Link>
          </Item>
        </Grid>
        <Grid size={12}>
          <Item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: "700" }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">
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
                    <StyledTableRow key={room._id}>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {room.roomNumber}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <CardMedia
                          component="img"
                          style={{
                            width: "70px",
                            margin: "auto",
                            height: "40px",
                            borderRadius: "3px",
                          }}
                          image={room.images[0] ? room.images[0] : roomIcon}
                          alt=" Image"
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {room.price} LE
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {room.capacity}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {room?.discount ? ` ${room?.discount} LE` : "_"}
                      </StyledTableCell>

                      <StyledTableCell align="center">
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
                                    handleOpenDelete(`${room._id}`)
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
                        {/* <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? "long-menu" : undefined}
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton> */}
                        {/* <Menu
                    id="demo-positioned-menu"
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    //anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "33ch",
                          textAlign: "center",
                          borderRadius: "5px",
                          boxShadow: "0px 2px 5px 7px rgba(0,0,0,0.02)",
                          margin: "auto",
                        },
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => handleOpen(room._id)}
                      sx={{ textAlign: "center" }}
                    >
                      <VisibilityOutlinedIcon
                        sx={{
                          color: "var(--dark-blue)",
                          marginRight: "10px",
                          display: "inline-block",
                        }}
                        fontSize="small"
                      />
                      View {room._id}
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <DriveFileRenameOutlineOutlinedIcon
                        sx={{
                          color: "var(--dark-blue)",
                          marginRight: "10px",
                          display: "inline-block",
                        }}
                      />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <DeleteForeverOutlinedIcon
                        sx={{
                          color: "var(--dark-blue)",
                          marginRight: "10px",
                          display: "inline-block",
                        }}
                      />
                      Delete
                    </MenuItem>
                  </Menu> */}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
