import { Box } from "@mui/material";

export default function DashBoard() {
  return (
    <Box
      sx={{
        height: "50vh", // Full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url("/NOt")`, // Replace with your image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black",
        textAlign: "center",
      }}
    >
      dashboard
      
    </Box>
  );
}
