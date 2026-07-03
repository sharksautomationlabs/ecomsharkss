'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { setupCalendlyRedirect } from '@/lib/calendlyRedirect';

/** Loads Calendly widget.js + CSS asynchronously for funnel pages only. */
export default function EcomwealthCalendlyRoot() {
  useEffect(() => {
    setupCalendlyRedirect();
    // Load Calendly CSS asynchronously (non-render-blocking)
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }
  }, []);

  return (
    <Script
      src="https://assets.calendly.com/assets/external/widget.js"
      strategy="afterInteractive"
    />
  );
}
