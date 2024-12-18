import {
  Button,
  Grid,
  Link,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import forgetImg from '../../../../assets/forget-pass.png';
import LogoImage from '../../../../assets/Logo.svg';
import { axiosInstance, PORTALAUTHURLS } from '../../../../constants/URLS';
import { EmailValidation } from '../../../../constants/validations';
interface formData {
  email: string;
}
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
export default function ForgetPassword() {
  const navigate = useNavigate();
  let {
    register,
    formState: { isSubmitting, errors },
    handleSubmit,
  } = useForm<formData>();

  const onSubmit = async (data: formData) => {
    try {
      const response = await axiosInstance.post(
        // `https://upskilling-egypt.com:3000/api/v0/portal/users/forgot-password`,
        PORTALAUTHURLS.forgetPassword,
        data,
      );
      console.log(response);
      toast.success(response.data.message || 'check your mail');
      navigate('/reset-password', { state: data.email });
    } catch (error) {
      console.log(error);
      toast.error('failed');
    }
  };

  return (
    <Grid container sx={{ textAlign: 'left' }}>
      <Grid item xs={12} md={6}>
        <Item sx={{ margin: '5%', boxShadow: 'none' }}>
          <img src={LogoImage} alt="Login" />
        </Item>
        <Item
          sx={{
            padding: {
              xs: ' 1.25rem',
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
            Forgot password
          </Typography>
          <Typography>If you don’t have an account register </Typography>

          <Typography sx={{ marginBottom: '2rem' }}>
            You can{' '}
            <Link
              onClick={() => navigate('/login')}
              underline="none"
              sx={{
                color: '#eb5149',
                fontWeight: 'bolder',
                cursor: 'pointer',
                marginLeft: '10px',
              }}
            >
              {' '}
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
              Email
            </Typography>
            <TextField
              placeholder="Please type here ..."
              variant="outlined"
              fullWidth
              margin="normal"
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
              }}
              {...register('email', EmailValidation)}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
            />

            <Button
              disabled={isSubmitting}
              sx={{ marginTop: '5%' }}
              variant="contained"
              size="large"
              type="submit"
              fullWidth
            >
              {isSubmitting ? 'Sending...' : 'Send mail'}
            </Button>
          </form>
        </Item>
      </Grid>
      <Grid item md={6} xs={12}>
        <Item>
          <img
            src={forgetImg}
            alt="Login"
            style={{ width: '100%', height: '97vh' }}
          />
        </Item>
      </Grid>
    </Grid>
  );
}
