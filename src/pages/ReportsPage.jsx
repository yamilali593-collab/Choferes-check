import { useState } from 'react'
import { Plus, FileText, AlertTriangle } from 'lucide-react'
import { Layout, Card, Button, Modal } from '../components'
import { useDriverStore } from '../store/index'

const REPORT_TYPES = [
  { value: 'debt', label: 'Deuda' },
  { value: 'theft', label: 'Robo' },
  { value: 'abandonment', label: 'Abandono de servicio' },
  { value: 'accident', label: 'Accidente' },
  { value: 'bad_behavior', label: 'Mal comportamiento' },
]

export const ReportsPage = () => {
  const { drivers, addReport } = useDriverStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    driverId: '',
    type: 'debt',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.driverId && formData.description) {
      addReport(parseInt(formData.driverId), {
        type: formData.type,
        description: formData.description,
        date: new Date().toISOString().split('T')[0],
      })
      setFormData({
        driverId: '',
        type: 'debt',
        description: '',
      })
      setIsModalOpen(false)
    }
  }

  const allReports = []
  drivers.forEach((driver) => {
    driver.reports.forEach((report) => {
      allReports.push({
        ...report,
        driverId: driver.id,
        driverName: driver.name,
      })
    })
  })

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Reportes
            </h1>
            <p className="text-gray-600">
              Total de reportes: {allReports.length}
            </p>
          </div>
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} />
            Nuevo Reporte
          </Button>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {allReports.length > 0 ? (
            allReports.map((report, i) => (
              <Card key={i}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle
                        size={20}
                        className={
                          report.type === 'debt'
                            ? 'text-warning-600'
                            : report.type === 'theft'
                              ? 'text-danger-600'
                              : 'text-primary-600'
                        }
                      />
                      <h3 className="text-lg font-bold text-gray-800">
                        {report.driverName}
                      </h3>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                        {REPORT_TYPES.find(t => t.value === report.type)?.label}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{report.description}</p>
                    <p className="text-sm text-gray-500">
                      Reportado el {report.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        report.type === 'debt'
                          ? 'bg-warning-50 text-warning-600'
                          : report.type === 'theft'
                            ? 'bg-danger-50 text-danger-600'
                            : 'bg-primary-50 text-primary-600'
                      }`}
                    >
                      {report.type}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <div className="text-center py-12">
                <FileText size={48} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No hay reportes registrados</p>
              </div>
            </Card>
          )}
        </div>

        {/* Report Types Summary */}
        <Card title="Resumen por Tipo de Reporte">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {REPORT_TYPES.map((type) => {
              const count = allReports.filter(r => r.type === type.value).length
              return (
                <div key={type.value} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{type.label}</p>
                  <p className="text-2xl font-bold text-primary-600 mt-2">
                    {count}
                  </p>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Add Report Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Crear Nuevo Reporte"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Personal *
              </label>
              <select
                value={formData.driverId}
                onChange={(e) =>
                  setFormData({ ...formData, driverId: e.target.value })
                }
                className="input-field"
                required
              >
                <option value="">Selecciona un personal</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name} - {driver.curp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Reporte *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="input-field"
              >
                {REPORT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input-field resize-none"
                rows="4"
                required
              ></textarea>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="secondary" type="submit" className="flex-1">
                Crear Reporte
              </Button>
              <Button
                variant="outline"
                type="button"
                className="flex-1"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  )
}
