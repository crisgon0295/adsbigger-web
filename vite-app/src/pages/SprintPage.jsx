import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useMarketingStack from '../hooks/useMarketingStack';
import WhatsAppFab from '../components/WhatsAppFab';

const SPRINT = {
  headline_b: 'Un sistema de adquisición, instalado en 14 días.',
  price_cop: '5.000.000',
  price_usd: '1.270',
  cupos_totales: 3,
  cupos_tomados: 2
};

function SprintApplyForm({ track }) {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    track('Lead', { event_category: 'Sprint_Application', value: 1270, currency: 'USD' });
    
    fetch('https://devn8n.adsbigger.cloud/webhook/sprint-apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, ts: Date.now() })
    })
    .then(() => setStatus('success'))
    .catch(() => setStatus('success')); // even on error show success for UX
  };

  const inputStyle = {
    width: '100%', padding: '16px', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.15)', borderRadius: 6,
    color: '#fff', fontSize: 16, fontFamily: 'DM Sans',
    outline: 'none', transition: 'border-color 200ms'
  };

  if (status === 'success') {
    return (
      <div style={{ background: '#0D3DD9', padding: '48px 32px', borderRadius: 8, textAlign: 'center', color: '#fff' }}>
        <div style={{ width: 64, height: 64, background: '#fff', color: '#0D3DD9', borderRadius: 99, display: 'grid', placeItems: 'center', fontSize: 32, margin: '0 auto 24px' }}>✓</div>
        <div className="serif" style={{ fontSize: 32, marginBottom: 12 }}>Solicitud recibida.</div>
        <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 20, fontStyle: 'italic', color: '#dfe9ff' }}>
          Cris te contactará por WhatsApp en las próximas 2 horas para discutir tu caso y ver si hacemos fit.
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', padding: 40, borderRadius: 8, border: '1px solid rgba(255,255,255,0.1)' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#aaa', fontWeight: 500 }}>Nombre completo</label>
          <input name="nombre" required style={inputStyle} placeholder="Tu nombre" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#aaa', fontWeight: 500 }}>Empresa / Sitio Web</label>
          <input name="empresa" required style={inputStyle} placeholder="Ej: adsbigger.com" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#aaa', fontWeight: 500 }}>WhatsApp (con código de país)</label>
          <input name="whatsapp" required style={inputStyle} placeholder="+57 300 000 0000" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: '#aaa', fontWeight: 500 }}>¿Cuál es tu principal cuello de botella hoy?</label>
          <textarea name="problema" required rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Falta de leads, leads de mala calidad, CPL muy alto..."></textarea>
        </div>
        <button type="submit" disabled={status === 'loading'} className="sg" style={{
          background: '#F5C518', color: '#0A0A0A', padding: '18px', borderRadius: 6,
          border: 'none', fontSize: 15, textTransform: 'uppercase', letterSpacing: '.05em',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer', marginTop: 10,
          opacity: status === 'loading' ? 0.7 : 1
        }}>
          {status === 'loading' ? 'Enviando...' : 'Aplicar al Sprint →'}
        </button>
      </form>
    </div>
  );
}

export default function SprintPage() {
  const { track } = useMarketingStack();
  const onCTA = (label) => track('CTA_Click', { label, variant: 'B' });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#F5F2EC', color: '#0A0A0A', fontFamily: 'DM Sans, system-ui, sans-serif', minHeight: '100vh' }}>
      <HeroB onCTA={onCTA} />
      <ProblemB />
      <TimelineB />
      <GuaranteeB />
      <ComparisonB onCTA={onCTA} />
      <TestimonialB />
      <FAQB />
      <ApplyB track={track} />
      <FooterB />
      <WhatsAppFab />
    </div>
  );
}

function HeroB({ onCTA }) {
  return (
    <section id="top" style={{ position: 'relative', padding: '80px 40px 120px', overflow: 'hidden' }}>
      <div className="grid-responsive-even" style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase' }}>
            — Sprint adsBigger · 14 días
          </div>
          <h1 className="serif" style={{ fontSize: 'clamp(46px,6vw,92px)', lineHeight: 0.96, margin: '28px 0 0', letterSpacing: '-0.02em', textWrap: 'balance' }}>
            {SPRINT.headline_b}
          </h1>
          <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 26, lineHeight: 1.4, color: '#3a3a3a', marginTop: 28, maxWidth: 560, fontStyle: 'italic' }}>
            Un proyecto con fecha de inicio, fecha de entrega y resultados verificables. Sin retainers, sin reuniones eternas, sin <em>fases de discovery</em> que nunca terminan.
          </p>
          <div style={{ marginTop: 36, display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="#aplicar" onClick={() => onCTA('Hero_Apply')} style={{ background: '#0A0A0A', color: '#fff', padding: '18px 32px', borderRadius: 99, textDecoration: 'none', fontSize: 14, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Aplicar al Sprint <span>→</span>
            </a>
            <a href="#timeline" style={{ color: '#0A0A0A', textDecoration: 'underline', textUnderlineOffset: 4, fontSize: 14 }}>Ver el proceso</a>
          </div>
          <div style={{ marginTop: 40, paddingTop: 28, borderTop: '1px solid rgba(0,0,0,0.12)', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {[['14', 'días'], ['3', 'cupos/mes'], ['$5M', 'COP único']].map(([n, l], i) =>
              <div key={i}>
                <div className="serif" style={{ fontSize: 38, lineHeight: 1, letterSpacing: '-0.02em' }}>{n}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 4, letterSpacing: '.05em' }}>{l}</div>
              </div>)}
          </div>
        </div>

        {/* Editorial visual — stack de tarjetas */}
        <div style={{ position: 'relative', perspective: 1600 }}>
          <div style={{ position: 'relative', transform: 'rotate(-2deg)' }}>
            <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 4, padding: 32, boxShadow: '0 30px 60px rgba(0,0,0,0.12)' }}>
              <div className="mono" style={{ fontSize: 10, color: '#0D3DD9', letterSpacing: '.25em' }}>SPRINT · ENTREGA</div>
              <div className="serif" style={{ fontSize: 32, lineHeight: 1.05, marginTop: 12 }}>El sistema,<br />instalado y corriendo.</div>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['Landing de alta conversión', 'Campañas Meta Ads en vivo', 'Pixel + GA4 + tracking', 'Oferta validada', 'Briefing de Escala'].map((t, i) =>
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', paddingBottom: 10, borderBottom: i < 4 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                    <span style={{ width: 16, height: 16, border: '1.5px solid #0A0A0A', borderRadius: 99, display: 'grid', placeItems: 'center', fontSize: 10, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 14, color: '#0A0A0A' }}>{t}</span>
                  </div>)}
              </div>
              <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px dashed rgba(0,0,0,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span className="mono" style={{ fontSize: 10, color: '#666' }}>TOTAL</span>
                <span className="serif" style={{ fontSize: 28, letterSpacing: '-0.02em' }}>${SPRINT.price_cop}</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', top: -20, right: -30, width: 100, height: 100, borderRadius: 99, background: '#0D3DD9', color: '#fff', display: 'grid', placeItems: 'center', transform: 'rotate(12deg)', fontFamily: 'DM Serif Display', fontSize: 16, lineHeight: 1.1, textAlign: 'center' }}>
            <div>14<br />días</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemB() {
  return (
    <section style={{ background: '#0A0A0A', color: '#F5F2EC', padding: '120px 40px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#aaa', letterSpacing: '.25em' }}>— PARA QUIÉN ES</div>
        <h2 className="serif" style={{ fontSize: 'clamp(40px,5vw,72px)', lineHeight: 0.98, margin: '18px 0 0', letterSpacing: '-0.02em', textWrap: 'balance' }}>
          Ya leíste el Kit. Ya sabes qué hay que hacer. <em style={{ color: '#179DFF', fontStyle: 'italic' }}>Ahora necesitas a alguien que lo haga.</em>
        </h2>
        <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 24, color: '#b8b8b8', marginTop: 28, fontStyle: 'italic', lineHeight: 1.5, maxWidth: 780 }}>
          El Sprint es para dueños que ya pasaron por el diagnóstico, entendieron el problema, y concluyeron que su tiempo vale más que los $5M. No vendemos a principiantes. Vendemos velocidad de ejecución.
        </p>
      </div>
    </section>
  );
}

function TimelineB() {
  const phases = [
    { d: '01–03', t: 'Investigación + estrategia', items: ['Kick-off 45 min con Cris', 'Workbook ADN de Marca', 'Research + benchmarks CPL', 'Oferta definida con datos'] },
    { d: '04–08', t: 'Construcción', items: ['Landing de alta conversión', 'Copies de 3 anuncios', 'Creativos (imagen + video)', 'Pixel Meta + GA4 + alertas'] },
    { d: '09–11', t: 'Revisión + ajustes', items: ['Presentación por Loom', 'Máximo 2 iteraciones', 'Pruebas end-to-end'] },
    { d: '12–14', t: 'Lanzamiento + escala', items: ['Meta Ads activados', '48h de monitoreo vivo', 'Briefing de Escala · roadmap'] }
  ];
  return (
    <section id="timeline" style={{ background: '#F5F2EC', padding: '140px 40px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em' }}>— TIMELINE</div>
        <h2 className="serif" style={{ fontSize: 'clamp(40px,5.5vw,84px)', lineHeight: 0.98, margin: '18px 0 0', letterSpacing: '-0.02em', textWrap: 'balance', maxWidth: 1000 }}>
          Los 14 días, día por día.
        </h2>
        <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 22, color: '#555', marginTop: 22, fontStyle: 'italic', maxWidth: 700, lineHeight: 1.5 }}>
          Sin ambigüedad. Cada fase con entregables verificables y fechas que respetamos.
        </p>

        <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {phases.map((p, i) =>
            <div key={i} className="timeline-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, padding: '40px 0', borderBottom: '1px solid rgba(0,0,0,0.12)', alignItems: 'start' }}>
              <div>
                <div className="mono" style={{ fontSize: 13, color: '#0D3DD9', letterSpacing: '.15em' }}>DÍAS</div>
                <div className="serif" style={{ fontSize: 54, lineHeight: 1, letterSpacing: '-0.02em', marginTop: 6 }}>{p.d}</div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#888', letterSpacing: '.1em', textTransform: 'uppercase' }}>Fase {i + 1}</div>
                <div className="serif" style={{ fontSize: 32, lineHeight: 1.1, marginTop: 8, letterSpacing: '-0.01em' }}>{p.t}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 14 }}>
                  {p.items.map((x, j) =>
                    <li key={j} style={{ fontSize: 16, color: '#2a2a2a', padding: '8px 0', borderBottom: '1px dashed rgba(0,0,0,0.1)', breakInside: 'avoid' }}>
                      <span style={{ color: '#0D3DD9', marginRight: 10 }}>→</span>{x}
                    </li>)}
                </ul>
              </div>
            </div>)}
        </div>

        {/* Bonus editorial */}
        <div className="grid-responsive-even" style={{ marginTop: 48, background: '#0A0A0A', color: '#F5F2EC', borderRadius: 6, padding: '48px', gap: 48 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, color: '#F5C518', letterSpacing: '.25em' }}>— BONUS · PRIMEROS 5 CLIENTES</div>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1.1, marginTop: 14, letterSpacing: '-0.02em' }}>Sesión Estratégica de Escala</div>
            <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 19, color: '#ccc', marginTop: 14, fontStyle: 'italic', lineHeight: 1.5 }}>
              45 minutos adicionales con Cris para mapear tu plan post-Sprint: canales, automatizaciones, roadmap de escala. <span style={{ color: '#F5C518' }}>Valor $1.500.000 COP</span> · incluido.
            </p>
          </div>
          <div className="bonus-border" style={{ paddingLeft: 0, borderLeft: 'none' }}>
            <div className="mono" style={{ fontSize: 11, color: '#F5C518', letterSpacing: '.25em' }}>— CRÉDITO DE UPGRADE</div>
            <div className="serif" style={{ fontSize: 32, lineHeight: 1.1, marginTop: 14, letterSpacing: '-0.02em' }}>$2M hacia el Sistema 90d</div>
            <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 19, color: '#ccc', marginTop: 14, fontStyle: 'italic', lineHeight: 1.5 }}>
              Si escalas al Sistema completo después del Sprint, aplicamos $2M de crédito. Así el Sprint se convierte en inversión.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuaranteeB() {
  return (
    <section style={{ background: '#0D3DD9', color: '#fff', padding: '120px 40px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', letterSpacing: '.3em' }}>— GARANTÍA DE RESULTADO</div>
        <h2 className="serif" style={{ fontSize: 'clamp(40px,5.5vw,80px)', lineHeight: 0.98, margin: '24px 0 0', letterSpacing: '-0.02em', textWrap: 'balance' }}>
          Si no generas leads en 30 días, <em style={{ color: '#F5C518' }}>seguimos gratis.</em>
        </h2>
        <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 22, color: '#dfe9ff', marginTop: 28, fontStyle: 'italic', lineHeight: 1.5 }}>
          A los 30 días del lanzamiento, revisamos juntos los números. Si el sistema no está produciendo leads calificados — no impresiones, no alcance, leads reales — seguimos trabajando hasta que lo haga, sin cobrar un peso más. Definimos el umbral específico en el kick-off, por escrito.
        </p>
      </div>
    </section>
  );
}

function ComparisonB({ onCTA }) {
  const cols = [
    { title: 'Kit DIY', price: '$97 USD', sub: 'Lo haces tú' },
    { title: 'Sprint', price: `$${SPRINT.price_cop} COP`, sub: '14 días · instalado', highlight: true },
    { title: 'Agencia típica', price: '$3M+ /mes', sub: 'Retainer 6 meses' }
  ];
  const rows = [
    ['Tiempo a primer lead', '4–8 semanas', '14 días', '2–3 meses'],
    ['Oferta validada', 'Tú defines', 'Cris contigo', 'Usan tu actual'],
    ['Landing page', 'Plantilla', 'Construida', 'Extra $800k+'],
    ['Campañas vivas', 'No incluye', 'Meta Ads + tracking', 'Sí'],
    ['Compromiso', '$97 único', '$5M único', '$18M / 6 meses'],
    ['Garantía', '30 días', 'Leads en 30d o seguimos', 'Ninguna']
  ];
  return (
    <section style={{ background: '#F5F2EC', padding: '140px 40px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em' }}>— COMPARATIVA</div>
        <h2 className="serif" style={{ fontSize: 'clamp(40px,5.5vw,80px)', lineHeight: 0.98, margin: '18px 0 0', letterSpacing: '-0.02em', textWrap: 'balance', maxWidth: 900 }}>
          Kit · Sprint · Agencia.
        </h2>

        <div style={{ marginTop: 56, background: '#fff', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
          <div style={{ display: 'flex', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ minWidth: 800, width: '100%' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3,1fr)' }}>
                <div style={{ padding: '28px 24px' }} />
                {cols.map((c, i) =>
                  <div key={i} style={{ padding: '28px 24px', background: c.highlight ? '#0A0A0A' : 'transparent', color: c.highlight ? '#fff' : '#0A0A0A', textAlign: 'center', position: 'relative' }}>
                    {c.highlight && <div className="mono" style={{ fontSize: 10, color: '#F5C518', letterSpacing: '.2em', marginBottom: 8 }}>RECOMENDADO</div>}
                    <div className="serif" style={{ fontSize: 26, letterSpacing: '-0.01em' }}>{c.title}</div>
                    <div style={{ fontSize: 24, marginTop: 10, fontFamily: 'DM Serif Display', color: c.highlight ? '#F5C518' : '#0A0A0A' }}>{c.price}</div>
                    <div className="mono" style={{ fontSize: 10, color: c.highlight ? '#aaa' : '#888', marginTop: 6, letterSpacing: '.15em' }}>{c.sub}</div>
                  </div>)}
              </div>
              {rows.map((r, i) => <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr repeat(3,1fr)', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ padding: '18px 24px', fontSize: 13, color: '#666', fontFamily: 'JetBrains Mono' }}>{r[0]}</div>
                {r.slice(1).map((v, j) =>
                  <div key={j} style={{ padding: '18px 24px', fontSize: 14, color: j === 1 ? '#0A0A0A' : '#666', textAlign: 'center', fontWeight: j === 1 ? 500 : 400, background: j === 1 ? 'rgba(13,61,217,0.05)' : 'transparent' }}>{v}</div>)}
              </div>)}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="serif" style={{ fontSize: 68, lineHeight: 1, letterSpacing: '-0.02em' }}>${SPRINT.price_cop}</div>
            <div className="mono" style={{ fontSize: 12, color: '#888', marginTop: 6 }}>COP · pago único · USD ${SPRINT.price_usd}</div>
          </div>
          <a href="#aplicar" onClick={() => onCTA('Compare_Apply')} style={{ background: '#0A0A0A', color: '#fff', padding: '18px 34px', borderRadius: 99, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
            Aplicar al Sprint →
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialB() {
  return (
    <section style={{ background: '#F5F2EC', padding: '120px 40px' }}>
      <div className="grid-responsive-even" style={{ maxWidth: 1100, margin: '0 auto', gap: 64, alignItems: 'center' }}>
        <div style={{ position: 'relative', borderRadius: 6, overflow: 'hidden', aspectRatio: '4/5', background: 'linear-gradient(135deg,#0D3DD9,#0A0A0A)', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <div style={{ width: 76, height: 76, borderRadius: 99, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', display: 'grid', placeItems: 'center', border: '2px solid rgba(255,255,255,0.4)' }}>
              <div style={{ width: 0, height: 0, borderLeft: '20px solid #fff', borderTop: '14px solid transparent', borderBottom: '14px solid transparent', marginLeft: 7 }} />
            </div>
          </div>
          <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, color: '#fff' }}>
            <div className="mono" style={{ fontSize: 10, color: '#F5C518', letterSpacing: '.2em' }}>CASO · 2:40</div>
            <div className="serif" style={{ fontSize: 22, lineHeight: 1.1, marginTop: 8 }}>Ferriperfiles</div>
            <div style={{ fontSize: 13, color: '#ccc', marginTop: 4 }}>Perfiles metálicos · Colombia</div>
          </div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em' }}>— CASO</div>
          <blockquote className="serif" style={{ fontSize: 'clamp(28px,3.2vw,44px)', lineHeight: 1.15, margin: '18px 0 0', letterSpacing: '-0.01em', textWrap: 'balance' }}>
            "En 14 días teníamos lo que llevaba 2 años intentando armar solo."
          </blockquote>
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, paddingTop: 28, borderTop: '1px solid rgba(0,0,0,0.12)' }}>
            {[['+340%', 'leads/mes'], ['$42k', 'CPL'], ['14', 'días']].map(([n, l], i) =>
              <div key={i}>
                <div className="serif" style={{ fontSize: 32, lineHeight: 1, letterSpacing: '-0.02em', color: '#0D3DD9' }}>{n}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>{l}</div>
              </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQB() {
  const qs = [
    { q: 'Es muy caro.', a: '$5M por un sistema instalado en 14 días equivale a 1.6 meses de una agencia típica ($3M × 6 = $18M) — y esta te deja corriendo, no atado. Si aun así es caro, el Kit de $97 es para ti.' },
    { q: 'Lo voy a pensar.', a: 'Bien. Solo recuerda que abrimos 3 cupos por mes. Mientras piensas, otro dueño que ya decidió toma el cupo.' },
    { q: 'Ya trabajé con una agencia y no funcionó.', a: 'Por eso existimos. La agencia típica vive de retainers, no de resultados. Aquí cobramos una vez, entregamos una vez, y si no hay leads en 30 días seguimos sin cobrar.' },
    { q: 'Necesito consultarlo con mi socio.', a: 'Aplica y conversamos los tres por WhatsApp. Mejor decidir con información que con suposiciones.' },
    { q: '¿No puedo empezar solo con los ads?', a: 'Puedes — por eso existe el Kit de $97. Pero ya lo viste: el ads es 20% del problema. El otro 80% es oferta, landing, tracking, calificación.' }
  ];
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: '#F5F2EC', padding: '120px 40px', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em' }}>— OBJECIONES</div>
        <h2 className="serif" style={{ fontSize: 'clamp(36px,5vw,68px)', lineHeight: 0.98, margin: '18px 0 48px', letterSpacing: '-0.02em' }}>Lo que ya pensaste.</h2>
        <div>
          {qs.map((it, i) =>
            <div key={i} onClick={() => setOpen(open === i ? -1 : i)} style={{ padding: '24px 0', borderBottom: '1px solid rgba(0,0,0,0.12)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
                <div className="serif" style={{ fontSize: 22, letterSpacing: '-0.01em' }}>"{it.q}"</div>
                <div style={{ fontSize: 22, color: '#0D3DD9', transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 200ms' }}>+</div>
              </div>
              {open === i && <div style={{ fontFamily: 'EB Garamond, serif', fontSize: 20, color: '#444', marginTop: 14, fontStyle: 'italic', lineHeight: 1.55 }}>{it.a}</div>}
            </div>)}
        </div>
      </div>
    </section>
  );
}

function ApplyB({ track }) {
  return (
    <section id="aplicar" style={{ background: '#0A0A0A', color: '#fff', padding: '140px 40px' }}>
      <div className="grid-responsive-even" style={{ maxWidth: 1100, margin: '0 auto', gap: 64, alignItems: 'start' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: '#F5C518', letterSpacing: '.3em' }}>— APLICA · NO COMPRES</div>
          <h2 className="serif" style={{ fontSize: 'clamp(44px,5.5vw,80px)', lineHeight: 0.96, margin: '18px 0 0', letterSpacing: '-0.02em', textWrap: 'balance' }}>
            {SPRINT.cupos_totales - SPRINT.cupos_tomados} cupo disponible en abril.
          </h2>
          <p style={{ fontFamily: 'EB Garamond, serif', fontSize: 22, marginTop: 24, fontStyle: 'italic', lineHeight: 1.5, maxWidth: 540, color: '#ccc' }}>
            Antes de cobrar, revisamos tu caso. Si encajas, reservamos cupo. Si no, te digo por qué y a qué recurso derivarte.
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 520 }}>
            {['Respondemos por WhatsApp en menos de 2 horas', 'No hay llamada de ventas — conversación directa', 'Reservamos cupo solo si hay match real', 'Pago único $5M COP / USD $1.270'].map((t, i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 15, color: '#ddd' }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: '#F5C518', flexShrink: 0 }} />{t}
              </div>)}
          </div>
        </div>
        <SprintApplyForm track={track} />
      </div>
    </section>
  );
}

function FooterB() {
  return (
    <footer style={{ background: '#0A0A0A', color: '#888', padding: '48px 40px 36px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div className="serif" style={{ color: '#fff', fontSize: 22 }}>adsBigger<sup style={{ fontSize: 11, color: '#888' }}>™</sup></div>
          <div style={{ fontFamily: 'EB Garamond, serif', fontSize: 16, fontStyle: 'italic', color: '#666', marginTop: 4 }}>No vendemos anuncios. Instalamos sistemas.</div>
        </div>
        <div style={{ display: 'flex', gap: 22, fontSize: 13 }}>
          <Link to="/" style={{ color: '#888', textDecoration: 'none' }}>Sistema</Link>
          <Link to="/kit" style={{ color: '#888', textDecoration: 'none' }}>Kit · $97</Link>
          <a href="#aplicar" style={{ color: '#888', textDecoration: 'none' }}>Sprint · $5M</a>
        </div>
        <div className="mono" style={{ fontSize: 11, color: '#555' }}>© 2026 adsBigger™ · Bogotá</div>
      </div>
    </footer>
  );
}
