'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Image assets matching the website theme
const imgBlueWaveShape = "/images/service-bg-vector.svg";
const imgMaskShape = "/images/service-mask.svg";
const imgArrowIcon = "/images/arrow-icon.svg";
const imgChatIcon = "/images/chat-icon.svg";
const imgSharkUnderwater = "/images/shark-underwater-2.png";
const imgMissionShark = "/images/mission-shark-main.png";
const imgPatternBg = "/images/pattern-bg.png";
const imgFounder = "/images/founder.png";

// Reusable Button Component matching website theme
const GetQuoteButton = ({ small = false }: { small?: boolean }) => (
  <button 
    className={`group flex items-center justify-between bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full overflow-hidden relative ${small ? 'h-12 w-44 pl-6 pr-1' : 'h-14 w-48 pl-6 pr-1.5'}`}
    onClick={() => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({
          url: 'https://calendly.com/contact-sharksbookpublishers/30min?primary_color=35c4dd'
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

const ChatButton = () => (
  <button className="group flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#063f4a] transition-colors duration-300 rounded-full px-8 py-3 text-lg font-semibold" style={{ fontFamily: "'Barlow', sans-serif" }}>
    <Image src={imgChatIcon} alt="chat icon" width={20} height={20} />
    <span>Live Chat</span>
  </button>
);

// Social Media Icons
const SocialIcon = ({ path, label }: { path: string; label: string }) => (
  <a href="#" className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center hover:bg-[#35c4dd] hover:border-[#35c4dd] transition-all duration-300 group">
    <svg className="w-6 h-6 text-white group-hover:text-[#063f4a] transition-colors" fill="currentColor" viewBox="0 0 24 24">
      <path d={path}/>
    </svg>
  </a>
);

export default function IdentityPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const headerVariants: Variants = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

  const leftVariants: Variants = {
    hidden: { x: -200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

  const rightVariants: Variants = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 50,
        damping: 20,
        mass: 1.5,
      },
    },
  };

  const socialLinks = {
    facebook: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  };

  return (
    <div className="w-full bg-white overflow-x-hidden">
      <Header 
        heroTitle="Meet Ain - Founder of ECOM SHARKS"
        heroSubtitle="5+ Years of E-commerce Excellence | 300+ Team Members | 1000+ Years Combined Experience"
      />
      
      {/* Profile Section with Website Theme */}
      <section ref={ref} className="relative w-full bg-white pt-32 lg:pt-48">
        {/* Background elements matching website theme */}
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
                className="absolute inset-0 w-full h-full object-cover blur-md"
              >
                <source src="/images/bi-vid.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#052126]/40" />
            </div>
          </div>
        </div>

        <div className="relative z-20 container mx-auto px-20 pb-24 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Ain's Profile */}
            <motion.div 
              className="text-center lg:text-left"
              variants={leftVariants}
              initial="hidden"
              animate={controls}
            >
              <div className="relative mb-8">
                <div className="w-80 h-80 mx-auto lg:mx-0 rounded-full shadow-2xl border-4 border-white/20 overflow-hidden">
                  <Image 
                    src={imgFounder} 
                    alt="Ain - Founder of ECOM SHARKS" 
                    width={320} 
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <motion.h2 
                className="text-6xl font-semibold text-white mb-4" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 3px 6px rgba(0,0,0,0.5)' }}
                variants={headerVariants}
                initial="hidden"
                animate={controls}
              >
                Ain!
              </motion.h2>
              <motion.p 
                className="text-2xl text-[#35c4dd] mb-8" 
                style={{ fontFamily: "'Barlow', sans-serif", textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}
                variants={headerVariants}
                initial="hidden"
                animate={controls}
              >
                Sr. Ecommerce Consultant
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-8"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
              >
                <GetQuoteButton />
                <ChatButton />
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex gap-4 justify-center lg:justify-start"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
              >
                <SocialIcon path={socialLinks.facebook} label="Facebook" />
                <SocialIcon path={socialLinks.instagram} label="Instagram" />
                <SocialIcon path={socialLinks.linkedin} label="LinkedIn" />
              </motion.div>
            </motion.div>

            {/* Right Column - Who I'm Section */}
            <motion.div 
              variants={rightVariants}
              initial="hidden"
              animate={controls}
            >
              <motion.h3 
                className="text-5xl font-semibold text-white mb-8" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 3px 6px rgba(0,0,0,0.5)' }}
                variants={headerVariants}
                initial="hidden"
                animate={controls}
              >
                Who I'm
              </motion.h3>
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
              >
                <p className="text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Before I describe my experience and who I'm, let's talk about what truly matters to you—what you'll get. If you start your e-commerce store with me or my team, you'll likely earn at least $5,000 more in profit compared to working with someone new.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Why? Because I have 5+ years of additional experience in this field, and that directly translates into better product choices, smarter strategies, and faster growth. We're not just here to talk—we specialize in product hunting.
                </p>
                <p className="text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  And in e-commerce, if you have the right winning products, you can crack the market and earn as much as you want.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

       {/* Stats Section with Enhanced Design */}
       <section className="relative w-full bg-white py-32">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-5">
           <Image src={imgPatternBg} alt="Pattern background" layout="fill" objectFit="cover" />
         </div>
        
        <div className="relative z-10 container mx-auto px-20">
          <motion.div 
            className="text-center mb-16"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-5xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Numbers that speak for our expertise and commitment to excellence
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
             <motion.div 
               className="bg-[#35c4dd]/15 backdrop-blur-2xl border border-[#35c4dd]/25 rounded-3xl p-8 text-left flex flex-col service-card-flash shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
               variants={leftVariants}
             >
               {/* Glassmorphic overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
               
               <div className="relative z-10">
                 <h2 className="text-3xl font-bold text-[#063f4a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                   +5 Years
                 </h2>
                 <p className="mt-2 text-[#063f4a]/80 min-h-[6rem]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                   Experience in E-commerce Excellence. Proven track record of delivering exceptional results and driving business growth.
                 </p>
                 <ul className="space-y-3 mt-6">
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>E-commerce Strategy Development</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Multi-Platform Expertise</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Business Growth Optimization</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Proven Success Track Record</span>
                   </li>
                 </ul>
               </div>
             </motion.div>
            
             <motion.div 
               className="bg-[#35c4dd]/15 backdrop-blur-2xl border border-[#35c4dd]/25 rounded-3xl p-8 text-left flex flex-col service-card-flash shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
               variants={headerVariants}
             >
               {/* Glassmorphic overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
               
               <div className="relative z-10">
                 <h2 className="text-3xl font-bold text-[#063f4a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                   +300 Team
                 </h2>
                 <p className="mt-2 text-[#063f4a]/80 min-h-[6rem]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                   Dedicated Professionals working together to deliver exceptional results and comprehensive support for your business.
                 </p>
                 <ul className="space-y-3 mt-6">
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Expert Account Managers</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Marketing Specialists</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Customer Service Team</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Technical Support Staff</span>
                   </li>
                 </ul>
               </div>
             </motion.div>
            
             <motion.div 
               className="bg-[#35c4dd]/15 backdrop-blur-2xl border border-[#35c4dd]/25 rounded-3xl p-8 text-left flex flex-col service-card-flash shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
               variants={rightVariants}
             >
               {/* Glassmorphic overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
               
               <div className="relative z-10">
                 <h2 className="text-3xl font-bold text-[#063f4a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                   +1000 Years
                 </h2>
                 <p className="mt-2 text-[#063f4a]/80 min-h-[6rem]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                   Combined Team Experience across all platforms and services, ensuring comprehensive expertise and knowledge.
                 </p>
                 <ul className="space-y-3 mt-6">
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Amazon FBA Expertise</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Shopify Store Management</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>TikTok Shop Optimization</span>
                   </li>
                   <li className="flex items-start">
                     <span className="text-[#35c4dd] mr-3 mt-1.5 text-xs">&#9679;</span>
                     <span className="text-[#063f4a]/80" style={{ fontFamily: "'Barlow', sans-serif" }}>Walmart Marketplace</span>
                   </li>
                 </ul>
               </div>
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Results Section with Enhanced Design */}
      <section className="relative w-full bg-gradient-to-b from-white to-[#f8fafc] py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#35c4dd]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#063f4a]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-20">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-16"
              variants={headerVariants}
            >
              <h3 
                className="text-6xl font-bold text-[#063f4a] mb-6" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                My Results Talks
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-[#35c4dd] to-[#063f4a] mx-auto rounded-full"></div>
            </motion.div>
            
            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                className="space-y-8"
                variants={leftVariants}
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#35c4dd] to-[#063f4a] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>1</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#063f4a] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Strategic Excellence
                      </h4>
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        At ECOM SHARKS, we believe that with the right strategy and unwavering dedication, anyone can take their business to significant levels. Our mission is to empower entrepreneurs to achieve success through tailored solutions for Amazon, Walmart, Shopify, & TikTok.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#35c4dd] to-[#063f4a] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>2</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-[#063f4a] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Expert Team Support
                      </h4>
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        Our expert team ensures your products stand out. We provide comprehensive support and innovative strategies that propel your business forward, ensuring sustained growth and unmatched success.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Content - Quote Card */}
              <motion.div 
                className="relative"
                variants={rightVariants}
              >
                <div className="bg-gradient-to-br from-[#35c4dd] to-[#063f4a] rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <Image src={imgPatternBg} alt="Pattern background" layout="fill" objectFit="cover" />
                  </div>
                  
                  {/* Quote Icon */}
                  <div className="relative z-10 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                  
                  <blockquote className="relative z-10 text-2xl leading-relaxed mb-8" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    "Success in e-commerce isn't just about having great products—it's about having the right strategy, the right team, and the right mindset to scale your business to new heights."
                  </blockquote>
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                      <Image 
                        src={imgFounder} 
                        alt="Ain - Founder" 
                        width={48} 
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xl font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Ain
                      </div>
                      <div className="text-white/80" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        Founder of ECOMSHARKS
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-8 right-8 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-1000"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

       {/* Get in Touch Section with Enhanced Design */}
       <section className="relative w-full py-32 text-white overflow-hidden">
         {/* Background Video */}
         <div className="absolute inset-0">
           <video 
             autoPlay 
             loop 
             muted 
             playsInline
             className="absolute inset-0 w-full h-full object-cover"
           >
             <source src="/images/bi-vid.mp4" type="video/mp4" />
           </video>
           <div className="absolute inset-0 bg-gradient-to-br from-[#35c4dd]/80 to-[#063f4a]/80"></div>
         </div>
         
         {/* Background Elements */}
         <div className="absolute inset-0">
           <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
           <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
         </div>
        
        {/* Floating Shark */}
        <div 
          className="absolute top-20 right-20 w-24 h-24 opacity-20"
          style={{ 
            animation: 'float 4s ease-in-out infinite',
            transform: `translateX(${scrollPosition * 0.05}px)`
          }}
        >
          <Image src={imgSharkUnderwater} alt="Shark" layout="fill" objectFit="contain" className="transform -scale-x-100" />
        </div>
        
        <div className="relative z-10 container mx-auto px-20">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-16"
              variants={headerVariants}
            >
              <h3 
                className="text-7xl font-bold mb-6" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 4px 8px rgba(0,0,0,0.3)' }}
              >
                Get in Touch
              </h3>
              <p 
                className="text-3xl font-semibold mb-8" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 2px 4px rgba(0,0,0,0.3)' }}
              >
                with my direct line number
              </p>
              <div className="w-32 h-1 bg-white/30 mx-auto rounded-full"></div>
            </motion.div>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                className="space-y-8"
                variants={leftVariants}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>💡</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Free Consultation
                      </h4>
                      <p className="text-white/90 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        Let's talk about the 5 biggest mistakes you should avoid before starting an e-commerce store. These mistakes can cost you time, money, and serious growth if you're not aware of them.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>💰</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Save $10,000+
                      </h4>
                      <p className="text-white/90 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        I can help you save at least $10,000 in avoidable losses. Let's hop on a quick call—absolutely free. Normally, my time is valued at $50 per minute, but I'm offering you 5 minutes at no cost—that's $250 in value, completely free.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>🚀</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Start Strong
                      </h4>
                      <p className="text-white/90 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        Let's connect so you can start strong, avoid the common traps, and build a store that actually performs. Looking forward to speaking with you!
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Right Content - CTA Card */}
              <motion.div 
                className="relative"
                variants={rightVariants}
              >
                <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-12 border border-white/30 shadow-2xl relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <Image src={imgPatternBg} alt="Pattern background" layout="fill" objectFit="cover" />
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/30 mx-auto mb-8">
                      <Image 
                        src={imgFounder} 
                        alt="Ain - Founder" 
                        width={80} 
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h4 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Ready to Start?
                    </h4>
                    <p className="text-white/90 mb-8 text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Book your free consultation call with Ain today and take the first step towards e-commerce success.
                    </p>
                    
                    <div className="space-y-4">
                      <button 
                        className="w-full bg-white text-[#063f4a] font-semibold py-4 px-8 rounded-full text-xl shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105" 
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                        onClick={() => {
                          if (typeof window !== 'undefined' && (window as any).Calendly) {
                            (window as any).Calendly.initPopupWidget({
                              url: 'https://calendly.com/contact-sharksbookpublishers/30min?primary_color=35c4dd'
                            });
                          }
                        }}
                      >
                        Book Free Call
                      </button>
                      <button 
                        className="w-full bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-full text-xl hover:bg-white hover:text-[#063f4a] transition-all duration-300" 
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                        onClick={() => {
                          window.location.href = '/contact';
                        }}
                      >
                        Send Message
                      </button>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/20">
                      <p className="text-white/80 text-sm" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        ⏰ Limited time offer • 🎯 5-minute consultation • 💯 100% free
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-6 right-6 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-1000"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}