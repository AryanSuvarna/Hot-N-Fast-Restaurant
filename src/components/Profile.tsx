"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

const Profile = () => {

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        }
    })
    const router = useRouter()


    if (status === "loading") return "Loading..."

    if (session) {
        return (
            <div className="h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-yellow-500 lg:flex-row">
                {/* USER INFO CONTAINER */}
                <div className="h-2/3 p-4 w-full flex flex-col lg:h-full lg:w-2/3">
                    {/* USER IMAGE CONTAINER */}
                    <div className="flex items-center justify-center">
                        <Image src={session?.user.image || ""}
                            alt=""
                            width={200}
                            height={200}
                            className="rounded-full object-cover object-center"
                            style={{ width: '15%', height: 'auto', minWidth: '8rem' }} />
                    </div>

                    {/* USER INFO CONTAINER */}
                    {/* title */}
                    <div>
                        <h1 className="text-5xl font-bold underline text-center py-2 text-black">Your Profile</h1>
                    </div>
                    {/* INFO */}
                    <div className="flex flex-col gap-4 mt-4">
                        <h1 className="text-2xl font-bold capitalize">Name: {session?.user.name}</h1>
                        <span className="text-2xl">Email: {session?.user.email}</span>
                        <span className="text-2xl">Role: {session?.user.isAdmin ? "Admin" : "Customer"}</span>
                    </div>

                    {/* ADD A PRODUCT BUTTON */}

                    {session?.user.isAdmin ?
                        <div className="mt-4">
                            <span className="text-2xl underline">Admin Actions:</span>
                            <div className="flex mt-4 gap-4 justify-center">
                                <button className=" text-lg md:text-2xl lg:text-3xl px-4 py-2 bg-yellow-500 rounded-md font-bold text-white cursor-pointer"
                                    onClick={() => router.push("/addItem")}>
                                    Add a Product
                                </button>
                                <button className=" text-lg md:text-2xl lg:text-3xl px-4 py-2 bg-yellow-500 rounded-md font-bold text-white cursor-pointer"
                                    onClick={() => router.push("/menu")}>
                                    Update a Product
                                </button>
                                <button className=" text-lg md:text-2xl lg:text-3xl px-4 py-2 bg-yellow-500 rounded-md font-bold text-white cursor-pointer"
                                    onClick={() => router.push("/menu")}>
                                    Delete a Product
                                </button>

                            </div>
                        </div> : null}

                    {/* LOGOUT */}
                    <div className="flex justify-center mt-auto">
                        <button className=" text-3xl px-4 py-2 bg-yellow-500 rounded-md font-bold text-white cursor-pointer"
                            onClick={() => {
                                toast.loading("Logging out... See you soon!"),
                                    setTimeout(() => { signOut({ callbackUrl: "/" }) }, 2000)
                            }}>
                            Logout
                        </button>
                    </div>
                </div>
                {/* RESTAURANT IMAGE CONTAINER  */}
                <div className="h-1/3 w-full flex flex-col bg-yellow-500 relative lg:h-full lg:w-1/3">
                    <Image src="/nice.jpg" alt="" fill className=' object-cover object-bottom' />
                </div>
            </div>
        )
    }
}

export default Profile