'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Star rating component - Made responsive for mobile
const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => {
                if (i < fullStars) {
                    // Full star
                    return (
                        <div key={i} className="bg-[#00B67A] p-0.5 lg:p-1 w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] flex items-center justify-center first:rounded-l-md last:rounded-r-md">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-4 lg:h-4">
                                <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="white"/>
                            </svg>
                        </div>
                    );
                } else if (i === fullStars && hasHalfStar) {
                    // Half star
                    return (
                        <div key={i} className="bg-[#00B67A] p-0.5 lg:p-1 w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] flex items-center justify-center first:rounded-l-md last:rounded-r-md">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-4 lg:h-4">
                                <defs>
                                    <linearGradient id="half-star">
                                        <stop offset="50%" stopColor="white"/>
                                        <stop offset="50%" stopColor="transparent"/>
                                    </linearGradient>
                                </defs>
                                <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="url(#half-star)"/>
                            </svg>
                        </div>
                    );
                } else {
                    // Empty star
                    return (
                        <div key={i} className="bg-gray-300 p-0.5 lg:p-1 w-[20px] h-[20px] lg:w-[26px] lg:h-[26px] flex items-center justify-center first:rounded-l-md last:rounded-r-md">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-4 lg:h-4">
                                <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="white"/>
                            </svg>
                        </div>
                    );
                }
            })}
        </div>
    );
};


interface Testimonial {
  name: string;
  subtitle: string;
  review: string;
  rating: number;
  postDate: string;
  replyDate: string;
  profileImage?: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export default function Testimonials({ testimonials: customTestimonials }: TestimonialsProps = {}) {
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

  // Default testimonials for general use
  const defaultTestimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      subtitle: "E-commerce Entrepreneur",
      review: "ECOM SHARKS transformed our business completely. Their automation services helped us scale from $10K to $100K monthly revenue in just 6 months. The team's expertise and dedication are unmatched.",
      rating: 5,
      postDate: "Dec 15, 2024",
      replyDate: "Dec 16, 2024",
      profileImage: "/images/Dummy-profile/Sarah-Johnson.png"
    },
    {
      name: "Michael Chen",
      subtitle: "Online Store Owner",
      review: "Working with ECOM SHARKS has been a game-changer. Their automation solutions saved us countless hours and significantly increased our profit margins. Highly recommend their services!",
      rating: 4,
      postDate: "Nov 28, 2024",
      replyDate: "Nov 29, 2024",
      profileImage: "/images/Dummy-profile/Michael-Chen.png"
    },
    {
      name: "Emily Rodriguez",
      subtitle: "Business Owner",
      review: "The level of professionalism and results we've achieved with ECOM SHARKS is incredible. They've helped us streamline our operations and boost our sales by 300%. Truly exceptional service!",
      rating: 5,
      postDate: "Jan 8, 2025",
      replyDate: "Jan 9, 2025",
      profileImage: "/images/Dummy-profile/Emily-Rodriguez.png"
    }
  ];

  const testimonials = customTestimonials || defaultTestimonials;

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
                  {/* Profile Image */}
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {testimonial.profileImage ? (
                      <Image 
                        src={testimonial.profileImage} 
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-lg lg:text-xl text-gray-600" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
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