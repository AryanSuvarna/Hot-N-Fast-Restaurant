"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CartIcon from './CartIcon'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

const links = [
    {id: 1, title: 'Homepage', url: '/'},
    {id: 2, title: 'Menu', url: '/menu'},
    {id: 4, title: 'Contact', url: '/contact'},
]

const Menu = () => {
    // Since we're using useState, our component must be a client component!
    const [open, setOpen] = useState(false)

    const {status} = useSession()

    return (
        <div>
            {!open ? (
                <Image src="/open.png" alt="" width={20} height={20} onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}/>
            ) : (
                <Image src="/close.png" alt="" width={20} height={20} onClick={() => setOpen(false)} style={{ cursor: 'pointer' }}/>
            )}
            {open && <div className='bg-yellow-500 text-white absolute left-0 top-24 w-full h-[calc(100vh-6rem)] flex flex-col gap-10 items-center justify-center z-10'>
                {links.map(item => (
                    <Link href={item.url} key={item.id} onClick={() => setOpen(false)}>
                        {item.title}
                    </Link>
                ))}
                {/* checking if user is logged in/out */}
                {status === "authenticated" ? (
                    <div className='flex flex-col items-center justify-center gap-10'>
                        <Link href="/orders" onClick={() => setOpen(false)}>Orders</Link>
                        <span className="cursor-pointer" 
                        onClick={() => {
                            toast.loading("Logging out... See you soon!"),
                                setTimeout(() => { signOut({ callbackUrl: "/" }) }, 3000)
                        }
                        }>Logout</span>
                        <Link href={"/profile"} onClick={() => setOpen(false)}>Profile</Link>
                    </div>
                ) : (
                    <Link href={"/login"} onClick={() => setOpen(false)}>Login</Link>
                )}
                {/* Cart component will be reused for the navbar */}
                <div onClick={() => setOpen(false)}>
                    <CartIcon/>
                </div>
            </div>
            }
        </div>
    )
}

export default Menu