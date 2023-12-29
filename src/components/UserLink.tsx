"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

const UserLink = () => {

    const { data: session, status } = useSession()

    return (
        <div>
            {status === "authenticated" ? (
                <div className="flex">
                    <Link href={"/orders"} className="animated-link">Orders</Link>
                    <span
                        className=" ml-4 cursor-pointer hidden min-[1040px]:block animated-link"
                        onClick={() => {
                            toast.loading("Logging out... See you soon!"),
                                setTimeout(() => { signOut({ callbackUrl: "/" }) }, 2000)
                        }}>
                        Logout
                    </span>
                    <Link className=" ml-4 cursor-pointer flex gap-2" href={"/profile"}>
                        <Image src={"/user.png"} alt="" width={25} height={25}/>
                        <span className="hidden font-bold min-[1570px]:block ">Hello, {session?.user.name?.split(" ")[0]}</span>
                    </Link>
                </div>
            ) : (
                <Link href={"/login"} className="animated-link">Login</Link>
            )
            }
        </div>
    )
}

export default UserLink