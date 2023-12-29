"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import ReactSwitch from 'react-switch'
import { toast } from 'react-toastify'

const AddPage = () => {

    // types

    type Option = {
        title: string
        additionalPrice: number
    }

    type Input = {
        title: string
        desc: string
        price: number
        catType: string
        isFeatured: boolean
    }

    const router = useRouter()

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push("/login")
            toast.error('You are not authorized to view this page! Please sign in')
        }
    })

    // useState for all inputs
    const [inputs, setInputs] = useState<Input>({
        title: "",
        desc: "",
        price: 0,
        catType: "",
        isFeatured: false
    })

    // useState for all options
    const [options, setOptionsCreated] = useState<Option[]>([])

    // useState for each option
    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice: 0
    })

    // useState for "isFeatured" switch
    const [checked, setChecked] = useState(false)

    // useState for image upload
    const [img, setImg] = useState<File>()

    if (status === 'loading') {
        return <p>Loading...</p>
    }


    // handles change for all input fields excluding options and isFeatured fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // handle change for options
    const handleOption = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    // handle change for isFeatured
    const handleSwitch = (nextChecked: boolean) => {
        setChecked(nextChecked),
            setInputs(prev => {
                return {
                    ...prev,
                    isFeatured: nextChecked
                }
            })
    }

    // handles image change
    const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const file = (target.files as FileList)[0] //take first file only
        setImg(file)
    }

    // handles image upload
    const uploadImage = async () => {
        const data = new FormData()
        const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME
        data.append("file", img!)
        data.append("upload_preset", "restaurant")
        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "POST",
            body: data
        })

        const resData = await res.json()
        return resData.url
    }

    // handles submission of form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const url = await uploadImage()
            const res = await fetch("http://localhost:3000/api/products", {
                method: "POST",
                body: JSON.stringify({
                    img: url,
                    ...inputs,
                    options

                })
            })

            const data = await res.json()
            setTimeout(() => {
                router.push(`/product/${data.id}`)
            }, 2000)
            toast.success('Product added successfully!')
            router.refresh()
        } catch (error) {
            console.log(error)
        }

    }

    // if user is admin, show the form
    if (session?.user.isAdmin) {
        return (
            <div className='p-8'>
                <form className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-wrap gap-4 p-8 rounded-sm' onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-bold underline'>
                        Add a new Product
                    </h1>
                    {/* IMAGE CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Image</label>
                        <input
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            type="file"
                            onChange={handleImgChange}
                            name='img'
                            placeholder='Name of product' />
                    </div>
                    {/* TITLE CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Title</label>
                        <input onChange={handleChange}
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            type="text"
                            name='title'
                            placeholder='Name of product' />
                    </div>
                    {/* DESCRIPTION CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Description</label>
                        <textarea onChange={handleChange}
                            name='desc'
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            placeholder='Provide a nice description about the product' />
                    </div>
                    {/* PRICE CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Price</label>
                        <input onChange={handleChange}
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            type="number"
                            name='price'
                            placeholder='Cost of product' />
                    </div>
                    {/* CATEGORY CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Category</label>
                        <input onChange={handleChange}
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            type="text"
                            name='catType'
                            placeholder='Category of product' />
                    </div>
                    {/* OPTIONS */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Options</label>
                        <div>
                            <input onChange={handleOption}
                                className='ring-1 ring-red-200 p-2 mr-2 rounded-sm'
                                type="text"
                                placeholder='Title'
                                name='title' />
                            <input onChange={handleOption}
                                className='ring-1 ring-red-200 p-2 rounded-sm'
                                type="number"
                                placeholder='Additional Price'
                                name='additionalPrice' />
                        </div>
                        <div className='w-52 bg-yellow-500 text-white p-2 text-center'
                            onClick={() => setOptionsCreated((prev) => [...prev, option])}
                        >
                            Add Option
                        </div>
                    </div>
                    {/* OPTIONS ADDED/CREATED */}
                    <div>
                        {options.map(item => (
                            <div className='ring-1 p-2 ring-red-200 rounded-md cursor-pointer'
                                key={item.title}
                                onClick={() => setOptionsCreated(options.filter(
                                    opt => opt.title !== item.title
                                ))}>
                                <span>{item.title} +${(+item.additionalPrice).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Add to Featured? */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>
                            <span>Add to Featured?</span>
                            <ReactSwitch onChange={handleSwitch}
                                checked={checked}
                                name='isFeatured'
                                className='pl-3' />
                        </label>
                    </div>

                    {/* SUBMIT */}
                    <button type="submit"
                        className='bg-green-500 text-white p-2 w-full rounded-md'>Add Product</button>
                </form>
            </div>
        )
    }
    // if user is not admin, redirect to homepage
    else {
        router.push("/")
        toast.error('You are not authorized to view this page!')
    }


}

export default AddPage
