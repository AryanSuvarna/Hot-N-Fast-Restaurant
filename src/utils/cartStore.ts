// Zustand store for cart

import { CartActionType, CartType } from "@/types/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

const INIT_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
}

export const useCart = create(persist<CartType & CartActionType>((set, get) => ({
    products: INIT_STATE.products,
    totalItems: INIT_STATE.totalItems,
    totalPrice: INIT_STATE.totalPrice,

    // actions
    addToCart(item) {
        const currProducts = get().products
        // check if item is already in cart but with different options
        if (currProducts.find((product) => product.id === item.id && product.optionsTitle === item.optionsTitle)) {
            set((state) => ({
                products: state.products.map((product) => {
                    if (product.id === item.id && product.optionsTitle === item.optionsTitle) {
                        return {
                            ...product,
                            quantity: product.quantity + item.quantity
                        }
                    }
                    return product
                }),
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.totalPrice
            }))
        } else {
            set((state) => ({
                products: [...state.products, item],
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.totalPrice
            }))
        }
    },
    
    // add single item to cart from cart page
    addSingleItemToCart(item) {
        set((state) => ({
            products: state.products.map((product) => {
                if (product.id === item.id && product.optionsTitle === item.optionsTitle) {
                    return {
                        ...product,
                        totalPrice: product.totalPrice + item.price,
                        quantity: product.quantity + 1
                    }
                }
                return product
            }),
            totalPrice: state.totalPrice + item.price,
            totalItems: state.totalItems + 1,
        }))
    },
    removeFromCart(item) {
        // remove item from cart if id and optionsTitle are the same as the item passed in

        set((state) => ({
            products: state.products.filter((product) => !(product.id === item.id && product.optionsTitle === item.optionsTitle)),
            // remove the accumulated price and quantity of the item from the cart
            totalPrice: state.totalPrice - item.totalPrice,
            totalItems: state.totalItems - item.quantity,
        }))
    },
    clearCart() {
        set(INIT_STATE)
    },
    // remove single item from cart from cart page
    removeSingleItemFromCart(item) {
        set((state) => ({
            products: state.products.map((product) => {
                if (product.id === item.id && product.optionsTitle === item.optionsTitle) {
                    return {
                        // accumulated price and quantity of the item from the cart
                        ...product,
                        totalPrice: product.totalPrice - item.price,
                        quantity: product.quantity - 1
                    }
                }
                return product
            }),
            totalPrice: state.totalPrice - item.price,
            totalItems: state.totalItems - 1,
        }))
    }
}), {
    name: "cart-storage",
    skipHydration: true
}))
