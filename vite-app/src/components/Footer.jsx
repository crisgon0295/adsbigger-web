import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="navbar-logo">
            <img src="/logo-adsbigger-white.png" alt="adsBigger" style={{ height: 32, objectFit: 'contain', opacity: 0.8 }} />
          </div>
          <div style={{ fontSize: 14, color: '#888', marginTop: 14, lineHeight: 1.55, maxWidth: 320 }}>
            Instalamos sistemas, no vendemos anuncios. Bogotá, Colombia · Latam.
          </div>
          <div className="footer-brand-handle">@adsbigger</div>
        </div>

        <div>
          <div className="footer-col-title">Sistema</div>
          <div className="footer-col-links">
            <a href="/#sistema">El Sistema</a>
            <a href="/#casos">Casos Ancla</a>
            <a href="/#proceso">Proceso 90d</a>
            <a href="/#garantia">Garantía</a>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Recursos</div>
          <div className="footer-col-links">
            <Link to="/diagnostico">Diagnóstico BANT</Link>
            <Link to="/cuellos-de-botella">Lead Magnet PDF</Link>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Contacto</div>
          <div className="footer-col-links">
            <a href="https://wa.me/573057670817?text=Hola,%20me%20gustar%C3%ADa%20hacer%20el%20diagn%C3%B3stico%20de%20sistemas" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href="https://calendly.com/agency-adsbigger/reunion-kick-off" target="_blank" rel="noopener noreferrer">Calendly</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 adsBigger™ · Todos los derechos reservados</span>
        <span>adsbigger.com · hecho en Bogotá</span>
      </div>
    </footer>
  );
}
