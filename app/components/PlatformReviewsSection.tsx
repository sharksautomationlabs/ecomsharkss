'use client';

import Image from 'next/image';

/** Review screenshots (2×2) — order: Clutch, Bark, Reviews.io, Trustpilot. */
const REVIEW_CARDS = [
  {
    name: 'Clutch',
    imageSrc: '/images/reviews/review-1.png',
  },
  {
    name: 'Bark',
    imageSrc: '/images/reviews/review-2.png',
  },
  {
    name: 'Reviews.io',
    imageSrc: '/images/reviews/review-3.png',
  },
  {
    name: 'Trustpilot', // Keep this if you still want 4 review cards above, or remove it if not needed.
    imageSrc: '/images/reviews/review-4.png',
  },
] as const;

/** Official platform wordmarks (PNG) — one row, each in its own box + link. */
const LOGO_ROW = [
  {
    name: 'Clutch',
    logoSrc: '/images/review-platforms/clutch.svg',
    href: 'https://clutch.co/profile/ecom-sharkss',
    linkLabel: 'View on Clutch',
  },
  {
    name: 'Bark',
    logoSrc: '/images/review-platforms/logo-bark.png',
    href: 'https://www.bark.com/en/ca/company/ecom-sharkss/bvoaVv/',
    linkLabel: 'See on Bark',
  },
  {
    name: 'Reviews.io',
    logoSrc: '/images/review-platforms/logo-reviews-io.png',
    href: 'https://www.reviews.io/company-reviews/store/www.ecomsharkss.com',
    linkLabel: 'Read on Reviews.io',
  },
  {
    name: 'Facebook',
    logoSrc: '/images/review-platforms/facebook.svg',
    href: 'https://www.facebook.com/people/Ecommerce-Sharks/61584113035162/?sk=reviews',
    linkLabel: 'See on Facebook',
  },
] as const;

export default function PlatformReviewsSection() {
  return (
    <div className="py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-5 lg:px-20">
        <h2
          className="text-2xl lg:text-4xl font-bold text-[#063f4a] text-center mb-4"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          What Our Partners Say
        </h2>
        <p
          className="text-center text-[#2c2420]/70 mb-10 max-w-2xl mx-auto"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {/* Removed Trustpilot from text description */}
          Trusted by investors who chose ECOM SHARKS—see reviews on Clutch, Bark, Reviews.io, and Facebook.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {REVIEW_CARDS.map((card) => (
            <div
              key={card.name}
              className="bg-white rounded-2xl shadow-lg border border-[#35c4dd]/10 flex items-center justify-center min-h-[160px] sm:min-h-[200px] p-2 sm:p-3"
            >
              <Image
                src={card.imageSrc}
                alt={`${card.name} review`}
                width={480}
                height={320}
                sizes="(max-width: 768px) 50vw, 480px"
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 max-w-5xl mx-auto w-full px-1">
          <div className="bg-white rounded-2xl border border-[#35c4dd]/15 shadow-md px-3 py-4 sm:px-5 sm:py-5 md:px-8 md:py-6">
            <div className="overflow-x-auto pb-1 [scrollbar-width:thin] -mx-1 px-1">
              {/* FIXED: Changed grid-cols-5 to grid-cols-4 and added justify-items-center */}
              <div className="grid min-w-[min(100%,480px)] grid-cols-4 sm:min-w-0 gap-2 sm:gap-3 md:gap-4 items-start justify-items-center">
                {LOGO_ROW.map((item) => {
                  const isSvg = item.logoSrc.endsWith('.svg');
                  return (
                    <div
                      key={item.name}
                      className="flex w-full min-w-0 flex-col items-center justify-center gap-1.5 sm:gap-2"
                    >
                      <div className="flex h-10 w-full items-center justify-center bg-white px-0.5 sm:h-12 md:h-[52px]">
                        <Image
                          src={item.logoSrc}
                          alt={`${item.name} logo`}
                          width={isSvg ? 150 : 160}
                          height={isSvg ? 36 : 48}
                          className="max-h-10 w-auto max-w-[min(100%,120px)] object-contain object-center sm:max-h-12 sm:max-w-[140px] md:max-h-[52px]"
                          unoptimized
                        />
                      </div>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[8px] sm:text-[10px] md:text-xs font-semibold text-[#35c4dd] hover:text-[#2bb3cb] transition-colors text-center leading-tight line-clamp-2 px-0.5"
                        style={{ fontFamily: "'Barlow', sans-serif" }}
                      >
                        {item.linkLabel} →
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}