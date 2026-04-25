# 🔐 CONFIGURACIÓN DE SEGURIDAD PARA WEBHOOKS N8N

## 📋 OVERVIEW

Para proteger tus webhooks de n8n contra acceso no autorizado, debes implementar validación de tokens en cada workflow.

---

## 🔑 PASO 1: GENERAR TOKEN SEGURO

### Opción A: Usando OpenSSL (Recomendado)
```bash
openssl rand -hex 32
```

### Opción B: Usando Node.js
```javascript
require('crypto').randomBytes(32).toString('hex')
```

### Opción C: Generador Online
https://www.random.org/strings/?num=1&len=64&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new

**Ejemplo de token:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

---

## ⚙️ PASO 2: CONFIGURAR TOKEN EN .env

1. Copiar el archivo de ejemplo:
```bash
cd vite-app
cp .env.example .env
```

2. Editar `.env` y reemplazar el token:
```bash
# vite-app/.env
VITE_WEBHOOK_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2
```

3. **NUNCA** commitear el archivo `.env` a Git (ya está en `.gitignore`)

---

## 🛠️ PASO 3: CONFIGURAR WEBHOOKS EN N8N

### Para CADA workflow con webhook, sigue estos pasos:

#### 1. Agregar nodo "IF" después del Webhook

```
Webhook → IF → [Tu lógica actual]
           ↓
         [Error Response]
```

#### 2. Configurar el nodo IF:

**Condición:**
```
Expression: {{ $node["Webhook"].json["headers"]["x-webhook-secret"] === "TU_TOKEN_AQUI" }}
```

**O usando variables de entorno de n8n:**
```
Expression: {{ $node["Webhook"].json["headers"]["x-webhook-secret"] === $env.WEBHOOK_SECRET }}
```

#### 3. Ruta TRUE (token válido):
- Conectar a tu lógica normal

#### 4. Ruta FALSE (token inválido):
- Agregar nodo "Respond to Webhook"
- Configurar:
  - **Response Code:** 401
  - **Response Body:**
    ```json
    {
      "error": "Unauthorized",
      "message": "Invalid webhook secret"
    }
    ```

---

## 📝 EJEMPLO COMPLETO DE WORKFLOW N8N

### Configuración visual:

```
┌─────────────┐
│   Webhook   │ (Método: POST, Path: /diagnostico-resultado)
└──────┬──────┘
       │
       ▼
┌──────────────┐
│   IF (Auth)  │ (Condition: header match)
└──┬────────┬──┘
   │        │
   │ TRUE   │ FALSE
   │        │
   ▼        ▼
┌────────┐ ┌─────────────┐
│ Process│ │  Error 401  │
│  Data  │ └─────────────┘
└────┬───┘
     │
     ▼
┌──────────────┐
│ Send to CRM  │
└──────────────┘
```

### Código del nodo IF:

**Condition Type:** Expression

**Expression:**
```javascript
{{
  $node["Webhook"].json["headers"]["x-webhook-secret"] === "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2"
}}
```

---

## 🔄 WEBHOOKS A ACTUALIZAR

Actualiza TODOS estos workflows en n8n:

1. `/webhook/kit-event`
2. `/webhook/adsbigger-lead-magnet`
3. `/webhook/diagnostico-resultado`
4. `/webhook/diagnostico-agendar`
5. `/webhook/kit-purchase-intent`
6. `/webhook/sprint-apply`

---

## 🧪 PASO 4: PROBAR LA SEGURIDAD

### Test 1: Request sin token (debe fallar)
```bash
curl -X POST https://devn8n.adsbigger.cloud/webhook/diagnostico-resultado \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com"}'

# Respuesta esperada: 401 Unauthorized
```

### Test 2: Request con token incorrecto (debe fallar)
```bash
curl -X POST https://devn8n.adsbigger.cloud/webhook/diagnostico-resultado \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: token_incorrecto" \
  -d '{"email":"test@test.com"}'

# Respuesta esperada: 401 Unauthorized
```

### Test 3: Request con token correcto (debe funcionar)
```bash
curl -X POST https://devn8n.adsbigger.cloud/webhook/diagnostico-resultado \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Secret: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2" \
  -d '{"email":"test@test.com"}'

# Respuesta esperada: 200 OK (o tu respuesta normal)
```

---

## 📊 LOGGING Y MONITOREO

### Agregar logging en n8n para requests fallidos:

Después del nodo IF (rama FALSE), agregar nodo "Function":

```javascript
// Log failed authentication attempts
const timestamp = new Date().toISOString();
const ip = $node["Webhook"].json["headers"]["x-forwarded-for"] || "unknown";
const userAgent = $node["Webhook"].json["headers"]["user-agent"] || "unknown";

console.error(`[SECURITY] Unauthorized webhook attempt:
  - Time: ${timestamp}
  - IP: ${ip}
  - User-Agent: ${userAgent}
  - Endpoint: ${$node["Webhook"].json["path"]}
`);

return {
  json: {
    error: "Unauthorized",
    logged: true
  }
};
```

---

## 🚨 ALERTAS DE SEGURIDAD (Opcional)

### Enviar email en intentos fallidos múltiples:

Puedes agregar un nodo que envíe alerta si detecta más de 10 intentos fallidos en 5 minutos.

**Ejemplo de lógica:**
1. Guardar intentos fallidos en variable global
2. Si `intentos > 10` en 5 minutos → enviar email de alerta
3. Incluir IP, timestamp, user-agent del atacante

---

## 🔐 MEJORES PRÁCTICAS

### ✅ HACER:
- Usar token diferente para producción y desarrollo
- Rotar el token cada 3-6 meses
- Nunca compartir el token por email/chat sin cifrar
- Guardar el token en gestor de contraseñas (1Password, Bitwarden)
- Monitorear logs de n8n para intentos fallidos

### ❌ NO HACER:
- Commitear `.env` a Git
- Usar el mismo token en múltiples proyectos
- Hardcodear el token en código
- Compartir el token por canales inseguros
- Usar tokens débiles o predecibles

---

## 🔄 ROTACIÓN DE TOKEN

### Cada 3-6 meses:

1. Generar nuevo token
2. Actualizar en `.env` del proyecto
3. Actualizar en TODOS los workflows de n8n
4. Rebuild y redeploy del sitio
5. Verificar que todo funciona
6. Invalidar token anterior

---

## 📞 TROUBLESHOOTING

### Problema: "Request bloqueado por CORS"
**Solución:** Verificar que n8n tenga CORS habilitado para tu dominio

### Problema: "401 Unauthorized en producción"
**Solución:** Verificar que el `.env` en producción tenga el token correcto

### Problema: "Token no llega al webhook"
**Solución:** Verificar que `secureFetch` esté enviando el header `X-Webhook-Secret`

### Problema: "Headers undefined en n8n"
**Solución:** Usar `$node["Webhook"].json["headers"]["x-webhook-secret"]` en lugar de `$input.headers`

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- [ ] Token generado con OpenSSL o método seguro
- [ ] Token guardado en `vite-app/.env`
- [ ] `.env` agregado a `.gitignore` (ya está)
- [ ] Todos los webhooks en n8n actualizados con validación
- [ ] Tests de seguridad pasados (sin token = 401)
- [ ] Logging de intentos fallidos configurado
- [ ] Token guardado en gestor de contraseñas
- [ ] Documentación de rotación de token creada
- [ ] Rebuild y deploy del sitio completado

---

**Fecha de creación:** 25 de abril de 2026
**Última actualización:** 25 de abril de 2026
**Próxima rotación de token:** Julio 2026
