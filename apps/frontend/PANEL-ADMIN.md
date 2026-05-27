# 🔐 Panel de Administración - PASSAJERO1900

## 🚀 Acceso al Panel

El panel de administración está en una **ruta secreta** (sin enlace en el navbar público):

```
http://localhost:8854/admin-passajero1900
```

### 👤 Credenciales de Acceso (Modo Mock)

```
Email: admin@passajero1900.com
Contraseña: admin123
```

> ⚠️ **Importante:** Estas credenciales son solo para desarrollo en modo mock. Cuando el backend esté activo, usará las credenciales reales de la base de datos.

---

## 📊 Funcionalidades del Panel

### 1. **Dashboard** (`/admin-passajero1900/dashboard`)
- ✅ Estadísticas generales del hostel
- ✅ Reservas totales y activas
- ✅ Ingresos totales
- ✅ Tasa de ocupación
- ✅ Check-ins pendientes
- ✅ Habitaciones disponibles
- ✅ Actividad reciente
- ✅ Accesos rápidos a otras secciones

### 2. **Gestión de Reservas** (`/admin-passajero1900/reservas`)
- ✅ Listado completo de todas las reservas
- ✅ Búsqueda por código, nombre o email
- ✅ Filtros por estado:
  - Confirmadas
  - Pago Pendiente
  - Canceladas
  - Completadas
- ✅ Ver detalles completos de cada reserva
- ✅ Información del huésped
- ✅ Detalles de la estadía
- ✅ Información de pagos
- ✅ Botón para cancelar reservas

### 3. **Gestión de Habitaciones** (`/admin-passajero1900/habitaciones`)
- ✅ Listado de todas las habitaciones
- ✅ Ver detalles: descripción, precio, amenidades
- ✅ Activar/desactivar habitaciones completas
- ✅ Para habitaciones compartidas:
  - Ver todas las camas
  - Activar/desactivar camas individuales
- ✅ Indicadores visuales de estado
- ✅ Toggle switches para cambios rápidos

---

## 🎨 Características del Diseño

### Layout Administrativo
- ✅ **Sidebar fijo** en desktop con navegación
- ✅ **Sidebar deslizable** en mobile
- ✅ Logo y nombre del hostel
- ✅ Información del admin logueado
- ✅ Botón de cerrar sesión
- ✅ Link para volver al sitio público
- ✅ Indicador de página activa

### Componentes
- ✅ **ProtectedRoute:** Protege rutas que requieren autenticación
- ✅ **AdminLayout:** Layout específico para el panel
- ✅ **Cards de estadísticas** con iconos y colores distintivos
- ✅ **Tablas responsivas** con hover effects
- ✅ **Modales** para detalles de reservas
- ✅ **Badges de estado** con colores semánticos
- ✅ **Toggle switches** para activar/desactivar

---

## 🔄 Modo Mock vs Backend Real

### Modo Mock (Actual)
Cuando el backend **NO** está disponible:

#### Autenticación:
- ✅ Login con credenciales hardcodeadas
- ✅ JWT token simulado
- ✅ Datos del admin en localStorage
- ✅ Verificación de sesión al recargar

#### Dashboard:
- ✅ Estadísticas simuladas con setTimeout
- ✅ Actividad reciente de ejemplo
- ✅ Tarjetas con links a otras secciones

#### Reservas:
- ✅ Lee reservas del localStorage (creadas en el flujo público)
- ✅ Búsqueda y filtros funcionan con datos locales
- ✅ Ver detalles completos
- ✅ Botón de cancelar (preparado para backend)

#### Habitaciones:
- ✅ Habitaciones mock hardcodeadas
- ✅ Toggle de habitaciones actualiza estado local
- ✅ Toggle de camas actualiza estado local
- ✅ Cambios NO persisten entre recargas

### Backend Real (Cuando esté disponible)
Cuando el backend **SÍ** está activo:

#### Autenticación:
- 🔄 Login con endpoint `/admin/auth/login`
- 🔄 JWT real del backend
- 🔄 Endpoint `/admin/auth/me` para verificar sesión
- 🔄 Refresh token automático

#### Dashboard:
- 🔄 Estadísticas reales del backend
- 🔄 Cálculos basados en datos de la BD
- 🔄 Actividad reciente real

#### Reservas:
- 🔄 Listado desde la base de datos
- 🔄 Búsqueda y filtros en el backend
- 🔄 Cancelar reservas con endpoint
- 🔄 Actualización en tiempo real

#### Habitaciones:
- 🔄 Listado desde la base de datos
- 🔄 Toggle persiste en BD
- 🔄 Cambios se reflejan en disponibilidad pública

---

## 🛡️ Seguridad

### Ruta Secreta
- ✅ No hay links en el navbar público
- ✅ Solo accesible escribiendo la URL manualmente
- ✅ Protegida con autenticación

### Protected Routes
- ✅ Verifica autenticación antes de renderizar
- ✅ Redirige a login si no está autenticado
- ✅ Muestra loader mientras verifica

### Tokens
- ✅ Access token guardado en localStorage
- ✅ Se incluye en todas las peticiones protegidas
- ✅ Se elimina al cerrar sesión

---

## 📱 Responsividad

### Desktop (≥768px)
- ✅ Sidebar fijo de 256px
- ✅ Contenido principal al lado
- ✅ Tablas anchas con todas las columnas

### Mobile (<768px)
- ✅ Sidebar oculto por defecto
- ✅ Botón hamburguesa para abrir
- ✅ Sidebar desliza desde la izquierda
- ✅ Overlay oscuro al abrir
- ✅ Cierra al hacer clic fuera
- ✅ Tablas con scroll horizontal

---

## 🎯 Próximos Pasos

### Para conectar con el backend real:

1. **Asegurate que el backend esté corriendo:**
   ```bash
   cd apps/backend
   pnpm dev
   ```

2. **El frontend detectará automáticamente el backend:**
   - Los servicios intentan llamar al backend primero
   - Si falla, usan datos mock como fallback
   - No hay que cambiar código

3. **Endpoints necesarios en el backend:**
   ```
   POST /api/admin/auth/login
   POST /api/admin/auth/logout
   GET  /api/admin/auth/me
   POST /api/admin/auth/refresh
   GET  /api/admin/stats (para dashboard)
   GET  /api/admin/reservations
   PATCH /api/admin/reservations/:id/cancel
   GET  /api/rooms
   PATCH /api/rooms/:id/toggle
   PATCH /api/beds/:id/toggle
   ```

4. **Variables de entorno:**
   ```env
   VITE_API_URL=http://localhost:9267/api
   VITE_ADMIN_PATH=admin-passajero1900
   ```

---

## 🔑 Cambiar Credenciales Mock

Para cambiar las credenciales de prueba, editá:

```typescript
// apps/frontend/src/services/auth.service.ts

const MOCK_ADMIN = {
  email: 'tu@email.com',
  password: 'tuPassword',
};
```

---

## 📊 Testing del Panel

### 1. Login
1. Ir a `http://localhost:8854/admin-passajero1900`
2. Ingresar credenciales mock
3. Verificar redirección a dashboard

### 2. Dashboard
1. Ver estadísticas
2. Hacer clic en tarjetas para navegar
3. Verificar links rápidos

### 3. Reservas
1. Crear algunas reservas desde el flujo público
2. Ir al panel de admin
3. Buscar por código/nombre
4. Filtrar por estado
5. Abrir modal de detalles
6. Ver información completa

### 4. Habitaciones
1. Ver listado completo
2. Activar/desactivar habitaciones
3. Activar/desactivar camas individuales
4. Verificar cambios visuales

### 5. Logout
1. Hacer clic en "Cerrar sesión"
2. Verificar redirección a login
3. Intentar acceder a rutas protegidas (debe redirigir)

---

## 🎨 Colores del Panel

```css
/* Sidebar */
background: linear-gradient(to bottom, #1f2937, #111827)

/* Primary Actions */
background: linear-gradient(to right, #2D82B5, #2563eb)

/* Success */
green-500: #22c55e

/* Warning */
yellow-500: #eab308

/* Danger */
red-600: #dc2626

/* Info */
blue-500: #3b82f6
```

---

¡El panel de administración está completo y funcional! 🎉
