import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

// fetch all categories

// this is how we use route methods (GET, POST, PUT, DELETE) once we set up database . 
export const GET = async () => {
    try {
        const categories = await prisma.category.findMany()

        return new NextResponse(
            JSON.stringify(categories), 
            { status: 200 }
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }), { status: 500 }
        )
    }


}

// CREATE A NEW CATEGORY
export const POST = () => {
    return new NextResponse("Hello World", { status: 200 })
}