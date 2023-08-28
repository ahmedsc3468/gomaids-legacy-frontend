import React, { useState } from "react";

import PayPal from "./PayPal";
import "./App.css";

function PaymentCheckout({cost}) {
  const [checkout, setCheckOut] = useState(false);
 
  return (
    <div className="App paypal-style">
      
        <PayPal
        cost={cost}
        />
   
    </div>
  );
}

export default PaymentCheckout;
