import { X } from 'lucide-react'

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl animate-slide-up ${sizes[size]} max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

export const Alert = ({ type = 'info', title, message, onClose }) => {
  const bgColors = {
    info: 'bg-blue-50 border border-blue-200',
    success: 'bg-success-50 border border-success-200',
    warning: 'bg-warning-50 border border-warning-200',
    danger: 'bg-danger-50 border border-danger-200',
  }

  const iconColors = {
    info: 'text-blue-600',
    success: 'text-success-600',
    warning: 'text-warning-600',
    danger: 'text-danger-600',
  }

  return (
    <div className={`rounded-lg p-4 ${bgColors[type]} flex items-start justify-between`}>
      <div className="flex-1">
        {title && <p className={`font-bold ${iconColors[type]}`}>{title}</p>}
        {message && <p className="text-sm text-gray-700 mt-1">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      )}
    </div>
  )
}
