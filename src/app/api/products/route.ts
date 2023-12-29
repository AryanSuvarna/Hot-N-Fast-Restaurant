import { NextRequest, NextResponse } from "next/server"
import prisma from "@/utils/connect"


// fetch all products

// this is how we use route methods (GET, POST, PUT, DELETE) once we set up database . 
export const GET = async (req: NextRequest) => {

    const { searchParams } = new URL(req.url)

    const cat = searchParams.get("cat")

    try {
        const products = await prisma.product.findMany({
            where: {
                ...(cat ? { catType: cat } : { isFeatured: true })
            }
        })

        return new NextResponse(
            JSON.stringify(products),
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }), { status: 500 }
        )
    }


}

// create a product
export const POST = async (req: NextRequest) => {
    try {

        const body = await req.json()

        const product = await prisma.product.create({
            data: body
        })

        return new NextResponse(
            JSON.stringify(product),
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }), { status: 500 }
        )
    }
}