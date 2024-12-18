import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor:  'var(--light-gray)',
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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function RoomFacilitiesList() {
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
            sx={{borderRadius: 2 , px: 3, py: 1.3 , backgroundColor: 'var(--primary-color)' , color: 'var(--off-white)'}}
            startIcon={<AddIcon/>}
          >
            Add New Facility
          </Button>
        </Link>
      </Box>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead >
          <TableRow >
            <StyledTableCell sx={{fontWeight: 700}} align="center">Facility Name</StyledTableCell>
            <StyledTableCell sx={{fontWeight: 700}} align="center">createdBy(name admin )</StyledTableCell>
            <StyledTableCell sx={{fontWeight: 700}} align="center">createdAt</StyledTableCell>
            <StyledTableCell sx={{fontWeight: 700}} align="center">updatedAt</StyledTableCell>
            <StyledTableCell sx={{fontWeight: 700}} align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{row.calories}</StyledTableCell>
              <StyledTableCell align="center">{row.fat}</StyledTableCell>
              <StyledTableCell align="center">{row.carbs}</StyledTableCell>
              <StyledTableCell align="center">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  );
}