'use client'

import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { ProductCards } from '@/components/productCard'

export default function Products() {
    const [products, setProducts] = useState([])
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    useEffect(() => {
        const getProducts = async () => {
            const { data } = await supabase.from('products').select()
            console.log(data)
            setProducts(data)
        }
        getProducts()
    }, [])

    return (
        <ProductCards products={products} />
    )
}
