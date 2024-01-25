export const Button = ({ children, ...props }) => {
    return (
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-green-600" {...props}>
            {children}
        </button>
    )
}

export const Input = ({ children, ...props }) => {
    return (
        <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 text-white hover:border-gray-200"
            {...props}
        ></input>
    )
}