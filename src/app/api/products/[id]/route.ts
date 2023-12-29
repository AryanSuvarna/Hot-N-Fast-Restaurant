import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect"
import { getAuthSession } from "@/utils/auth";


// get single product
export const GET = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        });

        return new NextResponse(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}

// delete single product
export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    const session = await getAuthSession()

    if (session?.user.isAdmin) {
        try {
            await prisma.product.delete({
                where: {
                    id: id
                }
            });

            return NextResponse.json({ message: "Product has been deleted!" }, { status: 200 });
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
        }
    }
    return NextResponse.json({ message: "You are not authorized!" }, { status: 403 });
}

// update single product
export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const { id } = params
    console.log("PUT product id",id)

    try {
        const body = await req.json()
        await prisma.product.update({
            where: {
                id: id
            },
            data: body
        });

        return NextResponse.json({ message: "Product has been updated!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }

}