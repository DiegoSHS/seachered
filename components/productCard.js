import { Button } from "@/components/Input"
import CreateNewForm from "@/components/CreateNewForm"
import { StoredContext } from "@/context"
import Empty from "@/components/Empty"
import { deleteById } from "@/supabase/transactions"

export const ProductCard = ({ product }) => {
    const { memory: { products }, setStored } = StoredContext()
    const handleDelete = async (id) => {
        setStored({ products: products.filter((product) => product.id !== id) })
        await deleteById('products', id)
    }
    const goEdit = () => { setStored({ creating: true, editing: true, newProduct: product, selected: product.id, validForm: true }) }
    const goDelete = () => handleDelete(product.id)
    return (
        <div className="p-1 text-foreground border border-t-foreground/10 rounded-md px-4 py-2 b-2">
            <div className="flex justify-between">
                <div className="font-bold">{product.name}</div>
                <div className="text-xs text-green-500">{product.category}</div>
            </div>
            <div className="text-green-500">{`$${product.price}`}</div>
            <div>{product.description}</div>
            <div className="flex gap-1">
                <Button onClick={goDelete}>Eliminar</Button>
                <Button onClick={goEdit}>Editar</Button>
            </div>
        </div>
    )
}

export const ProductCards = ({ products }) => {
    const { memory: { creating }, setStored } = StoredContext()
    return (
        creating ? (<CreateNewForm />) :
            (<>
                <div className="text-foreground w-full flex items-center justify-center mt-5">
                    <Button onClick={() => { setStored({ creating: true }) }}>Crear nuevo</Button>
                </div>{products.length !== 0 ?
                    <div className="text-foreground grid grid-cols-3 m-5 px-8 gap-2 justify-center items-center">
                        {
                            products.map((product) => <ProductCard key={product.id} product={product} />)
                        }
                    </div> : <Empty></Empty>}
            </>)
    )
}