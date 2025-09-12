'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

/*
  Image assets are mapped from the original code for this specific component.
*/
const imgPattern011 = "/images/testimonials-pattern-bg.png"; 
const imgShark21 = "/images/quote-shark.png"; 
const imgImage1 = "/images/hero-logo.png"; 
const imgRectangle34624302 = "/images/quote-bg-rectangle.svg"; 
const imgGroup1321315061 = "/images/expert-phone.svg";
const imgArrowIcon = "/images/arrow-icon.svg";

export default function QuoteSection() {
  const textShadow = { textShadow: '0px 2px 8px rgba(0, 0, 0, 0.6)' };
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Main wrapper that centers and scales the content
    <div className="w-full bg-white flex justify-center">
      
      {/* 
        REMOVED BOTTOM PADDING: Reduced aspect ratio height to center content
        and removed extra bottom space
      */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/800] overflow-hidden select-none">
        
        {/* --- PRESERVED DIVS (UNCHANGED AS REQUESTED) --- */}
        <div className="absolute h-full w-full">
            <div className="absolute flex h-[678px] items-center justify-center top-[60px] translate-x-[-50%] w-[1920px]" style={{ left: "calc(50% - 36.5px)" }}>
                <div className="flex-none scale-y-[-100%]">
                    <div className="h-[678px] relative w-[1920px]">
                    <img alt="background shape" className="block max-w-none size-full" src={imgRectangle34624302} />
                    </div>
                </div>
            </div>
            <div className="absolute bg-[0%_-0.06%] bg-no-repeat bg-size-[100%_88.77%] h-[961px] left-[-43px] opacity-20 top-px w-[2382px]" style={{ backgroundImage: `url('${imgPattern011}')` }} />
            <div className="absolute h-[738px] left-0 overflow-clip top-0 w-[1920px]">
                <div 
                  className="absolute flex h-[961.316px] items-center justify-center w-[1324.938px] animate-shark-lean transition-all duration-1000 ease-out"
                  style={{ 
                    left: `${808.56 - (scrollPosition * 0.005)}px`,
                    top: `${-167 + (scrollPosition * 0.002)}px`,
                    transform: `translateX(${-scrollPosition * 0.02}px)`
                  }}
                >
                    <div className="flex-none rotate-[198.874deg] scale-y-[-100%]">
                    <div className="bg-center bg-cover bg-no-repeat h-[608.353px] w-[1192.26px]" style={{ backgroundImage: `url('${imgShark21}')` }} />
                    </div>
                </div>
            </div>
        </div>
        {/* --- END OF PRESERVED DIVS --- */}

        {/* Content Layer - MODIFIED: Left padding reduced for alignment */}
        <div className="absolute top-[328px] left-[136px] z-20 text-white">
          <div className="w-[130px] h-[109px] relative -top-40">
            <Image src={imgImage1} alt="Ecom Sharks Logo" layout="fill" objectFit="contain" />
          </div>

          <h1 className="-mt-32 text-[94px] font-semibold leading-[0.921] max-w-4xl" style={{ fontFamily: "'Barlow Condensed', sans-serif", ...textShadow }}>
            Ecom Sharks Helps You Scale Smarter, Sell Faster
          </h1>

          <div className="mt-12 flex items-center gap-8">
             <button className="flex items-center justify-center gap-4 bg-[#35c4dd] text-[#063f4a] font-semibold py-3 pl-8 pr-3 rounded-full text-xl shadow-lg">
                Get A Quote
                {/* CORRECT ICON ADDED */}
                <span className="bg-white/50 rounded-full p-2 w-[48px] h-[48px] flex items-center justify-center">
                    <Image src={imgArrowIcon} alt="arrow icon" width={28} height={28} />
                </span>
            </button>
            <p className="text-[20px] max-w-lg leading-[32px]" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="w-[83px] h-[83px] relative">
              <Image src={imgGroup1321315061} alt="Phone Icon" layout="fill" objectFit="contain" />
            </div>
            <p className="text-[60px] font-semibold tracking-[4.2px]" style={{ fontFamily: "'Barlow Condensed', sans-serif", ...textShadow }}>
              (469) 480-7938
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}