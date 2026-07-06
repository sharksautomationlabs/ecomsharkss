import type { Metadata } from 'next';
import Script from 'next/script';
import { Montserrat, Barlow } from 'next/font/google';
import EcomwealthCalendlyRoot from '@/components/EcomwealthCalendlyRoot';

const montserrat = Montserrat({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const barlow = Barlow({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ECOM SHARKS | Partnership Call',
  robots: { index: false, follow: false },
};

export default function EcommerceAutomationFunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="gtm-n5xdrh49"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N5XDRH49');`,
        }}
      />
      <link rel="preconnect" href="https://calendly.com" crossOrigin="" />
      <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
      <link rel="dns-prefetch" href="https://calendly.com" />
      <EcomwealthCalendlyRoot />
      <div className={`${montserrat.variable} ${barlow.variable} min-h-screen bg-white`}>
        {children}
      </div>
    </>
  );
}
