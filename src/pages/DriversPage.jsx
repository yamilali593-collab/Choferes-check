import { useState } from 'react'
import { Plus, Edit2, Trash2, AlertCircle, CheckCircle } from 'lucide-react'
import { Layout, Card, Button, Modal, Alert } from '../components'
import { useDriverStore } from '../store/index'

export const DriversPage = () => {
  const { drivers, addDriver, updateDriverRiskLevel } = useDriverStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    curp: '',
    email: '',
    address: '',
    references: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addDriver({
      ...formData,
      references: formData.references.split(',').map(r => r.trim()),
      riskLevel: 'safe',
      reports: [],
      createdAt: new Date().toISOString().split('T')[0],
    })
    setFormData({
      name: '',
      phone: '',
      curp: '',
      email: '',
      address: '',
      references: '',
    })
    setIsModalOpen(false)
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'safe':
        return 'bg-success-50 text-success-600 border-success-200'
      case 'warning':
        return 'bg-warning-50 text-warning-600 border-warning-200'
      case 'danger':
        return 'bg-danger-50 text-danger-600 border-danger-200'
      default:
        return 'bg-gray-50'
    }
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Gestionar Personal
            </h1>
            <p className="text-gray-600">
              Total de personas registradas: {drivers.length}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} />
            Nuevo Personal
          </Button>
        </div>

        {/* Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    CURP
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Teléfono
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Reportes
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => (
                  <tr
                    key={driver.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800">{driver.name}</p>
                      <p className="text-sm text-gray-500">{driver.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 font-mono">{driver.curp}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{driver.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-primary-600 font-mono">
                        {driver.licensePlate}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(
                          driver.riskLevel
                        )}`}
                      >
                        {driver.riskLevel === 'safe'
                          ? 'Seguro'
                          : driver.riskLevel === 'warning'
                            ? 'Advertencia'
                            : 'Peligroso'}
                      </div>
                      </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600">
                        {driver.reports.length}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-primary-600 hover:bg-primary-50 rounded transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button className="p-2 text-danger-600 hover:bg-danger-50 rounded transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Risk Summary */}
        <div className="grid grid-cols-3 gap-6">
        </div>

        {/* Add Driver Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Registrar Nuevo Personal"
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CURP *
                </label>
                <input
                  type="text"
                  value={formData.curp}
                  onChange={(e) =>
                    setFormData({ ...formData, curp: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="input-field"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Referencias (separadas por comas)
              </label>
              <input
                type="text"
                value={formData.references}
                onChange={(e) =>
                  setFormData({ ...formData, references: e.target.value })
                }
                className="input-field"
                placeholder="Ref1, Ref2"
              />
            </div>
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="primary" type="submit" className="flex-1">
                Registrar Personal
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
