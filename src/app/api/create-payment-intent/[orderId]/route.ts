import prisma from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// need to add "request" EVEN IF WE ARE NOT USING IT
export async function POST(request: NextRequest, { params }: { params: { orderId: string } }) {
    const orderId = params.orderId;
    console.log("orderId:", orderId)

    try {
        // check if order exists
        const orderExists = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        })
        if (orderExists && orderExists.intent_id === null) {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: (+orderExists.price) * 100, //default currency is cents
                currency: "cad",
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },
            })

            await prisma.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    intent_id: paymentIntent.id,
                },
            });

            return new NextResponse(JSON.stringify({ clientSecret: paymentIntent.client_secret }), { status: 200 })
        } else {
            return new NextResponse(JSON.stringify({ message: "Order not found" }), { status: 404 })
        }
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: "Something went wrong" }), { status: 500 })
    }

};