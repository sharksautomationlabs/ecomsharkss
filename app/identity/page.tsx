'use client';

import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

// Image assets matching the website theme
const imgBlueWaveShape = "/images/service-bg-vector.svg";
const imgMaskShape = "/images/service-mask.svg";
const imgArrowIcon = "/images/arrow-icon.svg";
const imgChatIcon = "/images/chat-icon.svg";
const imgSharkUnderwater = "/images/shark-underwater-2.png";
// const imgMissionShark = "/images/mission-shark-main.png";
const imgPatternBg = "/images/pattern-bg.png";
const imgFounders = "/images/founders.png";

// Reusable Button Component matching website theme
const GetQuoteButton = ({ small = false }: { small?: boolean }) => (
  <button 
    className={`group flex items-center justify-center lg:justify-between gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full overflow-hidden relative ${small ? 'h-12 w-full lg:w-44 pl-6 pr-1' : 'h-14 w-full lg:w-48 pl-6 pr-1.5'}`}
    onClick={() => {
      if (typeof window !== 'undefined' && (window as unknown as { Calendly?: { initPopupWidget: (options: { url: string }) => void } }).Calendly) {
        (window as unknown as { Calendly: { initPopupWidget: (options: { url: string, onEventScheduled?: (e: any) => void }) => void } }).Calendly.initPopupWidget({
          url: 'https://calendly.com/ecomsharkss-info/30min',
          onEventScheduled: function(e: any) {
            // Redirect to thank you page when appointment is scheduled
            window.location.href = '/thank-you';
          }
        });
      }
    }}
  >
    <span 
      className={`font-semibold text-[#063f4a] relative z-10 ${small ? 'text-base lg:text-lg' : 'text-lg lg:text-base lg:text-xl'}`}
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      Get A Quote
    </span>
    <span className={`bg-white rounded-full flex items-center justify-center relative z-10 ${small ? 'w-10 h-10' : 'w-10 h-10'}`}>
      <Image src={imgArrowIcon} alt="arrow icon" width={small ? 18 : 20} height={small ? 18 : 20} />
    </span>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
  </button>
);

const ChatButton = () => (
  <button className="flex items-center justify-between w-full lg:w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
    <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
    <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
      <Image src={imgChatIcon} alt="chat icon" width={28} height={28} />
    </div>
  </button>
);

// Social Media Icons
const SocialIcon = ({ path, label, href }: { path: string; label: string; href?: string }) => (
  <a href={href || "#"} className="w-12 h-12 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center hover:bg-[#35c4dd] hover:border-[#35c4dd] transition-all duration-300 group">
    <svg className="w-6 h-6 text-white group-hover:text-[#063f4a] transition-colors" fill="currentColor" viewBox="0 0 24 24">
      <path d={path}/>
    </svg>
  </a>
);

export default function IdentityPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedTeamMember, setSelectedTeamMember] = useState<'Aain' | 'zayn' | 'sharjeel' | 'minhaj' | null>(null);
  const controls = useAnimation();
  const { videoRef, isInView } = useVideoLazyLoading();
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
        staggerChildren: 0,
        delayChildren: 0,
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
        type: 'tween',
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const rightVariants: Variants = {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.5,
        ease: 'easeOut',
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
        heroTitle="Meet Our Leadership Team - ECOM SHARKS"
        heroSubtitle="10+ Years of E-commerce Excellence | 40+ Team Members | 30+ Years Combined Experience"
        topNavText="🌟 Simplify, Scale, Succeed: Your All-in-One Ecommerce Hub"
      />
      
      {/* Profile Section with Website Theme */}
      <section ref={ref} className="relative w-full bg-white pt-16 lg:pt-32 xl:pt-48">
        {/* Background elements matching website theme */}
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="absolute inset-0 z-0">
            <Image src={imgBlueWaveShape} alt="Wavy background shape" fill className="object-cover object-top" />
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
                ref={videoRef}
                autoPlay={isInView}
                loop 
                muted 
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover blur-md"
                poster="/images/bi-vid.jpeg"
              >
                <source src="/images/bi-vid.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#052126]/40" />
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-5 lg:px-5 lg:px-20 pb-16 lg:pb-24 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 lg:p-8 lg:gap-16 items-center">
            
            {/* Left Column - Dynamic Founders Profile */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              <div className="relative mb-6 lg:mb-8 mt-8 lg:mt-12">
                <div className="w-80 h-80 lg:w-96 lg:h-96 mx-auto lg:mx-0 rounded-full shadow-2xl border-4 border-white/20 overflow-hidden">
                  <Image 
                    src={selectedTeamMember === 'zayn' ? "/images/founder-1s.png" : selectedTeamMember === 'sharjeel' ? "/images/founder-2.png" : selectedTeamMember === 'minhaj' ? "/images/founder-3.jpg" : imgFounders} 
                    alt={selectedTeamMember === 'zayn' ? "Zayn - Senior E-commerce Consultant" : selectedTeamMember === 'sharjeel' ? "Sharjeel - Sr. Automation Consultation" : selectedTeamMember === 'minhaj' ? "Minhaj - E-commerce Visionary" : "Aain - Senior E-commerce Consultant"} 
                    width={384} 
                    height={384}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: selectedTeamMember === 'minhaj' ? '85% 0%' : selectedTeamMember === 'zayn' ? 'center 30%' : selectedTeamMember === 'sharjeel' ? 'center 20%' : selectedTeamMember === 'Aain' ? 'center 20%' : 'center center' }}
                    priority
                    quality={90}
                  />
                </div>
              </div>
              
              <h2 
                className="text-4xl lg:text-6xl font-semibold text-white mb-4" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 3px 6px rgba(0,0,0,0.5)' }}
              >
                {selectedTeamMember === 'zayn' ? 'Zayn!' : selectedTeamMember === 'sharjeel' ? 'Sharjeel!' : selectedTeamMember === 'minhaj' ? 'Minhaj!' : 'Aain!'}
              </h2>
              <p 
                className="text-lg lg:text-2xl text-[#35c4dd] mb-6 lg:mb-8" 
                style={{ fontFamily: "'Barlow', sans-serif", textShadow: '0px 2px 4px rgba(0,0,0,0.5)' }}
              >
                 {selectedTeamMember === 'zayn' ? 'Senior E-commerce Consultant' : selectedTeamMember === 'sharjeel' ? 'Sr. Automation Consultation' : selectedTeamMember === 'minhaj' ? 'E-commerce Visionary' : 'Sr. Ecommerce Consultant'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start mb-6 lg:mb-8">
                <GetQuoteButton />
                <ChatButton />
              </div>

              {/* Social Links */}
              <div className="flex gap-4 justify-center lg:justify-start">
                {selectedTeamMember === 'zayn' ? (
                  <>
                    <SocialIcon path={socialLinks.instagram} label="Instagram" href="https://www.instagram.com/muhammadzayaanofficial/" />
                    <SocialIcon path={socialLinks.facebook} label="Facebook" href="https://www.facebook.com/profile.php?id=61580837862800" />
                    <SocialIcon path={socialLinks.linkedin} label="LinkedIn" href="https://www.linkedin.com/in/muhammad-zayaan-b7b220259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" />
                  </>
                ) : selectedTeamMember === 'sharjeel' ? (
                  <>
                    <SocialIcon path={socialLinks.instagram} label="Instagram" href="https://www.instagram.com/sharjeelzahoorofficial/" />
                    <SocialIcon path={socialLinks.linkedin} label="LinkedIn" href="https://www.linkedin.com/in/sharjeel-zahoor-6a743927a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" />
                  </>
                ) : selectedTeamMember === 'minhaj' ? (
                  <>
                    <SocialIcon path={socialLinks.instagram} label="Instagram" href="https://www.instagram.com/minhaj_official/" />
                    <SocialIcon path={socialLinks.linkedin} label="LinkedIn" href="https://www.linkedin.com/in/minhaj-visionary" />
                    <SocialIcon path={socialLinks.facebook} label="Facebook" href="https://www.facebook.com/minhaj.ecomsharkss" />
                  </>
                ) : (
                  <>
                    <SocialIcon path={socialLinks.instagram} label="Instagram" href="https://www.instagram.com/iamaainali?utm_source=qr&igsh=MTNjOGU4OXUwM3BwdQ==" />
                    <SocialIcon path={socialLinks.linkedin} label="LinkedIn" href="https://www.linkedin.com/in/aainali?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" />
                  </>
                )}
              </div>
            </motion.div>

            {/* Right Column - Interactive Founders Selection */}
            <motion.div 
              variants={rightVariants}
              initial="hidden"
              animate={controls}
            >
              <motion.h3 
                className="text-3xl lg:text-5xl font-semibold text-white mb-4 lg:mb-6 text-center lg:text-left" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 3px 6px rgba(0,0,0,0.5)' }}
                variants={headerVariants}
                initial="hidden"
                animate={controls}
              >
                Meet Our Leadership Team
              </motion.h3>
              <motion.p 
                className="text-base lg:text-lg text-gray-300 mb-6 lg:mb-8 text-center lg:text-left" 
                style={{ fontFamily: "'Barlow', sans-serif" }}
                variants={headerVariants}
                initial="hidden"
                animate={controls}
              >
                Click on a team member to learn more about them
              </motion.p>
              
              {/* Team Member Selection Buttons */}
               <motion.div 
                 className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2 lg:gap-3 mb-8 justify-items-center"
                 variants={containerVariants}
                 initial="hidden"
                 animate={controls}
               >
                <button
                  onClick={() => setSelectedTeamMember('Aain')}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                    selectedTeamMember === 'Aain' 
                      ? 'border-[#35c4dd] shadow-lg shadow-[#35c4dd]/50' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <Image 
                    src={imgFounders} 
                    alt="Aain" 
                    width={80} 
                    height={80}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </button>
                
                <button
                  onClick={() => setSelectedTeamMember('zayn')}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                    selectedTeamMember === 'zayn' 
                      ? 'border-[#35c4dd] shadow-lg shadow-[#35c4dd]/50' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <Image 
                    src="/images/founder-1s.png" 
                    alt="Zayn" 
                    width={80} 
                    height={80}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 30%' }}
                  />
                </button>
                
                <button
                  onClick={() => setSelectedTeamMember('sharjeel')}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                    selectedTeamMember === 'sharjeel' 
                      ? 'border-[#35c4dd] shadow-lg shadow-[#35c4dd]/50' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <Image 
                    src="/images/founder-2.png" 
                    alt="Sharjeel" 
                    width={80} 
                    height={80}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 20%' }}
                  />
                </button>
                
                <button
                  onClick={() => setSelectedTeamMember('minhaj')}
                  className={`w-20 h-20 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                    selectedTeamMember === 'minhaj' 
                      ? 'border-[#35c4dd] shadow-lg shadow-[#35c4dd]/50' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                >
                  <Image 
                    src="/images/founder-3.jpg" 
                    alt="Minhaj" 
                    width={80} 
                    height={80}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '85% 0%' }}
                  />
                </button>
              </motion.div>

              {/* Dynamic Content Based on Selected Team Member - Only shows when a team member is selected */}
              {selectedTeamMember && (
                <div 
                  className="space-y-4 lg:space-y-6"
                >
                  {selectedTeamMember === 'Aain' ? (
                    <>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  With over 5 years of experience in e-commerce consulting, I specialize in helping businesses optimize their online presence across multiple platforms. My expertise covers Amazon FBA, Shopify store management, and digital marketing strategies.
                </p>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  I focus on data-driven approaches to product research, inventory management, and customer acquisition. My goal is to help businesses scale efficiently while maintaining healthy profit margins.
                </p>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Success in e-commerce requires the right combination of market research, strategic planning, and consistent execution. I work with clients to develop sustainable growth strategies.
                </p>
                    </>
                  ) : selectedTeamMember === 'zayn' ? (
                    <>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        As a Senior E-commerce Consultant, I focus on identifying profitable opportunities and optimizing product performance across various platforms. My approach combines market analysis with practical implementation strategies.
                      </p>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        I work with businesses to develop comprehensive product strategies, from initial research to launch optimization. My expertise includes trend analysis, competitive research, and performance tracking.
                      </p>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        Success in e-commerce comes from understanding market dynamics, consumer behavior, and platform-specific requirements. I help clients navigate these complexities to achieve sustainable growth.
                </p>
                    </>
                  ) : selectedTeamMember === 'minhaj' ? (
                    <>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        ECOM SHARKS began with a simple belief: that building an online store shouldn't be complicated. Over the years, that belief has grown into a platform trusted by thousands of entrepreneurs worldwide.
                      </p>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        With ECOM SHARKS 2.0, we're taking that vision global. Faster performance, smarter tools, and deeper integrations, all built on the foundation of trust we've earned from our community.
                      </p>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        The journey ahead is exciting, and we're just getting started. My vision is to make e-commerce accessible, profitable, and sustainable for entrepreneurs everywhere.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        As a Senior Automation Specialist, I specialize in creating automated solutions that streamline e-commerce operations. My expertise covers workflow automation, process optimization, and system integration across multiple platforms.
                      </p>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        I focus on developing custom automation tools that reduce manual work, increase efficiency, and improve accuracy. My goal is to help businesses scale their operations through intelligent automation systems.
                      </p>
                      <p className="text-base lg:text-xl text-gray-200 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        Success in automation comes from understanding business processes, identifying optimization opportunities, and implementing scalable solutions. I work with clients to transform their operations through strategic automation.
                      </p>
                    </>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>


       {/* Stats Section with Enhanced Design */}
       <section className="relative w-full bg-white py-16 lg:py-16 lg:py-32">
         {/* Background Pattern */}
         <div className="absolute inset-0 opacity-5">
           <Image src={imgPatternBg} alt="Pattern background" fill className="object-cover" />
         </div>
        
        <div className="relative z-10 container mx-auto px-5 lg:px-5 lg:px-20">
          <motion.div 
            className="text-center mb-8 lg:mb-8 lg:mb-16"
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-3xl lg:text-3xl lg:text-5xl font-bold text-[#063f4a] mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Our Achievements
            </h2>
            <p className="text-base lg:text-base lg:text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Numbers that speak for our expertise and commitment to excellence
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-6 lg:gap-6 lg:p-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
             <motion.div 
               className="bg-[#35c4dd]/15 backdrop-blur-2xl border border-[#35c4dd]/25 rounded-2xl lg:rounded-2xl lg:rounded-3xl p-6 lg:p-6 lg:p-8 text-left flex flex-col service-card-flash shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
               variants={leftVariants}
             >
               {/* Glassmorphic overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl lg:rounded-3xl"></div>
               
               <div className="relative z-10">
                 <h2 className="text-3xl font-bold text-[#063f4a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                   10+ Years
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
               className="bg-[#35c4dd]/15 backdrop-blur-2xl border border-[#35c4dd]/25 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-left flex flex-col service-card-flash shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
               variants={headerVariants}
             >
               {/* Glassmorphic overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl lg:rounded-3xl"></div>
               
               <div className="relative z-10">
                 <h2 className="text-3xl font-bold text-[#063f4a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                   40+ Team
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
               className="bg-[#35c4dd]/15 backdrop-blur-2xl border border-[#35c4dd]/25 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-left flex flex-col service-card-flash shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden"
               variants={rightVariants}
             >
               {/* Glassmorphic overlay */}
               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl lg:rounded-3xl"></div>
               
               <div className="relative z-10">
                 <h2 className="text-3xl font-bold text-[#063f4a]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                   30+ Combined
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
      <section className="relative w-full bg-gradient-to-b from-white to-[#f8fafc] py-16 lg:py-16 lg:py-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#35c4dd]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#063f4a]/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-5 lg:px-20">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-8 lg:mb-16"
              variants={headerVariants}
            >
              <h3 
                className="text-4xl lg:text-6xl font-bold text-[#063f4a] mb-6" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                My Results Talks
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-[#35c4dd] to-[#063f4a] mx-auto rounded-full"></div>
            </motion.div>
             
             {/* Screenshots Gallery */}
             <motion.div 
               className="mb-12 lg:mb-16"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: false, amount: 0.3 }}
             >
               <h4 className="text-2xl lg:text-3xl font-bold text-[#063f4a] mb-6 text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                 Real Results Screenshots
               </h4>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto mt-8">
                 {/* Left side screenshots - animate from left */}
                 <motion.div 
                   className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
                   variants={leftVariants}
                 >
                   <div className="w-full h-48 lg:h-56 rounded-xl overflow-hidden">
                     <Image 
                       src="/images/amazon-sale1.jpg" 
                       alt="Amazon Sales Screenshot 1" 
                       width={300} 
                       height={300}
                       className="w-full h-full object-cover"
                       style={{ objectPosition: 'center 30%' }}
                       loading="lazy"
                       quality={85}
                     />
                   </div>
                   <div className="mt-3 text-center">
                     <p className="text-sm font-semibold text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                       Amazon FBA Results
                     </p>
                   </div>
                 </motion.div>
                 
                 {/* Left side screenshots - animate from left */}
                 <motion.div 
                   className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
                   variants={leftVariants}
                 >
                   <div className="w-full h-48 lg:h-56 rounded-xl overflow-hidden">
                     <Image 
                       src="/images/tiktok-sale1.jpg" 
                       alt="TikTok Sales Screenshot 1" 
                       width={300} 
                       height={300}
                       className="w-full h-full object-cover"
                       style={{ objectPosition: 'center 30%' }}
                       loading="lazy"
                       quality={85}
                     />
                   </div>
                   <div className="mt-3 text-center">
                     <p className="text-sm font-semibold text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                       TikTok Shop Results
                     </p>
                   </div>
                 </motion.div>
                 
                 {/* Right side screenshots - animate from right */}
                 <motion.div 
                   className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
                   variants={rightVariants}
                 >
                   <div className="w-full h-48 lg:h-56 rounded-xl overflow-hidden">
                     <Image 
                       src="/images/walmart-sale1.jpg" 
                       alt="Walmart Sales Screenshot 1" 
                       width={300} 
                       height={300}
                       className="w-full h-full object-cover"
                       style={{ objectPosition: 'center 30%' }}
                       loading="lazy"
                       quality={85}
                     />
                   </div>
                   <div className="mt-3 text-center">
                     <p className="text-sm font-semibold text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                       Walmart Marketplace Results
                     </p>
                   </div>
                 </motion.div>
                 
                 {/* Right side screenshots - animate from right */}
                 <motion.div 
                   className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500"
                   variants={rightVariants}
                 >
                   <div className="w-full h-48 lg:h-56 rounded-xl overflow-hidden">
                     <Image 
                       src="/images/amazon-sale2.png" 
                       alt="Amazon Sales Screenshot 2" 
                       width={300} 
                       height={300}
                       className="w-full h-full object-cover"
                       style={{ objectPosition: 'center 30%' }}
                       loading="lazy"
                       quality={85}
                     />
                   </div>
                   <div className="mt-3 text-center">
                     <p className="text-sm font-semibold text-[#063f4a]" style={{ fontFamily: "'Barlow', sans-serif" }}>
                       Amazon Performance
                     </p>
                   </div>
                 </motion.div>
               </div>
            </motion.div>
            
            {/* Content Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:p-12 items-center">
              {/* Left Content */}
              <motion.div 
                className="space-y-8"
                variants={leftVariants}
              >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#35c4dd] to-[#063f4a] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base lg:text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>1</span>
                    </div>
                    <div>
                      <h4 className="text-base lg:text-xl font-semibold text-[#063f4a] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Strategic Excellence
                      </h4>
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        At ECOM SHARKS, we believe that with the right strategy and unwavering dedication, anyone can take their business to significant levels. Our mission is to empower entrepreneurs to achieve success through tailored solutions for Amazon, Walmart, Shopify, & TikTok.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#35c4dd] to-[#063f4a] rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base lg:text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>2</span>
                    </div>
                    <div>
                      <h4 className="text-base lg:text-xl font-semibold text-[#063f4a] mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
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
                <div className="bg-gradient-to-br from-[#35c4dd] to-[#063f4a] rounded-2xl lg:rounded-3xl p-8 lg:p-12 text-white shadow-2xl relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <Image src={imgPatternBg} alt="Pattern background" fill className="object-cover" />
                  </div>
                  
                  {/* Quote Icon */}
                  <div className="relative z-10 w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                  
                  <blockquote className="relative z-10 text-2xl leading-relaxed mb-8" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    &ldquo;Success in e-commerce isn&apos;t just about having great products—it&apos;s about having the right strategy, the right team, and the right mindset to scale your business to new heights.&rdquo;
                  </blockquote>
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                      <Image 
                        src={imgFounders} 
                        alt="Aain - Senior E-commerce Consultant" 
                        width={48} 
                        height={48}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 20%' }}
                      />
                    </div>
                    <div>
                      <div className="text-base lg:text-xl font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Aain
                      </div>
                      <div className="text-white/80" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        Senior E-commerce Consultant
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-6 lg:p-8 right-8 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-1000"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

       {/* Get in Touch Section with Enhanced Design */}
       <section className="relative w-full py-16 lg:py-32 text-white overflow-hidden">
         {/* Background Video */}
         <div className="absolute inset-0">
           <video 
             ref={videoRef}
             autoPlay={isInView}
             loop 
             muted 
             playsInline
             preload="metadata"
             className="absolute inset-0 w-full h-full object-cover"
             poster="/images/bi-vid.jpeg"
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
          <Image src={imgSharkUnderwater} alt="Shark" fill className="object-contain transform -scale-x-100" />
        </div>
        
        <div className="relative z-10 container mx-auto px-5 lg:px-20">
          <motion.div 
            className="max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-8 lg:mb-16"
              variants={headerVariants}
            >
              <h3 
                className="text-4xl lg:text-7xl font-bold mb-6" 
                style={{ fontFamily: "'Barlow Condensed', sans-serif", textShadow: '0px 4px 8px rgba(0,0,0,0.3)' }}
              >
                Get in Touch
              </h3>
              <div className="w-32 h-1 bg-white/30 mx-auto rounded-full"></div>
            </motion.div>
            
            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:p-12 items-center">
              {/* Left Content */}
              <motion.div 
                className="space-y-8"
                variants={leftVariants}
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base lg:text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>💡</span>
                    </div>
                    <div>
                      <h4 className="text-base lg:text-xl font-semibold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Free Consultation
                      </h4>
                      <p className="text-white/90 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        Let&apos;s talk about the 5 biggest mistakes you should avoid before starting an e-commerce store. These mistakes can cost you time, money, and serious growth if you&apos;re not aware of them.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base lg:text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>💰</span>
                    </div>
                    <div>
                      <h4 className="text-base lg:text-xl font-semibold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Save $10,000+
                      </h4>
                      <p className="text-white/90 leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
                        I can help you save at least $10,000 in avoidable losses. Let&apos;s hop on a quick call—absolutely free. Normally, my time is valued at $50 per minute, but I&apos;m offering you 5 minutes at no cost—that&apos;s $250 in value, completely free.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-base lg:text-xl font-bold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>🚀</span>
                    </div>
                    <div>
                      <h4 className="text-base lg:text-xl font-semibold mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
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
                <div className="bg-white/15 backdrop-blur-xl rounded-2xl lg:rounded-3xl p-8 lg:p-12 border border-white/30 shadow-2xl relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <Image src={imgPatternBg} alt="Pattern background" fill className="object-cover" />
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/30 mx-auto mb-8">
                      <Image 
                        src="/images/founder-1s.png" 
                        alt="Zayn - Sr.Ecommerce Consultant" 
                        width={112} 
                        height={112}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 30%' }}
                      />
                    </div>
                    
                    <h4 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Ready to Start?
                    </h4>
                    <p className="text-white/90 mb-8 text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>
                      Book your free consultation call with our team today and take the first step towards e-commerce success.
                    </p>
                    
                    <div className="space-y-4">
                      <button 
                        className="w-full bg-white text-[#063f4a] font-semibold py-4 px-8 rounded-full text-base lg:text-xl shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105" 
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                        onClick={() => {
                          if (typeof window !== 'undefined' && (window as unknown as { Calendly?: { initPopupWidget: (options: { url: string }) => void } }).Calendly) {
                            (window as unknown as { Calendly: { initPopupWidget: (options: { url: string, onEventScheduled?: (e: any) => void }) => void } }).Calendly.initPopupWidget({
                              url: 'https://calendly.com/ecomsharkss-info/30min',
                              onEventScheduled: function(e: any) {
                                // Redirect to thank you page when appointment is scheduled
                                window.location.href = '/thank-you';
                              }
                            });
                          }
                        }}
                      >
                        Book Free Call
                      </button>
                      <button 
                        className="w-full bg-transparent border-2 border-white text-white font-semibold py-4 px-8 rounded-full text-base lg:text-xl hover:bg-white hover:text-[#063f4a] transition-all duration-300" 
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