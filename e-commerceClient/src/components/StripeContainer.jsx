import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"

const PUBLIC_KEY = "pk_test_51KLpJPSBPbvtj1zYdJKQaEvfRFsMDV0eVv1BwRbXgN72WHFnl83zfHiyAdDXq2VliHL7U5Su8AL3ewEcMRK0gJKR00FQDA9l5B"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<PaymentForm />
		</Elements>
	)
}