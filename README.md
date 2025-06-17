# aerocontrol-mobile
Elaboración de interfaz gráfica y mapa de navegación cumpliendo con reglas de usabilidad y accesibilidad app móvil GA5-220501095-AA1-EV07 y EV08

# AeroControl ✈️

Sistema de gestión aeroportuaria desarrollado con **Ionic + Angular** para el control y administración de vuelos, aeropuertos, programas de vuelo y usuarios.

![AeroControl Banner](https://via.placeholder.com/800x200/2c3e50/ffffff?text=AeroControl+-+Sistema+de+Gesti%C3%B3n+Aeroportuaria)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Instalación](#-instalación)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Páginas del Sistema](#-páginas-del-sistema)
- [Navegación](#-navegación)
- [Componentes](#-componentes)
- [Estilos](#-estilos)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Desarrollo](#-desarrollo)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## 🚀 Características

### Gestión Completa
- ✈️ **Gestión de Vuelos** - Control de horarios, estados y operaciones
- 🏢 **Gestión de Aeropuertos** - Administración de infraestructura aeroportuaria
- 📅 **Programas de Vuelo** - Planificación y programación de rutas
- 👥 **Gestión de Usuarios** - Control de acceso y roles del sistema
- 📊 **Reportes y Logs** - Analytics y seguimiento del sistema

### Experiencia de Usuario
- 📱 **Responsive Design** - Optimizado para móvil, tablet y desktop
- 🎨 **UI Moderna** - Diseño clean con Material Design
- 🔄 **Pull-to-Refresh** - Actualización de datos intuitiva
- 🔍 **Búsqueda Avanzada** - Filtros inteligentes en todas las secciones
- ⚡ **Performance** - Carga rápida con lazy loading

### Funcionalidades Técnicas
- 🔐 **Autenticación** - Sistema de login seguro
- 🎯 **Navegación Intuitiva** - Bottom tabs con menú "Más"
- 📊 **Dashboard Interactivo** - Métricas y estadísticas en tiempo real
- 🗃️ **Gestión de Estados** - Control de estados de vuelos y aeropuertos
- 📱 **PWA Ready** - Progressive Web App capabilities

## 🛠 Tecnologías

### Frontend
- **Ionic 7** - Framework híbrido
- **Angular 17** - Framework de aplicación
- **TypeScript** - Lenguaje de programación
- **SCSS** - Preprocesador CSS
- **Capacitor** - Para deployment nativo

### Herramientas de Desarrollo
- **Angular CLI** - Herramientas de desarrollo
- **Ionic CLI** - Comandos de Ionic
- **ESLint** - Linting de código
- **Prettier** - Formateo de código

## 📦 Instalación

### Prerrequisitos
```bash
node >= 18.x
npm >= 9.x
```

### Instalación de dependencias globales
```bash
npm install -g @ionic/cli @angular/cli
```

### Clonación e instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/aerocontrol.git
cd aerocontrol

# Instalar dependencias
npm install

# Ejecutar en desarrollo
ionic serve
```

### Comandos disponibles
```bash
# Desarrollo
npm start                 # Servidor de desarrollo
ionic serve              # Servidor de desarrollo con livereload

# Build
npm run build            # Build de producción
ionic build --prod      # Build optimizado para producción

# Testing
npm test                 # Ejecutar tests unitarios
npm run e2e              # Tests end-to-end

# Linting
npm run lint             # Verificar código
npm run lint:fix         # Arreglar problemas automáticamente

# Mobile
ionic cap add ios        # Agregar plataforma iOS
ionic cap add android    # Agregar plataforma Android
ionic cap run ios        # Ejecutar en iOS
ionic cap run android    # Ejecutar en Android
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/          # Componentes reutilizables
│   │   └── bottom-tabs/     # Navegación inferior
│   ├── pages/              # Páginas de la aplicación
│   │   ├── login/          # Página de autenticación
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── flights/        # Gestión de vuelos
│   │   ├── airports/       # Gestión de aeropuertos
│   │   ├── programs/       # Programas de vuelo
│   │   ├── users/          # Gestión de usuarios
│   │   └── reports/        # Reportes y logs
│   ├── services/           # Servicios de la aplicación
│   ├── guards/             # Guards de rutas
│   ├── interfaces/         # Interfaces TypeScript
│   └── app.routes.ts       # Configuración de rutas
├── assets/                 # Recursos estáticos
├── theme/                  # Variables de tema
└── global.scss            # Estilos globales
```

## 📱 Páginas del Sistema

### 🔐 Login
- Autenticación de usuarios
- Validación de credenciales
- Redirección automática

### 🏠 Dashboard
- **Métricas en tiempo real**: Vuelos activos, usuarios conectados
- **Gráficos interactivos**: Estadísticas de operaciones
- **Alertas del sistema**: Notificaciones importantes
- **Accesos rápidos**: Links a funciones principales

### ✈️ Gestión de Vuelos
- **Lista completa**: Todos los vuelos programados
- **Búsqueda avanzada**: Por número, aerolínea, ruta
- **Estados visuales**: A tiempo, demorado, cancelado, etc.
- **Filtros inteligentes**: Por estado, origen, destino
- **Acciones**: Ver detalles, editar, cambiar estado

### 🏢 Gestión de Aeropuertos
- **Vista dual**: Grid y lista intercambiables
- **Información completa**: Código, nombre, ubicación
- **Métricas operacionales**: % operativo, vuelos diarios
- **Estados del aeropuerto**: Operativo, mantenimiento, cerrado
- **Gestión de facilidades**: Pistas, terminales

### 📅 Programas de Vuelo
- **Planificación de rutas**: Horarios y frecuencias
- **Días de operación**: Grid visual semanal
- **Tipos de programa**: Diario, semanal, estacional
- **Ruta visual**: Origen → Destino con duración
- **Estados**: Activo, suspendido, estacional

### 👥 Gestión de Usuarios
- **Perfiles completos**: Avatares generados automáticamente
- **Roles del sistema**: Admin, Operador, Visualizador
- **Estados de usuario**: Activo, inactivo, pendiente
- **Información de contacto**: Email, teléfono, departamento
- **Gestión de accesos**: Cambio de roles y estados

### 📊 Reportes y Logs
- **6 tipos de reportes**: Vuelos, usuarios, aeropuertos, financiero
- **Exportación**: PDF y Excel
- **Logs del sistema**: Registro de actividades
- **Filtros avanzados**: Por nivel, módulo, usuario
- **Programación**: Envío automático de reportes

## 🧭 Navegación

### Bottom Tabs
- **Inicio** - Dashboard principal
- **Vuelos** - Gestión de vuelos
- **Aeropuertos** - Gestión de aeropuertos  
- **Programas** - Programas de vuelo
- **Más** - Menú adicional con:
  - Gestión de Usuarios
  - Reportes y Logs
  - Configuración
  - Cerrar Sesión

### Rutas Disponibles
```typescript
/login          # Página de autenticación
/dashboard      # Dashboard principal
/flights        # Gestión de vuelos
/airports       # Gestión de aeropuertos
/programs       # Programas de vuelo
/users          # Gestión de usuarios
/reports        # Reportes y logs
```

## 🧩 Componentes

### BottomTabsComponent
**Ubicación**: `src/app/components/bottom-tabs/`

Componente reutilizable para la navegación inferior:

```html
<app-bottom-tabs [activeTab]="'dashboard'"></app-bottom-tabs>
```

**Props**:
- `activeTab`: string - Tab actualmente activo

**Características**:
- ✅ Navegación automática
- ✅ Estado activo visual
- ✅ Action Sheet para "Más"
- ✅ Responsive design

## 🎨 Estilos

### Sistema de Colores
```scss
// Colores principales
--primary: #2c3e50;      // Azul oscuro
--secondary: #27ae60;    // Verde
--tertiary: #3498db;     // Azul claro
--success: #27ae60;      // Verde éxito
--warning: #f39c12;      // Naranja
--danger: #e74c3c;       // Rojo
--medium: #95a5a6;       // Gris
```

### Responsive Breakpoints
```scss
// Mobile First
@media (max-width: 480px)   { /* Móvil */ }
@media (min-width: 768px)   { /* Tablet */ }
@media (min-width: 1024px)  { /* Desktop */ }
```

### Utilidades Globales
- **FAB positioning**: Botones flotantes sobre tabs
- **Scroll fixes**: Scroll habilitado en todas las páginas
- **Animaciones**: SlideInUp, hover effects, transitions
- **Loading states**: Skeleton screens y spinners

## 📷 Capturas de Pantalla

### Mobile View
| Login | Dashboard | Vuelos |
|-------|-----------|--------|
| ![Login](https://via.placeholder.com/250x400/2c3e50/ffffff?text=Login) | ![Dashboard](https://via.placeholder.com/250x400/27ae60/ffffff?text=Dashboard) | ![Vuelos](https://via.placeholder.com/250x400/3498db/ffffff?text=Vuelos) |

### Desktop View
![Desktop Dashboard](https://via.placeholder.com/800x400/f8f9fa/2c3e50?text=Desktop+Dashboard+View)

## 💻 Desarrollo

### Estructura de Datos
```typescript
// Ejemplo: Interface de Vuelo
interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  status: 'onTime' | 'delayed' | 'boarding' | 'departed' | 'cancelled';
  gate?: string;
  aircraft: string;
  seatsAvailable: number;
}
```

### Servicios (Próximos)
```bash
# Servicios planificados
src/app/services/
├── auth.service.ts         # Autenticación
├── flights.service.ts      # API de vuelos  
├── airports.service.ts     # API de aeropuertos
├── users.service.ts        # API de usuarios
└── reports.service.ts      # API de reportes
```

### Guards de Rutas
```typescript
// Guard de autenticación (próximo)
export const authGuard: CanActivateFn = () => {
  // Lógica de autenticación
};
```

## 🤝 Contribuir

### Proceso de Contribución
1. **Fork** el repositorio
2. **Crear** una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** los cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. **Push** a la rama (`git push origin feature/nueva-funcionalidad`)
5. **Abrir** un Pull Request

### Estándares de Código
- **Naming**: camelCase para variables, PascalCase para clases
- **Components**: Un componente por archivo
- **Services**: Inyección de dependencias
- **Interfaces**: Definir tipos para todos los datos
- **SCSS**: BEM methodology para clases CSS

### Comandos de Desarrollo
```bash
# Generar componente
ionic generate component components/nombre-componente --standalone

# Generar página  
ionic generate page pages/nombre-pagina --standalone

# Generar servicio
ionic generate service services/nombre-servicio

# Generar guard
ionic generate guard guards/nombre-guard
```

## 🏗 Roadmap

### Versión 2.0 (Planificada)
- [ ] **Backend Integration** - Conexión con APIs REST
- [ ] **Real-time Updates** - WebSockets para datos en vivo
- [ ] **Push Notifications** - Notificaciones de vuelos
- [ ] **Offline Mode** - Funcionalidad sin conexión
- [ ] **Advanced Charts** - Gráficos interactivos con Chart.js
- [ ] **User Preferences** - Configuración personalizable
- [ ] **Multi-language** - Soporte para múltiples idiomas
- [ ] **Dark Mode** - Tema oscuro
- [ ] **Advanced Security** - 2FA y roles granulares

### Versión 1.1 (Próxima)
- [ ] **Tests Unitarios** - Cobertura completa
- [ ] **E2E Testing** - Tests end-to-end
- [ ] **Performance Optimization** - Lazy loading mejorado
- [ ] **Error Handling** - Manejo de errores global
- [ ] **Logging** - Sistema de logs frontend

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 📞 Contacto

**Desarrollado con ❤️ para la gestión aeroportuaria moderna**

- **Proyecto**: AeroControl
- **Versión**: 1.0.0
- **Última actualización**: Febrero 2024

### Links Útiles
- [Ionic Documentation](https://ionicframework.com/docs)
- [Angular Documentation](https://angular.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

---

⭐ **¡No olvides dar una estrella si te ha sido útil!** ⭐
