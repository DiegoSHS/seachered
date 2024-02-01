'use client'

import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { ProductCards } from '@/components/productCard'
import { selectAll, selectCategory, selectFiltered } from "../../supabase/transactions"
import { Button, Input, Select } from "@/components/Input"
import { opts } from "@/components/CreateNewForm"

export default function Products() {
    const [products, setProducts] = useState([])
    const [filter, setFilter] = useState('')
    const supabase = createClient()
    const handleSearch = async (e) => {
        setFilter(e.target.value)
    }
    const handleCategory = async ({ target }) => {
        const { data } = await selectCategory(supabase, 'products', target.value)
        setProducts(data)
    }
    const getProducts = async () => {
        const { data } = await selectAll(supabase, 'products')
        console.log(data)
        setProducts(data)
    }
    const getFilterProducts = async () => {
        console.log(filter)
        if (filter === '') return getProducts()
        const { data } = await selectFiltered(supabase, 'products', filter)
        setProducts(data)
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
            <ProductCards products={products} state={[setProducts]} supabase={supabase} />
        </div>
    )
}
