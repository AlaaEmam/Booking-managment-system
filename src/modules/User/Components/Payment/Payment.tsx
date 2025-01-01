import React, { FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Container, Stack, styled, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { axiosInstance, payment } from "../../../../constants/URLS";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const stripe = loadStripe(
  "pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8"
);

export default function Payment() {

  return (
    <>
      <Elements stripe={stripe}>
        <CheckOutForm />
      </Elements>
    </>
  );
}

const payBooking = async (BOOKING_Id: string, token: string) => {

  console.log(localStorage.getItem("token"));

  try {
    await axiosInstance.post(payment.bokking(BOOKING_Id), { token });

    toast.success("booking payed successfully");

  } catch (error) {
    console.log("error pay fun", error);
  }
};
const CheckOutForm = () => {
  const stripee = useStripe();
  const elements = useElements();
  const navigate=useNavigate()

  const { booking_id } = useParams();

  const paymenthandler = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!stripee || !elements) {
        return;
      }
      const cardelement = elements.getElement("card");

      if (!cardelement) return;

      const { error, token } = await stripee.createToken(cardelement);
      if (error) return;
      const tokenValue = token.id;
      console.log(tokenValue);

      await payBooking(`${booking_id}`, tokenValue);
      navigate('/Bokking/sucssed')
    } catch (finalError) {
      toast.error(finalError);
    }
  };
  return (
    <>
      {" "}
      <Container maxWidth="lg">
        <Grid container justifyContent="center" spacing={1} sx={{ my: "4rem" }}>
          <Grid sx={{ textAlign: "center" }} size={{ md: 12 }} mb={2}>
            <Typography
              variant="h3"
              sx={{ color: "var(--primary-color)", fontFamily: "Poppins" }}
              gutterBottom
            >
              Payment
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: "var(--txt-gray)", margin: "1rem 0" }}
              gutterBottom
            >
              Kindly follow the instructions below{" "}
            </Typography>
          </Grid>

          <Grid
            size={{ md: 6 }}
            sx={{ paddingRight: "2rem", backgroundColor: "whitesmoke" }}
          >
            <form onSubmit={paymenthandler}>
              <div
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  padding: "1rem",
                  margin: "1rem",
                }}
              >

<AddressElement options={{ mode: "billing" }} />

                <div
                  style={{
                    marginTop: "1rem",
                    border: "1px solid #e6e6e6",
                    width: "100%",
                    borderRadius:"2px",
                    padding: "1rem",
                  }}
                >
                  <CardElement />
                </div>
                {/* <Button variant="contained" color="primary" type="submit">
                  Pay Bokking Click Me
                </Button> */}

                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    width: "100%",
                    py: "0.7rem",
                    margin: "3rem 0",
                    borderRadius: 1,
                    textTransform: "none",
                    fontFamily: "Poppins",
                    boxShadow: "0px 8px 15px 0px rgba(50, 82, 223, 0.30)",
                  }}
                  type="submit"
                >
                  Pay Bokking Click Me{" "}
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>{" "}
    </>
  );
};

// {id: 'tok_1QbnpkBQWp069pqTYFcMUFo3', object: 'token', card: {…}, client_ip: '41.42.40.36', created: 1735583816, …}
// card
// :
// {id: 'card_1QbnpkBQWp069pqTCyRxeyhO', object: 'card', address_city: null, address_country: null, address_line1: null, …}
// client_ip
// :
// "41.42.40.36"
// created
// :
// 1735583816
// id
// :
// "tok_1QbnpkBQWp069pqTYFcMUFo3"
// livemode
// :
// false
// object
// :
// "token"
// type
// :
// "card"
// used
// :
// false
// [[Prototype]]
// :
// Object
