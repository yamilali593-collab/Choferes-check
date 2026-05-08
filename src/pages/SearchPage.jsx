import { useState } from 'react'
import { AlertCircle, CheckCircle, MapPin, Phone, Mail } from 'lucide-react'
import {
  Layout,
  Card,
  Button,
  Modal,
  DriverSearchForm,
  LoadingSpinner,
} from '../components'
import { useDriverStore } from '../store/index'

export const SearchPage = () => {
  const { searchResults, drivers } = useDriverStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 600)
  }

  const openDriverDetails = (driver) => {
    setSelectedDriver(driver)
    setIsModalOpen(true)
  }

  const displayedDrivers = searchResults.length > 0 ? searchResults : drivers

  const getRiskColor = (level) => {
    switch (level) {
      case 'safe':
        return 'bg-success-50 border-success-200 text-success-600'
      case 'warning':
        return 'bg-warning-50 border-warning-200 text-warning-600'
      case 'danger':
        return 'bg-danger-50 border-danger-200 text-danger-600'
      default:
        return 'bg-gray-50'
    }
  }

  const getRiskLabel = (level) => {
    switch (level) {
      case 'safe':
        return 'Seguro'
      case 'warning':
        return 'Advertencia'
      case 'danger':
        return 'Peligroso'
      default:
        return 'Desconocido'
    }
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Buscar Personal
          </h1>
          <p className="text-gray-600">
            Busca por nombre o CURP para verificar la información del conductor
          </p>
        </div>

        {/* Search Form */}
        <Card>
          <DriverSearchForm onSearch={handleSearch} />
        </Card>

        {/* Results */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {searchResults.length > 0 ? 'Resultados de búsqueda' : 'Todos los conductores'}
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" />
            </div>
          ) : displayedDrivers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedDrivers.map((driver) => (
                <Card
                  key={driver.id}
                  className="cursor-pointer hover:shadow-xl transition-shadow"
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {driver.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{driver.curp}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full border text-xs font-semibold ${getRiskColor(
                          driver.riskLevel
                        )}`}
                      >
                        {getRiskLabel(driver.riskLevel)}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200"></div>

                    {/* Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Phone size={16} className="text-primary-600" />
                        <span className="text-gray-700">{driver.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Mail size={16} className="text-primary-600" />
                        <span className="text-gray-700 truncate">{driver.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin size={16} className="text-primary-600" />
                        <span className="text-gray-700">{driver.address}</span>
                      </div>
                    </div>

                    {/* Reports Count */}
                    {driver.reports.length > 0 && (
                      <div className="bg-danger-50 border border-danger-200 p-3 rounded-lg flex items-center gap-2">
                        <AlertCircle size={18} className="text-danger-600" />
                        <span className="text-sm font-medium text-danger-600">
                          {driver.reports.length} reporte{driver.reports.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    )}

                    {driver.riskLevel === 'safe' && (
                      <div className="bg-success-50 border border-success-200 p-3 rounded-lg flex items-center gap-2">
                        <CheckCircle size={18} className="text-success-600" />
                        <span className="text-sm font-medium text-success-600">
                          Sin reportes negativos
                        </span>
                      </div>
                    )}

                    {/* Action Button */}
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => openDriverDetails(driver)}
                    >
                      Ver Detalles
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <div className="text-center py-12">
                <AlertCircle size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No se encontraron personas</p>
              </div>
            </Card>
          )}
        </div>

        {/* Driver Details Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Detalles del Conductor"
          size="lg"
        >
          {selectedDriver && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Información General
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Nombre</p>
                    <p className="text-base font-semibold text-gray-800">
                      {selectedDriver.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">CURP</p>
                    <p className="text-base font-semibold text-gray-800">
                      {selectedDriver.curp}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="text-base font-semibold text-gray-800">
                      {selectedDriver.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base font-semibold text-gray-800 truncate">
                      {selectedDriver.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="pt-4 border-t">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Información del Vehículo
                </h3>
                <div>
                  <p className="text-sm text-gray-500">Placa</p>
                  <p className="text-2xl font-bold text-primary-600 font-mono">
                    {selectedDriver.licensePlate}
                  </p>
                </div>
              </div>

              {/* Risk Status */}
              <div className="pt-4 border-t">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Estado de Riesgo
                </h3>
                <div
                  className={`px-4 py-3 rounded-lg border ${getRiskColor(
                    selectedDriver.riskLevel
                  )}`}
                >
                  <p className="font-bold">{getRiskLabel(selectedDriver.riskLevel)}</p>
                </div>
              </div>

              {/* Reports */}
              {selectedDriver.reports.length > 0 && (
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    Reportes ({selectedDriver.reports.length})
                  </h3>
                  <div className="space-y-3">
                    {selectedDriver.reports.map((report, i) => (
                      <div
                        key={i}
                        className="bg-danger-50 border border-danger-200 p-4 rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-semibold text-gray-800 capitalize">
                              {report.type}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {report.description}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 whitespace-nowrap ml-4">
                            {report.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  )
}
