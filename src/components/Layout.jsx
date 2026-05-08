import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { useUIStore } from '../store/index'

export const Layout = ({ children }) => {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main
          className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}
        >
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
