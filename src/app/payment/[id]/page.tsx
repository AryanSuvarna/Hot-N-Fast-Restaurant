"use client"

import CheckoutForm from "@/components/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Payment = ({ params }: { params: { id: string } }) => {
    const router = useRouter()

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login")
        }
    })

    const id = params.id
    const [clientSecret, setClientSecret] = useState("");

    // get client secret
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await fetch(
                    `/api/create-payment-intent/${id}`,
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

        if (id) { makeRequest() }
    }, [id])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
        }
    }

    if (status === "loading") return "Loading..."

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

export default Payment