'use client';

import React, { useState } from 'react';
import Image from 'next/image';
const imgChatCircleDots = "/images/chat-icon.svg";

/*
  Image assets are mapped from the original code for this specific component.
*/
const imgPattern011 = "/images/pattern-bg.png"; 
const imgWoman = "/images/mission-bg-main.png"; 
const imgShark = "/images/mission-shark-main.png"; 
const imgShopifyLogo = "/images/shopify-logo.png";
const imgPatternMask = "/images/results-mask.svg";
const imgMissionIcon = "/images/mission-icon.svg";
const imgWomanMask = "/images/mission-bg-mask.svg";

// Reusable button icons from previous sections for consistency
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

  const contentData = {
    mission: {
      title: 'Our Mission',
      description: 'At Ecom Sharkss, our mission is to empower entrepreneurs and businesses to scale new heights in the digital marketplace. Through tailored solutions for Amazon, Walmart, Shopify, and TikTok, we help brands stand out, grow sustainably, and achieve long-term success with innovation, expertise, and dedication.',
      icon: '🌎',
      badge: 'About Us'
    },
    vision: {
      title: 'Our Vision',
      description: 'We envision a future where every business has the tools and knowledge to thrive in the digital economy. Our vision is to be the leading force in e-commerce transformation, creating a world where innovation meets opportunity, and every entrepreneur can build their dream business with confidence and success.',
      icon: '🚀',
      badge: 'Future Goals'
    },
    values: {
      title: 'Our Values',
      description: 'Our core values drive everything we do: Integrity in every interaction, Excellence in our solutions, Innovation in our approach, and Partnership in our relationships. We believe in transparency, continuous learning, and empowering our clients to achieve their fullest potential in the competitive digital landscape.',
      icon: '💎',
      badge: 'Core Principles'
    }
  };

  const currentContent = contentData[activeTab as keyof typeof contentData];

  return (
    // Main wrapper that centers and scales the content identically to the Header
    <div className="w-full bg-white flex justify-center">
      {/* Scalable container with a fixed aspect ratio */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/1080] overflow-hidden select-none">
        
        {/* Background Layer 1: The Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#bef4fe] to-white" />

        {/* Background Layer 2: The Masked Pattern */}
        <div className="absolute inset-0 z-10" style={{ maskImage: `url('${imgPatternMask}')`, maskSize: '100% 100%' }}>
            <div className="w-full h-full bg-repeat" style={{ backgroundImage: `url('${imgPattern011}')` }} />
        </div>

        {/* Content Layer */}
        <div className="relative z-20 w-full h-full px-[136px]">
          {/* Top Navigation Tabs */}
          <nav className="w-full flex justify-center pt-24 border-b-2 border-[#79bfcd]">
            <div className="flex items-center gap-32">
              {/* Mission Tab */}
              <div 
                onClick={() => setActiveTab('mission')}
                className={`relative flex items-center gap-3 pb-6 transition-all duration-300 cursor-pointer hover:opacity-80 ${
                  activeTab === 'mission' 
                    ? 'border-b-2 border-[#063f4a]' 
                    : 'border-b-2 border-transparent'
                }`}
              >
                <Image src={imgMissionIcon} alt="Mission Icon" width={28} height={28} />
                <span 
                  className={`text-[32px] transition-colors duration-300 ${
                    activeTab === 'mission' ? 'text-[#063f4a]' : 'text-[#2c2420] opacity-60'
                  }`} 
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500 }}
                >
                  Our Mission
                </span>
              </div>
              
              {/* Vision Tab */}
              <div 
                onClick={() => setActiveTab('vision')}
                className={`relative flex items-center gap-3 pb-6 transition-all duration-300 cursor-pointer hover:opacity-80 ${
                  activeTab === 'vision' 
                    ? 'border-b-2 border-[#063f4a]' 
                    : 'border-b-2 border-transparent'
                }`}
              >
                <span className="text-2xl">🚀</span>
                <span 
                  className={`text-[32px] transition-colors duration-300 ${
                    activeTab === 'vision' ? 'text-[#063f4a]' : 'text-[#2c2420] opacity-60'
                  }`} 
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500 }}
                >
                  Our Vision
                </span>
              </div>
              
              {/* Values Tab */}
              <div 
                onClick={() => setActiveTab('values')}
                className={`relative flex items-center gap-3 pb-6 transition-all duration-300 cursor-pointer hover:opacity-80 ${
                  activeTab === 'values' 
                    ? 'border-b-2 border-[#063f4a]' 
                    : 'border-b-2 border-transparent'
                }`}
              >
                <span className="text-2xl">💎</span>
                <span 
                  className={`text-[32px] transition-colors duration-300 ${
                    activeTab === 'values' ? 'text-[#063f4a]' : 'text-[#2c2420] opacity-60'
                  }`} 
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 500 }}
                >
                  Our Values
                </span>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <div className="relative w-full h-[calc(100%-200px)]">
              {/* Left Text Content */}
              <div className="absolute top-[10%] left-0 w-[585px] z-30">
                <div className="inline-flex items-center gap-3 bg-[#95e5f3] text-[#2c2420] px-6 py-4 rounded-full mb-8 transition-all duration-500">
                    <span className="text-2xl transition-all duration-500">{currentContent.icon}</span>
                    <span className="font-medium text-2xl transition-all duration-500" style={{ fontFamily: "'Barlow', sans-serif" }}>{currentContent.badge}</span>
                </div>
                <h1 className="text-[94px] font-semibold text-[#2c2420] leading-[0.921] transition-all duration-500" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {currentContent.title}
                </h1>
                <p className="mt-8 text-[20px] text-[#333333] leading-[32px] text-justify transition-all duration-500" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {currentContent.description}
                </p>
                <div className="flex items-center gap-8 mt-12">
                    <button className="flex items-center justify-center gap-4 bg-[#35c4dd] text-[#063f4a] font-semibold py-3 pl-8 pr-2 rounded-full text-xl shadow-lg">
                        Get A Quote
                        <span className="bg-white/50 rounded-full p-3"><ArrowIcon /></span>
                    </button>
                    <button className="flex items-center justify-between w-[191px] h-[64px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[50px] h-[50px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
                </div>
              </div>

              {/* Right Image Collage */}
              <div className="absolute right-[-10%] top-[-10%] w-[65%] h-[120%] z-20">
                <div className="relative w-full h-full" style={{ maskImage: `url('${imgWomanMask}')`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}>
                    {/* Shark Image (Behind) */}
                    <div className="absolute w-[100%] h-[50%] top-[10%] left-0 z-0 animate-shark-lean">
                        <Image src={imgShark} alt="Shark" layout="fill" objectFit="contain" />
                    </div>
                    {/* Grayscale Woman Image - FLIP REMOVED */}
                    <div className="absolute inset-0 z-10">
                        <Image src={imgWoman} alt="Business woman" layout="fill" objectFit="contain" className="filter grayscale" />
                    </div>
                    {/* Shopify Bag (In Front) */}
                    <div className="absolute w-[35%] h-auto bottom-[15%] right-[5%] z-20">
                        <Image src={imgShopifyLogo} alt="Shopify Logo" width={300} height={300} objectFit="contain" />
                    </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}