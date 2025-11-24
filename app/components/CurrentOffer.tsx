'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { sendContactEmail, ContactFormData } from '../utils/emailjs';
import { useVideoLazyLoading } from '../utils/videoLazyLoading';
import { spamProtection, detectSuspiciousActivity } from '../utils/spamProtection';

// Image assets
const imgFounder = "/images/founders.png";

// Reusable Button Component
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
  const [countryCode, setCountryCode] = useState('+1');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Spam protection state
  const [honeypotFieldName] = useState('website_url');
  const [honeypotValue, setHoneypotValue] = useState('');
  const [rateLimitStatus, setRateLimitStatus] = useState<{
    allowed: boolean;
    reason?: string;
    waitTime?: number;
  }>({ allowed: true });

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


    // Check rate limiting
    const rateLimitCheck = spamProtection.canSubmit();
    if (!rateLimitCheck.allowed) {
      setSubmitStatus({ type: 'error', message: rateLimitCheck.reason || 'Submission not allowed at this time' });
      return false;
    }

    // Check honeypot (should be empty)
    if (!spamProtection.validateHoneypot({ [honeypotFieldName]: honeypotValue })) {
      setSubmitStatus({ type: 'error', message: 'Invalid submission detected' });
      return false;
    }

    // Check for suspicious patterns
    if (detectSuspiciousActivity(formData)) {
      setSubmitStatus({ type: 'error', message: 'Suspicious content detected. Please review your message.' });
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
      const formDataWithCountryCode = {
        ...formData,
        phone: fullPhoneNumber
      };
      
      const result = await sendContactEmail(formDataWithCountryCode);
      
      if (result.success) {
        // Record successful submission for rate limiting
        spamProtection.recordSubmission();
        
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
        // Reset honeypot
        setHoneypotValue('');
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
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 mt-2">
                    <Image 
                      src="/images/founder-1s.png" 
                      alt="Zayn - Senior E-commerce Consultant" 
                      width={48} 
                      height={48}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: 'center 30%' }}
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
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 mt-2">
                  <Image 
                    src={imgFounder} 
                    alt="Aain - Senior E-commerce Consultant" 
                    width={64} 
                    height={64}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 20%' }}
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
                  <label htmlFor="phone" className="block text-white/90 text-sm lg:text-base font-medium mb-2" style={{ fontFamily: "'Barlow', sans-serif" }}>
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => handleCountryCodeChange(e.target.value)}
                      className="min-w-[100px] sm:min-w-[120px] px-2 sm:px-3 py-3 bg-white/10 border border-white/30 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#35c4dd] focus:border-transparent transition-all duration-300"
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    >
                      <option value="+1" className="bg-gray-900 text-white">🇺🇸 🇨🇦 +1</option>
                      <option value="+7" className="bg-gray-900 text-white">🇷🇺 🇰🇿 +7</option>
                      <option value="+20" className="bg-gray-900 text-white">🇪🇬 +20</option>
                      <option value="+27" className="bg-gray-900 text-white">🇿🇦 +27</option>
                      <option value="+30" className="bg-gray-900 text-white">🇬🇷 +30</option>
                      <option value="+31" className="bg-gray-900 text-white">🇳🇱 +31</option>
                      <option value="+32" className="bg-gray-900 text-white">🇧🇪 +32</option>
                      <option value="+33" className="bg-gray-900 text-white">🇫🇷 +33</option>
                      <option value="+34" className="bg-gray-900 text-white">🇪🇸 +34</option>
                      <option value="+36" className="bg-gray-900 text-white">🇭🇺 +36</option>
                      <option value="+39" className="bg-gray-900 text-white">🇮🇹 +39</option>
                      <option value="+40" className="bg-gray-900 text-white">🇷🇴 +40</option>
                      <option value="+41" className="bg-gray-900 text-white">🇨🇭 +41</option>
                      <option value="+43" className="bg-gray-900 text-white">🇦🇹 +43</option>
                      <option value="+44" className="bg-gray-900 text-white">🇬🇧 +44</option>
                      <option value="+45" className="bg-gray-900 text-white">🇩🇰 +45</option>
                      <option value="+46" className="bg-gray-900 text-white">🇸🇪 +46</option>
                      <option value="+47" className="bg-gray-900 text-white">🇳🇴 +47</option>
                      <option value="+48" className="bg-gray-900 text-white">🇵🇱 +48</option>
                      <option value="+49" className="bg-gray-900 text-white">🇩🇪 +49</option>
                      <option value="+51" className="bg-gray-900 text-white">🇵🇪 +51</option>
                      <option value="+52" className="bg-gray-900 text-white">🇲🇽 +52</option>
                      <option value="+53" className="bg-gray-900 text-white">🇨🇺 +53</option>
                      <option value="+54" className="bg-gray-900 text-white">🇦🇷 +54</option>
                      <option value="+55" className="bg-gray-900 text-white">🇧🇷 +55</option>
                      <option value="+56" className="bg-gray-900 text-white">🇨🇱 +56</option>
                      <option value="+57" className="bg-gray-900 text-white">🇨🇴 +57</option>
                      <option value="+58" className="bg-gray-900 text-white">🇻🇪 +58</option>
                      <option value="+60" className="bg-gray-900 text-white">🇲🇾 +60</option>
                      <option value="+61" className="bg-gray-900 text-white">🇦🇺 +61</option>
                      <option value="+62" className="bg-gray-900 text-white">🇮🇩 +62</option>
                      <option value="+63" className="bg-gray-900 text-white">🇵🇭 +63</option>
                      <option value="+64" className="bg-gray-900 text-white">🇳🇿 +64</option>
                      <option value="+65" className="bg-gray-900 text-white">🇸🇬 +65</option>
                      <option value="+66" className="bg-gray-900 text-white">🇹🇭 +66</option>
                      <option value="+81" className="bg-gray-900 text-white">🇯🇵 +81</option>
                      <option value="+82" className="bg-gray-900 text-white">🇰🇷 +82</option>
                      <option value="+84" className="bg-gray-900 text-white">🇻🇳 +84</option>
                      <option value="+86" className="bg-gray-900 text-white">🇨🇳 +86</option>
                      <option value="+90" className="bg-gray-900 text-white">🇹🇷 +90</option>
                      <option value="+91" className="bg-gray-900 text-white">🇮🇳 +91</option>
                      <option value="+92" className="bg-gray-900 text-white">🇵🇰 +92</option>
                      <option value="+93" className="bg-gray-900 text-white">🇦🇫 +93</option>
                      <option value="+94" className="bg-gray-900 text-white">🇱🇰 +94</option>
                      <option value="+95" className="bg-gray-900 text-white">🇲🇲 +95</option>
                      <option value="+98" className="bg-gray-900 text-white">🇮🇷 +98</option>
                      <option value="+212" className="bg-gray-900 text-white">🇲🇦 +212</option>
                      <option value="+213" className="bg-gray-900 text-white">🇩🇿 +213</option>
                      <option value="+216" className="bg-gray-900 text-white">🇹🇳 +216</option>
                      <option value="+218" className="bg-gray-900 text-white">🇱🇾 +218</option>
                      <option value="+220" className="bg-gray-900 text-white">🇬🇲 +220</option>
                      <option value="+221" className="bg-gray-900 text-white">🇸🇳 +221</option>
                      <option value="+222" className="bg-gray-900 text-white">🇲🇷 +222</option>
                      <option value="+223" className="bg-gray-900 text-white">🇲🇱 +223</option>
                      <option value="+224" className="bg-gray-900 text-white">🇬🇳 +224</option>
                      <option value="+225" className="bg-gray-900 text-white">🇨🇮 +225</option>
                      <option value="+226" className="bg-gray-900 text-white">🇧🇫 +226</option>
                      <option value="+227" className="bg-gray-900 text-white">🇳🇪 +227</option>
                      <option value="+228" className="bg-gray-900 text-white">🇹🇬 +228</option>
                      <option value="+229" className="bg-gray-900 text-white">🇧🇯 +229</option>
                      <option value="+230" className="bg-gray-900 text-white">🇲🇺 +230</option>
                      <option value="+231" className="bg-gray-900 text-white">🇱🇷 +231</option>
                      <option value="+232" className="bg-gray-900 text-white">🇸🇱 +232</option>
                      <option value="+233" className="bg-gray-900 text-white">🇬🇭 +233</option>
                      <option value="+234" className="bg-gray-900 text-white">🇳🇬 +234</option>
                      <option value="+235" className="bg-gray-900 text-white">🇹🇩 +235</option>
                      <option value="+236" className="bg-gray-900 text-white">🇨🇫 +236</option>
                      <option value="+237" className="bg-gray-900 text-white">🇨🇲 +237</option>
                      <option value="+238" className="bg-gray-900 text-white">🇨🇻 +238</option>
                      <option value="+239" className="bg-gray-900 text-white">🇸🇹 +239</option>
                      <option value="+240" className="bg-gray-900 text-white">🇬🇶 +240</option>
                      <option value="+241" className="bg-gray-900 text-white">🇬🇦 +241</option>
                      <option value="+242" className="bg-gray-900 text-white">🇨🇬 +242</option>
                      <option value="+243" className="bg-gray-900 text-white">🇨🇩 +243</option>
                      <option value="+244" className="bg-gray-900 text-white">🇦🇴 +244</option>
                      <option value="+245" className="bg-gray-900 text-white">🇬🇼 +245</option>
                      <option value="+246" className="bg-gray-900 text-white">🇮🇴 +246</option>
                      <option value="+248" className="bg-gray-900 text-white">🇸🇨 +248</option>
                      <option value="+249" className="bg-gray-900 text-white">🇸🇩 +249</option>
                      <option value="+250" className="bg-gray-900 text-white">🇷🇼 +250</option>
                      <option value="+251" className="bg-gray-900 text-white">🇪🇹 +251</option>
                      <option value="+252" className="bg-gray-900 text-white">🇸🇴 +252</option>
                      <option value="+253" className="bg-gray-900 text-white">🇩🇯 +253</option>
                      <option value="+254" className="bg-gray-900 text-white">🇰🇪 +254</option>
                      <option value="+255" className="bg-gray-900 text-white">🇹🇿 +255</option>
                      <option value="+256" className="bg-gray-900 text-white">🇺🇬 +256</option>
                      <option value="+257" className="bg-gray-900 text-white">🇧🇮 +257</option>
                      <option value="+258" className="bg-gray-900 text-white">🇲🇿 +258</option>
                      <option value="+260" className="bg-gray-900 text-white">🇿🇲 +260</option>
                      <option value="+261" className="bg-gray-900 text-white">🇲🇬 +261</option>
                      <option value="+262" className="bg-gray-900 text-white">🇷🇪 +262</option>
                      <option value="+263" className="bg-gray-900 text-white">🇿🇼 +263</option>
                      <option value="+264" className="bg-gray-900 text-white">🇳🇦 +264</option>
                      <option value="+265" className="bg-gray-900 text-white">🇲🇼 +265</option>
                      <option value="+266" className="bg-gray-900 text-white">🇱🇸 +266</option>
                      <option value="+267" className="bg-gray-900 text-white">🇧🇼 +267</option>
                      <option value="+268" className="bg-gray-900 text-white">🇸🇿 +268</option>
                      <option value="+269" className="bg-gray-900 text-white">🇰🇲 +269</option>
                      <option value="+290" className="bg-gray-900 text-white">🇸🇭 +290</option>
                      <option value="+291" className="bg-gray-900 text-white">🇪🇷 +291</option>
                      <option value="+297" className="bg-gray-900 text-white">🇦🇼 +297</option>
                      <option value="+298" className="bg-gray-900 text-white">🇫🇴 +298</option>
                      <option value="+299" className="bg-gray-900 text-white">🇬🇱 +299</option>
                      <option value="+350" className="bg-gray-900 text-white">🇬🇮 +350</option>
                      <option value="+351" className="bg-gray-900 text-white">🇵🇹 +351</option>
                      <option value="+352" className="bg-gray-900 text-white">🇱🇺 +352</option>
                      <option value="+353" className="bg-gray-900 text-white">🇮🇪 +353</option>
                      <option value="+354" className="bg-gray-900 text-white">🇮🇸 +354</option>
                      <option value="+355" className="bg-gray-900 text-white">🇦🇱 +355</option>
                      <option value="+356" className="bg-gray-900 text-white">🇲🇹 +356</option>
                      <option value="+357" className="bg-gray-900 text-white">🇨🇾 +357</option>
                      <option value="+358" className="bg-gray-900 text-white">🇫🇮 +358</option>
                      <option value="+359" className="bg-gray-900 text-white">🇧🇬 +359</option>
                      <option value="+370" className="bg-gray-900 text-white">🇱🇹 +370</option>
                      <option value="+371" className="bg-gray-900 text-white">🇱🇻 +371</option>
                      <option value="+372" className="bg-gray-900 text-white">🇪🇪 +372</option>
                      <option value="+373" className="bg-gray-900 text-white">🇲🇩 +373</option>
                      <option value="+374" className="bg-gray-900 text-white">🇦🇲 +374</option>
                      <option value="+375" className="bg-gray-900 text-white">🇧🇾 +375</option>
                      <option value="+376" className="bg-gray-900 text-white">🇦🇩 +376</option>
                      <option value="+377" className="bg-gray-900 text-white">🇲🇨 +377</option>
                      <option value="+378" className="bg-gray-900 text-white">🇸🇲 +378</option>
                      <option value="+380" className="bg-gray-900 text-white">🇺🇦 +380</option>
                      <option value="+381" className="bg-gray-900 text-white">🇷🇸 +381</option>
                      <option value="+382" className="bg-gray-900 text-white">🇲🇪 +382</option>
                      <option value="+383" className="bg-gray-900 text-white">🇽🇰 +383</option>
                      <option value="+385" className="bg-gray-900 text-white">🇭🇷 +385</option>
                      <option value="+386" className="bg-gray-900 text-white">🇸🇮 +386</option>
                      <option value="+387" className="bg-gray-900 text-white">🇧🇦 +387</option>
                      <option value="+389" className="bg-gray-900 text-white">🇲🇰 +389</option>
                      <option value="+420" className="bg-gray-900 text-white">🇨🇿 +420</option>
                      <option value="+421" className="bg-gray-900 text-white">🇸🇰 +421</option>
                      <option value="+423" className="bg-gray-900 text-white">🇱🇮 +423</option>
                      <option value="+500" className="bg-gray-900 text-white">🇫🇰 +500</option>
                      <option value="+501" className="bg-gray-900 text-white">🇧🇿 +501</option>
                      <option value="+502" className="bg-gray-900 text-white">🇬🇹 +502</option>
                      <option value="+503" className="bg-gray-900 text-white">🇸🇻 +503</option>
                      <option value="+504" className="bg-gray-900 text-white">🇭🇳 +504</option>
                      <option value="+505" className="bg-gray-900 text-white">🇳🇮 +505</option>
                      <option value="+506" className="bg-gray-900 text-white">🇨🇷 +506</option>
                      <option value="+507" className="bg-gray-900 text-white">🇵🇦 +507</option>
                      <option value="+508" className="bg-gray-900 text-white">🇵🇲 +508</option>
                      <option value="+509" className="bg-gray-900 text-white">🇭🇹 +509</option>
                      <option value="+590" className="bg-gray-900 text-white">🇧🇱 +590</option>
                      <option value="+591" className="bg-gray-900 text-white">🇧🇴 +591</option>
                      <option value="+592" className="bg-gray-900 text-white">🇬🇾 +592</option>
                      <option value="+593" className="bg-gray-900 text-white">🇪🇨 +593</option>
                      <option value="+594" className="bg-gray-900 text-white">🇬🇫 +594</option>
                      <option value="+595" className="bg-gray-900 text-white">🇵🇾 +595</option>
                      <option value="+596" className="bg-gray-900 text-white">🇲🇶 +596</option>
                      <option value="+597" className="bg-gray-900 text-white">🇸🇷 +597</option>
                      <option value="+598" className="bg-gray-900 text-white">🇺🇾 +598</option>
                      <option value="+599" className="bg-gray-900 text-white">🇧🇶 +599</option>
                      <option value="+670" className="bg-gray-900 text-white">🇹🇱 +670</option>
                      <option value="+672" className="bg-gray-900 text-white">🇦🇶 +672</option>
                      <option value="+673" className="bg-gray-900 text-white">🇧🇳 +673</option>
                      <option value="+674" className="bg-gray-900 text-white">🇳🇷 +674</option>
                      <option value="+675" className="bg-gray-900 text-white">🇵🇬 +675</option>
                      <option value="+676" className="bg-gray-900 text-white">🇹🇴 +676</option>
                      <option value="+677" className="bg-gray-900 text-white">🇸🇧 +677</option>
                      <option value="+678" className="bg-gray-900 text-white">🇻🇺 +678</option>
                      <option value="+679" className="bg-gray-900 text-white">🇫🇯 +679</option>
                      <option value="+680" className="bg-gray-900 text-white">🇵🇼 +680</option>
                      <option value="+681" className="bg-gray-900 text-white">🇼🇫 +681</option>
                      <option value="+682" className="bg-gray-900 text-white">🇨🇰 +682</option>
                      <option value="+683" className="bg-gray-900 text-white">🇳🇺 +683</option>
                      <option value="+685" className="bg-gray-900 text-white">🇼🇸 +685</option>
                      <option value="+686" className="bg-gray-900 text-white">🇰🇮 +686</option>
                      <option value="+687" className="bg-gray-900 text-white">🇳🇨 +687</option>
                      <option value="+688" className="bg-gray-900 text-white">🇹🇻 +688</option>
                      <option value="+689" className="bg-gray-900 text-white">🇵🇫 +689</option>
                      <option value="+690" className="bg-gray-900 text-white">🇹🇰 +690</option>
                      <option value="+691" className="bg-gray-900 text-white">🇫🇲 +691</option>
                      <option value="+692" className="bg-gray-900 text-white">🇲🇭 +692</option>
                      <option value="+850" className="bg-gray-900 text-white">🇰🇵 +850</option>
                      <option value="+852" className="bg-gray-900 text-white">🇭🇰 +852</option>
                      <option value="+853" className="bg-gray-900 text-white">🇲🇴 +853</option>
                      <option value="+855" className="bg-gray-900 text-white">🇰🇭 +855</option>
                      <option value="+856" className="bg-gray-900 text-white">🇱🇦 +856</option>
                      <option value="+880" className="bg-gray-900 text-white">🇧🇩 +880</option>
                      <option value="+886" className="bg-gray-900 text-white">🇹🇼 +886</option>
                      <option value="+960" className="bg-gray-900 text-white">🇲🇻 +960</option>
                      <option value="+961" className="bg-gray-900 text-white">🇱🇧 +961</option>
                      <option value="+962" className="bg-gray-900 text-white">🇯🇴 +962</option>
                      <option value="+963" className="bg-gray-900 text-white">🇸🇾 +963</option>
                      <option value="+964" className="bg-gray-900 text-white">🇮🇶 +964</option>
                      <option value="+965" className="bg-gray-900 text-white">🇰🇼 +965</option>
                      <option value="+966" className="bg-gray-900 text-white">🇸🇦 +966</option>
                      <option value="+967" className="bg-gray-900 text-white">🇾🇪 +967</option>
                      <option value="+968" className="bg-gray-900 text-white">🇴🇲 +968</option>
                      <option value="+970" className="bg-gray-900 text-white">🇵🇸 +970</option>
                      <option value="+971" className="bg-gray-900 text-white">🇦🇪 +971</option>
                      <option value="+972" className="bg-gray-900 text-white">🇮🇱 +972</option>
                      <option value="+973" className="bg-gray-900 text-white">🇧🇭 +973</option>
                      <option value="+974" className="bg-gray-900 text-white">🇶🇦 +974</option>
                      <option value="+975" className="bg-gray-900 text-white">🇧🇹 +975</option>
                      <option value="+976" className="bg-gray-900 text-white">🇲🇳 +976</option>
                      <option value="+977" className="bg-gray-900 text-white">🇳🇵 +977</option>
                      <option value="+992" className="bg-gray-900 text-white">🇹🇯 +992</option>
                      <option value="+993" className="bg-gray-900 text-white">🇹🇲 +993</option>
                      <option value="+994" className="bg-gray-900 text-white">🇦🇿 +994</option>
                      <option value="+995" className="bg-gray-900 text-white">🇬🇪 +995</option>
                      <option value="+996" className="bg-gray-900 text-white">🇰🇬 +996</option>
                      <option value="+998" className="bg-gray-900 text-white">🇺🇿 +998</option>
                    </select>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="flex-1 min-w-0 px-3 sm:px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white text-sm sm:text-base placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#35c4dd] focus:border-transparent transition-all duration-300"
                      placeholder={countryCode === '+1' ? '(555) 123-4567' : '123 456 7890'}
                      maxLength={countryCode === '+1' ? 14 : 15}
                      style={{ fontFamily: "'Barlow', sans-serif" }}
                    />
                  </div>
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

                {/* Honeypot field - hidden from users */}
                <div style={{ display: 'none' }}>
                  <label htmlFor={honeypotFieldName}>Website URL (leave blank):</label>
                  <input
                    type="text"
                    id={honeypotFieldName}
                    name={honeypotFieldName}
                    value={honeypotValue}
                    onChange={(e) => setHoneypotValue(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>


                {/* Rate limit status */}
                {!rateLimitStatus.allowed && (
                  <div className="bg-yellow-500/20 text-yellow-200 border border-yellow-400/30 p-3 rounded-lg text-sm">
                    <strong>Rate Limit:</strong> {rateLimitStatus.reason}
                  </div>
                )}
                
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
