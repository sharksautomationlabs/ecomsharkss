'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { services } from '../data';
import { useTilt } from '../hooks';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

export default function ServicesSection() {
  const { ref, controls } = useSectionInView();
  const tilt = useTilt();

  return (
    <section id="services" className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto mb-16 max-w-[820px] text-center">
        <motion.h2 variants={fadeUp} className={`text-[clamp(1.9rem,4vw,3.2rem)] font-black text-[#eaf7fb] ${styles.heading}`}>
          Dominate Every <em className="not-italic text-[#35c4dd]">Marketplace</em>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-[1.05rem] text-[#9dc3d4]">
          One team. Five platforms. Complete automation from product research to fulfillment.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="mx-auto flex max-w-[820px] flex-wrap justify-center gap-5"
      >
        {services.map((s) => {
          const href = 'href' in s ? s.href : undefined;
          return (
            <motion.div
              key={s.title}
              variants={fadeUp}
              {...tilt}
              className="relative w-[260px] rounded-[22px] border border-[#35c4dd]/[0.22] bg-[rgba(10,48,80,0.45)] p-6 backdrop-blur-sm transition-[transform,box-shadow] duration-150 hover:shadow-[0_26px_60px_rgba(0,0,0,.55),0_0_30px_rgba(53,196,221,.12)]"
            >
              {href && (
                <Link href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 rounded-[22px]" aria-label={s.title} />
              )}
              <div className="relative mb-5 h-[58px] w-[58px] overflow-hidden rounded-2xl border border-[#35c4dd]/[0.22] bg-gradient-to-br from-[#35c4dd]/[0.22] to-[#7eebff]/[0.06] p-2.5">
                <Image src={s.logo} alt={`${s.title} logo`} fill className="object-contain" sizes="58px" />
              </div>
              <h3 className={`mb-2.5 text-xl font-extrabold text-[#eaf7fb] ${styles.heading}`}>{s.title}</h3>
              <p className="text-[0.94rem] text-[#9dc3d4]">{s.desc}</p>
              <div className="mt-4 font-[family-name:var(--font-eh2-archivo)] text-[0.72rem] font-extrabold uppercase tracking-[0.14em] text-[#35c4dd]">{s.tag}</div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
