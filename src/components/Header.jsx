import { Menu, LogOut, Bell, Settings } from 'lucide-react'
import { useAuthStore, useUIStore } from '../store/index'

export const Header = () => {
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-primary-600" />
          </button>
          <h1 className="font-display text-2xl font-bold">
            <span className="text-primary-600">Chofer</span>
            <span className="text-secondary-600">Check</span>
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
          </button>

          <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
            <Settings size={20} />
          </button>

          {user && (
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-main rounded-lg flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <button
                onClick={() => {
                  logout()
                  window.location.href = '/login'
                }}
                className="p-2 text-gray-600 hover:text-danger-600 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
