const THANK_YOU_PATH = '/thank-you';

/** Calendly requires these on raw iframe src so the embed can postMessage the parent. */
export function buildCalendlyEmbedUrl(schedulingPageUrl: string): string {
  if (typeof window === 'undefined') {
    return schedulingPageUrl;
  }
  try {
    const u = new URL(schedulingPageUrl);
    u.searchParams.set('embed_domain', window.location.hostname);
    u.searchParams.set('embed_type', 'Inline');
    return u.toString();
  } catch {
    return schedulingPageUrl;
  }
}

export function redirectToThankYouAfterBooking() {
  if (typeof window === 'undefined') return;
  window.location.assign(THANK_YOU_PATH);
}

function parseCalendlyMessageData(data: unknown): { event?: string } | null {
  if (data == null) return null;
  if (typeof data === 'object' && data !== null && 'event' in data) {
    return data as { event?: string };
  }
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data) as { event?: string };
      return typeof parsed === 'object' && parsed !== null ? parsed : null;
    } catch {
      return null;
    }
  }
  return null;
}

const handleCalendlyMessage = (event: MessageEvent) => {
  const origin = event.origin || '';
  if (!origin.includes('calendly.com')) return;

  const payload = parseCalendlyMessageData(event.data);
  if (payload?.event === 'calendly.event_scheduled') {
    redirectToThankYouAfterBooking();
  }
};

export const setupCalendlyRedirect = () => {
  if (typeof window === 'undefined') return;
  window.removeEventListener('message', handleCalendlyMessage);
  window.addEventListener('message', handleCalendlyMessage);
};

export const teardownCalendlyRedirect = () => {
  if (typeof window === 'undefined') return;
  window.removeEventListener('message', handleCalendlyMessage);
};

export const getCalendlyConfig = () => ({
  onEventScheduled: () => {
    redirectToThankYouAfterBooking();
  },
  onEventTypeViewed: () => {},
  onDateAndTimeSelected: () => {},
});
