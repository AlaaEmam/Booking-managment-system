import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import {
  Button,
  ButtonGroup,
  CardMedia,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";
import panner from "../../../../assets/banner.png";

const CssTextField = styled(TextField)({
  ".MuiInputBase-input ": {
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

export default function ExploreSection() {
  const navigate = useNavigate();
  //increase and decrese

  const [capacity, setCapacity] = useState<number>(2);

  const handleIncrease = () => {
    setCapacity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setCapacity((prev) => Math.max(1, prev - 1));
  };
  const explore = () => {
    localStorage.setItem("capacity", capacity.toString());
    navigate(`/explore-rooms/${capacity}`);
  };

  const getStartdDate = (date: any | null) => {
    localStorage.setItem("startDate", date.toISOString());
  };

  const getEndDate = (date: any | null) => {
    localStorage.setItem("endDate", date.toISOString());
  };
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({
    endDate: "2023-01-20",
    startDate: "2023-01-10",
  });
  const toggle = () => setOpen(!open);

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ my: "4rem" }}>
          <Grid size={{ lg: 6, md: 8, sm: 12 }} sx={{ paddingRight: "2rem" }}>
            <Item>
              <Typography
                variant="h3"
                sx={{ color: "var(--primary-color)", fontFamily: "Poppins" }}
                gutterBottom
              >
                Forget Busy Work, Start Next Vacation
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ color: "var(--txt-gray)", margin: "1rem 0" }}
                gutterBottom
              >
                We provide what you need to enjoy your holiday with family. Time
                to make another memorable moments.
              </Typography>

              <Typography
                variant="h5"
                sx={{ color: "var(--primary-color)", fontFamily: "Poppins" }}
                gutterBottom
              >
                Start Booking{" "}
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{ color: "var(--primary-color)", fontFamily: "Poppins" }}
                gutterBottom
              >
                Pick a Date{" "}
              </Typography>


            <Item sx={{ width: "100%}" }}>
              {/* <div>
                <CssTextField
                  id="outlined-basic"
                  fullWidth
                  value={
                    dateRange
                      ? `${dateRange.startDate} : ${dateRange.endDate}`
                      : ""
                  }
                  label=""
                  variant="outlined"
                  sx={{
                    borderRadius: "0",
                    textAlign: "left",
                    padding: 0,
                    backgroundColor: "var(--blue)",
                  }}
                  onClick={() => {
                    toggle();
                  }}
                />
                 <DateRangePicker
                  open={open}
                  toggle={toggle}
                  onChange={(range) => {
                    console.log(range);
                    setDateRange({
                      startDate: range.startDate?.toDateString(),
                      endDate: range.startDate?.toDateString(),
                    });
                    localStorage.setItem(
                      "endDate",
                      range.endDate?.toISOString()
                    );
                    localStorage.setItem(
                      "startDate",
                      range.startDate?.toISOString()
                    );
                  }}
                />
              </div> */}


              <Stack>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ md: 1 }}
              >
                <Item sx={{ width: "50%}" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <CssDatePicker
                        onChange={getStartdDate}
                        label="start date"
                        sx={{ width: "100%" }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Item>

                <Item sx={{ width: "50%}" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <CssDatePicker
                        onChange={getEndDate}
                        label="end date"
                        sx={{ width: "100%" }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Item>
              </Stack>

              <Box sx={{ my: "1rem" }}>
                <Typography
                  sx={{ color: "var(--primary-color)" }}
                  variant="subtitle1"
                  gutterBottom
                >
                  Capacity
                </Typography>
                <Box display="flex" alignItems="center">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                    fullWidth
                  >
                    <Button
                      sx={{ width: "20%", background: "var(--red)" }}
                      onClick={handleDecrease}
                    >
                      -
                    </Button>
                    <CssTextField
                      type="number"
                      sx={{
                        width: "80%",
                        textAlign: "center !important",
                        borderRadius: "0",
                        padding: 0,
                        backgroundColor: "var(--blue)",
                      }}
                      value={capacity}
                      placeholder="2person"
                      InputProps={{
                        readOnly: true,
                        style: { textAlign: "center" }, // Center the text
                      }}
                      variant="outlined"
                      margin="none"
                    />
                    <Button
                      sx={{ width: "20%", background: "var(--green-btn)" }}
                      onClick={handleIncrease}
                    >
                      +
                    </Button>
                  </ButtonGroup>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: "50%",
                    py: "0.7rem",
                    margin: "3rem 0",
                    borderRadius: 1,
                    textTransform: "none",
                    fontFamily: "Poppins",
                    boxShadow: "0px 8px 15px 0px rgba(50, 82, 223, 0.30)",
                  }}
                  onClick={explore}
                >
                  Explore
                </Button>
              </Box>
            </Stack>
            </Item>


            </Item>



          </Grid>
          <Grid size={{ lg: 6, md: 4, sm: 12 }}>
            <Item>

              <img src={panner} alt="" width="100%" />
            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
