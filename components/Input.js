export const Button = ({ children, ...props }) => {
    return (
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground text-white mb-2 hover:bg-green-600" {...props}>
            {children}
        </button>
    )
}

export const Input = ({ children, ...props }) => {
    return (
        <input
            className="rounded-md px-4 py-2 bg-inherit text-inherit border mb-6 text-white hover:border-gray-200"
            {...props}
        ></input>
    )
}

export const Select = ({ options, ...props }) => {
    return (
        <select className="px-4 py-2 bg-foreground border text-white rounded-md" {...props}>
            {options.map((e, i) => <option
                className="px-4 py-2 bg-foreground border text-inherit text-white rounded-md"
                key={i}
                value={e.value || ''}
                title={e.title || ''}
                {...e.props}
            >{e.text}
            </option >)}
        </select >
    )
}
