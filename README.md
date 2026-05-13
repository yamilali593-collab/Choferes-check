# ChoferCheck - Plataforma de Verificación de Personal

Plataforma nacional para verificación de personal

## 🚀 Características

- ✅ Búsqueda de personal por nombre o CURP
- ✅ Gestión completa de personal
- ✅ Sistema de reportes (deuda, robo, accidentes, etc.)
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Análisis y gráficos interactivos
- ✅ Clasificación de riesgo (Seguro, Advertencia, Peligroso)
- ✅ Interfaz responsiva y moderna
- ✅ Autenticación de usuarios

## 🛠️ Tecnologías

- **React 18** - Interfaz de usuario
- **Vite** - Bundler y servidor de desarrollo
- **Tailwind CSS** - Estilos
- **React Router** - Enrutamiento
- **Zustand** - Gestión de estado
- **Lucide React** - Iconos

## 📋 Requisitos

- Node.js 16+
- npm o yarn

## 🚀 Instalación y Ejecución

### 1. Clonar o descargar el proyecto
```bash
cd chofer-check-project
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en desarrollo
```bash
npm run dev
```

El servidor abrirá automáticamente en `http://localhost:5173`

### 4. Construir para producción
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
chofer-check-project/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   ├── Modal.jsx
│   │   ├── Loading.jsx
│   │   ├── DriverSearchForm.jsx
│   │   └── index.js
│   ├── pages/               # Páginas principales
│   │   ├── Dashboard.jsx
│   │   ├── SearchPage.jsx
│   │   ├── DriversPage.jsx
│   │   ├── ReportsPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── index.js
│   ├── services/            # Servicios API
│   │   ├── authService.js
│   │   └── driverService.js
│   ├── store/              # Zustand store (estado global)
│   │   └── index.js
│   ├── utils/              # Utilidades
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx             # Componente raíz
│   ├── index.jsx           # Punto de entrada
│   └── index.css           # Estilos globales
├── index.html              # HTML principal
├── vite.config.js          # Configuración de Vite
├── tailwind.config.js      # Configuración de Tailwind
├── postcss.config.js       # Configuración de PostCSS
├── package.json            # Dependencias
└── .gitignore
```

## 🔐 Acceso

### Credenciales de Prueba
- **Email**: cualquiera@ejemplo.com
- **Contraseña**: cualquier contraseña

(La aplicación está en modo demostración, acepta cualquier credencial)

## 💡 Funcionalidades Principales

### 🔍 Búsqueda de Personal
- Busca por nombre o CURP
- Visualiza información completa del personal
- Ve el historial de reportes
- Clasificación de riesgo visual

### 👥 Gestión de Personal
- Registra nuevo personal
- Edita información existente
- Elimina registros
- Vista de tabla con todos el personal

### 📊 Reportes
- Crea reportes sobre personal
- Tipos: Deuda, Robo, Abandono, Accidente, Mal Comportamiento
- Historial de reportes por personal
- Resumen estadístico

### 📈 Analytics
- Dashboard con estadísticas clave
- Gráficos de tendencias mensuales
- Distribución de riesgos
- Análisis de reportes por tipo

## 🎨 Diseño

- **Colores principales**: Azul (#0369a1) y Naranja (#ea580c)
- **Tipografía**: Sora (display) e Inter (body)
- **Tema**: Industrial moderno con enfoque en seguridad
- **Responsive**: Diseño adaptable a todos los dispositivos

## 📝 Notas

- Los datos se almacenan en la tienda Zustand (en memoria)
- Los datos se pierden al recargar la página
- Para integración con backend, implementa las llamadas API en los servicios

## 🔧 Customización

### Cambiar colores
Edita `tailwind.config.js` en la sección `colors`

### Cambiar tipografía
Edita `tailwind.config.js` en la sección `fontFamily`

### Agregar nuevas páginas
1. Crea el archivo en `src/pages/`
2. Exporta en `src/pages/index.js`
3. Agrega la ruta en `src/App.jsx`

## 📞 Soporte

Para preguntas o reportes, contacta al equipo de ChoferCheck.

---

**Made with ❤️ by ChoferCheck Team**
