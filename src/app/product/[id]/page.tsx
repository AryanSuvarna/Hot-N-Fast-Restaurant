import BackBtn from '@/components/BackBtn'
import DeleteBtn from '@/components/DeleteBtn'
import Price from '@/components/Price'
import UpdateBtn from '@/components/UpdateBtn'
import { ProductType } from '@/types/types'
import Image from 'next/image'
import React from 'react'


const getData = async (id: string) => {
    // we are fetching from our endpoint, which we have defined as /api/product
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products/${id}`)

    if (!res.ok) {
        throw new Error("FAILED TO FETCH")
    }

    return res.json()
}

const SingleProductPage = async ({ params }: { params: { id: string } }) => {

    // single prodcut has the same type as the ProductType defined in types/types.ts
    console.log(params.id)
    const singleProduct: ProductType = await getData(params.id)

    return (
        <div className='p-4 h-screen lg:px-20 xl:px-40 flex flex-col justify-around text-yellow-500 md:flex-row md:gap-8 md:items-center relative'>
            {/* IMAGE CONTAINER */}
            {singleProduct.img && (
                <div className="w-full h-1/2 relative md:h-[70%]"> {/* mb-10 md:mr-5*/}
                    <Image
                        src={singleProduct.img}
                        alt=''
                        className='object-contain'
                        fill
                    />
                </div>
            )}
            {/* TEXT CONTAINER */}
            <div className="h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8">
                <h1 className='text-3xl font-bold uppercase xl:text-5xl'>{singleProduct.title}</h1>
                <p>{singleProduct.desc}</p>
                {/* create a client-side component so we dont have to make all of this page client-side*/}
                <Price product={singleProduct} />
            </div>
            <DeleteBtn id={singleProduct.id} />
            <UpdateBtn id={singleProduct.id} />
            <BackBtn />
        </div>
    )
}

export default SingleProductPage