'use client';

import SiteHeader, { HeroLogo } from './SiteHeader';

const logos: HeroLogo[] = [
  {
    src: '/images/tiktok-logo.png',
    alt: 'TikTok Logo',
    mobileClass: 'logo-fade-in-tiktok',
    desktopClass: 'logo-fade-in-tiktok',
    mobile: { top: '24%', right: '20%', width: '65%' },
    desktop: { top: '44%', right: '20%', width: '16%' },
    mobileSize: 350,
    desktopSize: 310,
    raisedZ: true,
  },
];

export default function TikTokHeader() {
  return (
    <SiteHeader
      heroTitle="We Always Give The Best TikTok Shop Service To You"
      heroSubtitle="Boost your Digital Presence on TikTok with ECOM SHARKS"
      topNavText="🌟 Unify. Manage. Grow."
      logos={logos}
    />
  );
}
