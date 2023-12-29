"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const UpdateBtn = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    if (session?.user.isAdmin) {
        return (
            <div
                className=" bg-yellow-400 rounded-md absolute top-[5rem] left-4 p-2 cursor-pointer "
                onClick={() => router.back()}
                title="Go back"
            >
                <Image src={"/backArrow.png"} alt="" width={30} height={30} />
            </div>
        )
    } else if(session?.user) {
        return (
            <div
                className=" bg-yellow-400 rounded-md absolute top-4 left-4 p-2 cursor-pointer "
                onClick={() => router.back()}
                title="Go back"
            >
                <Image src={"/backArrow.png"} alt="" width={30} height={30} />
            </div>
        )
    }
}

export default UpdateBtn