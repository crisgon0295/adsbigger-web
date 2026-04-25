/* ═══════════════════════════════════════════════════════════
   UTILIDADES DE SEGURIDAD - adsBigger
   ═══════════════════════════════════════════════════════════ */

/**
 * Valida formato de email con regex mejorado
 * Más estricto que la validación HTML5 básica
 *
 * @param {string} email - Email a validar
 * @returns {boolean} - True si el email es válido
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;

  // Regex más estricto para emails profesionales
  // Rechaza: espacios, caracteres especiales inválidos, dominios sospechosos
  const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._+-]{0,63}@[a-zA-Z0-9][a-zA-Z0-9.-]{0,253}\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) return false;

  // Validaciones adicionales
  const [localPart, domain] = email.split('@');

  // Local part no debe empezar/terminar con punto
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;

  // No permitir puntos consecutivos
  if (localPart.includes('..') || domain.includes('..')) return false;

  // Longitud razonable
  if (email.length > 254) return false;

  // Lista negra de dominios temporales comunes (opcional)
  const tempDomains = [
    'tempmail.com', 'guerrillamail.com', '10minutemail.com',
    'throwaway.email', 'mailinator.com', 'yopmail.com'
  ];

  const emailDomain = domain.toLowerCase();
  if (tempDomains.some(temp => emailDomain.endsWith(temp))) {
    console.warn('Email temporal detectado:', email);
    return false;
  }

  return true;
}

/**
 * Sanitiza string para prevenir inyección
 * Remueve caracteres peligrosos antes de enviar a APIs
 *
 * @param {string} input - String a sanitizar
 * @returns {string} - String sanitizado
 */
export function sanitizeInput(input) {
  if (!input || typeof input !== 'string') return '';

  return input
    .trim()
    // Remover caracteres de control
    .replace(/[\x00-\x1F\x7F]/g, '')
    // Remover scripts HTML
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Limitar longitud razonable
    .slice(0, 500);
}

/**
 * Genera nonce único para CSP
 * Usado para permitir scripts inline específicos
 *
 * @returns {string} - Nonce aleatorio
 */
export function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

/**
 * Rate limiter simple del lado del cliente
 * Previene spam de formularios
 *
 * @param {string} key - Identificador único (ej: 'email-submit')
 * @param {number} windowMs - Ventana de tiempo en ms (default: 60000 = 1 min)
 * @param {number} maxAttempts - Máximo de intentos en la ventana (default: 3)
 * @returns {boolean} - True si está permitido, false si excede el límite
 */
export function checkRateLimit(key, windowMs = 60000, maxAttempts = 3) {
  const now = Date.now();
  const storageKey = `ratelimit_${key}`;

  // Obtener intentos previos
  let attempts = [];
  try {
    const stored = localStorage.getItem(storageKey);
    attempts = stored ? JSON.parse(stored) : [];
  } catch (e) {
    // Si falla localStorage, permitir (modo degradado)
    return true;
  }

  // Filtrar intentos dentro de la ventana de tiempo
  attempts = attempts.filter(timestamp => now - timestamp < windowMs);

  // Verificar si excede el límite
  if (attempts.length >= maxAttempts) {
    console.warn(`Rate limit excedido para: ${key}`);
    return false;
  }

  // Agregar intento actual
  attempts.push(now);
  try {
    localStorage.setItem(storageKey, JSON.stringify(attempts));
  } catch (e) {
    // Si falla localStorage, continuar
  }

  return true;
}

/**
 * Realiza fetch seguro a webhook con token y validaciones
 *
 * @param {string} endpoint - Endpoint del webhook (relativo a VITE_N8N_BASE_URL)
 * @param {object} data - Datos a enviar
 * @param {object} options - Opciones adicionales
 * @returns {Promise} - Response del fetch
 */
export async function secureFetch(endpoint, data, options = {}) {
  const baseUrl = import.meta.env.VITE_N8N_BASE_URL || 'https://devn8n.adsbigger.cloud';
  const webhookSecret = import.meta.env.VITE_WEBHOOK_SECRET;

  // Sanitizar datos antes de enviar
  const sanitizedData = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      sanitizedData[key] = sanitizeInput(value);
    } else {
      sanitizedData[key] = value;
    }
  }

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Agregar token de seguridad si está configurado
  if (webhookSecret) {
    headers['X-Webhook-Secret'] = webhookSecret;
  }

  // Agregar timestamp para prevenir replay attacks
  headers['X-Request-Time'] = Date.now().toString();

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...sanitizedData,
        _meta: {
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        },
      }),
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('Error en secureFetch:', error);
    throw error;
  }
}

/**
 * Valida respuesta de webhook
 * Verifica que la respuesta sea legítima
 *
 * @param {Response} response - Response de fetch
 * @returns {Promise<boolean>} - True si es válida
 */
export async function validateWebhookResponse(response) {
  if (!response.ok) return false;

  try {
    // Verificar content-type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.warn('Respuesta de webhook no es JSON');
      return false;
    }

    const data = await response.json();

    // Verificar estructura mínima esperada
    if (!data || typeof data !== 'object') {
      return false;
    }

    return true;
  } catch (e) {
    console.error('Error validando respuesta de webhook:', e);
    return false;
  }
}

/**
 * Honeypot virtual (trampa para bots)
 * Agrega campo oculto que bots llenan pero humanos no
 *
 * @returns {object} - { fieldName, shouldReject }
 */
export function createHoneypot() {
  const fieldName = `${Date.now()}_hp`;

  return {
    fieldName,
    // Validar: si el campo tiene valor, es un bot
    shouldReject: (value) => value && value.length > 0,
  };
}

/**
 * Detecta comportamiento sospechoso del usuario
 *
 * @param {number} formFillTime - Tiempo en ms que tomó llenar el formulario
 * @returns {boolean} - True si el comportamiento es sospechoso
 */
export function detectSuspiciousBehavior(formFillTime) {
  // Si llenó el formulario en menos de 2 segundos, probablemente es un bot
  if (formFillTime < 2000) {
    console.warn('Formulario llenado demasiado rápido (posible bot)');
    return true;
  }

  // Si tomó más de 30 minutos, la sesión puede estar comprometida
  if (formFillTime > 30 * 60 * 1000) {
    console.warn('Formulario llenado demasiado lento (sesión expirada)');
    return true;
  }

  return false;
}

/**
 * Hashea email para tracking anónimo
 * Útil para analytics sin exponer PII
 *
 * @param {string} email - Email a hashear
 * @returns {Promise<string>} - Hash SHA-256 del email
 */
export async function hashEmail(email) {
  const normalized = email.toLowerCase().trim();
  const msgUint8 = new TextEncoder().encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
