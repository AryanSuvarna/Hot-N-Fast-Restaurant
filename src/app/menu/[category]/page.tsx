import { ProductType } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const getData = async (category:string) => {
    // we are fetching from our endpoint, which we have defined as /api/categories
    const res = await fetch(`http://localhost:3000/api/products?cat=${category}`, {
        cache: "no-store" // this is temporary, will remove it later
    })

    if (!res.ok) {
        throw new Error("FAILED TO FETCH")
    }

    return res.json()
}

type Props = {
    params: {
        category: string
    }
}

const CategoryPage = async ({params}:Props) => {

    const products:ProductType[] = await getData(params.category)
    return (
        <div className='flex text-yellow-500 flex-wrap md:flex-row'>
            {products.map((item) => (
                <Link href={`/product/${item.id}`} key={item.id} className=" w-full sm:w-1/2 lg:w-1/3 h-[60vh] border-r-2 border-b-2 border-l-2 border-yellow-500 p-4 flex flex-col justify-between group even:bg-yellow-50">
                    {/* IMAGE CONTAINER */}
                    {item.img && (
                        <div className='relative h-[80%] group-hover:scale-105 transition-all duration-500'>
                            <Image src={item.img} alt='' fill className='object-contain'/>
                        </div>
                    )}
                    {/* TEXT CONTAINER */}
                    <div className='flex items-center justify-between font-bold text-xl'>
                        <h1 className='text-2xl uppercase p-2'>{item.title}</h1>
                        <h2 className='group-hover:hidden'>${Number(item.price).toFixed(2)}</h2>
                        <button className=' hidden uppercase bg-yellow-500 text-white p-2 rounded-md group-hover:block'>Add to Cart</button>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CategoryPage