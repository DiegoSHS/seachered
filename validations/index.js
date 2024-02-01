export const validateProduct = (product) => {
    const errors = {}
    if (!(product.name.length >= 3)) errors.name = 'El nombre es muy corto'
    if (!(product.description.length >= 5)) errors.description = 'La descripción es muy corta'
    if (product.price === 0) errors.price = 'El precio no puede ser 0'
    return errors
}

export const validateProductTypes = (product) => {
    const valid = (
        typeof product.name === 'string' &&
        typeof product.description === 'string' &&
        typeof product.price === 'number'
    )
    return valid ? product : valid
}