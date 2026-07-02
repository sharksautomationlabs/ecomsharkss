'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Calendar } from 'lucide-react';
import EcomWealthFAQ from '../components/EcomWealthFAQ';
import { precallFaqItems } from '../utils/ecomwealthContent';

export default function ThanksPage() {
  const [userName, setUserName] = useState('');
  const [icsLink, setIcsLink] = useState<string | null>(null);

  const heroControls = useAnimation();
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserName(params.get('Name') || params.get('name') || '');
    setIcsLink(params.get('ics_link') || params.get('icslink') || null);
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
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  const prepareChecklist = [
    { text: 'Double-Check Your Phone Number: Make sure the number you provided is correct and can receive calls.' },
    { text: 'Be Ready to Answer: At your scheduled time, expect a call from our team. If you miss it, No-Shows will NOT be rescheduled.' },
    { text: 'Come Prepared: Be in a quiet environment and prepare any questions you may have.' },
  ];

  return (
    <div className="w-full bg-white overflow-x-hidden">

      {/* ============ HERO ============ */}
      <div ref={heroRef} className="relative bg-[#052126] pt-6 lg:pt-8 pb-20 lg:pb-24 overflow-hidden">
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-[#35c4dd]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-[#063f4a]/50 rounded-full blur-3xl" />

        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <motion.div initial="hidden" animate={heroControls} variants={containerVariants} className="max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} className="mb-2 flex justify-center">
              <Link href="/" className="inline-block">
                <div className="relative w-[140px] h-[95px] lg:w-[200px] lg:h-[130px]">
                  <Image src="/images/quote-logo.png" alt="ECOM SHARKS" fill className="object-contain" priority />
                </div>
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="inline-block bg-[#35c4dd] text-[#063f4a] font-bold py-3 px-5 lg:py-4 lg:px-6 rounded-full border-2 border-[#35c4dd]/80 mb-8"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              <span className="text-lg md:text-2xl lg:text-3xl">
                CONGRATS{userName ? `, ${userName}` : ''}! Your Call Has Been Booked!
              </span>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Follow the steps below to confirm your call.
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="text-xl lg:text-3xl font-bold text-white text-center mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Step 1: Click The Button Below To Add The Event To Your Calendar
            </motion.h2>
            <motion.div variants={fadeInUp} className="flex justify-center mb-12">
              <button
                type="button"
                onClick={handleAddToCalendar}
                className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-white/10 hover:bg-white/15 border-2 border-[#35c4dd]/60 rounded-2xl py-5 px-6 text-white font-bold transition-all shadow-xl hover:shadow-[#35c4dd]/20 text-lg lg:text-xl"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                <Calendar className="w-7 h-7 text-[#35c4dd]" />
                Add The Event To Your Calendar
              </button>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-xl lg:text-3xl font-bold text-white text-center mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Step 2: Watch This Short Video <span className="text-[#35c4dd]">(3 Minutes)</span>
            </motion.h2>
            <motion.div variants={fadeInUp} className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/10" style={{ paddingBottom: '56.25%' }}>
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
              className="text-xl lg:text-3xl font-bold text-white text-center mb-6 mt-12"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Watch the 2nd video
            </motion.h2>
            <motion.div variants={fadeInUp} className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl ring-2 ring-white/10" style={{ paddingBottom: '56.25%' }}>
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
      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#063f4a] text-center mb-12"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Step 3: Go Through Our Frequently Asked Questions Below
            </h2>
            <EcomWealthFAQ items={precallFaqItems} />
          </div>
        </div>
      </div>

      {/* ============ PARTNER STORE RESULTS (above reviews) ============ */}
      <div className="py-16 lg:py-24 bg-[#bef4fe]/15">
        <div className="container mx-auto px-5 lg:px-20">
          <h2
            className="text-2xl lg:text-4xl font-bold text-[#063f4a] text-center mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Inside Look at Partner Store Results
          </h2>
          <p
            className="text-center text-[#2c2420]/70 mb-10 max-w-3xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            A glimpse into the sales activity clients have experienced using our fully managed, zero-inventory, Profit-First automation system. Individual results vary.
          </p>
          <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
            {[1, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#35c4dd]/20 aspect-[4/3] flex items-center justify-center">
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

      {/* ============ STEP 4: SEE WHAT OTHERS HAVE TO SAY ============ */}
      <div className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#063f4a] text-center mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Step 4: See What Others Have To Say
            </h2>
            <p
              className="text-center text-[#2c2420]/70 mb-10"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              First-hand experiences from clients, sharing what it&apos;s actually been like partnering with our team.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#35c4dd]/10 flex items-center justify-center min-h-[200px]">
                  <Image
                    src={`/images/reviews/review-${i}.png`}
                    alt={`Trustpilot review ${i}`}
                    width={480}
                    height={320}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <a
                href="https://www.trustpilot.com/review/ecomsharkss.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#35c4dd] hover:text-[#2bb3cb] font-semibold transition-colors"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                See all reviews on Trustpilot →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============ STEP 4: PREPARE FOR YOUR CALL ============ */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-3xl mx-auto">
            <h2
              className="text-2xl lg:text-4xl font-bold text-[#063f4a] text-center mb-10"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Step 5: Prepare For Your Call
            </h2>
            <div className="space-y-4">
              {prepareChecklist.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle className="w-6 h-6 text-[#35c4dd] shrink-0 mt-0.5" />
                  <p className="text-[#2c2420]/80 text-base lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ FINAL CTA ============ */}
      <div className="py-16 lg:py-24 bg-gradient-to-b from-[#063f4a] to-[#052126]">
        <div className="container mx-auto px-5 lg:px-20 text-center">
          <h2
            className="text-2xl lg:text-4xl font-bold text-white mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            We Look Forward To Seeing You On The Call!
          </h2>
          <Link
            href="/"
            className="inline-block text-[#35c4dd] hover:text-[#bef4fe] font-medium transition-colors"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Back to Homepage
          </Link>
        </div>
      </div>

      {/* ============ FOOTER ============ */}
      <div className="bg-[#052126] border-t border-white/10 py-10 lg:py-14">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-[#35c4dd] text-sm transition-colors" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/contact" className="text-gray-400 hover:text-[#35c4dd] text-sm transition-colors" style={{ fontFamily: "'Barlow', sans-serif" }}>
                Contact Us
              </Link>
            </div>
            <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
              ECOM SHARKS &copy; {new Date().getFullYear()}. All Rights Reserved.
            </p>
            <p className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              ECOM SHARKS provides e-commerce management services. We do not guarantee income or specific results. Individual results vary. Testimonials reflect real experiences but are not guarantees. By using this site, you acknowledge that you are responsible for your decisions and outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
