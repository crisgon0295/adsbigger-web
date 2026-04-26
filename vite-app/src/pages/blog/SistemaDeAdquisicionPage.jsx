import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../../components/Reveal';

const C = {
  bg: '#F5F2EC',
  ink: '#1a1612',
  soft: '#3a342c',
  muted: '#7a6f60',
  rule: 'rgba(26,22,18,0.12)',
  ruleStrong: 'rgba(26,22,18,1)',
  red: '#D51A05',
};

// ── Progress bar ──────────────────────────────────────
function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 200, background: 'rgba(26,22,18,0.08)' }}>
      <div style={{ height: '100%', width: `${pct}%`, background: C.red, transition: 'width 120ms linear' }} />
    </div>
  );
}

// ── Breadcrumb ────────────────────────────────────────
function Breadcrumb() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '20px clamp(20px, 4vw, 40px) 0' }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '.15em', color: C.muted }}>
        <Link to="/" style={{ color: C.muted, textDecoration: 'none' }}>adsBigger</Link>
        {' · '}
        <Link to="/blog" style={{ color: C.muted, textDecoration: 'none' }}>Blog</Link>
        {' · '}
        <span style={{ color: C.soft }}>Sistema de adquisición</span>
      </div>
    </div>
  );
}

// ── Article masthead ──────────────────────────────────
function ArticleMasthead() {
  return (
    <header style={{ maxWidth: 860, margin: '0 auto', padding: '40px clamp(20px, 4vw, 40px) 40px', borderBottom: `1px solid ${C.ruleStrong}` }}>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: C.red }}>
          ◆ ADQUISICIÓN
        </span>
        <span className="mono" style={{ fontSize: 11, letterSpacing: '.15em', color: C.muted }}>Nº 01</span>
      </div>
      <h1 className="sg" style={{
        fontSize: 'clamp(34px, 5.5vw, 72px)',
        lineHeight: 0.97,
        letterSpacing: '-0.025em',
        color: C.ink,
        textWrap: 'balance',
        margin: 0,
      }}>
        Sistema de adquisición de clientes: la guía técnica para escalar tu negocio.
      </h1>
      <p className="sub" style={{
        fontStyle: 'italic', fontSize: 'clamp(18px, 2.2vw, 23px)',
        lineHeight: 1.45, color: C.soft, marginTop: 22, maxWidth: 680,
      }}>
        Hacer anuncios en Meta no es tener un sistema. Esta es la arquitectura completa — framework ADC, stack tecnológico y benchmarks reales de un sistema que genera clientes High-Ticket de forma predecible.
      </p>
      <div style={{ display: 'flex', gap: 24, marginTop: 28, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 99,
            background: C.ink, display: 'grid', placeItems: 'center',
            color: C.bg, fontFamily: 'DM Serif Display, serif', fontSize: 17,
          }}>C</div>
          <div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14, color: C.ink }}>Cristian González</div>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '.12em', color: C.muted }}>Fundador · adsBigger</div>
          </div>
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '.15em', color: C.muted }}>
          26 ABR 2026 · 14 MIN DE LECTURA
        </div>
      </div>
    </header>
  );
}

// ── Stat callout box ──────────────────────────────────
function StatBox({ label, value, note }) {
  return (
    <div style={{
      border: `1px solid ${C.rule}`,
      borderLeft: `4px solid ${C.red}`,
      padding: '18px 22px',
      margin: '28px 0',
      background: 'rgba(26,22,18,0.03)',
    }}>
      <div className="sg" style={{ fontSize: 'clamp(28px, 5vw, 44px)', lineHeight: 1, color: C.ink }}>{value}</div>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: C.red, marginTop: 6 }}>{label}</div>
      {note && <div className="sub" style={{ fontStyle: 'italic', fontSize: 15, color: C.soft, marginTop: 8 }}>{note}</div>}
    </div>
  );
}

// ── Callout quote ─────────────────────────────────────
function Callout({ children }) {
  return (
    <blockquote style={{
      margin: '36px 0',
      padding: '24px 28px',
      borderLeft: `4px solid ${C.ink}`,
      background: 'rgba(26,22,18,0.04)',
    }}>
      <p className="sg" style={{
        fontSize: 'clamp(20px, 3vw, 28px)',
        lineHeight: 1.2,
        letterSpacing: '-0.015em',
        color: C.ink,
        margin: 0,
      }}>
        {children}
      </p>
    </blockquote>
  );
}

// ── Section label ─────────────────────────────────────
function SectionLabel({ n, text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '48px 0 20px', paddingTop: 16, borderTop: `1px solid ${C.rule}` }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: '.2em', color: C.muted }}>0{n}</span>
      <span className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: C.red }}>◆ {text}</span>
    </div>
  );
}

// ── Tech stack row ────────────────────────────────────
function StackItem({ tool, role, cost }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 2fr auto',
      gap: 16,
      padding: '14px 0',
      borderBottom: `1px solid ${C.rule}`,
      alignItems: 'center',
    }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: C.red }}>{tool}</div>
      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.soft }}>{role}</div>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '.1em', color: C.muted, textAlign: 'right' }}>{cost}</div>
    </div>
  );
}

// ── Related posts ─────────────────────────────────────
function RelatedPosts() {
  const posts = [
    { num: '02', cat: 'Calificación', title: 'El framework BANT que rechaza al 70% de tus leads', read: '9 MIN', slug: null },
    { num: '04', cat: 'Adquisición', title: 'Anatomía de una landing High-Ticket: 12 elementos no negociables', read: '8 MIN', slug: null },
    { num: '08', cat: 'Calificación', title: 'Lead scoring con n8n: cómo el sistema rechaza solo a los que no pueden pagar', read: '12 MIN', slug: null },
  ];
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px clamp(20px, 4vw, 40px)', borderTop: `1px solid ${C.rule}` }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: C.muted, marginBottom: 24 }}>
        ◆ CONTINÚA LEYENDO
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 28 }}>
        {posts.map(p => (
          <div key={p.num} style={{ borderTop: `2px solid ${C.ink}`, paddingTop: 18 }}>
            <div className="mono" style={{ fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: C.red, marginBottom: 10 }}>
              ◆ {p.cat} · Nº {p.num}
            </div>
            {p.slug ? (
              <Link to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
                <h4 className="sg" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', lineHeight: 1.1, color: C.ink, margin: 0 }}>{p.title}</h4>
              </Link>
            ) : (
              <h4 className="sg" style={{ fontSize: 'clamp(18px, 2.2vw, 24px)', lineHeight: 1.1, color: C.muted, margin: 0 }}>{p.title}</h4>
            )}
            <div className="mono" style={{ fontSize: 10, letterSpacing: '.12em', color: C.muted, marginTop: 12 }}>{p.read}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CTA block ─────────────────────────────────────────
function ArticleCTA() {
  return (
    <div style={{
      background: C.ink, color: C.bg,
      padding: 'clamp(40px, 6vw, 64px) clamp(20px, 4vw, 40px)',
      margin: '64px 0 0',
      textAlign: 'center',
    }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>
        ◆ SIGUIENTE PASO
      </div>
      <h3 className="sg" style={{ fontSize: 'clamp(28px, 4.5vw, 52px)', lineHeight: 1.0, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
        ¿Quieres que instalemos esto en tu negocio?
      </h3>
      <p className="sub" style={{ fontStyle: 'italic', fontSize: 'clamp(17px, 2vw, 20px)', color: 'rgba(245,242,236,0.75)', maxWidth: 540, margin: '0 auto 36px' }}>
        El Sprint es el proceso de 14 días donde construimos tu sistema de adquisición completo, desde la campaña hasta el cierre. Solo 3 cupos disponibles.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/sprint" style={{
          background: C.red, color: '#fff',
          padding: '16px 32px', borderRadius: 8,
          fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 14,
          letterSpacing: '.06em', textTransform: 'uppercase',
          textDecoration: 'none', boxShadow: '0 4px 24px rgba(213,26,5,.4)',
          transition: 'transform 200ms',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          Ver Sprint · $5M →
        </Link>
        <Link to="/diagnostico" style={{
          background: 'transparent', color: C.bg,
          border: '1px solid rgba(245,242,236,0.2)',
          padding: '16px 32px', borderRadius: 8,
          fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14,
          letterSpacing: '.04em', textTransform: 'uppercase',
          textDecoration: 'none',
        }}>
          Diagnóstico gratuito
        </Link>
      </div>
    </div>
  );
}

// ── Article body ──────────────────────────────────────
function ArticleBody() {
  const prose = {
    fontFamily: 'EB Garamond, Georgia, serif',
    fontSize: 'clamp(18px, 2vw, 21px)',
    lineHeight: 1.68,
    color: C.soft,
  };
  const h2 = {
    fontFamily: 'DM Serif Display, serif',
    fontSize: 'clamp(24px, 3.2vw, 36px)',
    lineHeight: 1.1,
    letterSpacing: '-0.018em',
    color: C.ink,
    margin: '44px 0 18px',
  };
  const h3 = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 700,
    fontSize: 'clamp(16px, 2vw, 19px)',
    color: C.ink,
    margin: '32px 0 10px',
    letterSpacing: '-0.01em',
  };

  return (
    <article style={{ maxWidth: 860, margin: '0 auto', padding: '48px clamp(20px, 4vw, 40px)' }}>

      {/* Intro */}
      <p style={{ ...prose, fontSize: 'clamp(20px, 2.4vw, 24px)', color: C.ink, lineHeight: 1.55 }}>
        En adsBigger trabajamos con fundadores que ya facturan — consultores, agencias, coaches — y el patrón más frecuente que vemos es este: tienen campañas activas, gastan en Meta o Google, incluso generan leads. Pero no tienen un sistema. Tienen un expendio de atención pagada que apagan cuando el presupuesto aprieta.
      </p>
      <p style={{ ...prose, marginTop: 20 }}>
        La diferencia entre un negocio que depende de las campañas y uno que escala de forma predecible es arquitectónica. No es una pregunta de presupuesto ni de creatividades. Es una pregunta de ingeniería: ¿tienes un sistema de adquisición o solo pagas por clics?
      </p>

      <Callout>
        Un sistema de adquisición no es un anuncio. Es la infraestructura completa que convierte tráfico frío en clientes de alto valor de forma predecible.
      </Callout>

      {/* 01 El framework ADC */}
      <SectionLabel n={1} text="EL FRAMEWORK ADC" />
      <h2 style={h2}>Atracción, Diagnóstico, Cierre.</h2>
      <p style={prose}>
        El framework ADC es la columna vertebral de cualquier sistema de adquisición High-Ticket bien construido. Tres capas, cada una con su propio stack, sus propias métricas y sus propias responsabilidades. Ninguna puede fallar sin que las demás se degraden.
      </p>

      <h3 style={h3}>Capa 1 — Atracción</h3>
      <p style={prose}>
        La capa de atracción es todo lo que existe antes de que el prospecto llegue a tu landing. Aquí viven las campañas de Meta o Google Ads, el contenido orgánico, los referidos y los podcasts. El objetivo de esta capa no es generar ventas directas: es generar tráfico calificado a un costo predecible.
      </p>
      <p style={prose}>
        El error más común en esta capa es medir conversiones en lugar de CPL (costo por lead) y CAC (costo de adquisición de cliente). Si no sabes cuánto te cuesta adquirir un cliente, no puedes escalar — estás conduciendo con los ojos vendados.
      </p>

      <h3 style={h3}>Capa 2 — Diagnóstico</h3>
      <p style={prose}>
        Esta es la capa más ignorada y la más crítica. El diagnóstico es el proceso por el cual tu sistema decide si un lead merece tiempo de ventas. Incluye la landing de calificación, el formulario BANT, el lead scoring automatizado y la asignación de prioridades.
      </p>
      <p style={prose}>
        Un sistema bien construido rechaza al 60-70% de los leads automáticamente. No porque sean malas personas, sino porque no cumplen los criterios mínimos: presupuesto, autoridad, necesidad y timing. Tu equipo de ventas solo habla con los que pasan el filtro.
      </p>

      <h3 style={h3}>Capa 3 — Cierre</h3>
      <p style={prose}>
        La capa de cierre convierte prospectos calificados en clientes. Aquí viven los SOPs de discovery call, los scripts de objeciones, el proceso de seguimiento y el flujo de contratación. Si esta capa depende de un humano específico que no puede replicarse, no tienes un sistema: tienes una dependencia.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 20, margin: '36px 0' }}>
        <StatBox value="3 capas" label="Framework ADC" note="Atracción · Diagnóstico · Cierre" />
        <StatBox value="70%" label="Leads rechazados" note="Automáticamente, antes de ventas" />
        <StatBox value="14 días" label="Sprint de instalación" note="De cero a sistema operativo" />
      </div>

      {/* 02 El stack tecnológico */}
      <SectionLabel n={2} text="EL STACK TECNOLÓGICO" />
      <h2 style={h2}>Las herramientas que no se caen.</h2>
      <p style={prose}>
        El stack de un sistema de adquisición High-Ticket tiene que resolver cuatro funciones: capturar tráfico, filtrar leads, automatizar el seguimiento y medir el rendimiento. Aquí está el stack que usamos en adsBigger y que instalamos en los negocios de nuestros clientes:
      </p>

      <div style={{ margin: '28px 0', border: `1px solid ${C.rule}` }}>
        <div style={{ padding: '12px 0', borderBottom: `1px solid ${C.rule}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: 16, padding: '0 0 8px' }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: C.muted }}>Herramienta</span>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: C.muted }}>Función</span>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: C.muted }}>Costo/mes</span>
          </div>
        </div>
        <StackItem tool="Meta Ads" role="Tráfico pagado — fuente principal de leads calificados" cost="Variable" />
        <StackItem tool="GoHighLevel" role="CRM, landing pages, formularios BANT, pipelines de ventas" cost="$97-297" />
        <StackItem tool="n8n (self-hosted)" role="Automatizaciones: lead scoring, notificaciones, integraciones" cost="~$25" />
        <StackItem tool="Google Analytics 4" role="Medición de conversiones y comportamiento de usuario" cost="Gratis" />
        <StackItem tool="Loom / Tella" role="VSLs y videos de follow-up personalizados" cost="$15-20" />
        <StackItem tool="Calendly" role="Reserva de discovery calls — integración con CRM" cost="$12-16" />
        <StackItem tool="Notion" role="SOPs, scripts de ventas, documentación del sistema" cost="$16" />
      </div>

      <p style={prose}>
        El costo total de este stack es de aproximadamente $180-450 USD/mes dependiendo del nivel de GoHighLevel y la escala de las campañas. Comparado con el ticket promedio de un cliente High-Ticket ($3.000-20.000 USD), la tecnología es el menor de tus problemas.
      </p>

      <Callout>
        El problema nunca es el stack. El problema es la arquitectura. Con las herramientas equivocadas pero el proceso correcto, cierras clientes. Al revés, no.
      </Callout>

      {/* 03 Captación */}
      <SectionLabel n={3} text="CAPTACIÓN — CONFIGURACIÓN DE CAMPAÑAS" />
      <h2 style={h2}>Cómo construir una campaña que no quema presupuesto.</h2>
      <p style={prose}>
        La mayoría de las campañas de Meta para negocios High-Ticket fallan por el mismo motivo: están optimizadas para volumen de leads, no para calidad de leads. El algoritmo te entrega lo que le pides — si pides leads baratos, te entrega leads baratos que no tienen presupuesto para comprar.
      </p>

      <h3 style={h3}>Estructura de campaña ADC</h3>
      <p style={prose}>
        Usamos una estructura de tres campañas en paralelo: una campaña de prospección fría (públicos amplios + interest stacking), una campaña de retargeting de visitantes de landing (3-30 días) y una campaña de reactivación de leads que no convirtieron. Cada campaña tiene un objetivo de conversión diferente y un presupuesto independiente.
      </p>

      <h3 style={h3}>El creativo que convierte en High-Ticket</h3>
      <p style={prose}>
        En mercados de ticket alto, los formatos que mejor convierten son los más directos: VSL de 3-7 minutos en formato vertical, testimonios de cliente específicos con números reales, y creatividades de tipo "before/after" con resultados verificables. Los carruseles de lifestyle y los anuncios de imagen estática convierten mal en este segmento.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 20, margin: '36px 0' }}>
        <StatBox value="$35-80" label="CPL objetivo" note="USD por lead calificado en Meta" />
        <StatBox value="4-8×" label="ROAS mínimo" note="Para escalar una campaña HT" />
        <StatBox value="2-3%" label="CTR landing" note="Benchmark de calidad de tráfico" />
      </div>

      {/* 04 Calificación */}
      <SectionLabel n={4} text="CALIFICACIÓN — EL FILTRO QUE LO CAMBIA TODO" />
      <h2 style={h2}>El formulario BANT que rechaza al 70% de tus leads.</h2>
      <p style={prose}>
        El formulario de calificación es el elemento más importante de tu sistema y el más subestimado. La mayoría de los negocios usan formularios de nombre + email + teléfono. Eso no filtra nada: cualquier curioso puede completarlo.
      </p>
      <p style={prose}>
        Un formulario BANT bien construido tiene entre 6 y 10 preguntas que miden Budget (presupuesto disponible), Authority (poder de decisión), Need (urgencia real del problema) y Timing (ventana de acción). Cada respuesta suma o resta puntos en el lead scoring automatizado.
      </p>

      <h3 style={h3}>El flujo de calificación en n8n</h3>
      <p style={prose}>
        Cuando un lead completa el formulario, n8n recibe los datos via webhook, calcula el score automáticamente según las respuestas y toma una de tres acciones: redirige al calendario de discovery call (score alto), envía una secuencia de nurturing de 5 emails (score medio), o envía un email de descalificación educado (score bajo). Tu equipo nunca ve los leads de score bajo.
      </p>

      <StatBox
        value="40 hrs/sem"
        label="Tiempo ahorrado en calificación"
        note="Promedio en equipos de ventas después de instalar el filtro BANT + n8n."
      />

      {/* 05 Benchmarks */}
      <SectionLabel n={5} text="BENCHMARKS REALES" />
      <h2 style={h2}>Los números que la competencia no enseña.</h2>
      <p style={prose}>
        Aquí están los benchmarks de un sistema de adquisición High-Ticket funcionando correctamente. Estos números son promedios de los clientes del Sprint después de 60-90 días de operación:
      </p>

      <div style={{ margin: '28px 0', border: `1px solid ${C.rule}` }}>
        {[
          ['CPL (Meta Ads, sector consultoría)', '$35 - $75 USD', 'Por lead calificado'],
          ['Tasa de calificación', '25 - 35%', 'Leads que pasan el filtro BANT'],
          ['Show rate en discovery call', '70 - 85%', 'Depende de la secuencia de confirmación'],
          ['Close rate en discovery call', '20 - 35%', 'Con script entrenado y leads calificados'],
          ['CAC final', '$200 - $600 USD', 'Incluyendo stack + campañas'],
          ['LTV:CAC ratio objetivo', '8:1 o superior', 'Para escalar con seguridad'],
        ].map(([metric, value, note]) => (
          <div key={metric} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr', gap: 16, padding: '14px 0', borderBottom: `1px solid ${C.rule}`, alignItems: 'start' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, color: C.soft }}>{metric}</div>
            <div style={{ fontFamily: 'DM Serif Display, serif', fontSize: 20, color: C.ink, fontWeight: 400 }}>{value}</div>
            <div className="mono" style={{ fontSize: 11, color: C.muted }}>{note}</div>
          </div>
        ))}
      </div>

      <p style={prose}>
        Si tus números están significativamente por encima del CPL o por debajo del close rate, el problema está en una capa específica del sistema. El diagnóstico siempre empieza por entender en qué capa se pierde el dinero.
      </p>

      {/* Conclusión */}
      <SectionLabel n={6} text="CONCLUSIÓN" />
      <h2 style={h2}>La diferencia entre escalar y sobrevivir.</h2>
      <p style={prose}>
        Un sistema de adquisición bien construido no depende de que estés mirando el panel de Meta todos los días. No depende de un closer estrella que se pueda ir. No depende de que el algoritmo esté de buen humor. Depende de la arquitectura.
      </p>
      <p style={prose}>
        Las tres capas del framework ADC — Atracción, Diagnóstico, Cierre — son el mapa. El stack tecnológico es la infraestructura. Los benchmarks son el GPS que te dice si vas en la dirección correcta. Lo único que falta es instalarlo.
      </p>

      <Callout>
        Si después de leer esto sigues sin saber cuál es tu CAC o tu close rate, ese es el primer problema a resolver. Todo lo demás es decoración.
      </Callout>

      {/* Author note */}
      <div style={{ marginTop: 56, paddingTop: 28, borderTop: `1px solid ${C.rule}`, display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        <div style={{
          width: 48, height: 48, borderRadius: 99, flexShrink: 0,
          background: C.ink, display: 'grid', placeItems: 'center',
          color: C.bg, fontFamily: 'DM Serif Display, serif', fontSize: 22,
        }}>C</div>
        <div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 15, color: C.ink }}>Cristian González</div>
          <div className="mono" style={{ fontSize: 10, letterSpacing: '.12em', color: C.muted, marginBottom: 8 }}>Fundador · adsBigger · Bogotá</div>
          <p className="sub" style={{ fontStyle: 'italic', fontSize: 15, color: C.soft, lineHeight: 1.5 }}>
            Construyo sistemas de adquisición High-Ticket para fundadores en Latam. Antes de adsBigger: 5 años gestionando más de $2M USD en campañas de performance. Ahora instalo sistemas que no dependen de que yo esté mirando el panel.
          </p>
        </div>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────
export default function SistemaDeAdquisicionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sistema de adquisición de clientes: la guía técnica · adsBigger Blog';
    return () => { document.title = 'adsBigger™ — Instalamos sistemas, no vendemos anuncios'; };
  }, []);

  return (
    <main style={{ background: C.bg, color: C.ink, minHeight: '100vh' }}>
      <ReadingProgress />
      <Breadcrumb />
      <Reveal><ArticleMasthead /></Reveal>
      <ArticleBody />
      <Reveal><ArticleCTA /></Reveal>
      <RelatedPosts />

      {/* Back to blog */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px clamp(20px, 4vw, 40px) 48px' }}>
        <Link to="/blog" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: C.muted, fontFamily: 'DM Sans, sans-serif', fontSize: 13,
          textDecoration: 'none', letterSpacing: '.04em',
          textTransform: 'uppercase',
        }}>
          ← Volver al blog
        </Link>
      </div>
    </main>
  );
}
