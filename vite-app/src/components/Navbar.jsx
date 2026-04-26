import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleProgress = (e) => setProgress(e.detail);
    window.addEventListener('bant_progress', handleProgress);
    return () => window.removeEventListener('bant_progress', handleProgress);
  }, []);

  const track = (event, payload = {}) => {
    try { window.fbq && window.fbq('track', event, payload); } catch {}
    try { window.gtag && window.gtag('event', event.toLowerCase(), payload); } catch {}
    try {
      fetch('https://devn8n.adsbigger.cloud/webhook/kit-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, payload, ts: Date.now() })
      }).catch(() => {});
    } catch {}
  };

  const navL = { color: '#cfcfcf', textDecoration: 'none', fontSize: 13, fontWeight: 500, letterSpacing: '-0.005em' };
  
  const navStyle = {
    position: 'sticky', top: 0, zIndex: 60,
    background: scrolled ? 'rgba(10,10,10,0.9)' : 'rgba(10,10,10,0.55)',
    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)'}`,
    transition: 'all 250ms ease'
  };

  const Logo = () => (
    <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <img
        src="/logo-icon-white.webp"
        alt="adsBigger Logo"
        style={{
          height: 'clamp(28px, 3.5vw, 38px)',
          width: 'auto',
          objectFit: 'contain'
        }}
      />
    </Link>
  );

  const KitBadge = () => (
    <Link to="/kit" className="sg" style={{
      color: '#F5C518', textDecoration: 'none', fontSize: 12, letterSpacing: '.1em',
      textTransform: 'uppercase', padding: '6px 12px',
      border: '1px solid rgba(245,197,24,0.4)', borderRadius: 6,
      display: 'inline-flex', gap: 8, alignItems: 'center'
    }}>
      <span style={{ width: 5, height: 5, background: '#F5C518', borderRadius: 99, boxShadow: '0 0 8px #F5C518' }} />
      Kit · $97
    </Link>
  );

  if (path === '/') {
    // HOME
    return (
      <nav style={navStyle}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hide-on-mobile">
            <a href="#sistema" style={{ ...navL, color: '#fff', borderBottom: '1px solid #D51A05', paddingBottom: 2 }}>Sistema</a>
            {['Casos', 'Proceso', 'Sobre'].map(l =>
              <a key={l} href={`#${l.toLowerCase()}`} style={navL}>{l}</a>)}
            <Link to="/blog" style={navL}>Blog</Link>
            <KitBadge />
          </div>
          <Link to="/diagnostico" className="sg" style={{
            background: '#D51A05', color: '#fff', padding: '11px 18px', borderRadius: 8,
            textDecoration: 'none', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase',
            boxShadow: '0 4px 14px rgba(213,26,5,.25)'
          }}>
            Agenda tu diagnóstico →
          </Link>
        </div>
      </nav>
    );
  }

  if (path === '/cuellos-de-botella') {
    // LEAD MAGNET
    return (
      <nav style={navStyle}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hide-on-mobile">
            <Link to="/#sistema" style={navL}>Sistema</Link>
            <a href="#top" style={{ ...navL, color: '#fff', borderBottom: '1px solid #179DFF', paddingBottom: 2 }}>PDF gratis</a>
            <Link to="/blog" style={navL}>Blog</Link>
            <Link to="/diagnostico" style={navL}>Diagnóstico</Link>
            <KitBadge />
          </div>
          <Link to="/cuellos-de-botella?email=true" className="sg" style={{
            background: '#179DFF', color: '#fff', padding: '11px 18px', borderRadius: 8,
            textDecoration: 'none', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase',
            boxShadow: '0 4px 14px rgba(23,157,255,.25)', cursor: 'pointer'
          }}>
            Descargar gratis ↓
          </Link>
        </div>
      </nav>
    );
  }

  if (path === '/diagnostico') {
    // BANT
    return (
      <nav style={navStyle}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hide-on-mobile">
            <Link to="/#sistema" style={navL}>Sistema</Link>
            <Link to="/blog" style={navL}>Blog</Link>
            <Link to="/cuellos-de-botella" style={navL}>PDF</Link>
            <Link to="/#casos" style={navL}>Casos</Link>
            <KitBadge />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 120, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: '#D51A05', transition: 'width 400ms ease' }} />
            </div>
            <span className="mono" style={{ fontSize: 11, color: '#888', letterSpacing: '.1em' }}>{progress}%</span>
          </div>
        </div>
      </nav>
    );
  }

  if (path === '/kit') {
    // KIT
    return (
      <nav style={navStyle}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <Logo />
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hide-on-mobile">
            <Link to="/#sistema" style={navL}>Sistema</Link>
            <Link to="/blog" style={navL}>Blog</Link>
            <Link to="/cuellos-de-botella" style={navL}>PDF gratis</Link>
            <Link to="/diagnostico" style={navL}>Diagnóstico</Link>
            <Link to="/sprint" onClick={() => track('CTA_Click', { label: 'Nav_Sprint' })} className="sg" style={{
              color: '#F5C518', textDecoration: 'none', fontSize: 12, letterSpacing: '.12em',
              textTransform: 'uppercase', padding: '7px 12px',
              border: '1px solid rgba(245,197,24,0.4)', borderRadius: 6,
              display: 'inline-flex', gap: 8, alignItems: 'center'
            }}>
              <span style={{
                width: 5, height: 5, background: '#F5C518', borderRadius: 99,
                boxShadow: '0 0 8px #F5C518', animation: 'pulseDot 1.6s ease-in-out infinite'
              }} />
              Sprint $5M
            </Link>
          </div>
          <a href="#comprar" onClick={() => track('CTA_Click', { label: 'Nav_Buy' })} className="sg" style={{
            background: '#D51A05', color: '#fff', padding: '11px 18px', borderRadius: 8,
            textDecoration: 'none', fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase',
            boxShadow: '0 4px 14px rgba(213,26,5,.25)'
          }}>
            Comprar Kit · $97
          </a>
        </div>
      </nav>
    );
  }

  if (path === '/blog' || path.startsWith('/blog/')) {
    // BLOG — cream/parchment theme, black logo
    return (
      <nav style={{
        position: 'sticky', top: 0, zIndex: 60,
        background: scrolled ? 'rgba(245,242,236,0.94)' : 'rgba(245,242,236,0.72)',
        backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(26,22,18,0.14)' : 'transparent'}`,
        transition: 'all 250ms',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo-icon-black.webp"
              alt="adsBigger Logo"
              style={{ height: 'clamp(28px, 3.5vw, 36px)', width: 'auto', objectFit: 'contain' }}
            />
          </Link>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hide-on-mobile">
            <Link to="/#sistema" style={{ color: '#555', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Sistema</Link>
            <Link to="/blog" style={{ color: '#1a1612', textDecoration: 'none', fontSize: 13, fontWeight: 600, borderBottom: '1px solid #D51A05', paddingBottom: 2 }}>Blog</Link>
            <Link to="/kit" style={{ color: '#555', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>Kit · $97</Link>
            <Link to="/sprint" onClick={() => track('CTA_Click', { label: 'Blog_Nav_Sprint' })} style={{
              color: '#D51A05', textDecoration: 'none', fontSize: 12, fontWeight: 600,
              letterSpacing: '.1em', textTransform: 'uppercase',
              padding: '6px 12px', border: '1px solid rgba(213,26,5,0.35)', borderRadius: 6,
            }}>
              Sprint · $5M
            </Link>
          </div>
          <Link to="/diagnostico" onClick={() => track('CTA_Click', { label: 'Blog_Nav_Diagnostico' })} style={{
            background: '#1a1612', color: '#F5F2EC',
            padding: '11px 18px', borderRadius: 8,
            textDecoration: 'none', fontSize: 12,
            fontFamily: 'DM Sans, sans-serif', fontWeight: 700,
            letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            Diagnóstico →
          </Link>
        </div>
      </nav>
    );
  }

  if (path === '/sprint') {
    // SPRINT
    return (
      <nav style={{ position: 'sticky', top: 0, zIndex: 60, background: scrolled ? 'rgba(245,242,236,0.92)' : 'rgba(245,242,236,0.7)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${scrolled ? 'rgba(0,0,0,0.08)' : 'transparent'}`, transition: 'all 250ms' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '18px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              src="/logo-icon-black.webp"
              alt="adsBigger Logo"
              style={{
                height: 'clamp(28px, 3.5vw, 38px)',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Link>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="hide-on-mobile">
            <Link to="/#sistema" style={{ color: '#444', textDecoration: 'none', fontSize: 14 }}>Sistema</Link>
            <Link to="/blog" style={{ color: '#444', textDecoration: 'none', fontSize: 14 }}>Blog</Link>
            <Link to="/kit" style={{ color: '#444', textDecoration: 'none', fontSize: 14 }}>Kit · $97</Link>
            <a href="#top" style={{ color: '#0A0A0A', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>Sprint</a>
          </div>
          <a href="#aplicar" onClick={() => track('CTA_Click', { label: 'Nav_Apply_Sprint' })} style={{ background: '#0A0A0A', color: '#fff', padding: '12px 22px', borderRadius: 99, textDecoration: 'none', fontSize: 13, fontWeight: 500, fontFamily: 'DM Sans' }}>
            Aplicar al Sprint
          </a>
        </div>
      </nav>
    );
  }

  return null;
}
