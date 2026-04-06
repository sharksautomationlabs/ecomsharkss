'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { setupCalendlyRedirect } from '../utils/calendlyRedirect';

export default function CalendlyScript() {
  useEffect(() => {
    setupCalendlyRedirect();
  }, []);

  useEffect(() => {
    // Add styles to make Calendly badge smaller and move it up
    const style = document.createElement('style');
    style.textContent = `
      /* Make Calendly badge smaller and move it up */
      .calendly-badge-widget {
        transform: scale(0.85) translateY(-20px) !important;
        transform-origin: bottom right !important;
        bottom: 20px !important;
      }
      @media (max-width: 1023px) {
        .calendly-badge-widget {
          transform: scale(0.82) translateY(-15px) !important;
          transform-origin: bottom right !important;
          bottom: 15px !important;
        }
      }
      @media (max-width: 640px) {
        .calendly-badge-widget {
          transform: scale(0.8) translateY(-10px) !important;
          bottom: 10px !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== 'undefined' && (window as any).Calendly) {
          (window as any).Calendly.initBadgeWidget({ 
            url: 'https://calendly.com/ecomsharkss-info/30min', 
            text: 'Call for free', 
            color: '#35c4dd', 
            textColor: '#ffffff', 
            branding: true 
          }); 
        }
      }}
    />
  );
}
