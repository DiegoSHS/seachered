export const ProductCard = ({ product }) => {
    return (
        <div className="bg-gray-100 p-1 shadow">
            <div className="font-bold">{product.name}</div>
            <div className="text-green-500">{`$${product.price}`}</div>
            <div>{product.description}</div>
        </div>
    )
}

export const ProductCards = ({products}) => {
    return (
        <div className="flex flex-row p-1 m-5 gap-2 items-center">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
    )
}