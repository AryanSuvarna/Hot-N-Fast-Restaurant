"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// hardcoded data for testing frontend
const data = [
    {
        id: 1,
        title: "Always fresh, Always Hot, Always Fast",
        image: "/slide1.jpg"
    },
    {
        id: 2,
        title: "Delivered straight to your door",
        image: "/slide2.jpg"
    },
    {
        id: 3,
        title: "the best fast food joint in Toronto",
        image: "/slide3.jpg"
    }
]

const Slider = () => {
    const [currSlide, setCurrSlide] = useState(0)

    // ANMIMATION FOR SLIDER!
    useEffect(() => {
        const interval = setInterval(() => 
            setCurrSlide((prev) => (prev + 1) % data.length)
            ,4000
        )
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='flex flex-col h-[calc(100vh-6rem)] gap-2 md:h-[calc(100vh-9rem)] md:gap-4 lg:flex-row bg-yellow-50'>
            {/* TEXT Container */}
            <div className='flex-1 flex items-center justify-center flex-col gap-8 text-yellow-500 font-bold'>
                <h1 className='text-5xl text-center uppercase p-4 md:p-10 md:text-6xl xl:text-7xl'>
                    {data[currSlide].title}
                </h1>
                {/* <Link href='/menu'> */}
                <Link href="/menu" className='bg-yellow-500 text-white px-8 py-4'>Order Now</Link>
                {/* </Link> */}
            </div>
            {/* IMAGE Container */}
            <div className='w-full flex-1 relative'>
                <Image src={data[currSlide].image} alt='' fill className='object-cover'/>
            </div>
        </div>
    )
}

export default Slider