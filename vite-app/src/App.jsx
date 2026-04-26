import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

// Lazy loading de páginas para code splitting y mejor performance
const HomePage = lazy(() => import('./pages/HomePage'));
const DiagnosticoPage = lazy(() => import('./pages/DiagnosticoPage'));
const CuellosPage = lazy(() => import('./pages/CuellosPage'));
const KitPage = lazy(() => import('./pages/KitPage'));
const SprintPage = lazy(() => import('./pages/SprintPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const SistemaDeAdquisicionPage = lazy(() => import('./pages/blog/SistemaDeAdquisicionPage'));

/* Track page views in Meta Pixel on route change */
function PageViewTracker() {
  const location = useLocation();
  useEffect(() => {
    // Defer tracking calls usando requestIdleCallback para no bloquear el hilo principal
    const trackPageView = () => {
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
    };

    // Usar requestIdleCallback si está disponible, sino usar setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(trackPageView);
    } else {
      setTimeout(trackPageView, 0);
    }
  }, [location.pathname, location.search]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--obsidian)' }} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/diagnostico" element={<DiagnosticoPage />} />
          <Route path="/cuellos-de-botella" element={<CuellosPage />} />
          <Route path="/kit" element={<KitPage />} />
          <Route path="/sprint" element={<SprintPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/sistema-de-adquisicion" element={<SistemaDeAdquisicionPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppFab />
    </BrowserRouter>
  );
}

export default App;
