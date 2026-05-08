import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { Button } from './Button'
import { useDriverStore } from '../store/index'

export const DriverSearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { searchDriver } = useDriverStore()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      searchDriver(query)
      onSearch?.(query)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre o CURP..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        <Button type="submit" isLoading={isLoading}>
          <SearchIcon size={18} />
          Buscar
        </Button>
      </div>
    </form>
  )
}
