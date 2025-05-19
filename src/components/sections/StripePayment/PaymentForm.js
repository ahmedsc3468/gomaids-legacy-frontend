import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import config from '../../../config.json';
import authService from '../../../services/auth.service';
import Paypal from '../Payment/PayPal';
import swal from 'sweetalert';
import './CardSection.css';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#F90716',
      color: '#F90716',
    },
  },
};

export default function PaymentForm({
  cost,
  checkOutBtnEnable,
  service_provider_id,
  email,
  checkout,
}) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const proceed = window.confirm("Are you sure you want to Pay")

    // if (proceed) {
    const cardnumber = document.getElementsByName('cardnumber');
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    const user = authService.getCurrentUser();

    const card = elements.getElement(CardElement);
    // debugger;

    const result = await stripe.createToken(card);

    if (!error) {
      try {
        await checkout({ paymentId: result.token.id, paymentMethod: 'stripe' });
        // const { id } = paymentMethod;
        // let stripeResponse;
        // await axios
        //   .post(config.SERVER_URL + '/api/stripe', {
        //     stripeToken: result.token.id,
        //     amount: cost,
        //     user_id: user.id,
        //     email: user?.email,
        //     //    service_provider_id:service_provider_id,
        //     // email
        //   })
        //   .then(function (response) {
        //     stripeResponse = response;
        //   })
        //   .catch(function (error) {
        //     console.log('stripe api error: ', error.message);
        //   });

        // const storeCardData = await axios
        //   .post(config.SERVER_URL + `/api/configurations/${user.id}`, {
        //     card_id: result.token.card.id,
        //     card_brand: result.token.card.brand,
        //     zip_code: result.token.card.address_zip,
        //     // "cvc":result.token.card.last4,
        //     expiry_year: result.token.card.exp_year,

        //     expiry_month: result.token.card.exp_month,

        //     card_no: result.token.card.last4,
        //   })
        //   .then(function (response) {
        //     console.log('configs api working: ', response.data);
        //   })
        //   .catch(function (error) {
        //     console.log('configs api error: ', error.message);
        //   });

        // if (stripeResponse.data.success) {
        //   swal({
        //     icon: 'success',
        //     title: 'Payment Successful!',
        //     text: "Your order will be automatically placed in 5 seconds. If not, please click 'Place Order'",
        //     timer: 4000,
        //   });

        //   checkOutBtnEnable();
        // }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
    // }
  };

  return (
    <>
      <form onClick={handleSubmit}>
        <div className='pay-btn-wrapper'>
          <div className='stripe'>
            <fieldset className='FormGroup'>
              <div className='FormRow'>
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
          </div>
          <button className='pay-btn'>Pay</button>
        </div>
      </form>
    </>
  );
}
