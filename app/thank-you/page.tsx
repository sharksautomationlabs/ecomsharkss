'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Calendar } from 'lucide-react';
import EcomWealthFAQ from '@/components/EcomWealthFAQ';
import { FunnelReviewCardsGrid } from '@/components/PlatformReviewsSection';
import { precallFaqItems } from '@/lib/ecomwealthContent';
import {
  FUNNEL_BRAND_NAME,
  FUNNEL_CONTACT_EMAIL,
  FUNNEL_CONTACT_MAILTO,
  FUNNEL_CONTACT_PHONE_DISPLAY,
  FUNNEL_CONTACT_PHONE_TEL,
  FUNNEL_LOGO_SRC,
} from '@/lib/funnelBrand';

type FbqWindow = Window & { fbq?: (...args: unknown[]) => void };

export default function ThanksPage() {
  const [userName, setUserName] = useState('');
  const [icsLink, setIcsLink] = useState<string | null>(null);

  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserName(params.get('Name') || params.get('name') || '');
    setIcsLink(params.get('ics_link') || params.get('icslink') || null);
    // Fire Lead conversion event for Meta Pixel
    (window as FbqWindow).fbq?.('track', 'Lead');
  }, []);

  const handleAddToCalendar = () => {
    if (icsLink) {
      window.open(decodeURIComponent(icsLink), '_blank');
    } else {
      window.open('https://calendar.google.com', '_blank');
    }
  };

  useEffect(() => { if (heroInView) heroControls.start('visible'); }, [heroControls, heroInView]);

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.035, delayChildren: 0 } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 26 } },
  };

  const prepareChecklist = [
    { text: 'Double-Check Your Phone Number: Make sure the number you provided is correct and can receive calls.' },
    { text: 'Be Ready to Answer: At your scheduled time, expect a call from our team. If you miss it, No-Shows will NOT be rescheduled.' },
    { text: 'Come Prepared: Be in a quiet environment and prepare any questions you may have.' },
  ];

  return (
    <div className="w-full min-h-screen bg-white text-slate-700 overflow-x-hidden">

      {/* ============ HERO ============ */}
      <div ref={heroRef} className="relative bg-white pt-6 lg:pt-8 pb-20 lg:pb-24 overflow-hidden border-b border-slate-200">
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-teal-100/50 rounded-full blur-3xl" />

        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <motion.div initial="hidden" animate={heroControls} variants={containerVariants} className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-2 flex justify-center">
              <Link href="/" className="inline-block">
                <div className="relative w-[160px] h-[52px] lg:w-[220px] lg:h-[72px]">
                  <Image src={FUNNEL_LOGO_SRC} alt={FUNNEL_BRAND_NAME} fill className="object-contain object-center" priority sizes="(max-width: 1024px) 160px, 220px" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="inline-block bg-teal-500 text-white font-bold py-3 px-5 lg:py-4 lg:px-6 rounded-full border-2 border-teal-500 mb-8"
            >
              <span className="text-2xl md:text-4xl lg:text-5xl">
                CONGRATS{userName ? `, ${userName}` : ''}! Your Call Has Been Booked!
              </span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10"
            >
              Follow the steps below to confirm your call.
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-slate-900 text-center mb-6"
            >
              Step 1: Add the call to your calendar
            </motion.h2>
            <motion.div variants={fadeInUp} className="flex justify-center mb-12">
              <button
                type="button"
                onClick={handleAddToCalendar}
                className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-white hover:bg-slate-50 border-2 border-teal-300 rounded-2xl py-5 px-6 text-slate-900 font-bold transition-all shadow-md hover:shadow-teal-500/20 text-xl lg:text-2xl"
              >
                <Calendar className="w-7 h-7 text-teal-600" />
                Add The Event To Your Calendar
              </button>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-slate-900 text-center mb-6"
            >
              Step 2: Watch the 3-minute prep video
            </motion.h2>
            <motion.div variants={fadeInUp} className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/PkzqxZQwK_E"
                title="How to Get the Most Out of Our Call"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl lg:text-5xl font-bold text-slate-900 text-center mb-6 mt-12"
            >
              Step 3: Then watch the results walkthrough
            </motion.h2>
            <motion.div variants={fadeInUp} className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-200" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ZPY3hkj7xSE"
                title="Client results - How our clients hit $4,000+ per month"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============ STEP 2: FAQ ============ */}
      <div className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 text-center mb-12 tracking-tight">
              Step 4: Read the FAQs—so there are no surprises
            </h2>
            <EcomWealthFAQ items={precallFaqItems} />
          </div>
        </div>
      </div>

      {/* ============ PARTNER STORE RESULTS (above reviews) ============ */}
      <div className="py-16 lg:py-24 bg-white border-y border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 text-center mb-4 tracking-tight">
            Partner store snapshots
          </h2>
          <p className="text-center text-slate-600 text-lg lg:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            A glimpse into the sales activity clients have experienced using our fully managed, zero-inventory, Profit-First automation system. Individual results vary.
          </p>
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {[1, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 aspect-[4/3] flex items-center justify-center">
                <Image
                  src={`/images/thank-you-results/result-${i}.png`}
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
        </div>
      </div>

      {/* ============ STEP 5: SEE WHAT OTHERS HAVE TO SAY ============ */}
      <div className="py-16 lg:py-24 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 text-center mb-6 tracking-tight">
              Step 5: See what other partners experienced
            </h2>
            <p className="text-center text-slate-600 text-lg lg:text-xl mb-10 leading-relaxed">
              First-hand experiences from clients, sharing what it&apos;s actually been like partnering with our team.
            </p>
            <FunnelReviewCardsGrid />
          </div>
        </div>
      </div>

      {/* ============ STEP 4: PREPARE FOR YOUR CALL ============ */}
      <div className="py-16 lg:py-24 bg-white border-y border-slate-200">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 text-center mb-10 tracking-tight">
              Step 6: Show up ready (quick checklist)
            </h2>
            <div className="space-y-4">
              {prepareChecklist.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-lg lg:text-xl">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ FINAL CTA ============ */}
      <div className="py-16 lg:py-24 bg-gradient-to-b from-teal-50 to-white border-t border-slate-200">
        <div className="container mx-auto px-5 lg:px-20 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            We’re ready when you are—see you on the call
          </h2>
          <Link
            href="/"
            className="inline-block text-teal-600 hover:text-teal-700 font-medium transition-colors"
          >
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <div className="bg-slate-50 border-t border-slate-200 py-10 lg:py-14">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Link href="/privacy-policy" className="text-slate-500 hover:text-teal-600 text-sm transition-colors">
                Privacy Policy
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/contact" className="text-slate-500 hover:text-teal-600 text-sm transition-colors">
                Contact Us
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-8 mb-6">
              <a href={FUNNEL_CONTACT_MAILTO} className="text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors">
                {FUNNEL_CONTACT_EMAIL}
              </a>
              <a href={FUNNEL_CONTACT_PHONE_TEL} className="text-slate-900 font-semibold text-sm hover:text-teal-600 transition-colors">
                {FUNNEL_CONTACT_PHONE_DISPLAY}
              </a>
            </div>
            <p className="text-slate-500 text-sm mb-6">
              {FUNNEL_BRAND_NAME} &copy; {new Date().getFullYear()}. All Rights Reserved.
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              {FUNNEL_BRAND_NAME} provides e-commerce management services. We do not guarantee income or specific results. Individual results vary. Testimonials reflect real experiences but are not guarantees. By using this site, you acknowledge that you are responsible for your decisions and outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
