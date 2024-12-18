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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const authContext = useContext(AuthContext);
  const { loginData } = authContext || {};
  const token = localStorage.getItem("token") || null;

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
            <Typography
              variant="h5"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                color: " #152C5B",
              }}
            >
              <Box component="span" sx={{ color: " #3252DF" }}>
                Stay
              </Box>
              cation.
            </Typography>

            {/* Navigation Links */}
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Link
                href="#"
                underline="none"
                sx={{ color: "primary.main", fontWeight: "500" }}
              >
                Home
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{ color: "black", fontWeight: "500" }}
              >
                Explore
              </Link>
              {loginData && token && (
                <>
                  <Link
                    href="#"
                    underline="none"
                    sx={{ color: "black", fontWeight: "500" }}
                  >
                    Reviews
                  </Link>
                  <Link
                    href="#"
                    underline="none"
                    sx={{ color: "black", fontWeight: "500" }}
                  >
                    Favorites
                  </Link>
                </>
              )}

              {/* Buttons */}
              {loginData && token ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
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
                      Upskilling
                    </Typography>

                    {/* Dropdown Icon */}
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <ArrowDropDownIcon />
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
                      <MenuItem href="/change-password">
                        Change Password
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          localStorage.removeItem("token");
                        }}
                      >
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
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
                  >
                    Register
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    href="/login"
                    sx={{
                      borderRadius: 1,
                      textTransform: "none",
                      fontFamily: "Poppins",
                      boxShadow:
                        "box-shadow: 0px 8px 15px 0px rgba(50, 82, 223, 0.30);",
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
    </>
  );
}
