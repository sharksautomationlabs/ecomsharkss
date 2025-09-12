'use client';

import React from 'react';
import Image from 'next/image';

// Image assets for the section.
const imgShark = "/images/shark-underwater.png";
const imgArrowIcon = "/images/arrow-icon-2.svg";

// Data array holds all unique content for each card.
const careerData = [
  {
    title: "Announcements",
    description: "New Titles, Bestseller Achievements, And Award Nominations.",
    personImage: "/images/announcements-bg.png",
    maskImage: "/images/career-mask-1.svg", // This SVG shapes the blue overlay
    layout: "horizontal",
  },
  {
    title: "Career",
    description: "We’re Always Looking For Passionate People To Join Our Mission.",
    personImage: "/images/career-image1.png",
    maskImage: "/images/career-mask-3.svg",
    layout: "horizontal",
  },
  {
    title: "Blog",
    description: "Insights Into Amazon, Shopify, Walmart, Tiktok And Behind-The-Comerce Stories.",
    personImage: "/images/blog-image1.png",
    maskImage: "/images/career-mask-5.svg",
    layout: "vertical",
  },
];

// Reusable Card Component - Re-engineered for the correct visual layering.
const CareerCard = ({ title, description, personImage, maskImage }: {
  title: string;
  description: string;
  personImage: string;
  maskImage: string;
}) => (
  <div className="relative w-full rounded-3xl overflow-hidden min-h-[300px] lg:min-h-[350px]">
    
    {/* Layer 1 (Bottom, z-0): The full, unmasked image of the person. This is the base. */}
    <Image 
      src={personImage} 
      alt={`${title} background`} 
      layout="fill" 
      objectFit="cover" 
      className="z-0" 
    />

    {/* Layer 2 (Middle, z-10): The shaped, semi-transparent teal overlay. */}
    {/* THE FIX: This div applies the SVG mask. The gradient INSIDE has transparency, */}
    {/* allowing the person's image from Layer 1 to show through. */}
    <div 
      className="absolute inset-0 z-10"
      style={{
        maskImage: `url('${maskImage}')`,
        maskSize: '100% 100%',
        maskRepeat: 'no-repeat',
      }}
    >
      <div className="w-full h-full bg-gradient-to-br from-[#c8f5ff]/95 via-[#92dde9]/95 to-[#63bccd]/95" />
    </div>

    {/* Layer 3 (Upper Middle, z-20): The shark image. */}
    <div className="absolute top-1/2 left-1/2 -translate-x-3/4 -translate-y-1/2 w-[400px] h-[220px] opacity-80 transform -rotate-12 z-20">
      <Image src={imgShark} alt="Shark illustration" layout="fill" objectFit="contain" />
    </div>

    {/* Layer 4 (Top, z-30): Text and Button Content */}
    <div className="relative z-30 p-8 lg:p-10 h-full flex flex-col">
      <h2 
        className="text-5xl lg:text-6xl font-medium text-gray-800"
        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {title}
      </h2>
      <p 
        className="mt-2 text-xl text-gray-700 max-w-sm"
        style={{ fontFamily: "'Barlow', sans-serif" }}
      >
        {description}
      </p>
      
      <div className="mt-auto">
        <button className="flex items-center justify-between bg-white rounded-full h-16 w-52 pl-8 pr-1-5 group hover:shadow-lg transition-shadow">
          <span 
            className="font-semibold text-xl text-[#063f4a]"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Get Started
          </span>
          <span className="bg-[#063f4a] rounded-full w-12 h-12 flex items-center justify-center">
            <Image src={imgArrowIcon} alt="arrow icon" width={24} height={24} />
          </span>
        </button>
      </div>
    </div>
  </div>
);


export default function Careers() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Section Title */}
        <div className="text-center mb-16">
          <h1 
            className="text-7xl lg:text-8xl font-medium text-gray-800"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Career
          </h1>
        </div>
        
        {/* Responsive Grid for the cards */}
        <div className="space-y-8">
          {/* Top Row: Two Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {careerData.filter(item => item.layout === 'horizontal').map((card, index) => (
              <CareerCard key={index} {...card} />
            ))}
          </div>
          
          {/* Bottom Row: One Full-Width Card */}
          <div>
            {careerData.filter(item => item.layout === 'vertical').map((card, index) => (
              <CareerCard key={index} {...card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}