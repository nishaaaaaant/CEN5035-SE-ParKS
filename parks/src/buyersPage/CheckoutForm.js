import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import styled from "styled-components";

const CheckoutFormContainer = styled.form`
  width: 500px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  border: 2px solid grey;
  padding: 10px;
  border-radius: 15px;
`;

const SubmitBtn = styled.button`
  display: flex;
  align-self: center;
  width: 100px;
  height: 40px;
  border-radius: 5px;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "/",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <CheckoutFormContainer onSubmit={handleSubmit}>
      <PaymentElement style={{ marginBottom: 20 }} />
      <SubmitBtn disabled={!stripe}>Submit</SubmitBtn>
    </CheckoutFormContainer>
  );
};

export default React.memo(CheckoutForm);
