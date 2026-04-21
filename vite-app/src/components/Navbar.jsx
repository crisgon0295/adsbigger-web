import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <img src="/logo-adsbigger-white.png" alt="adsBigger" style={{ height: 40, objectFit: 'contain' }} />
          </Link>
          <div className="navbar-links">
            {['Sistema', 'Casos', 'Proceso', 'Garantia'].map((l) => (
              <a key={l} href={`/#${l.toLowerCase()}`} className="navbar-link sg">{l}</a>
            ))}
          </div>
          <Link to="/diagnostico" className="btn btn-red navbar-cta">Ver si calificas →</Link>

          <div className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(!mobileOpen)}>
            <span /><span /><span />
          </div>
        </div>
      </nav>

      <div className={`navbar-mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {['Sistema', 'Casos', 'Proceso', 'Garantia'].map((l) => (
          <a key={l} href={`/#${l.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="sg">{l}</a>
        ))}
        <Link to="/diagnostico" onClick={() => setMobileOpen(false)} className="btn btn-red sg" style={{ marginTop: 24 }}>Ver si calificas →</Link>
        <Link to="/cuellos-de-botella" onClick={() => setMobileOpen(false)} className="btn btn-ghost sg" style={{ marginTop: 8 }}>Descargar PDF</Link>
      </div>
    </>
  );
}
