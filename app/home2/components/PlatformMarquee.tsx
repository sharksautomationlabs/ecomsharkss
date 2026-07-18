'use client';

import { platforms } from '../data';
import styles from '../home2.module.css';

export default function PlatformMarquee() {
  const items = [...platforms, ...platforms];

  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-[#35c4dd]/[0.22] bg-[#062038]/35 py-6">
      <div className={`flex w-max items-center gap-20 ${styles.marqueeTrackSlow}`}>
        {items.map((p, i) => (
          <span key={i} className="flex items-center gap-3 font-[family-name:var(--font-eh2-archivo)] text-2xl font-black uppercase tracking-[0.04em] text-[#9dc3d4]/55">
            <i className="inline-block h-2.5 w-2.5 rounded-full bg-[#35c4dd] shadow-[0_0_12px_#35c4dd]" />
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
