import { useEffect, useState } from "react"
import { createContext, useContext } from "react"
import { createNew, deleteById, selectAll } from "@/supabase/transactions"

export const Data = createContext()

export const StoredContext = () => useContext(Data)

export const Context = (props) => {
    const { children } = props

    const [memory, setMemory] = useState({
        products: [],
        selected: {},
        filter: '',
        handlers: {
            handleDelete,
            handleCreate
        },
        editing: false,
        creating: false,
        validForm: false,
        activeForm: false
    })

    const setStored = (prop) => { setMemory((prev) => ({ ...prev, ...prop })) }

    const handleDelete = async (id) => {
        setStored({ products: memory.products.filter((product) => product.id !== id) })
        await deleteById('products', id)
    }
    const handleCreate = async () => {
        const { error, data } = await createNew('products')
        if (error) {
            alert(error.message)
            return
        }
        setStored({ products: [...memory.products, ...data] })
    }

    const getProducts = async () => {
        const { data } = await selectAll('products')
        setStored({ products: data })
    }

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