import { useEffect, useState } from 'react'
import { BarChart3, Phone, Target, TrendingUp, AlertTriangle } from 'lucide-react'

interface HealthData {
  total_calls_analyzed: number
  active_deals: number
  avg_health_score: number
  calls_this_week: number
}

export default function Dashboard() {
  const [data, setData] = useState<HealthData | null>(null)

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(setData)
      .catch(() => {})
  }, [])

  const cards = [
    { title: 'Calls Analyzed', value: data?.total_calls_analyzed ?? 0, icon: Phone, color: 'blue' },
    { title: 'Active Deals', value: data?.active_deals ?? 0, icon: Target, color: 'green' },
    { title: 'Avg Health Score', value: data?.avg_health_score ?? 0, icon: TrendingUp, color: 'purple' },
    { title: 'Calls This Week', value: data?.calls_this_week ?? 0, icon: BarChart3, color: 'orange' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Revenue Intelligence Dashboard</h1>
        <p className="text-gray-600 mt-1">Real-time deal health and call analytics across your pipeline</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">{card.title}</span>
              <card.icon className={`w-5 h-5 text-${card.color}-500`} />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {typeof card.value === 'number' && card.value % 1 !== 0
                ? (card.value * 100).toFixed(0) + '%'
                : card.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="text-center py-12 text-gray-400">
            <Phone className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Upload a call recording to see activity here</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Deals at Risk</h2>
          <div className="text-center py-12 text-gray-400">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No deals at risk right now</p>
          </div>
        </div>
      </div>
    </div>
  )
}