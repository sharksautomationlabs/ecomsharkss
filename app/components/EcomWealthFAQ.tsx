'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../utils/ecomwealthContent';

interface EcomWealthFAQProps {
  items: FAQItem[];
  reducedMotion?: boolean;
}

export default function EcomWealthFAQ({ items, reducedMotion: propReducedMotion }: EcomWealthFAQProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = propReducedMotion ?? prefersReducedMotion ?? false;

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-[#35c4dd]/20 rounded-xl overflow-hidden bg-white"
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between gap-4 py-4 px-6 text-left hover:bg-[#bef4fe]/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#35c4dd] focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              id={`faq-question-${item.id}`}
            >
              <span
                className="text-base lg:text-lg font-semibold text-[#063f4a]"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {item.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#35c4dd] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <motion.div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              initial={false}
              animate={{
                height: isOpen ? 'auto' : 0,
                opacity: isOpen ? 1 : 0,
              }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.3, ease: 'easeInOut' }
              }
              className="overflow-hidden"
            >
              <div
                className="px-6 pb-4 pt-0 text-[#2c2420]/80 text-sm lg:text-base leading-relaxed border-t border-[#35c4dd]/10"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {item.answer}
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
