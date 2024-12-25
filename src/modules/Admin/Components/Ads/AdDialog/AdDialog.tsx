import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton,
  styled,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'var(--secondary-color)' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  boxShadow: "none",
  color: theme.palette.mode === 'dark' ? 'var(--secondary-color)' : theme.palette.text.primary,
}));

const DialogStyled = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    color: 'var(--secondary-color)',
  },
  '& .MuiDialogContent-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'var(--light-gray)' : '#fff',
    color: 'var(--secondary-color)',
  },
  '& .MuiDialogActions-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'var(--light-gray)' : '#fff',
  },
}));

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
  roomName: string; // Ensure this property exists
}

interface AdDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: Ad) => void;
  isEditMode: boolean;
  formData: Ad | null;
}

const AdDialog: React.FC<AdDialogProps> = ({
  open,
  onClose,
  onSave,
  formData,
  isEditMode,
}) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Ad>();

  React.useEffect(() => {
    if (formData) {
      setValue("room.roomNumber", formData.room.roomNumber);
      setValue("room.price", formData.room.price);
      setValue("room.discount", formData.room.discount);
      setValue("room.capacity", formData.room.capacity);
      setValue("isActive", formData.isActive);
    } else {
      setValue("room.roomNumber", "");
      setValue("room.price", 0);
      setValue("room.discount", 0);
      setValue("room.capacity", 0);
      setValue("isActive", true);
    }
  }, [formData, setValue]);

  const onSubmit: SubmitHandler<Ad> = (data) => {
    // Validate data types
    if (typeof data.room.roomNumber !== 'string') {
      toast.error("Room name must be a string.");
      return;
    }
    if (typeof data.room.price !== 'number' || data.room.price < 0) {
      toast.error("Price must be a positive number.");
      return;
    }
    if (typeof data.room.discount !== 'number' || data.room.discount < 0) {
      toast.error("Discount must be a positive number.");
      return;
    }
    if (typeof data.room.capacity !== 'number' || data.room.capacity < 0) {
      toast.error("Capacity must be a positive number.");
      return;
    }

    // Proceed with saving the data
    onSave({ ...data, roomName: data.room.roomNumber }); // Map to expected structure
  };

  return (
    <DialogStyled open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditMode ? 'Edit Ad' : 'Add New Ad'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("room.roomNumber", { required: "Room name is required." })}
            autoFocus
            margin="dense"
            label="Room Name"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.room?.roomNumber}
            helperText={errors.room?.roomNumber?.message}
          />
          <TextField
            {...register("room.price", { required: "Price is required." })}
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.room?.price}
            helperText={errors.room?.price?.message}
          />
          <TextField
            {...register("room.discount", { required: "Discount is required." })}
            margin="dense"
            label="Discount"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.room?.discount}
            helperText={errors.room?.discount?.message}
          />
          <TextField
            {...register("room.capacity", { required: "Capacity is required." })}
            margin="dense"
            label="Capacity"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.room?.capacity}
            helperText={errors.room?.capacity?.message}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Active</InputLabel>
            <Select {...register("isActive")} label="Active">
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Not Active</MenuItem>
            </Select>
            <FormHelperText>Select Active Status</FormHelperText>
          </FormControl>
          <DialogActions>
            <Button variant="contained" type="submit" color="primary">
              Save
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </DialogStyled>
  );
};

export default AdDialog;