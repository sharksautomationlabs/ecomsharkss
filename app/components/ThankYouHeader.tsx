'use client';

import Image from 'next/image';

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063f4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


/*
  All image paths are kept exactly as provided by you.
*/
const imgImage1 = "/images/quote-logo.png";
const imgRectangle72 = "/images/header-top-bar.png";
const imgGroup1000004908 = "/images/header-phone-icon.svg";
const imgGroup1000004909 = "/images/header-email-icon.svg";
const img91 = "/images/tiktok-logo.png";
const img61 = "/images/amazon-logo.png";
const img72 = "/images/walmart-logo.png";
const img81 = "/images/shopify-logo.png";
const imgTrustpilot = "/images/trust-pilot.jpg";

interface ThankYouHeaderProps {
  heroTitle?: string;
  heroSubtitle?: string;
}

export default function ThankYouHeader({ 
  heroTitle = "You're In! Let's Get Ready for Your Call",
  heroSubtitle = "Congratulations! Your call is booked. This is the first step toward building your hands-off e-commerce business. Before we talk, I have two quick videos below that will answer all of your questions and make our call as productive as possible."
}: ThankYouHeaderProps) {
  const textShadow = { textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)' };


  return (
    // MODIFIED: Removed top margin from mobile
    <div className="w-full bg-[#052126] flex justify-center">
      <div className="relative w-full max-w-[1920px] h-[50vh] lg:h-auto lg:aspect-[1920/1160] overflow-hidden select-none">
        
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1143245934?autoplay=1&loop=1&muted=1&background=1&controls=0&playsinline=1"
            className="absolute w-full h-full"
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100vw',
              height: '56.25vw',
              minHeight: '100%',
              minWidth: '177.77%',
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover'
            }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>
        <div className="absolute inset-0 bg-[#052126]/60 z-10" />

        <div className="relative z-20 w-full h-full">

          <header className="absolute top-0 left-0 w-full z-[99999] px-5 lg:px-20">
            <div
              className="h-[64px] w-full bg-cover bg-center rounded-b-2xl
                         hidden lg:flex items-center justify-between px-8"
              style={{ backgroundImage: `url('${imgRectangle72}')` }}
            >
              <p className="text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                🌟 One-Stop All Ecommerce Accounts Solutions
              </p>
              <div className="flex items-center gap-8">
                <a href="tel:4694807938" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004908} alt="phone" width={32} height={32} />
                  <span>(469) 480-7938</span>
                </a>
                <a href="mailto:info@ecomsharkss.com" className="flex items-center gap-3 text-white text-[20px] font-medium" style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}>
                  <Image src={imgGroup1000004909} alt="email" width={32} height={32} />
                  <span>info@ecomsharkss.com</span>
                </a>
              </div>
            </div>

            <div className="mt-2 lg:mt-6 flex items-center gap-4">
                <div className="w-[100px] h-[70px] md:w-[140px] md:h-[100px] lg:w-[180px] lg:h-[140px] relative fade-in -ml-6 md:-ml-8 lg:-ml-12">
                    <Image src={imgImage1} alt="Ecom Sharks Logo" fill className="object-contain" priority />
                </div>
            </div>
          </header>

          <div className="absolute top-1/2 -translate-y-1/2 left-5 w-1/2 lg:top-[300px] lg:left-20 lg:w-[781px] lg:translate-y-0 z-50 slide-in-left">
            
            <h1 className="text-white text-xl leading-tight pt-16 lg:pt-0 lg:text-[94px] lg:leading-[0.921]" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, ...textShadow }}>
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
             <p className="hidden lg:block mt-8 text-white text-[24px] leading-[38px] max-w-[685px]" style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 500, ...textShadow }}>
               {heroSubtitle}
             </p>
             <p 
               className="hidden lg:block mt-6 text-white text-[18px] leading-[28px] max-w-[685px] font-medium cursor-pointer hover:text-[#35c4dd] transition-colors" 
               style={{ fontFamily: "'Barlow', sans-serif", ...textShadow }}
               onClick={() => {
                 if (typeof window !== 'undefined' && (window as any).Calendly) {
                   (window as any).Calendly.initPopupWidget({
                     url: 'https://calendly.com/ecomsharkss-info/30min',
                     onEventScheduled: function(e: any) {
                       // Redirect to thank you page when appointment is scheduled
                       window.location.href = '/thank-you';
                     }
                   });
                 }
               }}
             >
               Curious now?  Book a meeting with one of our senior consultants today.
             </p>
            <div className="hidden lg:flex items-center gap-6 mt-12">
            <button 
              className="group flex items-center justify-center gap-3 bg-[#35c4dd] text-[#063f4a] font-semibold py-2 pl-6 pr-2 rounded-full text-lg shadow-lg overflow-hidden relative"
              onClick={() => {
                if (typeof window !== 'undefined' && (window as any).Calendly) {
                  (window as any).Calendly.initPopupWidget({
                    url: 'https://calendly.com/ecomsharkss-info/30min',
                    onEventScheduled: function(e: any) {
                      // Redirect to thank you page when appointment is scheduled
                      window.location.href = '/thank-you';
                    }
                  });
                }
              }}
            >
                <span className="relative z-10">Book Now</span>
                <span className="bg-white rounded-full p-2.5 w-10 h-10 flex items-center justify-center relative z-10">
                  <ArrowIcon />
                </span>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full transform scale-0 group-hover:scale-[25] transition-transform duration-[1000ms] ease-in-out origin-center group-hover:duration-[1500ms]"></div>
              </button>
            </div>
            <div className="hidden lg:block mt-3 ml-2">
              <a href="https://www.trustpilot.com/review/ecomsharkss.com" target="_blank" rel="noopener noreferrer">
                <Image src={imgTrustpilot} alt="Trustpilot" width={80} height={24} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
              </a>
            </div>
             <div className="mt-8 lg:hidden">
                <button 
                  className="bg-[#35c4dd] text-[#063f4a] font-semibold py-1.5 px-2 rounded-full text-xs w-[120px] flex items-center justify-between shadow-lg"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as any).Calendly) {
                      (window as any).Calendly.initPopupWidget({
                        url: 'https://calendly.com/ecomsharkss-info/30min',
                        onEventScheduled: function(e: any) {
                          // Redirect to thank you page when appointment is scheduled
                          window.location.href = '/thank-you';
                        }
                      });
                    }
                  }}
                >
                    <span className="pl-1.5 text-xs">Book Now</span>
                    <span className="bg-white rounded-full w-6 h-6 flex items-center justify-center">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <path d="M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3" stroke="#063f4a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                       </svg>
                    </span>
                </button>
                <div className="mt-4 ml-1">
                  <a href="https://www.trustpilot.com/review/ecomsharkss.com" target="_blank" rel="noopener noreferrer">
                    <Image src={imgTrustpilot} alt="Trustpilot" width={50} height={15} className="object-contain cursor-pointer hover:opacity-80 transition-opacity" />
                  </a>
                </div>
            </div>
          </div>
          
          <div className="absolute inset-0 z-30 pointer-events-none">
            <div className="lg:hidden absolute top-1/2 right-4 -translate-y-1/2 w-[45%] h-[70%]">
                <div className="absolute top-[38%] right-[9%] w-[50%] h-auto logo-fade-in-amazon">
                    <Image src={img61} alt="Amazon Logo" width={260} height={260} style={{ objectFit: 'contain' }} />
                </div>
                <div className="absolute top-[46%] right-[45%] w-[52%] h-auto logo-fade-in-shopify">
                    <Image src={img81} alt="Shopify Logo" width={280} height={280} style={{ objectFit: 'contain' }} />
                </div>
                <div className="absolute top-[60%] right-[19%] w-[55%] h-auto z-40 logo-fade-in-tiktok">
                    <Image src={img91} alt="TikTok Logo" width={290} height={290} style={{ objectFit: 'contain' }} />
                </div>
                <div className="absolute top-[22%] right-[30%] w-[55%] h-auto z-40 logo-fade-in-walmart">
                    <Image src={img72} alt="Walmart Logo" width={310} height={310} style={{ objectFit: 'contain' }} />
                </div>
            </div>

            <div className="hidden lg:block">
                <div className="absolute top-[41%] right-[9%] w-[13.5%] h-auto logo-fade-in-amazon">
                    <Image src={img61} alt="Amazon Logo" width={260} height={260} style={{ objectFit: 'contain' }} />
                </div>
                <div className="absolute top-[44%] right-[30%] w-[14.5%] h-auto logo-fade-in-shopify">
                    <Image src={img81} alt="Shopify Logo" width={280} height={280} style={{ objectFit: 'contain' }} />
                </div>
                <div className="absolute top-[58%] right-[19%] w-[15%] h-auto z-40 logo-fade-in-tiktok">
                    <Image src={img91} alt="TikTok Logo" width={290} height={290} style={{ objectFit: 'contain' }} />
                </div>
                <div className="absolute top-[25%] right-[20%] w-[16%] h-auto z-40 logo-fade-in-walmart">
                    <Image src={img72} alt="Walmart Logo" width={310} height={310} style={{ objectFit: 'contain' }} />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



