import { useState } from "react"
import { AlertLabel, Button, Input, Select } from "./Input"
import { validateProduct } from "@/validations"

export const opts = [
  { text: 'No aplica', value: null, title: 'n/a' },
  { text: 'Bebidas', value: 'drinks', title: 'drinks' },
  { text: 'Botanas', value: 'snacks', title: 'snacks' },
  { text: 'Alcohol', value: 'alcohol', title: 'alcohol' },
  { text: 'Cuidado personal', value: 'personal', title: 'personal' }
]

export default function CreateNewForm({ actionMethod, activeState }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: '',
    category: null
  })
  const [errors, setErrors] = useState({})
  const [validform, setValidform] = useState(false)
  const handleChange = ({ target }) => {
    setNewProduct((product) => ({ ...product, [target.name]: target.name == 'price' ? Number(target.value) : target.value }))
    setErrors(validateProduct(newProduct))
    setValidform((validForm) => Object.entries(errors).length === 0)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validform) {
      return
    }
    actionMethod(newProduct)
    setNewProduct({
      name: '',
      price: 0,
      description: '',
      category: null
    })
    e.target.reset()
  }
  const handleCancel = (e) => {
    e.preventDefault()
    setNewProduct({
      name: '',
      price: 0,
      description: '',
      category: null
    })
    activeState(false)
  }
  return (
    <form onSubmit={handleSubmit} onChange={handleChange} className="text-foreground w-full flex flex-col gap-2 items-center justify-center mt-5">
      <Button onClick={handleCancel} className="bg-inherit rounded-md px-4 py-2 text-foreground mb-2">Cancelar</Button>
      <Input type="text" placeholder="Nombre" name='name' required />
      {errors.name && <AlertLabel>{errors.name}</AlertLabel>}
      <Input type="number" placeholder="Precio" name='price' required />
      {errors.price && <AlertLabel>{errors.price}</AlertLabel>}
      <Input type="text" placeholder="Descripción" name='description' required />
      {errors.description && <AlertLabel>{errors.description}</AlertLabel>}
      <div className="flex gap-1 items-center justify-between">
        <div className="px-4">Categoria del producto</div>
        <Select name="category" options={opts}></Select>
      </div>
      <Button type='submit' disabled={!validform}>Crear</Button>
    </form>
  )
}
