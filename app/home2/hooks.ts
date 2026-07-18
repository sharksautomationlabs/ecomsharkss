'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';

/** 72h rolling countdown, matches the "offer available for a few days only" messaging. */
export function useCountdown(hours = 72) {
  const [value, setValue] = useState({ d: '00', h: '00', m: '00', s: '00' });

  useEffect(() => {
    const end = Date.now() + hours * 60 * 60 * 1000;
    const pad = (n: number) => String(n).padStart(2, '0');
    const tick = () => {
      let remaining = Math.max(0, end - Date.now());
      const d = Math.floor(remaining / 864e5); remaining -= d * 864e5;
      const h = Math.floor(remaining / 36e5); remaining -= h * 36e5;
      const m = Math.floor(remaining / 6e4); remaining -= m * 6e4;
      const s = Math.floor(remaining / 1e3);
      setValue({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hours]);

  return value;
}

/** Lightweight 3D tilt-on-hover for glass cards. */
export function useTilt() {
  const onMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)`;
  }, []);
  const onMouseLeave = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  }, []);
  return { onMouseMove, onMouseLeave };
}

/** Right-edge "depth gauge" that fills as the visitor scrolls the page. */
export function useDepthGauge() {
  const fillRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      if (meterRef.current) meterRef.current.textContent = `${Math.round(p * 200)}m`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return { fillRef, meterRef };
}

/**
 * The exact scroll-driven shark animation used across the live site
 * (Header.tsx / Experts.tsx): scrollY drives inline `left` + `transform`,
 * layered on top of the site-wide `.animate-shark-complete` keyframe class
 * (defined in app/globals.css, loaded globally) for the constant lean/wiggle.
 * Pass separate desktop/mobile rates only where the source component branches
 * on isDesktop (Header.tsx does; Experts.tsx uses one rate for all sizes).
 */
export function useSharkScroll(
  baseLeftPercent: number,
  leftRate: number,
  transformRate: number,
  mobileLeftRate: number = leftRate,
  mobileTransformRate: number = transformRate
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!ref.current) return;
      const isDesktop = window.innerWidth >= 1024;
      const y = window.scrollY;
      const lRate = isDesktop ? leftRate : mobileLeftRate;
      const tRate = isDesktop ? transformRate : mobileTransformRate;
      ref.current.style.left = `${baseLeftPercent + y * lRate}%`;
      ref.current.style.transform = `translateX(${y * tRate}px)`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [baseLeftPercent, leftRate, transformRate, mobileLeftRate, mobileTransformRate]);

  return ref;
}

/** Fills the onboarding-journey spine and lights up each node as it scrolls into view. */
export function useJourneyProgress(stepCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>(Array(stepCount).fill(null));
  const [activeSteps, setActiveSteps] = useState<boolean[]>(() => Array(stepCount).fill(false));

  const setStepRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    stepRefs.current[index] = el;
  }, []);

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      if (container && flowRef.current) {
        const r = container.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight * 0.75 - r.top) / r.height));
        flowRef.current.style.height = `${p * 100}%`;
      }
      setActiveSteps((prev) => {
        let changed = false;
        const next = stepRefs.current.map((el, i) => {
          if (!el) return prev[i] ?? false;
          const active = el.getBoundingClientRect().top < window.innerHeight * 0.72;
          if (active !== prev[i]) changed = true;
          return active;
        });
        return changed ? next : prev;
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return { containerRef, flowRef, setStepRef, activeSteps };
}
