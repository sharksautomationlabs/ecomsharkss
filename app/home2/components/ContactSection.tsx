'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { sendContactEmail, type ContactFormData } from '@/app/utils/emailjs';
import { checkPhoneRateLimit, recordPhoneSubmission } from '@/app/utils/phoneRateLimit';
import { PHONE_DISPLAY, EMAIL, contactIntro, countryCodes } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

function formatPhoneNumber(value: string, code: string): string {
  const digits = value.replace(/\D/g, '');
  if (code === '+1') {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9, 12)}`;
}

export default function ContactSection() {
  const { ref, controls } = useSectionInView(0.2);

  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '' });
  const [countryCode, setCountryCode] = useState('+1');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'phone' ? formatPhoneNumber(value, countryCode) : value }));
    if (status.type) setStatus({ type: null, message: '' });
  };

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
    if (formData.phone) setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(prev.phone, code) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.email.includes('@') || !formData.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in your name, a valid email, and a message.' });
      return;
    }
    if (!privacyAccepted || !consentGiven) {
      setStatus({ type: 'error', message: 'Please accept the privacy policy and consent to continue.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });
    try {
      const fullPhone = countryCode + formData.phone.replace(/\D/g, '');
      const rateLimit = checkPhoneRateLimit(fullPhone);
      if (!rateLimit.allowed) {
        setStatus({ type: 'error', message: rateLimit.reason || 'Daily submission limit reached. Please try again tomorrow.' });
        setIsSubmitting(false);
        return;
      }
      const result = await sendContactEmail({ ...formData, phone: fullPhone });
      if (result.success) {
        recordPhoneSubmission(fullPhone);
        setStatus({ type: 'success', message: result.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
        setCountryCode('+1');
        setPrivacyAccepted(false);
        setConsentGiven(false);
      } else {
        setStatus({ type: 'error', message: result.message });
      }
    } catch {
      setStatus({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-2">
        <motion.div variants={fadeUp}>
          <h2 className={`text-[clamp(2.2rem,5vw,4.5rem)] font-black leading-[1.05] text-[#eaf7fb] ${styles.heading}`}>Contact</h2>
          <p className="mt-6 max-w-lg text-[1.05rem] text-[#9dc3d4]">{contactIntro}</p>

          <div className="mt-9 space-y-5">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#35c4dd]/[0.14] text-[#7eebff]"><Mail size={20} /></span>
              <div>
                <div className="font-bold text-[#eaf7fb]">General Inquiries:</div>
                <a href={`mailto:${EMAIL}`} className="text-[#9dc3d4] hover:text-[#7eebff]">{EMAIL}</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#35c4dd]/[0.14] text-[#7eebff]"><Phone size={20} /></span>
              <div>
                <div className="font-bold text-[#eaf7fb]">Phone:</div>
                <a href="tel:+17133377701" className="text-[#9dc3d4] hover:text-[#7eebff]">{PHONE_DISPLAY}</a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="rounded-[26px] border border-[#35c4dd]/[0.22] bg-[rgba(10,48,80,0.45)] p-7 backdrop-blur-sm sm:p-9">
          <h3 className={`text-xl font-extrabold text-[#eaf7fb] ${styles.heading}`}>Let&apos;s Talk About Your E-commerce Business</h3>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {status.type && (
              <div className={`rounded-lg p-3 text-sm font-medium ${status.type === 'success' ? 'bg-[#00b67a]/15 text-[#00b67a]' : 'bg-red-500/15 text-red-300'}`}>
                {status.message}
              </div>
            )}

            <input
              type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required
              className="w-full rounded-full border border-[#35c4dd]/[0.22] bg-[#03101e]/60 px-5 py-3 text-[#eaf7fb] placeholder:text-[#9dc3d4] focus:border-[#35c4dd] focus:outline-none"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required
                className="w-full rounded-full border border-[#35c4dd]/[0.22] bg-[#03101e]/60 px-5 py-3 text-[#eaf7fb] placeholder:text-[#9dc3d4] focus:border-[#35c4dd] focus:outline-none"
              />
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => handleCountryCodeChange(e.target.value)}
                  className="rounded-full border border-[#35c4dd]/[0.22] bg-[#03101e]/60 px-3 py-3 text-sm text-[#eaf7fb] focus:border-[#35c4dd] focus:outline-none"
                >
                  {countryCodes.map((c) => <option key={c.v} value={c.v} className="bg-[#062038] text-[#eaf7fb]">{c.l}</option>)}
                </select>
                <input
                  type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange}
                  className="min-w-0 flex-1 rounded-full border border-[#35c4dd]/[0.22] bg-[#03101e]/60 px-4 py-3 text-[#eaf7fb] placeholder:text-[#9dc3d4] focus:border-[#35c4dd] focus:outline-none"
                />
              </div>
            </div>
            <textarea
              name="message" placeholder="Message" rows={4} value={formData.message} onChange={handleInputChange} required
              className="w-full rounded-2xl border border-[#35c4dd]/[0.22] bg-[#03101e]/60 px-5 py-3 text-[#eaf7fb] placeholder:text-[#9dc3d4] focus:border-[#35c4dd] focus:outline-none"
            />

            <label className="flex items-start gap-2.5 text-sm text-[#9dc3d4]">
              <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-[#35c4dd]" />
              I have read and agree to the <Link href="/privacy-policy" className="text-[#7eebff] underline">Privacy Policy</Link>
            </label>
            <label className="flex items-start gap-2.5 text-sm text-[#9dc3d4]">
              <input type="checkbox" checked={consentGiven} onChange={(e) => setConsentGiven(e.target.checked)} className="mt-1 h-4 w-4 accent-[#35c4dd]" />
              I consent to being contacted by ECOM SHARKS regarding my inquiry.
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex w-full items-center justify-center gap-2 rounded-full py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.95rem] font-extrabold transition-all duration-300 ${
                isSubmitting
                  ? 'cursor-not-allowed bg-[#35c4dd]/30 text-[#9dc3d4]'
                  : 'bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] hover:-translate-y-[2px] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]'
              }`}
            >
              {isSubmitting ? 'Sending...' : <>Get Started <ArrowRight size={18} /></>}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
