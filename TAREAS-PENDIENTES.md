# 📋 TAREAS PENDIENTES - PASSAJERO1900

**Última actualización:** 4 de noviembre de 2025  
**Estado del proyecto:** 80% completado  
**Tiempo estimado restante:** 2-3 semanas

---

## 📊 RESUMEN EJECUTIVO

### ✅ Completado (80%)
- Frontend completo con modo mock funcional
- Backend API REST con todas las entidades
- Sistema de emails (Resend) con templates
- Webhooks de Mercado Pago con seguridad HMAC-SHA256
- Feature flags para desarrollo/staging/producción
- Panel administrativo básico
- Diseño responsive y accesible

### ❌ Pendiente (20%)
- Testing e integración real con servicios externos
- Contenido definitivo del cliente (fotos, textos, precios)
- Funciones avanzadas del panel admin
- Deploy en producción
- Validación end-to-end completa

---

## 🔴 PRIORIDAD CRÍTICA - Bloqueantes para Producción

### 1. Testing con Servicios Reales

#### 1.1 Integración Backend-Frontend Real
**Tiempo estimado:** 2-3 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] Cambiar `VITE_USE_MOCK_DATA=false` en frontend
- [ ] Conectar frontend a backend local (`http://localhost:3001`)
- [ ] Probar cada endpoint:
  - [ ] GET `/api/rooms` - Listar habitaciones
  - [ ] POST `/api/rooms` - Crear habitación (admin)
  - [ ] GET `/api/rooms/availability` - Verificar disponibilidad
  - [ ] POST `/api/reservations` - Crear reserva mock (sin pago)
  - [ ] GET `/api/reservations/:code` - Buscar por código
  - [ ] POST `/api/contact` - Formulario de contacto
  - [ ] POST `/api/admin/login` - Login del admin
  - [ ] GET `/api/admin/reservations` - Listar todas las reservas
- [ ] Verificar manejo de errores en cada caso
- [ ] Validar que los spinners de carga funcionan
- [ ] Confirmar que los mensajes de error son claros

**Dependencias:** Backend corriendo en local

---

#### 1.2 Testing con Resend (Emails Reales)
**Tiempo estimado:** 1 día  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] Crear cuenta gratuita en [Resend](https://resend.com/signup)
  - Plan gratuito: 100 emails/día, 3,000/mes
- [ ] Obtener API Key de Resend
- [ ] Verificar dominio o usar dominio de prueba de Resend
- [ ] Configurar variables de entorno:
  ```bash
  ENABLE_EMAILS=true
  RESEND_API_KEY=re_xxxxxxxxxxxx  # API key real
  EMAIL_FROM=noreply@tudominio.com  # o dominio de prueba
  EMAIL_ADMIN=passajero1900@gmail.com
  ```
- [ ] Probar envío de emails:
  - [ ] Email de confirmación al huésped
  - [ ] Email de notificación al admin
  - [ ] Verificar que llegan correctamente
  - [ ] Revisar que los templates se ven bien
  - [ ] Confirmar que los enlaces funcionan
- [ ] Probar desde el flujo de reserva completo
- [ ] Verificar logs en dashboard de Resend

**Dependencias:** Cuenta Resend creada

**Documentación:** Ver `SETUP-SERVICES.md` sección "Configuración de Resend"

---

#### 1.3 Testing con Mercado Pago Sandbox
**Tiempo estimado:** 2-3 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] Crear cuenta en [Mercado Pago Developers](https://www.mercadopago.com.ar/developers)
- [ ] Obtener credenciales de prueba (sandbox):
  - [ ] Public Key (para frontend)
  - [ ] Access Token (para backend)
  - [ ] Webhook Secret (para validación)
- [ ] Configurar variables de entorno (backend):
  ```bash
  ENABLE_PAYMENTS=true
  MP_USE_SANDBOX=true
  MP_ACCESS_TOKEN=TEST-1234567890-xxxxxx-xxxxxx
  MP_WEBHOOK_SECRET=tu_webhook_secret
  ```
- [ ] Configurar variables de entorno (frontend):
  ```bash
  VITE_ENABLE_REAL_PAYMENTS=true
  VITE_MP_PUBLIC_KEY=TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  VITE_MP_IS_SANDBOX=true
  ```
- [ ] Testing de flujo de pago:
  - [ ] Crear reserva en frontend
  - [ ] Ir a checkout de Mercado Pago
  - [ ] Probar pago aprobado (tarjeta de prueba)
  - [ ] Probar pago rechazado
  - [ ] Probar pago pendiente
  - [ ] Verificar redirección correcta en cada caso
- [ ] Testing de webhooks:
  - [ ] Instalar ngrok: `npm install -g ngrok`
  - [ ] Exponer backend: `ngrok http 3001`
  - [ ] Configurar webhook URL en Mercado Pago:
    - URL: `https://tu-ngrok-url.ngrok.io/api/payments/webhook`
  - [ ] Hacer un pago de prueba
  - [ ] Verificar que el webhook se recibe
  - [ ] Confirmar que la reserva se actualiza
  - [ ] Verificar que los emails se envían
  - [ ] Revisar logs del webhook
- [ ] Probar casos edge:
  - [ ] Webhook duplicado (misma notificación 2 veces)
  - [ ] Webhook con firma inválida
  - [ ] Pago rechazado después de pendiente
  - [ ] Timeout de Mercado Pago

**Dependencias:** Cuenta Mercado Pago Developers, ngrok instalado

**Documentación:**
- Ver `apps/backend/scripts/README-WEBHOOKS.md`
- Ver `SETUP-SERVICES.md` sección "Configuración de Mercado Pago"

**Tarjetas de prueba:**
```
Aprobada: 5031 7557 3453 0604 | CVV: 123 | Venc: 11/25
Rechazada: 5031 4332 1540 6351
Pendiente: 5031 4362 8488 8100
```

---

#### 1.4 Testing End-to-End Completo
**Tiempo estimado:** 2 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Flujo completo de reserva exitosa:**
  1. [ ] Usuario visita Home
  2. [ ] Click en "Reservar Ahora"
  3. [ ] Selecciona habitación
  4. [ ] Elige fechas disponibles
  5. [ ] Completa formulario de huésped
  6. [ ] Revisa resumen de pago
  7. [ ] Click en "Procesar Pago"
  8. [ ] Redirige a Mercado Pago
  9. [ ] Completa pago con tarjeta de prueba
  10. [ ] Recibe webhook
  11. [ ] Redirige a página de éxito
  12. [ ] Recibe email de confirmación
  13. [ ] Admin recibe email de notificación
  14. [ ] Buscar reserva por código
  15. [ ] Ver detalles correctos

- [ ] **Flujo de pago rechazado:**
  1. [ ] Repetir pasos 1-8
  2. [ ] Usar tarjeta rechazada
  3. [ ] Redirige a página de error
  4. [ ] Mensaje de error claro
  5. [ ] Opción de reintentar

- [ ] **Flujo de formulario de contacto:**
  1. [ ] Ir a página Contacto
  2. [ ] Llenar formulario
  3. [ ] Enviar mensaje
  4. [ ] Ver confirmación
  5. [ ] Admin recibe notificación (si implementamos email)

- [ ] **Flujo de panel admin:**
  1. [ ] Login con credenciales
  2. [ ] Ver dashboard con estadísticas
  3. [ ] Ver lista de reservas
  4. [ ] Filtrar por estado/fecha
  5. [ ] Ver detalles de reserva
  6. [ ] Ver formularios de contacto

- [ ] **Testing responsive:**
  - [ ] Probar en Chrome móvil (DevTools)
  - [ ] Probar en Firefox móvil
  - [ ] Probar en Safari iOS (si es posible)
  - [ ] Probar tablet (iPad)
  - [ ] Verificar touch gestures
  - [ ] Verificar menú móvil

- [ ] **Testing de performance:**
  - [ ] Lighthouse score (objetivo: >90)
  - [ ] Tiempo de carga < 3 segundos
  - [ ] First Contentful Paint < 1.5s
  - [ ] Optimizar imágenes si es necesario

**Dependencias:** Todos los servicios funcionando (Resend + MP)

---

### 2. Contenido del Cliente

#### 2.1 Assets Visuales
**Tiempo estimado:** Depende del cliente  
**Estado:** ❌ No iniciado

**Logo:**
- [ ] Logo en versión principal (color)
- [ ] Logo en versión blanco (para footer oscuro)
- [ ] Logo en formato SVG (escalable)
- [ ] Logo en PNG (fallback)
- [ ] Tamaños: 200px, 400px, 800px
- [ ] Favicon: 16x16, 32x32, 180x180 (iOS), 192x192, 512x512

**Fotos requeridas (mínimo 30 imágenes):**

**Habitaciones (12 fotos):**
- [ ] Habitación Mixta (4 fotos):
  - Vista general con las 4 camas
  - Detalle de cama individual con cortina
  - Mesa rebatible desplegada
  - Baulera con candado
- [ ] Habitación Privada 1 (4 fotos):
  - Cama doble completa
  - Chifonier
  - Escritorio rebatible
  - Vista general del espacio
- [ ] Habitación Privada 2 (4 fotos):
  - Similar a Privada 1

**Baños (6 fotos):**
- [ ] Baño Planta Baja 1:
  - Ducha de pie
  - Vista general
- [ ] Baño Planta Baja 2:
  - Bañera antigua
  - Vista general
- [ ] Baño Planta Alta:
  - Ducha hidromasaje
  - Antebaño

**Espacios Comunes (8 fotos):**
- [ ] Cocina compartida (2 fotos)
- [ ] Terrazas (2 fotos)
- [ ] Living/área común (2 fotos)
- [ ] Lavarropa/área de servicio (1 foto)
- [ ] Entrada del hostel (1 foto)

**Exterior (4 fotos):**
- [ ] Fachada completa
- [ ] Entrada principal
- [ ] Vista desde la calle
- [ ] Contexto del barrio (opcional)

**Especificaciones técnicas:**
- Formato: JPG o WebP
- Resolución mínima: 1920x1080px
- Peso máximo: 500KB por imagen (optimizadas)
- Proporción recomendada: 16:9 o 4:3

---

#### 2.2 Textos Definitivos
**Tiempo estimado:** Depende del cliente  
**Estado:** ❌ No iniciado

**Secciones a completar:**

- [ ] **Hero (Home):**
  - Título principal (actualmente: "Bienvenido a Passajero1900")
  - Subtítulo descriptivo (actualmente genérico)
  - Call to action

- [ ] **Sobre Nosotros:**
  - Historia del hostel (2-3 párrafos)
  - Filosofía y valores
  - Por qué elegir Passajero1900

- [ ] **Descripción de Habitaciones:**
  - Habitación Mixta (descripción atractiva)
  - Habitaciones Privadas (descripción)
  - Amenidades destacadas

- [ ] **Servicios e Instalaciones:**
  - Descripción de espacios comunes
  - Servicios incluidos
  - Servicios adicionales

- [ ] **Políticas:**
  - Términos y condiciones de reserva
  - Política de cancelación (detallada)
  - Reglas de la casa (expandida)
  - Política de privacidad
  - Preguntas frecuentes (FAQ)

- [ ] **Footer:**
  - Texto de copyright
  - Descripción breve del hostel
  - Enlaces útiles

---

#### 2.3 Información y Precios Finales
**Tiempo estimado:** 1 día  
**Estado:** ❌ No iniciado

**Confirmar con el cliente:**

- [ ] **Precios definitivos:**
  - Habitación Mixta (por cama):
    - 1-2 noches: ARS $_____ (actualmente $35,000)
    - 3+ noches: ARS $_____ (actualmente $30,000)
  - Habitación Privada (por habitación):
    - 1-2 noches: ARS $_____
    - 3+ noches: ARS $_____
  - ¿Hay precios especiales para temporada alta/baja?
  - ¿Descuentos para estadías largas (semana/mes)?

- [ ] **Check-in / Check-out:**
  - Horario de check-in: _____ (actualmente 24hs flexible)
  - Horario de check-out: _____ (actualmente 12:00 PM)
  - ¿Hay cargo por early check-in / late check-out?

- [ ] **Política de cancelación precisa:**
  - Confirmar 72 horas
  - Confirmar reembolso del 50%
  - ¿Cómo se procesa el reembolso? (días hábiles)

- [ ] **Porcentaje de seña:**
  - Confirmar 30% adelantado (actualmente así)
  - O cambiar a otro porcentaje

- [ ] **Redes sociales:**
  - Instagram: @_____
  - Facebook: facebook.com/_____
  - TikTok: @_____ (si aplica)
  - Google Maps: (link directo)

- [ ] **Información adicional:**
  - ¿Hay edad máxima?
  - ¿Hay restricciones adicionales?
  - ¿Ofrecen tours o actividades?
  - ¿Tienen alianzas con restaurantes/negocios?

---

## 🟡 PRIORIDAD MEDIA - Funciones Avanzadas

### 3. Panel Admin - Funcionalidades Pendientes

#### 3.1 Sistema de Cancelación con Reembolso
**Tiempo estimado:** 3-4 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Backend:**
  - [ ] Endpoint `POST /api/admin/reservations/:id/cancel`
  - [ ] Calcular tiempo hasta check-in
  - [ ] Validar si aplica reembolso (>72hs = 50%, <72hs = 0%)
  - [ ] Integrar con API de reembolsos de Mercado Pago
  - [ ] Actualizar estado de reserva a "cancelled"
  - [ ] Enviar email de confirmación de cancelación
  - [ ] Liberar disponibilidad de cama/habitación
  - [ ] Registrar en logs de auditoría

- [ ] **Frontend Admin:**
  - [ ] Botón "Cancelar Reserva" en detalles
  - [ ] Modal de confirmación con advertencias:
    - Mostrar si aplica reembolso
    - Mostrar monto a reembolsar
    - Campo de motivo de cancelación (opcional)
    - Confirmación explícita
  - [ ] Mostrar spinner durante proceso
  - [ ] Mensaje de éxito/error
  - [ ] Actualizar lista de reservas

- [ ] **Testing:**
  - [ ] Cancelar con >72hs (debe reembolsar)
  - [ ] Cancelar con <72hs (sin reembolso)
  - [ ] Cancelar reserva ya cancelada (error)
  - [ ] Cancelar reserva completada (error)
  - [ ] Verificar que se libera disponibilidad

**Dependencias:** Mercado Pago funcionando en sandbox

---

#### 3.2 Calendario Visual de Ocupación
**Tiempo estimado:** 4-5 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Investigar librería:**
  - Opciones: FullCalendar, react-big-calendar, @demark-pro/react-booking-calendar
  - Evaluar: facilidad de uso, customización, rendimiento

- [ ] **Backend:**
  - [ ] Endpoint `GET /api/admin/calendar?month=YYYY-MM`
  - [ ] Devolver ocupación por día:
    ```json
    {
      "2025-11-15": {
        "mixta": {
          "cama1": "reservada",
          "cama2": "disponible",
          "cama3": "reservada",
          "cama4": "disponible"
        },
        "privada1": "reservada",
        "privada2": "disponible"
      }
    }
    ```
  - [ ] Endpoint `POST /api/admin/calendar/block`
    - Bloquear fechas manualmente (mantenimiento)
  - [ ] Endpoint `DELETE /api/admin/calendar/block/:id`
    - Desbloquear fechas

- [ ] **Frontend Admin:**
  - [ ] Componente de calendario mensual
  - [ ] Código de colores:
    - Verde: disponible
    - Amarillo: parcialmente ocupado
    - Rojo: completamente ocupado
    - Gris: bloqueado manualmente
  - [ ] Vista detallada al hacer click en un día
  - [ ] Opción de bloquear/desbloquear fechas
  - [ ] Vista mensual y semanal
  - [ ] Navegación entre meses
  - [ ] Filtro por habitación

- [ ] **Testing:**
  - [ ] Ver mes con reservas
  - [ ] Click en día ocupado (ver detalles)
  - [ ] Bloquear fecha futura
  - [ ] Intentar reservar fecha bloqueada (debe fallar)
  - [ ] Desbloquear fecha
  - [ ] Navegar entre meses

**Librerías recomendadas:**
```bash
pnpm add @demark-pro/react-booking-calendar
# o
pnpm add react-big-calendar
```

---

#### 3.3 Gestión de Formularios de Contacto
**Tiempo estimado:** 2 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Backend:**
  - [ ] Endpoint `PATCH /api/admin/contact-forms/:id/status`
    - Actualizar estado: pending → read → responded
  - [ ] Endpoint `PATCH /api/admin/contact-forms/:id/notes`
    - Agregar notas internas del admin
  - [ ] Mejorar endpoint `GET /api/admin/contact-forms`
    - Agregar filtros: ?status=pending&sort=date
    - Paginación

- [ ] **Frontend Admin:**
  - [ ] Página "Consultas" en panel admin
  - [ ] Lista de formularios de contacto:
    - Badge de estado (nuevo/leído/respondido)
    - Fecha y hora de envío
    - Nombre y email del usuario
    - Preview del mensaje (primeras 50 caracteres)
  - [ ] Filtros:
    - Por estado
    - Por fecha
    - Búsqueda por nombre/email
  - [ ] Modal de detalles al hacer click:
    - Información completa del formulario
    - Área de notas internas
    - Botón "Marcar como leído"
    - Botón "Marcar como respondido"
    - Link de respuesta rápida por email (mailto:)
  - [ ] Contador de consultas pendientes en sidebar

- [ ] **Testing:**
  - [ ] Crear formulario de contacto desde frontend público
  - [ ] Ver en panel admin
  - [ ] Marcar como leído
  - [ ] Agregar notas internas
  - [ ] Marcar como respondido
  - [ ] Filtrar por estado
  - [ ] Verificar que el contador actualiza

---

#### 3.4 Estadísticas y Reportes
**Tiempo estimado:** 3-4 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Backend:**
  - [ ] Endpoint `GET /api/admin/stats/overview`
    - Total de reservas (mes actual, mes anterior)
    - Ingresos totales (mes actual, mes anterior)
    - Tasa de ocupación (%)
    - Habitación más reservada
    - Promedio de noches por reserva
  - [ ] Endpoint `GET /api/admin/stats/revenue?from=DATE&to=DATE`
    - Ingresos por día/semana/mes
    - Comparación con período anterior
  - [ ] Endpoint `GET /api/admin/stats/occupancy?month=YYYY-MM`
    - Ocupación diaria del mes
    - Por habitación
  - [ ] Endpoint `GET /api/admin/reports/reservations?format=csv&from=DATE&to=DATE`
    - Exportar reservas a CSV
  - [ ] Endpoint `GET /api/admin/reports/revenue?format=csv&from=DATE&to=DATE`
    - Exportar ingresos a CSV

- [ ] **Frontend Admin:**
  - [ ] Mejorar Dashboard con gráficos:
    - Librería: Chart.js o Recharts
    - Gráfico de línea: Ingresos por mes (últimos 6 meses)
    - Gráfico de barras: Reservas por habitación
    - Gráfico de donut: Estados de reserva (confirmada/cancelada/completada)
    - Gráfico de área: Tasa de ocupación mensual
  - [ ] Cards de métricas principales:
    - Total de reservas (este mes vs mes anterior)
    - Ingresos totales (este mes vs mes anterior)
    - Tasa de ocupación promedio
    - Próximos check-ins (hoy y mañana)
  - [ ] Sección de reportes:
    - Selector de rango de fechas
    - Botón "Exportar a CSV"
    - Preview de datos antes de exportar
  - [ ] Filtros de período:
    - Última semana
    - Último mes
    - Últimos 3 meses
    - Custom (selección manual)

- [ ] **Testing:**
  - [ ] Crear varias reservas de prueba
  - [ ] Ver estadísticas en dashboard
  - [ ] Exportar reporte a CSV
  - [ ] Abrir CSV y verificar datos
  - [ ] Cambiar período y verificar actualización

**Librerías recomendadas:**
```bash
pnpm add recharts
# o
pnpm add react-chartjs-2 chart.js
```

---

#### 3.5 Bloqueo Manual de Fechas
**Tiempo estimado:** 2 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Backend:**
  - [ ] Entity `RoomBlock`:
    - id
    - roomId (relación con Room)
    - bedId (nullable - para bloquear cama específica)
    - startDate
    - endDate
    - reason (mantenimiento, limpieza, etc.)
    - createdBy (admin que lo creó)
    - createdAt
  - [ ] Endpoint `POST /api/admin/rooms/:id/block`
  - [ ] Endpoint `GET /api/admin/rooms/blocks`
  - [ ] Endpoint `DELETE /api/admin/rooms/blocks/:id`
  - [ ] Modificar lógica de disponibilidad para considerar bloqueos

- [ ] **Frontend Admin:**
  - [ ] En página "Habitaciones":
    - Botón "Bloquear Fechas" por habitación
  - [ ] Modal de bloqueo:
    - Selector de fechas (inicio y fin)
    - Dropdown de motivo (mantenimiento, limpieza, reparación, otro)
    - Campo de notas (opcional)
    - Vista previa de impacto (reservas afectadas)
  - [ ] Lista de bloqueos activos:
    - Por habitación
    - Fecha inicio - fin
    - Motivo
    - Botón "Eliminar bloqueo"
  - [ ] Visualizar bloqueos en calendario

- [ ] **Testing:**
  - [ ] Bloquear habitación por 3 días
  - [ ] Intentar reservar en esas fechas (debe dar error)
  - [ ] Ver bloqueo en calendario
  - [ ] Eliminar bloqueo
  - [ ] Verificar que ahora se puede reservar

---

#### 3.6 Sistema de Auditoría
**Tiempo estimado:** 2-3 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Backend:**
  - [ ] Entity `AuditLog`:
    - id
    - adminId
    - action (crear, modificar, cancelar, etc.)
    - entityType (reservation, room, etc.)
    - entityId
    - changes (JSON con before/after)
    - ipAddress
    - userAgent
    - createdAt
  - [ ] Middleware de auditoría para rutas admin
  - [ ] Endpoint `GET /api/admin/audit-logs?page=1&limit=50`
    - Filtros por fecha, admin, acción, entidad

- [ ] **Frontend Admin:**
  - [ ] Página "Historial de Cambios"
  - [ ] Lista de acciones:
    - Quién hizo la acción
    - Qué acción (con icono)
    - Sobre qué entidad
    - Fecha y hora
    - Botón "Ver detalles"
  - [ ] Modal de detalles:
    - Cambios específicos (antes/después)
    - IP y navegador
  - [ ] Filtros y búsqueda

- [ ] **Testing:**
  - [ ] Crear reserva desde admin
  - [ ] Cancelar reserva
  - [ ] Ver en historial de cambios
  - [ ] Verificar que muestra quién y cuándo

---

## 🟢 PRIORIDAD BAJA - Mejoras y Optimización

### 4. SEO y Performance

#### 4.1 Optimización SEO
**Tiempo estimado:** 2 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Meta tags en todas las páginas:**
  - [ ] Title optimizado por página
  - [ ] Description única por página
  - [ ] Open Graph tags (Facebook, WhatsApp)
  - [ ] Twitter Card tags
  - [ ] Canonical URLs

- [ ] **Sitemap XML:**
  - [ ] Generar sitemap.xml
  - [ ] Incluir todas las páginas públicas
  - [ ] Actualización automática

- [ ] **robots.txt:**
  - [ ] Permitir indexación de páginas públicas
  - [ ] Bloquear panel admin
  - [ ] Link a sitemap

- [ ] **Schema Markup (JSON-LD):**
  - [ ] LocalBusiness schema
  - [ ] Hotel schema
  - [ ] Breadcrumbs schema

- [ ] **Accesibilidad:**
  - [ ] Auditoría con Lighthouse
  - [ ] Atributos alt en todas las imágenes
  - [ ] ARIA labels donde corresponda
  - [ ] Contraste de colores adecuado
  - [ ] Navegación por teclado

**Ejemplo de Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Passajero1900",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle 55 N°613 entre 7 y 8",
    "addressLocality": "La Plata",
    "postalCode": "1900",
    "addressCountry": "AR"
  },
  "telephone": "+54-221-2215555",
  "priceRange": "$$"
}
```

---

#### 4.2 Optimización de Imágenes
**Tiempo estimado:** 1 día  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] Implementar lazy loading para todas las imágenes
- [ ] Usar formato WebP con fallback JPG
- [ ] Generar múltiples tamaños (responsive images):
  - Mobile: 480px, 768px
  - Desktop: 1024px, 1920px
- [ ] Implementar blur placeholder mientras cargan
- [ ] Comprimir todas las imágenes (objetivo: <200KB)
- [ ] Usar CDN para assets estáticos (Cloudflare/Vercel)

**Herramientas:**
```bash
# Instalar sharp para procesamiento de imágenes
pnpm add sharp

# Script de optimización
node scripts/optimize-images.js
```

---

#### 4.3 Performance y Caché
**Tiempo estimado:** 1-2 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Frontend:**
  - [ ] Code splitting por rutas
  - [ ] Lazy loading de componentes pesados
  - [ ] Memoización de componentes (React.memo)
  - [ ] Optimización de re-renders
  - [ ] Service Worker para PWA
  - [ ] Caché de assets estáticos

- [ ] **Backend:**
  - [ ] Implementar Redis para caché
  - [ ] Cachear respuestas de habitaciones disponibles (5 min)
  - [ ] Cachear lista de habitaciones (30 min)
  - [ ] Invalidar caché al crear/modificar reserva
  - [ ] Compression middleware (gzip)

- [ ] **Database:**
  - [ ] Índices en columnas frecuentemente consultadas:
    - `reservations.checkInDate`
    - `reservations.checkOutDate`
    - `reservations.status`
    - `reservations.reservationCode`
  - [ ] Query optimization
  - [ ] Connection pooling

**Testing de performance:**
- [ ] Lighthouse score > 90 (Performance)
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.5s
- [ ] Cumulative Layout Shift < 0.1

---

### 5. Funciones Adicionales (Nice to Have)

#### 5.1 Sistema de Notificaciones
**Tiempo estimado:** 2 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] Email de recordatorio 24hs antes del check-in
- [ ] Email de agradecimiento post check-out
- [ ] Notificación al admin de check-ins del día
- [ ] Email semanal de resumen al admin (ocupación, ingresos)

---

#### 5.2 Multi-idioma (i18n)
**Tiempo estimado:** 3-4 días  
**Estado:** ❌ No iniciado

**Idiomas:** Español (default) + Inglés

**Tareas:**
- [ ] Instalar react-i18next
- [ ] Crear archivos de traducción (ES, EN)
- [ ] Traducir todos los textos de la UI
- [ ] Selector de idioma en header
- [ ] Persistir preferencia en localStorage
- [ ] Traducir emails (templates por idioma)

**Consideraciones:**
- Precios siempre en ARS (no convertir moneda)
- Fechas en formato local (dd/mm/yyyy para ES, mm/dd/yyyy para EN)

---

#### 5.3 Sistema de Reviews
**Tiempo estimado:** 4-5 días  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] Entity `Review`:
  - reservationId
  - rating (1-5 estrellas)
  - comment
  - photos (opcional)
  - status (pending/approved/rejected)
- [ ] Email post check-out invitando a dejar review
- [ ] Página de reviews públicas
- [ ] Moderación de reviews en panel admin
- [ ] Mostrar rating promedio en home

---

#### 5.4 Integración con Booking.com / Airbnb
**Tiempo estimado:** 5-7 días  
**Estado:** ❌ No iniciado (Requiere análisis previo)

**Tareas:**
- [ ] Investigar APIs de Booking.com y Airbnb
- [ ] Sincronización de disponibilidad
- [ ] Importación automática de reservas externas
- [ ] Prevención de double-booking
- [ ] Actualización de precios centralizada

**Nota:** Esto es complejo y puede requerir suscripción a servicios de channel manager.

---

## 🚀 DEPLOYMENT Y LANZAMIENTO

### 6. Preparación para Deploy

#### 6.1 Deploy de Staging (Testing)
**Tiempo estimado:** 2-3 días  
**Estado:** ❌ No iniciado

**Backend (Railway):**
- [ ] Crear cuenta en [Railway](https://railway.app)
- [ ] Crear nuevo proyecto
- [ ] Conectar repositorio de GitHub
- [ ] Configurar variables de entorno (staging):
  ```
  NODE_ENV=production
  DATABASE_URL=(Railway auto-genera)
  ENABLE_EMAILS=true
  RESEND_API_KEY=...
  ENABLE_PAYMENTS=true
  MP_USE_SANDBOX=true
  MP_ACCESS_TOKEN=TEST-...
  MP_WEBHOOK_SECRET=...
  JWT_SECRET=...
  FRONTEND_URL=https://passajero1900-staging.vercel.app
  ```
- [ ] Deploy automático desde branch `main`
- [ ] Verificar que la API funciona
- [ ] Obtener URL del backend

**Frontend (Vercel):**
- [ ] Crear cuenta en [Vercel](https://vercel.com)
- [ ] Importar repositorio de GitHub
- [ ] Configurar variables de entorno (staging):
  ```
  VITE_API_URL=https://tu-backend.railway.app
  VITE_USE_MOCK_DATA=false
  VITE_ENABLE_REAL_PAYMENTS=true
  VITE_MP_PUBLIC_KEY=TEST-...
  VITE_MP_IS_SANDBOX=true
  ```
- [ ] Deploy automático desde branch `main`
- [ ] Configurar dominio staging (ej: staging.passajero1900.com)

**Testing en staging:**
- [ ] Probar flujo completo end-to-end
- [ ] Verificar que emails llegan
- [ ] Probar pagos con MP sandbox
- [ ] Probar en múltiples dispositivos
- [ ] Compartir con cliente para feedback

---

#### 6.2 Deploy de Producción
**Tiempo estimado:** 1 día  
**Estado:** ❌ No iniciado

**Pre-requisitos:**
- ✅ Todo testeado en staging
- ✅ Cliente aprobó contenido y funcionalidades
- ✅ Credenciales de producción listas

**Backend (Railway Production):**
- [ ] Crear nuevo proyecto "passajero1900-production"
- [ ] Configurar variables de entorno (producción):
  ```
  NODE_ENV=production
  DATABASE_URL=(Railway auto-genera)
  ENABLE_EMAILS=true
  RESEND_API_KEY=re_prod_...
  ENABLE_PAYMENTS=true
  MP_USE_SANDBOX=false
  MP_ACCESS_TOKEN=(credencial de producción)
  MP_WEBHOOK_SECRET=(production secret)
  JWT_SECRET=(generar nuevo)
  FRONTEND_URL=https://passajero1900.com
  ```
- [ ] Deploy
- [ ] Configurar dominio custom para API (api.passajero1900.com)
- [ ] Verificar SSL/HTTPS
- [ ] Configurar logs y monitoring

**Frontend (Vercel Production):**
- [ ] Crear nuevo proyecto de producción
- [ ] Configurar variables de entorno (producción):
  ```
  VITE_API_URL=https://api.passajero1900.com
  VITE_USE_MOCK_DATA=false
  VITE_ENABLE_REAL_PAYMENTS=true
  VITE_MP_PUBLIC_KEY=(producción)
  VITE_MP_IS_SANDBOX=false
  ```
- [ ] Deploy
- [ ] Configurar dominio: passajero1900.com
- [ ] Configurar DNS:
  - A record apuntando a Vercel
  - CNAME para www
- [ ] Verificar SSL/HTTPS

**Mercado Pago Production:**
- [ ] Actualizar webhook URL en MP dashboard:
  - `https://api.passajero1900.com/api/payments/webhook`
- [ ] Probar con pago real de prueba ($1)
- [ ] Verificar que webhook funciona

**Post-deploy:**
- [ ] Smoke testing en producción
- [ ] Verificar Google Analytics (si se implementó)
- [ ] Verificar logs no muestran errores
- [ ] Crear primera reserva de prueba end-to-end
- [ ] Monitoring activo las primeras 24 horas

---

#### 6.3 Configuración de Dominio
**Tiempo estimado:** 1-2 horas  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] Comprar dominio (recomendado: .com.ar o .com)
  - Opciones: NIC Argentina, Namecheap, Google Domains
- [ ] Configurar DNS:
  - [ ] A record: @ → IP de Vercel
  - [ ] CNAME: www → passajero1900.com
  - [ ] CNAME: api → railway-url.railway.app
- [ ] Configurar email:
  - [ ] MX records para passajero1900@gmail.com
  - [ ] O configurar email profesional (Google Workspace)
- [ ] Esperar propagación DNS (hasta 48hs)
- [ ] Verificar dominio en Resend para emails
- [ ] Agregar dominio a Google Search Console

---

### 7. Monitoring y Mantenimiento

#### 7.1 Monitoring y Alertas
**Tiempo estimado:** 1 día  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] Configurar Sentry para error tracking:
  - [ ] Backend: errores de servidor
  - [ ] Frontend: errores de JavaScript
  - [ ] Alertas por email al desarrollador
- [ ] Railway monitoring:
  - [ ] CPU y memoria
  - [ ] Database connections
  - [ ] Alertas si el servicio cae
- [ ] Uptime monitoring:
  - [ ] UptimeRobot (gratis, chequea cada 5 min)
  - [ ] Alertas si el sitio está caído
- [ ] Google Analytics:
  - [ ] Tracking de páginas
  - [ ] Eventos de conversión (reserva completada)
  - [ ] Fuentes de tráfico

---

#### 7.2 Backups y Seguridad
**Tiempo estimado:** 1 día  
**Estado:** ❌ No iniciado

**Tareas:**
- [ ] **Backup de base de datos:**
  - [ ] Railway auto-backup (verificar configuración)
  - [ ] Script de backup manual semanal
  - [ ] Guardar backups en almacenamiento externo (Google Drive)
  - [ ] Testear restauración de backup
- [ ] **Variables de entorno:**
  - [ ] Backup de todas las .env en lugar seguro (1Password, Bitwarden)
  - [ ] No commitear nunca a Git
- [ ] **SSL/HTTPS:**
  - [ ] Verificar certificados válidos
  - [ ] Auto-renovación configurada (Vercel/Railway lo hacen)
- [ ] **Seguridad:**
  - [ ] Rate limiting en producción (ya implementado)
  - [ ] Firewall de Railway configurado
  - [ ] Auditoría de dependencias: `pnpm audit`
  - [ ] Actualizar dependencias con vulnerabilidades

---

#### 7.3 Documentación para Cliente
**Tiempo estimado:** 1-2 días  
**Estado:** ❌ No iniciado

**Crear manual de usuario (PDF o video):**

- [ ] **Acceso al panel admin:**
  - Cómo entrar
  - Recuperar contraseña (si implementamos)
  
- [ ] **Gestión de reservas:**
  - Ver lista de reservas
  - Ver detalles de reserva
  - Cancelar reserva
  - Buscar reserva por código
  - Filtrar reservas

- [ ] **Gestión de formularios de contacto:**
  - Ver consultas
  - Responder a clientes
  - Marcar como resuelto

- [ ] **Gestión de habitaciones:**
  - Modificar disponibilidad
  - Bloquear fechas
  - Actualizar precios (si implementamos)

- [ ] **Ver estadísticas:**
  - Interpretar gráficos
  - Exportar reportes

- [ ] **Problemas comunes:**
  - Qué hacer si no llega un email
  - Qué hacer si un pago falla
  - Cómo contactar soporte técnico

---

## 📝 CHECKLIST FINAL PRE-LANZAMIENTO

### Semana -1: Testing Final

- [ ] **Funcionalidad:**
  - [ ] Flujo de reserva completo (10+ pruebas)
  - [ ] Pagos con MP producción ($1 de prueba)
  - [ ] Emails llegan correctamente
  - [ ] Webhooks funcionan en producción
  - [ ] Panel admin funciona completamente
  - [ ] Formulario de contacto funciona

- [ ] **Contenido:**
  - [ ] Todas las fotos subidas y optimizadas
  - [ ] Todos los textos revisados y aprobados por cliente
  - [ ] Logo en todas las ubicaciones
  - [ ] Precios finales confirmados
  - [ ] Redes sociales linkeadas

- [ ] **Performance:**
  - [ ] Lighthouse score > 90
  - [ ] Carga en < 3 segundos
  - [ ] Responsive en todos los dispositivos

- [ ] **SEO:**
  - [ ] Meta tags en todas las páginas
  - [ ] Sitemap.xml generado
  - [ ] robots.txt configurado
  - [ ] Google Search Console configurado
  - [ ] Google My Business creado y verificado

---

### Día del Lanzamiento

- [ ] Backup completo de base de datos
- [ ] Verificar que todas las variables de entorno están en producción
- [ ] Deploy final de backend y frontend
- [ ] Smoke test completo en producción
- [ ] Crear reserva de prueba end-to-end
- [ ] Verificar que emails llegan
- [ ] Verificar que pagos funcionan
- [ ] Monitoring activo
- [ ] Anuncio en redes sociales del hostel
- [ ] Enviar link al cliente

---

### Semana +1: Post-Lanzamiento

- [ ] Monitorear errores en Sentry
- [ ] Revisar logs de Railway
- [ ] Verificar que webhooks están llegando
- [ ] Responder dudas del cliente
- [ ] Ajustes menores si es necesario
- [ ] Recolectar feedback de primeros usuarios

---

## 📞 SOPORTE Y CONTACTO

### Para el Cliente

**Contacto técnico:** [Tu email o teléfono]  
**Horario de soporte:** [Definir horario]  
**Tiempo de respuesta:** [Definir SLA]

### Recursos Adicionales

- **Repositorio GitHub:** https://github.com/Laza223/passajero-1900
- **Panel Railway:** [Link cuando se cree]
- **Panel Vercel:** [Link cuando se cree]
- **Dashboard Mercado Pago:** https://www.mercadopago.com.ar/developers
- **Dashboard Resend:** https://resend.com/emails

---

## 🎯 RESUMEN DE TIEMPO ESTIMADO

| Categoría | Tiempo Estimado |
|-----------|-----------------|
| **Testing e Integración** | 7-10 días |
| **Contenido del Cliente** | Depende del cliente |
| **Panel Admin Avanzado** | 14-18 días |
| **SEO y Performance** | 4-5 días |
| **Deploy y Configuración** | 3-4 días |
| **Monitoring y Docs** | 2-3 días |
| **TOTAL (sin contenido)** | **30-40 días** |

### Tiempo real considerando:
- Trabajo de medio tiempo: **6-8 semanas**
- Trabajo de tiempo completo: **4-5 semanas**
- Espera de contenido del cliente: **Variable**

---

## 📚 DOCUMENTOS DE REFERENCIA

- `BLUEPRINT.md` - Blueprint completo del proyecto
- `DEVELOPMENT-STRATEGY.md` - Estrategia de desarrollo con feature flags
- `CONFIG-GUIDE.md` - Guía de configuración por ambiente
- `SETUP-SERVICES.md` - Configuración de servicios externos
- `apps/backend/scripts/README-WEBHOOKS.md` - Testing de webhooks
- `FLUJO_RESERVA.md` - Flujo completo de reserva con diagramas
- `CONFIGURACION_TECNICA.md` - Configuración técnica detallada

---

**Última actualización:** 4 de noviembre de 2025  
**Creado por:** GitHub Copilot  
**Estado:** Documento vivo - se actualiza conforme avanza el proyecto

---

## 💡 NOTAS IMPORTANTES

1. **Priorización flexible:** Las tareas están priorizadas pero pueden ajustarse según necesidades del cliente o bloqueadores.

2. **Testing continuo:** No esperar a completar todo para empezar a testear. Testear cada función en staging conforme se completa.

3. **Contenido del cliente:** Este es el mayor bloqueador potencial. Considerar usar placeholders profesionales mientras se espera.

4. **Feedback temprano:** Compartir staging con el cliente lo antes posible para validar funcionalidad y diseño.

5. **Deploy progresivo:** No hay que esperar a tener TODO completo para hacer el primer deploy. Ir subiendo funcionalidades progresivamente.

6. **Documentación:** Mantener este documento actualizado conforme se completen tareas (marcar con ✅).

---

**¿Dudas sobre alguna tarea?** Consultar documentación existente o preguntar en el desarrollo.
