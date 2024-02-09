'use client'

import { useEffect, useState } from "react"
import { ProductCards } from '@/components/productCard'
import { selectCategory, selectFiltered } from "@/supabase/transactions"
import { Button, Input, Select } from "@/components/Input"
import { opts } from "@/components/CreateNewForm"
import { StoredContext } from "@/context"

export default function Products() {
    const { memory: { products, handlers: { getProducts } }, setStored } = StoredContext()
    const [filter, setFilter] = useState('')
    const handleSearch = async (e) => {
        setFilter(e.target.value)
    }
    const handleCategory = async ({ target }) => {
        const { data } = await selectCategory('products', target.value)
        setStored({ products: data })
    }
    const getFilterProducts = async () => {
        if (filter === '') return getProducts()
        const { data } = await selectFiltered('products', filter)
        setStored({ products: data })
    }
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
            <ProductCards products={products} />
        </div>
    )
}
