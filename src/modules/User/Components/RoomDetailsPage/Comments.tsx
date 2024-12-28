import React, { useEffect, useState } from 'react'
import bookingImg from "../../../../assets/bookingRoom.jpg";
import { ADMINBOOKING, ADMINROOMS, axiosInstance, PORTALBOOKING, PORTALROOMREVIEW, PORTALROOMS } from '../../../../constants/URLS';
import { Box, Button, Card, Divider, FormControl, Grid, Grid2, ImageListItem, Paper, Rating, Stack, styled, TextField, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


export function Comments(onSubmitComment:any) {
  const {register, handleSubmit, formState: { errors },}=useForm();
  return (<Box
    component="form" 
    noValidate
    autoComplete="off"  
    sx={{  width: '30%', paddingLeft:5}}
    
    onSubmit={handleSubmit(onSubmitComment)}
    
    >
    <Stack>
      <Typography variant='h5'>
        Add your comment
      </Typography>

      <TextField 
      sx={{width:'100%', marginTop:10}} 
      multiline rows={6}
      {...register("comment",{
        required:"Please put your comment here"
      })}
      error={!!errors.comment}
      />
      <Box sx={{marginTop:5, textAlign:'right'}}>
        <Button sx={{ color:'white', paddingX:10,
          backgroundColor:'rgb(50, 82, 223)'}}>Send</Button>

      </Box>
    </Stack>
  </Box>);
}