import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance, PORTALBOOKING, PORTALROOMS } from "../../../../constants/URLS";
import {
  CardMedia,
  Container,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";  // استخدم Grid بدلاً من Grid2
import { styled } from "@mui/material/styles";

import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { toast } from "react-toastify";

interface rooms_IF {
  _id: number;
  roomNumber: string;
  price: string;
  capacity: string;
  discount: string;
  images: string[];
  facilities: string[];
}

const CssTextField = styled(TextField)({
  ".MuiInputBase-input": {
    textAlign: "center",
    color: "var(--primary-color)",
    height: "1rem",
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const CssDatePicker = styled(DatePicker)({
  ".MuiInputBase-root": {
    background: "var(--blue)",
    border: "none !important",
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none",
    height: "1rem",
  },
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  boxShadow: "none",
  ...theme.applyStyles("dark", {}),
}));

export default function RoomDeta() {
  const navigator = useNavigate();
  const [roomDetails, setRoomDetails] = useState<rooms_IF>({
    _id: 0,
    roomNumber: "string",
    price: "",
    capacity: "",
    discount: "",
    images: [""],
    facilities: [""],
  });
  const { room_id } = useParams<{ room_id: any }>();

  const getRoomDetails = async (id: string) => {
    try {
      const res = await axiosInstance.get(PORTALROOMS.getRoomDetails(`${id}`));
      setRoomDetails(res.data.data.room);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomDetails(room_id);
  }, []);

  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setendDate] = useState<dayjs.Dayjs | null>(null);

  useEffect(() => {
    const startDate = localStorage.getItem("startDate");
    const endDate = localStorage.getItem("endDate");

    if (startDate && endDate) {
      setStartDate(dayjs(startDate));
      setendDate(dayjs(endDate));
    }
  }, []);

  const addStartDate = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      localStorage.setItem("startDate", newValue.toISOString());
    }
    setStartDate(newValue);
  };

  const addEndDate = (newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      localStorage.setItem("endDate", newValue.toISOString());
      setendDate(newValue);
    }
  };

  const calcDays = async () => {
    console.log(setRoomDetails)
       if (!startDate || !endDate) {
      toast.error("Please select both start and end dates.");
      return;
    }
    const start = new Date(startDate.toISOString());
    const end = new Date(endDate.toISOString());

    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    const res = await axiosInstance.post(PORTALBOOKING.createBooking, {
      startDate: startDate,
      endDate: endDate,
      room: room_id,
      totalPrice: "1000", // تم تحديد السعر كمثال
    });
    toast.info("Booking created");
    navigator(`/Booking/${res.data.data.booking._id}`);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" spacing={2} sx={{ my: "4rem" }}>
          <Grid item xs={12} sx={{ paddingRight: "2rem", backgroundColor: "whitesmoke" }}>
            <Stack sx={{ color: "rgb(1, 7, 120)", justifyContent: "center", alignItems: "center" }}>
              <Typography variant="h4">{roomDetails.roomNumber}</Typography>
            </Stack>
          </Grid>

          {roomDetails.images.map((image, index) => (
            <Grid item xs={6} key={index}>
              <CardMedia component="img" height="300" image={image} alt={`Image ${index + 1}`} sx={{ borderRadius: "5px" }} />
              <Typography variant="body2" color="text.secondary" align="center">
                Image {index + 1}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom variant="subtitle1">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining
              essentially unchanged.
            </Typography>
            {roomDetails.facilities.map((item, index) => (
              <Grid item xs={4} key={index}>
                {item}
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} sx={{ border: "1px solid var(--txt-gray)", padding: "3rem" }}>
            <Typography mb={2} variant="h6">
              Start Booking
            </Typography>

            <Typography style={{ display: "flex", alignItems: "center", fontSize: "2rem" }} mb={2}>
              <span style={{ color: "var(--green-btn)", marginRight: "1rem" }}>${roomDetails.price}</span>
              <span style={{ color: "var(--txt-gray)" }}> Per Night</span>
            </Typography>

            <Typography mb={2} variant="h6" sx={{ color: "var(--red)" }}>
              Discount {roomDetails.discount} % Off
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
              <Item sx={{ width: "50%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <CssDatePicker value={startDate} onChange={addStartDate} label="Start Date" sx={{ width: "100%" }} />
                  </DemoContainer>
                </LocalizationProvider>
              </Item>

              <Item sx={{ width: "50%" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <CssDatePicker value={endDate} onChange={addEndDate} label="End Date" sx={{ width: "100%" }} />
                  </DemoContainer>
                </LocalizationProvider>
              </Item>
            </Stack>

            <Button
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                py: "0.7rem",
                margin: "3rem 0",
                borderRadius: 1,
                textTransform: "none",
                fontFamily: "Poppins",
                boxShadow: "0px 8px 15px 0px rgba(50, 82, 223, 0.30)",
              }}
              onClick={calcDays}
            >
              Continue Booking
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
