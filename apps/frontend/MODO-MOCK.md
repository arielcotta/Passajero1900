# 🚀 Modo de Prueba (Mock) - PASSAJERO1900 Frontend

## ¿Qué es el modo mock?

El frontend ahora funciona **completamente sin backend** para que puedas probar todo el flujo de reserva. Los datos se simulan y se guardan en el navegador (localStorage).

## ✅ Funcionalidades disponibles en modo mock

### 1. **Habitaciones de prueba** (Configuración oficial - 4 nov 2025)
- ✅ Habitación Compartida Mixta - 4 camas individuales
- ✅ Habitación Privada para Pareja 1 - Cama doble (máx. 2 personas)
- ✅ Habitación Privada para Pareja 2 - Cama doble (máx. 2 personas)

**Precios oficiales:**
- 💰 **$35,000/noche** para estadías de 1-2 noches
- 💰 **$30,000/noche** para estadías de 3+ noches (descuento por estadía extendida)

**Capacidad total:** 8 personas

### 2. **Flujo de reserva completo**
1. ✅ Selección de fechas con validaciones
2. ✅ Visualización de habitaciones disponibles con imágenes reales
3. ✅ Selección de camas (para compartidas)
4. ✅ Formulario de datos del huésped con validación
5. ✅ Resumen de pago con cálculo automático (30% seña para 3+ noches)
6. ✅ Simulación de pago exitoso
7. ✅ Página de confirmación con código de reserva

### 3. **Datos que se guardan**
- Todas las reservas de prueba se guardan en el navegador
- Podés consultar reservas por código
- Persisten entre recargas de página

## 🔧 Cómo funciona

### Detección automática del backend
El frontend **intenta conectarse al backend primero**. Si no está disponible:
- ⚠️ Muestra un mensaje en consola: "Backend no disponible, usando datos de prueba"
- ✅ Activa automáticamente el modo mock
- 🎯 Todo sigue funcionando normalmente

### Cálculos automáticos
El modo mock simula la lógica del backend según BLUEPRINT:
```typescript
// Precios oficiales
// - $35,000/noche (1-2 noches)
// - $30,000/noche (3+ noches)

const pricePerNight = nights >= 3 ? 30000 : 35000;
const totalAmount = pricePerNight * nights;

// Lógica de pago:
// - 1-2 noches = 100% del total
// - 3+ noches = 30% de seña (70% al check-in)
const paidAmount = nights >= 3 ? totalAmount * 0.3 : totalAmount;
```

### Códigos de reserva
- Se generan automáticamente (ej: `ABC123`, `XYZ789`)
- Son únicos por reserva
- Se usan para consultar la reserva después

## 🎨 Logo incluido

El logo oficial (`logo.svg`) está en:
```
apps/frontend/src/assets/logo.svg
```

Se muestra en:
- ✅ Navbar (esquina superior izquierda)
- Efecto hover con escala animada

## 🧪 Probando el flujo

1. **Iniciá el frontend:**
```bash
cd apps/frontend
pnpm dev
```

2. **Navegá a:** `http://localhost:8854`

3. **Seguí el flujo:**
   - Clic en "Reservar Ahora" o ir a `/reservar`
   - Elegí fechas de check-in y check-out
   - Seleccioná una habitación (y cama si es compartida)
   - Completá el formulario con tus datos
   - Revisá el resumen y hacé clic en "Confirmar y Pagar"
   - ¡Listo! Te redirige a la página de éxito con tu código de reserva

4. **Consultá tu reserva:**
   - Abrí la consola del navegador (F12)
   - Ejecutá: `JSON.parse(localStorage.getItem('mockReservations'))`
   - Verás todas las reservas de prueba

## 🔄 Limpiando datos de prueba

Para empezar de cero:
```javascript
// En la consola del navegador:
localStorage.removeItem('mockReservations')
```

## 🚀 Cambio a backend real

Cuando el backend esté corriendo:
1. Asegurate que esté en `http://localhost:9267`
2. El frontend detectará automáticamente que está disponible
3. Dejará de usar datos mock y consultará datos reales
4. **No hay que cambiar nada en el código**

## 📝 Notas importantes

- ✅ Los datos mock son **temporales** (se guardan solo en tu navegador)
- ✅ Cada navegador tiene sus propios datos
- ✅ Si borrás las cookies/datos del navegador, perdés las reservas mock
- ✅ El modo mock es **solo para desarrollo y pruebas**
- ✅ En producción, el backend **siempre debe estar disponible**

## 🎯 Próximos pasos

Cuando el backend esté listo:
1. ❌ Eliminar los datos mock del código (o dejarlos como fallback)
2. ✅ Configurar las URLs de callback de Mercado Pago
3. ✅ Agregar las credenciales reales en variables de entorno
4. ✅ Probar el flujo completo con pagos reales

---

**¡Ahora podés probar todo el flujo de reserva sin necesidad del backend!** 🎉
