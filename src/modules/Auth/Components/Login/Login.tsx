import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Container,
  IconButton,
  InputAdornment,
  styled,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../../../context/AuthContext";
import LoginImage from "../../../../assets/LoginImage.png";
import Logo from "../../../../assets/Logo.svg";
import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/validations";
interface LoginData {
  email: string;
  password: string;
}

// Styled component
const Item = styled(Paper)(({ theme }) => ({
  textAlign: "left",
  border: "none",
  boxShadow: "none",
}));

export default function Login() {
  const navigate = useNavigate();
  const { saveLoginData } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const loginUrl = `https://upskilling-egypt.com:3000/api/v0/portal/users/login`;

      // Send data directly
      const response = await axios.post(loginUrl, {
        email: data.email,
        password: data.password,
      });

      console.log("Login response:", response); // Log the response

      // Access token and role from the response

      const token = response?.data?.data?.token;
      const role = response?.data?.data?.user?.role;

      console.log("Role:", role);
      console.log("Token:", token);
      // console.log(response.data.data.user.userName);

      // Navigate based on role
      let userData: any = response;
      if (token && role) {
        toast.success("Login Succeeded");
        localStorage.setItem("token", token);
        saveLoginData(userData);

        navigate(role === "admin" ? "/dashboard" : "/homepage");
      } else {
        throw new Error("Invalid login response.");
      }
    } catch (error) {
      const err = error as any;
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
  <Container >

    <Grid
      container
      sx={{ textAlign: "left", display: "flex", alignItems: "center" , justifyContent: "space-around" }}
    >
      <Grid size={{ md: 6 }}>
        <Item
          sx={{
            padding: {
              xs: " 1.25rem",
              sm: "3.125rem",
              md: "6.25rem",
              // lg: "0.125rem 9.25rem",
            },
            boxShadow: "none",
          }}
        >
          <Item sx={{ boxShadow: "none" }}>
            <img
              src={Logo}
              style={{ maxWidth: "100%", width: "80%" }}
              alt="logo"
            />
          </Item>
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "bolder",
              marginBottom: "10px",
            }}
          >
            Sign in
          </Typography>
          <Typography>If you don’t have an account register </Typography>

          <Typography sx={{ marginBottom: "2rem" }}>
            You can
            <Link
              onClick={() => navigate("/auth/registration")}
              underline="none"
              sx={{
                color: "var(--primary-color)",
                fontWeight: "bolder",
                cursor: "pointer",
              }}
            >
              {" "}
              Register here!
            </Link>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: "-1rem",
                color: "var(--primary-color)",
                fontWeight: "bolder",
              }}
            >
              Email Address
            </Typography>
            <TextField
              sx={{ marginBottom: "1rem" }}
              placeholder="Please type here"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", EmailValidation)}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />

            <Typography
              variant="subtitle1"
              sx={{
                marginBottom: "-0.1rem",
                color: "var(--primary-color)",
                fontWeight: "bolder",
              }}
            >
              Password
            </Typography>
            <TextField
              placeholder="Please type here"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              {...register("password", PasswordValidation)}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              disabled={isSubmitting}
              sx={{ marginTop: 4 }}
              variant="contained"
              size="large"
              type="submit"
              fullWidth
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Link
            component="button"
            onClick={() => navigate("/auth/forget-password")}
            sx={{
              color: "var(--light-color)",
              textDecorationColor: "var(--light-color)",
              textAlign: "right",
              mt: 2,
            }}
          >
            Forgot Password ?
          </Link>
        </Item>
      </Grid>
      <Grid
        size={{ md: 6, xs: 12 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height
          overflow: "hidden", // Prevent scrolling
          boxSizing: "border-box",
        }}
      >
        {/* Parent container with relative positioning */}
        <Container
          disableGutters
          sx={{
            position: "relative",
            maxHeight: "100%", // Restrict height to prevent overflow
            maxWidth: "100%", // Ensure it doesn't exceed parent width
            borderRadius: "10px", // Optional: Add rounded corners
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "relative", // To position the background image and text correctly
              height: "100vh", // Full height for this section
              backgroundImage: `url(${LoginImage})`, // Set image as background
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              maxHeight: "100vh",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column", // Stack text vertically
                justifyContent: "center", // Center text vertically
                alignItems: "", // Center text horizontally
                height: "100%", // Full height to match the parent container
                color: "white", // White text for contrast
                margin: 9,
              }}
            >
              {/* Main heading */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "24px", md: "36px" },
                  fontWeight: "bolder",
                }}
              >
                Sign in to Roam Home
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "16px", md: "20px" }, // Responsive font size for smaller screens
                  marginTop: 2, // Add spacing between the heading and sub-heading
                }}
              >
                Homes as unique as you.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
    </Container>

  );
}
