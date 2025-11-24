'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { sendContactEmail, ContactFormData } from '../utils/emailjs';
import { checkPhoneRateLimit, recordPhoneSubmission } from '../utils/phoneRateLimit';

// Image and icon assets for the section
const imgPattern = "/images/pattern-bg.png"; // Light blue water pattern background
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

const LocationIcon = () => (
    <div className="w-12 h-12 bg-[#063f4a] rounded-full flex items-center justify-center flex-shrink-0">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.3639 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </div>
);

const SocialIcon = ({ path, href }: { path: string; href?: string }) => (
  <a href={href || "#"} className="w-8 h-8 bg-gray-400 hover:bg-[#35c4dd] transition-colors rounded-full flex items-center justify-center">
    <svg className="w-4 h-4 text-[#063f4a]" fill="currentColor" viewBox="0 0 24 24">
      <path d={path}/>
    </svg>
  </a>
);


export default function Contact() {
  const controls = useAnimation();
  
  // Form state management
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [countryCode, setCountryCode] = useState('+1');
  
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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

  // Format phone number based on country code
  const formatPhoneNumber = (value: string, code: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // For US/Canada (+1), format as (XXX) XXX-XXXX
    if (code === '+1') {
      if (digits.length <= 3) {
        return digits;
      } else if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
    }
    
    // For other countries, format with spaces every 3-4 digits
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    } else if (digits.length <= 9) {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    } else {
      return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`;
    }
  };

  // Handle country code change and reformat phone number
  const handleCountryCodeChange = (newCode: string) => {
    setCountryCode(newCode);
    // Reformat existing phone number with new country code
    if (formData.phone) {
      const digits = formData.phone.replace(/\D/g, '');
      const formatted = formatPhoneNumber(digits, newCode);
      setFormData(prev => ({
        ...prev,
        phone: formatted
      }));
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Format phone number if it's the phone field
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value, countryCode);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
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
    if (!privacyPolicyAccepted) {
      setSubmitStatus({ type: 'error', message: 'You must accept the privacy policy to continue' });
      return false;
    }
    if (!consentGiven) {
      setSubmitStatus({ type: 'error', message: 'You must give consent to continue' });
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
      // Combine country code with phone number
      // Remove all formatting characters (spaces, dashes, parentheses)
      const phoneNumber = formData.phone.replace(/\D/g, '');
      // Combine country code with cleaned phone number
      const fullPhoneNumber = countryCode + phoneNumber;
      
      // Check rate limit for +1 numbers (max 2 submissions per day)
      const rateLimitCheck = checkPhoneRateLimit(fullPhoneNumber);
      if (!rateLimitCheck.allowed) {
        setSubmitStatus({ 
          type: 'error', 
          message: rateLimitCheck.reason || 'Daily submission limit reached. Please try again tomorrow.' 
        });
        setIsSubmitting(false);
        return;
      }
      
      const formDataWithCountryCode = {
        ...formData,
        phone: fullPhoneNumber
      };
      
      const result = await sendContactEmail(formDataWithCountryCode);
      
      if (result.success) {
        // Record phone number submission for +1 numbers
        recordPhoneSubmission(fullPhoneNumber);
        
        setSubmitStatus({ type: 'success', message: result.message });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
        // Reset country code to default
        setCountryCode('+1');
        // Reset checkboxes
        setPrivacyPolicyAccepted(false);
        setConsentGiven(false);
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
  
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Spring animation variants like Experts section
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
    linkedin: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
    instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
    x: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.429 1.44 2.165 3.325 2.165 3.325-.817-.026-1.585-.248-2.25-.616v.05c0 2.28 1.63 4.22 3.79 4.66-.4.11-.82.17-1.25.17-.3 0-.6-.03-.88-.08.6 1.88 2.34 3.24 4.4 3.28-1.62 1.27-3.66 2.03-5.88 2.03-.38 0-.76-.02-1.13-.07 2.1 1.35 4.6 2.15 7.3 2.15 8.7 0 13.4-7.25 13.4-13.45 0-.2 0-.4-.02-.6.92-.66 1.7-1.5 2.32-2.4z",
  };

  return (
    <footer ref={ref} className="relative w-full -pt-8 lg:pt-24 overflow-x-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#bef4fe] to-white" />
        <div 
          className="absolute inset-0 bg-repeat opacity-50"
          style={{ backgroundImage: `url('${imgPattern}')` }}
        />
      </div>

      {/* Main Content Area */}
      <motion.div 
        className="relative z-10 container mx-auto px-5 lg:px-20 py-16 lg:py-0"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          
          {/* Left Column: Text and Contact Info */}
          <motion.div 
            className="pt-8 lg:pt-12 text-gray-800"
            variants={leftVariants}
            initial="hidden"
            animate={controls}
          >
            <h1 className="text-4xl lg:text-7xl xl:text-8xl font-semibold" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
              Contact
            </h1>
            <p className="mt-4 lg:mt-6 text-base lg:text-xl xl:text-2xl leading-relaxed" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Ready to elevate your e-Commerce success?. ECOM SHARKS is here to support you at every step. Whether you have questions, need expert guidance, or want customized solution for your brand, our team is just a message away. Let's build something amazing together!
            </p>
            <div className="mt-8 lg:mt-12 space-y-4 lg:space-y-6">
              <div className="flex items-center gap-3 lg:gap-4">
                <GeneralInquiriesIcon />
                <div>
                  <h3 className="font-bold text-base lg:text-lg">General Inquiries:</h3>
                  <p className="text-base lg:text-lg">info@ecomsharkss.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:gap-4">
                <PhoneIcon />
                <div>
                  <h3 className="font-bold text-base lg:text-lg">Phone:</h3>
                  <p className="text-base lg:text-lg">(469) 480-7938</p>
                </div>
              </div>
              <div className="flex items-center gap-3 lg:gap-4">
                <LocationIcon />
                <div>
                  <h3 className="font-bold text-base lg:text-lg">Address:</h3>
                  <p className="text-base lg:text-lg">22023 Rustic Canyon Ln<br />Richmond, TX 77469, USA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div 
            className="bg-[#35c4dd] rounded-2xl lg:rounded-3xl p-6 lg:p-8 xl:p-12 text-white"
            variants={rightVariants}
            initial="hidden"
            animate={controls}
          >
            <h2 className="text-2xl lg:text-3xl font-bold" style={{ fontFamily: "'Barlow', sans-serif" }}>
              Let's Talk About Your E-commerce Business
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 lg:mt-8 space-y-4 lg:space-y-6">
              {/* Status Message */}
              {submitStatus.type && (
                <div className={`p-4 rounded-lg text-sm font-medium ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium ml-4 mb-1">Name:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full h-12 lg:h-14 bg-white rounded-full px-4 lg:px-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" 
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium ml-4 mb-1">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full h-12 lg:h-14 bg-white rounded-full px-4 lg:px-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium ml-4 mb-1">Phone:</label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => handleCountryCodeChange(e.target.value)}
                      className="min-w-[100px] sm:min-w-[120px] h-12 lg:h-14 bg-white rounded-full px-2 sm:px-3 lg:px-4 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <option value="+1" className="bg-white text-gray-800">🇺🇸 🇨🇦 +1</option>
                      <option value="+7" className="bg-white text-gray-800">🇷🇺 🇰🇿 +7</option>
                      <option value="+20" className="bg-white text-gray-800">🇪🇬 +20</option>
                      <option value="+27" className="bg-white text-gray-800">🇿🇦 +27</option>
                      <option value="+30" className="bg-white text-gray-800">🇬🇷 +30</option>
                      <option value="+31" className="bg-white text-gray-800">🇳🇱 +31</option>
                      <option value="+32" className="bg-white text-gray-800">🇧🇪 +32</option>
                      <option value="+33" className="bg-white text-gray-800">🇫🇷 +33</option>
                      <option value="+34" className="bg-white text-gray-800">🇪🇸 +34</option>
                      <option value="+36" className="bg-white text-gray-800">🇭🇺 +36</option>
                      <option value="+39" className="bg-white text-gray-800">🇮🇹 +39</option>
                      <option value="+40" className="bg-white text-gray-800">🇷🇴 +40</option>
                      <option value="+41" className="bg-white text-gray-800">🇨🇭 +41</option>
                      <option value="+43" className="bg-white text-gray-800">🇦🇹 +43</option>
                      <option value="+44" className="bg-white text-gray-800">🇬🇧 +44</option>
                      <option value="+45" className="bg-white text-gray-800">🇩🇰 +45</option>
                      <option value="+46" className="bg-white text-gray-800">🇸🇪 +46</option>
                      <option value="+47" className="bg-white text-gray-800">🇳🇴 +47</option>
                      <option value="+48" className="bg-white text-gray-800">🇵🇱 +48</option>
                      <option value="+49" className="bg-white text-gray-800">🇩🇪 +49</option>
                      <option value="+51" className="bg-white text-gray-800">🇵🇪 +51</option>
                      <option value="+52" className="bg-white text-gray-800">🇲🇽 +52</option>
                      <option value="+53" className="bg-white text-gray-800">🇨🇺 +53</option>
                      <option value="+54" className="bg-white text-gray-800">🇦🇷 +54</option>
                      <option value="+55" className="bg-white text-gray-800">🇧🇷 +55</option>
                      <option value="+56" className="bg-white text-gray-800">🇨🇱 +56</option>
                      <option value="+57" className="bg-white text-gray-800">🇨🇴 +57</option>
                      <option value="+58" className="bg-white text-gray-800">🇻🇪 +58</option>
                      <option value="+60" className="bg-white text-gray-800">🇲🇾 +60</option>
                      <option value="+61" className="bg-white text-gray-800">🇦🇺 +61</option>
                      <option value="+62" className="bg-white text-gray-800">🇮🇩 +62</option>
                      <option value="+63" className="bg-white text-gray-800">🇵🇭 +63</option>
                      <option value="+64" className="bg-white text-gray-800">🇳🇿 +64</option>
                      <option value="+65" className="bg-white text-gray-800">🇸🇬 +65</option>
                      <option value="+66" className="bg-white text-gray-800">🇹🇭 +66</option>
                      <option value="+81" className="bg-white text-gray-800">🇯🇵 +81</option>
                      <option value="+82" className="bg-white text-gray-800">🇰🇷 +82</option>
                      <option value="+84" className="bg-white text-gray-800">🇻🇳 +84</option>
                      <option value="+86" className="bg-white text-gray-800">🇨🇳 +86</option>
                      <option value="+90" className="bg-white text-gray-800">🇹🇷 +90</option>
                      <option value="+91" className="bg-white text-gray-800">🇮🇳 +91</option>
                      <option value="+92" className="bg-white text-gray-800">🇵🇰 +92</option>
                      <option value="+93" className="bg-white text-gray-800">🇦🇫 +93</option>
                      <option value="+94" className="bg-white text-gray-800">🇱🇰 +94</option>
                      <option value="+95" className="bg-white text-gray-800">🇲🇲 +95</option>
                      <option value="+98" className="bg-white text-gray-800">🇮🇷 +98</option>
                      <option value="+212" className="bg-white text-gray-800">🇲🇦 +212</option>
                      <option value="+213" className="bg-white text-gray-800">🇩🇿 +213</option>
                      <option value="+216" className="bg-white text-gray-800">🇹🇳 +216</option>
                      <option value="+218" className="bg-white text-gray-800">🇱🇾 +218</option>
                      <option value="+220" className="bg-white text-gray-800">🇬🇲 +220</option>
                      <option value="+221" className="bg-white text-gray-800">🇸🇳 +221</option>
                      <option value="+222" className="bg-white text-gray-800">🇲🇷 +222</option>
                      <option value="+223" className="bg-white text-gray-800">🇲🇱 +223</option>
                      <option value="+224" className="bg-white text-gray-800">🇬🇳 +224</option>
                      <option value="+225" className="bg-white text-gray-800">🇨🇮 +225</option>
                      <option value="+226" className="bg-white text-gray-800">🇧🇫 +226</option>
                      <option value="+227" className="bg-white text-gray-800">🇳🇪 +227</option>
                      <option value="+228" className="bg-white text-gray-800">🇹🇬 +228</option>
                      <option value="+229" className="bg-white text-gray-800">🇧🇯 +229</option>
                      <option value="+230" className="bg-white text-gray-800">🇲🇺 +230</option>
                      <option value="+231" className="bg-white text-gray-800">🇱🇷 +231</option>
                      <option value="+232" className="bg-white text-gray-800">🇸🇱 +232</option>
                      <option value="+233" className="bg-white text-gray-800">🇬🇭 +233</option>
                      <option value="+234" className="bg-white text-gray-800">🇳🇬 +234</option>
                      <option value="+235" className="bg-white text-gray-800">🇹🇩 +235</option>
                      <option value="+236" className="bg-white text-gray-800">🇨🇫 +236</option>
                      <option value="+237" className="bg-white text-gray-800">🇨🇲 +237</option>
                      <option value="+238" className="bg-white text-gray-800">🇨🇻 +238</option>
                      <option value="+239" className="bg-white text-gray-800">🇸🇹 +239</option>
                      <option value="+240" className="bg-white text-gray-800">🇬🇶 +240</option>
                      <option value="+241" className="bg-white text-gray-800">🇬🇦 +241</option>
                      <option value="+242" className="bg-white text-gray-800">🇨🇬 +242</option>
                      <option value="+243" className="bg-white text-gray-800">🇨🇩 +243</option>
                      <option value="+244" className="bg-white text-gray-800">🇦🇴 +244</option>
                      <option value="+245" className="bg-white text-gray-800">🇬🇼 +245</option>
                      <option value="+246" className="bg-white text-gray-800">🇮🇴 +246</option>
                      <option value="+248" className="bg-white text-gray-800">🇸🇨 +248</option>
                      <option value="+249" className="bg-white text-gray-800">🇸🇩 +249</option>
                      <option value="+250" className="bg-white text-gray-800">🇷🇼 +250</option>
                      <option value="+251" className="bg-white text-gray-800">🇪🇹 +251</option>
                      <option value="+252" className="bg-white text-gray-800">🇸🇴 +252</option>
                      <option value="+253" className="bg-white text-gray-800">🇩🇯 +253</option>
                      <option value="+254" className="bg-white text-gray-800">🇰🇪 +254</option>
                      <option value="+255" className="bg-white text-gray-800">🇹🇿 +255</option>
                      <option value="+256" className="bg-white text-gray-800">🇺🇬 +256</option>
                      <option value="+257" className="bg-white text-gray-800">🇧🇮 +257</option>
                      <option value="+258" className="bg-white text-gray-800">🇲🇿 +258</option>
                      <option value="+260" className="bg-white text-gray-800">🇿🇲 +260</option>
                      <option value="+261" className="bg-white text-gray-800">🇲🇬 +261</option>
                      <option value="+262" className="bg-white text-gray-800">🇷🇪 +262</option>
                      <option value="+263" className="bg-white text-gray-800">🇿🇼 +263</option>
                      <option value="+264" className="bg-white text-gray-800">🇳🇦 +264</option>
                      <option value="+265" className="bg-white text-gray-800">🇲🇼 +265</option>
                      <option value="+266" className="bg-white text-gray-800">🇱🇸 +266</option>
                      <option value="+267" className="bg-white text-gray-800">🇧🇼 +267</option>
                      <option value="+268" className="bg-white text-gray-800">🇸🇿 +268</option>
                      <option value="+269" className="bg-white text-gray-800">🇰🇲 +269</option>
                      <option value="+290" className="bg-white text-gray-800">🇸🇭 +290</option>
                      <option value="+291" className="bg-white text-gray-800">🇪🇷 +291</option>
                      <option value="+297" className="bg-white text-gray-800">🇦🇼 +297</option>
                      <option value="+298" className="bg-white text-gray-800">🇫🇴 +298</option>
                      <option value="+299" className="bg-white text-gray-800">🇬🇱 +299</option>
                      <option value="+350" className="bg-white text-gray-800">🇬🇮 +350</option>
                      <option value="+351" className="bg-white text-gray-800">🇵🇹 +351</option>
                      <option value="+352" className="bg-white text-gray-800">🇱🇺 +352</option>
                      <option value="+353" className="bg-white text-gray-800">🇮🇪 +353</option>
                      <option value="+354" className="bg-white text-gray-800">🇮🇸 +354</option>
                      <option value="+355" className="bg-white text-gray-800">🇦🇱 +355</option>
                      <option value="+356" className="bg-white text-gray-800">🇲🇹 +356</option>
                      <option value="+357" className="bg-white text-gray-800">🇨🇾 +357</option>
                      <option value="+358" className="bg-white text-gray-800">🇫🇮 +358</option>
                      <option value="+359" className="bg-white text-gray-800">🇧🇬 +359</option>
                      <option value="+370" className="bg-white text-gray-800">🇱🇹 +370</option>
                      <option value="+371" className="bg-white text-gray-800">🇱🇻 +371</option>
                      <option value="+372" className="bg-white text-gray-800">🇪🇪 +372</option>
                      <option value="+373" className="bg-white text-gray-800">🇲🇩 +373</option>
                      <option value="+374" className="bg-white text-gray-800">🇦🇲 +374</option>
                      <option value="+375" className="bg-white text-gray-800">🇧🇾 +375</option>
                      <option value="+376" className="bg-white text-gray-800">🇦🇩 +376</option>
                      <option value="+377" className="bg-white text-gray-800">🇲🇨 +377</option>
                      <option value="+378" className="bg-white text-gray-800">🇸🇲 +378</option>
                      <option value="+380" className="bg-white text-gray-800">🇺🇦 +380</option>
                      <option value="+381" className="bg-white text-gray-800">🇷🇸 +381</option>
                      <option value="+382" className="bg-white text-gray-800">🇲🇪 +382</option>
                      <option value="+383" className="bg-white text-gray-800">🇽🇰 +383</option>
                      <option value="+385" className="bg-white text-gray-800">🇭🇷 +385</option>
                      <option value="+386" className="bg-white text-gray-800">🇸🇮 +386</option>
                      <option value="+387" className="bg-white text-gray-800">🇧🇦 +387</option>
                      <option value="+389" className="bg-white text-gray-800">🇲🇰 +389</option>
                      <option value="+420" className="bg-white text-gray-800">🇨🇿 +420</option>
                      <option value="+421" className="bg-white text-gray-800">🇸🇰 +421</option>
                      <option value="+423" className="bg-white text-gray-800">🇱🇮 +423</option>
                      <option value="+500" className="bg-white text-gray-800">🇫🇰 +500</option>
                      <option value="+501" className="bg-white text-gray-800">🇧🇿 +501</option>
                      <option value="+502" className="bg-white text-gray-800">🇬🇹 +502</option>
                      <option value="+503" className="bg-white text-gray-800">🇸🇻 +503</option>
                      <option value="+504" className="bg-white text-gray-800">🇭🇳 +504</option>
                      <option value="+505" className="bg-white text-gray-800">🇳🇮 +505</option>
                      <option value="+506" className="bg-white text-gray-800">🇨🇷 +506</option>
                      <option value="+507" className="bg-white text-gray-800">🇵🇦 +507</option>
                      <option value="+508" className="bg-white text-gray-800">🇵🇲 +508</option>
                      <option value="+509" className="bg-white text-gray-800">🇭🇹 +509</option>
                      <option value="+590" className="bg-white text-gray-800">🇧🇱 +590</option>
                      <option value="+591" className="bg-white text-gray-800">🇧🇴 +591</option>
                      <option value="+592" className="bg-white text-gray-800">🇬🇾 +592</option>
                      <option value="+593" className="bg-white text-gray-800">🇪🇨 +593</option>
                      <option value="+594" className="bg-white text-gray-800">🇬🇫 +594</option>
                      <option value="+595" className="bg-white text-gray-800">🇵🇾 +595</option>
                      <option value="+596" className="bg-white text-gray-800">🇲🇶 +596</option>
                      <option value="+597" className="bg-white text-gray-800">🇸🇷 +597</option>
                      <option value="+598" className="bg-white text-gray-800">🇺🇾 +598</option>
                      <option value="+599" className="bg-white text-gray-800">🇧🇶 +599</option>
                      <option value="+670" className="bg-white text-gray-800">🇹🇱 +670</option>
                      <option value="+672" className="bg-white text-gray-800">🇦🇶 +672</option>
                      <option value="+673" className="bg-white text-gray-800">🇧🇳 +673</option>
                      <option value="+674" className="bg-white text-gray-800">🇳🇷 +674</option>
                      <option value="+675" className="bg-white text-gray-800">🇵🇬 +675</option>
                      <option value="+676" className="bg-white text-gray-800">🇹🇴 +676</option>
                      <option value="+677" className="bg-white text-gray-800">🇸🇧 +677</option>
                      <option value="+678" className="bg-white text-gray-800">🇻🇺 +678</option>
                      <option value="+679" className="bg-white text-gray-800">🇫🇯 +679</option>
                      <option value="+680" className="bg-white text-gray-800">🇵🇼 +680</option>
                      <option value="+681" className="bg-white text-gray-800">🇼🇫 +681</option>
                      <option value="+682" className="bg-white text-gray-800">🇨🇰 +682</option>
                      <option value="+683" className="bg-white text-gray-800">🇳🇺 +683</option>
                      <option value="+685" className="bg-white text-gray-800">🇼🇸 +685</option>
                      <option value="+686" className="bg-white text-gray-800">🇰🇮 +686</option>
                      <option value="+687" className="bg-white text-gray-800">🇳🇨 +687</option>
                      <option value="+688" className="bg-white text-gray-800">🇹🇻 +688</option>
                      <option value="+689" className="bg-white text-gray-800">🇵🇫 +689</option>
                      <option value="+690" className="bg-white text-gray-800">🇹🇰 +690</option>
                      <option value="+691" className="bg-white text-gray-800">🇫🇲 +691</option>
                      <option value="+692" className="bg-white text-gray-800">🇲🇭 +692</option>
                      <option value="+850" className="bg-white text-gray-800">🇰🇵 +850</option>
                      <option value="+852" className="bg-white text-gray-800">🇭🇰 +852</option>
                      <option value="+853" className="bg-white text-gray-800">🇲🇴 +853</option>
                      <option value="+855" className="bg-white text-gray-800">🇰🇭 +855</option>
                      <option value="+856" className="bg-white text-gray-800">🇱🇦 +856</option>
                      <option value="+880" className="bg-white text-gray-800">🇧🇩 +880</option>
                      <option value="+886" className="bg-white text-gray-800">🇹🇼 +886</option>
                      <option value="+960" className="bg-white text-gray-800">🇲🇻 +960</option>
                      <option value="+961" className="bg-white text-gray-800">🇱🇧 +961</option>
                      <option value="+962" className="bg-white text-gray-800">🇯🇴 +962</option>
                      <option value="+963" className="bg-white text-gray-800">🇸🇾 +963</option>
                      <option value="+964" className="bg-white text-gray-800">🇮🇶 +964</option>
                      <option value="+965" className="bg-white text-gray-800">🇰🇼 +965</option>
                      <option value="+966" className="bg-white text-gray-800">🇸🇦 +966</option>
                      <option value="+967" className="bg-white text-gray-800">🇾🇪 +967</option>
                      <option value="+968" className="bg-white text-gray-800">🇴🇲 +968</option>
                      <option value="+970" className="bg-white text-gray-800">🇵🇸 +970</option>
                      <option value="+971" className="bg-white text-gray-800">🇦🇪 +971</option>
                      <option value="+972" className="bg-white text-gray-800">🇮🇱 +972</option>
                      <option value="+973" className="bg-white text-gray-800">🇧🇭 +973</option>
                      <option value="+974" className="bg-white text-gray-800">🇶🇦 +974</option>
                      <option value="+975" className="bg-white text-gray-800">🇧🇹 +975</option>
                      <option value="+976" className="bg-white text-gray-800">🇲🇳 +976</option>
                      <option value="+977" className="bg-white text-gray-800">🇳🇵 +977</option>
                      <option value="+992" className="bg-white text-gray-800">🇹🇯 +992</option>
                      <option value="+993" className="bg-white text-gray-800">🇹🇲 +993</option>
                      <option value="+994" className="bg-white text-gray-800">🇦🇿 +994</option>
                      <option value="+995" className="bg-white text-gray-800">🇬🇪 +995</option>
                      <option value="+996" className="bg-white text-gray-800">🇰🇬 +996</option>
                      <option value="+998" className="bg-white text-gray-800">🇺🇿 +998</option>
                    </select>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={countryCode === '+1' ? '(555) 123-4567' : '123 456 7890'}
                      maxLength={countryCode === '+1' ? 14 : 15}
                      className="flex-1 min-w-0 h-12 lg:h-14 bg-white rounded-full px-3 sm:px-4 lg:px-6 text-gray-800 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-white" 
                    />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium ml-4 mb-1">Message:</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4} 
                  className="w-full bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                ></textarea>
              </div>
              
              {/* Privacy Policy and Consent Checkboxes */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    checked={privacyPolicyAccepted}
                    onChange={(e) => setPrivacyPolicyAccepted(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#35c4dd] bg-white border-2 border-white rounded focus:ring-[#35c4dd] focus:ring-2 flex-shrink-0"
                  />
                  <label htmlFor="privacy-policy" className="text-sm text-white/90 leading-relaxed">
                    I have read and agree to the <a href="/privacy-policy" className="text-white underline hover:text-[#d0f7ff] transition-colors">Privacy Policy</a>
                  </label>
                </div>
                
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-1 w-5 h-5 text-[#35c4dd] bg-white border-2 border-white rounded focus:ring-[#35c4dd] focus:ring-2 flex-shrink-0"
                  />
                  <label htmlFor="consent" className="text-sm text-white/90 leading-relaxed">
                    I consent to being contacted by ECOM SHARKS regarding my inquiry and understand that my information will be used in accordance with the privacy policy.
                  </label>
                </div>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`group flex items-center justify-center gap-3 font-semibold py-2.5 pl-6 pr-2 rounded-full text-base lg:text-lg shadow-lg overflow-hidden relative w-full lg:w-auto transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-white text-[#35c4dd] hover:shadow-xl'
                  }`}
                >
                  <span className="relative z-10" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    {isSubmitting ? 'Sending...' : 'Get Started'}
                  </span>
                  {!isSubmitting && (
                    <>
                      <span className="bg-[#063f4a] rounded-full p-2.5 relative z-10">
                        <Image src={imgArrowIcon} alt="arrow icon" width={20} height={20} className="lg:w-6 lg:h-6" />
                      </span>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#063f4a] rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
      
      {/* THE FIX: Bottom Footer Bar now has `mt-0` to remove the gap. */}
      <div className="relative z-10 mt-0">
        <div className="bg-[#063f4a] py-4 lg:py-6">
          <div className="container mx-auto px-5 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-4 lg:gap-6 text-white text-xs lg:text-sm">
            <p>© 2025 Ecom Sharkss. All Rights Reserved.</p>
            <div className="flex items-center gap-3 lg:gap-4">
              <span>Follow us:</span>
              <div className="flex items-center gap-2 lg:gap-3">
                <SocialIcon path={socialLinks.facebook} href="https://www.facebook.com/Ecommercesharksofficial" />
                <SocialIcon path={socialLinks.linkedin} href="https://www.linkedin.com/company/ecom-sharkss/posts/?feedView=all" />
                <SocialIcon path={socialLinks.instagram} href="https://www.instagram.com/ecommerce.sharks/" />
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