'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Play, Mail, Users, CheckCircle, Star, ArrowRight, Phone } from 'lucide-react';

export default function EcomAutomationPage() {
  const [userName, setUserName] = useState('');

  // Animation controls
  const heroControls = useAnimation();
  const stepsControls = useAnimation();
  const video1Controls = useAnimation();
  const video2Controls = useAnimation();
  const testimonialsControls = useAnimation();
  const ctaControls = useAnimation();
  const footerControls = useAnimation();

  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [video1Ref, video1InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [video2Ref, video2InView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [footerRef, footerInView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    // Extract name from URL params
    const params = new URLSearchParams(window.location.search);
    const name = params.get('Name') || params.get('name') || '';
    setUserName(name);
  }, []);

  useEffect(() => { if (heroInView) heroControls.start('visible'); }, [heroControls, heroInView]);
  useEffect(() => { if (stepsInView) stepsControls.start('visible'); }, [stepsControls, stepsInView]);
  useEffect(() => { if (video1InView) video1Controls.start('visible'); }, [video1Controls, video1InView]);
  useEffect(() => { if (video2InView) video2Controls.start('visible'); }, [video2Controls, video2InView]);
  useEffect(() => { if (testimonialsInView) testimonialsControls.start('visible'); }, [testimonialsControls, testimonialsInView]);
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

  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1, scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const stepsData = [
    {
      step: 1,
      icon: <Calendar className="w-8 h-8" />,
      title: 'Add The Event To Your Calendar',
      description: 'Click the button below to add the strategy call to your calendar so you never miss it.',
      color: 'bg-[#35c4dd]',
      hasButton: true,
      buttonText: 'Add The Event To Your Calendar',
    },
    {
      step: 2,
      icon: <Play className="w-8 h-8" />,
      title: 'Watch The Short Video Below',
      description: 'Watch the confirmation video below to understand what to expect and how to prepare for maximum results.',
      color: 'bg-[#063f4a]',
    },
    {
      step: 3,
      icon: <Mail className="w-8 h-8" />,
      title: 'Confirm Your Call via Email',
      description: 'Check your inbox and click "YES" to confirm your call so it doesn\'t get cancelled.',
      color: 'bg-[#35c4dd]',
    },
    {
      step: 4,
      icon: <Users className="w-8 h-8" />,
      title: 'See What to Expect When You Partner With Us',
      description: 'Watch the second video to see exactly how our clients are building successful e-commerce businesses.',
      color: 'bg-[#063f4a]',
    },
  ];

  const testimonials = [
    { name: 'Sarah M.', role: 'Amazon Seller', text: 'ECOM SHARKS completely transformed my Amazon business. Within 60 days, I was seeing consistent sales and their team handled everything.', rating: 5 },
    { name: 'James K.', role: 'Shopify Store Owner', text: 'I was skeptical at first, but the results speak for themselves. My Shopify store went from zero to $5K/month in just 3 months.', rating: 5 },
    { name: 'Maria L.', role: 'TikTok Shop Seller', text: 'The TikTok Shop setup was seamless. Their automation tools and strategy helped me scale faster than I ever imagined.', rating: 5 },
    { name: 'David R.', role: 'Walmart Marketplace', text: 'Best investment I\'ve made. The Walmart marketplace was intimidating but ECOM SHARKS made it simple and profitable.', rating: 5 },
    { name: 'Priya S.', role: 'Multi-Platform Seller', text: 'Running stores on Amazon and TikTok simultaneously seemed impossible until I partnered with ECOM SHARKS. Now both are thriving!', rating: 5 },
    { name: 'Michael T.', role: 'E-commerce Entrepreneur', text: 'From strategy call to first sale in under 30 days. The team is responsive, knowledgeable, and truly cares about your success.', rating: 5 },
  ];

  return (
    <div className="w-full bg-white overflow-x-hidden">

      {/* ============ TOP NAV BAR ============ */}
      <div className="w-full bg-[#052126] py-3 px-5 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-[80px] h-[55px] lg:w-[120px] lg:h-[85px] relative">
              <Image src="/images/quote-logo.png" alt="ECOM SHARKS" fill className="object-contain" />
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:4694807938" className="flex items-center gap-2 text-white text-sm hover:text-[#35c4dd] transition-colors" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <Phone className="w-4 h-4" />
              <span>(469) 480-7938</span>
            </a>
            <a href="mailto:info@ecomsharkss.com" className="flex items-center gap-2 text-white text-sm hover:text-[#35c4dd] transition-colors" style={{ fontFamily: "'Barlow', sans-serif" }}>
              <Mail className="w-4 h-4" />
              <span>info@ecomsharkss.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ============ HERO / CONGRATS SECTION ============ */}
      <div ref={heroRef} className="relative bg-gradient-to-br from-[#052126] via-[#063f4a] to-[#052126] py-16 lg:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#35c4dd]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#35c4dd]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <motion.div
            initial="hidden"
            animate={heroControls}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Congrats Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 bg-[#35c4dd]/20 border border-[#35c4dd]/40 text-[#35c4dd] px-6 py-2 rounded-full text-sm lg:text-base font-semibold" style={{ fontFamily: "'Barlow', sans-serif" }}>
                <CheckCircle className="w-5 h-5" />
                Strategy Call Confirmed
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              CONGRATS{userName ? `, ${userName}` : ''}! <br />
              <span className="text-[#35c4dd]">Your Strategy Call Is Booked...</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Follow the steps below to confirm your call event and prepare for your journey to building a hands-off e-commerce business.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="w-8 h-12 border-2 border-[#35c4dd]/50 rounded-full flex justify-center pt-2">
                <motion.div
                  className="w-1.5 h-3 bg-[#35c4dd] rounded-full"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============ 4 STEPS SECTION ============ */}
      <div ref={stepsRef} className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={stepsControls}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-2xl lg:text-4xl font-bold text-[#063f4a] text-center mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Follow These Steps to Confirm Your Call
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-lg text-[#2c2420]/70 text-center mb-12 max-w-2xl mx-auto"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              Complete each step to make sure your strategy session goes smoothly.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {stepsData.map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeInUp}
                  className="relative group"
                >
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#35c4dd]/30 h-full">
                    {/* Step Number Badge */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`${step.color} text-white w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                        {step.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#35c4dd] uppercase tracking-wider" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          Step {step.step}
                        </span>
                        <h3
                          className="text-lg lg:text-xl font-bold text-[#063f4a] mt-1"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                        >
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <p
                      className="text-sm lg:text-base text-[#2c2420]/70 leading-relaxed"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      {step.description}
                    </p>
                    {step.hasButton && (
                      <button
                        className="mt-5 w-full flex items-center justify-center gap-3 bg-[#35c4dd] hover:bg-[#2bb3cb] text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-sm lg:text-base"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        <Calendar className="w-5 h-5" />
                        {step.buttonText}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ VIDEO 1 — CONFIRM YOUR CALL ============ */}
      <div ref={video1Ref} className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={video1Controls}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-block bg-[#063f4a] text-[#35c4dd] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Step 2
              </span>
              <h2
                className="text-2xl lg:text-4xl font-bold text-[#063f4a] mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Watch This Video to <span className="text-[#35c4dd]">CONFIRM YOUR CALL</span>
              </h2>
              <p
                className="text-base lg:text-lg text-[#2c2420]/70 max-w-2xl mx-auto"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                This video will walk you through what to expect on the call and what you need to prepare, so we can get right to the details and not waste a single minute.
              </p>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <div className="relative rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
                {/* Background overlay */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#052126] to-[#063f4a]" />
                <div className="absolute inset-0 z-0 opacity-20">
                  <div className="absolute inset-0 bg-[url('/images/bi-vid.jpeg')] bg-cover bg-center" />
                </div>
                <div className="absolute inset-0 bg-[#052126]/70 z-[1]" />

                {/* Content */}
                <div className="relative z-10 p-6 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#35c4dd] w-10 h-10 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                    <h3
                      className="text-xl lg:text-2xl font-bold text-white"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      How to Get the Most Out of Our Call
                    </h3>
                  </div>

                  <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/PkzqxZQwK_E?si=VStYF-HeP5wcyBUB"
                      title="How to Get the Most Out of Our Call - Ecom Automation"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============ EMAIL CONFIRMATION STEP ============ */}
      <div className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-5 lg:px-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-[#063f4a] to-[#052126] rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-center shadow-2xl"
            >
              <div className="bg-[#35c4dd]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-[#35c4dd]" />
              </div>
              <h3
                className="text-xl lg:text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Step 3: Confirm Your Call via Email So It&apos;s Not Cancelled
              </h3>
              <p
                className="text-base lg:text-lg text-gray-300 max-w-xl mx-auto mb-6"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Check your inbox for the confirmation email and click <strong className="text-[#35c4dd]">&quot;YES&quot;</strong> to secure your spot. Unconfirmed calls may be cancelled.
              </p>
              <div className="bg-white/10 border border-white/20 rounded-xl p-6 max-w-md mx-auto">
                <p className="text-white text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Look for an email from <strong className="text-[#35c4dd]">ECOM SHARKS</strong> with the subject line containing your strategy call details.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ============ VIDEO 2 — WHAT TO EXPECT ============ */}
      <div ref={video2Ref} className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-5 lg:px-20">
          <motion.div
            initial="hidden"
            animate={video2Controls}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <span className="inline-block bg-[#35c4dd] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Step 4
              </span>
              <h2
                className="text-2xl lg:text-4xl font-bold text-[#063f4a] mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                See Exactly What to Expect <span className="text-[#35c4dd]">When You Partner With Us</span>
              </h2>
              <p
                className="text-base lg:text-lg text-[#2c2420]/70 max-w-2xl mx-auto"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                This video shows you the exact process our clients go through and how we help them build a profitable, hands-off e-commerce business.
              </p>
            </motion.div>

            <motion.div variants={fadeInScale}>
              <div className="relative rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden">
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#052126] to-[#063f4a]" />
                <div className="absolute inset-0 z-0 opacity-20">
                  <div className="absolute inset-0 bg-[url('/images/bi-vid.jpeg')] bg-cover bg-center" />
                </div>
                <div className="absolute inset-0 bg-[#052126]/70 z-[1]" />

                <div className="relative z-10 p-6 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#35c4dd] w-10 h-10 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3
                      className="text-xl lg:text-2xl font-bold text-white"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      How Our Clients Are Hitting $4,000+ a Month
                    </h3>
                  </div>

                  <div className="relative w-full bg-black rounded-xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.youtube.com/embed/3kE6P9VgPuc?si=gsdM9QvEVxgrUo3S"
                      title="How Our Clients Are Hitting $4,000 a Month - Ecom Automation"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </motion.div>
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
              <span className="inline-block bg-[#35c4dd]/20 border border-[#35c4dd]/40 text-[#35c4dd] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                Next Step
              </span>
              <h2
                className="text-2xl lg:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Let&apos;s Get You Caught Up on Everything About <span className="text-[#35c4dd]">Owning an E-Commerce Business</span>
              </h2>
              <p
                className="text-base lg:text-lg text-gray-400 max-w-2xl mx-auto"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Learn the fundamentals of what makes e-commerce automation work and how you can start earning passive income.
              </p>
            </div>

            <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/bigJBm1x1qE"
                title="Owning an E-Commerce Business - Ecom Automation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ TESTIMONIALS — CLIENT RESULTS ============ */}
      <div ref={testimonialsRef} className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
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
                Check Out What Our Clients Are Saying About <span className="text-[#35c4dd]">ECOM SHARKS</span>
              </h2>
              <p
                className="text-base lg:text-lg text-[#2c2420]/70 max-w-2xl mx-auto"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                Real results from real people who trusted us to build their e-commerce empires.
              </p>
            </motion.div>

            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="bg-white border border-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p
                    className="text-sm lg:text-base text-[#2c2420]/80 mb-4 leading-relaxed italic"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#35c4dd] to-[#063f4a] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#063f4a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{testimonial.name}</p>
                      <p className="text-xs text-[#2c2420]/60" style={{ fontFamily: "'Barlow', sans-serif" }}>{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Video Testimonials */}
            <motion.div variants={fadeInUp} className="text-center mb-8">
              <h3
                className="text-xl lg:text-2xl font-bold text-[#063f4a]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Video Testimonials From Our Partners
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeInScale}>
                <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/PkzqxZQwK_E"
                    title="Client Testimonial 1 - Ecom Automation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
              <motion.div variants={fadeInScale}>
                <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/3kE6P9VgPuc"
                    title="Client Testimonial 2 - Ecom Automation"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============ FINAL CTA ============ */}
      <div ref={ctaRef} className="py-16 lg:py-24 bg-gradient-to-br from-[#052126] via-[#063f4a] to-[#052126] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#35c4dd]/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-5 lg:px-20 relative z-10">
          <motion.div
            initial="hidden"
            animate={ctaControls}
            variants={containerVariants}
            className="max-w-3xl mx-auto text-center"
          >
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
                className="text-white/70 hover:text-[#35c4dd] font-medium transition-colors text-sm"
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
