# adsBigger Blog — Guía para agregar artículos

Documento técnico de referencia para mantener coherencia de diseño, SEO, WPO y enlazado interno en el blog.

---

## 1. Estructura de archivos

```
vite-app/src/
  pages/
    BlogPage.jsx                    ← Listado principal (/blog)
    blog/
      SistemaDeAdquisicionPage.jsx  ← Artículo: /blog/sistema-de-adquisicion
      [NuevoArticulo]Page.jsx       ← Próximos artículos aquí
```

### Convención de nombres

| URL del artículo | Archivo |
|---|---|
| `/blog/mi-titulo-del-articulo` | `src/pages/blog/MiTituloDelArticuloPage.jsx` |

**Reglas:**
- URL: kebab-case, todo en minúsculas, sin tildes (`adquisicion` no `adquisición`)
- Archivo: PascalCase + `Page.jsx`
- Ejemplo: `/blog/framework-bant` → `FrameworkBantPage.jsx`

---

## 2. Cómo agregar un nuevo artículo

### Paso 1 — Crear el archivo del artículo

Copia la estructura base de `SistemaDeAdquisicionPage.jsx`. El esqueleto mínimo es:

```jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../components/Reveal';

const C = {
  bg: '#F5F2EC', ink: '#1a1612', soft: '#3a342c',
  muted: '#7a6f60', rule: 'rgba(26,22,18,0.12)',
  ruleStrong: 'rgba(26,22,18,1)', red: '#D51A05',
};

export default function MiArticuloPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Título del artículo · adsBigger Blog';
    return () => { document.title = 'adsBigger™ — Instalamos sistemas, no vendemos anuncios'; };
  }, []);

  return (
    <main style={{ background: C.bg, color: C.ink, minHeight: '100vh' }}>
      {/* ReadingProgress, Breadcrumb, ArticleMasthead, ArticleBody, ArticleCTA, RelatedPosts */}
    </main>
  );
}
```

### Paso 2 — Registrar la ruta en App.jsx

En `src/App.jsx`, agregar:
1. El import lazy en la sección de imports:
```jsx
const MiArticuloPage = lazy(() => import('./pages/blog/MiArticuloPage'));
```

2. La ruta dentro de `<Routes>`:
```jsx
<Route path="/blog/mi-titulo-del-articulo" element={<MiArticuloPage />} />
```

### Paso 3 — Agregar al listado en BlogPage.jsx

En `src/pages/BlogPage.jsx`, dentro del array `POSTS`, agregar al principio (orden cronológico inverso):

```js
{
  num: '09',                          // Número consecutivo
  cat: 'Adquisición',                 // Una de: Adquisición | Calificación | Cierre | Operación
  title: 'El título del artículo.',   // Con punto final, sin comillas tipográficas
  dek: 'El subtítulo editorial…',     // 1-2 frases en cursiva, máx. 140 caracteres
  stats: [
    { n: '23%', l: 'mejora CPL' },    // Stat 1: número + etiqueta corta
    { n: '8 días', l: 'implementación' }, // Stat 2
  ],
  read: '10 MIN',                     // Tiempo de lectura estimado
  date: '03 MAY',                     // Fecha de publicación (sin año)
  slug: 'mi-titulo-del-articulo',     // El segmento de la URL (sin /blog/)
},
```

### Paso 4 — Actualizar el artículo destacado (opcional)

Si el nuevo artículo reemplaza al destacado en `BlogPage.jsx`, actualizar la sección `<Featured>` con el nuevo título, dek, slug y meta.

---

## 3. Estructura interna de un artículo

### Metadatos obligatorios

```jsx
// En useEffect del componente página:
document.title = '[Título del artículo] · adsBigger Blog';
```

**No hay react-helmet instalado.** Para artículos con fuerte intención SEO, se puede instalar:
```bash
npm install react-helmet-async
```
Y agregar meta description, og:title, og:description en cada artículo.

### Componentes disponibles

Todos estos componentes están definidos en `SistemaDeAdquisicionPage.jsx` y se pueden copiar directamente o extraer a `src/components/blog/` si se reutilizan mucho:

| Componente | Uso |
|---|---|
| `ReadingProgress` | Barra de progreso de lectura fija en top |
| `Breadcrumb` | Navegación: adsBigger · Blog · Artículo |
| `ArticleMasthead` | Header con título, autor, fecha, tiempo de lectura |
| `SectionLabel` | Etiqueta de sección numerada (Nº + CATEGORÍA) |
| `Callout` | Cita destacada con borde izquierdo |
| `StatBox` | Número grande + etiqueta + nota |
| `StackItem` | Fila de tabla para comparativas de herramientas |
| `RelatedPosts` | Grid de 3 artículos relacionados al final |
| `ArticleCTA` | Bloque CTA dark hacia Sprint/Diagnóstico |

### Paleta de colores del blog

```js
const C = {
  bg:         '#F5F2EC',               // Fondo crema/pergamino
  ink:        '#1a1612',               // Texto principal oscuro
  soft:       '#3a342c',               // Texto secundario (cuerpo de artículo)
  muted:      '#7a6f60',               // Labels, fechas, metadatos
  rule:       'rgba(26,22,18,0.12)',   // Líneas divisoras suaves
  ruleStrong: 'rgba(26,22,18,1)',      // Líneas divisoras principales
  red:        '#D51A05',               // Acento rojo (categorías, CTAs, borde izq.)
};
```

**No usar** los CSS variables `--obsidian`, `--white`, etc. del sistema global: el blog tiene su propia paleta clara.

### Tipografía en el artículo

```jsx
// Cuerpo del artículo (prosa)
fontFamily: 'EB Garamond, Georgia, serif'
fontSize: 'clamp(18px, 2vw, 21px)'
lineHeight: 1.68
color: C.soft

// H2 (secciones principales)
fontFamily: 'DM Serif Display, serif'
fontSize: 'clamp(24px, 3.2vw, 36px)'
letterSpacing: '-0.018em'
color: C.ink

// H3 (subsecciones)
fontFamily: 'DM Sans, sans-serif'
fontWeight: 700
fontSize: 'clamp(16px, 2vw, 19px)'
color: C.ink

// Labels y metadatos
fontFamily: 'JetBrains Mono, monospace'  // className="mono"
fontSize: 11px, letterSpacing: '.2em', textTransform: 'uppercase'
```

---

## 4. SEO — Guía por artículo

### Checklist antes de publicar

- [ ] **`<title>`** con la keyword principal al inicio: `"Framework BANT para leads High-Ticket · adsBigger Blog"`
- [ ] **H1** coincide con el intent de búsqueda exacto (no el título clickbait)
- [ ] **H2 y H3** usan variaciones semánticas de la keyword principal
- [ ] **Primer párrafo** contiene la keyword y resume el artículo en 2-3 frases
- [ ] **Meta description** de 120-155 caracteres (agregar via react-helmet-async)
- [ ] **URL** en kebab-case, máx. 60 caracteres, sin stop words
- [ ] **Enlace interno** a al menos 2 otros artículos del blog (`<Link to="/blog/...">`)
- [ ] **Enlace interno** al Sprint o Diagnóstico desde el cuerpo del artículo
- [ ] **Alt text** en imágenes si las hay (descriptivo, con keyword si natural)

### Estructura de keywords por categoría

| Categoría | Keywords primarias |
|---|---|
| Adquisición | "sistema de adquisición clientes", "campañas Meta high ticket", "landing page high ticket" |
| Calificación | "filtrar leads calificados", "framework BANT ventas", "lead scoring automatizado" |
| Cierre | "discovery call script", "SOP ventas high ticket", "proceso de cierre" |
| Operación | "automatización ventas n8n", "dashboard métricas CEO", "CAC LTV ROAS" |

### Schema markup recomendado (futuro)

Agregar `<script type="application/ld+json">` con schema `Article` para cada artículo:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "author": { "@type": "Person", "name": "Cristian González" },
  "publisher": { "@type": "Organization", "name": "adsBigger" },
  "datePublished": "2026-04-26"
}
```

---

## 5. WPO — Rendimiento web

### Imágenes

- Formato: **WebP** siempre. Si hay JPG/PNG, convertir antes de subir.
- Tamaño máximo: **200KB** para imágenes de artículo, **80KB** para thumbnails.
- Siempre agregar `loading="lazy"` en `<img>` que estén debajo del fold.
- Usar `width` y `height` explícitos para evitar layout shift (CLS).

```jsx
<img
  src="/blog/mi-imagen.webp"
  alt="Descripción de la imagen"
  width={800} height={450}
  loading="lazy"
  style={{ width: '100%', height: 'auto' }}
/>
```

### Code splitting

Cada artículo se carga con `lazy()` en `App.jsx`. Esto garantiza que el JS del artículo solo se descarga cuando el usuario navega a esa URL. **No importar artículos directamente** (sin lazy) en App.jsx.

### Fuentes

Las Google Fonts ya están preconectadas en `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
El display de las fuentes del blog (`DM Serif Display`, `EB Garamond`, `JetBrains Mono`, `DM Sans`) ya está incluido en el `<link>` de Google Fonts existente. No agregar nuevas fuentes.

### Core Web Vitals — objetivos

| Métrica | Objetivo |
|---|---|
| LCP (Largest Contentful Paint) | < 2.5s |
| CLS (Cumulative Layout Shift) | < 0.1 |
| INP (Interaction to Next Paint) | < 200ms |

Verificar con [PageSpeed Insights](https://pagespeed.web.dev/) después de cada artículo publicado.

---

## 6. Enlazado interno — Estrategia

### Regla de 3 enlaces por artículo

Cada artículo debe tener mínimo:
1. **1 enlace a otro artículo del blog** relevante por tema (en el cuerpo del texto)
2. **1 enlace al Sprint o Kit** desde el cuerpo o desde `ArticleCTA`
3. **1 enlace al Diagnóstico** (en el CTA final o en la introducción)

### Actualizar RelatedPosts

Al agregar un artículo nuevo, revisar los artículos existentes y agregar el nuevo en los `RelatedPosts` de los artículos relacionados. El componente `RelatedPosts` en cada artículo tiene un array hardcoded que hay que actualizar manualmente.

### Estructura de anchors

El componente `Breadcrumb` ya incluye el trail `adsBigger · Blog · Artículo`. No duplicar esta navegación en otro lugar de la página.

---

## 7. Rastreo y analítica

### Eventos por artículo

El trackeo automático de pageview ya está en `PageViewTracker` en `App.jsx`. Para eventos específicos de blog, usar el hook `useMarketingStack`:

```jsx
import useMarketingStack from '../../hooks/useMarketingStack';

// En el componente:
const { track } = useMarketingStack();

// Al hacer clic en un CTA:
track('CTA_Click', { label: 'Blog_Article_Sprint_CTA', article: 'sistema-de-adquisicion' });
```

### UTM para el newsletter del blog

Al compartir artículos en redes sociales, usar:
```
?utm_source=instagram&utm_medium=organic&utm_campaign=blog&utm_content=sistema-adquisicion
```

---

## 8. Flujo de publicación completo

```
1. Escribir artículo en Notion (borrador)
2. Crear [NombreArticulo]Page.jsx en src/pages/blog/
3. Agregar lazy import + route en App.jsx
4. Agregar entrada al array POSTS en BlogPage.jsx
5. Actualizar RelatedPosts en artículos relacionados
6. Verificar document.title y breadcrumb
7. Verificar enlaces internos (mínimo 3)
8. Deploy y verificar en PageSpeed Insights
9. Compartir en redes con UTMs
```

---

## 9. Referencia rápida de categorías

| Emoji (solo para notas internas) | Nombre | Descripción |
|---|---|---|
| ◆ | Adquisición | Campañas, landings, tráfico pagado, creatividades |
| ◆ | Calificación | BANT, lead scoring, formularios, filtros automáticos |
| ◆ | Cierre | Discovery call, scripts, SOPs, follow-up |
| ◆ | Operación | Stack tecnológico, automatizaciones, métricas, dashboards |

El símbolo `◆` (Unicode U+25C6) se usa como bullet/decorador en toda la UI del blog. Mantener consistencia.

---