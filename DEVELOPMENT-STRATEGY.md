# 🎯 Estrategia de Desarrollo - PASSAJERO1900

## Filosofía: "Desarrollo Completo, Producción en 5 Minutos"

El objetivo es tener **todo el sistema funcionando** con datos de prueba y servicios mockeados, de manera que el paso a producción sea simplemente:

1. ✅ Agregar API keys reales
2. ✅ Subir contenido (fotos, textos, precios)
3. ✅ Deploy

---

## 🏗️ Arquitectura por Capas

```
┌─────────────────────────────────────────────────┐
│         CAPA DE PRESENTACIÓN (Frontend)         │
│  - Componentes listos                           │
│  - Lógica de negocio completa                   │
│  - Mock mode con fallback                       │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│       CAPA DE SERVICIOS (API Wrappers)          │
│  - Servicios con mock/real toggle               │
│  - Validaciones completas                       │
│  - Error handling robusto                       │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│      CAPA DE INTEGRACIONES (Backend)            │
│  - Resend: Mock en dev, real en prod           │
│  - Mercado Pago: Sandbox en dev, prod en prod  │
│  - PostgreSQL: Local en dev, Railway en prod   │
└─────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────┐
│         CAPA DE CONTENIDO (CMS)                 │
│  - JSON con placeholders                        │
│  - Reemplazar en batch al final                 │
└─────────────────────────────────────────────────┘
```

---

## 🔧 Sistema de Configuración

### Backend - Variables de Entorno con Fallbacks

```typescript
// config/env.ts
export const config = {
  // Modo de operación
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // Feature Flags
  ENABLE_EMAILS: process.env.ENABLE_EMAILS === 'true' || false,
  ENABLE_PAYMENTS: process.env.ENABLE_PAYMENTS === 'true' || false,
  USE_MOCK_DATA: process.env.USE_MOCK_DATA !== 'false', // true por defecto
  
  // Resend (Email)
  RESEND_API_KEY: process.env.RESEND_API_KEY || 'MOCK_KEY',
  EMAIL_FROM: process.env.EMAIL_FROM || 'dev@passajero1900.test',
  EMAIL_ADMIN: process.env.EMAIL_ADMIN || 'admin@passajero1900.test',
  
  // Mercado Pago
  MP_ACCESS_TOKEN: process.env.MP_ACCESS_TOKEN || 'TEST-MOCK-TOKEN',
  MP_PUBLIC_KEY: process.env.MP_PUBLIC_KEY || 'TEST-MOCK-PUBLIC',
  MP_WEBHOOK_SECRET: process.env.MP_WEBHOOK_SECRET || 'test-webhook-secret',
  MP_USE_SANDBOX: process.env.MP_USE_SANDBOX !== 'false', // true por defecto
  
  // Database
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '7492', 10),
  DB_USER: process.env.DB_USER || 'passajero',
  DB_PASSWORD: process.env.DB_PASSWORD || 'passajero123',
  DB_NAME: process.env.DB_NAME || 'passajero_db',
};
```

### Frontend - Configuración por Entorno

```typescript
// src/config/app.config.ts
export const appConfig = {
  // Modo de operación
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // Feature Flags
  useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
  enableRealPayments: import.meta.env.VITE_ENABLE_REAL_PAYMENTS === 'true',
  
  // API URLs
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:9267/api',
  
  // Mercado Pago
  mpPublicKey: import.meta.env.VITE_MP_PUBLIC_KEY || 'TEST-MOCK-PUBLIC',
  
  // Timeouts
  apiTimeout: 10000, // 10 segundos
  
  // Logs
  enableDebugLogs: import.meta.env.DEV,
};
```

---

## 📁 Sistema de Contenido Centralizado

### Frontend - JSON de Configuración

```json
// src/config/content.json
{
  "hostel": {
    "name": "PASSAJERO1900",
    "tagline": "Tu hogar en La Plata",
    "description": "Lorem ipsum dolor sit amet...",
    "logo": "/placeholder-logo.png",
    "phone": "221-2215555",
    "whatsapp": "5492212215555",
    "email": "passajero1900@gmail.com",
    "address": {
      "street": "Calle 55 N°613 entre 7 y 8",
      "city": "La Plata",
      "province": "Buenos Aires",
      "zipCode": "1900"
    }
  },
  "rooms": [
    {
      "id": "shared-mixed",
      "name": "Habitación Compartida Mixta",
      "type": "shared",
      "capacity": 4,
      "basePrice": 35000,
      "discountPrice3Nights": 30000,
      "images": [
        "/placeholder-room-shared.jpg"
      ],
      "description": "Lorem ipsum...",
      "amenities": ["wifi", "ac", "lockers", "privacy"]
    }
  ],
  "images": {
    "hero": "/placeholder-hero.jpg",
    "about": "/placeholder-about.jpg",
    "common-areas": [
      "/placeholder-kitchen.jpg",
      "/placeholder-terrace.jpg"
    ]
  },
  "legal": {
    "termsUrl": "/terminos",
    "privacyUrl": "/privacidad",
    "cookiesUrl": "/cookies"
  }
}
```

---

## 🚀 Plan de Implementación

### Fase 1: Estructura de Configuración (1-2 días)

**Backend:**
- [x] Sistema de feature flags en `config/env.ts`
- [ ] Wrapper de Resend con modo mock
- [ ] Wrapper de Mercado Pago con modo sandbox automático
- [ ] Servicio de contenido que lee de JSON

**Frontend:**
- [ ] Configuración centralizada en `app.config.ts`
- [ ] Sistema de contenido con JSON
- [ ] Hook `useContent()` para acceder a contenido
- [ ] Hook `useFeatureFlag()` para feature flags

### Fase 2: Servicios con Mock/Real Toggle (2-3 días)

**Email Service:**
```typescript
class EmailService {
  async send(data) {
    if (!config.ENABLE_EMAILS) {
      console.log('📧 [MOCK] Email enviado:', data);
      return { id: 'mock-email-id', success: true };
    }
    
    if (config.RESEND_API_KEY === 'MOCK_KEY') {
      console.warn('⚠️ Usando MOCK_KEY - emails no se enviarán');
      return { id: 'mock-email-id', success: true };
    }
    
    // Código real de Resend
    return await resend.emails.send(data);
  }
}
```

**Payment Service:**
```typescript
class PaymentService {
  async createPreference(data) {
    if (!config.ENABLE_PAYMENTS) {
      console.log('💳 [MOCK] Pago creado:', data);
      return { paymentLink: '/mock-payment-link' };
    }
    
    if (config.MP_USE_SANDBOX) {
      console.log('🏖️ Usando Mercado Pago SANDBOX');
    }
    
    // Código real de Mercado Pago
    return await mercadoPago.createPreference(data);
  }
}
```

### Fase 3: Sistema de Contenido (1 día)

**Content Manager:**
```typescript
// src/lib/contentManager.ts
import contentData from '@/config/content.json';

class ContentManager {
  private content = contentData;
  
  getHostelInfo() {
    return this.content.hostel;
  }
  
  getRooms() {
    return this.content.rooms;
  }
  
  getImageUrl(key: string) {
    // Busca en images, si no existe retorna placeholder
    return this.content.images[key] || '/placeholder.jpg';
  }
  
  // Método para actualizar contenido (POST-launch)
  async updateContent(newContent: Partial<typeof contentData>) {
    // Merge con contenido existente
    this.content = { ...this.content, ...newContent };
  }
}

export const content = new ContentManager();
```

### Fase 4: Scripts de Transición a Producción (1 día)

**Script: `scripts/prepare-production.sh`**
```bash
#!/bin/bash
echo "🚀 Preparando para producción..."

# Validar que todas las env vars existan
check_env_var() {
  if [ -z "${!1}" ]; then
    echo "❌ Falta variable: $1"
    exit 1
  fi
}

check_env_var "RESEND_API_KEY"
check_env_var "MP_ACCESS_TOKEN"
check_env_var "DATABASE_URL"

# Validar que no sean valores mock
if [[ $RESEND_API_KEY == "MOCK"* ]]; then
  echo "❌ RESEND_API_KEY aún es MOCK"
  exit 1
fi

echo "✅ Todas las variables están configuradas"
```

**Script: `scripts/update-content.js`**
```javascript
// Actualizar todo el contenido de una vez
const fs = require('fs');

const productionContent = {
  hostel: {
    name: "PASSAJERO1900",
    logo: "/logo-official.png",
    // ... contenido real del cliente
  },
  rooms: [
    // ... habitaciones con fotos reales
  ],
  images: {
    hero: "/hero-oficial.jpg",
    // ... imágenes reales
  }
};

fs.writeFileSync(
  './src/config/content.json',
  JSON.stringify(productionContent, null, 2)
);

console.log('✅ Contenido actualizado');
```

---

## 📋 Checklist de Transición a Producción

### Pre-Launch (Desarrollo Completo)

- [x] ✅ Frontend 100% funcional con mock data
- [x] ✅ Backend 75% completo con estructura lista
- [ ] 🟡 Feature flags implementados
- [ ] 🟡 Sistema de contenido centralizado
- [ ] 🟡 Wrappers de servicios con mock/real
- [ ] 🟡 Scripts de validación pre-deploy

### Launch Day (5 minutos de trabajo)

**Paso 1: API Keys (2 min)**
```bash
# Railway Dashboard
ENABLE_EMAILS=true
RESEND_API_KEY=re_RealKey123...
MP_ACCESS_TOKEN=APP_USR_RealToken123...
MP_USE_SANDBOX=false
ENABLE_PAYMENTS=true

# Vercel Dashboard
VITE_ENABLE_REAL_PAYMENTS=true
VITE_USE_MOCK_DATA=false
VITE_MP_PUBLIC_KEY=APP_USR_RealPublic123...
```

**Paso 2: Contenido (2 min)**
```bash
# Subir imágenes a /public
cp ~/cliente-passajero/fotos/* ./apps/frontend/public/images/

# Actualizar content.json
node scripts/update-content.js
```

**Paso 3: Deploy (1 min)**
```bash
git add .
git commit -m "🚀 Production ready"
git push origin main

# Deploy automático en Vercel + Railway
```

**Paso 4: Validación**
```bash
# Hacer una reserva real de prueba con $100
# Verificar emails lleguen
# Verificar pago se procese
```

---

## 🎓 Ventajas de Este Approach

### ✅ **Ventajas:**

1. **Desarrollo sin bloqueos:** No necesitas API keys reales para desarrollar
2. **Testing fácil:** Mock data predecible y controlable
3. **Transición rápida:** 5 minutos de configuración para producción
4. **Rollback seguro:** Puedes volver a mock si algo falla
5. **Costos controlados:** No gastas créditos de servicios en desarrollo
6. **Colaboración:** Otros devs pueden trabajar sin necesitar credenciales

### ⚠️ **Consideraciones:**

1. **Testing real pre-launch:** Hacer al menos 1 pago real en sandbox
2. **Validación de content:** Revisar que JSON de producción esté completo
3. **Logs claros:** Siempre logear cuando se usa modo mock
4. **Feature flags:** Documentar qué hace cada flag

---

## 🔍 Ejemplo de Uso

### Desarrollo Local
```bash
# .env (backend)
NODE_ENV=development
ENABLE_EMAILS=false
ENABLE_PAYMENTS=false
USE_MOCK_DATA=true
RESEND_API_KEY=MOCK_KEY
MP_ACCESS_TOKEN=TEST-MOCK-TOKEN

# .env (frontend)
VITE_USE_MOCK_DATA=true
VITE_ENABLE_REAL_PAYMENTS=false
```

**Resultado:**
- ✅ Todo funciona con datos mock
- ✅ No se envían emails reales
- ✅ No se procesan pagos reales
- ✅ Logs claros: `[MOCK]` en cada operación
- ✅ Base de datos local PostgreSQL

### Staging (Testing Pre-Launch)
```bash
# Railway Staging
ENABLE_EMAILS=true
ENABLE_PAYMENTS=true
RESEND_API_KEY=re_RealKey...
MP_ACCESS_TOKEN=TEST-SandboxToken...
MP_USE_SANDBOX=true
```

**Resultado:**
- ✅ Emails reales (usando onboarding@resend.dev)
- ✅ Pagos en Mercado Pago Sandbox
- ✅ Base de datos en Railway
- ✅ Testing completo sin afectar producción

### Producción
```bash
# Railway Production
NODE_ENV=production
ENABLE_EMAILS=true
ENABLE_PAYMENTS=true
USE_MOCK_DATA=false
RESEND_API_KEY=re_RealKey...
MP_ACCESS_TOKEN=APP_USR_ProdToken...
MP_USE_SANDBOX=false
```

**Resultado:**
- 🚀 Sistema 100% en vivo
- 📧 Emails reales desde reservas@passajero1900.com
- 💳 Pagos reales procesados
- 🗄️ Base de datos de producción

---

## 📅 Timeline Propuesto

| Fase | Duración | Actividades |
|------|----------|-------------|
| **Ahora → Semana 1** | 3-4 días | Implementar feature flags y wrappers |
| **Semana 1 → Semana 2** | 2-3 días | Sistema de contenido y scripts |
| **Semana 2** | 1 día | Testing exhaustivo en staging |
| **Semana 3** | 1 día | Solicitar contenido real al cliente |
| **Día del Launch** | 5 minutos | Actualizar keys, contenido, deploy |

---

**Total: ~2 semanas de desarrollo + 5 minutos de configuración final**

El cliente puede tomarse todo el tiempo que necesite para fotos y textos sin bloquear el desarrollo! 🎉

---

**Última actualización:** 6 de noviembre de 2025
