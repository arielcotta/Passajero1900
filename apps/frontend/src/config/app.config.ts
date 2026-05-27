/**
 * Configuración centralizada del frontend
 *
 * Este archivo maneja:
 * - Feature flags para desarrollo/producción
 * - URLs de servicios
 * - Configuración de APIs externas
 * - Timeouts y retry logic
 */

const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const appConfig = {
  // Environment
  isDevelopment,
  isProduction,
  mode: import.meta.env.MODE,

  // Feature Flags
  /**
   * Usar datos mock en lugar de llamar al backend real
   * - true: Usa localStorage y datos hardcodeados (ideal para desarrollo sin backend)
   * - false: Llama a API real del backend
   */
  useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false', // true por defecto

  /**
   * Habilitar pagos reales con Mercado Pago
   * - true: Genera links de pago reales (requiere API key válida)
   * - false: Simula proceso de pago (ideal para testing de UI)
   */
  enableRealPayments: import.meta.env.VITE_ENABLE_REAL_PAYMENTS === 'true',

  /**
   * Mostrar logs de debugging en consola
   * - Auto-habilitado en desarrollo
   * - Deshabilitado en producción
   */
  enableDebugLogs: isDevelopment || import.meta.env.VITE_ENABLE_DEBUG === 'true',

  // API Configuration
  /**
   * URL base del backend
   * - Desarrollo: http://localhost:9267/api
   * - Producción: https://api.passajero1900.com/api
   */
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:9267/api',

  /**
   * Timeout para requests de API (milisegundos)
   */
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10),

  /**
   * Intentos de retry en caso de error de red
   */
  apiRetryAttempts: parseInt(import.meta.env.VITE_API_RETRY_ATTEMPTS || '3', 10),

  // Mercado Pago
  /**
   * Public Key de Mercado Pago
   * - TEST-xxx: Modo sandbox (tarjetas de prueba)
   * - APP_USR-xxx: Modo producción (tarjetas reales)
   */
  mercadoPagoPublicKey: import.meta.env.VITE_MP_PUBLIC_KEY || 'TEST-MOCK-PUBLIC-KEY',

  /**
   * Detectar si estamos en modo sandbox de Mercado Pago
   */
  isMercadoPagoSandbox: (import.meta.env.VITE_MP_PUBLIC_KEY || '').startsWith('TEST-'),

  // URLs públicas
  /**
   * URL pública del sitio (para compartir, emails, etc.)
   */
  publicUrl: import.meta.env.VITE_PUBLIC_URL || 'http://localhost:8854',

  // Análisis y Monitoreo (para futuro)
  /**
   * Google Analytics ID (opcional)
   */
  googleAnalyticsId: import.meta.env.VITE_GA_ID,

  /**
   * Sentry DSN para tracking de errores (opcional)
   */
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,

  // Helpers
  /**
   * Log condicional basado en enableDebugLogs
   */
  log: (...args: any[]) => {
    if (appConfig.enableDebugLogs) {
      console.log('[App]', ...args);
    }
  },

  /**
   * Warning condicional
   */
  warn: (...args: any[]) => {
    if (appConfig.enableDebugLogs) {
      console.warn('[App]', ...args);
    }
  },

  /**
   * Error siempre se muestra (incluso en prod)
   */
  error: (...args: any[]) => {
    console.error('[App]', ...args);
  },
};

// Logs de inicialización
if (appConfig.enableDebugLogs) {
  console.log('🚀 App Config:', {
    mode: appConfig.mode,
    useMockData: appConfig.useMockData,
    enableRealPayments: appConfig.enableRealPayments,
    apiUrl: appConfig.apiUrl,
    isMercadoPagoSandbox: appConfig.isMercadoPagoSandbox,
  });

  if (appConfig.useMockData) {
    console.log('📦 Modo MOCK activado - No se conectará al backend');
  }

  if (!appConfig.enableRealPayments) {
    console.log('💳 Pagos simulados - No se procesarán pagos reales');
  }

  if (appConfig.isMercadoPagoSandbox) {
    console.log('🏖️  Mercado Pago en modo SANDBOX - Usar tarjetas de prueba');
  }
}

export default appConfig;
