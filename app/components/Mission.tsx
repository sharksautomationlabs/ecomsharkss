'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const imgChatCircleDots = "/images/chat-icon.svg";

/*
  Image assets are mapped from the original code for this specific component.
*/
const imgPattern011 = "/images/pattern-bg.png"; 
const imgWoman = "/images/mission-bg-main.png"; 
const imgShark = "/images/mission-shark-main.png"; 
const imgShopifyLogo = "/images/shopify-logo.png";
const imgPatternMask = "/images/results-mask.svg";
const imgWomanMask = "/images/mission-bg-mask.svg";

// Reusable button icons
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

export default function MissionSection() {
  const [activeTab, setActiveTab] = useState('mission');
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.25,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const contentData = {
    mission: {
      title: 'Our Mission',
      description: 'At Ecom Sharkss, our mission is to empower entrepreneurs and businesses to scale new heights in the digital marketplace. Through tailored solutions for Amazon, Walmart, Shopify, and TikTok, we help brands stand out, grow sustainably, and achieve long-term success with innovation, expertise, and dedication.',
      badge: 'About Us'
    },
    vision: {
      title: 'Our Vision',
      description: 'We envision a future where every business has the tools and knowledge to thrive in the digital economy. Our vision is to be the leading force in e-commerce transformation, creating a world where innovation meets opportunity, and every entrepreneur can build their dream business with confidence and success.',
      badge: 'Future Goals'
    },
    values: {
      title: 'Our Values',
      description: 'Our core values drive everything we do: Integrity in every interaction, Excellence in our solutions, Innovation in our approach, and Partnership in our relationships. We believe in transparency, continuous learning, and empowering our clients to achieve their fullest potential in the competitive digital landscape.',
      badge: 'Core Principles'
    }
  };

  const currentContent = contentData[activeTab as keyof typeof contentData];

  // Animation Variants
  const womanWipeUpVariants: Variants = {
    hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    visible: {
      clipPath: 'inset(0% 0 0 0)',
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const scrollFadeInVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
    },
  };
  
  const tabContentVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <div ref={ref} className="w-full bg-white flex justify-center">
      <div className="relative w-full max-w-[1920px] aspect-[1920/1080] overflow-hidden select-none">
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#bef4fe] to-white" />
        <div className="absolute inset-0 z-10" style={{ maskImage: `url('${imgPatternMask}')`, maskSize: '100% 100%' }}>
            <div className="w-full h-full bg-repeat" style={{ backgroundImage: `url('${imgPattern011}')` }} />
        </div>

        <div className="relative z-20 w-full h-full px-20">
          <nav className="w-full flex justify-center pt-24 border-b-2 border-[#79bfcd]">
            <div className="flex items-center gap-16">
              {Object.keys(contentData).map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  // MODIFICATION: Increased padding for a larger click area
                  className={`relative flex items-center gap-3 pb-6 px-8 py-4 transition-all duration-300 cursor-pointer hover:opacity-80 bg-transparent border-none outline-none ${
                    activeTab === tab ? 'border-b-2 border-[#063f4a]' : 'border-b-2 border-transparent'
                  }`}
                >
                  <span 
                    className={`text-[32px] transition-colors duration-300 ${
                      activeTab === tab ? 'text-[#063f4a]' : 'text-[#2c2420] opacity-60'
                    }`} 
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500 }}
                  >
                    {contentData[tab as keyof typeof contentData].title}
                  </span>
                </button>
              ))}
            </div>
          </nav>

          <div className="relative w-full h-[calc(100%-200px)]">
              {/* Left Text Content */}
              <motion.div 
                className="absolute top-[10%] left-0 w-[585px] z-30"
                initial="hidden"
                animate={controls}
                variants={scrollFadeInVariants}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <div className="inline-flex items-center gap-3 bg-[#95e5f3] text-[#2c2420] px-6 py-4 rounded-full mb-8">
                        <span className="font-medium text-2xl" style={{ fontFamily: "'Barlow', sans-serif" }}>{currentContent.badge}</span>
                    </div>
                    <h1 className="text-[94px] font-semibold text-[#2c2420] leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {currentContent.title}
                    </h1>
                    <p className="mt-8 text-[20px] text-[#333333] leading-[32px] text-justify" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        {currentContent.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex items-center gap-8 mt-12">
                    <button className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2.5 pl-6 pr-2 rounded-full text-lg shadow-lg overflow-hidden relative">
                        <span className="relative z-10">Get A Quote</span>
                        <span className="bg-white rounded-full p-2.5 relative z-10"><ArrowIcon /></span>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                    </button>
                    <button className="flex items-center justify-between w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                      <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                      <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                          <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                      </div>
                    </button>
                </div>
              </motion.div>

              {/* Right Image Collage */}
              <div className="absolute right-[-10%] top-[-10%] w-[65%] h-[120%] z-20">
                <div className="relative w-full h-full" style={{ maskImage: `url('${imgWomanMask}')`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}>
                    <div className="absolute w-[100%] h-[50%] top-[10%] left-0 z-0 animate-shark-lean">
                        <Image src={imgShark} alt="Shark" layout="fill" objectFit="contain" />
                    </div>
                    <motion.div 
                      className="absolute inset-0 z-10"
                      variants={womanWipeUpVariants}
                      initial="hidden"
                      animate={controls}
                    >
                        <Image src={imgWoman} alt="Business woman" layout="fill" objectFit="contain" className="filter grayscale transform -scale-x-100" />
                    </motion.div>
                    <div className="absolute w-[35%] h-auto bottom-[15%] right-[5%] z-20" style={{ animation: 'float 3s ease-in-out infinite' }}>
                        <Image src={imgShopifyLogo} alt="Shopify Logo" width={300} height={300} objectFit="contain" />
                    </div>
                    <style jsx>{`
                        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
                    `}</style>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}