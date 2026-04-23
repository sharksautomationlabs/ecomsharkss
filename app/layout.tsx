import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import CalendlyScript from "./components/CalendlyScript";
import MetaPixel from "./components/MetaPixel";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  preload: true,
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: 'swap',
  preload: true,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#35c4dd',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ecomsharks.com'),
  title: "Aain ali - Ecommerce Solutions for Amazon, Shopify, TikTok & Walmart",
  description: "Empower your ecommerce business with Aain ali. Expert solutions for Amazon, Shopify, TikTok, and Walmart. Scale smarter, sell faster with our dedicated team.",
  keywords: ["ecommerce", "amazon fba", "shopify", "tiktok shop", "walmart marketplace", "online selling", "digital marketing"],
  authors: [{ name: "Aain ali" }],
  creator: "Aain ali",
  publisher: "Aain ali",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ecomsharks.com',
    title: 'Aain ali - Ecommerce Solutions',
    description: 'Empower your ecommerce business with Aain ali. Expert solutions for Amazon, Shopify, TikTok, and Walmart.',
    siteName: 'Aain ali',
    images: [
      {
        url: '/images/Aain-Ali1.png',
        width: 512,
        height: 512,
        alt: 'Aain ali - Ecommerce Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aain ali - Ecommerce Solutions',
    description: 'Empower your ecommerce business with Aain ali. Expert solutions for Amazon, Shopify, TikTok, and Walmart.',
    images: ['/images/Aain-Ali1.png'],
  },
  icons: {
    icon: [
      { url: '/images/Aain-Ali1.png', sizes: 'any', type: 'image/png' },
    ],
    apple: [
      { url: '/images/Aain-Ali1.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg?v=6', color: '#35c4dd' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon for search engines */}
        <link rel="icon" href="/images/Aain-Ali1.png" sizes="any" type="image/png" />
        <link rel="apple-touch-icon" href="/images/Aain-Ali1.png" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/bi-vid.jpeg" as="image" />
        <link rel="preload" href="/images/Aain-Ali1.png" as="image" />
        
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        
        {/* Calendly CSS */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        
        {/* Microsoft Clarity */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tpooyzv40l");
            `,
          }}
        />
      </head>
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        
        {/* Meta Pixel for tracking */}
        <MetaPixel />
    
        {/* Calendly Script with optimization */}
        <CalendlyScript />
      </body>
    </html>
  );
}
