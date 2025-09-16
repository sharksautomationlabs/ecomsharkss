'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Image assets for the Owners/CTA section.
const imgPattern = "/images/pattern-bg.png";
const imgLeftHand = "/images/owner-hand-gesture.png";
const imgRightHand = "/images/owner-hand-writing.png";
const imgTikTokLogo = "/images/tiktok-logo.png";
const imgBgShape = "/images/bg-rectangle-2.svg"; 
const imgPhoneIcon = "/images/phone-icon.svg"; 
const imgArrowIcon = "/images/arrow-icon-4.svg";

export default function Owners() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();
  
  // Set triggerOnce to false to allow re-triggering
  const [ref, inView] = useInView({
    triggerOnce: false, // Set to false to re-trigger animation
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate in when inView is true, and animate out when false
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // Reset to hidden state when out of view
    }
  }, [controls, inView]);
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Spring animation variants like Experts section
  const leftVariants: Variants = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

  const rightVariants: Variants = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

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
              layout="fill" 
              objectFit="cover" 
              objectPosition="center"
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
          <div 
            className="absolute bottom-0 -left-22 w-[400px] h-[412px] transition-all duration-1000 ease-out transform rotate-12"
            style={{ 
              transform: `rotate(${-scrollPosition * 0.1}deg)`
            }}
          >
            <Image src={imgLeftHand} alt="OK hand gesture" layout="fill" objectFit="contain" />
          </div>
          {/* Hand is smaller, repositioned, and rotated diagonally. */}
            {/* TikTok Logo position adjusted relative to the new hand position */}
            <div className="absolute top-[28%] right-[29%] w-[200px] h-[200px]">
               <Image src={imgTikTokLogo} alt="TikTok Logo" layout="fill" objectFit="contain" />
            </div>
          <div 
            className="absolute -top-16 -right-20 w-[600px] h-[550px] transition-all duration-1000 ease-out"
            style={{ 
              transform: `rotate(${12 + (scrollPosition * 0.1)}deg)`
            }}
          >
            <Image src={imgRightHand} alt="Hand writing" layout="fill" objectFit="contain" />
          </div>
        </motion.div>

        {/* Layer 3: Content */}
        <motion.div 
          className="relative z-20 container mx-auto px-20"
          variants={leftVariants}
          initial="hidden"
          animate={controls}
        >
          {/* THE FIX: A 12-column grid allows for very fine control. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[600px] items-center">
            
            {/* This invisible spacer now only takes up 2 of 12 columns, pushing the content slightly left. */}
            <div className="hidden lg:block lg:col-span-2"></div> 
            
            {/* The content now occupies a larger span, starting further to the left. */}
            <div className="lg:col-span-7 text-white">
              <h1 
                className="text-7xl lg:text-8xl font-semibold leading-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                For Ecommerce Owners
              </h1>
              <p 
                className="mt-6 text-xl lg:text-2xl leading-relaxed"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                At Ecom Sharkss, we understand the challenges you <br/> face  in today's competitive digital marketplace...
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6">
                {/* Phone Number */}
                <div className="flex items-center gap-4">
                  <Image src={imgPhoneIcon} alt="Phone" width={64} height={64} />
                  <span 
                    className="text-4xl lg:text-5xl font-semibold tracking-wider"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    (469) 480-7938
                  </span>
                </div>
                {/* Get a Quote Button */}
                <button 
                  className="group flex items-center justify-center gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full py-2.5 pl-6 pr-2 shadow-lg overflow-hidden relative"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({
                        url: 'https://calendly.com/contact-sharksbookpublishers/30min?primary_color=35c4dd'
                      });
                    }
                  }}
                >
                  <span 
                    className="font-semibold text-lg text-[#063f4a] relative z-10"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Get a Quote
                  </span>
                  <span className="bg-white rounded-full p-2.5 flex items-center justify-center w-10 h-10 relative z-10">
                    <Image src={imgArrowIcon} alt="arrow icon" width={24} height={24} />
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