import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import config from "../../../config.json";
import authService from "../../../services/auth.service";
import Paypal from "../Payment/PayPal";
import swal from "sweetalert";
import "./CardSection.css";

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#F90716",
            color: "#F90716"
        }
    }
}

export default function PaymentForm({ cost, checkOutBtnEnable, service_provider_id, email }) {
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()




    const handleSubmit = async (e) => {
        e.preventDefault()
        // const proceed = window.confirm("Are you sure you want to Pay")

        // if (proceed) {
          const cardnumber = document.getElementsByName('cardnumber');
            console.log("elements.getElement(CardElement)",elements);
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)
            })
            console.log('paymentMethod',paymentMethod)

            const user = authService.getCurrentUser();

            const card = elements.getElement(CardElement);
            console.log("card",CardElement);
            // debugger;

            const result = await stripe.createToken(card);

            // console.log("::::::::::::: LINE 55 :::::::::::", neell)
            console.log("::::::::::::: LINE 56 :::::::::::", result)


            if (!error) {
                try {

                    const { id } = paymentMethod;
                    // "stripeToken": "tok_1L8IcZEPHCxIe48nCLaRUK1A",
                    // "user_id":3,
                    // "email":"abc@gamil.com",
                    // "amount": 96
                    let stripeResponse;
                    await axios.post(config.SERVER_URL + "/api/stripe", {
                        stripeToken: result.token.id,
                        amount: cost,
                        user_id: user.id,
                        email: user?.email,
                        //    service_provider_id:service_provider_id,
                        // email

                    }).then(function(response){
                        stripeResponse = response;
                    }).catch(function (error) {
                        console.log('stripe api error: ', error.message);
                    });

                    const storeCardData = await axios.post(config.SERVER_URL + `/api/configurations/${user.id}`,
                        {
                            card_id: result.token.card.id,
                            card_brand: result.token.card.brand,
                            zip_code: result.token.card.address_zip,
                            // "cvc":result.token.card.last4,
                            expiry_year:result.token.card.exp_year,

                            expiry_month:result.token.card.exp_month,

                            card_no:result.token.card.last4,

                        }).then(function(response){
                            console.log('configs api working: ',response.data);
                        }).catch(function (error) {
                            console.log('configs api error: ', error.message);
                        });
                        console.log("::::::::::::::: STORE CARD DATA ::::::::::", storeCardData)


                    // console.log("Current User ID ----- ",user.id,)
                    // console.log("Card ID -----",result.token.card.id,)
                    // console.log("Card Brand -----",result.token.card.brand,)
                    // console.log("CVC -----",result.token.card.cvc_check,)
                    // console.log("Address Zip CARD -----",result.token.card.address_zip,)
                    // console.log("Exp month CARD -----",result.token.card.exp_month,)
                    // console.log("Exp Year CARD -----",result.token.card.exp_year,)
                    // console.log("Last 4 digit CARD -----",result.token.card.last4,)

                    // console.log("INFORMATION CARD",response.data)
                    console.log('response inside: ',stripeResponse);
                    if (stripeResponse.data.success) {

                        swal({
                            icon: "success",
                            title: "Payment Successful!",
                            text: "Your order will be automatically placed in 5 seconds. If not, please click 'Place Order'",
                            timer: 4000
                        });

                        checkOutBtnEnable();
                    }

                } catch (error) {
                    console.log("Error", error)
                }
            } else {
                console.log(error.message)
            }
        // }
    }

    return (
        <>

            <form onClick={handleSubmit}>
                <div className="pay-btn-wrapper">
                    <div className="stripe">
                        <fieldset className="FormGroup">
                            <div className="FormRow">
                                <CardElement options={CARD_OPTIONS} />
                            </div>
                        </fieldset>
                    </div>
                    <button className="pay-btn">Pay</button>
                </div>
            </form>



        </>
    )
}
