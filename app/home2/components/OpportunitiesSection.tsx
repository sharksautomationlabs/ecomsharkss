'use client';

import Image from 'next/image';
import { HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import { openCalendly, careersContent } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

export default function OpportunitiesSection() {
  const { ref, controls } = useSectionInView();

  return (
    <section className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto max-w-[1200px]">
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <h2 className={`text-[clamp(1.9rem,4.2vw,3.2rem)] font-black text-[#eaf7fb] ${styles.heading}`}>{careersContent.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.05rem] text-[#9dc3d4]">{careersContent.sub}</p>
          <button
            onClick={openCalendly}
            className="mt-8 rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] px-8 py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.92rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
          >
            Order Your E-commerce Store
          </button>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {careersContent.cards.map((c) => (
            <motion.div key={c.title} variants={fadeUp} className="overflow-hidden rounded-[26px] border border-[#35c4dd]/[0.22] bg-[rgba(10,48,80,0.45)] backdrop-blur-sm">
              <div className="relative h-[220px]">
                <Image src={c.image} alt={c.title} fill className="object-cover" sizes="500px" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03101e] via-transparent to-transparent" />
              </div>
              <div className="p-7">
                <h3 className={`text-2xl font-extrabold text-[#eaf7fb] ${styles.heading}`}>{c.title}</h3>
                <p className="mt-2 text-[#9dc3d4]">{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-8 flex items-center gap-4 rounded-2xl bg-gradient-to-br from-[#35c4dd] to-[#1b9db5] p-6 text-[#04121f]">
          <HeartHandshake size={32} className="flex-shrink-0" />
          <p className={`text-lg font-semibold sm:text-xl ${styles.heading}`}>{careersContent.banner}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
