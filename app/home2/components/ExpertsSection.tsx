'use client';

import { motion } from 'framer-motion';
import { openCalendly, expertsContent } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

export default function ExpertsSection() {
  const { ref, controls } = useSectionInView();

  return (
    <section className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-2">
        <motion.div variants={fadeUp}>
          <div className="mb-5 text-[0.78rem] font-bold uppercase tracking-[0.3em] text-[#35c4dd]">Welcome Message</div>
          <h2 className={`text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.05] text-[#eaf7fb] ${styles.heading}`}>
            {expertsContent.title}
          </h2>
          <p className="mt-6 max-w-xl text-[1.05rem] text-[#9dc3d4]">{expertsContent.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={openCalendly}
              className="rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] px-8 py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.92rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
            >
              Get A Quote
            </button>
            <button className="rounded-full border border-[#35c4dd]/[0.22] px-8 py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.92rem] font-extrabold text-[#eaf7fb] transition-colors duration-300 hover:border-[#35c4dd] hover:bg-[#35c4dd]/[0.08]">
              Live Chat
            </button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-[#35c4dd]/[0.22] shadow-[0_30px_80px_rgba(0,0,0,.5)] sm:h-[380px] lg:h-[440px]">
            <iframe
              src={`https://player.vimeo.com/video/${expertsContent.videoId}?autoplay=1&loop=1&muted=1&background=1&controls=0&playsinline=1`}
              className="absolute"
              style={{
                top: '50%',
                left: '50%',
                width: '100vw',
                height: '56.25vw',
                minHeight: '100%',
                minWidth: '177.77%',
                transform: 'translate(-50%, -50%)',
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              frameBorder={0}
              loading="lazy"
              title="Meet the Ecom Sharks team"
            />
            <div className="absolute inset-0 bg-[#03101e]/35" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
