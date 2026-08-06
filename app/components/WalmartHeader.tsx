'use client';

import SiteHeader, { HeroLogo } from './SiteHeader';

const logos: HeroLogo[] = [
  {
    src: '/images/amazon-logo.png',
    alt: 'Walmart Logo',
    mobileClass: 'logo-fade-in-amazon',
    desktopClass: 'logo-fade-in-amazon',
    mobile: { top: '24%', right: '20%', width: '65%' },
    desktop: { top: '44%', right: '20%', width: '16%' },
    mobileSize: 350,
    desktopSize: 350,
    raisedZ: true,
  },
];

export default function WalmartHeader() {
  return (
    <SiteHeader
      heroTitle="We Always Give The Best Walmart Marketplace Service To You"
      heroSubtitle="Boost your Digital Presence on Walmart with ECOM SHARKS"
      topNavText="🌟 Unified Commerce"
      logos={logos}
    />
  );
}
