import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

// ── Blog palette (cream/parchment editorial theme) ──
const C = {
  bg: '#F5F2EC',
  ink: '#1a1612',
  soft: '#3a342c',
  muted: '#7a6f60',
  rule: 'rgba(26,22,18,0.12)',
  ruleStrong: 'rgba(26,22,18,1)',
  red: '#D51A05',
};

const CATEGORIES = ['Todos', 'Adquisición', 'Calificación', 'Cierre', 'Operación'];

const POSTS = [
  {
    num: '02', cat: 'Calificación',
    title: 'El framework BANT que rechaza al 70% de tus leads (y por qué eso es bueno).',
    dek: 'Tu equipo de ventas no debería hablar con todos. Cómo construir un filtro de pre-cualificación que repele a los curiosos y deja pasar solo a los compradores reales.',
    stats: [{ n: '70%', l: 'leads filtrados' }, { n: '2.4×', l: 'tasa cierre' }],
    read: '9 MIN', date: '22 ABR', slug: null,
  },
  {
    num: '03', cat: 'Operación',
    title: 'n8n vs Zapier: por qué cambiamos toda la operación (y cuándo no deberías).',
    dek: 'Auto-hospedado, nodos de IA, sin límites de pasos. Pero también más fricción de setup. La comparación honesta después de 18 meses migrando flujos.',
    stats: [{ n: '$340', l: 'USD/mes ahorro' }, { n: '12', l: 'flujos migrados' }],
    read: '11 MIN', date: '15 ABR', slug: null,
  },
  {
    num: '04', cat: 'Adquisición',
    title: 'Anatomía de una landing High-Ticket: 12 elementos no negociables.',
    dek: 'Hero VSL, prueba social numérica, prevención de objeciones, CTA cualificador. Disección de la landing que cerró 3 ventas de $5.000 con 150 clics.',
    stats: [{ n: '12.4%', l: 'conversión' }, { n: '$42k', l: 'ingreso' }],
    read: '8 MIN', date: '08 ABR', slug: null,
  },
  {
    num: '05', cat: 'Cierre',
    title: 'El SOP de Discovery Call que sustituye a tu Closer estrella.',
    dek: 'Si tu venta depende de un humano específico, no tienes un sistema. Cómo documentar el proceso de cierre para que cualquier setter entrenado lo replique.',
    stats: [{ n: '3 sem', l: 'ramp-up' }, { n: '22%', l: 'close rate base' }],
    read: '10 MIN', date: '01 ABR', slug: null,
  },
  {
    num: '06', cat: 'Operación',
    title: 'CAC, LTV, ROAS: el dashboard del CEO que no necesita un analista.',
    dek: 'Cinco métricas. Una sola pantalla. La diferencia entre un fundador que decide con datos y uno que decide con sensaciones.',
    stats: [{ n: '5', l: 'métricas core' }, { n: '15min', l: 'review semanal' }],
    read: '7 MIN', date: '25 MAR', slug: null,
  },
  {
    num: '07', cat: 'Adquisición',
    title: 'Vibe Design: por qué tu landing se siente barata (aunque cobres caro).',
    dek: 'Colorimetría, ritmo tipográfico, jerarquía honesta. La estética como vendedor silencioso — caso real Ferriperfiles.',
    stats: [{ n: '+340%', l: 'leads/mes' }, { n: '14', l: 'días a live' }],
    read: '9 MIN', date: '18 MAR', slug: null,
  },
  {
    num: '08', cat: 'Calificación',
    title: 'Lead scoring con n8n: cómo el sistema rechaza solo a los que no pueden pagar.',
    dek: 'Workflow exacto, condiciones, webhooks. La automatización que te ahorra 40 horas/semana de filtrar curiosos sin presupuesto.',
    stats: [{ n: '40 hrs', l: 'ahorradas/sem' }, { n: '8 nodos', l: 'n8n' }],
    read: '12 MIN', date: '11 MAR', slug: null,
  },
];

// ── Masthead ─────────────────────────────────────────
function Masthead() {
  return (
    <header style={{
      maxWidth: 1280, margin: '0 auto',
      padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 40px) 32px',
      borderBottom: `1px solid ${C.ruleStrong}`,
    }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: C.muted }}>
        ◆ EL CUADERNO TÉCNICO · ADSBIGGER
      </div>
      <h1 className="sg" style={{
        fontSize: 'clamp(56px, 9vw, 132px)',
        lineHeight: 0.92,
        letterSpacing: '-0.025em',
        margin: '16px 0 0',
        color: C.ink,
      }}>
        Cómo se<br />construye<br />la máquina.
      </h1>
      <p className="sub" style={{
        fontStyle: 'italic', fontSize: 'clamp(18px, 2.2vw, 24px)',
        lineHeight: 1.4, color: C.soft, marginTop: 20, maxWidth: 680,
      }}>
        Frameworks operativos, stacks que no se caen y benchmarks que la competencia no quiere enseñarte. Sin relleno.
      </p>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        gap: 24, marginTop: 32, flexWrap: 'wrap',
      }}>
        <div className="mono" style={{ fontSize: 12, letterSpacing: '.15em', color: C.muted }}>
          VOL. 01 · 08 ENTRADAS · ABRIL 2026
        </div>
        <div className="sub" style={{ fontStyle: 'italic', fontSize: 16, color: C.soft }}>
          Editor:&nbsp;
          <span style={{ fontStyle: 'normal', fontFamily: 'DM Sans, sans-serif', fontWeight: 500, color: C.ink }}>
            Cristian González
          </span>
        </div>
      </div>
    </header>
  );
}

// ── Filters ───────────────────────────────────────────
function Filters({ active, onChange }) {
  return (
    <div style={{
      maxWidth: 1280, margin: '0 auto',
      padding: '20px clamp(20px, 4vw, 40px)',
      display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center',
      borderBottom: `1px solid ${C.rule}`,
    }}>
      <span className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: C.muted, marginRight: 8 }}>
        ◆ FILTRAR
      </span>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          style={{
            background: active === cat ? C.ink : 'transparent',
            color: active === cat ? C.bg : C.soft,
            border: `1px solid ${active === cat ? C.ink : C.rule}`,
            padding: '8px 16px', borderRadius: 99,
            fontFamily: 'DM Sans, sans-serif', fontSize: 13,
            cursor: 'pointer', transition: 'all 180ms',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ── Featured article ──────────────────────────────────
function Featured() {
  return (
    <Reveal>
      <section style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px) 28px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
        gap: 'clamp(28px, 5vw, 56px)',
        alignItems: 'end',
      }}>
        {/* Text */}
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: C.red }}>
            ◆ DESTACADO · ADQUISICIÓN
          </div>
          <Link to="/blog/sistema-de-adquisicion" style={{ textDecoration: 'none', display: 'block' }}>
            <h2 className="sg" style={{
              fontSize: 'clamp(30px, 4.2vw, 60px)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              margin: '14px 0 0',
              color: C.ink,
              textWrap: 'balance',
              transition: 'color 180ms',
            }}
              onMouseEnter={e => e.currentTarget.style.color = C.red}
              onMouseLeave={e => e.currentTarget.style.color = C.ink}
            >
              Sistema de adquisición de clientes: la guía técnica para escalar tu negocio.
            </h2>
          </Link>
          <p className="sub" style={{
            fontStyle: 'italic', fontSize: 'clamp(17px, 2vw, 21px)',
            lineHeight: 1.45, color: C.soft, marginTop: 18, maxWidth: 520,
          }}>
            Hacer anuncios en Meta no es tener un sistema. Esta es la arquitectura completa — framework ADC, stack tecnológico, captación y benchmarks reales.
          </p>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: C.muted, marginTop: 22 }}>
            CRISTIAN GONZÁLEZ · 14 MIN · 26 ABR 2026
          </div>
          <Link to="/blog/sistema-de-adquisicion" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginTop: 20, color: C.red, fontFamily: 'DM Sans, sans-serif',
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            letterSpacing: '.04em', textTransform: 'uppercase',
          }}>
            Leer artículo →
          </Link>
        </div>

        {/* Thumbnail */}
        <div style={{
          aspectRatio: '4/3',
          borderRadius: 6,
          background: `linear-gradient(135deg, ${C.ink} 0%, ${C.red} 100%)`,
          position: 'relative', overflow: 'hidden',
          minHeight: 220,
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 60%)',
          }} />
          <div className="mono" style={{
            position: 'absolute', bottom: 24, left: 28,
            color: 'rgba(255,255,255,0.55)', fontSize: 11, letterSpacing: '.25em',
          }}>
            Nº 01 · ADQUISICIÓN
          </div>
          <div className="sg" style={{
            position: 'absolute', top: 20, right: 28,
            color: '#fff', fontSize: 'clamp(48px, 7vw, 80px)', opacity: 0.35,
          }}>
            ◆
          </div>
        </div>
      </section>
    </Reveal>
  );
}

// ── Newsletter inline ─────────────────────────────────
function NewsletterBlock() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    fetch('https://devn8n.adsbigger.cloud/webhook/newsletter-subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'blog', ts: Date.now() }),
    }).catch(() => {});
    setSent(true);
    try { window.fbq && window.fbq('track', 'Lead', { content_name: 'Newsletter' }); } catch {}
    try { window.gtag && window.gtag('event', 'generate_lead', { source: 'newsletter_blog' }); } catch {}
  };

  return (
    <div style={{
      maxWidth: 860, margin: '48px auto',
      padding: 'clamp(32px, 5vw, 56px) clamp(20px, 4vw, 40px)',
      borderTop: `1px solid ${C.ruleStrong}`,
      borderBottom: `1px solid ${C.ruleStrong}`,
    }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: C.red }}>
        ◆ EL NEWSLETTER
      </div>
      <h4 className="sg" style={{
        fontSize: 'clamp(28px, 4vw, 44px)',
        lineHeight: 1.05, margin: '14px 0 14px',
        letterSpacing: '-0.015em', color: C.ink,
      }}>
        Un email los miércoles. Sin relleno.
      </h4>
      <p className="sub" style={{
        fontStyle: 'italic', fontSize: 'clamp(16px, 2vw, 20px)',
        color: C.soft, margin: '0 0 22px',
      }}>
        Una pieza operativa de tu sistema cada semana — un framework, un stack, un benchmark. Sin pop-ups, sin spam, baja en un clic.
      </p>
      {sent ? (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: C.ink, color: C.bg, padding: '14px 22px',
          borderRadius: 4, fontFamily: 'DM Sans, sans-serif', fontSize: 14,
        }}>
          ✓ Listo — te llega cada miércoles
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 8, maxWidth: 520, flexWrap: 'wrap' }}>
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="tu@email.com"
            style={{
              flex: 1, minWidth: 200, padding: '13px 16px',
              background: 'transparent', border: `1px solid ${C.rule}`,
              borderRadius: 3, fontFamily: 'DM Sans, sans-serif', fontSize: 15,
              color: C.ink, outline: 'none',
              transition: 'border-color 180ms',
            }}
            onFocus={e => e.target.style.borderColor = C.red}
            onBlur={e => e.target.style.borderColor = C.rule}
          />
          <button type="submit" className="sg" style={{
            background: C.ink, color: C.bg, border: 'none',
            padding: '13px 22px', borderRadius: 3, fontSize: 12,
            letterSpacing: '.08em', cursor: 'pointer',
            transition: 'opacity 180ms',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Suscribir →
          </button>
        </form>
      )}
    </div>
  );
}

// ── Feed item ─────────────────────────────────────────
function FeedItem({ post }) {
  return (
    <Reveal>
      <article className="blog-feed-item" style={{ borderBottom: `1px solid ${C.rule}` }}>
        <div className="mono blog-feed-num" style={{ fontSize: 11, letterSpacing: '.2em', color: C.muted, paddingTop: 6 }}>
          Nº {post.num}
        </div>
        <div className="mono blog-feed-cat" style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: C.red, paddingTop: 6 }}>
          ◆ {post.cat}
        </div>
        <div>
          <h3 className="sg" style={{ fontSize: 'clamp(20px, 2.4vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.015em', margin: 0, textWrap: 'balance' }}>
            {post.slug ? (
              <Link to={`/blog/${post.slug}`} style={{ color: C.ink, textDecoration: 'none', transition: 'color 180ms' }}
                onMouseEnter={e => e.currentTarget.style.color = C.red}
                onMouseLeave={e => e.currentTarget.style.color = C.ink}
              >{post.title}</Link>
            ) : (
              <span style={{ color: C.ink }}>{post.title}</span>
            )}
          </h3>
          <p className="sub" style={{ fontStyle: 'italic', fontSize: 17, lineHeight: 1.48, color: C.soft, marginTop: 10, maxWidth: 600 }}>
            {post.dek}
          </p>
        </div>
        {/* Stats — hidden on mobile via CSS */}
        <div className="blog-feed-stats" style={{ display: 'flex', gap: 16, paddingTop: 4 }}>
          {post.stats.map(s => (
            <div key={s.l}>
              <div className="sg" style={{ fontSize: 22, lineHeight: 1, letterSpacing: '-0.02em', color: C.ink }}>{s.n}</div>
              <div className="mono" style={{ fontSize: 9, letterSpacing: '.15em', textTransform: 'uppercase', color: C.muted, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div className="blog-feed-meta mono" style={{ fontSize: 11, letterSpacing: '.15em', color: C.muted, textAlign: 'right', paddingTop: 6 }}>
          {post.read}<br />{post.date}
        </div>
      </article>
    </Reveal>
  );
}

// ── Feed section ──────────────────────────────────────
function Feed({ filter }) {
  const filtered = filter === 'Todos'
    ? POSTS
    : POSTS.filter(p => p.cat === filter);

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px clamp(20px, 4vw, 40px)', borderTop: `1px solid ${C.rule}` }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>
        ◆ ENTRADAS RECIENTES
      </div>

      {filtered.length === 0 && (
        <p className="sub" style={{ fontStyle: 'italic', color: C.soft, padding: '40px 0' }}>
          No hay artículos en esta categoría todavía.
        </p>
      )}

      {filtered.map((post, i) => (
        <div key={post.num}>
          <FeedItem post={post} />
          {/* Inline newsletter after 5th post */}
          {i === 4 && filter === 'Todos' && <NewsletterBlock />}
        </div>
      ))}

      {/* Newsletter at end if filter active or fewer than 5 posts */}
      {(filter !== 'Todos' || filtered.length < 5) && <NewsletterBlock />}
    </section>
  );
}

// ── Page ──────────────────────────────────────────────
export default function BlogPage() {
  const [filter, setFilter] = useState('Todos');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Blog · adsBigger — Cuaderno técnico de sistemas de adquisición';
    return () => { document.title = 'adsBigger™ — Instalamos sistemas, no vendemos anuncios'; };
  }, []);

  return (
    <main style={{ background: C.bg, color: C.ink, minHeight: '100vh' }}>
      <Masthead />
      <Filters active={filter} onChange={setFilter} />
      <Featured />
      <Feed filter={filter} />

      {/* CTA bottom strip */}
      <Reveal>
        <div style={{
          background: C.ink, color: C.bg,
          padding: 'clamp(40px, 6vw, 64px) clamp(20px, 4vw, 40px)',
          textAlign: 'center',
        }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', color: C.muted, marginBottom: 16 }}>
            ◆ ¿LISTO PARA INSTALAR EL SISTEMA?
          </div>
          <h3 className="sg" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 20 }}>
            Del cuaderno a tu negocio.
          </h3>
          <p className="sub" style={{ fontStyle: 'italic', fontSize: 18, color: 'rgba(245,242,236,0.7)', maxWidth: 500, margin: '0 auto 32px' }}>
            Si ya leíste suficiente y quieres que instalemos esto en tu operación, el Sprint es el siguiente paso.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/sprint" style={{
              background: C.red, color: '#fff',
              padding: '14px 28px', borderRadius: 8,
              fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: 14,
              letterSpacing: '.06em', textTransform: 'uppercase',
              textDecoration: 'none', boxShadow: '0 4px 20px rgba(213,26,5,.35)',
              transition: 'transform 200ms',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              Ver Sprint · $5M →
            </Link>
            <Link to="/diagnostico" style={{
              background: 'transparent', color: C.bg,
              border: `1px solid rgba(245,242,236,0.2)`,
              padding: '14px 28px', borderRadius: 8,
              fontFamily: 'DM Sans, sans-serif', fontWeight: 600, fontSize: 14,
              letterSpacing: '.04em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}>
              Diagnóstico gratuito
            </Link>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
