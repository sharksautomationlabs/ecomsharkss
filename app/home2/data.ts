// Content sourced from the live ECOM SHARKS homepage components
// (Header, CurrentOffer, Services, Pricing, Testimonials, Footer).

export const PHONE_DISPLAY = '(713) 337-7701';
export const PHONE_TEL = '+17133377701';
export const EMAIL = 'info@ecomsharkss.com';
export const CALENDLY_URL = 'https://calendly.com/ecomsharkss-info/30min';
export const LOGO = '/images/quote-logo.png';

let calendlyReady: Promise<void> | null = null;

/**
 * The site-wide CalendlyScript component loads widget.js with strategy="afterInteractive",
 * which can still be mid-flight when someone clicks a CTA right after the page paints —
 * that made the popup feel like it was doing nothing for a few seconds. This loads (or
 * reuses) the widget on demand so the click always opens the popup as soon as it can,
 * instead of silently no-oping while the script finishes loading.
 */
function ensureCalendlyLoaded(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if ((window as any).Calendly) return Promise.resolve();
  if (calendlyReady) return calendlyReady;

  calendlyReady = new Promise((resolve) => {
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(css);
    }

    const existing = document.querySelector<HTMLScriptElement>('script[src*="calendly.com/assets/external/widget.js"]');
    if (existing) {
      if ((window as any).Calendly) { resolve(); return; }
      existing.addEventListener('load', () => resolve(), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => resolve();
    document.head.appendChild(script);
  });

  return calendlyReady;
}

export function openCalendly() {
  if (typeof window === 'undefined') return;
  ensureCalendlyLoaded().then(() => {
    (window as any).Calendly?.initPopupWidget({
      url: CALENDLY_URL,
      onEventScheduled: function () {
        window.location.href = '/thank-you';
      },
    });
  });
}

export const tickerItems = [
  { icon: 'trophy', text: '$4,000 in 30 days — or we work for FREE' },
  { icon: 'star', text: 'Rated Excellent by 100+ clients' },
  { icon: 'waves', text: 'Amazon · Shopify · TikTok · Walmart' },
  { icon: 'phone', text: `${PHONE_DISPLAY} — Free Consultation` },
];

export const platforms = ['Amazon', 'Shopify', 'TikTok Shop', 'Walmart'];

export const stats = [
  { target: 100, suffix: '+', label: 'Happy Clients' },
  { target: 300, suffix: '%+', label: 'Avg. Sales Growth' },
  { target: 4, suffix: '.9★', label: 'Average Rating' },
  { target: 30, suffix: 'd', label: 'To Your First $4,000' },
];

export const services = [
  {
    logo: '/images/amazon-logo.png',
    title: 'Amazon',
    desc: 'Vast selection, unparalleled convenience, and the fastest ROI in ecommerce — FBA & wholesale automation built to scale.',
    tag: 'Fastest ROI',
  },
  {
    logo: '/images/shopify-logo.png',
    title: 'Shopify',
    desc: "Your dream, your brand, your store — designed, built, and marketed by experts who've done it 100+ times.",
    tag: 'Your Own Brand',
  },
  {
    logo: '/images/tiktok-logo.png',
    title: 'TikTok Shop',
    desc: "Don't just watch the trend — own it. Viral product strategy plus creator partnerships that convert.",
    tag: 'Own The Trend',
  },
  {
    logo: '/images/walmart-logo.png',
    title: 'Walmart',
    desc: "Zero to $1,000+ in days with dropshipping on America's fastest-growing marketplace. Our flagship offer.",
    tag: 'Flagship Offer',
  },
] as const;

export const journeySteps = [
  {
    phase: 'Phase 01 · Setup',
    title: 'Documentation Submission',
    desc: 'We collect and submit your business documentation to your selected platform — Amazon, Shopify, TikTok, or Walmart — handling every compliance requirement for you.',
    chip: 'Done-For-You',
    gold: false,
  },
  {
    phase: 'Phase 02 · Research',
    title: 'Account Approval → Product Hunting',
    desc: 'Once your account is approved, our research team goes hunting — analyzing demand, competition, and margins to shortlist products with real winning potential.',
    chip: 'Data-Driven',
    gold: false,
  },
  {
    phase: 'Phase 03 · Launch',
    title: 'Winning Products Uploaded',
    desc: 'We upload the winning products directly into your account — priced, categorized, and positioned to start capturing sales from day one.',
    chip: 'Winning Products Only',
    gold: true,
  },
  {
    phase: 'Phase 04 · Optimize',
    title: 'Listing Management & Optimization',
    desc: 'Titles, keywords, images, and pricing are continuously managed and optimized so your listings rank higher and convert better every week.',
    chip: 'Always Improving',
    gold: false,
  },
  {
    phase: 'Phase 05 · Sell',
    title: 'Daily Order Processing',
    desc: 'Every order that comes in is processed daily by our team — building your ecommerce account into a real, revenue-generating asset that you own.',
    chip: 'Your Asset, Your Profit',
    gold: true,
  },
  {
    phase: 'Phase 06 · Track',
    title: 'Client Portal + Dedicated Project Manager',
    desc: 'Track everything daily inside your personal client portal — sales, orders, and performance in real time — with a dedicated project manager assigned to you.',
    chip: 'Full Transparency',
    gold: false,
  },
];

export const testimonials = [
  {
    initials: 'SJ',
    name: 'Sarah Johnson',
    role: 'E-commerce Entrepreneur',
    image: '/images/Dummy-profile/Sarah-Johnson.png',
    text: "ECOM SHARKS transformed our business completely. Their automation helped us scale from $10K to $100K monthly revenue in just 6 months. The team's expertise and dedication are unmatched.",
  },
  {
    initials: 'MC',
    name: 'Michael Chen',
    role: 'Online Store Owner',
    image: '/images/Dummy-profile/Michael-Chen.png',
    text: 'Working with ECOM SHARKS has been a game-changer. Their automation solutions saved us countless hours and significantly increased our profit margins. Highly recommend!',
  },
  {
    initials: 'ER',
    name: 'Emily Rodriguez',
    role: 'Business Owner',
    image: '/images/Dummy-profile/Emily-Rodriguez.png',
    text: "The level of professionalism and results is incredible. They've streamlined our operations and boosted our sales by 300%. Truly exceptional service!",
  },
];

export const pricingPlans = [
  {
    title: 'Basic',
    desc: 'Optimize your store with expert assistance and marketing strategies for up to 50 products.',
    featured: false,
    features: [
      'Full account setup and optimization',
      'Product listing management for up to 50 items',
      'Basic marketing and advertising support',
      'Monthly performance reports',
      'Customer service management',
    ],
  },
  {
    title: 'Standard',
    desc: 'Elevate your online presence with advanced optimization and support for 100 products.',
    featured: true,
    features: [
      'Comprehensive account setup and advanced optimization',
      'Product listing management for up to 100 items',
      'Advanced marketing and advertising strategies',
      'Weekly performance analytics',
      'Dedicated account manager',
      'Customer service management',
      'Inventory management support',
      'Access to premium resources and tutorials',
    ],
  },
  {
    title: 'Premium',
    desc: 'Ultimate e-commerce solution with custom services & dedicated support for your business.',
    featured: false,
    features: [
      'Tailored account setup and full optimization',
      'Unlimited product listing management',
      'Custom marketing and advertising campaigns',
      'Real-time performance analytics',
      'Dedicated team of account managers',
      'Comprehensive customer service solutions',
      'Advanced inventory and supply chain management',
      'Customized training and support',
      'Access to exclusive tools and resources',
    ],
  },
];

export const footerSocials = [
  { label: 'Facebook', href: 'https://www.facebook.com/people/Ecommerce-Sharks/61584113035162/' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ecom-sharkss/posts/?feedView=all' },
  { label: 'Instagram', href: 'https://www.instagram.com/ecommerce.sharks/' },
];

// ---- Real homepage top-bar / hero copy (app/components/Header.tsx defaults, as rendered on "/") ----
export const topNavText = '🌟 One-Stop All Ecommerce Accounts Solutions';
export const heroTitle = "Earn $4,000 in 30 Days Or We'll Work for Free";
export const heroSubtitle =
  "Keep scrolling—your path to financial freedom is just ahead. By the time you've explored 25% of this page, you'll discover the hidden gem that could change your life.";

export const platformLogos = [
  { name: 'Amazon', src: '/images/amazon-logo.png' },
  { name: 'Shopify', src: '/images/shopify-logo.png' },
  { name: 'TikTok', src: '/images/tiktok-logo.png' },
  { name: 'Walmart', src: '/images/walmart-logo.png' },
];

// ---- Meet the Experts (app/components/Experts.tsx) ----
export const expertsContent = {
  title: 'Meet the Experts Behind ECOM SHARKSS Success',
  subtitle:
    "Our dedicated team stands at the forefront of Amazon's fulfillment programs and beyond. We don't just help businesses grow—we empower them to scale and thrive!",
  videoId: '1143260109',
};

// ---- Our Current Offer (app/components/CurrentOffer.tsx) ----
export const currentOfferContent = {
  heading: 'Our Current Offer',
  cardTitle: 'Launch Your Walmart Store',
  founderName: 'Zayn — Senior E-commerce Consultant',
  founderImage: '/images/founder-1s.png',
  body: "Launch your Walmart store with us—earn $4,000 in your first 30 days or we'll work for free.",
  urgency: "This offer is only available for the next few days. Take action now or risk staying stuck in the 9–5 cycle.",
  secondFounderImage: '/images/founders.png',
  secondFounderName: 'Aain — Senior E-commerce Consultant',
};

// ---- Mission tabs (app/components/Mission.tsx) ----
export const missionTabs = {
  howWeWork: {
    badge: 'Free Consultation',
    title: 'How We Work',
    paragraphs: [
      "Wondering what you'll actually gain by working with us? Book a free consultation where you'll discover:",
      'How Ecommerce really works · What automation is, and why it’s the backbone of online success · How automation can help you achieve financial freedom, independence, and a reliable passive income stream',
      'These insights are worth millions of dollars—yet they’re free for you to explore. Our senior consultant, Sharjeel Zahoor, will walk you through the process step by step.',
    ],
    cta: 'Connect Now',
  },
  mission: {
    badge: 'About Us',
    title: 'Our Mission',
    paragraphs: [
      'At Ecom Sharkss, our mission is to empower entrepreneurs and businesses to scale new heights in the digital marketplace. Through tailored solutions for Amazon, Walmart, Shopify, and TikTok, we help brands stand out, grow sustainably, and achieve long-term success with innovation, expertise, and dedication.',
    ],
    cta: 'Get A Quote',
  },
};

// ---- Quote banner (app/components/Qoute.tsx) ----
export const quoteContent = {
  heading: 'Ecom Sharks Helps You Scale Smarter, Sell Faster',
  sub: 'Scale your e-commerce business with proven automation strategies.',
  bgImage: '/images/quote-shark.png',
};

// ---- Results (app/components/Results.tsx) ----
export const resultsContent = {
  heading: 'More Than Management, We Deliver Results',
  body: "With ECOM SHARKS, you're not simply partnering with an agency—you're creating a future-proof Amazon business built for long-term success.",
  bullets: ['Scalable Growth', 'Market Leadership', 'Expert Support Team'],
};

// ---- Owners (app/components/Owners.tsx) ----
export const ownersContent = {
  heading: 'For Ecommerce Owners',
  body: "At Ecom Sharkss, we understand the challenges you face in today's competitive digital marketplace — that's why our team handles the setup, the sourcing, and the day-to-day so you can focus on owning the outcome.",
};

// ---- Opportunities / Careers (app/components/opportunities.tsx) ----
export const careersContent = {
  heading: 'Careers',
  sub: "We're always looking for passionate people to join our mission.",
  cards: [
    {
      title: 'Departments:',
      description: 'Ecom Account Managers, Design, Marketing, Production, Sales, Finance, HR.',
      image: '/images/departments-image.png',
    },
    {
      title: 'Opportunities:',
      description: 'Full-time roles, internships, and freelance partnerships.',
      image: '/images/opportunities-image.png',
    },
  ],
  banner: 'Work in a creative, collaborative environment where every story matters.',
};

// ---- Contact (app/components/Footer.tsx, the real final section) ----
export const contactIntro =
  "Ready to elevate your e-Commerce success? ECOM SHARKS is here to support you at every step. Whether you have questions, need expert guidance, or want a customized solution for your brand, our team is just a message away. Let's build something amazing together!";

export const countryCodes = [
  { v: '+1', l: '🇺🇸 🇨🇦 +1' }, { v: '+7', l: '🇷🇺 🇰🇿 +7' }, { v: '+20', l: '🇪🇬 +20' },
  { v: '+27', l: '🇿🇦 +27' }, { v: '+30', l: '🇬🇷 +30' }, { v: '+31', l: '🇳🇱 +31' },
  { v: '+32', l: '🇧🇪 +32' }, { v: '+33', l: '🇫🇷 +33' }, { v: '+34', l: '🇪🇸 +34' },
  { v: '+36', l: '🇭🇺 +36' }, { v: '+39', l: '🇮🇹 +39' }, { v: '+40', l: '🇷🇴 +40' },
  { v: '+41', l: '🇨🇭 +41' }, { v: '+43', l: '🇦🇹 +43' }, { v: '+44', l: '🇬🇧 +44' },
  { v: '+45', l: '🇩🇰 +45' }, { v: '+46', l: '🇸🇪 +46' }, { v: '+47', l: '🇳🇴 +47' },
  { v: '+48', l: '🇵🇱 +48' }, { v: '+49', l: '🇩🇪 +49' }, { v: '+51', l: '🇵🇪 +51' },
  { v: '+52', l: '🇲🇽 +52' }, { v: '+55', l: '🇧🇷 +55' }, { v: '+61', l: '🇦🇺 +61' },
  { v: '+62', l: '🇮🇩 +62' }, { v: '+63', l: '🇵🇭 +63' }, { v: '+64', l: '🇳🇿 +64' },
  { v: '+65', l: '🇸🇬 +65' }, { v: '+66', l: '🇹🇭 +66' }, { v: '+81', l: '🇯🇵 +81' },
  { v: '+82', l: '🇰🇷 +82' }, { v: '+84', l: '🇻🇳 +84' }, { v: '+86', l: '🇨🇳 +86' },
  { v: '+90', l: '🇹🇷 +90' }, { v: '+91', l: '🇮🇳 +91' }, { v: '+92', l: '🇵🇰 +92' },
  { v: '+94', l: '🇱🇰 +94' }, { v: '+971', l: '🇦🇪 +971' }, { v: '+966', l: '🇸🇦 +966' },
];
