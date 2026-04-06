'use client';

import { useEffect, useRef, useState } from 'react';
import { buildCalendlyEmbedUrl } from '../utils/calendlyRedirect';

type Props = {
  schedulingPageUrl: string;
  title?: string;
  className?: string;
  minHeight?: number;
};

export default function CalendlyInlineEmbed({
  schedulingPageUrl,
  title = 'Book a call',
  className = '',
  minHeight = 650,
}: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || src) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSrc(buildCalendlyEmbedUrl(schedulingPageUrl));
          obs.disconnect();
        }
      },
      { rootMargin: '380px 0px', threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [schedulingPageUrl, src]);

  return (
    <div ref={containerRef} className={className} style={{ minHeight }}>
      {src ? (
        <iframe
          src={src}
          width="100%"
          height={minHeight}
          title={title}
          className="rounded-2xl overflow-hidden w-full border-0"
          loading="lazy"
        />
      ) : (
        <div
          className="flex items-center justify-center rounded-2xl bg-[#f4f8fa] text-[#063f4a]/45 text-sm"
          style={{ minHeight, fontFamily: "'Barlow', sans-serif" }}
          aria-hidden
        >
          Loading calendar…
        </div>
      )}
    </div>
  );
}
