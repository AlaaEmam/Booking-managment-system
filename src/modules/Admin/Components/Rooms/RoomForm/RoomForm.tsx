import {
  Box,
  Checkbox,
  colors,
  FormControlLabel,
  FormGroup,
  ListItemText,
  TextField,
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
export default function RoomForm() {
  const params = useParams();

  const isNewRoom = params.roomId == undefined;

  const [facility, setFacility] = React.useState<facility[]>([]);

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

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormRoom>({
    defaultValues: {
      imgs: undefined,
      roomNumber: "R-1",
      price: 0,
      capacity: 0,
      discount: 0,
      facilities: [],
    },
  });
  const onSubmit: SubmitHandler<IFormRoom> = async (data) => {
    let formata = new FormData();
    formata.append("roomNumber", data.roomNumber);
    formata.append("capacity", data.capacity.toString());
    formata.append("discount", data.discount.toString());
    formata.append("price", data.price.toString());

    for (let i = 0; i < data.facilities.length; i++) {
      formata.append("facilities[]", data.facilities[i]);
    }

    for (let i = 0; i < selectedFiles.length; i++) {
      formata.append("imgs", selectedFiles[i]);
    }


    try {
      console.log(data.facilities);
      console.log(isNewRoom);
      await axiosInstance[isNewRoom? "post" : "put"](isNewRoom? ADMINROOMS.createRoom : ADMINROOMS.updateRoom(`${params.roomId}`),
        formata
      );
      toast.success("   successfully");
      navigate("/dashboard/rooms-list");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  //getid by params

  useEffect(() => {
    const getFacility = async () => {
      const res = await axiosInstance.get(
        ADMINROOMFACILITIES.getRoomFacilities
      );
      setFacility(res.data.data.facilities);
      console.log(res?.data.data.facilities);
    };
    getFacility();

    if (params.roomId != undefined) {
      const id = params?.roomId;
console.log("result", params?.roomId )
      const getRoomDetails = async () => {
        const res = await axiosInstance.get(ADMINROOMS.getRoomDetails(`${id}`));
        const response = res?.data.data.room;
        console.log(response);
        setValue("roomNumber", response.roomNumber);
        setValue("price", response.price);
        setValue("capacity", response.capacity);
        setValue("discount", response.discount);
        setValue("facilities", response.facilities[0]);
        setValue("imgs", response.imgs);
      };
      getRoomDetails();
    }
  }, []);

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

  return (
    <>

      <Grid container spacing={2} mt={10}>
        <Grid size={{ md: 8, sm: 12 }} offset={{ md: 2, sm: 0 }}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              label="Room Number"
              fullWidth
              variant="outlined"
              type="text"
              sx={{
                marginBottom: "1rem ",
              }}
              {...register("roomNumber", {
                required: "roomNumber is required",
              })}
              error={!!errors.roomNumber}
              helperText={errors.roomNumber ? errors.roomNumber.message : ""} // Display error message
            />
            <Box
              sx={{
                display: { md: "flex", sm: "block" },
                justifyContent: "space-between",
              }}
            >
              <TextField
                label="Price"
                fullWidth
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
                label="capacity"
                fullWidth
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
            <Box
              sx={{
                display: { md: "flex", sm: "block" },
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Discount"
                fullWidth
                variant="outlined"
                type="number"
                sx={{
                  backgroundColor: "var(--light-baby-blue)",
                  marginBottom: "1rem ",
                  width: { md: "48%", sm: "100%" },
                }}
                {...register("discount", {
                  required: "Discount is required",
                })}
                error={!!errors.discount}
                helperText={errors.discount ? errors.discount.message : ""} // Display error message
              />

              <FormControl
                sx={{
                  backgroundColor: "var(--light-baby-blue)",
                  marginBottom: "1rem ",
                  width: { md: "48%", sm: "100%" },
                }}
              >
                <InputLabel id="demo-multiple-name-label fullWidth">
                  facility
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
                width: "100%",
                backgroundColor: "var(--light-green)",
                border: "1px dashed var(--dark-green)",
                color: "currentColor",
                lineHeight: "147px",
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
                error={!!errors.imgs}
                helperText={errors.imgs ? errors.imgs.message : ""}
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
                style={{ color: "var(--dark-blue)", textDecoration: "none" }}
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
                backgroundColor: "var(--dark-blue)",
              }}
            >
             {isNewRoom ? "save" :"update"}
            </Button>
          </Box>
        </Grid>
        <Grid size={{ md: 8, sm: 12 }} offset={{ md: 2, sm: 0 }}></Grid>

      </Grid>
    </>
  );
}
