import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import CartIcon from './CartIcon'
import UserLink from './UserLink'
import Image from 'next/image'

const Navbar = () => {
    const user = true
    return (
        <div className='h-12 text-yellow-500 p-4 flex items-center justify-between border-b-2 border-b-yellow-500 uppercase md:h-24 lg:px-20 xl:px-40'>
            {/* LEFT SIDE OF SCREEN LINKS */}
            <div className='hidden md:flex gap-4 flex-1'> {/* for small screen, the mobile menu will be hidden */}
                <Link href={"/"} className='animated-link '>
                    Homepage
                </Link>
                <Link href={"/menu"} className='animated-link'>
                    Menu
                </Link>
                <Link href={"/contact"} className='animated-link'>
                    Contact
                </Link>
            </div>

            {/* Logo (MIDDLE OF THE SCREEN)*/}
            <div className='font-semibold text-xl md:text-4xl md:font-bold flex-1 md:text-center hover:scale-105 transition-all duration-500'>
                <Link href="/" className='flex items-start md:items-center md:justify-center'>
                    <span className='md:hidden xl:block'>Hot</span>&nbsp;
                    <span className='md:hidden'>N&apos;</span>
                    <Image src='/logo.png' alt='' width={100} height={100} className='hidden md:block md:object-contain' />&nbsp;
                    <span className='md:hidden xl:block'>Fast</span>
                </Link>
            </div>
            {/* Mobile Menu (no nav bar in phone view)*/}
            <div className='md:hidden'>
                <Menu />
            </div>

            {/* RIGHT SIDE OF SCREEN LINKS */}
            <div className='hidden md:flex gap-2 flex-1 justify-end'>
                <CartIcon />
                <UserLink />
            </div>
        </div>
    )
}

export default Navbar