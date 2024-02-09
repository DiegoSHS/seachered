'use client'

import { useEffect, useState } from "react"
import { ProductCards } from '@/components/productCard'
import { selectAll, selectCategory, selectFiltered } from "@/supabase/transactions"
import { Button, Input, Select } from "@/components/Input"
import CreateNewForm, { opts } from "@/components/CreateNewForm"
import { StoredContext } from "@/context"
import toast from "react-hot-toast"

export default function Products() {
    const { memory: { products, creating }, setStored } = StoredContext()
    const [filter, setFilter] = useState('')
    const [loading, setLoading] = useState(true)
    const loadProducts = (promise) => {
        setLoading(true)
        promise.then(({ data, error }) => {
            if (error) {
                toast.error('No se pudieron obtener los registros', {
                    id: 'load-error',
                    duration: 3000
                })
                setLoading(false)
                return
            }
            setStored({ products: data })
            setLoading(false)
        })
    }
    const getProducts = async () => {
        loadProducts(selectAll('products'))
    }
    const handleSearch = async (e) => {
        setFilter(e.target.value)
    }
    const handleCategory = async ({ target }) => {
        loadProducts(selectCategory('products', target.value))
    }
    const getFilterProducts = async () => {
        if (filter === '') return getProducts()
        loadProducts(selectFiltered('products', filter))
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        getFilterProducts()
    }, [filter])

    return (
        <div className="flex flex-col mt-4 items-center">
            <div className="items-center justify-center">
                <Input type='text' placeholder='buscar' onChange={handleSearch} />
                <Button className='bg-inherit rounded-md px-4 py-2 text-foreground mb-2' onClick={getProducts}>Borrar filtros</Button>
                <Select onChange={handleCategory} name='category' options={opts}></Select>
            </div>
            {
                !creating && (
                    <div className="text-foreground w-full flex items-center justify-center mt-5">
                        <Button variant='contained' onClick={() => { setStored({ creating: true }) }}>Crear nuevo</Button>
                    </div>)
            }
            {
                loading ? (
                    <div className="flex flex-col items-center justify-center p-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="animate-spin w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </div>
                ) : (
                    creating ? <CreateNewForm /> : < ProductCards products={products} />
                )
            }
        </div>
    )
}
