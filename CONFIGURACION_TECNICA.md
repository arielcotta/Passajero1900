# ⚙️ CONFIGURACIÓN TÉCNICA - PASSAJERO1900

**Última actualización:** 2 de noviembre de 2025  
**Estado:** ✅ Listo para desarrollo

---

## 🏗️ STACK TECNOLÓGICO COMPLETO

### **Backend**

```
Framework:        Express.js
Lenguaje:         TypeScript
ORM:              TypeORM
Base de Datos:    PostgreSQL 16 (Docker)
Autenticación:    JWT (Access + Refresh Tokens) - Solo Admin
Validación:       Zod
Email:            Resend
Pagos:            Mercado Pago SDK + Webhooks
Seguridad:        Helmet + CORS + express-rate-limit
Testing:          Vitest
Logs:             Winston (opcional)
Error Tracking:   Sentry (opcional)
```

### **Frontend**

```
Framework:        React 18
Lenguaje:         TypeScript
Build Tool:       Vite
Styling:          TailwindCSS
Componentes UI:   shadcn/ui
Iconos:           React Icons (react-icons) - NO Lucide
Routing:          React Router DOM v6
Forms:            React Hook Form + Zod
HTTP Client:      Fetch API nativo (o Axios si es necesario)
State:            Context API (sin Redux/Zustand)
PWA:              vite-plugin-pwa (opcional fase 2)
```

### **Monorepo y DevOps**

```
Monorepo:         Turborepo
Package Manager:  pnpm v9+
Node:             v20+
Containerización: Docker + Docker Compose
Git:              GitHub
Branch:           dev (actual)
```

---

## 📁 ARQUITECTURA DEL PROYECTO

```
passajero-1900/
│
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── index.ts                    # Entry point
│   │   │   │
│   │   │   ├── config/
│   │   │   │   ├── database.ts             # TypeORM config
│   │   │   │   ├── env.ts                  # Variables de entorno
│   │   │   │   └── mercadopago.ts          # MP config
│   │   │   │
│   │   │   ├── entities/                   # TypeORM Entities
│   │   │   │   ├── Room.ts
│   │   │   │   ├── Bed.ts
│   │   │   │   ├── Reservation.ts
│   │   │   │   ├── Admin.ts
│   │   │   │   └── ContactForm.ts
│   │   │   │
│   │   │   ├── routes/                     # Express Routes
│   │   │   │   ├── index.ts                # Route aggregator
│   │   │   │   ├── rooms.routes.ts         # GET /api/rooms (público)
│   │   │   │   ├── reservations.routes.ts  # POST /api/reservations (público)
│   │   │   │   ├── contact.routes.ts       # POST /api/contact (público)
│   │   │   │   ├── webhooks.routes.ts      # POST /api/webhooks/mp (MP)
│   │   │   │   └── admin/
│   │   │   │       ├── auth.routes.ts      # POST /api/admin/login
│   │   │   │       ├── rooms.routes.ts     # CRUD /api/admin/rooms
│   │   │   │       └── reservations.routes.ts
│   │   │   │
│   │   │   ├── controllers/                # Request handlers
│   │   │   │   ├── rooms.controller.ts
│   │   │   │   ├── reservations.controller.ts
│   │   │   │   ├── webhooks.controller.ts
│   │   │   │   └── admin/
│   │   │   │       ├── auth.controller.ts
│   │   │   │       └── ...
│   │   │   │
│   │   │   ├── services/                   # Business logic
│   │   │   │   ├── room.service.ts
│   │   │   │   ├── reservation.service.ts
│   │   │   │   ├── payment.service.ts      # Mercado Pago integration
│   │   │   │   ├── email.service.ts        # Resend integration
│   │   │   │   └── auth.service.ts
│   │   │   │
│   │   │   ├── middleware/
│   │   │   │   ├── auth.middleware.ts      # JWT validation
│   │   │   │   ├── errorHandler.ts
│   │   │   │   └── validation.middleware.ts
│   │   │   │
│   │   │   ├── utils/
│   │   │   │   ├── jwt.utils.ts
│   │   │   │   ├── validators.ts           # Zod schemas
│   │   │   │   ├── dateHelpers.ts
│   │   │   │   └── reservationCode.ts      # Generar PASS-YYYYMMDD-XXXX
│   │   │   │
│   │   │   └── types/
│   │   │       └── express.d.ts            # Type extensions
│   │   │
│   │   ├── tests/                          # Vitest tests
│   │   │   ├── unit/
│   │   │   └── integration/
│   │   │
│   │   ├── .env.example
│   │   ├── .gitignore
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   │
│   └── frontend/
│       ├── public/
│       │   ├── logo.svg                    # Tu logo aquí
│       │   └── favicon.ico
│       │
│       ├── src/
│       │   ├── main.tsx                    # Entry point
│       │   ├── App.tsx
│       │   │
│       │   ├── pages/                      # Páginas principales
│       │   │   ├── Home.tsx
│       │   │   ├── Rooms.tsx
│       │   │   ├── About.tsx
│       │   │   ├── Contact.tsx
│       │   │   ├── BookingFlow.tsx         # Flujo de reserva
│       │   │   ├── ReservationConfirmation.tsx
│       │   │   ├── ViewReservation.tsx
│       │   │   └── admin/
│       │   │       ├── Login.tsx
│       │   │       ├── Dashboard.tsx
│       │   │       ├── Rooms.tsx
│       │   │       └── Reservations.tsx
│       │   │
│       │   ├── components/
│       │   │   ├── layout/
│       │   │   │   ├── Navbar.tsx
│       │   │   │   ├── Footer.tsx
│       │   │   │   └── WhatsAppWidget.tsx  # Flotante
│       │   │   │
│       │   │   ├── booking/                # Componentes de reserva
│       │   │   │   ├── DateSelector.tsx
│       │   │   │   ├── RoomCard.tsx
│       │   │   │   ├── BookingSummary.tsx  # Sidebar derecho
│       │   │   │   ├── GuestForm.tsx
│       │   │   │   └── PaymentButton.tsx
│       │   │   │
│       │   │   ├── rooms/
│       │   │   │   ├── RoomGallery.tsx
│       │   │   │   └── RoomDetails.tsx
│       │   │   │
│       │   │   ├── admin/
│       │   │   │   ├── ReservationTable.tsx
│       │   │   │   ├── RoomForm.tsx
│       │   │   │   └── Calendar.tsx
│       │   │   │
│       │   │   └── ui/                     # shadcn/ui
│       │   │       ├── button.tsx
│       │   │       ├── input.tsx
│       │   │       ├── card.tsx
│       │   │       ├── dialog.tsx
│       │   │       └── ...
│       │   │
│       │   ├── hooks/
│       │   │   ├── useAuth.ts
│       │   │   ├── useBooking.ts
│       │   │   └── useReservations.ts
│       │   │
│       │   ├── context/
│       │   │   ├── AuthContext.tsx
│       │   │   └── BookingContext.tsx
│       │   │
│       │   ├── services/
│       │   │   ├── api.ts                  # Axios/Fetch config
│       │   │   ├── rooms.service.ts
│       │   │   ├── reservations.service.ts
│       │   │   └── auth.service.ts
│       │   │
│       │   ├── utils/
│       │   │   ├── formatters.ts           # Fechas, precios
│       │   │   ├── validators.ts
│       │   │   └── constants.ts
│       │   │
│       │   ├── types/
│       │   │   └── index.ts                # TypeScript types
│       │   │
│       │   └── styles/
│       │       └── globals.css             # Tailwind + custom
│       │
│       ├── index.html
│       ├── components.json                 # shadcn config
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── packages/                               # Shared packages (opcional)
│   ├── typescript-config/
│   │   ├── base.json
│   │   └── package.json
│   │
│   └── eslint-config-custom/
│       ├── index.js
│       └── package.json
│
├── docker/
│   └── postgres/
│       ├── init.sql                        # SQL inicial (crear tablas ejemplo)
│       └── init.sh                         # Scripts de inicialización
│
├── docker-compose.yml                      # PostgreSQL container
├── package.json                            # Root package
├── pnpm-workspace.yaml                     # pnpm workspaces config
├── turbo.json                              # Turborepo config
├── .gitignore
├── .env.example
├── BLUEPRINT.md
├── FLUJO_RESERVA.md
├── CONFIGURACION_TECNICA.md                # Este archivo
└── README.md
```

---

## 🎯 CONVENCIONES DE CÓDIGO

### **Naming Conventions**

```typescript
// Archivos
room.service.ts          // Servicios en singular
rooms.routes.ts          // Routes en plural
rooms.controller.ts      // Controllers en plural
Room.ts                  // Entities en singular, PascalCase

// Variables y funciones
const userEmail = "..."  // camelCase
function createReservation() {}

// Constantes
const MAX_NIGHTS = 365   // UPPER_SNAKE_CASE

// Componentes React
<RoomCard />             // PascalCase
<BookingSummary />

// Archivos CSS/SCSS
globals.css              // lowercase con guiones
button.module.css
```

---

## 🌐 ESTRUCTURA DE ENDPOINTS

### **Públicos (sin autenticación)**

```
GET    /api/rooms
GET    /api/rooms/:id
GET    /api/rooms/availability?checkIn=YYYY-MM-DD&checkOut=YYYY-MM-DD
POST   /api/reservations/check-availability
POST   /api/reservations
GET    /api/reservations/:code
POST   /api/contact
POST   /api/webhooks/mercadopago
```

### **Admin (con JWT)**

```
POST   /api/admin/auth/login
POST   /api/admin/auth/refresh
POST   /api/admin/auth/logout

GET    /api/admin/rooms
POST   /api/admin/rooms
PUT    /api/admin/rooms/:id
DELETE /api/admin/rooms/:id

GET    /api/admin/reservations
GET    /api/admin/reservations/:id
PUT    /api/admin/reservations/:id
DELETE /api/admin/reservations/:id
POST   /api/admin/reservations/:id/complete

GET    /api/admin/contacts
PUT    /api/admin/contacts/:id
```

---

## 🔐 VARIABLES DE ENTORNO

### **Backend `.env`**

```bash
# Entorno
NODE_ENV=development
PORT=4000

# Base de Datos
DB_HOST=localhost
DB_PORT=8631
DB_USER=passajero
DB_PASSWORD=passajero123
DB_NAME=passajero_db

# JWT
JWT_ACCESS_SECRET=tu-secret-super-seguro-de-al-menos-32-caracteres
JWT_REFRESH_SECRET=otro-secret-super-seguro-diferente-32-chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Admin (Usuario único hardcodeado)
ADMIN_EMAIL=passajero1900@gmail.com
ADMIN_PASSWORD=$2b$10$hashedPasswordAqui  # Usar bcrypt hash
ADMIN_NAME=Alejandra Bollón

# Mercado Pago
MP_ACCESS_TOKEN=TEST-1234567890-110222-abcdefg
MP_PUBLIC_KEY=TEST-abc123-def456-ghi789
MP_WEBHOOK_SECRET=tu-webhook-secret-de-mp

# Resend (Email)
RESEND_API_KEY=re_123456789
EMAIL_FROM=reservas@passajero1900.com
EMAIL_ADMIN=passajero1900@gmail.com

# Frontend URL (para redirects)
FRONTEND_URL=http://localhost:5173

# Seguridad
RATE_LIMIT_WINDOW_MS=900000  # 15 minutos
RATE_LIMIT_MAX_REQUESTS=100
LOGIN_RATE_LIMIT_MAX=5       # Max 5 intentos de login

# CORS
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Opcional: Sentry
SENTRY_DSN=https://...

# Opcional: Logs
LOG_LEVEL=info
```

### **Frontend `.env`**

```bash
VITE_API_URL=http://localhost:4000/api
VITE_MP_PUBLIC_KEY=TEST-abc123-def456-ghi789
VITE_ADMIN_PATH=/admin-passajero1900
```

---

## 🔄 FLUJO DE DATOS - RESERVA COMPLETO

```
┌─────────────────────────────────────────────────────────────────┐
│                         FLUJO DE RESERVA                        │
└─────────────────────────────────────────────────────────────────┘

1. USUARIO selecciona fechas
   Frontend: Guarda en estado local
   ↓
   POST /api/rooms/availability
   Backend: Query TypeORM
   ↓
   Return: Habitaciones/camas disponibles con precios

2. USUARIO selecciona cama y completa formulario
   Frontend: Guarda en BookingContext (React Context)

3. USUARIO click en "PAGAR CON MERCADO PAGO"
   ↓
   POST /api/reservations/prepare
   {
     roomId: "uuid",
     bedId: "uuid",
     checkIn: "2025-11-03",
     checkOut: "2025-11-07",
     guest: { firstName, lastName, email, phone, country, document }
   }
   ↓
   Backend:
   ├─> Valida disponibilidad (última vez antes del pago)
   ├─> Calcula precios:
   │   const nights = calculateNights(checkIn, checkOut);
   │   const pricePerNight = room.pricePerNight;
   │   const total = nights * pricePerNight;
   │   const payOnline = nights <= 2 ? total : Math.round(total * 0.30);
   │   const payAtHostel = total - payOnline;
   ├─> Crea Preference en Mercado Pago:
   │   {
   │     items: [{
   │       title: "Reserva PASSAJERO1900 - Habitación X - Cama Y",
   │       unit_price: payOnline,
   │       quantity: 1
   │     }],
   │     back_urls: {
   │       success: "https://passajero1900.com/reserva/confirmacion",
   │       failure: "https://passajero1900.com/reserva/error",
   │       pending: "https://passajero1900.com/reserva/pendiente"
   │     },
   │     notification_url: "https://api.passajero1900.com/webhooks/mp",
   │     metadata: {
   │       roomId, bedId, checkIn, checkOut, guest
   │     }
   │   }
   └─> Return: { preferenceId, initPoint (URL de MP) }

4. USUARIO redirigido a Mercado Pago
   window.location.href = initPoint
   ↓
   Usuario completa pago en checkout de MP

5. MERCADO PAGO envía webhook
   POST /api/webhooks/mercadopago
   {
     type: "payment",
     action: "payment.created",
     data: { id: "123456789" }
   }
   ↓
   Backend:
   ├─> Valida firma del webhook (MP signature)
   ├─> GET payment details desde API de MP
   ├─> Verifica status === "approved"
   ├─> Extrae metadata con datos de la reserva
   ├─> Crea Reservation en DB:
   │   {
   │     code: generateCode(),  // "PASS-20251103-AB12"
   │     roomId, bedId,
   │     guestFirstName, guestLastName, guestEmail, ...
   │     checkInDate, checkOutDate, numberOfNights,
   │     totalAmount, amountPaidOnline, amountPendingAtHostel,
   │     mercadoPagoPaymentId,
   │     status: "confirmed"
   │   }
   ├─> Envía email confirmación al cliente (Resend):
   │   To: guestEmail
   │   Subject: "✅ Reserva confirmada - PASS-20251103-AB12"
   │   Body: HTML template con detalles
   ├─> Envía email notificación al admin:
   │   To: passajero1900@gmail.com
   │   Subject: "🔔 Nueva reserva: PASS-20251103-AB12"
   │   Body: Resumen + link al panel admin
   └─> Return: 200 OK

6. MERCADO PAGO redirige al usuario
   Browser: Redirige a back_urls.success
   ↓
   GET /reserva/confirmacion?payment_id=123456789
   ↓
   Frontend:
   ├─> Extrae payment_id de query params
   ├─> GET /api/reservations/by-payment/:paymentId
   ├─> Backend busca reserva por mercadoPagoPaymentId
   └─> Muestra página de confirmación con código

7. USUARIO ve su reserva
   Página: /reserva/confirmacion/:code
   ├─> Muestra todos los detalles
   ├─> Botón "Descargar PDF"
   ├─> Botón "Imprimir"
   └─> Botón "WhatsApp al hostel"
```

---

## 🗄️ SCHEMA DE BASE DE DATOS

### **TypeORM Entities**

```typescript
// Room.ts
@Entity("rooms")
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({
    type: "enum",
    enum: ["shared_mixed", "shared_female", "private"],
  })
  type: string;

  @Column({ type: "int" })
  capacity: number;

  @Column({ type: "int", name: "price_per_night" })
  pricePerNight: number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "jsonb", default: [] })
  amenities: string[];

  @Column({ type: "jsonb", default: [] })
  images: string[];

  @Column({ type: "boolean", default: true, name: "is_active" })
  isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Bed, (bed) => bed.room)
  beds: Bed[];

  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservations: Reservation[];
}

// Bed.ts
@Entity("beds")
export class Bed {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Room, (room) => room.beds)
  @JoinColumn({ name: "room_id" })
  room: Room;

  @Column({ type: "int", name: "bed_number" })
  bedNumber: number;

  @Column({ type: "boolean", default: true, name: "is_active" })
  isActive: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.bed)
  reservations: Reservation[];
}

// Reservation.ts
@Entity("reservations")
export class Reservation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50, unique: true })
  code: string;

  @ManyToOne(() => Room, (room) => room.reservations)
  @JoinColumn({ name: "room_id" })
  room: Room;

  @ManyToOne(() => Bed, (bed) => bed.reservations, { nullable: true })
  @JoinColumn({ name: "bed_id" })
  bed: Bed;

  @Column({ length: 100, name: "guest_first_name" })
  guestFirstName: string;

  @Column({ length: 100, name: "guest_last_name" })
  guestLastName: string;

  @Column({ length: 255, name: "guest_email" })
  guestEmail: string;

  @Column({ length: 50, name: "guest_phone" })
  guestPhone: string;

  @Column({ length: 100, name: "guest_country" })
  guestCountry: string;

  @Column({ length: 50, nullable: true, name: "guest_document" })
  guestDocument: string;

  @Column({ type: "date", name: "check_in_date" })
  checkInDate: Date;

  @Column({ type: "date", name: "check_out_date" })
  checkOutDate: Date;

  @Column({ type: "int", name: "number_of_nights" })
  numberOfNights: number;

  @Column({ type: "int", name: "price_per_night" })
  pricePerNight: number;

  @Column({ type: "int", name: "total_amount" })
  totalAmount: number;

  @Column({ type: "int", name: "amount_paid_online" })
  amountPaidOnline: number;

  @Column({ type: "int", name: "amount_pending_at_hostel" })
  amountPendingAtHostel: number;

  @Column({ length: 255, name: "mercado_pago_payment_id" })
  mercadoPagoPaymentId: string;

  @Column({
    type: "enum",
    enum: ["confirmed", "cancelled", "completed"],
    default: "confirmed",
  })
  status: string;

  @Column({ type: "timestamp", nullable: true, name: "cancelled_at" })
  cancelledAt: Date;

  @Column({ length: 20, nullable: true, name: "cancelled_by" })
  cancelledBy: string;

  @Column({ type: "text", nullable: true, name: "cancellation_reason" })
  cancellationReason: string;

  @Column({ type: "int", nullable: true, name: "refund_amount" })
  refundAmount: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

// Admin.ts
@Entity("admins")
export class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255, name: "password_hash" })
  passwordHash: string;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}

// ContactForm.ts
@Entity("contact_forms")
export class ContactForm {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ type: "text" })
  message: string;

  @Column({
    type: "enum",
    enum: ["pending", "read", "responded"],
    default: "pending",
  })
  status: string;

  @Column({ type: "text", nullable: true, name: "admin_notes" })
  adminNotes: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true, name: "responded_at" })
  respondedAt: Date;
}
```

---

## 🎨 DISEÑO Y THEMING

### **Paleta de Colores**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2D82B5",
          50: "#E6F2F8",
          100: "#CCE5F1",
          200: "#99CBE3",
          300: "#66B1D5",
          400: "#3397C7",
          500: "#2D82B5",
          600: "#246A94",
          700: "#1B5273",
          800: "#123A52",
          900: "#092231",
        },
        // Colores de shadcn/ui
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        card: "#FFFFFF",
        "card-foreground": "#1A1A1A",
        popover: "#FFFFFF",
        "popover-foreground": "#1A1A1A",
        muted: "#F5F5F5",
        "muted-foreground": "#737373",
        accent: "#F5F5F5",
        "accent-foreground": "#1A1A1A",
        destructive: "#EF4444",
        "destructive-foreground": "#FFFFFF",
        border: "#E5E5E5",
        input: "#E5E5E5",
        ring: "#2D82B5",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
```

### **Tipografía**

```css
/* globals.css */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");

:root {
  --primary: #2d82b5;
  --primary-foreground: #ffffff;
  --radius: 0.5rem;

  /* Fuentes */
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
}

body {
  font-family: var(--font-sans);
  color: #1a1a1a;
  background: #ffffff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
  color: #1a1a1a;
}
```

---

## 📦 DEPENDENCIAS PRINCIPALES

### **Backend `package.json`**

```json
{
  "name": "@passajero1900/backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "express": "^4.18.2",
    "typeorm": "^0.3.17",
    "pg": "^8.11.3",
    "reflect-metadata": "^0.1.13",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "zod": "^3.22.4",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^7.1.5",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.3.1",
    "mercadopago": "^2.0.0",
    "resend": "^3.0.0",
    "winston": "^3.11.0",
    "winston-daily-rotate-file": "^5.0.0",
    "date-fns": "^3.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "tsx": "^4.7.0",
    "@types/express": "^4.17.21",
    "@types/bcrypt": "^5.0.2",
    "@types/jsonwebtoken": "^9.0.5",
    "@types/cookie-parser": "^1.4.6",
    "@types/cors": "^2.8.17",
    "@types/node": "^20.10.6",
    "vitest": "^1.1.0"
  }
}
```

### **Frontend `package.json`**

```json
{
  "name": "@passajero1900/frontend",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.1",
    "react-icons": "^5.0.0",
    "react-hook-form": "^7.49.2",
    "zod": "^3.22.4",
    "@hookform/resolvers": "^3.3.3",
    "date-fns": "^3.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "@radix-ui/react-alert-dialog": "^1.0.5",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.5"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "vite": "^5.0.10",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32"
  }
}
```

---

## 🔐 SEGURIDAD - PANEL ADMIN

### **Ruta Secreta**

```
Producción: https://passajero1900.com/admin-passajero1900
Desarrollo: http://localhost:5173/admin-passajero1900
```

### **Credenciales Hardcodeadas**

```bash
# Backend .env
ADMIN_EMAIL=passajero1900@gmail.com
ADMIN_PASSWORD=$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6LkKjxVPj4C2nR3u

# Generar hash del password:
# node -e "console.log(require('bcrypt').hashSync('TuPasswordSeguro123!', 10))"
```

### **Rate Limiting en Login**

```typescript
// backend/src/routes/admin/auth.routes.ts
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // máximo 5 intentos
  message: "Demasiados intentos de login. Intenta de nuevo en 15 minutos.",
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, authController.login);
```

---

## ✅ CHECKLIST PRE-DESARROLLO

Antes de arrancar, verificar:

### **Software Instalado**

- [ ] Node.js v20+ (`node --version`)
- [ ] pnpm v9+ (`pnpm --version`)
- [ ] Docker Desktop (corriendo)
- [ ] Git configurado
- [ ] VS Code con extensiones:
  - [ ] ESLint
  - [ ] Prettier
  - [ ] TypeScript
  - [ ] Tailwind CSS IntelliSense
  - [ ] Docker (opcional)

### **Cuentas y Credenciales**

- [ ] Cuenta Mercado Pago (obtener credenciales TEST)
- [ ] Cuenta Resend (API key para emails)
- [ ] Logo del hostel (SVG + PNG)

### **Repositorio**

- [ ] Branch `dev` activo
- [ ] `.gitignore` configurado
- [ ] Archivos de documentación:
  - [ ] BLUEPRINT.md
  - [ ] FLUJO_RESERVA.md
  - [ ] CONFIGURACION_TECNICA.md

---

**Estado:** ✅ Documentación completa - Listo para setup inicial

**Próximo paso:** Crear estructura del monorepo con Turborepo + pnpm
