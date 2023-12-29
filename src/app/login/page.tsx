"use client"

import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const LoginPage = () => {

    const { data: session, status } = useSession()
    const router = useRouter()

    const [error, setError] = useState<string | null>(null)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const signInResponse = await signIn("email-login", {
            email: email,
            password: password,
            redirect: false,
        });
        console.log("Response from credentials:", signInResponse)
        if (signInResponse && signInResponse.error) {
            console.log("Error: ", signInResponse);
            setError("Your Email or Password is wrong!");
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/")
            toast.success("You are logged in!")
        }
    }, [status, router])

    if (status === "loading") return <p>Loading...</p>

    // If the user is not logged in, show login page 
    if (!session) {
        return (
            <div className='p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center'>
                {/* BOX */}
                <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[75%] md:w-full lg:w-[75%] 2xl:w-[55%]">
                    {/* IMAGE CONTAINER */}
                    <div className="relative h-1/3 w-full md:h-full md:w-1/2">
                        <Image src='/logo.png' alt='' fill className='object-cover bg-gray-300' />
                    </div>
                    {/* FORM CONTAINER */}
                    <div className="p-10 flex flex-col gap-4 md:w-1/2">
                        <h1 className='font-bold text-xl xl:text-3xl'>Welcome back</h1>
                        <p>Login into your account or <Link className='underline' href="/signUp">create one</Link>!</p>

                        {/* EMAIL FORM */}
                        <form
                            className="w-full text-black font-semibold flex flex-col"
                            onSubmit={handleSubmit}
                        >
                            {error && (
                                <span className="p-2 mb-2 text-lg font-semibold text-center text-white bg-red-500 rounded-md">
                                    {error}
                                </span>
                            )}
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                            />

                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />

                            <button
                                type="submit"
                                className="w-full h-12 px-6 mt-4 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700"
                            >
                                Log in
                            </button>
                        </form>
                        <div className='flex items-center'>
                            <hr className='border-gray-400 flex-1 mx-2' />
                            <span className="text-xl font-semiboldtext-center">
                                or
                            </span>
                            <hr className='border-gray-400 flex-1 mx-2' />
                        </div>
                        {/* GOOGLE LOGIN */}
                        <button className='flex gap-4 px-4 py-2 ring-1 ring-orange-200 rounded-md items-center justify-center' onClick={() => signIn("google")}>
                            <Image src="/google.png" alt='' width={20} height={20} className='object-contain' />
                            <span>Sign in with Google</span>
                        </button>
                        {/* GITHUB LOGIN */}
                        <button className='flex gap-4 px-4 py-2 ring-1 ring-gray-400 rounded-md items-center justify-center' onClick={() => signIn("github")}>
                            <Image src="/github.png" alt='' width={20} height={20} className='object-contain' />
                            <span>Sign in with GitHub</span>
                        </button>
                        {/* DISCORD LOGIN */}
                        <button className='flex gap-4 px-4 py-2 ring-1 ring-blue-300 rounded-md items-center justify-center' onClick={() => signIn("discord")}>
                            <Image src="/discord.png" alt='' width={20} height={20} className='object-contain' />
                            <span>Sign in with Discord</span>
                        </button>
                        <p className='text-sm'>Have a problem? <Link className='underline' href="/contact">Contact Us</Link></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage