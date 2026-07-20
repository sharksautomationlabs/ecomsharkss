'use client';

import { Star, Phone } from 'lucide-react';
import { tickerItems } from '../data';
import styles from '../home2.module.css';

const iconMap = { star: Star, phone: Phone };

export default function Ticker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-[101] flex h-9 items-center overflow-hidden border-b border-[#35c4dd]/[0.22] bg-gradient-to-r from-[#0a3050] via-[#083046] to-[#0a3050]">
      <div className={`flex w-max gap-14 whitespace-nowrap ${styles.marqueeTrack}`}>
        {items.map((item, i) => {
          const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null;
          return (
            <span key={i} className="flex items-center gap-2 font-[family-name:var(--font-eh2-archivo)] text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[#7eebff]">
              {Icon && <Icon size={13} className="text-[#ffc94a]" />}
              {item.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
