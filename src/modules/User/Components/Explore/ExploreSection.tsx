import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Container, Stack, TextField, Typography } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  boxShadow: "none",
  ...theme.applyStyles("dark", {}),
}));
export default function ExploreSection() {
  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{  md:6 }}>
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
                We provide what you need to enjoy your holiday with family. Time
                to make another memorable moments.
              </Typography>
            </Item>

            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ md: 1 }}
              >
                <Item sx={{ width: "50%}" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker label="start date" sx={{ width: "100%" }} />
                    </DemoContainer>
                  </LocalizationProvider>
                </Item>

              <Item sx={{ width: "50%}" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker label="end date" sx={{ width: "100%" }} />
                    </DemoContainer>
                  </LocalizationProvider>
                </Item>
              </Stack>

          </Grid>
          <Grid size={{ xs: 6, md: 4 }}>
            <Item>

            </Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
