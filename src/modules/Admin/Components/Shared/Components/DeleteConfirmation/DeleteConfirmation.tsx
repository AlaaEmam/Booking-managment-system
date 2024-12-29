import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import deleteconfirm from '../../../../../../assets/deleteconfirm.png';

interface DeleteConfirmationProps {
  showDelete: boolean;
  handleCloseDelete: () => void; // Function to close the modal
  deleteItem: string; // Name of the item to delete
  deleteFunction: () => any; // Function to call the delete API
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  showDelete,
  handleCloseDelete,
  deleteItem,
  deleteFunction,
}) => {
  return (
    <Dialog
      open={showDelete}
      onClose={handleCloseDelete}
      aria-labelledby="delete-confirmation-dialog-title"
      aria-describedby="delete-confirmation-dialog-description"
    >
      <IconButton
        edge="end"
        color="inherit"
        onClick={handleCloseDelete}
        aria-label="close"
        style={{ position: 'absolute', right: 20, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle 
        style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: '10px' }}
        id="delete-confirmation-dialog-title"
      >
        Delete This {deleteItem} ?
      </DialogTitle>
      <DialogContent>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <img src={deleteconfirm} alt="delete confirm" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <DialogContentText 
          id="delete-confirmation-dialog-description" 
          style={{ textAlign: 'center', marginTop: '20px' ,color: 'var(--dark-gray)' }}
        >
          Are you sure you want to delete this {deleteItem}? If you are sure, just click on delete.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          color="error" 
          onClick={deleteFunction} // Call API delete
        >
          Delete this {deleteItem}
        </Button>
        <Button onClick={handleCloseDelete} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;