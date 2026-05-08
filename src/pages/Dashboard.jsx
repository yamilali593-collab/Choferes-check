import { Users, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react'
import { Layout, StatCard, Card } from '../components'
import { useAnalyticsStore, useDriverStore } from '../store/index'

export const Dashboard = () => {
  const { stats, monthlyData } = useAnalyticsStore()
  const { drivers } = useDriverStore()

  const riskBreakdown = {
    safe: drivers.filter(d => d.riskLevel === 'safe').length,
    warning: drivers.filter(d => d.riskLevel === 'warning').length,
    danger: drivers.filter(d => d.riskLevel === 'danger').length,
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bienvenido a Personal Check - Plataforma de Verificación de personal</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            label="Personal Registrado"
            value={stats.totalDrivers}
            change={12}
          />
          <StatCard
            icon={CheckCircle}
            label="Verificados"
            value={stats.driversVerified}
            change={8}
          />
          <StatCard
            icon={AlertCircle}
            label="Reportes Generados"
            value={stats.reportsGenerated}
            change={15}
          />
          <StatCard
            icon={TrendingUp}
            label="Usuarios Activos"
            value={stats.activeUsers}
            change={5}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resumen de Riesgos */}
          <Card title="Resumen de Riesgos" subtitle="Clasificación por nivel de riesgo">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-success-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Seguros</p>
                  <p className="text-2xl font-bold text-success-600">{riskBreakdown.safe}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-success-600" size={24} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-warning-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Advertencia</p>
                  <p className="text-2xl font-bold text-warning-600">{riskBreakdown.warning}</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="text-warning-600" size={24} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-danger-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-600">Peligroso</p>
                  <p className="text-2xl font-bold text-danger-600">{riskBreakdown.danger}</p>
                </div>
                <div className="w-12 h-12 bg-danger-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="text-danger-600" size={24} />
                </div>
              </div>
            </div>
          </Card>

          {/* Actividad Reciente */}
          <Card title="Actividad Reciente" className="lg:col-span-2">
            <div className="space-y-3">
              {[
                { action: 'Nuevo personal agregado', time: 'Hace 2 horas', type: 'info' },
                { action: 'Reporte generado', time: 'Hace 4 horas', type: 'warning' },
                { action: 'Verificación completada', time: 'Hace 1 día', type: 'success' },
                { action: 'Nuevo usuario registrado', time: 'Hace 2 días', type: 'info' },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 border-l-4 border-primary-600 bg-gray-50 rounded"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === 'success'
                        ? 'bg-success-600'
                        : activity.type === 'warning'
                          ? 'bg-warning-600'
                          : 'bg-primary-600'
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Gráfico de Tendencias */}
        <Card title="Tendencias Mensuales">
          <div className="grid grid-cols-6 gap-2 h-48">
            {monthlyData.map((data, i) => {
              const maxValue = Math.max(...monthlyData.map(d => d.verified + d.reports))
              const totalHeight = data.verified + data.reports
              const heightPercent = (totalHeight / maxValue) * 100

              return (
                <div key={i} className="flex flex-col items-center justify-end gap-2">
                  <div className="w-full bg-gray-100 rounded-t flex flex-col overflow-hidden h-40">
                    <div
                      className="bg-gradient-main"
                      style={{ height: `${(data.verified / maxValue) * 100}%` }}
                    ></div>
                    <div
                      className="bg-gradient-secondary"
                      style={{ height: `${(data.reports / maxValue) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs font-medium text-gray-600">{data.month}</p>
                </div>
              )
            })}
          </div>
          <div className="flex gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-main rounded"></div>
              <span className="text-sm text-gray-600">Verificados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-secondary rounded"></div>
              <span className="text-sm text-gray-600">Reportes</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
