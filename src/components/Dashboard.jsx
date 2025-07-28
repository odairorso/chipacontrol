import { useEffect, useState } from 'react'
import { supabase } from '@services/supabaseClient'

export default function Dashboard() {
  const [metrics, setMetrics] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
  })

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Faturamento Bruto
      const { data: sales } = await supabase
        .from('sales')
        .select('total_amount');

      const revenue = sales?.reduce((acc, s) => acc + s.total_amount, 0) || 0;

      // Despesas Fixas + Variáveis
      const { data: fixed } = await supabase.from('fixed_expenses').select('amount');
      const { data: variable } = await supabase.from('variable_expenses').select('amount');

      const expenses = 
        (fixed?.reduce((acc, f) => acc + f.amount, 0) || 0) +
        (variable?.reduce((acc, v) => acc + v.amount, 0) || 0)

      setMetrics({
        revenue: revenue.toFixed(2),
        expenses: expenses.toFixed(2),
        profit: (revenue - expenses).toFixed(2),
      })
    }

    fetchMetrics()
  }, [])

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Dashboard Financeiro</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded text-center">
          <h3 className="text-sm text-gray-500">Faturamento</h3>
          <p className="text-2xl font-bold text-blue-600">R$ {metrics.revenue}</p>
        </div>
        <div className="p-4 border rounded text-center">
          <h3 className="text-sm text-gray-500">Despesas</h3>
          <p className="text-2xl font-bold text-red-600">R$ {metrics.expenses}</p>
        </div>
        <div className="p-4 border rounded text-center">
          <h3 className="text-sm text-gray-500">Lucro Líquido</h3>
          <p className="text-2xl font-bold text-green-600">R$ {metrics.profit}</p>
        </div>
      </div>
    </div>
  )
}