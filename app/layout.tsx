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
                  url: 'https://calendly.com/contact-sharksbookpublishers/30min?primary_color=35c4dd', 
                  text: 'Call for free', 
                  color: '#35c4dd', 
                  textColor: '#ffffff', 
                  branding: true 
                }); 
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
