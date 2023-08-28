import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
	import PaymentForm from "./PaymentForm"
import "./CardSection.css";

//  const PUBLIC_KEY = "pk_test_51L5EULBXYg7jNu2CAlVoTCUvTMrusKaT48dnIy6YCStUX8lNdZ57nZCknfy3pbIVVp4djVWLmp4Og4pwYkCbuobr00MEKCXagk"
 const PUBLIC_KEY = "pk_test_51N81HLEV0lK1ixr0TxK8VjbgtlaL5oXGKPVLu2aREGH0xmY3AtfapiAqzCU794VqKruVzBBBL9LNFV4DaqKr5rD800woztwUTP"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer({cost,checkOutBtnEnable,service_provider_id,email}) {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm 
			cost={cost}
			checkOutBtnEnable={checkOutBtnEnable}
			service_provider_id={service_provider_id}
			email={email}
			
			/>
		</Elements>
	)
}
