import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/connect"

// type params = {
//     id: string
// };


export const PUT = async (req: NextRequest, {params}:{params :{id:string}}) => {
    const {id} = params
    try {

        const body = await req.json();

        await prisma.order.update({
            where: {
                id: id
            },
            data: {
                status: body
            }
        });

        return new NextResponse(JSON.stringify({message: "Order updated"}), { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({message: "Something went wrong"}, { status: 500 }); 
    }
}
