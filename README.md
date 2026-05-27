# 🏨 PASSAJERO1900 - Sistema de Reservas

Sistema web completo para gestión de reservas del hostel PASSAJERO1900 en La Plata, Argentina.

## 🚀 Stack Tecnológico

- **Monorepo:** Turborepo + pnpm workspaces
- **Backend:** Express.js + TypeScript + TypeORM + PostgreSQL
- **Frontend:** React 18 + Vite + TailwindCSS + shadcn/ui
- **Pagos:** Mercado Pago
- **Email:** Resend
- **Containerización:** Docker + Docker Compose

## 📁 Estructura del Proyecto

```
passajero-1900/
├── apps/
│   ├── backend/          # API REST
│   └── frontend/         # Web pública + Panel admin
├── packages/
│   └── typescript-config/  # Configuraciones TS compartidas
├── docker/               # Scripts de inicialización DB
└── docs/                 # Documentación
```

## 🛠️ Setup Inicial

### Prerrequisitos

- Node.js v20+
- pnpm v9+
- Docker Desktop

### Instalación

```bash
# Instalar dependencias
pnpm install

# Iniciar base de datos
docker-compose up -d

# Modo desarrollo (backend + frontend)
pnpm dev
```

## 📚 Documentación

- [BLUEPRINT.md](./BLUEPRINT.md) - Especificaciones del proyecto
- [FLUJO_RESERVA.md](./FLUJO_RESERVA.md) - Flujo detallado de usuario
- [CONFIGURACION_TECNICA.md](./CONFIGURACION_TECNICA.md) - Stack y configuración técnica

## 🔐 Panel Admin

URL de acceso: `/admin-passajero1900`

## 📧 Contacto

- **Email:** passajero1900@gmail.com
- **WhatsApp:** +54 221 221-5555
- **Dirección:** Calle 55 N°613 entre 7 y 8, La Plata, CP 1900

---

**Desarrollado para:** Alejandra Elizabeth Bollón  
**Versión:** 1.0.0
