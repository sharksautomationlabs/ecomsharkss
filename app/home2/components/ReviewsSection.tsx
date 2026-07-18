'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';
import { testimonials } from '../data';
import { useTilt } from '../hooks';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

const summary = [
  { big: '4.9★', label: 'Average Rating' },
  { big: '100+', label: 'Verified Clients' },
  { big: '300%', label: 'Avg. Sales Growth' },
];

export default function ReviewsSection() {
  const { ref, controls } = useSectionInView();
  const tilt = useTilt();

  return (
    <section id="reviews" className="bg-gradient-to-b from-transparent via-[#062038]/55 to-transparent px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto mb-16 max-w-[820px] text-center">
        <motion.h2 variants={fadeUp} className={`text-[clamp(1.9rem,4vw,3.2rem)] font-black text-[#eaf7fb] ${styles.heading}`}>
          100+ Clients. <em className="not-italic text-[#35c4dd]">Real Results.</em>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-[1.05rem] text-[#9dc3d4]">
          From first-time sellers to six-figure store owners — here&apos;s what our clients say.
        </motion.p>
      </motion.div>

      <div className="mb-14 flex flex-wrap items-center justify-center gap-10">
        {summary.map((s) => (
          <div key={s.label} className="text-center">
            <div className={`text-[3.4rem] font-black text-[#7eebff] ${styles.heading}`}>{s.big}</div>
            <div className="mt-1 text-[0.85rem] uppercase tracking-[0.12em] text-[#9dc3d4]">{s.label}</div>
          </div>
        ))}
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        className="mx-auto grid max-w-[1240px] grid-cols-1 gap-5 lg:grid-cols-3"
      >
        {testimonials.map((t) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            {...tilt}
            className="rounded-[22px] border border-[#35c4dd]/[0.22] bg-[rgba(10,48,80,0.45)] p-7 backdrop-blur-sm transition-transform duration-150"
          >
            <div className="mb-4 flex gap-0.5 text-[#ffc94a]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
            </div>
            <p className="mb-5 text-[0.98rem] text-[#eaf7fb]">&ldquo;{t.text}&rdquo;</p>
            <div className="flex items-center gap-3.5">
              <div className="relative h-[46px] w-[46px] overflow-hidden rounded-full bg-gradient-to-br from-[#35c4dd] to-[#0a3050]">
                <Image src={t.image} alt={t.name} fill className="object-cover" sizes="46px" />
              </div>
              <div>
                <b className="block text-[0.95rem] text-[#eaf7fb]">{t.name}</b>
                <span className="text-[0.8rem] text-[#9dc3d4]">{t.role}</span>
              </div>
              <span className="ml-auto flex items-center gap-1 rounded-full border border-[#00b67a]/40 px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-[0.1em] text-[#00b67a]">
                <BadgeCheck size={12} /> Verified
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
