import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';

/* ── BANT Data ── */
const BOTTLENECKS = [
  {n:'01', t:'Dependencia del voz a voz', subtitle:'Tu crecimiento depende de que alguien te recomiende.', color:'var(--red)',
    diag:'Tu negocio tiene un problema de adquisición. No es que tus clientes no te recomienden — es que no tienes un sistema activo que genere oportunidades de forma predecible.',
    need:'Sistema de Adquisición: mensaje claro, oferta irresistible y canales activos generando leads.',
    items:['Más del 70% de mis clientes nuevos llegan por referidos.','No tengo un canal de adquisición activo (ads, contenido, outbound).','Si mis clientes actuales dejan de recomendarme, mi flujo se seca.','No sé cuántos clientes nuevos voy a tener el próximo mes.','Cuando intento crecer más rápido, no tengo forma de hacerlo predecible.']},
  {n:'02', t:'Leads que no se convierten', subtitle:'Te llegan contactos pero no compran.', color:'var(--blue)',
    diag:'Tu problema no es la cantidad de leads — es la calidad y la calificación.',
    need:'Sistema de Calificación: formularios inteligentes, lead scoring automatizado y filtros.',
    items:['Me llegan leads pero la mayoría no son clientes reales.','Mi equipo pasa demasiado tiempo con prospectos que nunca compran.','No tengo un sistema de calificación que filtre los leads.','Los prospectos llegan fríos — no saben bien qué ofrecemos.','Mi tasa de conversión de lead a cliente es menor al 10%.']},
  {n:'03', t:'Equipo de ventas sin proceso', subtitle:'Tus vendedores improvisan.', color:'var(--blue)',
    diag:'Tienes un problema de cierre. No es que tu equipo sea malo — es que no tienen herramientas ni sistema.',
    need:'Sistema de Cierre: CRM configurado, canal claro, automatizaciones de follow-up.',
    items:['Cada vendedor hace el seguimiento a su manera.','No tengo un CRM configurado o nadie lo usa.','Pierdo prospectos porque nadie les hace seguimiento.','No sé cuántos leads están en cada etapa del proceso.','Si un vendedor se va, se lleva su conocimiento y contactos.']},
  {n:'04', t:'Métricas de vanidad', subtitle:'Mides cosas que no importan.', color:'var(--yellow)',
    diag:'Tienes un problema de visibilidad. Estás volando a ciegas. Sin datos reales, cada decisión es una apuesta.',
    need:'Sistema de Control: dashboard de métricas reales y decisiones basadas en datos.',
    items:['Mido likes o alcance pero no sé cuánto cuesta cada cliente.','No conozco mi costo de adquisición (CAC).','No tengo un dashboard de salud comercial.','Tomo decisiones basadas en intuición.','Me mandan reportes bonitos pero no generan ventas.']},
  {n:'05', t:'Todo depende de ti', subtitle:'Si no estás, el negocio se detiene.', color:'var(--red)',
    diag:'Estás en la Trampa del Fundador. Tu negocio tiene un problema de estructura.',
    need:'Sistema completo: adquisición + calificación + cierre + control conectados.',
    items:['Si no estoy disponible, las ventas se frenan.','Soy el único que puede cerrar clientes importantes.','Mi equipo no puede operar sin preguntarme todo.','No tengo procesos comerciales documentados.','Trabajo más de 10 horas diarias y siento que no escalo.']}
];

const TIERS = [
  {r:[0,7], lvl:'PREPARADO', c:'var(--blue)', qualified: true, t:'Preparado para escalar.', d:'Tu estructura actual es buena, pero faltan sistemas predecibles.'},
  {r:[8,15], lvl:'CON FRENO', c:'var(--yellow)', qualified: true, t:'Cuellos activos. Creces con freno de mano.', d:'Tienes áreas que necesitan estructura urgente.'},
  {r:[16,25], lvl:'CRÍTICO', c:'var(--red)', qualified: false, t:'Estructura en rojo.', d:'Iniciar una escala ahora mismo te traería problemas.'}
];

/* ── Sub-components ── */
function EmailGate({ onContinue, prefill='' }) {
  const [email, setEmail] = useState(prefill);
  const valid = /.+@.+\..+/.test(email);
  return (
    <section className="section-dark" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-red" style={{ top: -100, right: -100, width: 600, height: 600 }} />
      <div className="container grid-responsive-even">
        <div>
          <div className="badge badge-red"><span className="dot" /><span className="sg" style={{ fontWeight: 500, letterSpacing: '.02em' }}>Paso 1 · Tu Email</span></div>
          <h1 className="headline-lg sg" style={{ margin: '24px 0 0' }}><span style={{ color: 'var(--blue)' }}>Alineemos el negocio.</span><br />¿A dónde te enviamos<br />tu diagnóstico?</h1>
          <p className="sub" style={{ fontSize: 'clamp(18px, 4vw, 22px)', color: '#cfcfcf', marginTop: 22, fontStyle: 'italic', maxWidth: 500 }}>
            Al terminar las 25 preguntas, recibes tu resultado exacto y el cuello de botella que debes romper primero.
          </p>
        </div>
        <form onSubmit={e => { e.preventDefault(); if (valid) onContinue(email); }} className="card-dark" style={{ padding: '36px 32px' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--blue)', letterSpacing: '.25em', textTransform: 'uppercase' }}>Ingresa tu email</div>
          <div className="sg" style={{ fontSize: 24, marginTop: 8, lineHeight: 1.2 }}>Para empezar el cuestionario.</div>
          <div style={{ marginTop: 32 }}>
            <div className="input-label">Email de trabajo</div>
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" autoFocus className="input" placeholder="tu@empresa.com" />
          </div>
          <button type="submit" disabled={!valid} className={`btn ${valid ? 'btn-red' : 'btn-ghost'}`} style={{ width: '100%', marginTop: 24, justifyContent: 'center' }}>Continuar al diagnóstico →</button>
          <div className="sub" style={{ fontSize: 13, color: '#666', marginTop: 16, textAlign: 'center', fontStyle: 'italic' }}>Sin spam. Solo valor aplicable.</div>
        </form>
      </div>
    </section>
  );
}

function Intro({ onStart }) {
  return (
    <section className="section-dark" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-blue" style={{ top: -100, right: -100, width: 600, height: 600 }} />
      <div className="container grid-responsive-even">
        <div>
          <div className="badge badge-blue"><span className="dot" /><span className="sg" style={{ fontWeight: 500, letterSpacing: '.02em' }}>Paso 2 · Cuestionario</span></div>
          <h1 className="headline-lg sg" style={{ margin: '24px 0 0' }}>¿Tu negocio está preparado<br />para <span style={{ color: 'var(--blue)' }}>escalar?</span></h1>
          <p className="sub" style={{ fontSize: 'clamp(18px, 4vw, 22px)', color: '#cfcfcf', marginTop: 22, fontStyle: 'italic', maxWidth: 500 }}>
            Sé brutalmente honesto. Un diagnóstico falso genera sistemas que no funcionan.
          </p>
          <button onClick={onStart} className="btn btn-red sg" style={{ marginTop: 32, fontSize: 16, padding: '18px 28px' }}>Empezar las preguntas →</button>
        </div>
        <div className="card-dark" style={{ padding: '36px 32px' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--yellow)', letterSpacing: '.25em', textTransform: 'uppercase' }}>Cómo funciona</div>
          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[['1','Marca cada afirmación verdadera','Las respuestas que duelen son las que más te sirven.'],['2','25 preguntas en total','Divididas en 5 cuellos de botella.'],['3','Recibe tu resultado','Diagnóstico de qué falla y cómo solucionarlo.']].map(([n,t,d]) => (
              <div key={n} style={{ display: 'flex', gap: 16 }}>
                <div className="sg" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(23,157,255,0.12)', color: 'var(--blue)', display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0 }}>{n}</div>
                <div><div className="sg" style={{ fontSize: 18 }}>{t}</div><div className="sub" style={{ fontSize: 15, color: '#999', marginTop: 4, fontStyle: 'italic' }}>{d}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionSection({ b, idx, total, answers, toggle, onNext, onPrev }) {
  const checked = answers.filter(Boolean).length;
  return (
    <section className="section-dark" style={{ minHeight: '90vh', position: 'relative', overflow: 'hidden' }}>
      <div className="container-narrow">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48, paddingTop: 20 }}>
          <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.2em' }}>CUELLO {b.n} / 05</div>
          <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, width: `${((idx + 1) / total) * 100}%`, background: 'var(--red)', transition: 'width 400ms ease' }} />
          </div>
          <div className="mono" style={{ fontSize: 11, color: '#888' }}>{idx + 1}/{total}</div>
        </div>

        <div className="grid-responsive-even" style={{ alignItems: 'start' }}>
          <div className="sticky-desktop">
            <div className="sg" style={{ fontSize: 'clamp(56px,8vw,100px)', color: b.color, lineHeight: 0.9 }}>{b.n}</div>
            <h2 className="headline-md sg" style={{ marginTop: 8 }}>{b.t}</h2>
            <p className="sub" style={{ fontSize: 20, color: '#cfcfcf', marginTop: 14, fontStyle: 'italic' }}>{b.subtitle}</p>
            <div style={{ marginTop: 32, padding: 24, background: '#151515', border: `1px solid ${b.color}40`, borderRadius: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <div className="sg" style={{ fontSize: 54, color: b.color, lineHeight: 1 }}>{checked}</div>
                <div className="mono" style={{ fontSize: 14, color: '#666' }}>/ 5</div>
              </div>
              <div style={{ marginTop: 12, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99 }}>
                <div style={{ height: '100%', width: `${(checked / 5) * 100}%`, background: b.color, transition: 'width 300ms ease', borderRadius: 99 }} />
              </div>
            </div>
            <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
              {idx > 0 && <button onClick={onPrev} className="btn btn-ghost" style={{ padding: 16 }}>←</button>}
              <button onClick={onNext} className="btn" style={{ flex: 1, background: b.color, color: b.color === 'var(--yellow)' ? 'var(--pure-black)' : 'var(--white)' }}>
                {idx === total - 1 ? 'Ver mi resultado →' : 'Siguiente cuello →'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="input-label" style={{ marginBottom: 16 }}>Marca las afirmaciones verdaderas</div>
            {b.items.map((item, i) => {
              const on = answers[i];
              return (
                <label key={i} className={`opt ${on ? 'checked' : ''}`} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: 20, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, animation: `fadeUp 300ms ${i * 60}ms ease both` }}>
                  <input type="checkbox" checked={on} onChange={() => toggle(i)} style={{ display: 'none' }} />
                  <div className="checkbox-box"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6.5L5 9.5L10 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  <div style={{ flex: 1, display: 'flex', gap: 12 }}>
                    <div className="mono" style={{ fontSize: 11, color: '#666', marginTop: 3 }}>{b.n}.{i + 1}</div>
                    <div style={{ fontSize: 16, color: on ? '#fff' : '#cfcfcf', lineHeight: 1.45 }}>{item}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function QualifyForm({ email, onSubmit }) {
  const [form, setForm] = useState({ empresa: '', name: '', empleados: '', ads: 'Si', web: '' });
  const valid = form.empresa.trim() && form.name.trim();
  return (
    <div className="card-dark" style={{ padding: '36px 32px', marginTop: 56, border: '1px solid var(--blue)' }}>
      <div className="badge badge-blue" style={{ marginBottom: 24 }}><span className="dot" /><span className="sg">PASO FINAL PARA AGENDAR</span></div>
      <h3 className="sg headline-md">Tu negocio califica.</h3>
      <p className="sub" style={{ fontSize: 18, color: '#ccc', fontStyle: 'italic', marginBottom: 32 }}>Completa estos datos para que Cris tenga contexto antes de la llamada.</p>
      <form onSubmit={e => { e.preventDefault(); if(valid) onSubmit(form); }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div><div className="input-label">Nombre Completo</div><input className="input" autoFocus value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /></div>
        <div><div className="input-label">Nombre de tu empresa</div><input className="input" value={form.empresa} onChange={e=>setForm({...form,empresa:e.target.value})} /></div>
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}><div className="input-label">No. Empleados</div>
            <select className="input" value={form.empleados} onChange={e=>setForm({...form,empleados:e.target.value})}>
              <option value="">Selecciona...</option><option value="1-5">1 a 5</option><option value="6-15">6 a 15</option><option value="16-50">16 a 50</option><option value="50+">Más de 50</option>
            </select>
          </div>
          <div style={{ flex: 1 }}><div className="input-label">¿Haces Ads?</div>
            <select className="input" value={form.ads} onChange={e=>setForm({...form,ads:e.target.value})}><option value="Si">Sí</option><option value="No">No</option></select>
          </div>
        </div>
        <div><div className="input-label">Página Web / Instagram (Opcional)</div><input className="input" placeholder="adsbigger.com" value={form.web} onChange={e=>setForm({...form,web:e.target.value})} /></div>
        <button type="submit" disabled={!valid} className={`btn ${valid ? 'btn-red' : 'btn-ghost'}`} style={{ width: '100%', justifyContent: 'center', marginTop: 12 }}>Agendar en Calendly →</button>
      </form>
    </div>
  );
}

function Result({ scores, answers, email, onRestart }) {
  const total = scores.reduce((a, b) => a + b, 0);
  const tier = TIERS.find(t => total >= t.r[0] && total <= t.r[1]) || TIERS[0];
  const ranked = scores.map((s, i) => ({ s, i })).sort((a, b) => b.s - a.s);
  const primary = BOTTLENECKS[ranked[0].i];

  /* ── Webhook 1: enviar resumen del diagnóstico al completar ── */
  useEffect(() => {
    const payload = {
      email,
      puntaje_total: total,
      nivel: tier.lvl,
      cuello_principal: primary.t,
      cuello_principal_numero: primary.n,
      cuello_principal_diagnostico: primary.diag,
      cuello_principal_solucion: primary.need,
      califica: tier.qualified,
      detalles_por_cuello: BOTTLENECKS.map((b, i) => ({
        id: b.n,
        nombre: b.t,
        puntaje: scores[i],
        fugas_marcadas: b.items.filter((_, itemIndex) => answers[i][itemIndex])
      })),
      fecha: new Date().toISOString()
    };
    console.log('Final Result Reached - Triggering Summary Webhook...', payload);
    fetch('https://devn8n.adsbigger.cloud/webhook/diagnostico-resultado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => console.log('Summary Webhook Response:', res.status))
    .catch(err => console.error('Diagnostic summary webhook error:', err));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Webhook 2: formulario final → lead que quiere agendar ── */
  const handleQualifySubmit = async (data) => {
    if(window.fbq) window.fbq('track', 'Lead');
    console.log('Submitting Qualify Form...', data);
    try {
      const res = await fetch('https://devn8n.adsbigger.cloud/webhook/diagnostico-agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data, email, puntaje: total, nivel: tier.lvl,
          cuello_principal: primary.t, cuello_principal_numero: primary.n,
          fecha: new Date().toISOString()
        })
      });
      console.log('Qualify Webhook Response:', res.status);
    } catch(err) { console.error('Webhook error:', err); }
    const calendlyUrl = new URL('https://calendly.com/agency-adsbigger/reunion-kick-off');
    calendlyUrl.searchParams.append('name', data.name);
    calendlyUrl.searchParams.append('email', email);
    calendlyUrl.searchParams.append('a1', data.empresa);
    window.location.href = calendlyUrl.toString();
  };

  return (
    <>
      {/* ── Resultado: Score & Nivel ── */}
      <section className="section-dark" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 900, height: 600, background: `radial-gradient(ellipse at center, ${tier.c}20, transparent 60%)`, filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div className="container grid-responsive-even">
          <div>
            <Reveal><div className="mono" style={{ fontSize: 11, color: tier.c, letterSpacing: '.3em', textTransform: 'uppercase' }}>TU RESULTADO</div></Reveal>
            <Reveal delay={100}><h1 className="sg headline-xl" style={{ margin: '20px 0 0', textWrap: 'balance' }}>{tier.t}</h1></Reveal>
            <Reveal delay={200}><p className="sub" style={{ fontSize: 22, color: '#cfcfcf', marginTop: 24, fontStyle: 'italic', maxWidth: 560 }}>{tier.d}</p></Reveal>
          </div>
          <Reveal delay={300}>
            <div style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 12, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase' }}>Fugas detectadas</div>
              <div className="sg" style={{ fontSize: 'clamp(100px,14vw,180px)', color: tier.c, lineHeight: 0.9, marginTop: 12 }}>{total}</div>
              <div className="mono" style={{ fontSize: 16, color: '#666' }}>de 25</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Desglose por cuello de botella ── */}
      <section className="section-dark" style={{ borderTop: 'var(--border-subtle)', paddingTop: 64, paddingBottom: 64 }}>
        <div className="container-narrow">
          <Reveal><div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase', marginBottom: 28 }}>DESGLOSE POR CUELLO DE BOTELLA</div></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {BOTTLENECKS.map((b, i) => {
              const isPrimary = ranked[0].i === i;
              return (
                <Reveal key={b.n} delay={i * 80}>
                  <div style={{ padding: '24px 20px', background: isPrimary ? 'rgba(213,26,5,0.12)' : '#151515', border: isPrimary ? '1px solid var(--red)' : 'var(--border-light)', borderRadius: 12, position: 'relative', overflow: 'hidden', height: '100%' }}>
                    {isPrimary && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--red)' }} />}
                    <div className="mono" style={{ fontSize: 10, color: b.color, letterSpacing: '.15em' }}>{b.n}</div>
                    <div className="sg" style={{ fontSize: 16, fontWeight: 700, marginTop: 6 }}>{b.t}</div>
                    <div className="sg" style={{ fontSize: 36, fontWeight: 700, color: b.color, marginTop: 12, lineHeight: 1 }}>{scores[i]}<span style={{ fontSize: 14, color: '#666' }}>/5</span></div>
                    {isPrimary && <div className="mono" style={{ fontSize: 9, color: 'var(--red)', letterSpacing: '.15em', marginTop: 8, textTransform: 'uppercase' }}>▸ Cuello principal</div>}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Cuello Principal Detectado + Formulario ── */}
      <section className="section-light">
        <div className="container-narrow">
          <Reveal><div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase' }}>CUELLO PRINCIPAL DETECTADO:</div></Reveal>
          <Reveal delay={100}>
            <div style={{ background: 'var(--pure-black)', color: 'var(--white)', borderRadius: 14, padding: 48, position: 'relative', overflow: 'hidden', marginTop: 24 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: primary.color }} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <div className="sg" style={{ fontSize: 56, color: primary.color, lineHeight: 1 }}>{primary.n}</div>
                <div className="sg headline-md">{primary.t}</div>
              </div>
              <div style={{ marginTop: 28 }}>
                <div className="input-label">Diagnóstico</div>
                <p className="sub" style={{ fontSize: 20, fontStyle: 'italic', color: '#e0e0e0', marginTop: 12, lineHeight: 1.5 }}>{primary.diag}</p>
              </div>
              <div style={{ marginTop: 32, padding: 24, background: 'rgba(23,157,255,0.08)', border: '1px solid rgba(23,157,255,0.3)', borderRadius: 10 }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--blue)', letterSpacing: '.2em', textTransform: 'uppercase' }}>Lo que necesitas instalar</div>
                <div style={{ fontSize: 16, color: '#cfe7ff', marginTop: 10, lineHeight: 1.5 }}>{primary.need}</div>
              </div>
            </div>
          </Reveal>

          {tier.qualified ? (
            <QualifyForm email={email} onSubmit={handleQualifySubmit} />
          ) : (
            <div className="card-white" style={{ padding: 40, marginTop: 56, textAlign: 'center' }}>
              <h3 className="sg headline-md" style={{ color: 'var(--red)' }}>Tu estructura necesita un reset.</h3>
              <p className="sub" style={{ fontSize: 18, color: '#555', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
                Con un puntaje Crítico, iniciar una escala ahora te traería problemas. Empieza por leer los 5 cuellos de botella.
              </p>
              <Link to="/cuellos-de-botella" className="btn btn-red sg" style={{ marginTop: 24 }}>Descargar PDF Gratuito →</Link>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <button onClick={onRestart} style={{ padding: '12px 24px', fontSize: 13, border: 'none', background: 'transparent', textDecoration: 'underline', color: '#666', cursor: 'pointer' }}>↻ Hacer el diagnóstico de nuevo</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Diagnostico Page ── */
export default function DiagnosticoPage() {
  const [stage, setStage] = useState('email');
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState(BOTTLENECKS.map(() => Array(5).fill(false)));
  const [email, setEmail] = useState('');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('adsb_bant') || 'null');
      if (saved) {
        if (saved.email) setEmail(saved.email);
        if (saved.stage) setStage(saved.stage);
        if (typeof saved.idx === 'number') setIdx(saved.idx);
        if (Array.isArray(saved.answers)) setAnswers(saved.answers);
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('adsb_bant', JSON.stringify({ stage, idx, answers, email }));
  }, [stage, idx, answers, email]);

  const toggle = (i) => setAnswers(a => { const n = a.map(r => [...r]); n[idx][i] = !n[idx][i]; return n; });
  const next = () => { if (idx < BOTTLENECKS.length - 1) { setIdx(idx + 1); window.scrollTo(0, 0); } else { setStage('result'); window.scrollTo(0, 0); } };
  const prev = () => { if (idx > 0) { setIdx(idx - 1); window.scrollTo(0, 0); } };
  const startQs = () => { setStage('q'); setIdx(0); window.scrollTo(0, 0); };
  const onEmail = (e) => { setEmail(e); setStage('intro'); window.scrollTo(0, 0); };
  const restart = () => { setAnswers(BOTTLENECKS.map(() => Array(5).fill(false))); setStage('email'); setIdx(0); setEmail(''); localStorage.removeItem('adsb_bant'); window.scrollTo(0, 0); };

  return (
    <>
      {stage === 'email' && <EmailGate onContinue={onEmail} prefill={email} />}
      {stage === 'intro' && <Intro onStart={startQs} />}
      {stage === 'q' && <QuestionSection b={BOTTLENECKS[idx]} idx={idx} total={BOTTLENECKS.length} answers={answers[idx]} toggle={toggle} onNext={next} onPrev={prev} />}
      {stage === 'result' && <Result scores={answers.map(r => r.filter(Boolean).length)} answers={answers} email={email} onRestart={restart} />}
    </>
  );
}
