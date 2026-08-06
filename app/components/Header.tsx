'use client';

import SiteHeader, { HeroLogo } from './SiteHeader';

const logos: HeroLogo[] = [
  {
    src: '/images/amazon-logo.png',
    alt: 'Amazon Logo',
    mobileClass: 'logo-fade-in-amazon',
    desktopClass: 'logo-fade-in-amazon',
    mobile: { top: '38%', right: '9%', width: '50%' },
    desktop: { top: '41%', right: '9%', width: '13.5%' },
    mobileSize: 260,
    desktopSize: 260,
  },
  {
    src: '/images/shopify-logo.png',
    alt: 'Shopify Logo',
    mobileClass: 'logo-fade-in-shopify',
    desktopClass: 'logo-fade-in-shopify',
    mobile: { top: '46%', right: '45%', width: '52%' },
    desktop: { top: '44%', right: '30%', width: '14.5%' },
    mobileSize: 280,
    desktopSize: 280,
  },
  {
    src: '/images/tiktok-logo.png',
    alt: 'TikTok Logo',
    mobileClass: 'logo-fade-in-tiktok',
    desktopClass: 'logo-fade-in-tiktok',
    mobile: { top: '60%', right: '19%', width: '55%' },
    desktop: { top: '58%', right: '19%', width: '15%' },
    mobileSize: 290,
    desktopSize: 290,
    raisedZ: true,
  },
  {
    src: '/images/walmart-logo.png',
    alt: 'Walmart Logo',
    mobileClass: 'logo-fade-in-walmart',
    desktopClass: 'logo-fade-in-walmart',
    mobile: { top: '22%', right: '30%', width: '55%' },
    desktop: { top: '25%', right: '20%', width: '16%' },
    mobileSize: 310,
    desktopSize: 310,
    raisedZ: true,
  },
];

interface HeaderProps {
  heroTitle?: string;
  heroSubtitle?: string;
  topNavText?: string;
}

export default function Header({
  heroTitle = "Earn $4,000 in 30 Days Or We'll Work for Free",
  heroSubtitle = "Keep scrolling—your path to financial freedom is just ahead. By the time you've explored 25% of this page, you'll discover the hidden gem that could change your life.",
  topNavText = "🌟 One-Stop All Ecommerce Accounts Solutions",
}: HeaderProps) {
  return (
    <SiteHeader
      heroTitle={heroTitle}
      heroSubtitle={heroSubtitle}
      topNavText={topNavText}
      secondaryText="Curious how?  Book a meeting with one of our senior consultants today."
      logos={logos}
    />
  );
}
