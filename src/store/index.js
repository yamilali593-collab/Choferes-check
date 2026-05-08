import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  userType: null, // 'admin', 'user', 'company'
  login: (user, type) => set({ user, isAuthenticated: true, userType: type }),
  logout: () => set({ user: null, isAuthenticated: false, userType: null }),
}))

export const useDriverStore = create((set, get) => ({
  drivers: [
    {
      id: 1,
      name: 'Carlos Mendoza',
      phone: '5551234567',
      curp: 'MEMC880715HDFNSL09',
      licensePlate: 'XYZ-1234',
      email: 'carlos@email.com',
      address: 'Puebla, Puebla',
      references: ['Ref1', 'Ref2'],
      riskLevel: 'safe',
      reports: [],
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Juan Rivera',
      phone: '5559876543',
      curp: 'RIVJ850320HDFNRL05',
      licensePlate: 'ABC-5678',
      email: 'juan@email.com',
      address: 'Mexico City, CDMX',
      references: ['Ref3', 'Ref4'],
      riskLevel: 'warning',
      reports: [{ type: 'accident', description: 'Minor accident reported', date: '2024-03-01' }],
      createdAt: '2024-02-20',
    },
    {
      id: 3,
      name: 'Rosa García',
      phone: '5552468135',
      curp: 'GARG900512HDFNRS03',
      licensePlate: 'DEF-9012',
      email: 'rosa@email.com',
      address: 'Guadalajara, Jalisco',
      references: ['Ref5', 'Ref6'],
      riskLevel: 'danger',
      reports: [
        { type: 'theft', description: 'Theft accusation', date: '2024-02-10' },
        { type: 'debt', description: 'Outstanding debt', date: '2024-01-05' }
      ],
      createdAt: '2024-01-10',
    },
  ],
  searchResults: [],
  selectedDriver: null,

  addDriver: (driver) =>
    set((state) => ({
      drivers: [...state.drivers, { ...driver, id: state.drivers.length + 1 }],
    })),

  searchDriver: (query) => {
    const state = get()
    const results = state.drivers.filter(
      (driver) =>
        driver.name.toLowerCase().includes(query.toLowerCase()) ||
        driver.curp.toLowerCase().includes(query.toLowerCase())
    )
    set({ searchResults: results })
  },

  selectDriver: (driver) => set({ selectedDriver: driver }),

  addReport: (driverId, report) =>
    set((state) => ({
      drivers: state.drivers.map((driver) =>
        driver.id === driverId
          ? { ...driver, reports: [...driver.reports, report] }
          : driver
      ),
    })),

  updateDriverRiskLevel: (driverId, riskLevel) =>
    set((state) => ({
      drivers: state.drivers.map((driver) =>
        driver.id === driverId ? { ...driver, riskLevel } : driver
      ),
    })),
}))

export const useAnalyticsStore = create((set) => ({
  stats: {
    totalDrivers: 3,
    driversVerified: 3,
    pendingVerifications: 0,
    reportsGenerated: 3,
    activeUsers: 12,
  },
  monthlyData: [
    { month: 'Ene', verified: 15, reports: 8 },
    { month: 'Feb', verified: 22, reports: 12 },
    { month: 'Mar', verified: 18, reports: 10 },
    { month: 'Abr', verified: 25, reports: 14 },
    { month: 'May', verified: 20, reports: 11 },
    { month: 'Jun', verified: 28, reports: 16 },
  ],
}))

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  darkMode: false,
  notifications: [],
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}))
