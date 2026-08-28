'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Play, Check, X, Zap, ArrowRight, AlertTriangle } from 'lucide-react';
import CalendlyInlineEmbed from '@/components/CalendlyInlineEmbed';
import {
  CALENDLY_EMBED_ID,
  CALENDLY_SCHEDULING_URL,
  scrollToCalendlyEmbed,
} from '@/lib/calendlyRedirect';
import {
  heroContent,
  applyCtaContent,
  footerContent,
  successStories,
  proofDisclaimer,
  keyStats,
} from '@/lib/ecomwealthContent';
import {
  FUNNEL_BRAND_NAME,
  FUNNEL_CONTACT_EMAIL,
  FUNNEL_CONTACT_MAILTO,
  FUNNEL_CONTACT_PHONE_DISPLAY,
  FUNNEL_CONTACT_PHONE_TEL,
  FUNNEL_LOGO_SRC,
} from '@/lib/funnelBrand';

// Heavy below-fold components: loaded only when scrolled into view
const PlatformReviewsSection = dynamic(() => import('@/components/PlatformReviewsSection'), { ssr: false });
const EcomWealthFAQ = dynamic(() => import('@/components/EcomWealthFAQ'), { ssr: false });

const faqItems = [
  { id: 'faq-1', question: 'How much does it cost?', answer: 'Your investment covers building and launching your store, plus the working capital the business needs to operate, including product testing, marketing, fulfillment, technology, and operations. The exact figure and payment structure are confirmed on your qualification call before you commit.' },
  { id: 'faq-2', question: 'What exactly do I own?', answer: 'You own the business: the store, the brand, the customer base, and the revenue it generates. ECOM SHARKS operates it on your behalf under a written agreement. Your ownership, responsibilities, and investment requirements are defined upfront.' },
  { id: 'faq-3', question: 'What do you manage?', answer: 'Product research, store development, supplier and fulfillment operations, marketing, customer support, automation, and ongoing reporting and optimization. In short, the full day-to-day operation of the business.' },
  { id: 'faq-4', question: 'How involved do I need to be?', answer: 'Minimal. You review performance reporting and approve key decisions. An experienced team runs daily operations, so the business does not depend on your time.' },
  { id: 'faq-5', question: 'Do I need ecommerce experience?', answer: 'No. The team operates the business for you. Experience is not required to own it.' },
  { id: 'faq-6', question: 'How long does setup take?', answer: 'Typically a few weeks from onboarding to launch, depending on product selection and supplier timelines. Your specific timeline is confirmed during onboarding.' },
  { id: 'faq-7', question: 'What happens if the store doesn\'t perform?', answer: 'The team keeps working the levers that drive performance: product selection, listings, and marketing. Results vary based on product, capital, and market conditions, and no specific outcome is guaranteed.' },
  { id: 'faq-8', question: 'Are sales or profit guaranteed?', answer: 'No. No sales or profit figure is guaranteed. Performance depends on product selection, marketing, available capital, and market conditions. You get a clear view of the economics so you can make an informed decision.' },
  { id: 'faq-9', question: 'What additional costs should I expect?', answer: 'Beyond your initial investment, the business carries ongoing operating costs: marketing spend, product and fulfillment costs, and platform and software fees. These are covered in the economics review before you commit.' },
  { id: 'faq-10', question: 'How do I receive performance reporting?', answer: 'You receive regular performance reporting and business updates covering sales, orders, and key metrics, so you can see how the business is doing at any time.' },
  { id: 'faq-11', question: 'What happens after launch?', answer: 'The team manages daily operations and keeps optimizing: testing products, refining listings, and adjusting marketing. The focus is on scaling what proves profitable.' },
];

type PagePart = 'full' | 'hero' | 'after-calendly';

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
            fetchPriority="low"
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

/** Subtle scroll-reveal wrapper that fades content up the first time it enters view. */
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
      className={`group inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 hover:-translate-y-0.5 active:translate-y-0 text-white font-extrabold ${sizing} rounded-xl transition-all duration-200 shadow-[0_12px_18px_-8px_rgba(20,184,166,0.55)]`}
      style={{ fontFamily: 'var(--font-barlow)' }}
    >
      {children}
      <ArrowRight className="w-[1em] h-[1em] transition-transform group-hover:translate-x-1" />
    </button>
  );
}

export default function EcomAutomationPage({
  part = 'full',
  calendlyEmbed,
}: {
  part?: PagePart;
  calendlyEmbed?: React.ReactNode;
}) {
  const calendlyUrl = CALENDLY_SCHEDULING_URL;
  const scrollToCalendly = scrollToCalendlyEmbed;

  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  useEffect(() => { if (heroInView) heroControls.start('visible'); }, [heroControls, heroInView]);

  const heroSection = (
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
            <motion.p variants={fadeInUp} className="mb-3 flex items-center justify-center gap-2 text-lg lg:text-xl font-bold text-teal-700" style={{ fontFamily: "var(--font-barlow)" }}>
              <Zap className="w-5 h-5 lg:w-6 lg:h-6 fill-teal-500 text-teal-500 shrink-0" />
              {heroContent.performanceCallout}
            </motion.p>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 mb-5 leading-[1.05] tracking-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Own A Fully Managed
              <br />
              eCommerce Business.
              <br />
              <span className="text-teal-600 italic">Without Running One.</span>
            </motion.h1>
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
            <motion.p variants={fadeInUp} className="mt-3 flex items-center justify-center gap-1.5 text-sm lg:text-base font-semibold text-teal-700" style={{ fontFamily: 'var(--font-barlow)' }}>
              <Zap className="w-4 h-4 fill-teal-500 text-teal-500 shrink-0" />
              Only 5 investor partnerships available per month. Apply now to secure yours.
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-2 text-xs lg:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
              {heroContent.performanceDisclaimer}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-6 flex justify-center">
              <a href="https://www.trustpilot.com/review/ecomsharksofficial.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity">
                <Image src="/images/trust-pilot.jpg" alt="ECOM SHARKS on Trustpilot" width={110} height={30} className="object-contain" />
              </a>
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
  );

  const calendlySection =
    part === 'full' ? (
      calendlyEmbed ?? (
        <div id={CALENDLY_EMBED_ID} className="py-8 lg:py-12 bg-slate-50 scroll-mt-4">
          <div className="container mx-auto px-5 lg:px-20">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-center text-4xl lg:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'var(--font-montserrat)' }}>
                Pick a Time That Works for You
              </h2>
              <CalendlyInlineEmbed
                schedulingPageUrl={calendlyUrl}
                title={`Book a call with ${FUNNEL_BRAND_NAME}`}
                minHeight={650}
                preload
              />
            </div>
          </div>
        </div>
      )
    ) : null;

  const afterCalendlySection = (
    <>
      {/* THE MODEL: You own it. We operate it. */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="max-w-3xl mx-auto text-center">
            <SectionEyebrow>The Model</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              You Own It.
              <br />
              <span className="text-teal-600">We Operate It.</span>
            </h2>
            <p className="text-lg lg:text-xl text-slate-700 leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
              We build, launch, and manage your ecommerce business. You hold full ownership while an experienced team runs the day-to-day operations.
            </p>
            <div className="mt-9">
              <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* HOW THE MODEL ACTUALLY WORKS */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>How It Works</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              How The Model Actually Works
            </h2>
            <p className="text-lg lg:text-xl text-slate-600" style={{ fontFamily: "var(--font-barlow)" }}>
              It&apos;s built through a continuous operating process.
            </p>
          </Reveal>
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              'You qualify.',
              'We research and build your business.',
              'We launch and manage operations.',
              'You receive transparent reporting.',
              'We scale what earns it.',
            ].map((step, i) => (
              <Reveal key={step} delay={i * 0.05}>
                <div className="group flex items-center gap-5 bg-white border border-slate-200 shadow-sm rounded-[20px] px-6 py-5 transition-colors hover:border-teal-300 hover:bg-slate-50">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-lg" style={{ fontFamily: "var(--font-montserrat)" }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xl lg:text-2xl text-slate-900 font-medium" style={{ fontFamily: "var(--font-barlow)" }}>
                    {step}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-lg lg:text-xl text-slate-600 italic mb-8" style={{ fontFamily: "var(--font-barlow)" }}>
              That&apos;s the difference between handing someone a store and having a team operate a business.
            </p>
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </Reveal>
        </div>
      </section>

      {/*
        KNOW WHAT YOU OWN
        NOTE: Replace the ownership descriptions below with the company's actual
        legal / asset ownership language and contractual structure before publishing.
      */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>What You Own</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Know What You Own.
            </h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Your Business', body: 'We build and launch your ecommerce business.' },
              { label: 'Your Store', body: 'Your storefront is developed and maintained.' },
              { label: 'Your Operations', body: 'We manage product research, marketing, fulfillment, support, and optimization.' },
              { label: 'Your Visibility', body: 'You receive performance reporting and business updates.' },
              { label: 'Your Role', body: 'Your ownership, responsibilities, and investment requirements are clearly defined upfront.' },
            ].map((item) => (
              <div key={item.label} className="w-full md:w-[calc(50%_-_0.5rem)] bg-white border border-slate-200 shadow-sm rounded-[20px] px-6 py-6 transition-colors hover:border-teal-300">
                <h3 className="text-base lg:text-lg font-bold text-teal-600 uppercase tracking-wide mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
                  {item.label}
                </h3>
                <p className="text-base lg:text-lg text-slate-700 leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-900 font-semibold text-xl lg:text-3xl mt-12" style={{ fontFamily: "var(--font-montserrat)" }}>
            You own the business. <span className="text-teal-600">We manage the operations.</span>
          </p>
          <div className="text-center mt-9">
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED: short capability grid */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>What&apos;s Included</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              What&apos;s Included
            </h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Product Research', body: 'Identify and evaluate ecommerce opportunities.' },
              { label: 'Store Development', body: 'Build and launch your ecommerce storefront.' },
              { label: 'Supplier & Fulfillment', body: 'Manage sourcing, fulfillment, and order operations.' },
              { label: 'Marketing', body: 'Manage customer acquisition and growth.' },
              { label: 'Customer Support', body: 'Handle customer communication and support.' },
              { label: 'Automation & Systems', body: 'Systemize and automate key operations.' },
              { label: 'Reporting & Optimization', body: 'Track performance and continuously improve the business.' },
            ].map((item) => (
              <div key={item.label} className="w-full md:w-[calc(50%_-_0.5rem)] flex gap-4 bg-white border border-slate-200 shadow-sm rounded-[20px] px-5 py-4 transition-colors hover:border-teal-300">
                <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 text-teal-600 mt-0.5">
                  <Check className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base lg:text-lg font-bold text-slate-900 mb-1" style={{ fontFamily: "var(--font-barlow)" }}>
                    {item.label}
                  </h3>
                  <p className="text-sm lg:text-base text-slate-600 leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-900 font-semibold text-xl lg:text-3xl mt-12" style={{ fontFamily: "var(--font-montserrat)" }}>
            You own the business. <span className="text-teal-600">We handle the work required to operate it.</span>
          </p>
        </div>
      </section>

      {/* ECONOMICS */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>Economics</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Before You Invest, Understand The Economics.
            </h2>
          </Reveal>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {[
              { label: 'What You Invest', body: 'Initial and ongoing capital requirements.' },
              { label: 'How It Makes Money', body: 'Products, customers, and revenue model.' },
              { label: 'What It Costs', body: 'Marketing, products, fulfillment, technology, and operations.' },
              { label: 'What Affects Profitability', body: 'Margins, acquisition costs, product performance, and market conditions.' },
              { label: 'What To Expect', body: 'Clear assumptions, targets, and business economics.' },
            ].map((item) => (
              <div key={item.label} className="w-full md:w-[calc(50%_-_0.5rem)] bg-white border border-slate-200 shadow-sm rounded-[20px] px-6 py-6 transition-colors hover:border-teal-300">
                <h3 className="text-base lg:text-lg font-bold text-teal-600 uppercase tracking-wide mb-2" style={{ fontFamily: "var(--font-barlow)" }}>
                  {item.label}
                </h3>
                <p className="text-base lg:text-lg text-slate-700 leading-relaxed" style={{ fontFamily: "var(--font-barlow)" }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-900 font-semibold text-xl lg:text-2xl mt-12" style={{ fontFamily: "var(--font-montserrat)" }}>
            No guarantees. No hype. <span className="text-teal-600">Just a clear view of the business.</span>
          </p>
          <div className="text-center mt-9">
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </div>
        </div>
      </section>

      {/* PROOF: Key Stats dark strip */}
      <div className="py-10 lg:py-14" style={{ backgroundColor: 'rgb(10, 10, 10)' }}>
        <div className="container mx-auto px-5 lg:px-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 max-w-4xl mx-auto rounded-[20px] border border-white/10 divide-y sm:divide-y-0 sm:divide-x divide-white/10 overflow-hidden">
            {keyStats.map((stat) => (
              <div key={stat.label} className="px-4 py-6 text-center">
                <p className="text-3xl lg:text-4xl font-extrabold text-teal-400" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  {stat.figure}
                </p>
                <p className="mt-2 text-xs lg:text-sm uppercase tracking-wide text-slate-300 font-medium" style={{ fontFamily: 'var(--font-barlow)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PlatformReviewsSection />

      {/* PartnerStoreResults - Dashboard Screenshots */}
      <div className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 text-center mb-9" style={{ fontFamily: "var(--font-montserrat)" }}>
            Here&apos;s what ownership looks like
          </h2>
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-[20px] overflow-hidden shadow-xl border border-slate-200 aspect-[4/3] flex items-center justify-center">
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
          <div className="mt-16 max-w-2xl mx-auto rounded-[20px] border border-slate-200 bg-white px-8 py-10 text-center">
            <p className="text-lg text-slate-900 font-semibold mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
              Ready to book your free strategy call?
            </p>
            <p className="text-slate-600 text-sm mb-6" style={{ fontFamily: "var(--font-barlow)" }}>
              Pick a time that works for you. No pressure, no commitment.
            </p>
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </div>
        </div>
      </div>

      {/* Client Stories: real partner journeys, not just testimonials */}
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
                <div className="h-full flex flex-col bg-white border border-slate-200 shadow-sm rounded-[20px] p-7 transition-colors hover:border-teal-300">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-3xl lg:text-4xl font-bold text-teal-600" style={{ fontFamily: "var(--font-montserrat)" }}>{story.figure}</span>
                    <span className="text-sm text-slate-500" style={{ fontFamily: "var(--font-barlow)" }}>in {story.timeframe}</span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-slate-900 mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>{story.headline}</h3>
                  <p className="text-base lg:text-lg text-slate-600 leading-relaxed mb-5 flex-grow" style={{ fontFamily: "var(--font-barlow)" }}>&ldquo;{story.quote}&rdquo;</p>
                  <p className="text-sm font-semibold text-slate-900" style={{ fontFamily: "var(--font-barlow)" }}>{story.name}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs leading-relaxed max-w-3xl mx-auto mt-10" style={{ fontFamily: "var(--font-barlow)" }}>
            {proofDisclaimer}
          </p>
        </div>
      </section>

      {/* WHY ECOM SHARKS */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>Why ECOM SHARKS</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Why ECOM SHARKS?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-[20px] border border-slate-200 bg-white p-7">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-montserrat)" }}>
                Build It Yourself
              </h3>
              <ul className="space-y-3">
                {[
                  'Find products yourself',
                  'Build your own store',
                  'Learn ecommerce as you go',
                  'Run your own marketing',
                  'Handle suppliers and fulfillment',
                  'Monitor and optimize everything',
                ].map((row) => (
                  <li key={row} className="flex items-start gap-3 text-base lg:text-lg text-slate-600" style={{ fontFamily: "var(--font-barlow)" }}>
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    {row}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] border border-teal-300 bg-teal-50 p-7">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-montserrat)" }}>
                ECOM SHARKS
              </h3>
              <ul className="space-y-3">
                {[
                  'Product research managed',
                  'Store built and launched',
                  'Experienced team manages operations',
                  'Marketing managed',
                  'Fulfillment and support managed',
                  'Performance tracked and optimized',
                ].map((row) => (
                  <li key={row} className="flex items-start gap-3 text-base lg:text-lg text-slate-900 font-medium" style={{ fontFamily: "var(--font-barlow)" }}>
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-slate-900 font-semibold text-xl lg:text-3xl mt-12" style={{ fontFamily: "var(--font-montserrat)" }}>
            You own it. <span className="text-teal-600">We run it.</span>
          </p>
          <div className="text-center mt-9">
            <CtaButton onClick={scrollToCalendly}>See How It Works</CtaButton>
          </div>
        </div>
      </section>

      {/* RISK */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>Risk</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              What Are The Risks?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-[20px] border border-slate-200 bg-white p-7">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-montserrat)" }}>
                Risk
              </h3>
              <ul className="space-y-3">
                {[
                  'Product underperformance',
                  'Wasted marketing spend',
                  'Operational complexity',
                  'Lack of visibility',
                  'Changing market conditions',
                ].map((row) => (
                  <li key={row} className="flex items-start gap-3 text-base lg:text-lg text-slate-600" style={{ fontFamily: "var(--font-barlow)" }}>
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    {row}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] border border-teal-300 bg-teal-50 p-7">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-montserrat)" }}>
                How ECOM SHARKS Manages It
              </h3>
              <ul className="space-y-3">
                {[
                  { text: 'Products researched and evaluated', warn: false },
                  { text: 'Campaigns monitored and optimized', warn: false },
                  { text: 'Fulfillment and support managed', warn: false },
                  { text: 'Performance reporting provided', warn: false },
                  { text: 'Results vary, and no specific outcome is guaranteed', warn: true },
                ].map((row) => (
                  <li key={row.text} className={`flex items-start gap-3 text-base lg:text-lg ${row.warn ? 'text-amber-700' : 'text-slate-900 font-medium'}`} style={{ fontFamily: "var(--font-barlow)" }}>
                    <span className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full mt-0.5 ${row.warn ? 'bg-amber-100 text-amber-600' : 'bg-teal-500 text-white'}`}>
                      {row.warn ? <AlertTriangle className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                    </span>
                    {row.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-slate-900 font-semibold text-lg lg:text-2xl mt-12 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-montserrat)" }}>
            No business is risk-free. Know the risks. Understand the model. Make an informed decision.
          </p>
        </div>
      </section>

      {/* IS THIS FOR YOU? two-column qualification */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <Reveal className="text-center mb-12">
            <SectionEyebrow>Is This For You?</SectionEyebrow>
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Is This Model Right For You?
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-[20px] border border-teal-300 bg-teal-50 p-7">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-montserrat)" }}>
                A Good Fit If You…
              </h3>
              <ul className="space-y-3">
                {[
                  'Have capital available for a business investment',
                  'Want ecommerce ownership without managing daily operations',
                  'Understand that business performance varies',
                  'Value transparency around how the business operates',
                  'Prefer a professionally managed model',
                ].map((row) => (
                  <li key={row} className="flex items-start gap-3 text-base lg:text-lg text-slate-900 font-medium" style={{ fontFamily: "var(--font-barlow)" }}>
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    {row}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[20px] border border-slate-200 bg-white p-7">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-5" style={{ fontFamily: "var(--font-montserrat)" }}>
                Not A Fit If You…
              </h3>
              <ul className="space-y-3">
                {[
                  'Are looking for guaranteed income',
                  'Expect immediate profits',
                  'Want a completely risk-free investment',
                  'Are unwilling to provide the required capital or involvement',
                  'Expect identical results regardless of market conditions',
                ].map((row) => (
                  <li key={row} className="flex items-start gap-3 text-base lg:text-lg text-slate-600" style={{ fontFamily: "var(--font-barlow)" }}>
                    <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-400 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </span>
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-slate-600 text-lg lg:text-xl mt-12 max-w-3xl mx-auto" style={{ fontFamily: "var(--font-barlow)" }}>
            The qualification process exists to determine whether this model actually makes sense for you.
          </p>
          <div className="text-center mt-9">
            <CtaButton onClick={scrollToCalendly}>{applyCtaContent.ctaText}</CtaButton>
          </div>
        </div>
      </section>

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

      {/* FINAL CTA */}
      <section className="py-16 lg:py-24 bg-white border-t border-slate-200 relative overflow-hidden">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] bg-teal-200/40 rounded-full blur-3xl" />
        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <Reveal className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-5 leading-tight" style={{ fontFamily: "var(--font-montserrat)" }}>
              Ready To Invest?
              <br />
              <span className="text-teal-600">Know What You&apos;re Buying First.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-slate-700 mb-8" style={{ fontFamily: "var(--font-barlow)" }}>
              Limited strategy calls available.
            </p>
            <div className="max-w-md mx-auto space-y-4 text-left mb-8 bg-white border border-slate-200 shadow-sm rounded-[20px] px-6 py-6">
              <p className="text-lg lg:text-xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-montserrat)" }}>
                In one call, we&apos;ll cover:
              </p>
              {[
                'How the model works',
                'What you own',
                'What you invest',
                'What we manage',
                "Whether you're a fit",
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
              If it&apos;s not right for you, we&apos;ll tell you.
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
    </>
  );

  const pageShellClass = 'w-full min-h-screen bg-white text-slate-700 overflow-x-hidden';

  if (part === 'hero') {
    return <div className={pageShellClass}>{heroSection}</div>;
  }

  if (part === 'after-calendly') {
    return <div className={pageShellClass}>{afterCalendlySection}</div>;
  }

  return (
    <div className={pageShellClass}>
      {heroSection}
      {calendlySection}
      {afterCalendlySection}
    </div>
  );
}
