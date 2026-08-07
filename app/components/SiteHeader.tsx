'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Background from '../home2/components/Background';
import DepthGauge from '../home2/components/DepthGauge';
import Ticker from '../home2/components/Ticker';
import Nav from '../home2/components/Nav';

const imgChatCircleDots = '/images/chat-icon.svg';
const imgDangerousSharkUnderwater2Copy1 = '/images/shark-underwater-2.png';
const imgTrustpilot = '/images/trust-pilot.jpg';

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063f4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface HeroLogo {
  src: string;
  alt: string;
  mobileClass: string;
  desktopClass: string;
  mobile: { top: string; right: string; width: string };
  desktop: { top: string; right: string; width: string };
  mobileSize: number;
  desktopSize: number;
  raisedZ?: boolean;
}

interface SiteHeaderProps {
  heroTitle: string;
  heroSubtitle: string;
  topNavText: string;
  secondaryText?: string;
  logos: HeroLogo[];
}

/** Shared page hero — same animated background, nav, and ticker as the homepage, with each page's own big hero content restored (text, CTA row, Trustpilot, shark, platform logos). */
export default function SiteHeader({ heroTitle, heroSubtitle, topNavText, secondaryText, logos }: SiteHeaderProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const textShadow = { textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' };
  const sharkAnimationStyle = {
    left: `${75 - scrollPosition * (isDesktop ? 0.05 : 0.15)}%`,
    transform: `translateX(${-scrollPosition * (isDesktop ? 0.2 : 0.5)}px)`,
  };

  return (
    <>
      <Background />
      <DepthGauge />
      <Ticker />
      <Nav topNavText={topNavText} />

      <div className="relative z-[2] flex min-h-screen w-full flex-col justify-center overflow-hidden pb-16 pt-[150px] lg:pt-[240px]">
        <div className="relative z-50 w-full px-5 lg:w-[781px] lg:px-20">
          <h1
            className="text-white text-3xl leading-tight lg:text-[94px] lg:leading-[0.921]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}
          >
            {heroTitle.includes('$4,000') ? (
              <>
                {heroTitle.split('$4,000')[0]}
                <span className="text-[#35c4dd] font-bold">$4,000</span>
                {heroTitle.split('$4,000')[1].includes('30') ? (
                  <>
                    {heroTitle.split('$4,000')[1].split('30')[0]}
                    <span className="text-[#35c4dd] font-bold">30</span>
                    {heroTitle.split('$4,000')[1].split('30')[1]}
                  </>
                ) : (
                  heroTitle.split('$4,000')[1]
                )}
              </>
            ) : (
              heroTitle
            )}
          </h1>
          <p className="mt-5 lg:mt-8 text-white text-lg lg:text-[24px] leading-[30px] lg:leading-[38px] max-w-[685px]" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, ...textShadow }}>
            {heroSubtitle}
          </p>
          {secondaryText && (
            <p className="hidden lg:block mt-6 text-white text-[18px] leading-[28px] max-w-[685px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
              {secondaryText}
            </p>
          )}

          <div className="hidden lg:flex items-center gap-6 mt-12">
            <a
              href="tel:+17133377701"
              className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2 pl-6 pr-2 rounded-full text-lg shadow-lg overflow-hidden relative"
            >
              <span className="relative z-10">Contact Us</span>
              <span className="bg-white rounded-full p-2.5 w-10 h-10 flex items-center justify-center relative z-10">
                <ArrowIcon />
              </span>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
            </a>
            <button className="flex items-center justify-between w-[170px] h-[56px] bg-white rounded-full border-2 border-[#35c4dd] p-2 shadow-lg">
              <span className="pl-5 text-[#063f4a] font-semibold text-lg" style={{ fontFamily: "'Barlow', sans-serif" }}>Live Chat</span>
              <div className="w-[44px] h-[44px] bg-[#063f4a] rounded-full flex items-center justify-center">
                <Image src={imgChatCircleDots} alt="chat icon" width={28} height={28} />
              </div>
            </button>
          </div>
          <div className="hidden lg:block mt-3 ml-2">
            <a href="https://www.trustpilot.com/review/ecomsharksofficial.com" target="_blank" rel="noopener noreferrer">
              <Image src={imgTrustpilot} alt="Trustpilot" width={80} height={24} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
            </a>
          </div>

          <div className="mt-8 lg:hidden">
            <a
              href="tel:+17133377701"
              className="bg-[#35c4dd] text-[#063f4a] font-semibold py-1.5 px-2 rounded-full text-xs w-[120px] flex items-center justify-between shadow-lg"
            >
              <span className="pl-1.5 text-xs">Contact Us</span>
              <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063f4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
            <div className="mt-4 ml-1">
              <a href="https://www.trustpilot.com/review/ecomsharksofficial.com" target="_blank" rel="noopener noreferrer">
                <Image src={imgTrustpilot} alt="Trustpilot" width={50} height={15} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-30 pointer-events-none">
          <div
            className="absolute top-[60%] w-[65%] h-auto lg:top-[56%] lg:w-[52%] lg:h-[60%] animate-shark-complete"
            style={sharkAnimationStyle}
          >
            <Image src={imgDangerousSharkUnderwater2Copy1} alt="Shark" width={1000} height={600} style={{ objectFit: 'contain' }} className="transform -scale-x-100" />
          </div>

          <div className="lg:hidden absolute top-1/2 right-4 -translate-y-1/2 w-[45%] h-[70%]">
            {logos.map((logo) => (
              <div
                key={`m-${logo.alt}`}
                className={`absolute h-auto ${logo.raisedZ ? 'z-40' : ''} ${logo.mobileClass}`}
                style={{ top: logo.mobile.top, right: logo.mobile.right, width: logo.mobile.width }}
              >
                <Image src={logo.src} alt={logo.alt} width={logo.mobileSize} height={logo.mobileSize} style={{ objectFit: 'contain' }} />
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            {logos.map((logo) => (
              <div
                key={`d-${logo.alt}`}
                className={`absolute h-auto ${logo.raisedZ ? 'z-40' : ''} ${logo.desktopClass}`}
                style={{ top: logo.desktop.top, right: logo.desktop.right, width: logo.desktop.width }}
              >
                <Image src={logo.src} alt={logo.alt} width={logo.desktopSize} height={logo.desktopSize} style={{ objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
