import { BarChart3, TrendingUp, PieChart } from 'lucide-react'
import { Layout, Card, StatCard } from '../components'
import { useAnalyticsStore, useDriverStore } from '../store/index'

export const AnalyticsPage = () => {
  const { stats, monthlyData } = useAnalyticsStore()
  const { drivers } = useDriverStore()

  const reportsByType = {
    debt: drivers.reduce((acc, d) => acc + d.reports.filter(r => r.type === 'debt').length, 0),
    theft: drivers.reduce((acc, d) => acc + d.reports.filter(r => r.type === 'theft').length, 0),
    accident: drivers.reduce((acc, d) => acc + d.reports.filter(r => r.type === 'accident').length, 0),
    other: drivers.reduce((acc, d) => acc + d.reports.filter(r => ['abandonment', 'bad_behavior'].includes(r.type)).length, 0),
  }

  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Analytics
          </h1>
          <p className="text-gray-600">
            Estadísticas y análisis del sistema
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={BarChart3}
            label="Personal Verificado"
            value={stats.driversVerified}
            change={12}
          />
          <StatCard
            icon={TrendingUp}
            label="Verificaciones Este Mes"
            value={18}
            change={25}
          />
          <StatCard
            icon={PieChart}
            label="Tasa de Aprobación"
            value="94%"
            change={3}
          />
          <StatCard
            icon={AlertCircle}
            label="Reportes Activos"
            value={drivers.reduce((acc, d) => acc + d.reports.length, 0)}
            change={-5}
            trend="down"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Verification Trend */}
          <Card title="Tendencia de Verificaciones">
            <div className="h-64">
              <svg viewBox="0 0 500 200" className="w-full h-full">
                {/* Grid */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={`h-${i}`}
                    x1="50"
                    y1={50 + i * 30}
                    x2="480"
                    y2={50 + i * 30}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                  />
                ))}

                {/* Bars */}
                {monthlyData.map((data, i) => {
                  const maxValue = Math.max(...monthlyData.map(d => d.verified))
                  const height = (data.verified / maxValue) * 120
                  const x = 50 + i * 70
                  const y = 160 - height

                  return (
                    <g key={i}>
                      <rect
                        x={x + 5}
                        y={y}
                        width="30"
                        height={height}
                        fill="#0284c7"
                      />
                      <text
                        x={x + 20}
                        y="180"
                        textAnchor="middle"
                        fontSize="12"
                        fill="#6b7280"
                      >
                        {data.month}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </Card>

          {/* Reports by Type */}
          <Card title="Reportes por Tipo">
            <div className="space-y-4">
              {[
                { label: 'Deuda', value: reportsByType.debt, color: 'warning' },
                { label: 'Robo', value: reportsByType.theft, color: 'danger' },
                { label: 'Accidente', value: reportsByType.accident, color: 'primary' },
                { label: 'Otros', value: reportsByType.other, color: 'secondary' },
              ].map((item) => {
                const total = Object.values(reportsByType).reduce((a, b) => a + b, 0)
                const percent = total > 0 ? (item.value / total) * 100 : 0

                return (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">{item.label}</p>
                      <p className={`text-sm font-bold text-${item.color}-600`}>
                        {item.value}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.color === 'danger'
                            ? 'bg-danger-600'
                            : item.color === 'warning'
                              ? 'bg-warning-600'
                              : item.color === 'primary'
                                ? 'bg-primary-600'
                                : 'bg-secondary-600'
                        }`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        {/* Risk Distribution */}
        <Card title="Distribución de Riesgo">
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                level: 'safe',
                label: 'Seguros',
                count: drivers.filter(d => d.riskLevel === 'safe').length,
                color: 'success',
              },
              {
                level: 'warning',
                label: 'Advertencia',
                count: drivers.filter(d => d.riskLevel === 'warning').length,
                color: 'warning',
              },
              {
                level: 'danger',
                label: 'Peligrosos',
                count: drivers.filter(d => d.riskLevel === 'danger').length,
                color: 'danger',
              },
            ].map((item) => {
              const percent = (item.count / drivers.length) * 100

              return (
                <div key={item.level} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    {item.label}
                  </p>
                  <p className={`text-3xl font-bold text-${item.color}-600 mb-2`}>
                    {item.count}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.color === 'success'
                          ? 'bg-success-600'
                          : item.color === 'warning'
                            ? 'bg-warning-600'
                            : 'bg-danger-600'
                      }`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{percent.toFixed(1)}%</p>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </Layout>
  )
}

// Missing import
import { AlertCircle } from 'lucide-react'
