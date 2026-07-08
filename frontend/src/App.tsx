import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Calls from './pages/Calls'
import Deals from './pages/Deals'
import Coaching from './pages/Coaching'
import { BarChart3, Phone, Target, GraduationCap, Settings } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">DealIntel</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Open Source</span>
            </Link>
            <div className="flex items-center gap-6">
              <NavLink to="/" icon={<BarChart3 className="w-4 h-4" />} label="Dashboard" />
              <NavLink to="/calls" icon={<Phone className="w-4 h-4" />} label="Calls" />
              <NavLink to="/deals" icon={<Target className="w-4 h-4" />} label="Deals" />
              <NavLink to="/coaching" icon={<GraduationCap className="w-4 h-4" />} label="Coaching" />
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/calls" element={<Calls />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/coaching" element={<Coaching />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
    >
      {icon}
      {label}
    </Link>
  )
}

export default App