export default function Marquee() {
  const items = [
    'No vendemos anuncios. Instalamos sistemas.',
    'Esto es un activo. No un servicio.',
    'Solo 2 empresas por trimestre.',
    'Tu negocio no necesita más ads. Necesita estructura.'
  ];
  return (
    <div className="marquee-strip">
      <div className="marquee-track">
        {[...items, ...items].map((it, i) => (
          <div key={i} className="marquee-item" style={{ color: i % 2 ? 'var(--yellow)' : 'var(--white)' }}>
            {it}
            <span className="sep">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
