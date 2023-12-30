"use client"

import { stat } from 'fs'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const SignUpPage = () => {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const { data: session, status } = useSession()

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userInfo.password !== userInfo.confirmPassword) {
            toast.error("Error: Passwords do not match! Please enter matching passwords.");
            setUserInfo({
                ...userInfo,
                password: "",
                confirmPassword: "",
            })
            return
        }

        try {
        const res = await fetch(`/api/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userInfo.name,
                    email: userInfo.email,
                    password: userInfo.password,
                })
            })

            await res.json()
            toast.success("Account created successfully!")
            setUserInfo({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
            setTimeout(() => {
                router.push("/login")
            }, 2500);
        } catch (error) {
            console.log(error)
            toast.error("Error: Please try again!")
            setUserInfo({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
        }
    };

    if (status === "loading") return <p>Loading...</p>

    if (status === "authenticated") {
        router.push("/")
        toast.warn("You are already logged in!")
    }


    // if user not logged in, show sign up page
    if (!session) {
        return (
            <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-yellow-500 lg:flex-row'>
                {/* LEFT SIDE */}
                <div className="h-1/5 w-full bg-yellow-500 relative lg:h-full lg:w-1/3">
                    <Image src="/chef.jpg" alt="" fill className=' object-cover object-left-bottom' />
                </div>
                {/* RIGHT SIDE */}
                <div className='flex w-full h-4/5 lg:h-full lg:w-3/5 items-center justify-center'>
                    {/* BOX */}
                    <div className='h-[90%] w-[90%] shadow-2xl rounded-md flex flex-col  lg:w-[75%] 2xl:w-[55%]'>

                        {/* FORM */}
                        <form className='h-full flex flex-col gap-4 p-4' onSubmit={handleSubmit}>
                            <h1 className='text-black text-2xl font-bold text-center underline p-2'>Create your account</h1>

                            {/* NAME */}
                            <div className='flex flex-col'>
                                <span className='text-sm lg:text-base'>Name</span>
                                <input
                                    type="text"
                                    required
                                    className='border-2 border-yellow-500 rounded-md p-2'
                                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} />
                            </div>
                            {/* EMAIL */}
                            <div className='flex flex-col'>
                                <span className='text-sm lg:text-base'>Email</span>
                                <input
                                    type="email"
                                    required
                                    className='border-2 border-yellow-500 rounded-md p-2'
                                    value={userInfo.email}
                                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} />
                            </div>
                            {/* PASSWORD */}
                            <div className='flex flex-col'>
                                <span className='text-sm lg:text-base'>Password (at least 8 characters)</span>
                                <input
                                    type="password"
                                    required
                                    pattern=".{8,}"
                                    value={userInfo.password}
                                    className='border-2 border-yellow-500 rounded-md p-2'
                                    onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })} />
                            </div>
                            {/* CONFIRM PASSWORD */}
                            <div className='flex flex-col'>
                                <span className='text-sm lg:text-base'>Confirm Password</span>
                                <input
                                    type="password"
                                    required
                                    pattern=".{8,}"
                                    value={userInfo.confirmPassword}
                                    className='border-2 border-yellow-500 rounded-md p-2'
                                    onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })} />
                            </div>
                            {/* SUBMIT */}
                            <button type="submit" className='bg-yellow-500 text-white p-3 mb-auto 5 rounded-md w-full'>SIGN UP</button>
                        </form>
                        {/* Already have an account */}
                        <div className='p-4'>
                            <span className='text-sm lg:text-base'>Already have an account? <Link className='underline' href="/login">Sign In</Link></span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUpPage