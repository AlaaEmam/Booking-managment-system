import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Typography, Link } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EmailValidation, PasswordValidation } from "../../../../constants/validations";
import LoginImage from '../../../../assets/LoginImage.png'; 
import LogoImage  from '../../../../assets/Logo.svg';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import FormHelperText from '@mui/material/FormHelperText';
import { ADMINAUTHURLS, axiosInstance, PORTALAUTHURLS } from '../../../../constants/URLS';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../context/AuthContext';
import axios from 'axios';


interface LoginData {
  email: string;
  password: string;
  isAdmin: boolean; // Add this field

};



export default function Login() {

  const navigate= useNavigate();
  const { register, handleSubmit, formState: { errors ,isSubmitting } } = useForm<LoginData>();
  const {saveLoginData}:any=React.useContext(AuthContext);

  
  //Handel Login data
  const [isAdmin, setIsAdmin] = React.useState(false); // Default to user login

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const loginUrl = isAdmin
        ? `https://upskilling-egypt.com:3000/api/v0/admin/users/login`
        : `https://upskilling-egypt.com:3000/api/v0/portal/users/login`;
  
      // Send data directly
      const response = await axios.post<{ data: { token: string; role: string } }>(loginUrl, {
        email: data.email,
        password: data.password,
      });
  
      console.log("Login response:", response); // Log the response
  
      // Access token and role from the response
      const token = response.data.data.token;
      const role = response.data.data.role;
  
      // Check if the response is valid
      if (token) {
        toast.success("Login Succeeded");
        localStorage.setItem("token", token);
        saveLoginData();
  
        // Navigate based on role
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/homepage");
        }
      } else {
        toast.error("Invalid login response");
      }
    } catch (error: any) {
      console.error("Login error:", error); // Log the error
      toast.error(error.response?.data.message || "Login failed");
    }
  };
  
  //Handel show password
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

 
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "left",
  border: "none",
  position: "relative", 
  overflow: "hidden",      
}));

const OverlayText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  bottom: "20%",        
  transform: "translateX(-50%)",
  color: "white",        
  textAlign: "left",
  padding: "10px",
  borderRadius: "5px",
}));

  return (
    <Grid container sx={{textAlign: 'left'}}>
      <Grid item xs={12} md={6} >
      <Item sx={{ margin: "5%", boxShadow: "none" }}>
          <img src={LogoImage} alt="Login"  />
        </Item>
        <Item
          sx={{
            padding: {
              xs: " 1.25rem",
              sm: "3.125rem",
              md: "6.25rem",
              lg: "0.125rem 9.25rem",
            },
            boxShadow: "none",
          }}
        >

          <Typography  sx={{fontSize: '30px',fontWeight: 'bolder', marginBottom: "10px" }}>Sign in</Typography>
          <Typography >
          If you don’t have an account register </Typography>

            <Typography  sx={{ marginBottom: "2rem" }}>
            You can <Link
              onClick={() => navigate("/registration")}
              underline="none"
              sx={{ color: 'var(--primary-color)',fontWeight: 'bolder', cursor: "pointer" }}
            > Register here!
            </Link>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="subtitle1" sx={{  marginBottom: "-1rem" ,color: 'var(--primary-color)', fontWeight: 'bolder'}}>Email Address</Typography>
            <TextField
            sx={{ marginBottom: '1rem'}}
              placeholder="Please type here"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", EmailValidation)}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />

        <Typography variant="subtitle1" sx={{ marginBottom: "-0.1rem", color: 'var(--primary-color)', fontWeight: 'bolder' }}>
                Password
              </Typography>
              <TextField
                placeholder="Please type here"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                {...register("password", PasswordValidation)}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />



            {/* <Link
              component="button"
              onClick={() => navigate("/forget-password")}
              sx={{ color: 'var(--light-color)' ,textDecorationColor:'var(--light-color)' , textAlign: 'right'}}
            > Forgot Password ?
            </Link> */}
            <Button
              disabled={isSubmitting}
              sx={{ marginTop: "20%" }}
              variant="contained"
              size="large"
              type="submit"
              fullWidth
            >
            {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Item>
      </Grid>
      <Grid item md={6} xs={12}>
      <Item >
        <img src={LoginImage} alt="Login" style={{ width: "100%", height: "97vh"}} />
        <OverlayText sx={{ left: "35%", fontSize: "40px", fontWeight: 'bolder'}}>
          Sign in to Roamhome
        </OverlayText>
        <OverlayText  sx={{left: '23%' ,textAlign: 'left' ,fontSize: "20px",  bottom: "15%" }}>
          Homes as unique as you.
        </OverlayText>
      </Item>
    </Grid>
    </Grid>
  );
}