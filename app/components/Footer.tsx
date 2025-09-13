'use client';

import React from 'react';
import Image from 'next/image';

// Image and icon assets for the section
const imgPattern = "/images/pattern-bg.png"; // Light blue water pattern background
const imgShark = "/images/shark-underwater.png"; // Shark image
const imgArrowIcon = "/images/arrow-icon-2.svg"; // Arrow for the button

// Reusable Icon components for clarity and consistency
const GeneralInquiriesIcon = () => (
    <div className="w-12 h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const PhoneIcon = () => (
    <div className="w-12 h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9999 16.5C21.9999 17.0304 21.7892 17.5391 21.4141 17.9142C21.039 18.2893 20.5303 18.5 19.9999 18.5C17.4799 18.5 13.7399 17.55 10.1999 14.1C6.5599 10.56 5.4999 6.82 5.4999 4.3C5.4999 3.76957 5.71062 3.26086 6.08569 2.88579C6.46076 2.51071 6.96947 2.3 7.4999 2.3C8.03033 2.3 8.53904 2.51071 8.91411 2.88579C9.28918 3.26086 9.4999 3.76957 9.4999 4.3C9.4999 5.38 9.9399 6.43 10.2499 6.91C10.5699 7.4 10.3799 8.27 9.9499 8.7L8.8399 9.81C9.6499 11.41 10.9999 12.76 12.5999 13.57L13.7099 12.46C14.1399 12.03 15.0099 11.84 15.4999 12.16C15.9799 12.47 17.0299 12.91 18.1099 12.91C18.6303 12.91 19.139 13.1207 19.5141 13.4958C19.8892 13.8709 20.1099 14.3796 20.1099 14.91C20.1099 15.4404 19.8992 15.9491 19.5241 16.3242C19.149 16.7005 18.7303 17.5 21.9999 16.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const SocialIcon = ({ path }: { path: string }) => (
  <a href="#" className="w-8 h-8 bg-gray-400 hover:bg-[#35c4dd] transition-colors rounded-full flex items-center justify-center">
    <svg className="w-4 h-4 text-[#063f4a]" fill="currentColor" viewBox="0 0 24 24">
      <path d={path}/>
    </svg>
  </a>
);


export default function Contact() {
  const socialLinks = {
    facebook: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
    linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    x: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.429 1.44 2.165 3.325 2.165 3.325-.817-.026-1.585-.248-2.25-.616v.05c0 2.28 1.63 4.22 3.79 4.66-.4.11-.82.17-1.25.17-.3 0-.6-.03-.88-.08.6 1.88 2.34 3.24 4.4 3.28-1.62 1.27-3.66 2.03-5.88 2.03-.38 0-.76-.02-1.13-.07 2.1 1.35 4.6 2.15 7.3 2.15 8.7 0 13.4-7.25 13.4-13.45 0-.2 0-.4-.02-.6.92-.66 1.7-1.5 2.32-2.4z",
  };

  return (
    <footer className="relative w-full pt-24">
      {/* Background and Decorative Shark */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#bef4fe] to-white" />
        <div 
          className="absolute inset-0 bg-repeat opacity-50"
          style={{ backgroundImage: `url('${imgPattern}')` }}
        />
      </div>
      {/* THE FIX: Shark container is larger and rotated slightly. */}
      <div className="absolute bottom-32 left-75 w-[1000px] h-[1400px] z-0 transform rotate-15 animate-shark-lean">
        <Image src={imgShark} alt="Shark" layout="fill" objectFit="contain" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 container mx-auto px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          
          {/* Left Column: Text and Contact Info */}
          <div className="pt-12 text-gray-800">
            <h1 className="text-7xl lg:text-8xl font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Contact
            </h1>
            <p className="mt-6 text-xl lg:text-2xl leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Ready to elevate your e-Commerce success?. ECOM SHARKS is here to support you at every step. Whether you have questions, need expert guidance, or want customized solution for your brand, our team is just a message away. Let's build something amazing together!
            </p>
            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <GeneralInquiriesIcon />
                <div>
                  <h3 className="font-bold text-lg">General Inquiries:</h3>
                  <p className="text-lg">info@ecomsharkss.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <PhoneIcon />
                <div>
                  <h3 className="font-bold text-lg">Phone:</h3>
                  <p className="text-lg">(469) 480-7938</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-[#35c4dd] rounded-3xl p-8 lg:p-12 text-white">
            <h2 className="text-3xl font-bold" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Let's Talk About Your Book
            </h2>
            <form className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium ml-4 mb-1">Name:</label>
                <input type="text" id="name" className="w-full h-14 bg-white rounded-full px-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium ml-4 mb-1">Email:</label>
                  <input type="email" id="email" className="w-full h-14 bg-white rounded-full px-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium ml-4 mb-1">Phone:</label>
                  <input type="tel" id="phone" className="w-full h-14 bg-white rounded-full px-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium ml-4 mb-1">Message:</label>
                <textarea id="message" rows={5} className="w-full bg-white rounded-3xl p-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"></textarea>
              </div>
              <div>
                <button type="submit" className="group flex items-center justify-center gap-3 bg-white text-[#35c4dd] font-semibold py-2.5 pl-6 pr-2 rounded-full text-lg shadow-lg overflow-hidden relative">
                  <span className="relative z-10" style={{ fontFamily: "'Barlow', sans-serif" }}>Get Started</span>
                  <span className="bg-[#063f4a] rounded-full p-2.5 relative z-10">
                    <Image src={imgArrowIcon} alt="arrow icon" width={24} height={24} />
                  </span>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#063f4a] rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* THE FIX: Bottom Footer Bar now has `mt-0` to remove the gap. */}
      <div className="relative z-10 mt-0">
        <div className="bg-[#063f4a] py-6">
          <div className="container mx-auto px-20 flex flex-col md:flex-row items-center justify-between gap-6 text-white text-sm">
            <p>© 2025 Ecom Sharkss. All Rights Reserved.</p>
            <div className="flex items-center gap-4">
              <span>Follow us:</span>
              <div className="flex items-center gap-3">
                <SocialIcon path={socialLinks.facebook} />
                <SocialIcon path={socialLinks.linkedin} />
                <SocialIcon path={socialLinks.instagram} />
                <SocialIcon path={socialLinks.x} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href="#" className="hover:text-[#35c4dd] transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="#" className="hover:text-[#35c4dd] transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}