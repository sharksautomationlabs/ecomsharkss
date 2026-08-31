'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { LOGO, openCalendly, topNavText, PHONE_DISPLAY, PHONE_TEL, EMAIL } from '../data';

// Same destinations as the site-wide Header component.
const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/amazon', label: 'Amazon' },
  { href: '/shopify', label: 'Shopify' },
  { href: '/tiktok', label: 'Tiktok' },
  { href: '/walmart', label: 'Walmart' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav({ topNavText: topNavTextProp, hasTicker = false }: { topNavText?: string; hasTicker?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const navText = topNavTextProp ?? topNavText;

  return (
    <header className={`fixed inset-x-0 z-[100] px-[5%] py-1.5 lg:py-2 ${hasTicker ? 'top-9' : 'top-0'}`}>
      <div className="mx-auto max-w-[1440px]">
        {/* top info bar — matches the site-wide Header's contact strip */}
        <div className="hidden h-10 items-center justify-between rounded-xl border border-[#35c4dd]/[0.22] bg-[#03101e]/80 px-6 backdrop-blur-xl lg:flex">
          <p className="text-[0.85rem] font-medium text-[#9dc3d4]">{navText}</p>
          <div className="flex items-center gap-6">
            <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 text-[0.85rem] font-medium text-[#eaf7fb] transition-colors hover:text-[#7eebff]">
              <Phone size={15} className="text-[#35c4dd]" /> {PHONE_DISPLAY}
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 text-[0.85rem] font-medium text-[#eaf7fb] transition-colors hover:text-[#7eebff]">
              <Mail size={15} className="text-[#35c4dd]" /> {EMAIL}
            </a>
          </div>
        </div>

        {/* main row */}
        <div className="mt-1 flex items-center justify-between lg:mt-1.5">
          <Link href="/" className="relative h-[70px] w-[100px] flex-shrink-0 md:h-[100px] md:w-[140px] lg:h-[140px] lg:w-[180px]">
            <Image src={LOGO} alt="Ecom Sharks" fill priority className="object-contain object-left" sizes="180px" />
          </Link>

          <div className="hidden items-center gap-7 rounded-2xl border border-[#35c4dd]/[0.22] bg-[#03101e]/70 px-8 py-3.5 backdrop-blur-xl lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-[0.9rem] font-semibold text-[#9dc3d4] transition-colors hover:text-[#7eebff]">
                {l.label}
              </Link>
            ))}
            <button
              onClick={openCalendly}
              className="flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#35c4dd] to-[#1b9db5] py-2 pl-5 pr-2 text-[0.88rem] font-extrabold text-[#04121f] transition-all duration-200 hover:-translate-y-0.5"
            >
              Get Started
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#04121f]/15"><ArrowRight size={15} /></span>
            </button>
          </div>

          <button onClick={() => setOpen(true)} aria-label="Open menu" className="text-[#eaf7fb] lg:hidden">
            <Menu size={26} />
          </button>
        </div>
      </div>

      {/* mobile slide-in panel */}
      <div className={`fixed inset-0 z-[999] transition-all duration-300 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-[#35c4dd]/[0.22] bg-[#03101e] shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-[#35c4dd]/[0.22] p-6">
              <div className="relative h-11 w-28"><Image src={LOGO} alt="Ecom Sharks" fill className="object-contain object-left" sizes="112px" /></div>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-[#eaf7fb]"><X size={24} /></button>
            </div>

            <div className="space-y-2.5 border-b border-[#35c4dd]/[0.22] px-6 py-4 text-xs text-[#9dc3d4]">
              <p>{navText}</p>
              <a href={`tel:${PHONE_TEL}`} className="flex items-center gap-2 hover:text-[#7eebff]"><Phone size={13} /> {PHONE_DISPLAY}</a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-[#7eebff]"><Mail size={13} /> {EMAIL}</a>
            </div>

            <nav className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-base font-semibold text-[#eaf7fb] hover:text-[#7eebff]">
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="space-y-3 border-t border-[#35c4dd]/[0.22] p-6">
              <button
                onClick={() => { setOpen(false); openCalendly(); }}
                className="w-full rounded-full bg-gradient-to-br from-[#35c4dd] to-[#1b9db5] py-3 text-sm font-extrabold text-[#04121f]"
              >
                Get Started
              </button>
              <button className="flex w-full items-center justify-between rounded-full border border-[#35c4dd]/[0.22] p-1.5 pl-4 text-[#eaf7fb]">
                <span className="text-sm font-semibold">Live Chat</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#35c4dd]/[0.14]"><MessageCircle size={17} /></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
