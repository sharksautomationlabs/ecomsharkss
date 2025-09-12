'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="relative w-full py-8 overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#bef4fe] to-white"
        style={{
          backgroundImage: "url('/images/pattern-bg.png')"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            {/* Section Title */}
            <h2 className="text-6xl lg:text-7xl font-bold text-[#2c2420] leading-tight mb-8">
              Contact
            </h2>
            
            {/* Description */}
            <p className="text-2xl text-[#063f4a] leading-relaxed mb-12">
              Ready to elevate your e-Commerce success?. ECOM SHARKS is here to support you at every step. 
              Whether you have questions, need expert guidance, or want customized solution for your brand, 
              our team is just a message away. Let's build something amazing together!
            </p>
            
            {/* Contact Info */}
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#35c4dd] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#6a8084] text-xl font-semibold">General Inquiries:</p>
                  <p className="text-[#063f4a] text-xl font-medium">info@ecomsharkss.com</p>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-[#35c4dd] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[#6a8084] text-xl font-semibold">Phone:</p>
                  <p className="text-[#063f4a] text-xl font-medium">(469) 480-7938</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Contact Form */}
          <div className="flex-1">
            <div className="bg-[#35c4dd] rounded-2xl p-8">
              <h3 className="text-4xl font-bold text-white mb-8">
                Let's Talk About Your Book
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name:"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-6 py-4 rounded-2xl text-xl text-[#7b7b7b] placeholder-[#7b7b7b] focus:outline-none focus:ring-2 focus:ring-white"
                    required
                  />
                </div>
                
                {/* Email and Phone Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email:"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl text-xl text-[#7b7b7b] placeholder-[#7b7b7b] focus:outline-none focus:ring-2 focus:ring-white"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone:"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl text-xl text-[#7b7b7b] placeholder-[#7b7b7b] focus:outline-none focus:ring-2 focus:ring-white"
                      required
                    />
                  </div>
                </div>
                
                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message:"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-6 py-4 rounded-2xl text-xl text-[#7b7b7b] placeholder-[#7b7b7b] focus:outline-none focus:ring-2 focus:ring-white resize-none"
                    required
                  />
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-white text-[#063f4a] px-8 py-4 rounded-full font-semibold text-xl hover:bg-gray-100 transition-colors flex items-center justify-center gap-3"
                >
                  Get Started
                  <div className="w-14 h-14 bg-[#35c4dd] rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
