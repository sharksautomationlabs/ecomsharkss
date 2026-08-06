'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const imgArrowIcon = "/images/arrow-icon.svg";
const imgChatIcon = "/images/chat-icon.svg";

// Service data with Walmart-specific content
const servicesData = [
  {
    id: 1,
    title: "Expertise in Inventory Management",
    description: "Our inventory management services ensure your products are always in stock and ready to meet customer demand.",
    icon: "/images/amazon-logo.png",
    concept: "Walmart"
  },
  {
    id: 2,
    title: "Order Processing Automation",
    description: "Improve efficiency & attain massive profitability by automating order fulfillment processes & make leaps in competitive world.",
    icon: "/images/amazon-logo.png",
    concept: "Walmart"
  }
];

// Reusable Button Component
const GetQuoteButton = ({ small = false }: { small?: boolean }) => (
  <button
    className={`group flex items-center justify-center lg:justify-between gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full overflow-hidden relative ${small ? 'h-12 w-full lg:w-44 pl-6 pr-1' : 'h-14 w-full lg:w-48 pl-6 pr-1.5'}`}
    onClick={() => {
      if (typeof window !== 'undefined' && (window as any).Calendly) {
        (window as any).Calendly.initPopupWidget({
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
      className={`font-semibold text-[#063f4a] relative z-10 ${small ? 'text-base lg:text-lg' : 'text-lg lg:text-xl'}`}
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

export default function WalmartBestServices() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

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

  const leftCardVariants: Variants = {
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

  const rightCardVariants: Variants = {
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

  return (
    <div ref={ref} className="relative z-[2] w-full py-16 lg:py-24">
      <div className="container mx-auto px-5 lg:px-20 text-white">

        {/* Section Header */}
        <motion.div
          className="text-center mb-8 lg:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h1
            className="text-2xl lg:text-4xl xl:text-5xl font-bold tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            We Provide the Best Services for Your Product
          </h1>
          <p
            className="mt-4 max-w-4xl mx-auto text-sm lg:text-base text-[#9dc3d4] leading-relaxed"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            At ECOM SHARKS, we offer top-tier solutions designed to streamline your Walmart business. Our expert team ensures every aspect operates flawlessly & seamlessly.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-8 lg:mt-16 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-left flex flex-col service-card-flash hover:scale-95 transition-transform duration-300"
              variants={index === 0 ? leftCardVariants : rightCardVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ scale: 0.95 }}
            >
              {/* Service Icon */}
              <div className="relative mb-4 lg:mb-6">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-white/20 to-white/5 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300 border border-white/30">
                  <Image
                    src={service.icon}
                    alt={service.concept}
                    width={40}
                    height={40}
                    className="lg:w-[50px] lg:h-[50px] object-contain filter drop-shadow-lg"
                  />
                </div>
                <div className="absolute -top-1 -right-1 lg:-top-2 lg:-right-2 bg-[#35c4dd] text-[#063f4a] text-xs font-bold px-2 py-1 rounded-full shadow-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {service.concept}
                </div>
              </div>

              {/* Service Title */}
              <h2
                className="text-xl lg:text-2xl font-bold mb-3 lg:mb-4"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {service.title}
              </h2>
              {/* Service Description */}
              <p className="text-sm lg:text-base text-[#9dc3d4] leading-relaxed flex-grow" style={{ fontFamily: "'Barlow', sans-serif" }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
            <GetQuoteButton />
            <button className="flex items-center justify-center lg:justify-between gap-3 w-full sm:w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
              <span className="pl-0 sm:pl-5 text-[#063f4a] font-semibold text-base lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
              <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                <Image src={imgChatIcon} alt="chat icon" width={28} height={28} />
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
