'use client';

import React from 'react';
import Image from 'next/image';
const imgChatCircleDots = "/images/chat-icon.svg";
/*
  Image assets are mapped from the original code for this specific component.
*/
const imgRealisticSharkOcean1 = "/images/shark-ocean-main.png";
const imgVector8 = "/images/service-bg-vector.svg";
const imgRealisticSharkOcean2 = "/images/service-mask.svg";
const imgWalmartLogo = "/images/walmart-logo.png";
const imgTikTokLogo = "/images/tiktok-logo.png";
const imgShopifyLogo = "/images/shopify-logo.png";
const imgAmazonLogo = "/images/amazon-logo.png";
const imgCardVector = "/images/service-card-bg.svg";
const imgIconBg = "/images/service-icon-bg.svg";
const imgArrowIcon = "/images/arrow-icon.svg"; // Correct icon for the button

// Reusable ChatIcon for the button
const ChatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const servicesData = [
  {
    title: 'Amazon',
    description: 'Fresh voices and anticipated titles, available now.',
    logo: imgWalmartLogo,
  },
  {
    title: 'Tiktok',
    description: "Stories readers can't stop talking about.",
    logo: imgTikTokLogo,
  },
  {
    title: 'Shopify',
    description: "Be the first to discover tomorrow's favorites.",
    logo: imgShopifyLogo,
  },
  {
    title: 'Walmart',
    description: 'Take your library wherever you go.',
    logo: imgAmazonLogo,
  },
];

export default function Services() {
  const textShadow = { textShadow: '0px 2px 8px rgba(0, 0, 0, 0.6)' };

  return (
    // Main wrapper that centers and scales the content
    <div className="w-full bg-white flex justify-center">
      {/* Scalable container with responsive height */}
      <div className="relative w-full max-w-[1920px] h-auto py-16 lg:aspect-[1920/1080] lg:py-0 overflow-hidden select-none">
        
        {/* Background Layer 1: The Wavy Blue Shape */}
        <div className="absolute inset-0 z-0">
          <Image src={imgVector8} alt="Wavy background shape" layout="fill" objectFit="cover" />
        </div>

        {/* Background Layer 2: The Masked Video */}
        <div className="absolute inset-0 z-10" 
             style={{
                maskImage: `url('${imgRealisticSharkOcean2}')`,
                maskSize: '100% 100%',
                maskRepeat: 'no-repeat',
             }}>
          <div className="relative w-full h-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover blur-md"
            >
              <source src="/images/bi-vid.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#052126]/40" />
          </div>
        </div>

        {/* Content Layer */}
        <div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-white pt-12 lg:pt-20 px-5 lg:px-0">
          <h1 className="text-4xl lg:text-[94px] font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif", ...textShadow }}>
            Services
          </h1>
          
          {/* Services Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-6 w-full max-w-[1200px] mt-8 lg:mt-16 mx-5 lg:mx-20">
            {servicesData.map((service, index) => (
              // CARD SIZE REDUCED
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-2xl lg:rounded-3xl px-4 lg:px-6 py-4 lg:py-5 border border-white/20 h-[280px] lg:h-[320px] flex flex-col items-center text-center overflow-hidden service-card-flash">
                <h2 className="text-lg lg:text-[28px] font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {service.title}
                </h2>
                <p className="mt-2 text-sm lg:text-[16px] leading-5 lg:leading-[24px] max-w-[200px] lg:max-w-[250px]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  {service.description}
                </p>
                {/* LOGO CONTAINER RESIZED */}
                <div className="relative mt-auto w-full h-[160px] lg:h-[180px] flex items-center justify-center">
                  <div className="absolute w-[100px] h-[100px] lg:w-[140px] lg:h-[140px] z-0">
                    <Image src={imgIconBg} alt="Icon background glow" layout="fill" objectFit="contain" />
                  </div>
                  <div className="absolute w-[150px] h-[85px] lg:w-[200px] lg:h-[115px] bottom-0 z-0">
                     <Image src={imgCardVector} alt="Card vector line" layout="fill" objectFit="contain" />
                  </div>
                  <div className="relative z-10 w-[120px] h-[120px] lg:w-[170px] lg:h-[170px]">
                    <Image src={service.logo} alt={`${service.title} Logo`} layout="fill" objectFit="contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
           {/* CTA Buttons */}
           <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 mt-8 lg:mt-16 w-full max-w-[400px] lg:max-w-none">
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
                    <Image src={imgArrowIcon} alt="arrow icon" width={18} height={18} />
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
      </div>
    </div>
  );
}