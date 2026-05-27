# 🎯 Guía Rápida - Sistema de Configuración

## ¿Cómo funciona ahora?

El sistema tiene **3 modos de operación** controlados por variables de entorno:

```
┌─────────────────────┐
│  MODO DESARROLLO    │ ← Actual (sin servicios externos)
├─────────────────────┤
│  MODO STAGING       │ ← Testing con servicios reales sandbox
├─────────────────────┤
│  MODO PRODUCCIÓN    │ ← Sistema en vivo
└─────────────────────┘
```

---

## 🚀 Inicio Rápido

### Modo Actual (Desarrollo - Todo Mock)

**Sin configuración adicional**, el sistema ya funciona:

```bash
# Frontend
cd apps/frontend
pnpm dev

# Backend
cd apps/backend
pnpm dev
```

**Qué hace:**
- ✅ Frontend usa datos mock (localStorage)
- ✅ Backend loguea emails en consola (no envía reales)
- ✅ Pagos simulados (sin Mercado Pago)
- ✅ Todo funciona sin servicios externos

**Para verificar:**
1. Abrir consola del navegador
2. Deberías ver: `📦 [MOCK] ...` en cada operación
3. Hacer una reserva → se guarda en localStorage
4. No se envían emails reales ni se procesan pagos

---

## 🧪 Testing con Servicios Reales (Staging)

Cuando quieras testear con Resend y Mercado Pago:

### Backend - `apps/backend/.env`
```bash
# Activar servicios
ENABLE_EMAILS=true
ENABLE_PAYMENTS=true

# Resend (usar cuenta real o onboarding@resend.dev)
RESEND_API_KEY=re_TuKeyReal
EMAIL_FROM=onboarding@resend.dev
EMAIL_ADMIN=tu-email@gmail.com

# Mercado Pago (sandbox)
MP_ACCESS_TOKEN=TEST-TuSandboxToken
MP_PUBLIC_KEY=TEST-TuSandboxPublic
MP_USE_SANDBOX=true
```

### Frontend - `apps/frontend/.env.local`
```bash
# Conectar con backend real
VITE_USE_MOCK_DATA=false
VITE_ENABLE_REAL_PAYMENTS=true
VITE_MP_PUBLIC_KEY=TEST-TuSandboxPublic
```

**Qué hace:**
- 📧 Emails reales vía Resend
- 💳 Pagos sandbox de Mercado Pago
- 🧪 Testing completo sin afectar producción

---

## 🚀 Producción (5 minutos)

### Backend - Railway Variables
```bash
NODE_ENV=production
ENABLE_EMAILS=true
ENABLE_PAYMENTS=true
USE_MOCK_DATA=false

RESEND_API_KEY=re_ProdKey
EMAIL_FROM=reservas@passajero1900.com
EMAIL_ADMIN=passajero1900@gmail.com

MP_ACCESS_TOKEN=APP_USR_ProdToken
MP_PUBLIC_KEY=APP_USR_ProdPublic
MP_USE_SANDBOX=false
```

### Frontend - Vercel Variables
```bash
VITE_USE_MOCK_DATA=false
VITE_ENABLE_REAL_PAYMENTS=true
VITE_API_URL=https://api.passajero1900.com/api
VITE_MP_PUBLIC_KEY=APP_USR_ProdPublic
```

---

## 📊 Feature Flags Disponibles

### Backend

| Variable | Valores | Descripción |
|----------|---------|-------------|
| `ENABLE_EMAILS` | true/false | Enviar emails reales o solo logear |
| `ENABLE_PAYMENTS` | true/false | Procesar pagos reales o simular |
| `USE_MOCK_DATA` | true/false | Usar datos mock en servicios |
| `MP_USE_SANDBOX` | true/false | Mercado Pago sandbox o producción |

### Frontend

| Variable | Valores | Descripción |
|----------|---------|-------------|
| `VITE_USE_MOCK_DATA` | true/false | Usar localStorage o llamar al backend |
| `VITE_ENABLE_REAL_PAYMENTS` | true/false | Generar links de pago reales |
| `VITE_ENABLE_DEBUG` | true/false | Mostrar logs en consola |

---

## 🔍 Cómo Verificar el Modo Actual

### En el Navegador (Frontend)

Abrir consola del navegador:

```javascript
// Ver configuración actual
console.log(window.location.href) // Debería ver el appConfig

// Modo Mock activado:
"📦 [MOCK] Creando reserva con datos simulados"
"📦 [MOCK] Buscando reserva por código en localStorage"

// Modo Real activado:
"🌐 Creando reserva en backend real"
"🌐 Buscando reserva en backend real"
```

### En el Backend

Ver logs en terminal:

```bash
# Emails deshabilitados:
📧 [MOCK] Email de confirmación (emails deshabilitados)
   → Para: usuario@example.com
   → Reserva: ABC123

# Emails habilitados pero API key mock:
⚠️  [MOCK] RESEND_API_KEY es MOCK - Email NO enviado

# Emails reales:
📧 Enviando email real a: usuario@example.com
```

---

## 🎨 Uso en Código

### Frontend - Servicios

Los servicios ya están actualizados para usar `appConfig`:

```typescript
import { appConfig } from '@/config/app.config';

// Logging condicional
appConfig.log('Mensaje de debug'); // Solo en desarrollo
appConfig.warn('Advertencia');
appConfig.error('Error'); // Siempre se muestra

// Verificar modo
if (appConfig.useMockData) {
  // Lógica mock
} else {
  // Lógica real
}

// Verificar sandbox de Mercado Pago
if (appConfig.isMercadoPagoSandbox) {
  console.log('Usar tarjetas de prueba');
}
```

### Backend - Servicios

```typescript
import { config } from '../config/env';

// Verificar feature flag
if (!config.ENABLE_EMAILS) {
  console.log('📧 [MOCK] Email no enviado (deshabilitado)');
  return;
}

// Verificar API key válida
if (config.RESEND_API_KEY === 'MOCK_RESEND_KEY') {
  console.warn('⚠️ Usando MOCK_KEY');
  return;
}

// Enviar email real
await resend.emails.send(...);
```

---

## 🐛 Troubleshooting

### "No veo los logs [MOCK]"

**Solución:** Verificar que `VITE_USE_MOCK_DATA` esté en `true` (o no definida).

```bash
# Frontend .env.local
VITE_USE_MOCK_DATA=true
```

### "Emails no se envían en staging"

**Pasos:**
1. Verificar `ENABLE_EMAILS=true` en backend
2. Verificar `RESEND_API_KEY` no es `MOCK_RESEND_KEY`
3. Revisar logs del backend
4. Revisar Dashboard de Resend

### "Pagos van a producción en lugar de sandbox"

**Solución:**
```bash
# Backend
MP_USE_SANDBOX=true
MP_ACCESS_TOKEN=TEST-xxx  # Debe empezar con TEST-

# Frontend
VITE_MP_PUBLIC_KEY=TEST-xxx  # Debe empezar con TEST-
```

### "Frontend no conecta con backend"

**Verificar:**
1. Backend está corriendo en el puerto correcto
2. `VITE_API_URL` apunta al backend correcto
3. CORS está configurado en backend

---

## 📝 Checklist de Transición

### De Desarrollo → Staging

- [ ] Crear cuenta en Resend
- [ ] Obtener API key de Resend
- [ ] Crear cuenta en Mercado Pago
- [ ] Obtener credenciales TEST de Mercado Pago
- [ ] Actualizar `.env` backend con keys reales
- [ ] Actualizar `.env.local` frontend
- [ ] Activar `ENABLE_EMAILS=true`
- [ ] Activar `ENABLE_PAYMENTS=true`
- [ ] Poner `VITE_USE_MOCK_DATA=false`
- [ ] Hacer reserva de prueba
- [ ] Verificar email llega
- [ ] Verificar pago en sandbox funciona

### De Staging → Producción

- [ ] Verificar dominio comprado
- [ ] Configurar dominio en Resend
- [ ] Obtener credenciales PROD de Mercado Pago
- [ ] Deploy backend en Railway
- [ ] Deploy frontend en Vercel
- [ ] Configurar variables de entorno en dashboards
- [ ] Poner `MP_USE_SANDBOX=false`
- [ ] Cambiar `EMAIL_FROM` a dominio real
- [ ] Hacer pago real de prueba ($100)
- [ ] Verificar todo funciona
- [ ] Monitorear logs primeras 24hs

---

## 🎉 Ventajas de este Sistema

1. **Desarrollo sin bloqueos:** No necesitas servicios externos para empezar
2. **Testing seguro:** Staging usa sandbox, nunca afecta producción
3. **Transición rápida:** Cambiar entre modos es solo cambiar variables
4. **Rollback fácil:** Si algo falla, volver a mock es instantáneo
5. **Costos controlados:** No gastas créditos en desarrollo
6. **Logs claros:** Siempre sabes en qué modo estás

---

**Última actualización:** 6 de noviembre de 2025  
**Mantenido por:** Equipo PASSAJERO1900
