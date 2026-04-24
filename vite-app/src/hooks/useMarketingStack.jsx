import { useRef } from 'react';

/**
 * Custom hook to centralize marketing tracking (Meta Pixel, GA4, n8n)
 * Prevents duplicate event firing and provides a clean API for components.
 */
export default function useMarketingStack() {
  const fired = useRef(new Set());
  
  function track(event, payload = {}) {
    // Unique key for event deduplication
    const eventKey = event + JSON.stringify(payload);
    if (fired.current.has(eventKey)) return;
    fired.current.add(eventKey);
    
    // 1. Meta Pixel
    try { 
      if (window.fbq) {
        window.fbq('track', event, payload);
      }
    } catch (e) {
      console.warn('Meta Pixel tracking failed:', e);
    }
    
    // 2. Google Analytics 4
    try {
      if (window.gtag) {
        window.gtag('event', event.toLowerCase(), payload);
      }
    } catch (e) {
      console.warn('GA4 tracking failed:', e);
    }

    // 3. Google Tag Manager Data Layer
    try {
      if (window.dataLayer) {
        window.dataLayer.push({
          event: event,
          ...payload
        });
      }
    } catch (e) {
      console.warn('GTM tracking failed:', e);
    }
    
    // 4. n8n Centralized Webhook Tracking
    try {
      fetch('https://devn8n.adsbigger.cloud/webhook/kit-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          event, 
          payload, 
          url: window.location.href,
          ts: Date.now() 
        })
      }).catch(() => {});
    } catch (e) {
      // Fail silently for webhook tracking
    }
  }

  return { track };
}
