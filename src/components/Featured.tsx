import { ProductType } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getData = async () => {
    // wea re fetching from our endpoint, which we have defined as /api/categories
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
        cache: "no-store" // this is temporary, will remove it later
    })

    if (!res.ok) {
        throw new Error("FAILED TO FETCH")
    }

    return res.json()
}

const Featured = async () => {

    const featuredProducts: ProductType[] = await getData()

    return (
        // used w-[99vw], can use w-screen
        <div className="w-[99vw] overflow-x-scroll text-yellow-500">
            {/* Wrapper */}
            <div className="w-max flex">
                {/* Single Item */}
                {
                    featuredProducts.map(item => (
                        <div key={item.id} className="w-screen h-[70vh] flex flex-col items-center justify-around p-4 hover:bg-yellow-50 duration-200 md:w-[50vw] xl:w-[33vw] xl:h-[80vh]">
                            {/* Image container */}
                            {item.img && <div className="relative flex-1 w-full hover:scale-110 transition-all duration-500">
                                <Image src={item.img} alt='' fill className='object-contain' />
                            </div>}
                            {/* Text container */}
                            <div className="flex-1 flex flex-col gap-4 p-4 items-center text-center justify-center">
                                <h1 className='text-xl font-bold uppercase xl:text-2xl 2xl:text-3xl' >
                                    {item.title}
                                </h1>
                                <p className='p-4'>
                                    {item.desc?.length ?? 0 > 100 ? item.desc?.slice(0, 100) + '...' : item.desc}
                                </p>
                                <span className='font-bold'>
                                    ${Number(item.price).toFixed(2)}
                                </span>
                                <Link href={`/product/${item.id}`} key={item.id}>
                                    <button
                                        className='bg-yellow-500 text-white px-3 py-2 rounded-lg'>
                                        See More ➜
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}
export default Featured