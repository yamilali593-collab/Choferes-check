import { Home } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components'

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md animate-fade-in">
        <h1 className="text-8xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button variant="primary" className="gap-2">
            <Home size={20} />
            Volver al Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
