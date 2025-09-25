import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ECOM SHARKS - Ecommerce Solutions for Amazon, Shopify, TikTok & Walmart",
  description: "Empower your ecommerce business with ECOM SHARKS. Expert solutions for Amazon, Shopify, TikTok, and Walmart. Scale smarter, sell faster with our dedicated team.",
  icons: {
    icon: [
      { url: '/favicon-16x16.png?v=6', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png?v=6', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=6', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg?v=6', color: '#35c4dd' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '#35c4dd',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
        <script 
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              window.onload = function() { 
                Calendly.initBadgeWidget({ 
                  url: 'https://calendly.com/zynofficiall09/30min', 
                  text: 'Call for free', 
                  color: '#35c4dd', 
                  textColor: '#ffffff', 
                  branding: true 
                }); 
                
                // Global Calendly event handler for redirects
                window.addEventListener('message', function(event) {
                  console.log('Calendly message received:', event.data);
                  if (event.data.event && event.data.event === 'calendly.event_scheduled') {
                    console.log('Calendly event scheduled, redirecting to thank you page...');
                    setTimeout(function() {
                      window.location.href = '/thank-you';
                    }, 1000);
                  }
                });
                
                // Alternative approach: Check for Calendly success page
                var originalPushState = history.pushState;
                history.pushState = function() {
                  originalPushState.apply(history, arguments);
                  if (window.location.href.includes('calendly.com') && window.location.href.includes('scheduled')) {
                    console.log('Calendly success page detected, redirecting...');
                    setTimeout(function() {
                      window.location.href = '/thank-you';
                    }, 2000);
                  }
                };
              }
            `
          }}
        />
      </head>
      <body
        className={`${barlow.variable} ${barlowCondensed.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
