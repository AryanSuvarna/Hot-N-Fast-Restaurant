import Image from 'next/image'
import React from 'react'
import Timer from './Timer'
import Link from 'next/link'

const Promo = () => {
    
    return (
        <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:bg-[url('/offerBg.png')] md:h-[70vh]">
            {/* TEXT container */}
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-8 p-6">
                <h1 className='text-white text-5xl font-bold xl:text-6xl'>Cheeseburger & Chips Combo</h1>
                <p className='text-white text-xl xl:text-2xl'>The original duo</p>
                <div>
                    <p className='text-white text-xl xl:text-2xl'>Before: <span className='text-yellow-500 font-bold line-through'>$13.00</span></p>
                    <p className='text-white text-4xl xl:text-5xl'>Now: <span className='text-yellow-500 font-bold'>$9.00*</span></p>
                </div>
                <Timer/>
                <Link href={"/product/clqq13gmc000bjhl50befh04f"} className='bg-yellow-500 text-white px-6 py-3 rounded-md'>See more ➜</Link>
                <p className='text-yellow-500 text-xs'>*While offer lasts</p>
            </div>
            {/* IMAGE container */}
            <div className="relative flex-1 w-full md:h-full">
                <Image src='/offerProduct.png' alt='' fill className='object-contain'/>
            </div>
        </div>
    )
}

export default Promo