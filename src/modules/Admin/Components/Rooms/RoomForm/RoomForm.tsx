import {
  Box,
  Checkbox,
  colors,
  FormControlLabel,
  FormGroup,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";

import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ADMINROOMFACILITIES,
  ADMINROOMS,
  axiosInstance,
} from "../../../../../constants/URLS";
import { toast } from "react-toastify";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TapAndPlayOutlined } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, facilty: string[], theme: Theme) {
  return {
    fontWeight: facilty.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

// end sec select

interface facility {
  _id: string;
  userName: string;
  name: string;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function RoomForm() {
  const params = useParams();
  const isNewRoom = params.roomId === undefined;
  const [facility, setFacility] = React.useState<facility[]>([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormRoom>();


  const onSubmit: SubmitHandler<IFormRoom> = async (data) => {
    let formata = new FormData();
    formata.append("roomNumber", data.roomNumber);
    formata.append("capacity", data.capacity.toString());
    formata.append("discount", data.discount.toString());

    for (let i = 0; i < data.facilities.length; i++) {
      formata.append("facilities[]", data.facilities[i]);
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      formata.append("imgs", selectedFiles[i]);
    }

    formata.append("price", data.price.toString());

    try {
      console.log(data.facilities);
      console.log(isNewRoom);
      await axiosInstance[isNewRoom? "post" : "put"](isNewRoom? ADMINROOMS.createRoom : ADMINROOMS.updateRoom(`${params.roomId}`),
        formata
      );
      toast.success("Successfully Operation!");
      navigate("/dashboard/rooms-list");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const getFacility = async () => {
      const res = await axiosInstance.get(ADMINROOMFACILITIES.getRoomFacilities);
      setFacility(res.data.data.facilities);
    };
    getFacility();

    if (!isNewRoom) {
      const id = params.roomId;
      const getRoomDetails = async () => {
        const res = await axiosInstance.get(ADMINROOMS.getRoomDetails(`${id}`));
        const response = res?.data.data.room;
        setValue("roomNumber", response.roomNumber);
        setValue("price", response.price);
        setValue("capacity", response.capacity);
        setValue("discount", response.discount);
        setValue("facilities", response.facilities);
        setValue("imgs", response.imgs);
      };
      getRoomDetails();
    }
  }, [isNewRoom, params.roomId, setValue]);

  interface IFormRoom {
    _id: number;
    roomNumber: string;
    price: number;
    capacity: number;
    discount: number;
    imgs: string[];
    facilities: [];
  }

  // start sec selct
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [images, setImages] = useState([]);

  const handleFileChange = (event: any) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file as Blob));
    setImages((prevImages): any => [...prevImages, ...imageUrls]);
    // Check if more than one file is selected
    if (files.length > 1) {
      console.log("More than one file selected:", files);
    }
    setSelectedFiles((prevFiles): any => [...prevFiles, ...files]);
  };

  const [facilty, setfacilty] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof facilty>) => {
    const {
      target: { value },
    } = event;
    setfacilty(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    console.log(facilty);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    boxShadow: "none",
    color: 'var(--secondary-color)',
    ...(theme.palette.mode === 'dark' && { backgroundColor: "#1A2027" }),
  }));
  return (
    <>
      <Grid container spacing={2} mt={10}>
        <Grid size={{ md: 8, sm: 12 }} offset={{ md: 2, sm: 0 }}>
         
        <Typography sx={{ fontWeight: "bold" , mb: 3}} variant="h5">
        {isNewRoom ? "Add New Room" : "Edit Room Data"} 
            </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
          <InputLabel htmlFor="room-number" sx={{ color: 'var(--gray-color)' }}>
            Room Number
          </InputLabel>
          <TextField
            id="room-number"
            fullWidth
            variant="outlined"
            type="text"
            sx={{ marginBottom: "1rem", color: 'var(--primary-color)' }}
            {...register("roomNumber", { required: "Room number is required" })}
            error={!!errors.roomNumber}
            helperText={errors.roomNumber ? errors.roomNumber.message : ""}
          />

          <Box sx={{display: 'flex' , justifyContent: 'space-around' ,textAlign: 'left'}}>
          <InputLabel htmlFor="price" sx={{ color: 'var(--gray-color)', marginRight: "1rem" }}>
            Price
          </InputLabel>
          <InputLabel htmlFor="Capacity" sx={{ color: 'var(--gray-color)', marginRight: "1rem" }}>
          Capacity
          </InputLabel>
          </Box>
          <Box
            sx={{
              display: { md: "flex", sm: "block" },
              justifyContent: "space-between",
            }}
          >
    
            <TextField
              fullWidth
              id="price"
              variant="outlined"
              type="text"
              sx={{
                marginBottom: "1rem ",
                width: { md: "48%", sm: "100%" },
              }}
              {...register("price", {
                required: "price is required",
              })}
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ""} // Display error message
            />

            <TextField
              fullWidth
              id="Capacity"
              variant="outlined"
              type="number"
              sx={{
                marginBottom: "1rem ",
                width: { md: "48%", sm: "100%" },
              }}
              {...register("capacity", {
                required: "capacity is required",
              })}
              error={!!errors.capacity}
              helperText={errors.capacity ? errors.capacity.message : ""} // Display error message
            />
          </Box>

          <Box sx={{display: 'flex' , justifyContent: 'space-around' ,textAlign: 'left'}}>
          <InputLabel htmlFor="Discount" sx={{ color: 'var(--gray-color)', marginRight: "1rem" }}>
          Discount
          </InputLabel>
          <InputLabel htmlFor="Facility" sx={{ color: 'var(--gray-color)', marginRight: "1rem" }}>
          Facility
          </InputLabel>
          </Box>
            <Box
              sx={{
                display: { md: "flex", sm: "block" },
                justifyContent: "space-between",
              }}
            >
              <TextField
                fullWidth
                id="Discount"
                variant="outlined"
                type="number"
                sx={{
                  marginBottom: "1rem ",
                  width: { md: "48%", sm: "100%" },
                  color: 'var(--primary-color)',

                }}
                {...register("discount", {
                  required: "Discount is required",
                })}
                error={!!errors.discount}
                helperText={errors.discount ? errors.discount.message : ""} // Display error message
              />
    
              <FormControl
                sx={{
                  marginBottom: "1rem ",
                  width: { md: "48%", sm: "100%" },
                }}
              >
                <InputLabel id="demo-multiple-name-label fullWidth" sx={{color: 'var(--gray-color)'}}>
                  Facility
                </InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  multiple
                  fullWidth
                  value={facilty}
                  {...register("facilities", {
                    required: "facilities is required",
                  })}
                  error={!!errors.facilities}
                  onChange={handleChange}
                  input={<OutlinedInput label="facility" />}
                  MenuProps={MenuProps}
                >
                  {facility.map((fac) => (
                    <MenuItem
                      key={fac._id}
                      value={fac._id}
                      // style={getStyles(f, fac, theme)}
                    >
                      {fac.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl> 
            </Box>

            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                fontWeight: '900',
                color: 'var(--primary-color)',
                width: "100%",
                backgroundColor: "var(--light-blue)",
                border: "1px dashed var(--primary-color)",
                lineHeight: "10vh",
                boxShadow: "none",
              }}
            >
              Drag & Drop or Choose a Room Images to Upload
              <VisuallyHiddenInput
                type="file"
                multiple
                {...register("imgs", {
                  required: "imgs is required",
                })}
                onChange={handleFileChange}
              />
            </Button>
            <Box sx={{}}>
              {images.map((image, index) => (
                <img
                  src={image}
                  alt={`uploaded-img-${index}`}
                  style={{
                    width: "100px",
                    height: "100px ",
                    margin: "1rem 1rem  1rem 0",
                  }}
                />
              ))}
            </Box>

            <Button
              variant="outlined"
              sx={{ mt: "1rem", mr: "1rem", padding: "0.5rem 2rem" }}
            >
              <Link
                to="/dashboard/rooms-list"
                style={{ color: "var(--primary-color)", textDecoration: "none" }}
              >
                cancel
              </Link>
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: "1rem",
                mr: "1rem",
                padding: "0.5rem 3rem",
                backgroundColor: "var(--primary-color)",
              }}
            >
             {isNewRoom ? "save" :"update"}
            </Button>
          </Box>
        </Grid>


      </Grid>
    </>
  );
}
