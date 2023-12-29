"use client"

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReactSwitch from 'react-switch'
import { toast } from 'react-toastify'
import useSWR from 'swr'

const UpdatePage = () => {
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
            router.push('/login')
            toast.error("You are not authorized to view this page! Please sign in")
        }
    })
    const searchParams = useSearchParams()
    const productId = searchParams.get("product_id")

    // SWR USED FOR CLIENT_SIDE DATA FETCHING
    // fetches product data
    const productFetcher = (url: string) => fetch(url).then(res => res.json())
    const { data, error, isLoading } = useSWR(`/api/products/${productId}`, productFetcher)


    // useState for all inputs
    const [inputs, setInputs] = useState<Input>({
        title: "",
        desc: "",
        price: 0,
        catType: "",
        isFeatured: false
    })


    // useState for "isFeatured" switch
    const [featureCheck, setFeatureChecked] = useState(false)

    // useState for "Img" switch
    const [imgCheck, setImgCheck] = useState(false)

    // useState for all options
    const [options, setOptionsCreated] = useState<Option[]>([])

    // useState for image upload
    const [img, setImg] = useState<File>()

    // useState for each option
    const [option, setOption] = useState<Option>({
        title: "",
        additionalPrice: 0
    })
    // handles change for all input fields excluding options and isFeatured fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
    // handles change for "isFeatured" switch
    const handleFeatureSwitch = (nextChecked: boolean) => {
        setFeatureChecked(nextChecked),
            setInputs(prev => {
                return {
                    ...prev,
                    isFeatured: nextChecked
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

    const handleImgSwitch = (nextChecked: boolean) => {
        setImgCheck(nextChecked)
    }

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

        // if image is changed, upload image and update product
        if (data.img !== img) {
            try {
                const url = await uploadImage()
                await fetch(`/api/products/${productId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        img: url,
                        ...inputs,
                        options

                    })
                })

                setTimeout(() => {
                    router.push(`/product/${productId}`)
                }, 2000)
                toast.success('Product updated successfully!')
                router.refresh()
            } catch (error) {
                console.log(error)
            }
        } else // if image is not changed, only update product
        {
            try {
                await fetch(`/products/${productId}`, {
                    method: "PUT",
                    body: JSON.stringify({
                        img: img,
                        ...inputs,
                        options

                    })
                })
                setTimeout(() => {
                    router.push(`/product/${productId}`)
                }, 2000)
                toast.success('Product updated successfully!')
                router.refresh()
            } catch (error) {
                console.log(error)
            }
        }
    }


    // useEffect used to set data to inputs, specifically for options and isFeatured
    useEffect(() => {
        if (data) {
            setFeatureChecked(data.isFeatured)
            setOptionsCreated(data.options)
            setImg(data.img)
            setInputs({
                title: data.title,
                desc: data.desc,
                price: data.price,
                catType: data.catType,
                isFeatured: data.isFeatured
            })
        }
    }, [data])

    if (error) return <div>Failed to load</div>
    if (isLoading || status === 'loading') return <div>Loading...</div>

    // if user is admin, render form
    if (session?.user.isAdmin) {
        return (
            <div className='p-8'>
                <form className='shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-wrap gap-4 p-8 rounded-sm' onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-bold underline'>
                        Update &quot;{data.title}&quot; details:
                    </h1>
                    {/* TITLE CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Title</label>
                        <input
                            onChange={handleChange}
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            type="text"
                            name='title'
                            defaultValue={data.title} />
                    </div>
                    {/* DESCRIPTION CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Description</label>
                        <textarea
                            onChange={handleChange}
                            name='desc'
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            defaultValue={data.desc} />
                    </div>
                    {/* PRICE CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Price ($)</label>
                        <input
                            onChange={handleChange}
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            type="number"
                            name='price'
                            defaultValue={data.price} />
                    </div>
                    {/* CATEGORY CONTAINER */}
                    <div className='w-full flex flex-col gap-2'>
                        <label>Category</label>
                        <input
                            onChange={handleChange}
                            className='ring-1 ring-red-200 p-2 rounded-sm'
                            type="text"
                            name='catType'
                            defaultValue={data.catType} />
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
                        <div className='w-52 bg-yellow-500 text-white p-2'
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
                            <ReactSwitch onChange={handleFeatureSwitch}
                                checked={featureCheck}
                                name='isFeatured'
                                className='pl-3' />
                        </label>
                    </div>

                    {/* Change image? */}
                    <div className='w-full flex flex-col gap-2'>
                        <div>
                            <label>
                                <span>Change Product Image?</span>
                                <ReactSwitch onChange={handleImgSwitch}
                                    checked={imgCheck}
                                    name='isFeatured'
                                    className='pl-3' />
                            </label>
                        </div>
                        {imgCheck && (
                            <div>
                                <input
                                    className=''
                                    type="file"
                                    onChange={handleImgChange}
                                    name='img'
                                    placeholder='Name of product' />
                            </div>
                        )}
                    </div>

                    {/* SUBMIT */}
                    <button type="submit"
                        className='bg-green-500 text-white p-2 w-full rounded-md'>Update Product</button>
                </form>
            </div>
        )
    } 
    // dont render form if user is not admin
    else {
        router.push('/')
        toast.error("You are not authorized to view this page!")
    }
}

export default UpdatePage