import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

interface CustomTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void; // Keep this as is
  rowsPerPageOptions: number[]; // Add this line
}

const CustomTablePagination: React.FC<CustomTablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions, // Add this line
}) => {
  return (
    <TablePagination
      component="div"
      count={count}
      page={page}
      onPageChange={(event, newPage) => onPageChange(newPage)}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(event) => onRowsPerPageChange(parseInt(event.target.value, 10))}
      rowsPerPageOptions={rowsPerPageOptions} // Add this line here
    />
  );
};

export default CustomTablePagination;