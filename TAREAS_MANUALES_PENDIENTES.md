# ⚠️ TAREAS MANUALES PENDIENTES - Optimización de Rendimiento

## 1. CONVERSIÓN DE IMÁGENES A WebP/AVIF (Alta Prioridad)

### Archivos a optimizar:
```
📁 assets/
  ├── logo-adsbigger-white.png  (392 KB) 🔴 MUY PESADO
  ├── logo-icon-black.png       (85 KB)  🟡 Optimizable
  └── logo-icon-white.png       (86 KB)  🟡 Optimizable
```

### Objetivo:
- Reducir `logo-adsbigger-white.png` de 392 KB a ~30-40 KB
- Reducir `logo-icon-*.png` de 85 KB a ~10-15 KB cada uno
- **Impacto estimado:** Ahorro de ~500 KB = Mejora significativa en LCP

---

### Opción 1: Squoosh (Recomendado - Más Fácil)

1. Ir a https://squoosh.app
2. Arrastrar cada imagen PNG
3. Configurar:
   - Formato de salida: **WebP**
   - Calidad: **85** (balance entre calidad y tamaño)
   - Resize si es necesario (verificar dimensiones reales usadas)
4. Descargar el WebP generado
5. Guardar en `assets/` con el mismo nombre pero extensión `.webp`

**Ejemplo:**
```
logo-adsbigger-white.png → logo-adsbigger-white.webp
logo-icon-black.png      → logo-icon-black.webp
logo-icon-white.png      → logo-icon-white.webp
```

---

### Opción 2: Línea de Comandos (cwebp)

**Instalación:**
```bash
# Windows (con Chocolatey)
choco install webp

# macOS
brew install webp

# Linux
sudo apt-get install webp
```

**Conversión:**
```bash
cd "D:\Paginas Web\Adsbigger Web\assets"

# Convertir con calidad 85
cwebp -q 85 logo-adsbigger-white.png -o logo-adsbigger-white.webp
cwebp -q 85 logo-icon-black.png -o logo-icon-black.webp
cwebp -q 85 logo-icon-white.png -o logo-icon-white.webp

# Verificar tamaños
ls -lh *.webp
```

---

### Opción 3: Photoshop / GIMP

**Photoshop:**
1. Abrir imagen
2. File → Export → Save for Web (Legacy)
3. Seleccionar formato WebP
4. Calidad: 85
5. Save

**GIMP:**
1. Instalar plugin WebP: https://github.com/maoschanz/gimp-plugin-webp
2. File → Export As
3. Seleccionar `.webp`
4. Ajustar calidad a 85

---

### Implementar WebP con Fallback

**Actualizar en Footer.jsx:**
```jsx
// Antes:
<img src="/logo-adsbigger-white.png" alt="adsBigger" width="160" height="32" ... />

// Después:
<picture>
  <source srcset="/assets/logo-adsbigger-white.webp" type="image/webp" />
  <img src="/assets/logo-adsbigger-white.png" alt="adsBigger" width="160" height="32" style={{ height: 32, objectFit: 'contain', opacity: 0.8 }} />
</picture>
```

**Actualizar en CuellosPage.jsx:**
```jsx
// Antes:
<img src="/logo-icon-black.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />

// Después:
<picture>
  <source srcset="/assets/logo-icon-black.webp" type="image/webp" />
  <img src="/assets/logo-icon-black.png" alt="" width="20" height="20" style={{ width: 20, height: 20, objectFit: 'contain' }} />
</picture>
```

---

## 2. OPTIMIZAR FAVICON (Prioridad Media)

El favicon actual (`logo-icon-white.png`) es 86 KB, demasiado para un favicon.

### Pasos:
1. Crear versión de 32x32 px del logo
2. Convertir a ICO multi-resolución o PNG optimizado
3. Objetivo: <10 KB

**Herramienta recomendada:**
- https://www.favicon-generator.org/
- https://realfavicongenerator.net/

**Actualizar en index.html:**
```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
```

---

## 3. HABILITAR BROTLI COMPRESSION (Prioridad Baja)

Si el servidor Apache soporta `mod_brotli` (mejor compresión que Gzip):

**Verificar soporte:**
```bash
apachectl -M | grep brotli
```

**Si está disponible, agregar a `.htaccess`:**
```apache
<IfModule mod_brotli.c>
  # Habilitar compresión Brotli
  AddOutputFilterByType BROTLI_COMPRESS text/html text/plain text/xml text/css
  AddOutputFilterByType BROTLI_COMPRESS application/javascript application/json
  AddOutputFilterByType BROTLI_COMPRESS application/xml application/xhtml+xml
  AddOutputFilterByType BROTLI_COMPRESS application/rss+xml
  AddOutputFilterByType BROTLI_COMPRESS font/ttf font/otf font/woff font/woff2
  AddOutputFilterByType BROTLI_COMPRESS image/svg+xml

  # Nivel de compresión (0-11, 6 es balance entre velocidad y ratio)
  BrotliCompressionQuality 6
</IfModule>
```

**Ventaja:** ~20% mejor compresión que Gzip

---

## 4. IMPLEMENTAR PRELOAD PARA FUENTES CRÍTICAS (Opcional)

Si las fuentes de Google son críticas para el LCP:

**Agregar a `vite-app/index.html`:**
```html
<!-- Después de los preconnect -->
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="https://fonts.gstatic.com/s/dmsans/[...].woff2">
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="https://fonts.gstatic.com/s/dmserif/[...].woff2">
```

**Nota:** Requiere conocer las URLs exactas de las fuentes que Google Fonts sirve.

---

## 5. VERIFICAR PLUGINS/MÓDULOS DE APACHE

### Módulos que DEBEN estar habilitados:

```bash
# Verificar módulos
apachectl -M | grep -E "(deflate|expires|headers|rewrite)"
```

**Deberías ver:**
- ✅ `deflate_module` (para Gzip)
- ✅ `expires_module` (para cache headers)
- ✅ `headers_module` (para cache-control)
- ✅ `rewrite_module` (para SPA routing)

**Si alguno falta, habilitar:**
```bash
# En Ubuntu/Debian
sudo a2enmod deflate
sudo a2enmod expires
sudo a2enmod headers
sudo a2enmod rewrite
sudo systemctl restart apache2

# En otras distros, editar httpd.conf y descomentar:
LoadModule deflate_module modules/mod_deflate.so
LoadModule expires_module modules/mod_expires.so
LoadModule headers_module modules/mod_headers.so
```

---

## 6. CDN (Opcional - Mejora Adicional)

Para usuarios fuera de Colombia, considerar CDN:

### Opciones gratuitas/económicas:
- **Cloudflare (Recomendado):**
  - Plan gratuito con CDN global
  - Brotli compression automático
  - Cache automático
  - Setup: https://www.cloudflare.com/

- **Netlify/Vercel:**
  - Para sitios estáticos
  - CDN incluido
  - Deploy automático desde Git

**Beneficios:**
- Distribución global (menor latencia)
- DDoS protection
- Compresión automática
- Cache optimizado

---

## CHECKLIST DE TAREAS MANUALES

### Alta Prioridad (Hacer ANTES del deploy):
- [ ] Convertir `logo-adsbigger-white.png` a WebP
- [ ] Convertir `logo-icon-black.png` a WebP
- [ ] Convertir `logo-icon-white.png` a WebP
- [ ] Actualizar componentes React para usar `<picture>` con WebP
- [ ] Rebuild con `npm run build` en vite-app/
- [ ] Copiar assets optimizados a la raíz

### Prioridad Media (Después del deploy inicial):
- [ ] Optimizar favicon a <10 KB
- [ ] Verificar módulos de Apache habilitados
- [ ] Medir PageSpeed Insights post-deploy

### Prioridad Baja (Optimización continua):
- [ ] Evaluar Brotli compression
- [ ] Considerar CDN (Cloudflare)
- [ ] Preload de fuentes críticas si es necesario

---

## COMANDOS ÚTILES

### Rebuild después de cambios:
```bash
cd "D:\Paginas Web\Adsbigger Web\vite-app"
npm run build
cd ..
cp -r vite-app/dist/* .
```

### Verificar tamaños de archivos:
```bash
ls -lh assets/*.{js,css,webp,png} | sort -k5 -h
```

### Test local antes de deploy:
```bash
cd vite-app
npm run preview
# Abrir http://localhost:4173
```

---

## SOPORTE

Si tienes problemas con alguna tarea:

1. **Conversión de imágenes:** Usa Squoosh.app (no requiere instalación)
2. **Módulos Apache:** Contacta a tu hosting provider
3. **Build errors:** Verificar versiones de Node.js (recomendado: v18+)

---

**Última actualización:** 25 de abril de 2026
