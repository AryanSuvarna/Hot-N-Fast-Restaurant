export type MenuType = {
    id: number
    type: string
    title: string
    desc?: string
    img?: string
    color: string
}[];

export type ProductType = {
    id: string
    title: string
    desc?: string
    img?: string
    price: number
    options?: { title: string; additionalPrice: number }[]
};

export type OrderType = {
    id: string
    title: string
    createdAt: string // date
    price: number
    products: CartItemType[]
    status: string
    userEmail: string
}

export type CartItemType = {
    id: string
    title: string
    img?: string
    price: number
    totalPrice: number
    optionsTitle: string
    quantity: number
}

export type CartType = {
    products: CartItemType[]
    totalItems: number
    totalPrice: number
}

export type CartActionType = {
    addToCart: (item: CartItemType) => void
    addSingleItemToCart: (item: CartItemType) => void
    removeFromCart: (item: CartItemType) => void
    removeSingleItemFromCart: (item: CartItemType) => void
    clearCart: () => void
}