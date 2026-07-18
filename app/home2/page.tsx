'use client';

import { useEffect } from 'react';
import { Archivo, Manrope } from 'next/font/google';
import styles from './home2.module.css';
import { prefetchCalendly } from './data';

import Background from './components/Background';
import DepthGauge from './components/DepthGauge';
import Ticker from './components/Ticker';
import Nav from './components/Nav';
import Hero from './components/Hero';
import PlatformMarquee from './components/PlatformMarquee';
import ExpertsSection from './components/ExpertsSection';
import OfferSection from './components/OfferSection';
import ServicesSection from './components/ServicesSection';
import MissionSection from './components/MissionSection';
import QuoteSection from './components/QuoteSection';
import ResultsSection from './components/ResultsSection';
import JourneySection from './components/JourneySection';
import ReviewsSection from './components/ReviewsSection';
import PricingSection from './components/PricingSection';
import OwnersCta from './components/OwnersCta';
import OpportunitiesSection from './components/OpportunitiesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const archivo = Archivo({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'], variable: '--font-eh2-archivo', display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-eh2-manrope', display: 'swap' });

export default function Home2Page() {
  // Smooth-scrolls in-page anchor nav; reverted on unmount so it never leaks to other routes.
  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = previous; };
  }, []);

  // Start loading Calendly in the background once the page is idle, so it's
  // already warm by the time someone actually taps a "Get Started" button.
  useEffect(() => {
    const idle = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1200));
    const id = idle(prefetchCalendly);
    return () => {
      const cancel = (window as any).cancelIdleCallback || clearTimeout;
      cancel(id);
    };
  }, []);

  return (
    <main className={`${archivo.variable} ${manrope.variable} ${styles.root} relative min-h-screen overflow-x-hidden bg-[#03101e] text-[#eaf7fb]`}>
      {/* warms up the connection so the "Get Started" popup opens as fast as possible */}
      <link rel="preconnect" href="https://calendly.com" />
      <link rel="preconnect" href="https://assets.calendly.com" />

      <Background />
      <DepthGauge />
      {/* ticker sits above the nav bar */}
      <Ticker />
      <Nav />

      <div className="relative z-[2]">
        <Hero />
        <PlatformMarquee />
        <ExpertsSection />
        <OfferSection />
        <ServicesSection />
        <MissionSection />
        <QuoteSection />
        <ResultsSection />
        <JourneySection />
        <ReviewsSection />
        <PricingSection />
        <OwnersCta />
        <OpportunitiesSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
