'use client';

import { motion } from 'framer-motion';
import { Gem } from 'lucide-react';
import { pricingPlans, openCalendly } from '../data';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

export default function PricingSection() {
  const { ref, controls } = useSectionInView();

  return (
    <section id="pricing" className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto mb-16 max-w-[820px] text-center">
        <motion.h2 variants={fadeUp} className={`text-[clamp(1.9rem,4vw,3.2rem)] font-black text-[#eaf7fb] ${styles.heading}`}>
          Plans Built To <em className="not-italic text-[#35c4dd]">Scale With You</em>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-[1.05rem] text-[#9dc3d4]">
          Every plan is backed by the same team behind 100+ success stories.
        </motion.p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.15 }}
        className="mx-auto grid max-w-[1180px] grid-cols-1 items-stretch gap-6 lg:grid-cols-3"
      >
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.title}
            variants={fadeUp}
            className={`relative flex flex-col rounded-[26px] border p-9 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_70px_rgba(0,0,0,.5)] ${
              plan.featured
                ? 'border-[#35c4dd]/55 bg-gradient-to-br from-[#35c4dd]/[0.16] to-[#062038]/90 shadow-[0_0_46px_rgba(53,196,221,.18)]'
                : 'border-[#35c4dd]/[0.22] bg-[rgba(10,48,80,0.45)]'
            }`}
          >
            {plan.featured && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-br from-[#ffc94a] to-[#e0a92e] px-[18px] py-[7px] font-[family-name:var(--font-eh2-archivo)] text-[0.66rem] font-black uppercase tracking-[0.16em] text-[#3a2600]">
                Most Popular
              </span>
            )}
            <h3 className={`mb-2 text-2xl font-black text-[#eaf7fb] ${styles.heading}`}>{plan.title}</h3>
            <p className="mb-6 min-h-[52px] text-[0.92rem] text-[#9dc3d4]">{plan.desc}</p>
            <ul className="mb-7 flex-1 list-none">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 py-2 text-[0.92rem] text-[#eaf7fb]">
                  <Gem size={11} className="mt-1.5 flex-shrink-0 text-[#35c4dd]" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={openCalendly}
              className={
                plan.featured
                  ? 'w-full rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.95rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]'
                  : 'w-full rounded-full border border-[#35c4dd]/[0.22] py-4 font-[family-name:var(--font-eh2-archivo)] text-[0.95rem] font-extrabold text-[#eaf7fb] transition-colors duration-300 hover:border-[#35c4dd] hover:bg-[#35c4dd]/[0.08]'
              }
            >
              Get A Quote
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
