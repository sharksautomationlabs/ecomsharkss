'use client';

import { useEffect, useRef, useState } from 'react';
import { buildCalendlyEmbedUrl } from '@/lib/calendlyRedirect';

type Props = {
  schedulingPageUrl: string;
  title?: string;
  className?: string;
  minHeight?: number;
  /** When true, iframe src loads immediately (no intersection wait). */
  preload?: boolean;
};

// NEXT_PUBLIC_ vars are available on both server and client — safe in useState initializer.
const EMBED_DOMAIN =
  process.env.NEXT_PUBLIC_SITE_HOSTNAME ?? 'thesharkretail.com';

function buildEmbedSrc(schedulingPageUrl: string): string {
  try {
    const u = new URL(schedulingPageUrl);
    u.searchParams.set('embed_domain', EMBED_DOMAIN);
    u.searchParams.set('embed_type', 'Inline');
    u.searchParams.set('hide_landing_page_details', '1');
    u.searchParams.set('hide_gdpr_banner', '1');
    u.searchParams.set('background_color', 'ffffff');
    u.searchParams.set('text_color', '0f172a');
    u.searchParams.set('primary_color', '154a89');
    return u.toString();
  } catch {
    return schedulingPageUrl;
  }
}

export default function CalendlyInlineEmbed({
  schedulingPageUrl,
  title = 'Book a call',
  className = '',
  minHeight = 650,
  preload = false,
}: Props) {
  // When preload=true, compute src immediately (works in SSR too — no window needed).
  // This renders the iframe in the initial HTML without waiting for useEffect.
  const [src, setSrc] = useState<string | null>(
    preload ? buildEmbedSrc(schedulingPageUrl) : null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preload) {
      // Correct embed_domain to actual hostname (may differ in dev).
      // Only update if different to avoid iframe reload.
      const clientSrc = buildCalendlyEmbedUrl(schedulingPageUrl);
      setSrc((prev) => (prev === clientSrc ? prev : clientSrc));
      return;
    }

    const el = containerRef.current;
    if (!el || src !== null) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSrc(buildCalendlyEmbedUrl(schedulingPageUrl));
          obs.disconnect();
        }
      },
      { rootMargin: '520px 0px', threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [schedulingPageUrl, preload, src]);

  return (
    <div ref={containerRef} className={className} style={{ minHeight }}>
      {src ? (
        <iframe
          src={src}
          width="100%"
          height={minHeight}
          title={title}
          className="rounded-2xl overflow-hidden w-full border-0 ring-1 ring-slate-200"
          loading={preload ? 'eager' : 'lazy'}
          // SSR and client compute the same src (EMBED_DOMAIN is a build-time constant).
          suppressHydrationWarning
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-2xl bg-slate-50 text-slate-500 text-sm border border-slate-200"
          style={{ minHeight }}
          aria-hidden
        >
          Loading calendar…
        </div>
      )}
    </div>
  );
}
