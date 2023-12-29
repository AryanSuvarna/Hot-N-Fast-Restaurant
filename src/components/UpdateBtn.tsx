"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const UpdateBtn = ({ id }: { id: string }) => {

    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") return <p>Loading...</p>

    if (status === "unauthenticated" || !session?.user.isAdmin) return

    return (
        <div
            className=" bg-yellow-400 rounded-md absolute top-4 left-4 p-2 cursor-pointer"
            onClick={() => router.push(`/updateItem?product_id=${id}`,)}
            title="Edit item"
        >
            <Image src={"/edit.png"} alt="" width={30} height={30} />
        </div>
    )
}

export default UpdateBtn