'use client'
import { useState } from "react"
import { createContext, useContext } from "react"

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
    const [memory, setMemory] = useState({
        products: [],
        selected: null,
        filter: '',
        newProduct: defaultProduct,
        editing: false,
        creating: false,
        validForm: false,
        activeForm: false
    })
    const setStored = (prop) => { setMemory((prev) => ({ ...prev, ...prop })) }
    const ctx = { memory, setStored }
    return (
        <Data.Provider value={ctx}>
            {children}
        </Data.Provider>
    )
}