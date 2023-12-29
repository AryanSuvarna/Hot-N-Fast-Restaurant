"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'

export const dynamic = "force-dynamic"

const SuccessPage = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const payment_intent = searchParams.get("payment_intent");

    useEffect(() => {
        const makeRequest = async () => {
            console.log("Success Page intent:", payment_intent);
            try {
                await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
                    method: "PUT",
                });
                setTimeout(() => {
                    router.push("/orders");
                }, 4000);
            } catch (err) {
                console.log(err);
            }
        };

        makeRequest();
    }, [payment_intent, router]);

    return (
        <>
            <div className="min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-15rem)] flex items-center justify-center text-center text-2xl text-green-700">
                <p className="max-w-[600px]">
                    Payment successful. You are being redirected to the orders page.
                    Please do not close the page.
                </p>
                <ConfettiExplosion
                    className="absolute m-auto"
                    force={0.9}
                    duration={4000}
                    particleCount={250}
                    width={1600} />
            </div>
        </>
    );
}

export default SuccessPage