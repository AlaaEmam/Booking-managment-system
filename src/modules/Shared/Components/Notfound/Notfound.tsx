import { Box, Button } from "@mui/material";
export default function Notfound() {
  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        backgroundImage: `url(${`/NotFound.svg`})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        color: "red",
        textAlign: "center",
        pl: 9,
      }}
    >
      <Box>
        {/* <Typography variant="h2" fontWeight="bold" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          The page you are looking for does not exist or has been moved.
        </Typography> */}

        {/* Back to Home Button */}
        <Button
          variant="contained"
          size="large"
          href="/dashboard"
          sx={{
            backgroundColor: "blue",
            paddingX: 6,
            paddingY: 2,
            textTransform: "capitalize",
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Box>
  );
}
