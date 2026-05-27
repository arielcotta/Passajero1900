# 🔧 Configuración de Servicios Externos - PASSAJERO1900

Este documento detalla cómo configurar cada servicio externo necesario para que el sistema funcione en producción.

---

## 📧 Resend (Servicio de Emails)

### ¿Para qué se usa?
- Enviar email de confirmación a huéspedes tras reserva exitosa
- Enviar notificación al admin cuando hay una nueva reserva
- Enviar email de cancelación de reserva

### Costo
- **Gratis:** 100 emails/mes desde `onboarding@resend.dev` (ideal para testing)
- **Gratis:** 3,000 emails/mes con dominio verificado
- **Paid:** $20/mes = 50,000 emails (solo si necesitas más)

### Configuración Paso a Paso

#### 1. Crear Cuenta
1. Ir a [resend.com](https://resend.com)
2. Registrarse con: `passajero1900@gmail.com`
3. Verificar email

#### 2. Obtener API Key
1. Dashboard → API Keys
2. Create API Key
3. Nombre: `PASSAJERO1900 Production`
4. Permisos: Full Access
5. **COPIAR Y GUARDAR** (solo se muestra una vez)

#### 3. Variables de Entorno

**Desarrollo (testing local):**
```bash
# apps/backend/.env
RESEND_API_KEY=re_TuApiKeyAqui
EMAIL_FROM=onboarding@resend.dev
EMAIL_ADMIN=passajero1900@gmail.com
```

**Producción (con dominio):**
```bash
# Railway/Render variables
RESEND_API_KEY=re_TuApiKeyAqui
EMAIL_FROM=reservas@passajero1900.com
EMAIL_ADMIN=passajero1900@gmail.com
```

#### 4. Verificar Dominio (Solo Producción)

**IMPORTANTE:** Necesitas un dominio propio para producción.

1. **Comprar dominio:** passajero1900.com (Namecheap ~$10/año)
2. **En Resend Dashboard:**
   - Domains → Add Domain
   - Ingresar: `passajero1900.com`
3. **Agregar DNS Records:**

Resend te dará 3 registros. Ejemplo:

| Type | Name | Value | Priority |
|------|------|-------|----------|
| TXT | `_resend` | `resend-verification=abc123...` | - |
| MX | `@` | `feedback-smtp.us-east-1.amazonses.com` | 10 |
| TXT | `@` | `v=spf1 include:amazonses.com ~all` | - |

4. **Agregar en tu proveedor (Namecheap/GoDaddy):**
   - Advanced DNS → Add New Record
   - Copiar exactamente cada registro
5. **Verificar:** Click "Verify Domain" en Resend
6. **Esperar:** Propagación puede tardar 10-30min (máx 48hs)

#### 5. Testing

**Desarrollo local:**
```bash
cd apps/backend
pnpm run dev
```

Hacer una reserva de prueba y verificar:
- ✅ Console muestra: `✅ Emails enviados para reserva PASS-YYYYMMDD-XXXX`
- ✅ Email llega al huésped (revisar spam)
- ✅ Email llega al admin
- ✅ Templates HTML se ven bien

**Revisar en Resend:**
- Dashboard → Emails
- Ver historial de emails enviados
- Ver errores si los hay

#### Troubleshooting

**❌ Emails no llegan:**
- Verificar API Key es correcta
- Verificar `EMAIL_FROM` tiene formato válido
- Revisar carpeta de spam
- Revisar Dashboard de Resend para ver errores

**❌ Dominio no verifica:**
- Esperar hasta 48hs de propagación
- Usar [whatsmydns.net](https://whatsmydns.net) para verificar records
- Verificar que copiaste los records EXACTAMENTE como Resend los da
- Contactar soporte de Resend (muy responsivos)

**❌ Emails van a spam:**
- Asegurar dominio está verificado
- No usar `onboarding@resend.dev` en producción
- Evitar palabras spam en subject/body ("GRATIS", "URGENTE", etc.)
- Agregar link de unsubscribe (mejora deliverability)

---

## 💳 Mercado Pago (Pasarela de Pagos)

### ¿Para qué se usa?
- Procesar pagos de reservas
- Generar link de pago para el huésped
- Recibir confirmación automática de pago vía webhook
- Procesar reembolsos si es necesario

### Costo
- **Comisión por transacción:** ~3.5% + IVA
- No hay costo mensual fijo
- Ejemplo: Reserva de $35,000 → comisión ~$1,225

### Configuración Paso a Paso

#### 1. Crear Cuenta
1. Ir a [mercadopago.com.ar](https://mercadopago.com.ar)
2. Registrarse con: `passajero1900@gmail.com`
3. Completar datos de monotributista:
   - Nombre: Alejandra Elizabeth Bollón
   - CUIT: 23-23687385-4
   - Dirección: 55 N°613 entre 7 y 8, La Plata
4. Verificar identidad (DNI, selfie)
5. Asociar cuenta bancaria para recibir fondos

#### 2. Obtener Credenciales

**MODO TEST (desarrollo):**
1. Dashboard → Credenciales → Credenciales de prueba
2. Copiar:
   - Public Key TEST: `TEST-xxx-xxx`
   - Access Token TEST: `TEST-xxx-xxx`

**MODO PRODUCCIÓN:**
1. Dashboard → Credenciales → Credenciales de producción
2. Copiar:
   - Public Key PROD: `APP_USR-xxx-xxx`
   - Access Token PROD: `APP_USR-xxx-xxx`

#### 3. Variables de Entorno

**Desarrollo:**
```bash
# apps/backend/.env
MP_ACCESS_TOKEN=TEST-xxx-xxx
MP_PUBLIC_KEY=TEST-xxx-xxx
MP_WEBHOOK_SECRET=tu-secret-para-webhook
```

```bash
# apps/frontend/.env
VITE_MP_PUBLIC_KEY=TEST-xxx-xxx
```

**Producción:**
```bash
# Railway variables
MP_ACCESS_TOKEN=APP_USR-xxx-xxx
MP_PUBLIC_KEY=APP_USR-xxx-xxx
MP_WEBHOOK_SECRET=tu-secret-seguro-largo
```

```bash
# Vercel variables
VITE_MP_PUBLIC_KEY=APP_USR-xxx-xxx
```

#### 4. Configurar Webhook

1. **Dashboard Mercado Pago:**
   - Integraciones → Notificaciones de pago
   - URL de webhook: `https://api.passajero1900.com/api/payments/webhook`
   - Eventos: `payment` (approved, rejected, etc.)
2. **Agregar IP a whitelist** (si lo pide Mercado Pago)
3. **Testear con ngrok** en desarrollo:
   ```bash
   ngrok http 9267
   # URL temporal: https://abc123.ngrok.io
   # Webhook: https://abc123.ngrok.io/api/payments/webhook
   ```

#### 5. Testing

**Tarjetas de prueba (modo TEST):**
- **Aprobada:** 5031 7557 3453 0604 | CVV: 123 | Venc: 11/25
- **Rechazada (fondos):** 5031 4332 1540 6351
- **Pendiente:** 5031 4332 1540 5418

**Flujo completo:**
1. Crear reserva en frontend
2. Ir a paso de pago
3. Click en "Pagar con Mercado Pago"
4. Usar tarjeta de prueba
5. Verificar:
   - ✅ Estado cambia a "Confirmada" en backend
   - ✅ Emails se envían automáticamente
   - ✅ Webhook recibe notificación

#### 6. Testing en Producción

**CRÍTICO antes de lanzar:**
1. Hacer 1 pago real de $100 (mínimo de MP)
2. Verificar todo el flujo funciona
3. Solicitar reembolso si es necesario
4. Monitorear logs de webhook primeros días

---

## 🗄️ PostgreSQL (Base de Datos)

### ¿Para qué se usa?
- Almacenar todas las reservas
- Habitaciones y camas
- Usuario admin
- Formularios de contacto

### Opciones de Hosting

#### Opción 1: Railway (Recomendada)
- **Costo:** $5/mes (incluye DB + Backend)
- **Ventajas:** Fácil, backups automáticos
- **Capacidad:** 512 MB RAM, 1 GB Disco

**Setup:**
1. Ir a [railway.app](https://railway.app)
2. New Project → Deploy PostgreSQL
3. Copiar variables:
   - `DATABASE_URL` (URL completa)
   - O individuales: HOST, PORT, USER, PASSWORD, DATABASE
4. Agregar a Railway variables del backend

#### Opción 2: Supabase
- **Costo:** Gratis hasta 500 MB
- **Ventajas:** Gratis, UI amigable
- **Desventajas:** Límite de espacio

#### Opción 3: Render
- **Costo:** Gratis (con limitaciones)
- **Desventajas:** Se "duerme" tras inactividad

### Variables de Entorno

```bash
# apps/backend/.env
DB_HOST=containers-us-west-123.railway.app
DB_PORT=7492
DB_USER=postgres
DB_PASSWORD=tu-password-seguro
DB_NAME=railway
```

### Backups

**Railway:**
- Automáticos cada 24hs
- Retención: 7 días
- Restore desde dashboard

**Manual (recomendado):**
```bash
# Exportar cada semana
pg_dump -h HOST -p PORT -U USER -d DATABASE > backup-YYYY-MM-DD.sql

# Restaurar si es necesario
psql -h HOST -p PORT -U USER -d DATABASE < backup-YYYY-MM-DD.sql
```

---

## 🚀 Deploy (Frontend + Backend)

### Frontend - Vercel (Recomendado)

**Por qué Vercel:**
- Gratis para proyectos personales/comerciales
- Deploy automático desde GitHub
- CDN global (carga rápida)
- SSL gratis

**Setup:**
1. Ir a [vercel.com](https://vercel.com)
2. Import Git Repository
3. Seleccionar: `passajero-1900`
4. Root directory: `apps/frontend`
5. Framework: Vite
6. Build command: `pnpm build`
7. Output directory: `dist`
8. Environment variables:
   ```
   VITE_API_URL=https://api.passajero1900.com
   VITE_MP_PUBLIC_KEY=APP_USR-xxx-xxx
   ```
9. Deploy!

**Dominio:**
- Vercel asigna: `passajero1900.vercel.app`
- Custom domain: Settings → Domains → Add `passajero1900.com`
- Configurar DNS en Namecheap/GoDaddy:
  ```
  Type: CNAME
  Name: www
  Value: cname.vercel-dns.com
  ```

### Backend - Railway (Recomendado)

**Por qué Railway:**
- $5/mes (muy económico)
- PostgreSQL incluido
- Fácil configuración
- Logs y monitoreo incluidos

**Setup:**
1. Ir a [railway.app](https://railway.app)
2. New Project
3. Deploy from GitHub → Select repo
4. Root directory: `apps/backend`
5. Add PostgreSQL service
6. Connect database to backend
7. Environment variables:
   - Copiar todo `.env.example`
   - Llenar con valores reales
   - Railway auto-completa `DATABASE_URL`
8. Custom domain:
   - Settings → Networking
   - Add domain: `api.passajero1900.com`
   - Configurar CNAME en proveedor de dominio

---

## 🔒 Seguridad en Producción

### Checklist de Seguridad

- [ ] **Cambiar secretos JWT** (generar nuevos de 32+ caracteres)
- [ ] **Credenciales admin reales** (hashear password con bcrypt)
- [ ] **HTTPS obligatorio** (auto en Vercel/Railway)
- [ ] **CORS restringido** (solo tu dominio en `ALLOWED_ORIGINS`)
- [ ] **Rate limiting ajustado** (100 req/15min general, 5 req/15min login)
- [ ] **Logs de actividad** (Sentry para errores)
- [ ] **Backups automáticos** (Railway daily backups)
- [ ] **Variables de entorno seguras** (nunca en código, solo en dashboards)
- [ ] **Webhook secret largo** (32+ caracteres aleatorios)

### Generar Secretos Seguros

```bash
# JWT secrets
openssl rand -base64 32

# Webhook secret
openssl rand -hex 32
```

---

## 📊 Monitoreo Post-Launch

### Sentry (Errores)

**Setup:**
1. Ir a [sentry.io](https://sentry.io)
2. Create Project → React (frontend)
3. Create Project → Node/Express (backend)
4. Copiar DSN de cada proyecto
5. Agregar a variables de entorno:
   ```bash
   VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   ```

### UptimeRobot (Disponibilidad)

**Setup (gratis):**
1. Ir a [uptimerobot.com](https://uptimerobot.com)
2. Add New Monitor
3. Monitor Type: HTTP(s)
4. URL: `https://passajero1900.com` y `https://api.passajero1900.com`
5. Monitoring Interval: 5 minutos
6. Alert Contacts: Email del cliente

---

## 📞 Soporte de Servicios

- **Resend:** [resend.com/support](https://resend.com/support) - Muy responsivos
- **Mercado Pago:** [mercadopago.com.ar/ayuda](https://mercadopago.com.ar/ayuda) - Centro de ayuda
- **Railway:** [railway.app/help](https://railway.app/help) - Discord activo
- **Vercel:** [vercel.com/support](https://vercel.com/support) - Docs excelentes
- **Sentry:** [sentry.io/support](https://sentry.io/support) - Centro de ayuda

---

## ✅ Checklist Pre-Launch

### Servicios Externos

- [ ] **Resend:**
  - [ ] Cuenta creada
  - [ ] API Key obtenida
  - [ ] Dominio verificado
  - [ ] Email de prueba enviado y recibido
- [ ] **Mercado Pago:**
  - [ ] Cuenta creada y verificada
  - [ ] Credenciales PROD obtenidas
  - [ ] Webhook configurado
  - [ ] Pago de prueba completado exitosamente
- [ ] **PostgreSQL:**
  - [ ] Base de datos en Railway creada
  - [ ] Migrations ejecutadas
  - [ ] Seed inicial (habitaciones/camas) cargado
  - [ ] Backup manual descargado
- [ ] **Deploy:**
  - [ ] Frontend en Vercel funcionando
  - [ ] Backend en Railway funcionando
  - [ ] Dominio configurado y SSL activo
  - [ ] Variables de entorno configuradas
- [ ] **Monitoreo:**
  - [ ] Sentry configurado
  - [ ] UptimeRobot monitoreando
  - [ ] Alertas por email configuradas

### Testing Final

- [ ] Reserva completa end-to-end con pago real
- [ ] Emails llegan correctamente (huésped + admin)
- [ ] Panel admin accesible y funcional
- [ ] Mobile responsive funcionando
- [ ] Lighthouse score >85 en todas categorías
- [ ] No hay errores en consola del navegador
- [ ] No hay errores en logs de Sentry

---

**Última actualización:** 6 de noviembre de 2025  
**Mantenedor:** Equipo de Desarrollo PASSAJERO1900
