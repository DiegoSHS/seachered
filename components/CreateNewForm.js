import { useState } from "react"
import { AlertLabel, Button, Input, Select } from "./Input"
import { validateProduct } from "@/validations"
import { StoredContext } from "@/context"

export const opts = [
  { text: 'No aplica', value: null, title: 'n/a' },
  { text: 'Bebidas', value: 'drinks', title: 'drinks' },
  { text: 'Botanas', value: 'snacks', title: 'snacks' },
  { text: 'Alcohol', value: 'alcohol', title: 'alcohol' },
  { text: 'Cuidado personal', value: 'personal', title: 'personal' }
]

const defaultProduct = {
  name: '',
  price: 0,
  description: '',
  category: null
}

export default function CreateNewForm() {
  const [newProduct, setNewProduct] = useState(defaultProduct)
  const { memory: { products, validForm, handlers: { handleCreate } }, setStored } = StoredContext()
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const handleChange = ({ target }) => {
    setNewProduct((product) => ({ ...product, [target.name]: target.name == 'price' ? Number(target.value) : target.value }))
    setErrors(validateProduct(newProduct))
    setStored({ validForm: Object.entries(errors).length === 0 })
  }
  const handleSubmit = (e) => {
    setLoading((loading) => !loading)
    e.preventDefault()
    if (!validForm) {
      return
    }
    handleCreate()
    alert('Insertado con éxito')
    setNewProduct(defaultProduct)
    setLoading((loading) => !loading)
    setStored({ validForm: false })
    e.target.reset()
  }
  const handleCancel = (e) => {
    e.preventDefault()
    setNewProduct(defaultProduct)
    setStored({ activeForm: false })
  }
  return (
    <form onSubmit={handleSubmit} onChange={handleChange} className="text-foreground w-full flex flex-col gap-2 items-center justify-center mt-5">
      <Button onClick={handleCancel} className="bg-inherit rounded-md px-4 py-2 text-foreground mb-2">Cancelar</Button>
      <Input type="text" placeholder="Nombre" name='name' required disabled={loading} />
      {errors.name && <AlertLabel>{errors.name}</AlertLabel>}
      <Input type="number" placeholder="Precio" name='price' required disabled={loading} />
      {errors.price && <AlertLabel>{errors.price}</AlertLabel>}
      <Input type="text" placeholder="Descripción" name='description' required disabled={loading} />
      {errors.description && <AlertLabel>{errors.description}</AlertLabel>}
      <div className="flex gap-1 items-center justify-between">
        <div className="px-4">Categoria del producto</div>
        <Select name="category" options={opts} disabled={loading}></Select>
      </div>
      <Button type='submit' disabled={!validform || loading}>
        {loading ? <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>Guardando...
        </>
          : 'Crear'}
      </Button>
    </form>
  )
}
