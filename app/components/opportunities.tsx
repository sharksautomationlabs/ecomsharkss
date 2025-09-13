'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const imgChatCircleDots = "/images/chat-icon.svg";

// Image assets for the section.
const imgSharkOceanBg = "/images/shark-ocean-bg.png";
const imgSharkUnderwater = "/images/shark-underwater-2.png";
const imgBgVector = "/images/bg-vector-1.svg";
const imgBgMask = "/images/shark-ocean-mask.svg";
const imgClappingHandsIcon = "/images/hands-clapping.svg";
const imgArrowIcon = "/images/arrow-icon-3.svg";
const imgCardMask = "/images/pattern-mask.svg";

// Data for the two cards to keep the code clean and scalable.
const cardData = [
  {
    title: "Departments:",
    description: "Ecom Account Managers, Design, Marketing, Production, Sales, Finance, HR.",
    backgroundImage: "/images/departments-image.png",
  },
  {
    title: "Opportunities:",
    description: "Full-time roles, internships, and freelance partnerships.",
    backgroundImage: "/images/opportunities-image.png",
  }
];

// Animation Variants for the slide-in effect
const imageSlideInVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "circOut",
    },
  },
};

// Reusable Card component, now with motion capabilities.
const InfoCard = ({ title, description, backgroundImage }: {
  title: string;
  description: string;
  backgroundImage: string;
}) => (
  <motion.div className="flex flex-col text-center text-white">
    <motion.div
      className="relative w-[140%] h-[450px] -ml-[20%]"
      style={{
        maskImage: `url('${imgCardMask}')`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
      }}
      variants={imageSlideInVariants}
    >
      <Image src={backgroundImage} alt={title} layout="fill" objectFit="cover" className="rounded-2xl"/>
    </motion.div>
    
    <div className="mt-8 w-full">
      <h3
        className="text-5xl"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {title}
      </h3>
      <p
        className="mt-4 text-xl"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {description}
      </p>
    </div>
  </motion.div>
);


export default function Opportunities() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();
  
  // MODIFICATION 1: Set triggerOnce to false
  const [ref, inView] = useInView({
    triggerOnce: false, // This allows the animation to trigger every time
    threshold: 0.2,
  });

  // Effect for the existing shark scroll animation
  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MODIFICATION 2: Add an else condition to reset the animation
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // Reset to the 'hidden' state when out of view
    }
  }, [inView, controls]);

  // Variant to orchestrate the animations of the children (the cards)
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <section className="relative w-full bg-white">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <Image src={imgBgVector} alt="Wavy background shape" layout="fill" objectFit="cover" objectPosition="bottom"/>
        <div
          className="absolute inset-0"
          style={{
            maskImage: `url('${imgBgMask}')`,
            maskSize: '100% 100%',
          }}
        >
          <Image src={imgSharkOceanBg} alt="Underwater background" layout="fill" objectFit="cover" className="blur-md"/>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-20 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24 items-start">
        
        {/* Left Column: Main Text & Shark */}
        <div className="relative flex flex-col text-white">
          <div className="relative z-20 pt-12 pl-8">
            <h1
              className="text-8xl lg:text-9xl font-semibold leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Careers
            </h1>
            <h2
              className="mt-6 text-4xl lg:text-5xl font-semibold max-w-md"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              We're always looking for passionate people to join our mission.
            </h2>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <button className="flex items-center justify-center gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full py-2.5 pl-6 pr-2">
                <span className="font-semibold text-lg text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>Order You Book</span>
                <span className="bg-white rounded-full p-2.5 flex items-center justify-center w-10 h-10">
                  <Image src={imgArrowIcon} alt="arrow icon" width={24} height={24} />
                </span>
              </button>
              <button className="flex items-center justify-between w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
            </div>
          </div>

           <div
             className="absolute top-85 w-[120%] h-[600px] z-10 animate-shark-complete"
              style={{
                left: `${-282 + (scrollPosition * 0.03)}%`,
                transform: `translateX(${scrollPosition * 0.1}px)`
              }}
           >
             <img src="/images/shark-underwater-2.png" alt="Shark underwater" className="w-full h-full" />
           </div>
        </div>

        {/* Right Column: Cards & Banner - ATTACHED REF FOR TRIGGERING */}
        <div ref={ref} className="flex flex-col gap-y-16">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-30"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {cardData.map((card, index) => (
              <InfoCard key={index} {...card} />
            ))}
          </motion.div>
          <div className="bg-[#35c4dd] rounded-2xl p-6 flex items-center gap-4 text-[#063f4a]">
            <Image src={imgClappingHandsIcon} alt="Clapping hands icon" width={48} height={48} />
            <p className="text-2xl font-medium" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Work in a creative, collaborative environment where every story matters.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}