import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import config from "../../../config.json";
import swal from "sweetalert";

import axios from "axios";

export default function App({cost, checkOutBtnEnable}) {
  const style = {"min-height":"0","max-height":"0","height":"0"};
//   console.log("cost:",cost)
    return (
        <PayPalScriptProvider options={{ "client-id": "Aa8gOmOuvFP6koHvD-nKnN3QHdOhsuvA7rLwLoeySyA1gmL8cG6Lkr7dquUuhuGddsYrcEqrOp5K74Bq" }}>
            <PayPalButtons
            style= {{
              layout:  'vertical',
            
              shape:   'rect',
              label:   'paypal',
            }}
               
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: cost,
                                },
                            },
                        ],
                    });
                }}
                onApprove={async(data, actions) => {
                    // get request on http://127.0.0.1:8000/api/charge
                    // {
                    //     "amount":30,
                    // }
                   
                    return actions.order.capture().then(async(details) => {
                        const name = details.payer.name.given_name;
                      
                        try{
                            await axios.post(config.SERVER_URL+"/api/charge",{amount:cost})
                            swal({
                                icon: "success",
                                title: "Payment Successful!",
                                text: "Your order will be automatically placed in 5 seconds. If not, please click 'Place Order'",
                                timer: 4000
                            });
                            checkOutBtnEnable()
                        }
                        catch(error){
                            console.log(error)
                        }
                       
                    });
                  
                }}
            />
        </PayPalScriptProvider>
    );
}