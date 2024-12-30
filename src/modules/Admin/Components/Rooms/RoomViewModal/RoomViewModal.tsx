import * as React from 'react';
import { Modal, Box, Typography, CardMedia, Grid, Divider, Paper } from '@mui/material';
import { styled } from '@mui/system';

interface Facility {
    _id: string;
    name: string;
}

interface RoomViewModalProps {
    open: boolean;
    onClose: () => void;
    roomView: {
        roomNumber: string;
        capacity: string;
        discount: string;
        price: string;
        facilities: Facility[];
        images: string[];
    } | undefined;
}

const Wrapper = styled(Paper)(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    color: 'black',
    padding: theme.spacing(3),
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
}));

const Cover = styled(Box)({
    height: 200,
    color: 'black',
    backgroundImage: "url('https://images.unsplash.com/photo-1505577058444-a3dab90d4253?ixlib=rb-0.3.5&s=fed02ccbe457c9b8fc1f2cf76f30d755&w=600&h=400&q=80&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    borderRadius: '4px 4px 0 0',
});

const RoomViewModal: React.FC<RoomViewModalProps> = ({ open, onClose, roomView }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ textAlign: 'center' }}
        >
            <Box sx={{padding: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrapper>
                <CardMedia
                    component="img"
                    style={{
                    width: '150px',
                    margin: 'auto',
                    borderRadius: '3px',
                    marginBottom: '1rem',
                    }}
                    image={roomView?.images[0] || '/src/assets/roomIcon.png'}
                    alt="Room Image"
                />                    
                    <Typography variant="h5" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
                        Room Details
                    </Typography>
                    <Divider sx={{ my: 2 }} />

                    
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1" fontWeight={600} color="black">Room Number</Typography>
                            <Typography variant="body1"color='var(--gray-color)' >{roomView?.roomNumber}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" fontWeight={600} color="black">Capacity </Typography>
                            <Typography variant="body1"color='var(--gray-color)' >{roomView?.capacity}</Typography>
                        </Grid>
                    </Grid>


                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1"  fontWeight={600} color="black">Discount</Typography>
                            <Typography variant="body1" color='var(--gray-color)'>{roomView?.discount || 'Not available'} %</Typography>
                        </Grid>
                        <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={600} color="black">Price</Typography>
                        <Typography variant="body1" color='var(--gray-color)'>{roomView?.price ?? 'Not available'} LE</Typography>
                    </Grid>
                    </Grid>
                    
                    
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" color="black" sx={{ fontWeight: 600, mb: 1 }}>
                            Room Facilities:
                        </Typography>
                        {roomView?.facilities && roomView.facilities.length > 0 ? (
                            <Box
                                sx={{
                                    textAlign: 'left',
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(2, 1fr)', // Two columns
                                    gap: 1, // Space between items
                                }}
                            >
                                {roomView.facilities.map((facility) => (
                                    <Typography key={facility._id} variant="body1" color='var(--gray-color)' sx={{ mb: 0.5 }}>
                                        <span style={{ marginRight: 4, color: 'black' }}>•</span> {facility.name}
                                    </Typography>
                                ))}
                            </Box>
                        ) : (
                            <Typography variant="body1" color='var(--gray-color)' sx={{ mb: 0.5 }}>
                                No facilities available for this room.
                            </Typography>
                        )}
                    </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={onClose} style={{ padding: '8px 16px', border: 'none', backgroundColor: '#68d391', color: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                            Close
                        </button>
                    </Box>
                </Wrapper>
            </Box>
        </Modal>
    );
};

export default RoomViewModal;