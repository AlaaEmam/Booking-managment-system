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
import ChangePasswordImage from '../../../../assets/changePassword.jpg'; 
import LogoImage  from '../../../../assets/logo.png';
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


interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword:string;
  isAdmin: boolean; // Add this field

};




export default function ChangePassword() {

  const navigate= useNavigate();
  const { register, handleSubmit, formState: { errors ,isSubmitting } } = useForm<ChangePassword>();
  

  
  const [isAdmin, setIsAdmin] = React.useState(false); 
  const onSubmit: SubmitHandler<ChangePassword> = async (data) => {
    try {
      debugger;
       const changePassword = isAdmin ? ADMINAUTHURLS.changePassword : PORTALAUTHURLS.changePassword;

      const response = await axiosInstance.post<{ token: string;  role: string  }>(changePassword, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
        
      });
      
      // Navigate based on role
      if (response.data.role === "admin") {
        toast.success("Password changed successfully!");
        navigate("/dashboard");
      } else {
        navigate("/booking"); // Navigate to home page for users
      } debugger;
    } catch (error: any) {
      toast.error(error.response?.data.message || "Change Password failed");
    }
  };

  //Handel show password
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmNewPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

  const handleClickShowConfirmNewPassword = () => setShowConfirmPassword((show) => !show);

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
          <img src={LogoImage} alt="ChangePassword"  />
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

          <Typography  sx={{fontSize: '30px',
            fontWeight: 'bolder', marginBottom: "10px" }}>Change Password</Typography>
          <Typography >

          </Typography>

            <Typography  sx={{ marginBottom: "2rem" }}>
            If you already have an account registered <Link
              onClick={() => navigate("/login")}
              underline="none"
              sx={{ color: 'var(--primary-color)',fontWeight: 'bolder', cursor: "pointer" }}
            > Login here!
            </Link>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Old Password */}
            <Typography variant="subtitle1" 
            sx={{  marginBottom: "-1rem" ,color: 'var(--primary-color)', fontWeight: 'bolder'}}>
              Old Password
              </Typography>
            <TextField
            sx={{ marginBottom: '1rem'}}
              placeholder="Please type here"
              type={showOldPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("oldPassword", PasswordValidation)}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword ? errors.oldPassword.message : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showOldPassword ? 'Hide password' : 'Show password'}
                      onClick={handleClickShowOldPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

              <Typography variant="subtitle1" sx={{marginBottom: "-0.1rem",  color: 'var(--primary-color)', fontWeight: 'bolder' }}>
                New Password
              </Typography>
              <TextField
                placeholder="Please type here"
                variant="outlined"
                type={showNewPassword ? 'text' : 'password'}
                fullWidth
                {...register("newPassword", PasswordValidation)}
                error={!!errors.newPassword}
                helperText={errors.newPassword ? errors.newPassword.message : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography variant="subtitle1" sx={{marginTop: "5%" , marginBottom: "-0.1rem", color: 'var(--primary-color)', fontWeight: 'bolder' }}>
                Confirm New Password
              </Typography>
              <TextField
                placeholder="Please type here"
                variant="outlined"
                type={showConfirmNewPassword ? 'text' : 'password'}
                fullWidth
                {...register("confirmNewPassword", PasswordValidation)}
                error={!!errors.confirmNewPassword}
                helperText={errors.confirmNewPassword ? errors.confirmNewPassword.message : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showConfirmNewPassword ? 'Hide password' : 'Show password'}
                        onClick={handleClickShowConfirmNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

            <Button
              disabled={isSubmitting}
              sx={{ marginTop: "10%" }}
              variant="contained"
              size="large"
              type="submit"
              fullWidth
            >
            {isSubmitting ? "Changing password..." : "Change Password"}
            </Button>
          </form>
        </Item>
      </Grid>
      <Grid item md={6} xs={12}>
      <Item >
        <img src={ChangePasswordImage} alt="chagePassword" style={{ width: "100%", height: "97vh"}} />
        <OverlayText sx={{ left: "35%", fontSize: "40px", fontWeight: 'bolder'}}>
          Change Password
        </OverlayText>
        <OverlayText  sx={{left: '23%' ,textAlign: 'left' ,fontSize: "20px",  bottom: "15%" }}>
          Homes as unique as you.
        </OverlayText>
      </Item>
    </Grid>
    </Grid>
  );
}