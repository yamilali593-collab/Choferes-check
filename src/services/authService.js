export const authService = {
  login: async (email, password) => {
    // Simulación de API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
          resolve({
            success: true,
            user: {
              id: 1,
              email,
              name: 'Usuario Prueba',
              company: 'ChoferCheck',
            },
          })
        } else {
          resolve({
            success: false,
            message: 'Credenciales inválidas',
          })
        }
      }, 1000)
    })
  },

  logout: async () => {
    return Promise.resolve({ success: true })
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Registro exitoso',
          user: { id: 2, ...userData },
        })
      }, 1000)
    })
  },
}
