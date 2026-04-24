import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

/* ============ Marketing stack hook ============ */
function useMarketingStack() {
  const fired = useRef(new Set());
  
  function track(event, payload = {}) {
    if (fired.current.has(event + JSON.stringify(payload))) return;
    fired.current.add(event + JSON.stringify(payload));
    
    // Meta Pixel
    try { window.fbq && window.fbq('track', event, payload); } catch {}
    // GA4
    try { window.gtag && window.gtag('event', event.toLowerCase(), payload); } catch {}
    
    // n8n webhook (silencioso en preview)
    try {
      fetch('https://devn8n.adsbigger.cloud/webhook/kit-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, payload, ts: Date.now() })
      }).catch(() => {});
    } catch {}
    console.log('[mkt]', event, payload);
  }
  
  return { track };
}

/* ============ HERO ============ */
function Hero({ onCTA }) {
  return (
    <section style={{ position: 'relative', background: 'var(--obsidian)', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: -160, left: '50%', transform: 'translateX(-50%)', width: 900, height: 520, background: 'radial-gradient(ellipse at center,rgba(13,61,217,0.35),transparent 60%)', filter: 'blur(20px)' }} />
        <div style={{ position: 'absolute', bottom: -200, right: -140, width: 620, height: 620, background: 'radial-gradient(circle,rgba(213,26,5,0.18),transparent 65%)', filter: 'blur(20px)' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .45, background: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px) 0 0/40px 40px, linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px) 0 0/40px 40px', animation: 'gridDrift 18s linear infinite', maskImage: 'radial-gradient(ellipse at center,#000 40%,transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center,#000 40%,transparent 80%)' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 32px 100px', position: 'relative' }} className="grid-responsive">
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(30,30,30,.8)', border: '1px solid rgba(213,26,5,0.4)', padding: '8px 14px', borderRadius: 99, fontSize: 11, color: '#D51A05', animation: 'fadeUp 700ms ease both' }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: '#D51A05', boxShadow: '0 0 8px #D51A05' }} />
            <span className="sg" style={{ letterSpacing: '.12em' }}>ATENCIÓN · DUEÑOS DE NEGOCIO EN LATAM</span>
          </div>
          <h1 className="sg" style={{ fontSize: 'clamp(44px,6.2vw,86px)', lineHeight: 0.95, margin: '22px 0 0', textTransform: 'uppercase', textWrap: 'balance', animation: 'fadeUp 800ms 100ms ease both', opacity: 0 }}>
            Audita por qué tu negocio<br />no escala — <span style={{ color: '#D51A05' }}>en 30 minutos</span>,<br />sin contratar agencia.
          </h1>
          <p className="sub" style={{ fontSize: 24, lineHeight: 1.45, color: '#cfcfcf', marginTop: 24, maxWidth: 580, fontStyle: 'italic', animation: 'fadeUp 800ms 200ms ease both', opacity: 0 }}>
            El mismo diagnóstico que corremos con clientes de $4.5M COP — empaquetado, grabado y listo para que lo ejecutes tú mismo este fin de semana.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 560, animation: 'fadeUp 800ms 280ms ease both', opacity: 0 }}>
            {['4 módulos en video + plantillas descargables', 'El CEO Scorecard — las 5 métricas que sí mueven caja', 'Bonus: guión de calificación que usamos internamente', 'Acceso inmediato. Implementas en un sábado.'].map((t, i) =>
              <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 16, color: '#e0e0e0', lineHeight: 1.4 }}>
                <span style={{ width: 20, height: 20, display: 'grid', placeItems: 'center', background: 'rgba(23,157,255,0.12)', borderRadius: 5, color: '#179DFF', fontSize: 12, flexShrink: 0, marginTop: 2 }}>✓</span>{t}
              </li>)}
          </ul>
          <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', animation: 'fadeUp 800ms 380ms ease both', opacity: 0 }}>
            <a href="#comprar" onClick={() => onCTA('Hero_Buy')} className="sg" style={{ background: '#D51A05', color: '#fff', padding: '18px 28px', borderRadius: 8, textDecoration: 'none', fontSize: 14, letterSpacing: '.08em', textTransform: 'uppercase', boxShadow: '0 12px 32px rgba(213,26,5,.4)', display: 'inline-flex', alignItems: 'center', gap: 10, position: 'relative', overflow: 'hidden' }}>
              Quiero el Sistema · $97 <span style={{ fontSize: 16 }}>→</span>
              <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)', animation: 'shine 2.8s ease-in-out infinite', pointerEvents: 'none' }} />
            </a>
            <div className="mono" style={{ fontSize: 12, color: '#888' }}>Pago único · Acceso de por vida</div>
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', fontSize: 12, color: '#666', animation: 'fadeUp 800ms 480ms ease both', opacity: 0 }}>
            <span>★★★★★ <span style={{ color: '#888' }}>· 240+ dueños auditados</span></span>
            <span>·</span>
            <span>Garantía 30 días</span>
            <span>·</span>
            <span>No es otro curso genérico</span>
          </div>
        </div>

        {/* Mockup del kit */}
        <div style={{ position: 'relative', animation: 'fadeUp 900ms 200ms ease both', opacity: 0 }}>
          <div style={{ perspective: 1800 }}>
            <div style={{ transform: 'rotateY(-6deg) rotateX(3deg)', transformStyle: 'preserve-3d' }}>
              <div className="glass" style={{ borderRadius: 14, padding: '26px 28px', boxShadow: '0 40px 80px rgba(0,0,0,.5), 0 10px 30px rgba(23,157,255,.12)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: '#179DFF', letterSpacing: '.25em' }}>ADSBIGGER™ · KIT DE DIAGNÓSTICO</div>
                    <div className="sg" style={{ fontSize: 22, marginTop: 6, lineHeight: 1.15, textTransform: 'uppercase' }}>Auditoría de<br />Adquisición DIY</div>
                  </div>
                  <div style={{ background: '#F5C518', color: '#0A0A0A', padding: '4px 10px', borderRadius: 4, transform: 'rotate(4deg)' }}>
                    <div className="sg" style={{ fontSize: 10, letterSpacing: '.15em' }}>$97</div>
                  </div>
                </div>
                <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
                  {[['01', 'Auditoría 30min'], ['02', 'Oferta irresistible'], ['03', 'CEO Scorecard'], ['04', 'Mapa de sistema'], ['B', 'Guión calificación']].slice(0, 4).map(([n, t]) =>
                    <div key={n} style={{ background: 'rgba(10,10,10,0.6)', border: '1px solid var(--line)', borderRadius: 8, padding: '12px 14px' }}>
                      <div className="mono" style={{ fontSize: 10, color: '#D51A05' }}>MOD/{n}</div>
                      <div style={{ fontSize: 13, marginTop: 4, color: '#fff', lineHeight: 1.2 }}>{t}</div>
                    </div>)}
                </div>
                <div style={{ marginTop: 12, padding: '12px 14px', background: 'linear-gradient(90deg,rgba(245,197,24,0.08),transparent)', border: '1px dashed rgba(245,197,24,0.4)', borderRadius: 8 }}>
                  <div className="mono" style={{ fontSize: 10, color: '#F5C518' }}>+ BONUS</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>Guión de calificación de leads</div>
                </div>
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px dashed var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                  <span className="mono" style={{ color: '#888' }}>~4h de video</span>
                  <span className="mono" style={{ color: '#888' }}>5 plantillas</span>
                  <span className="mono" style={{ color: '#F5C518' }}>✓ Acceso inmediato</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ AGITACIÓN ============ */
function Agitacion() {
  const items = [
    { k: 'Tu agencia te manda reportes bonitos.', v: 'Alcance. Impresiones. CTR. Likes. Datos que no pagan nómina. No saben — o no quieren decirte — cuánto te cuesta cada cliente. Ni el LTV. Ni el CAC.' },
    { k: 'Inviertes en ads pero el pipeline está seco.', v: 'No es que los ads no sirvan. Es que estás pagando por tráfico que tu embudo no sabe convertir, y tu equipo de ventas no sabe cerrar con proceso.' },
    { k: 'Sientes que todo depende de ti.', v: 'Si paras una semana, las ventas paran. No tienes un sistema — tienes una operación que se sostiene con tu energía personal. Eso tiene techo.' },
    { k: 'Pagaste cursos. Pagaste gurús. Sigues igual.', v: 'Porque todos te enseñaron tácticas (un anuncio, un copy, un funnel). Nadie te mostró el sistema completo: adquisición + calificación + cierre + control. Conectados.' }
  ];
  return (
    <section style={{ background: '#111', padding: '120px 32px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase' }}><span style={{ color: '#D51A05' }}>◼</span>&nbsp;&nbsp;la verdad incómoda</div>
        <Reveal><h2 className="sg" style={{ fontSize: 'clamp(36px,5vw,68px)', lineHeight: 0.98, margin: '18px 0 0', textTransform: 'uppercase', maxWidth: 900, textWrap: 'balance' }}>
          Tu negocio no necesita <span style={{ color: '#D51A05' }}>más ads</span>.<br />Necesita estructura.
        </h2></Reveal>
        <Reveal delay={80}><p className="sub" style={{ fontSize: 22, color: '#b8b8b8', marginTop: 22, maxWidth: 720, fontStyle: 'italic', lineHeight: 1.4 }}>
          El 95% de los dueños que contratan una agencia nunca resuelven el problema real — porque el problema no es el anuncio. Es todo lo que pasa <em>después</em> del anuncio.
        </p></Reveal>
        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          {items.map((it, i) =>
            <Reveal key={i} delay={i * 80}>
              <div className="glass" style={{ borderRadius: 14, padding: '28px 26px', height: '100%' }}>
                <div className="sg" style={{ fontSize: 20, lineHeight: 1.2, textTransform: 'uppercase' }}>{it.k}</div>
                <div className="sub" style={{ fontSize: 18, color: '#aaa', marginTop: 12, fontStyle: 'italic', lineHeight: 1.5 }}>{it.v}</div>
              </div>
            </Reveal>)}
        </div>
      </div>
    </section>
  );
}

/* ============ MÓDULOS ============ */
function Modules({ onCTA }) {
  const mods = [
    { n: '01', t: 'Cómo auditar tu embudo actual en 30 minutos', d: 'Video Loom paso a paso + Checklist imprimible. Detectas exactamente dónde se fuga el dinero antes de volver a invertir un solo peso en ads.', fmt: ['Video 28min', 'Checklist PDF'] },
    { n: '02', t: 'La fórmula de la oferta irresistible', d: 'La plantilla exacta de Hormozi adaptada a LATAM. Rompes objeciones antes de que tu prospecto pueda levantarlas. Vas a reescribir tu oferta en una tarde.', fmt: ['Video 42min', 'Plantilla Notion'] },
    { n: '03', t: 'El CEO Scorecard — las 5 métricas que importan', d: 'Spreadsheet listo. CAC, LTV, tasa de cierre, ROAS, leads calificados por semana. Elimina las métricas de vanidad del Monday morning.', fmt: ['Video 24min', 'Spreadsheet editable'] },
    { n: '04', t: 'El mapa de tu sistema de adquisición ideal', d: 'Diagrama editable en Miro. Mapeas las 4 capas (adquisición, calificación, cierre, control) adaptadas a tu modelo. Sales con un plan de 90 días.', fmt: ['Video 38min', 'Diagrama Miro'] }
  ];
  return (
    <section id="kit" style={{ background: 'var(--obsidian)', padding: '120px 32px', borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 100, right: -200, width: 500, height: 500, background: 'radial-gradient(circle,rgba(23,157,255,0.12),transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase' }}><span style={{ color: '#179DFF' }}>◼</span>&nbsp;&nbsp;qué hay adentro del kit</div>
        <Reveal><h2 className="sg" style={{ fontSize: 'clamp(36px,5vw,68px)', lineHeight: 0.98, margin: '18px 0 0', textTransform: 'uppercase', maxWidth: 900, textWrap: 'balance' }}>
          4 módulos. 1 bonus.<br /><span style={{ color: '#179DFF' }}>Un sábado</span> para cambiar cómo operas.
        </h2></Reveal>
        <Reveal delay={80}><p className="sub" style={{ fontSize: 22, color: '#b8b8b8', marginTop: 22, maxWidth: 640, fontStyle: 'italic', lineHeight: 1.4 }}>
          Ni teoría, ni testimonios vacíos. Cada módulo te deja con un entregable concreto que puedes imprimir, llenar o copiar a tu operación hoy mismo.
        </p></Reveal>

        <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 16 }}>
          {mods.map((m, i) =>
            <Reveal key={m.n} delay={i * 80}>
              <div className="glass" style={{ borderRadius: 14, padding: '32px 30px', position: 'relative', overflow: 'hidden', height: '100%' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.07 }}>
                  <div className="mono" style={{ fontSize: 150, fontWeight: 700, color: '#179DFF', lineHeight: 1 }}>{m.n}</div>
                </div>
                <div className="mono" style={{ fontSize: 11, color: '#D51A05', letterSpacing: '.25em' }}>MÓDULO {m.n}</div>
                <div className="sg" style={{ fontSize: 24, lineHeight: 1.15, marginTop: 10, textTransform: 'uppercase' }}>{m.t}</div>
                <p className="sub" style={{ fontSize: 18, color: '#bbb', marginTop: 12, fontStyle: 'italic', lineHeight: 1.5 }}>{m.d}</p>
                <div style={{ marginTop: 18, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {m.fmt.map(f => <span key={f} className="mono" style={{ fontSize: 11, background: 'rgba(23,157,255,0.1)', color: '#179DFF', border: '1px solid rgba(23,157,255,0.25)', padding: '5px 10px', borderRadius: 4 }}>{f}</span>)}
                </div>
              </div>
            </Reveal>)}
          {/* Bonus */}
          <Reveal delay={320} style={{ gridColumn: '1 / -1' }}>
            <div className="glass" style={{ borderRadius: 14, padding: '32px 30px', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg,rgba(245,197,24,0.1),rgba(213,26,5,0.05))', border: '1px solid rgba(245,197,24,0.3)' }}>
              <div className="grid-responsive-even" style={{ gap: 28, alignItems: 'center' }}>
                <div>
                  <div className="mono" style={{ fontSize: 11, color: '#F5C518', letterSpacing: '.25em' }}>+ BONUS · INCLUIDO</div>
                  <div className="sg" style={{ fontSize: 30, lineHeight: 1.1, marginTop: 8, textTransform: 'uppercase' }}>Guión de calificación de leads</div>
                  <p className="sub" style={{ fontSize: 19, color: '#ddd', marginTop: 12, fontStyle: 'italic', lineHeight: 1.5 }}>
                    El mismo guión palabra por palabra que usa el equipo de adsBigger para filtrar prospectos antes de la llamada de cierre. Adaptable en 15 minutos.
                  </p>
                </div>
                <div className="sg" style={{ fontSize: 64, color: '#F5C518', lineHeight: 0.9, textAlign: 'right' }}>★</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div style={{ marginTop: 48, textAlign: 'center' }}>
            <a href="#comprar" onClick={() => onCTA('Modules_Buy')} className="sg" style={{ background: '#D51A05', color: '#fff', padding: '18px 34px', borderRadius: 8, textDecoration: 'none', fontSize: 14, letterSpacing: '.08em', textTransform: 'uppercase', boxShadow: '0 12px 32px rgba(213,26,5,.4)', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              Quiero este kit · $97 →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ PRICING TRANSPARENCY ============ */
function PricingTransparency() {
  return (
    <section style={{ background: '#111', padding: '120px 32px', borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, background: 'radial-gradient(ellipse,rgba(213,26,5,0.15),transparent 60%)', filter: 'blur(20px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
        <div className="mono" style={{ fontSize: 11, color: '#D51A05', letterSpacing: '.25em', textTransform: 'uppercase', textAlign: 'center' }}>transparencia radical</div>
        <Reveal><h2 className="sg" style={{ fontSize: 'clamp(36px,5.5vw,72px)', lineHeight: 0.98, margin: '18px 0 0', textTransform: 'uppercase', textWrap: 'balance', textAlign: 'center' }}>
          ¿Por qué tan <span style={{ color: '#D51A05' }}>barato</span>?
        </h2></Reveal>

        <Reveal delay={80}>
          <div className="glass" style={{ marginTop: 48, borderRadius: 14, padding: '48px 48px', borderLeft: '3px solid #D51A05' }}>
            <div className="serif" style={{ fontSize: 28, lineHeight: 1.45, color: '#fff', textWrap: 'balance' }}>
              Te cobramos <span style={{ color: '#D51A05' }}>$97</span> para filtrar a los turistas de los dueños reales.
            </div>
            <p className="sub" style={{ fontSize: 21, color: '#cfcfcf', marginTop: 24, fontStyle: 'italic', lineHeight: 1.55 }}>
              Queremos que uses esto, te des cuenta de todo lo que te falta en tu negocio, y luego — cuando veas los huecos con tus propios ojos — nos pagues <span style={{ color: '#F5C518' }} className="mono">$4.5M COP</span> para que te instalemos el sistema completo en 14 días.
            </p>
            <p className="sub" style={{ fontSize: 21, color: '#cfcfcf', marginTop: 16, fontStyle: 'italic', lineHeight: 1.55 }}>
              Pero <span style={{ color: '#179DFF' }}>este kit es tuyo, sin ataduras</span>. Lo puedes implementar solo. Si con esto armas tu sistema y nunca nos contratas, lo hicimos bien. Si lo ves y decides que prefieres que lo instalemos nosotros, también lo hicimos bien.
            </p>
            <div style={{ marginTop: 28, padding: '18px 22px', background: 'rgba(245,197,24,0.06)', border: '1px solid rgba(245,197,24,0.25)', borderRadius: 8 }}>
              <div className="mono" style={{ fontSize: 10, color: '#F5C518', letterSpacing: '.2em' }}>LO QUE CUBRE ESTE PRECIO</div>
              <div style={{ marginTop: 8, fontSize: 15, color: '#ddd', lineHeight: 1.6 }}>
                Hosting de videos, Notion, Miro, CRM, automatizaciones · <span className="mono" style={{ color: '#888' }}>≈ $110 USD/mes en herramientas</span>. Con $97 cubrimos costos y filtramos audiencia. Todo lo demás es ganancia secundaria.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { t: 'Cubre costos', d: 'Hosting, Notion, Miro, automatizaciones.' },
              { t: 'Filtra calidad', d: 'Los que pagan $97 se lo toman en serio.' },
              { t: 'Pre-califica', d: 'Llegan self-aware a la siguiente llamada.' }
            ].map((x, i) =>
              <div key={i} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--line)', borderRadius: 10, padding: '20px 22px' }}>
                <div className="sg" style={{ fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: '#179DFF' }}>0{i + 1} · {x.t}</div>
                <div className="sub" style={{ fontSize: 17, color: '#bbb', marginTop: 8, fontStyle: 'italic', lineHeight: 1.4 }}>{x.d}</div>
              </div>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ SCORECARD TEASER ============ */
function Scorecard() {
  const metrics = [
    { k: 'CAC', l: 'Costo Adquisición', v: '$168k', c: '#D51A05', n: '01' },
    { k: 'LTV', l: 'Valor de vida', v: '$2.4M', c: '#179DFF', n: '02' },
    { k: 'TCC', l: 'Tasa de cierre', v: '34%', c: '#179DFF', n: '03' },
    { k: 'ROAS', l: 'Retorno ads', v: '4.8x', c: '#F5C518', n: '04' },
    { k: 'LCS', l: 'Leads calif./sem', v: '20+', c: '#D51A05', n: '05' }
  ];
  return (
    <section style={{ background: 'var(--obsidian)', padding: '120px 32px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase' }}><span style={{ color: '#F5C518' }}>◼</span>&nbsp;&nbsp;módulo 03 · teaser</div>
        <Reveal><h2 className="sg" style={{ fontSize: 'clamp(36px,5vw,64px)', lineHeight: 0.98, margin: '18px 0 0', textTransform: 'uppercase', maxWidth: 900, textWrap: 'balance' }}>
          El CEO Scorecard<br /><span className="serif" style={{ color: '#F5C518' }}>— lo que tu agencia no mide.</span>
        </h2></Reveal>
        <Reveal delay={80}><p className="sub" style={{ fontSize: 21, color: '#b8b8b8', marginTop: 22, maxWidth: 720, fontStyle: 'italic', lineHeight: 1.4 }}>
          5 números. Un Google Sheet editable. Llenas esto cada lunes y sabes exactamente si tu negocio está saludable o si estás a 3 meses del colapso.
        </p></Reveal>

        <Reveal delay={120}>
          <div className="glass" style={{ marginTop: 48, borderRadius: 14, padding: '32px 36px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 20, borderBottom: '1px dashed var(--line)' }}>
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#D51A05' }} />
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#F5C518' }} />
              <span style={{ width: 10, height: 10, borderRadius: 99, background: '#20D07A' }} />
              <span className="mono" style={{ fontSize: 11, color: '#888', marginLeft: 12 }}>ceo_scorecard.xlsx — semana 17</span>
            </div>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 2, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 10, overflow: 'hidden' }}>
              {metrics.map(m =>
                <div key={m.k} style={{ background: 'rgba(15,15,15,0.9)', padding: '22px 20px' }}>
                  <div className="mono" style={{ fontSize: 10, color: m.c, letterSpacing: '.15em' }}>{m.n} · {m.k}</div>
                  <div className="serif" style={{ fontSize: 40, color: '#fff', marginTop: 8, lineHeight: 1 }}>{m.v}</div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>{m.l}</div>
                  <div style={{ marginTop: 14, height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${60 + Math.random() * 35}%`, background: m.c, borderRadius: 99 }} />
                  </div>
                </div>)}
            </div>
            <div style={{ marginTop: 20, paddingTop: 18, borderTop: '1px dashed var(--line)', fontSize: 13, color: '#888', display: 'flex', justifyContent: 'space-between' }}>
              <span className="mono">Vanity excluida: likes, impresiones, alcance, seguidores.</span>
              <span className="mono" style={{ color: '#F5C518' }}>✓ Actualizas lunes 9am</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ SPRINT UPSELL ============ */
function SprintBanner({ onCTA }) {
  return (
    <section id="sprint" style={{ background: 'linear-gradient(135deg,#0D3DD9 0%,#0A0A0A 80%)', padding: '100px 32px', borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'repeating-linear-gradient(45deg,rgba(255,255,255,0.4) 0 1px,transparent 1px 14px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }} className="grid-responsive">
        <div>
          <div className="mono" style={{ fontSize: 11, color: '#F5C518', letterSpacing: '.25em', textTransform: 'uppercase' }}>¿y si no quieres hacerlo tú?</div>
          <h2 className="sg" style={{ fontSize: 'clamp(32px,4.5vw,56px)', lineHeight: 0.98, margin: '18px 0 0', textTransform: 'uppercase', textWrap: 'balance' }}>
            El Sprint: nosotros<br />instalamos el sistema<br />en <span style={{ color: '#F5C518' }}>14 días</span>.
          </h2>
          <p className="sub" style={{ fontSize: 21, color: '#dfe9ff', marginTop: 22, maxWidth: 560, fontStyle: 'italic', lineHeight: 1.5 }}>
            Adquisición + calificación + cierre + control, conectados y corriendo en tu empresa. Sin contratos anuales, sin retainer. Un proyecto con fecha de entrega.
          </p>
          <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/sprint" onClick={() => onCTA('Sprint_Learn')} className="sg" style={{ background: '#F5C518', color: '#0A0A0A', padding: '16px 26px', borderRadius: 8, textDecoration: 'none', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase', boxShadow: '0 10px 28px rgba(245,197,24,.32)' }}>
              Ver el Sprint $5M →
            </Link>
            <Link to="/diagnostico" onClick={() => onCTA('Sprint_BANT')} className="sg" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.3)', color: '#fff', padding: '14px 24px', borderRadius: 8, textDecoration: 'none', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase' }}>
              Calificar primero
            </Link>
          </div>
        </div>
        <div style={{ background: 'rgba(10,10,10,0.6)', border: '1px solid rgba(245,197,24,0.3)', borderRadius: 14, padding: '28px 26px', backdropFilter: 'blur(10px)' }}>
          <div className="mono" style={{ fontSize: 10, color: '#F5C518', letterSpacing: '.2em' }}>SPRINT · INCLUYE</div>
          {['Diagnóstico + auditoría completa', 'Oferta + página de ventas', 'CRM + automatizaciones', 'Ads + tracking end-to-end', 'CEO Scorecard configurado', 'Equipo entrenado · 2 reviews'].map((t, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < 5 ? '1px dashed var(--line)' : 'none', fontSize: 14 }}>
              <span style={{ color: '#F5C518' }}>✓</span> {t}
            </div>)}
          <div style={{ marginTop: 14, padding: '12px 14px', background: 'rgba(245,197,24,0.08)', borderRadius: 6, textAlign: 'center' }}>
            <span className="mono" style={{ fontSize: 11, color: '#aaa' }}>desde</span>
            <span className="sg" style={{ fontSize: 24, color: '#F5C518', marginLeft: 8 }}>$4.5M COP</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ GUARANTEE + CHECKOUT ============ */
function Checkout({ onCTA, track }) {
  const [form, setForm] = useState({ nombre: '', email: '', empresa: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const valid = form.nombre.trim() && /.+@.+\..+/.test(form.email);

  const submit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setLoading(true);
    track('Lead', { source: 'kit_checkout', value: 97, currency: 'USD' });
    track('InitiateCheckout', { value: 97 });
    // n8n webhook
    try {
      await fetch('https://devn8n.adsbigger.cloud/webhook/kit-purchase-intent', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ts: Date.now() })
      });
    } catch {}
    try { localStorage.setItem('adsbigger_kit_intent', JSON.stringify({ ...form, ts: Date.now() })); } catch {}
    setTimeout(() => { setLoading(false); setSent(true); }, 900);
  };

  return (
    <section id="comprar" style={{ background: '#D51A05', color: '#fff', padding: '120px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08, background: 'repeating-linear-gradient(45deg,rgba(0,0,0,0.4) 0 2px,transparent 2px 8px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', alignItems: 'start' }} className="grid-responsive">
        <div>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', opacity: .85 }}>último paso</div>
          <h2 className="sg" style={{ fontSize: 'clamp(40px,5.5vw,76px)', lineHeight: 0.96, margin: '18px 0 0', textTransform: 'uppercase', textWrap: 'balance' }}>
            $97. Acceso inmediato.<br />Garantía 30 días.
          </h2>
          <p className="sub" style={{ fontSize: 22, marginTop: 20, fontStyle: 'italic', lineHeight: 1.45, maxWidth: 560, opacity: .95 }}>
            Si después de completar los 4 módulos sientes que no valió el tiempo, te devolvemos el dinero. Sin formularios, sin preguntas, sin cara de "por qué".
          </p>
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
            {['Acceso inmediato a los 4 módulos + bonus', 'Actualizaciones futuras gratis', 'Soporte por WhatsApp 7 días', 'Garantía 30 días · sin preguntas', 'Se deduce si luego contratas el Sprint'].map((t, i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16 }}>
                <span style={{ width: 22, height: 22, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.18)', borderRadius: 5, fontSize: 13 }}>✓</span>{t}
              </div>)}
          </div>
        </div>

        <form onSubmit={submit} style={{ background: '#0A0A0A', borderRadius: 14, padding: '36px 32px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
          {!sent ? (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 }}>
                <div className="mono" style={{ fontSize: 11, color: '#D51A05', letterSpacing: '.25em' }}>kit · auditoría diy</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span className="mono" style={{ fontSize: 13, color: '#666', textDecoration: 'line-through' }}>$297</span>
                  <span className="sg" style={{ fontSize: 44, color: '#F5C518', lineHeight: 1 }}>$97</span>
                </div>
              </div>
              <div className="sg" style={{ fontSize: 22, color: '#fff', lineHeight: 1.2, textTransform: 'uppercase' }}>Datos de acceso</div>
              <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['nombre', 'Nombre completo', 'text'], ['email', 'Email (aquí llegan los videos)', 'email'], ['empresa', 'Empresa', 'text']].map(([k, l, type]) =>
                  <div key={k}>
                    <div className="mono" style={{ fontSize: 10, color: '#888', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 5 }}>{l}</div>
                    <input value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} type={type}
                      style={{ width: '100%', background: '#151515', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '13px 15px', borderRadius: 8, fontSize: 15, fontFamily: 'DM Sans', outline: 'none' }}
                      onFocus={e => e.target.style.borderColor = '#D51A05'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>)}
              </div>
              <button type="submit" disabled={!valid || loading} className="sg" style={{ marginTop: 22, width: '100%', background: valid ? '#D51A05' : '#3a1c17', color: '#fff', padding: '18px 22px', borderRadius: 8, border: 'none', fontSize: 14, cursor: valid ? 'pointer' : 'not-allowed', letterSpacing: '.08em', textTransform: 'uppercase', boxShadow: valid ? '0 12px 28px rgba(213,26,5,.45)' : 'none' }}>
                {loading ? 'Procesando…' : 'Pagar $97 y acceder →'}
              </button>
              <div style={{ fontSize: 12, color: '#888', marginTop: 14, textAlign: 'center' }}>Pago seguro · Stripe · Tarjeta o PSE</div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 48, color: '#20D07A' }}>✓</div>
              <div className="sg" style={{ fontSize: 26, marginTop: 10, color: '#20D07A', textTransform: 'uppercase' }}>¡Listo!</div>
              <p className="sub" style={{ fontSize: 18, color: '#ddd', marginTop: 14, fontStyle: 'italic', lineHeight: 1.4 }}>
                Te estamos enviando el link de pago a <span className="mono" style={{ color: '#fff' }}>{form.email}</span>. Revisa tu inbox en los próximos 2 minutos.
              </p>
              <Link to="/diagnostico" className="sg" style={{ display: 'inline-block', marginTop: 22, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px 22px', borderRadius: 8, textDecoration: 'none', fontSize: 13, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                Mientras tanto, haz el diagnóstico →
              </Link>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const qs = [
    { q: '¿Esto es otro curso?', a: 'No. Son 4 videos cortos con un entregable por módulo. Si necesitas teoría, hay YouTube. Este kit es acción.' },
    { q: '¿Y si ya contraté una agencia?', a: 'Perfecto — úsalo para auditarlos. Si hacen bien su trabajo, vas a poder verificarlo con datos. Si no, vas a entender por qué.' },
    { q: '¿Funciona para servicios B2B?', a: 'Sí. El kit está diseñado para negocios con ticket medio-alto (desde $3M COP) y ciclo de venta consultivo.' },
    { q: '¿Puedo pedir devolución?', a: '30 días. Sin formularios, sin llamada de retención, sin preguntas incómodas. Escribes, devolvemos.' },
    { q: '¿Qué sigue después del kit?', a: 'Si ves los huecos y prefieres que los tapemos nosotros, el Sprint de $5M COP instala todo en 14 días. Los $97 se descuentan.' }
  ];
  const [open, setOpen] = useState(0);
  return (
    <section style={{ background: '#111', padding: '120px 32px', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase' }}><span style={{ color: '#179DFF' }}>◼</span>&nbsp;&nbsp;preguntas frecuentes</div>
        <h2 className="sg" style={{ fontSize: 'clamp(32px,4.5vw,56px)', lineHeight: 0.98, margin: '18px 0 48px', textTransform: 'uppercase' }}>Si te lo preguntas, <span style={{ color: '#179DFF' }}>te respondo</span>.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {qs.map((it, i) =>
            <div key={i} className="glass" style={{ borderRadius: 10, padding: '20px 24px', cursor: 'pointer' }} onClick={() => setOpen(open === i ? -1 : i)}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14 }}>
                <div className="sg" style={{ fontSize: 18, textTransform: 'uppercase' }}>{it.q}</div>
                <div style={{ color: '#D51A05', fontSize: 22, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 200ms' }}>+</div>
              </div>
              {open === i && <div className="sub" style={{ fontSize: 19, color: '#bbb', marginTop: 12, fontStyle: 'italic', lineHeight: 1.5, animation: 'fadeUp 300ms ease' }}>{it.a}</div>}
            </div>)}
        </div>
      </div>
    </section>
  );
}

/* ============ PAGE EXPORT ============ */
export default function KitPage() {
  const { track } = useMarketingStack();
  const onCTA = (label) => track('CTA_Click', { label });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero onCTA={onCTA} />
      <Agitacion />
      <Modules onCTA={onCTA} />
      <PricingTransparency />
      <Scorecard />
      <SprintBanner onCTA={onCTA} />
      <Checkout onCTA={onCTA} track={track} />
      <FAQ />
    </>
  );
}
