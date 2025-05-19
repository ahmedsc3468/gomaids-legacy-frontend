import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import config from '../../../config.json';
import swal from 'sweetalert';

import axios from 'axios';

export default function paypal({ cost, checkout }) {
  const style = { 'min-height': '0', 'max-height': '0', height: '0' };
  //   console.log("cost:",cost)
  return (
    <PayPalScriptProvider
      options={{
        'client-id': config?.PAYPAL_CLIENT_ID,
        intent: 'authorize',
        currency: 'CAD',
      }}
    >
      <PayPalButtons
        style={{
          layout: 'vertical',
          shape: 'rect',
          label: 'paypal',
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: 'authorize', // Use authorize instead of capture
            purchase_units: [
              {
                amount: {
                  value: cost,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          return actions.order.authorize().then(async (details) => {
            const authorizationID =
              details.purchase_units[0].payments.authorizations[0].id;

            try {
              await checkout({
                paymentId: authorizationID,
                paymentMethod: 'paypal',
              });
            } catch (error) {
              console.log(error);
            }
          });
        }}
      />
    </PayPalScriptProvider>
  );
}
