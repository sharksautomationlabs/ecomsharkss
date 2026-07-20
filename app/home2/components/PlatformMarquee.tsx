'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { platforms } from '../data';
import styles from '../home2.module.css';

const SPEED_PX_PER_SEC = 80;
// Each logo's slot is sized to exactly containerWidth / VISIBLE, so the
// logos always fill the full width with no dead space, at any scroll offset.
const VISIBLE = 5;
// Enough copies so the track never runs out of content mid-scroll.
const REPEAT = 2;
const baseSet = Array.from({ length: REPEAT }, () => platforms).flat();
const items = [...baseSet, ...baseSet];

export default function PlatformMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slotWidth, setSlotWidth] = useState(220);
  const [duration, setDuration] = useState(30);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth / VISIBLE;
        setSlotWidth(w);
        setDuration((w * platforms.length * REPEAT) / SPEED_PX_PER_SEC);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <div
      className="relative overflow-hidden border-y border-[#35c4dd]/[0.22] bg-[#062038]/35 py-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a3050] to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a3050] to-transparent sm:w-32" />
      <div ref={containerRef} className={styles.edgeFade}>
        <div
          className={`flex w-max items-center ${styles.marqueeTrack}`}
          style={{ animationDuration: `${duration}s`, animationPlayState: paused ? 'paused' : 'running' }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center justify-center"
              style={{ width: slotWidth }}
            >
              <Link
                href={p.href}
                target={p.href.startsWith('http') ? '_blank' : undefined}
                rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center transition-transform duration-300 hover:scale-110"
              >
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={160}
                  height={160}
                  className="h-16 w-auto object-contain opacity-90 sm:h-24"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
