"use client"

import { useCart } from '@/utils/cartStore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

const CartIcon = () => {

    const { data: session, status } = useSession()
    const { totalItems } = useCart()

    useEffect(() => {
        useCart.persist.rehydrate()
    }, [])

    return (
        <div>
            {/* if user is not admin, show cart icon. (admin doesnt need to see cart) */}
            {!(session?.user.isAdmin) ?
                <Link href="/cart" className='flex items-center gap-2 animated-link'>
                    <div className='relative w-8 h-8 md:w-5 md:h-5'>
                        <Image src="/cart.png" alt='' fill />
                    </div>
                    <span>Cart ({totalItems})</span>
                </Link> : null}
        </div>
    )
}

export default CartIcon