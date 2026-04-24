import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

/* ── Hero ── */
function LeadHero({ onDownloadClick }) {
  return (
    <section className="section-dark" style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
      <div className="glow-red" style={{ top: -100, right: -100, width: 800, height: 600 }} />
      <div className="container grid-responsive">
        <div>
          <div className="badge badge-red"><span className="dot" /><span className="sg" style={{ fontWeight: 500, letterSpacing: '.02em' }}>Recurso Gratuito · PDF</span></div>
          <h1 className="headline-lg sg" style={{ margin: '24px 0 0' }}>El diagnóstico<br />de los <span style={{ color: 'var(--red)' }}>5 cuellos</span><br />de botella.</h1>
          <p className="sub" style={{ fontSize: 'clamp(18px, 4vw, 22px)', color: '#cfcfcf', marginTop: 22, fontStyle: 'italic', maxWidth: 500 }}>
            En menos de 10 minutos, descubre cuál es la fuga de crecimiento que está frenando a tu negocio.
          </p>
          <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['Evalúa tu estructura con preguntas sí / no', 'Obtén tu nivel de "Preparación para Escalar"', 'Identifica tu mayor fuga de crecimiento'].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 16, color: '#e0e0e0' }}>
                <div style={{ width: 22, height: 22, display: 'grid', placeItems: 'center', background: 'rgba(23,157,255,0.12)', borderRadius: 5, color: '#179DFF', fontSize: 13, flexShrink: 0 }}>✓</div>
                {t}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 48, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button onClick={onDownloadClick} className="btn btn-red sg" style={{ fontSize: 16, padding: '18px 28px' }}>Descarga el diagnóstico →</button>
            <Link to="/diagnostico" className="btn btn-ghost sg" style={{ fontSize: 16, padding: '16px 24px' }}>O hazlo online</Link>
          </div>
          <div className="mono" style={{ marginTop: 24, fontSize: 11, color: '#888' }}>8 PÁGINAS · PDF · SIN SPAM · DIRECTO AL GRANO</div>
        </div>

        {/* 3D PDF Preview */}
        <div style={{ position: 'relative', perspective: '1800px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ transform: 'rotateY(-8deg) rotateX(4deg)', transformStyle: 'preserve-3d', transition: 'transform var(--duration-normal) ease', maxWidth: 420, width: '100%' }}>
            <div style={{ background: '#fff', color: 'var(--pure-black)', borderRadius: 6, padding: '48px 40px', boxShadow: '0 40px 80px rgba(0,0,0,.6), 0 10px 30px rgba(213,26,5,.15)', minHeight: 540, position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <img src="/logo-icon-black.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
                <span className="mono" style={{ fontSize: 10, color: '#888', letterSpacing: '.15em' }}>ADSBIGGER™ · BOGOTÁ</span>
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--red)', letterSpacing: '.25em' }}>RECURSO GRATUITO</div>
              <div className="sg" style={{ fontSize: 36, lineHeight: 1, marginTop: 10 }}>EL DIAGNÓSTICO DE LOS<br /><span style={{ color: 'var(--red)' }}>5 CUELLOS</span> DE BOTELLA</div>
              <p className="sub" style={{ fontSize: 17, fontStyle: 'italic', color: '#444', marginTop: 16, lineHeight: 1.4 }}>Que impiden que tu negocio escale.</p>
              <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {['Dependencia del voz a voz', 'Leads que no se convierten', 'Equipo de ventas sin proceso', 'Métricas de vanidad', 'Todo depende del fundador'].map((t, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < 4 ? '1px dashed #E0E0E0' : 'none' }}>
                    <div className="sg" style={{ fontSize: 18, color: 'var(--red)', width: 28 }}>0{i + 1}</div>
                    <div style={{ fontSize: 14, color: 'var(--pure-black)' }}>{t}</div>
                  </div>
                ))}
              </div>
              <div style={{ position: 'absolute', bottom: 24, right: 30 }} className="mono"><span style={{ fontSize: 10, color: '#888' }}>adsbigger.com · Pág. 1 / 8</span></div>
            </div>
          </div>
          <div className="sg" style={{ position: 'absolute', top: -18, left: 10, background: 'var(--yellow)', color: 'var(--pure-black)', padding: '6px 14px', borderRadius: 4, fontSize: 13, letterSpacing: '.15em', boxShadow: '0 8px 24px rgba(245,197,24,.35)', transform: 'rotate(-6deg)' }}>GRATUITO</div>
        </div>
      </div>
    </section>
  );
}

/* ── Cuellos ── */
function Cuellos() {
  const items = [
    { n: '01', t: 'Dependencia del voz a voz', d: 'Tu crecimiento depende de que alguien te recomiende.', color: 'var(--red)' },
    { n: '02', t: 'Leads que no se convierten', d: 'Te llegan contactos pero no compran.', color: 'var(--blue)' },
    { n: '03', t: 'Equipo sin proceso', d: 'Tus vendedores improvisan en vez de seguir un sistema.', color: 'var(--blue)' },
    { n: '04', t: 'Métricas de vanidad', d: 'Mides lo que no importa y no ves lo que sí.', color: 'var(--yellow)' },
    { n: '05', t: 'Trampa del fundador', d: 'Si no estás tú, el negocio se detiene.', color: 'var(--red)' }
  ];
  return (
    <section className="section-light">
      <div className="container-narrow">
        <div className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.25em', textTransform: 'uppercase' }}><span style={{ color: 'var(--red)' }}>◼</span>&nbsp;&nbsp;los 5 cuellos · qué vas a encontrar</div>
        <h2 className="headline-md sg" style={{ margin: '18px 0 0', maxWidth: 900 }}>El 95% de los negocios que no escalan tienen uno o más de estos <span style={{ color: 'var(--red)' }}>5 cuellos.</span></h2>
        <p className="sub" style={{ fontSize: 20, color: '#3a3a3a', marginTop: 22, maxWidth: 680, fontStyle: 'italic' }}>El problema no es tu producto ni tu equipo. El problema es la falta de estructura.</p>
        <div className="card-white" style={{ marginTop: 56, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: '#D9D9D9' }}>
          {items.map((it, i) => (
            <div key={i} style={{ background: '#fff', padding: '36px 32px' }}>
              <div className="sg" style={{ fontSize: 44, color: it.color, lineHeight: 1 }}>{it.n}</div>
              <div className="sg" style={{ fontSize: 22, lineHeight: 1.15, marginTop: 14 }}>{it.t}</div>
              <div className="sub" style={{ fontSize: 17, color: '#555', marginTop: 8, fontStyle: 'italic' }}>{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Email Modal ── */
function EmailModal({ open, onClose }) {
  const [form, setForm] = useState({ nombre: '', email: '' });
  const [sent, setSent] = useState(false);
  const valid = form.nombre.trim() && /.+@.+\..+/.test(form.email);
  if (!open) return null;

  return (
    <div onClick={onClose} className="modal-overlay">
      <div onClick={e => e.stopPropagation()} className="modal-content">
        <button onClick={onClose} className="modal-close">×</button>
        {!sent ? (
          <>
            <div className="mono" style={{ fontSize: 11, color: 'var(--red)', letterSpacing: '.25em', textTransform: 'uppercase' }}>descarga gratuita</div>
            <div className="sg" style={{ fontSize: 34, lineHeight: 1.05, marginTop: 10 }}>¿A qué correo te lo enviamos?</div>
            <p className="sub" style={{ fontSize: 17, color: '#b8b8b8', marginTop: 12, fontStyle: 'italic' }}>Llega en 2 minutos. Sin spam.</p>
            <form onSubmit={async e => {
              e.preventDefault();
              if (valid) {
                setSent(true);
                if (window.fbq) window.fbq('track', 'Lead');
                try {
                  console.log('Sending lead magnet webhook...', form);
                  await fetch('https://devn8n.adsbigger.cloud/webhook/adsbigger-lead-magnet', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                  });
                } catch(err) {
                  console.error('Lead magnet webhook error:', err);
                }
              }
            }} style={{marginTop:28,display:'flex',flexDirection:'column',gap:16}}>
              <div><div className="input-label">Tu nombre</div><input value={form.nombre} onChange={e => setForm({...form,nombre:e.target.value})} autoFocus className="input" /></div>
              <div><div className="input-label">Email de trabajo</div><input value={form.email} onChange={e => setForm({...form,email:e.target.value})} type="email" className="input" /></div>
              <button type="submit" disabled={!valid} className={`btn ${valid ? 'btn-red' : ''}`} style={{ marginTop: 12, justifyContent: 'center', background: valid ? 'var(--red)' : '#222' }}>Enviar PDF →</button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 64, color: 'var(--blue)' }}>✓</div>
            <div className="sg" style={{ fontSize: 32, marginTop: 10, color: 'var(--blue)' }}>PDF enviado.</div>
            <p className="sub" style={{ fontSize: 18, color: '#ddd', marginTop: 16, fontStyle: 'italic', lineHeight: 1.4 }}>Revisa <b>{form.email}</b> en un momento. Si no está, mira spam.</p>
            <button onClick={onClose} className="btn btn-ghost" style={{ marginTop: 32 }}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Page ── */
export default function CuellosPage() {
  const [modal, setModal] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (searchParams.get('email') === 'true' || searchParams.has('email')) {
      setModal(true);
    }
  }, [searchParams]);

  return (
    <>
      <LeadHero onDownloadClick={() => setModal(true)} />
      <Cuellos />
      <section className="ph-stripes" style={{ padding: '80px 32px', borderTop: 'var(--border-subtle)', borderBottom: 'var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 800 }}>
          <div className="sg" style={{ fontSize: 80, color: 'var(--yellow)', lineHeight: 0.6 }}>"</div>
          <div className="sub" style={{ fontSize: 'clamp(24px,4vw,32px)', lineHeight: 1.4, color: 'var(--yellow)', marginTop: 14, fontStyle: 'italic' }}>
            El marketing no hace crecer negocios. Los sistemas sí.
          </div>
          <div className="mono" style={{ fontSize: 12, color: '#888', marginTop: 24, letterSpacing: '.15em' }}>— FILOSOFÍA ADSBIGGER</div>
        </div>
      </section>
      <section className="section-dark" style={{ textAlign: 'center', padding: '120px 20px' }}>
        <div className="mono" style={{ fontSize: 11, color: 'var(--red)', letterSpacing: '.3em', textTransform: 'uppercase' }}>último paso</div>
        <h2 className="headline-md sg" style={{ margin: '20px 0 0' }}>Descarga el diagnóstico.</h2>
        <p className="sub" style={{ fontSize: 20, color: '#b8b8b8', marginTop: 18, fontStyle: 'italic' }}>Te enviamos el PDF al correo. Sin secuencias interminables.</p>
        <div style={{ marginTop: 40, display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => setModal(true)} className="btn btn-red sg" style={{ fontSize: 16 }}>Descarga el PDF →</button>
          <Link to="/diagnostico" className="btn btn-blue sg" style={{ fontSize: 16 }}>Hazlo online</Link>
        </div>
      </section>
      <EmailModal open={modal} onClose={() => setModal(false)} />
    </>
  );
}
