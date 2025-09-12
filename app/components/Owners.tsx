'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Main wrapper to center the 1920px canvas.
    <div className="w-full bg-white flex justify-center">
      
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
        <div className="absolute inset-0 z-10 pointer-events-none">
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
          <div 
            className="absolute -top-16 -right-20 w-[600px] h-[550px] transition-all duration-1000 ease-out"
            style={{ 
              transform: `rotate(${12 + (scrollPosition * 0.1)}deg)`
            }}
          >
            <Image src={imgRightHand} alt="Hand writing" layout="fill" objectFit="contain" />
          </div>
          {/* TikTok Logo position adjusted relative to the new hand position */}
          <div className="absolute top-[38%] right-[33%] w-[150px] h-[150px]">
             <Image src={imgTikTokLogo} alt="TikTok Logo" layout="fill" objectFit="contain" />
          </div>
        </div>

        {/* Layer 3: Content */}
        <div className="relative z-20 container mx-auto px-8 lg:px-16 xl:px-32">
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
                At Ecom Sharkss, we understand the challenges you face in today's competitive digital marketplace...
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
                <button className="flex items-center justify-between bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full h-16 w-52 pl-8 pr-1.5">
                  <span 
                    className="font-semibold text-xl text-[#063f4a]"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    Get a Quote
                  </span>
                  <span className="bg-white rounded-full flex items-center justify-center w-12 h-12">
                    <Image src={imgArrowIcon} alt="arrow icon" width={24} height={24} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}