'use client';

import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/** Counts up from 0 to `target` once it scrolls into view. */
export default function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.6 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <div ref={ref} className="font-[family-name:var(--font-eh2-archivo)] text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold text-[#7eebff]">
      {display}<span className="text-[#35c4dd]">{suffix}</span>
    </div>
  );
}
