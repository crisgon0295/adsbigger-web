import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';
import HomePage from './pages/HomePage';
import DiagnosticoPage from './pages/DiagnosticoPage';
import CuellosPage from './pages/CuellosPage';

/* Track page views in Meta Pixel on route change */
function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    if (window.fbq) window.fbq('track', 'PageView');
  }, [location.pathname]);
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
      </Routes>
      <Footer />
      <WhatsAppFab />
    </BrowserRouter>
  );
}

export default App;
