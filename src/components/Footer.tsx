import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='h-12 flex items-center justify-between md:h-24 p-4 lg:px-20 xl:px-40 my-4'>
            <Link href={"/"} className='uppercase font-bold flex items-center'>
                <Image src={"/logo.png"} alt="" width={110} height={110} className='hidden md:block'/>
                <span>Hot N' Fast</span>
            </Link>
            <p>Ⓒ All right reserved</p>
        </div>
    )
}

export default Footer