import React from "react";
import complete from "../../../../assets/complete.png";
import { Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";

export default function PaySucssed() {
   const navigate=useNavigate()
  return (
    <>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" spacing={1} sx={{ my: "4rem" }}>
          <Grid sx={{ textAlign: "center" }} size={{ md: 12 }} >
            <img src={complete} alt="" />

            <Typography
              variant="subtitle2"
              sx={{ color: "var(--txt-gray)" }}
              gutterBottom
            >
              We will inform you via email later once the transaction has been
              accepted
            </Typography>

            <Button
              variant="contained"
              size="large"
              sx={{
                py: "1rem",
                px:"3rem",
                marginTop: "2rem ",
                borderRadius: 1,
                textTransform: "none",
                fontFamily: "Poppins",
                boxShadow: "0px 8px 15px 0px rgba(50, 82, 223, 0.30)",
              }}
              onClick={()=>navigate('/')}
            >
              Back to Home{" "}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
