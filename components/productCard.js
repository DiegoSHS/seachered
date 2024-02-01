import { createNew, deleteById } from "@/supabase/transactions"
import { Button } from "@/components/Input"
import CreateNewForm from "@/components/CreateNewForm"
import { useState } from "react"
import Empty from "@/components/Empty";
export const ProductCard = ({ product, methods }) => {
    const [handleDelete] = methods
    return (
        <div className="p-1 text-foreground border border-t-foreground/10 rounded-md px-4 py-2 b-2">
            <div className="flex justify-between">
                <div className="font-bold">{product.name}</div>
                <div className="text-xs text-green-500">{product.category}</div>
            </div>
            <div className="text-green-500">{`$${product.price}`}</div>
            <div>{product.description}</div>
            <div>
                <Button onClick={() => handleDelete(product.id)}>Eliminar</Button>
            </div>
        </div>
    )
}

export const ProductCards = ({ products, state, supabase }) => {
    const [setProducts] = state
    const [createActive, setCreateActive] = useState(false)
    const handleDelete = async (id) => {
        setProducts((products) => products.filter((product) => product.id !== id))
        await deleteById(supabase, 'products', id)
    }
    const handleCreate = async (newProduct) => {
        const { data } = await createNew(supabase, 'products', newProduct)
        setProducts((products) => [...products, ...data])
    }
    return (
        createActive ? (<CreateNewForm actionMethod={handleCreate} activeState={setCreateActive} />) :
            (<>
                <div className="text-foreground w-full flex items-center justify-center mt-5">
                    <Button onClick={() => { setCreateActive((active) => !active) }}>Crear nuevo</Button>
                </div>{products.length !== 0 ?
                    <div className="text-foreground grid grid-cols-3 m-5 px-8 gap-2 justify-center items-center">
                        {
                            products.map((product) => <ProductCard key={product.id} product={product} methods={[handleDelete]} />)
                        }
                    </div> : <Empty></Empty>}
            </>)
    )
}