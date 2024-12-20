import {
  AppBar,
  Toolbar,
  Box,
  InputBase,
  Avatar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  ArrowDropDownCircleOutlined,
  Notifications,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../../../context/AuthContext";

export default function NavbarAdmin() {
  let navigate = useNavigate();
  const { clearLoginData, loginData } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handle menu open
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle menu close
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          boxShadow: "none",
          borderRadius: "16px",
          p: 0,
          background: "#F8F9FB",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Search Bar */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              borderRadius: "8px",
              bgcolor: "white",
              px: 2,
              mr: 3,

              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              flexGrow: 1,
            }}
          >
            <SearchIcon sx={{ mr: 1, color: "grey.500" }} />
            <InputBase
              placeholder="Search Here"
              fullWidth
              sx={{ color: "grey.700" }}
            />
          </Box>

          {/* User Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              color: "gray",
            }}
          >
            {/* Circular Profile Image */}
            <Avatar
              alt="User Profile"
              src="https://i.pravatar.cc/150?img=32" // Replace with your image URL
              sx={{ width: 40, height: 40, marginRight: 1 }}
            />

            {/* Text Next to Image */}
            <Typography variant="body1" sx={{ fontWeight: "500" }}>
              {loginData?.userName || "Guest"}
            </Typography>

            {/* Dropdown Icon */}
            <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
              <ArrowDropDownCircleOutlined />
            </IconButton>
            {/* Dropdown Icon */}
            <IconButton size="small" sx={{ ml: 1 }}>
              <Notifications />
            </IconButton>

            {/* Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem
                onClick={() => {
                  clearLoginData();
                  navigate("/login");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
