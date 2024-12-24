import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';

// Define the Facility interface directly in this file
interface Facility {
  id: string;
  name: string;
  createdBy: {
    _id: string;
    userName: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface FacilityDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Facility) => Promise<void>;
  facility?: Facility | null;
}

const FacilityDialog: React.FC<FacilityDialogProps> = ({ open, onClose, onSave, facility }) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Facility>();

  // Set the form value when the dialog opens
  React.useEffect(() => {
    if (facility) {
      setValue("name", facility.name);
    } else {
      setValue("name", "");
    }
  }, [facility, setValue]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {facility ? 'Edit Facility' : 'Add Facility'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSave)}>
          <TextField
            {...register("name", { required: "Facility name is required." })}
            autoFocus
            margin="dense"
            label="Facility Name"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
          />
          <Button type="submit" color="primary" variant="contained" sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FacilityDialog;