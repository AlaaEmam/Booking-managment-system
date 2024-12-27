import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Link,
  Container,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { useAuth } from "../../../../../../context/AuthContext"; // Custom hook
import { useNavigate } from "react-router-dom";
import { Notifications } from "@mui/icons-material";
import LogoImage from '../../../../../../assets/Logo.svg';

export default function Navbar() {
  const { loginData, clearLoginData } = useAuth(); // استخدام AuthContext
  const navigate = useNavigate();

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
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        color: "black",
        borderBottom: "1px solid #ddd",
        p: 1,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar>
         
         <Box
            sx={{
              flexGrow: 1,
          
            }}
          >
            <Link onClick={() => navigate("/")} >
            <img src={LogoImage} alt="logo" style={{width: "150px"}}/>
            </Link>
          </Box>
       

          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Link
              onClick={() => navigate("/")}
              underline="none"
              sx={{
                color: "primary.main",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Home
            </Link>
            <Link
              onClick={() => navigate("/explore-rooms")}
              underline="none"
              sx={{ color: "black", fontWeight: "500", cursor: "pointer" }}
            >
              Explore
            </Link>
            {loginData && (
              <>
                <Link
                  onClick={() => navigate("/reviews")}
                  underline="none"
                  sx={{ color: "black", fontWeight: "500", cursor: "pointer" }}
                >
                  Reviews
                </Link>
                <Link
                  onClick={() => navigate("your-favorite")}
                  underline="none"
                  sx={{ color: "black", fontWeight: "500", cursor: "pointer" }}
                >
                  Favorites
                </Link>
              </>
            )}

            {loginData ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Avatar
                  alt="User Profile"
                  src={
                    loginData.profilePicture ||
                    "https://i.pravatar.cc/150?img=32"
                  }
                  sx={{ width: 40, height: 40, marginRight: 1 }}
                />
                <Typography variant="body1" sx={{ fontWeight: "500" }}>
                  {loginData.name || "User"}
                </Typography>
                <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
                  <ArrowDropDownIcon />
                </IconButton>
                <IconButton size="small" sx={{ ml: 1 }}>
                  <Notifications />
                </IconButton>
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
                  <MenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/settings")}>
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/auth/change-password")}>
                    Change Password
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      clearLoginData();
                      navigate("/auth/login");
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    fontFamily: "Poppins",
                  }}
                  onClick={() => navigate("auth/registration")}
                >
                  Registration
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate("/auth/login")}
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    fontFamily: "Poppins",
                    boxShadow: "0px 8px 15px 0px rgba(50, 82, 223, 0.30)",
                  }}
                >
                  Login Now
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
