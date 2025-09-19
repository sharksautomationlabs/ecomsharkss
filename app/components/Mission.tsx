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
const imgMan = "/images/man.png"; 
const imgShark = "/images/mission-shark-main.png"; 
const imgShopifyLogo = "/images/shopify-logo.png";
const imgWalmartLogo = "/images/walmart-logo.png";
const imgAmazonLogo = "/images/amazon-logo.png";
const imgTikTokLogo = "/images/tiktok-logo.png";
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

interface MissionProps {
  customTitle?: string;
  customDescription?: string;
  useCustomContent?: boolean;
  logoType?: 'shopify' | 'walmart' | 'amazon' | 'tiktok';
}

export default function MissionSection({ 
  customTitle,
  customDescription,
  useCustomContent = false,
  logoType = 'shopify'
}: MissionProps) {
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
    howWeWork: {
      title: 'How We Work',
      description: 'Meet Sharjeel Zahoor – Your Senior Consultant\n\nWondering what you\'ll actually gain by working with us?\nWe\'ve created a free 5-minute masterclass where you\'ll discover:\n\n• How eCommerce really works\n• What automation is, and why it\'s the backbone of online success\n• How automation can help you achieve financial freedom, independence, and a reliable passive income stream\n\nThis video is packed with insights worth millions of dollars—yet it\'s free for you to explore.\n\n👉 Watch the complete video here:\n(link)\n\nOur senior consultant, Sharjeel Zahoor, will walk you through the process step by step.\n\nConnect with Sharjeel on Social Media\n\nFacebook | Instagram | LinkedIn',
      badge: 'Free Masterclass'
    }
  };

  const currentContent = contentData[activeTab as keyof typeof contentData];

  // Animation Variants
  const personWipeUpVariants: Variants = {
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
        <div className={`relative w-full max-w-[1920px] overflow-hidden select-none ${useCustomContent ? 'min-h-[800px] py-20' : 'min-h-[800px] lg:min-h-[1000px] py-16 pb-8 lg:py-20'}`}>
        
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#bef4fe] to-white" />
        <div className="absolute inset-0 z-10" style={{ maskImage: `url('${imgPatternMask}')`, maskSize: '100% 100%' }}>
            <div className="w-full h-full bg-repeat" style={{ backgroundImage: `url('${imgPattern011}')` }} />
        </div>

        <div className={`relative z-10 w-full px-5 lg:px-20 ${useCustomContent ? 'h-full flex items-center' : 'h-full'}`}>
          {!useCustomContent && (
            <nav className="relative z-30 w-full flex justify-center pt-3 lg:pt-6 border-b-2 border-[#79bfcd]">
              {/* === MODIFICATION HERE === */}
              <div className="flex items-center gap-8 lg:gap-16 overflow-x-auto">
                {Object.keys(contentData).map((tab) => (
                  <div 
                    key={tab}
                    className={`relative ${
                      activeTab === tab ? 'border-b-2 border-[#063f4a] pb-4 lg:pb-6' : 'border-b-2 border-transparent pb-4 lg:pb-6'
                    }`}
                  >
                    <span 
                      onClick={() => setActiveTab(tab)}
                      className={`text-lg lg:text-[32px] transition-colors duration-300 cursor-pointer hover:opacity-80 inline-block ${
                        activeTab === tab ? 'text-[#063f4a]' : 'text-[#2c2420] opacity-60'
                      }`} 
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500 }}
                    >
                      {contentData[tab as keyof typeof contentData].title}
                    </span>
                  </div>
                ))}
              </div>
            </nav>
          )}

          <div className={`relative w-full ${useCustomContent ? 'h-full' : 'h-auto lg:h-auto lg:min-h-[600px]'}`}>
              {/* Left Text Content */}
              <motion.div 
                className={`${useCustomContent ? 'relative w-full lg:w-[585px] z-20' : 'relative lg:absolute top-0 lg:top-[5%] left-0 w-full lg:w-[585px] z-20'}`}
                initial="hidden"
                animate={controls}
                variants={scrollFadeInVariants}
              >
                {useCustomContent ? (
                  <div>
                    <h1 className="text-4xl lg:text-[94px] font-semibold text-[#2c2420] leading-tight lg:leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {customTitle}
                    </h1>
                    <p className="mt-6 lg:mt-8 text-base lg:text-[20px] text-[#333333] leading-6 lg:leading-[32px] text-justify whitespace-pre-line" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        {customDescription}
                    </p>
                  </div>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      variants={tabContentVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <div className="inline-flex items-center gap-2 lg:gap-3 bg-[#95e5f3] text-[#2c2420] px-3 lg:px-6 py-2 lg:py-4 rounded-full mb-6 lg:mb-8 mt-4 lg:mt-0">
                          <span className="font-medium text-sm lg:text-2xl" style={{ fontFamily: "'Barlow', sans-serif" }}>{currentContent.badge}</span>
                      </div>
                      <h1 className="text-4xl lg:text-[94px] font-semibold text-[#2c2420] leading-tight lg:leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {currentContent.title}
                      </h1>
                      <p className="mt-6 lg:mt-8 text-base lg:text-[20px] text-[#333333] leading-6 lg:leading-[32px] text-justify whitespace-pre-line" style={{ fontFamily: "'Barlow', sans-serif" }}>
                          {currentContent.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                )}
                
                 <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 mt-8 lg:mt-12">
                    <button 
                       className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2.5 pl-6 pr-2 rounded-full text-base lg:text-lg shadow-lg overflow-hidden relative w-full lg:w-auto"
                      onClick={() => {
                        if (typeof window !== 'undefined' && (window as any).Calendly) {
                          (window as any).Calendly.initPopupWidget({
                            url: 'https://calendly.com/contact-sharksbookpublishers/30min?primary_color=35c4dd'
                          });
                        }
                      }}
                    >
                        <span className="relative z-10">Get A Quote</span>
                        <span className="bg-white rounded-full p-2.5 relative z-10"><ArrowIcon /></span>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                    </button>
                     <button className="flex items-center justify-center lg:justify-between gap-3 w-full lg:w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                       <span className="pl-0 lg:pl-5 text-[#063f4a] font-semibold text-base lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                      <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                          <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                      </div>
                    </button>
                </div>
              </motion.div>

              {/* Right Image Collage */}
              <div className={`${useCustomContent ? 'relative lg:absolute right-0 lg:right-[-5%] top-0 w-full lg:w-[60%] h-[600px] lg:h-[100%] z-10 mt-8 lg:mt-0' : 'relative lg:absolute right-0 lg:right-[-10%] top-0 lg:top-[-10%] w-full lg:w-[65%] h-[600px] lg:h-[120%] z-10 mt-8 lg:mt-0'}`}>
                <div className="relative w-full h-full" style={{ maskImage: `url('${imgWomanMask}')`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}>
                    <div className="absolute w-[100%] h-[50%] top-[10%] left-0 z-0 animate-shark-lean">
                        <Image src={imgShark} alt="Shark" layout="fill" objectFit="contain" />
                    </div>
                    <motion.div 
                      key={activeTab}
                      className="absolute inset-0 z-10"
                      variants={personWipeUpVariants}
                      initial="hidden"
                      animate={controls}
                    >
                        <Image 
                          src={activeTab === 'howWeWork' ? imgMan : imgWoman} 
                          alt={activeTab === 'howWeWork' ? "Business man" : "Business woman"} 
                          layout="fill" 
                          objectFit="contain" 
                          className="filter grayscale transform -scale-x-100 w-full h-full" 
                          style={{ 
                            minHeight: '500px',
                            objectPosition: 'center',
                            width: '100%',
                            height: '100%'
                          }}
                        />
                    </motion.div>
                    <div className="absolute w-[35%] h-auto bottom-[15%] right-[5%] z-20" style={{ animation: 'float 3s ease-in-out infinite' }}>
                        <Image 
                          src={logoType === 'walmart' ? imgWalmartLogo : logoType === 'amazon' ? imgAmazonLogo : logoType === 'tiktok' ? imgTikTokLogo : imgShopifyLogo} 
                          alt={logoType === 'walmart' ? "Walmart Logo" : logoType === 'amazon' ? "Amazon Logo" : logoType === 'tiktok' ? "TikTok Logo" : "Shopify Logo"} 
                          width={300} 
                          height={300} 
                          objectFit="contain" 
                        />
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