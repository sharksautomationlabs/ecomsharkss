'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063F4A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


/*
  All image paths are kept exactly as provided by you.
*/
const imgImage37 = "/images/main-bg-sand.png";
const imgImage1 = "/images/quote-logo.png";
const imgRectangle72 = "/images/header-top-bar.png";
const imgGroup1000004908 = "/images/header-phone-icon.svg";
const imgGroup1000004909 = "/images/header-email-icon.svg";
const imgDangerousSharkUnderwater2Copy1 = "/images/shark-underwater-2.png";
const imgChatCircleDots = "/images/chat-icon.svg";
const img91 = "/images/tiktok-logo.png";
const img61 = "/images/amazon-logo.png";
const img72 = "/images/walmart-logo.png";
const img81 = "/images/shopify-logo.png";

export default function Header() {
  const textShadow = { textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' };
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
    <div className="w-full bg-[#052126] flex justify-center">
      {/* Scalable container with a fixed aspect ratio */}
      <div className="relative w-full max-w-[1920px] aspect-[1920/1080] overflow-hidden select-none">
        
        {/* Background Image and Overlay */}
        <div className="absolute inset-0 z-0">
          <Image src={imgImage37} alt="Underwater background" layout="fill" objectFit="cover" quality={100} />
        </div>
        <div className="absolute inset-0 bg-[#052126]/60 z-10" />

        {/* Content Layer - All positions are relative to this container */}
        <div className="relative z-20 w-full h-full">

          {/* Header Container - MODIFIED */}
          <header className="absolute top-0 left-0 w-full z-50 px-20">
            {/* Top Bar */}
            <div
              className="h-[64px] w-full bg-cover bg-center rounded-b-2xl
                         flex items-center justify-between px-8"
              style={{ backgroundImage: `url('${imgRectangle72}')` }}
            >
              <p className="text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                🌟 One-Stop All Ecommerce Accounts Solutions
              </p>
              <div className="flex items-center gap-8">
                <a href="tel:4694807938" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004908} alt="phone" width={32} height={32} />
                  <span>(469) 480-7938</span>
                </a>
                <a href="mailto:info@ecomsharkss.com" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004909} alt="email" width={32} height={32} />
                  <span>info@ecomsharkss.com</span>
                </a>
              </div>
            </div>

            {/* Navigation Section */}
            <div className="mt-6 flex items-center justify-between slide-in-right">
                <div className="w-[110px] h-[100px] relative fade-in">
                    <Image src={imgImage1} alt="Ecom Sharks Logo" layout="fill" objectFit="contain" />
                </div>
                <div className="w-[950px] h-[90px] bg-white/20 backdrop-blur-sm 
                            rounded-2xl flex items-center justify-end px-10 gap-8 border-2 border-white">
                    <div className="flex items-center gap-6 text-white text-[18px] font-medium" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        <a href="#" className="hover:text-[#35c4dd]" style={textShadow}>Home</a>
                        <a href="#" className="hover:text-[#35c4dd]" style={textShadow}>About Us</a>
                        <a href="#" className="hover:text-[#35c4dd]" style={textShadow}>Amazon</a>
                        <a href="#" className="hover:text-[#35c4dd]" style={textShadow}>Shopify</a>
                        <a href="#" className="hover:text-[#35c4dd]" style={textShadow}>Tiktok</a>
                        <a href="#" className="hover:text-[#35c4dd]" style={textShadow}>Walmart</a>
                        <a href="#" className="hover:text-[#35c4dd]" style={textShadow}>Identity</a>
                        <a href="#" className="hover:text-[#35c4dd]" style={textShadow}>Contact</a>
                    </div>
                     <button className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-1.5 pl-6 pr-2 rounded-full text-lg shadow-lg overflow-hidden relative">
                        <span className="relative z-10">Get Started</span>
                        <span className="bg-white rounded-full p-2.5 w-10 h-10 flex items-center justify-center relative z-10">
                            <ArrowIcon />
                        </span>
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                    </button>
                </div>
            </div>
          </header>

          {/* Hero Text Content */}
          <div className="absolute top-[300px] left-20 w-[781px] z-50 slide-in-left">
            <h1 className="text-white text-[94px] leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}>
              Drive Revenue <br />&Dominate the Digital <br />World with Us
            </h1>
            <p className="mt-6 text-white text-[24px] leading-[38px] max-w-[685px]" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, ...textShadow }}>
              Boost your Digital Presence on Amazon, TikTok, Walmart & Shopify with ECOM SHARKS
            </p>
            <div className="flex items-center gap-6 mt-12">
            <button className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2 pl-6 pr-2 rounded-full text-lg shadow-lg overflow-hidden relative">
                <span className="relative z-10">Contact Us</span>
                <span className="bg-white rounded-full p-2.5 w-10 h-10 flex items-center justify-center relative z-10">
                  <ArrowIcon />
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
              </button>

              <button className="flex items-center justify-between w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
            </div>
          </div>
          
          {/* Visual Elements Layer */}
          <div className="absolute inset-0 z-30">
            <div 
              className="absolute top-[56%] w-[52%] h-[60%] animate-shark-complete"
              style={{ 
                left: `${75 - (scrollPosition * 0.03)}%`,
                transform: `translateX(${-scrollPosition * 0.1}px)`
              }}
            >
                <Image src={imgDangerousSharkUnderwater2Copy1} alt="Shark" layout="fill" objectFit="contain" className="transform -scale-x-100" />
            </div>
            {/* Amazon Logo - Floating animation with gentle rotation */}
            <div className="absolute top-[41%] right-[9%] w-[13.5%] h-auto logo-fade-in-amazon">
                <Image src={img61} alt="Amazon Logo" width={260} height={260} objectFit="contain" />
            </div>
            {/* Shopify Logo - Floating animation with counter-rotation */}
            <div className="absolute top-[44%] right-[30%] w-[14.5%] h-auto logo-fade-in-shopify">
                <Image src={img81} alt="Shopify Logo" width={280} height={280} objectFit="contain" />
            </div>
            {/* TikTok Logo - Floating animation with rotation */}
            <div className="absolute top-[58%] right-[19%] w-[15%] h-auto z-40 logo-fade-in-tiktok">
                <Image src={img91} alt="TikTok Logo" width={290} height={290} objectFit="contain" />
            </div>
            {/* Walmart Logo - Floating animation with gentle sway */}
            <div className="absolute top-[25%] right-[20%] w-[16%] h-auto z-40 logo-fade-in-walmart">
                <Image src={img72} alt="Walmart Logo" width={310} height={310} objectFit="contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}