import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChangePasswordImage from '../../../../assets/changePassword.jpg';
import LogoImage from '../../../../assets/logo.png';
import { axiosInstance, PORTALAUTHURLS } from '../../../../constants/URLS';
import { PasswordValidation } from '../../../../constants/validations';

interface ResetPassword {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export default function ResetPass() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassword>({ defaultValues: { email: location.state } });

  const onSubmit = async (data: ResetPassword) => {
    // console.log(data);
    try {
      const response = await axiosInstance.post(
        PORTALAUTHURLS.resetPassword,
        data,
      );
      console.log(response);
      toast.success(response.data.message || 'password Updated Successfully');
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('failed');
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    border: 'none',
    position: 'relative',
    overflow: 'hidden',
  }));

  const OverlayText = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    bottom: '20%',
    transform: 'translateX(-50%)',
    color: 'white',
    textAlign: 'left',
    padding: '10px',
    borderRadius: '5px',
  }));

  return (
    <Grid container sx={{ textAlign: 'left' }}>
      <Grid item xs={12} md={6}>
        <Item sx={{ margin: '5%', boxShadow: 'none' }}>
          <img src={LogoImage} alt="Change Password" />
        </Item>
        <Item
          sx={{
            padding: {
              xs: '1.25rem',
              sm: '3.125rem',
              md: '6.25rem',
              lg: '0.125rem 9.25rem',
            },
            boxShadow: 'none',
          }}
        >
          <Typography
            sx={{
              fontSize: '30px',
              fontWeight: 'bolder',
              marginBottom: '10px',
            }}
          >
            Reset Password
          </Typography>
          <Typography sx={{ marginBottom: '2rem' }}>
            Already have an account?{' '}
            <Link
              onClick={() => navigate('/login')}
              underline="none"
              sx={{
                color: 'var(--primary-color)',
                fontWeight: 'bolder',
                cursor: 'pointer',
              }}
            >
              Login here!
            </Link>
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#152C5B',
                fontWeight: 'bold',
              }}
            >
              Email Address
            </Typography>
            <TextField
              // placeholder="Enter your email"
              variant="outlined"
              fullWidth
              margin="normal"
              disabled
              value={location.state || ''} // Set the value explicitly
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#F5F6F8',
                  '& fieldset': {
                    borderColor: '#e0e0e0',
                  },
                  '&:hover fieldset': {
                    borderColor: '#bdbdbd',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3f51b5',
                  },
                },
                '& input': {
                  fontWeight: 'bold',
                  color: 'black',
                },
              }}
            />

            <Typography
              variant="subtitle1"
              sx={{
                color: '#152C5B',
                fontWeight: 'bold',
              }}
            >
              Password
            </Typography>
            <TextField
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              {...register('password', PasswordValidation)}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: '1rem' }}
            />

            <Typography
              variant="subtitle1"
              sx={{
                color: '#152C5B',
                fontWeight: 'bold',
              }}
            >
              Confirm Password
            </Typography>
            <TextField
              placeholder="Confirm your password"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              fullWidth
              {...register('confirmPassword', PasswordValidation)}
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword ? errors.confirmPassword.message : ''
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConfirmPassword ? 'Hide password' : 'Show password'
                      }
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography
              variant="subtitle1"
              sx={{
                color: '#152C5B',
                fontWeight: 'bold',
                marginTop: '1rem',
              }}
            >
              Seed
            </Typography>
            <TextField
              placeholder="Enter seed"
              variant="outlined"
              fullWidth
              {...register('seed', { required: 'Seed is required' })}
              error={!!errors.seed}
              helperText={errors.seed ? errors.seed.message : ''}
            />

            <Button
              disabled={isSubmitting}
              sx={{ marginTop: '10%' }}
              variant="contained"
              size="large"
              type="submit"
              fullWidth
            >
              {isSubmitting ? 'Processing...' : 'Reset Password'}
            </Button>
          </form>
        </Item>
      </Grid>
      <Grid item md={6} xs={12}>
        <Item>
          <img
            src={ChangePasswordImage}
            alt="Reset Password"
            style={{ width: '100%', height: '97vh' }}
          />
          <OverlayText
            sx={{ left: '35%', fontSize: '40px', fontWeight: 'bolder' }}
          >
            Reset Password
          </OverlayText>
          <OverlayText
            sx={{
              left: '23%',
              textAlign: 'left',
              fontSize: '20px',
              bottom: '15%',
            }}
          >
            Homes as unique as you.
          </OverlayText>
        </Item>
      </Grid>
    </Grid>
  );
}
