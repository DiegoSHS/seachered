'use client'
import { useEffect, useState } from "react"
import { createContext, useContext } from "react"
import { selectAll } from "@/supabase/transactions"

export const defaultProduct = {
    name: '',
    price: '',
    description: '',
    category: null
}

export const Data = createContext()

export const StoredContext = () => useContext(Data)

export const Context = (props) => {
    const { children } = props
    const getProducts = async () => {
        const { data } = await selectAll('products')
        setStored({ products: data })
    }
    const [memory, setMemory] = useState({
        products: [],
        selected: null,
        filter: '',
        handlers: {
            getProducts
        },
        newProduct: defaultProduct,
        editing: false,
        creating: false,
        validForm: false,
        activeForm: false
    })

    const setStored = (prop) => { setMemory((prev) => ({ ...prev, ...prop })) }

    useEffect(() => {
        getProducts()
    }, [])
    const ctx = { memory, setStored }
    return (
        <Data.Provider value={ctx}>
            {children}
        </Data.Provider>
    )
}