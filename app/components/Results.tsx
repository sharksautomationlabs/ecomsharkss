'use client';

import React from 'react';
import Image from 'next/image';
const imgChatCircleDots = "/images/chat-icon.svg";

// Image assets for the Results Section.
const imgPattern = "/images/pattern-bg.png";
const imgHand = "/images/results-bg.png";
const imgShark = "/images/hero-shark.png";
const imgPenAndPaper = "/images/results-image.png";
const imgWalmartLogo = "/images/amazon-logo.png";

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
  return (
    // This structure is correct: it centers the 1920px canvas.
    <div className="w-full bg-white flex justify-center">
      
      {/* This container sets the 1920px boundary and clips overflow, preventing scrollbars. */}
      <div className="relative w-full max-w-[1920px] overflow-hidden">
        
        {/* Background Layers (Lowest Layer) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#bef4fe] to-white" />
          <div 
              className="absolute inset-0 bg-repeat opacity-50" 
              style={{ backgroundImage: `url('${imgPattern}')` }} 
          />
        </div>

        {/* Right Side: Image Collage */}
        {/* THE FIX: This container now has `z-10` to ensure it sits ABOVE the background. */}
        <div className="absolute top-0 right-0 bottom-0 w-[60%] lg:w-[55%] z-10">
          <div className="relative w-full h-full">
              {/* Internal z-index for layering images within the collage */}
              <div className="absolute w-[120%] h-auto top-[10%] -right-[10%] z-10">
                  <Image src={imgShark} alt="Shark" width={1180} height={445} objectFit="contain" className="transform -scale-x-100" />
              </div>
              <div className="absolute w-[28%] h-auto top-[40%] right-[25%] z-30">
                  <Image src={imgHand} alt="Hand holding results" width={176} height={137}  objectFit="contain" className="filter grayscale" />
              </div>
              <div className="absolute w-[38%] h-auto top-[40%] right-[25%] z-30">
                  <Image src={imgWalmartLogo} alt="Walmart Logo" width={126} height={126} objectFit="contain" />
              </div>
              <div className="absolute w-[28%] h-auto top-[25%] right-[21%] z-30 transform -rotate-12">
                   <Image src={imgPenAndPaper} alt="Pen and paper" width={176} height={137} objectFit="contain" />
              </div>
          </div>
        </div>

        {/* Left Side: Text Content */}
        {/* THE FIX: This container has `z-20`, placing it on the HIGHEST layer, ensuring it is always visible and interactive. */}
        <div className="relative z-20 flex items-center min-h-[960px] px-8 lg:px-16 xl:px-36">
          <div className="w-full lg:w-1/2 xl:w-2/5 pt-24 pb-32 lg:py-0">
            {/* All fonts and styles remain exactly as you provided. */}
            <h1 className="text-[94px] font-semibold text-[#2c2420] leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                More Than<br />Management,<br />We Deliver Results
            </h1>
            <p className="mt-8 text-[20px] text-[#333333] leading-[32px]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                With ECOM SHARKS, you&apos;re not simply partnering with an agency—you&apos;re creating a future-proof Amazon business built for long-term success.
            </p>
            <ul className="mt-6 space-y-2 list-disc list-inside text-[20px] text-[#333333]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                <li>Scalable Growth</li>
                <li>Market Leadership</li>
                <li>Expert Support Team</li>
            </ul>
            <div className="flex flex-wrap items-center gap-8 mt-12">
              <button className="flex items-center justify-center gap-4 bg-[#35c4dd] text-[#063f4a] font-semibold py-3 pl-8 pr-2 rounded-full text-xl shadow-lg">
                  Get A Quote
                  <span className="bg-white/50 rounded-full p-3 flex items-center justify-center w-12 h-12"><ArrowIcon /></span>
              </button>
              <button className="flex items-center justify-between w-[191px] h-[64px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[50px] h-[50px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}