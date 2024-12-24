import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import {
  Button,
  ButtonGroup,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
  ".MuiInputBase-input ": {
    textAlign: "center",
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

  const navigate= useNavigate()
  //increase and decrese

  const [capacity, setCapacity] = useState<number>(1);

  

  const handleIncrease = () => {
    setCapacity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setCapacity((prev) => Math.max(1, prev - 1));
  };
  const explore = () => {
    localStorage.setItem("capacity", capacity.toString());
    navigate(`/explore-rooms/${capacity}`)
  };

  const getStartdDate = (date: any | null) => {
    localStorage.setItem("startDate", date.toISOString());
  };

  const getEndDate = (date: any | null) => {
    localStorage.setItem("endDate", date.toISOString());
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{ md: 6 }} sx={{ paddingRight: "2rem" }}>
            <Item>
              <Typography variant="h4" gutterBottom>
                Forget Busy Work, Start Next Vacation
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                We provide what you need to enjoy your holiday with family. Time
                to make another memorable moments.
              </Typography>

              <Typography variant="h6" gutterBottom>
                Start Booking{" "}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                Pick a Date{" "}
              </Typography>
            </Item>
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
                <Typography variant="subtitle2" gutterBottom>
                  Capacity
                </Typography>
                <Box display="flex" alignItems="center">
                  <ButtonGroup
                    disableElevation
                    variant="contained"
                    aria-label="Disabled button group"
                    fullWidth
                  >
                    <Button sx={{ width: "20%" }} onClick={handleDecrease}>
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
                    <Button sx={{ width: "20%" }} onClick={handleIncrease}>
                      +
                    </Button>
                  </ButtonGroup>
                </Box>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    fontFamily: "Poppins",
                    width: "50%",
                    my: "1rem",
                  }}
                  onClick={ explore}
                >
                  Explore
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Item></Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
