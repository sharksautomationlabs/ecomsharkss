'use client';

import React from 'react';
import Image from 'next/image';
const imgChatCircleDots = "/images/chat-icon.svg";

// Image assets used in this component.
const imgBackground = "/images/shark-ocean-main.png";
const imgBlueWaveShape = "/images/service-bg-vector.svg";
const imgMaskShape = "/images/service-mask.svg";
const imgArrowIcon = "/images/arrow-icon.svg";
const imgChatIcon = "/images/chat-icon.svg";

// Pricing plan data.
const pricingPlans = [
  {
    title: "Basic",
    description: "Optimize your store with expert assistance and marketing strategies for up to 50 products.",
    features: ["Full account setup and optimization", "Product listing management for up to 50 items", "Basic marketing and advertising support", "Monthly performance reports", "Customer service management"],
  },
  {
    title: "Standard",
    description: "Elevate your online presence with advanced optimization and support for 100 products.",
    features: ["Comprehensive account setup and advanced optimization", "Product listing management for up to 100 items", "Advanced marketing and advertising strategies", "Weekly performance analytics", "Dedicated account manager", "Customer service management", "Inventory management support", "Access to premium resources and tutorials"],
  },
  {
    title: "Premium",
    description: "Ultimate e-commerce solution with custom services & dedicated support for your business.",
    features: ["Tailored account setup and full optimization", "Unlimited product listing management", "Custom marketing and advertising campaigns", "Real-time performance analytics", "Dedicated team of account managers", "Comprehensive customer service solutions", "Advanced inventory and supply chain management", "Customized training and support", "Access to exclusive tools and resources"],
  },
];

// Reusable Button Component with Barlow font applied.
const GetQuoteButton = ({ small = false }: { small?: boolean }) => (
  <button 
    className={`group flex items-center justify-center lg:justify-between bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full overflow-hidden relative gap-3 ${small ? 'h-12 w-full lg:w-44 pl-6 pr-1' : 'h-14 w-full lg:w-48 pl-6 pr-1.5'}`}
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
    <span 
      className={`font-semibold text-[#063f4a] relative z-10 ${small ? 'text-lg' : 'text-xl'}`}
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      Get A Quote
    </span>
    <span className={`bg-white rounded-full flex items-center justify-center relative z-10 ${small ? 'w-10 h-10' : 'w-10 h-10'}`}>
      <Image src={imgArrowIcon} alt="arrow icon" width={small ? 20 : 20} height={small ? 20 : 20} />
    </span>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
  </button>
);

export default function Pricing() {
  return (
    // This structure correctly creates the wavy top border without breaking page flow.
    <div className="relative w-full bg-white pt-16 lg:pt-32 xl:pt-48 min-h-[800px] lg:min-h-[1000px]">
      
      {/* Background elements are absolutely positioned and fill the parent container. */}
      <div className="absolute top-0 left-0 right-0 bottom-0">
        <div className="absolute inset-0 z-0">
          <Image src={imgBlueWaveShape} alt="Wavy background shape" layout="fill" objectFit="cover" objectPosition="top" />
        </div>
        <div className="absolute inset-0 z-10" 
             style={{
                maskImage: `url('${imgMaskShape}')`,
                maskSize: 'cover',
                maskRepeat: 'no-repeat',
                maskPosition: 'top center',
             }}>
          <div className="relative w-full h-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center blur-md"
            >
              <source src="/images/bi-vid.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#052126]/40" />
          </div>
        </div>
      </div>

      {/* Content container flows naturally and dictates the component's height. */}
      <div className="relative z-20 container mx-auto px-5 lg:px-20 pb-16 lg:pb-24 text-white">
        <div className="text-center pt-24 lg:pt-0">
          {/* FONT APPLIED: Barlow Condensed for the main heading */}
          <h1 
            className="text-3xl lg:text-5xl xl:text-6xl font-bold tracking-wide leading-tight" 
            style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 3px 6px rgba(0,0,0,0.5)' }}
          >
            Choose a variety of price options
          </h1>
          {/* FONT APPLIED: Barlow for the paragraph */}
          <p 
            className="mt-4 max-w-4xl mx-auto text-base lg:text-lg text-gray-200 leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Explore our diverse range of pricing plans tailored to meet your needs...
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 lg:mt-16 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <div key={plan.title} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-left flex flex-col service-card-flash">
              {/* FONT APPLIED: Barlow Condensed for card titles */}
              <h2 className="text-2xl lg:text-3xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>{plan.title}</h2>
              {/* FONT APPLIED: Barlow for card description */}
              <p className="mt-2 text-gray-200 min-h-[5rem] lg:min-h-[6rem] text-sm lg:text-base" style={{ fontFamily: "'Barlow', sans-serif" }}>{plan.description}</p>
              <div className="my-4 lg:my-6">
                <GetQuoteButton small />
              </div>
              <ul className="space-y-2 lg:space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-[#35c4dd] mr-2 lg:mr-3 mt-1.5 text-xs">&#9679;</span>
                    {/* FONT APPLIED: Barlow for feature list items */}
                    <span className="text-sm lg:text-base" style={{ fontFamily: "'Barlow', sans-serif" }}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA Buttons */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-6 mt-16 lg:mt-20">
          <GetQuoteButton />
              <button className="flex items-center justify-center lg:justify-between gap-3 w-full lg:w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-0 lg:pl-5 text-[#063f4a] font-semibold text-base lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
        </div>
      </div>
    </div>
  );
}