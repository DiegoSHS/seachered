export const Button = ({ children, disabled, variant, ...props }) => {
    const classNames = {
        'outline': 'border border-white hover:opacity-80',
        'text': 'bg-inherit text-green-500 hover:text-green-200',
        'contained': 'text-white bg-green-700 hover:bg-green-600'
    }
    return (
        <button className={`${disabled && 'opacity-25'} ${classNames[variant || 'text']} rounded-md px-4 flex gap-2 py-2 text-foreground mb-2`} {...props}>
            {children}
        </button>
    )
}

export const Input = ({ children, disabled, ...props }) => {
    return (
        <input
            className={`rounded-md px-4 py-2 ${disabled ? 'bg-gray-300' : 'bg-inherit'} text-inherit border mt-6 hover:border-gray-200`}
            {...props}
        ></input>
    )
}

export const Select = ({ options, disabled, ...props }) => {
    return (
        <select className={`px-4 py-2 ${disabled ? 'bg-gray-300' : 'bg-inherit'} border text-inherit rounded-md`} {...props}>
            {options.map((e, i) => <option
                className="px-4 py-2 bg-background border text-inherit text-inherit rounded-md"
                key={i}
                value={e.value || ''}
                title={e.title || ''}
                {...e.props}
            >{e.text}
            </option >)}
        </select >
    )
}


export const AlertLabel = ({ children, ...props }) => {
    return (
        <label className="text-orange-500 flex items-center gap-1" {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>{children}
        </label>
    )
}