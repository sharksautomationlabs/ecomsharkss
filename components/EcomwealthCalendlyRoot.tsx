'use client';

import { useEffect } from 'react';
import { setupCalendlyRedirect } from '@/lib/calendlyRedirect';

/** Listens for Calendly iframe postMessage events on funnel pages (no widget.js needed for inline embed). */
export default function EcomwealthCalendlyRoot() {
  useEffect(() => {
    setupCalendlyRedirect();
  }, []);

  return null;
}
