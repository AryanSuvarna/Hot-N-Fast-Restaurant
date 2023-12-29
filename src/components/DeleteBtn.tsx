"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const DeleteBtn = ({ id }: { id: string }) => {

    const { data: session, status } = useSession()
    const router = useRouter()

    if (status === "loading") return <p>Loading...</p>

    if (status === "unauthenticated" || !session?.user.isAdmin) return

    const handleDelete = async () => {
        console.log(id)
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        })

        const data = await res.json()

        if (res.status === 200) {
            router.push("/menu")
            router.refresh()
            toast.success(data.message)
        } else {
            toast.error(data.message)
        }
    }

    return (
        <div
            className=" bg-yellow-400 rounded-md absolute top-4 right-4 p-2 cursor-pointer"
            onClick={handleDelete}
            title="Delete item"
        >
            <Image src={"/delete.png"} alt="" width={30} height={30} />
        </div>
    )
}

export default DeleteBtn