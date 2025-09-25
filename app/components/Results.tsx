'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
const imgChatCircleDots = "/images/chat-icon.svg";

// Image assets for the Results Section.
const imgPattern = "/images/pattern-bg.png";
const imgHand = "/images/results-bg.png";
const imgShark = "/images/hero-shark.png";
const imgPenAndPaper = "/images/results-image.png";
const imgWalmartLogo = "/images/amazon-logo.png";
const imgHand1 = "/images/hand.png";

// Reusable button icons.
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063F4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function ResultsSection() {
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
    // This structure is correct: it centers the 1920px canvas.
    <div ref={ref} className="w-full bg-white flex justify-center pb-20 lg:pb-40 xl:pb-32">
      
      {/* Responsive container */}
      <div className="relative w-full max-w-[1920px] h-auto py-4 md:min-h-[800px] lg:min-h-[1000px] xl:aspect-[1920/1200] xl:py-0 overflow-hidden">
        
        {/* Background Layers (Lowest Layer) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#bef4fe] to-white" />
          <div 
              className="absolute inset-0 bg-repeat opacity-50" 
              style={{ backgroundImage: `url('${imgPattern}')` }} 
          />
        </div>

        {/* Text Content - First on mobile, left side on desktop */}
        <motion.div 
          className="relative z-20 flex items-center min-h-[400px] md:min-h-[600px] lg:min-h-[1000px] xl:min-h-[1200px] px-5 lg:px-20"
          variants={leftVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="w-full lg:w-1/2 xl:w-2/5 pt-8 pb-8 lg:pt-8 lg:pb-24 lg:py-0 text-center lg:text-left">
            {/* All fonts and styles remain exactly as you provided. */}
            <h1 className="text-4xl lg:text-[94px] font-semibold text-[#2c2420] leading-tight lg:leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                More Than<br />Management,<br />We Deliver Results
            </h1>
            <p className="mt-6 lg:mt-8 text-base lg:text-[20px] text-[#333333] leading-6 lg:leading-[32px]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                With ECOM SHARKS, you&apos;re not simply partnering with an agency—you&apos;re creating a future-proof Amazon business built for long-term success.
            </p>
            <ul className="mt-4 lg:mt-6 space-y-2 list-disc list-inside text-base lg:text-[20px] text-[#333333]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                <li>Scalable Growth</li>
                <li>Market Leadership</li>
                <li>Expert Support Team</li>
            </ul>
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 mt-8 lg:mt-12">
              <button 
                className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2.5 pl-6 pr-2 rounded-full text-base lg:text-lg shadow-lg overflow-hidden relative w-full lg:w-auto"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({
                      url: 'https://calendly.com/zynofficiall09/30min',
                      onEventScheduled: function(e: any) {
                        // Redirect to thank you page when appointment is scheduled
                        window.location.href = '/thank-you';
                      }
                    });
                  }
                }}
              >
                  <span className="relative z-10">Get A Quote</span>
                  <span className="bg-white rounded-full p-2.5 relative z-10">
                      <ArrowIcon />
                  </span>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
              </button>
              <button className="flex items-center justify-center lg:justify-between gap-3 w-full lg:w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-0 lg:pl-5 text-[#063f4a] font-semibold text-base lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Image Collage - Second on mobile, right side on desktop */}
        <motion.div 
          className="relative lg:absolute top-0 lg:right-0 lg:bottom-0 w-full lg:w-[55%] h-[400px] lg:h-full z-10 mt-8 lg:mt-0"
          variants={rightVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="relative w-full h-full">
              {/* Internal z-index for layering images within the collage */}
              <div 
                className="absolute w-[120%] h-auto top-[50%] z-10 animate-shark-complete"
                style={{ 
                  left: `${240 - (scrollPosition * 0.05)}%`,
                  transform: `translateX(${-scrollPosition * 0.4}px)`
                }}
              >
                  <Image
                    src={imgShark}
                    alt="Shark"
                    width={980}
                    height={445}
                    objectFit="contain"
                    className="transform -scale-x-100 animate-hand-pivot"
                  />
              </div>
              <div className="absolute w-[28%] h-auto top-[15%] right-[45%] z-30 animate-hand-pivot">
                  <Image
                    src={imgHand}
                    alt="Hand holding results"
                    width={250}
                    height={250}
                    objectFit="contain"
                    className="filter grayscale"
                  />
              </div>
              <div className="absolute w-[38%] h-auto top-[10%] lg:top-[20%] right-[40%] z-30 transform -rotate-12 animate-hand-pivot">
                  <Image
                    src={imgWalmartLogo}
                    alt="Walmart Logo"
                    width={190}
                    height={190}
                    objectFit="contain"
                  />
              </div>
              <div className="absolute w-[28%] h-auto top-[12%] lg:top-[22%] right-[32%] z-30 animate-hand-pivot">
                   <Image
                     src={imgPenAndPaper}
                     alt="Pen and paper"
                     width={166}
                     height={127}
                     objectFit="contain"
                   />
              </div>
              <div
                className="absolute w-[76%] h-auto top-[25%] right-[12%] z-10 animate-hand-pivot"
                style={{
                  transformOrigin: '100% 50%', // right edge as pivot
                }}
              >
                <Image src={imgHand1} alt="Pen and paper" width={200000} height={200000} objectFit="contain" />
              </div>
              <style jsx global>{`
                @keyframes handPivotBounce {
                  0% { transform: rotate(0deg); }
                  25% { transform: rotate(-3deg); }
                  50% { transform: rotate(0deg); }
                  75% { transform: rotate(3deg); }
                  100% { transform: rotate(0deg); }
                }
                .animate-hand-pivot {
                  animation: handPivotBounce 4s linear infinite;
                }
              `}</style>
          </div>
        </motion.div>

      </div>
    </div>
  );
}