import prisma from "@/utils/connect"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

// Add a new user
export const POST = async (req:NextRequest) => {
    try {
        const body = await req.json();
        const checkUser = await prisma.user.findUnique({
            where: {
                email: body.email
            }
        })
        if (checkUser) {
            return new NextResponse(
                JSON.stringify({ message: "User already exists" }), { status: 409 }
            )
        }
        
        // Hash the password for security frmo the client side
        const hashedPassword = await bcrypt.hash(body.password, 12)

        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword
            }
        })

        return new NextResponse(
            JSON.stringify(newUser), 
            { status: 201 }
        )
    } catch (error) {
        console.log(error)
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong" }), { status: 500 }
        )
    }
}