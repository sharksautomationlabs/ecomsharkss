'use client';

import { useEffect } from 'react';
import { useAnimation, type Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Shared animation variants — same spring/stagger idiom used across the
// site's existing sections (Header, Services, Testimonials, etc).
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 60, damping: 20, mass: 1 } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

/** Drives a section's enter/exit animation as it crosses the viewport. */
export function useSectionInView(threshold = 0.15) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold });

  useEffect(() => {
    controls.start(inView ? 'visible' : 'hidden');
  }, [inView, controls]);

  return { ref, controls };
}
