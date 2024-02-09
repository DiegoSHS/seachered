import { Button } from "@/components/Input"
import { StoredContext } from "@/context"
import Empty from "@/components/Empty"
import { deleteById } from "@/supabase/transactions"
import toast from "react-hot-toast"

export const ProductCard = ({ product }) => {
    const { memory: { products }, setStored } = StoredContext()
    const handleDelete = async (id) => {
        toast.promise(deleteById('products', id), {
            success: ({ error }) => {
                if (error) {
                    return `Error: ${error.message}`
                }
                setStored({ products: products.filter((product) => product.id !== id) })
                return 'Eliminado con éxito'
            },
            loading: 'Eliminando',
            error: 'Error al realizar petición, intente de nuevo'
        }, {
            success: {
                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
            }
        })
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
    return (
        products.length !== 0 ?
            <div className="text-foreground grid grid-cols-3 m-5 px-8 gap-2 justify-center items-center">
                {
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
            </div> : <Empty></Empty>
    )
}