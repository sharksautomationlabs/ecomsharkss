'use client';

import { motion } from 'framer-motion';
import { Zap, Check } from 'lucide-react';
import { openCalendly, currentOfferContent } from '../data';
import { useCountdown, useTilt } from '../hooks';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

const offerHighlights = [
  'Full store setup, approval & optimization done for you',
  'Winning products sourced by our research team',
  'Daily management by dedicated account managers',
  'Transparent reporting — watch every sale in real time',
];

export default function OfferSection() {
  const { ref, controls } = useSectionInView();
  const cd = useCountdown(72);
  const tilt = useTilt();

  return (
    <section id="offer" className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto mb-16 max-w-[820px] text-center">
        <motion.h2 variants={fadeUp} className={`text-[clamp(1.9rem,4vw,3.2rem)] font-black text-[#eaf7fb] ${styles.heading}`}>
          Our <em className="not-italic text-[#35c4dd]">Winning Offer</em>, In Writing
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-[1.05rem] text-[#9dc3d4]">
          This isn&apos;t marketing talk. It&apos;s a performance guarantee we put our own payroll behind.
        </motion.p>
      </motion.div>

      <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div
          {...tilt}
          className={`relative overflow-hidden rounded-[28px] border border-[#35c4dd]/[0.22] bg-gradient-to-br from-[#0a3050]/85 to-[#062038]/90 p-9 shadow-[0_30px_80px_rgba(0,0,0,.5)] transition-transform duration-150 sm:p-11 ${styles.offerRing}`}
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#ffc94a]/40 bg-[#ffc94a]/[0.14] px-4 py-2 font-[family-name:var(--font-eh2-archivo)] text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-[#ffc94a]">
            <Zap size={13} /> Limited — Next Few Days Only
          </span>
          <div className="mb-4 flex items-center gap-3.5">
            <h3 className={`text-[clamp(1.6rem,3vw,2.4rem)] font-black text-[#eaf7fb] ${styles.heading}`}>
              {currentOfferContent.cardTitle}
            </h3>
          </div>
          <p className="mb-5 text-lg text-[#eaf7fb]/90">
            {currentOfferContent.body}
          </p>
          <div className="mb-7 rounded-xl border border-[#35c4dd]/[0.22] bg-[#35c4dd]/[0.08] p-4">
            <p className="font-semibold text-[#eaf7fb]">{currentOfferContent.urgency}</p>
          </div>
          <ul className="mb-8 list-none">
            {offerHighlights.map((item) => (
              <li key={item} className="flex items-center gap-3 border-b border-dashed border-[#35c4dd]/[0.18] py-3 font-semibold text-[#eaf7fb]">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#35c4dd]/[0.14] text-[#35c4dd]">
                  <Check size={14} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mb-7 flex gap-3">
            {[{ n: cd.d, t: 'Days' }, { n: cd.h, t: 'Hours' }, { n: cd.m, t: 'Mins' }, { n: cd.s, t: 'Secs' }].map((c) => (
              <div key={c.t} className="flex-1 rounded-2xl border border-[#35c4dd]/[0.22] bg-[#03101e]/70 py-3 text-center">
                <div className="font-[family-name:var(--font-eh2-archivo)] text-[1.6rem] font-extrabold text-[#7eebff]">{c.n}</div>
                <div className="text-[0.62rem] uppercase tracking-[0.16em] text-[#9dc3d4]">{c.t}</div>
              </div>
            ))}
          </div>
          <button
            onClick={openCalendly}
            className="w-full rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] py-[17px] font-[family-name:var(--font-eh2-archivo)] text-[0.95rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
          >
            Book My Free Consultation
          </button>
        </div>

        <div className="text-center" style={{ perspective: 900 }}>
          <div className={`mx-auto w-[min(340px,80%)] ${styles.shield}`}>
            <div className={`text-[clamp(3.4rem,7vw,5.4rem)] font-black leading-none ${styles.heading} ${styles.gradientNum}`}>$4,000</div>
            <div className="mt-2.5 font-[family-name:var(--font-eh2-archivo)] text-[0.85rem] font-extrabold uppercase tracking-[0.24em] text-[#7eebff]">
              Guaranteed in 30 days
            </div>
            <div className="my-4 text-[0.9rem] uppercase tracking-[0.2em] text-[#9dc3d4]">— or —</div>
            <div className={`text-[clamp(1.6rem,3.4vw,2.4rem)] font-black text-[#eaf7fb] ${styles.heading}`}>
              We Work <b className="text-[#35c4dd] [text-shadow:0_0_28px_rgba(53,196,221,.5)]">100% Free</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
