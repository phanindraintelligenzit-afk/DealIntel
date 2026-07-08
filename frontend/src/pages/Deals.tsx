import { Target } from 'lucide-react'

export default function Deals() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Deal Intelligence</h1>
        <p className="text-gray-600 mt-1">AI-powered deal health scoring and win prediction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {['Pipeline Overview', 'By Stage', 'Win Rate', 'At Risk'].map((filter) => (
          <button
            key={filter}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-16 text-gray-400">
          <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">No deals tracked yet. Connect your CRM or upload calls to start scoring.</p>
        </div>
      </div>
    </div>
  )
}