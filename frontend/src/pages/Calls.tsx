import { Upload, List } from 'lucide-react'

export default function Calls() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Call Analysis</h1>
        <p className="text-gray-600 mt-1">Upload, transcribe, and analyze sales calls</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Call</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-10 h-10 mx-auto mb-3 text-gray-400" />
              <p className="text-sm text-gray-500 mb-2">Drop audio file here</p>
              <p className="text-xs text-gray-400">MP3, WAV, or M4A up to 500MB</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Browse Files
              </button>
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-sm font-medium text-gray-700">Integration Sources</h3>
              <button className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                Connect Zoom
              </button>
              <button className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                Connect Microsoft Teams
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Recent Calls</h2>
              <span className="text-xs text-gray-400">Auto-analyzed by 7 AI agents</span>
            </div>
            <div className="text-center py-16 text-gray-400">
              <List className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">No calls analyzed yet. Upload your first recording.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}