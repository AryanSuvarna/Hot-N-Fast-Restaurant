"use client"

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const payment = ({params}: {params:{id:string}}) => {

    const id = params.id
    const [clientSecret, setClientSecret] = useState("");

    // get client secret
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/create-payment-intent/${id}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                )
                const data = await res.json()
                setClientSecret(data.clientSecret)
            } catch (error) {
                console.log(error)
            }
        }

        makeRequest()
    }, [id])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
        }
    }

    return (
        <div className="p-4">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default payment