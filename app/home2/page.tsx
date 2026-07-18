'use client';

import { useEffect } from 'react';
import { Archivo, Manrope } from 'next/font/google';
import styles from './home2.module.css';

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

  return (
    <main className={`${archivo.variable} ${manrope.variable} ${styles.root} relative min-h-screen overflow-x-hidden bg-[#03101e] text-[#eaf7fb]`}>
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
