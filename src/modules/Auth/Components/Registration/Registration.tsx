import React, { useState } from "react";
//import * as React from 'react';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { Button, colors, Container, SvgIcon, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Card, CardMedia, CardContent } from "@mui/material";
import {
  EmailValidation,
  PasswordValidation,
  PhoneNumberValidation,
  UserNameValidation,
} from "../../../../constants/validations";
import "./reg.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import regist from "../../../../assets/regist.png";
import logo from "../../../../assets/logo.png";

import Link from "@mui/material/Link";
import Login from "../Login/Login";
import { useNavigate } from "react-router-dom";
import { axiosInstance, PORTALAUTHURLS } from "../../../../constants/URLS";
import { toast } from "react-toastify";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type Inputs = {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage: string;
  role: string;
};

export default function Registration() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let formata = new FormData();
    formata.append("userName", data.userName);
    formata.append("email", data.email);
    formata.append("country", data.country);
    formata.append("phoneNumber", data.phoneNumber);
    formata.append("profileImage", data?.profileImage[0]);
    formata.append("password", data.password);
    formata.append("confirmPassword", data.confirmPassword);
    formata.append("role", data.role);

    try {
      console.log(data);
      const res = await axiosInstance.post(PORTALAUTHURLS.createUser,formata)
      // const res = await axios.post(
      //   "https://upskilling-egypt.com:3000/api/v0/portal/users",
      //formata
      // );
      toast.success(res.data.message);
      navigate('/auth/login')
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    border: "none",
  }));

 
  return (
    <>


      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Item
            sx={{
              padding: {
                xs: "20px", // 20px padding for extra-small screens
                sm: "50px", // 30px padding for small screens and up
                md: "100px", // 40px padding for medium screens and up
                lg: "  100px", // 50px padding for large screens and up
              },
              boxShadow: "none",
            }}
          >
            <CardMedia
              component="img"
              style={{
                width: "auto",
                position: "absolute",
                top: "35px",
                left: "35px",
              }}
              image={logo}
              alt="Example Image"
            />

            <Typography variant="h5">Sign up</Typography>
            <Typography variant="h6" style={{ marginBottom: "20px" }}>
              If you already have an account register You can
              <Link
                onClick={() => {
                  navigate("/auth/login");
                }}
                className="text-danger"
                underline="none"
                sx={{ color: "red", cursor: "pointer" }}
              >
                {"   Login here !"}
              </Link>
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Typography sx={{ display: "none" }} variant="subtitle1">
                role{" "}
              </Typography>
              <TextField
                placeholder="Please type here ..."
                variant="filled"
                fullWidth
                margin="dense"
                sx={{ display: "none" }}
                className="custom-textfield "
                value={"user"}
                {...register("role")}
              />

              <Typography variant="subtitle1">user name</Typography>
              <TextField
                placeholder="Please type here ..."
                variant="outlined"
                required
                fullWidth
                margin="dense"
                className="custom-textfield"
                size="small"
                {...register("userName", UserNameValidation)}
              />

              {errors.userName && (
                <span className="text-danger">{errors.userName.message}</span>
              )}

              <Typography variant="subtitle1">Email Address</Typography>
              <TextField
                placeholder="Please type here "
                variant="outlined"
                fullWidth
                margin="dense"
                className="custom-textfield"
                size="small"
                {...register("email", EmailValidation)}
              />
              {errors.email && (
                <span className="text-danger">{errors.email.message}</span>
              )}

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle1">Phone Number </Typography>

                  <TextField
                    placeholder="Phone Number"
                    variant="outlined"
                    margin="dense"
                    type="number"
                    className="custom-textfield"
                    size="small"
                    sx={{ border: "none" }}
                    {...register("phoneNumber", PhoneNumberValidation)}
                  />
                  <Typography variant="subtitle1">
                    {" "}
                    {errors.phoneNumber && (
                      <span className="text-danger">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1"> Country</Typography>

                  <TextField
                    placeholder="Please type here "
                    size="small"
                    variant="outlined"
                    margin="dense"
                    className="custom-textfield"
                    type="text"
                    {...register("country", {
                      required: "country is required",
                    })}
                  />
                  <Typography variant="subtitle1">
                    {errors.country && (
                      <span className="text-danger">
                        {errors.country.message}
                      </span>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="subtitle1"> Password</Typography>

              <TextField
                placeholder="Please type here "
                variant="outlined"
                type="password"
                className="custom-textfield"
                size="small"
                fullWidth
                margin="dense"
                {...register("password", PasswordValidation)}
              />
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
              <Typography variant="subtitle1"> Confirm Password</Typography>

              <TextField
                placeholder="Please type here "
                variant="outlined"
                type="password"
                fullWidth
                margin="dense"
                size="small"
                className="custom-textfield"
                {...register("confirmPassword", PasswordValidation)}
              />
              {errors.confirmPassword && (
                <span className="text-danger">This field is required</span>
              )}

              <Typography variant="subtitle1"> Upload Your photo</Typography>

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Image
                <VisuallyHiddenInput
                  type="file"
                  {...register("profileImage")}
                  // onChange={(event) => {
                  //   console.log(event.target.files);
                  // }}
                  multiple
                />
              </Button>



              <Button
                sx={{ marginTop: "1rem" }}
                variant="contained"
                size="large"
                type="submit"
                fullWidth
              >
                Sign up
              </Button>
            </form>
          </Item>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Item sx={{ position: "sticky", top: "0", boxShadow: "none" }}>
            {/* <img src={regist} alt="" full /> */}

            <CardMedia component="img" image={regist} alt="Example Image" />
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
