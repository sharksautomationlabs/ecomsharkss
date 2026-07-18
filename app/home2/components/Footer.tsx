'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import { LOGO, footerSocials } from '../data';

const iconMap = { Facebook, LinkedIn: Linkedin, Instagram };

export default function Footer() {
  return (
    <div className="border-t border-[#35c4dd]/[0.22] bg-[#062038]">
      <div className="flex justify-center border-b border-[#35c4dd]/[0.14] px-[6%] py-10">
        <Link href="/" className="relative h-[100px] w-[140px] md:h-[120px] md:w-[160px] lg:h-[140px] lg:w-[180px]">
          <Image src={LOGO} alt="Ecom Sharks" fill className="object-contain" sizes="180px" />
        </Link>
      </div>

      <div className="py-5">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-[6%] text-xs text-[#9dc3d4] sm:flex-row sm:text-sm">
          <p>© 2026 Ecom Sharkss. All Rights Reserved.</p>

          <div className="flex items-center gap-3">
            <span>Follow us:</span>
            <div className="flex items-center gap-2.5">
              {footerSocials.map((s) => {
                const Icon = iconMap[s.label as keyof typeof iconMap];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#35c4dd]/[0.14] text-[#7eebff] transition-colors hover:bg-[#35c4dd] hover:text-[#04121f]"
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/reviews" className="transition-colors hover:text-[#7eebff]">Reviews</Link>
            <span>|</span>
            <Link href="/privacy-policy" className="transition-colors hover:text-[#7eebff]">Privacy Policy</Link>
            <span>|</span>
            <span className="transition-colors hover:text-[#7eebff]">Terms of Use</span>
          </div>
        </div>
      </div>
    </div>
  );
}
