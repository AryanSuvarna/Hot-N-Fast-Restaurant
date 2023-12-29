"use client"

import { OrderType } from "@/types/types";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const OrdersPage = () => {

    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            signIn()
        }
    })


    const { isLoading, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () => fetch('/api/orders').then(res => res.json())
    })


    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => {
            return fetch(`/api/orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(status),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] })
        }
    })

    const update = (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const input = form.elements[0] as HTMLInputElement
        const status = input.value

        mutation.mutate({ id, status })
        toast.success("Order status successfully updated!")
    }

    if (isLoading || status === "loading") return "Loading..."
    if (error) return "An error has occurred: " + error

    return (
        <div className="p-4 lg:px-20 xl:px-40">
            <table className="w-full border-separate border-spacing-3">
                <thead>
                    <tr className="text-left">
                        <th className="hidden md:block">Order ID</th>
                        <th>Date</th>
                        <th>Cost</th>
                        <th className="hidden md:block">Products</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((order: OrderType) => (
                        <tr className={`text-sm md:text-base ${order.status.toLowerCase() !== "delivered" && "bg-yellow-100"}`} key={order.id}>
                            <td className="text-center hidden md:block py-6 px-1">{order.id}</td>
                            <td className="text-center py-6 px-1">{order.createdAt.toString().slice(0, 10)}</td>
                            <td className="text-center py-6 px-1">${(+order.price).toFixed(2)}</td>
                            <td className="hidden md:block py-6 px-1">{
                                order.products.length > 1 ? (
                                    order.products.map((product) => (
                                        `(${product.quantity})${product.title}, `
                                    ))) : 
                                    (`(${+order.products[0].quantity})${order.products[0].title}`)}
                            </td>

                            {
                                session?.user.isAdmin ? (
                                    <td>
                                        <form className="flex item-center justify-center gap-4" onSubmit={(e) => update(e, order.id)}>
                                            <input placeholder={order.status} className="p-2 w-[7rem] md:w-[10rem] 2xl:w-[15rem] ring-1 ring-red-500 rounded-md" />
                                            <button className=" bg-black p-2 rounded-full">
                                                <Image src="/edit.png" alt="" width={20} height={20} />
                                            </button>
                                        </form>
                                    </td>
                                ) : (
                                    <td className="py-6 px-1">{order.status}</td>
                                )
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersPage;