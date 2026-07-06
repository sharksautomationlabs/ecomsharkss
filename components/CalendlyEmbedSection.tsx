import { buildCalendlyEmbedUrlStatic, CALENDLY_EMBED_ID, CALENDLY_SCHEDULING_URL } from '@/lib/calendlyRedirect';
import { FUNNEL_BRAND_NAME } from '@/lib/funnelBrand';

type Props = {
  id?: string;
  minHeight?: number;
  className?: string;
};

/** Server-rendered Calendly iframe — streams in HTML before any client JS hydrates. */
export default function CalendlyEmbedSection({
  id = CALENDLY_EMBED_ID,
  minHeight = 650,
  className = '',
}: Props) {
  const src = buildCalendlyEmbedUrlStatic(CALENDLY_SCHEDULING_URL);

  return (
    <div id={id} className={`py-8 lg:py-12 bg-slate-50 scroll-mt-4 ${className}`.trim()}>
      <div className="container mx-auto px-5 lg:px-20">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-center text-4xl lg:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            Pick a Time That Works for You
          </h2>
          <div className="relative rounded-2xl overflow-hidden ring-1 ring-slate-200 bg-white" style={{ minHeight }}>
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-50 pointer-events-none"
              aria-hidden
            >
              <div className="h-8 w-8 rounded-full border-2 border-teal-500 border-t-transparent animate-spin" />
              <p className="text-sm text-slate-500">Loading calendar…</p>
            </div>
            <iframe
              src={src}
              width="100%"
              height={minHeight}
              title={`Book a call with ${FUNNEL_BRAND_NAME}`}
              className="relative z-10 w-full border-0 bg-white"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
