'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Play, Check, X } from 'lucide-react';
import {
  heroContent,
  trustStripContent,
  applyCtaContent,
  footerContent,
  successStories,
  proofDisclaimer,
} from '@/lib/ecomwealthContent';
import {
  FUNNEL_BRAND_NAME,
  FUNNEL_CONTACT_EMAIL,
  FUNNEL_CONTACT_MAILTO,
  FUNNEL_CONTACT_PHONE_DISPLAY,
  FUNNEL_CONTACT_PHONE_TEL,
  FUNNEL_LOGO_SRC,
} from '@/lib/funnelBrand';

// Heavy below-fold components — loaded only when scrolled into view
const CalendlyInlineEmbed = dynamic(() => import('@/components/CalendlyInlineEmbed'), { ssr: false });
const PlatformReviewsSection = dynamic(() => import('@/components/PlatformReviewsSection'), { ssr: false });
const EcomWealthFAQ = dynamic(() => import('@/components/EcomWealthFAQ'), { ssr: false });

const faqItems = [
  { id: 'faq-1', question: 'Is this truly hands-off?', answer: 'Yes. Our team runs the day-to-day operations — product sourcing, fulfillment, customer support, and ongoing optimization. You stay an owner, not an operator. Most partners spend roughly 30–60 minutes a week reviewing performance and approving the occasional decision.' },
  { id: 'faq-2', question: 'How much time do I actually need to put in?', answer: 'Very little. The business is built to operate without your daily involvement. You review transparent reporting, sign off on key decisions, and let the systems and experienced operators handle the rest.' },
  { id: 'faq-3', question: 'Who actually owns the business?', answer: 'You do — 100%. The store, the revenue, and the assets are registered in your name. We build, launch, and manage it on your behalf under a clear agreement. You own the asset; we run the operations.' },
  { id: 'faq-4', question: 'How transparent is the reporting?', answer: 'Fully transparent. You get dashboard access and regular performance reporting covering sales, orders, and profit — so you can see exactly how your business is doing at any time.' },
  { id: 'faq-5', question: 'What happens if performance is slower than expected?', answer: `We target $4,000+ in trackable sales in the first 30 days, but every business ramps differently based on capital, product selection, and market conditions. If results are slower than planned, our team keeps optimizing the sourcing, listings, and marketing to move things in the right direction. ${heroContent.performanceDisclaimer}` },
  { id: 'faq-6', question: 'Why don\'t you just build stores only for yourselves?', answer: 'We do operate our own stores — that\'s how we test products and systems before we deploy them. Partnering lets us scale across more proven niches and suppliers than we could alone, while you get an asset built on systems that are already working.' },
  { id: 'faq-7', question: 'What experience do I need?', answer: 'None. This is built for investors and business owners who want another income-producing asset, not another skill set to learn. Our team handles the operations; your role is ownership and oversight.' },
];

const CALENDLY_URL_DEFAULT = 'https://calendly.com/ecomsharkss-info/30min';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.02 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 180, damping: 24 } },
};

function LazyYouTube({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer group"
          aria-label={`Play: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/25 transition-colors">
            <div className="w-16 h-16 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-2xl transition-colors">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

/** Subtle scroll-reveal wrapper — fades content up the first time it enters view. */
function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Small uppercase teal label that sits above a section heading. */
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-teal-600 font-semibold text-base lg:text-lg uppercase tracking-[0.22em] mb-3"
      style={{ fontFamily: 'var(--font-barlow)' }}
    >
      {children}
    </p>
  );
}

/** Shared primary CTA pill so every call-to-action stays visually identical. */
function CtaButton({
  onClick,
  size = 'md',
  children,
}: {
  onClick: () => void;
  size?: 'md' | 'lg';
  children: React.ReactNode;
}) {
  const sizing = size === 'lg' ? 'py-4 px-10 text-lg' : 'py-4 px-8';
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-bold ${sizing} rounded-full transition-all shadow-lg shadow-teal-500/25`}
      style={{ fontFamily: 'var(--font-barlow)' }}
    >
      {children}
    </button>
  );
}

export default function EcomAutomationPage() {
  const calendlyUrl = CALENDLY_URL_DEFAULT;
  const calendlyRef = useRef<HTMLDivElement>(null);

  const openCalendly = () => {
    if (typeof window === 'undefined') return;
    const w = window as unknown as {
      Calendly?: {
        initPopupWidget: (opts: { url: string; onEventScheduled?: () => void }) => void;
      };
    };
    w.Calendly?.initPopupWidget({
      url: calendlyUrl,
      onEventScheduled: () => {
        window.location.assign('/thank-you');
      },
    });
  };

  const scrollToCalendly = () => {
    calendlyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  useEffect(() => { if (heroInView) heroControls.start('visible'); }, [heroControls, heroInView]);

  return (
    <div className="w-full min-h-screen bg-white text-slate-700 overflow-x-hidden">
      {/* Hero */}
      <div ref={heroRef} className="relative bg-white pt-4 lg:pt-8 pb-8 lg:pb-12 overflow-hidden border-b border-slate-200">
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-3xl" />
        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <motion.div initial="hidden" animate={heroControls} variants={containerVariants} className="max-w-6xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <Link href="/" className="inline-block">
                <div className="relative w-[160px] h-[52px] lg:w-[220px] lg:h-[72px]">
                  <Image src={FUNNEL_LOGO_SRC} alt={FUNNEL_BRAND_NAME} fill className="object-contain object-center" priority sizes="(max-width: 1024px) 160px, 220px" />
                </div>
              </Link>
            </motion.div>
            <motion.div variants={fadeInUp} className="mb-4 flex justify-center">
              <span className="inline-flex items-center rounded-full border border-teal-200 bg-white px-4 py-1.5 text-sm lg:text-base font-bold uppercase tracking-[0.22em] text-teal-700" style={{ fontFamily: "var(--font-barlow)" }}>
                Built For Investors
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-5 leading-[1.05] tracking-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Own A Fully Managed
              <br />
              eCommerce Business —
              <br />
              <span className="text-teal-600">Without Running One.</span>
            </motion.h1>
            <motion.div variants={fadeInUp} className="mb-2 flex justify-center">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50 px-5 py-2 text-lg lg:text-xl font-semibold text-teal-700" style={{ fontFamily: "var(--font-barlow)" }}>
                <span className="h-2 w-2 rounded-full bg-teal-500 shadow-[0_0_8px_2px_rgba(45,212,191,0.5)]" />
                {heroContent.performanceCallout}
              </span>
            </motion.div>
            <motion.p variants={fadeInUp} className="mb-5 text-xs lg:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
              {heroContent.performanceDisclaimer}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-xl lg:text-2xl text-slate-600 mb-5 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
              {heroContent.subhead}
            </motion.p>
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto bg-teal-500 text-white font-bold py-3 px-6 rounded-t-2xl mb-0 text-xl lg:text-2xl text-center" style={{ fontFamily: "var(--font-montserrat)" }}>
              {heroContent.doneForYouText.split('. ')[0]}. <span className="text-teal-50">{heroContent.doneForYouText.split('. ')[1]}</span> {heroContent.videoPrompt}
            </motion.div>
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto rounded-b-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 -mt-px">
              <LazyYouTube youtubeId="ZPY3hkj7xSE" title={heroContent.videoTitle} />
            </motion.div>
            <motion.p variants={fadeInUp} className="mt-5 text-2xl lg:text-3xl text-slate-700 font-medium leading-snug" style={{ fontFamily: "var(--font-barlow)" }}>
              {heroContent.applyBelowLine1}
              <br />
              {heroContent.applyBelowLine2}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-7 flex justify-center">
              <CtaButton onClick={scrollToCalendly} size="lg">{applyCtaContent.ctaText}</CtaButton>
            </motion.div>
            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
              {['You Own The Business', 'We Manage The Operations', 'Built For Investors & Business Owners'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-base lg:text-lg text-slate-700 font-medium" style={{ fontFamily: 'var(--font-barlow)' }}>
                  <Check className="w-4 h-4 text-teal-600" />
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* TrustStrip */}
      <div className="py-4 lg:py-6 bg-teal-50 border-y border-teal-100">
        <div className="container mx-auto px-5 lg:px-20 text-center">
          <p className="text-xl lg:text-2xl text-slate-900 font-semibold max-w-3xl mx-auto" style={{ fontFamily: "var(--font-montserrat)" }}>
            {trustStripContent.partnershipsText}
          </p>
        </div>
      </div>

      {/* Calendly Embed */}
      <div ref={calendlyRef} className="py-8 lg:py-12 bg-slate-50">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-center text-4xl lg:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'var(--font-montserrat)' }}>
              Pick a Time That Works for You
            </h2>
            <CalendlyInlineEmbed
              schedulingPageUrl={calendlyUrl}
              title={`Book a call with ${FUNNEL_BRAND_NAME}`}
              minHeight={650}
              // Always eager-load: with the section collapsed the lazy
              // IntersectionObserver would never fire, so force the iframe to
              // start loading immediately in the background.
              preload
            />
          </div>
        </div>
      </div>

      {/* Mirror — You're not buying another job, you're buying another asset */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>Ownership, Not Operations</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              You&apos;re Not Buying Another Job.
              <br />
              <span className="text-teal-600">You&apos;re Buying Another Asset.</span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-700 font-bold leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
              You&apos;ve already built a successful business. The last thing you need is another company demanding your time. That&apos;s why we build, operate, and manage your eCommerce business while you focus on what you already do best.
            </p>
            <div className="mt-9">
              <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Belief Shift — Most people buy stores, investors buy systems */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>The Investor Mindset</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-10 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Most People Buy Stores.
              <br />
              <span className="text-teal-600">Investors Buy Systems.</span>
            </h2>
            <div className="max-w-xl mx-auto space-y-3 text-left">
              {[
                { label: "Owning a store isn't passive.", positive: false },
                { label: "Managing a store isn't passive.", positive: false },
                { label: 'Owning a professionally managed business is.', positive: true },
              ].map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-4 ${row.positive ? 'border-teal-300 bg-teal-50' : 'border-slate-200 bg-white'}`}
                >
                  <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${row.positive ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {row.positive ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </span>
                  <span className={`text-lg lg:text-xl ${row.positive ? 'text-slate-900 font-semibold' : 'text-slate-600'}`} style={{ fontFamily: "var(--font-barlow)" }}>
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-teal-600 font-semibold text-xl lg:text-2xl" style={{ fontFamily: "var(--font-montserrat)" }}>
              That&apos;s the difference.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Opportunity — Diversify beyond traditional investments */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-[-120px] left-[-60px] w-[360px] h-[360px] bg-teal-200/40 rounded-full blur-3xl" />
        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <Reveal className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>Why It Matters</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Diversify Beyond <span className="text-teal-600">Traditional Investments.</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['Real estate', 'Stocks', 'Private equity'].map((item) => (
                <span key={item} className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-5 py-2 text-lg lg:text-xl text-slate-700 font-medium" style={{ fontFamily: "var(--font-barlow)" }}>
                  {item}
                </span>
              ))}
            </div>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
              A professionally managed eCommerce business gives you another income-producing asset — <span className="text-slate-900 font-semibold">without adding another full-time responsibility.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Why Us — Businesses don't become passive by accident */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>Why It Works</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Businesses Don&apos;t Become Passive By Accident.
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
              They become passive because every critical function is managed by systems and experienced operators. From product sourcing and fulfillment to customer support and optimization, every part of the business is designed to operate without requiring your daily involvement.
            </p>
            <p className="mt-5 text-slate-900 font-semibold text-xl lg:text-2xl" style={{ fontFamily: "var(--font-montserrat)" }}>
              That&apos;s how ownership becomes scalable.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process — How we build your business */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center">
            <SectionEyebrow>The Process</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-12 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              How We Build Your Business
            </h2>
          </Reveal>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              'You qualify.',
              'We build your business.',
              'We launch and manage operations.',
              'You receive transparent reporting.',
              'We optimize for long-term growth.',
            ].map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <div className="group flex items-center gap-5 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 py-5 transition-colors hover:border-teal-300 hover:bg-slate-50">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-lg" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {i + 1}
                  </span>
                  <span className="text-xl lg:text-2xl text-slate-900 font-medium" style={{ fontFamily: "var(--font-barlow)" }}>
                    {step}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12">
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </Reveal>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>Full-Service Management</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-3 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              What&apos;s Included
            </h2>
            <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto" style={{ fontFamily: "var(--font-barlow)" }}>
              Instead of wondering what you&apos;re paying for, here&apos;s exactly what our team handles.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              'Store Development',
              'Product Research',
              'U.S. Supplier Network',
              'Inventory Management',
              'Customer Support',
              'Order Fulfillment',
              'Marketing Management',
              'Automation Systems',
              'Performance Reporting',
              'Ongoing Optimization',
            ].map((item) => (
              <div key={item} className="group flex items-center gap-3 bg-white border border-slate-200 shadow-sm rounded-xl px-5 py-4 transition-colors hover:border-teal-300 hover:bg-slate-50">
                <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 text-teal-600">
                  <Check className="w-4 h-4" />
                </span>
                <span className="text-lg lg:text-xl text-slate-900 font-medium" style={{ fontFamily: "var(--font-barlow)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-900 font-semibold text-xl lg:text-3xl mt-12" style={{ fontFamily: "var(--font-montserrat)" }}>
            You own the business. <span className="text-teal-600">We handle everything else.</span>
          </p>
        </div>
      </section>

      <PlatformReviewsSection />

      {/* PartnerStoreResults - Dashboard Screenshots */}
      <div className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 text-center mb-9" style={{ fontFamily: "var(--font-montserrat)" }}>
            Here&apos;s what ownership looks like
          </h2>
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] flex items-center justify-center">
                <Image
                  src={`/images/partner-results/result-${i === 2 ? '2-tiktok' : i}.png`}
                  alt={`Partner store result ${i}`}
                  width={800}
                  height={600}
                  sizes="100vw"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="mt-16 max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center">
            <p className="text-lg text-slate-900 font-semibold mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
              Ready to book your free strategy call?
            </p>
            <p className="text-slate-600 text-sm mb-6" style={{ fontFamily: "var(--font-barlow)" }}>
              Pick a time that works for you — no pressure, no commitment.
            </p>
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </div>
        </div>
      </div>

      {/* Client Stories — real partner journeys, not just testimonials */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>Client Stories</SectionEyebrow>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Real owners. Real results.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {successStories.map((story, i) => (
              <Reveal key={story.name} delay={i * 0.05}>
                <div className="h-full flex flex-col bg-white border border-slate-200 shadow-sm rounded-2xl p-7 transition-colors hover:border-teal-300">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl lg:text-4xl font-bold text-teal-600" style={{ fontFamily: "var(--font-montserrat)" }}>{story.figure}</span>
                    <span className="text-sm text-slate-500" style={{ fontFamily: "var(--font-barlow)" }}>in {story.timeframe}</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>{story.headline}</h3>
                  <p className="text-base lg:text-lg text-slate-600 leading-relaxed mb-5 flex-grow" style={{ fontFamily: "var(--font-barlow)" }}>&ldquo;{story.quote}&rdquo;</p>
                  <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-barlow)" }}>&mdash; {story.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs leading-relaxed max-w-3xl mx-auto mt-10" style={{ fontFamily: "var(--font-barlow)" }}>
            {proofDisclaimer}
          </p>
        </div>
      </section>

      {/* Market Graph Section */}
      <div className="py-16 lg:py-24 bg-white relative overflow-hidden border-y border-slate-200">
        <div className="absolute top-[-100px] right-[-50px] w-[300px] h-[300px] bg-teal-200/40 rounded-full blur-3xl" />
        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 text-center mb-2 max-w-5xl mx-auto leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
            Global e-commerce is on pace to pass
            <br />
            <span className="text-teal-600">$8.15 trillion by 2026</span>
          </h2>
          <p className="text-center text-slate-600 text-base lg:text-lg mb-9" style={{ fontFamily: "var(--font-barlow)" }}>
            Diversify beyond real estate, stocks, and private equity—own an income-producing asset in the fastest-growing market.
          </p>
          <div className="max-w-5xl mx-auto">
            {/* Combined Bar + Line Chart */}
            <div className="relative w-full" style={{ minHeight: '320px' }}>
              <svg viewBox="0 0 880 320" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="barGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#123e73" />
                    <stop offset="100%" stopColor="#4d84c4" />
                  </linearGradient>
                </defs>
                {/* Data: year, value, x (center), barHeight (0-160), y (line point, 240 - barHeight*0.9) */}
                {[
                  { year: '2017', value: '$2.38', x: 50, barH: 53, y: 187 },
                  { year: '2018', value: '$2.98', x: 130, barH: 67, y: 173 },
                  { year: '2019', value: '$3.35', x: 210, barH: 75, y: 165 },
                  { year: '2020', value: '$4.25', x: 290, barH: 95, y: 145 },
                  { year: '2021', value: '$5.21', x: 370, barH: 117, y: 123 },
                  { year: '2022', value: '$5.72', x: 450, barH: 128, y: 112 },
                  { year: '2023', value: '$6.31', x: 530, barH: 141, y: 99 },
                  { year: '2024*', value: '$6.91', x: 610, barH: 155, y: 85 },
                  { year: '2025*', value: '$7.53', x: 690, barH: 169, y: 71 },
                  { year: '2026*', value: '$8.15', x: 770, barH: 183, y: 57 },
                  { year: '2027*', value: '$8.91', x: 830, barH: 200, y: 40 },
                ].map((d) => (
                  <g key={d.year}>
                    <rect x={d.x - 28} y={240 - d.barH} width="44" height={d.barH} rx="4" fill="url(#barGradient)" />
                    <text x={d.x} y={240 - d.barH - 8} textAnchor="middle" fill="#123e73" fontSize="12" fontFamily="Barlow, sans-serif">{d.value}</text>
                    <text x={d.x} y="268" textAnchor="middle" fill="#123e73" fontSize="11" fontFamily="Barlow Condensed, sans-serif">{d.year}</text>
                  </g>
                ))}
                {/* White line through data points */}
                <polyline points="50,187 130,173 210,165 290,145 370,123 450,112 530,99 610,85 690,71 770,57 830,40" fill="none" stroke="#123e73" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {[
                  { x: 50, y: 187 }, { x: 130, y: 173 }, { x: 210, y: 165 }, { x: 290, y: 145 },
                  { x: 370, y: 123 }, { x: 450, y: 112 }, { x: 530, y: 99 }, { x: 610, y: 85 },
                  { x: 690, y: 71 }, { x: 770, y: 57 }, { x: 830, y: 40 },
                ].map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="5" fill="#154a89" stroke="#ffffff" strokeWidth="1.5" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between items-center mt-2 px-2 text-xs text-slate-500" style={{ fontFamily: "var(--font-barlow)" }}>
              <span>Source: eMarketer Insider Intelligence</span>
              <span>*Projected</span>
            </div>
            <div className="text-center mt-10">
              <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 text-center mb-10" style={{ fontFamily: "var(--font-montserrat)" }}>
            Questions we hear most often
          </h2>
          <div className="max-w-3xl mx-auto">
            <EcomWealthFAQ items={faqItems} />
          </div>
          <div className="text-center mt-12">
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </div>
        </div>
      </div>

      {/* Qualify bridge — Let's see if this is the right investment for you */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>Your Next Step</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Let&apos;s See If This Is The
              <br />
              <span className="text-teal-600">Right Investment For You.</span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-8" style={{ fontFamily: "var(--font-barlow)" }}>
              If you&apos;re looking to diversify your income with a professionally managed eCommerce business, let&apos;s talk. During your strategy call we&apos;ll:
            </p>
            <div className="max-w-md mx-auto space-y-4 text-left mb-8 bg-white border border-slate-200 shadow-sm rounded-2xl px-6 py-6">
              {[
                'Learn about your goals.',
                'Explain the model.',
                'Answer your questions.',
                "Determine if you're a good fit.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-teal-100 text-teal-600 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-lg lg:text-xl text-slate-700" style={{ fontFamily: "var(--font-barlow)" }}>{item}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-600 text-base lg:text-lg mb-8 italic" style={{ fontFamily: "var(--font-barlow)" }}>
              If we&apos;re not the right fit, we&apos;ll tell you.
            </p>
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </Reveal>
        </div>
      </section>

      {/* Final Offer — Own another asset, not another job */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-teal-200/40 rounded-full blur-3xl" />
        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <Reveal className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-5 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Own Another Asset.
              <br />
              <span className="text-teal-600">Not Another Job.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-slate-700 mb-9" style={{ fontFamily: "var(--font-barlow)" }}>
              Build wealth through ownership — not more work.
            </p>
            <CtaButton onClick={scrollToCalendly} size="lg">{applyCtaContent.ctaText}</CtaButton>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-slate-50 border-t border-slate-200 py-10 lg:py-14">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {footerContent.links.map((l) => (
              <Link key={l.href} href={l.href} className="text-slate-500 hover:text-teal-600 text-sm transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-8 mb-6 text-center">
            <a href={FUNNEL_CONTACT_MAILTO} className="text-teal-600 hover:text-teal-300 font-semibold text-sm sm:text-base transition-colors">
              {FUNNEL_CONTACT_EMAIL}
            </a>
            <a href={FUNNEL_CONTACT_PHONE_TEL} className="text-slate-900 font-semibold text-sm sm:text-base hover:text-teal-600 transition-colors">
              {FUNNEL_CONTACT_PHONE_DISPLAY}
            </a>
          </div>
          <p className="text-slate-500 text-sm text-center mb-6">
            {footerContent.copyright}
          </p>
          <div className="space-y-4 max-w-4xl mx-auto">
            {footerContent.disclaimers.map((d, i) => (
              <p key={i} className="text-slate-600 text-xs leading-relaxed">{d}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
