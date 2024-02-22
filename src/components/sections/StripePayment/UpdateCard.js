import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import config from "../../../config.json";
import authService from "../../../services/auth.service";
import authHeader from "../../../services/auth-header";
import "./CardSection.css";

import swal from "sweetalert";
import PaymentMethod from "../wallet/paymentMehtod";
const CARD_OPTIONS = {
	iconStyle: "solid",
    placeholder: 'Postal Code',
	style: {
		base: {
			iconColor: "#F2F2F2",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
           
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function UpdateCard({ onResponse, paymentConfigurationId }) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("elements.getElement(CardElement)",elements);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


        const user = authService.getCurrentUser();
        const card = elements.getElement(CardElement);

        console.log("card",CardElement);

        const result = await stripe.createToken(card);


        if (!error) {
            try {
                const response = await axios.put(`${config.SERVER_URL}/api/payment-configurations/update-customer-details/${user.id}`, {
                    stripeToken: result.token.id,
                },
                {
                    headers: authHeader()
                })

                if (response.data.status == "200") {
                    const storeCardData = await axios.put(`${config.SERVER_URL}/api/payment-configurations/update-card-details/${paymentConfigurationId}`,
                        {
                            card_id: result.token.card.id,
                            card_brand: result.token.card.brand,
                            zip_code: result.token.card.address_zip,
                            expiry_year:result.token.card.exp_year,
                            expiry_month:result.token.card.exp_month,
                            card_no:result.token.card.last4    
                        },
                        {
                            headers: authHeader()
                        })

                    console.log("::::::::::::::: STORE CARD DATA ::::::::::", storeCardData)
                    
                    if (response.data.status == "200") {
                        swal("Card Updated Successfully", "You can use Pay Now Button for the direct order payment", "success")
                        onResponse();
                        setSuccess(true);
                    } else {
                        swal("Something went Wrong", "Please try again later.", "Warning")
                    }

                } else {
                    swal("Something went Wrong", "Please try again later.", "Warning")

                } 

            } catch (error) {
                console.log("Error", error)
            }
        } else {
            console.log(error.message)
        }
    }

    return (
        <>
          {!success ? 
          <form onClick={handleSubmit}>
          <div className="pay-btn-wrapper">
              <div className="stripe">
                  <fieldset className="FormGroup">
                      <div className="FormRow">
                          <CardElement 
                                options={CARD_OPTIONS}           
                            />
                      </div>
                  </fieldset>
              </div>
              <button className="pay-btn">Save Card</button>
          </div>
      </form>
        : <PaymentMethod/>
        }
        </>
    )
}
