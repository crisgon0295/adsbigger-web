  
**adsBigger™**

*Instalamos sistemas, no vendemos anuncios.*

**PLAN MAESTRO DE DESARROLLO WEB**

Arquitectura, Tecnologías y Paso a Paso de Ejecución

adsbigger.com

Bogotá, Colombia · Abril 2026

**01 — STACK TECNOLÓGICO**

Este es el arsenal completo de tecnologías seleccionadas para construir adsbigger.com como una máquina de captura, posicionamiento y conversión. Cada herramienta fue elegida por una razón específica — rendimiento, SEO, compatibilidad con el Visual Brain, y capacidad de ejecución con Claude Code.

**Framework Principal**

| Tecnología | Versión | Por qué |
| :---- | :---- | :---- |
| **Next.js** | 15+ (App Router) | SSR/SSG híbrido, Metadata API nativa para SEO, ISR para blogs, rendimiento Core Web Vitals superior, compatible con Claude Code |
| **React** | 19+ | Server Components reduce JavaScript enviado al cliente, mejor TTI y LCP |
| **TypeScript** | 5.x | Tipado estricto para evitar errores en producción, autocompletado en Claude Code |

**Estilos y Animaciones**

| Tecnología | Función | Por qué |
| :---- | :---- | :---- |
| **Tailwind CSS** | Estilos utilitarios | Configuración directa de colores del Visual Brain (\#111111, \#D51A05, \#179DFF, etc.) como design tokens. Zero CSS custom innecesario. |
| **GSAP \+ ScrollTrigger** | Animaciones premium | Animaciones de entrada, parallax, reveals de texto, transiciones de sección. Compatible con Next.js 15 vía @gsap/react hook. Rendimiento GPU-accelerated. |
| **Lenis** | Smooth scroll | Scroll suave cinematográfico que complementa la estética oscura del Visual Brain. Se sincroniza con GSAP ScrollTrigger para animaciones fluidas. |
| **Framer Motion** | Micro-interacciones | Hovers en botones, transiciones de página, animaciones de componentes React. Más simple que GSAP para interacciones pequeñas. |

**Tipografía Web (Visual Brain Compliant)**

| Fuente | Rol | Implementación |
| :---- | :---- | :---- |
| **Space Grotesk** | Titulares \+ CTAs (700 Bold, CAPS) | Google Fonts vía next/font/google con display: swap. Precarga automática sin CLS. |
| **Inter** | Cuerpo \+ navegación (400 Regular) | Optimizada para pantalla, alta legibilidad en fondos oscuros. Variable font para mínimo peso. |

**SEO, Analytics y Tracking**

| Herramienta | Función | Integración |
| :---- | :---- | :---- |
| **next-sitemap** | Sitemap XML \+ robots.txt | Generación automática post-build. Incluye todas las páginas y blogs. |
| **JSON-LD** | Schema markup estructurado | Organization, LocalBusiness, Service, FAQ, Article, BreadcrumbList. Mejora rich snippets en Google. |
| **GTM (Google Tag Manager)** | Contenedor de tags | Script inyectado vía next/script con strategy='afterInteractive'. Un solo container para GA4 \+ Meta Pixel \+ eventos custom. |
| **GA4** | Analytics | Disparado vía GTM. Eventos de conversión: clic\_whatsapp, formulario\_enviado, lead\_magnet\_descargado, scroll\_depth. |
| **Meta Pixel** | Tracking Meta Ads | Disparado vía GTM. Eventos: PageView, Lead, CompleteRegistration, Contact. Permite retargeting y Lookalike. |
| **Google Search Console** | Indexación \+ rendimiento | Verificación por meta tag en layout. Monitoreo de Core Web Vitals, cobertura de índice, keywords. |

**CMS y Contenido**

| Herramienta | Función | Por qué |
| :---- | :---- | :---- |
| **MDX** | Blog engine | Markdown \+ JSX components. Permite incrustar CTAs, formularios y componentes interactivos dentro de los blogs. Sin base de datos externa — máximo rendimiento. |
| **Contentlayer o next-mdx-remote** | Procesador MDX | Convierte archivos .mdx en páginas estáticas con frontmatter (title, description, keywords, date). SEO automático por post. |

**Hosting y Deploy**

| Servicio | Función | Por qué |
| :---- | :---- | :---- |
| **Vercel** | Hosting \+ CDN \+ CI/CD | Deploy automático desde GitHub. Edge network global. Preview deploys por PR. ISR nativo. El hosting natural de Next.js. |
| **GitHub** | Repositorio \+ versionamiento | Claude Code trabaja directamente con el repo. Cada cambio queda versionado. Rollback instantáneo. |

**Integraciones de Conversión**

| Integración | Función | Implementación |
| :---- | :---- | :---- |
| **WhatsApp API** | CTA directo a chat | Botón flotante \+ CTAs en secciones críticas. URL: wa.me/57XXXXXXXXXX?text=mensaje\_precargado. Evento GA4 en cada clic. |
| **Cuestionario BANT** | Calificación de leads | Formulario multi-step integrado en la web. 4 preguntas: Budget, Authority, Need, Timeline. Envío a n8n → Odoo vía webhook. Filtra antes de la llamada. |
| **Calendly embed** | Agendar llamada | Solo aparece DESPUÉS de que el prospecto pasa el cuestionario BANT. Embed inline, no popup. |
| **ManyChat \+ n8n** | Lead magnet delivery | CTA ‘Comenta SISTEMA’ en redes → ManyChat captura → n8n crea contacto en Odoo → email con PDF. |

**02 — ARQUITECTURA DEL SITIO**

Estructura de páginas diseñada para SEO \+ conversión. Cada página tiene una función específica en el Offer Stack.

| Página | URL | Función | Nivel Offer Stack |
| :---- | :---- | :---- | :---- |
| Home | / | Captura \+ posicionamiento | Nivel 0 — Micro-compromisos |
| El Sistema | /sistema | Explicar el mecanismo central | Nivel 2 — Sistema |
| Casos de Éxito | /casos | Prueba social con datos reales | Nivel 0 → 2 |
| Sobre Cris | /sobre | Historia \+ credibilidad | Nivel 0 |
| Blog | /blog | Motor SEO orgánico | Nivel 0 — Tráfico |
| Diagnóstico | /diagnostico | Landing de conversión | Nivel 0 → 1 |
| Lead Magnet | /cuellos-de-botella | Captura de email | Nivel 0 |
| Contacto | /contacto | WhatsApp \+ Calendly \+ email | Nivel 0 |

**03 — ESTRUCTURA DEL HOME**

El Home es la página más importante. Sigue el arco de energía del Visual Brain: Bold → Calmo → Sube → Pico tensión → CTA.

| \# | Sección | Contenido | Animación GSAP |
| :---- | :---- | :---- | :---- |
| **S1** | **HERO** | Fondo Obsidian \#111111. Headline en Space Grotesk CAPS: 'INSTALAMOS EL SISTEMA QUE TE TRAE CLIENTES CALIFICADOS CADA SEMANA'. Sub: '— o trabajamos gratis hasta lograrlo.' Doble CTA: WhatsApp (rojo) \+ Diagnóstico (azul). Overlay cinematográfico 55-65%. |  |
| **S2** | **EL PROBLEMA** | 3 bloques con los dolores del ICP: dependencia del voz a voz, leads basura, crecimiento que depende del fundador. Fondo claro \#F4F4F4. Texto Inter. Genera identificación antes de ofrecer la salida. |  |
| **S3** | **EL SISTEMA** | Diagrama visual del Sistema ADSBIGGER™: 4 capas (Adquisición, Calificación, Cierre, Control). Fondo oscuro. Iconografía tech. Frase: 'No vendemos anuncios. Instalamos estructura.' |  |
| **S4** | **CASO ANCLA** | Ferrieprofiles: $0 → $230M+ COP en 90 días. Números grandes en Space Grotesk CAPS. Timeline visual. Fondo claro. |  |
| **S5** | **PROCESO 90 DÍAS** | 4 fases simplificadas: Diagnóstico → Instalación → Operación → Resultados. Cards o timeline horizontal. Fondo oscuro. |  |
| **S6** | **FILTRO \+ GARANTÍA** | Para quién es / Para quién NO es. La garantía completa. Fondo rojo \#D51A05. Alta energía. Tensión que justifica el CTA. |  |
| **S7** | **CTA FINAL** | Doble camino: agendar diagnóstico o descargar PDF 5 Cuellos. Fondo Obsidian. Botón WhatsApp prominente. @adsbigger en Azul. |  |

**04 — ESTRATEGIA SEO COMPLETA**

No solo keywords. Implementación técnica de BIG SEO que cubre los 4 pilares: técnico, on-page, contenido y autoridad.

**SEO Técnico (Built into Next.js)**

* SSG (Static Site Generation) para Home, Sistema, Sobre, Contacto — máximo rendimiento

* ISR (Incremental Static Regeneration) para Blog y Casos — contenido actualizado sin rebuild

* Metadata API nativa: title, description, openGraph, twitter cards únicos por página

* Canonical URLs en todas las páginas para evitar contenido duplicado

* Sitemap XML automático vía next-sitemap (regenerado en cada build)

* robots.txt configurado: permitir todo, bloquear /api/

* next/image para todas las imágenes: WebP automático, lazy loading, sizes responsivos

* next/font para Space Grotesk \+ Inter: precarga sin CLS, display: swap

* Core Web Vitals optimizados: LCP \< 2.5s, FID \< 100ms, CLS \< 0.1

* Hreflang tags si se añade versión en inglés en el futuro

**SEO On-Page**

* Un solo H1 por página con keyword principal

* Estructura semántica: \<header\>, \<nav\>, \<main\>, \<article\>, \<section\>, \<footer\>

* Alt text descriptivo en todas las imágenes (con keywords naturales)

* Internal linking estratégico: cada blog enlaza a /sistema y /diagnostico

* Breadcrumbs con Schema BreadcrumbList en blogs y casos

* URLs limpias y descriptivas: /blog/sistema-adquisicion-clientes

* Meta descriptions únicas con CTA implícito en cada página

**Schema Markup (JSON-LD)**

* Organization: nombre, logo, redes sociales, área de servicio

* LocalBusiness: Bogotá, Colombia, horarios, contacto

* Service: Sistema ADSBIGGER™, descripción, precio, garantía

* Article: en cada blog post (author, datePublished, dateModified)

* FAQ: en páginas de servicio para capturar featured snippets

* BreadcrumbList: navegación jerárquica para Google

**Los 10 Blogs SEO**

| \# | Título | Keyword | Prioridad |
| :---- | :---- | :---- | :---- |
| 1 | Sistema de adquisición de clientes: qué es y cómo instalarlo | sistema de adquisición de clientes | **🔴 PILAR** |
| 2 | Caso de éxito: ferrieprofiles de $0 a $230M COP en 90 días | caso de éxito marketing digital Colombia | **🔴 PILAR** |
| 3 | Por qué tu negocio depende del voz a voz (y cómo salir) | cómo conseguir clientes sin voz a voz | 🟡 Alto volumen |
| 4 | Cómo escalar tu negocio sin que todo dependa de ti | cómo escalar mi negocio | 🟡 Alto volumen |
| 5 | Por qué las agencias de marketing no funcionan para B2B | agencia de marketing no funciona | 🟢 Posicionamiento |
| 6 | Las 5 métricas que un CEO debe revisar cada semana | métricas para crecer empresa / CEO scorecard | 🟢 Autoridad |
| 7 | CRM para empresas medianas: cómo dejar de perder clientes | CRM para empresas medianas | 🟢 Técnico |
| 8 | Cómo calificar leads antes de que lleguen a ventas | cómo calificar leads / lead scoring | 🟢 Técnico |
| 9 | Generar leads vs generar clientes: la diferencia que tu agencia ignora | generar clientes B2B | 🟢 Posicionamiento |
| 10 | Automatización de ventas: el sistema que cierra mientras duermes | automatización de ventas | 🟢 Transaccional |

**05 — SISTEMA DE DISEÑO WEB (VISUAL BRAIN → CÓDIGO)**

Traducción directa del Visual Brain Document a Tailwind config \+ componentes React.

**tailwind.config.ts — Design Tokens**

colors: { obsidian: '\#111111', red: '\#D51A05', blue: '\#179DFF', 'blue-deep': '\#0D3DD9', 'gray-light': '\#F4F4F4', charcoal: '\#1E1E1E', stone: '\#888888', accent: '\#F5C518' }

fontFamily: { headline: \['Space Grotesk', 'sans-serif'\], body: \['Inter', 'sans-serif'\] }

**Componentes Reutilizables**

* \<Button variant='red|blue|ghost' /\> — CTA con hover animation Framer Motion

* \<SectionDark /\> y \<SectionLight /\> — alternan según ritmo visual del Visual Brain

* \<AnimatedHeadline /\> — Space Grotesk CAPS con reveal GSAP desde abajo

* \<WhatsAppButton /\> — botón flotante fijo, pulso CSS, evento GA4 en clic

* \<BANTForm /\> — formulario multi-step: Budget, Authority, Need, Timeline

* \<CaseStudyCard /\> — números grandes \+ timeline \+ resultado

* \<BlogCard /\> — thumbnail \+ título \+ excerpt \+ CTA

* \<Footer /\> — @adsbigger \+ tagline \+ links \+ redes

**Regla Matrix de Color (implementada en CSS)**

Rojo \#D51A05: CTAs de venta, botones de acción urgente, secciones de tensión, garantía.

Azul \#179DFF: datos, resultados, sistema, diagramas, prueba lógica, enlaces.

Obsidian \#111111: fondo principal de secciones hero, sistema, CTA final.

Gris Claro \#F4F4F4: secciones de contraste (problema, valor 2, caso de éxito).

Amarillo \#F5C518: solo pull quotes y highlights. Nunca como fondo.

**06 — MAPA DE ANIMACIONES**

Animaciones que refuerzan la estética cinematográfica del Visual Brain sin sacrificar rendimiento. Todas GPU-accelerated.

| Elemento | Animación | Trigger | Librería |
| :---- | :---- | :---- | :---- |
| Headlines | Reveal desde abajo \+ fade | ScrollTrigger al entrar viewport | GSAP |
| Números de caso | Counter animado ($0 → $230M) | ScrollTrigger al entrar viewport | GSAP |
| Cards de servicio | Stagger fade-in secuencial | ScrollTrigger | GSAP |
| Diagrama del sistema | Draw SVG path progresivo | ScrollTrigger scrub | GSAP |
| Secciones completas | Parallax suave (0.2x speed) | Scroll position | GSAP \+ Lenis |
| Botones CTA | Scale \+ glow en hover | Mouse hover | Framer Motion |
| Transiciones de página | Fade cross-dissolve | Route change | Framer Motion |
| WhatsApp button | Pulso cíclico \+ bounce entrada | Always visible | CSS \+ Framer |
| Blog scroll progress | Barra de progreso top | Scroll depth | GSAP ScrollTrigger |

**07 — CUESTIONARIO BANT (CALIFICACIÓN DE LEADS)**

Formulario multi-step que filtra prospectos antes de mostrar Calendly. Solo prospectos calificados llegan a la llamada con Cris.

**Flujo del Cuestionario**

Paso 1 (Need): ¿Cuál es tu mayor cuello de botella ahora mismo? — 5 opciones: Dependo del voz a voz / Leads que no convierten / Equipo sin proceso / Métricas de vanidad / Crecimiento depende de mí.

Paso 2 (Authority): ¿Cuál es tu rol en la empresa? — CEO/Fundador / Director comercial / Gerente de marketing / Otro.

Paso 3 (Budget): ¿Cuánto facturas mensualmente? — Menos de $5K USD / $5K-$15K USD / $15K-$50K USD / Más de $50K USD.

Paso 4 (Timeline): ¿Cuándo necesitas resolver esto? — Ya / En los próximos 30 días / En 2-3 meses / Solo estoy investigando.

**Si califica (Budget ≥ $5K \+ Authority \= CEO/Director \+ Timeline ≤ 30 días):** Muestra Calendly inline \+ mensaje: 'Perfecto. Agenda tu diagnóstico gratuito de 20 minutos con Cris.'

**Si NO califica:** Muestra CTA alternativo: 'Descarga el Diagnóstico de los 5 Cuellos de Botella y empieza por tu cuenta.' \+ captura email.

**Integración Técnica**

Frontend: React component con estado local (useState). Sin librería de formularios externa. Animación de transición entre pasos con Framer Motion.

Backend: API Route de Next.js (/api/bant) que recibe respuestas → envía webhook a n8n → n8n crea contacto en Odoo con score de calificación → notifica a Lore por Slack.

Tracking: Cada paso dispara evento en GA4 vía GTM: bant\_step\_1, bant\_step\_2, bant\_step\_3, bant\_step\_4, bant\_qualified, bant\_not\_qualified.

**08 — PASO A PASO DE EJECUCIÓN CON CLAUDE CODE**

Plan de ejecución dividido en 6 sprints. Cada sprint tiene entregables claros y criterios de cierre. Claude Code ejecuta cada paso.

**Sprint 1 — Fundación (Días 1-2)**

1. Crear repo GitHub: adsbigger-web

2. npx create-next-app@latest con TypeScript \+ Tailwind \+ App Router \+ ESLint

3. Configurar tailwind.config.ts con todos los design tokens del Visual Brain (colores, fuentes, spacing)

4. Instalar dependencias: gsap @gsap/react lenis framer-motion next-sitemap next-mdx-remote

5. Configurar next/font con Space Grotesk \+ Inter (Google Fonts)

6. Crear provider global de Lenis \+ GSAP (registrar plugins una sola vez)

7. Crear layout.tsx con metadata global, GTM script, y estructura semántica

8. Deploy inicial a Vercel conectado al repo

**Criterio de cierre:** Sitio en blanco deployado en Vercel con fuentes cargando, colores configurados y smooth scroll activo.

**Sprint 2 — Componentes Base (Días 3-5)**

9. Crear componentes: Button, SectionDark, SectionLight, AnimatedHeadline, WhatsAppButton, Navbar, Footer

10. Implementar Navbar: logo adsBigger \+ links \+ CTA 'Diagnóstico' en rojo. Sticky con blur backdrop.

11. Implementar Footer: tagline \+ @adsbigger \+ links a redes \+ legal

12. Implementar WhatsApp floating button con pulso CSS y evento GA4

13. Crear hook useScrollAnimation() que encapsula GSAP \+ ScrollTrigger reusable

14. Testear responsive: mobile-first, breakpoints en sm/md/lg/xl

**Criterio de cierre:** Componentes renderizando con animaciones. WhatsApp button funcional.

**Sprint 3 — Home \+ Páginas Core (Días 6-10)**

15. Construir Home completo: 7 secciones con contenido real del Offer Stack

16. Implementar todas las animaciones GSAP del mapa (reveals, counters, parallax, SVG draw)

17. Construir /sistema: explicación completa del Sistema ADSBIGGER™ \+ diagrama interactivo

18. Construir /casos: página de casos de éxito con ferrieprofiles como ancla

19. Construir /sobre: historia de Cris \+ por qué adsBigger no es agencia

20. Construir /contacto: WhatsApp \+ email \+ mapa de Bogotá

21. Metadata única por página: title, description, openGraph, twitter cards

**Criterio de cierre:** Todas las páginas core navegables con contenido real y animaciones.

**Sprint 4 — Conversión (Días 11-13)**

22. Construir cuestionario BANT multi-step en /diagnostico

23. Crear API Route /api/bant que envía webhook a n8n

24. Integrar Calendly embed condicional (solo si califica)

25. Construir /cuellos-de-botella: landing de lead magnet con formulario de email

26. Configurar eventos GA4 para cada interacción de conversión vía GTM dataLayer

27. Configurar Meta Pixel events: Lead, CompleteRegistration, Contact

**Criterio de cierre:** Flujo completo funcional: BANT → calificación → Calendly o Lead Magnet. Eventos disparando en GTM.

**Sprint 5 — Blog \+ SEO (Días 14-18)**

28. Configurar sistema de blog con MDX: frontmatter, layouts, componentes embebidos

29. Crear plantilla de blog post: tabla de contenidos, barra de progreso, CTA inline, autor, fecha

30. Escribir y publicar los 3 blogs pilar: \#1 (sistema de adquisición), \#2 (caso ferrieprofiles), \#3 (voz a voz)

31. Implementar JSON-LD: Organization, LocalBusiness, Service, Article, FAQ, BreadcrumbList

32. Configurar next-sitemap: sitemap.xml \+ robots.txt auto-generados

33. Verificar Google Search Console \+ enviar sitemap

34. Escribir blogs \#4 a \#10 (pueden publicarse gradualmente post-lanzamiento)

**Criterio de cierre:** Blog funcionando con 3 posts pilar. Sitemap enviado a Google. Schema validado en Rich Results Test.

**Sprint 6 — QA \+ Lanzamiento (Días 19-21)**

35. Auditoría Lighthouse: Performance ≥ 90, SEO ≥ 95, Accessibility ≥ 90, Best Practices ≥ 90

36. Test cross-browser: Chrome, Safari, Firefox, Edge

37. Test responsive: iPhone SE, iPhone 15, iPad, Android mid-range, Desktop 1440px, Desktop 1920px

38. Test de accesibilidad: navegación con teclado, contraste WCAG AA, screen reader

39. Verificar todos los CTAs: WhatsApp abre chat, BANT envía datos, Calendly carga, Lead Magnet entrega PDF

40. Verificar tracking: GA4 recibe eventos, Meta Pixel dispara, GTM preview mode ok

41. Conectar dominio adsbigger.com a Vercel \+ SSL automático

42. **GO LIVE**

**Criterio de cierre:** Sitio live en adsbigger.com. Lighthouse ≥ 90 en todas las categorías. Tracking confirmado. CTAs funcionales.

**09 — COMANDOS DE INSTALACIÓN PARA CLAUDE CODE**

Copia y ejecuta estos comandos en orden para levantar el proyecto desde cero:

\# 1\. Crear proyecto

npx create-next-app@latest adsbigger-web \--typescript \--tailwind \--eslint \--app \--src-dir \--import-alias '@/\*'

\# 2\. Instalar dependencias de animación

npm install gsap @gsap/react lenis framer-motion

\# 3\. Instalar dependencias de SEO

npm install next-sitemap next-mdx-remote gray-matter

\# 4\. Instalar utilidades

npm install clsx tailwind-merge lucide-react

\# 5\. Dev dependencies

npm install \-D @types/node

adsBigger™ · Plan Maestro Web v1.0 · Bogotá 2026  
*Instalamos sistemas, no vendemos anuncios.*