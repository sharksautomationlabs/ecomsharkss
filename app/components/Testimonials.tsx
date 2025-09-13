'use client';

import React from 'react';

// Star rating component - No changes needed here, it's already accurate.
const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
        {[...Array(rating)].map((_, i) => (
            <div key={i} className="bg-[#00B67A] p-1 w-[26px] h-[26px] flex items-center justify-center first:rounded-l-md last:rounded-r-md">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.99992 0.470581L10.0199 5.09058L15.0599 5.61058L11.2399 8.93058L12.3199 13.9106L7.99992 11.3506L3.67992 13.9106L4.75992 8.93058L0.939922 5.61058L5.97992 5.09058L7.99992 0.470581Z" fill="white"/>
                </svg>
            </div>
        ))}
    </div>
);


export default function Testimonials() {
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
    <section className="w-full bg-white py-24">
      {/* Container to enforce 1920px max-width alignment */}
      <div className="container mx-auto px-20">
        
        {/* Section Header - Fonts and colors are matched exactly. */}
        <div className="text-center mb-16">
          <h1 
            className="text-6xl font-bold text-gray-800"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Client Testimonials
          </h1>
          <p 
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: "'Barlow', sans-serif" }}
          >
            From debut storytellers to celebrated literary icons, our authors are the heart of our work. 
            Explore biographies, latest releases, interviews, and upcoming events.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            // THE FIX: `aspect-square` forces a 1:1 ratio. `flex flex-col` allows content management.
            <div 
              key={index}
              className="bg-[#E8F8FA] rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col aspect-square"
              style={{ fontFamily: "'Barlow', sans-serif" }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  {/* Profile Icon */}
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-xl text-gray-600" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.subtitle}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 whitespace-nowrap pl-2">{testimonial.postDate}</p>
              </div>
              
              {/* Rating */}
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              
              {/* Review Text - `flex-grow` makes it take up available space. `overflow-hidden` prevents long text from breaking the layout. */}
              <p className="text-base text-gray-700 leading-relaxed flex-grow overflow-hidden">
                {testimonial.review}
              </p>
              
              {/* Reply Date - No `mt-auto` needed anymore, as flex-grow handles the spacing. */}
              <div className="border-t border-gray-300 pt-4 mt-4">
                <p className="text-xs text-gray-500">{testimonial.replyDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}