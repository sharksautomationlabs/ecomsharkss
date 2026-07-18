'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { openCalendly, missionTabs } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

type TabKey = keyof typeof missionTabs;

export default function MissionSection() {
  const [tab, setTab] = useState<TabKey>('howWeWork');
  const { ref, controls } = useSectionInView();
  const content = missionTabs[tab];

  return (
    <section className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto max-w-[1200px]">
        <motion.div variants={fadeUp} className="mb-12 flex justify-center gap-10 border-b border-[#35c4dd]/[0.22]">
          {(Object.keys(missionTabs) as TabKey[]).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`pb-4 font-[family-name:var(--font-eh2-archivo)] text-lg font-semibold transition-colors ${
                tab === k ? 'border-b-2 border-[#35c4dd] text-[#eaf7fb]' : 'text-[#9dc3d4] hover:text-[#eaf7fb]'
              }`}
            >
              {missionTabs[k].title}
            </button>
          ))}
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <span className="mb-6 inline-block rounded-full bg-[#35c4dd]/[0.14] px-4 py-2 text-[0.85rem] font-semibold text-[#eaf7fb]">
                {content.badge}
              </span>
              <h2 className={`text-[clamp(1.9rem,4vw,3rem)] font-black leading-[1.05] text-[#eaf7fb] ${styles.heading}`}>
                {content.title}
              </h2>
              {content.paragraphs.map((p, i) => (
                <p key={i} className="mt-5 text-[#9dc3d4]">{p}</p>
              ))}
              <div className="mt-9 flex flex-wrap gap-4">
                <button
                  onClick={tab === 'howWeWork' ? () => { window.location.href = '/ecommerce-automation'; } : openCalendly}
                  className="rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] px-8 py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.92rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
                >
                  {content.cta}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.div variants={fadeUp} className="relative h-[480px] w-full max-w-[520px] justify-self-center sm:h-[560px] lg:h-[640px]">
            <Image
              src={tab === 'howWeWork' ? '/images/mission-bg-main.png' : '/images/mission-shark-main.png'}
              alt=""
              fill
              className="object-contain"
              sizes="520px"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
