'use client';

import SiteHeader, { HeroLogo } from './SiteHeader';

const logos: HeroLogo[] = [
  {
    src: '/images/walmart-logo.png',
    alt: 'Walmart Logo',
    mobileClass: 'logo-fade-in-amazon',
    desktopClass: 'logo-fade-in-walmart',
    mobile: { top: '24%', right: '20%', width: '65%' },
    desktop: { top: '44%', right: '20%', width: '16%' },
    mobileSize: 350,
    desktopSize: 310,
    raisedZ: true,
  },
];

export default function AmazonHeader() {
  return (
    <SiteHeader
      heroTitle="We Always Give The Best Amazon FBA Service To You"
      heroSubtitle="Boost your Digital Presence on Amazon with ECOM SHARKS"
      topNavText="🌟 All Channels, One Solution"
      logos={logos}
    />
  );
}
