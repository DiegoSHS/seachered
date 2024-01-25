import { useState } from "react"
import { Button, Input } from "./Input"
export default function CreateNewForm({ actionMethod, activeState }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    description: ''
  })
  const handleChange = ({ target }) => {
    setNewProduct((product) => ({ ...product, [target.name]: target.value }))
    console.log(newProduct)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    actionMethod(newProduct)
    activeState(false)
  }
  const handleCancel = (e) => {
    e.preventDefault()
    setNewProduct({
      name: '',
      price: 0,
      description: ''
    })
    activeState(false)
  }
  return (
    <form onSubmit={handleSubmit} onChange={handleChange} className="text-foreground w-full flex flex-col gap-2 items-center justify-center mt-5">
      <Button onClick={handleCancel} className="bg-inherit rounded-md px-4 py-2 text-foreground mb-2">Cancelar</Button>
      <Input type="text" placeholder="Nombre" name='name' required />
      <Input type="number" placeholder="Precio" name='price' required />
      <Input type="text" placeholder="Descripción" name='description' required />
      <Button type='submit'>Crear</Button>
    </form>
  )
}
