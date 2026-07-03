'use client';

import Image from 'next/image';
import { FUNNEL_BRAND_NAME } from '@/lib/funnelBrand';

export const FUNNEL_REVIEW_CARDS = [
  {
    name: 'Duke Morrison',
    imageSrc: '/images/reviews/review-duke-morrison.png',
  },
  {
    name: 'Jackson Ward',
    imageSrc: '/images/reviews/review-jackson-ward.png',
  },
  {
    name: 'Bridger Cole',
    imageSrc: '/images/reviews/review-bridger-cole.png',
  },
  {
    name: 'Edwin',
    imageSrc: '/images/reviews/review-edwin.png',
  },
] as const;

export function FunnelReviewCardsGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto">
      {FUNNEL_REVIEW_CARDS.map((card) => (
        <div
          key={card.name}
          className="bg-white rounded-2xl shadow-md border border-slate-200 p-2 sm:p-3 flex flex-col"
        >
          <div className="relative w-full h-[200px] sm:h-[280px] overflow-hidden rounded-lg bg-white">
            <Image
              src={card.imageSrc}
              alt={`${card.name} review`}
              fill
              sizes="(max-width: 640px) 45vw, 380px"
              className="object-contain p-1.5 sm:p-2"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PlatformReviewsSection() {
  return (
    <div className="py-10 lg:py-14 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-5 lg:px-20">
        <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 text-center mb-3 tracking-tight">
          {`Proof from people who work with ${FUNNEL_BRAND_NAME}`}
        </h2>
        <p className="text-center text-slate-600 text-base lg:text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          {`Trusted by investors who chose ${FUNNEL_BRAND_NAME}—recent feedback from partners on the experience.`}
        </p>

        <FunnelReviewCardsGrid />
      </div>
    </div>
  );
}
