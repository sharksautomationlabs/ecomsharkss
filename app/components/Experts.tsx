'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
const imgChatCircleDots = "/images/chat-icon.svg";

// SVG Icons from the provided ExpertsSection code
const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063F4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1.5" fill="white"/>
        <circle cx="8" cy="12" r="1.5" fill="white"/>
        <circle cx="16" cy="12" r="1.5" fill="white"/>
    </svg>
);

export default function ExpertsSection() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Main wrapper that centers and scales the content identically to the Header
    <div className="w-full bg-white flex justify-center">
      {/* Scalable container with a fixed aspect ratio */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/1080] overflow-hidden select-none
                      flex items-center px-[136px]">
        
        {/* Main Content Grid */}
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-x-12 items-center">
          
          {/* Left Content Section */}
          <div className="lg:col-span-6 z-10">
            <div className="inline-flex items-center gap-3 bg-[#d0f7ff] text-[#2c2420] px-4 py-2.5 rounded-full mb-8">
              <span className="text-xl">💬</span>
              <span className="font-medium text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Welcome Message</span>
            </div>

            {/* FONT STYLES MATCHED TO HEADER */}
            <h1 className="text-[94px] font-semibold text-[#2c2020] leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Meet the Experts Behind <br />
              ECOM SHARKSS Success
            </h1>

            <p className="mt-8 text-[24px] text-[#333333] max-w-3xl leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Our dedicated team stands at the forefront of Amazon's fulfillment programs and beyond. We don't just help businesses grow—we empower them to scale and thrive!
            </p>

            {/* BUTTON STYLES MATCHED TO HEADER */}
            <div className="mt-12 flex items-center gap-8">
              <button className="flex items-center justify-center gap-4 bg-[#35c4dd] text-[#063f4a] font-semibold py-3 pl-8 pr-2 rounded-full text-xl shadow-lg">
                Get A Quote
                <span className="bg-white/50 rounded-full p-3">
                  <ArrowIcon />
                </span>
              </button>
              <div className="flex items-center gap-4">
              <button className="flex items-center justify-between w-[191px] h-[64px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[50px] h-[50px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
              </div>
            </div>
          </div>
          
          {/* Right Image Section */}
          <div className="lg:col-span-6 h-[75%] absolute right-0 w-1/2">
            <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center w-full h-full" 
                        style={{ backgroundImage: "url('/images/experts-bg.png')" }}
                    >
                        <div className="absolute inset-0 bg-[#052126] opacity-40"></div>
                    </div>
                </div>

                {/* Floating Logos - Sized with percentages */}
                <img src="/images/walmart-logo.png" alt="Walmart Logo" className="absolute w-[25%] top-[2%] right-[25%] transform rotate-[12.5deg]" />
                <img src="/images/amazon-logo.png" alt="Amazon Logo" className="absolute w-[28%] top-[10%] left-[5%] transform -rotate-[8.3deg]" />
                <img src="/images/shopify-logo.png" alt="Shopify Logo" className="absolute w-[30%] top-[5%] right-[2%] transform rotate-[12.2deg]" />
                <img src="/images/tiktok-logo.png" alt="TikTok Logo" className="absolute w-[28%] bottom-[25%] left-1/2 -translate-x-1/2 transform -rotate-[13deg] z-[5]" />
            </div>
          </div>

        </div>

        {/* Shark Image - Sized with percentages */}
        <div 
          className="absolute -bottom-[20%] w-[40%] z-20 animate-shark-complete"
          style={{ 
            left: `${35 + (scrollPosition * 0.03)}%`,
            transform: `translateX(${scrollPosition * 0.1}px)`
          }}
        >
            <img src="/images/shark-underwater.png" alt="Shark underwater" className="w-full h-full transform -scale-x-100" />
        </div>
      </div>
    </div>
  );
}