'use client';

import SiteHeader, { HeroLogo } from './SiteHeader';

const logos: HeroLogo[] = [
  {
    src: '/images/shopify-logo.png',
    alt: 'Shopify Logo',
    mobileClass: 'logo-fade-in-shopify',
    desktopClass: 'logo-fade-in-shopify',
    mobile: { top: '24%', right: '20%', width: '65%' },
    desktop: { top: '44%', right: '20%', width: '16%' },
    mobileSize: 350,
    desktopSize: 310,
    raisedZ: true,
  },
];

export default function ShopifyHeader() {
  return (
    <SiteHeader
      heroTitle="We Always Give The Best Shopify Store Service To You"
      heroSubtitle="Boost your Digital Presence on Shopify with ECOM SHARKS"
      topNavText="🌟 Total Commerce Control"
      logos={logos}
    />
  );
}
