'use client';

import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Image assets for the Owners/CTA section.
const imgPattern = "/images/pattern-bg.png";
const imgLeftHand = "/images/owner-hand-gesture.png";
const imgRightHand = "/images/owner-hand-writing.png";
const imgTikTokLogo = "/images/tiktok-logo.png";
const imgBgShape = "/images/bg-rectangle-2.svg"; 
const imgPhoneIcon = "/images/header-phone-icon.svg"; 
const imgArrowIcon = "/images/arrow-icon-4.svg";

export default function Owners() {
  const controls = useAnimation();
  
  // Set triggerOnce to true for better performance - animations only run once
  const [ref, inView] = useInView({
    triggerOnce: true, // Changed to true for better performance
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

  // Animate in when inView is true
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // Memoized animation variants for better performance
  const containerVariants: Variants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }), []);

  // Optimized spring animation variants
  const leftVariants: Variants = useMemo(() => ({
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 25,
        mass: 1,
      },
    },
  }), []);

  const rightVariants: Variants = useMemo(() => ({
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 25,
        mass: 1,
      },
    },
  }), []);

  // Memoized hand animation variants
  const leftHandVariants: Variants = useMemo(() => ({
    hidden: { x: -200, rotate: -30, opacity: 0 },
    visible: {
      x: 0,
      rotate: 12,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: 0.3,
      },
    },
  }), []);

  const rightHandVariants: Variants = useMemo(() => ({
    hidden: { x: 200, rotate: 0, opacity: 0 },
    visible: {
      x: 0,
      rotate: 12,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: 0.5,
      },
    },
  }), []);

  return (
    // Main wrapper to center the 1920px canvas.
    <div ref={ref} className="w-full bg-white flex justify-center">
      
      {/* 1920px container with overflow hidden to prevent scrollbars. */}
      <div className="relative w-full max-w-[1920px] overflow-hidden">
        
        {/* Layer 1: Background Shape & Pattern */}
        <div className="absolute inset-0 z-0">
          {/* Flipped background shape to place white cutout at the TOP right */}
          <div className="w-full h-full transform scale-y-[-1]">
            <Image 
              src={imgBgShape} 
              alt="Teal background shape" 
              fill 
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              loading="lazy"
              priority={false}
            />
          </div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{ backgroundImage: `url('${imgPattern}')` }}
          />
        </div>

        {/* Layer 2: Decorative Images (Hands, Logo) */}
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          variants={rightVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Left Hand */}
          <motion.div 
            className="absolute bottom-0 -left-22 w-[200px] h-[206px] lg:w-[400px] lg:h-[412px]"
            variants={leftHandVariants}
            initial="hidden"
            animate={controls}
          >
            <Image 
              src={imgLeftHand} 
              alt="OK hand gesture" 
              fill 
              style={{ objectFit: 'contain' }}
              loading="lazy"
              priority={false}
            />
          </motion.div>
          {/* Hand is smaller, repositioned, and rotated diagonally. */}
            {/* TikTok Logo position adjusted relative to the new hand position */}
            <div className="absolute top-[28%] right-[29%] w-[100px] h-[100px] lg:w-[200px] lg:h-[200px]">
               <Image 
                 src={imgTikTokLogo} 
                 alt="TikTok Logo" 
                 fill 
                 style={{ objectFit: 'contain' }}
                 loading="lazy"
                 priority={false}
               />
            </div>
          <motion.div 
            className="absolute -top-16 -right-20 w-[300px] h-[275px] lg:w-[600px] lg:h-[550px]"
            variants={rightHandVariants}
            initial="hidden"
            animate={controls}
          >
            <Image 
              src={imgRightHand} 
              alt="Hand writing" 
              fill 
              style={{ objectFit: 'contain' }}
              loading="lazy"
              priority={false}
            />
          </motion.div>
        </motion.div>

        {/* Layer 3: Content */}
        <motion.div 
          className="relative z-20 container mx-auto px-5 lg:px-20 py-16 lg:py-0"
          variants={leftVariants}
          initial="hidden"
          animate={controls}
        >
          {/* THE FIX: A 12-column grid allows for very fine control. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[400px] lg:min-h-[600px] items-center">
            
            {/* This invisible spacer now only takes up 2 of 12 columns, pushing the content slightly left. */}
            <div className="hidden lg:block lg:col-span-2"></div> 
            
            {/* The content now occupies a larger span, starting further to the left. */}
            <div className="lg:col-span-7 text-white">
              <h1 
                className="text-4xl lg:text-7xl xl:text-8xl font-semibold leading-tight lg:leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                For Ecommerce Owners
              </h1>
              <p 
                className="mt-4 lg:mt-6 text-base lg:text-xl xl:text-2xl leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                At Ecom Sharkss, we understand the challenges you <br className="hidden lg:block"/> face  in today's competitive digital marketplace...
              </p>
              <div className="mt-8 lg:mt-12 flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-x-12 lg:gap-y-6">
                {/* Phone Number */}
                <div className="flex items-center gap-3 lg:gap-4">
                  <Image 
                    src={imgPhoneIcon} 
                    alt="Phone" 
                    width={48} 
                    height={48} 
                    className="lg:w-16 lg:h-16"
                    loading="lazy"
                  />
                  <span 
                    className="text-2xl lg:text-4xl xl:text-5xl font-semibold tracking-wider"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    (469) 480-7938
                  </span>
                </div>
                {/* Get a Quote Button */}
                <button 
                  className="group flex items-center justify-center gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full py-2.5 pl-6 pr-2 shadow-lg overflow-hidden relative w-full lg:w-auto"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({
                        url: 'https://calendly.com/ecomsharkss-info/30min',
                        onEventScheduled: function(e: any) {
                          // Redirect to thank you page when appointment is scheduled
                          window.location.href = '/thank-you';
                        }
                      });
                    }
                  }}
                >
                  <span 
                    className="font-semibold text-base lg:text-lg text-[#063f4a] relative z-10"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Get a Quote
                  </span>
                  <span className="bg-white rounded-full p-2.5 flex items-center justify-center w-10 h-10 relative z-10">
                    <Image 
                      src={imgArrowIcon} 
                      alt="arrow icon" 
                      width={20} 
                      height={20} 
                      className="lg:w-6 lg:h-6"
                      loading="lazy"
                    />
                  </span>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}