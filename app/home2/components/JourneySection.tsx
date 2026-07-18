'use client';

import { motion } from 'framer-motion';
import { journeySteps, openCalendly } from '../data';
import { useJourneyProgress, useTilt } from '../hooks';
import { fadeUp, staggerContainer, useSectionInView } from '../motion';
import styles from '../home2.module.css';

export default function JourneySection() {
  const { ref, controls } = useSectionInView();
  const tilt = useTilt();
  const { containerRef, flowRef, setStepRef, activeSteps } = useJourneyProgress(journeySteps.length);

  return (
    <section id="journey" className="px-[6%] py-28">
      <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={controls} className="mx-auto mb-16 max-w-[820px] text-center">
        <motion.div variants={fadeUp} className="mb-5 text-[0.78rem] font-bold uppercase tracking-[0.3em] text-[#35c4dd]">Your Roadmap</motion.div>
        <motion.h2 variants={fadeUp} className={`text-[clamp(1.9rem,4vw,3.2rem)] font-black text-[#eaf7fb] ${styles.heading}`}>
          What Happens <em className="not-italic text-[#35c4dd]">After Onboarding</em>
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-4 text-[1.05rem] text-[#9dc3d4]">
          No confusion. No waiting in the dark. From day one, your store moves through a proven 6-phase system — and you watch every step live.
        </motion.p>
      </motion.div>

      <div ref={containerRef} className="relative mx-auto max-w-[1100px] py-5">
        <div className="absolute inset-y-0 left-[31px] w-[3px] overflow-hidden rounded-full bg-[#35c4dd]/[0.14] lg:left-1/2 lg:-translate-x-1/2">
          <div ref={flowRef} className="absolute left-0 top-0 h-0 w-full bg-gradient-to-b from-[#7eebff] to-[#35c4dd] shadow-[0_0_18px_rgba(53,196,221,.8)]" />
        </div>

        {journeySteps.map((step, i) => {
          const odd = i % 2 === 0;
          const active = activeSteps[i];
          return (
            <div key={step.title} className="relative mb-7 grid grid-cols-[62px_1fr] items-center lg:mb-9 lg:grid-cols-[1fr_92px_1fr]">
              <div
                ref={setStepRef(i)}
                className={`relative z-[2] col-start-1 row-start-1 flex h-[50px] w-[50px] rotate-45 items-center justify-center justify-self-center rounded-2xl border bg-gradient-to-br from-[#0a3050] to-[#062038] font-[family-name:var(--font-eh2-archivo)] text-[0.95rem] font-extrabold shadow-[0_0_0_6px_rgba(3,16,30,.9)] transition-all duration-500 lg:col-start-2 lg:h-16 lg:w-16 lg:rounded-[18px] lg:text-[1.15rem] ${
                  active
                    ? 'border-[#35c4dd] text-[#ffc94a] shadow-[0_0_0_6px_rgba(3,16,30,.9),0_0_40px_rgba(53,196,221,.55)]'
                    : 'border-[#35c4dd]/[0.22] text-[#7eebff]'
                }`}
              >
                <span className="-rotate-45">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <div
                {...tilt}
                className={`col-start-2 rounded-[22px] border border-[#35c4dd]/[0.22] bg-[rgba(10,48,80,0.45)] p-7 text-left backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-150 hover:border-[#35c4dd]/50 hover:shadow-[0_22px_56px_rgba(0,0,0,.5),0_0_26px_rgba(53,196,221,.1)] sm:p-8 ${
                  odd ? 'lg:col-start-1 lg:text-right' : 'lg:col-start-3'
                }`}
              >
                <div className={`mb-2.5 flex items-center gap-2 font-[family-name:var(--font-eh2-archivo)] text-[0.66rem] font-extrabold uppercase tracking-[0.22em] text-[#35c4dd] ${odd ? 'lg:justify-end' : ''}`}>
                  <i className="h-1.5 w-1.5 rounded-full bg-[#35c4dd] shadow-[0_0_10px_#35c4dd]" />
                  {step.phase}
                </div>
                <h3 className={`mb-2.5 text-[1.28rem] font-black text-[#eaf7fb] ${styles.heading}`}>{step.title}</h3>
                <p className="text-[0.94rem] text-[#9dc3d4]">{step.desc}</p>
                <span
                  className={`mt-3.5 inline-block rounded-full border px-3.5 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.1em] ${
                    step.gold ? 'border-[#ffc94a]/35 bg-[#ffc94a]/10 text-[#ffc94a]' : 'border-[#35c4dd]/[0.22] bg-[#35c4dd]/10 text-[#7eebff]'
                  }`}
                >
                  {step.chip}
                </span>
              </div>
            </div>
          );
        })}

        <div className="relative z-[2] mx-auto mt-6 max-w-[760px] rounded-[24px] border border-[#35c4dd]/45 bg-gradient-to-br from-[#35c4dd]/[0.14] to-[#062038]/85 p-9 text-center shadow-[0_0_46px_rgba(53,196,221,.15)] sm:p-10">
          <h3 className={`mb-2.5 text-2xl font-black text-[#eaf7fb] ${styles.heading}`}>
            The Result: A Store That Pays You — <b className="text-[#ffc94a]">$4,000 in 30 Days</b> Guaranteed
          </h3>
          <p className="text-[0.96rem] text-[#9dc3d4]">
            Six phases. One dedicated team. Zero guesswork. And if you don&apos;t hit $4,000 in your first 30 days, we keep working for free.
          </p>
          <button
            onClick={openCalendly}
            className="mt-6 rounded-full bg-gradient-to-br from-[#7eebff] via-[#35c4dd] to-[#1b9db5] px-9 py-[17px] font-[family-name:var(--font-eh2-archivo)] text-[0.95rem] font-extrabold text-[#04121f] shadow-[0_6px_34px_rgba(53,196,221,.45)] transition-all duration-300 hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_10px_48px_rgba(53,196,221,.7)]"
          >
            Start Phase 01 Today →
          </button>
        </div>
      </div>
    </section>
  );
}
