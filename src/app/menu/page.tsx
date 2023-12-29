import { MenuType } from '@/types/types'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'

const getData = async () => {
    // we are fetching from our endpoint, which we have defined as /api/categories
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`)

    if (!res.ok) {
        throw new Error("FAILED TO FETCH")
    }
    
    const data = await res.json()
    return data
}

const Menu = async () => {

    const menu: MenuType = await getData()

    return (
        <div className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col md:flex-row items-center'>
            {menu.map((category) => (
                <Link
                    href={`${process.env.NEXTAUTH_URL}/menu/${category.type}`} key={category.id}
                    className='w-full h-1/3 bg-cover md:h-1/2 p-8  hover:scale-105 hover:z-50 transition-all duration-500'
                    style={{ backgroundImage: `url("${process.env.NEXTAUTH_URL}/${category.img}")` }}
                    passHref
                >
                    {/* content */}
                    <div className={`text-${category.color} w-1/2`}>
                        <h1 className='uppercase font-bold text-2xl lg:text-3xl'>{category.title}</h1>
                        <p className='text-sm my-5'>{category.desc}</p>
                        <button className={`hidden 2xl:block animated-link text-white bg-black py-2 px-4 font-bold rounded-md `}>Explore</button>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Menu