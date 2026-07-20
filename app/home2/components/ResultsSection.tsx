'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { openCalendly, resultsContent } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

export default function ResultsSection() {
  const { ref, controls } = useSectionInView();

  return (
    <section className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2">
        <motion.div variants={fadeUp}>
          <h2 className={`text-[clamp(1.9rem,4.2vw,3.2rem)] font-black leading-[1.05] text-[#eaf7fb] ${styles.heading}`}>
            {resultsContent.heading}
          </h2>
          <p className="mt-6 text-[1.05rem] text-[#9dc3d4]">{resultsContent.body}</p>
          <ul className="mt-6 space-y-3">
            {resultsContent.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[#eaf7fb]">
                <CheckCircle2 size={20} className="text-[#35c4dd]" /> {b}
              </li>
            ))}
          </ul>
          <button
            onClick={openCalendly}
            className="mt-9 rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] px-8 py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.92rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
          >
            Get A Quote
          </button>
        </motion.div>

        <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-[460px] pt-8 pb-8">
          <div className="relative aspect-square">
            <Image src="/images/hero-shark.png" alt="" fill className="scale-x-[-1] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,.5)]" sizes="460px" />
          </div>

          <div className="absolute -top-4 right-6 h-32 w-32 drop-shadow-[0_12px_24px_rgba(0,0,0,.5)] sm:h-40 sm:w-40">
            <Image src="/images/results-image.png" alt="" fill className="object-contain" sizes="160px" />
          </div>

          <div className="absolute -bottom-4 left-6 h-32 w-32 drop-shadow-[0_12px_24px_rgba(0,0,0,.5)] sm:h-40 sm:w-40">
            <Image src="/images/results-bg.png" alt="" fill className="object-contain" sizes="160px" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
