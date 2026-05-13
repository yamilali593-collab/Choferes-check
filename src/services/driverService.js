export const driverService = {
  searchDriver: async (query) => {
    // Simulación de búsqueda en API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 1,
              name: 'Carlos Mendoza',
              curp: 'MEMC880715HDFNSL09',
              licensePlate: 'XYZ-1234',
              riskLevel: 'safe',
            },
          ],
        })
      }, 800)
    })
  },

  getDriverDetails: async (driverId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
data: null
        })
      }, 600)
    })
  },

  addReport: async (driverId, reportData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Reporte registrado correctamente',
        })
      }, 500)
    })
  },

  verifyDriver: async (driverData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Conductor verificado',
          driver: { id: Math.random(), ...driverData },
        })
      }, 1200)
    })
  },
}
