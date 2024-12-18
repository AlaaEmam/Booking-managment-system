import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { CardMedia } from "@mui/material";
import roomIcon from '../../../../../assets/roomIcon.png'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "red"//theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

interface rooms_IF {
  roomNumber: String;
  price: String;
  capacity: String;
  discount: String;
  images: string[];
}

export default function RoomsList() {
  const [rooms, setRooms] = React.useState<rooms_IF[]>([]);
  React.useEffect(() => {
    const getRoomsList = async () => {
      const res = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/rooms?page=1&size=10",
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setRooms(res.data.data.rooms);
    };
    getRoomsList();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">room Number</StyledTableCell>
            <StyledTableCell align="center">images</StyledTableCell>
            <StyledTableCell align="center">price</StyledTableCell>
            <StyledTableCell align="center">capacity</StyledTableCell>
            <StyledTableCell align="center">Discount</StyledTableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.name}>
            <StyledTableCell component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="right">{row.calories}</StyledTableCell>
            <StyledTableCell align="right">{row.fat}</StyledTableCell>
            <StyledTableCell align="right">{row.carbs}</StyledTableCell>
            <StyledTableCell align="right">{row.protein}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody> */}

        <TableBody>
          {rooms.map((room) => (
            <StyledTableRow>
              <StyledTableCell component="th" scope="row" align="center">
                {room.roomNumber}
              </StyledTableCell>
              <StyledTableCell align="center">
                <CardMedia
                component="img"
                  style={{
                    width: "100px",
                    margin:"auto",
                    borderRadius:"3px"
                  }}
                  image={room.images[0]? room.images[0] : roomIcon}
                  alt=" Image"
                />

              </StyledTableCell>
              <StyledTableCell align="center">{room.price}</StyledTableCell>
              <StyledTableCell align="center">{room.capacity}</StyledTableCell>
              <StyledTableCell align="center">{room.discount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
