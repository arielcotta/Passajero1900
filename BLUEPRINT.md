# 🏨 PASSAJERO1900 - Hostel Website Blueprint

**Proyecto:** Sistema web para gestión y presentación de hostel  
**Cliente:** Hostel en fase de inauguración  
**Tráfico esperado:** Bajo (pre-inauguración)  
**Stack base:** Replicado de my-barber

---

## 🏢 INFORMACIÓN DEL NEGOCIO

### Datos Legales y Contacto

- **Nombre Comercial:** PASSAJERO1900 (con doble SS)
- **Nombre Legal:** Alejandra Elizabeth Bollón
- **CUIT:** 23-23687385-4 (Monotributista)
- **Dirección:** 55 N°613 entre 7 y 8, La Plata, CP 1900
- **Teléfono:** 221-2215555
- **Email:** passajero1900@gmail.com
- **WhatsApp:** 221-2215555

### Ubicación

- **Ciudad:** La Plata, Buenos Aires
- **Dirección completa:** Calle 55 N°613 entre 7 y 8, CP 1900
- **Zona:** Centro de La Plata

### Habitaciones Disponibles

> **📅 Actualizado:** 4 de noviembre de 2025 (Feedback del cliente)

#### Habitaciones Compartidas (1 unidad)

- **1 Habitación Mixta:** 4 camas
- ❌ **Habitación Femenina:** No disponible por el momento
- **Total camas individuales:** 4

**Características de cada cama:**

- ✅ Privacidad con cortinado
- ✅ Mesa rebatible
- ✅ Enchufes y luz individual
- ✅ Numeración única
- ✅ Baulera con candado incluida

#### Habitaciones Privadas (2 unidades)

- **2 Habitaciones para Pareja:** 1 cama doble cada una (máximo 2 personas)
- ✅ Luces individuales
- ✅ Chifonier para guardar
- ✅ Escritorio rebatible con llave

**Total capacidad:** 8 personas (4 en compartida + 4 en privadas)

### Amenities y Servicios

#### Todas las habitaciones incluyen:

- ✅ Aire acondicionado
- ✅ Ventilación natural
- ✅ Ropa de cama (sábanas, mantas, acolchados)

#### Baños (3 en total - compartidos)

**Planta Baja:**

1. Baño con ducha de pie
2. Baño con bañera antigua (baños de inmersión)

**Planta Alta:** 3. Baño con antebaño y ducha con hidromasaje vertical

#### Servicios Generales:

- ✅ WiFi
- ✅ Cocina compartida
- ✅ Servicio de lava-secarropas (con productos, muy accesible)
- ✅ Terrazas y espacios abiertos
- ❌ Desayuno (no incluido por ahora, futuro sí)
- ❌ Toallas (los huéspedes deben traer las propias)

### Precios y Tarifas

#### Tarifas por Noche

- **Precio base:** USD 25 / ARS $35,000 por noche
- **Estadía de 3+ días:** ARS $30,000 por noche
- **Sin recargos:** No hay recargo por fin de semana
- **Estadía máxima:** Sin límite

### Políticas Operativas

#### Check-in / Check-out

- **Check-in:** 24 horas (flexible)
- **Check-out:** 12:00 PM (mediodía)
- **Recepción:** 24 horas

#### Reglas de la Casa

- **Edad mínima:** 18 años
  - Menores de 18: requieren permiso escrito de los padres (poder)
- **Mascotas:** ❌ No permitidas
- **Fumar:** ✅ Solo en terrazas y espacios abiertos
- **Visitas:**
  - Permitidas con autorización previa
  - No pueden quedarse a dormir
- **Horario de silencio:** 22:00 - 08:00 hs en planta alta

### Precios y Sistema de Pagos

#### Moneda

- **Todos los precios en ARS** (Pesos Argentinos)
- Los precios finales serán definidos por el cliente antes del lanzamiento

#### Lógica de Pago (Sistema de Seña)

- **Estadía de 1-2 noches:** Pago completo anticipado (100%)
- **Estadía de 3+ noches:** Seña del 30% online + resto (70%) al check-in

**Ejemplo:**

```
3 noches x $10,000/noche = $30,000 total
→ Pago online (MP): $9,000 (30%)
→ Pago en hostel: $21,000 (70%)
```

#### Política de Cancelación

- **Hasta 72hs antes del check-in:** Reembolso del 50%
- **Menos de 72hs:** Sin reembolso (0%)
- **Proceso:** Cliente contacta por WhatsApp/teléfono → Admin cancela desde panel admin

#### Comisiones de Mercado Pago

- Las comisiones de MP (~4-6% + IVA) son **absorbidas por el hostel**
- El cliente paga exactamente el monto mostrado en pantalla
- El hostel recibe el monto menos las comisiones de MP

#### Sistema de Reservas

- **Una reserva = Una cama/habitación** (no se pueden reservar múltiples camas en una transacción)
- **Pago obligatorio:** La reserva solo se confirma al completar el pago en Mercado Pago
- **Concurrencia:** First-come first-served (el primero que paga se queda con la cama)
- **Sin reserva temporal:** No hay bloqueo de 10 minutos, solo se reserva al pagar

---

## 📋 ÍNDICE

1. [Tech Stack](#-tech-stack)
2. [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
3. [Funcionalidades Core](#-funcionalidades-core)
4. [Diferencias vs My-Barber](#-diferencias-vs-my-barber)
5. [Plan de Desarrollo](#-plan-de-desarrollo)
6. [Consideraciones Especiales](#-consideraciones-especiales)

---

## 🛠️ TECH STACK

### Backend

- **Framework:** Express.js + TypeScript
- **ORM:** TypeORM
- **Database:** PostgreSQL 16 (Docker)
- **Auth:** JWT (Access + Refresh Tokens) - **Solo para panel admin**
- **Validation:** Zod
- **Email:** Resend (para notificaciones de reservas/consultas)
- **Security:** Helmet + CORS + Rate Limiting
- **Testing:** Vitest

### Frontend

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS + shadcn/ui
- **Routing:** React Router DOM
- **Icons:** React Icons (react-icons) - No Lucide
- **Forms:** React Hook Form + Zod
- **State Management:** Context API (para este proyecto alcanza)
- **PWA:** vite-plugin-pwa
- **Paleta de Colores:** #2D82B5 (azul principal) + Blanco
- **WhatsApp Widget:** Botón flotante siempre visible

### Pagos

- **Pasarela:** Mercado Pago (Checkout Pro)
- **Integración:** Webhooks para confirmación de pago
- **Flujo:** Pago exitoso → Crea reserva → Envía email

### Infrastructure

- **Monorepo:** Turborepo + pnpm workspaces
- **Containerization:** Docker + Docker Compose
- **Package Manager:** pnpm (v9+)
- **Node:** v20+

---

## 🏗️ ARQUITECTURA DEL PROYECTO

```
passajero-1900/
├── apps/
│   ├── backend/                 # API REST
│   │   ├── src/
│   │   │   ├── config/          # DB, env, etc
│   │   │   ├── entities/        # TypeORM entities
│   │   │   │   ├── Room.ts
│   │   │   │   ├── Reservation.ts
│   │   │   │   ├── ContactForm.ts
│   │   │   │   └── Admin.ts     # Solo para panel admin
│   │   │   ├── routes/
│   │   │   │   ├── rooms.ts
│   │   │   │   ├── reservations.ts
│   │   │   │   ├── contact.ts
│   │   │   │   └── admin.ts
│   │   │   ├── middleware/
│   │   │   ├── services/
│   │   │   └── utils/
│   │   ├── tests/
│   │   └── package.json
│   │
│   └── frontend/                # Web pública + Panel admin
│       ├── src/
│       │   ├── components/
│       │   │   ├── public/      # Sitio público
│       │   │   │   ├── Hero.tsx
│       │   │   │   ├── Rooms.tsx
│       │   │   │   ├── Gallery.tsx
│       │   │   │   ├── Services.tsx
│       │   │   │   ├── Contact.tsx
│       │   │   │   └── Footer.tsx
│       │   │   ├── admin/       # Panel administrativo
│       │   │   │   ├── Dashboard.tsx
│       │   │   │   ├── ReservationsManager.tsx
│       │   │   │   └── RoomsManager.tsx
│       │   │   └── ui/          # shadcn/ui components
│       │   ├── pages/
│       │   │   ├── Home.tsx
│       │   │   ├── RoomsPage.tsx
│       │   │   ├── AboutUs.tsx
│       │   │   └── admin/
│       │   │       ├── Login.tsx
│       │   │       └── Dashboard.tsx
│       │   ├── context/
│       │   ├── hooks/
│       │   └── utils/
│       └── package.json
│
├── packages/                    # Shared packages (opcional)
│   ├── typescript-config/
│   └── eslint-config-custom/
│
├── docker/
│   └── postgres/
│       ├── init.sql
│       └── init.sh
│
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── .env.example
```

---

## ✨ FUNCIONALIDADES CORE

### 🌐 Sitio Web Público

#### 1. **Home / Landing Page**

- Hero section con imágenes del hostel
- Presentación breve del lugar
- Call-to-action para reservas
- Vista previa de habitaciones destacadas
- Testimonios (opcional fase 2)

#### 2. **Habitaciones / Rooms**

- Listado de las 3 habitaciones:
  - **Compartida Mixta** (4 camas individuales)
  - **Compartida Femenina** (4 camas individuales)
  - **Privada Pareja** (1 cama doble)
- Para habitaciones compartidas:
  - Mostrar disponibilidad por cama (numeradas 1-4)
  - Cada cama tiene su propio card/estado
- Detalle de cada habitación:
  - Fotos (galería) - **Pendiente recibir del cliente**
  - Descripción detallada
  - Amenities (cortinado, mesa, enchufes, baulera, etc.)
  - Precio por noche ($35,000 o $30,000 si 3+ días)
  - Sistema de reserva por cama/habitación

#### 3. **Servicios / Amenities**

- Listado de servicios incluidos:
  - ✅ WiFi gratuito
  - ✅ Cocina compartida equipada
  - ✅ Ropa de cama (sábanas, mantas, acolchados)
  - ✅ Aire acondicionado en todas las habitaciones
  - ✅ Terrazas y espacios abiertos
  - ✅ Bauleras con candado (en compartidas)
  - ✅ 3 baños completos (1 con hidromasaje, 1 con bañera antigua)
- Servicios adicionales disponibles:
  - 💰 Lava-secarropas (muy accesible)
- Información operativa:
  - ⏰ Check-in: 24 horas (flexible)
  - ⏰ Check-out: 12:00 PM
  - 🏨 Recepción: 24 horas
- Reglas importantes:
  - Edad mínima: 18 años
  - No se permiten mascotas
  - Fumar solo en espacios abiertos
  - Horario de silencio: 22:00 - 08:00 hs
  - Visitas con autorización previa
  - ⚠️ Los huéspedes deben traer sus propias toallas

#### 4. **Ubicación**

- Mapa embebido (Google Maps)
- **Dirección:** Calle 55 N°613 entre 7 y 8, La Plata, CP 1900
- Cómo llegar:
  - Desde Terminal de La Plata
  - Desde Aeropuerto de Ezeiza
  - Transporte público disponible
- Puntos de interés cercanos:
  - Centro de La Plata
  - Universidad Nacional de La Plata
  - Plaza Moreno
  - Catedral de La Plata
  - República de los Niños

#### 5. **Sistema de Reservas (Público - Sin Login)**

**Flujo simplificado:**

1. Usuario selecciona habitación
2. Elige fechas (check-in / check-out)
3. Completa datos básicos:
   - Nombre completo
   - Email (para confirmación)
   - Teléfono (opcional)
   - Cantidad de huéspedes
4. Sistema valida disponibilidad
5. Se genera la reserva
6. Usuario recibe:
   - Email con confirmación
   - Página de "Reserva Confirmada" con:
     - Resumen de la reserva
     - Código de reserva
     - Botón para descargar PDF
     - Botón para imprimir
     - Link permanente para ver su reserva

**NO hay:**

- ❌ Registro de usuarios
- ❌ Login para clientes
- ❌ Panel de cliente
- ❌ Historial de reservas del cliente

#### 6. **Contacto (Formulario Simple)**

- Formulario de consultas generales
  - Nombre
  - Email
  - Mensaje
- Información de contacto directo:
  - 📧 Email: passajero1900@gmail.com
  - 📱 WhatsApp: +54 221 221-5555
  - 📞 Teléfono: 221-2215555
  - Redes sociales (pendiente URLs del cliente)

#### 7. **Galería**

- Fotos del hostel
- Áreas comunes
- Habitaciones
- Actividades
- Vista del lugar

#### 8. **Ver Reserva (Público - Sin Login)**

- Ruta pública: `/reserva/:codigo`
- Usuario puede ver su reserva con el código
- Funciones disponibles:
  - Ver detalles completos
  - Descargar PDF
  - Imprimir
  - Ver estado de la reserva

### 🔐 Panel Administrativo (Privado)

#### 1. **Autenticación y Seguridad**

**Ruta de Acceso:**

- **URL secreta:** `/admin-passajero1900` (o la que definamos)
- Esta ruta NO estará linkeada desde ningún lugar público del sitio
- Solo Alejandra tendrá el link

**Sistema de Login:**

- Login simple con email/password
- Un solo usuario admin: Alejandra
- Credenciales hardcodeadas en `.env`:
  ```
  ADMIN_EMAIL=passajero1900@gmail.com
  ADMIN_PASSWORD=TuPasswordSuperSeguro123!
  ```
- JWT para mantener sesión (Access Token + Refresh Token)
- Cookies httpOnly para mayor seguridad
- Auto-logout después de 7 días de inactividad

**Ejemplo de acceso:**

```
URL: https://passajero1900.com/admin-passajero1900
↓
Pantalla de login (email + password)
↓
Dashboard admin
```

**Seguridad adicional:**

- Rate limiting en endpoint de login (máx 5 intentos por IP)
- Logs de todos los intentos de login
- Notificación por email si hay login exitoso desde nueva IP

#### 2. **Dashboard**

- Vista general de:
  - Consultas pendientes (del formulario de contacto)
  - Próximas "reservas" anotadas manualmente
  - Ocupación actual del hostel

#### 3. **Gestión de Habitaciones**

- CRUD completo de habitaciones:
  - Crear nueva habitación
  - Editar información
  - Subir/eliminar fotos
  - Activar/desactivar habitación
  - Establecer precios

#### 4. **Gestión de Reservas**

- Ver todas las reservas
- Filtrar por:
  - Fecha
  - Estado (pendiente/confirmada/cancelada/completada)
  - Habitación
- Ver detalles de cada reserva
- Editar reserva
- Cancelar reserva
- Marcar como completada (check-out)
- Enviar email de recordatorio
- Ver historial de cambios

#### 5. **Gestión de Consultas**

- Ver formularios de contacto recibidos
- Marcar como leído/respondido
- Notas internas
- Seguimiento de estado

#### 6. **Calendario de Disponibilidad**

- Vista de calendario mensual
- Ver ocupación por habitación
- Bloquear fechas manualmente
- Ver reservas en el calendario

#### 7. **Configuración**

- Información general del hostel
- Texto de secciones
- Redes sociales
- Horarios de check-in/out
- Políticas de cancelación
- Métodos de pago aceptados

---

## 🔄 DIFERENCIAS VS MY-BARBER

| Aspecto                        | My-Barber                     | Passajero 1900                       |
| ------------------------------ | ----------------------------- | ------------------------------------ |
| **Usuarios principales**       | Barberos (autenticados)       | Visitantes (público)                 |
| **Auth**                       | Obligatorio desde el inicio   | Solo panel admin                     |
| **Sistema de suscripciones**   | ✅ 3 planes (core feature)    | ❌ No necesario                      |
| **Ventas/Transacciones**       | ✅ Registro de ventas diarias | ❌ No aplica                         |
| **Dashboard con gráficos**     | ✅ Ingresos, estadísticas     | 🔶 Simple: consultas, ocupación      |
| **Roles de usuario**           | Múltiples barberos            | 1 admin                              |
| **PWA Mobile-First**           | ✅ Crítico                    | 🔶 Sí, pero menos crítico            |
| **Formularios públicos**       | ❌ No                         | ✅ Contacto/consultas                |
| **Galería de imágenes**        | ❌ No                         | ✅ Core feature                      |
| **SEO**                        | Baja prioridad                | 🔥 Alta prioridad                    |
| **Multiidioma**                | ❌ Solo español               | 🔶 Considerar (fase 2)               |
| **Sistema de reservas online** | ❌ No                         | 🔶 Fase 2 (por ahora solo consultas) |
| **Pasarela de pagos**          | ❌ No                         | 🔶 Fase 2 o 3                        |

### ✂️ Código a ELIMINAR de my-barber:

1. **Sistema completo de suscripciones**

   - Entities: `Subscription.ts`, `SubscriptionPlan.ts`
   - Routes: `subscriptions.ts`
   - Components: Todo el manejo de planes

2. **Sistema de ventas**

   - Entity: `Sale.ts`
   - Routes: `sales.ts`
   - Components: Formularios de venta, estadísticas de ingresos

3. **Sistema de servicios (barber services)**

   - Entity: `Service.ts`
   - Routes: `services.ts`
   - Components: CRUD de servicios de barbería

4. **Múltiples usuarios**

   - Reducir `User.ts` a `Admin.ts`
   - Simplificar auth (solo 1 admin)

5. **Gráficos complejos de ingresos**
   - Reducir @nivo charts (solo necesitamos estadísticas básicas)

### ➕ Código NUEVO a agregar:

1. **Entities del hostel**

   ```typescript
   // Room.ts
   - id
   - name (ej: "Compartida Mixta", "Compartida Femenina", "Privada Pareja")
   - description
   - type (shared_mixed/shared_female/private)
   - capacity (4 o 1)
   - pricePerNight (35000)
   - pricePerNightExtended (30000 para 3+ días)
   - amenities[]
   - images[]
   - isActive
   - hasIndividualBeds (true para compartidas)

   // Bed.ts (Para habitaciones compartidas)
   - id
   - room (relación con Room)
   - bedNumber (1, 2, 3, 4)
   - hasLocker (true)
   - hasCurtain (true)
   - hasFoldingTable (true)
   - hasLightAndOutlets (true)
   - isActive

   // Reservation.ts
   - id
   - reservationCode (único, auto-generado)
   - room (relación con Room)
   - bed (relación con Bed - nullable para privadas)
   - guestName
   - guestEmail
   - guestPhone (opcional)
   - checkInDate
   - checkOutDate
   - numberOfNights (calculado)
   - numberOfGuests (solo relevante para privada)
   - pricePerNight (según duración)
   - totalPrice (calculado)
   - status (pending/confirmed/cancelled/completed)
   - paymentStatus (pending/partial/completed) - Fase 3
   - specialRequests (texto)
   - createdAt
   - updatedAt

   // ContactForm.ts
   - id
   - name
   - email
   - message
   - status (pending/read/responded)
   - adminNotes
   - createdAt
   - respondedAt
   ```

2. **Componentes públicos**

   - Hero con slider
   - Cards de habitaciones
   - Galería de imágenes
   - Formulario de contacto
   - Mapa embebido
   - Footer con redes sociales

3. **SEO básico**
   - Meta tags
   - Open Graph
   - Sitemap
   - Structured data (JSON-LD)

---

## 📅 PLAN DE DESARROLLO

### 🎯 FASE 1: MVP (Semana 1-2) - Para Inauguración

**Objetivo:** Sitio web funcional para el día de la inauguración

#### Backend:

- [ ] Setup inicial del proyecto (clonar estructura de my-barber)
- [ ] Limpiar código innecesario (suscripciones, ventas, servicios)
- [ ] Crear entidades:
  - [ ] Room
  - [ ] ContactForm
  - [ ] Admin (simplificado)
- [ ] Endpoints:
  - [ ] GET /api/rooms (público)
  - [ ] GET /api/rooms/:id (público)
  - [ ] POST /api/contact (público)
  - [ ] POST /api/admin/login
  - [ ] CRUD /api/admin/rooms (privado)
  - [ ] GET /api/admin/contacts (privado)
- [ ] Configurar email (Resend) para notificaciones
- [ ] Tests básicos

#### Frontend:

- [ ] Setup inicial del proyecto
- [ ] Estructura de rutas:
  - [ ] / (Home)
  - [ ] /habitaciones
  - [ ] /servicios
  - [ ] /contacto
  - [ ] /admin/login
  - [ ] /admin/dashboard
- [ ] Componentes públicos:
  - [ ] Hero con slider
  - [ ] Navbar
  - [ ] Cards de habitaciones
  - [ ] Formulario de contacto
  - [ ] Footer
- [ ] Componentes admin:
  - [ ] Login
  - [ ] Dashboard simple
  - [ ] CRUD habitaciones
  - [ ] Lista de consultas
- [ ] Responsive design
- [ ] SEO básico

#### Infra:

- [ ] Docker compose configurado
- [ ] Variables de entorno
- [ ] Scripts de inicio

**Entregable:** Sitio funcional listo para mostrar el día de la inauguración

---

### 🚀 FASE 2: Mejoras Post-Inauguración (Semana 3-4)

**Objetivo:** Optimizaciones basadas en feedback inicial

- [ ] Galería de imágenes completa
- [ ] Sistema de calendario de disponibilidad (visual)
- [ ] Testimonios
- [ ] Blog/Noticias (opcional)
- [ ] Multiidioma (español/inglés)
- [ ] Analytics integrado
- [ ] Performance optimizations
- [ ] PWA completo con offline mode

---

### 🔥 FASE 3: Sistema de Pagos Online (Mes 2-3)

**Objetivo:** Permitir pagos online para asegurar reservas

**NOTA:** El sistema de reservas estará en Fase 1, pero sin pagos online.
En Fase 3 agregamos la pasarela de pagos.

- [ ] Integración con pasarela de pagos (Mercado Pago recomendado para Argentina)
- [ ] Sistema de seña/depósito (definir %)
- [ ] Comprobantes de pago digitales
- [ ] Reembolsos automáticos según política de cancelación
- [ ] Panel admin con reportes financieros

---

## 🎨 CONSIDERACIONES ESPECIALES

### 1. **Bajo Tráfico Inicial**

- No necesitamos optimizaciones agresivas desde el inicio
- Connection pool puede ser pequeño
- Rate limiting puede ser más permisivo
- Podemos simplificar caching

### 2. **SEO es Crítico**

- El hostel necesita ser encontrado en Google
- Meta tags bien configurados
- URLs semánticas
- Sitemap.xml
- robots.txt
- Open Graph para redes sociales
- Structured data (JSON-LD) para Google

### 3. **Mobile First**

- La mayoría de consultas vendrán desde mobile
- Touch-friendly
- Imágenes optimizadas para mobile
- WhatsApp integration

### 4. **Imágenes**

- Necesitamos un sistema de upload de imágenes
- Optimización automática (considerar Cloudinary o similar)
- Lazy loading
- WebP format

### 5. **Sin Complicar**

- Mantener simple al inicio
- Iterar basado en feedback real
- No sobre-ingeniería

---

## 📊 MÉTRICAS DE ÉXITO

### Fase 1 (MVP):

- ✅ Sitio cargando en < 3 segundos
- ✅ 100% responsive
- ✅ Formulario de contacto funcionando
- ✅ Al menos 5 habitaciones cargadas
- ✅ Panel admin funcional

### Fase 2:

- ✅ Primeras 10 consultas recibidas
- ✅ Galería completa (20+ fotos)
- ✅ Sitio en 2 idiomas

### Fase 3:

- ✅ Primera reserva online confirmada
- ✅ Sistema de pagos funcionando
- ✅ 80%+ de reservas vienen del sitio web

---

## 🚨 PRIORIDADES INICIALES

1. **CRÍTICO (Semana 1):**

   - Setup del proyecto
   - Backend con endpoints de rooms y contact
   - Frontend con páginas públicas básicas
   - Deploy funcionando

2. **IMPORTANTE (Semana 2):**

   - Panel admin completo
   - Diseño final pulido
   - SEO configurado
   - Contenido real cargado

3. **BUENO TENER:**
   - Galería expandida
   - Animaciones smooth
   - Blog
   - Multiidioma

---

## 💰 COSTOS ESTIMADOS (Bajo Tráfico)

### Desarrollo:

- **Tiempo estimado MVP:** 40-60 horas
- **Fase 2:** +20 horas
- **Fase 3:** +40 horas

### Servicios Externos:

- **Hosting:** $5-10/mes (Railway, Render, DigitalOcean)
- **Base de datos:** Incluida con hosting
- **Dominio:** $10-15/año
- **Email (Resend):** $0-20/mes (depende volumen)
- **Imágenes (Cloudinary):** Plan gratuito suficiente al inicio
- **SSL:** Gratuito (Let's Encrypt)

**Total mensual estimado:** $5-30/mes

---

---

## ❓ PREGUNTAS PENDIENTES PARA EL CLIENTE

### 🔴 CRÍTICAS (Necesarias para empezar desarrollo)

1. **Sistema de Reservas:**

   - ¿Las reservas en Fase 1 son automáticas o el admin debe aprobarlas manualmente?
   - Si dos personas intentan reservar la misma cama al mismo tiempo, ¿cómo manejamos eso? (first-come-first-served?)
   - ¿Pueden los clientes cancelar su reserva desde el link o solo solicitarla al admin?

2. **Proceso de Reserva:**

   - ¿Requiere algún pago/seña en Fase 1 o las reservas son solo "apartados" sin pago?
   - Si no hay pago online, ¿cómo confirmamos que la reserva es seria? (llamada telefónica?)

3. **Políticas de Cancelación:**

   - ¿Con cuántos días de anticipación se puede cancelar?
   - ¿Hay alguna penalidad por cancelación tardía?

4. **Contenido:**

   - ¿Tienen logo en formato SVG o PNG de alta calidad?
   - ¿Cuándo tendrán las fotos del hostel listas?
   - ¿Tienen redes sociales creadas? (Instagram, Facebook) - necesito las URLs

5. **Timing:**
   - ¿Cuándo es la inauguración?
   - ¿Cuánto tiempo tenemos para el MVP?

### 🟡 IMPORTANTES (Pueden esperar un poco)

6. **Idiomas:**

   - ¿Necesitan inglés desde Fase 1 o puede ser Fase 2?
   - ¿Consideran necesario portugués para turistas brasileños?

7. **Email Marketing:**

   - ¿Qué emails quieren automáticos?
     - Confirmación de reserva al cliente ✅ (obvio)
     - Notificación al admin de nueva reserva ✅ (obvio)
     - Recordatorio 1 día antes del check-in? 🤔
     - Email de bienvenida con info del hostel? 🤔
     - Encuesta post-estadía? 🤔

8. **Panel Admin:**

   - ¿Cuántas personas necesitan acceso al panel?
   - ¿Una sola cuenta (Alejandra) o múltiples?

9. **Reportes:**
   - ¿Qué estadísticas son prioritarias?
     - Ocupación mensual
     - Ingresos proyectados
     - Reservas futuras
     - ¿Algo más específico?

### 🟢 OPCIONALES (Nice to have)

10. **Features Extras:**
    - ¿Quieren blog/noticias en el sitio?
    - ¿Sistema de testimonios/reviews?
    - ¿Chat en vivo o solo WhatsApp?

---

## 🎬 PRÓXIMOS PASOS

### ✅ YA TENEMOS:

- ✅ Información completa del hostel
- ✅ Precios y políticas definidos
- ✅ Habitaciones y capacidad claras
- ✅ Datos de contacto
- ✅ Paleta de colores (#2D82B5 + Blanco)
- ✅ Tech stack definido

### ⏳ NECESITAMOS:

- ⏳ Respuestas a preguntas críticas (arriba)
- ⏳ Logo en formato digital
- ⏳ Fotos del hostel (esperando)
- ⏳ URLs de redes sociales
- ⏳ Fecha límite/inauguración

### 🚀 CUANDO TENGAMOS TODO:

1. Setup inicial del proyecto (clonar my-barber)
2. Limpiar código innecesario
3. Crear estructura de entities
4. Desarrollar backend con endpoints
5. Desarrollar frontend público
6. Desarrollar panel admin
7. Testing y ajustes
8. Deploy

---

## 📝 NOTAS

- Este blueprint es un documento vivo, se irá ajustando según avance el proyecto
- **DECISIÓN TOMADA:** Sistema con pagos online mediante Mercado Pago
- El sistema generará un código de reserva único que el cliente puede usar para ver/gestionar su reserva
- Priorizar funcionalidad sobre perfección al inicio
- Iterar rápido basado en feedback del cliente
- Mantener código limpio y bien documentado para futuras features

---

## 📊 ESTADO ACTUAL DEL PROYECTO

**Última actualización:** 6 de noviembre de 2025  
**Estado:** 🚀 En desarrollo activo - Sistema con feature flags implementado  
**Progreso General:** ~80% completado  
**Estrategia:** Desarrollo completo con mocks → Producción en 5 minutos (solo API keys + contenido)

### 📝 Cambios Recientes (4 nov 2025)
**Feedback del Cliente - Configuración de Habitaciones:**
- ✅ Se agregó 1 habitación privada adicional (ahora son 2 privadas)
- ✅ Habitación compartida femenina NO está disponible por el momento
- ✅ Configuración actual: **1 compartida mixta (4 camas) + 2 privadas (2 personas c/u)**
- ✅ Capacidad total: **8 personas** (4 en compartida + 4 en privadas)

---

### ✅ **COMPLETADO (Frontend - 100%)**

#### **Sitio Público:**
- ✅ **HomePage** con animaciones Framer Motion, hero section, habitaciones, servicios
- ✅ **Página de Contacto** con formulario validado (React Hook Form + Zod)
- ✅ **Flujo completo de reserva** en 4 pasos:
  1. Selección de fechas con react-datepicker (calendario readonly, sin escritura manual)
  2. Selección de habitación/cama con disponibilidad en tiempo real
  3. Datos del huésped con validaciones completas
  4. Resumen y confirmación de pago
- ✅ **Páginas de confirmación** (éxito/error) con códigos de reserva
- ✅ **Navbar y Footer** responsivos con menú hamburguesa mobile
- ✅ **Optimización mobile completa** (breakpoints responsive en todas las páginas)
- ✅ **ScrollToTop automático** en cada navegación
- ✅ **Selector de países con búsqueda** (react-select + API de restcountries.com)
- ✅ **Input de teléfono internacional** con banderas y búsqueda (react-phone-input-2)
- ✅ **Generación de PDF** de reservas con jsPDF
- ✅ **Animaciones suaves** con parallax, scale, opacity effects
- ✅ **Modo mock funcional** con localStorage para testing sin backend

#### **Panel Administrativo:**
- ✅ **Login** con autenticación JWT simulada
- ✅ **Dashboard** con 6 tarjetas de estadísticas (reservas, ingresos, ocupación, check-ins)
- ✅ **Gestión de reservas:**
  - Tabla completa con búsqueda por código/nombre/email
  - Filtros por estado (confirmadas, pendientes, canceladas, completadas)
  - Modal con detalles completos de cada reserva
  - Información del huésped, estadía y pagos
  - Botón de cancelación (preparado para backend)
- ✅ **Gestión de habitaciones:**
  - Listado de todas las habitaciones con descripciones y precios
  - Toggle para activar/desactivar habitaciones completas
  - Gestión individual de camas en habitaciones compartidas
  - Indicadores visuales de estado
- ✅ **Layout admin responsive:**
  - Sidebar fijo en desktop, deslizable en mobile
  - Navegación con indicadores de página activa
  - Información del admin logueado
  - Botón de cerrar sesión
  - Link para volver al sitio público
- ✅ **ProtectedRoute** para rutas que requieren autenticación
- ✅ **Ruta secreta** `/admin-passajero1900` sin enlaces en navbar público

#### **Tecnologías Frontend:**
- React 18.3.1 + TypeScript 5.9.3
- Vite 5.4.21
- TailwindCSS 3.4.18
- Framer Motion 12.23.24
- React Router DOM 6.30.1
- React Hook Form 7.66.0 + Zod 3.25.76
- react-datepicker 8.8.0 + date-fns 3.6.0
- react-select 5.10.2
- react-phone-input-2 2.15.1
- jspdf 3.0.3
- React Icons 5.5.0

#### **Características de Diseño:**
- ✅ Paleta de colores: #2D82B5 (azul principal) + Blanco
- ✅ Gradientes en hero, cards, servicios, CTAs
- ✅ Animaciones scroll-based (parallax, scale, opacity)
- ✅ Componentes reutilizables (DateRangePicker, ProtectedRoute, AdminLayout)
- ✅ Badges de estado con colores semánticos
- ✅ Loading spinners y mensajes de error/éxito
- ✅ Responsive completo (mobile-first approach)

---

### 🟡 **EN PROGRESO (Backend + Frontend Integration - ~80%)**

#### **Estructura Base:**
- ✅ **Entities TypeORM completas:**
  - Room (habitaciones con tipo, capacidad, precio, amenidades)
  - Bed (camas individuales para habitaciones compartidas)
  - Reservation (reservas con código único, estados, pagos)
  - ContactForm (formularios de contacto con seguimiento)
  - Admin (usuario administrativo con credenciales)
- ✅ **Configuración de base de datos** PostgreSQL 16 con Docker
- ✅ **Middleware de seguridad:**
  - Helmet para headers seguros
  - CORS configurado
  - Rate limiting general
  - Rate limiting específico para login (máx 5 intentos)
- ✅ **Servicios básicos** implementados (Room, Reservation, ContactForm, Admin)
- ✅ **Controllers básicos** con validaciones
- ✅ **Rutas definidas** (públicas y admin protegidas)
- ✅ **Servicio de Mercado Pago** configurado
- ✅ **Generación de códigos de reserva** únicos (PASS-YYYYMMDD-XXXX)
- ✅ **Tests con Vitest** para servicios críticos
- ✅ **Servicio de Email (Resend) implementado:**
  - EmailService completo con templates HTML profesionales
  - Email de confirmación al huésped con detalles de reserva
  - Email de notificación al admin con datos completos
  - Integración en webhook de Mercado Pago
  - Variables de entorno configuradas (RESEND_API_KEY, EMAIL_FROM, EMAIL_ADMIN)

#### **Tecnologías Backend:**
- Express.js + TypeScript
- TypeORM
- PostgreSQL 16
- JWT (Access + Refresh Tokens)
- Zod para validaciones
- Vitest para testing
- Docker + Docker Compose

---

### ❌ **PENDIENTE - Crítico para Producción**

#### **1. Backend - Integración Completa**
- ❌ Conectar frontend con backend (transición de modo mock a API real)
- ❌ Testear todos los endpoints end-to-end
- ✅ **Webhooks de Mercado Pago** (completo, listo para testing):
  - ✅ Endpoint `/api/payments/webhook` configurado
  - ✅ Actualización automática de estado de reserva
  - ✅ Envío automático de emails en webhook
  - ✅ Validación de firma con HMAC-SHA256
  - ✅ Protección contra ataques (headers obligatorios)
  - ✅ Script de testing local (`test-webhook.js`)
  - ✅ Documentación completa de testing
  - ❌ Testing real con ambiente sandbox (requiere cuenta MP)
- ✅ **Sistema de emails con Resend:**
  - ✅ Email de confirmación al cliente tras reserva exitosa
  - ✅ Email de notificación al admin de nueva reserva
  - ✅ Templates HTML con branding del hostel
  - ❌ Email de recordatorio 24hs antes del check-in (opcional)
  - ❌ Testing con emails reales
- ❌ Validar flujo completo de pago real con Mercado Pago
- ❌ Implementar sistema de reembolsos (50% si >72hs)

#### **2. Contenido y Assets**
- ❌ **Logo definitivo** del hostel (actualmente placeholder)
- ❌ **Fotos profesionales:**
  - Habitaciones (mixta, femenina, privada)
  - Espacios comunes (cocina, terrazas, living)
  - Baños (los 3 diferentes)
  - Exterior del edificio
  - Detalles (cortinados, mesas rebatibles, bauleras)
- ❌ **Textos finales** de todas las secciones
- ❌ **Precios definitivos** (actualmente $35,000 base, $30,000 x 3+ noches)
- ❌ **Amenidades exactas** por habitación

#### **3. Panel Admin - Funciones Avanzadas**
- ❌ **Cancelación de reservas** con lógica de reembolso:
  - >72hs: reembolso 50% vía Mercado Pago
  - <72hs: sin reembolso
  - Actualización automática de disponibilidad
- ❌ **Calendario visual de ocupación** (vista mensual/semanal)
- ❌ **Gestión de formularios de contacto:**
  - Marcar como leído/respondido
  - Notas internas
  - Seguimiento de estado
- ❌ **Estadísticas reales:**
  - Cálculo de ocupación por período
  - Ingresos totales y proyectados
  - Gráficos de tendencias
- ❌ **Reportes exportables** (Excel/PDF):
  - Reservas por mes
  - Ingresos mensuales
  - Habitaciones más reservadas
- ❌ **Bloqueo manual** de fechas/habitaciones por mantenimiento
- ❌ **Historial de cambios** en reservas (auditoría)
- ❌ **Configuración del hostel** desde panel (horarios, políticas, precios)

#### **4. SEO y Performance**
- ❌ **Meta tags** específicos por página:
  - Title, description, keywords
  - Open Graph para Facebook/WhatsApp
  - Twitter Cards
- ❌ **Sitemap.xml** generado automáticamente
- ❌ **robots.txt** configurado
- ❌ **JSON-LD structured data** (Hotel schema)
- ❌ **Lazy loading** de imágenes pesadas
- ❌ **Code splitting** y optimización de bundle
- ❌ **Preload de recursos críticos**
- ❌ **Optimización de imágenes** (WebP, compresión)
- ❌ **Performance audit** con Lighthouse (target: >90)

#### **5. Deploy y DevOps**
- ❌ **Deploy del backend:**
  - Opciones: Railway / Render / DigitalOcean / Fly.io
  - Configurar variables de entorno
  - Health checks y monitoring
- ❌ **Deploy del frontend:**
  - Opciones: Vercel / Netlify / Cloudflare Pages
  - Configurar build settings
  - Preview deployments para PRs
- ❌ **Base de datos en producción:**
  - PostgreSQL managed (Supabase / Railway / Render)
  - Configurar backups automáticos diarios
  - Plan de restore
- ❌ **Dominio personalizado:**
  - Comprar dominio (sugerencia: passajero1900.com)
  - Configurar DNS records
  - SSL/HTTPS con certificado (Let's Encrypt)
- ❌ **CI/CD Pipeline:**
  - GitHub Actions para tests automáticos
  - Deploy automático en merge a main
  - Validación de TypeScript y linters
- ❌ **Monitoreo y logs:**
  - Sentry para errores de frontend/backend
  - Logs centralizados
  - Alertas por email/Slack

#### **6. Seguridad en Producción**
- ❌ **Credenciales admin reales** (cambiar de mock)
- ❌ **Variables de entorno** seguras en producción
- ❌ **Rate limiting ajustado** para tráfico real
- ❌ **HTTPS obligatorio** (redirect HTTP → HTTPS)
- ❌ **Logs de actividad admin:**
  - Todos los logins exitosos/fallidos
  - Cambios en reservas
  - Cambios en habitaciones
  - Notificación por email en login desde IP nueva
- ❌ **Backups automáticos** de base de datos
- ❌ **Plan de recuperación** ante desastres
- ❌ **Sanitización de inputs** en todos los endpoints
- ❌ **Validación de tokens JWT** renovación automática
- ❌ **CORS restringido** solo a dominios autorizados

#### **7. Legal y Políticas**
- ❌ **Página de Términos y Condiciones:**
  - Uso del sitio
  - Proceso de reserva
  - Responsabilidades del hostel y huéspedes
- ❌ **Política de Privacidad:**
  - Datos recopilados
  - Uso de la información
  - Cumplimiento GDPR (si aplica)
  - Derechos del usuario
- ❌ **Política de Cookies:**
  - Banner de consentimiento
  - Explicación de cookies usadas
- ❌ **Información de cancelación/reembolso** clara y visible:
  - >72hs: reembolso 50%
  - <72hs: sin reembolso
  - Proceso de cancelación (contacto vía WhatsApp/teléfono)

#### **8. Testing y QA**
- ❌ **Testing end-to-end** (Playwright/Cypress):
  - Flujo completo de reserva
  - Flujo de pago con Mercado Pago (modo sandbox)
  - Login admin y gestión
- ❌ **Testing de integración** backend:
  - Todos los endpoints con datos reales
  - Webhooks de Mercado Pago
  - Envío de emails
- ❌ **Testing de carga:**
  - Simular múltiples reservas simultáneas
  - Validar prevención de double-booking
- ❌ **Testing en dispositivos reales:**
  - iOS (Safari)
  - Android (Chrome)
  - Desktop (Chrome, Firefox, Edge)
- ❌ **Accesibilidad (a11y):**
  - Navegación por teclado
  - Screen readers
  - Contraste de colores WCAG AA

#### **9. Features Opcionales (Nice to Have)**
- ❌ **Multiidioma:**
  - Inglés (prioritario para turistas)
  - Portugués (turistas brasileños)
  - i18n con react-i18next
- ❌ **Blog/Noticias:**
  - CMS headless (Strapi/Contentful)
  - Artículos sobre La Plata, atracciones
- ❌ **Sistema de reviews/testimonios:**
  - Form para dejar opiniones
  - Moderación admin
  - Display en homepage
- ❌ **Galería expandida:**
  - Lightbox para ver fotos en grande
  - Carrousel interactivo
  - Filtros por habitación/espacio
- ❌ **Google Analytics:**
  - Tracking de conversiones
  - Funnel de reservas
  - Páginas más visitadas
- ❌ **Chat en vivo** (opcional, considerar Tawk.to o similar)
- ❌ **PWA (Progressive Web App):**
  - Instalable en móvil
  - Funcionalidad offline básica
  - Push notifications de ofertas
- ❌ **Sistema de promociones:**
  - Códigos de descuento
  - Ofertas especiales por temporada
  - Early bird discounts

---

## 🎯 PLAN DE ACCIÓN DETALLADO

### **Fase 1: Completar Backend (1-2 semanas)**

**Tareas:**
1. Terminar integración de todos los endpoints REST
2. Implementar servicio de emails con Resend:
   - Configurar cuenta y dominio verificado
   - Crear templates HTML profesionales
   - Testear envío de emails en desarrollo
3. Configurar y testear webhooks de Mercado Pago:
   - Endpoint POST /api/mercadopago/webhook
   - Validar firma de seguridad
   - Actualizar estado de reservas automáticamente
   - Manejar todos los estados (approved, rejected, pending, etc.)
4. Implementar lógica de reembolsos:
   - Calcular fecha límite (72hs antes check-in)
   - Integrar con API de refunds de Mercado Pago
   - Actualizar disponibilidad al cancelar
5. Testing exhaustivo:
   - Todos los endpoints con Postman/Insomnia
   - Flujo completo de reserva con pago real (modo test)
   - Webhooks con herramientas como ngrok
6. Preparar scripts de deploy y migrations

**Entregables:**
- ✅ Backend 100% funcional
- ✅ Emails enviándose correctamente
- ✅ Pagos confirmándose automáticamente
- ✅ Documentación de API (Swagger/OpenAPI)

---

### **Fase 1.5: Configuración de Resend para Emails (GUÍA COMPLETA)**

#### **Paso 1: Crear Cuenta en Resend**
1. Ir a [resend.com](https://resend.com)
2. Registrarse con el email del cliente: `passajero1900@gmail.com`
3. Verificar email de confirmación

#### **Paso 2: Obtener API Key**
1. Ir al Dashboard de Resend
2. Click en "API Keys" en el menú lateral
3. Click en "Create API Key"
4. Nombre sugerido: `PASSAJERO1900 Production`
5. Permisos: "Full Access" o "Sending access"
6. **COPIAR LA API KEY** (solo se muestra una vez)
7. Guardar en archivo seguro

#### **Paso 3: Configurar Variables de Entorno**
Agregar en `apps/backend/.env`:
```bash
# Resend (Email)
RESEND_API_KEY=re_TuApiKeyAqui123456789
EMAIL_FROM=onboarding@resend.dev  # Temporal para testing
EMAIL_ADMIN=passajero1900@gmail.com
```

#### **Paso 4: Testing con Email Temporal (Desarrollo)**
- Resend permite enviar hasta **100 emails gratis al mes** desde `onboarding@resend.dev`
- Esto es perfecto para testing local
- Los emails llegarán normalmente pero desde este dominio temporal

#### **Paso 5: Verificar Dominio Propio (Producción)**
**IMPORTANTE:** Para producción, necesitas un dominio verificado.

1. **Comprar dominio** (ej: `passajero1900.com`) en Namecheap/GoDaddy
2. **En Resend Dashboard:**
   - Click en "Domains"
   - Click en "Add Domain"
   - Ingresar tu dominio: `passajero1900.com`
3. **Configurar DNS Records:**
   Resend te dará 3 registros DNS para agregar:
   ```
   TXT  _resend.passajero1900.com  → "resend-verification=xxxx"
   MX   passajero1900.com          → feedback-smtp.us-east-1.amazonses.com (Priority 10)
   TXT  passajero1900.com          → "v=spf1 include:amazonses.com ~all"
   ```
4. **Agregar records en tu proveedor de dominio:**
   - Namecheap: Advanced DNS → Add New Record
   - GoDaddy: DNS Management → Add Record
5. **Verificar en Resend:**
   - Click en "Verify Domain"
   - Esperar propagación (puede tardar hasta 48hs, usualmente 10-30min)
6. **Actualizar `.env` en producción:**
   ```bash
   EMAIL_FROM=reservas@passajero1900.com
   ```

#### **Paso 6: Testear Envío de Emails**
En desarrollo local, probar con:
```bash
cd apps/backend
pnpm run dev
```

Hacer una reserva de prueba y verificar:
- ✅ Email de confirmación llega al huésped
- ✅ Email de notificación llega al admin
- ✅ Templates HTML se ven correctamente
- ✅ No van a spam (revisar carpeta de spam también)

#### **Límites del Plan Gratuito de Resend:**
- 100 emails/mes desde `onboarding@resend.dev`
- 3,000 emails/mes con dominio verificado
- Perfecto para pre-lanzamiento y primeros meses
- Plan Paid: $20/mes = 50,000 emails

#### **Troubleshooting:**
**Emails no llegan:**
- ✅ Verificar RESEND_API_KEY está correcta
- ✅ Verificar EMAIL_FROM es válido
- ✅ Revisar logs del backend (consola)
- ✅ Revisar Dashboard de Resend → "Emails" para ver status
- ✅ Revisar carpeta de spam

**Dominio no verifica:**
- ✅ Esperar hasta 48hs de propagación DNS
- ✅ Usar herramientas: `nslookup` o [whatsmydns.net](https://whatsmydns.net)
- ✅ Verificar records exactamente como los da Resend
- ✅ Contactar soporte de Resend (muy responsivos)

**Emails van a spam:**
- ✅ Asegurar dominio verificado (no usar onboarding@resend.dev en prod)
- ✅ Agregar DKIM record (Resend lo provee automáticamente)
- ✅ Evitar palabras spam ("GRATIS", "URGENTE", etc.)
- ✅ Incluir link de "unsubscribe" (opcional pero mejora deliverability)

---

### **Fase 2: Contenido y Assets (Paralelo a Fase 1)**

**Tareas:**
1. **Solicitar al cliente:**
   - Logo en formato SVG y PNG (alta resolución)
   - Sesión de fotos profesional del hostel:
     - Habitaciones: mixta, femenina, privada (múltiples ángulos)
     - Espacios comunes: cocina, living, terrazas
     - Baños: los 3 diferentes
     - Exterior del edificio
     - Detalles: camas con cortinas, mesas, bauleras
   - Textos definitivos para About, servicios, políticas
   - Confirmación de precios finales
   - URLs de redes sociales (Instagram, Facebook si existen)
2. **Procesamiento de assets:**
   - Optimizar imágenes (compresión, WebP)
   - Crear versiones responsive (thumbnail, medium, large)
   - Organizar en carpeta assets del frontend
3. **Redacción de contenido legal:**
   - Términos y condiciones (puede usar templates y adaptar)
   - Política de privacidad
   - Política de cookies

**Entregables:**
- ✅ Carpeta completa de assets optimizados
- ✅ Textos finales en formato JSON/MD
- ✅ Documentos legales aprobados por cliente

---

### **Fase 3: Integración Frontend-Backend (3-5 días)**

**Tareas:**
1. Cambiar servicios de frontend de mock a API real:
   - Actualizar `roomService.ts` para llamar endpoints
   - Actualizar `reservationService.ts` con Mercado Pago real
   - Actualizar `authService.ts` con JWT del backend
   - Actualizar `adminService.ts` con endpoints admin
2. Configurar variables de entorno:
   - `VITE_API_URL` apuntando al backend
   - `VITE_MP_PUBLIC_KEY` con clave real de Mercado Pago
3. Manejar estados de loading y errores:
   - Spinners mientras carga data del backend
   - Mensajes de error claros si falla la conexión
   - Retry logic para requests fallidos
4. Testing de integración:
   - Flujo completo de reserva end-to-end
   - Login admin y gestión de reservas
   - Verificar emails se envían correctamente

**Entregables:**
- ✅ Frontend conectado 100% con backend
- ✅ Modo mock removido (opcional: dejar como fallback)
- ✅ Flujo completo funcionando localmente

---

### **Fase 4: SEO y Optimización (3-5 días)**

**Tareas:**
1. Agregar meta tags en todas las páginas:
   - Usar `react-helmet-async` o `@vite-plugin-react-pages`
   - Title único por página
   - Description optimizada para SEO
   - Keywords relevantes
   - Open Graph tags (og:image, og:title, etc.)
2. Crear sitemap.xml:
   - Generar automáticamente o manualmente
   - Incluir todas las páginas públicas
   - Configurar frecuencia de actualización
3. Crear robots.txt:
   - Permitir todos los bots en producción
   - Disallow /admin-passajero1900
4. Implementar JSON-LD structured data:
   - Schema.org tipo "Hotel"
   - Información de habitaciones
   - Reviews (cuando existan)
5. Optimizar performance:
   - Lazy loading de imágenes con `loading="lazy"`
   - Code splitting con React.lazy()
   - Preload de recursos críticos
   - Minificación de CSS/JS
6. Audit con Lighthouse:
   - Performance > 90
   - Accessibility > 90
   - Best Practices > 90
   - SEO > 90

**Entregables:**
- ✅ Score de Lighthouse >90 en todas las categorías
- ✅ Sitemap y robots.txt configurados
- ✅ Meta tags completos en todas las páginas

---

### **Fase 5: Deploy en Producción (1 semana)**

**Tareas:**
1. **Deploy de Base de Datos:**
   - Opción A: PostgreSQL en Railway (recomendado, fácil)
   - Opción B: Supabase (gratis hasta cierto límite)
   - Opción C: Render (plan gratuito limitado)
   - Ejecutar migrations en producción
   - Seed inicial con habitaciones y camas
   - Configurar backups automáticos diarios
2. **Deploy de Backend:**
   - Railway / Render / Fly.io (recomendación: Railway)
   - Configurar variables de entorno en dashboard
   - Configurar health check endpoint
   - Testear que todos los endpoints funcionan
3. **Deploy de Frontend:**
   - Vercel (recomendado) o Netlify
   - Conectar repo de GitHub
   - Configurar variables de entorno (VITE_API_URL)
   - Configurar redirects para SPA
   - Preview deployments automáticos en PRs
4. **Configurar Dominio:**
   - Comprar dominio en Namecheap/GoDaddy (ej: passajero1900.com)
   - Configurar DNS records:
     - A record apuntando a frontend
     - CNAME para www
   - Configurar SSL (automático en Vercel/Netlify)
   - Forzar HTTPS (redirect)
5. **Configurar CI/CD:**
   - GitHub Actions workflow para tests
   - Deploy automático en push a main
   - Validación de TypeScript y linters en PRs
6. **Configurar Monitoreo:**
   - Sentry para frontend (errores de JS)
   - Sentry para backend (excepciones)
   - Uptime monitoring (UptimeRobot gratis)
   - Logs centralizados (opcional: LogRocket)

**Entregables:**
- ✅ Sitio en producción accesible vía dominio
- ✅ HTTPS funcionando correctamente
- ✅ Backend respondiendo en subdomain (api.passajero1900.com)
- ✅ Monitoreo activo con alertas

---

### **Fase 6: Testing en Producción (3-5 días)**

**Tareas:**
1. **Crear reserva de prueba real:**
   - Usar tarjetas de test de Mercado Pago
   - Verificar email de confirmación llega
   - Verificar admin recibe notificación
   - Verificar reserva aparece en panel admin
2. **Testing de cancelación:**
   - Crear reserva >72hs en el futuro
   - Cancelar desde panel admin
   - Verificar reembolso se procesa
   - Verificar disponibilidad se actualiza
3. **Testing cross-browser:**
   - Chrome, Firefox, Safari, Edge
   - Modo mobile en todos los navegadores
4. **Testing en dispositivos reales:**
   - iPhone (Safari)
   - Android (Chrome)
   - Tablet (iPad, Android)
5. **Testing de carga:**
   - Simular 10-20 usuarios simultáneos
   - Verificar no hay double-booking
   - Verificar performance no degrada
6. **Testing de emails:**
   - Verificar no van a spam
   - Verificar formato en Gmail, Outlook, etc.
   - Verificar links funcionan

**Entregables:**
- ✅ Lista de bugs encontrados y resueltos
- ✅ Documentación de casos de prueba
- ✅ Signoff del cliente

---

### **Fase 7: Legal y Políticas (2-3 días)**

**Tareas:**
1. Crear página de Términos y Condiciones:
   - Usar template y adaptar
   - Incluir políticas de reserva y cancelación
   - Incluir responsabilidades y limitaciones
2. Crear página de Política de Privacidad:
   - Qué datos se recopilan
   - Cómo se usan
   - Derechos del usuario
   - Cumplimiento con leyes locales
3. Crear página de Política de Cookies:
   - Banner de consentimiento (react-cookie-consent)
   - Explicar cookies usadas
4. Agregar links en Footer a todas las políticas
5. Revisión legal (opcional pero recomendado)

**Entregables:**
- ✅ 3 páginas legales publicadas
- ✅ Banner de cookies funcionando
- ✅ Links accesibles desde Footer

---

### **Fase 8: Soft Launch (1 semana)**

**Tareas:**
1. **Lanzamiento suave:**
   - Compartir con amigos/familia para testing
   - Monitorear errores en Sentry
   - Recopilar feedback inicial
2. **Ajustes basados en feedback:**
   - Corregir bugs reportados
   - Mejorar UX donde sea confuso
   - Optimizar flujos
3. **Preparar para lanzamiento público:**
   - Post en redes sociales
   - Email a lista de contactos
   - Compartir en grupos de Facebook de La Plata
4. **Submit a Google Search Console:**
   - Verificar propiedad del dominio
   - Enviar sitemap
   - Monitorear indexación
5. **Configurar Google My Business:**
   - Crear perfil del hostel
   - Agregar fotos, horarios, ubicación
   - Link al sitio web

**Entregables:**
- ✅ Sitio estable sin errores críticos
- ✅ Primeras reservas reales completadas
- ✅ Feedback positivo de usuarios iniciales

---

## 💰 COSTOS ESTIMADOS PARA PRODUCCIÓN

### **Hosting y Servicios (Mensual):**
- **Backend:** Railway Starter Plan ~$5-10/mes (500MB RAM)
- **Frontend:** Vercel Pro ~$0/mes (plan gratuito suficiente inicialmente)
- **Base de datos:** Incluida con Railway ~$0/mes adicional
- **Dominio:** ~$1/mes ($12/año en promedio)
- **Emails:** Resend Free Tier 3,000 emails/mes ~$0 (luego $20/mes si excede)
- **Monitoreo:** Sentry Developer Plan ~$0/mes (5k errores/mes gratis)
- **Uptime monitoring:** UptimeRobot ~$0/mes (50 monitores gratis)

**Total estimado inicial: $6-11/mes** ✅ Muy económico

### **Costos Únicos:**
- Dominio primer año: ~$10-15
- Fotos profesionales: ~$50-200 (opcional, puede usar cámara propia)
- Revisión legal de políticas: ~$100-500 (opcional)

### **Escalabilidad futura:**
Si el tráfico crece significativamente:
- Railway Pro: ~$20/mes (más recursos)
- Vercel Pro: ~$20/mes (si necesita más builds)
- Resend Pro: ~$20/mes (más emails)
- CDN para imágenes: Cloudinary ~$0-50/mes

---

## 📈 MÉTRICAS DE ÉXITO POST-LAUNCH

### **Semana 1:**
- [ ] Sitio carga en <3 segundos en 4G
- [ ] 0 errores críticos en Sentry
- [ ] Primera reserva real completada con éxito
- [ ] Email de confirmación recibido correctamente
- [ ] Panel admin accesible 24/7 sin downtime

### **Mes 1:**
- [ ] 10+ reservas completadas
- [ ] Tasa de conversión >5% (visitantes → reservas)
- [ ] 0 double-bookings
- [ ] Score de Lighthouse >85 en todas las categorías
- [ ] Al menos 50 visitantes únicos/día

### **Mes 3:**
- [ ] 50+ reservas completadas
- [ ] Posición en Google "hostel la plata" <50
- [ ] Aparece en Google Maps
- [ ] Reviews positivas (si se implementa sistema)
- [ ] 80%+ de reservas vienen del sitio web (vs llamadas/WhatsApp)

### **Mes 6:**
- [ ] 150+ reservas completadas
- [ ] Tasa de ocupación >60%
- [ ] Sistema funcionando sin intervención técnica
- [ ] Cliente satisfecho y autónomo en el manejo del panel admin

---

## ⚠️ RIESGOS Y MITIGACIONES

### **Riesgo 1: Double-Booking (Dos personas reservan la misma cama)**
**Probabilidad:** Media  
**Impacto:** Alto  
**Mitigación:**
- Transacciones de base de datos (ACID)
- Lock optimista en tabla de camas
- Verificación de disponibilidad justo antes de confirmar pago
- Testing de concurrencia exhaustivo

### **Riesgo 2: Fallos en Webhook de Mercado Pago**
**Probabilidad:** Baja  
**Impacto:** Alto  
**Mitigación:**
- Retry logic con exponential backoff
- Logs detallados de todos los webhooks
- Alertas automáticas si webhook falla >3 veces
- Endpoint manual para verificar estado de pago

### **Riesgo 3: Emails no llegan (van a spam)**
**Probabilidad:** Media  
**Impacto:** Medio  
**Mitigación:**
- Configurar SPF, DKIM, DMARC en dominio
- Usar servicio confiable (Resend)
- Templates HTML bien formateados
- Evitar palabras que disparan filtros de spam
- Testing en múltiples proveedores (Gmail, Outlook, etc.)

### **Riesgo 4: Ataque DDoS o bots maliciosos**
**Probabilidad:** Baja (tráfico inicial bajo)  
**Impacto:** Medio  
**Mitigación:**
- Rate limiting en todos los endpoints
- Cloudflare como proxy (plan gratuito)
- Captcha en formularios críticos (opcional)
- Monitoreo de tráfico anómalo

### **Riesgo 5: Pérdida de datos (base de datos corrupta)**
**Probabilidad:** Muy baja  
**Impacto:** Catastrófico  
**Mitigación:**
- Backups automáticos diarios en Railway/Supabase
- Backups manuales semanales descargados localmente
- Plan de restore documentado y testeado
- Replicación de base de datos (opcional, para el futuro)

### **Riesgo 6: Cliente no tiene contenido listo (fotos, textos)**
**Probabilidad:** Alta  
**Impacto:** Medio (retrasa lanzamiento)  
**Mitigación:**
- Usar placeholders profesionales temporalmente
- Gradientes y colores como backup visual
- Lanzar con contenido mínimo y actualizar después
- Ayudar al cliente con redacción si es necesario

---

## 🎓 LECCIONES APRENDIDAS Y MEJORES PRÁCTICAS

### **Frontend:**
- ✅ **Modo mock fue excelente decisión** - Permitió desarrollar sin esperar backend
- ✅ **TypeScript salva vidas** - Evitó muchos bugs en tiempo de desarrollo
- ✅ **Componentes pequeños y reutilizables** - Facilita mantenimiento
- ✅ **Validación con Zod** - Mantiene tipos sincronizados con validaciones
- ✅ **React Hook Form** - Mejor performance que Formik, menos re-renders

### **Backend:**
- ✅ **TypeORM es poderoso** - Queries complejas fáciles de escribir
- ✅ **Entities bien diseñadas desde el inicio** - Evita migrations complicadas después
- ✅ **Rate limiting desde el día 1** - Previene abusos incluso con poco tráfico
- ✅ **Tests unitarios importantes** - Dan confianza para refactorizar

### **General:**
- ✅ **Documentación clara** - Este blueprint facilitó enormemente el desarrollo
- ✅ **Git desde el inicio** - Permite volver atrás si algo sale mal
- ✅ **Separación frontend/backend** - Deploy independiente, escalabilidad
- ✅ **Monorepo con Turborepo** - Compartir tipos y configs fácilmente

---

## 🚀 RESUMEN EJECUTIVO

### **Estado Actual:**
El proyecto PASSAJERO1900 está en fase avanzada de desarrollo (~80% completo). El **frontend está 100% funcional** con todas las características implementadas, incluyendo flujo de reserva completo, panel administrativo, optimización mobile, y características modernas de UX (búsqueda de países, input de teléfono internacional, generación de PDFs).

El **backend está ~60% completo** con la estructura base sólida, entities, servicios, y configuración de seguridad. Falta principalmente la integración final con Mercado Pago, sistema de emails, y testing exhaustivo.

### **Próximos Pasos Críticos:**
1. **Completar backend** (1-2 semanas) - Emails, webhooks, testing
2. **Obtener contenido del cliente** (paralelo) - Logo, fotos, textos
3. **Integrar frontend-backend** (3-5 días) - Conectar APIs
4. **Deploy en producción** (1 semana) - Railway + Vercel + dominio
5. **Testing y ajustes** (1 semana) - QA exhaustivo
6. **Soft launch** (1 semana) - Lanzamiento controlado

### **Tiempo Total Estimado para Producción:**
**3-4 semanas** con trabajo dedicado, asumiendo que el cliente tiene el contenido listo.

### **Inversión Mensual en Producción:**
**$6-11/mes** inicialmente, escalable según crecimiento del tráfico.

### **Factor de Éxito Clave:**
El sitio tiene todas las bases para ser exitoso: diseño moderno, UX intuitiva, sistema de pagos robusto, panel admin completo. El factor crítico será la calidad del contenido (fotos, textos) y el SEO para atraer tráfico orgánico.

---

**Documento vivo - Última actualización:** 3 de noviembre de 2025  
**Progreso:** Frontend 100% ✅ | Backend 60% 🟡 | Deploy 0% ❌  
**Próximo milestone:** Completar backend e integrar con frontend
