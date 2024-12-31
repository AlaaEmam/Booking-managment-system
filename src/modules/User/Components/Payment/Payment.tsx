import React, { FormEvent } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  AddressElement,
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button, Container, Stack, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import { axiosInstance } from "../../../../constants/URLS";
import { toast } from "react-toastify";

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
  try {
    // const res = await axios.post(
    //   `https://upskilling-egypt.com:3000/api/v0/portal/booking/${BOOKING_Id}/pay`,
    //   {
    //     token,
    //   },
    //   { headers: { Authorization: localStorage.getItem("token") } }
    // );

    const res = await axiosInstance.post(`/portal/booking/${BOOKING_Id}/pay`, {
      token,
    });
    console.log(res);
    toast.success("booking payed successfully");
  } catch (error) {
    console.log("error pay fun", error);
  }
};
const CheckOutForm = () => {
  const stripee = useStripe();
  const elements = useElements();

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

     await payBooking(`67740eafc01e1856618cab9e`, tokenValue);
    } catch (finalError) {
      toast.error(finalError.response.data.message);
    }
  };
  return (
    <>
      {" "}
      <Container maxWidth="lg">
        <Grid container spacing={1} sx={{ my: "4rem" }}>
          <Grid
            size={{ md: 8 }}
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
                <div
                  style={{
                    marginBottom: "2rem",
                    border: "1px solid whitesmoke",
                    width: "100%",
                    padding: "1rem",
                  }}
                >
                  <CardElement />
                </div>
                {/* <AddressElement options={{ mode: "billing" }} /> */}
                {/* <Button variant="contained" color="primary" type="submit">
                  Pay Bokking Click Me
                </Button> */}
                <button type="submit"> Pay Bokking Click Me</button>
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
