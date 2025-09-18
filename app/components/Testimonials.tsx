'use client';

import React, { useEffect } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Star rating component - Made responsive for mobile
const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {[...Array(rating)].map((_, i) => (
            <div key={i} className="bg-[#00B67A] p-0.5 lg:p-1 w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] flex items-center justify-center first:rounded-l-md last:rounded-r-md">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-4 lg:h-4">
                    <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="white"/>
                </svg>
            </div>
        ))}
    </div>
);


export default function Testimonials() {
  const controls = useAnimation();
  
  // Set triggerOnce to false to allow re-triggering
  const [ref, inView] = useInView({
    triggerOnce: false, // Set to false to re-trigger animation
    threshold: 0.3,   // Trigger when 30% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden'); // Reset to hidden state when out of view
    }
  }, [controls, inView]);
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Spring animation variants - header from right, cards from left
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

  const cardVariants: Variants = {
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

  const testimonials = [
    {
      name: "Anasher",
      subtitle: "USA review",
      review: "We needed help getting started with WFS, and we hired ecom sharkss. they assisted with inventory prep, label requirements, and shipping. they also explained how to stay compliant with walmart's fulfillment standards. since switching to WFS, we've noticed faster delivery and fewer customer complaints.",
      rating: 5,
      postDate: "Jul 22, 2024",
      replyDate: "April 15, 2025"
    },
    {
      name: "Anasher",
      subtitle: "USA review",
      review: "We needed help getting started with WFS, and we hired ecom sharkss. they assisted with inventory prep, label requirements, and shipping. they also explained how to stay compliant with walmart's fulfillment standards. since switching to WFS, we've noticed faster delivery and fewer customer complaints.",
      rating: 5,
      postDate: "Jul 22, 2024",
      replyDate: "April 15, 2025"
    },
    {
      name: "Anasher",
      subtitle: "USA review",
      review: "We needed help getting started with WFS, and we hired ecom sharkss. they assisted with inventory prep, label requirements, and shipping. they also explained how to stay compliant with walmart's fulfillment standards. since switching to WFS, we've noticed faster delivery and fewer customer complaints.",
      rating: 5,
      postDate: "Jul 22, 2024",
      replyDate: "April 15, 2025"
    }
  ];

  return (
    <section ref={ref} className="w-full bg-white py-16 lg:py-24 overflow-x-hidden">
      {/* Container to enforce 1920px max-width alignment */}
      <div className="container mx-auto px-5 lg:px-20">
        
        {/* Section Header - Fonts and colors are matched exactly. */}
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={controls}
        >
          <h1 
            className="text-3xl lg:text-6xl font-bold text-gray-800"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Client Testimonials
          </h1>
          <p 
            className="mt-4 text-base lg:text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            From debut storytellers to celebrated literary icons, our authors are the heart of our work. 
            Explore biographies, latest releases, interviews, and upcoming events.
          </p>
        </motion.div>
        
        {/* Testimonials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {testimonials.map((testimonial, index) => (
            // THE FIX: `aspect-square` forces a 1:1 ratio. `flex flex-col` allows content management.
            <motion.div 
              key={index}
              className="bg-[#E8F8FA] rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200 flex flex-col aspect-square"
              style={{ fontFamily: "'Barlow', sans-serif" }}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-center gap-3 lg:gap-4">
                  {/* Profile Icon */}
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-lg lg:text-xl text-gray-600" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base lg:text-lg text-gray-800">{testimonial.name}</h3>
                    <p className="text-xs lg:text-sm text-gray-600">{testimonial.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 whitespace-nowrap pl-2">{testimonial.postDate}</p>
              </div>
              
              {/* Rating */}
              <div className="mb-3 lg:mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              
              {/* Review Text - `flex-grow` makes it take up available space. `overflow-hidden` prevents long text from breaking the layout. */}
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed flex-grow overflow-hidden">
                {testimonial.review}
              </p>
              
              {/* Reply Date - No `mt-auto` needed anymore, as flex-grow handles the spacing. */}
              <div className="border-t border-gray-300 pt-3 lg:pt-4 mt-3 lg:mt-4">
                <p className="text-xs text-gray-500">{testimonial.replyDate}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}