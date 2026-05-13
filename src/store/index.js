import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  userType: null, // 'admin', 'user', 'company'
  login: (user, type) => set({ user, isAuthenticated: true, userType: type }),
  logout: () => set({ user: null, isAuthenticated: false, userType: null }),
}))

export const useDriverStore = create((set, get) => ({
drivers: [],
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
