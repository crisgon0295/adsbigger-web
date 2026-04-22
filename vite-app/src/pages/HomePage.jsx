import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInView, useCounter } from '../hooks';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';

/* ── Hero ── */
function HeroPanel() {
  const [lineIdx, setLineIdx] = useState(0);
  const lines = [
    { t: 'init', c: '→ cargando sistema ADSBIGGER™' },
    { t: 'ok', c: '✓ capa 01 · adquisición    — conectada' },
    { t: 'ok', c: '✓ capa 02 · calificación   — conectada' },
    { t: 'ok', c: '✓ capa 03 · cierre         — conectada' },
    { t: 'ok', c: '✓ capa 04 · control        — conectada' },
    { t: 'data', c: '⌁ pipeline.semana = 14 leads calificados' },
    { t: 'data', c: '⌁ ROAS = 4.8x · CPL = $48k COP' },
    { t: 'cta', c: '▶ agendar_diagnostico()' }
  ];

  useEffect(() => {
    const id = setInterval(() => setLineIdx((i) => (i + 1) % lines.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <div className="card-dark" style={{ minHeight: 440, boxShadow: 'var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.04)' }}>
        <div style={{ padding: '14px 16px', borderBottom: 'var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: 99, background: 'var(--red)', opacity: .8 }} />
          <div style={{ width: 10, height: 10, borderRadius: 99, background: 'var(--yellow)', opacity: .7 }} />
          <div style={{ width: 10, height: 10, borderRadius: 99, background: 'var(--blue)', opacity: .8 }} />
          <div className="mono" style={{ fontSize: 11, color: '#666', marginLeft: 12 }}>sistema ~ status</div>
          <div style={{ flex: 1 }} />
          <div className="mono" style={{ fontSize: 10, color: '#888', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: '#20D07A', boxShadow: '0 0 6px #20D07A' }} />
            LIVE · 90d
          </div>
        </div>

        <div className="mono" style={{ padding: '22px 20px', fontSize: 'clamp(11px, 2vw, 13px)', lineHeight: 1.9, color: '#d6d6d6', minHeight: 280, overflowX: 'auto' }}>
          {lines.slice(0, lineIdx + 1).map((ln, i) => {
            const color = ln.t === 'ok' ? 'var(--blue)' : ln.t === 'data' ? 'var(--yellow)' : ln.t === 'cta' ? 'var(--red)' : '#888';
            return <div key={i} style={{ animation: 'fadeDown 400ms ease both', color, opacity: i === lineIdx ? 1 : 0.5, whiteSpace: 'nowrap' }}>
              <span style={{ color: '#666', marginRight: 10 }}>0{i + 1}</span>{ln.c}
            </div>;
          })}
          <span style={{ display: 'inline-block', width: 8, height: 14, background: 'var(--blue)', verticalAlign: 'middle', animation: 'blink 1s steps(1) infinite', marginLeft: 2 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: 'var(--border-subtle)' }}>
          {[['Leads/sem', '14', 'var(--blue)'], ['ROAS', '4.8×', 'var(--white)'], ['CPL', '$48k', 'var(--yellow)']].map(([l, v, c], i) => (
            <div key={i} style={{ padding: '18px 10px', borderRight: i < 2 ? 'var(--border-subtle)' : 'none', textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 9, color: '#666', letterSpacing: '.1em', textTransform: 'uppercase' }}>{l}</div>
              <div className="sg" style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 700, color: c, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="section-dark" style={{ position: 'relative', overflow: 'hidden', paddingBottom: '120px' }}>
      <div className="glow-deep" style={{ top: -160, left: '50%', transform: 'translateX(-50%)', width: 900, height: 520 }} />
      <div className="glow-blue" style={{ bottom: -220, right: -160, width: 620, height: 620 }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center', position: 'relative' }}>
        <div>
          <div className="badge badge-blue" style={{ animation: 'fadeIn 600ms ease both' }}>
            <span className="dot" />
            <span className="sg" style={{ fontWeight: 500, letterSpacing: '.02em' }}>Solo 2 empresas por trimestre</span>
          </div>

          <h1 className="headline-xl sg" style={{ margin: '28px 0 0' }}>
            <span style={{ display: 'block', animation: 'fadeUp 700ms 120ms ease both', opacity: 0 }}>INSTALAMOS EL SISTEMA</span>
            <span style={{ display: 'block', animation: 'fadeUp 700ms 240ms ease both', opacity: 0 }}>QUE TE TRAE CLIENTES</span>
            <span style={{ display: 'block', animation: 'fadeUp 700ms 360ms ease both', opacity: 0, color: 'var(--blue)' }}>CALIFICADOS CADA SEMANA.</span>
          </h1>

          <p className="sub" style={{ marginTop: 24, fontSize: 'clamp(18px, 4vw, 22px)', lineHeight: 1.55, color: '#b8b8b8', maxWidth: 540, animation: 'fadeUp 700ms 520ms ease both', opacity: 0 }}>
            — o trabajamos gratis hasta lograrlo. No somos agencia. <span style={{ color: '#fff' }}>Instalamos activos</span> de adquisición y cierre en empresas que ya venden pero no escalan.<br/><br/><span style={{ color: '#fff' }}>Para empresas B2B con facturación &gt;$50M COP/mes</span> que quieren pasar de depender del voz a voz a tener pipeline predecible.
          </p>

          <div className="btn-group" style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap', animation: 'fadeUp 700ms 680ms ease both', opacity: 0 }}>
            <Link to="/diagnostico" className="btn btn-red sg">
              Ver si calificas
              <span style={{ fontSize: 16, transform: 'translateY(-1px)' }}>→</span>
            </Link>
            <Link to="/cuellos-de-botella" className="btn btn-blue sg">
              Ver PDF y Cuellos
            </Link>
          </div>

          <div style={{ marginTop: 36, display: 'flex', alignItems: 'center', gap: 18, animation: 'fadeUp 700ms 820ms ease both', opacity: 0 }}>
            <div style={{ width: 44, height: 1, background: 'rgba(255,255,255,0.18)' }} />
            <div className="sub" style={{ fontSize: 16, color: '#888', letterSpacing: '.02em' }}>
              <span style={{ color: 'var(--blue)', fontWeight: 600 }}>+230M COP extras al mes </span> documentados · <span className="mono" style={{ fontSize: 13, color: '#bbb' }}>ferriperfiles.com</span>
            </div>
          </div>
        </div>

        <HeroPanel />
      </div>
    </section>
  );
}

/* ── Problema ── */
function Problema() {
  const bullets = [
    { k: '01', t: 'Tu pipeline depende de ti.', b: 'Si te desconectas una semana, las ventas se caen. Eso no es un negocio. Es un trabajo con empleados.' },
    { k: '02', t: 'Pagaste agencia. Sin resultados.', b: 'Entregaron reportes de likes y alcance. Cero clientes cerrados documentados. Volviste al punto cero.' },
    { k: '03', t: 'Tu equipo no tiene proceso.', b: 'Cada vendedor improvisa. Los leads buenos se queman. Los malos consumen tu tiempo.' },
    { k: '04', t: 'No puedes predecir el mes que viene.', b: 'No sabes cuántos clientes vas a cerrar. Y sin eso, no puedes contratar, ni facturar con calma.' }
  ];

  return (
    <section id="problema" className="section-light">
      <div className="container-narrow">
        <Reveal><div className="section-label"><span className="dot-red">◼</span> &nbsp;01 · el problema real</div></Reveal>
        <Reveal delay={80}>
          <h2 className="headline-lg sg" style={{ margin: '18px 0 0', maxWidth: 900 }}>
            TU NEGOCIO NO NECESITA <span style={{ color: 'var(--red)' }}>MÁS ADS</span>.<br />
            NECESITA <span style={{ textDecoration: 'underline', textDecorationColor: 'var(--blue)', textDecorationThickness: 6, textUnderlineOffset: 12 }}>ESTRUCTURA</span>.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="sub" style={{ fontSize: 'clamp(18px, 4vw, 20px)', lineHeight: 1.6, color: '#3a3a3a', maxWidth: 680, marginTop: 28 }}>
            Escuchamos la misma historia en cada diagnóstico. Cambian los sectores, los tickets y los países. No cambia el patrón:
          </p>
        </Reveal>
        <div className="card-white" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 1, background: '#D9D9D9' }}>
          {bullets.map((bl, i) => (
            <Reveal key={bl.k} delay={i * 80}>
              <div style={{ background: '#fff', padding: '32px 28px', height: '100%' }}>
                <div className="sg" style={{ fontSize: 12, color: 'var(--red)', fontWeight: 700, letterSpacing: '.2em' }}>{bl.k}</div>
                <div className="sg" style={{ fontSize: 22, fontWeight: 700, marginTop: 10, lineHeight: 1.15 }}>{bl.t}</div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: '#555', marginTop: 12 }}>{bl.b}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div style={{ marginTop: 56, padding: '36px 40px', background: 'var(--pure-black)', color: 'var(--white)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            <div className="sg" style={{ fontSize: 48, fontWeight: 700, color: 'var(--yellow)', lineHeight: 1 }}>"</div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div className="sub" style={{ fontSize: 24, fontStyle: 'italic', fontWeight: 500, lineHeight: 1.35, color: 'var(--yellow)' }}>
                El problema no son los ads. Es que no tienes un sistema. Esto es lo que instalamos.
              </div>
              <div className="mono" style={{ fontSize: 12, color: '#888', marginTop: 12, letterSpacing: '.04em' }}>— Cris · adsBigger</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Sistema ── */
function Sistema() {
  const capas = [
    { k: 'A', n: '01', t: 'ADQUISICIÓN', s: 'Tráfico controlado.', b: 'Ads pagos + orgánico instalado sobre una oferta irresistible.', items: ['Oferta probada', 'Paid media', 'Orgánico estructural'] },
    { k: 'B', n: '02', t: 'CALIFICACIÓN', s: 'Filtro automático.', b: 'Formularios, bots y scripts que filtran. Solo leads con presupuesto y timing.', items: ['BANT automatizado', 'Scoring', 'Descarte inmediato'] },
    { k: 'C', n: '03', t: 'CIERRE', s: 'Proceso replicable.', b: 'Guión de ventas, objeciones mapeadas y seguimiento en CRM.', items: ['Playbook de ventas', 'CRM instalado', 'Follow-up automático'] },
    { k: 'D', n: '04', t: 'CONTROL', s: 'Dashboard vivo.', b: 'CPL, ROAS, clientes cerrados — en un dashboard que el dueño lee en 2 min.', items: ['KPIs reales', 'Dashboard 24/7', 'Revisión semanal'] }
  ];
  const [active, setActive] = useState(0);

  return (
    <section id="sistema" className="section-dark" style={{ borderTop: 'var(--border-subtle)', borderBottom: 'var(--border-subtle)' }}>
      <div className="container-narrow">
        <Reveal><div className="section-label"><span className="dot-blue">◼</span> &nbsp;02 · el mecanismo</div></Reveal>
        <Reveal delay={80}>
          <h2 className="headline-lg sg" style={{ margin: '18px 0 0', maxWidth: 980 }}>
            EL SISTEMA <span style={{ color: 'var(--blue)' }}>ADSBIGGER™</span>.<br />4 CAPAS INSTALADAS EN 90 DÍAS.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="sub" style={{ fontSize: 'clamp(18px,4vw,20px)', lineHeight: 1.6, color: '#b8b8b8', maxWidth: 680, marginTop: 24 }}>
            No es una campaña. Es una arquitectura que queda <span style={{ color: '#fff' }}>instalada en tu empresa</span> y sigue funcionando cuando nos vamos.
          </p>
        </Reveal>

        <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {capas.map((c, i) => {
              const isActive = i === active;
              return (
                <Reveal key={c.n} delay={i * 80}>
                  <button onClick={() => setActive(i)} style={{
                    width: '100%', textAlign: 'left', cursor: 'pointer',
                    background: isActive ? 'var(--charcoal)' : '#151515',
                    border: isActive ? '1px solid var(--blue)' : 'var(--border-light)',
                    borderRadius: 12, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 20,
                    transition: 'all var(--duration-normal) ease', position: 'relative', overflow: 'hidden'
                  }}>
                    {isActive && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--blue)' }} />}
                    <div className="sg" style={{
                      width: 54, height: 54, display: 'grid', placeItems: 'center', flexShrink: 0,
                      background: isActive ? 'var(--blue)' : 'rgba(23,157,255,0.1)',
                      color: isActive ? 'var(--pure-black)' : 'var(--blue)',
                      borderRadius: 10, fontSize: 22, fontWeight: 700, transition: 'all var(--duration-normal) ease'
                    }}>{c.k}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="mono" style={{ fontSize: 10, color: '#888', letterSpacing: '.2em' }}>{c.n}</div>
                        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                      </div>
                      <div className="sg" style={{ fontSize: 20, fontWeight: 700, marginTop: 6, color: '#fff' }}>{c.t}</div>
                      <div className="sub" style={{ fontSize: 16, color: '#888', marginTop: 4 }}>{c.s}</div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div style={{ position: 'sticky', top: 100 }}>
            <Reveal>
              <div className="card-dark">
                <div style={{ padding: '28px 28px 20px', borderBottom: 'var(--border-subtle)' }}>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--blue)', letterSpacing: '.25em' }}>CAPA {capas[active].n}</div>
                  <div className="sg" style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>{capas[active].t}</div>
                  <div style={{ fontSize: 15, color: '#b8b8b8', marginTop: 8 }}>{capas[active].b}</div>
                </div>
                <div style={{ padding: '22px 28px' }}>
                  <div className="mono" style={{ fontSize: 10, color: '#666', letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 12 }}>Qué queda instalado</div>
                  {capas[active].items.map((it, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 2 ? '1px dashed rgba(255,255,255,0.06)' : 'none' }}>
                      <div style={{ width: 16, height: 16, display: 'grid', placeItems: 'center', background: 'rgba(23,157,255,0.15)', borderRadius: 4, color: 'var(--blue)', fontSize: 11 }}>✓</div>
                      <div style={{ fontSize: 15, color: '#e0e0e0' }}>{it}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ marginTop: 20, padding: '18px 22px', background: 'rgba(213,26,5,0.08)', border: '1px solid rgba(213,26,5,0.35)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div className="sg" style={{ fontSize: 12, fontWeight: 700, color: 'var(--red)', letterSpacing: '.15em', textTransform: 'uppercase' }}>Nota</div>
                <div className="sub" style={{ fontSize: 16, color: '#e8e8e8' }}>Esto es un activo, no un servicio. Se queda en tu empresa.</div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Caso ── */
function Caso() {
  const [ref, visible] = useInView(0.25);
  const n1 = useCounter(230, visible, 1800);
  const n2 = useCounter(4.8, visible, 1800);
  const n3 = useCounter(48, visible, 1800);
  const n4 = useCounter(14, visible, 1600);

  return (
    <section id="casos" ref={ref} className="section-light">
      <div className="container-narrow">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 40, alignItems: 'end' }}>
          <div>
            <Reveal><div className="section-label"><span className="dot-blue">◼</span> &nbsp;03 · caso ancla</div></Reveal>
            <Reveal delay={80}>
              <h2 className="headline-lg sg" style={{ margin: '18px 0 0' }}>
                FERRIPERFILES<br /><span style={{ color: 'var(--blue)' }}>INSTALÓ EL SISTEMA.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="sub" style={{ fontSize: 'clamp(18px, 4vw, 20px)', lineHeight: 1.6, color: '#3a3a3a', maxWidth: 520 }}>
              Distribuidor de Hierro y Acero para empresas Fabricantes. Dependían del voz a voz. En 90 días instalamos las 4 capas. Números documentados, no vanidad.
            </p>
          </Reveal>
        </div>

        <div className="card-white" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0 }}>
          {[
            { v: `+${Math.round(n1)}M`, l: 'COP documentados', c: 'var(--blue)', sub: 'en resultados atribuibles' },
            { v: `${n2.toFixed(1)}×`, l: 'ROAS promedio', c: 'var(--pure-black)', sub: 'trimestre 1 post-instalación' },
            { v: `$${Math.round(n3)}k`, l: 'CPL calificado', c: 'var(--pure-black)', sub: 'bajó un 62% vs. baseline' },
            { v: `${Math.round(n4)}/sem`, l: 'Leads calificados', c: 'var(--red)', sub: 'consistentes, desde semana 6' }
          ].map((m, i) => (
            <div key={i} style={{ padding: '36px 28px', borderRight: '1px solid #E8E8E8', borderBottom: '1px solid #E8E8E8', minHeight: 180 }}>
              <div className="sg" style={{ fontSize: 'clamp(44px, 6vw, 56px)', fontWeight: 700, color: m.c, lineHeight: 1 }}>{m.v}</div>
              <div className="sg" style={{ fontSize: 16, color: 'var(--pure-black)', marginTop: 14, fontWeight: 600 }}>{m.l}</div>
              <div style={{ fontSize: 13, color: '#777', marginTop: 4, lineHeight: 1.45 }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Proceso ── */
function Proceso() {
  const steps = [
    { n: '01', rng: 'Día 1–7', t: 'Diagnóstico cerrado', b: 'BANT real. Auditoría de oferta, pipeline actual y procesos.' },
    { n: '02', rng: 'Día 8–30', t: 'Capa Adquisición', b: 'Oferta + creativos + paid media instalados.' },
    { n: '03', rng: 'Día 31–55', t: 'Capa Calificación', b: 'Formularios, scoring y descarte automático.' },
    { n: '04', rng: 'Día 56–80', t: 'Capa Cierre', b: 'Playbook, CRM y seguimientos instalados.' },
    { n: '05', rng: 'Día 81–90', t: 'Control + handover', b: 'Dashboard vivo. Sistema entregado.' }
  ];

  return (
    <section id="proceso" className="section-dark">
      <div className="container-narrow">
        <Reveal><div className="section-label"><span className="dot-blue">◼</span> &nbsp;04 · cómo se instala</div></Reveal>
        <Reveal delay={80}>
          <h2 className="headline-lg sg" style={{ margin: '18px 0 0', maxWidth: 1000 }}>
            90 DÍAS. <span style={{ color: 'var(--blue)' }}>5 ENTREGABLES</span>.<br />CERO REPORTES DE VANIDAD.
          </h2>
        </Reveal>
        <div style={{ position: 'relative', marginTop: 72 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 100}>
                <div style={{ background: '#1a1a1a', border: 'var(--border-light)', borderRadius: 12, padding: 20, position: 'relative', minHeight: 240 }}>
                  <div style={{ position: 'absolute', top: -14, left: 20, width: 40, height: 40, borderRadius: 99, background: 'var(--pure-black)', border: '2px solid var(--blue)', display: 'grid', placeItems: 'center', color: 'var(--blue)', fontFamily: 'var(--font-headline)', fontWeight: 700, fontSize: 14, boxShadow: '0 0 0 4px var(--obsidian)' }}>{s.n}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--blue)', letterSpacing: '.15em', marginTop: 32 }}>{s.rng}</div>
                  <div className="sg" style={{ fontSize: 20, fontWeight: 700, marginTop: 8 }}>{s.t}</div>
                  <div style={{ fontSize: 14, color: '#9b9b9b', marginTop: 10, lineHeight: 1.5 }}>{s.b}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Garantía ── */
function Garantia() {
  return (
    <section id="garantia" className="section-red">
      <div className="container-narrow" style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 56, alignItems: 'center' }}>
          <div>
            <Reveal><div className="mono" style={{ fontSize: 11, letterSpacing: '.25em', textTransform: 'uppercase', opacity: .75 }}>◼ &nbsp;05 · la garantía</div></Reveal>
            <Reveal delay={80}>
              <h2 className="headline-lg sg" style={{ margin: '20px 0 0' }}>
                CLIENTES CALIFICADOS<br />CADA SEMANA —<br />
                <span style={{ background: 'var(--pure-black)', color: 'var(--yellow)', padding: '0 12px', display: 'inline-block', marginTop: 8 }}>O TRABAJAMOS GRATIS.</span>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="sub" style={{ fontSize: 'clamp(18px,4vw,20px)', lineHeight: 1.55, marginTop: 28, maxWidth: 560 }}>
                No es una promesa de marketing. Es la cláusula que firmamos. Si pasada la semana 6 no hay leads calificados entrando, seguimos instalando sin cobrar un peso más.
              </p>
            </Reveal>
          </div>
          <Reveal delay={220}>
            <div style={{ background: 'var(--pure-black)', borderRadius: 14, padding: 32, border: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="sg" style={{ fontSize: 11, letterSpacing: '.25em', color: 'var(--yellow)', fontWeight: 700, textTransform: 'uppercase' }}>Cláusula · §04</div>
              <div className="sg" style={{ fontSize: 22, fontWeight: 700, marginTop: 14, lineHeight: 1.3 }}>
                Si tras 42 días no hay pipeline calificado semanal, adsBigger continúa la instalación sin facturación hasta el hito.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── CTA Final ── */
function CTAFinal() {
  return (
    <section id="cta" style={{ background: 'var(--pure-black)', padding: '140px var(--padding-x) 120px', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blue" style={{ top: '-20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 500 }} />
      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
        <Reveal><div className="mono" style={{ fontSize: 11, color: 'var(--blue)', letterSpacing: '.3em', textTransform: 'uppercase' }}>· 06 · siguiente paso ·</div></Reveal>
        <Reveal delay={80}>
          <h2 className="headline-xl sg" style={{ margin: '24px 0 0' }}>
            DIAGNÓSTICO<br /><span style={{ color: 'var(--blue)' }}>EN 45 MINUTOS.</span>
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p className="sub" style={{ fontSize: 'clamp(18px,4vw,20px)', lineHeight: 1.55, color: '#b8b8b8', marginTop: 24, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
            Sin pitch. Revisamos tu oferta, tu pipeline actual y qué capa del sistema te falta.
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="btn-group" style={{ marginTop: 44, display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/diagnostico" className="btn btn-red sg">Ver si calificas →</Link>
            <Link to="/cuellos-de-botella" className="btn btn-ghost sg">Descargar 5 cuellos (PDF)</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Home Page ── */
export default function HomePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <>
      <Hero />
      <Marquee />
      <Problema />
      <Sistema />
      <Caso />
      <Proceso />
      <Garantia />
      <CTAFinal />
    </>
  );
}
