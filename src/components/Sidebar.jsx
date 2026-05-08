import { Home, Search, BarChart3, Users, FileText, Settings, HelpCircle } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useUIStore } from '../store/index'

const MENU_ITEMS = [
  { icon: Home, label: 'Dashboard', href: '/' },
  { icon: Search, label: 'Buscar Conductor', href: '/search' },
  { icon: Users, label: 'Gestionar Conductores', href: '/drivers' },
  { icon: FileText, label: 'Reportes', href: '/reports' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Configuración', href: '/settings' },
  { icon: HelpCircle, label: 'Ayuda', href: '/help' },
]

export const Sidebar = () => {
  const { sidebarOpen } = useUIStore()
  const location = useLocation()

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-64px)] bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <nav className="flex flex-col gap-1 p-4 overflow-y-auto h-full">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-main text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={item.label}
            >
              <Icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
