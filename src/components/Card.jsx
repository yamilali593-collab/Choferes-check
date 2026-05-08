export const Card = ({ title, subtitle, children, actions, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {(title || subtitle || actions) && (
        <div className="flex justify-between items-start mb-4">
          <div>
            {title && <h3 className="text-lg font-bold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}

export const StatCard = ({ icon: Icon, label, value, change, trend = 'up' }) => {
  const isPositive = trend === 'up'

  return (
    <div className="card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">{label}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
          {change && (
            <p
              className={`text-sm mt-2 ${
                isPositive ? 'text-success-600' : 'text-danger-600'
              }`}
            >
              {isPositive ? '↑' : '↓'} {change}% este mes
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-gradient-main/10 flex items-center justify-center">
            <Icon size={24} className="text-primary-600" />
          </div>
        )}
      </div>
    </div>
  )
}
