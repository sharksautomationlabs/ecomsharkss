'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Image assets for the section.
const imgArrowIcon = "/images/arrow-icon-2.svg";

// Data array holds all unique content for each card.
const careerData = [
  {
    title: "Announcements",
    description: "New Titles, Bestseller Achievements, And Award Nominations.",
    personImage: "/images/Asset1.png",
  },
  {
    title: "Career",
    description: "We're Always Looking For Passionate People To Join Our Mission.",
    personImage: "/images/Asset2.png",
  },
  {
    title: "Blog",
    description: "Insights Into Amazon, Shopify, Walmart, Tiktok And Behind-The-Comerce Stories.",
    personImage: "/images/Asset3.png",
  },
  {
    title: "News",
    description: "Latest Updates, Industry Insights, And Company News.",
    personImage: "/images/Asset4.png",
  },
];

// Reusable Card Component - Updated with motion and hover animations
const CareerCard = ({ title, description, personImage, variants }: {
  title: string;
  description: string;
  personImage: string;
  variants: Variants;
}) => (
  <motion.div 
    className="relative w-full rounded-2xl overflow-hidden min-h-[350px] lg:min-h-[400px]"
    variants={variants}
    whileHover="hover" // Use the "hover" key from our variants
    initial="initial"
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    
    {/* Animated Background Image */}
    <motion.div
      className="absolute inset-0 z-0"
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.1 }, // Zoom in on hover
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <Image 
        src={personImage} 
        alt={`${title} background`} 
        layout="fill" 
        objectFit="cover" 
      />
    </motion.div>

    {/* Animated Text and Button Content */}
    {/* MODIFICATION: The container itself is now animated on hover */}
    <motion.div 
      className="absolute inset-0 z-30 p-8 flex flex-col justify-end" // Changed to justify-end
      variants={{
        initial: { y: 0 },
        hover: { y: -20 }, // Move up on hover
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* MODIFICATION: Removed pt-32, using justify-end on parent */}
      <div> 
        <h2 
          className="text-4xl lg:text-5xl font-medium text-white drop-shadow-lg"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {title}
        </h2>
        <p 
          className="mt-2 text-lg text-white drop-shadow-md max-w-sm"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {description}
        </p>
      </div>
      
      {/* MODIFICATION: Adjusted margin-top for better spacing */}
      <div className="mt-8 -ml-4">
        <button className="flex items-center justify-between bg-white rounded-full h-14 w-48 pl-6 pr-1-5 group hover:shadow-lg transition-shadow">
          <span 
            className="font-semibold text-xl text-[#063f4a]"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            Get Started
          </span>
          <span className="bg-[#063f4a] rounded-full w-10 h-10 flex items-center justify-center">
            <Image src={imgArrowIcon} alt="arrow icon" width={24} height={24} />
          </span>
        </button>
      </div>
    </motion.div>
  </motion.div>
);


export default function Careers() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section ref={ref} className="w-full bg-white py-24">
      <div className="container mx-auto px-20">
        
        <div className="text-center mb-16">
          <h1 
            className="text-7xl lg:text-8xl font-medium text-gray-800"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Career
          </h1>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {careerData.map((card, index) => (
            <CareerCard key={index} {...card} variants={cardVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}