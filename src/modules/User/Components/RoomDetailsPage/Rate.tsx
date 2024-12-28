import React, { useEffect, useState } from 'react'
import bookingImg from "../../../../assets/bookingRoom.jpg";
import { ADMINBOOKING, ADMINROOMS, axiosInstance, PORTALBOOKING, PORTALROOMREVIEW, PORTALROOMS } from '../../../../constants/URLS';
import { Box, Button, Card, Divider, FormControl, Grid, Grid2, ImageListItem, Paper, Rating, Stack, styled, TextField, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

export function Rate(onSubmitRate:any) {
  
  const {register, handleSubmit, formState: { errors },}=useForm();
  const [value, setValue] = React.useState<number | null>(0);
  return (
    <Box sx={{  width: '30%'}}
    component="form" 
    noValidate
    autoComplete="off"
    onSubmit={handleSubmit(onSubmitRate)}
  >
    <Stack spacing={10} direction={'row'} sx={{marginBottom:5, justifyContent:'space-between'}}>
      
      <Typography  variant='h5'>
      
        Rate 
      </Typography>
      <FormControl {...register("rate",{
        required:"please rate this room"
      })}
      error={!!errors.rate}
      >

        <Rating 
          value={value}
          
          onChange={(event, newValue) => {
            setValue(newValue);
              
          }}/>
      
      </FormControl>
    </Stack>
    
    <Typography variant='h5' sx={{marginBottom:2}}>
      Message
    </Typography>
    
    <TextField sx={{width:'90%'}} multiline
    rows={6} {...register("review", {
      required:"Please put your review before submitting"
    })}
    error={!!errors.review}/>
    
    
    <Button type='submit' sx={{marginTop:5, paddingX:10, color:'white', backgroundColor:'rgb(50, 82, 223)'}}>Rate</Button>
    
  
  </Box>);
}