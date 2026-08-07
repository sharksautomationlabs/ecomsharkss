'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import { stats, openCalendly, topNavText, heroSubtitle, platformLogos } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import { useSharkScroll } from '../hooks';
import Counter from './Counter';
import styles from '../home2.module.css';

export default function Hero() {
  const { ref, controls } = useSectionInView(0.4);
  // Exact same scroll formula as the live site's Header.tsx shark: left starts at 75%
  // and drifts by scrollY * 0.05 (desktop) / 0.15 (mobile), plus the site-wide
  // animate-shark-complete lean/wiggle keyframe (app/globals.css, loaded globally).
  const sharkRef = useSharkScroll(75, -0.05, -0.2, -0.15, -0.5);

  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-[6%] pb-24 pt-[150px] text-center lg:pt-[275px]">
      {/* real hero shark artwork, from the live homepage — drifts as you scroll */}
      <div ref={sharkRef} className="animate-shark-complete pointer-events-none absolute top-[16%] z-0 h-[360px] w-[62%] max-w-[580px] opacity-[0.28] sm:h-[440px]" style={{ left: '75%' }}>
        <Image src="/images/shark-underwater-2.png" alt="" fill className="scale-x-[-1] object-contain" priority sizes="580px" />
      </div>

      <span className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-[#35c4dd]/[0.22] bg-[#35c4dd]/[0.08] px-4 py-2 text-[0.8rem] font-semibold text-[#eaf7fb]">
        <Sparkles size={14} className="text-[#ffc94a]" /> {topNavText.replace('🌟 ', '')}
      </span>

      <div className="relative z-10 mb-8" style={{ perspective: 800 }}>
        <div className={`relative mx-auto h-[132px] w-[132px] rounded-full ${styles.coin}`}>
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-full font-[family-name:var(--font-eh2-archivo)] text-[#4a2f00] ${styles.coinFace}`}
               style={{ background: 'radial-gradient(circle at 32% 28%, #ffe9ae, #ffc94a 45%, #b8860b 100%)', boxShadow: '0 0 44px rgba(255,201,74,.5), inset 0 0 18px rgba(120,70,0,.5)' }}>
            <div className="text-2xl font-black leading-none">$4,000</div>
            <small className="mt-1 text-[0.56rem] font-extrabold tracking-[0.12em]">IN 30 DAYS</small>
          </div>
          <div className={`absolute inset-0 flex flex-col items-center justify-center rounded-full font-[family-name:var(--font-eh2-archivo)] text-[#4a2f00] ${styles.coinFace} ${styles.coinFaceBack}`}
               style={{ background: 'radial-gradient(circle at 32% 28%, #ffe9ae, #ffc94a 45%, #b8860b 100%)', boxShadow: '0 0 44px rgba(255,201,74,.5), inset 0 0 18px rgba(120,70,0,.5)' }}>
            <div className="text-2xl font-black leading-none">FREE</div>
            <small className="mt-1 text-[0.56rem] font-extrabold tracking-[0.12em]">OR WE WORK</small>
          </div>
        </div>
      </div>

      <div className="relative z-10 mb-5 text-[0.78rem] font-bold uppercase tracking-[0.3em] text-[#35c4dd]">The Ecom Sharks Guarantee</div>

      <h1 className={`relative z-10 max-w-[1050px] text-[clamp(2.6rem,6.4vw,5.4rem)] font-black leading-[1.05] text-[#eaf7fb] ${styles.heading}`}>
        Earn <span className="text-[#7eebff] [text-shadow:0_0_34px_rgba(126,235,255,.45)]">$4,000 in 30 Days</span>
        <br />Or We Work For{' '}
        <span className="relative whitespace-nowrap text-[#ffc94a] after:absolute after:inset-x-0 after:bottom-1.5 after:-z-10 after:h-2.5 after:rounded after:bg-[rgba(255,201,74,.22)]">
          Free.
        </span>
      </h1>

      <p className="relative z-10 mx-auto mt-6 max-w-[640px] text-[1.12rem] text-[#9dc3d4]">
        {heroSubtitle}
      </p>

      <div className="relative z-10 mt-9 flex flex-wrap justify-center gap-4">
        <button
          onClick={openCalendly}
          className="rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] px-9 py-[17px] font-[family-name:var(--font-eh2-archivo)] text-[0.95rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
        >
          Claim the Guarantee →
        </button>
        <a href="#reviews">
          <button className="rounded-full border border-[#35c4dd]/[0.22] px-9 py-[17px] font-[family-name:var(--font-eh2-archivo)] text-[0.95rem] font-extrabold text-[#eaf7fb] transition-colors duration-300 hover:border-[#35c4dd] hover:bg-[#35c4dd]/[0.08]">
            See Client Results
          </button>
        </a>
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3 text-[0.92rem] text-[#9dc3d4]">
        <span className="flex gap-0.5 text-[#ffc94a]">
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={17} fill="currentColor" strokeWidth={0} />)}
        </span>
        <span><b className="text-[#eaf7fb]">4.9 / 5</b> average rating</span>·
        <a href="https://www.trustpilot.com/review/ecomsharksofficial.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
          <Image src="/images/trust-pilot.jpg" alt="Trustpilot" width={80} height={24} className="object-contain opacity-90 transition-opacity hover:opacity-100" />
        </a>·
        <span>Verified client reviews</span>
      </div>

      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-8">
        {platformLogos.map((p) => (
          <div key={p.name} className="relative h-9 w-24 opacity-80 grayscale transition-all hover:opacity-100 hover:grayscale-0">
            <Image src={p.src} alt={p.name} fill className="object-contain" sizes="96px" />
          </div>
        ))}
      </div>

      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="relative z-10 mx-auto mt-14 grid w-full max-w-[1000px] grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-[#35c4dd]/[0.22] bg-[#35c4dd]/[0.22] sm:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} className="bg-[#062038]/75 px-4 py-7 text-center backdrop-blur-sm">
            <Counter target={s.target} suffix={s.suffix} />
            <div className="mt-1.5 text-[0.78rem] uppercase tracking-[0.14em] text-[#9dc3d4]">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </header>
  );
}
