'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { sendContactEmail, ContactFormData } from '../utils/emailjs';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';

// Image assets
const imgFounder = "/images/founder.png";

// Reusable Button Component
const GetQuoteButton = ({ small = false }: { small?: boolean }) => (
  <button 
    className={`group flex items-center justify-center lg:justify-between gap-3 bg-[#35c4dd] hover:bg-[#2cb4ca] transition-colors duration-300 rounded-full overflow-hidden relative ${small ? 'h-12 w-full lg:w-44 pl-6 pr-1' : 'h-14 w-full lg:w-48 pl-6 pr-1.5'}`}
    onClick={() => {
      if (typeof window !== 'undefined' && (window as unknown as { Calendly?: { initPopupWidget: (options: { url: string }) => void } }).Calendly) {
        (window as unknown as { Calendly: { initPopupWidget: (options: { url: string, onEventScheduled?: (e: any) => void }) => void } }).Calendly.initPopupWidget({
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
      className={`font-semibold text-[#063f4a] relative z-10 ${small ? 'text-base lg:text-lg' : 'text-lg lg:text-base lg:text-xl'}`}
      style={{ fontFamily: "'Barlow', sans-serif" }}
    >
      Get A Quote
    </span>
    <span className={`bg-white rounded-full flex items-center justify-center relative z-10 ${small ? 'w-10 h-10' : 'w-10 h-10'}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063f4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
  </button>
);


export default function CurrentOffer() {
  const { videoRef, isInView } = useVideoLazyLoading();
  // Form state management
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status message when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setSubmitStatus({ type: 'error', message: 'Name is required' });
      return false;
    }
    if (!formData.email.trim()) {
      setSubmitStatus({ type: 'error', message: 'Email is required' });
      return false;
    }
    if (!formData.email.includes('@')) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' });
      return false;
    }
    if (!formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Message is required' });
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: result.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full py-16 lg:py-24">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
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
        <div className="absolute inset-0" />
      </div>
      
      <div className="relative z-10 container mx-auto px-5 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-white mb-6" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Our Current Offer
            </h2>
            <div className="w-24 h-1 bg-[#35c4dd] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Offer Details */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-2xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/30 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30">
                    <Image 
                      src="/images/founder-1.jpg" 
                      alt="Zayn - Senior E-commerce Consultant" 
                      width={48} 
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Launch Your Walmart Store
                  </h3>
                </div>
                <p className="text-lg lg:text-xl text-white/90 leading-relaxed mb-6" style={{ fontFamily: "'Barlow', sans-serif" }}>
                  Launch your Walmart store with us—earn $4,000 in your first 30 days or we'll work for free.
                </p>
                <div className="bg-white/10 backdrop-blur-xl border border-white/40 rounded-xl p-4">
                  <p className="text-white font-semibold text-base lg:text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    This offer is only available for the next few days. Take action now or risk staying stuck in the 9&ndash;5 cycle.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white/5 backdrop-blur-2xl rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-white/30 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
                  <Image 
                    src={imgFounder} 
                    alt="Aain - Senior E-commerce Consultant" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Get Started Today
                  </h3>
                  <p className="text-white/80 text-sm lg:text-base" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Speak directly with our senior consultant
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                {/* Status Message */}
                {submitStatus.type && (
                  <div className={`p-4 rounded-xl text-sm font-medium ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-500/20 text-green-200 border border-green-400/30' 
                      : 'bg-red-500/20 text-red-200 border border-red-400/30'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-white/90 text-sm lg:text-base font-medium mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#35c4dd] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white/90 text-sm lg:text-base font-medium mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#35c4dd] focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/90 text-sm lg:text-base font-medium mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#35c4dd] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your business goals..."
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg text-lg ${
                      isSubmitting 
                        ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                        : 'bg-[#35c4dd] hover:bg-[#2cb4ca] text-[#063f4a] hover:scale-105'
                    }`}
                    style={{ fontFamily: "'Barlow', sans-serif" }}
                  >
                    {isSubmitting ? 'Sending...' : 'Claim Your Free Consultation'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
