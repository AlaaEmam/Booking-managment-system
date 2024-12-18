import { Box, Container, Typography, Grid, Link } from "@mui/material";

export default function Footer() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "white",
          color: "black",
          py: 5,
          mt: 5,
          borderTop:"1px solid #ddd",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Logo and Tagline */}
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "#152C5B" }}
              >
                <Box component="span" sx={{ color: "#3252DF" }}>
                  Stay
                </Box>
                cation.
              </Typography>
              <Typography
                variant="body2"
                sx={{ mt: 2, lineHeight: 1.8, color: "#767575" }}
              >
                We kaboom your beauty holiday instantly and memorable.
              </Typography>
            </Grid>

            {/* For Beginners */}
            <Grid item xs={12} sm={2}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#152C5B", mb: 2 }}
              >
                For Beginners
              </Typography>
              <Link href="#" underline="none" color="#767575" display="block">
                New Account
              </Link>
              <Link href="#" underline="none" color="#767575" display="block">
                Start Booking a Room
              </Link>
              <Link href="#" underline="none" color="#767575" display="block">
                Use Payments
              </Link>
            </Grid>

            {/* Explore Us */}
            <Grid item xs={12} sm={2}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#152C5B", mb: 2 }}
              >
                Explore Us
              </Typography>
              <Link href="#" underline="none" color="#767575" display="block">
                Our Careers
              </Link>
              <Link href="#" underline="none" color="#767575" display="block">
                Privacy
              </Link>
              <Link href="#" underline="none" color="#767575" display="block">
                Terms & Conditions
              </Link>
            </Grid>

            {/* Connect Us */}
            <Grid item xs={12} sm={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#152C5B", mb: 2 }}
              >
                Connect Us
              </Typography>
              <Typography variant="body2" color="#767575" display="block">
                support@staycation.id
              </Typography>
              <Typography variant="body2" color="#767575" display="block">
                021 - 2208 - 1996
              </Typography>
              <Typography variant="body2" color="#767575" display="block">
                Staycation, Kemang, Jakarta
              </Typography>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="body2" color="textSecondary">
              Copyright 2025 • All rights reserved • Staycation
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}
