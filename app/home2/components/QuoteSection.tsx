'use client';

import Image from 'next/image';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { openCalendly, quoteContent, PHONE_DISPLAY, LOGO } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

export default function QuoteSection() {
  const { ref, controls } = useSectionInView();

  return (
    <section className="px-[6%] py-28">
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
        className="relative mx-auto max-w-[900px] overflow-hidden rounded-[32px] border border-[#35c4dd]/[0.22] bg-gradient-to-br from-[#0a3050]/85 to-[#062038]/95 px-[6%] py-16 text-center shadow-[0_30px_80px_rgba(0,0,0,.5)]"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.14]">
          <div className="relative h-[85%] w-[140%] max-w-[1200px]">
            <Image src={quoteContent.bgImage} alt="" fill className="object-contain" sizes="1200px" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(53,196,221,.14),transparent_60%)]" />

        <motion.div variants={fadeUp} className="relative mx-auto mb-6 h-14 w-40">
          <Image src={LOGO} alt="Ecom Sharks" fill className="object-contain" sizes="160px" />
        </motion.div>
        <motion.h2 variants={fadeUp} className={`relative text-[clamp(2rem,4.6vw,3.6rem)] font-black leading-[1.05] text-[#eaf7fb] ${styles.heading}`}>
          {quoteContent.heading}
        </motion.h2>
        <motion.div variants={fadeUp} className="relative mt-8 flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={openCalendly}
            className="rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] px-8 py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.92rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
          >
            Get A Quote
          </button>
          <p className="max-w-xs text-left text-[#9dc3d4]">{quoteContent.sub}</p>
        </motion.div>
        <motion.a variants={fadeUp} href="tel:+17133377701" className="relative mt-9 flex items-center justify-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#35c4dd]/[0.22] bg-[#35c4dd]/[0.1] text-[#7eebff]">
            <Phone size={26} />
          </span>
          <span className={`text-[clamp(1.6rem,4vw,2.6rem)] font-black tracking-wider text-[#eaf7fb] ${styles.heading}`}>{PHONE_DISPLAY}</span>
        </motion.a>
      </motion.div>
    </section>
  );
}
