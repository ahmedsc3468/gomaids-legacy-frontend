import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import config from '../../../config.json';
import PaymentForm from './PaymentForm';
import './CardSection.css';

//  const PUBLIC_KEY = "pk_test_51L5EULBXYg7jNu2CAlVoTCUvTMrusKaT48dnIy6YCStUX8lNdZ57nZCknfy3pbIVVp4djVWLmp4Og4pwYkCbuobr00MEKCXagk"
const PUBLIC_KEY = config.STRIPE_PUBLIC_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer({
  cost,
  checkOutBtnEnable,
  service_provider_id,
  email,
  checkout,
}) {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm
        cost={cost}
        checkOutBtnEnable={checkOutBtnEnable}
        service_provider_id={service_provider_id}
        email={email}
        checkout={checkout}
      />
    </Elements>
  );
}
