'use client';

import { useEffect, useRef, useState } from 'react';
import {
  buildCalendlyEmbedUrl,
  buildCalendlyEmbedUrlStatic,
} from '@/lib/calendlyRedirect';

type Props = {
  schedulingPageUrl: string;
  title?: string;
  className?: string;
  minHeight?: number;
  /** When true, iframe src loads immediately (no intersection wait). */
  preload?: boolean;
};

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
    preload ? buildCalendlyEmbedUrlStatic(schedulingPageUrl) : null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preload) return;

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
