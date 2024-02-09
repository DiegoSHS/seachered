/**
 * Checks the validity of a product
 * @param {Object} product Product to validate
 * @returns {Object} Object with the errors
 */
export const validateProduct = (product) => {
    const errors = {}
    if (!(product.name.length >= 3)) errors.name = 'El nombre es muy corto'
    if (!(product.description.length >= 5)) errors.description = 'La descripción es muy corta'
    if (product.price == 0) errors.price = 'El precio no puede ser 0'
    return errors
}
/**
 * Checks the types of the object properties
 * @param {Object} product Product to validate
 * @returns {Object} Object with the errors
 */
export const validateProductTypes = (product) => {
    const errors = {}
    const noEmpty = Object.values(product).every(e => e !== '')
    if (!typeof product.name === 'string') errors.name = 'Tipo de dato invalido'
    if (!typeof product.description === 'string') errors.description = 'Tipo de dato invalido'
    if (!typeof product.price === 'number') errors.price = 'Tipo de dato invalido'
    const valid = (
        typeof product.name === 'string' &&
        typeof product.description === 'string' &&
        typeof product.price === 'number' &&
        noEmpty
    )
    const error = valid ? false : {
        errors,
        code: 400,
        message: 'Algunos campos no tienen el tipo de dato correcto'
    }
    return { error }
}