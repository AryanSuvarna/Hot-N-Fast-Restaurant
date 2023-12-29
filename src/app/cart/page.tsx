"use client"

import { useCart } from '@/utils/cartStore'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

//TODO: FIX PRODUCT CONTAINER SCROLLING ON MOBILE

const CartPage = () => {
    const { products, totalItems, totalPrice, removeFromCart, removeSingleItemFromCart, clearCart, addSingleItemToCart } = useCart()

    const { data: session, status } = useSession()

    const router = useRouter()

    useEffect(() => {
        useCart.persist.rehydrate()
    }, [])

    const handleCheckout = async () => {
        if (!session) {
            toast.error('Please login to checkout!')
        }
        else if (totalPrice === 0) {
            toast.error('Please add items to your cart!')
        }
        else {
            try {
                const res = await fetch("/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        price: totalPrice,
                        products: products,
                        status: "not paid",
                        userEmail: session.user.email,
                    })
                })

                const data = await res.json()
                router.push(`/payment/${data.id}`)

            } catch (error) {
                console.log(error)
            }

        }
    }

    return (
        <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-yellow-500 lg:flex-row'>
            {/* PRODUCTS CONTAINER */}
            <div className=' h-1/2 flex justify-center items-center lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40'>
                <div className='p-4 flex flex-col overflow-auto'>
                    {/* SINGLE ITEM CONTAINER */}
                    {products.map(item => (

                        <div className="flex items-center justify-between" key={item.id + item.optionsTitle}>
                            {/* IMAGE CONTAINER */}
                            {item.img && <Image src={item.img} alt='' width={100} height={100} />}
                            {/* INFO CONTAINER */}
                            <div className="">
                                {/* TITLE CONTAINER */}
                                <h1 className="uppercase text-lg font-bold">{item.title}</h1>
                                {/* OPTION CONTAINER */}
                                <span className="">{item.optionsTitle}</span>
                            </div>
                            {/* PRICE CONTAINER */}
                            <span className="font-bold ">${(+item.price).toFixed(2)} per</span>
                            {/* QUANTITY CONTAINER */}
                            <div className="flex items-center gap-2">
                                {/* <span className="font-bold">Qty:</span>
                            <span className="font-bold">{item.quantity}</span> */}
                                <div className='flex gap-2 items-center'>
                                    <button className=" cursor-pointer  text-2xl" onClick={item.quantity > 1 ? () => removeSingleItemFromCart(
                                        {
                                            ...item,
                                        }
                                    ) : (undefined)}>{'-'}
                                    </button>
                                    <span className='font-bold'>{item.quantity}</span>
                                    <button className=" cursor-pointer text-2xl" onClick={item.quantity < 8 ? () => addSingleItemToCart(
                                        {
                                            ...item,
                                            // quantity: item.quantity + 1
                                        }
                                    ) : undefined}>{'+'}
                                    </button>
                                </div>
                            </div>

                            {/* REMOVE CONTAINER */}
                            <span className=" cursor-pointer" onClick={() => removeFromCart(item)}>X</span>
                        </div>
                    ))}
                    {/* CLEAR ALL */}
                    {products.length ?
                        <button
                            className='bg-yellow-500 text-white p-3 rounded-md w-1/2 self-end'
                            onClick={() => clearCart()}>
                            CLEAR ALL
                        </button>
                        : status === "authenticated" ?
                            <h1 className='text-2xl font-bold text-center'>Your cart is empty :(</h1>
                            : <h1 className='text-2xl font-bold text-center'>Please login to view your cart and place an order!</h1>}
                </div>
            </div>

            {/* CHECKOUT CONTAINER */}
            <div className="h-1/2 p-4 bg-yellow-100 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-15 xl:px-40 2xl:text-xl 2xl:gap-6">
                <div className="flex justify-between">
                    <span className=''>Subtotal ({totalItems} items):</span>
                    <span className=''>${(+totalPrice).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className=''>Service Cost (5%):</span>
                    <span className=''>${(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className=''>Delivery Fee:</span>
                    {totalPrice > 30 ? <span className='text-green-500'>FREE!</span> : <span>$2.00</span>}
                </div>
                <hr className='my-2' />
                <div className="flex justify-between">
                    <span className=''>Total:</span>
                    {
                        totalPrice === 0 ? (
                            <span className=' font-bold'>$0.00</span>
                        ) : (
                            totalPrice > 30 ?
                                <span className=' font-bold'>${(+totalPrice + (totalPrice * 0.05)).toFixed(2)}</span>
                                : <span className=' font-bold'>${(+totalPrice + (totalPrice * 0.05) + 2).toFixed(2)}</span>
                        )
                    }
                </div>
                <button
                    className='bg-yellow-500 text-white p-3 rounded-md w-1/2 self-end'
                    onClick={handleCheckout}
                >
                    CHECKOUT
                </button>
            </div>
        </div>
    )
}

export default CartPage
