# 🎯 FLUJO DETALLADO DE RESERVA - PASSAJERO1900

**Última actualización:** 2 de noviembre de 2025  
**Estado:** ✅ Aprobado - Listo para desarrollo

---

## 📋 DECISIONES FINALES CONFIRMADAS

### 💰 Sistema de Pagos

- ✅ **1-2 noches:** Pago completo (100%)
- ✅ **3+ noches:** Seña 30% online + 70% al check-in
- ✅ **Moneda:** Solo ARS (pesos argentinos)
- ✅ **Pasarela:** Mercado Pago exclusivamente
- ✅ **Comisiones:** Absorbidas por el hostel
- ✅ **Una reserva = Una cama/habitación**

### 🔄 Política de Cancelación

- ✅ **72+ horas antes:** Reembolso 50%
- ✅ **< 72 horas:** Sin reembolso (0%)
- ✅ **Proceso:** Cliente contacta → Admin cancela desde panel

### 🔐 Datos Requeridos

- ✅ Nombre completo
- ✅ Apellido
- ✅ País (select)
- ✅ Email (obligatorio)
- ✅ Teléfono (obligatorio)
- ✅ DNI/Pasaporte (**opcional**, se pide al check-in)

### 🏨 Sistema de Reservas

- ✅ **Automáticas:** Pago exitoso = Reserva confirmada
- ✅ **Sin aprobación manual** del admin
- ✅ **First-come first-served:** El primero que paga gana
- ✅ **Sin bloqueo temporal** de camas

### 📱 Comunicación

- ✅ **WhatsApp:** Widget flotante siempre visible
- ✅ **Email notificaciones:** A definir (privado de Alejandra)
- ✅ **Redes sociales:** No disponibles aún

### 🌐 Idioma

- ✅ **Solo español** (sin multiidioma por ahora)

---

## 🎬 FLUJO COMPLETO PASO A PASO

### PASO 1: Selección de Fechas

**Ubicación:** Home o página de Reservas

```
┌─────────────────────────────────────────┐
│  🏨 PASSAJERO1900                       │
│                                         │
│  ¿Cuándo querés venir?                  │
│                                         │
│  [ Check-in: 3 nov 2025  ▼ ]           │
│  [ Check-out: 7 nov 2025 ▼ ]           │
│                                         │
│  4 noches                               │
│                                         │
│  [ BUSCAR DISPONIBILIDAD ]              │
└─────────────────────────────────────────┘
```

**Validaciones:**

- ✅ Check-in >= Hoy
- ✅ Check-out > Check-in
- ✅ Máximo 365 días adelante

---

### PASO 2: Habitaciones Disponibles (Cards)

**Layout:** Cards en columna + Resumen fijo a la derecha

```
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  ┌─────────────────────────────┐  ┌──────────────────────┐       │
│  │ 🖼️ FOTO CAROUSEL            │  │ 📋 RESUMEN RESERVA   │       │
│  │   [< 1/5 >]                 │  │                      │       │
│  │                             │  │ No ha agregado       │       │
│  │ HABITACIÓN COMPARTIDA MIXTA │  │ habitaciones         │       │
│  │                             │  │                      │       │
│  │ 4 camas individuales        │  │                      │       │
│  │ • Cortinado privado         │  │                      │       │
│  │ • Mesa rebatible            │  └──────────────────────┘       │
│  │ • Enchufes y luz            │                                 │
│  │ • Baulera con candado       │                                 │
│  │                             │                                 │
│  │ [ Ver detalles ]            │                                 │
│  │                             │                                 │
│  │         $10,000/noche       │                                 │
│  │                             │                                 │
│  │ Cama disponible: [1▼] [AÑADIR] │                             │
│  └─────────────────────────────┘                                 │
│                                                                    │
│  ┌─────────────────────────────┐                                 │
│  │ 🖼️ FOTO CAROUSEL            │                                 │
│  │                             │                                 │
│  │ HABITACIÓN COMPARTIDA       │                                 │
│  │ FEMENINA                    │                                 │
│  │ ...                         │                                 │
│  └─────────────────────────────┘                                 │
│                                                                    │
│  ┌─────────────────────────────┐                                 │
│  │ 🖼️ FOTO CAROUSEL            │                                 │
│  │                             │                                 │
│  │ HABITACIÓN PRIVADA PAREJA   │                                 │
│  │ ...                         │                                 │
│  └─────────────────────────────┘                                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

**Comportamiento:**

1. Usuario ve solo habitaciones/camas disponibles para esas fechas
2. Al hacer click en "Ver detalles" → Modal con galería completa
3. Dropdown muestra solo camas disponibles (ej: Cama 1, Cama 3, Cama 4)
4. Click en "AÑADIR" → Se actualiza el resumen a la derecha

---

### PASO 3: Resumen con Cama Seleccionada

```
┌──────────────────────────┐
│ 📋 RESUMEN DE RESERVA    │
│                          │
│ 3 nov 2025 → 7 nov 2025  │
│ 4 noches                 │
│                          │
│ ──────────────────────── │
│                          │
│ Habitación Mixta         │
│ Cama #2                  │
│                          │
│ $10,000 x 4 noches       │
│                          │
│ ──────────────────────── │
│                          │
│ Subtotal    $40,000      │
│                          │
│ 🔹 Pago online (30%)     │
│             $12,000      │
│                          │
│ 🏨 Pago en hostel (70%)  │
│             $28,000      │
│                          │
│ ──────────────────────── │
│                          │
│ [ RESERVAR AHORA ]       │
│                          │
│ ℹ️ 4+ noches = Seña 30%  │
│ ℹ️ 1-2 noches = 100%     │
│                          │
└──────────────────────────┘
```

**Lógica de Cálculo:**

```javascript
const totalNights = 4;
const pricePerNight = 10000;
const subtotal = totalNights * pricePerNight; // $40,000

if (totalNights <= 2) {
  payOnline = subtotal; // 100%
  payAtHostel = 0;
} else {
  payOnline = Math.round(subtotal * 0.3); // 30%
  payAtHostel = subtotal - payOnline; // 70%
}
```

---

### PASO 4: Formulario de Contacto

**URL:** `/reserva/contacto`

```
┌─────────────────────────────────────────┐
│  DATOS DE CONTACTO                      │
│                                         │
│  * Nombre:                              │
│  [ _________________ ]                  │
│                                         │
│  * Apellido:                            │
│  [ _________________ ]                  │
│                                         │
│  * País:                                │
│  [ Argentina ▼ ]                        │
│                                         │
│  * Email:                               │
│  [ _________________ ]                  │
│                                         │
│  * Teléfono:                            │
│  [ +54 ___________ ]                    │
│                                         │
│  DNI o Pasaporte (opcional):            │
│  [ _________________ ]                  │
│  ℹ️ Será requerido al check-in          │
│                                         │
│  [ ← VOLVER ]  [ CONTINUAR A PAGO → ]   │
│                                         │
└─────────────────────────────────────────┘
```

**Validaciones:**

- ✅ Nombre: requerido, min 2 caracteres
- ✅ Apellido: requerido, min 2 caracteres
- ✅ País: requerido (select)
- ✅ Email: requerido, formato válido
- ✅ Teléfono: requerido, formato válido
- ⚪ DNI/Pasaporte: opcional

---

### PASO 5: Pantalla de Pago (Mercado Pago)

**URL:** `/reserva/pago`

```
┌─────────────────────────────────────────┐
│  CONFIRMAR Y PAGAR                      │
│                                         │
│  📋 Resumen de tu reserva               │
│  ───────────────────────────────       │
│  Habitación: Mixta - Cama #2            │
│  Check-in: 3 nov 2025                   │
│  Check-out: 7 nov 2025                  │
│  Noches: 4                              │
│                                         │
│  👤 Huésped                             │
│  ───────────────────────────────       │
│  Juan Pérez                             │
│  juan@example.com                       │
│  +54 11 1234-5678                       │
│                                         │
│  💰 Detalle de pago                     │
│  ───────────────────────────────       │
│  Subtotal:          $40,000             │
│  Pago online (30%): $12,000             │
│  Pago en hostel:    $28,000             │
│                                         │
│  ⚠️ IMPORTANTE:                         │
│  Al confirmar el pago, aceptás las      │
│  políticas de cancelación.              │
│                                         │
│  [ ← VOLVER ]  [ PAGAR CON MP → ]       │
│                                         │
└─────────────────────────────────────────┘
```

**Flujo de Mercado Pago:**

1. Usuario click en "PAGAR CON MP"
2. Backend crea preferencia de pago en MP
3. Redirige a Checkout Pro de Mercado Pago
4. Usuario completa pago en MP
5. MP envía webhook a nuestro backend
6. Backend valida pago y crea reserva
7. Redirige a página de confirmación

---

### PASO 6: Confirmación de Reserva

**URL:** `/reserva/confirmacion/:codigo`

```
┌─────────────────────────────────────────┐
│  ✅ ¡RESERVA CONFIRMADA!                 │
│                                         │
│  Tu código de reserva:                  │
│  ┏━━━━━━━━━━━━━━━━━━━━┓               │
│  ┃  PASS-20251103-AB12  ┃               │
│  ┗━━━━━━━━━━━━━━━━━━━━┛               │
│                                         │
│  📧 Te enviamos un email a:             │
│  juan@example.com                       │
│                                         │
│  ──────────────────────────────────    │
│                                         │
│  📋 DETALLES DE TU RESERVA              │
│                                         │
│  🏨 Habitación: Mixta - Cama #2         │
│  📅 Check-in: 3 nov 2025 (14:00)        │
│  📅 Check-out: 7 nov 2025 (12:00)       │
│  🌙 Noches: 4                           │
│                                         │
│  💰 PAGOS                               │
│  ✅ Pagado online: $12,000              │
│  ⏳ Pendiente en hostel: $28,000        │
│                                         │
│  👤 HUÉSPED                             │
│  Juan Pérez                             │
│  +54 11 1234-5678                       │
│                                         │
│  ──────────────────────────────────    │
│                                         │
│  [ 📄 DESCARGAR PDF ]                   │
│  [ 🖨️ IMPRIMIR ]                        │
│  [ 🏠 VOLVER AL INICIO ]                │
│                                         │
│  ──────────────────────────────────    │
│                                         │
│  📍 PASSAJERO1900                       │
│  Calle 55 N°613 entre 7 y 8             │
│  La Plata, CP 1900                      │
│                                         │
│  📱 WhatsApp: 221-2215555               │
│  📧 passajero1900@gmail.com             │
│                                         │
│  ⚠️ IMPORTANTE:                         │
│  • Traé tu DNI/Pasaporte al check-in   │
│  • Traé tus propias toallas             │
│  • Cancelación: 72hs antes (50%)        │
│                                         │
└─────────────────────────────────────────┘
```

---

### PASO 7: Email de Confirmación

**Asunto:** ✅ Reserva confirmada en PASSAJERO1900 - Código PASS-20251103-AB12

**Contenido:**

```
¡Hola Juan!

Tu reserva en PASSAJERO1900 ha sido confirmada 🎉

──────────────────────────────────────

📋 CÓDIGO DE RESERVA: PASS-20251103-AB12

🏨 Habitación: Mixta - Cama #2
📅 Check-in: Viernes 3 nov 2025 a partir de las 14:00
📅 Check-out: Martes 7 nov 2025 hasta las 12:00
🌙 Total de noches: 4

──────────────────────────────────────

💰 DETALLE DE PAGO:

✅ Ya pagaste: $12,000 (30%)
⏳ Pagarás al llegar: $28,000 (70%)

Total de tu estadía: $40,000

──────────────────────────────────────

📍 CÓMO LLEGAR:

PASSAJERO1900
Calle 55 N°613 entre 7 y 8
La Plata, Buenos Aires, CP 1900

[Ver en Google Maps]

──────────────────────────────────────

⚠️ IMPORTANTE - TRAÉ CON VOS:

✅ Tu DNI o Pasaporte (obligatorio)
✅ Tus toallas personales
✅ Este email o código de reserva

──────────────────────────────────────

🔄 POLÍTICA DE CANCELACIÓN:

• Hasta 72hs antes: Reembolso del 50%
• Menos de 72hs: Sin reembolso

Para cancelar, contactanos por WhatsApp o teléfono.

──────────────────────────────────────

📱 CONTACTO:

WhatsApp: +54 221 221-5555
Teléfono: 221-2215555
Email: passajero1900@gmail.com

Recepción 24 horas - Check-in flexible

──────────────────────────────────────

[ VER MI RESERVA ONLINE ]
[ DESCARGAR PDF ]

¡Te esperamos!

El equipo de PASSAJERO1900
```

---

## 🔐 PANEL ADMIN - Vista de Reserva

**URL:** `/admin/reservas/:id`

```
┌─────────────────────────────────────────┐
│  RESERVA #PASS-20251103-AB12            │
│                                         │
│  Estado: ✅ CONFIRMADA                  │
│  [ Marcar Completada ] [ Cancelar ]     │
│                                         │
│  ──────────────────────────────────    │
│                                         │
│  🏨 DETALLES                            │
│  Habitación: Mixta                      │
│  Cama: #2                               │
│  Check-in: 3 nov 2025                   │
│  Check-out: 7 nov 2025                  │
│  Noches: 4                              │
│                                         │
│  👤 HUÉSPED                             │
│  Nombre: Juan Pérez                     │
│  Email: juan@example.com                │
│  Teléfono: +54 11 1234-5678             │
│  País: Argentina                        │
│  DNI: 12345678                          │
│                                         │
│  💰 PAGOS                               │
│  Total: $40,000                         │
│  ✅ Pagado online (MP): $12,000         │
│  ⏳ Pendiente: $28,000                  │
│  Comisión MP: -$480 (4%)                │
│  Neto recibido: $11,520                 │
│                                         │
│  📅 TIMELINE                            │
│  • 2 nov 2025 15:30 - Reserva creada    │
│  • 2 nov 2025 15:32 - Pago confirmado   │
│                                         │
│  📝 NOTAS INTERNAS                      │
│  [ Agregar nota... ]                    │
│                                         │
│  [ 📧 Reenviar email ]                  │
│  [ 📄 Descargar PDF ]                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🚨 CASOS ESPECIALES

### Caso 1: Error en Mercado Pago

**Si el pago falla:**

```
┌─────────────────────────────────────────┐
│  ❌ ERROR EN EL PAGO                    │
│                                         │
│  No pudimos procesar tu pago.           │
│                                         │
│  Razón: [Mensaje de Mercado Pago]       │
│                                         │
│  [ INTENTAR NUEVAMENTE ]                │
│  [ CONTACTAR AL HOSTEL ]                │
│                                         │
└─────────────────────────────────────────┘
```

### Caso 2: Cama ya reservada (concurrencia)

**Si otro usuario pagó primero:**

```
┌─────────────────────────────────────────┐
│  ⚠️ CAMA NO DISPONIBLE                  │
│                                         │
│  Lo sentimos, la cama que elegiste      │
│  acaba de ser reservada por otro        │
│  huésped.                               │
│                                         │
│  [ VER OTRAS OPCIONES ]                 │
│  [ CONTACTAR AL HOSTEL ]                │
│                                         │
└─────────────────────────────────────────┘
```

### Caso 3: Ver reserva sin código

**URL:** `/mi-reserva`

```
┌─────────────────────────────────────────┐
│  BUSCAR MI RESERVA                      │
│                                         │
│  Código de reserva:                     │
│  [ PASS-_____________ ]                 │
│                                         │
│  O ingresá tu email:                    │
│  [ juan@example.com ]                   │
│                                         │
│  [ BUSCAR ]                             │
│                                         │
│  ──────────────────────────────────    │
│                                         │
│  ¿Perdiste tu código?                   │
│  [ Contactanos por WhatsApp ]           │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📊 ENTIDADES DE BASE DE DATOS

```typescript
// Room
id: uuid
name: string (ej: "Compartida Mixta")
type: enum (shared_mixed | shared_female | private)
capacity: number (4 o 1)
pricePerNight: number (en centavos para evitar decimales)
description: text
amenities: json[]
images: string[]
isActive: boolean

// Bed (solo para compartidas)
id: uuid
roomId: uuid (FK)
bedNumber: number (1-4)
isActive: boolean

// Reservation
id: uuid
code: string (único, ej: "PASS-20251103-AB12")
roomId: uuid (FK)
bedId: uuid (FK, nullable para privadas)
guestFirstName: string
guestLastName: string
guestEmail: string
guestPhone: string
guestCountry: string
guestDocument: string (nullable)
checkInDate: date
checkOutDate: date
numberOfNights: number (calculado)
pricePerNight: number
totalAmount: number
amountPaidOnline: number
amountPendingAtHostel: number
mercadoPagoPaymentId: string
mercadoPagoStatus: string
status: enum (confirmed | cancelled | completed)
cancelledAt: timestamp (nullable)
cancelledBy: string (nullable: 'admin' | 'system')
cancellationReason: text (nullable)
refundAmount: number (nullable)
createdAt: timestamp
updatedAt: timestamp

// Admin (simplificado)
id: uuid
email: string
passwordHash: string
name: string
createdAt: timestamp

// ContactForm (consultas generales)
id: uuid
name: string
email: string
message: text
status: enum (pending | read | responded)
adminNotes: text (nullable)
createdAt: timestamp
respondedAt: timestamp (nullable)
```

---

## 🎨 PRÓXIMOS PASOS

1. ✅ Blueprint finalizado y aprobado
2. ⏳ Setup inicial del proyecto desde 0
3. ⏳ Configurar Docker + PostgreSQL
4. ⏳ Desarrollar backend con TypeORM
5. ⏳ Integrar Mercado Pago
6. ⏳ Desarrollar frontend
7. ⏳ Testing
8. ⏳ Deploy

**¿Listo para empezar a codear?** 🚀
