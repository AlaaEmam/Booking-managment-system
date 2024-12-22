import { Outlet } from "react-router-dom";
import SideBar from "../../../Admin/Components/Shared/Components/SideBar/SideBar";
import NavbarAdmin from "../../../Admin/Components/Shared/Components/NavbarAdmin/NavbarAdmin";
import { Box } from "@mui/material";
export default function MasterAdminLayout() {
  return (
    <div>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box sx={{ bgcolor: "primary.main", color: "#fff" }}>
          <SideBar />
        </Box>

        <Box
          sx={{
            width: "100%",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",

          }}
        >
          <Box sx={{}}>
            <NavbarAdmin />
          </Box>

          <Box sx={{ flexGrow: 1,padding:"1rem" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
