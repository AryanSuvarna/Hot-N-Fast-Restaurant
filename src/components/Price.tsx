"use client"

import { ProductType } from '@/types/types'
import { useCart } from '@/utils/cartStore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Price = ({ product }: { product: ProductType }) => {

    const { addToCart } = useCart()

    const [total, setTotal] = useState(product.price)
    const [quantity, setQuantity] = useState(1)
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        useCart.persist.rehydrate()
    }, [])

    // for total price
    useEffect(() => {
        if (product.options?.length) {
            const calc = quantity * ((+product.price) + (+product.options[selected].additionalPrice))
            setTotal(calc)
        }
        else {
            const calc = quantity * (+product.price)
            setTotal(calc)
        }
    }, [quantity, selected, product])

    const handleCart = () => {
        addToCart({
            id: product.id,
            title: product.title,
            img: product.img,
            price: (+product.price) + (product.options?.length ? (+product.options[selected].additionalPrice) : 0),
            totalPrice: (+total),
            // if there are options, add the selected option to the cart
            optionsTitle: product.options?.length ? product.options[selected].title : '',
            quantity: quantity
        }),
            toast.success(product.title + " was added to your cart!");
    }
    return (
        <div className='flex flex-col gap-4'>
            {/* COST CONTAINER */}
            <h2 className='text-2xl font-bold xl:text-3xl'>${(+total).toFixed(2)}</h2>
            {/* OPTIONS CONTAINER */}
            <div className="flex gap-4">
                {/* sort the array before displaying it so order of options remains same even if we make updates */}
                {product.options ?  product.options?.sort(function(a, b) { return a.additionalPrice - b.additionalPrice }).map((option, index) => (
                    <button
                        key={option.title}
                        className="min-w-[6rem] p-2 ring-1 ring-yellow-300 rounded-md capitalize"
                        style={{
                            background: selected === index ? 'rgb(234 179 8)' : 'white',
                            color: selected === index ? 'white' : 'rgb(234 179 8)',
                        }}
                        onClick={() => setSelected(index)}
                    >
                        {((+option.additionalPrice) === 0) ? option.title : (option.title + " +$" + (+option.additionalPrice).toFixed(2))}
                    </button>
                )): null}
            </div>
            {/* QUANTITY AND ADD-TO-CART CONTAINER */}
            <div className="flex justify-between items-center">
                {/* QUANTITY */}
                <div className="flex justify-between w-full p-4 ring-1 ring-yellow-500">
                    <span className=''>Quantity</span>
                    <div className='flex gap-4 items-center'>
                        <button onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}>{'<'}</button>
                        <span>{quantity}</span>
                        <button onClick={() => setQuantity(prev => (prev < 8 ? prev + 1 : 8))}>{'>'}</button>
                    </div>
                </div>
                {/* ADD TO CART */}
                <button
                    className='uppercase w-56 text-sm sm:text-base bg-yellow-500 text-white p-4 ring-1 ring-yellow-500'
                    onClick={() => handleCart()}
                >Add to Cart</button>
            </div>
        </div>
    )
}

export default Price