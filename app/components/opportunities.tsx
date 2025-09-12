'use client';

import React from 'react';
import Image from 'next/image';
const imgChatCircleDots = "/images/chat-icon.svg";

// Image assets for the section.
const imgSharkOceanBg = "/images/shark-ocean-bg.png";
const imgSharkUnderwater = "/images/shark-underwater-2.png";
const imgBgVector = "/images/bg-vector-1.svg"; // This is the main wavy background shape.
const imgBgMask = "/images/shark-ocean-mask.svg"; // This masks the blurred background.
const imgClappingHandsIcon = "/images/hands-clapping.svg";
const imgChatIcon = "/images/chat-icon.svg";
const imgArrowIcon = "/images/arrow-icon-3.svg";
const imgCardMask = "/images/pattern-mask.svg"; // This mask creates the unique card shape.

// Data for the two cards to keep the code clean and scalable.
const cardData = [
  {
    title: "Departments:",
    description: "Ecom Account Managers, Design, Marketing, Production, Sales, Finance, HR.",
    backgroundImage: "/images/departments-image.png",
  },
  {
    title: "Opportunities:",
    description: "Full-time roles, internships, and freelance partnerships.",
    backgroundImage: "/images/opportunities-image.png",
  }
];

// Reusable Card component for a DRY approach.
const InfoCard = ({ title, description, backgroundImage }: {
  title: string;
  description: string;
  backgroundImage: string;
}) => (
  <div className="flex flex-col text-center text-white">
    {/* Masked Image Container */}
    <div 
      className="relative w-full h-[450px]"
      style={{
        maskImage: `url('${imgCardMask}')`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
      }}
    >
      <Image src={backgroundImage} alt={title} layout="fill" objectFit="cover" className="rounded-2xl"/>
    </div>
    
    {/* Text Content */}
    <div className="mt-8">
      <h3 
        className="text-5xl"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {title}
      </h3>
      <p 
        className="mt-4 text-xl"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {description}
      </p>
    </div>
  </div>
);


export default function Opportunities() {
  return (
    // NOTE: Removed fixed height `h-[1000px]` to allow the component to be naturally responsive.
    <section className="relative w-full bg-white">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0">
        <Image src={imgBgVector} alt="Wavy background shape" layout="fill" objectFit="cover" objectPosition="bottom"/>
        <div 
          className="absolute inset-0"
          style={{
            maskImage: `url('${imgBgMask}')`,
            maskSize: '100% 100%',
          }}
        >
          <Image src={imgSharkOceanBg} alt="Underwater background" layout="fill" objectFit="cover" className="blur-md"/>
        </div>
      </div>
      
      <div className="relative z-10 container mx-auto px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-24 items-start">
        
        {/* Left Column: Main Text & Shark */}
        <div className="relative flex flex-col text-white">
          
          {/* THE FIX: Wrapper for text and buttons to control their position. */}
          {/* `pt-12` pushes content down. `pl-8` pushes content right. */}
          <div className="relative z-20 pt-12 pl-8">
            <h1 
              className="text-8xl lg:text-9xl font-semibold leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Careers
            </h1>
            <h2 
              className="mt-6 text-4xl lg:text-5xl font-semibold max-w-md"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              We're always looking for passionate people to join our mission.
            </h2>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <button className="flex items-center justify-between bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full h-16 w-60 pl-8 pr-1.5">
                <span className="font-semibold text-xl text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>Order You Book</span>
                <span className="bg-white rounded-full flex items-center justify-center w-12 h-12">
                  <Image src={imgArrowIcon} alt="arrow icon" width={24} height={24} />
                </span>
              </button>
              <button className="flex items-center justify-between w-[191px] h-[64px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
                  <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
                  <div className="w-[50px] h-[50px] bg-[#063f4a] rounded-full flex items-center justify-center">
                      <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
                  </div>
              </button>
            </div>
          </div>

          {/* THE FIX: The shark container is absolute to the column, larger, and shifted left. */}
          <div className="absolute top-55 -left-32 w-[140%] h-[800px] z-10">
            <Image src={imgSharkUnderwater} alt="Shark underwater" layout="fill" objectFit="contain" />
          </div>
        </div>

        {/* Right Column: Cards & Banner */}
        <div className="flex flex-col gap-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {cardData.map((card, index) => (
              <InfoCard key={index} {...card} />
            ))}
          </div>
          <div className="bg-[#35c4dd] rounded-2xl p-6 flex items-center gap-4 text-[#063f4a]">
            <Image src={imgClappingHandsIcon} alt="Clapping hands icon" width={48} height={48} />
            <p className="text-2xl font-medium" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Work in a creative, collaborative environment where every story matters.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}