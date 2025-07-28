import { useState } from 'react'
import { supabase } from '@services/supabaseClient'

export default function IngredientForm() {
  const [name, setName] = useState('')
  const [unit, setUnit] = useState('g')
  const [packageQuantity, setPackageQuantity] = useState('')
  const [packagePrice, setPackagePrice] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const costPerUnit = packagePrice / packageQuantity

    const { error } = await supabase
      .from('ingredients')
      .insert({
        name,
        unit,
        package_quantity: parseFloat(packageQuantity),
        package_price: parseFloat(packagePrice),
        user_id: supabase.auth.user().id
      })

    if (error) {
      alert('Erro: ' + error.message)
    } else {
      alert('Ingrediente cadastrado!')
      setName('')
      setPackageQuantity('')
      setPackagePrice('')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">Cadastrar Ingrediente</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome do ingrediente"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="g">Gramas (g)</option>
          <option value="kg">Quilogramas (kg)</option>
          <option value="ml">Mililitros (ml)</option>
          <option value="l">Litro (l)</option>
          <option value="unidade">Unidade</option>
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Quantidade por embalagem (ex: 1000)"
          value={packageQuantity}
          onChange={(e) => setPackageQuantity(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço da embalagem (R$)"
          value={packagePrice}
          onChange={(e) => setPackagePrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Cadastrar Ingrediente
        </button>
      </form>
    </div>
  )
}