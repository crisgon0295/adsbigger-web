import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import HomePage from './pages/HomePage';
import DiagnosticoPage from './pages/DiagnosticoPage';
import CuellosPage from './pages/CuellosPage';
import KitPage from './pages/KitPage';
import SprintPage from './pages/SprintPage';

/* Track page views in Meta Pixel on route change */
function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    // Meta Pixel
    if (window.fbq) window.fbq('track', 'PageView');
    
    // Google Analytics 4 (gtag.js)
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search
      });
    }

    // Google Tag Manager (dataLayer)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: location.pathname + location.search
      });
    }
  }, [location.pathname, location.search]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/diagnostico" element={<DiagnosticoPage />} />
        <Route path="/cuellos-de-botella" element={<CuellosPage />} />
        <Route path="/kit" element={<KitPage />} />
        <Route path="/sprint" element={<SprintPage />} />
      </Routes>
      <Footer />
      <WhatsAppFab />
    </BrowserRouter>
  );
}

export default App;
