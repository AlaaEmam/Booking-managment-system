import React from 'react';
import { Modal, Box, Typography, IconButton, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon, Public as PublicIcon, AssignmentInd as RoleIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';

// Styled components
const Cover = styled(Box)({
  position: 'relative',
  height: '200px',
  backgroundImage: "url('http://farm9.staticflickr.com/8370/8553416434_8cfb7e205f.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const Title = styled(Typography)({
  fontSize: '1.5rem',
  padding: '0',
  textAlign: 'center',
  marginTop: '40px',
  color: 'red',
  fontWeight: 'bolder',
});

const IconContainer = styled(Box)({
  position: 'absolute',
  top: '200px',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '100px',
  width: '100px',
  border: '5px solid #ffffff',
  borderRadius: '50%',
  background: 'linear-gradient(rgb(13, 0, 255),rgb(12, 39, 101))',
  color: '#ffffff',
  textAlign: 'center',
  fontSize: '4rem',
  lineHeight: '1.5',
});

const Text = styled(Typography)({
  fontSize: '1rem',
  color: 'gray',
});

const ModalContent = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: '400px',
  background: '#ffffff',
  boxShadow: '0px 0px 50px rgba(68, 68, 68, 0.5)',
  padding: '16px',
});

interface UserListProps {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: string;
  country: string;
  role: string;
  createdAt: string;
  profileImage: string;
}

const UserProfileModal: React.FC<{ open: boolean; user: UserListProps | null; onClose: () => void }> = ({ open, user, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Cover />
        <IconContainer>
          <PersonIcon fontSize="inherit" />
        </IconContainer>

        <Title>{user?.userName}</Title>

        <Grid container spacing={1} sx={{ padding: '10px 25px' }}>
          <Grid item xs={12} container alignItems="center">
            <EmailIcon />
            <Text sx={{ marginLeft: '8px' }}>{user?.email}</Text>
          </Grid>
          <Grid item xs={12} container alignItems="center">
            <PhoneIcon />
            <Text sx={{ marginLeft: '8px' }}>{user?.phoneNumber}</Text>
          </Grid>
          <Grid item xs={12} container alignItems="center">
            <PublicIcon />
            <Text sx={{ marginLeft: '8px' }}>{user?.country}</Text>
          </Grid>
          <Grid item xs={12} container alignItems="center">
            <RoleIcon />
            <Text sx={{ marginLeft: '8px' }}>{user?.role}</Text>
          </Grid>
          <Grid item xs={12} container alignItems="center">
            <CalendarIcon />
            <Text sx={{ marginLeft: '8px' }}>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
            </Text>
            </Grid>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default UserProfileModal;