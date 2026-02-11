'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Play, Mail, Users, CheckCircle, Star, ArrowRight, Phone, Shield, Clock, TrendingUp } from 'lucide-react';

export default function EcomAutomation2Page() {
  const [userName, setUserName] = useState('');

  // Animation controls
  const heroControls = useAnimation();
  const stepsControls = useAnimation();
  const video1Controls = useAnimation();
  const video2Controls = useAnimation();
  const testimonialsControls = useAnimation();
  const statsControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [video1Ref, video1InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [video2Ref, video2InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [footerRef, footerInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('Name') || params.get('name') || '';
    setUserName(name);
  }, []);

  useEffect(() => { if (heroInView) heroControls.start('visible'); }, [heroControls, heroInView]);
  useEffect(() => { if (stepsInView) stepsControls.start('visible'); }, [stepsControls, stepsInView]);
  useEffect(() => { if (video1InView) video1Controls.start('visible'); }, [video1Controls, video1InView]);
  useEffect(() => { if (video2InView) video2Controls.start('visible'); }, [video2Controls, video2InView]);
  useEffect(() => { if (testimonialsInView) testimonialsControls.start('visible'); }, [testimonialsControls, testimonialsInView]);
  useEffect(() => { if (statsInView) statsControls.start('visible'); }, [statsControls, statsInView]);
  useEffect(() => { if (ctaInView) ctaControls.start('visible'); }, [ctaControls, ctaInView]);
  useEffect(() => { if (footerInView) footerControls.start('visible'); }, [footerControls, footerInView]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const stepsData = [
    {
      step: 1,
      icon: <Calendar className="w-6 h-6" />,
      title: 'Add The Event To Your Calendar',
      description: 'Click below to save the strategy call to your calendar. Don\'t risk missing this opportunity.',
      hasButton: true,
      buttonText: 'Add To Calendar',
    },
    {
      step: 2,
      icon: <Play className="w-6 h-6" />,
      title: 'Watch The Confirmation Video',
      description: 'Watch the short video below to understand what to expect and how to come prepared.',
    },
    {
      step: 3,
      icon: <Mail className="w-6 h-6" />,
      title: 'Confirm Your Call via Email',
      description: 'Open the confirmation email and click "YES" so your call doesn\'t get cancelled.',
    },
    {
      step: 4,
      icon: <Users className="w-6 h-6" />,
      title: 'See What To Expect',
      description: 'Watch how our clients are building profitable e-commerce businesses with our help.',
    },
  ];

  const testimonials = [
    { name: 'Alex P.', role: 'Amazon FBA Seller', text: 'Within 45 days my store was generating consistent revenue. ECOM SHARKS delivered on every promise they made during our strategy call.', rating: 5 },
    { name: 'Jessica W.', role: 'TikTok Shop Owner', text: 'I had zero experience with TikTok selling. Their team set everything up and now I\'m making sales daily. Absolutely incredible service.', rating: 5 },
    { name: 'Robert C.', role: 'Shopify Entrepreneur', text: 'The hands-off approach is real. They manage my Shopify store end-to-end while I focus on my day job. Best decision I made this year.', rating: 5 },
    { name: 'Aisha M.', role: 'Multi-Channel Seller', text: 'Running Amazon and Walmart simultaneously was a dream that ECOM SHARKS made reality. Both stores profitable within 90 days.', rating: 5 },
    { name: 'Chris D.', role: 'E-commerce Investor', text: 'I\'ve worked with 3 other agencies before. ECOM SHARKS is the only one that actually delivered results. Night and day difference.', rating: 5 },
    { name: 'Nina G.', role: 'Walmart Seller', text: 'The Walmart marketplace seemed impossible to crack on my own. Their expertise got me approved and selling in record time.', rating: 5 },
  ];

  const stats = [
    { value: '500+', label: 'Active Stores Managed', icon: <TrendingUp className="w-6 h-6" /> },
    { value: '30', label: 'Days Average Setup', icon: <Clock className="w-6 h-6" /> },
    { value: '97%', label: 'Client Satisfaction', icon: <Star className="w-6 h-6" /> },
    { value: '24/7', label: 'Dedicated Support', icon: <Shield className="w-6 h-6" /> },
  ];

  return (
    <div className="w-full bg-white overflow-x-hidden">

      {/* ============ TOP NAV BAR ============ */}
      <div className="w-full bg-[#063f4a] py-3 px-5 lg:px-20 border-b border-[#35c4dd]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-[80px] h-[55px] lg:w-[120px] lg:h-[85px] relative">
              <Image src="/images/quote-logo.png" alt="ECOM SHARKS" fill className="object-contain" />
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:4694807938" className="flex items-center gap-2 text-white/80 hover:text-[#35c4dd] text-sm transition-colors" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <Phone className="w-4 h-4" />
              <span>(469) 480-7938</span>
            </a>
            <a href="mailto:info@ecomsharkss.com" className="flex items-center gap-2 text-white/80 hover:text-[#35c4dd] text-sm transition-colors" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <Mail className="w-4 h-4" />
              <span>info@ecomsharkss.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ============ HERO / CONGRATS SECTION ============ */}
      <div ref={heroRef} className="relative bg-[#052126] py-20 lg:py-32 overflow-hidden">
        {/* Animated background gradient circles */}
        <div className="absolute top-[-200px] right-[-100px] w-[500px] h-[500px] bg-[#35c4dd]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-[-150px] left-[-80px] w-[400px] h-[400px] bg-[#063f4a]/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#35c4dd]/3 rounded-full blur-3xl" />

        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <motion.div
            initial="hidden"
            animate={heroControls}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Success icon */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#35c4dd] to-[#2bb3cb] rounded-full shadow-lg shadow-[#35c4dd]/30">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              CONGRATS{userName ? `, ${userName}` : ''}!
            </motion.h1>

            <motion.div variants={fadeInUp}>
              <h2
                className="text-xl md:text-3xl lg:text-4xl font-semibold text-[#35c4dd] mb-8"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Your Strategy Call Is Booked...
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Follow the steps below to confirm your call event! This is the first step toward building your hands-off e-commerce business.
            </motion.p>

            {/* Divider line */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#35c4dd] to-transparent rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============ 4 STEPS — HORIZONTAL TIMELINE ============ */}
      <div ref={stepsRef} className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={stepsControls}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl lg:text-4xl font-bold text-[#063f4a] text-center mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Follow These <span className="text-[#35c4dd]">4 Simple Steps</span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-lg text-[#2c2420]/60 text-center mb-14 max-w-xl mx-auto"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Complete each step below to confirm your strategy session.
            </motion.p>

            {/* Steps as timeline */}
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-gradient-to-r from-[#35c4dd]/20 via-[#35c4dd] to-[#35c4dd]/20" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                {stepsData.map((step) => (
                  <motion.div
                    key={step.step}
                    variants={fadeInUp}
                    className="relative text-center"
                  >
                    {/* Step circle */}
                    <div className="relative z-10 mx-auto mb-5 w-20 h-20 bg-white border-4 border-[#35c4dd] rounded-full flex items-center justify-center shadow-lg">
                      <div className="bg-gradient-to-br from-[#35c4dd] to-[#063f4a] w-14 h-14 rounded-full flex items-center justify-center text-white">
                        {step.icon}
                      </div>
                    </div>

                    <span
                      className="inline-block text-xs font-bold text-[#35c4dd] uppercase tracking-widest mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      Step {step.step}
                    </span>
                    <h3
                      className="text-base lg:text-lg font-bold text-[#063f4a] mb-2 px-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm text-[#2c2420]/60 leading-relaxed px-2"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {step.description}
                    </p>
                    {step.hasButton && (
                      <button
                        className="mt-4 inline-flex items-center gap-2 bg-[#35c4dd] hover:bg-[#2bb3cb] text-white font-semibold py-2.5 px-5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        <Calendar className="w-4 h-4" />
                        {step.buttonText}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ VIDEO 1 — CONFIRM YOUR CALL ============ */}
      <div ref={video1Ref} className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={video1Controls}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Text side */}
              <motion.div variants={fadeInLeft} className="lg:col-span-2">
                <span className="inline-block bg-[#063f4a] text-[#35c4dd] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Step 2
                </span>
                <h2
                  className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  Watch This Video to <span className="text-[#35c4dd]">CONFIRM YOUR CALL</span>
                </h2>
                <p
                  className="text-sm lg:text-base text-[#2c2420]/70 leading-relaxed mb-6"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  This video will walk you through what to expect on the call and what you need to prepare, so we can get right to the details and not waste a single minute.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#35c4dd] rounded-full" />
                  <span className="text-sm text-[#063f4a] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>Duration: ~5 minutes</span>
                </div>
              </motion.div>

              {/* Video side */}
              <motion.div variants={fadeInRight} className="lg:col-span-3">
                <div className="relative rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#35c4dd]/20">
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#052126] to-[#063f4a]" />
                  <div className="absolute inset-0 bg-[#052126]/80 z-[1]" />

                  <div className="relative z-10 p-4 lg:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#35c4dd] w-8 h-8 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                      <h3
                        className="text-base lg:text-lg font-bold text-white"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        How to Get the Most Out of Our Call
                      </h3>
                    </div>

                    <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/PkzqxZQwK_E?si=VStYF-HeP5wcyBUB"
                        title="How to Get the Most Out of Our Call - Ecom Automation 2"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ EMAIL CONFIRMATION STEP ============ */}
      <div className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white border-2 border-[#35c4dd]/30 rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-xl overflow-hidden"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#35c4dd] via-[#063f4a] to-[#35c4dd]" />

              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="shrink-0">
                  <div className="bg-gradient-to-br from-[#063f4a] to-[#052126] w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg">
                    <Mail className="w-10 h-10 text-[#35c4dd]" />
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <h3
                    className="text-xl lg:text-2xl font-bold text-[#063f4a] mb-3"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    Step 3: Confirm Your Call via Email So It&apos;s Not Cancelled
                  </h3>
                  <p
                    className="text-sm lg:text-base text-[#2c2420]/70 leading-relaxed"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Check your inbox for the confirmation email and click <strong className="text-[#35c4dd]">&quot;YES&quot;</strong> to secure your spot.
                    Unconfirmed calls may be cancelled. Look for an email from <strong className="text-[#063f4a]">ECOM SHARKS</strong> with your strategy call details.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============ VIDEO 2 — WHAT TO EXPECT ============ */}
      <div ref={video2Ref} className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={video2Controls}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              {/* Video side (reversed) */}
              <motion.div variants={fadeInLeft} className="lg:col-span-3 order-2 lg:order-1">
                <div className="relative rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border-2 border-[#35c4dd]/20">
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#052126] to-[#063f4a]" />
                  <div className="absolute inset-0 bg-[#052126]/80 z-[1]" />

                  <div className="relative z-10 p-4 lg:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-[#35c4dd] w-8 h-8 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <h3
                        className="text-base lg:text-lg font-bold text-white"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                      >
                        How Our Clients Hit $4,000+/Month
                      </h3>
                    </div>

                    <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/3kE6P9VgPuc?si=gsdM9QvEVxgrUo3S"
                        title="How Our Clients Hit $4,000 a Month - Ecom Automation 2"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Text side (reversed) */}
              <motion.div variants={fadeInRight} className="lg:col-span-2 order-1 lg:order-2">
                <span className="inline-block bg-[#35c4dd] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Step 4
                </span>
                <h2
                  className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-4"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  See Exactly What to Expect <span className="text-[#35c4dd]">When You Partner With Us</span>
                </h2>
                <p
                  className="text-sm lg:text-base text-[#2c2420]/70 leading-relaxed mb-6"
                  style={{ fontFamily: "'Barlow', sans-serif" }}
                >
                  This video shows the exact process our clients go through and how we help them build a profitable, hands-off e-commerce business from scratch.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#35c4dd] shrink-0" />
                    <span className="text-sm text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>Full store setup in 30 days</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#35c4dd] shrink-0" />
                    <span className="text-sm text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#35c4dd] shrink-0" />
                    <span className="text-sm text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>Proven $4K+/month strategy</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ STATS BAR ============ */}
      <div ref={statsRef} className="py-12 lg:py-16 bg-gradient-to-r from-[#052126] via-[#063f4a] to-[#052126]">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={statsControls}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#35c4dd]/20 rounded-xl mb-3 text-[#35c4dd]">
                    {stat.icon}
                  </div>
                  <p
                    className="text-2xl lg:text-4xl font-bold text-white mb-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs lg:text-sm text-gray-400"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ NEXT STEP — ECOMMERCE OVERVIEW VIDEO ============ */}
      <div className="py-16 lg:py-24 bg-[#052126]">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 bg-[#35c4dd]/20 border border-[#35c4dd]/40 text-[#35c4dd] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                <TrendingUp className="w-4 h-4" />
                Next Step
              </span>
              <h2
                className="text-2xl lg:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Let&apos;s Get You Caught Up on <span className="text-[#35c4dd]">Owning an E-Commerce Business</span>
              </h2>
              <p
                className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Learn the fundamentals of what makes e-commerce automation work and how you can start earning passive income with a fully managed store.
              </p>
            </div>

            <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#35c4dd]/20" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/bigJBm1x1qE"
                title="Owning an E-Commerce Business - Ecom Automation 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ TESTIMONIALS — CLIENT RESULTS ============ */}
      <div ref={testimonialsRef} className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={testimonialsControls}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-12">
              <span className="inline-block bg-[#063f4a] text-[#35c4dd] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Last Step
              </span>
              <h2
                className="text-2xl lg:text-4xl font-bold text-[#063f4a] mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                What Our Clients Are Saying About <span className="text-[#35c4dd]">ECOM SHARKS</span>
              </h2>
              <p
                className="text-base lg:text-lg text-[#2c2420]/70 max-w-2xl mx-auto"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Real results from real people who trusted us to build their e-commerce empires.
              </p>
            </motion.div>

            {/* Testimonial Cards — Masonry style */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mb-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="break-inside-avoid mb-6"
                >
                  <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#35c4dd]/30">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p
                      className="text-sm text-[#2c2420]/80 mb-5 leading-relaxed"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#063f4a] to-[#35c4dd] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#063f4a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{testimonial.name}</p>
                        <p className="text-xs text-[#2c2420]/60" style={{ fontFamily: "'Barlow', sans-serif" }}>{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Video Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-xl lg:text-2xl font-bold text-[#063f4a] text-center mb-8"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Video Testimonials From Our Partners
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-xl border border-[#35c4dd]/20" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/PkzqxZQwK_E"
                    title="Client Testimonial 1 - Ecom Automation 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-xl border border-[#35c4dd]/20" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/3kE6P9VgPuc"
                    title="Client Testimonial 2 - Ecom Automation 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============ FINAL CTA ============ */}
      <div ref={ctaRef} className="py-16 lg:py-24 bg-gradient-to-b from-[#063f4a] to-[#052126] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#35c4dd]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#35c4dd]/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <motion.div
            initial="hidden"
            animate={ctaControls}
            variants={containerVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#35c4dd]/20 rounded-full mb-4">
                <ArrowRight className="w-8 h-8 text-[#35c4dd]" />
              </div>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-2xl lg:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Ready to Transform Your Business?
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl text-gray-300 mb-8 leading-relaxed"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              We&apos;re excited to speak with you and help you build your hands-off e-commerce business. See you on the call!
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:4694807938"
                className="group flex items-center justify-center gap-3 bg-[#35c4dd] hover:bg-[#2bb3cb] text-white font-semibold py-3.5 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                <Phone className="w-5 h-5" />
                Contact Us Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/"
                className="text-white/60 hover:text-[#35c4dd] font-medium transition-colors text-sm"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Back to Homepage
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============ FOOTER / DISCLAIMER ============ */}
      <div ref={footerRef} className="bg-[#052126] border-t border-white/10 py-10 lg:py-14">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={footerControls}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
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
            </motion.div>

            <motion.div variants={fadeInUp}>
              <p className="text-gray-600 text-xs leading-relaxed mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
                ECOM SHARKS provides e-commerce management services and business opportunities. We do not offer a &quot;get rich quick&quot; program or guaranteed money-making system. Success depends on economic uncertainties, market conditions, and platform-specific policies. Testimonials on this page are from real clients. The results you see on this page are not typical. Their experiences do not guarantee similar results. Individual results may vary based on your skills, experience, motivation, as well as other unforeseen factors. Your results may vary. Past performance does not guarantee future outcomes.
              </p>
              <p className="text-gray-600 text-xs leading-relaxed mb-4" style={{ fontFamily: "'Barlow', sans-serif" }}>
                All materials are the intellectual property of ECOM SHARKS and are protected by copyright. Duplication, reproduction, or distribution without permission is strictly prohibited. ECOM SHARKS may refer to or link to third-party content or services and is not responsible for such content.
              </p>
              <p className="text-gray-600 text-xs leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                *Based on performance data from active client accounts. All stores are fully set up and live within 30 days of the initial meeting. A store is considered &quot;set up&quot; once it is live and operational on the platform. On average, stores begin generating sales around day 60. Not every store will sell within 60 days, as results depend on adherence to the provided strategy, product selection, platform policies, and market conditions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

    </div>
  );
}
