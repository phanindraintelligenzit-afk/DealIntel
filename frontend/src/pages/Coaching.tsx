import { GraduationCap } from 'lucide-react'

export default function Coaching() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Sales Coaching</h1>
        <p className="text-gray-600 mt-1">AI-driven coaching recommendations from call analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Active Listening</h3>
          <p className="text-sm text-gray-500 mb-3">No data yet. Analyze calls to get listening ratio insights.</p>
          <span className="text-xs text-gray-400">Priority: --</span>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Objection Handling</h3>
          <p className="text-sm text-gray-500 mb-3">No data yet. Analyze calls to detect objection patterns.</p>
          <span className="text-xs text-gray-400">Priority: --</span>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-2">Call Closing</h3>
          <p className="text-sm text-gray-500 mb-3">No data yet. Analyze calls to review next-step patterns.</p>
          <span className="text-xs text-gray-400">Priority: --</span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="text-center py-12 text-gray-400">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Upload and analyze at least 3 calls to generate personalized coaching insights</p>
        </div>
      </div>
    </div>
  )
}