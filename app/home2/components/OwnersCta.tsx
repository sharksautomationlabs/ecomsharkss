'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { openCalendly, ownersContent, PHONE_DISPLAY, PHONE_TEL } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

export default function OwnersCta() {
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
        <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 opacity-25 sm:h-80 sm:w-80">
          <Image src="/images/owner-hand-writing.png" alt="" fill className="object-contain" sizes="320px" />
        </div>
        <div className="pointer-events-none absolute -left-14 bottom-0 h-48 w-48 opacity-25 sm:h-56 sm:w-56">
          <Image src="/images/owner-hand-gesture.png" alt="" fill className="object-contain" sizes="224px" />
        </div>

        <motion.h2 variants={fadeUp} className={`relative text-[clamp(2rem,4.6vw,3.6rem)] font-black leading-[1.05] text-[#eaf7fb] ${styles.heading}`}>
          {ownersContent.heading}
        </motion.h2>
        <motion.p variants={fadeUp} className="relative mx-auto mt-6 max-w-2xl text-[1.05rem] text-[#9dc3d4]">
          {ownersContent.body}
        </motion.p>
        <motion.div variants={fadeUp} className="relative mt-9 flex flex-wrap items-center justify-center gap-8">
          <a href={`tel:${PHONE_TEL}`} className={`text-[clamp(1.4rem,3vw,2rem)] font-black tracking-wider text-[#eaf7fb] ${styles.heading}`}>
            {PHONE_DISPLAY}
          </a>
          <button
            onClick={openCalendly}
            className="rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] px-8 py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.92rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
          >
            Get a Quote
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
