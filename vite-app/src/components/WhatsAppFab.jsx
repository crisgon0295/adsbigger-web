import { useState } from 'react';

export default function WhatsAppFab() {
  const [hover, setHover] = useState(false);
  return (
    <a
      href="https://wa.me/573057670817?text=Hola,%20me%20gustar%C3%ADa%20agendar%20un%20diagn%C3%B3stico"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="wa-fab"
    >
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <path d="M16 3C8.82 3 3 8.82 3 16c0 2.47.67 4.78 1.84 6.77L3 29l6.45-1.78A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3z" fill="#fff" />
        <path d="M12.5 10.8c-.3-.67-.62-.68-.9-.7l-.77-.01c-.27 0-.7.1-1.07.5-.37.4-1.4 1.37-1.4 3.33 0 1.97 1.44 3.87 1.64 4.14.2.27 2.77 4.43 6.85 6.04 3.4 1.34 4.1 1.07 4.83 1 .73-.07 2.37-.97 2.7-1.9.33-.93.33-1.73.23-1.9-.1-.17-.37-.27-.77-.47-.4-.2-2.37-1.17-2.73-1.3-.37-.13-.63-.2-.9.2-.27.4-1.03 1.3-1.27 1.57-.23.27-.47.3-.87.1-.4-.2-1.7-.63-3.23-2-1.2-1.07-2-2.4-2.23-2.8-.23-.4-.02-.6.18-.8.18-.18.4-.47.6-.7.2-.23.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.87-2.17-1.22-2.97z" fill="#25D366" />
      </svg>
      {hover && <div className="wa-fab-tooltip sg">Habla con Cris</div>}
    </a>
  );
}
