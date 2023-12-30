import { NextRequest, NextResponse } from "next/server"
import prisma from "@/utils/connect"
import { getAuthSession } from "@/utils/auth"


// function to calculate total price of an order
const calculateCost = (subtotal: number) => {
    const SERVICE_FEE = 0.05
    const DELIVERY_FEE = 2
    var total = 0

    if (subtotal > 30) {
        total = Number(((+subtotal) + (+subtotal * SERVICE_FEE)).toFixed(2)) 
        return total
    } else {
        total = Number(((+subtotal) + (+subtotal * SERVICE_FEE) + DELIVERY_FEE).toFixed(2))
        return total
    }
}


// fetch all orders
// this is how we use route methods (GET, POST, PUT, DELETE) once we set up database . 
export const GET = async () => {

    const session = await getAuthSession()

    if (session) {
        try {
            // if user is an admin, fetch all orders
            if (session.user.isAdmin) {
                const orders = await prisma.order.findMany()
                return new NextResponse(JSON.stringify(orders), { status: 200 })
            }

            // if user is not an admin, fetch only their orders
            const orders = await prisma.order.findMany({
                where: {
                    userEmail: session.user.email!
                }
            })
            return new NextResponse(JSON.stringify(orders), { status: 200 })
        } catch (error) {
            console.log(error)
            return new NextResponse(
                JSON.stringify({ message: "Something went wrong" }), { status: 500 }
            )
        }


    } else {
        return new NextResponse(
            JSON.stringify({ message: "You are not authorized" }), { status: 401 }
        )
    }
}

// CREATE A NEW ORDER
export const POST = async (req: NextRequest) => {
    const session = await getAuthSession()

    if (session) {
        try {
            const body = await req.json()
            const finalCost = calculateCost(body.price)
            if (session.user) {
                const order = await prisma.order.create({
                    data: {
                        price: finalCost,
                        products: body.products,
                        userEmail: body.userEmail,
                        status: body.status,
                    }
                })
                return new NextResponse(JSON.stringify(order), { status: 201 })
            }

        } catch (err) {
            console.log(err)
            return new NextResponse(
                JSON.stringify({ message: "Something went wrong in order" }), { status: 500 }
            )
        }
    } else {
        return new NextResponse("Please log in", { status: 200 })
    }

}